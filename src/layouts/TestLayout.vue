<template>
  <div>
    <cds-nav />
    <slot />
  </div>
</template>

<script>
import { Component } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    'cds-nav': Nav
  }
})
export default class TestLayout {}
</script>
