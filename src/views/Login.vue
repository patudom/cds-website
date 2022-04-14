<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Welcome to the Hubble Data Story!</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
import { Component } from "vue-property-decorator";
import { emailRules, passwordRules } from "@/utils/rules";
import FormBase from "@/components/FormBase.vue";
import { mapActions, mapGetters } from "vuex";

import { apiNamespace } from "@/store";
import { UserType } from "@/store/api";

@Component
export default class Login extends FormBase {

  title = "Login";
  loginType: "student" | "educator" = "educator";
  valid = true;
  email = "jon@harvard.edu";
  password = "test";
  emailRules = emailRules;
  passwordRules = passwordRules;

  submitEducatorSignIn!: (args: { email: string, password: string }) => Promise<void>;
  submitStudentSignIn!: (args: { email: string, password: string }) => Promise<void>;
  userType!: UserType;

  beforeCreate(): void {
    this.$options.computed = {
      ...mapGetters(apiNamespace, [
        "userType"
      ]),
      ...this.$options.computed
    };
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
      if (this.userType === UserType.Educator) {
        this.$router.push("/manage-classrooms");
      }
    }
  }

}

</script>
