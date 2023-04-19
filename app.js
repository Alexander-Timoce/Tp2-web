const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodeOverride = require('method-override')

// Premier cours
const Cours = require('./models/cours')
const c = new Cours({
  nom:'Web et base'
})
c.save()
// Premier etudiants
const Etudiants = require('./models/etudiants')
const e = new Etudiants({
  nom:'Alexander Timoce'
})
e.save()
// Premier professeurs
const Professeurs = require('./models/professeurs')
const p = new Professeurs({
  nom:'Sylvain Labranche'
})
p.save()

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
app.use(express.urlencoded({extended: true}))
app.use(methodeOverride('_method'))

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

app.post('/cours', async (req, res) =>{
  const nouveauCours = new Cours(req.body);
  await nouveauCours.save();
  res.redirect(`/cours/${nouveauCours._id}`)
})

app.get('/cours/:id', async (req, res) =>{
  const {id} = req.params;
  const cours = await Cours.findById(id)
  res.render('cours/afficher', { cours })
})

app.get('/cours/:id/modifier', async (req, res) =>{
  const {id} = req.params;
  const cours = await Cours.findById(id);
  res.render('cours/modifier', { cours })
})

app.put('/cours/:id', async (req,res) =>{
  const { id } = req.params;
  const cours = await Cours.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/cours/${cours._id}`);
})

app.delete('/cours/:id', async (req, res) =>{
  const { id } = req.params;
  const coursSupprimer = await Cours.findByIdAndDelete(id)
  res.redirect('/cours');
})

// '/professeurs'
app.get('/professeurs', async (req, res) =>{
  const professeurs = await Professeurs.find({})
  res.render('professeurs/index', {professeurs})
})
app.get('/professeurs/nouveau', (req, res) =>{
  res.render('professeurs/nouveau')
})

app.post('/professeurs', async (req, res) =>{
  const nouveauProfesseur = new Etudiants(req.body);
  await nouveauProfesseur.save();
  res.redirect(`/professeurs/${nouveauProfesseur._id}`)
})

app.get('/professeurs/:id', async (req, res) =>{
  const {id} = req.params;
  const professeurs = await Professeurs.findById(id)
  res.render('professeurs/afficher', { professeurs })
})

app.get('/professeurs/:id/modifier', async (req, res) =>{
  const {id} = req.params;
  const professeurs = await Professeurs.findById(id);
  res.render('professeurs/modifier', { professeurs })
})

app.put('/professeurs/:id', async (req,res) =>{
  const { id } = req.params;
  const professeurs = await Professeurs.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/professeurs/${professeurs._id}`);
})

app.delete('/professeurs/:id', async (req, res) =>{
  const { id } = req.params;
  const professeursSupprimer = await Professeurs.findByIdAndDelete(id)
  res.redirect('/professeurs');
})

// '/etudiants'
app.get('/etudiants', async (req, res) =>{
  const etudiants = await Etudiants.find({})
  res.render('etudiants/index', {etudiants})
})
app.get('/etudiants/nouveau', (req, res) =>{
  res.render('etudiants/nouveau')
})

app.post('/etudiants', async (req, res) =>{
  const nouvelleEtudiant = new Etudiants(req.body);
  await nouvelleEtudiant.save();
  res.redirect(`/etudiants/${nouvelleEtudiant._id}`)
})

app.get('/etudiants/:id', async (req, res) =>{
  const {id} = req.params;
  const etudiants = await Etudiants.findById(id)
  res.render('etudiants/afficher', { etudiants })
})

app.get('/etudiants/:id/modifier', async (req, res) =>{
  const {id} = req.params;
  const etudiants = await Etudiants.findById(id);
  res.render('etudiants/modifier', { etudiants })
})

app.put('/etudiants/:id', async (req,res) =>{
  const { id } = req.params;
  const cours = await Etudiants.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/etudiants/${etudiants._id}`);
})

app.delete('/etudiants/:id', async (req, res) =>{
  const { id } = req.params;
  const etudiantsSupprimer = await Etudiants.findByIdAndDelete(id)
  res.redirect('/etudiants');
})

app.get('*', (req, res) =>{
  res.send('Erreur, le URL que vous avez fourni ne mene nulle part.');
})

app.listen(3000, () => {
  console.log("Port 3000 ouvert")
})