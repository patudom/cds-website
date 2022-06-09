<template>
  <v-container
    class="story-state-root"
  >
      <v-row
        @click="expanded = !expanded"
      >
        <v-col
          cols="4">
          {{ data.student.username }}
        </v-col>
        <v-col
          cols="4">
          {{ data.student.email }}
        </v-col>
      </v-row>
      <transition-expand>
        <component
          v-if="expanded"
          :is="componentType"
          class="detail-container"
          v-bind="{'data': data}"
        />
      </transition-expand>
  </v-container>
</template>

<script lang="ts">
import HubbleInformation from "@/components/HubbleInformation.vue";
import TransitionExpand from "@/components/TransitionExpand.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components:{
    "transition-expand": TransitionExpand
  }
})
export default class StoryStateRow extends Vue {
  componentType = HubbleInformation;
  @Prop() data!: Record<string,any>;
  expanded = false;
}
</script>

<style scoped>
.story-state-root {
  border-top: 1px solid;
}
</style>
