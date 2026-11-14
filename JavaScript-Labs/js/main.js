// Small navigation enhancement. All lab links work without JavaScript.
document.querySelectorAll('[data-exercise-search]').forEach(function(input){
    input.addEventListener('input',function(){
        var term=input.value.toLocaleLowerCase('vi').trim();
        var count=0;
        document.querySelectorAll('[data-exercise]').forEach(function(item){
            item.hidden=!item.textContent.toLocaleLowerCase('vi').includes(term);
            if(!item.hidden)count++;
        });
        document.getElementById('search-status').textContent=count+' bài phù hợp';
    });
});
