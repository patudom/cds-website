<template>
  <v-container
    class="home-root"
  >
    <v-row
      class="d-flex justify-center align-center"
    >
      <v-col cols="12">
        <div>
          The NASA-funded Cosmic Data Stories (CosmicDS) project will enable scientists to promote public understanding of data science concepts through engaging, interactive stories about their research. CosmicDS will facilitate connections between astronomers who want to tell the story of a discovery and inspire learners by letting them interrogate the data behind the story on their own, using easy-to-use but powerful data science and visualization techniques.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {

  title = "Home";

}
</script>

<style scoped>
.home-root {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
