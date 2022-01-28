<template>

  <div class="home">

    <header>
      <div class="title">Мои личные расходы</div>
    </header>


    <main>
      ВСЕГО: {{getFullPaymentValue}}
      <hr>
      <add-payment-form  @addPayment="add"/>
      <payments-display :items="currenetElements" />
      <Pagination :length="12" :cur="curPage" :n ="3" @paginate="onChangePage" />
    </main>
  </div>

</template>
  
<script>
import PaymentsDisplay from "../components/Payments.Display.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import { mapMutations, mapActions, mapGetters  } from "vuex"
import Pagination from "../components/Pagination.vue"

export default {
  name: 'Home',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination,
  },
  data () {
    return {
      show: false,
      curPage: 1,
      n: 10
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
      return this.paymentsList.slice(3*(this.curPage-1), 3*(this.curPage-1) + 3)
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
      this.fetchData(page)
    },
  },
  created () {
    this.fetchData (this.curPage)
  },

}
</script>

<style lang="scss">

</style>
