// Lấy các nút phân trang
const PaginationBtn = document.querySelectorAll('[btn-navigation]')

// Lấy form tìm kiếm và div chứa icon loading
const formSearch = document.getElementById("form-search")
const divLoader = document.getElementById("divLoader")

// Thêm icon loading khi submit form tìm kiếm
formSearch.addEventListener("submit", () => {
    divLoader.classList.remove("hidden")
})
// xu ly phan trang khi an nut chuyen trang
const btnPagination = document.querySelectorAll('[btn-Page]')
btnPagination.forEach(item => {
    item.addEventListener("click",() =>{
        const pageNum= item.getAttribute("btn-Page")
        let url = new URL(window.location.href)
        url.searchParams.set("page",pageNum)
        window.location.href = url.href
    })
})

// Xử lý phân trang khi bấm nút prev / next
PaginationBtn.forEach(item => {
    item.addEventListener("click", () => {
        const url = new URL(window.location.href)
        const currentPage = parseInt(url.searchParams.get("page")) || 1

        const direction = item.getAttribute("btn-navigation")

        if (direction === "prev") {
            if (currentPage > 1) {
                const prevPage = currentPage - 1
                url.searchParams.set("page", prevPage)
                window.location.href = url.href
            }
        }
        else if (direction === "next") {
            const nextPage = currentPage + 1
            url.searchParams.set("page", nextPage)
            window.location.href = url.href
        }
    })
})
window.addEventListener("pageshow", () => {
    divLoader.classList.add("hidden")
})