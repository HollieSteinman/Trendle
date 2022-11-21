<template>
  <n-card
    :segmented="{
      content: true
    }"
    size="large"
  >
    <template #header>
      <n-space align="center" size="large">
        <n-avatar
          round
          size="large"
          :src='`${s3_url}/${tweet.ID}.jpg`'
        />
        <h5>{{tweet.Username}}</h5><h6>@{{tweet.Handle}}</h6>
      </n-space>
    </template>
    <span v-html="highlights"></span>
  </n-card>
</template>

<script>
import { NCard, NSpace, NAvatar } from 'naive-ui';

export default {
  name: "TwitterCard",
  components: {
    NCard,
    NSpace,
    NAvatar
  },
  props: {
    tweet: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      s3_url: process.env.VUE_APP_S3_URL
    }
  },
  methods: {
    decodeText(text) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    }
  },
  computed: {
    highlights() {
      if(this.tweet !== undefined) {
        const regexp = new RegExp(/((@|#)(\w|_)+)|(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/, 'ig');
        const highlights = this.decodeText(this.tweet.Text).replace(regexp, "<span class='highlight'>$&</span>");
        return `<span>${highlights}</span>`;
      }
      return '';
    }
  }
};
</script>

<style scoped>
* {
  text-align: left;
}

h5, h6, p {
  margin: 0;
}

.n-avatar {
  margin: 0;
  padding: 0;
}
</style>