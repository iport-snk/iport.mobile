<template>
    <div class="q-pa-md">
        <h2>Sign In</h2>
        <div class="q-gutter-md">
            <q-input square filled color="teal" label="Username" v-model="username"/>
            <q-input square filled color="teal" label="Password" type="password" v-model="password"/>
            <div class="row">
                <q-btn type="submit" @click.prevent="signIn" label="Sign In" class="authButton">
                    <template v-slot:loading>
                        <q-spinner-facebook/>
                    </template>
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5'
    export default {
        name: "SignIn",
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            signIn () {
                this.$store.dispatch(
                    'user/auth', {login: this.username, password: md5(this.password)}
                ).then(
                    () => this.$router.push({path: '/'})
                ).catch (
                    e => console.log('wrong user', e)
                )
            }
        }
    }
</script>

<style>
    .authButton {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        background-color: #2196f3;
        border: none;
        color: white;
        outline: none;
    }
</style>