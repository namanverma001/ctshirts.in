import { writeUserData } from "./firebase.js";


async function validateSignup()
{
    let newUser = {
        name : document.querySelector('.js-name').value ,
        email : document.querySelector('.js-email').value,
        password : document.querySelector('.js-password').value
    }
    await writeUserData(newUser.name , newUser);
    sessionStorage.setItem('UserData' , JSON.stringify(newUser));
        window.location.href = 'index.html';
};



document.querySelector('.js-submit')
    .addEventListener(('click') , () => {
        validateSignup();
});








    
