<template>

  <div class="home">

    <header>
      <div class="title">Мои личные расходы</div>
    </header>


    <main>
      ВСЕГО: {{getFullPaymentValue}}
      <br>
      <button @click="onShowModal">Показать/скрыть</button>
      <hr>
      <payments-display :items="currenetElements" />
      <Pagination :length="paymentsList.length" :cur="curPage" :n ="n" @paginate="onChangePage" />
    </main>
  </div>

</template>
  
<script>
import PaymentsDisplay from "../components/Payments.Display.vue";
//import AddPaymentForm from "../components/AddPaymentForm.vue";
import { mapMutations, mapActions, mapGetters  } from "vuex"
import Pagination from "../components/Pagination.vue"

export default {
  name: 'Home',
  components: {
    PaymentsDisplay,
    //AddPaymentForm,
    Pagination,
  },
  data () {
    return {
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
