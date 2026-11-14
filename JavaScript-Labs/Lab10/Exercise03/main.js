// Exercise 10.3 — Advanced Selectors
$(function(){
    // Bước :password được quan sát riêng trước trạng thái cuối.
    $(':password').css('background-color','yellow');
    $('#password-selector-result').text('Đã chọn '+$(':password').length+' password field.');
    $('form :nth-child(4n)').css('background-color','yellow');
    $('label:contains("word")').css('color','black');
    $('#exercise-result').text('Selector :password, :nth-child(4n), :contains("word") đã chạy.');
    $('form').on('submit',function(e){
        e.preventDefault();
        $('#exercise-result').text('Đây là bài selector. Biểu mẫu minh họa không gửi hoặc lưu dữ liệu.');
    });
});
