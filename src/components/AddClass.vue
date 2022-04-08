<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="name"
          label="Class name"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn
          @click="addClass"
        >
          Add class
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { apiNamespace } from '@/store';
import { mapActions } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';

@Component
export default class AddClass extends Vue {

  name = "";
  submitClassCreation!: (name: string) => Promise<AxiosResponse>;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, [
        "submitClassCreation"
      ])
    };
  }

  addClass(): void {
    this.submitClassCreation(this.name);
  }
  

}

</script>
