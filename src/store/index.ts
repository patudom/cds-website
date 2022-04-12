import Vue from "vue";
import Vuex from "vuex";
import { CDSApiModule } from "./api";
import { CDSWebsiteModule } from "./website";

Vue.use(Vuex);

export const apiNamespace = "api";
export const websiteNamespace = "website";

const store = new Vuex.Store({});
store.registerModule(apiNamespace, CDSApiModule);
store.registerModule(websiteNamespace, CDSWebsiteModule);
export default store;
