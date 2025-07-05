const menuButton = () => {
        const menu = document.querySelector('.menu');
        if(isMenuButtonClicked){
            menu.style.display = "none";
            isMenuButtonClicked = false;
        }else{
            menu.style.display = "flex";
            isMenuButtonClicked = true;
        }
        
    };

let isMenuButtonClicked = false;
document.querySelector('.menu-button').addEventListener('click',menuButton);

document.querySelector('.close-button').addEventListener('click', menuButton);