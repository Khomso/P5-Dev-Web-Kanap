// gerer l'affichage et les interactions de la page accueil

// méthode for each pour récup et injecter les articles sur la page acceuil
fetch("http://localhost:3000/api/products") 
  .then((res) => res.json())
  .then((data) => {
    const meubles = data; // on place les données dans une constante
    let meublesInnerHtmlListElements = ""; // création d'une variable vide pour l'injecter dans le html par la suite

    meubles.forEach((meuble) => {
      // boucle for each pour recup chaque éléments
      meublesInnerHtmlListElements += `
        <a href="./product.html?id=${meuble._id}">
            <article>
                <img src="${meuble.imageUrl}" alt="${meuble.altTxt}">
                <h3 class="productName">${meuble.name}</h3>
                <p class="productDescription">${meuble.description}</p>
            </article>
        </a> `;
    });

    const elt = document.getElementById("items"); // on récupère l'id dans le html

    elt.innerHTML = `<ul>${meublesInnerHtmlListElements}</ul>`; // on l'injecte dans le html avc la propriété "inner"
  });
