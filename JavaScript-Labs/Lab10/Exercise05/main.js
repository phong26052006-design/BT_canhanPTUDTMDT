// Exercise 10.5 — Inserting DOM Elements
$(function(){
    $('#insert-mode').on('change',function(){
        $('#inserted-image').remove();
        var img=$('<img>',{id:'inserted-image',src:'../images/art/thumbs/13030.jpg',alt:'Ảnh được thêm bằng jQuery'});
        var panel=$('.panel');
        switch(this.value){
            case 'after':panel.after(img);break;
            case 'before':panel.before(img);break;
            case 'append':panel.append(img);break;
            case 'prepend':panel.prepend(img);break;
            case 'appendTo':img.appendTo(panel);break;
            case 'prependTo':img.prependTo(panel);break;
            case 'insertBefore':img.insertBefore(panel);break;
        }
        $('#exercise-result').text('Đã thực hiện '+this.value+'. Chỉ có một ảnh minh họa.');
    }).trigger('change');
});
