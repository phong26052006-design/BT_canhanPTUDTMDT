// Exercise 10.2 — Basic Selectors
$(function(){
    var msg=$('#msgArea');msg.val('here is some new text');
    $('#first').html('<h2>new Title</h2><label for="msgArea">Messages</label><textarea id="msgArea" class="form-control"></textarea>');
    $('#msgArea').val('My class is '+$('#msgArea').attr('class'));
    $('button').css('background-color','red');
    $('body').css('background-color','ivory');
    $('.center-icons').addClass('selected');
    $('#exercise-result').text('Đã dùng val, html, attr, css và addClass.');
});
