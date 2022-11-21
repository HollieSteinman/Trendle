<template>
  <div
    class="correct"
    v-if='correct'
  >
    <icon
      color="#84fab0"
      size="25"
    >
      <check />
    </icon>
    <h3>Correct</h3>
    <h4>Answers: {{answers.join(", ")}}</h4>
    <play-button
      text="Next"
      @click="$emit('next-round')"
    />
  </div>
  <div
    class="incorrect"
    v-else
  >
    <icon
      color="#E88080FF"
      size="25"
    >
      <times />
    </icon>
    <h3>Incorrect</h3>
    <h4>Answers: {{answers.join(", ")}}</h4>
    <h2>Score: {{correctRounds}}</h2>
    <n-input-group
    >
      <n-input 
        v-model:value="name"
        type="text"
        placeholder="Name"
        style="width:70%"
        :disabled='saved'
      />
      <n-button 
        type="info"
        ghost
        style="width:30%"
        :loading='loading'
        @click='saveClick'
      >
        <span v-if='saved'>
          <icon
            color="#8acbec"
            size="15"
          >
            <check />
          </icon>
          Saved
        </span>
        <span v-else>Save</span>
      </n-button>
    </n-input-group>
    <play-button
      text="Play Again?"
      @click="$emit('new-game')"
    />
  </div>
</template>

<script>
import { Icon } from '@vicons/utils';
import { Check, Times } from '@vicons/fa';
import PlayButton from '../button/PlayButton.vue';
import { mapActions, mapGetters } from 'vuex';
import { NInputGroup, NInput, NButton } from 'naive-ui';
import { ref } from 'vue';

export default {
  data() {
    return {
      name: ref(null),
      loading: false,
      saved: false
    }
  },
  name: "RoundResult",
  components: {
    Icon,
    Check,
    Times,
    PlayButton,
    NInputGroup,
    NInput,
    NButton
  },
  props: {
    correct: {
      type: Boolean,
      require: true,
    },
    answers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['correctRounds'])
  },
  methods: {
    ...mapActions(['saveRound']),
    saveClick() {
      if(!this.saved) {
        this.loading = true;
        this.saveRound(this.name).then(() => {
          this.loading = false;
          this.saved = true;
        })
      }
    }
  }
}
</script>

<style scoped>
div {
  padding-bottom: 2em
}

h3 {
  margin-top: 0.5em
}

h4 {
  margin-top: 0.5em
}

h2 {
  margin-top: 5px
}

.correct h3 {
  color: #84fab0
}

.incorrect h3 {
  color: #E88080FF
}

.n-input {
  padding-bottom: 0;
}
</style>