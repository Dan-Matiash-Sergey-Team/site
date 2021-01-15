<template>
    <div>

        <div v-if="showMap  ">
            <yandex-map :cluster-options="cluster" :clusterOptions="{1:{}}" :coords="[55.84547, 37.45442]"
                        :use-object-manager="true"
                        @map-was-initialized="initHandler" style="width: 1550px; height: 825px;"
            >
                <ymap-marker :coords="[Number(marker.data.infoDtp.COORD_W),Number(marker.data.infoDtp.COORD_L)]"
                             :key="i" :marker-id="i" cluster-name="1"
                             marker-type="placemark"

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
                showMap: false,
                cluster: {
                    1: {
                        clusterDisableClickZoom: false,
                        hasBalloon: false,
                        clusterLayout: '<div style="color: tomato; font-family: Foros; font-weight: 600;">{{ properties.geoObjects.length }}</div>',
                        clusterNumbers: [50]
                    }
                }
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
            initHandler: function (map) {
                console.log(map)
            }
        },
        mounted() {
            this.showMap = true
        }
    }
</script>
