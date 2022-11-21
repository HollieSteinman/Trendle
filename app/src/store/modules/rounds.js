import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;

const state = {
  rounds: []
};

const getters = {
  allRounds: (state) => state.rounds,
  activeRounds: (state) => state.rounds.filter(round => round.active),
  correctRounds: (state) => state.rounds.filter(round => round.result.correct).length,
  resultLoading: (state) => (id) => {
    var load = state.rounds.find(round => round.id === id).result.loading;
    if (load === undefined)
      load = false;
    return load;
  }
};

const actions = {
  async newGame ({ commit, dispatch }) {
    var nextId = state.rounds.at(-1).id + 1;
    commit('resetRounds');
    dispatch('getRound', {init: false, id: nextId});
  },
  async getRound ({ commit },  {init: init, id: id } ) {
    try {
      if ((init && state.rounds.length <= 0) || !init ) {
        const response = await axios.get(`${baseUrl}/play-round`);
        console.log(response);
        var round = response.data;
        round.result = {};
  
        if (id === undefined) {
          if (init) {
            round.id = state.rounds.length;
          }
          else {
            round.id = state.rounds.at(-1).id + 1;
          }
        }
        else {
          round.id = id
        }
  
        commit('newRound', round);
        commit('activateRound', round.id);
      }
    }
    catch (error) {
      console.log(error);
    }
  },
  async guessRound({ commit }, { id: id, guess: guess }) {
    try {
      commit('addRoundResult', { id: id, result: { loading: true }});

      var round = state.rounds.find(rnd => rnd.id === id);
      const request = { trend: round.trend, guess: guess };
      const response = await axios.post(`${baseUrl}/guess-round`,
      request);
  
      var data = response.data;
      const result = {
        guess: guess,
        correct: data.correct,
        answers: data.answers.map((item) => {
          return item['Name']
        }),
        loading: false
      };
  
      commit('addRoundResult', { id: id, result: result });
    }
    catch (error) {
      console.log(error);
    }
  },

  async nextRound({ dispatch, commit }, id) {
    commit('deactivateRound', id);
    await dispatch('getRound', false);
  },

  async saveRound(_, name) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const request = { name: name, score: state.rounds.filter(round => round.result.correct).length };
        const response = await axios.post(`${baseUrl}/save-round`,
        request);
  
        var data = response.data;
        if ( data === undefined || data.success != true)
          console.log(data);
        resolve();
      }, 1000);
    });
  }
};

const mutations = {
  resetRounds: (state) => state.rounds = [],
  newRound: (state, newRound) => state.rounds.unshift(newRound),
  addRoundResult: (state, { id, result }) => {
    const round = state.rounds.find(rnd => rnd.id === id);
    round.result = result;
  },
  activateRound: (state, id) => {
    const round = state.rounds.find(rnd => rnd.id === id);
    if (round)
      round.active = true;
  },
  deactivateRound: (state, id) => {
    const round = state.rounds.find(rnd => rnd.id === id);
    if (round)
      round.active = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};