<template>
  <div class="hello">

    <h1>{{ msg }}</h1>

    {{ message }}
    <input type="text" v-model.number="operand1" />
    <!--ввод первого числа-->

    <input type="text" v-model.number="operand2" />
    <!--ввод второго числа-->

    = {{ result }}
    <!--вывод результата-->
    <hr />

    <div v-if="error">Ошибка! {{ error }}</div>
    <!--вывод сообщения, в случае ошибки-->

    <div class="strange-message">
      <!--определение числового диапозона полученного результата-->
      Полученное число:
      <template v-if="result < 0">отрицательное</template>
      <template v-else-if="result < 100">находится в первой сотне</template>
      <template v-else>больше, чем 100</template>
    </div>
    <hr />

    <button v-for="(operand, idx) in operands" @click="calculate(operand)" :key="idx" title="operand">{{ operand }}</button> <!-- Кнопки-операции -->
    <hr />

    <div class="history">
    История операций:{{ logs }}
    <!--Вывод истории операций-->
    </div>
    <br />

    <div class="btn-show">
    <label><input type="checkbox" v-model="showvk" />Показать экранную клавиатуру</label>
    </div>

    <!--Включить / выключить экранную клавиатуру-->

    <div v-if="showvk">
      <!--Блок с экранной клавиатурой-->
      Экранная клавиатура

      <button v-for="btn in 10" :key="btn" @click="InputNum(btn - 1)">
        <!--Отрисовка кнопок-->
        {{ btn - 1 }}
      </button>

      <button @click="delLast">Del</button>
      <!--Вызов удаления последнего символа-->

      <br />

      <!--Переключатель на ввод Операнда-->
      <div class="operands">
      <label><input type="radio" value="1" v-model="operch" name="operand" />Операнд 1</label>
      <label><input type="radio" value="2" v-model="operch" name="operand" />Операнд 2</label>
      </div>

    </div>

  </div>
</template>



<script>
export default {
  name: "Calc",
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
    error: "",
    operch: "1",
    operands: [
      "+",
      "-",
      "*",
      "/",
      "Возвести в степень",
      "Целочисленное деление",
    ],
    logs: {},
    showvk: false,
  }),
  methods: {
    calculate(operation = "+") {
      this.error = "";

      switch (operation) {
        case "+":
          this.add();
          break;
        case "-":
          this.substract();
          break;
        case "*":
          this.multiply();
          break;
        case "/":
          this.divide();
          break;
        case "Возвести в степень":
          this.degree();
          break;
        case "Целочисленное деление":
          this.integerDivision();
          break;
      }
      const key = Date.now();
      const value = `${this.operand1}${operation}${this.operand2} = ${this.result}`;
      this.$set(this.logs, key, value);
    },
    add() {
      this.result = this.operand1 + this.operand2;
    },
    substract() {
      this.result = this.operand1 - this.operand2;
    },
    divide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "На 0 делить нельзя";
        return;
      }
      this.result = operand1 / operand2;
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    },
    degree() {
      this.result = this.operand1;
      for (let i = 1; i < this.operand2; i++) {
        this.result *= this.operand1;
      }
      return this.result;
    },
    integerDivision() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "На 0 делить нельзя";
        return;
      }
      if (operand1 / operand2 >= 0)
        this.result = Math.floor(operand1 / operand2);
      else this.result = Math.ceil(operand1 / operand2);
    },
    InputNum(i) {
      const { operch } = this;
      const input = operch === "1" ? "operand1" : "operand2";
      this[input] = +(this[input] += String(i));
    },
    delLast() {
      const { operch } = this;
      const input = operch === "1" ? "operand1" : "operand2";
      this[input] = +String(this[input]).slice(0, -1);
      console.log("eraseOne");
    },
  },
};
</script>



<style lsng="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.history, .btn-show {
 margin-bottom: 20px;
}
.operands{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>