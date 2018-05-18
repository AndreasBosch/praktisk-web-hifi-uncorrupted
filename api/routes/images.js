const mysql = require('../config/mysql.js');
const path = require('path');
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});

module.exports = (app) => {




    app.get('/api/images/:image', (req, res) => {

        if (path.extname(req.params.image).toLowerCase() == '.jpg' || path.extname(req.params.image).toLowerCase() == '.png') {
            // forsøg at læs billede filen fra images mappen...
            let file = path.join(__dirname, '..', 'varer', req.params.image);
            fs.readFile(file, function (err, file) {
                if (err) {
                    // den ønskede fil blev ikke fundet, vi sender standard "no-image.png" i stedet
                    // dette kunne også have været en res.sendStatus(404)  
                    let no_image = path.join(__dirname, '..', 'varer', 'no_image.jpg');
                    fs.readFile(no_image, (err2, default_file) => {
                        res.writeHead(200);
                        res.write(default_file);
                        res.end();
                    });
                } else {
                    // her kunne der skaleres "on-the-fly" ... det tager vi en anden dag
                    res.writeHead(200);
                    res.write(file);
                    res.end();
                }
            });
        } else {
            // hvis den ønskede fil ikke er en .jpg eller .png, 
            // sendes no-image som standard eller res.sendStatus(404)
            res.sendStatus(404);
        }

    })






    // denne routes formål er at returnere en liste med samtlige billeder fra billede mappen
    app.get('/api/images', (req, res) => {
        // definer stien til den mappe der indeholder alle billederne på API siden
        let dir = path.join(__dirname, '..', 'varer');
        fs.readdir(dir, (err, files) => {
            // opret array til alle de filnavne der skal sendes
            let return_files = [];
            // løb igennem alle de læste filnavne
            files.forEach(file => {
                // filendelsen er .jpg eller .png, og at det ikke er "standart billedet" 
                if (file.indexOf('no_image.jpg') == -1 && (path.extname(file).toLowerCase() == '.jpg' || path.extname(file).toLowerCase() == '.png')) {
                    // tilføj nanvet til retur arrayet
                    return_files.push(file);
                }
            })
            // returner alle filnavnene
            res.json(return_files);
        });
    });


    // denne routes formål er at returnere en liste med samtlige billeder fra billede mappen
    app.get('/api/forside_billede', (req, res) => {
        // definer stien til den mappe der indeholder alle billederne på API siden
        let dir = path.join(__dirname, '..', 'forside');
        fs.readdir(dir, (err, files) => {
            // opret array til alle de filnavne der skal sendes
            let return_files = [];
            // løb igennem alle de læste filnavne
            files.forEach(file => {
                // filendelsen er .jpg eller .png, og at det ikke er "standart billedet" 
                if (file.indexOf('no_image.jpg') == -1 && (path.extname(file).toLowerCase() == '.jpg' || path.extname(file).toLowerCase() == '.png')) {
                    // tilføj nanvet til retur arrayet
                    return_files.push(file);
                }
            })
            // returner alle filnavnene
            res.json(return_files);
        });
    });

    app.get('/api/forside_billede/:image', (req, res) => {

        if (path.extname(req.params.image).toLowerCase() == '.jpg' || path.extname(req.params.image).toLowerCase() == '.png') {
            // forsøg at læs billede filen fra images mappen...
            let file = path.join(__dirname, '..', 'forside', req.params.image);
            fs.readFile(file, function (err, file) {
                if (err) {
                    // den ønskede fil blev ikke fundet, vi sender standard "no-image.png" i stedet
                    // dette kunne også have været en res.sendStatus(404)  
                    let no_image = path.join(__dirname, '..', 'forside', 'no_image.jpg');
                    fs.readFile(no_image, (err2, default_file) => {
                        res.writeHead(200);
                        res.write(default_file);
                        res.end();
                    });
                } else {
                    // her kunne der skaleres "on-the-fly" ... det tager vi en anden dag
                    res.writeHead(200);
                    res.write(file);
                    res.end();
                }
            });
        } else {
            // hvis den ønskede fil ikke er en .jpg eller .png, 
            // sendes no-image som standard eller res.sendStatus(404)
            res.sendStatus(404);
        }

    })

}