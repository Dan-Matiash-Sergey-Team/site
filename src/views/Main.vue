<template>
    <div>

        <div v-if="showMap">
            <yandex-map  :coords="[55.84547, 37.45442]"
                        @map-was-initialized="initHandler" style="width: 1550px; height: 825px;"
                         map-type="map"
            >

<!--                <ymap-marker :coords="[Number(marker.data.infoDtp.COORD_W),Number(marker.data.infoDtp.COORD_L)]"-->
<!--                             :key="i" :marker-id="i" cluster-name="1"-->
<!--                             marker-type="placemark"-->

<!--                             v-for="(marker, i) in dtps"-->
<!--                >-->

<!--                </ymap-marker>-->
            </yandex-map>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { loadYmap } from 'vue-yandex-maps';
    export default {
        name: 'Main',
        components: {},
        data() {
            return {
                showMap: false,
                dtps: [],
                map: null,
                cluster: {
                    1: {
                        gridSize: 32,
                        clusterDisableClickZoom: true,
                        hasBalloon: true,
                        clusterLayout: '<div style="color: tomato; font-family: Foros; font-weight: 600;">{{ properties.geoObjects.length }}</div>',
                    }
                }
            }
        },
        computed: {
        },
        methods: {
            initHandler: function (map) {
                this.map = map
                // eslint-disable-next-line no-undef
                const cluster = new ymaps.Clusterer({
                    gridSize: 32,
                    clusterDisableClickZoom: true,
                    hasBalloon: true,
                    clusterLayout: '<div style="color: tomato; font-family: Foros; font-weight: 600;">{{ properties.geoObjects.length }}</div>',
                })
                let geoObjects = []
                for(let p of this.dtps){
                    // eslint-disable-next-line no-undef
                    geoObjects.push(new ymaps.Placemark([Number(p.data.infoDtp.COORD_W),Number(p.data.infoDtp.COORD_L)], ))
                }
                cluster.add(geoObjects);
                // eslint-disable-next-line no-undef
                const objectManager = new ymaps.ObjectManager({
                    // Включаем кластеризацию.
                    clusterize: true,
                    gridSize: 64,
                    // Опции кластеров задаются с префиксом 'cluster'.
                    clusterHasBalloon: false,
                    // Опции геообъектов задаются с префиксом 'geoObject'.
                    geoObjectOpenBalloonOnClick: false
                });
                let features = []
                for(let i=0;i<this.dtps.length;i++){
                    features[i] = {
                        type: 'Feature',
                        id: i,
                        geometry:{
                            type: 'Point',
                            coordinates: [Number(this.dtps[i].data.infoDtp.COORD_W),Number(this.dtps[i].data.infoDtp.COORD_L)]
                        }
                    }
                }
                objectManager.add(features)
                this.map.geoObjects.add(objectManager);
                // for(let p of this.dtps){
                //     // eslint-disable-next-line no-undef
                //     this.map.geoObjects.add(new ymaps.Placemark([Number(p.data.infoDtp.COORD_W),Number(p.data.infoDtp.COORD_L)], ))
                // }
                console.log(objectManager.clusters)
            }
        },
        async mounted() {
            if(localStorage.dtps){
                this.dtps = localStorage.dtps
            }
            else {
                this.dtps = this.$store.getters.dtps
            }
            if(this.dtps.length===0){
                await this.$router.push('/')
            }
            this.showMap = true


            const settings = {
                apiKey: '8984067c-7841-4a8a-aa3e-8d6920ceea02',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            }
            await loadYmap(settings)
            // eslint-disable-next-line no-undef
            console.log(ymaps)
        }
}
</script>
