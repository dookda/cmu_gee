### Table of content
* [การเข้าใช้งาน](#การเข้าใช้งาน)
* [Client vs. Server](./0_client_vs_server.md)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)
* [ตัวอย่าง export ไปใน google drive](./4_export.md)
* [ตัวอย่าง การสร้าง UI](./5_ui.md)
* [ตัวอย่าง การทำงานกับข้อมูล Vector](./6_vector.md)

###
# การทำงานกับข้อมูล Vector
ใน Google Earth Engine (GEE) มีข้อมูล vector 3 แบบคือ `ee.Geometry`, `ee.Feature`, และ `ee.FeatureCollection` ซึ่งแตกต่างกันดังนี้:

### 1. ee.Geometry

- `ee.Geometry` เป็นประเภทข้อมูลที่แสดงถึงรูปทรงหรือรูปร่างทางภูมิศาสตร์เช่นจุด (Point), เส้น (LineString), และพื้นที่ (Polygon)
- ใช้สำหรับการกำหนดรูปร่างหรือพื้นที่ที่จะทำการวิเคราะห์ เช่น การกำหนดพื้นที่ที่จะตัดค่าข้อมูลจากอิมเมจหรือการกำหนดพื้นที่สำหรับการวิเคราะห์ทางสถิติ
- **ตัวอย่าง**:
    ```javascript
    var pointGeometry = ee.Geometry.Point([102.0, 15.0]);
    ```

### 2. ee.Feature

- `ee.Feature` คือออบเจ็กต์ที่ประกอบด้วย `ee.Geometry` พร้อมกับข้อมูลแอททริบิวต์ (Properties) นั่นคือ `ee.Feature` เป็นการผสมผสานระหว่างรูปทรงทางภูมิศาสตร์กับข้อมูลที่เกี่ยวข้อง
- ใช้สำหรับการจัดเก็บและการวิเคราะห์ข้อมูลที่มีทั้งข้อมูลทางภูมิศาสตร์และข้อมูลแอททริบิวต์ เช่น จุดของไฟป่าพร้อมกับข้อมูลเกี่ยวกับความรุนแรง
- **ตัวอย่าง**:
    ```javascript
    var feature = ee.Feature(ee.Geometry.Point([102.0, 15.0]), {name: 'Sample Point'});
    ```

### 3. ee.FeatureCollection

- `ee.FeatureCollection` เป็นชุดของ `ee.Feature` นั่นคือมันเป็นการรวมกลุ่มของออบเจ็กต์ที่มีทั้งรูปทรงภูมิศาสตร์และข้อมูลแอททริบิวต์
- ใช้สำหรับการจัดการกับชุดข้อมูลที่มีขนาดใหญ่ เช่น ชุดข้อมูลจุดที่มีตำแหน่งและข้อมูลของสถานีอุตุนิยมวิทยาหลายแห่ง
- **ตัวอย่าง**:
    ```javascript
    var points = ee.FeatureCollection([
      ee.Feature(ee.Geometry.Point([102.0, 15.0]), {name: 'Point 1'}),
      ee.Feature(ee.Geometry.Point([103.0, 16.0]), {name: 'Point 2'})
    ]);
    ```

การทำงานกับข้อมูล vector
... เดี๋ยวมาเขียนต่อ