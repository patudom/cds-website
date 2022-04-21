<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Student Account Creation</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Complete this form to create your account.</p>
        <p>If you have a classroom code, you can enter it here.</p>
        <p>If you don't have your classroom code yet, you can enter it later.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form
          ref="form"
          class="student-signin-form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
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
          <v-select
            v-model="gender"
            :items="['Male', 'Female', 'Other']"
            label="Gender"
          ></v-select>
          <v-text-field
            v-model="classroomCode"
            label="Classroom Code"
          ></v-text-field>
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
          >Create</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { checkboxTrueRule, emailRules, nameRules, passwordRules, usernameRules } from "@/utils/rules";
import FormBase from "@/components/FormBase.vue";
import { mapActions } from "vuex";

import { apiNamespace } from "@/store";
import { StudentData } from "@/store/api";

@Component
export default class CreateStudentAccount extends FormBase {

  title = "Create Student Account";

  username = "TestStudent";
  classroomCode = "";
  valid = false;
  email = "teststudent@testschool.edu";
  password = "testpass";
  institution = "TestSchool";
  age = null;
  gender = null;
  nameRules = nameRules;
  emailRules = emailRules;
  passwordRules = passwordRules;
  usernameRules = usernameRules;
  checkboxTrueRule = checkboxTrueRule;

  errorMessage = "";
  successMessage = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitStudentSignUp!: (data: StudentData) => Promise<any>;
  validateClassroomCode!: (code: string) => Promise<boolean>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, [
          "submitStudentSignUp",
          "validateClassroomCode"
        ]
      )
    };
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async submit(): Promise<any> {
    return this.submitStudentSignUp({
      username: this.username,
      email: this.email,
      password: this.password,
      institution: this.institution,
      age: this.age,
      gender: this.gender,
      classroomCode: this.classroomCode,
    });
  }

  async validateAndSubmit(): Promise<void> {
    this.errorMessage = "";
    this.successMessage = "";
    const valid = this.validate();
    if (valid) {

      if (this.classroomCode) {
        const validCode = await this.validateClassroomCode(this.classroomCode);
        console.log(`Valid code: ${validCode}`);
        if (!validCode) {
          this.errorMessage = "Not a valid classroom code. Try again or check with your instructor for the correct code.";
          return;
        }
      }

      const result = await this.submit();
      const code = result.data.status;
      const ok = result.data.success;
      console.log(result);
      if (ok) {
        this.$router.push("/student-account-created");
      } else if (code === "email_already_exists") {
        this.errorMessage = "An account with this email already exists.";
      } else {
        this.errorMessage = "An error occurred. We apologize for the inconvenience.";
      }
    }
  }

}
</script>
