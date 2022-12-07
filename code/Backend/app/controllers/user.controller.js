// import User model

const User = require("../models/user.model");

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');
const {verify} = require("jsonwebtoken");
const {stringify} = require("querystring");
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

// User Register function
exports.register = (req, res) => {
    let newUser = new User(req.body);
    User.findOne({mail: newUser.mail}, function (err, user) {
        if (user == null){
            //Crypter le mdp
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
        }
        else {
            res.status(500).send()
        }
    })
};

// User Sign function
exports.signIn = (req, res) => {
    User.findOne({mail: req.body.mail}, function (err, user) {
        if (user == null){
            res.status(401).json({ message: 'Authentication failed. email does not exist' });
        }
        //verif authorization
        else if (!user.authorization()){
            res.status(402).json({ message: 'Authorization failed. No access'});
        }
        //verif password
        else if (!user.comparePassword(req.body.password)) {
            res.status(403).json({ message: 'Authentication failed. Wrong password.' });
        }
        else
        {
            res.send(user)
        }

    });
}

// UPDATE a type of account user
exports.updateTypeAcount = (req, res) => {
    //Find product and update it
    User.findOneAndUpdate({ _id: req.body._id},
        {$set : {subscription: req.body.subscription}},{new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " +
                    req.body._id
            });
        });
};

//Upadte elections
exports.updateAutorisedElections = (req, res) => {
    console.log("here", req.body)
    User.findOneAndUpdate({ _id: req.body._id},
        {$set : {autorisedElections: req.body.autorisedElections, createdElections: req.body.createdElections}},{new: true})
        .then(user => {
            console.log(user);
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            return res.status(500).send({

                message: "Error updating user with id " +
                    req.body._id
            });
        });
}

exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// UPDATE INE of an user
exports.updateINE = (req, res) => {
    //Find product and update it
    User.findOneAndUpdate({ _id: req.body._id},
        {$set : {numElecteur: req.body.numElecteur}},{new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " +
                    req.body._id
            });
        });
};

//verifier le captcha
exports.verifyCaptcha = (req, res) => {
    if (!req.body.captcha)
        return res.send({ success: false, msg: 'Please select captcha' });

    // Secret key
    const secretKey = '6LdcmpEgAAAAAORoX23v4C2tsScKKj2Vv1YBsEbO';

    // Verify URL
    const query = stringify({
        secret: secretKey,
        response: req.body.captcha,
        /*remoteip: req.connection.remoteAddress*/
    });

    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

    // Make a request to verifyURL
    const body = fetch(verifyURL).then(res => res.json());

    // If not successful
    if (body.success !== undefined && !body.success)
        return res.send({ success: false, msg: 'Failed captcha verification' });

    // If successful
    return res.send({ success: true, msg: 'Captcha passed' });
};

// UPDATE a type of account user
exports.updateAccount = (req, res) => {
    //Find product and update it
    User.findOneAndUpdate({ _id: req.body._id},
        {$set : {urlImage: req.body.urlImage, nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, local: req.body.local}},{new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " +
                        req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " +
                    req.body._id
            });
        });
};

// change password user
exports.updatePassword = (req, res) => {
    const user = new User(req.body.user)

    if (!user.comparePassword(req.body.previousPassword)){
        res.status(403).json({ message: 'Authentication failed. Wrong password.' });
    }
    else{
        //Find product and update it
        User.findOneAndUpdate({ _id: req.body.user._id},
            {$set : {password: bcrypt.hashSync(req.body.nextPassword, 10)}},{new: true})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " +
                            req.body._id
                    });
                }
                res.send(user);
            })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " +
                            req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error updating user with id " +
                        req.body._id
                });
            });
    }
};

//getalluser
exports.findAll = (req, res) => {
    User.find()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


