<template>
  <component :is="layout">
    <slot/>
  </component>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AppLayout extends Vue {

  defaultLayout = "DefaultLayout";
  layoutName: string = this.defaultLayout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: () => Promise<any> = () => import(`@/layouts/${this.defaultLayout}.vue`);

  @Watch('$route.meta.layout')
  updateLayoutIfNeeded(newLayoutName: string | undefined): void {
    newLayoutName = newLayoutName || this.defaultLayout;
    if (newLayoutName === this.layoutName) return;

    this.layout = () => import(`@/layouts/${newLayoutName}.vue`);
    this.layoutName = newLayoutName;
  }
}
</script>
