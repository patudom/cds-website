<template>
  <v-app id="app" data-app>
    <app-layout>
      <router-view/>
    </app-layout>
  </v-app>
</template>


<style lang="less">
/**
 Vuetify seems to like to add a scrollbar when it isn't needed
 This changes that behavior
 See https://stackoverflow.com/a/66208124
 */
html {
  overflow-y: auto !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
