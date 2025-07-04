let users = JSON.parse(localStorage.getItem("users")) || [];

console.log(users);

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');
const conPassword = document.querySelector('#repassword');


const messageContainer = document.querySelector('.popUpMessage');

function registerUser(userInfo){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if(!emailRegex.test(userInfo.email)){
        email.value = ""
        displayResult('Enter valid email Id');
    }else if(!phoneRegex.test(userInfo.phone)){
        phone.value = "";
        displayResult('Enter valid phone number');
    }else if(!passwordRegex.test(userInfo.password)){
        password.value = "";
        conPassword.value = "";
        displayResult('Password must be 8 characters - must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character');
    }
    else{
        if(!userExists(userInfo)){
            userInfo.cart = [];
            users.push(userInfo);
            localStorage.setItem("users", JSON.stringify(users));
            name.value = "";
            email.value = "";
            password.value = "";
            phone.value = "";
            conPassword.value = "";
            // Show registration success message
            displayResult('Registration successful');

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "./login.html";
            }, 2000);

        }else{
            name.value = "";
            email.value = "";
            password.value = "";
            phone.value = "";
            conPassword.value = "";
            displayResult('User already exists');
            return;
        }
    }
}

function userExists(userInfo){
    return users.some(
        user => userInfo.email === user.email || userInfo.phone === user.phone
    );
}

document.querySelector('.register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    

    if(conPassword.value != password.value){
        conPassword.value = "";
        password.value = "";
        displayResult('Passwords do not match');
    }else{
        const userInfo = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        };

        registerUser(userInfo);
    }
});


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