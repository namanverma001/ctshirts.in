import "./style.css";
import products from "./api/products.json";
import { showProductContainer } from "./homeProductCards";
import { writeUserData } from "./firebase.js";


// if(JSON.parse(sessionStorage.getItem('UserData')) == null)
// {
//   window.location.href = 'login.html';
// }

// document.querySelector('.js-logged-user-name')
//   .innerHTML = `Hii!${JSON.parse(sessionStorage.getItem('UserData')).name}`;

// document.querySelector('.js-logout')
//   .addEventListener(('click') , () => {
//     sessionStorage.removeItem('UserData');
//     window.location.reload();
//   })

// Define a function named `showProductContainer` that takes an array of products as input.
showProductContainer(products);

// slider
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
document.addEventListener("DOMContentLoaded", function() {
  const sizeButtons = document.querySelectorAll('.size-button');
  
  sizeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'active' class from all buttons
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add 'active' class to the clicked button
      this.classList.add('active');
      
      // Get the selected size
      const selectedSize = this.textContent; // Get the size text directly from the button
      
      // Do something with the selected size (e.g., send it to the server, store it in a variable, etc.)
      // console.log('Selected size:', selectedSize);
      
      // If you want to pass the selected size to a function like addToCart, you can do it here
      // For example:
      // addToCart(event, 'product_id', 'product_stock', selectedSize);
    });
  });
});
