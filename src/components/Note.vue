<template>
  <v-container>
    <v-row justify="space-around">
      <div v-for="item in notes" :key="item.id" class="card">
        <v-card elevation="6" shaped tile>
          <div class="card_information">
            <v-card-title>{{ item.title }}</v-card-title>
            <div>
              <v-card-text
                v-for="description in item.description"
                :key="description.id"
              >
                <div
                  :class="{
                    'text-decoration-line-through': description.checkbox
                  }"
                >
                  {{ description.text }}
                </div>
              </v-card-text>
            </div>
            <v-card-actions>
              <v-btn color="error lighten-2" text @click="deleteNote(item)">
                Удалить
              </v-btn>
              <v-btn color="orange lighten-2" text @click="changeNote(item.id)">
                Изменить
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </div>
    </v-row>
    <modal :modal="modal" />
  </v-container>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  props: ["notes"],
  name: "Note",
  components: {
    Modal
  },
  data: () => ({
    checkbox: true,
    modal: {
      isOpenModel: false,
      title: "",
      id: null
    }
  }),
  methods: {
    deleteNote(item) {
      this.modal.isOpenModel = true;
      this.modal.title = item.title;
      this.modal.id = item.id;
    },
    changeNote(id) {
      this.$router.push(`/note${id}`);
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  margin: 10px 10px;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card_information {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-card__actions {
  margin-top: auto;
}
</style>
