import Vue from "vue";
import VueRouter from "vue-router";
import AllNotes from "../views/AllNotes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllNotes",
    component: AllNotes
  },
  {
    path: "/note:id",
    name: "ActiveNote",
    component: () => import("../views/ActiveNote.vue"),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
