// store/index.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        actualClient: null,
        actualVote: {},
        actualElection: {},
        votes : [],
        actualResult: [],
        nombreTotVotants: 0,
    },
    getters: {},
    mutations: {
        //Logout as user
        LOG_OUT(state){
            state.actualClient = null;
            sessionStorage.clear();
        },
        },
    actions: {
        async logOut({commit}, payload){
            commit("LOG_OUT", payload)
        },
    }
})
