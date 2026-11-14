// Exercise 9.7 — Working with Forms
function setBackground(e) {
    e.target.style.backgroundColor=e.type==='focus'?'#FFE393':'white';
    document.getElementById('exercise-result').textContent=e.type+': '+e.target.id;
}
window.addEventListener('load',function(){
    var fields=document.querySelectorAll('input[type=text],input[type=password]');
    for(var i=0;i<fields.length;i++) {
        fields[i].addEventListener('focus',setBackground);
        fields[i].addEventListener('blur',setBackground);
    }
    document.getElementById('sampleForm').addEventListener('submit',function(e){
        e.preventDefault();document.getElementById('exercise-result').textContent='Biểu mẫu minh họa, không gửi thông tin ra ngoài.';
    });
});
