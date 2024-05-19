import { readUserData } from "./firebase.js";


async function validateLogin()
{
    let user = {
        name : document.querySelector('.js-login-name').value,
        password : document.querySelector('.js-login-password').value
    }
    const firebaseUser = await readUserData(user.name);
    if(firebaseUser.name == user.name && firebaseUser.password == user.password) {
        sessionStorage.setItem('UserData' , JSON.stringify(firebaseUser));
        window.location.href = 'index.html';
    } 
    else {
        alert("Failed");
    }

    
};

document.querySelector('.js-login-submit')
    .addEventListener(('click') , () => {
        validateLogin();
    });
