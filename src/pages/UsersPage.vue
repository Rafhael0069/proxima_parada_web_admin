<template>
  <v-container fluid>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      height="6"
    >
    </v-progress-linear>
    <v-alert
      :value="erroAlert"
      color="red"
      elevation="3"
      outlined
      type="warning"
      >{{ messageError }}</v-alert
    >
    <v-row dense>
      <v-col
        v-for="(user, index) in usuarios"
        :key="index"
        cols="12"
        sm="6"
        md="6"
      >
        <v-card class="mx-auto" outlined @click="expand(index)">
          <v-expand-transition>
            <div v-if="!user.expand">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.occupation }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ user.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="100" v-if="!user.avatar">
                  <v-img
                    src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                  />
                </v-list-item-avatar>
                <v-list-item-avatar v-else size="80">
                  <v-img v-if="user.avatar" :src="user.avatar" />
                </v-list-item-avatar>
              </v-list-item>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div v-if="user.expand">
              <v-row>
                <v-col sm="8" md="8">
                  <v-container>
                    <v-card-title class="pa-0 ma-0 mb-6">
                      <span class="text-h4">{{ user.name }}</span>
                    </v-card-title>
                    <v-card-text>
                      <span class="cards-texts">{{ user.occupation }}</span><br />
                      <span class="cards-texts">{{ user.email }}</span><br />
                      <span class="cards-texts">{{ user.phone_number }}</span><br />
                    </v-card-text>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-container fill-height fluid class="pa-0">
                    <v-row justify="center">
                      <v-avatar size="156" v-if="!user.avatar">
                        <v-img
                          src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                        />
                      </v-avatar>
                      <v-avatar v-else size="156">
                        <v-img v-if="user.avatar" :src="user.avatar" />
                      </v-avatar>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row v-if="user.Vehicle[0]" class="pa-0 ma-0">
                <v-col cols="12" sm="8" md="8" class="pa-0 ma-0">
                  <v-container class="pa-0 ma-0">
                    <v-card-title class="pr-0">
                      <h3>Informações sobre o veículo</h3>
                    </v-card-title>
                    <v-card-text>
                      <span class="cards-texts"><strong>Marca: </strong>{{ user.Vehicle[0].brand }}</span><br />
                      <span class="cards-texts"><strong>Modelo: </strong>{{ user.Vehicle[0].model }}</span><br />
                      <span class="cards-texts"><strong>Cor: </strong>{{ user.Vehicle[0].vehicle_color }}</span><br />
                      <span class="cards-texts"><strong>Placa: </strong>{{ user.Vehicle[0].license_plate }}</span><br />
                    </v-card-text>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-container fill-height fluid class="pa-0 ma-0">
                    <v-row class="pa-0 ma-0">
                      <v-avatar size="150" tile v-if="!user.Vehicle[0].avatar">
                        <v-img
                          src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                        />
                      </v-avatar>
                      <v-avatar v-else size="150" tile class="">
                        <v-img
                          v-if="user.Vehicle[0].avatar"
                          :src="user.Vehicle[0].avatar"
                        />
                      </v-avatar>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <v-container>
                    <v-card-title>
                      <h3>Nenhum veículo cadastardo</h3>
                    </v-card-title>
                  </v-container>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Admin from "../services/admin";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
export default {
  data: () => ({
    usuarios: [
      /* {
        id: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
        name: "Teste 1 Teste",
        email: "1teste@gmail.com",
        phone_number: "(34) 5 3453-4534",
        occupation: "Aluno(a)",
        avatar:
          "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F41b2c605-1f7d-4f41-baeb-b3a6c8808ca4.jpg",
        status: true,
        level: false,
        Vehicle: [
          {
            id: "e64e2550-d2f6-4fe3-9ee8-0e36248417c3",
            brand: "Volkswagen",
            model: "Goll",
            avatar:
              "https://storage.googleapis.com/proxima-parada-storage.appspot.com/vehicles%2Fe64e2550-d2f6-4fe3-9ee8-0e36248417c3.jpg",
            vehicle_type: "Carro",
            vehicle_color: "Azull",
            license_plate: "234234234",
          },
        ],
        StatusRequest: [
          {
            id: "0b39f204-2402-4866-941b-4c0bb5f589d4",
            status: true,
            readed: true,
            id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
          },
        ],
        expand: true,
      }, */
    ],
    messageError: "Erro ao conectar-se ao banco de dados!",
    loading: false,
    erroAlert: false,
  }),
  methods: {
    async getAllUsers() {
      this.loading = true;
      try {
        const res = await Admin.getAllUsers();
        if (res.status == 200) {
          console.log(res);
          this.loading = false;
          this.usuarios = res.data;
        }
      } catch (error) {
        const response = error.response;
        this.erroAlert = true;
        this.loading = false;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response.data);
      }
    },

    async AllUsers() {
      try {
        this.loading = true;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach(qs => {
          this.usuarios.push(qs.data());
        });
      } catch (error) {
        console.log(error);
        this.erroAlert = true;
      }
      this.loading = false;
      console.log(this.usuarios)
    },

    expand(index) {
      this.usuarios[index].expand = !this.usuarios[index].expand;
    },
  },
  created() {
    // this.getAllUsers();
    this.AllUsers();
  },
};
</script>
<style lang="css" scopet>
.card-users {
  min-width: 300px;
}

.border {
  border: 1px solid red;
}

.cards-texts{
  font-size: 1.5em;
}
</style>
