<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {},
        data(){
            return {dtp: []}
        },
        async mounted() {
            if(localStorage.dtp){
                if(localStorage.dtp.length>0){
                    this.dtp = localStorage.dtp
                }
            }
            if (this.dtp.length==0) {
                const resp = await fetch('http://195.133.147.101:3000/get_dtps_month?year=2020&month=1')
                this.dtp = await resp.json()

                this.$store.commit('setDtp', this.dtp)
            }
            // console.log(this.dtp)

            await this.$router.push('/map', ()=>{console.log('ready')})
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
