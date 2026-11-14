// Exercise 9.1 — Basic DOM Selection
var msg=document.getElementById('msgArea');
msg.value='here is some text';
document.getElementById('pageTitle').innerHTML='Even newer title';
var originalHTML=document.getElementById('first').innerHTML;
var originalText=document.getElementById('first').innerText;
console.log('innerHTML:',originalHTML,'innerText:',originalText);
console.log('class:',msg.getAttribute('class'));
document.getElementsByTagName('textarea')[0].value='selected by tag name';
var spans=document.getElementsByTagName('span');
for(var i=0;i<spans.length;i++)msg.value+='\n'+spans[i].innerText;
var counts=document.getElementsByClassName('count-number');
msg.value='';
for(var i=0;i<counts.length;i++)msg.value+='\n'+counts[i].innerText;
var ps=document.querySelector('#first p');
console.log('querySelector:',ps.innerHTML);
var allPs=document.querySelectorAll('#first p');
console.log('querySelectorAll count:',allPs.length);
// Trạng thái cuối theo bước 13–14.
msg.setAttribute('class','hidden');
document.getElementById('features').style.backgroundColor='green';
document.getElementById('exercise-result').textContent='Đã chọn '+counts.length+' count-number; textarea ẩn; features đổi nền xanh.';
