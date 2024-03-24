<template>
    <Details />
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  // Components
  import Details from "../components/Details.vue";
  
  export default defineComponent({
    name: "DetailsView",
  
    components: {
        Details,
    },
  });
  </script>
  