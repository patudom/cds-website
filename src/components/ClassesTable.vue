<template>
  <v-container>
    <v-container
      v-for="(cls, index) in classes"
      :key="index"
    >
      <v-row>
        <v-col cols="6">
          {{ cls.name }}
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
import { apiNamespace } from "@/store";
import { CDSApiModule, ClassInfo } from "@/store/api";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import AddClass from "./AddClass.vue";


@Component({
  components: {
    "add-class": AddClass
  }
})
export default class ClassesTable extends Vue {

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
