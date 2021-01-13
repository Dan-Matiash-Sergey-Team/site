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
                const resp = await fetch('http://127.0.0.1:3000/get_2020')
                this.dtp = await resp.json()
            }
            console.log(this.dtp)
            for (let dtp of this.dtp)
                this.$store.commit('newDtp', dtp)

            await this.$router.push('/map', ()=>{})
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
