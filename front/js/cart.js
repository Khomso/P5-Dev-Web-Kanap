// récupération de l'item dans le local storage
const cartLocalStorageKey = "cart";
const cartFromLocalStorage = localStorage.getItem(cartLocalStorageKey);
const cartItemDisplay = document.getElementById("cart__items");

let cart = {
  items: [],
};
if (cartFromLocalStorage) {
  cart = JSON.parse(cartFromLocalStorage);
} else {
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart));
}

// mise a jour local storage
function updateLocalStorage() {
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart));
}

// partie importante !!!
// liaison des contrôles sur les éléments html

function bindControls(item) {
  const elements = document.getElementsByClassName("cart__item");

  for (const element of elements) {
    if (
      item.itemId === element.dataset.id &&
      item.color === element.dataset.color // on cherche qui a l'identifiant et la couleur dans la liste
    ) {
      const itemInCart = cart.items.find((it) => {
        return it.itemId === item.itemId && it.color === item.color; // on recherche l'élement dans le object local
      });
      const inputQuantityControlElement =
        element.getElementsByClassName("itemQuantity")[0];
     
      // click listener sur le bouton de modification des quantités
      inputQuantityControlElement.addEventListener("change", (evt) => {
        const quantityTextElt = element.querySelector(
          ".cart__item__content__settings__quantity p"
        );
        const priceTextElt = element.querySelectorAll(
          ".cart__item__content__description p"
        )[1];
        
        // mise a jour du nombre d'item
        itemInCart.quantity = parseInt(evt.target.value, 10);
        // mise a jour de la valeur "quantity"
        quantityTextElt.innerHTML = `Qté : ${itemInCart.quantity}`;
        // mettre a jour le prix
        priceTextElt.innerHTML = `${itemInCart.price * itemInCart.quantity} €`;
        //mise a jour du local storage
        updateLocalStorage();
      });
      // suppression de l'éléments
      // 
      const deleteItemButton = element.querySelector(".deleteItem");

      deleteItemButton.addEventListener("click", (evt) => {
          cart.items = cart.items.filter(
            (cartItem) =>
              cartItem.itemId !== itemInCart.itemId || cartItem.color !== itemInCart.color // filtrage de l'élément à supprimer
          );
          // cartItemDisplay.removeChild(element); // supression de l'élément dans l'interface
          element.remove(); // supression de l'élément dans l'interface
          updateLocalStorage();
      })

    }
  }
}

if (cartItemDisplay) {
  cart.items.forEach((item) => {
    fetch(`http://localhost:3000/api/products/${item.itemId}`)
      .then((res) => res.json())
      .then((sofa) => {
        const itemDisplay = document.createElement("item");
        const deleteItemButton = document.createElement("div");

        deleteItemButton.className = "cart__item__content__settings__delete";
        deleteItemButton.innerHTML = `<p class="deleteItem">Supprimer</p>`; // création button affichage

        itemDisplay.innerHTML = `
        <article class="cart__item" data-id="${item.itemId}" data-color="${
          item.color
        }">
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            item.quantity
          }">
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
        </div>
        </article>  
        `;
        cartItemDisplay.appendChild(itemDisplay); // ajout de l'élément en cours
        bindControls(item); //liaison des contrôles de l'élement en cours
      });
  });
}
const deleteAllItem = () => {
  localStorage.clear();
  location.reload();
};

// mettre a jour le prix et prix total

// Prix total du panier article

// const totalPriceBasket = [] ; // constante pour pouvoir mettre les prix dans un tableau

// if (produitLocalStorage[z].id === produitLocalStorage[z].id) {

// const articleTotal =
// produitLocalStorage[z].quantity * lot[v].price;

// totalPriceBasket.push(articleTotal);

// const reducer = (accumulator, curr) => accumulator + curr;
// const totalPrix = totalPriceBasket.reduce(reducer);

// let htmlPrix = document.querySelector("#totalPrice");
// htmlPrix.innerHTML = `${totalPrix}`;
// }
console.log(cart);
console.log(cart.items);

function TotalPriceBasket(item) {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  cart.items.forEach((item) => {
    const totalUnitPrice = item.price * item.quantity;
    total += totalUnitPrice;
  });

}