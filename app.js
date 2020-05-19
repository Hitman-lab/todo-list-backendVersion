const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();

let items = ['Eat','Code','Rpeat'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    let today = new Date();   
    let options = {
        weekday : "long",
        day : "numeric",    
        month : "long",
        year: 'numeric'
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {tempDay : day, newItem: items});
});

app.post('/', function(req, res) {
    let item = req.body.newItem;
    if(item === ""){
        console.log('enter item');
    }
    items.push(item);
    res.redirect('/');
});

app.listen(port, function() {
    console.log(`Server starts at http://localhost:${port}`);
});