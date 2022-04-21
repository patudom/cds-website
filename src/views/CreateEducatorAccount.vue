<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Educator Account Creation</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>First, you'll create your own account. Once you have an account and log in, you can create a classroom code for each section that will be using CosmicDS.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
          <v-checkbox
            :rules="[checkboxTrueRule]"
            required
          >
            <template v-slot:label>
              <div>
                I agree to <a target="_blank" href="https://www.cfa.harvard.edu/privacy-statement" @click.stop>this privacy policy</a>
              </div>
            </template>
          </v-checkbox>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { checkboxTrueRule, emailRules, nameRules, passwordRules } from "@/utils/rules";
import FormBase from "@/components/FormBase.vue";
import { mapActions } from "vuex";

import { apiNamespace } from "@/store";
import { EducatorData } from "@/store/api";

@Component
export default class CreateEducatorAccount extends FormBase {

  title = "Create Educator Account";

  firstName = "Jon";
  lastName = "Carifio";
  institution = "Harvard";
  email = "jon@harvard.edu";
  password = "test";
  age = 33;
  gender = "Male";

  valid = false;
  nameRules = nameRules;
  emailRules = emailRules;
  passwordRules = passwordRules;
  checkboxTrueRule = checkboxTrueRule;

  errorMessage = "";
  successMessage = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitEducatorSignUp!: (data: EducatorData) => Promise<any>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, ["submitEducatorSignUp"])
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
      const code = result.data.status;
      const ok = result.data.success;
      if (ok) {
        this.$router.push("/educator-account-created");
      } else if (code === "email_already_exists") {
        this.errorMessage = "An account with this email already exists";
      } else {
        this.errorMessage = "An error occurred. We apologize for the inconvenience";
      }
    }
  }

}
</script>
