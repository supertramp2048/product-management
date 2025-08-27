const btnDelete = document.querySelectorAll("[btn-action-delete]")
const formChange = document.getElementById("delete-role-group")
let path = formChange.getAttribute("path")
btnDelete.forEach(item => {
    item.addEventListener("click",() => {
    let id= item.getAttribute("idRole")
    path = path +`/${id}?_method=DELETE`
    formChange.action = path
    let text = "ban co chac muon xoa ? "
    if(confirm(text)== true){
        formChange.submit()
    }
    else{
        return
    }
    })
})
