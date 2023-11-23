### Table of content
* [การเข้าใช้งาน](./README.md)
* [กำทำงานของ google earth engine](./0_client_vs_server.md)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)
* [ตัวอย่าง export ไปใน google drive](./4_export.md)

## การเขียน JavaScriptเบื้องต้น
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](#การเขียน-JavaScript-เบื้องต้น-สำหรับ-Earth-Engine)
    * [การประกาศตัวแปร](#การประกาศตัวแปร)
    * [การเขียนฟังก์ชัน](#การเขียนฟังก์ชัน)
    * [การกำหนดเงื่อนไข](#การกำหนดเงื่อนไข)
    * [การทำซ้ำ](#การทำซ้ำ)


### การเขียน JavaScript เบื้องต้น สำหรับ Earth Engine
google ให้ใช้ JavaScript เขียนบน Code Editor รูปแบบการเขียน JavaScript ที่กูเกิ้ลแนะนำไว้ใน [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
ซึ่งไม่ครอบคลุมกับมาตรฐานของ JavaScript รุ่นใหม่ (ECMAScript(ES6,ES7,ES8,ES9)) บทความนี้ได้นำเอาตัวอย่างที่อาจนำมาใช้ได้กับ Earth Engine ดังนี้
#### การประกาศตัวแปร
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
#### การเขียนฟังก์ชัน
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
#### การกำหนดเงื่อนไข
ใช้คำสั่ง if เพื่อกำหนดเงื่อนไข
```js
if (year == 2020) {
    alert("That's correct!");
    alert("You're so smart!");
}
```
หากต้องการกำหนดเงื่อนไขเพิ่ม สามารถใช้ else if ดังนี้
```js
if (year < 2020) {
    alert('Too early...');
} else if (year > 2020) {
    alert('Too late');
} else {
    alert('Exactly!');
}
```
สามารถใช้ switch ในการกำหนดเงื่อนไข ได้ ดังนี้
```js
var a = 2 + 2;

switch (a) {
    case 3:
        alert('Too small');
        break;
    case 4:
        alert('Exactly!');
        break;
    case 5:
        alert('Too large');
        break;
    default:
        alert("I don't know such values");
}
```
#### การทำซ้ำ
สามารถใช้คำสั่ง while หรือ for เพื่อการทำซ้ำ (loop)


การใช้ “while” loop
```js
while (condition) {
  // ... loop body ...
}
// ตัวอย่าง
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
    alert(i);
    i++;
}
```
การใช้ “for” loop
```js
for (begin; condition; step) {
  // ... loop body ...
}
// ตัวอย่าง
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    alert(i);
}
```
การใช้ "for in" loop
```js
for (variable in array) {
  // ... loop body ...
}
// ตัวอย่าง
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let txt = "";
for (let x in numbers) {
  txt += numbers[x];
}
```

การใช้ map
```js
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
numbers.map(i=>console.log(i))
```
