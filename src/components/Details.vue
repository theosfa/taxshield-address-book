<template>
    <div class="container-details">
        <div v-if="itemData" class="all-info-details">
            <div class="nav-details">
                <router-link to="/" class="button back"><i class="fas fa-chevron-left"></i><p>Back</p> </router-link>
                <button @click="deleteItem" class="button delete">Delete</button>
            </div>
            <div class="info-details">
                <div class="main-info-details">
                    <div class="icon-details" v-html="getInitials(itemData.name, itemData.surname)"></div>
                    <div class="text-details">
                        <p><strong>{{ itemData.name }}</strong></p>
                        <p><strong>{{ itemData.surname }}</strong></p>
                    </div>
                </div>
                <hr class="hr-info-details">
                <div class="sub-info-details">
                    <p><strong class="text-hidden">Email: </strong> {{ itemData.email }}</p>
                    <p><strong class="text-hidden">Phone: </strong> {{ itemData.phone }}</p>
                </div>
                <div class="nav-info-details">
                    <router-link :to="'/edit/' + $route.params.id" class="button edit">Edit</router-link>
                    <button to="/" @click="deleteItem" class="button delete">Delete</button>
                </div>
            </div>
        </div>
        <div v-else  class="loading">
            <p>Loading...</p>
        </div>
    </div>
    
</template>


<script>
    import { db } from "@/firebase.js";
    import { doc, getDoc, deleteDoc } from "firebase/firestore";

    export default {
    data() {
        return {
        itemData: null
        };
    },
    async created() {
        await this.fetchItemData();
    },
    methods: {
        async fetchItemData() {
        const itemId = this.$route.params.id;
        try {
            const docRef = doc(db, "data", itemId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            this.itemData = docSnap.data();
            } else {
            console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching item data:", error.message);
        }
        },
        async deleteItem() {
            const itemId = this.$route.params.id;
            try {
                console.log(itemId)
                const docRef = doc(db, "data", itemId);
                await deleteDoc(docRef);
                console.log("Document successfully deleted!");
                // Navigate to another page after deletion
                this.$router.push("/");
            } catch (error) {
                console.error("Error deleting document:", error.message);
            }
        },
        getInitials(name, surname) {
            // Get the first letter of the name and surname
            const initials = name.charAt(0) + surname.charAt(0);
            // Style the initials to appear in a circular icon
            return `<div class="initials-icon">${initials}</div>`;
        }
    }
    };
</script>
  
<style>
@media only screen and (min-width: 750px) {
    .nav-details{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
        margin-bottom: 20px;
    }
    .hr-info-details{
        width: 80%;
        margin-top: 3rem;
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
        align-items: center;
        font-size: 2rem;
        gap: 25px;
    }
    .icon-details{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        /* background-color: #B456FF; */
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
        font-size: 2rem;
        align-items: flex-start;
        justify-content: center;
        /* padding-left: 2rem; */
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
    .nav-details .button.delete{
        display: none;
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
        flex-flow: row nowrap;
        flex-grow: 2;
        justify-content: flex-start;
        padding: 2rem;
        padding-bottom: 0;
        align-items: center;
        font-size: 2rem;
        gap: 25px;
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
        /* padding-left: 20%; */
        gap: 1rem;
    }
}
</style>