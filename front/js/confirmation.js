const searchParams = new URLSearchParams(window.location.search);
const orderId = searchParams.get("orderId");
const confirmationOrder = document.getElementById("orderId")

confirmationOrder.innerHTML = orderId

window.localStorage.clear()
