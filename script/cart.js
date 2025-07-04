const displayCart = document.querySelector('.display-cart');
const totalPriceContainer = document.createElement('div');
totalPriceContainer.classList.add('totalPriceContainer');


let currentUser = JSON.parse(localStorage.getItem('currentUser'));

let activeCart = JSON.parse(localStorage.getItem('activeCart')) || (currentUser && currentUser.cart) || [];



console.log(activeCart);

function displayCartItem(){
    if(!currentUser){
        console.log("Login to see the items in cart");
        displayCart.innerText = "Login to see the cart items";
    }
    if(!activeCart){
        console.log("No items found");
        displayCart.innerText = "No Items to display";
    }

    if(activeCart){
        displayCart.innerHTML = "";
        activeCart.forEach(
            (item) => {
                console.log(item);
                const itemContainer = document.createElement('div');
                itemContainer.classList.add("itemContainer");

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('imageContainer')
                const image = document.createElement('img');
                image.src = item.image;

                const detailsContainer = document.createElement('div');
                detailsContainer.classList.add('detailsContainer')
                const name = document.createElement('div');
                name.classList.add('itemName')
                name.innerText = item.name;
                const price = document.createElement('div');
                price.classList.add('itemPrice')
                price.innerText = `price : $ ${item.price}`;

                const qunatityContainer = document.createElement('div');
                qunatityContainer.classList.add('qunatityContainer');
                const quantity = document.createElement('div');
                quantity.innerText = `quantity : ${item.quantity}`;
                quantity.classList.add('itemQuantity');

                const totalPrice = document.createElement('div');
                totalPrice.innerText = `Total Price : ${item.totalPrice}`;
                totalPrice.classList.add("itemTotalPrice");
                

                const qunatityIncrease = document.createElement('button');
                qunatityIncrease.innerText = "+";
                qunatityIncrease.addEventListener('click',
                    () => {
                        item.quantity ++;
                        quantity.innerText = `quantity : ${item.quantity}`;   
                        item.totalPrice = item.quantity * item.price;
                        totalPrice.innerText = `Total Price : ${item.totalPrice}`;

                        totalPriceContainer.innerText = `total price : ${calTotalPrice(activeCart)}`;
                    }
                );

                const qunatityDecrease = document.createElement('button');
                qunatityDecrease.innerText = "-";
                qunatityDecrease.addEventListener('click',
                    () => {
                        if(item.quantity == 0){
                            removeCartItem(item);
                        }
                        if(item.quantity > 0){
                            item.quantity --;
                            if(item.quantity == 0)
                                removeCartItem(item);
                        }
                        
                        quantity.innerText = `quantity : ${item.quantity}`; 

                        item.totalPrice = item.quantity * item.price;
                        totalPrice.innerText = `Total Price : ${item.totalPrice}`;

                        totalPriceContainer.innerText = `total price : ${calTotalPrice(activeCart)}`;
                    }
                );

                detailsContainer.append(name);
                detailsContainer.append(price);
                qunatityContainer.append(qunatityDecrease);
                qunatityContainer.append(quantity);
                qunatityContainer.append(qunatityIncrease);
                detailsContainer.append(qunatityContainer);

                imageContainer.append(image);

                itemContainer.append(imageContainer);
                itemContainer.append(detailsContainer);
                itemContainer.append(totalPrice);
                displayCart.append(itemContainer);
            }
        );
    }

    if(displayCart.innerHTML == ""){
        displayCart.innerHTML = "<h1> No Items to display. Add times to cart </h1>";
    }else{
        totalPriceContainer.innerText = `total price : ${calTotalPrice(activeCart)}`;

        displayCart.append(totalPriceContainer);
    }
}

displayCartItem();

function calTotalPrice(cartItems){
    let totalPrice = 0;
    cartItems.forEach(
        (item) => {
            totalPrice += item.totalPrice;
        }
    );

    console.log(totalPrice);
    return totalPrice;
}


function removeCartItem(item){
    let updatedCart = activeCart.filter( oldItem => oldItem != item);
    activeCart = updatedCart;
    
    localStorage.setItem('activeCart', JSON.stringify(activeCart));
    displayCartItem();
}