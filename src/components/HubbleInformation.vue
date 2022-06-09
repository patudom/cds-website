<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="font-weight-bold">Calculations</v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold" cols="4">Age</v-col>
        <v-col class="font-weight-bold" cols="4">H0 Fit Value</v-col>
        <v-col class="font-weight-bold" cols="4">H0 Guess Value</v-col>
      </v-row>
      <v-row>
        <v-col cols="4">{{ageString}}</v-col>
        <v-col cols="4">{{fitValueString}}</v-col>
        <v-col cols="4">{{guessValueString}}</v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HubbleInformation extends Vue {

  @Prop() data!: Record<string,any>;

  get storyState(): Record<string,any> {
    return this.data.story_state;
  }

  get calculations(): Record<string,any> {
    return this.storyState.calculations;
  }

  get measurements(): Record<string,any> {
    return this.storyState.measurements;
  }

  quantityString(value: number, unit: string): string {
    return `${value} ${unit}`;
  }

  get ageString(): string {
    return this.quantityString(this.calculations.age_value, this.calculations.age_unit);
  }

  get fitValueString(): string {
    return this.quantityString(this.calculations.hubble_value_fit_value, this.calculations.hubble_value_fit_unit);
  }

  get guessValueString(): string {
    return this.quantityString(this.calculations.hubble_value_guess_value, this.calculations.hubble_value_guess_unit);
  }

}
</script>
