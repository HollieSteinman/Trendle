<template>
  <n-space v-if='round.errorMessage != undefined' vertical align="stretch" justify="space-between" class="page-layout">
    <n-alert title="Error" type="Error">
      <p>Unable to load round data.</p>
      <n-button type="error" ghost @click='reloadClick'>
        Reload
      </n-button>
    </n-alert>
  </n-space>
  <n-space v-else vertical align="stretch" justify="space-between" class="page-layout">
    <n-collapse-transition v-show="hasResult">
        <round-result
          :correct='round.result.correct'
          :answers='round.result.answers'
          @next-round="nextClick"
          @new-game="newGame"
        />
    </n-collapse-transition>
    <guess-input
      @guess-click="guessClick" 
      :disabled="hasResult"
      init_value=""
      :resultLoading="resultLoading(round.id)"
    />
    <h1>{{round.trend}}</h1>
    <div
      class="twitter-holder"
      v-for="(tweet, index) in round.tweets"
      :key="index"
    >
      <twitter-card :tweet="tweet"/>
    </div>
  </n-space>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { NButton, NAlert, NSpace, NCollapseTransition } from "naive-ui";
import GuessInput from "../input/GuessInput.vue";
import TwitterCard from "../card/TwitterCard.vue";
import RoundResult from "./RoundResult.vue"

export default {
  methods: {
    ...mapActions(["guessRound", "nextRound", "fetchLocations", "newGame"]),
    guessClick(guess) {
      this.guessRound({ id: this.round.id, guess: guess });
    },
    nextClick() {
      this.nextRound(this.round.id);
    },
    reloadClick() {
      window.location.reload();
    }
  },
  created() {
    this.fetchLocations()
  },
  name: "GameRound",
  props: {
    round: {
      type: Object,
      require: true,
    },
  },
  components: {
    NButton,
    NAlert,
    NSpace,
    NCollapseTransition,
    GuessInput,
    TwitterCard,
    RoundResult
  },
  computed: {
    ...mapGetters(['resultLoading']),
    hasResult() {
      return this.round.result.guess !== undefined;
    }
  }

};
</script>

<style scoped>
.n-collapse-transition {
  transition-duration: 1.5s;
}
</style>