<template>
  <All />
</template>

<script>
import { defineComponent } from "vue";

// Components
import All from "../components/All.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    All,
  },
});
</script>
