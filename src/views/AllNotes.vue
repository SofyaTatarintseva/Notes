<template>
  <div class="home">
    <Note :notes="notes" />
    <v-row class="btn" justify="center">
      <v-btn color="green lighten-2" text @click="addNote">
        <v-icon dark>
          mdi-plus
        </v-icon>
        Добавить заметку
      </v-btn>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Note from "@/components/Note.vue";
import axios from "axios";

export default {
  name: "AllNotes",
  components: {
    Note
  },
  mounted() {
    this.getAllNote();
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    async getAllNote() {
      let test = await axios.get("http://localhost:3000/posts");
      this.notes = test.data;
    },
    addNote() {
      let id;
      if (this.notes.length === 0) {
        id = 0;
      } else {
        id = this.notes[this.notes.length - 1].id + 1;
      }
      
      this.$router.push(`/note${id}`);
    }
  }
};
</script>
<style scoped>
.btn {
  margin-top: 20px;
}
</style>
