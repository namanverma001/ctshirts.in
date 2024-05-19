// export const homesizeToggle = (event,id,size) => {
//     const currentCardElement=document.querySelector(`#card${id}`);
//     //console.log(currentCardElement);
//     const productsize=currentCardElement.querySelector(".size-selector .sizes .size-button");
//     // console.log(productsize);
    
//  };

export const homesizeToggle = (event, id, size) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    const sizeButtons = currentCardElement.querySelectorAll(".size-selector .sizes .size-button");

    // sizeButtons.forEach(button => {
    //     button.classList.remove('active');
    // });

    // const clickedButton = event.target;
    // clickedButton.classList.add('active');

    // // Get the selected size
    // const selectedSize = clickedButton.textContent;
    // console.log(selectedSize);
    // // Pass the selected size to addToCart function
    // addToCart(event, id, size, selectedSize);
};