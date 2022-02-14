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
      CHART (ЗДЕСЬ БУДЕТ ДИАГРАММА)
    </v-col>
  </v-row>
</v-container>

</template>
  
<script>
//import AddPaymentForm from "../components/AddPaymentForm.vue";
import { mapMutations, mapActions, mapGetters  } from "vuex"

export default {
  name: 'Home',
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
    }
  },
  created () {
    const { page } = this.$route.params
    if(page) {
      this.curPage = Number(page)
    }
    //this.fetchData ()
  },

}
</script>

<style lang="scss">

</style>
