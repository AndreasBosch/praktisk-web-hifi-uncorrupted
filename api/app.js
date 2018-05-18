const express = require("express");

const app = express();

app.use(express.static('public'));

const logger = require('morgan');
const bodyParser = require('body-parser');
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileupload = require('express-fileupload');
// det er muligt at bestemme hvor store filer der må uploades
app.use(fileupload({
    limits: {
        fileSize: 10 * 1024 * 1024
    } // 10mb
}));

require('./routes/varer.js')(app);
require('./routes/images.js')(app)
require('./routes/search.js')(app)
require('./routes/beskeder.js')(app)
require('./routes/forside.js')(app)


const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`App is listening on http://localhost:${port}`);
});