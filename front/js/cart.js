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
function addItem(id) {
  cart.items.push(id)
  localStorage.setItem(cartLocalStorageKey, JSON.stringify(cart))
}
// const listEl = document.getElementById('caught_pokemons')

// if (listEl) {
//   cart.items.forEach((pokemonId) => {
//     const liEl = document.createElement('li')

//     liEl.innerHTML = pokemonId
//     listEl.appendChild(liEl)
//   })
// }
// const releaseButton = document.getElementById('release')

// releaseButton.addEventListener('click', () => {
//   localStorage.clear()
//   location.reload()
// })