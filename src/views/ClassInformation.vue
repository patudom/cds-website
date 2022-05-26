<template>
  <v-container>
    <v-container
      v-if="allowed"
    >
      <v-row
        class="class-title"
      >
          {{ cls.name }}
      </v-row>
      <v-row></v-row>
      <story-information
        v-for="[storyName, storyData] in Object.entries(rosterData)"
        v-bind:key="storyName"
        :story-name="storyName"
        :story-data="storyData"
        />
    </v-container>
    <v-container v-if="!allowed">
      Sorry, but you don't have permission to view information for this class.
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { apiNamespace } from "@/store";
import { ClassInfo } from "@/store/api";
import StoryInformation from "@/components/StoryInformation.vue";

type RosterParams = { classID: number, storyName?: string };

@Component({
  components: {
    "story-information": StoryInformation
  }
})
export default class ClassInformation extends Vue {

  allowed = true;
  classID!: number;
  cls!: ClassInfo | undefined;
  rosterData: Record<string,any> = {};
  fetchRosterData!: (args: RosterParams) => Promise<Record<string,any>>;
  userClass!: (classID: number) => ClassInfo | undefined;

  beforeCreate(): void {
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(apiNamespace, ["fetchRosterData"])
    };
    this.$options.computed = {
      ...mapGetters(apiNamespace, ["userClass"]),
      ...this.$options.computed
    };
  }

  async created(): Promise<void> {
    this.classID = parseInt(this.$route.params.classID);
    this.cls = this.userClass(this.classID);
    this.allowed = this.cls != undefined;
    this.rosterData = await this.fetchRosterData({ classID: this.classID });
  }

}
</script>

<style scoped>
.class-title, .header {
  font-weight: bold;
}

.header {
  font-size: 14pt;
}

.class-title {
  display: flex;
  justify-content: center;
  font-size: 25pt;
  padding-bottom: 20px;
}
</style>
