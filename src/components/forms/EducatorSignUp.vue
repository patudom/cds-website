<template>
<div id="educator-sign-up">
  <v-card>
    <v-card-title>Educator Sign Up</v-card-title>
    <v-form
      ref="form"
      class="educator-signup-form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="firstName"
        :rules="nameRules"
        label="First name"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="nameRules"
        label="Last name"
        required
      >b</v-text-field>
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
      <v-text-field
        v-model="institution"
        :rules="nameRules"
        label="Educational institution"
      ></v-text-field>
      <v-text-field
        v-model="age"
        hide-details
        single-line
        label="Age"
        type="number"
      ></v-text-field>
      <v-select
        v-model="gender"
        :items="['Male', 'Female', 'Other']"
        label="Gender"
      ></v-select>
      <v-alert
        v-if="errorMessage"
        color="red lighten-2"
        >{{ errorMessage }}</v-alert>
      <v-alert
        v-if="successMessage"
        color="green lighten-2"
        >{{ successMessage }}</v-alert>
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
import { emailRules, nameRules, passwordRules } from '@/utils/rules';
import FormBase from './FormBase.vue';
import { mapActions } from 'vuex';

import { EducatorData } from '@/store/rest';

@Component
export default class EducatorSignUp extends FormBase {

  
  // firstName = "";
  // lastName = "";
  // institution = "";
  // email = "";
  // password = "";
  // age = null;
  // gender = "";

  firstName = "Jon";
  lastName = "Carifio";
  institution = "Harvard";
  email = "jon@harvard.edu";
  password = "test";
  age = 33;
  gender = "Male";

  valid = true;
  nameRules = nameRules;
  emailRules = emailRules;
  passwordRules = passwordRules;

  errorMessage = "";
  successMessage = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitEducatorSignUp!: (data: EducatorData) => Promise<any>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions("rest", ["submitEducatorSignUp"])
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit(): Promise<any> {
    return this.submitEducatorSignUp({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      institution: this.institution,
      password: this.password,
      age: this.age,
      gender: this.gender  
    });
  }

  async validateAndSubmit(): Promise<void> {
    this.errorMessage = "";
    this.successMessage = "";
    const valid = this.validate();
    if (valid) {
      const result = await this.submit();
      console.log(result);
      const code = result.data.status;
      if (code === 'ok') {
        this.reset();
        this.successMessage = "Your account was created successfully. A verification link will be sent to your email.";
      } else if (code === 'email_already_exists') {
        this.errorMessage = "An account with this email already exists";
      } else {
        this.errorMessage = "An error occurred. We apologize for the inconvenience";
      }
    }
  }

}
</script>
