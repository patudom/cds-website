<template>
  <v-form
    ref="form"
    class="login-form"
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
    >submit</v-btn>
    <v-btn-toggle
      v-model="loginType"
    >
      <v-btn value="student">
        Student
      </v-btn>
      <v-btn value="educator">
        Educator
      </v-btn>
    </v-btn-toggle>
  </v-form>
</template>


<script lang="ts">
import { Component } from 'vue-property-decorator';
import { emailRules, passwordRules } from '@/utils/rules';
import FormBase from './FormBase.vue';
import { mapActions } from 'vuex';

import { apiNamespace } from '@/store';

@Component
export default class LoginForm extends FormBase {

  loginType: "student" | "educator" = "educator";
  valid = true;
  email = "jon@harvard.edu";
  password = "test";
  emailRules = emailRules;
  passwordRules = passwordRules;

  submitEducatorSignIn!: (args: { email: string, password: string }) => Promise<void>;
  submitStudentSignIn!: (args: { email: string, password: string }) => Promise<void>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, [
        "submitEducatorSignIn",
        "submitStudentSignIn"
      ])
    };
  }

  get submitLogin(): (args: { email: string, password: string }) => Promise<void> {
    return this.loginType === "student" ? this.submitStudentSignIn : this.submitEducatorSignIn;
  }

  async submit(): Promise<void> {
    return this.submitLogin({ email: this.email, password: this.password });
  }

  async validateAndSubmit(): Promise<void> {
    const valid = this.validate();
    if (valid) {
      await this.submit();
      this.reset();
    }
  }
}

</script>
