import Vue from "vue";
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dtps: [],
        loaded: false,
        locale: "en"

    },
    mutations:{
        updateLocale(state, newLocale) {
            state.locale = newLocale
            localStorage.setItem('locale', newLocale); // запоминаем текущий язык, что б после перезагрузки страницы не сбросило на стандартный
        },
        newDtp: function (state,payload) {
            state.dtps.push(payload)
        },
        setDtp: function (state, payload) {
            state.dtps = payload
        },
        concatDtps: function (state, payload) {
            state.dtps.push.apply(state.dtps, payload)
        },
        loaded: function (state) {
            state.loaded = true
        }
    },
    getters:{
        dtps: state => state.dtps,
        loaded: state => state.loaded,
        getLocale: state => state.locale
    }
});
