const footerHTML = `
<footer class="section-footer">
<div class="footer-container container">
  <div class="content_1">
    <img src="./images/logo1.png" alt="logo" />
    <p>
      Welcome to ctshirts.in, your ultimate destination for
      Customized!
    </p>
    <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
  </div>
  <div class="content_2">
    <h4>SHOPPING</h4>
    <a href="#">Normal Wear</a>
    <a href="#">Sports Wear</a>
    <a href="#">Customized Yourself</a>
    <a href="#">Sales & Discount</a>
  </div>
  <div class="content_3">
    <h4>Experience</h4>
    <a href="./contact.html">Contact Us</a>
    <a href="" target="_blank">Payment Method</a>
    <a href="" target="_blank">Delivery</a>
    <a href="" target="_blank">Return and Exchange</a>
  </div>
  <div class="content_4">
    <h4>NEWSLETTER</h4>
    <p>Be the first to know about new<br />arrivals, sales & promos!</p>
    <div class="f-mail">
      <input type="email" placeholder="Your Email" />
      <i class="bx bx-envelope"></i>
    </div>
    <hr />
  </div>
</div>
<div class="f-design">
  <div class="f-design-txt">
    <p>@copyright 2024 ctshirts.in</p>
  </div>
</div>
</footer>`;

const footerElem = document.querySelector(".section-footer");
footerElem.insertAdjacentHTML("afterbegin", footerHTML);
