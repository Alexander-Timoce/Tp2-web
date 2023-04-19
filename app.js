const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose');

const Cours = require('./models/cours')
const c = new Cours({
  nom:'Web et base'
})
c.save()
//const Etudiants = require('./models/etudiants')
//const Professeurs = require('./models/professeurs')

mongoose.connect('mongodb://127.0.0.1:27017/Tp2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Mongo ouvert")
    })
    .catch(err => {
        console.log("Erreur de connection a mongo")
        console.log(err)
    })


app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

// '/home'
app.get('/', (req, res) =>{
  res.render('home')
})
// '/cours'
app.get('/cours', async (req, res) =>{
  const cours = await Cours.find({})
  res.render('cours/index', {cours})
})
app.get('/cours/nouveau', (req, res) =>{
  res.render('cours/nouveau')
})

app.get('/cours/:id', async (req, res) =>{
  const {id} = req.params;
  const cours = await Cours.findById(id)
  console.log(cours)
  res.render('cours/afficher', { cours })
})

// '/professeurs'
app.get('/professeurs', async (req, res) =>{
  const professeurs = await Professeurs.find({})
  res.render('professeurs/index')
})
// '/etudiants'
app.get('/etudiants', async (req, res) =>{
  const etudiants = await Etudiants.find({})
  res.render('etudiants/index')
})

app.get('*', (req, res) =>{
  res.send('Erreur, le URL que vous avez fourni ne mene nulle part.');
})

app.listen(3000, () => {
  console.log("Port 3000 ouvert")
})