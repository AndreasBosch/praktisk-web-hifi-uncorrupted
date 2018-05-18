# **Beskeder.js**
## **Send besked vi form**

## Request Method: ``POST``

## URL: ``api/message``

Acceptable Headers
* application/json / application/x-www-form-urlencoded

Required Request Body: 
|felt       |datatype   |beskivelse       |
|:----------|:----------|:----------------|
|`email` |`string`   |brugerens email |
|`emne` |`string`   |emnet på beskeden |
|`indhold` |`string` |indholdet på beskeden|

Response type
* Application/json

Response Example

```
Status 200 OK
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 3,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
}
```
* `500` hvis der er opstår fejl på serveren, ikke reletaret til uopfyldte krav i **email**, **emne** eller **indhold**

* `400` hvis der mangler felter i **request.body**

* `200` når en beslked succesfyldt er blevet sendt til databasen


# **forside.js**
## **Hent billeder og indhold til forsiden samt farve-koder**

## Request Method: ``GET``

## URL: ``api/forside``

Response type
* Application/json

Response Example
```
{
        "forside_id": 1,
        "forside_overskrift": "PLADESPILLERENS COMEBACK",
        "forside_beskrivelse": "GRATIS MONTERING AF PICKUP VED KØB I HI-FI KLUBBEN!",
        "forside_billede": "blurdisc.png",
        "farve_id": 1,
        "farve_kode": "white",
        "font_farve": "#3a3737"
},
    {
        "forside_id": 2,
        "forside_overskrift": "FORBEREDT PÅ FESTIVALSÆSONEN?",
        "forside_beskrivelse": "KØB DE FEDESTE BLUETOOTH HØJTALERE HOS OS!",
        "forside_billede": "festival.png",
        "farve_id": 2,
        "farve_kode": "#90a53d",
        "font_farve": "white"
    },

```

* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet indhold fra databasen

# **images.js**
## **Hent alle vare-billederne og valider**

## Request Method: ``GET``

## URL: ``api/images``

Response type
* Application/json

Response Example

```
[
    "argon1.jpg",
    "b&o1.jpg",
    "denon1.jpg",
    "denon2.jpg",
    "nad1.jpg",
    "optoma1.jpg",
    "project1.jpg",
    "samsung1.jpg",
    "sonos1.jpg",
    "sonos2.jpg",
    "sony1.jpg"
]
 ```

 * `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet billeder

## **Hent specifikke vare-billeder og valider**

## Request Method: ``GET``

## URL: ``api/images/:image``

Response type
* Application/json


Required Request parameters

* :image

Response Example

`localhost:3000/api/images/b&o1.jpg`

![](api\varer/b&o1.jpg)

 * `500` hvis der er opstår fejl på serveren

 * `404` hvis den ønskede fil ikke er en .jpg eller .png

* `200` når der successfyldt er blevet hentet billeder


## **Hent alle forside-billederne og valider**

## Request Method: ``GET``

## URL: ``api/forside_billede``

Response type
* Application/json

Response Example

```
[
    "blurdisc.png",
    "Festival.png",
    "speaker.png",
    "television.png"
]
```


 * `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet billeder


## **Hent specifikke forside-billeder og valider**

## Request Method: ``GET``

## URL: ``api/forside_billede/:image``

Response type
* Application/json


Required Request parameters

* :image

Response Example

`localhost:3000/api/forside_billede/festival.png`

![](api\forside/festival.png )

 * `500` hvis der er opstår fejl på serveren

 * `404` hvis den ønskede fil ikke er en .jpg eller .png

* `200` når der successfyldt er blevet hentet billeder

# **search.js**
## **Søg igennem varer på databasen**

## Request Method: ``GET``

## URL: ``api/search:search``

Response type
* Application/json

Required Request parameters

* :search

 opret en variabel med søgeordet hvor der er klistret et % på hver side,
