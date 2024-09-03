<template>
  <v-container>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      height="6"
    >
    </v-progress-linear>
    <v-alert
      :value="alertError"
      color="red"
      elevation="3"
      outlined
      type="warning"
      >{{ alertMessage }}</v-alert
    >
    <v-alert
      :value="alertSuccess"
      color="green"
      elevation="3"
      outlined
      type="success"
      >{{ alertMessage }}</v-alert
    >
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <v-card width="450px" min-width="360px">
          <v-card-text>
            <v-form @submit.prevent="adminForm" v-model="valid">
              <v-text-field
                prepend-icon="perm_identity"
                name="name"
                label="Nome Completo"
                type="text"
                :rules="[rules.required]"
                password
                v-model="adminData.name"
              />

              <v-text-field
                prepend-icon="mail_outline"
                name="email"
                label="E-mail"
                type="text"
                :rules="[rules.required, rules.email]"
                v-model="adminData.email"
              />

              <v-text-field
                prepend-icon="password"
                name="password"
                label="Senha"
                :rules="[rules.required, rules.min]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="adminData.password"
              />

              <v-text-field
                prepend-icon="password"
                name="password_confirm"
                label="Comfirmar senha"
                :rules="[rules.required, rules.min, rules.matchPassword]"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                v-model="adminData.samePasswords"
              />
              <v-btn
                :disabled="!valid"
                block
                color="primary"
                elevation="6"
                type="submit"
                >Cadastrar</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Admin from "../services/admin";

export default {
  name: "NewAdminPage",
  data() {
    return {
      adminData: {
        name: "",
        email: "",
        password: "",
        samePasswords: "",
      },
      alertMessage: "Erro ao conetar-se a internet!",
      loading: false,
      alertError: false,
      alertSuccess: false,
      show1: false,
      show2: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        matchPassword: () =>
          this.adminData.password === this.adminData.samePasswords ||
          `Senhas diferentes`,
      },
    };
  },
  methods: {
    async adminForm() {
      this.loading = true;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Admin.postNewAdmin(this.adminData);
        this.loading = false;
        this.showSuccessAlert(true, "Novo Admin criado com sucesso!!!");
      } catch (error) {
        const response = error.response;
        this.loading = false;
        this.showErrorAlert(true, error.response.data.message);
        console.log(response.data);
      }
    },

    showErrorAlert(status, message) {
      this.alertError = status;
      this.alertMessage = message;
      setTimeout(() => {
        this.finishiProcess();
      }, 3000);
    },

    showSuccessAlert(status, message) {
      this.alertMessage = message;
      this.alertSuccess = status;
      (this.adminData = {
        name: "",
        email: "",
        password: "",
        samePasswords: "",
      }),
        setTimeout(() => {
          this.finishiProcess();
        }, 3000);
    },

    finishiProcess() {
      this.alertSuccess = false;
      this.alertError = false;
      //this.refresh();
    },
  },
};
</script>
