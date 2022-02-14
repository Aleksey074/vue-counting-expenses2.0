<template>
  <v-app>
    <v-app-bar app flat>
    <v-btn to="/dashboard" plain :ripple="false">Главная</v-btn>

     <v-btn to="/about" plain :ripple="false">Горячие кнопки</v-btn>
       
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created () {
     this.$store.dispatch("fetchData")
   },
};
</script>
