const userDetails = JSON.parse(localStorage.getItem('currentUser')) || null;

console.log(userDetails);

const userSection = document.querySelector('.userDetails');

if(userDetails){
    console.log('User is logged in:', userDetails);

    const userName = userDetails.name.split(" ");
    userSection.innerHTML = `${
        userName.reduce(
           (prev, curr) => {
                return prev[0].toUpperCase().charAt(0) + curr[0].toUpperCase().charAt(0);
            }
        )
    }`;



    const subMenuHTML = `
        <ul class="sub-menu">
            <li class="sub-item">
                <a href="">my profile</a>
            </li>
            <li class="sub-item logout">
                logout
            </li>
        </ul>
    `;

    let isSubMenuOpen = false;
    userSection.addEventListener('click', () => {
        // Check if submenu already exists to prevent duplication
        if (!isSubMenuOpen) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = subMenuHTML.trim();
            userSection.appendChild(tempDiv.firstChild);

            const logoutButton = userSection.querySelector('.logout');

            logoutButton.addEventListener('click', logoutUser);
            isSubMenuOpen = true;
        }else{
            const subMenu = userSection.querySelector('.sub-menu');
                isSubMenuOpen = false;
                subMenu.remove();
        }
    });
}else{
    console.log('User is not logged in');
    userSection.innerHTML = `<a href="./login.html"><i class="fa-solid fa-user"></i></a>`;
}

function logoutUser(){
    let activeCart = JSON.parse(localStorage.getItem('activeCart')) || [];

    userDetails.cart = activeCart;

    let users = JSON.parse(localStorage.getItem("users"));

    updatedUsers = users.map(
        (oldUser) => {
            if(oldUser.email == userDetails.email){
                oldUser.cart = activeCart;
            }
            return oldUser;
        }
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('activeCart');
    localStorage.removeItem('currentUser');
    displayResult('Logout successful! Redirecting to home page...');
    userSection.innerHTML = `<a href="./login.html">user</a>`;

    window.location.reload();
}

const messageContainer = document.querySelector('.popUpMessage');

function displayResult(message) {
    console.log(messageContainer)
    const messageElement = document.createElement('div');
    messageElement.innerText = message;


    const button = document.createElement('button');
    button.innerText = 'OK';
    button.addEventListener('click', () => {
        messageContainer.style.display = "none";
    });
    messageContainer.innerHTML = ''; // Clear previous messages
    messageContainer.append(messageElement);
    messageContainer.append(button);
    messageContainer.style.display = "flex";
}



