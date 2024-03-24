<template>
  <Add />
</template>

<script>
import { defineComponent } from "vue";

// Components
import Add from "../components/Add.vue";

export default defineComponent({
  name: "AddView",

  components: {
    Add,
  },
});
</script>
