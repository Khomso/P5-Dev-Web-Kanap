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
console.log(cart);

// mise a jour local storage
function updateLocalStorage() {
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart));
}

// function addItem(id, color, price) {
//   const itemFound = cart.items.find((cartItem) => {
//     return cartItem.item.itemId === id && cartItem.item.color === color;
//   }); // récherche un éléments avec la même id et même couleur

//   if (itemFound) {
//     itemFound.quantity += 1; // si on a déja l'élement on ajoute 1
//   } else {
//     cart.items.push({
//       itemId: id,
//       color: color,
//       price: price,
//       quantity: 1,
//     }); // sinon on ajoute les éléments dans le tableau
//   }
//   updateLocalStorage(); // mise a jour local storage
// }

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
        // cart__item__content__settings__quantity
        const quantityTextElt = element.querySelector(
          ".cart__item__content__settings__quantity p"
        );
        // mise a jour du nombre d'item
        itemInCart.quantity = parseInt(evt.target.value, 10);
        // mise a jour de la valeur "quantity"
        quantityTextElt.innerHTML = `Qté : ${itemInCart.quantity}`;
        // recup l'élément du prix
        // recup modifier le prix
        //mise a jour du local storage
        updateLocalStorage();
      });
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
        </div>
        </div>
        </article>  
        `;
        deleteItemButton.addEventListener("click", () => {
          cart.items = cart.items.filter(
            (cartItem) => 
               cartItem.itemId !== item.itemId || cartItem.color !== item.color // filtrage de l'élément à supprimer
          );
          updateLocalStorage(); // mise a jour local storage

          cartItemDisplay.removeChild(itemDisplay); // supression de l'élément dans l'interface
        });
        itemDisplay.appendChild(deleteItemButton); //ajout du bouton à l'élément en cours
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
