const mysql = require('../config/mysql.js');

module.exports = (app) => {

    app.get('/api/forside', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT 
        forside_id, forside_overskrift,
        forside_beskrivelse, forside_billede,
        farve_id, farve_kode, font_farve
     
        FROM forside
        INNER JOIN farver ON farve_id = forside.fk_forside_farver
        
        `, [], (err, rows) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.json(rows)
                }
            });
        db.end();
    })


}