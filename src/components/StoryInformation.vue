<template>
  <v-container
    class="story-info-root"
  >
    <v-row
      class="story-title"
      @click="expanded = !expanded"
    >
        {{ storyName }}
    </v-row>
    <transition-expand>
      <v-container
        v-if="expanded"
      >
        <v-row>
          <v-col
            cols="4"
            class="header"
          >
            Username
          </v-col>
          <v-col
            cols="4"
            class="header"
          >
            Email
          </v-col>
        </v-row>
        <story-state-row
          v-for="data in storyData"
          v-bind:key="data.student_id"
          :data="data"
          :component-type="componentType"
        />
      </v-container>
    </transition-expand>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StoryStateRow from "@/components/StoryStateRow.vue";
import TransitionExpand from "@/components/TransitionExpand.vue";
import { getStoryComponent } from "@/utils/storyComponents";

@Component({
  components: {
    "story-state-row": StoryStateRow,
    "transition-expand": TransitionExpand
  }
})
export default class StoryInformation extends Vue {

  @Prop() storyData!: Record<string,any>;
  @Prop() storyName!: string;
  componentType: typeof Vue | null = null;
  expanded = true;

  created(): void {
    this.componentType = getStoryComponent(this.storyName);
  }

}
</script>

<style scoped>
.story-info-root {
  border: solid 1px;
}

.story-title {
  display: flex;
  justify-content: center;
  font-size: 18pt;
}

.header {
  font-weight: bold;
  font-size: 14pt;
}
</style>
