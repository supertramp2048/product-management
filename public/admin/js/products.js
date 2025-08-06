//console.log('OK');
document.addEventListener("DOMContentLoaded", () => {
    const btnIsActive = document.querySelectorAll('[btn-isActive]')
    const formChange = document.getElementById("form-change-status")
    const formChangeAll = document.getElementById("form-change-status-all")
    const statusAll = document.getElementById("statusAll")
    const path = formChange.getAttribute('data-path')
    //lay icon loader
    const loaderDiv = document.getElementById("divLoader")
    // them su kien cho nut check all va nut checkbox o cac o san pham
    const checkAll = document.querySelector('[check-all]')
    const checkItem = document.querySelectorAll('[check-item]')
    // o input chua cac id
    const inputIds = document.querySelector('[ids]')
    //o select de chon status 
    const selectOption = document.getElementById('choices')
    // lay cac nut fix 
    const fixBtn = document.querySelectorAll('[btn-action-fix]')
    // lau cac btn  delete
    const deleteBtn = document.querySelectorAll('[btn-action-delete]')
    // lay the div confirm delete
    const confirmDeleteDiv = document.getElementById("deleteFormDiv")
    // lay nut dong form delete
    const cancleDeleteBtn = document.getElementById("cancelDelete-btn")
    // console.log(cancleDeleteBtn);
    // lay form confirm delete 
    const confirmDeleteForm = document.getElementById("form-delete-product")
    const { idDeleteProduct } = confirmDeleteForm.elements
    // lay nut dong form fix
    const closeFormBtn = document.getElementById("btnCloseForm")
    // lay the chua form fix
    const fixFormDiv = document.getElementById("fixFormDiv")
    // lay form deleteAll
    const deleteAllForm = document.getElementById("form-delete-all")
    const {idsDeleteAll} = deleteAllForm
    
    deleteAllForm.addEventListener("submit", ()=> {
        loaderDiv.classList.remove("hidden")
        let ids = []
        checkItem.forEach(item => {
            //console.log(item.id);
            if (item.checked == true) {
                // console.log(item.id);
                ids.push(item.id)
            }
        })
        idsDeleteAll.value = ids.join(", ")
    })
    //them loader khi submit form confirm delete
    confirmDeleteForm.addEventListener("submit", () => {
        loaderDiv.classList.remove("hidden")
        //confirmDeleteForm.classList.remove("hidden")
    })
    // lay form fixProduct
    const fixForm = document.getElementById("form-fix-product")
    const { idFixForm, title, thumbnail, deletedFixForm, statusFixForm, priceFixForm } = fixForm.elements
    fixForm.addEventListener("submit",()=>{
         loaderDiv.classList.remove("hidden")
    })
    // them su kien cho delete button
    deleteBtn.forEach(item => {
        item.addEventListener("click", () => {
            confirmDeleteDiv.classList.remove("hidden")
            const product = JSON.parse(item.dataset.product)
            idDeleteProduct.value = product._id
        })
    })
    cancleDeleteBtn.addEventListener("click", () => {
        confirmDeleteDiv.classList.add("hidden")
    })
    // them su kien cho fix btn
    fixBtn.forEach(item => {
        item.addEventListener("click", () => {

            fixFormDiv.classList.remove("hidden")
            const id = item.getAttribute("idProduct")
            const product = JSON.parse(item.dataset.product)
            // console.log(product);
            fixForm.setAttribute("idProduct", product._id)
            idFixForm.value = product._id
            title.value = product.title
            thumbnail.value = product.thumbnail
            deletedFixForm.value = product.delete
            statusFixForm.value = product.status
            priceFixForm.value = product.price
        })
    })
    closeFormBtn.addEventListener("click", () => {
        fixFormDiv.classList.add("hidden")
    })
    //them su kien cho nut check all
    checkAll.addEventListener("change", () => {
        // let ids = []
        if (checkAll.checked == true) {
            checkItem.forEach(item => {
                item.checked = true;
            })
        }
        else {
            checkItem.forEach(item => {
                item.checked = false
            })
        }
    })
    // them su kien submit cho form sua status 
    formChangeAll.addEventListener("submit", () => {
        //e.preventDefault()
        loaderDiv.classList.remove("hidden")
        let ids = []
        checkItem.forEach(item => {
            //console.log(item.id);
            if (item.checked == true) {
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
});