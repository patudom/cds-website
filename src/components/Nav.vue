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
    <router-link to="/">Home</router-link>
    <router-link to="/create-account">Create Account</router-link>
    <v-spacer></v-spacer>
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

import { CDSApiModule, User, UserType } from "@/store/api";
import { apiNamespace, websiteNamespace } from "@/store";
import EducatorAccountOptions from "@/components/menus/EducatorAccountOptions.vue";

@Component
export default class Nav extends Vue {

  menu = EducatorAccountOptions;
  user!: User;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapMutations(websiteNamespace, ["toggleDarkMode"])
    };
    this.$options.computed = {
      ...mapState(apiNamespace, {
        user: (state, _getters) => {
          return (state as CDSApiModule).user;
        }
      }),
      ...this.$options.computed
    };
    console.log(this);
  }

  get loggedIn(): boolean {
    if (this.user === undefined) {
      return false;
    }
    return this.user.type !== UserType.None;
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
  color: var(--v-primary-base);
}

#nav-logo {
  margin: 0px 10px;
}
</style>
