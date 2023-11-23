### Table of content
* [การเข้าใช้งาน](#การเข้าใช้งาน)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)
* [ตัวอย่าง export ไปใน google drive](./4_export.md)

## ตัวอย่าง export ไปใน google drive

เลือกข้อมูลต้องการส่งออกจาก GEE โดยใช้ ee.Image หรือ ee.ImageCollection 
```js
var startDate = '2023-01-01';
var endDate = '2023-03-31';
// เลือกภาพ Sentinel-2 จาก ImageCollection    
var images = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterDate(startDate, endDate) 
    .filterBounds(geometry);
```

เลือกพื้นที่ศึกษาโดยใช้เมธอด clip() เพื่อให้ไฟล์ไม่ใหญ่มาก
```js
// สร้าง polygon พื้นที่ศึกษาของเรา 
var geometry =  ee.Geometry.Polygon(
        [[[98.7133550571096, 19.086090280538922],
          [98.7133550571096, 18.519291323359845],
          [99.2626714633596, 18.519291323359845],
          [99.2626714633596, 19.086090280538922]]], null, false);
 
var clipImage = images.median().clip(geometry)
```

สร้างตัวแปรสำหรับกำหนดพารามิเตอร์ 
```js
// กำหนดพารามิเตอร์สำหรับการส่งออก
var exportParams = {
  image: clipImage, // รูปภาพที่ต้องการส่งออก
  description: 'sentinel_2_export', // ชื่อไฟล์ที่จะสร้างใน Google Drive
  scale: 10, // ขนาดของพิกเซล (meters per pixel)
  region: geometry, // พื้นที่ที่สนใจ (geometry คือขอบเขตพื้นที่)
  maxPixels: 1e13 // จำนวนพิกเซลสูงสุดที่อนุญาต
};

// ส่งออกภาพไปยัง Google Drive
Export.image.toDrive(exportParams);
```