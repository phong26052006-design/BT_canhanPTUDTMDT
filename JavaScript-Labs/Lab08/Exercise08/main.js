// Exercise 8.8 — JavaScript Functions
var boxClass = 'movingDiv';
function outputBox(num) {
    var box = "<div class='"+boxClass+"' id='div"+num+"'>This is div "+num+'</div>';
    return box;
}
// box là biến cục bộ; không bỏ var để vô tình tạo biến toàn cục.
function showScope() {
    try { console.log(box); }
    catch(error) {
        document.getElementById('scope-result').textContent=error.name+': '+error.message;
    }
}
