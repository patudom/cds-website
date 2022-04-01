<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Welcome to the Hubble Data Story!</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span>Please create a free account to begin using the Cosmic Data Stories.</span>
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          content-class="info-dialog"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              id="info-button"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>
          <info/>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="navigateToEducatorCreation"
        >
          Educators Start Here
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="navigateToStudentCreation"
        >
          Students Start Here
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Already have an account? <a>Log in here.</a></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Info from '@/components/Info.vue';

@Component({
  components: {
    'info' : Info
  }
})
export default class CreateAccount extends Vue {

  dialog = false;
  title = 'Create Account';

  navigateToStudentCreation(): void {
    this.$router.push('/student-create');
  }

  navigateToEducatorCreation(): void {
    this.$router.push('/educator-create');
  }

}
</script>

<style scoped>
#info-button {
  padding: 0px;
  margin-left: 5px;
}

>>> .info-dialog {
  max-width: 80%;
}
</style>
