import Vue from 'vue';
import Vuex from 'vuex';
import { CosmicDSModule } from './cosmicds';

Vue.use(Vuex);

const store = new Vuex.Store({});
store.registerModule("cosmicds", CosmicDSModule);
export default store;
