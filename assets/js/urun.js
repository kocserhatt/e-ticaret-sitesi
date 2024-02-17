const BASE_URL = "https://dummyjson.com";
const limit = 100;
const container = document.querySelector(".container");

function checkEndpoints(productId = 1) {
    const endpoints = {
        products: "products",
        productDetails: `products/${productId}`
    };
    return endpoints;
}

const endpoints = checkEndpoints();

async function urunleriGetir() {
    const response = await fetch(`${BASE_URL}/${endpoints.products}?limit=${limit}`);
    const data = await response.json();
    return data;
}

async function ekranaYaz() {
    const data = await urunleriGetir();
    for (const product of data.products) {
        container.innerHTML += `
            <div class="itemContainer">              
                <a href="index.html" class="pages">
                    <div class="clicked" data-productid=${product.id}> 
                        <img data-productid=${product.id} src="${product.thumbnail}">
                        <h2 data-productid=${product.id}>${product.title}</h2>
                        <p data-productid=${product.id} id="brand">${product.brand}</p>
                        <div class="yildiz-container" data-rating=${product.rating}></div>
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
        
        yildiz(product.rating, product.id);
    }
}

function yildiz(rating, productId) {
    const yildizContainer = document.querySelector(`[data-productid="${productId}"] .yildiz-container`);
    const roundedRating = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
        const starElement = document.createElement("span");
        starElement.innerHTML = "★";
        starElement.style.color = i < roundedRating ? "red" : "black";
        yildizContainer.appendChild(starElement);
    }
}

ekranaYaz();
