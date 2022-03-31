<template>
  <component :is="layout">
    <slot/>
  </component>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Component, Vue } from 'vue-property-decorator';

const defaultLayout = "DefaultLayout";

@Component
export default class AppLayout extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get layout(): Promise<any> {

    console.log(this);

    const layout = this.$route.meta.layout || defaultLayout;
    console.log(layout);
    return () => import(`@/layouts/${layout}.vue`);
  }
}
</script>
