const mongoose = require('mongoose');

const professeursSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: true
  },
})

const Professeurs = mongoose.model('Cours', professeursSchema)
module.exports = Professeurs;