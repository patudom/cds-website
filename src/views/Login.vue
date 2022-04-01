<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Welcome to the Hubble Data Story!</h2>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-center align-center"
    >
      <v-col cols="6">
        <v-text-field
          placeholder="username"
        />
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-center align-center"
    >
      <v-col cols="6">
        <v-text-field
          placeholder="password"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Need an account? <a>Create one here.</a></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

  title = "Login";

}

</script>
