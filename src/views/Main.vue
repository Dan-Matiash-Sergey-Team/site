<template>
    <!--eslint-disable -->
    <div>
        <section class="hero is-white">
            <nav class="level has-background-white mb-0" style="height: 50px">
                <p class="level-item has-icons-left">
                    <i aria-hidden="true" class="link is-info fa fa-home fa-lg"></i>
                </p>
                <p class="level-item">
                    <strong style="color:black">Карта ДТП по Москве</strong>
                </p>
                <p class="level-item has-icons-right">
                    <router-link to="/infgr"><i aria-hidden="true" class="link is-info fa fa-bar-chart fa-lg"></i></router-link>
                </p>
            </nav>
            <div class="columns is-gapless">
                <div class="column is-four-fifths has-background-white" v-if="showMap">
                    <yandex-map :coords="map ? map.getCenter() : [55.7522, 37.6156]"
                                @ballonopen="openedBalloon"
                                @map-was-initialized="initHandler" map-type="map"
                                style="width: 100%; height: 700px;"
                                zoom="16"
                    >
                    </yandex-map>

                </div>
                <div class="column has-background-white-ter is-one-fifth">
                    <div class="container">
                        <div>
                            <label class="label" for="type">Тип ДТП</label>
                            <el-select id="type" v-model="DTP_V" clearable>
                                <el-option v-for="opt in options['DTP_V']" :key="opt" :label="opt" :value="opt"></el-option>
                            </el-select>
                        </div>
                        <div>
                            <label class="label" for="crime">Тип нарушения ПДД</label>
                            <el-select id="crime" multiple filterable v-model="NPDD" :popper-append-to-body="false" collapse-tags>
                                <el-option v-for="opt in options['NPDD']" :key="opt" :label="opt" :value="opt">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <label class="label">Время суток</label>
                            <el-select id="osv" v-model="osv" clearable>
                                <el-option v-for="opt in options['osv']" :key="opt" :label="opt" :value="opt"></el-option>
                            </el-select>
                        </div>
                        <div>
                            <label class="label">Место поблизости</label>
                            <el-select id="OBJ_DTP" multiple v-model="OBJ_DTP" collapse-tags>
                                <el-option v-for="opt in options['OBJ_DTP']" :key="opt" :label="opt" :value="opt"></el-option>
                            </el-select>
                        </div>
                        <div class="container">
                            <label class="label">Улица</label>
                            <v-select
                                    :filterable="false"
                                    :options="filtered"
                                    @input="selectOption"
                                    @search="query=> streetQuery = query"
                            ></v-select>
                        </div>
                        <div class="container">
                            <label class="label">Район</label>
                            <div>
                                <el-select id="district" v-model="district" clearable>
                                    <el-option v-for="opt in options['district']" :key="opt" :label="opt" :value="opt">
                                    </el-option>
                                </el-select>
                            </div>

                        </div>
                        <div class="container">
                          <label class="label">Дата</label>
                            <DatePicker v-model="date"
                            ></DatePicker>
                        </div>
                        <!--              <button @click="printd()">print</button>-->
                    </div>
                </div>
            </div>
            <nav class="level-item has-background-danger">

            </nav>
        </section>
    </div>
</template>

