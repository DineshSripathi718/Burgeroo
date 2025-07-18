const itemsContainer = document.querySelector('.items-container');
const activeUser = JSON.parse(localStorage.getItem('currentUser')) || null;

console.log("active user"+activeUser);

let allItems = [];

let activeButton;
let prevActiveButton;
let startingPoint = 0;


async function fetchAllItems(){
    try{
        const url = "https://free-food-menus-api-two.vercel.app/best-foods";

        const response = await fetch(url);
        const data = await response.json();
        allItems = data;
        itemsContainer.innerHTML = "";
        activeButton = allButton;
        changeActiveButton(activeButton);
        startingPoint = 0;
        displayItems();
    }catch(error){
        internetIssueMessage();
    }
}

fetchAllItems();

const allButton = document.getElementById('all-items');
allButton.addEventListener('click',()=>{
    fetchAllItems();
});


const burgersButton = document.getElementById('burgers');
burgersButton.addEventListener('click',
    async () =>{
        try{
            const url = "https://free-food-menus-api-two.vercel.app/burgers";
            const response = await fetch(url);
            const data = await response.json();
            allItems = data;
            itemsContainer.innerHTML = "";
            activeButton = burgersButton;
            changeActiveButton(activeButton);
            startingPoint = 0;
            displayItems();
        }catch(error){
            internetIssueMessage();
        }
    }
)

const pizzasButton = document.getElementById('pizzas');
pizzasButton.addEventListener('click',
    async () =>{
        try{
            const url = "https://free-food-menus-api-two.vercel.app/pizzas";
            const response = await fetch(url);
            const data = await response.json();
            allItems = data;
            itemsContainer.innerHTML = "";
            activeButton = pizzasButton;
            changeActiveButton(activeButton);
            startingPoint = 0;
            displayItems();
        }catch(error){
            internetIssueMessage();
        }
    }
)

const drinksButton = document.getElementById('drinks');
drinksButton.addEventListener('click',
    async () =>{
        try{
            const url = "https://free-food-menus-api-two.vercel.app/drinks";
            const response = await fetch(url);
            const data = await response.json();
            allItems = data;
            itemsContainer.classList.remove('internetIssue');
            itemsContainer.innerHTML = "";
            activeButton = drinksButton;
            changeActiveButton(activeButton);
            startingPoint = 0;
            displayItems();
        }catch(error){
            internetIssueMessage();
        }
    }
)

function internetIssueMessage(){
    itemsContainer.innerText = "please connect to a active internet"
    itemsContainer.classList.add("internetIssue");
}

function changeActiveButton(currActiveButton){
    if(prevActiveButton){
        prevActiveButton.disabled =false;
        prevActiveButton.classList.remove("active");
    }
    if(!prevActiveButton || prevActiveButton != currActiveButton)
        prevActiveButton = currActiveButton;
    currActiveButton.disabled = true;
    currActiveButton.classList.add("active");
    console.log(prevActiveButton, currActiveButton)
}

function displayItems(){
    const visibleItems = 6;

    const end = startingPoint + visibleItems;

    const mainItems = allItems.slice(startingPoint, end);
    console.log(mainItems);
    mainItems.forEach(
        (item) => {
            const div = document.createElement('div');
            div.classList.add("itemContainer");
            
            const imageContainer = document.createElement('div');
            imageContainer.classList.add("image-container")
            const img = document.createElement('img');
            img.src = item.img;

            imageContainer.append(img);

            const details = document.createElement('div');
            details.classList.add("item-details-container");

            const title = document.createElement("p");
            title.innerText = item.name;
            title.classList.add("item-name")

            const description = document.createElement('div');
            description.innerText = item.dsc;
            description.classList.add("item-description");

            const price = document.createElement('p');
            price.innerText = "$ "+item.price;
            price.classList.add("price");

            const addToCart = document.createElement('button');
            addToCart.innerText = "Add To Cart"
            
            addToCart.addEventListener("click", () => {
                addItemToCart(item);
            })

            details.appendChild(title);
            details.appendChild(description);
            details.appendChild(price);
            details.appendChild(addToCart)

            div.append(imageContainer);
            div.append(details);
            
            itemsContainer.append(div);
        }
    );

    startingPoint = end;
    if(startingPoint >= allItems.length){
        viewMoreButton.style.display = "none";
    }
}


const viewMoreButton = document.querySelector('.viewmore');

viewMoreButton.addEventListener('click', displayItems);

let cart = JSON.parse(localStorage.getItem('activeCart')) || [];

console.log(cart)
//name, price, image

function addItemToCart(item){
    let cartItem = {};
    if(activeUser){
        if(cart.length > 0){
            console.log("not empty");
            let isItemExist = cart.find((cartItem) => cartItem.name == item.name);
            console.log(isItemExist);
            if(!isItemExist){
                cartItem = {
                    name : item.name,
                    price : item.price,
                    quantity : 1,
                    image : item.img,
                    totalPrice : (item.price * 1)
                }
                cart.push(cartItem);
            }else{
                let updatedCart = cart.map(
                    (oldCartItem) =>{
                        if(oldCartItem.name == item.name){
                            oldCartItem.quantity++;
                            oldCartItem.totalPrice = oldCartItem.price * oldCartItem.quantity;
                            return oldCartItem
                        }else{
                            return oldCartItem
                        }
                    }
                );

                cart = updatedCart.map((updatedItem) => updatedItem);
            }
        }else{
            cartItem = {
                name : item.name,
                price : item.price,
                quantity : 1,
                image : item.img,
                totalPrice : (item.price * 1)
            }
            cart.push(cartItem);
        }

        let stringifyedCart = JSON.stringify(cart);
        console.log(stringifyedCart);
        localStorage.setItem('activeCart', stringifyedCart);
        console.log(cart);
        displayPopUp('Item added to cart');
    }else{
        console.log("user has to login ");
        displayPopUp('Need to Login');
    }
}


const popUpMessage = document.querySelector('.popUpMessage');

const displayPopUp = (message) => {
    popUpMessage.innerHTML = "";
    popUpMessage.style.display = "flex";
    const messageContainer = document.createElement('div');
    messageContainer.innerText = message;

    const okButton = document.createElement('button');
    okButton.innerText = 'ok';

    okButton.addEventListener('click', () => {
        popUpMessage.style.display = "none";
    })

    popUpMessage.append(messageContainer);
    popUpMessage.append(okButton);
}
