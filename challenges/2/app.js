//variables
var menuListElement,
  cartEmpty,
  cartListElement,
  cartIndex,
  subtotalElement,
  taxApplied,
  taxElement,
  totalElement;
const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 223,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 512,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti Meat Sauce",
    price: 782,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 599,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 698,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 634,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];

//methods

window.addEventListener("load", () => {
  cartIndex = 0;
  taxApplied = 0.0975;
  subtotalElement = document
    .getElementsByClassName("line-item")[0]
    .getElementsByClassName("subtotal")[0];
  taxElement = document
    .getElementsByClassName("line-item")[1]
    .getElementsByClassName("tax")[0];
  totalElement = document
    .getElementsByClassName("line-item")[2]
    .getElementsByClassName("total")[0];
  menuListElement = document.getElementsByTagName("ul")[0];
  loadMenu();
  cartEmpty = true;
  cartListElement = document.getElementsByTagName("ul")[1];
});

var loadMenu = () => {
  menuListElement.innerHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    let plate = menuItems[i];
    createPlateItem(i, plate);
  }
};

var createPlateItem = (index, plate) => {
  let li = document.createElement("li");
  let divPlateImage = document.createElement("div");
  let imgPlateImage = document.createElement("img");
  imgPlateImage.setAttribute("src", `images/${plate.image}`);
  imgPlateImage.setAttribute("alt", plate.alt);
  imgPlateImage.setAttribute("class", "plate");
  divPlateImage.setAttribute("class", "plate");
  divPlateImage.appendChild(imgPlateImage);
  let divPlateContent = document.createElement("div");
  divPlateContent.setAttribute("class", "content");
  let pPlateName = document.createElement("p");
  pPlateName.setAttribute("class", "menu-item");
  let nameText = document.createTextNode(plate.name);
  pPlateName.appendChild(nameText);
  let pPlatePrice = document.createElement("p");
  pPlatePrice.setAttribute("class", "price");
  let priceText = document.createTextNode(`$${plate.price / 100}`);
  pPlatePrice.appendChild(priceText);
  let button = document.createElement("button");
  let buttonText;
  if (plate.count == 0) {
    button.setAttribute("class", "add");
    button.setAttribute("onclick", `addToCart(${index})`);
    buttonText = document.createTextNode("Add to cart");
  } else {
    let checkImage = document.createElement("img");
    checkImage.setAttribute("src", "images/check.svg");
    checkImage.setAttribute("alt", "Check");
    button.setAttribute("class", "in-cart");
    buttonText = document.createTextNode("In Cart");
  }
  button.appendChild(buttonText);
  divPlateContent.appendChild(pPlateName);
  divPlateContent.appendChild(pPlatePrice);
  divPlateContent.appendChild(button);
  li.appendChild(divPlateImage);
  li.appendChild(divPlateContent);
  menuListElement.appendChild(li);
};

var addToCart = (index) => {
  menuItems[index].count++;
  let plate = menuItems[index];
  createCartItem(index, plate);
  loadMenu();
  calculateSubtotal();
};

