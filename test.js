
var before_start = '2024-03-01';
var before_end = '2024-03-24';

// Now set the same parameters for AFTER the flood.
var after_start = '2024-09-25';
var after_end = '2024-10-10';

var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/
var pass_direction = "DESCENDING"; /* or "DESCENDING" 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 0.85; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */

// rename selected geometry feature 
var aoi = ee.FeatureCollection(geometry);

// Load and filter Sentinel-1 GRD data by predefined parameters 
var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
    .filter(ee.Filter.eq('orbitProperties_pass', pass_direction))
    .filter(ee.Filter.eq('resolution_meters', 10))
    //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
    .filterBounds(aoi)
    .select(polarization);

// Select images by predefined dates
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start, after_end);

// Print selected tiles to the console

// Extract date from meta data
function dates(imgcol) {
    var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
    var printed = ee.String('from ')
        .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
        .cat(' to ')
        .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
    return printed;
}
// print dates of before images to console
var before_count = before_collection.size();
print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
    dates(before_collection), before_collection);

// print dates of after images to console
var after_count = before_collection.size();
print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
    dates(after_collection), after_collection);

// Create a mosaic of selected tiles and clip to study area
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);

// Apply reduce the radar speckle by smoothing  
var smoothing_radius = 1;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');


//------------------------------- FLOOD EXTENT CALCULATION -------------------------------//

// Calculate the difference between the before and after images
var difference = after_filtered.divide(before_filtered);

// Apply the predefined difference-threshold and create the flood extent mask 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);

// Refine flood result using additional datasets

// Include JRC layer on surface water seasonality to mask flood pixels from areas
// of "permanent" water (where there is water > 10 months of the year)
var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
var swater_mask = swater.gte(10).updateMask(swater.gte(10));

//Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
var flooded_mask = difference_binary.where(swater_mask, 0);
// final flooded area without pixels in perennial waterbodies
var flooded = flooded_mask.updateMask(flooded_mask);

// Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
// This operation reduces noise of the flood extent product 
var connections = flooded.connectedPixelCount();
var flooded = flooded.updateMask(connections.gte(8));

// Mask out areas with more than 5 percent slope using a Digital Elevation Model 
var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(DEM);
var slope = terrain.select('slope');
var flooded = flooded.updateMask(slope.lt(5));

// Calculate flood extent area
// Create a raster layer containing the area information of each pixel 
var flood_pixelarea = flooded.select(polarization)
    .multiply(ee.Image.pixelArea());

// Sum the areas of flooded pixels
// default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
// accurate result set bestEffort to false and increase 'maxPixels'. 
var flood_stats = flood_pixelarea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: aoi,
    scale: 10, // native resolution 
    //maxPixels: 1e9,
    bestEffort: true
});

// Convert the flood extent to hectares (area calculations are originally given in meters)  
var flood_area_ha = flood_stats
    .getNumber(polarization)
    .divide(10000)
    .round();

// Before and after flood SAR mosaic
Map.centerObject(aoi, 14);
Map.addLayer(before_filtered, { min: -25, max: 0 }, 'Before Flood', 0);
Map.addLayer(after_filtered, { min: -25, max: 0 }, 'After Flood', 1);

// Difference layer
Map.addLayer(difference, { min: 0, max: 2 }, "Difference Layer", 0);

// Flooded areas
Map.addLayer(flooded, { palette: "0000FF" }, 'Flooded areas');



a = {
    "name": "สมชาย",
    "age": 28,
    "married": false,
    "hobbies": ["อ่านหนังสือ", "เล่นดนตรี", "เดินทาง"],
    "address": {
        "street": "123 ถนนหลัก",
        "city": "กรุงเทพมหานคร",
        "zipcode": "10100"
    }
}

a = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [100.5018, 13.7563]
    },
    "properties": {
        "name": "กรุงเทพมหานคร",
        "population": 8281000
    }
}

a = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [100.5018, 13.7563],
            [100.5231, 13.7367],
            [100.5450, 13.7240]
        ]
    },
    "properties": {
        "route": "เส้นทางรถไฟฟ้า"
    }
}