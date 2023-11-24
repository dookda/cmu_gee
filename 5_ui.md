### Table of content
* [การเข้าใช้งาน](#การเข้าใช้งาน)
* [Client vs. Server](./0_client_vs_server.md)
* [การเขียน JavaScriptเบื้องต้น สำหรับ Earth Engine](./1_JavaScript.md)
* [การใช้ Earth Engine เบื้องต้น](./2_GEE_basic.md)
* [ตัวอย่าง การจำแนกข้อมูลภาพ (Classification)](./3_Classification.md)
* [ตัวอย่าง export ไปใน google drive](./4_export.md)
* [ตัวอย่าง การสร้าง UI](./5_ui.md)

###
# การสร้าง UI ใน earth engine
เราสามารถใช้ ee.ui ใน Google Earth Engine เพื่อสร้างส่วนติดต่อผู้ใช้ (User Interface - UI)  ใน ee.ui มีวิดเจ็ตต่างๆ เช่น ปุ่ม (Buttons), แผงควบคุม (Panels), แถบเลื่อน (Sliders), ป้ายกำกับ (Labels), แผนภูมิ (Charts) และอื่นๆ ให้เราได้ใช้งาน มาดูตัวอย่างกันใช้งาน

```js
// การสร้างใช้ปุ่ม 
function onclick(){
  print("a");
}

var btn = ui.Button("aa");
btn.onClick(onclick);
Map.add(btn);
```

```js
// การใช ้date slide
function getdate(){
  var a = dateSlider.getValue();
  print(a);
}

var dateSlider = ui.DateSlider();
dateSlider.onChange(getdate);
Map.add(dateSlider);
```


```js
// การสร้าง chart
var s2 = ee.ImageCollection("COPERNICUS/S2_SR")
          .filterDate("2023-01-01", "2023-03-30")
          
var chart = ui.Chart.image.series({
  imageCollection: s2.select('B4'), 
  region: geom, 
  reducer: ee.Reducer.mean(), 
  scale:30
})

chart.style().set('width', '200px');

Map.add(chart);
// print(chart);
```


```js
// การใช้ drop down 
function onSelected(e){
  print(e)
}

var select = ui.Select({
  items: ["apple","banana","cherry"],
  value: "banana" //selected
});

select.onChange(onSelected)

Map.add(select);
```


```js
// การใช้ checkbox 
function onChange(e){
  print(e)
}

var chkAnt = ui.Checkbox({
  label: "ant",
  value: 0,
});

var chkBat = ui.Checkbox({
  label: "bat",
  value: 1 //checked
});

chkAnt.onChange(onChange);

// Map.add(chkAnt);
// Map.add(chkBat);
```


```js
// การใช้ panel
var panel = ui.Panel({
  widgets: [chkAnt, chkBat],
  style: {
    padding: '0px',
    color: 'green'
  }
});

Map.add(panel);
```


```js
// ui.Map
function onMapclick(e){
  print(e)
}

var map = ui.Map();
map.onClick(onMapclick);
Map.add(map);
```

```js
// add to map
var visParams = {
  band: ['B4', 'B3', 'B2'],
  max: 3500
}

Map.addLayer(s2.median(), visParams, "s2", 1)
Map.centerObject(geom, 12)  
```
        

