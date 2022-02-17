<template>

<v-container>
  <v-row>
    <v-col>

      <v-dialog v-model="dialog" width="500">
      

      <v-card>
        <add-payment-form  @onAdd="dialog=false" />
      </v-card>


      </v-dialog>

      <PaymentsDisplay :items="paymentsList" />
    </v-col>

    <v-col>
      <my-button />
      <canvas id="myChart" width="400" height="400" ref="canvas"></canvas>

    </v-col>
  </v-row>
</v-container>

</template>
  
<script>
//import AddPaymentForm from "../components/AddPaymentForm.vue";
import { mapMutations, mapActions, mapGetters  } from "vuex"
import {Doughnut} from 'vue-chartjs'

 
export default {
  name: 'Home',
  props: ['chartdata', 'options'],
  components: {
    //AddPaymentForm,
    PaymentsDisplay: () => import ("../components/Payments.Display.vue"),
    AddPaymentForm: () => import ("../components/AddPaymentForm.vue")
  },
  data () {
    return {
      dialog: false,
      show: false,
      curPage: 1,
      n: 10,
    };
  },
  extends: Doughnut,

  computed: {
    ...mapGetters ([
      "getFullPaymentValue"
    ]),
    paymentsList () {
      return this.$store.getters.getPaymentList
    },
    currenetElements () {
      return this.paymentsList.slice(this.n*(this.curPage-1), this.n*(this.curPage-1) + this.n)
    }
  },
  methods: {
    ...mapMutations({
      myMuttaion: "setPaymentsListData"  // 
    }),
    ...mapActions ([
      "fetchData"
    ]), 
    add (data) {
      this.$store.commit("addDataToPaymentsList", data)
    },
    onChangePage (page) {
      this.curPage = page
    },
    onShowModal () {
      this.$modal.show("AddPaymentForm", {
        header: "Add payment form",
        content: "AddPaymentForm"
      })
    },
    setup () {
      this.renderChart(
        {
        labels:  ['Еда', 'Развлечения', 'Транспорт', 'Спорт'],
        datasets: [{
            label: 'Расходы по категориям',
            data: [4, 4, 1, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },)
    },
  },
 
  created () {
    const { page } = this.$route.params
    if(page) {
      this.curPage = Number(page)
    }
    //this.fetchData ()
  },

   mounted () {
    this.setup()
  }
  
}
</script>

<style lang="scss">

</style>
