const mysql = require('../config/mysql.js');


module.exports = (app) => {

    app.get('/api/varer', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT 
        vare_id, vare_navn,
        kategori_navn, producent_navn,
        vare_beskrivelse, vare_pris,
        vare_billede, kategori_id,
        producent_id
        FROM varer
        INNER JOIN kategorier ON kategori_id = varer.fk_vare_kategori_id
        INNER JOIN producenter ON producent_id = varer.fk_vare_producent_id
        `, [], (err, rows) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.json(rows)
                }
            });
        db.end();
    })


    app.get('/api/varer/:vare_id', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT 
        vare_id, vare_navn,
        kategori_navn, producent_navn,
        vare_beskrivelse, vare_pris,
        vare_billede, kategori_id,
        producent_id
        FROM varer
        INNER JOIN kategorier ON kategori_id = varer.fk_vare_kategori_id
        INNER JOIN producenter ON producent_id = varer.fk_vare_producent_id
        WHERE vare_id = ?`, [req.params.vare_id], (err, rows) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.json(rows)
                }
            });
        db.end();
    })

    app.get('/api/varer/kategori/:kategori_id', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT 
        vare_id, vare_navn,
        kategori_navn, producent_navn,
        vare_beskrivelse, vare_pris,
        vare_billede, kategori_id,
        producent_id
        FROM varer
        INNER JOIN kategorier ON kategori_id = varer.fk_vare_kategori_id
        INNER JOIN producenter ON producent_id = varer.fk_vare_producent_id
        WHERE kategori_id = ?`, [req.params.kategori_id], (err, rows) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.json(rows)
                }
            });
        db.end();
    })


    app.get('/api/varer/producent/:producent_id', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT 
        vare_id, vare_navn,
        kategori_navn, producent_navn,
        vare_beskrivelse, vare_pris,
        vare_billede, kategori_id,
        producent_id
        FROM varer
        INNER JOIN kategorier ON kategori_id = varer.fk_vare_kategori_id
        INNER JOIN producenter ON producent_id = varer.fk_vare_producent_id
        WHERE producent_id = ?`, [req.params.producent_id], (err, rows) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.json(rows)
                }
            });
        db.end();
    })
    app.get('/api/kategorier', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT * FROM kategorier`, [], (err, rows) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.json(rows)
            }
        });
        db.end();
    })

    app.get('/api/producenter', (req, res) => {
        let db = mysql.connect();
        db.execute(`SELECT * FROM producenter`, [], (err, rows) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.json(rows)
            }
        });
        db.end();
    })
}