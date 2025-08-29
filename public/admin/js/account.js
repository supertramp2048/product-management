const deleteBtn = document.querySelectorAll('[btn-action-delete]')
const formChange = document.getElementById('formChange')
let path = formChange.getAttribute("path")
deleteBtn.forEach(item => {
    item.addEventListener("click",() => {
      let id = item.getAttribute("data-id")
      path += `/${id}?_method=DELETE`
      console.log(path);
      formChange.action = path 
      formChange.submit()
    })
})
