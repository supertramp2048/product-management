//console.log('OK');

const btnIsActive = document.querySelectorAll('[btn-isActive]')
const formChange = document.getElementById("form-change-status")
const formChangeAll = document.getElementById("form-change-status-all")
const statusAll = document.getElementById("statusAll")
const path = formChange.getAttribute('data-path')
// them su kien cho nut check all va nut checkbox o cac o san pham
const checkAll = document.querySelector('[check-all]')
const checkItem = document.querySelectorAll('[check-item]')
// o input chua cac id
const inputIds = document.querySelector('[ids]')
//o select de chon status 
const selectOption = document.getElementById('choices')
//them su kien cho nut check all
checkAll.addEventListener("change", () => {
   // let ids = []
    if (checkAll.checked == true) {
        checkItem.forEach(item => {
            item.checked = true;
            // if (ids.includes(item.getAttribute('id'))) {
            //     return
            // }
            // else {
            //     ids.push(item.getAttribute('id'))
            // }
        })
    }
    else {
        checkItem.forEach(item => {
            item.checked = false
        })
       // ids = []
    }
  //  inputIds.value = ids.join(", ")
})
//
// let ids = []
// checkItem.forEach(item => {
//     item.addEventListener("change", () => {
//         if (item.checked) {
//             ids.push(item.getAttribute('id'))
//         }
//         else {
//             if (ids.includes(item.getAttribute('id'))) {
//                 //console.log(item.getAttribute('id'));
//                 ids.pop(item.getAttribute('id'))
//             }
//         }
//         inputIds.value = ids.join(", ")
//     })
// })
formChangeAll.addEventListener("submit", (e)=> {
     //e.preventDefault()
     let ids = []
     checkItem.forEach(item => {
        //console.log(item.id);
        if(item.checked==true){
          // console.log(item.id);
           ids.push(item.id)
        }
     })
     inputIds.value = ids.join(", ")
})

// day id va status cua san pham can thay doi status len
if (btnIsActive.length > 0) {
    btnIsActive.forEach(item => {
        item.addEventListener("click", () => {
            let statusCurrent = item.getAttribute('btn-isActive')
            let statusChange = statusCurrent == 'active' ? "inactive" : "active"
            const id = item.getAttribute('id')
            const action = path + `${statusChange}/${id}?_method=PATCH`
            formChange.action = action
            formChange.submit()
        })
    })
}
