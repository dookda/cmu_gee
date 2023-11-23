### Table of content
* [การเข้าใช้งาน](./README.md)
* [Client vs. Server](./0_client_vs_server.md)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)
* [ตัวอย่าง export ไปใน google drive](./4_export.md)


### 
Earth Engine มีการทำงานทั้งฝั่ง ไคลเอนต์ (client-side) และฝั่ง ฝั่งเซิร์ฟเวอร์ (server-side) การแยกความแตกต่างของทำงานฝั่งไคลเอนต์และฝั่งเซิร์ฟเวอร์มีความสำคัญมากต่อการประมวลผลและการวิเคราะห์ข้อมูล Earth Engine client libraries ทั้งใน JavaScript และ Python จะทำหน้าที่แปลงการวิเคราะห์ทางภูมิศาสตร์ไปเป็นคำสั่งแล้วส่งไปให้ Earth Engine ทำงาน โค้ดที่เราเขียนอาจจะมีการผสมกันระหว่างการใช้ object หรือ primitives ของ JavaScript (ทำงานใน client-side) และ Earth Engine object (ทำงานใน server-side) การจัดการหรือใช้งาน Earth Engine object ทำได้ผ่าน "proxy objects" ซึ่งเราสามารถสังเกตุได้จากโค้ดที่มีคำนำหน้าด้วย ee

1. **Client vs. Server Objects (ออบเจ็คต์ของไคลเอนต์และเซิร์ฟเวอร์)**: Earth Engine ใช้ไลบรารีของไคลเอนต์ใน JavaScript และ Python เพื่อแปลงการวิเคราะห์ทางภูมิศาสตร์ที่ซับซ้อนเป็นคำขอไปยังเซิร์ฟเวอร์ ออบเจ็คต์ฝั่งเซิร์ฟเวอร์ถูกจัดการผ่าน "proxy objects" ซึ่งสามารถระบุได้จากคำนำหน้า `ee`. ตัวอย่างเช่น, `ee.String('text')` สร้างสตริงฝั่งเซิร์ฟเวอร์ด้วยออบเจ็คต์ proxy ฝั่งไคลเอนต์ [source](https://developers.google.com/earth-engine/guides/client_server)

ตัวอย่าง :
```javascript
// สร้างสตริงฝั่งไคลเอนต์ (ไม่ใช่ออบเจ็คต์ proxy)
var clientString = 'I am a String';
print(typeof clientString);  // ประเภท: string

// สร้างสตริงฝั่งเซิร์ฟเวอร์ (ออบเจ็คต์ proxy)
var serverString = ee.String('I am not a String!');
print(typeof serverString);  // ประเภท: object
print('Is this an EE object?',
    serverString instanceof ee.ComputedObject);  // true

// การแสดงผลของออบเจ็คต์ proxy
print(serverString);  // I am not a String
```
ในตัวอย่างนี้, `clientString` เป็นออบเจ็คต์ JavaScript ธรรมดาบนไคลเอนต์, ในขณะที่ `serverString` เป็นออบเจ็คต์ proxy ที่แทนข้อมูลบนเซิร์ฟเวอร์

2. **Efficiency and Best Practices (ประสิทธิภาพและแนวปฏิบัติที่ดี)**: เราควรหลีกเลี่ยงการประมวลผลข้อมูลบนเบราว์เซอร์ของเราเพราะมีประสิทธิภาพน้อยกว่าการใช้ Earth Engine ให้ทำงานบนเซิร์ฟเวอร์ 

ตัวอย่างโค้ดภาษา JavaScript:
```javascript
// การสร้างรายการฝั่งไคลเอนต์และแปลงเป็นออบเจ็คต์ฝั่งเซิร์ฟเวอร์
var clientList = [1, 2, 3, 4];
var serverList = ee.List(clientList);

// ทำความเข้าใจว่าการประมวลผลฝั่งไคลเอนต์จะใช้ทรัพยากรของเครื่องผู้ใช้
// ในขณะที่การประมวลผลฝั่งเซิร์ฟเวอร์ทำงานบนเซิร์ฟเวอร์ของ Google Earth Engine
```
จากตัวอย่างข้างบน `clientList` ถูกสร้างขึ้นฝั่งไคลเอนต์ (บนเครื่องของเรา) และจากนั้นถูกแปลงเป็นออบเจ็คต์ฝั่งเซิร์ฟเวอร์ชื่อ `serverList` 

3. **Looping and Conditionals (การวนซ้ำและเงื่อนไข)**: ฟังก์ชัน JavaScript เช่น for-loops และเงื่อนไขไม่สามารถทำงานโดยตรงกับ Earth Engine object (เช่น `ee.Thing`) เพราะว่าไคลเอนต์ไม่รู้จักข้อมูลของออบเจ็คต์เหล่านี้ ดังนั้นเราต้องใช้ฟังก์ชันฝั่งเซิร์ฟเวอร์ เช่น `map()`. ตัวอย่างเช่น, `ee.List.sequence(0, 7).map(function(n) { return ee.Number(n).add(1); })` 

ตัวอย่าง :
```javascript
// ไม่แนะนำ: การวนซ้ำฝั่งไคลเอนต์
var clientList = [];
for(var i = 0; i < 8; i++) {
  clientList.push(i + 1);
}
print(clientList);

// แนะนำ: การทำแมปปิ้งฝั่งเซิร์ฟเวอร์
var serverList = ee.List.sequence(0, 7);
serverList = serverList.map(function(n) {
  return ee.Number(n).add(1);
});
print(serverList);
```
จากตัวอย่าง เป็นการวนซ้ำฝั่งไคลเอนต์ใช้ loop ปกติของ JavaScript ในขณะที่การวนซ้ำฝั่งเซิร์ฟเวอร์ใช้ฟังก์ชัน `map()` ของ Earth Engine

4. **Server-side Conditionals (เงื่อนไขฝั่งเซิร์ฟเวอร์)**: ออบเจ็คต์ฝั่งเซิร์ฟเวอร์ไม่สามารถทำงานร่วมกับฟังก์ชันฝั่งไคลเอนต์ได้เหมือนกัน ]ลองดูตัวแปร Boolean ฝั่งเซิร์ฟเวอร์ จากตัวอย่าง:
```javascript
// ตัวแปร Boolean ฝั่งเซิร์ฟเวอร์
var myList = ee.List([1, 2, 3]);
var serverBoolean = myList.contains(5);
print(serverBoolean);  // false

// การใช้งานเงื่อนไขที่ไม่แนะนำ: เงื่อนไขฝั่งไคลเอนต์
var clientConditional;
if (serverBoolean) {
  clientConditional = true;
} else {
  clientConditional = false;
}
print('Should be false:', clientConditional);  // True!

// การใช้งานเงื่อนไขที่แนะนำ: เงื่อนไขฝั่งเซิร์ฟเวอร์
var serverConditional = ee.Algorithms.If(serverBoolean, 'True!', 'False!');
print('Should be false:', serverConditional);  // False!
```
ในตัวอย่างนี้, `serverBoolean` เป็นตัวแปร Boolean ฝั่งเซิร์ฟเวอร์ ซึ่งไม่สามารถใช้ในเงื่อนไขฝั่งไคลเอนต์ได้โดยตรง แต่ควรใช้ฟังก์ชันฝั่งเซิร์ฟเวอร์ เช่น `ee.Algorithms.If()` สำหรับการตรวจสอบเงื่อนไข

