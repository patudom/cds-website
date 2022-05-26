import { Vue } from "vue-property-decorator";
import HubbleInformation from "@/components/HubbleInformation.vue";

const storyComponents: Record<string,typeof Vue> = {
  "Hubble's Law": HubbleInformation
};

export function getStoryComponent(name: string): typeof Vue {
  return storyComponents[name];
}
