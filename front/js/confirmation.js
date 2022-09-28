const searchParams = new URLSearchParams(window.location.search); // on va chercher le num de commande dans url 
const orderId = searchParams.get("orderId"); // on place le num de commande dans une constante
const confirmationOrder = document.getElementById("orderId") // on cible l'élément html 

confirmationOrder.innerHTML = orderId // on injecte dans le html le num de commande

window.localStorage.clear() // on vide le local storage
