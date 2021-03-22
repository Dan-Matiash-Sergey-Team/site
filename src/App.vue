<template>
    <div>
        <img src="../src/assets/gifs/loading.gif" v-if="loading"/>
        <p>я эпп</p>
        <p v-if="loading">{{$store.getters.dtps.length/53978*100}}%</p>
        <router-view/>
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
            if (localStorage.dtp) {
                if (localStorage.dtp.length > 0) {
                    this.dtp = localStorage.dtp
                }
            }
            if (this.dtp.length === 0) {
                this.loading = true
                for(let i =1;i<12;i++) {
                    const resp = await fetch(`http://195.133.147.101:3000/get_dtps_month?year=2019&month=${i}`)
                    this.dtp = await resp.json()

                    this.$store.commit('concatDtps', this.dtp)
                }
                for(let i =1;i<12;i++) {
                    const resp = await fetch(`http://195.133.147.101:3000/get_dtps_month?year=2018&month=${i}`)
                    this.dtp = await resp.json()

                    this.$store.commit('concatDtps', this.dtp)
                }
            }
            // console.log(this.dtp)
            this.loading = false
            await this.$router.push('/map', () => {
                console.log('ready')
            })
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
