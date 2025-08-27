const tablePermission = document.querySelector('[table-permission]')
const formChange = document.getElementById("form-change-permission")
if(tablePermission){
    const btnSubmit = document.getElementById("btnSubmit")
    btnSubmit.addEventListener("click", () =>{
        const permissionArr = []
        const rows = tablePermission.querySelectorAll('[data-name]')
        rows.forEach((row) => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if(name=="id"){
                inputs.forEach((item,index) =>{
                  let id = item.getAttribute("value")
                  let obj = {
                    index:index,
                    id: id,
                    permission: []
                }
                permissionArr.push(obj)
                })
            }
            else{
                inputs.forEach((item,index) => {
                  if(item.checked){
                    permissionArr[index].permission.push(name)
                  }
                })
            }
        });
        let input = formChange.querySelector("input")
        const str = JSON.stringify(permissionArr)
        input.value = str
        formChange.submit()
    })
}
