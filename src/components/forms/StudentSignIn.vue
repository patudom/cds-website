<template>
  <div id="student-sign-in">
    <v-card>
      <v-card-title>Student Sign In</v-card-title>
      <v-form
        ref="form"
        class="student-signin-form"
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
    </v-card>
  </div>
</template>


<script lang="ts">
import { Component } from 'vue-property-decorator';
import { emailRules, passwordRules } from '@/utils/rules';
import FormBase from './FormBase.vue';
import { mapActions } from 'vuex';

@Component
export default class StudentSignIn extends FormBase {

  valid = true;
  email = "";
  password = "";
  emailRules = emailRules;
  passwordRules = passwordRules;

  checkStudentSignIn!: (email: string, password: string) => Promise<boolean>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions("rest", ["checkStudentSignIn"])
    };
  }

  async submit(): Promise<boolean> {
    return this.checkStudentSignIn(this.email, this.password);
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
