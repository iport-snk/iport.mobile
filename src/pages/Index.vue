<template>
    <q-page class="flex flex-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
        <q-btn type="submit" @click="getUser" :label="contract" />
        <div>{{traf1}}</div>
    </q-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'PageIndex',
        computed: {
            ...mapState('user', ['contract', 'traf1'])
        },
        methods: {
            getUser() {
                this.$http('/customer/info')
            }
        },
        mounted() {
            console.log(this.$store.state.user.traf1)
        }
    }
</script>
