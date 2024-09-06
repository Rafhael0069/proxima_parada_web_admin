<template>
  <v-app-bar dark app>
    <v-spacer></v-spacer>
    <v-toolbar-title>Próxima Parada admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="signout">
      <v-icon>logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { logout } from '../services/auth'; // Certifique-se de que o caminho está correto

export default {
  name: 'Logout',
  setup() {
   // const router = useRouter();

  },
  methods: {
    async signout() {
      try {
       await logout();
      
        this.$router.push({ name: "signinadmin" }); // Ajuste o caminho conforme necessário
      } catch (error) {
        console.error('Erro durante o logout:', error);
      }
    },
  },
};
</script>
