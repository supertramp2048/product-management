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
// them su kien cho nut check all
checkAll.addEventListener("change", () => {
    if (checkAll.checked == true) {
        checkItem.forEach(item => {
            item.checked = true;
            if (inputIds.value.includes(item.getAttribute('id') + ", ")) {
                return
            }
            else {
                inputIds.value += item.getAttribute('id') + ", ";
            }
        })
    }
    else {
        checkItem.forEach(item => {
            item.checked = false
            inputIds.value = ""
        })
    }
})
//
checkItem.forEach(item => {
    item.addEventListener("change", () => {
        if (item.checked) {
            inputIds.value += item.getAttribute('id') + ", ";
        }
        else {
            if (inputIds.value.includes(item.getAttribute('id') + ", ")) {
                //console.log(item.getAttribute('id'));
                inputIds.value = inputIds.value.replace(item.getAttribute('id') + ", ", "")
            }
        }
    })
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
