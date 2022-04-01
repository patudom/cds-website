<template>
  <v-form
    ref="form"
    class="educator-signin-form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validateAndSubmit"
    >validate</v-btn>
  </v-form>
</template>


<script lang="ts">
import { Component } from 'vue-property-decorator';
import { emailRules, passwordRules } from "@/utils/rules";
import FormBase from './FormBase.vue';
import { mapActions } from 'vuex';

@Component
export default class EducatorSignIn extends FormBase {

  valid = true;
  email = "";
  password = "";
  emailRules = emailRules;
  passwordRules = passwordRules;

  checkEducatorSignIn!: (email: string, password: string) => Promise<boolean>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions("api", ["checkEducatorSignIn"])
    };
  }

  submit() {
    return this.checkEducatorSignIn(this.email, this.password);
  }

  validateAndSubmit(): void {
    const valid = this.validate();
    if (valid) {
      this.submit();
      this.reset();
    }
  }
}

</script>
