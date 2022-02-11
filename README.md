# การใช้งาน google earth engine
Earth Engine เป็นระบบบริการการประมวลผลข้อมูลภูมิสารสนเทศ (geospatial processing service) ที่พัฒนาโดย google เป็นคลังข้อมูลจากการสำรวจระยะไกลและชุดข้อมูลเชิงพื้นที่หลายเพตะไบต์
ที่สามารถวิเคราะห์ข้อมูลเชิงพื้นที่ขนาดใหญ่จากเครื่องมือประมลผลข้อมูลภูมิสารสนเทศบนระบบคลาวด์ เอื้อให้นักวิทยาศาสตร์ นักวิจัย และนักพัฒนาสามารถใช้ Earth Engine เพื่อตรวจจับการเปลี่ยนแปลง 
วิเคราะห์ข้อมูลเชิงปริมาณด้านต่างๆ ของพื้นผิวโลก Earth Engine เปิดให้ใช้งานในเชิงพาณิชย์แล้ว แต่ยังคงให้บริการฟรีสำหรับการใช้งานด้านวิชาการและการวิจัย

### การเข้าใช้งาน
Earth Engine สามารถเลือกใช้แบบภาษา Python หรือ JavaScript ซึ่งการทำงานแบบ JavaScript จะมี Code Editor ที่สามารถทำงานแบบ web-based บน browser เช่น google chrome 
โดยเข้าใช้งานได้ที่ [https://code.earthengine.google.com/](https://code.earthengine.google.com/) สำหรับผู้ที่เข้าใช้งานเป็นครั้งแรกต้องลงทะเบียนเพื่อขอเข้าใช้งานก่อน ซึ่งอาจใช้เวลา 1-2 วัน ในการอนุมัติ
![This is an image](./img/regis.png)
หน้าต่างให้ลงทะเบียนเพื่อขอให้งาน
![This is an image](./img/regis2.png)

### หน้าต่างการทำงาน
หลังจากที่ได้รับอนุมัติให้ใช้งานแล้ว เมื่อเข้าไปยัง [https://code.earthengine.google.com/](https://code.earthengine.google.com/) จะพบ Code Editor เพื่อใช้สำหรับทำงาน โดยมีเมนูใช้งานดังนี้
![This is an image](https://developers.google.com/earth-engine/images/Code_editor_diagram.png)
ที่มาของภาพ https://developers.google.com/earth-engine

### การเขียน JavaScript เบื้องต้น สำหรับ Earth Engine
JavaScript 
การประกาศตัวแปรของ JavaScript จะขึ้นต้น var โดยสามารถกำหนดตัวแปรเป็นประเภทต่างๆ ดังนี้
```js
// undefined
var x;
// Number
var length = 16; 
// String
var lastName = "Homhuan"; 
// Boolean
var isTrue = true; 
// Array
var array = [0,1,2,3,4,5,6,7,8,9]
// Object
var x = {
    firstName: "Sakda",
    lastName: "Homhuan"
}; 
```
การเขียนฟังก์ชันต้องระบุคำว่า function ก่อนเสมอ และระบุชื่อให้กับฟังก์ชั่นหลังก่อน () ซึ่งฟังก์ชั่นสามารถแบ่งออกเป็นแบบต้องการ parameter และแบบไม่ต้องการ parameter
การเขัยนฟังก์ชันแบบไม่ต้องการ parameter เขียนได้ ดังนี้
```js
function showMessage() {
    var firstName = "sakda"; 
    var lastName = "homhuan";
    alert(firstName + " " + lastName);
}
```

การเรียกใช้งานฟังก์ชันทำได้ ดังนี้
```js
showMessage();
```
ใช้ return หากต้องการค่ากลับคืนจากฟังก์ชัน ดังนี้
```js
function add(){
    return 1 + 2;
}
```
ทดลองการเรียกใช้งาน ดังนี้
```js
add();
```
เราสามารถกำหนดการใช้งานฟังก์ชันแบบตัวแปรได้ ดังนี้
```js
var addData = add();
console.log(addData);
```
การเขียนฟังก์ชันแบบต้องการ parameter
```js
function sum(a, b) {
    return a + b;
}
```
เรียกใช้งานฟังก์ชันแบบต้องการ parameter ดังนี้
```js
var result = sum(1, 2);
console.log(result); // 3
```

