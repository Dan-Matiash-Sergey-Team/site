<template>
    <!--eslint-disable -->
    <div>

        <div v-if="showMap">
            <yandex-map :coords="[55.7522, 37.6156]"
                        @map-was-initialized="initHandler" map-type="map"
                        style="width: 1400px; height: 625px;"
            >
            </yandex-map>
            <div>
                <div>
                    <label for="type">Тип</label>
                    <select id="type" v-model="DTP_V">
                        <option v-for="opt in options['DTP_V']">{{ opt }}</option>
                    </select>
                </div>
                <div>
                    <label for="crime">Тип нарушения ПДД</label>
                    <select id="crime" multiple v-model="NPDD">
                        <option v-for="opt in options['NPDD']">
                            {{opt}}
                        </option>
                    </select>
                </div>
                <div>
                    <label>Время суток</label>
                    <select id="osv" v-model="osv">
                        <option v-for="opt in options['osv']">{{ opt }}</option>
                    </select>
                </div>
                <div>
                    <label>Место поблизости</label>
                    <select id="OBJ_DTP" multiple v-model="OBJ_DTP">
                        <option v-for="opt in options['OBJ_DTP']">{{ opt }}</option>
                    </select>
                </div>
                <div>
                    <v-select
                            :filterable="false"
                            :options="filtered"
                            @input="selectOption"
                            @search="query=> streetQuery = query"
                    ></v-select>
                </div>
                <button @click="printd()">print</button>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    // @ is an alias to /src
    import {loadYmap} from 'vue-yandex-maps';
    import "vue-select/dist/vue-select.css";
    import Data from "../assets/ahegao"

    export default {
        name: 'Main',
        components: {},
        data() {
            return {
                showMap: false,
                dtps: [],
                map: null,
                objectManager: null,
                DTP_V: '', //тип дтп
                NPDD: [], // нарушение правил пдд
                osv: '', //время суток
                OBJ_DTP: [], //место поблизости
                street: '', //улица,
                streetQuery: '',
                date: [new Date('2019-01-01').getDate(), new Date().getDate()], //дата
                options: Data
            }
        },
        computed: {
            vis_dtps: function () {
                if (this.street == null) this.street = ""
                return this.search(this.fltr)
            },
            fltr: function () {
                let res = {};
                if (this.DTP_V != '' && this.DTP_V != 'Все') res['DTP_V'] = this.DTP_V;
                if (this.NPDD != '' && this.NPDD != 'Все') res['NPDD'] = this.NPDD;
                if (this.osv != '' && this.osv != 'Все') res['osv'] = this.osv;
                if (this.OBJ_DTP != '' && this.OBJ_DTP != 'Все') res['OBJ_DTP'] = this.OBJ_DTP;
                if (this.street != '') res['street'] = this.street;
                if (this.date != null) res['date'] = this.date;
                return res;
            },
            filtered() {
                if (this.streetQuery === null) {
                    return []
                }
                return this.options['street'].filter(option => option.toLowerCase().includes(this.streetQuery.toLowerCase())).slice(0, 10);
            },
        },
        methods: {
            printd: function () {
                console.log(this.street)
                console.log(this.dtps)
                console.log(this.vis_dtps)
            },
            selectOption: function (val) {
                this.street = val
                this.streetQuery = val
            },
            initHandler: function (map) {
                this.map = map

                // eslint-disable-next-line no-undef
                // const cluster = new ymaps.Clusterer({
                //     gridSize: 32,
                //     clusterDisableClickZoom: true,
                //     hasBalloon: true,
                //     clusterLayout: '<div style="color: tomato; font-family: Foros; font-weight: 600;">{{ properties.geoObjects.length }}</div>',
                // })
                let geoObjects = []
                for (let p of this.dtps) {
                    // eslint-disable-next-line no-undef
                    geoObjects.push(new ymaps.Placemark([Number(p.COORD_W), Number(p.COORD_L)],))
                }
                // cluster.add(geoObjects);
                // eslint-disable-next-line no-undef
                const objectManager = new ymaps.ObjectManager({
                    // Включаем кластеризацию.
                    clusterize: true,
                    gridSize: 64,
                    // Опции кластеров задаются с префиксом 'cluster'.
                    clusterHasBalloon: false,
                    // Опции геообъектов задаются с префиксом 'geoObject'.
                    geoObjectOpenBalloonOnClick: false,
                });
                let features = []
                for (let i = 0; i < this.dtps.length; i++) {
                    features[i] = {
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [Number(this.dtps[i].COORD_W), Number(this.dtps[i].COORD_L)]
                        }
                    }
                }
                objectManager.add(features)
                objectManager.clusters.events.add('add', function (e) {

                    var cluster = objectManager.clusters.getById(e.get('objectId')),

                        objects = cluster.properties.geoObjects;

                    if (objects.length < 10) {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#darkGreenClusterIcons'

                        });

                    } else if (objects.length < 20) {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#yellowClusterIcons'

                        });

                    } else if (objects.length < 30) {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#orangeClusterIcons'

                        });
                    } else {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#redClusterIcons'

                        });
                    }
                });
                this.objectManager = objectManager
                this.map.geoObjects.add(objectManager);

            },
            removeAllPlacemarks: async function () {
                await this.objectManager.removeAll()
            },
            addPlacemarks: async function (points) {
                let features = []
                for (let i = 0; i < points.length; i++) {
                    features[i] = {
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [Number(points[i].COORD_W), Number(points[i].COORD_L)]
                        }
                    }
                }
                this.objectManager.add(features)
            },

            search: function (fltr) {
                if (Object.keys(fltr).length == 0) return this.dtps;
                return this.dtps.filter((el) => {
                    let npdd = false
                    let obj = false
                    if (!fltr['NPDD']) {
                        npdd = true
                    } else {
                        fltr['NPDD'].forEach((ell) => {
                            if (el.NPDD.includes(ell)) {
                                npdd = true
                            }
                        })
                    }
                    if (!fltr['OBJ_DTP']) {
                        obj = true
                    } else {
                        fltr['OBJ_DTP'].forEach((ell) => {
                            if (el.OBJ_DTP.includes(ell)) {
                                obj = true
                            }
                        })
                    }

                    return fltr['date'][0] <= (new Date(el.date.split('.')[2] + '-' + el.date.split('.')[1] + '-' + el.date.split('.')[0]).getDate()) <= fltr['date'][1] &&
                        (fltr['DTP_V'] ? el.DTP_V === fltr['DTP_V'] : true) &&
                        (fltr['osv'] ? el.osv === fltr['osv'] : true) &&
                        (fltr['street'] ? el.street.toLowerCase().includes(fltr['street']?.toLowerCase()) : true) &&
                        obj &&
                        npdd
                })
                // let res = [];
                // let len = Object.keys(fltr).length;
                //
                // let rec = function (obj) {
                //     let ret = 0;
                //     for (let key in obj) {
                //         if (key == 'date') {
                //             let tmp = obj[key].split('.')
                //             if (fltr[key][0] <= (new Date(tmp[2] + '-' + tmp[1] + '-' + tmp[0]).getDate()) <= fltr[key][1]) ret++
                //             continue
                //         }
                //         switch (typeof obj[key]) {
                //             case "number":
                //                 if (Object.keys(fltr).includes(key)) {
                //                     if (obj[key] == fltr[key]) {
                //                         ret++;
                //                     }
                //                 }
                //                 break;
                //
                //             case "string":
                //                 if (Object.keys(fltr).includes(key)) {
                //                     if (obj[key] !== null && fltr[key] !== null) {
                //                         if (obj[key].toLowerCase().includes(fltr[key].toLowerCase())) {
                //                             ret++;
                //                         }
                //                     }
                //                 }
                //                 break;
                //
                //             case "object":
                //                 if (!Array.isArray(obj[key])) {
                //                     ret += rec(obj[key]);
                //                 } else {
                //
                //                 }
                //                 break;
                //         }
                //     }
                //     return ret;
                // };

                // for (let i in this.dtps) {
                //     if (rec(this.dtps[i]) == len) {
                //         res.push(this.dtps[i]);
                //     }
                // }
                //
                // return res;
            },
        },
        watch: {
            vis_dtps(val) {
                if (this.objectManager) {
                    this.removeAllPlacemarks()
                    this.addPlacemarks(val)
                }
            }
        }
        ,
        async mounted() {
            if (localStorage.dtps) {
                this.dtps = localStorage.dtps
            } else {
                this.dtps = this.$store.getters.dtps
            }
            if (this.dtps.length === 0) {
                await this.$router.push('/')
            }
            console.log(this.dtps[0])
            this.showMap = true


            const settings = {
                apiKey: '8984067c-7841-4a8a-aa3e-8d6920ceea02',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            }
            await loadYmap(settings)
        }
    }
</script>
