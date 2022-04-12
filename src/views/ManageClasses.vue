<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Create Classroom Codes</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        For each class that will be using CosmicDS, create a classroom code. Your students will use the code to associate their account with your class.
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        If you teach multiple sections of a course, create a separate classroom code for each section.
      </v-col>
    </v-row>
    <classes-table/>
  </v-container>
</template>

<script lang="ts">
import ClassesTable from "@/components/ClassesTable.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    "classes-table": ClassesTable,
  }
})
export default class ManageClasses extends Vue {

}

</script>
