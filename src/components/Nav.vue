<template>
  <v-app-bar
    id="nav-bar"
  >
    <router-link to="/">Home</router-link>
    <router-link to="/create-account">Create Account</router-link>
    <v-spacer></v-spacer>
    <v-btn
      icon
      @click="toggleDarkMode"
      >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component
export default class Nav extends Vue {
  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapMutations("website", ["toggleDarkMode"])
    };
  }
}
</script>


<style scoped>
#nav-bar a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
}
#nav-bar a.router-link-exact-active {
  color: #42b983;
}
</style>
