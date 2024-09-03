<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-navigation-drawer :mini-variant="mini" permanent expand-on-hover dark app>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <span>Menu</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-item :href="item.href" :to="{ name: item.href }" :key="index">
            <v-list-item-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        {
          href: "dashboard",
          title: "DashBoard",
          icon: "dashboard",
        },
        {
          href: "users",
          title: "Usuarios",
          icon: "groups",
        },
        {
          href: "requisitions",
          title: "Requisições",
          icon: "add_to_home_screen",
        },
        {
          href: "newadmin",
          title: "Novo Administrador",
          icon: "person_add",
        },
      ],
    };
  },
  components: {},
};
</script>

<style></style>
