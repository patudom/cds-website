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
        <educator-signup/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import EducatorSignUp from '@/components/forms/EducatorSignUp.vue';

@Component({
  components: {
    'educator-signup': EducatorSignUp
  }
})
export default class CreateEducatorAccount extends Vue {

  title = 'Create Educator Account';

}
</script>
