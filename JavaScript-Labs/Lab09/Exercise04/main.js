// Exercise 9.4 — Simple Event Handling
var btn=document.getElementById('testButton');
var content=document.getElementById('content');
var timer;
function simpleHandler(event) {
    clearTimeout(timer); // Không để lần bấm trước ghi đè trạng thái mới.
    if(btn.textContent==='Hide') {
        btn.textContent='Show';content.className='makeItDisappear';
        timer=setTimeout(function(){content.style.display='none';},1000);
    } else {
        btn.textContent='Hide';content.style.display='block';
        timer=setTimeout(function(){content.className='makeItNormal';},50);
    }
}
btn.addEventListener('click',simpleHandler);
var img=document.getElementById('mainImage');
img.addEventListener('mouseover',function(){img.className='makeItGray';});
img.addEventListener('mouseout',function(){img.className='makeItNormal';});
