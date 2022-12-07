const mongoose = require("mongoose");

const ElectionSchema = mongoose.Schema({
    nom: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true
    },

    urlImage: {
        type: String,
        trim: true
    },

    type: {
        type: String,
        enum: ['informel','officiel'],
        required: true
    },

    choix: {
        type: Array,
        required: true
    },

    resultats: {
        type: [Number],
        default: []
    },

    dates: {  //dates de début et fin
        type: [Date],
        default: [Date.now()]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    code: {  //code généré pour rejoindre l'élection
        type: String,
    },

    limite: {  //limite maximale de personne
        type: Number
    },

    nbElecteurs: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model("Election",ElectionSchema);