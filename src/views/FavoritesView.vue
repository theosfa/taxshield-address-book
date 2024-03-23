<template>
  <Favorites />
</template>

<script>
import { defineComponent } from "vue";

// Components
import Favorites from "../components/Favorites.vue";

export default defineComponent({
  name: "FavoritesView",

  components: {
    Favorites,
  },
});
</script>
