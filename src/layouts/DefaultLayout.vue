<template>
  <div>
    <cds-nav />
    <slot />
    <cds-footer />
  </div>
</template>

<script>
import { Component } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";

@Component({
  components: {
    "cds-footer": Footer,
    "cds-nav": Nav
  }
})
export default class DefaultLayout {}
</script>
