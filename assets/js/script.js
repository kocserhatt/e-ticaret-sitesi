const clickedProductsId = localStorage.getItem("productid");
const mainPage = document.querySelector(".urunSayfasi");


async function sepetId(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
}
async function yildiz(rating) {
    const response = await fetch(`https://dummyjson.com/products/${rating}`);
    const data = await response.json();
    return data;
}
console.log(yildiz());
async function getProduct() {
    const item = await sepetId(clickedProductsId);

    const indirimliFiyat = calculateDiscountedPrice(item.price, item.discountPercentage);
    const btn = document.querySelectorAll(".buyBtn");
    mainPage.innerHTML = `
    <div class="desktop">
    <div class="group-11">
    <div class="group-11-1">
        <img src="${item.thumbnail}">
        <div class="group-9">
            <div class="group-9-img"></div>
            <div class="group-9-img"></div>
            <div class="group-9-img"></div>
            <div class="group-9-img"></div>
        </div>
    </div>
    <div class="group-11-2">
    <h1>${item.title}</h1>
        <p class="p-1">${item.description}</p>
        <div class="group">
            <p class="p-3">${indirimliFiyat}$</p>
            <p class="p-4">${item.price}$</p>
            <div class="indirim">
               %${item.discountPercentage}
            </div>
        </div>
        <div class="group-7">
            <div class="group-5">
                <div class="sepet-adet">
                    <button class="sepet-buton azalt" onclick="adetAzalt()">-</button>
                    <input type="text" class="sepet-girdi" id="adet" value="0">
                    <button class="sepet-buton arttır" onclick="adetArttir()">+</button>
                </div>
            </div>
            <div class="btn-3">
                <button class="buyBtn">
                    Add to card
                </button>
            </div>
        </div>
    </div>
</div>
    </div>`;
    const sepetBtn = document.querySelector(".buyBtn");
    sepetBtn.addEventListener("click", function() {
       const  canvas = document.querySelector("#mySidenav");
       canvas.innerHTML += ` <div class="itemContainer">              
            <div class="plus-item">
                <img data-productid=${item.id} src="${item.thumbnail}">
                <h2 data-productid=${item.id} >${item.title}</h2>
                <p data-productid=${item.id}> ${item.price}$</p>
                <button class="delete-btn">Delete</button>
            </div>
       `
    });
}

function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice.toFixed(2); 
}


function adetAzalt() {
    let input = document.getElementById("adet"); 
    let value = parseInt(input.value);
    if (value > 0) { 
        value--;
        input.value = value;
    }
}

function adetArttir() {
    let input = document.getElementById("adet"); 
    let value = parseInt(input.value); 
    value++; 
    input.value = value; 
}

function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

getProduct();