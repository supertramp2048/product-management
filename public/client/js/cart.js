console.log("cart js ");
const deleteBtn = document.querySelectorAll("[cart-delete-product-btn]")
const plusBtn = document.querySelectorAll("[plus]")
const minusBtn = document.querySelectorAll("[minus]")
const updateCartForm = document.querySelector('[update-cart-form]')
deleteBtn.forEach(item => {
  item.addEventListener("click", function(){
    let path = updateCartForm.getAttribute("pathUpdateCart")
    const productId = this.dataset.productId
    console.log(productId);
    
     path += `/delete/${productId}?_method=PATCH` 
     console.log(path);
     updateCartForm.action = path
     updateCartForm.submit()
})

})
minusBtn.forEach(item => {
  item.addEventListener("click", function(){
    let path = updateCartForm.getAttribute("pathUpdateCart")
    const productId = this.dataset.productId
    console.log(productId);
    
     path += `/minus/${productId}?_method=PATCH` 
     console.log(path);
     updateCartForm.action = path
     updateCartForm.submit()
})

})
plusBtn.forEach(item => {
  item.addEventListener("click", function(){
    let path = updateCartForm.getAttribute("pathUpdateCart")
    const productId = this.dataset.productId
    console.log(productId);
    
     path += `/plus/${productId}?_method=PATCH` 
     console.log(path);
     updateCartForm.action = path
     updateCartForm.submit()
})

})


