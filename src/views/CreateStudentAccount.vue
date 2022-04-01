<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Student Account Creation</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>First, you'll create your own account. Once you have an account and log in, you can create a classroom code for each section that will be using CosmicDS.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <student-signup/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import StudentSignUp from '@/components/forms/StudentSignUp.vue';

@Component({
  components: {
    'student-signup': StudentSignUp
  }
})
export default class CreateStudentAccount extends Vue {

  title = 'Create Student Account';

}
</script>
