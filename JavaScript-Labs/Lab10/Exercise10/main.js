// Exercise 10.10 — jqXHR Handling
$(function(){
    $('.animLoading').hide();
    $('#consume').on('click',function(){
        var button=$(this);button.prop('disabled',true);
        $('#results').empty();$('#callback-log').empty();
        $('.animLoading').show();$('#request-status').text('Đang tải bằng jqXHR...');
        function log(message){$('<li>').text(message).appendTo('#callback-log');}
        $.get({url:$('#data-source').val(),dataType:'json',timeout:10000})
            .done(function(data){
                log('done');var list=$('<ul>');
                $.each(data,function(index,value){$('<li>').text(value.name).appendTo(list);});
                $('#results').append(list);$('#request-status').text('Thành công: '+data.length+' thành phố.');
            })
            .fail(function(xhr,status,error){
                log('fail');$('#request-status').text('failed loading data - HTTP '+xhr.status+'; status='+status+'; error='+error);
            })
            .always(function(){log('always');$('.animLoading').fadeOut('slow');button.prop('disabled',false);});
    });
});
