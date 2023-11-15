### Table of content
* [การเข้าใช้งาน](./README.md)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)


## การใช้งาน google earth engine เบื้อต้น 

data type ใน google earth engine

### geographic data structures
Raster
* Image 
* ImageCollection

Vector
* Feature
* FeatureCollection
* Geometry

Other fundamental data structures 
* Dictionary 
* List
* Array
* Date
* Number
* String


Image
Image เป็นข้อมูลที่มีอย่างน้อย 1 band ซึ่งแต่ละ band จะมี ชื่อ datatype, scale, map projection เป็นของตนเอง มี metadata ที่ถูกเก็บไว้ใน properties
ตัวอย่างของ Image 
### Surface Reflectance
ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
### Top of Atmosphere
ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
### raw images
ee.ImageCollection("LANDSAT/LC08/C01/T1")

การเรียก image
```js
var image = ee.Image('JAXA/ALOS/AW3D30/V2_2');
```
Image Visualization  การแสดงผล 
https://developers.google.com/earth-engine/guides/image_visualization

การแสดงสี Color palettes
```js
var image = ee.Image('JAXA/ALOS/AW3D30/V2_2').select('AVE_DSM');
var palette = ['#c9995c', '#c7d270', '#8add60', '#097210', '#8bc4f9']
var vizParams = {
  min:0, 
  max: 4000,
  palette: palette 
}
Map.setCenter(98.986107,18.788300, 10)
Map.addLayer(image, vizParams)
```

RGB composites การผสมสี
```js
var image = ee.Image('LANDSAT/LC09/C02/T1_L2/LC09_131047_20211212');

var vizParams = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'], 
  min: 5000, 
  max: 15000, 
  gamma: 1.3
};

Map.centerObject(image, 9);
Map.addLayer(image, vizParams, 'True color (432)');
```

การผสมแบบ false color
```js
var vizParams = {
  bands: ['B5', 'B4', 'B3'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
```

การทำ Masking
```js
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_131047_20211212');
var ndwi = image.normalizedDifference(['B4', 'B5']);
print(ndwi)
var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '3182bd']};

var ndwiMasked = ndwi.updateMask(ndwi.gte(0.01));
Map.addLayer(ndwiMasked, ndwiViz, 'NDWI masked');
```

การทำ Clipping
```js
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[98.96086111749729, 18.747358737778654],
          [99.04188528741916, 18.840963766169136],
          [99.19294729913791, 18.73695496936538],
          [99.28495779718479, 18.85655953980466],
          [99.01167288507541, 19.031911859615967],
          [98.83863821710666, 18.83966405296015]]]);
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_131047_20211212');
var ndvi = image.normalizedDifference(['B5', 'B3']);
var ndviViz = {min: 0.5, max: 1, palette: ['f7fcb9','addd8e','31a354']};
Map.addLayer(ndvi.clip(geometry), ndviViz, 'NDVI masked');
```

การเรียกดู Metadata 
```js 
var bandNames = image.bandNames();
print('Band names:', bandNames);

var properties = image.propertyNames();
print('Metadata properties:', properties);

var cloudiness = image.get('CLOUD_COVER');
print('CLOUD_COVER:', cloudiness);  
```

การทำ Expressions
```js
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_131047_20211212');
var ndvi = image.normalizedDifference(['B5', 'B3']);

var ndviViz = {min: -1, max: 1, palette: ['f7fcb9','addd8e','31a354']};

var evi = image.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': image.select('B5'),
      'RED': image.select('B4'),
      'BLUE': image.select('B2')
});

Map.centerObject(image, 9);
Map.addLayer(evi, ndviViz, "evi"); 
```

Image collections
ข้อมูลที่ถูกจัดเก็บใน google earth engine ส่วนใหญ่เป็น collections ประกอบด้วยด้วยชุดข้อมูลภาพที่มีหลายช่วงเวลา 
เราสามารถเข้าถึง collection ของข้อมูลได้จาก https://developers.google.com/earth-engine/datasets 
ซึ่งมีทั้งข้อมูลจาก Landsat MODIS และ Sentinel

```js
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
var vizParams = {
  bands: ['B4', 'B3', 'B2'], 
  min: 500, 
  max: 5000, 
  gamma: 1.3
};

Map.setCenter(98.986107,18.788300, 10);
Map.addLayer(dataset, vizParams, 'True Color (432)');
```

การทำ Filter
```js
.filterDate('2022-01-01', '2022-02-01')
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
.filter(ee.Filter.bounds(geometry))
.select('B.*')
```

การทำ Iterating 
```js
var dataset = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterDate('2022-01-01', '2022-02-01');

function scale(img){
    var b = img.select('SR_B.').multiply(0.0000275).add(-0.2);
    return img.addBands(b, null, true)
}

dataset=dataset.map(scale)

var vizParams = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'], 
  min: 0.0, 
  max: 0.3, 
  gamma: 1.3
};

Map.setCenter(98.986107,18.788300, 10);
Map.addLayer(dataset, vizParams, 'True Color (432)');
```

การทำ Reducetion
https://developers.google.com/earth-engine/guides/reducers_image_collection
```js
var dataset = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterDate('2022-01-01', '2022-02-01');

var median = dataset.reduce(ee.Reducer.median());
print(median)
var vizParams = {
  bands: ['SR_B5_median', 'SR_B4_median', 'SR_B3_median'], 
  min: 1000, 
  max: 65000, 
  gamma: 1.5
};

Map.setCenter(98.986107,18.788300, 10);
Map.addLayer(median, vizParams, 'True Color (432)');
```
