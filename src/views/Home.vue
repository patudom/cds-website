<template>
  <v-container>
    <v-row
      class="d-flex justify-center align-center"
    >
    <v-col cols="12">
      <div>
        COSMIC DATA STORIES HOME PAGE
      </div>
    </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import TitleMixin from '@/mixins/title';

@Component
export default class Home extends Mixins(TitleMixin) {

  title = 'Home';

}
</script>
