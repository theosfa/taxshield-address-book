import { createRouter, createWebHistory  } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/add",
    name: "Add",
    component: () =>
      import( "../views/AddView.vue"),
  },
  {
    path: "/fav",
    name: "Favorites",
    component: () =>
      import( "../views/FavoritesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory (),
  routes,
});

export default router;
