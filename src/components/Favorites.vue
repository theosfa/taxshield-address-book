<template>
    <div>
      <input v-model="name" placeholder="Name">
      <input v-model="surname" placeholder="Surname">
      <input v-model="email" placeholder="Email">
      <input v-model="phone" placeholder="Phone">
      <button @click="addDataToFirestore">Add Data to Firestore</button>
    </div>
  </template>
  
  <script>
  import { getFirestore, collection, addDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        name: "",
        surname: "",
        email: "",
        phone: ""
      };
    },
    methods: {
      async addDataToFirestore() {
        try {
          // Initialize Firestore and get reference to the collection
          const db = getFirestore();
          const collectionRef = collection(db, "data");
  
          // Add data to Firestore
          await addDoc(collectionRef, {
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone
          });
  
          console.log("Data added successfully!");
        } catch (error) {
          console.error("Error adding data: ", error);
        }
      }
    }
  };
  </script>
  