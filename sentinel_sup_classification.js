var extent = ee.Geometry.Rectangle(98.60050309407558, 18.600060979081825, 98.64058599185445, 18.568655533373086);
var study_area = ee.FeatureCollection([
    ee.Feature(extent, { 'name': 'bnd_MA' })
]);

var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
    .filter(ee.Filter.date('2022-01-01', '2022-01-31'))
    .filter(ee.Filter.bounds(study_area))
    .select('B.*');

var scalData = function (img) {
    return img.clip(study_area).divide(10000);
}

var s2 = dataset.map(scalData)

Map.centerObject(study_area, 14);
Map.addLayer(s2.median(), { min: 0.0, max: 0.4, bands: ['B4', 'B3', 'B2'] }, 'RGB:432');
Map.addLayer(s2.median(), { min: 0.0, max: 0.4, bands: ['B11', 'B8', 'B2'] }, 'RGB:1182');


var bareSoil = ee.Geometry.Rectangle(98.62616882242132, 18.58225882687881, 98.6265443316834, 18.581953741275164);
var cropLand = ee.Geometry.Rectangle(98.62591102622285, 18.58020150995087, 98.62627580664888, 18.579876081359373);
var forest1 = ee.Geometry.Rectangle(98.62741594658405, 18.58581682027496, 98.62795238838703, 18.585267677260802);
var forest2 = ee.Geometry.Rectangle(98.63757900964077, 18.579358673749272, 98.63837294350918, 18.578545097082692);
var building = ee.Geometry.Rectangle(98.6232372413925, 18.583705967136666, 98.62355374205626, 18.583156817320013);
var building2 = ee.Geometry.Rectangle(98.62373812203315, 18.585700781799776, 98.62391514782813, 18.585522818858564);

var roi = ee.FeatureCollection([
    ee.Feature(bareSoil, { 'class': 1 }),
    ee.Feature(cropLand, { 'class': 2 }),
    ee.Feature(forest2, { 'class': 3 }),
    ee.Feature(forest1, { 'class': 4 }),
    ee.Feature(building, { 'class': 5 }),
]);
Map.addLayer(roi, { color: 'red', fillColor: '00000000' }, "Trainning area");

var bands = ['B2', 'B8', 'B11'];

var training = s2.median().sampleRegions({
    collection: roi,
    properties: ['class'],
    scale: 30
});

var smileRandomForest = ee.Classifier.smileRandomForest({
    numberOfTrees: 100
});

var libsvm = ee.Classifier.libsvm({
    kernelType: 'RBF',
    gamma: 0.5,
    cost: 10
});

var trained = smileRandomForest.train(training, 'class', bands);
var classified = s2.median().classify(trained);

var palette = ['#c9995c', '#c7d270', '#8add60', '#097210', '#8bc4f9'];
Map.addLayer(classified, { min: 1, max: 5, palette: palette }, 'Classified');

var legend = ui.Panel({
    style: {
        position: 'bottom-left',
        padding: '8px 15px'
    }
});

// Create legend title
var legendTitle = ui.Label({
    value: 'Landuse',
    style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
    }
});

legend.add(legendTitle);

var makeRow = function (color, name) {
    var colorBox = ui.Label({
        style: {
            backgroundColor: color,
            padding: '8px',
            margin: '0 0 4px 0'
        }
    });

    var description = ui.Label({
        value: name,
        style: { margin: '0 0 4px 6px' }
    });

    return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
    });
};

var names = ['Bare Soil', 'Crop Land', 'Deciduous Forest', 'Evergreen Forest', 'Building'];
var items = [1, 2, 3, 4, 5]
for (var i in items) {
    legend.add(makeRow(palette[i], names[i]));
}

Map.add(legend);

Export.image.toDrive({
    image: classified,
    description: 'classify_MA',
    folder: 'GEE_data',
    region: study_area,
    scale: 12.5,
    crs: 'EPSG:32647'
});


var vector = seg.select(["clusters"])
    .reduceToVectors({
        reducer: ee.Reducer.countEvery(),
        scale: 2,
        geometryType: "polygon",
    })
    .style({
        color: 'yellow',
        fillColor: '00000000',
        width: 1
    })