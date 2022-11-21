<template>
  <n-button text>
    <h2>
      <n-gradient-text
        gradient="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      >
        {{ text }}
      </n-gradient-text>
    </h2>
  </n-button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { NButton, NGradientText } from "naive-ui";

export default defineComponent({
  components: {
    NButton,
    NGradientText,
  },
  props: {
    text: {
      type: String,
      default: "Play",
    },
  },
});
</script>

<style scoped>
.n-button {
  color: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-repeat: no-repeat;
  background-size: 0% 0.2em;
  background-position: 0 70%;
  transition: 0.25s ease-in;
}

.n-button:hover {
  transform: translate(0, -0.2em);
  background-size: 100% 0.2em;
}
</style>
