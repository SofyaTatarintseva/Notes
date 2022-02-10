<template>
  <v-container>
    <v-card elevation="6" shaped tile>
      <v-card-title>
        <v-text-field
          v-model="note.title"
          color="cyan darken"
          placeholder="Введите название заметки"
          :rules="rules"
          required
          ref="title"
        />
      </v-card-title>

      <v-card-text v-for="item in note.description" :key="item.id">
        <div class="field_task">
          <v-checkbox v-model="item.checkbox" color="success"></v-checkbox>
          <v-text-field v-model="item.text" color="cyan darken" />
          <v-btn
            class="ma-2"
            color="red"
            dark
            icon
            @click="deleteTask(item.id)"
          >
            <v-icon dark>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text>
        <v-btn color="green lighten-2" text @click="addDescription">
          <v-icon dark>
            mdi-plus
          </v-icon>
          <div class="caption">
            Добавить задачу
          </div>
        </v-btn>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error lighten-2" text @click="deleteNote">
          Удалить
        </v-btn>
        <v-btn color="green lighten-2" text @click="saveNote">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
    <modal :modal="modal" />
  </v-container>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal.vue";

export default {
  name: "ActiveNote",
  components: {
    Modal
  },
  data() {
    return {
      isNewNote: false,
      note: {
        title: "",
        id: +this.$attrs.id,
        description: []
      },
      modal: {
        isOpenModel: false,
        title: "",
        id: null
      },
      rules: [value => !!value || "Обязательное поле."]
    };
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    async saveNote() {
      let valid = this.$refs.title.validate(true);
      if (valid) {
        if (this.isNewNote) {
          await axios.post("http://localhost:3000/posts", this.note);
        } else {
          await axios.patch(
            `http://localhost:3000/posts/${this.note.id}`,
            this.note
          );
        }
        this.$router.push(`/`);
      }
    },
    async getNotes() {
      try {
        let res = await axios.get(
          `http://localhost:3000/posts?id=${this.$attrs.id}`
        );
        if (res.data.length == 0) {
          this.isNewNote = true;
        } else {
          this.note = res.data[0];
          this.isNewNote = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
    deleteNote() {
      this.modal.isOpenModel = true;
      this.modal.title = this.note.title;
      this.modal.id = this.note.id;
    },
    addDescription() {
      const descriptionId = this.note.description
        ? this.note.description.length + 1
        : 0;

      this.note.description.push({
        id: descriptionId,
        checkbox: false,
        text: ""
      });
    },
    deleteTask(id) {
      this.note.description = this.note.description.filter(el => el.id != id);
    }
  }
};
</script>
<style scoped>
.field_task {
  display: flex;
  flex-direction: row;
}
</style>
