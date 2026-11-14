// Exercise 10.9 — GET Requests
$(function(){
    $('#consume').on('click',function(){
        var button=$(this);button.prop('disabled',true);
        $('#results').empty();$('#request-status').text('Đang tải bằng $.get...');
        var url=$('#data-source').val();
        $.get({url:url,dataType:'json',timeout:10000},function(data,status){
            if(status==='success'){
                var list=$('<ul>');
                $.each(data,function(index,value){$('<li>').text(value.name).appendTo(list);});
                $('#results').append(list);$('#request-status').text('GET thành công: '+data.length+' thành phố.');
            }
        }).fail(function(xhr,status){$('#request-status').text('GET thất bại: HTTP '+xhr.status+'; '+status);})
          .always(function(){button.prop('disabled',false);});
    });
});
