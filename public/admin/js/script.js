
console.log("OK");
const btnStatus = document.querySelectorAll('[btn-status]')
const formSearch = document.getElementById('form-search')
const btnPage = document.querySelectorAll('[btn-Page]')
const btnNavigation = document.querySelectorAll('[btn-navigation]')
// show alert
const showAlert = document.querySelector('[show-success-alert]')
if (showAlert) {
    setTimeout(
        alertTimeOut
        , parseInt(showAlert.getAttribute("data-time")))
}
function alertTimeOut() {
    showAlert.classList.add("hidden")
}
// end show alert
 // them su kien cho close alert button 
    const closeAlert = document.querySelector("[close-alert-btn]")
    if (closeAlert) {
        closeAlert.addEventListener("click", () => {
           showAlert.classList.add("hidden")
        })
    }

// them su kien nut prev , next trong phan trang
btnNavigation.forEach(item => {
    let url = new URL(window.location.href)
    item.addEventListener("click", () => {
        if (item.getAttribute("btn-navigation") == "prev") {
            const currentPage = parseInt(url.searchParams.get("page"))
            if (currentPage) {
                const prevPage = currentPage - 1;
                url.searchParams.set("page", prevPage)
            }
            else {
                url.searchParams.set("page", 1)
            }
            window.location.href = url.href
        }
        if (item.getAttribute("btn-navigation") == "next") {
            const currentPage = parseInt(url.searchParams.get("page"))
            if (currentPage) {
                const nextPage = currentPage + 1;
                url.searchParams.set("page", nextPage)

            }
            else {
                const nextPage = 2;
                url.searchParams.set("page", nextPage)
            }
            window.location.href = url.href
        }
    })
})

// them su kien nut phan trang
btnPage.forEach(item => {
    let url = new URL(window.location.href)
    item.addEventListener("click", () => {
        const currentPage = item.getAttribute("btn-Page")
        url.searchParams.set("page", currentPage)
        window.location.href = url.href
    })
})


// loc theo status
if (btnStatus.length > 0) {
    let url = new URL(window.location.href)
    btnStatus.forEach(btn => {
        btn.addEventListener('click', () => {
            const status = btn.getAttribute("btn-status");
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}
// them su kien submit cho form, loc theo search
formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formSearch);
    const keyword = formData.get('keySearch');
    const url = new URL(window.location.href)
    if (keyword) {
        url.searchParams.set("keySearch", keyword);
        window.location.href = url.href
    }
    else {
        url.searchParams.delete("keySearch")
        window.location.href = url.href
    }

})
