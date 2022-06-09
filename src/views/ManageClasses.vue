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
    <v-container
      v-for="(cls, index) in classes"
      :key="index"
    >
      <v-row>
        <v-col cols="6">
          <router-link :to="{ path: `roster-data/${cls.id}`, params: { name: cls.name, code: cls.code }}">{{ cls.name }}</router-link>
        </v-col>
        <v-col cols="6">
          {{ cls.code }}
        </v-col>
      </v-row>
    </v-container>
    <add-class/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

import { apiNamespace } from "@/store";
import { CDSApiModule, ClassInfo } from "@/store/api";
import AddClass from "@/components/AddClass.vue";

@Component({
  components: {
    "add-class": AddClass,
  }
})
export default class ManageClasses extends Vue {

  classes!: ClassInfo[];

  beforeCreate(): void {
    this.$options.computed = {
      ...mapState(apiNamespace, {
        classes: (state, _getters) => (state as CDSApiModule).userClasses
      }),
      ...this.$options.computed
    };
  }

}

</script>
