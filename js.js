let myRequest = new XMLHttpRequest();
let MRequest = new XMLHttpRequest();
let url = "main.json"; // URL pointing to your local main.json file
let element = document.getElementById("element");
const buttons = document.querySelectorAll('.button');
let mass = document.getElementById("mass");
let pruduct = document.getElementById("pruduct");
const random = 0;

  function getRandomIndex(Jsondata) {
  return 1 + Math.floor(Math.random() * (Jsondata.length - 4));
}
function attachEventListeners(data) {
  document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('click', function() {
          let random = getRandomIndex(data.product);
          console.log("Random index: " + random);
          const index = this.getAttribute('data-index');
          const url = `index2.html?productId=${index}&rand=${random}`;
          window.open(url, '_blank');
      });
  });
}
myRequest.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);

      if (element) {
          let content = "";
          for (let i = 0; i < data.product.length; i++) {
              content += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="card">
                      <div class="card-image"><img src="${data.product[i].productImage}" alt=""></div>
                      <div class="card-title text-center" style="font-weight: bold;color: black;padding: 5px;">${data.product[i].productName}</div>
                      <div class="prix text-center" style="font-weight: bold;color: red;padding: 3px;">${data.product[i].productPrice}</div>
                      <div style="margin-top: 5px;" class="button" data-index="${i}">Buy Now</div>
                  </div>
              </div>`;
          }
          element.innerHTML = content;
      }

      if (pruduct) {
          let m = "";
          for (let j = 0; j < 6; j++) {
              m += `<div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <div class="card">
                      <div class="card-img"><img src="${data.product[j].productImage}" class="img-responsive" alt=""></div>
                      <div class="text-center card-title">${data.product[j].productName}</div>
                      <div class="text-center card-prix">${data.product[j].productPrice}</div>
                      <div class="button" data-index="${j}">Buy Now</div>
                  </div>
              </div>`;
          }
          pruduct.innerHTML = m;
      }

      // Attach event listeners after DOM is updated
      attachEventListeners(data);
  }
};

myRequest.open("GET", url, true);
myRequest.send();

window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('productId');
  const rand = parseInt(params.get('rand'), 10);
  if (productId !== null) {
      let request = new XMLHttpRequest();
      request.open("GET", "main.json", true);
      request.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              const data = JSON.parse(this.responseText);
              if (productId < data.product.length) {
                  const product = data.product[productId];
                  const element = document.getElementById("mass");
                  element.innerHTML = `<div><img src="${product.productImage}" width="100%" height="100%" alt=""></div>
                      <div style="padding: 15px;">
                          <h1 style="font-weight: bold;">${product.productName}</h1>
                          <h4 style="color: red;">${product.productPrice} MAD</h4>
                          <p>${product.productDescription || 'No description available.'}</p>
                          <button style="width: 100%; border-radius: 0px; font-weight: bold;" type="button" class="btn btn-danger">Add To Cart</button>
                      </div>`;
              }

              let content2 = "";
              for (let i = rand; i < rand + 4 && i < data.product.length; i++) {
                  content2 += `<div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
                      <div class="card">
                          <div class="card-img"><img src="${data.product[i].productImage}" class="img-responsive" alt=""></div>
                          <div class="text-center card-title">${data.product[i].productName}</div>
                          <div class="text-center card-prix">${data.product[i].productPrice} MAD</div>
                          <div class="button" data-index="${i}">Buy Now</div>
                      </div>
                  </div>`;
              }
              row.innerHTML = content2;
              attachEventListeners(data); // Reattach listeners after content update
          }
      };
      request.send();
  }
};



