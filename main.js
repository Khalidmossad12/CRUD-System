var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice"); 
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("search");
var currentIndex = 0;

productNameInput.onkeyup = function () { 
    var nameregex = /^[A-Z][a-z]{2,8}$/
    if (!nameregex.test(productNameInput.value)) {
        //submitBtn.disabled = "true";
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        document.getElementById("nameValid").innerHTML = `productName must start with uppercase`;
        return false
    }
    else 
    {
        submitBtn.removeAttribute("disabled");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid"); 
        document.getElementById("nameValid").innerHTML = ``; 
        return true
    }
}

productPriceInput.onkeyup = function () {
    var priceregex = /^[1-9]([0-9]{1,5})$/
    if (!priceregex.test(productPriceInput.value)) {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        document.getElementById("priceValid").innerHTML = `product Price must higher than 100`;
        return false
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid"); 
        document.getElementById("priceValid").innerHTML = ``; 
        return true
    }
}

productCategoryInput.onkeyup = function () {
    var categoryregex = /^[A-Z][0-9]{0,3}$/
    if (!categoryregex.test(productCategoryInput.value)) {
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        document.getElementById("categoryValid").innerHTML = ` product category must start with uppercase`;
        return false
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid"); 
        document.getElementById("categoryValid").innerHTML = ``; 
        return true
    }
}

productDescInput.onkeyup = function () {
    var descregex = /^[a-z ]{2,}$/
    if (!descregex.test(productDescInput.value)) {
        //submitBtn.disabled = "true";
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        document.getElementById("productDesc").innerHTML = ` product category must start with uppercase`;
        return false
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid"); 
        document.getElementById("productDesc").innerHTML = ``; 
        return true
    }
}


var productContainer = [];
if (localStorage.getItem('ourProduct') != null) {
    productContainer = JSON.parse(localStorage.getItem('ourProduct'));
    displayProduct();
}


submitBtn.onclick = function () {
    if (submitBtn.innerHTML == "add product") {
        addProduct();
    }
    else {
        updateProduct();
    }
}

function addProduct() {

    if (validation() == true) {
        
    product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    console.log(document.getElementById("submitBtn").innerHTML);

    productContainer.push(product);

    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    console.log(productContainer);
    //clearForm();
    displayProduct();
    submitBtn.removeAttribute("disabled")
    }
    else
    {
        submitBtn.disabled = "true";
    }
}

function validation() {
    if (productNameInput.value != ""  &&  productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != "") {
        return true
    }
    else
    {
        return false
    }
}


function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProduct() {
    var cartona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
        <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].desc}</td>
                <td> <button id = 'submitBtn'  onclick= 'getProduct(${i})' class=" btn btn-outline-info">Update</button> </td>
                <td> <button  onclick= 'Delete(${i})' class=" btn btn-outline-danger">Delete</button> </td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cartona;
}

searchInput.onkeyup = function () 
{
    var cartona = ``;
    var term = searchInput.value;
    for (var i = 0; i < productContainer.length; i++) {

        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true)
            cartona += `
        <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].desc}</td>
                <td> <button class=" btn btn-outline-info">Update</button> </td>
                <td> <button class=" btn btn-outline-danger">Delete</button> </td>
            </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function Delete(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    displayProduct();
}

function getProduct(index) {

    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;
    currentIndex = index;

    document.getElementById("submitBtn").innerHTML = "Update Product";


}

function updateProduct() {
    var product =    
    {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        desc : productDescInput.value
    }

    productContainer[currentIndex] = product;
    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    
    displayProduct();

    submitBtn.onclick = function () {

        if (submitBtn.innerHTML == "Update Product") {
            clearForm()
        }
    }
    
}


