<template>
  <v-app-bar
    id="nav-bar"
  >
    <v-img
      id="nav-logo"
      src="cosmicds.jpg"
      class="rounded"
      max-height="50"
      max-width="50"
      contain
    />
    <v-spacer></v-spacer>
    <router-link to="/">Home</router-link>
    <router-link 
      v-if="!loggedIn"
      to="/create-account">Create Account</router-link>
    <router-link to="/current-activities">Current Activities</router-link>
    <v-btn
      icon
      @click="toggleDarkMode"
      >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <router-link
      v-if="!loggedIn"
      to="/login">
      Login
    </router-link>
    <v-menu
      v-if="loggedIn"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="loggedIn"
          v-on="on"
          v-bind="attrs"
        >My Account
        </v-btn>
      </template>
      <component :is="menu"/>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations, mapState } from "vuex";

import { apiNamespace, websiteNamespace } from "@/store";
import EducatorAccountOptions from "@/components/menus/EducatorAccountOptions.vue";

@Component
export default class Nav extends Vue {

  menu = EducatorAccountOptions;
  loggedIn!: boolean;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapMutations(websiteNamespace, ["toggleDarkMode"])
    };
    this.$options.computed = {
      ...mapState(apiNamespace, {
        loggedIn: (_state, getters) => {
          return getters["isLoggedIn"];
        }
      }),
      ...this.$options.computed
    };
  }
}
</script>


<style scoped>

a {
  text-decoration: none;
  padding: 20px;
}

a.router-link-active {
  color: var(--v-primary-base);
}

a.router-link-exact-active {
  color: var(--v-accent-base);
}

#nav-logo {
  margin: 0px 10px;
}
</style>
