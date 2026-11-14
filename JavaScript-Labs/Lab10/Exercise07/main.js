// Exercise 10.7 — More jQuery Animation
$(function(){
    $('figure img').on('mouseover focus',function(e){
        $('#preview').remove();
        var src=$(this).attr('src').replace('small','medium');
        var preview=$('<div>',{id:'preview'});
        preview.append($('<img>',{src:src,alt:$(this).attr('alt')}));
        preview.append($('<p>').text($(this).attr('alt')));
        $('body').append(preview);$(this).addClass('gray');
        movePreview(e);preview.fadeIn(1000);
    }).on('mouseleave blur',removePreview).on('mousemove',movePreview).attr('tabindex','0');
    function removePreview(){$(this).removeClass('gray');$('#preview').remove();}
    function movePreview(e){
        var width=300;
        var left=Math.min((e.pageX||20)+30,window.scrollX+window.innerWidth-width-12);
        $('#preview').css({top:((e.pageY||100)-10)+'px',left:Math.max(window.scrollX+8,left)+'px'});
    }
});
