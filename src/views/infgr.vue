<template>
  <div>

    <nav class="level has-background-white mb-0" style="height: 50px">
      <p class="level-item has-icons-left">
        <router-link to="/map">
          <i aria-hidden="true" class="link is-info fa fa-home fa-lg"></i>
        </router-link>
      </p>
      <p class="level-item">
        <strong style="color:black">Карта ДТП по Москве</strong>
      </p>
      <p class="level-item has-icons-right">
        <i aria-hidden="true" class="link is-info fa fa-bar-chart fa-lg"></i>
      </p>
    </nav>

    <div class="select">
      <select id="district" v-model="district">
        <option :key="opt" v-for="opt in options['district']">
          {{ opt }}
        </option>
      </select>
    </div>

    <GChart
        type="LineChart"
        :data="chartBuild"
        :options="opts"
    />

  </div>
</template>

<script>
import Data from "@/assets/ahegao.json";
import {GChart} from 'vue-google-charts';
import Cases from '../assets/Cases.json'

export default {
  name: "infgr",
  components: {
    GChart
  },
  methods: {},
  computed: {
    countCases: function () {
      let res = 0
      for (let i in this.chartBuild) {
        if (this.chartBuild[i][1] != 'Аварии') res += this.chartBuild[i][1]
      }
      return res
    },
    opts: function () {
      return {
        title: `Общее количество аварий: ${this.countCases}`,
        legend: {position: 'none'},
        hAxis: {
          textPosition: 'none'
        }
      }
    },
    chartBuild: function () {
      let resdat = []
      resdat.push(['Год:Месяц', 'Аварии'])
      for (let y = 2015; y < 2022; y++) {
        for (let m = 1; m < 13; m++) {
          if(y == 2021 && m > 4) break
          resdat.push([y + ":" + m, this.cases[this.district][y - 2015][m - 1]])
        }
      }
      return resdat
    }
  },
  data() {
    return {
      district: "Южное Тушино",
      dtps: [],
      options: Data,
      cases: Cases['cases']
    }
  },
  async mounted() {
    if (localStorage.dtps) {
      this.dtps = localStorage.dtps
    } else {
      this.dtps = this.$store.getters.dtps
    }
  }
}
</script>

<style scoped>

</style>
