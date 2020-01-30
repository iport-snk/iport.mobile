import axios from "axios";
import Vue from 'vue';
import env from "../../env";

export function auth ({ dispatch, commit, state }, {login, password}) {
    return Vue.prototype.$http.post('/auth-jwt', {
        contract: login,
        password: password
    }).then(
        ({data}) => dispatch('save', data)
    )
}

export function load ({ dispatch, commit, state }) {
    return Vue.prototype.$http.get(`/users/info/${state.id}`).then( ({data}) => {
        commit('setUser', data[0]);
        return Vue.prototype.$db.update({...{_id: 'user'}, ...data[0]});
    })
}

export function save ({ dispatch, commit, state }, data) {
    const db = Vue.prototype.$db;
    return db.update({...{_id: 'user'}, ...data}).then( () => dispatch('restore') );
}

export function restore ({ commit, state }) {
    const db = Vue.prototype.$db;
    let opts = { baseURL: env.baseUrl };

    return db.get('user').then( user => {
        Object.assign(opts, { headers: { Authorization: user.token }} );
        commit('setUser', user);
    }).catch(
        () => commit('setUser', undefined)
    ).finally(
        () => Vue.prototype.$http = axios.create(opts)
    );
}

