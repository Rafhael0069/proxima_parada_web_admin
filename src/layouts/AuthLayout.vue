<!-- eslint-disable vue/no-unused-components -->
<template>
    <v-app>
        <v-main class="testando">
            <v-fade-transition mode="out-in">
               <router-view></router-view>
            </v-fade-transition>
        </v-main>
    </v-app>
</template>
<script>


export default {
    name: 'HomeView',
    data() {
        return {
        }
    },
}
</script>
  
<style>
.testando{
  background: #f0f2f5;
}
</style>