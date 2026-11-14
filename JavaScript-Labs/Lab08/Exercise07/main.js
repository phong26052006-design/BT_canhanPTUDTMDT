// Exercise 8.7 — Arrays
var daysOfWeek = new Array('Mon','Tues','Wed','Thur','Fri');
daysOfWeek.push('Sat');
daysOfWeek.unshift('Sun');
document.write('<table id="calendar"><caption>Lịch minh họa 30 ngày bắt đầu Chủ nhật</caption><thead><tr>');
for (var i=0; i<daysOfWeek.length; i++) {
    var day = daysOfWeek[i].length < 4 ? daysOfWeek[i] : '<em>'+daysOfWeek[i]+'</em>';
    document.write('<th scope="col">'+day+'</th>');
}
document.write('</tr></thead><tbody>');
for (var row=0; row<5; row++) {
    document.write('<tr>');
    for (var col=0; col<7; col++) {
        var num=row*7+col+1;
        document.write('<td>'+(num<=30?num:'')+'</td>');
    }
    document.write('</tr>');
}
document.write('</tbody></table>');
