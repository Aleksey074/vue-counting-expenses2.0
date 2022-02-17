<template>
  <v-data-table :headers="headers" :items="list" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Мои личные расходы</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on"
              >Записать новые расходы<v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Редактивание</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.value"
                      label="Стоимость"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
              <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Вы уверены, что хотите удалить <br />
              эту статью расходов?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Назад</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Да</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "VTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    activeID: null,
    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Дата", value: "date" },
      { text: "Категория", value: "category" },
      { text: "Стоимость", value: "value" },
      { text: "Редактирование", value: "actions", sortable: false },
    ],

    list: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.list = [
        { id: 1, date: "20.03.2020", category: "Еда", value: 169 },
        { id: 2, date: "21.03.2020", category: "Развлечения", value: 50 },
        { id: 3, date: "22.03.2020", category: "Спорт", value: 450 },
        { id: 4, date: "20.03.2020", category: "Еда", value: 169 },
        { id: 5, date: "21.03.2020", category: "Развлечения", value: 50 },
        { id: 6, date: "22.03.2020", category: "Спорт", value: 450 },
        { id: 7, date: "23.03.2020", category: "Еда", value: 169 },
        { id: 8, date: "24.03.2020", category: "Развлечения", value: 50 },
        { id: 9, date: "25.03.2020", category: "Спорт", value: 450 },
        { id: 10, date: "26.03.2020", category: "Еда", value: 169 },
        { id: 11, date: "27.03.2020", category: "Развлечения", value: 50 },
        { id: 12, date: "28.03.2020", category: "Транспорт", value: 450 },
      ];
    },

    editItem(item) {
      this.editedIndex = this.list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.list.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem);
      } else {
        this.list.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>