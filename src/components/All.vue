<template>
  <div>
    <h2>Data from Firestore:</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.id }} - {{ item.data.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
  data () {
    return {
      items: []
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));
        querySnapshot.forEach((doc) => {
          this.items.push({ id: doc.id, data: doc.data() });
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  }
};
</script>
