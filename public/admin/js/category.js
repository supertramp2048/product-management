// hàm cho xem truoc anh khi upload len server 
    function previewFile(){
        var preview = document.querySelector('[previewImage]')
        var file = document.querySelector('input[type=file]').files[0]
       // console.log(file);
        
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result
        }

        if(file) {
            reader.readAsDataURL(file)
        }
        else{
            preview.src =""
        }
    }
const statusBtn = document.querySelectorAll('[btn-isActive]')
const formChangeStatus = document.getElementById("form-change-status")
var path = formChangeStatus.getAttribute('data-path')
statusBtn.forEach(item =>{
    item.addEventListener("click", () => {
        var status = item.getAttribute('btn-isActive') == "active" ? "inactive" : "active"
        var id = item.getAttribute('id')
        const action = path + `changeStatusCategory/${status}/${id}?_method=PATCH`
        formChangeStatus.action = action
        formChangeStatus.submit()
    })
})
const deleteBtn = document.querySelectorAll("[btn-action-delete]")
deleteBtn.forEach(item => {
    item.addEventListener("click",() => {
        let text = "Bạn có chắc muốn xóa category này ?"
        if(confirm(text)==true){
            var id = item.getAttribute("idCategory")
            const action = path + `deleteCategory/${id}?_method=delete`
            formChangeStatus.action = action
            formChangeStatus.submit()
        }
    })
})
