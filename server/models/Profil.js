const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true 
    },
    prenom: { 
        type: String, 
        required: true 
    },
    dateNaissance: { 
        type: Date, 
        required: true 
    },
    adresse: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['eleve', 'prof', 'admin'], 
        required: true 
    },
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe' 
    },
    classes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe' 
    }]
});

module.exports = mongoose.model('Profil', profilSchema);
