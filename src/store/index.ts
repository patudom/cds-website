import Vue from 'vue';
import Vuex from 'vuex';
import { CDSApiModule } from './api';
import { CDSWebsiteModule } from './website';

Vue.use(Vuex);

const store = new Vuex.Store({});
store.registerModule("api", CDSApiModule);
store.registerModule("website", CDSWebsiteModule);
export default store;
