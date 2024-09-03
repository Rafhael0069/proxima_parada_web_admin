<!-- eslint-disable vue/multi-word-component-names -->
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
      :value="erroAlert"
      color="red"
      elevation="3"
      outlined
      type="warning"
    >
      {{ messageError }}
    </v-alert>

    <v-row cols="12" md="4" sm="6" class="cards mt-2">
      <v-col class="card">
        <h3>Usuários</h3>
        <div class="num">{{ statistics.users }}</div>
      </v-col>
      <v-col class="card">
        <h3>Motoristas</h3>
        <div class="num">{{ statistics.drivers }}</div>
      </v-col>
      <v-col class="card">
        <h3>Publicações</h3>
        <div class="num">{{ statistics.publications }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Admin from "../services/admin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data() {
    return {
      statistics: {
        users: 0,
        drivers: 0,
        publications: 0,
      },
      messageError: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      erroAlert: false,
    };
  },
  methods: {
    async getStatistics() {
      this.loading = true;
      try {
        const res = await Admin.getStatistics();

        console.log(res);
        this.loading = false;
        this.statistics = res.data;
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
  },
  created() {
    this.getStatistics();
  },
};
</script>

<style>
.cards {
  flex: 1 1 34%;
  flex-wrap: wrap;
}

.card {
  border-radius: 6px;
  border: 1px solid #deebfd;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045);
  margin: 0 8px 10px;
  position: relative;
  background-color: #5cad8a;
  padding: 2px 20px 2px 20px;
}

.card .num,
.card h3 {
  position: relative;
  color: #fff;
  z-index: 5;
  margin: 0;
  padding: 0;
}

.card .num {
  font-size: 50px;
  font-weight: bold;
}

.card h3 {
  margin-top: 10px;
  font-size: 20px;
  margin-left: 5px;
}

@media only screen and (max-width: 768px) {
  .cards {
    flex: 1 1 100%;
  }

  .card .icon {
    z-index: 0;
  }

  .card .num,
  .card h3 {
    z-index: 0;
  }
}
</style>
