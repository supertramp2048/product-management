
console.log("OK");
const btnStatus = document.querySelectorAll('[btn-status]')
const formSearch = document.querySelector('#form-search')
const btnIsActive = document.querySelectorAll('[btn-isActive]')
const btnPage = document.querySelectorAll('[btn-Page]')
const btnNavigation = document.querySelectorAll('[btn-navigation]')

// them su kien nut prev , next trong phan trang
btnNavigation.forEach(item => {
    let url = new URL(window.location.href)
    item.addEventListener("click", ()=>{
        if(item.getAttribute("btn-navigation")=="prev"){
            const prevPage = parseInt(url.searchParams.get("page")) - 1;
            url.searchParams.set("page",prevPage)
            window.location.href=url.href
        }
        if(item.getAttribute("btn-navigation")=="next"){
            const nextPage = parseInt(url.searchParams.get("page")) + 1;
            url.searchParams.set("page",nextPage)
            window.location.href=url.href
        }
    })
})

// them su kien nut phan trang
btnPage.forEach(item => {
    let url = new URL(window.location.href)
    item.addEventListener("click", () => {
        const currentPage = item.getAttribute("btn-Page")
        url.searchParams.set("page", currentPage)
        window.location.href=url.href
    })
})

// loc theo status
btnIsActive.forEach(item => {
    let url = new URL(window.location.href)
    item.addEventListener("click", () => {
        const status = item.getAttribute("btn-isActive")
        const id = item.getAttribute("id")
        url.searchParams.set("id", id)
        // console.log("the status of "+id+" "+status);
        window.history.pushState({}, '', url);
    })
})

if (btnStatus.length > 0) {
    let url = new URL(window.location.href)

    btnStatus.forEach(btn => {
        btn.addEventListener('click', () => {
            const status = btn.getAttribute("btn-status");
            if (status) {
                url.searchParams.set("status", status);
                //console.log(url.href);

            }
            else {
                url.searchParams.delete("status")
                // console.log(url);

            }

            window.location.href = url.href
        })
    })
}
// them su kien submit cho form, loc theo search
formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e);

    const formData = new FormData(formSearch);
    //console.log(formData.get('keySearch'));
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
