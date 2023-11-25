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
# การสร้าง UI ใน earth engine
เราสามารถใช้ ee.ui ใน Google Earth Engine เพื่อสร้างส่วนติดต่อผู้ใช้ (User Interface - UI)  ใน ee.ui มีวิดเจ็ตต่างๆ เช่น ปุ่ม (Buttons), แผงควบคุม (Panels), แถบเลื่อน (Sliders), ป้ายกำกับ (Labels), แผนภูมิ (Charts) และอื่นๆ ให้เราได้ใช้งาน มาดูตัวอย่างกัน

เราสามารถสร้างปุ่มด้วย `ui.Button()`
```js
// สร้างฟังก์ชันไว้รอ event คลิ๊ก
function onclick(){
  print("a");
}
// การสร้างใช้ปุ่ม 
var btn = ui.Button("หวัดดี");
btn.onClick(onclick);
Map.add(btn);
```

เราสามารถสร้างตัวเลือกวันที่ด้วย `ui.DateSlider()`
```js
// สร้างฟังก์ชันไว้รอ event เมื่อมีการเลือกวันที่
function getdate(){
  var a = dateSlider.getValue();
  // แสดงวันที่แบบ unix timestamp ค่อยแปลงเป็นวันที่ด้วย ee.Date() 
  print(a);
}

// การใช้ date slide
var dateSlider = ui.DateSlider();
dateSlider.onChange(getdate);
Map.add(dateSlider);
```

เราสามารถสร้างกราฟด้วย `ui.Chart()`
```js
// เลือกข้อมูลภาพจาก ImageCollection
var s2 = ee.ImageCollection("COPERNICUS/S2_SR")
          .filterDate("2023-01-01", "2023-03-30")

// sampling point ของเรา
var geom = ee.Geometry.Point([99.0493, 18.7853]);

// การสร้าง chart
var chart = ui.Chart.image.series({
  imageCollection: s2.select('B4'), 
  region: geom, 
  reducer: ee.Reducer.mean(), 
  scale:30
})

// กำหนดการแสดงผล
chart.style().set('width', '200px');

// แสดงผลใน map
Map.add(chart);
// แสดงผลใน console
print(chart);
```

เราสามารถสร้าง drop down list ด้วย `ui.Select()`
```js
// เขียนฟังก์ชันไว้รอเมื่อมีการเลือก drop down 
function onSelected(e){
  print(e)
}
// สร้าง drop down 
var select = ui.Select({
  items: ["apple","banana","cherry"],
  value: "banana" //selected
});

select.onChange(onSelected)

Map.add(select);
```

เราสามารถสร้าง checkbox ด้วย `ui.Checkbox()`
```js
// เขียนฟังก์ชันไว้รอเมื่อมีคลิ๊กที่ checkbox 
function onChange(e){
  print(e)
}
// สร้าง checkbox 
var chkAnt = ui.Checkbox({
  label: "ant",
  value: 0,
});

var chkBat = ui.Checkbox({
  label: "bat",
  value: 1 //checked
});

chkAnt.onChange(onChange);

Map.add(chkAnt);
Map.add(chkBat);
```

เราสามารถสร้าง panel ด้วย `ui.Panel()`
```js
// การใช้ panel
var panel = ui.Panel({
  widgets: [chkAnt, chkBat], // ใส่ ui ที่ต้องการแสดง ในที่นี้คือเอา checkbox มาใส่
  style: {
    padding: '0px',
    color: 'green'
  }
});

Map.add(panel);
```

เราสามารถสร้างแผนที่น้อยๆ ด้วย `ui.Map()`
```js
// เขียนฟังก์ชันรอเรียกใช้งานเมื่อมีการคลิ๊กลงบนแผนที่
function onMapclick(e){
  print(e)
}
// สร้าง ui.Map
var map = ui.Map();
map.onClick(onMapclick);
Map.add(map);
```


        

