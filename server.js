const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = (`${now}:${req.method} ${req.url}`);

    console.log(log);

    fs.appendFile('server.log', log + '\n');
    next();
});

//maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//pour eviter que la page de maintenane ne s'affiche la premiere
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//hbs.registerHelper('screamIt',(text)=>{ 
// return text.toUpperCase();
//});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my Website'

    });
});

app.get('/about', (req, res) => {
    // res.send('about page');
    res.render('about.hbs', {
        pageTitle: 'About Page'

    });

});

// send back json with error message
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});
app.listen(port, () => { 
    console.log(`Server is up at port ${port}`);
 }); 