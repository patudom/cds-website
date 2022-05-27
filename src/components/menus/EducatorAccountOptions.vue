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
import { mapActions } from "vuex";

type Action = () => void;
type EducatorAccountOption = {
  title: string;
  action: Action;
}

@Component
export default class EducatorAccountOptions extends Vue {

  submitLogout!: () => void;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, [
        "submitLogout"
      ])
    };
  }

  goToRoute(route: string): void {
    if (this.$route.path !== route) {
      this.$router.push(route);
    }
  }
  
  options: EducatorAccountOption[] = [
    {
      title: "Manage Classrooms",
      action: (): void => this.goToRoute("/manage-classrooms")
    },
    {
      title: "Log Out",
      action: (): void => {
        this.submitLogout();
        this.goToRoute("/");
      }
    },
  ]

}

</script>
