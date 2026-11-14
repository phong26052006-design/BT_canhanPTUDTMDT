// Exercise 9.5 — Responding to Load Events
function outputBox(num){return '<div class="movingDiv" id="div'+num+'">This is div '+num+'</div>';}
window.addEventListener('load',function(){
    var divToGet=document.getElementById('div1');
    document.getElementById('exercise-result').textContent='load: '+divToGet.innerHTML;
    alert(divToGet.innerHTML);
});
