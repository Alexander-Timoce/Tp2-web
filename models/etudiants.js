const mongoose = require('mongoose');

const etudiantsSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: true
  },
})

const Etudiants = mongoose.model('Cours', etudiantsSchema)
module.exports = Etudiants;