<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs8 sm6 md4>

        <div>
          <h1>Lista de Usuários</h1>
          <ul>
            <li v-for="usuario in usuarios" :key="usuario.idUser">
              {{ usuario.name }} - {{ usuario.email }}
            </li>
          </ul>
        </div>

        <v-card>
          <v-card-text>
            <v-alert
              :value="erroAlert"
              color="red"
              elevation="3"
              outlined
              type="warning"
              >{{ messageError }}</v-alert
            >
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              height="6"
            >
            </v-progress-linear>
            <v-img
              :src="require('../assets/images/admin.png')"
              class="my-3"
              contain
              height="260"
            />
            <v-form @submit.prevent="authAdmin" v-model="valid">
              <v-text-field
                prepend-icon="mail_outline"
                name="email"
                label="E-mail"
                type="text"
                :rules="[rules.required, rules.email]"
                v-model="adminAuth.email"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="password"
                name="password"
                label="Senha"
                :rules="[rules.required, rules.min]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="adminAuth.password"
              >
              </v-text-field>
              <v-btn
                :disabled="!valid"
                block
                color="primary"
                elevation="6"
                type="submit"
                >Login</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Auth from "../services/auth";
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/configFirebase';

export default {
  name: 'UserList',
  setup() {
    const usuarios = ref([]);

    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        usuarios.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    onMounted(fetchUsuarios);
    return { usuarios };
  }
    ,
  data() {
    return {
      adminAuth: {
        email: "",
        password: "",
      },
      messageError: "Erro ao conetar-se a internet!",
      loading: false,
      erroAlert: false,
      show1: false,
      valid: false,
      dialogSigninAdmin: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
      },
    };
  },
  methods: {
    async authAdmin() {
      this.loading = true;
      try {
        const res = await Auth.signinAdmin(this.adminAuth);
        this.userLocal = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userLocal));
        this.loading = false;
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        const response = error.response;
        this.loading = false;
        this.erroAlert = true;
        this.messageError = response.data.message;
        console.log(response);
      }
    },
  },
  
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap");
.btn {
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}
.form {
  font-family: "Open Sans", sans-serif;
}
.password {
  font-family: "Open Sans", sans-serif;
}
</style>
