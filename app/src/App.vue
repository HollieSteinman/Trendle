<template>
  <n-config-provider
  :theme="darkTheme"
  :theme-overrides="theme"
  >
    <n-layout
      position="static"
      class="app-layout"
      content-style="display: flex; flex-direction: column"
    >
      <n-layout-header>
        <main-header />
      </n-layout-header>
      <n-layout-content>
        <main>
          <router-view v-slot="{ Component, route }">
            <transition
              :enter-active-class="route.meta.enterClass || 'animate__animated animate__fadeIn'"
              :leave-active-class="route.meta.leaveClass || 'animate__animated animate__fadeOut'"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { NLayout, NLayoutHeader, NLayoutContent, NConfigProvider, darkTheme } from 'naive-ui'
import MainHeader from "./components/header/MainHeader.vue";

export default {
  setup() {
    /**
   * Use this for type hints under js file
   * @type import('naive-ui').GlobalThemeOverrides
   */
    const theme = {
      common: {
        primaryColor: "#7209B7",
        primaryColorHover: "#8fd3f4",
        successColor: "#84fab0"
      },
      Card: {
        borderRadius: "8px"
      },
      DataTable: {
        thColor: "transparent",
        tdColor: "transparent",
        tdColorHover: "#26262A36",
        borderColor: "rgba(255, 255, 255, 0.20)"
      }
    };
    return {
      darkTheme,
      theme
    }
  },
  name: "App",
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NConfigProvider,
    MainHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400&display=swap");

body {
  font-family: "Noto", sans-serif;
}

.app-layout {
  min-height:100vh;
  min-width: 325px;
  background: #7A0BC0;
  background: radial-gradient(at top left, #7209B7 5%, #1A1A40 70%);
}

main {
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.page + .page {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.app-layout .n-layout-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;
}

.n-layout-header, .n-layout-content, .n-layout-footer {
  background: transparent;
}

.n-card .n-card-header {
  padding: 15px 32px 5px;
}

.highlight {
  color: #8fd3f4;
}

/* Transitions & Animations */
:root {
  --animate-delay: 0.5s;
}

</style>
