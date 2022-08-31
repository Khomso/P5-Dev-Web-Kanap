const searchParams = new URLSearchParams(window.location.search);
const meubleId = searchParams.get("id");
const cartLocalStorageKey = "cart";
const cartFromLocalStorage = localStorage.getItem(cartLocalStorageKey);
let cart = {
  items: [],
};

if (cartFromLocalStorage) {
  cart = JSON.parse(cartFromLocalStorage);
} else {
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart));
}

fetch(`http://localhost:3000/api/products/${meubleId}`)
  .then((res) => res.json())
  .then((meuble) => {
    console.log(meuble);
    const meubleTitle = document.getElementById("title");
    const meubleDescription = document.getElementById("description");
    const meublePrice = document.getElementById("price");
    const meubleColors = document.getElementById("colors");
    const imageDisplay = document.createElement("img");
    const imageMeuble = document.querySelector(".item__img");
    const addToCart = document.getElementById("addToCart");
    const colors = meuble.colors;

    addToCart.addEventListener("click", () => {
      const meubleQuantity = document.getElementById("quantity").value;
      const meubleColorsSelect = document.getElementById("colors");
      const colorValue =
        meubleColorsSelect.options[meubleColorsSelect.selectedIndex].value;
    
      cart.items.push({
        quantity: meubleQuantity,
        color: colorValue,
        itemId: meubleId,
      });
      localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart));
    });

    meubleTitle.innerHTML = meuble.name;
    meubleDescription.innerHTML = meuble.description;
    meublePrice.innerHTML = meuble.price;

    imageDisplay.src = meuble.imageUrl;
    imageDisplay.alt = meuble.altTxt;

    if (imageMeuble != null) {
      imageMeuble.append(imageDisplay);
    }

    colors.forEach((color) => {
      const option = document.createElement("option");

      option.setAttribute("value", color);
      option.innerHTML = color;
      meubleColors.append(option);
    });
  });
