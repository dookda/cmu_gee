# การแนะนำ Google Earth Engine: การอบรมเชิงปฏิบัติอย่างครบถ้วน

ยินดีต้อนรับสู่การอบรมเชิงปฏิบัติการเกี่ยวกับ Google Earth Engine (GEE) บทเรียนนี้ถูกออกแบบมาเพื่อแนะนำคุณสู่พื้นฐานของ GEE โดยมีตัวอย่างการปฏิบัติเพื่อใช้ประโยชน์จากความสามารถในการวิเคราะห์ข้อมูลเชิงภูมิศาสตร์ที่ทรงพลัง

## สารบัญ

1. [การแนะนำ Google Earth Engine](#1-การแนะนำ-google-earth-engine)
2. [เริ่มต้นใช้งาน GEE](#2-เริ่มต้นใช้งาน-gee)
3. [การทำงานกับชุดข้อมูล](#3-การทำงานกับชุดข้อมูล)
4. [เทคนิคการแสดงผล](#4-เทคนิคการแสดงผล)
5. [การประมวลผลและวิเคราะห์ภาพ](#5-การประมวลผลและวิเคราะห์ภาพ)
6. [ข้อมูลเวกเตอร์และกลุ่มคุณลักษณะ](#6-ข้อมูลเวกเตอร์และกลุ่มคุณลักษณะ)
7. [การส่งออกข้อมูล](#7-การส่งออกข้อมูล)
8. [กรณีศึกษาและการประยุกต์ใช้](#8-กรณีศึกษาและการประยุกต์ใช้)
9. [หัวข้อขั้นสูง](#9-หัวข้อขั้นสูง)
10. [ทรัพยากรและการเรียนรู้เพิ่มเติม](#10-ทรัพยากรและการเรียนรู้เพิ่มเติม)

---

## 1. การแนะนำ Google Earth Engine

### Google Earth Engine คืออะไร?

Google Earth Engine เป็นแพลตฟอร์มบนคลาวด์สำหรับการวิเคราะห์ข้อมูลสิ่งแวดล้อมระดับดาวเคราะห์ มันรวมแคตตาล็อกขนาดใหญ่ของภาพถ่ายดาวเทียมและชุดข้อมูลเชิงภูมิศาสตร์กับความสามารถในการวิเคราะห์ระดับโลก ทำให้ผู้ใช้สามารถตรวจจับการเปลี่ยนแปลง แผนที่แนวโน้ม และหาปริมาณความแตกต่างบนพื้นผิวโลก

### การประยุกต์ใช้ GEE

- **การติดตามสิ่งแวดล้อม:** ติดตามการตัดไม้ทำลายป่า การกลายเป็นทะเลทราย และการเปลี่ยนแปลงการใช้ที่ดิน
- **การจัดการภัยพิบัติ:** วิเคราะห์พื้นที่ที่ได้รับผลกระทบจากน้ำท่วม ไฟไหม้ และพายุเฮอริเคน
- **การเกษตร:** ติดตามสุขภาพของพืช ประมาณการผลผลิต และจัดการทรัพยากร
- **การวางผังเมือง:** ศึกษาการขยายตัวของเมือง การพัฒนาสาธารณูปโภค และการแบ่งเขต
- **การศึกษาการเปลี่ยนแปลงสภาพภูมิอากาศ:** ประเมินผลกระทบ สร้างแบบจำลองสถานการณ์ และวางแผนกลยุทธ์การบรรเทา

### ภาพรวมของอินเทอร์เฟซ GEE

- **Code Editor:** อินเทอร์เฟซหลักสำหรับการเขียนและรันสคริปต์
- **Console:** แสดงผลลัพธ์จากคำสั่ง `print` และข้อความข้อผิดพลาด
- **Inspector:** อนุญาตให้คุณคลิกบนแผนที่เพื่อตรวจสอบค่าพิกเซล
- **Map Display:** แสดงชั้นข้อมูลเชิงภูมิศาสตร์

[กลับสู่สารบัญ](#สารบัญ)

---

## 2. เริ่มต้นใช้งาน GEE

### การเข้าถึง GEE

1. **สมัครใช้งาน:** ไปที่ [หน้าสมัคร Google Earth Engine](https://earthengine.google.com/signup/) และลงทะเบียนด้วยบัญชี Google ของคุณ
2. **การอนุมัติ:** รอการอนุมัติ ซึ่งปกติจะใช้เวลาสองสามวัน
3. **เข้าถึง Code Editor:** เมื่อได้รับการอนุมัติ ไปที่ [GEE Code Editor](https://code.earthengine.google.com/)

### การนำทางใน Code Editor

![แผนภาพ Code Editor](https://developers.google.com/static/earth-engine/images/Code_editor_diagram.png)

- **แท็บ Scripts:** จัดการและจัดระเบียบสคริปต์ของคุณ
- **แท็บ Docs:** เข้าถึงเอกสาร ตัวอย่าง และข้อมูลชุดข้อมูล
- **แท็บ Assets:** ดูและจัดการชุดข้อมูลที่คุณอัปโหลด

### การแนะนำ JavaScript API

- GEE ใช้ JavaScript เป็นหลักสำหรับการสคริปต์ใน Code Editor
- การมีความเข้าใจพื้นฐานเกี่ยวกับไวยากรณ์ JavaScript จะเป็นประโยชน์
- ฟังก์ชัน GEE มีคำนำหน้า `ee` แสดงถึงอ็อบเจ็กต์ Earth Engine

[กลับสู่สารบัญ](#สารบัญ)

---

## 3. การทำงานกับชุดข้อมูล

### การสำรวจคลังข้อมูล

- เข้าถึง [คลังข้อมูล GEE](https://developers.google.com/earth-engine/datasets/) สำหรับรายการชุดข้อมูลที่มีอยู่ครบถ้วน
- ชุดข้อมูลรวมถึงภาพถ่ายดาวเทียม (เช่น Landsat, Sentinel) ข้อมูลสภาพอากาศ ข้อมูลภูมิประเทศ และอื่น ๆ

### การนำเข้าชุดข้อมูล

#### ภาพและกลุ่มภาพ

- **Image (ภาพ):** ภาพราสเตอร์เดี่ยว
- **Image Collection (กลุ่มภาพ):** ชุดของภาพ (เช่น ภาพทั้งหมดจาก Landsat 8)

**ตัวอย่าง: การนำเข้ากลุ่มภาพ Landsat 8**

```javascript
var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
```

#### กลุ่มคุณลักษณะ

- ชุดข้อมูลเวกเตอร์ที่มีคุณลักษณะทางเรขาคณิตและคุณสมบัติที่เกี่ยวข้อง

**ตัวอย่าง: การนำเข้าชุดข้อมูลประเทศทั่วโลก**

```javascript
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
```

### การกรองและเลือกข้อมูล

- **การกรองเชิงพื้นที่:** ใช้ `.filterBounds(geometry)` เพื่อเลือกข้อมูลภายในพื้นที่
- **การกรองตามเวลา:** ใช้ `.filterDate('YYYY-MM-DD', 'YYYY-MM-DD')` เพื่อเลือกข้อมูลภายในช่วงวันที่

**ตัวอย่าง: การกรองภาพ Landsat ในพื้นที่และช่วงเวลา**

```javascript
var geometry = ee.Geometry.Point([100.5018, 13.7563]); // พิกัดกรุงเทพฯ
var filteredCollection = landsat8
  .filterBounds(geometry)
  .filterDate('2020-01-01', '2020-12-31');
```

[กลับสู่สารบัญ](#สารบัญ)

---

## 4. เทคนิคการแสดงผล

### การแสดงข้อมูลบนแผนที่

- ใช้ `Map.addLayer(image, visParams, 'ชื่อชั้นข้อมูล')` เพื่อแสดงข้อมูล

**ตัวอย่าง: การแสดงภาพสีจริง**

```javascript
var image = filteredCollection.first();
Map.centerObject(geometry, 12);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'True Color');
```

### การใช้พารามิเตอร์การแสดงผล

- **Bands (แถบสี):** ระบุแถบสีที่จะแสดง
- **Min/Max:** กำหนดช่วงการแสดงผลสำหรับค่าพิกเซล
- **Palette:** กำหนดจานสีสำหรับภาพที่มีแถบสีเดียว

**ตัวอย่าง: การแสดง NDVI ด้วยจานสี**

```javascript
var ndvi = image.normalizedDifference(['B5', 'B4']);
Map.addLayer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
```

### การสร้างคำอธิบายสี (Legend)

- แม้ว่า GEE จะไม่มีฟังก์ชันสร้างคำอธิบายสีในตัว แต่คุณสามารถสร้างคำอธิบายสีแบบกำหนดเองโดยใช้โมดูล `ui`

[กลับสู่สารบัญ](#สารบัญ)

---

## 5. การประมวลผลและวิเคราะห์ภาพ

### การคำนวณดัชนี (เช่น NDVI)

- **ดัชนีพืชพรรณแตกต่างปกติ (NDVI):** บ่งชี้สุขภาพของพืชพรรณ

**ตัวอย่าง: การคำนวณ NDVI**

```javascript
var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
```

### การกรองเมฆ

- ใช้แถบการประเมินคุณภาพเพื่อระบุและกรองเมฆ

**ตัวอย่าง: ฟังก์ชันการกรองเมฆสำหรับ Landsat 8**

```javascript
function maskL8sr(image) {
  var qa = image.select('pixel_qa');
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

var cloudFreeCollection = filteredCollection.map(maskL8sr);
```

### การวิเคราะห์อนุกรมเวลา

- วิเคราะห์การเปลี่ยนแปลงตามเวลาผ่านการแมปฟังก์ชันบนกลุ่มภาพ

**ตัวอย่าง: การสร้างกราฟอนุกรมเวลา NDVI**

```javascript
var ndviCollection = cloudFreeCollection.map(function(img) {
  var ndvi = img.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return ndvi.set('system:time_start', img.get('system:time_start'));
});

var chart = ui.Chart.image.series({
  imageCollection: ndviCollection,
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 30
}).setOptions({title: 'NDVI Time Series'});

print(chart);
```

[กลับสู่สารบัญ](#สารบัญ)

---

## 6. ข้อมูลเวกเตอร์และกลุ่มคุณลักษณะ

### การสร้างและนำเข้าข้อมูลเวกเตอร์

- **เครื่องมือการวาด:** ใช้เครื่องมือการวาดใน Code Editor เพื่อสร้างเรขาคณิต
- **การนำเข้าไฟล์ Shapefile:** อัปโหลดไฟล์ Shapefile ไปยังสินทรัพย์ของคุณเพื่อใช้ในสคริปต์

**ตัวอย่าง: การสร้างเรขาคณิตรูปหลายเหลี่ยม**

```javascript
var polygon = ee.Geometry.Polygon([
  [[100.495, 13.756], [100.495, 13.752],
   [100.501, 13.752], [100.501, 13.756]]
]);
```

### การดำเนินการเชิงพื้นที่

- **การกรองคุณลักษณะ:** เลือกคุณลักษณะที่อยู่ภายในพื้นที่เฉพาะ
- **การรวมเชิงพื้นที่:** รวมชุดข้อมูลตามความสัมพันธ์เชิงพื้นที่

### การลดพื้นที่

- รวมข้อมูลในพื้นที่โดยใช้ตัวลด

**ตัวอย่าง: การคำนวณค่าเฉลี่ย NDVI ในรูปหลายเหลี่ยม**

```javascript
var meanNdvi = ndvi.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: polygon,
  scale: 30,
  maxPixels: 1e9
});

print('Mean NDVI:', meanNdvi.get('NDVI'));
```

[กลับสู่สารบัญ](#สารบัญ)

---

## 7. การส่งออกข้อมูล

### การส่งออกภาพ

- ใช้ `Export.image.toDrive()` เพื่อบันทึกภาพไปยัง Google Drive

**ตัวอย่าง: การส่งออกภาพ NDVI**

```javascript
Export.image.toDrive({
  image: ndvi.clip(polygon),
  description: 'NDVI_Image',
  folder: 'GEE_Exports',
  fileNamePrefix: 'ndvi_image',
  scale: 30,
  region: polygon,
  maxPixels: 1e9
});
```

### การส่งออกกลุ่มคุณลักษณะ

- ใช้ `Export.table.toDrive()` เพื่อส่งออกข้อมูลเวกเตอร์

**ตัวอย่าง: การส่งออกกลุ่มคุณลักษณะ**

```javascript
Export.table.toDrive({
  collection: countries.filterBounds(geometry),
  description: 'Countries_Export',
  fileFormat: 'CSV'
});
```

### การส่งออกกราฟและตาราง

- สามารถดาวน์โหลดกราฟได้ด้วยตนเองจากอินเทอร์เฟซ Code Editor
- ตารางสามารถส่งออกในรูปแบบ CSV, SHP หรือ GeoJSON

[กลับสู่สารบัญ](#สารบัญ)

---

## 8. กรณีศึกษาและการประยุกต์ใช้

### การติดตามการตัดไม้ทำลายป่า

- วิเคราะห์การเปลี่ยนแปลงของพื้นที่ป่าโดยใช้ข้อมูลอนุกรมเวลา
- ระบุพื้นที่การตัดไม้ทำลายป่าโดยใช้เทคนิคการกำหนดเกณฑ์

**ตัวอย่าง: การตรวจจับการสูญเสียป่าไม้**

```javascript
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2020_v1_8');
var lossImage = hansenImage.select('lossyear').gt(0);
Map.addLayer(lossImage.updateMask(lossImage), {palette: ['red']}, 'Forest Loss');
```

### การวิเคราะห์การขยายตัวของเมือง

- ใช้อัลกอริทึมการจำแนกเพื่อทำแผนที่พื้นที่เมือง
- ติดตามรูปแบบการเติบโตของเมืองตามเวลา

### การจัดการทรัพยากรน้ำ

- ทำแผนที่แหล่งน้ำโดยใช้ดัชนีเช่น ดัชนีความแตกต่างของน้ำปกติ (NDWI)
- ติดตามการเปลี่ยนแปลงของพื้นที่น้ำเนื่องจากการเปลี่ยนแปลงตามฤดูกาลหรือการเปลี่ยนแปลงสภาพภูมิอากาศ

[กลับสู่สารบัญ](#สารบัญ)

---

## 9. หัวข้อขั้นสูง

### ฟังก์ชันกำหนดเองและการแมปบนกลุ่มภาพ

- **ฟังก์ชันกำหนดเอง:** กำหนดฟังก์ชันที่ใช้ซ้ำได้สำหรับการประมวลผล
- **การแมปฟังก์ชัน:** ใช้ฟังก์ชันกับแต่ละองค์ประกอบในกลุ่ม

**ตัวอย่าง: การใช้ฟังก์ชันบนกลุ่มภาพ**

```javascript
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};

var collectionWithNDVI = cloudFreeCollection.map(addNDVI);
```

### การเรียนรู้ของเครื่องใน GEE

- ใช้การจำแนกแบบมีผู้สอนและไม่มีผู้สอน
- ใช้อัลกอริทึมเช่น Random Forest, CART และ SVM

**ตัวอย่าง: การจำแนกประเภทการใช้ที่ดิน**

```javascript
// ข้อมูลการฝึกอบรมจะถูกกำหนดที่นี่
var trainedClassifier = ee.Classifier.smileRandomForest(10).train(trainingData, 'landcover', bands);
var classifiedImage = image.classify(trainedClassifier);
Map.addLayer(classifiedImage, {min: 0, max: 5, palette: ['red', 'green', 'blue', 'yellow', 'purple', 'cyan']}, 'Classified Image');
```

### การรวมกับ Python API

- ใช้ [Earth Engine Python API](https://developers.google.com/earth-engine/python_install) สำหรับเวิร์กโฟลว์ขั้นสูง
- รวมกับไลบรารี Python อื่น ๆ เช่น TensorFlow และ Pandas

[กลับสู่สารบัญ](#สารบัญ)

---

## 10. ทรัพยากรและการเรียนรู้เพิ่มเติม

- **เอกสารทางการ:** [GEE Developers Guide](https://developers.google.com/earth-engine)
- **บทเรียนและตัวอย่าง:** [GEE Tutorials](https://developers.google.com/earth-engine/tutorials)
- **ฟอรัมชุมชน:** [GEE Developers Forum](https://groups.google.com/g/earthengine-developers)
- **ตัวอย่างใน Code Editor:** เข้าถึงตัวอย่างที่มีอยู่ใน Code Editor ภายใต้แท็บ **Scripts**

### คำแนะนำสำหรับการฝึกฝน

- **โครงการปฏิบัติ:** ลองทำการศึกษา或วิเคราะห์ที่เกี่ยวข้องกับความสนใจของคุณ
- **เข้าร่วมสัมมนาออนไลน์และเวิร์กช็อป:** เข้าร่วมกิจกรรมออนไลน์เพื่อเรียนรู้จากผู้เชี่ยวชาญ
- **ร่วมมือกัน:** มีส่วนร่วมกับชุมชน GEE เพื่อแบ่งปันความรู้และทรัพยากร

[กลับสู่สารบัญ](#สารบัญ)

---

## สรุป

การอบรมเชิงปฏิบัติการนี้ได้ให้ภาพรวมของความสามารถของ Google Earth Engine ตั้งแต่การจัดการข้อมูลพื้นฐานไปจนถึงเทคนิคการวิเคราะห์ขั้นสูง ด้วยการฝึกฝนและการสำรวจ คุณสามารถใช้ GEE เพื่อแก้ปัญหาเชิงภูมิศาสตร์ที่ซับซ้อนและให้ข้อมูลเชิงลึกที่มีคุณค่าในสาขาของคุณ

---

หากคุณมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติมเกี่ยวกับ GEE โปรดอย่าลังเลที่จะติดต่อเรา!