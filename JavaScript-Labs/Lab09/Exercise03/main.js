// Exercise 9.3 — Modifying the DOM
var first=document.getElementById('first');
var text=document.createTextNode('this is programmatically created');
var p=document.createElement('p');
p.id='created-paragraph';p.appendChild(text);first.appendChild(p);
var icons=document.getElementById('iconList');
icons.removeChild(document.getElementById('deleteThisOne'));
document.getElementById('exercise-result').textContent='Đã thêm một đoạn văn và xóa li có id deleteThisOne.';
