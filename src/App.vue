<template>
    <div>
        <div v-if="loading">
            <div style="position: absolute; width: 100%; top: 40%; text-align: center;
    font-size: 500%; font-weight: 700">
                Карта ДТП по Москве
            </div>
        </div>
        <div v-else>
            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods: {},
        data() {
            return {
                dtp: [],
                loading: false,
            }
        },
        async mounted() {
            console.log(this.$router.currentRoute)
            if (this.$router.currentRoute.name != "dtpInfo") {
                if (localStorage.dtp) {
                    if (localStorage.dtp.length > 0) {
                        this.dtp = localStorage.dtp
                    }
                }
                if (this.dtp.length === 0) {
                    this.loading = true
                    // for (let i = 1; i < 12; i++) {
                    //     const resp = await fetch(`http://194.87.99.72:3000/get_dtps_month?year=2019&month=${i}`)
                    //     this.dtp = await resp.json()
                    //
                    //     this.$store.commit('concatDtps', this.dtp)
                    // }
                    // for (let i = 1; i < 12; i++) {
                    //     const resp = await fetch(`http://194.87.99.72:3000/get_dtps_month?year=2018&month=${i}`)
                    //     this.dtp = await resp.json()
                    //
                    //     this.$store.commit('concatDtps', this.dtp)
                    // }
                    const resp = await fetch("http://194.87.99.72:3000/get_dtps_year?year=2021&month=04")
                    this.dtp = await resp.json()
                    this.$store.commit("setDtp", this.dtp)
                    const loadingYearAsync = async function (year, context) {
                        return [await (await fetch(`http://194.87.99.72:3000/get_dtps_year?year=${year}`)).json(), context]
                    }
                    const loadingMonthAsync = async function (month, context) {
                        return [await (await fetch(`http://194.87.99.72:3000/get_dtps_month?year=2021&month=${month}`)).json(), context]
                    }
                    for (let i = 2015; i < 2021; i++) {
                        loadingYearAsync(i, this).then(function (res) {
                            let context = res[1]
                            res = res[0]
                            context.$store.commit("concatDtps", res)
                        })
                    }
                    for (let i = 1; i < 4; i++) {
                        loadingMonthAsync(i, this).then(function (res) {
                            let context = res[1]
                            res = res[0]
                            context.$store.commit("concatDtps", res)
                        })
                    }
                }
                this.$store.commit("loaded")
                this.loading = false
                await this.$router.push('/map', () => {
                    console.log('ready')
                })
            }

        }
    }
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