dette er den variabel der sendes med til SQL udførslen
```javascript
let freeText = '%' + req.params.search + '%' 
```

Response Example
`localhost:3000/api/search/pladespiller`

```
[

{
"vare_id": 3,
"vare_navn": "TT-2 USB PLADESPILLER",
"kategori_navn": "Pladespiller",
"producent_navn": "ARGON AUDIO",
"vare_beskrivelse": "TT-2 USB er en seriøs hi-fi-pladespiller med eksklusiv glas-pladetallerken og USB-tilslutning, så du kan overspille dine vinylplader til computeren. Indbygget phono-forforstærker for nem tilslutning til alle anlæg, pickup medfølger, sort eller hvid. (INDBYGGET RIAA)",
"vare_pris": "2999.00",
"vare_billede": "Argon1.jpg",
"kategori_id": 1,
"producent_id": 1
},

{
"vare_id": 6,
"vare_navn": "XTENSION 9 EVOLUTION",
"kategori_navn": "Pladespiller",
"producent_navn": "PROJECT",
"vare_beskrivelse": "Xtension 9 Evolution er en drøm af en pladespiller i eksklusiv højglanslakeret finish. Her får du lyd og tekniske løsninger, som kan leve op til niveauet i selv meget kostbare anlæg. Evolution-tonearm i kulfiber, pickup købes separat.",
"vare_pris": "16999.00",
"vare_billede": "project1.jpg",
"kategori_id": 1,
"producent_id": 9
}

]
```

 * `500` hvis der er opstår fejl på serveren

 * `400` hvis serveren ikke kan forstå syntaxen (BAD REQUEST)

* `200` når der successfyldt er blevet søgt efter varer på databasen

# **varer.js**
## **hent alle varer i databasen**

## Request Method: ``GET``

## URL: ``api/varer``

Response type
* Application/json

Response Example

```
[

{

"vare_id": 1,
"vare_navn": "PMA-30 FORSTÆRKER ",
"kategori_navn": "Forstærkere",
"producent_navn": "DENON",
"vare_beskrivelse": "PMA-30 er en smart og kompakt digital stereoforstærker, som giver dig lækker hi-fi-lyd, uden at du får et stort og kompliceret apparat i reolen. Du kan også streame trådløst fra smartphone via Bluetooth. Kan placeres både lodret og vandret.",
"vare_pris": "2899.00",
"vare_billede": "denon2.jpg",
"kategori_id": 10,
"producent_id": 10

},
    
{
"vare_id": 2,
"vare_navn": "RCD-M41 MUSIKANLÆG",
"kategori_navn": "Musikanlæg",
"producent_navn": "DENON",
"vare_beskrivelse": "RCD-M41 er et lækkert minianlæg med Bluetooth. Her får du lyd i ægte hi-fi-kvalitet til en fornuftig pris. Trådløs Bluetooth-streaming, FM-radio og CD-afspiller. Sort eller sølv metalfinish. Fås også i DAB-version (merpris kr. 300).",
"vare_pris": "2499.00",
"vare_billede": "denon1.jpg",
"kategori_id": 9,
"producent_id": 10
   
    }....
```

* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet alle varer fra databasen

## **hent specifikke varer i databasen**

## Request Method: ``GET``

## URL: ``api/varer/:vare_id``

Response type
* Application/json

Required Request parameters

* :vare_id

Response Example

`localhost:3000/api/varer/1`

```
[

{

"vare_id": 1,
"vare_navn": "PMA-30 FORSTÆRKER ",
"kategori_navn": "Forstærkere",
"producent_navn": "DENON",
"vare_beskrivelse": "PMA-30 er en smart og kompakt digital stereoforstærker, som giver dig lækker hi-fi-lyd, uden at du får et stort og kompliceret apparat i reolen. Du kan også streame trådløst fra smartphone via Bluetooth. Kan placeres både lodret og vandret.",
"vare_pris": "2899.00",
"vare_billede": "denon2.jpg",
"kategori_id": 10,
"producent_id": 10

}

]
```

* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet en vare fra databasen

## **hent specifikke varer i databasen baseret på kategori**

## Request Method: ``GET``

## URL: ``api/varer/kategori/:kategori_id``

Response type
* Application/json

Required Request parameters

* :kategori_id

Response Example

`localhost:3000/api/varer/kategori/1`

```
[

{
"vare_id": 3,
"vare_navn": "TT-2 USB PLADESPILLER",
"kategori_navn": "Pladespiller",
"producent_navn": "ARGON AUDIO",
"vare_beskrivelse": "TT-2 USB er en seriøs hi-fi-pladespiller med eksklusiv glas-pladetallerken og USB-tilslutning, så du kan overspille dine vinylplader til computeren. Indbygget phono-forforstærker for nem tilslutning til alle anlæg, pickup medfølger, sort eller hvid. (INDBYGGET RIAA)",
"vare_pris": "2999.00",
"vare_billede": "Argon1.jpg",
"kategori_id": 1,
"producent_id": 1
},

{
"vare_id": 6,
"vare_navn": "XTENSION 9 EVOLUTION",
"kategori_navn": "Pladespiller",
"producent_navn": "PROJECT",
"vare_beskrivelse": "Xtension 9 Evolution er en drøm af en pladespiller i eksklusiv højglanslakeret finish. Her får du lyd og tekniske løsninger, som kan leve op til niveauet i selv meget kostbare anlæg. Evolution-tonearm i kulfiber, pickup købes separat.",
"vare_pris": "16999.00",
"vare_billede": "project1.jpg",
"kategori_id": 1,
"producent_id": 9
}

]
```

* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet varer baseret på kategori fra databasen

## **hent specifikke varer i databasen baseret på producent**

## Request Method: ``GET``

## URL: ``api/varer/producent/:producent_id``

Response type
* Application/json

Required Request parameters

* :producent_id

Response Example

`localhost:3000/api/varer/producent/3`

```
[

{

"vare_id": 5,
"vare_navn": "BEOPLAY E8 TRÅDLØSE",
"kategori_navn": "Høretelefoner",
"producent_navn": "B&O",
"vare_beskrivelse": "Beoplay E8 er en eksklusiv, 100% trådløs in-ear-hovedtelefon med overbevisende lydkvalitet og en intuitiv touch-brugerflade, som giver dig kontrol over musik, opkald og stemmekommandoer. Lækkert ladeetui i ægte læder medfølger.",
"vare_pris": "2149.00",
"vare_billede": "B&O1.jpg",
"kategori_id": 6,
"producent_id": 3

}

]
```
* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet varer baseret på producent fra databasen


## **hent alle kategorier i databasen**

## Request Method: ``GET``

## URL: ``api/kategorier``

Response type
* Application/json

```
[
    {
        "kategori_id": 1,
        "kategori_navn": "Pladespiller"
    },
    {
        "kategori_id": 2,
        "kategori_navn": "CD-afspiller"
    },
    {
        "kategori_id": 3,
        "kategori_navn": "Projekter"
    },
    {
        "kategori_id": 4,
        "kategori_navn": "Højtalere"
    }.....
```

* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet alle kategorier fra databasen

## **hent alle producenter i databasen**

## Request Method: ``GET``

## URL: ``api/producenter``

Response type
* Application/json

```
[
    {
        "producent_id": 1,
        "producent_navn": "ARGON AUDIO"
    },
    {
        "producent_id": 2,
        "producent_navn": "SAMSUNG"
    },
    {
        "producent_id": 3,
        "producent_navn": "B&O"
    },
    {
        "producent_id": 4,
        "producent_navn": "SONY"
    },
    {
        "producent_id": 5,
        "producent_navn": "SONOS"
    },....
```
* `500` hvis der er opstår fejl på serveren

* `200` når der successfyldt er blevet hentet alle producenter fra databasen