const user = require("../controllers/user.controller");
module.exports = function(app) {
    const user = require('../controllers/user.controller');

    // post request for user registration
    app.post('/api/user/register', user.register);

    // post request for user log in
    app.post('/api/user/login', user.signIn);

    // put request for set type acount user
    app.put('/api/user/chooseTypeAccount', user.updateTypeAcount);

    //
    app.put('/api/user/joinVote', user.updateAutorisedElections)

    // put request to set INE user
    app.put('/api/user/enterINE', user.updateINE);

    // verify captcah
    app.post('/api/user/verifyCaptcha', user.verifyCaptcha);

    // updateUser
    app.put('/api/user/updateUser', user.updateAccount);

    // update password
    app.put('/api/user/updatePassword', user.updatePassword);

    app.get('/api/user/getUsers', user.getAllUsers);

    // update user
    app.get('/api/user/getAllUser', user.findAll);
}