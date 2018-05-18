document.addEventListener("DOMContentLoaded", (event) => {
    let vare_id = getParameterByName('vare_id')
    let ProductContainer = document.querySelector('#ProductContainer')
    fetch(api_addresse + 'varer/' + vare_id)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json)

            let imageContainer = document.createElement('div');
            ProductContainer.appendChild(imageContainer);
            ProductContainer.setAttribute('id', "productContainer")

            let image = document.createElement('img');
            image.setAttribute("src", api_addresse + 'images/' + json[0].vare_billede);
            imageContainer.appendChild(image)

            let descBox = document.createElement('div');
            ProductContainer.appendChild(descBox);

            let itemName = document.createElement('h2');
            itemName.textContent = json[0].vare_navn;
            descBox.appendChild(itemName)


            let itemSupplier = document.createElement('a');
            itemSupplier.textContent = json[0].producent_navn;
            itemSupplier.setAttribute('class', 'itemSupplier')
            descBox.appendChild(itemSupplier)

            let Category = document.createElement('a');
            Category.textContent = json[0].kategori_navn;
            descBox.appendChild(Category)

            let itemDescription = document.createElement('p');
            itemDescription.textContent = json[0].vare_beskrivelse;
            itemDescription.setAttribute('class', 'itemDescription');
            descBox.appendChild(itemDescription)

            let price = document.createElement('p');
            price.textContent = json[0].vare_pris + ",-" + "/stk";
            price.setAttribute('class', 'price');
            descBox.appendChild(price)
        })


})

