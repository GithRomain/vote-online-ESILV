const mongoose = require("mongoose");

//clef secrete
const key = "uiaezhf§è!çseufh6789GZzufhzuidfh7Z7DçGFZçZIFZFUZG31261&&&dbhzjd";
const password = 'iozehgvoieh6877!!!99hzaoifh!af908Z2qzjfbal899ZFHfanalzefknaz';

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");
// import jsonwebtoken
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    nom: {
        type: String,
        trim: true,
        required: true
    },

    prenom: {
        type: String,
        trim: true,
        required: true
    },

    mail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },

    password: {  //est chiffré
        type: String,
        required: true
    },

    dateDeNaissance: {
        type: Date,
        required: true
    },

    local: {  //département/région/pays
        type: [String],
        default: []
    },

    urlImage: {  //url de l'image du profil
        type: String,
        trim : true
    },

    subscription: {
        type: String,
        enum: ['none','free','premium','super-premium', 'admin'],
        required: true
    },

    numElecteur: {
        type: String,
        default: null
    },

    autorisedElections: {
        type: [Object],
        default: []
    },

    createdElections: {
        type: [String],
        default: []
    }
})

//Create a Schema method to compare password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

//Fonction qui génere un token qu'on vérifiera par la suite
UserSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            mail: user.mail,
            password: user.password,
            dateDeNaissance: user.dateDeNaissance,
            local: user.local,
            urlImage: user.urlImage,
            subscription: user.subscription,
            numElecteur: user.numElecteur,
            autorisedElections: user.autorisedElections,
            createdElections: user.createdElections,
        }, key
    );
    return token;
}

UserSchema.methods.crypteUser = function (){
    const user = this;
    const crypteUser = {
        _id: user._id,
        nom: AES.encrypt(user.nom, key).ciphertext.words,
        prenom: user.prenom,
        mail: user.mail,
        password: user.password,
        dateDeNaissance: user.dateDeNaissance,
        local: user.local,
        urlImage: user.urlImage,
        subscription: user.subscription,
        numElecteur: user.numElecteur,
        autorisedElections: user.autorisedElections,
        createdElections: user.createdElections,
    }
    console.log(crypteUser)
    return crypteUser
}

//Fonction qui vérifie le token
UserSchema.methods.authorization = function () {
    const token = this.generateAuthToken();
    try {
        jwt.verify(token, key);
        return true
    } catch (err) {
        return false;
    }
}

module.exports = mongoose.model("User",UserSchema);

const encrypt = (content, password) => CryptoJS.AES.encrypt(JSON.stringify({ content }), password).toString()
const decrypt = (crypted, password) => JSON.parse(CryptoJS.AES.decrypt(crypted, password).toString(CryptoJS.enc.Utf8)).content

// Encrypt
const encryptedObject = encrypt({ test: 'This is an object', data: ['wow', 'wow'] }, password)
console.log(encryptedObject)

// Decrypt
const decryptedObject = decrypt(encryptedObject, password)
console.log(decryptedObject)