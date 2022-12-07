const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
    idUser: {  //idUser de celui qui a voté
        type: Object,
        required: true
    },

    idElection: {  //idELection de l'élection pour lequel le user a voté
        type: Object,
        required: true
    },

    choix: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model("Vote",VoteSchema);