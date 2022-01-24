<template>
  <div class="wrapper">
    <div class="form-button">
      <button @click="toggleElement">ADD NEW COST+</button>
    </div>

    <div v-if="isElVisible">
      <input placeholder="Value" v-model="value" />
      <input placeholder="Category" v-model="category" />
      <input type="Date" v-model="date" />
      <button @click="onSaveClick">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: 0,
      category: "",
      date: "",
      isElVisible: true,
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    onSaveClick() {
      const data = {
        id: Date.now(),
        value: this.value,
        category: this.category,
        date: this.date || this.getCurrentDate,
      };
      this.$emit("addPayment", data);
    },
    toggleElement() {
      this.isElVisible = !this.isElVisible;
    },
  },
};
</script>

<style lang = "scss" scoped>
</style>