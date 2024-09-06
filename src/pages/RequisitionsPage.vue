<template>
  <v-container fluid>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      height="6"
    ></v-progress-linear>
    <v-alert
      :value="alertError"
      color="red"
      elevation="3"
      outlined
      type="warning"
    >{{ alertMessage }}</v-alert>
    <v-alert
      :value="alertSuccess"
      color="green"
      elevation="3"
      outlined
      type="success"
    >{{ alertMessage }}</v-alert>
    <v-row dense>
      <v-alert
        :value="alertInfo"
        color="blue"
        width="100%"
        elevation="3"
        outlined
        dismissible
        type="info"
      >Nenhuma Requisição não lida encontrada</v-alert>
      <v-col
        v-for="(request, i) in requestList"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          outlined
          @click.stop="openDialoStatusRequest(request)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ request.localUser.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5 mb-1">
                {{ request.localUser.occupation }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!request.localUser.imageLocation">
              <v-img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img
                v-if="request.localUser.imageLocation"
                :src="request.localUser.imageLocation"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogConfirmStatusRequest" max-width="800px">
        <v-card>
          <v-progress-linear
            :active="statusLoading"
            :indeterminate="statusLoading"
            absolute
            top
            height="6"
          ></v-progress-linear>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-container>
                  <v-card-title class="pa-0 ma-0 mb-6">
                    <span class="text-h4">Informações do usuário</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="pa-0 ma-0 pb-0">
                      <v-col cols="12" sm="8" md="8" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.localUser.name"
                        />
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.localUser.occupation"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                      <v-col cols="12" sm="7" md="7" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.localUser.email"
                        />
                      </v-col>
                      <v-col cols="12" sm="5" md="5" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.localUser.phone"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar size="204" v-if="!selectedItem.localUser.imageLocation">
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="156">
                      <v-img
                        v-if="selectedItem.localUser.imageLocation"
                        :src="selectedItem.localUser.imageLocation"
                      />
                    </v-avatar>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-container>
                  <v-card-title class="pa-0 ma-0 mb-6">
                    <span class="text-h4">Informações do Veículo</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.localUser.Vehicle.brand"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.localUser.Vehicle.model"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar
                      size="204"
                      tile
                      v-if="!selectedItem.localUser.userVehicle.imageLocation"
                    >
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="204" tile>
                      <v-img
                        v-if="selectedItem.localUser.Vehicle.imageLocation"
                        :src="selectedItem.localUser.Vehicle.imageLocation"
                      />
                    </v-avatar>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-card-actions>
              <v-col>
                <v-row>
                  <v-text-field
                    style="padding: 0 12px"
                    v-model="selectedItem.statusDescriptionDenied"
                    label="Motivo da rejeição"
                  />
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn
                      color="error"
                      block
                      @click="updateStatusRequest(false)"
                    >
                      Rejeitar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="success"
                      block
                      @click="updateStatusRequest(true)"
                    >
                      Aceitar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Admin from "../services/admin";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export default {
  data() {
    return {
      requisitions: [],
      dialogConfirmStatusRequest: false,
      selectedItem: {
        localUser: {
          userVehicle: {},
        },
      },
      loading: false,
      statusLoading: false,
      alertInfo: false,
      alertError: false,
      alertSuccess: false,
      alertMessage: "Erro ao conectar-se ao banco de dados!",
      driverRequests: [],
      
    };
  },
  methods: {
    async getAllStatusRequest() {
      this.loading = true;
      this.requisitions = [];
      try {
        const res = await Admin.getAllStatusRequest(collection(db, "requisitions"));
        console.log("testando retorno de statusRequeset", res.data);
        if (res.data.length === 0) {
          this.alertInfo = true;
        } else {
          this.requisitions = res.data;
        }
        this.finishiProcess();
      } catch (error) {
        this.showErrorAlert(true, error.response.data.message);
        console.log(error.response.data);
      }
    },

    async updateStatusRequest(status) {
      this.statusLoading = true;
      const data = {
        id: this.selectedItem.id,
        id_user: this.selectedItem.id_user,
        statusDescriptionDenied: this.selectedItem.statusDescriptionDenied,
        status: status,
      };
      try {
        const res = await Admin.updateStatusRequest(data);
        console.log(res);
        this.statusLoading = false;
        this.dialogConfirmStatusRequest = false;
        this.showSuccessAlert(true, "Requisição respondida com sucesso.");
        this.getAllStatusRequest();
      } catch (error) {
        this.statusLoading = false;
        this.dialogConfirmStatusRequest = false;
        this.showErrorAlert(true, error.response.data.message);
        console.log(error.response.data);
      }
    },

    async fetchDriverRequests() {
      this.loading = true;
      try {
        this.loading = true;
        const querySnapshot = await getDocs(collection(db, "requisitions"));
        querySnapshot.forEach(dr => {
          this.driverRequests.push(dr.data());
        });
        if (this.driverRequests.length === 0) {
          this.alertInfo = true;
        } else {
          this.alertInfo = false;
        }

         this.driverRequests = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            idRequisition: data.idRequisition,
            localUser: {
              email: data.localUser.email,
              idUser: data.localUser.idUser,
              name: data.localUser.name,
              imageLocation: data.localUser.imageLocation,
              isDriver: data.localUser.isDriver,
              isRequestBeDriveOpen: data.localUser.isRequestBeDriveOpen,
              isRequestDenied: data.localUser.isRequestDenied,
              phone: data.localUser.phone,
              userVehicle: {
                brand: data.localUser.userVehicle.brand,
                color: data.localUser.userVehicle.color,
                imageLocation: data.localUser.userVehicle.imageLocation,
                model: data.localUser.userVehicle.model,
                plate: data.localUser.userVehicle.plate,
              },
            },
            readeRequest: data.readeRequest,
            statusDescriptionDenied: data.statusDescriptionDenied,
            statusRequest: data.statusRequest,
          };
          });

      } catch (error) {
        console.log(error);
        this.erroAlert = true;
      }
      this.loading = false;
      console.log(this.driverRequests)
    },

    openDialoStatusRequest(item) {
      console.log("testando o itemSeleceted", item);
      this.dialogConfirmStatusRequest = true;
      this.selectedItem = item;
    },

    finishiProcess() {
      this.loading = false;
      this.alertError = false;
      this.alertSuccess = false;
    },

    showErrorAlert(status, message) {
      this.alertError = status;
      this.alertMessage = message;
      setTimeout(() => {
        this.finishiProcess();
      }, 8080);
    },

    showSuccessAlert(status, message) {
      this.alertMessage = message;
      this.alertSuccess = status;
      setTimeout(() => {
        this.finishiProcess();
      }, 8080);
    },
  },

  created() {
    // this.getAllStatusRequest();
    this.fetchDriverRequests();
  },
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid red;
}

.v-input {
  font-size: 20px;
}

.v-input__slot {
  min-height: 40px;
}
</style>
