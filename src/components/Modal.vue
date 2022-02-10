<template>
  <v-row justify="center">
    <v-dialog v-model="modal.isOpenModel" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Удаление заметки
        </v-card-title>
        <v-card-text>
          {{ `Удалить заметку: ${modal.title} ?` }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="modal.isOpenModel = false">
            Закрыть
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteNote">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: ["modal"],
  name: "Modal",
  methods: {
    async deleteNote() {
      try {
        await axios.delete(
          `http://localhost:3000/posts/${this.$props.modal.id}`
        );
      } catch (e) {
        console.error(e);
      }
      this.$props.modal.isOpenModel = false;
      this.$router.push(`/`);
    }
  }
};
</script>

<style scoped></style>
