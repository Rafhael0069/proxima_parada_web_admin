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
    <v-row dense>
      <v-alert
        :value="alertInfo"
        color="blue"
        width="100%"
        elevation="3"
        outlined
        dismissible
        type="info"
        >Nenhuma Requisição não lida encontrada</v-alert
      >
      <v-col
        v-for="(requisition, i) in requisitions"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          outlined
          @click.stop="openDialoStatusRequest(requisition)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ requisition.user.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5 mb-1">{{
                requisition.user.occupation
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!requisition.user.avatar">
              <v-img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img
                v-if="requisition.user.avatar"
                :src="requisition.user.avatar"
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
                          v-model="selectedItem.user.name"
                        />
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.occupation"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                      <v-col cols="12" sm="7" md="7" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.email"
                        />
                      </v-col>
                      <v-col cols="12" sm="5" md="5" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.phone_number"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar size="204" v-if="!selectedItem.user.avatar">
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="156">
                      <v-img
                        v-if="selectedItem.user.avatar"
                        :src="selectedItem.user.avatar"
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
                    <span class="text-h4">Informações do Veiculo</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.user.Vehicle[0].brand"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.user.Vehicle[0].model"
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
                      v-if="!selectedItem.user.Vehicle[0].avatar"
                    >
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="204" tile>
                      <v-img
                        v-if="selectedItem.user.Vehicle[0].avatar"
                        :src="selectedItem.user.Vehicle[0].avatar"
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
                    v-model="
                      selectedItem.statusDescriptionDenied
                    "
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
export default {
  data: () => ({
    requisitions: [
      /* {
        id: "cd9ab86a-9f2c-412a-b7e3-4652934b6d9f",
        status: false,
        readed: false,
        id_user: "47b86c9d-bdc9-4d3a-9352-a388e9977939",
        statusDescriptionDenied: "",
        created_at: "2022-11-14T18:53:59.472Z",
        updated_at: "2022-11-14T18:53:59.472Z",
        user: {
          id: "47b86c9d-bdc9-4d3a-9352-a388e9977939",
          name: "1 Teste Update Return",
          email: "1teste@gmail.com",
          phone_number: "000000000",
          occupation: "1 Teste",
          avatar:
            "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F47b86c9d-bdc9-4d3a-9352-a388e9977939.png",
          status: false,
          level: false,
          Vehicle: [
            {
              id: "1c6ec25c-e849-490d-9644-c9396bd6ee43",
              brand: "Volkswagen",
              model: "Sentra",
              avatar: null,
            },
          ],
        },
      }, */
    ],
    dialogConfirmStatusRequest: false,
    selectedItem: {
      user: {
        Vehicle: [{}],
      },
    },
    loading: false,
    statusLoading: false,
    alertInfo: false,
    alertError: false,
    alertSuccess: false,
    alertMessage: "Erro ao conectar-se ao banco de dados!",
  }),
  methods: {
    async getAllStatusRequest() {
      this.loading = true;
      this.requisitions = [];
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Admin.getAllStatusRequest();
        console.log("testando retorno de statusRequeset", res.data);
        if (res.data.length == 0) {
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
      let data = {
        id: this.selectedItem.id,
        id_user: this.selectedItem.id_user,
        statusDescriptionDenied: this.selectedItem.statusDescriptionDenied,
        status: status,
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Admin.updateStatusRequest(data);
        console.log(res);
        this.statusLoading = false;
        this.dialogConfirmStatusRequest = false;
        this.showSuccessAlert(true, "Requisição resapondida com sucesso.");
        this.getAllStatusRequest();
      } catch (error) {
        //const response = error.response;
        this.statusLoading = false;
        this.dialogConfirmStatusRequest = false;
        this.showErrorAlert(true, error.response.data.message);
        console.log(error.response.data);
      }
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
      }, 3000);
    },

    showSuccessAlert(status, message) {
      this.alertMessage = message;
      this.alertSuccess = status;
      setTimeout(() => {
        this.finishiProcess();
      }, 3000);
    },
  },
  created() {
    this.getAllStatusRequest();
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
