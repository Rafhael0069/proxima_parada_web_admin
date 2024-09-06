<template>
    <v-app>
      <Sidebar />
      <Navbar />
      <v-main>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-main>
    </v-app>
  </template>
    
  <script >
  
  import Navbar from '../components/NavbarAdmin.vue'
  import Sidebar from '../components/SidebarAdmin.vue'
  import Auth from "../services/auth";
  
  export default {
    data() {
      return {
      }
    },
    components: {
      Navbar,
      Sidebar,
    },
  methods:{
    async resume(){
      try {
        const res = await Auth.resume();
          sessionStorage.setItem("userLocal", JSON.stringify(res.data.userReturn));
      } catch (error) {

        if (error.response.status == 400) {
          this.$router.push({ name: "authMain" });
        }
        const response = error.response;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response);
      }
    }
  },
  created() {
    //this.resume();
    if (sessionStorage.getItem("userLocal")) {
      //this.userLocal = JSON.parse(sessionStorage.getItem("userLocal"));
      //console.log("testand o user loca: ", this.userLocal);
    }
  },
  }
  </script>
  
  <style >
  
  </style>
    