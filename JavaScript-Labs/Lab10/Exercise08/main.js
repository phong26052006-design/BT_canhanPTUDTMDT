// Exercise 10.8 — Complex Animations
$(function(){
    $('#animate-button').on('click',function(){
        var btn=$(this);btn.prop('disabled',true);
        var left=Math.min(495,Math.max(0,$('#animation-stage').width()-210));
        $('#box').stop(true,true).css({left:0,top:0,opacity:.4,width:200,height:150})
            .animate({left:left,opacity:1,height:50})
            .animate({top:240,opacity:.2})
            .animate({height:200},2000,function(){btn.prop('disabled',false);$('#exercise-result').text('Đã chạy xong chuỗi 3 animate.');});
    });
});