<script>
    /* eslint-disable */
    // @ is an alias to /src
    import {loadYmap} from 'vue-yandex-maps';
    import "vue-select/dist/vue-select.css";
    import Data from "../assets/ahegao"
    import DatePicker from "../components/DatePicker";
    import infgr from "@/views/infgr";
    import App from "@/App";

    export default {
        name: 'Main',
        components: {DatePicker},
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
                district: '',
                streetQuery: '',
                date: [new Date('2021-04-01'), new Date('2021-04-30'),], //дата
                options: Data,
                helpvar: false,
                showingPolygon: null,
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
                if (this.street != '' && this.street != 'Все') res['street'] = this.street;
                if (this.district != '' && this.district != 'Все') res['district'] = this.district;
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
            openedBalloon: function (event) {
                console.log("aaaaaaa")
                console.log(event)
            },
            test: function () {
                console.log(this.OBJ_DTP)
                for (let a of this.options.district_coords) {
                    console.log(a)
                    let myPolygon = new ymaps.Polygon(a)
                    this.map.geoObjects.add(myPolygon)
                }
            },
            selectOption: function (val) {
                this.street = val
                this.streetQuery = val
            },
            initHandler: async function (map) {
                this.map = map
                const objectManager = new ymaps.ObjectManager({
                    // Включаем кластеризацию.
                    clusterize: true,
                    gridSize: 64,
                    clusterDisableClickZoom: true,
                    clusterHasBalloon: true,
                    geoObjectsHasBalloon: true,
                    geoObjectsDisableClickZoom: true,
                    placemarksDisableClickZoom: true,
                    geoObjectOpenBalloonOnClick: true,
                    placemarkOpenBalloonOnClick: true

                });
                objectManager.clusters.events.add('add', function (e) {

                    var cluster = objectManager.clusters.getById(e.get('objectId')),

                        objects = cluster.properties.geoObjects;

                    if (objects.length < 5) {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#darkGreenClusterIcons'

                        });

                    } else if (objects.length < 10) {

                        objectManager.clusters.setClusterOptions(cluster.id, {

                            preset: 'islands#yellowClusterIcons'

                        });

                    } else if (objects.length < 25) {

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
                this.helpvar = true


            },
            removeAllPlacemarks: async function () {
                await this.objectManager.removeAll()
            },
            addPlacemarks: async function (points) {

                let features = []
                for (let i = 0; i < points.length; i++) {
                    let flag = false
                    for(let a of ["Иная образовательная организация", "Иное образовательное учреждение","Школа либо иная детская (в т.ч. дошкольная) организация", "Школа либо иное детское (в т.ч. дошкольное) учреждение"]){
                        if(points[i].OBJ_DTP.includes(a)){
                            flag = true
                        }
                    }
                    features[i] = {
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [Number(points[i].COORD_W), Number(points[i].COORD_L)]
                        },
                        options: {
                            iconColor : flag?"orange":"blue"
                        },
                        properties: {
                            clusterCaption: "ДТП №" + points[i].id,
                            balloonContent: `<h3>${points[i].DTP_V}</h3>`+
                                `<p>Дата: ${points[i].date}</p>  <p>Адрес: ${points[i].address}</p> <p>Основная причина: ${points[i].NPDD[0]}</p><p>Освещение: ${points[i].osv}</p>` +
                                `<button ><a href="#/dtp_info/${points[i].id}" class target="_blank">Подробнее</a></button>`
                        }

                    }
                }
                this.objectManager.add(features)
            },
            search: function (fltr) {
                if(this.helpvar){
                    console.log("a")
                }
                function isSubArray(main, sub) {
                    return sub.every((eachEle) => {
                        return main.includes(eachEle);
                    });
                }

                if (Object.keys(fltr).length == 0) return this.dtps;
                return this.dtps.filter((el) => {
                    let npdd = false
                    let obj = false
                    if (!fltr['NPDD']) {
                        npdd = true
                    } else {
                        npdd = isSubArray(el['NPDD'], fltr['NPDD'])
                    }
                    if (!fltr['OBJ_DTP']) {
                        obj = true
                    } else {
                        obj = isSubArray(el['OBJ_DTP'], fltr['OBJ_DTP'])
                    }

                    return new Date(fltr['date'][0]) <= (new Date(el.date.split('.')[2] + '-' + el.date.split('.')[1] + '-' + el.date.split('.')[0])) && (new Date(el.date.split('.')[2] + '-' + el.date.split('.')[1] + '-' + el.date.split('.')[0])) <= new Date(fltr['date'][1]) &&
                        (fltr['DTP_V'] ? el.DTP_V === fltr['DTP_V'] : true) &&
                        (fltr['osv'] ? el.osv === fltr['osv'] : true) &&
                        (fltr['street'] ? el.street.toLowerCase().includes(fltr['street']?.toLowerCase()) : true) &&
                        (fltr['district'] ? el.district.toLowerCase().includes(fltr['district']?.toLowerCase()) : true) &&
                        obj &&
                        npdd
                })
            },
            loadingAsync: async function(year, context) {
              return [await (await fetch(`http://195.133.147.101:3000/get_dtps_year?year=${year}`)).json(), context]
            }
        },
        watch: {
            vis_dtps(val) {
                if (this.objectManager) {
                    this.removeAllPlacemarks()
                    this.addPlacemarks(val)
                }
            },
            district(val) {
                let myPolygon = new ymaps.Polygon(this.options.district_coords[val])
                if (this.showingPolygon) {
                    this.map.geoObjects.remove(this.showingPolygon)
                }
                this.showingPolygon = myPolygon
                this.map.geoObjects.add(myPolygon)
            }
        }
        ,
        async mounted() {
            if (localStorage.dtps) {
                this.dtps = localStorage.dtps
            } else {
                this.dtps = this.$store.getters.dtps
            }
            // if (this.dtps.length === 0) {
            //     await this.$router.push('/')
            // }
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

