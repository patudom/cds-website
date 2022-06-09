<template>
  <v-container>
    <v-row justify="center">
      <h1>Current Activities</h1>
    </v-row>
    <v-row justify="center">
      <h3>Winter 2022</h3>
    </v-row>
    <v-row justify="center">
      <ul>
        <li>Development of a Hubble Data Story is ongoing, with plans to pilot test in high school and Astro 101 classrooms in June 2022. Learn more <a href="https://www.cosmicds.cfa.harvard.edu/_files/ugd/7f2ddc_de74f2cf1fe94b1d8e9ce5c40ce1fbac.pdf">here</a>.</li>
        <li>Students will use real galaxy spectra and imagery from the Sloan Digital Sky Survey to answer:
          <ul>
            <li><strong>How</strong> do astronomers know how old the universe is?</li>
            <li><strong>How confident</strong> are you in your result? (i.e. When trying to answer a totally new scientific question, <strong>how would you know if your result is believable?</strong>)</li>
          </ul>
        </li>
      </ul>
    </v-row>
    <v-row justify="center justify-space-around">
      <v-img
        class="flex-grow-0"
        id="hubble-screenshot-1"
        :src="require(`@/assets/images/HubbleDS Screenshot 1.webp`)"
      />
      <v-img
        class="flex-grow-0"
        id="hubble-screenshot-2"
        :src="require(`@/assets/images/HubbleDS Screenshot 2.webp`)"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CurrentActivities extends Vue {
  
}
</script>

<style scoped>
li {
  text-align: left;
}

#hubble-screenshot-1 {
  width: 548px;
  height: 293px;
}

#hubble-screenshot-2 {
  width: 368px;
  height: 293px;
}

</style>
