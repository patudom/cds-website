<template>
  <v-list>
    <v-list-item
      v-for="(option, index) in options"
      :key="index"
    >
    <a
      @click="option.action()"
    >{{ option.title }}</a>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { apiNamespace } from "@/store";
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

type Action = () => void;
type EducatorAccountOption = {
  title: string;
  action: Action;
}

@Component
export default class EducatorAccountOptions extends Vue {

  logout!: () => void;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapMutations(apiNamespace, [
        "logout"
      ])
    };
  }

  goToRoute(route: string): void {
    this.$router.push(route);
  }
  
  options: EducatorAccountOption[] = [
    { title: "Manage Classrooms", action: () => this.goToRoute("/manage-classrooms") },
    { title: "Log Out", action: this.logout },
  ]

}

</script>
