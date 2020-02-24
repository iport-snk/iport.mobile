import axios from "axios";
import PouchDB from 'pouchdb';

const initNotifications  = function(store) {
    document.addEventListener('deviceready', () => {
        let push = window.push =  window.PushNotification.init({
            android: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        });

        push.on('registration', data => {
            console.log(data);
            store.commit('user/setUser', {deviceId: data.registrationId} );
        });

        push.on('notification', data => {
            console.log(data);

        });
    }, false);


};

export default async ({ app, router, store, Vue }) => {
    initNotifications(store);
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
