<template>
<div>
  <chartist
    ratio="ct-chart ct-major-tenth"
    type="Pie"
    :data="chartData"
    :options="chartOptions">
  </chartist>
<div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'chart',
  data () {
    return {
      chartData: {
        labels: ['yes', 'no'],
        series: [1, 1]
      },
      yes: 1,
      no: 1,
      chartOptions: {
        height: 800,
      },
      msg: 'Welcome to Your Vue.js App',
      socket: io(`http://${window.location.hostname}:3000`),
      vote: undefined,
    }
  },
  mounted: function () {
    this.socket.on('vote', (data) => {
      this.vote = data.vote;
      if (this.vote === '1') {
        this.yes = this.yes + 1;
      }
      if (this.vote === '0') {
        this.no = this.no + 1;
      }
      console.log(this.vote);
      this.chartData.series = [this.yes, this.no];
    });
  },
  beforeDestroy: function () {
    this.socket.disconnect();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.ct-label {
    fill: white !important;
    color: white !important;
    font-size: 1rem !important;
    line-height: 1;
}
</style>
