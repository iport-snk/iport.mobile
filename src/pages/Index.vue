<template>
    <q-page class="flex q-pt-lg">
        <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">-->
        <!--<q-btn type="submit" @click="getUser" :label="contract" />-->
        <q-card flat bordered class="q-ma-md q-pa-lg col-4 /lt-sm	">  <!--  Q-CARD to XS    -->
            <q-card-section>
              <div
                  class="text-h6 myclass-state flex flex-center center row items-center"
                  :class="[state]"
              >{{balance}} грн <br >   {{getAccess(state)}}  </div>
              <div
                  class="text-h7"
                  v-if="block_if_limit == 1 && limit_balance >= 0"
              ><font style="color: red">Передплата: <b>{{limit_balance}}</b> грн.</font></div>
              <div class="text-h5" v-if="bonus" >Бонус: <b>{{bonus}}</b> грн.</div>
              <div class="q-pa-md q-gutter-sm flex flex-center">
                <q-btn  color="primary" class="" icon="attach_money" label="Online - оплата"  /> <br />
              </div>
              </q-card-section>
          </q-card>



            <!--
          <q-card flat bordered class="q-ma-md q-pa-lg col gt-sm	">
              <q-card-section>


                <div
                    class="text-h6 flex flex-center"
                    :class="[state] + '-non-bord' "

                    ><font style="font-size: 2em">Доступ {{getAccess(state)}}</font>
                    </div>
                    <div>
                       {{balance}} грн <br >
                    </div>

                <div
                    class="text-h7"
                    v-if="block_if_limit == 1 && limit_balance >= 0"
                ><font style="color: red">Передплата: <b>{{limit_balance}}</b> грн.</font></div>
                <div class="text-h5" v-if="!bonus" >Бонус: <b>{{bonus}}</b> грн.</div>
                <div class="q-pa-md q-gutter-sm flex flex-center">
                  <q-btn  color="primary" class="" icon="attach_money" label="Online - оплата"  /> <br />
                </div>
                </q-card-section>
            </q-card>
-->



          <q-card flat bordered class="my-items-personal-data q-ma-md q-pa-md col-lg">
              <q-card-section>
                <div class="text-h5 ">Особисті дані</div>
              </q-card-section>
                <div class="text-h6"><q-icon name="account_circle" /> Особовий рахунок: <b>{{contract}}</b></div>
                <div class="text-h6"><q-icon name="location_city" /> Адреса: <b></b></div>
                <div class="text-h6"><q-icon name="phone" /> Телефон: <b></b></div>
                <div class="text-h6"><q-icon name="email" /> Email: <b>{{email}}</b></div>
                <div class="text-h6"><q-icon name="account_circle" /> IP: <b>{{ip}}</b></div>
                <div class="text-h6"><q-icon name="account_circle" /> Ваш тариф: <b>{{p_name.replace("[1000]", "")}}</b></div>

                <div class="text-h6"> Ваша знижка: {{discount}} %</div>
                <div class="text-h6"> Оплата зі знижкою: {{submoney}} грн.</div>


              </q-card-section>
          </q-card>



    </q-page>
</template>

<script>
    import { mapState} from 'vuex'
    export default {
        name: 'PageIndex',
        computed: {
            ...mapState('user', ['contract', 'fio', 'email', 'ip', 'p_name', 'balance', 'bonus', 'state', 'limit_balance', 'block_if_limit', 'discount', 'submoney'])

        },
        methods: {
            getUser() {
                this.$http('/customer/info')
            },

            getAccess(state) {
              if (state == 'on') {
                return 'Дозволено'
              }else{
                return 'Заборонено'
              }
            }

        },
        mounted() {
            console.log(this.$store.state.user)
        }
    }
</script>
