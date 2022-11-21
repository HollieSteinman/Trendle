<template>
    <h1>
        <basic-logo tag="b" font_size="60px"/><span class="cursor">|</span>
    </h1>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import BasicLogo from "./BasicLogo.vue"


export default defineComponent ({
    components: {
        BasicLogo
    }
});
</script>

<style scoped>
.cursor {
    padding-left: 0.05em;
    font-size: 60px;
    font-weight: 400;
    -webkit-animation: 1s blink step-end infinite;
    -moz-animation: 1s blink step-end infinite;
    -ms-animation: 1s blink step-end infinite;
    -o-animation: 1s blink step-end infinite;
    animation: 1s blink step-end infinite;
}

@keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: var(--n-text-color);
  }
}

@-moz-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: var(--n-text-color);
  }
}

@-webkit-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: var(--n-text-color);
  }
}

@-ms-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: var(--n-text-color);
  }
}

@-o-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: var(--n-text-color);
  }
}
</style>