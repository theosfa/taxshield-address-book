<template>
  <div class="container-details">
        <div class="all-info-details">
            <div class="nav-details">
                <router-link to="/" class="button back"><i class="fas fa-chevron-left"></i> Back</router-link>
            </div>
            <div class="info-details">
                <div class="main-info-details">
                    <div class="icon-details" v-html="getInitials()"></div>
                    <div class="text-details">
                      <input v-model="name"  placeholder="Name" class="add-button" required>
                      <input v-model="surname" placeholder="Surname" class="add-button" required>
                    </div>
                </div>
                <hr class="hr-info-details">
                <div class="sub-info-details">
                  <input v-model="email" placeholder="Email" class="add-button" required>
                  <input v-model="phone" placeholder="Phone" class="add-button" required>
                </div>
                <div class="nav-info-details">
                  <button @click="addDataToFirestore" class="button edit">Add</button>
                  <router-link to="/" class="button delete">Cancel</router-link>
                </div>
            </div>
        </div>
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
        if (this.name && this.surname && this.email && this.phone){
          await addDoc(collectionRef, {
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone
          });
          this.$router.push("/");
          console.log("Data added successfully!");
        } else {
          alert('Please fill all fields')
        }
        // Add data to Firestore
        

      } catch (error) {
        console.error("Error adding data: ", error);
      }
    },
    getInitials() {
          return `<div class="initials-icon">NS</div>`;
      }
  }
};
</script>
  
  <style>
  @media only screen and (min-width: 750px) {
    .add-button{
      background-color: #F2F2F2;
      padding: 0.7em 1.1em;
      border-radius: 6px;
      margin: 5px;
      outline: none;
    }
    .add-button:focus {
      background-color: #E0E0E0;
    }
    .nav-details{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
        margin-bottom: 20px;
    }
    .hr-info-details{
        width: 80%;
        /* margin-top: 3rem; */
        border-color: #E4E3E3;
    }
    .container-details{
        /* background-color: aqua; */
        height: 100%;
        padding-top: 8rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .all-info-details{
        width: 70vw;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        /* background-color: brown; */
    }
    .button{
        background-color: #F2F2F2;
        height: 3.5rem;
        width: 9rem;
        padding: 0.7rem 1.7rem;
        /* font-size: 1.75rem; */
        border-radius: 15px;
        color: #C57DFF;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        /* width: fit-content; */
        gap: 8px;
    }

    .button:hover{
        background-color: #E0E0E0;
        color: #B456FF;
    }

    .info-details{
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .main-info-details{
        display: flex;
        flex-flow: row wrap;
        width: 80%;
        align-items: center;
        justify-content: center;
    }
    .text-details{
        /* background-color: white; */
        display: flex;
        flex-flow: row nowrap;
        flex-grow: 2;
        justify-content: flex-start;
        padding-left: 2rem;
        margin-bottom: 2rem;
        align-items: center;
        font-size: 1.5rem;
        gap: 25px;
    }
    .icon-details{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        /* background-color: #B456FF; */
        margin-bottom: 2rem;
    }
    .icon-details .initials-icon {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        background-color: #F0EDF6; /* Background color of the icon */
        color: #503E72; /* Text color of the initials */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
    }

    .sub-info-details{
        display: flex;
        flex-flow: column nowrap;
        width: 80%;
        /* background-color: chocolate; */
        height: 30vh;
        font-size: 1.5rem;
        align-items: flex-start;
        justify-content: center;
        padding-left: 2rem;
        gap: 1rem;
    }

    .nav-info-details{
        /* background-color: yellowgreen; */
        display: flex;
        flex-flow: row nowrap;
        width: 80%;
        justify-content: space-between;
        align-items: center;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .button.delete{
        color: #FF0000;
        width: 9rem;
        padding: 0.7em 1.7em;
        font-size: 1.75rem;
        height: 3.5rem;
    }
    .button.edit{
        height: 3.5rem;
        width: 9rem;
        padding: 0.7rem 1.7rem;
        font-size: 1.75rem;
    }
  }


    @media only screen and (max-width: 750px) {
      .add-button{
      background-color: #F2F2F2;
      padding: 0.1em 0.8em;
      border-radius: 6px;
      font-size: 1.1rem;
      min-width: 15vw;
      width: 45vw;
      max-width: 70vw;
      margin: 5px;
      outline: none;
    }
    .sub-info-details .add-button{
        width: 80vw;   
    }
    .add-button:focus {
      background-color: #E0E0E0;
    }
    .nav-info-details .button.delete{
        display: none;
    }
    .p-back{
        display: none;
    }

    .nav-details{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 5rem 2.5rem 0.2rem 2.5rem;
    }

    .button{
        background-color: #fff;
        height: 3.5rem;
        width: 2rem;
        padding: 0.7rem 1.7rem;
        /* font-size: 1.75rem; */
        border-radius: 25px;
        color: #C57DFF;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        /* width: fit-content; */
        gap: 8px;
    }
    .button.delete{
        color: #FF0000;
        background-color: #F2F2F2;
        width: 8rem;
        padding: 0.5em 1.2em;
        font-size: 1.4rem;
        height: 3.5rem;
    }
    .button.edit{
        background-color: #F2F2F2;
        height: 3.5rem;
        width: 8rem;
        padding: 0.5em 1.2em;
        font-size: 1.4rem;
        /* position: fixed;
        bottom: 2rem;
        left: calc(50% - 4rem); */
        /* margin:0; */
    }

    .info-details{
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .main-info-details{
        display: flex;
        flex-flow: column;
        width: 80%;
        align-items: center;
        justify-content: center;
    }

    .icon-details{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        /* background-color: #B456FF; */
    }
    .icon-details .initials-icon {
        width: 30vw;
        height: 30vw;
        border-radius: 50%;
        background-color: #F0EDF6; /* Background color of the icon */
        color: #503E72; /* Text color of the initials */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
    }

    .text-details{
        /* background-color: white; */
        display: flex;
        flex-flow: row wrap;
        flex-grow: 2;
        justify-content: center;
        padding: 2rem;
        padding-bottom: 0;
        align-items: center;
        font-size: 2rem;
        /* gap: 25px; */
    }
    .hr-info-details{
        width: 55%;
        margin-top: 0.5rem;
        border-color: #E4E3E3;
    }

    .text-hidden{
        display: none;
    }
    .sub-info-details{
        display: flex;
        flex-flow: column nowrap;
        width: 80%;
        /* background-color: chocolate; */
        height: 30vh;
        font-size: 1.5rem;
        align-items: flex-start;
        justify-content: center;
        padding-left: 20%;
        gap: 1rem;
    }
}
  </style>
  
  
  