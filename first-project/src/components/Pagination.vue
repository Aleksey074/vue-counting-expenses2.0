<template>
<div class="wrp"> 
    <div @click="onClick(cur-1)">-</div>
    <div v-for="i in amount" :key="i"
    :class="{'active' :cur === i}"
    @click="onClick(i)"
    >{{i}}</div>
    <div @click="onClick(cur+1)">+</div>


</div>
    
</template>



<script>
 export default {
     name: "Pagination",
     props: {
         length: Number,
         cur: Number,   //это текущая страница
         n: Number   //счетчик, будет показывать сколько страниц отображать
     },
     computed: {
         amount () {   //вычисление количества страниц 
            return Math.ceil(this.length / this.n)
         }    
     },
     methods: {
         onClick (page) {
             if (page < 1 || page > this.amount || page === this.cur) {
                 return
             }
             this.$emit("paginate", page)
         }
     }
 }
 
</script>


<style scoped lang="scss">
.wrp{
    display: flex;
    justify-content: center;
    margin-top: 40px;
    & > div  {
        padding: 10px;
        &.active {
        background: #ccc ;
        }
    }
}



</style>
