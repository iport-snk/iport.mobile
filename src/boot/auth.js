import axios from "axios";
import PouchDB from 'pouchdb';

export default async ({ app, router, store, Vue }) => {
    Vue.prototype.$db = new PouchDB('user');
    Vue.prototype.$db.update = function(value) {
        return Vue.prototype.$db.get(value._id).then(
            item =>  Vue.prototype.$db.put(Object.assign(item, value))
        ).catch(
            () => Vue.prototype.$db.put(value)
        )
    };

    Vue.prototype.$axios = axios;

    router.beforeResolve((to, from, next) => {
        if (to.path.startsWith('/sign-') || store.state.user.token) {
            next();
        } else {
            next({
                path: '/sign-in'
            });
        }
    });
    return store.dispatch('user/restore')
}
