// gerer l'affichage et les interactions de la page accueil

// const indexArticle = new Promise((resolve, reject) => {
//     if(ARTICLE !== 'undefined'){
//         resolve(ARTICLE)
//     }else{
//         reject('accès aux article impossible')
//     }
// })

// indexArticle
//     .then(function(a){
//     console.log(a);
//     })
//     .catch(function(e){
//     console.log(e);
//     })

// async function article(article) {
//   fetch("http://localhost:3000/api/products")
//     .then(function (reponse) {
//       return Response.json;
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }

// console.log(article);

// let p =new Promise((resolve, reject) => {
//     setTimeout (() => {
//         resolve();
//     }, 1000);
// })

// p.then(() => {
//     console.log("1");
//     console.log("2")
// })

// fetch("http://localhost:3000/api/products")
//   .then((result) => result.json())
//   .then((data) => {
//     return console.log(data);
//   });

// let elt = document.getElementById("items");
// elt.innerHTML = "<ul><li>Elément 1</li><li>Elément 2</li></ul>";

// # Methode 2 .forEach
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const meubles = data;
    let meublesInnerHtmlListElements = "";

    meubles.forEach((meuble) => {
      //   meublesInnerHtmlListElements += `<li>${meuble.name} : ${meuble.price} € </li>`
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
