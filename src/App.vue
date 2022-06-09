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
  font-family: Poppins-Regular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@font-face {
  font-family: "Poppins-ExtraLight";
  src: url("assets/fonts/poppins/Poppins-ExtraLight.ttf") format("truetype");
}

@font-face {
  font-family: "Poppins-Regular";
  src: url("assets/fonts/poppins/Poppins-Regular.ttf") format("truetype");
}
</style>
