// Exercise 9.8 — Form Validation
function checkForEmptyFields(e) {
    e.preventDefault(); // Bài tĩnh: không gửi mật khẩu qua URL hoặc lưu dữ liệu.
    var errorArea=document.getElementById('errors');
    errorArea.className='hidden';errorArea.textContent='';
    var fields=document.querySelectorAll('input[type=text],input[type=password]');
    var fieldList=[];
    for(var i=0;i<fields.length;i++) {
        var empty=fields[i].value.trim()==='';
        fields[i].setAttribute('aria-invalid',String(empty));
        if(empty)fieldList.push(fields[i]);
    }
    if(fieldList.length>0) {
        errorArea.textContent="The following fields can't be empty: "+fieldList.map(function(f){return f.id;}).join(', ');
        errorArea.className='visible';fieldList[0].focus();
        document.getElementById('exercise-result').textContent='Chưa hợp lệ: đã chặn submit.';
    } else {
        document.getElementById('exercise-result').textContent='Dữ liệu hợp lệ theo kiểm tra không rỗng. Đây là demo, chưa tạo tài khoản.';
    }
}
window.addEventListener('load',function(){document.getElementById('sampleForm').addEventListener('submit',checkForEmptyFields);});
