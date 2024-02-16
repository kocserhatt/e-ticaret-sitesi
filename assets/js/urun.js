const BASE_URL ="https://dummyjson.com";

const limit = 100;

function checkEndpoints (productId = 1){
    const endpoints = {
        products: "products",
        productDetails: `products/${productId}`
    }
    return endpoints;
}


const endpoints = checkEndpoints();

const container = document.querySelector(".container");

async function urunleriGetir(){
    const response = await fetch(`${BASE_URL}/${endpoints.products}?limit=${limit}`)
    const data = await response.json();
    return data;
}

async function ekranaYaz (){
    const data = await urunleriGetir();
    for (const product of data.products) {
        container.innerHTML +=`
        <div class="itemContainer">              
            <a href="index.html" class="pages"">
                <div class = "clicked"  data-productid=${product.id}> 
                    <img data-productid=${product.id} src="${product.thumbnail}">
                    <h2 data-productid=${product.id} >${product.title}</h2>
                    <p data-productid=${product.id} id="brand">${product.brand}</p>
                    <span class="yildiz" data-productid=${product.rating}></span>
                    <p data-productid=${product.id}>${product.price}$</p>
                    <button class="btn-1" data-productid=${product.id}>Ürüne git</button>
                </div>
            </a>
        </div>

    `;

    const clickedProducts = document.querySelectorAll(".clicked");
    for (const clicked of clickedProducts) {
        clicked.addEventListener("click",function(e){
            localStorage.setItem("productid", e.target.dataset.productid);
        })
    }
   
    }
    yildiz(data.products);
}


async function IdGetir(id){
    const endpoint = checkEndpoints(id);
    const response = await fetch(`${BASE_URL}/${endpoint.productDetails}`);
    const data = await response.json();
}
 
function yildiz(products) {
    const yildizElements = document.querySelectorAll(".yildiz");
    products.forEach(product => {
        const rating = Math.floor(product.rating);
        for (let i = 0; i < rating; i++) {
            yildizElements[i].style.color = "red";
        }
    });
}

ekranaYaz();
urunleriGetir();
IdGetir();