var createCartItem = (index, plate) => {
  if (cartEmpty) {
    let emptyMessage = document.getElementsByClassName("empty")[0];
    emptyMessage.setAttribute("hidden", "");
    !cartEmpty;
  }
  let li = document.createElement("li");
  li.setAttribute("id", `cartPlate-${cartIndex}`);
  //image div
  let divPlateImage = document.createElement("div");
  let imgPlateImage = document.createElement("img");
  imgPlateImage.setAttribute("src", `images/${plate.image}`);
  imgPlateImage.setAttribute("alt", plate.alt);
  imgPlateImage.setAttribute("class", "plate");
  divPlateImage.setAttribute("class", "plate");
  divPlateImage.appendChild(imgPlateImage);
  let pQuantityImage = document.createElement("div");
  pQuantityImage.setAttribute("class", "quantity");
  pQuantityImage.setAttribute("id", `imgQuantity-${cartIndex}`);
  let quantityTextImage = document.createTextNode(`${plate.count}`);
  pQuantityImage.appendChild(quantityTextImage);
  divPlateImage.appendChild(pQuantityImage);
  //content div
  let divPlateContent = document.createElement("div");
  divPlateContent.setAttribute("class", "content");
  let pPlateName = document.createElement("p");
  pPlateName.setAttribute("class", "menu-item");
  let nameText = document.createTextNode(plate.name);
  pPlateName.appendChild(nameText);
  let pPlatePrice = document.createElement("p");
  pPlatePrice.setAttribute("class", "price");
  let priceText = document.createTextNode(`$${plate.price / 100}`);
  pPlatePrice.appendChild(priceText);
  divPlateContent.appendChild(pPlateName);
  divPlateContent.appendChild(pPlatePrice);
  //quantity div
  let divQuantityWrapper = document.createElement("div");
  divQuantityWrapper.setAttribute("class", "quantity__wrapper");
  let buttonDecrease = document.createElement("button");
  buttonDecrease.setAttribute("class", "decrease");
  let buttonImageDecrease = document.createElement("img");
  buttonImageDecrease.setAttribute("src", `images/chevron.svg`);
  buttonDecrease.appendChild(buttonImageDecrease);
  buttonDecrease.setAttribute("onclick", `decrease(${index},${cartIndex})`);
  let pQuantity = document.createElement("div");
  pQuantity.setAttribute("class", "quantity");
  let quantityText = document.createTextNode(`${plate.count}`);
  pQuantity.appendChild(quantityText);
  pQuantity.setAttribute("id", `cart-${cartIndex}`);
  let buttonIncrease = document.createElement("button");
  buttonIncrease.setAttribute("class", "increase");
  let buttonImageIncrease = document.createElement("img");
  buttonImageIncrease.setAttribute("src", `images/chevron.svg`);
  buttonIncrease.appendChild(buttonImageIncrease);
  buttonIncrease.setAttribute("onclick", `increase(${index},${cartIndex})`);
  //add onclick increase
  divQuantityWrapper.appendChild(buttonDecrease);
  divQuantityWrapper.appendChild(pQuantity);
  divQuantityWrapper.appendChild(buttonIncrease);
  //subtotal
  let divSubtotal = document.createElement("div");
  divSubtotal.setAttribute("class", "subtotal");
  divSubtotal.setAttribute("id", `subtotal-${cartIndex}`);
  let subtotalPlateAmmount = document.createTextNode(
    `${(plate.price / 100) * plate.count}`
  );
  divSubtotal.appendChild(subtotalPlateAmmount);
  li.appendChild(divPlateImage);
  li.appendChild(divPlateContent);
  li.appendChild(divQuantityWrapper);
  li.appendChild(divSubtotal);
  cartListElement.appendChild(li);
  cartIndex++;
};

var decrease = (index, cartInd) => {
  menuItems[index].count--;
  if (menuItems[index].count == 0) {
    let cartPlate = document.getElementById(`cartPlate-${cartInd}`);
    cartListElement.removeChild(cartPlate);
    loadMenu();
  } else {
    let plateQuantity = document.getElementById(`cart-${cartInd}`);
    let plateImgQuantity = document.getElementById(`imgQuantity-${cartInd}`);
    plateQuantity.textContent = menuItems[index].count;
    plateImgQuantity.textContent = menuItems[index].count;
  }
  calculatePlateSubtotal(index, cartInd);
};
var increase = (index, cartInd) => {
  menuItems[index].count++;
  let plateQuantity = document.getElementById(`cart-${cartInd}`);
  let plateImgQuantity = document.getElementById(`imgQuantity-${cartInd}`);
  plateQuantity.textContent = menuItems[index].count;
  plateImgQuantity.textContent = menuItems[index].count;
  calculatePlateSubtotal(index, cartInd);
};

var calculatePlateSubtotal = (index, cartInd) => {
  let thisSubtotal = document.getElementById(`subtotal-${cartInd}`);
  if (thisSubtotal) {
    thisSubtotal.textContent = (
      (menuItems[index].price / 100) *
      menuItems[index].count
    ).toFixed(2);
  }
  calculateSubtotal();
};

var calculateSubtotal = () => {
  let allPlatesSubtotal = cartListElement.getElementsByClassName("subtotal");
  let subtotalAmmount = 0;
  for (let i = 0; i < allPlatesSubtotal.length; i++) {
    subtotalAmmount += parseFloat(allPlatesSubtotal[i].textContent);
  }
  subtotalElement.textContent = `$${subtotalAmmount.toFixed(2)}`;
  calculateTaxes(subtotalAmmount)
};

var calculateTaxes=(subtotalAmmount)=>{
    let taxAmmount = (subtotalAmmount*taxApplied).toFixed(2)
    taxElement.textContent = `$${taxAmmount}`
    calculateTotal(subtotalAmmount,taxAmmount)
}
var calculateTotal = (subtotalAmmount,taxAmmount) => {
    totalElement.textContent = `$${(parseFloat(subtotalAmmount)+parseFloat(taxAmmount)).toFixed(2)}`
};
