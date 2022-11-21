import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_URL;

const state = {
  locations: []
};

const getters = {
	getLocations: (state) => {
		return state.locations;
	}
};

const actions = {
	async fetchLocations({commit}) {
		try {
			const response = await axios.get(`${baseUrl}/get-locations`);
			var data = response.data;
			commit('setLocations', data.map((item) => {
				return item['Name'];
			}));
		}
    catch (error) {
      console.log(error);
    }
	}
};

const mutations = {
	setLocations: (state, locations) => (state.locations = locations)
};

export default {
	state,
	getters,
	actions,
	mutations
};