5. **Client and Server Functions (ฟังก์ชันฝั่งไคลเอนต์และเซิร์ฟเวอร์)**: การแยกแยะออบเจ็คต์และฟังก์ชันใดเป็นฝั่งไคลเอนต์และฝั่งเซิร์ฟเวอร์ดูได้จากโค้ด ที่เริ่มต้นด้วย ee เช่น `ee.Thing` และฟังก์ชันใดที่อยู่บนออบเจ็คต์นั้น เช่น `ee.Thing.method()` เป็นฟังก์ชันฝั่งเซิร์ฟเวอร์ ในทางกลับกัน, คลาสใด ๆ ในเอกสารอ้างอิงของ Code Editor ที่ไม่ได้เริ่มต้นด้วย `ee` เป็นฝั่งไคลเอนต์ด้วย ตัวอย่างรวมถึง `print()`, `Map`, `Export`, และ `Chart` ออบเจ็คต์และฟังก์ชันที่ปรากฏในเอกสารอ้างอิง JavaScript จะเป็นฝั่งไคลเอนต์

ตัวอย่างโค้ดภาษา JavaScript:
```javascript
// ฟังก์ชันฝั่งไคลเอนต์
var clientString = 'This is a client-side string.';
print(clientString); // แสดงผลบน Console ของเบราว์เซอร์

// ฟังก์ชันฝั่งเซิร์ฟเวอร์
var serverString = ee.String('This is a server-side string.');
print(serverString); // แสดงผลผ่านฟังก์ชัน print ของ Earth Engine
```
ในตัวอย่างนี้, `clientString` ถูกจัดการโดยฟังก์ชันฝั่งไคลเอนต์ `print()`, ในขณะที่ `serverString` ถูกจัดการโดยฟังก์ชันฝั่งเซิร์ฟเวอร์ของ Earth Engine.