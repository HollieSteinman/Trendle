<template>
  <div class=page>
    <div class="score">
      <h4>Score: {{correctRounds}}</h4>
    </div>
    <transition-group
      enter-active-class="animate__animated animate__fadeInDown animate__delay-1s"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div 
        class="page-holder"
        v-for="round in activeRounds"
        :key="round.id"
      >
        <game-round :round="round"/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import GameRound from "../components/game/GameRound.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['activeRounds', 'correctRounds']),
  },
  methods: mapActions(['getRound']),
  name: "PlayView",
  components: {
    GameRound
  },
  created() {
    this.getRound({
      init: true
    });
  }
}
</script>

<style scoped>
.page-layout {
  padding-left: 10%;
  padding-right: 10%;
}

.page-holder {
  margin-top: 10vh;
  padding-bottom: 3em;
  width: 100%;
}

h1 {
  font-size: 50px;
}

h4 {
  margin: 0px;
  padding-right: 28px;
  text-align: right;
}
</style>