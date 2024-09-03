<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xm="8" sm="8" md="8" lg="10">
        <v-card>
          <v-form @submit.prevent="auht" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="5">
                  <v-row class="pa-2" align="center" justify="center">
                    <v-avatar size="165px" v-if="!url" class="grey">
                      <span>Escolha uma imagem</span>
                    </v-avatar>
                    <v-avatar size="165" v-else>
                      <v-img v-if="url" :src="url" />
                    </v-avatar>
                  </v-row>
                  <v-row class="pa-2" align="center" justify="center">
                    <input
                      hidden
                      id="selectFile"
                      type="file"
                      @change="onFileChange"
                    />
                    <v-btn color="primary" @click="chooseImage()"
                      >Nova Imagen</v-btn
                    >
                  </v-row>
                </v-col>
                <v-col cols="12" md="7">
                  <v-text-field
                    prepend-icon="perm_identity"
                    name="name"
                    label="Nome Completo"
                    type="text"
                    :rules="[rules.required]"
                    password
                    v-model="userData.name"
                  />
                  <v-text-field
                    prepend-icon="mail_outline"
                    name="email"
                    label="E-mail"
                    type="text"
                    :rules="[rules.required, rules.email]"
                    v-model="userData.email"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //justify-content: center
  data() {
    return {
      url: null,
      userData: {
        name: "",
        email: "",
      },
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
    chooseImage() {
      document.getElementById("selectFile").click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>
<style>
.border {
  border: 1px solid red;
}
</style>