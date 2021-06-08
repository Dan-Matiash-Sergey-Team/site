<template>
    <div class="modal is-active" v-if="showPopup">
        <div class="modal-background"></div>
        <div class="modal-content">
            <GChart
                    :data="chartBuild"
                    :options="opts"
                    type="LineChart"
            />
            <button @click="closePopup" style="float: right">
                Закрыть
            </button>
        </div>
    </div>
</template>

<script>
    import Data from "@/assets/ahegao.json";
    import {GChart} from 'vue-google-charts';
    import Cases from '../assets/Cases.json';

    export default {
        name: "infgr",
        components: {
            GChart
        },
        methods: {
            closePopup: function () {
                this.$emit('closePopup')
            }
        },
        props: [
            'showPopup',
            'districtPopup'
        ],
        computed: {
            district: function () {
                return this.districtPopup
            },
            countCases: function () {
                let res = 0
                for (let i in this.chartBuild) {
                    if (this.chartBuild[i][1] != 'Аварии') res += this.chartBuild[i][1]
                }
                return res
            },
            opts: function () {
                return {
                    title: `Общее количество аварий по району ${this.district}: ${this.countCases}`,
                    legend: {position: 'none'},
                    hAxis: {
                        textPosition: 'none',
                    },
                    vAxis: {
                        format: "0"
                    },
                    chartArea: {
                        left: 20,
                        top: 20,
                        bottom: 10,
                        right: 20
                    }
                }
            },
            chartBuild: function () {
                let resdat = []
                resdat.push(['Год:Месяц', 'Аварии'])
                for (let y = 2015; y < 2022; y++) {
                    for (let m = 1; m < 13; m++) {
                        if (y == 2021 && m > 4) break
                        resdat.push([(m < 10 ? `0${m}` : m) + "." + y, this.cases[this.district][y - 2015][m - 1]])
                    }
                }
                return resdat
            }
        },
        data() {
            return {
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
