<template>
  <div class=page>
    <div class="page-layout">
      <h1>Leaderboard</h1>
      <n-data-table
        :columns='columns'
        :data='data'
        :pagination='pagination'
        :bordered='false'
      />
    </div>
  </div>
</template>

<script>
import { NDataTable } from 'naive-ui';
const axios = require('axios');

const columns = [
  {
    title: "Position",
    key: "pos"
  },
  {
    title: "User",
    key: "user"
  },
  {
    title: "Score",
    key: "score"
  },
];

export default {
  data() {
    return {
      data: [],
      columns,
      pagination: false
    }
  },
  name: "LeaderboardView",
  components: {
    NDataTable
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get(`${process.env.VUE_APP_API_URL}/get-leaderboard`)
      .then(response => {
        var responseData = response.data;
        this.data = responseData.map((item, index) => {
          console.log(item);
          return {
            pos: index + 1,
            user: item['Username'],
            score: item['Score']
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.page-layout {
  padding-left: 10%;
  padding-right: 10%;
  min-height:80vh;
}
</style>