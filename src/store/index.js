import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dtps: []
    },
    mutations:{
        newDtp: function (state,payload) {
            state.dtps.push(payload)
        },
        setDtp: function (state, payload) {
            state.dtps = payload
        },
        concatDtps: function (state, payload) {
            state.dtps.push.apply(state.dtps, payload)
        }
    },
    getters:{
        dtps: state => state.dtps
    }
});
