// gerer l'affichage et les interactions de la page accueil

// méthode for each pour récup et injecter les articles sur la page acceuil
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const meubles = data;
    let meublesInnerHtmlListElements = "";

    meubles.forEach((meuble) => {
      meublesInnerHtmlListElements += `
        <a href="./product.html?id=${meuble._id}">
            <article>
                <img src="${meuble.imageUrl}" alt="${meuble.altTxt}">
                <h3 class="productName">${meuble.name}</h3>
                <p class="productDescription">${meuble.description}</p>
            </article>
        </a> `;
    });

    const elt = document.getElementById("items");

    elt.innerHTML = `<ul>${meublesInnerHtmlListElements}</ul>`;
  });
