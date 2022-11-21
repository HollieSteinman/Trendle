<template>
  <n-space justify="space-between" size="large" class="space-container">
    <router-link to="/">
      <n-button text :focusable='false'>
        <basic-logo tag="b" font_size="15px"/>
      </n-button>
    </router-link>
    <n-space justify="end" size="large">
      <router-link to="/play">
        <n-button text>Play</n-button>
      </router-link>
      <router-link to="/leaderboard">
        <n-button text>Leaderboards</n-button>
      </router-link>
    </n-space>
  </n-space>
</template>

<script>
import { NSpace, NButton } from 'naive-ui';
import BasicLogo from '../type/BasicLogo.vue';

export default {
  name: "MainHeader",
  components: {
    NSpace,
    NButton,
    BasicLogo
  }
};
</script>

<style scoped>
.space-container{
  padding: 2em;
}
</style>
