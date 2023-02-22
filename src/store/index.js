import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName: "",
    },
    getters: {},
    mutations: {
        updateName(state, name) {
            state.userName = name;
        },
    },
    actions: {
    },
    modules: {}
})
