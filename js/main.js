let carts = document.querySelectorAll('.add-cart')

let products = [
    {
        name: 'Golden - Red - Wall',
        tag: 'goldenRedWall',
        price: 799,
        inCart: 0
    },
    {
        name: 'Aipan - Wall-Decor',
        tag: 'aipanWall',
        price: 999,
        inCart: 0
    },
    {
        name: 'Blue - Dotted - Tea',
        tag: 'blueDottedTea',
        price: 499,
        inCart: 0
    },
    {
        name: 'Blue - Circle - Wall',
        tag: 'blueCircleWall',
        price: 999,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cartNum').textContent = productNumbers;
    }
}



function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartNum').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartNum').textContent = 1;
    }


    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {


        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems, [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    let productContainer = document.querySelector(".products");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fas fa-window-close"></i>
                <img src="./assets/cart/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">Rs${item.price}</div>
            <div class="quantity">
                <i class="fas fa-arrow-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-arrow-right"></i>
            </div>
            <div class="total">
                Rs${item.inCart * item.price}
            </div>
            `;
        });


        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    Rs${cartCost}
                </h4>
        `
    }
}


onLoadCartNumbers();
displayCart();