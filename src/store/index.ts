import Vue from 'vue';
import Vuex from 'vuex';
import { CDSRestModule } from './rest';
import { CDSWebsiteModule } from './website';

Vue.use(Vuex);

const store = new Vuex.Store({});
store.registerModule("rest", CDSRestModule);
store.registerModule("website", CDSWebsiteModule);
export default store;
