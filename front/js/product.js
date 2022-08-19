const searchParams = new URLSearchParams(window.location.search);
const meubleId = searchParams.get("id");

fetch(`http://localhost:3000/api/products/${meubleId}`)
  .then((res) => res.json())
  .then((meuble) => {
    console.log(meuble);
    const meubleTitle = document.getElementById("title");
    const meubleDescription = document.getElementById("description");
    const meublePrice = document.getElementById("price");
    const meubleColors = document.getElementById("colors");
    const colors = meuble.colors;
    
    meubleTitle.innerHTML = meuble.name;
    meubleDescription.innerHTML = meuble.description;
    meublePrice.innerHTML = meuble.price;

    colors.forEach((color) => {
        const option = document.createElement('option')
  
        option.setAttribute('value', color)
        option.innerHTML = color
        meubleColors.append(option)
      })
    

    // const elt = document.getElementById("items");

    // elt.innerHTML = `<ul>${colorsInnerHtmlListElements}</ul>`;
  });
