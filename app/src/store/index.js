import { createStore } from "vuex";
import rounds from "./modules/rounds.js";
import locations from "./modules/locations.js";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    rounds,
    locations
  },
});
