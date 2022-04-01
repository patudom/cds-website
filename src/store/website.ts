import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import vuetify from '@/plugins/vuetify';

@Module({
  namespaced: true,
  stateFactory: true
})
export class CDSWebsiteModule extends VuexModule {

  @Mutation
  setDarkMode(dark: boolean): void {
    vuetify.framework.theme.dark = dark;
  }

  @Mutation
  toggleDarkMode(): void {
    vuetify.framework.theme.dark = !vuetify.framework.theme.dark;
  }
}
