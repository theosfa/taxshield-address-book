<template>
  <div class="contain">
    <div class="search-bar">
      <div class="search-container">
        <input type="text" v-model="email" placeholder="Search" class="inp" required>
      </div>
      <div class="buttons">
        <button class="all" @click="email = ''">All</button>
        <router-link to="/fav" class="fav">Favorites</router-link>
      </div>
    </div>
    <div class="all-container">
      <div v-for="(item, index) in filteredItems" :key="index" class="info-all">
        <router-link :to="'/details/' + item.id" class="info">
          <div class="icon" v-html="getInitials(item.data.name, item.data.surname)"></div>
          <div class="nsep">
            <div class="nse">
              <div class="name-surname">
               <p> {{ item.data.name }}</p>
               <p>{{ item.data.surname }}</p>
              </div>
              <div class="email">
                {{ item.data.email }}
              </div>
            </div>
            <div class="phone">
              {{ item.data.phone }}
            </div>
          </div>
          <i class="fa fa-chevron-right"></i>
        </router-link>
        <hr class="hr-info">
      </div>
    </div>
  </div>
  <router-link to="/add" class="but">+</router-link>
</template>


<script>
import { db } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      items: [],
      email: ''
    };
  },
  async created() {
    await this.fetchData();
  },
  computed: {
  filteredItems() {
    // Filter items based on email or name input value
    const query = this.email.toLowerCase().trim();
    return this.items.filter(item => 
      item.data.email.toLowerCase().includes(query) ||
      item.data.name.toLowerCase().includes(query) ||
      item.data.surname.toLowerCase().includes(query)||
      item.data.phone.toLowerCase().includes(query)
    );
  }
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
.icon .initials-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #F0EDF6; /* Background color of the icon */
  color: #503E72; /* Text color of the initials */
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa-chevron-right{
  color: #B7B7B7;
}
.info-all{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
}
.info{
  /* background-color: violet; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  text-decoration: none;
  color: black;
  
}
.hr-info{
  width: 100%;
  border-color: #E4E3E3;
}
.name-surname{
  display: flex;
  gap: 10px;
}

.nse{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 4rem;
  flex-grow: 2;
}

.nsep{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  flex-grow: 2;
}

.contain{
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-flow: column nowrap;
}
.search-bar{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    /* background-color: #B456FF; */
    /* padding-left: 15%; */
    width: 70%;
  }
.search-container {
  position: relative;
  flex-grow: 1;
  /* margin-right: 3px; */
}


.buttons{
  flex-grow: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}

.inp {
  background-color: #F2F2F2;
  padding: 0.7em 1.7em;
  border-radius: 0.7rem 0 0 0.7rem;
  width: 100%;
  /* margin: 5px; */
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%239C9C9C" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
  background-repeat: no-repeat;
  
  /* color: #503E72; */
  background-position: calc(100% - 10px) center;
  background-size: 20px;
}

.inp:focus {
  background-color: #E0E0E0;
}
  .but{
    background-color: #F2F2F2;
    padding: 0.7em 1.2em;
    border-radius: 15rem;
    font-size: 2.2rem;
    color: #C57DFF;
    position: fixed;
    bottom: 4.5rem;
    right: 4.5rem;
    font-style: normal;
    text-decoration: none;
    
  }
  .but:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .all{
    background-color: #C57DFF;
    padding: 0.7em 1.2em;
    border-radius: 0 0 0 0;
    font-size: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #C57DFF;
    color: #fff;
    width: 50%;
    pointer-events: none;
  }
  .all:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .fav{
    display: inline-block;
    background-color: #fff;
    padding: 0.7em 1.2em;
    border-radius: 0  0.7rem 0.7rem 0;
    font-size: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #C57DFF;
    text-decoration: none;
    text-align: center;
    width: 50%;
  }
  .fav:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .all-container{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    /* background-color: aqua; */
    min-height: 100vh;
    margin-top: 20px;
  }
}
@media only screen and (max-width: 750px) {
    .icon .initials-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #F0EDF6; /* Background color of the icon */
  color: #503E72; /* Text color of the initials */
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa-chevron-right{
  color: #B7B7B7;
}
.info-all{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
}
.info{
  /* background-color: violet; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  text-decoration: none;
  color: black;
  
}
.hr-info{
  width: 100%;
  border-color: #E4E3E3;
}
.name-surname{
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
}

.email{
  order: 3;
}
.nsep{
  display: flex;
  flex-grow: 2;
  flex-flow: row wrap;

  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  align-items: center;
  /* width: 100%; */
}

.nse{
  display: flex;
  flex-flow: column nowrap;
}
.phone{
  align-self: flex-start;
}

.fa.fa-chevron-right{
  order: 5;
}
.contain{
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-flow: column nowrap;
}
.search-bar{
    display: flex;
    flex-flow: column ;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    /* background-color: #B456FF; */
    /* padding-left: 15%; */
    width: 100%;
    gap: 1.5rem
  }
.search-container {
  position: relative;
  flex-grow: 1;
  width: 90%;
  /* margin-right: 3px; */
}


.buttons{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 90%;
}

.inp {
  background-color: #F2F2F2;
  padding: 0.3em 1.7em;
  border-radius: 0.7rem 0 0 0.7rem;
  width: 100%;
  /* margin: 5px; */
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%239C9C9C" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
  background-repeat: no-repeat;
  
  /* color: #503E72; */
  background-position: calc(100% - 10px) center;
  background-size: 20px;
}

.inp:focus {
  background-color: #E0E0E0;
}
  .but{
    /* background-color: #F2F2F2; */
    background-color: #E0E0E0;
    padding: 0.2em 1.2em;
    /* border-radius: 15rem; */
    font-size: 2.2rem;
    /* color: #C57DFF; */
    color: #B456FF;
    position: fixed;
    bottom: 0rem;
    font-style: normal;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;

    
  }
  .but:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .all{
    background-color: #C57DFF;
    padding: 0.15em 1.2em;
    border-radius: 0.4rem 0 0 0.4rem;
    font-size: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #C57DFF;
    color: #fff;
    width: 50%;
    pointer-events: none;
  }
  .all:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .fav{
    display: inline-block;
    background-color: #fff;
    padding: 0.15em 1.2em;
    border-radius: 0  0.4rem 0.4rem 0;
    font-size: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #C57DFF;
    text-decoration: none;
    text-align: center;
    width: 50%;
  }
  .fav:hover{
      background-color: #E0E0E0;
      color: #B456FF;
    }
  .all-container{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    /* background-color: aqua; */
    min-height: 100vh;
    margin-top: 20px;
  }
}
</style>


