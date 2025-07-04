const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const messageContainer = document.querySelector('.popUpMessage');

console.log(currentUser);
console.log(existingUsers);

const loginForm = document.querySelector('.login-form');

const username = document.querySelector('#email');
const password = document.querySelector('#password');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        email: username.value,
        password: password.value
    };  
    loginUser(user);
    username.value = '';
    password.value = '';
});

function loginUser(user){
    const userFound = existingUsers.find(
    (user) => {
        return user.email === username.value && user.password === password.value;
    });

    console.log(userFound);
    if(userFound){
        console.log('Login successful');
        localStorage.setItem('currentUser', JSON.stringify(userFound));
        displayResult('Login successful! Redirecting to home page...');
        setTimeout(
            () => {
                window.location.href = "./index.html";
            }, 2000
        );
    }else{
        console.log('Login failed');

        displayResult('Login failed. Please check your email and password.');
    }
}

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