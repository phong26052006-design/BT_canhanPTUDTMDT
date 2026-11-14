// Exercise 8.5 — Using the Browser Console
document.write('this text was written from JS');
var count = 1;
document.write(' Count = ' + count);
count++;
var output = '<br>Count = ' + count;
document.write(output);
var temp = count * 7;
console.log('script within the <head> element');
console.log('count =', count, 'output =', output, 'temp =', temp);
console.warn('oh no this is a warning — thông báo chủ đích của Exercise 8.5');
console.error('panic!! error!! — thông báo chủ đích của Exercise 8.5');
// Lỗi trước khi sửa được tái hiện trong một khối có bắt lỗi.
// Bản hoạt động phía trên dùng document đúng chính tả.
try { doccumment.write('this text was written from JS'); }
catch (error) {
    document.write('<p id="intentional-error"></p>');
    document.getElementById('intentional-error').textContent =
        'Lỗi chủ đích trước khi sửa: ' + error.name + ': ' + error.message;
    console.log('Lỗi đã bắt để minh họa:', error);
}
document.write('<p id="console-result">count = ' + count + '; temp = ' + temp + '</p>');
