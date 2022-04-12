<template>
  <div id="create-class">
    <v-card>
      <v-card-title>Create Class</v-card-title>
      <v-form
        ref="form"
        class="create-class-form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Class Name"
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
import { nameRules } from "@/utils/rules";
import { Component } from "vue-property-decorator";
import FormBase from "./FormBase.vue";
import { mapActions, mapGetters } from "vuex";

import { ClassData } from "@/store/api";

@Component
export default class CreateClass extends FormBase {

  valid = true;
  name = "";
  nameRules = nameRules;
  
  submitClassCreation!: (data: ClassData) => Promise<any>;
  currentEducatorID!: () => number;

  beforeCreate(): void {
    this.$options.computed = {
      ...mapGetters("rest", ["currentEducatorID"]),
      ...this.$options.computed
    };
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions("rest", ["submitClassCreation"])
    };
  }

  submit(): Promise<any> {
    const educatorID = this.currentEducatorID();
    return this.submitClassCreation({
      educatorID: educatorID, name: this.name
    });
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
