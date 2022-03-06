const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Quote = require('./models/quote');
const methodOverride = require('method-override');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connected");
})
 .catch((err)=>{
     console.log(err);
 })


 app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/', (req, res)=>{
    res.redirect('/quotes')
})
app.get('/quotes', async (req,res)=>{
    const quotes = await Quote.find({});

    res.render('index', {quotes});
})
app.get('/quotes/new', (req, res)=>{
    res.render('new');
})

app.post('/quotes', async (req, res)=>{
    const {name, description} = req.body;

    await Quote.create({name, description});
    
    res.redirect('/quotes')
})
app.get('/quotes/:id', async(req,res)=>{
    const {id} = req.params;
    const quote = await Quote.findById(id);
    res.render('show', {quote});
})
app.delete('/quotes/:id', async (req, res)=>{
    const {id} = req.params;

    await Quote.findByIdAndDelete(id);

    res.redirect('/quotes')
})


app.listen( process.env.PORT || 8000, ()=>{
    console.log('listening at 8000');
})