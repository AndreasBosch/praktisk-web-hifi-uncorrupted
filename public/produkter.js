document.addEventListener("DOMContentLoaded", (event) => {
    let fetchAddress = ''
    let search = getParameterByName('search');
    let producent_id = getParameterByName('producent_id')


    let kategori_id = getParameterByName('kategori_id');
    if ((kategori_id == undefined || isNaN(kategori_id)) && search == undefined && (producent_id == undefined || isNaN(producent_id))) {
        fetchAddress = api_addresse + "varer";


    } else if (kategori_id != undefined) {
        fetchAddress = api_addresse + 'varer/kategori/' + kategori_id;
        console.log(fetchAddress)




    } else if (search != undefined) {
        fetchAddress = api_addresse + "search/" + search;
        let form = document.querySelector('#searchForm');
        form.search.value = search;
    }
    else if (producent_id != undefined) {
        fetchAddress = api_addresse + "varer/producent/" + producent_id;
        console.log(fetchAddress)
    }




    fetch(fetchAddress)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let itemcontainer = document.querySelector('#items')
            json.forEach(item => {
                console.log(json)


                let container = document.createElement('div');
                itemcontainer.appendChild(container);
                container.setAttribute('class', "containerMin")

                let seperateItem = document.createElement('div');
                container.appendChild(seperateItem);

                let imageLink = document.createElement('a');
                imageLink.setAttribute('href', 'produktside.html?vare_id=' + item.vare_id);
                seperateItem.appendChild(imageLink);

                let image = document.createElement('img');
                image.setAttribute("src", api_addresse + 'images/' + item.vare_billede);
                imageLink.appendChild(image)

                let descBox = document.createElement('div');
                descBox.setAttribute('class', 'descBox')
                container.appendChild(descBox);

                let itemName = document.createElement('a');
                itemName.setAttribute('class', 'itemName');
                itemName.setAttribute('href', 'produktside.html?vare_id=' + item.vare_id)
                itemName.textContent = item.vare_navn;
                descBox.appendChild(itemName)

                let itemSupplier = document.createElement('a');
                itemSupplier.textContent = item.producent_navn;
                itemSupplier.setAttribute('class', 'supplier')
                descBox.appendChild(itemSupplier)

                let Category = document.createElement('a');
                Category.textContent = item.kategori_navn;
                Category.setAttribute('class', 'category')
                descBox.appendChild(Category)


                let itemDescription = document.createElement('p');

                itemDescription.setAttribute('class', 'itemDescription')

                itemDescription.textContent = truncateText(item.vare_beskrivelse, 107);
                descBox.appendChild(itemDescription);



                let price = document.createElement('p');
                price.textContent = item.vare_pris + "kr.-";
                price.setAttribute('class', 'price');
                descBox.appendChild(price)
            })

        })


    fetch(api_addresse + 'producenter')
        .then(response => {
            return response.json();
        })
        .then(json => {
            let list = document.querySelector('#myUL');
            console.log(list)
            json.forEach(supplier => {
                console.log(json)


                let listItem = document.createElement('li');
                list.appendChild(listItem);

                let listLink = document.createElement('a');
                listLink.setAttribute('href', 'produkter.html?producent_id=' + supplier.producent_id);
                listLink.textContent = supplier.producent_navn;
                listItem.appendChild(listLink)
            })

        })

    fetch(api_addresse + 'kategorier')
        .then(response => {
            return response.json();
        })
        .then(json => {
            let list = document.querySelector('#myUL2');
            console.log(list)
            json.forEach(category => {
                console.log(json)


                let listItem = document.createElement('li');
                list.appendChild(listItem);

                let listLink = document.createElement('a');
                listLink.setAttribute('href', 'produkter.html?kategori_id=' + category.kategori_id);
                listLink.textContent = category.kategori_navn;
                listItem.appendChild(listLink)
            })


        })



})
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function myFunction2() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL2");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



document.querySelector('#producentList').addEventListener('click', event => {
    if ($('#producentList').hasClass("vis")) {
        $('#producentList').removeClass("vis").addClass('gem');
        $('#producentSortering').show('blind')

    } else {
        $('#producentList').removeClass('gem').addClass('vis')

        $('#producentSortering').hide('blind')
    }
})

document.querySelector('#kategoriList').addEventListener('click', event => {
    if ($('#kategoriList').hasClass("vis")) {
        $('#kategoriList').removeClass("vis").addClass('gem');
        $('#kategoriSortering').show('blind')

    } else {
        $('#kategoriList').removeClass('gem').addClass('vis')

        $('#kategoriSortering').hide('blind')
    }
})