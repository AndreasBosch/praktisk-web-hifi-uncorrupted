const mysql = require('../config/mysql.js');

module.exports = (app) => {



    app.get('/api/search/:search', (req, res) => {

        if (req.params.search != '') {
            // opret en variabel med søgeordet hvor der er klistret et % på hver side,
            // dette er den variabel der sendes med til SQL udførslen

            let freeText = '%' + req.params.search + '%'

            let db = mysql.connect();
            db.execute(`SELECT vare_id, vare_navn,
            kategori_navn, producent_navn,
            vare_beskrivelse, vare_pris,
            vare_billede, kategori_id,
            producent_id FROM varer
            INNER JOIN kategorier ON kategori_id = varer.fk_vare_kategori_id
            INNER JOIN producenter ON producent_id = varer.fk_vare_producent_id
            WHERE vare_navn LIKE ?
             OR kategori_navn LIKE ? 
             OR producent_navn LIKE ? 
             OR vare_beskrivelse LIKE ? 
             `, [freeText, freeText, freeText, freeText], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
                    res.json(rows);
                });
            db.end();
        } else {
            res.sendStatus(400)
        }

    })


}