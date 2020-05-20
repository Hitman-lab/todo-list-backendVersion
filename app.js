const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const port = 5000;
const app = express();

// Variable Declarations
const items = ['Eat','Code','Rpeat'];
const workItems = [];

// 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    const day = date.getDay();
    res.render('list', {listTitle : day, newItem: items});
});

app.post('/', function(req, res) {
    let item = req.body.newItem;
    if(req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }    
});

app.get('/work', function(req, res) {
    res.render('list', {listTitle: "Work List", newItem : workItems});
});

app.listen(port, function() {
    console.log(`Server starts at http://localhost:${port}`);
});