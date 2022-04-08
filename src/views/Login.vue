<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Welcome to the Hubble Data Story!</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <login-form/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Need an account? <a>Create one here.</a></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { LoginForm } from '@/components/forms';

@Component({
  components: {
    'login-form': LoginForm,
  }
})
export default class Login extends Vue {

  loginType = "student";
  title = "Login";

}

</script>
