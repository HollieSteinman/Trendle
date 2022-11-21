<template>
  <n-input-group :class="[disabled ? '' : 'active', 'input-group']">
    <n-auto-complete 
      v-model:value="value"
      :input-props="{
        autocomplete: disabled
      }"
      :options="options"
      placeholder="Location"
      :theme-overrides="autoCompleteOverrides"
      size="large"
      :disabled='disabled'
      :loading='findingLocations'
    />
    <n-button
      text
      style="font-size: 2em"
      :focusable='false'
      :disabled="disabled"
      @click="$emit('guess-click', value)"
      :loading='resultLoading'
    >
      Guess
    </n-button>
  </n-input-group>
</template>

<script>
import { NInputGroup, NAutoComplete, NButton } from 'naive-ui';
import { ref, computed } from "vue";
import { useStore } from 'vuex';

/**
   * Use this for type hints under js file
   * @type import('naive-ui').AutoCompleteProps['themeOverrides']
   */
const autoCompleteOverrides = {
  peers: {
    Input: {
      color: "transparent",
      colorFocus: "transparent",
      caretColor: "#8fd3f4",
      border: "none",
      borderHover: "none",
      borderFocus: "none",
      boxShadowFocus: "none",
      paddingLarge: "0px",
      fontSizeLarge: "2em",
      colorDisabled: "transparent"
    }
  }
};

export default {
  props: {
    init_value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    resultLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore();
    const valueRef = ref(props.init_value);
    return {
      value: valueRef,
      options: computed(() => store.getters.getLocations),
      autoCompleteOverrides
    };
  },
  name: "GuessInput",
  components: {
    NInputGroup,
    NAutoComplete,
    NButton
  },
  computed: {
    findingLocations() {
      if(this.options.length == 0) {
        return true;
      }
      else
        return false;
    }
  }
}
</script>

<style scoped>
.input-group {
  background:
    linear-gradient(#FFFFFF61, #FFFFFF61),
    linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.2em, 0 0.2em;
  background-position: 100% 100%, 0 100%;
  transition: 0.25s ease-in;
}

.input-group.active:hover {
  background-size: 0 0.2em, 100% 0.2em;
}

.n-auto-complete {
  text-align: left;
}

.n-button {
  padding-left: 1em;
}
</style>