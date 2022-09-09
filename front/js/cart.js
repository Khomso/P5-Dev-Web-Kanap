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
console.log(cart); // récupération de l'item dans le local storage

const cartItemDisplay = document.getElementById("cart__items");
const numberOfItems = cart.items.length; // pour savoir combien de clé il y a dans le panier
console.log(numberOfItems);

for (let i = 0; i < numberOfItems; i++) {
  const item = cart.items[i];
  console.log(item);

  fetch(`http://localhost:3000/api/products/${item.itemId}`)
    .then((res) => res.json())
    .then((sofa) => {
      console.log(sofa);
      const itemDisplay = document.createElement("item");

      itemDisplay.innerHTML = `
    <article class="cart__item" data-id="${item.itemId}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${sofa.name}</h2>
            <p>${item.color}</p>
            <p>${sofa.price * item.quantity} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${item.quantity} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
    </article>  
  `;
      cartItemDisplay.append(itemDisplay);
    });
} // boucle pour parcourir le tableau
