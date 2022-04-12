<template>
  <v-form
    ref="form"
    class="student-signup-form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstName"
      :rules="nameRules"
      label="First name"
      color="purple darken-2"
      required
    ></v-text-field>
    <v-text-field
      v-model="lastName"
      :rules="nameRules"
      label="Last name"
      required
    ></v-text-field>
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
</template>


<script lang="ts">
import { Component } from "vue-property-decorator";
import { emailRules, nameRules, passwordRules } from "@/utils/rules";
import FormBase from "./FormBase.vue";
import { mapActions } from "vuex";

import { StudentData } from "@/store/api";

@Component
export default class StudentSignUp extends FormBase {

  // firstName = "";
  // lastName = "";
  // institution = "";
  // email = "";
  // password = "";
  // age = null;
  // gender = "";

  firstName = "Student"
  lastName = "One"
  institution = "School A"
  email = "student1@schoola.edu";
  password = "abc123";
  age = 18;
  gender = "Female";

  valid = true;
  nameRules = nameRules;
  emailRules = emailRules;
  passwordRules = passwordRules;

  errorMessage = "";
  successMessage = "";

  getVerificationURL!: (code: string) => string;
  submitStudentSignUp!: (data: StudentData) => Promise<any>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions("api", ["submitStudentSignUp"])
    };
  }

  submit() {
    return this.submitStudentSignUp({
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
      const code = result.data.status;
      if (code === "ok") {
        this.reset();
        this.successMessage = "Your account was created successfully. A verification link will be sent to your email.";
      } else if (code === "email_already_exists") {
        this.errorMessage = "An account with this email already exists";
      } else {
        this.errorMessage = "An error occurred. We apologize for the inconvenience";
      }
    }
  }
}
</script>
