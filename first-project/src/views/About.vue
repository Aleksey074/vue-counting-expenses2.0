<template>
  <div class="about">
    <h1>Самые частые расходы</h1>
    <button @click="onShowModalAuth">auth</button>
    <hr>
    <div class="main-btns">
    <button class="btn-fast-pay"><router-link class="link-fast-pay" to="/add/payment/Еда?value=200">Еда 200 рублей</router-link></button>
    <button class="btn-fast-pay"><router-link class="link-fast-pay" to="/add/payment/Транспорт?value=50">Транспорт 50 рублей</router-link></button>
    <button class="btn-fast-pay"><router-link class="link-fast-pay"  to="/add/payment/Развлечения?value=2000">Развлечения 2000 рублей</router-link></button>
    </div>
  </div>
</template>



<script>
export default {
    name: "About",
    data () {
      return {
        modalShow: true,
        settings: {
          header: "Auth Form", content: "Auth"
        }
      }
    },
     methods: {
      onShowModalAuth (){
        this.$modal.show("Auth", this.settings) 
      }
    }
}
</script>


<style scoped>
.main-btns{
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.btn-fast-pay{
  height: 50px;
  margin-right: 30px;
}
.link-fast-pay{
  text-decoration: none;
  font-size: 40px;
}
</style>