<template>
    <div>

        <div v-if="showMap">
            <yandex-map :coords="[55.84547, 37.45442]" style="width: 600px; height: 600px;" :use-object-manager="true" :object-manager-clusterize="false"
            >
                <ymap-marker :coords="[Number(marker.data.infoDtp.COORD_W),Number(marker.data.infoDtp.COORD_L)]" :key="i" :marker-id="i" marker-type="placemark"
                             v-for="(marker, i) in dtps"
                >

                </ymap-marker>
            </yandex-map>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'Main',
        components: {},
        data() {
            return {
                dtps: this.$store.getters.dtps,
                showMap: false
            }
        },
        computed: {
            // placemarks: function () {
                // let a = []
                // this.dtps.forEach((el) => {
                //     a.push({
                //         coords: [Number(el.data.infoDtp.COORD_W), Number(el.data.infoDtp.COORD_L)],
                //         clusterName: 1,
                //     })
                // })
                // console.log(a)
                // return a
            // }
        },
        methods: {
            initHandler: function () {

            }
        },
        mounted() {
            this.showMap = true
        }
    }
</script>
