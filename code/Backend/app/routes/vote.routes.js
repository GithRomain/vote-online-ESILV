module.exports = function(app) {
    const vote = require('../controllers/vote.controller');

    //Create a vote
    app.post('/api/vote/createVote', vote.create);

    //Delete a vote
    app.post('/api/vote/delete/', vote.delete);

    //Get one vote
    app.get('/api/vote/getVote/:id',vote.getVote);

    //Get all votes
    app.post('/api/votes/getAllVotesOfElection', vote.getAllVotesOfElection);


}