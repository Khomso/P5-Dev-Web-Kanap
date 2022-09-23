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

// calcul du prix du panier et des articles
function updatePriceBasket() {
  let total = 0;
  let quantity = 0;
  const totalPrice = document.querySelector("#totalPrice");
  const totalQuantity = document.querySelector("#totalQuantity");

  cart.items.forEach((item) => {
    const totalUnitPrice = item.price * item.quantity;
    total += totalUnitPrice;
    quantity += item.quantity;
  });
  totalQuantity.innerHTML = `${quantity}`;
  totalPrice.innerHTML = `${total}`;
}

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
        // mise a jour du prix du panier
        updatePriceBasket();
      });
      // suppression de l'éléments
      //
      const deleteItemButton = element.querySelector(".deleteItem");

      deleteItemButton.addEventListener("click", (evt) => {
        cart.items = cart.items.filter(
          (cartItem) =>
            cartItem.itemId !== itemInCart.itemId ||
            cartItem.color !== itemInCart.color // filtrage de l'élément à supprimer
        );
        // cartItemDisplay.removeChild(element); // supression de l'élément dans l'interface
        element.remove(); // supression de l'élément dans l'interface
        updateLocalStorage();
        // mise a jour du prix du panier
        updatePriceBasket();
      });
    }
  }
}

if (cartItemDisplay) {
  cart.items.forEach((item) => {
    fetch(`http://localhost:3000/api/products/${item.itemId}`)
      .then((res) => res.json())
      .then((article) => {
        const itemDisplay = document.createElement("item");
        const deleteItemButton = document.createElement("div");

        // on recupère le prix depuis l'article
        item.price = article.price

        deleteItemButton.className = "cart__item__content__settings__delete";
        deleteItemButton.innerHTML = `<p class="deleteItem">Supprimer</p>`; // création button affichage

        itemDisplay.innerHTML = `
        <article class="cart__item" data-id="${item.itemId}" data-color="${
          item.color
        }">
        <div class="cart__item__img">
          <img src="${article.imageUrl}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${item.color}</p>
            <p>${article.price * item.quantity} €</p>
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
        // mise a jour du prix du panier
        updatePriceBasket();
      });
  });
}

// **************** Formulaire********************************

const orderButton = document.getElementById("order"); // on cible le button commander

orderButton.addEventListener("click", (evt) => {
  evt.preventDefault(); // on évite le rafraichissement de la page
  if (cart.items.length == 0) {
    alert(" Veuillez selectionner les articles a commander ! ");
    return;
  } // oblige le visiteur a selectionné un article

  const form = document.querySelector(".cart__order__form"); // on cible le formulaire

  function controlFirstName() {
    const firstName = form.elements.firstName.value;
    if (/^[A-Za-z]{3,20}$/.test(firstName)) {
      return true;
    } else {
      const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
      firstNameErrorMsg.innerHTML =
        "Chiffre et symbole ne sont pas autorisé.Ne pas dépasser 20 caractères, minimum 3 caractères.";
      return false;
    }
  }
  function controlLastName() {
    const lastName = form.elements.lastName.value;
    if (/^[A-Za-z]{3,20}$/.test(lastName)) {
      return true;
    } else {
      const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
      lastNameErrorMsg.innerHTML =
        "Chiffre et symbole ne sont pas autorisé.Ne pas dépasser 20 caractères, minimum 3 caractères.";
      return false;
    }
  }
  function controlAdress() {
    const address = form.elements.address.value;
    if (/^[0-9A-Za-zÀ-ÖØ-öø-ÿ' -,.]+$/.test(address)) {
      return true;
    } else {
      const addressErrorMsg = document.getElementById("addressErrorMsg");
      addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse.";
      return false;
    }
  }
  function controlCity() {
    const city = form.elements.city.value;
    if (/^[A-Za-z]{3,20}$/.test(city)) {
      return true;
    } else {
      const cityErrorMsg = document.getElementById("cityErrorMsg");
      cityErrorMsg.innerHTML =
        "Chiffre et symbole ne sont pas autorisé.Ne pas dépasser 20 caractères, minimum 3 caractères.";
      return false;
    }
  }
  function controlEmail() {
    const email = form.elements.email.value;
    if (/^[a-z0_9._-]+@[a-z0_9._-]{2,}\.[a-z]{2,4}$/.test(email)) {
      return true;
    } else {
      const emailErrorMsg = document.getElementById("emailErrorMsg");
      emailErrorMsg.innerHTML = "Veuillez renseigner une adresse mail.";
      return false;
    }
  }
  if (
    controlFirstName() &&
    controlLastName() &&
    controlAdress() &&
    controlCity() &&
    controlEmail()
  ) {
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const formBody = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: cart.items.map((item) => item.itemId),
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(formBody),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then(
        (dataForm) =>
          (window.location.href = `/front/html/confirmation.html?orderId=${dataForm.orderId}`)
      );
  }
});
