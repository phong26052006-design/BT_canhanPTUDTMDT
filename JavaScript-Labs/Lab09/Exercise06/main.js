// Exercise 9.6 — Debugging Events
function outputBox(num){return '<div class="movingDiv" id="div'+num+'">This is div '+num+'</div>';}
window.addEventListener('load',function(){
    var divs=document.querySelectorAll('.movingDiv');
    for(var i=0;i<divs.length;i++)divs[i].addEventListener('mouseover',function(e){
        var triggeredBy=e.target.id;
        document.getElementById('exercise-result').textContent='triggered by '+triggeredBy+' | event.type='+e.type;
        console.log('triggered by '+triggeredBy,e);
        // Mở DevTools Sources: bật Pause on debugger statements để dừng tại đây.
        debugger;
    });
});
