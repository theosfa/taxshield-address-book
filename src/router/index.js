import { createRouter, createWebHistory  } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/fav/",
    name: "favorites",
    component: () =>
      import( "../views/FavoritesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory (),
  routes,
});

export default router;
