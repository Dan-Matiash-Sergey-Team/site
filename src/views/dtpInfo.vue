<template>
    <div>
        <div>{{id}}</div>
        <div>{{dtpData.district_name}}</div>
        <div>{{dtpData.data.infoDtp.COORD_L}} {{dtpData.data.infoDtp.COORD_W}}</div>
        <div>{{dtpData.data.DTP_V}}</div>
        <div>{{dtpData.data.NPDD}}</div>
        <div>{{dtpData.data.infoDtp.OBJ_DTP}}</div>
        <div>{{dtpData.data.infoDtp.change_org_motion}}</div>
        <div>{{dtpData.data.infoDtp.k_ul}}</div>
        <div>{{dtpData.data.infoDtp.osv}}</div>
        <div>{{dtpData.data.date}} {{dtpData.data.Time}}</div>
    </div>
</template>

<script>
    export default {
        name: "dtpInfo",
        props: ['id'],
        data() {
            return {
                dtpData: {}
            }
        },
        async mounted() {
            const resp = await (await fetch(`http://195.133.147.101:3000/get_dtp?id=${this.id}`)).json()
            console.log(resp)
            this.dtpData = resp[0]
        }
    }
</script>

<style scoped>

</style>
