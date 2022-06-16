print("hello")

image collections

ข้อมูลที่ถูกจัดเก็บใน google earth engine ส่วนใหญ่เป็น collections ประกอบด้วยด้วยชุดข้อมูลภาพที่มีหลายช่วงเวลา 
เราสามารถเข้าถึง collection ของข้อมูลได้จาก https://developers.google.com/earth-engine/datasets 
ซึ่งมีทั้งข้อมูลจาก Landsat MODIS และ Sentinel

```
var dataset = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterDate('2022-01-01', '2022-02-01');

// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}

dataset = dataset.map(applyScaleFactors);

var visualization = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};

Map.setCenter(18.788300, 98.986107, 8);

Map.addLayer(dataset, visualization, 'True Color (432)');
```