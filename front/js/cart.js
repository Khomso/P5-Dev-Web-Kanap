const cartLocalStorageKey = 'cart'
const cartFromLocalStorage = localStorage.getItem(cartLocalStorageKey)
let cart = {
  items: [],
}
if (cartFromLocalStorage) {
  cart = JSON.parse(cartFromLocalStorage)
} else {
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart))
}
console.log(cart);

