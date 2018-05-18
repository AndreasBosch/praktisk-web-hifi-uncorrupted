document.addEventListener("DOMContentLoaded", (event) => {
    fetch(api_addresse + "forside")
        .then(response => {
            return response.json();
        })
        .then(json => {
            let container = document.querySelector('#page-content-wrapper')

            json.forEach(section => {
                console.log(json)

                let gallery = document.createElement('div');
                gallery.setAttribute('class', 'gallery');
                container.appendChild(gallery)

                let header = document.createElement('h2');
                header.setAttribute('class', 'header1');
                header.textContent = section.forside_overskrift;
                header.style.color = section.farve_kode
                gallery.appendChild(header);

                let infoBox = document.createElement('div');
                infoBox.setAttribute('class', 'infobox');
                infoBox.style.backgroundColor = section.farve_kode
                infoBox.style.color = section.font_farve

                let info = document.createElement('p');
                info.textContent = section.forside_beskrivelse;
                infoBox.appendChild(info)

                gallery.appendChild(infoBox);

                let image = document.createElement('img');
                image.setAttribute("src", api_addresse + "forside_billede/" + section.forside_billede);
                gallery.appendChild(image)
            })
        })
})