<template>
    <div>
      <input v-model="name"  placeholder="Name" class="add-button" required>
      <input v-model="surname" placeholder="Surname" class="add-button" required>
      <input v-model="email" placeholder="Email" class="add-button" required>
      <input v-model="phone" placeholder="Phone" class="add-button" required>
      <button @click="addDataToFirestore">Add Data to Firestore</button>
    </div>
  </template>
  
  <style>
    .add-button{
      background-color: #F2F2F2;
      padding: 0.7em 1.7em;
      border-radius: 6px;
      margin: 5px;
      outline: none;
    }
    .add-button:focus {
      background-color: #E0E0E0;
    }
    button{
      background-color: #F2F2F2;
      padding: 0.7em 1.7em;
      border-radius: 16px;
      color: #C57DFF;
    }

    button:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  </style>
  
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
          if (this.name && this.surname && this.email && this.phone){
            await addDoc(collectionRef, {
              name: this.name,
              surname: this.surname,
              email: this.email,
              phone: this.phone
            });
            console.log("Data added successfully!");
          } else {
            alert('Please fill all fields')
          }
          // Add data to Firestore
          
  
        } catch (error) {
          console.error("Error adding data: ", error);
        }
      }
    }
  };
  </script>
  