<!--eslint-disable -->
<template>
    <div>
        <section class="hero is-white">
            <nav class="level has-background-white mb-0" style="height: 5vh">
                <!--        <p class="level-item has-icons-left">-->
                <!--          <i aria-hidden="true" class="link is-info fa fa-home fa-lg"></i>-->
                <!--        </p>-->
                <div class="level-left">
                    <div class="level-item">
                        <select v-model="lang">
                            <option value="en">English</option>
                            <option value="ru">Русский</option>
                        </select>
                    </div>
                </div>
                <div class="level-item">
                    <strong style="color:black">{{lang==="ru"?"Карта ДТП по Москве":"Map of car accidents in
                        Moscow"}}</strong>
                </div>
                <!--        <p class="level-item has-icons-right">-->
                <!--          <router-link to="/infgr"><i aria-hidden="true" class="link is-info fa fa-bar-chart fa-lg"></i>-->
                <!--          </router-link>-->
                <!--        </p>-->
            </nav>
            <div style="position: relative">
                <div v-if="showMap">
                    <yandex-map :coords="map ? map.getCenter() : [55.7522, 37.6156]"
                                @map-was-initialized="initHandler" map-type="map"
                                style="width: 100%; height: 87vh;"
                                zoom="16"
                    >
                    </yandex-map>
                </div>

                <div style="position: absolute; top: 45px; right:0; margin-right: 0px">


                    <transition name="curtain-hide" v-if="showFilters">

                        <div style="display: flex;">

                            <div class="box" style="padding: 0px; height: 4vh;">
                                <a class="button has-background-white-bis" style="border-bottom-right-radius: 0px;
                border-top-right-radius: 0; height: 100%; border-width: 0px"
                                   v-on:click="showFilters=!showFilters">
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            </div>

                            <div class="has-background-white-bis box" style="border-top-left-radius: 0; padding: 1vh">
                                <div>
                                    <label class="label" for="type">{{lang==="ru"?"Тип ДТП":"Accident type"}}</label>
                                    <el-select clearable filterable id="type" size="small" style="width: 100%"
                                               v-model="DTP_V">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['DTP_V'][lang]"></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <label class="label">{{lang==="ru"?"Место поблизости":"Place nearby"}}</label>
                                    <el-select collapse-tags id="OBJ_DTP" multiple size="small" style="width: 100%"
                                               v-model="OBJ_DTP">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['OBJ_DTP'][lang]"></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <label class="label">{{lang==="ru"?"Погода":"Weather"}}</label>
                                    <el-select collapse-tags id="weather" multiple size="small" style="width: 100%"
                                               v-model="weather">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['weather'][lang]"></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <input id="alco" type="checkbox" v-model="alcohol"><label for="alco">{{lang==="ru"?"Алкоголь":"Alcohol"}}</label>
                                </div>
                                <div>
                                    <label class="label">{{lang==="ru"?"Тип нарушения ПДД":"Type of traffic
                                        violation"}}</label>
                                    <el-select :popper-append-to-body="false" collapse-tags filterable id="crime"
                                               multiple size="small" style="width: 100%"
                                               v-model="NPDD">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['NPDD'][lang]">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <label class="label">{{lang==="ru"?"Время суток":"Time of day"}}</label>
                                    <el-select clearable id="osv" size="small" style="width: 100%" v-model="osv">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['osv'][lang]"></el-option>
                                    </el-select>
                                </div>
                                <div class="container">
                                    <label class="label">{{lang==="ru"?"Улица":"Street"}}</label>
                                    <el-select clearable filterable size="small" style="width: 100%"
                                               v-model="street">
                                        <el-option :key="opt" :label="opt" :value="lang==='ru'?opt:translations[opt]"
                                                   v-for="opt in options['street'][lang]"></el-option>
                                    </el-select>
                                </div>
                                <div class="container">
                                    <label class="label">{{lang==="ru"?"Район":"District"}}</label>
                                    <div>
                                        <el-select clearable filterable id="district" size="small"
                                                   style="width: 80%" v-model="district">
                                            <el-option :key="opt" :label="opt"
                                                       :value="lang==='ru'?opt:translations[opt]"
                                                       v-for="opt in options['district'][lang]">
                                            </el-option>
                                        </el-select>
                                        <a @click="showPopup = district != ''" style="margin-left: 10px">
                                            <i aria-hidden="true" class="link is-info fa fa-bar-chart fa-lg"></i>
                                        </a>
                                    </div>
                                    <div v-if="district != ''">
                                        <infgr :districtPopup="district" :showPopup="showPopup"
                                               @closePopup="showPopup = false">
                                        </infgr>
                                    </div>
                                </div>
                                <div class="container">
                                    <label class="label">{{lang==="ru"?"Дата":"Date"}}</label>
                                    <DatePicker v-model="date"
                                    ></DatePicker>
                                </div>
                                <div class="buttons">
                                    <button :disabled="heatmapMode || clusterMode"
                                            @click="heatmapMode?()=>{}:districtMode = !districtMode"
                                            class="button"
                                            style="margin-top: 20px">{{lang==="ru"?"Статистика по районам":"District mode"}}
                                    </button>
                                    <button :disabled="districtMode || hmap==null || clusterMode"
                                            @click="districtMode?()=>{}:turnHmapOn()"
                                            class="button"
                                            style="margin-top: 20px">{{lang==="ru"?"Тепловая карта":"Heatmap"}}
                                    </button>

                                </div>
                                <div class="buttons">
                                    <button :disabled="heatmapMode || districtMode"
                                            @click="clusterMode?()=>{}:clusterMode = !clusterMode"
                                            class="button"
                                            style="margin-top: 20px">{{lang==="ru"?"Карта кластеризации":"Clusterization mode"}}
                                    </button>
                                    <div v-if="clusterMode">
                                        <el-select v-model="currentCluster" clearable filterable size="small" style="width: 80%" id="cluster">
                                            <el-option :value="k" v-for="k in Object.keys(clusters)" :label="k" :key="k"></el-option>
                                        </el-select>
                                        <br>
                                    </div>
                                </div>

                                <div v-if="districtMode">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="showPieCharts">
                                        {{lang==="ru"?"Показать круговые диаграммы":"Show piecharts"}}
                                    </label>
                                    <br>
                                </div>
                                <div class="buttons" style="text-align: right" v-if="heatmapMode">
                                    <button :class="{'button': true, 'is-active': heatmapType==1}"
                                            @click="heatmapType=1">{{lang==="ru"?"Школы":"Schools"}}
                                    </button>
                                    <button :class="{'button': true, 'is-active': heatmapType==2}"
                                            @click="heatmapType=2">{{lang==="ru"?"Смерти":"Lethal"}}
                                    </button>
                                    <button :class="{'button': true, 'is-active': heatmapType==3}"
                                            @click="heatmapType=3">{{lang==="ru"?"Все":"All"}}
                                    </button>
                                </div>
                            </div>

                        </div>

                    </transition>

                    <transition name="curtain-open" v-else>
                        <a class="button has-background-white-bis" style="border-bottom-right-radius: 0; border-right-width: 0px;
                border-top-right-radius: 0; height: 4vh;"
                           v-on:click="showFilters=!showFilters">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                    </transition>

                </div>

            </div>
            <div class="level" style="height: 8vh">
                <div class="level-item">
                    <img src="../assets/images/placemark_regular.png" style="max-height: 40px">
                    - {{lang==="ru"?"ДТП":"Car accident"}}
                </div>
                <div class="level-item">
                    <img src="../assets/images/placemark_orange.png" style="max-height: 40px">
                    - {{lang==="ru"?"ДТП около образовательных учреждений":"Car accident near an educating facility"}}
                </div>
                <div class="level-item">
                    <img src="../assets/images/placemark_red.png" style="max-height: 40px">
                    - {{lang==="ru"?"смертельные ДТП":"Lethal car accident"}}
                </div>
                <div class="level-item">
                    <img src="../assets/images/cluster_green.png" style="max-height: 40px">
                    - {{lang==="ru"?"небольшое кол-во ДТП":"Small number of accidents"}}
                </div>
                <div class="level-item">
                    <img src="../assets/images/cluster_red.png" style="max-height: 40px">
                    - {{lang==="ru"?"большое кол-во ДТП":"Big number of accidents"}}
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    /* eslint-disable */
    // @ is an alias to /src
    import {loadYmap} from 'vue-yandex-maps';
    import "vue-select/dist/vue-select.css";
    import Data from "../assets/ahegao"
    import districtCoords from "../assets/districtCoords"
    import translations from "../assets/translations"
    import DatePicker from "../components/DatePicker";
    import infgr from "@/views/infgr";
    import clusters from "../assets/clusters"

    export default {
        name: 'Main',
        components: {DatePicker, infgr},
        data() {
            return {
                showFilters: true,
                showMap: false,
                dtps: [],
                map: null,
                objectManager: null,
                DTP_V: '', //тип дтп
                NPDD: [], // нарушение правил пдд
                osv: '', //время суток
                OBJ_DTP: [], //место поблизости
                street: '', //улица,
                alcohol: '',
                weather: [],
                district: '',
                clusters: clusters,
                currentCluster: 0,
                streetQuery: '',
                date: [new Date('2021-04-01'), new Date('2021-04-30'),], //дата
                options: Data,
                helpvar: false,
                showingPolygon: null,
                multiplePolygons: [],
                pieCharts: [],
                districtMode: false,
                showPopup: false,
                heatmapMode: false,
                clusterMode: false,
                hmap: null,
                heatmapType: 0,
                allowHmap: false,
                showPieCharts: true,
                translations: translations,
            }
        },
        computed: {
            lang: {
                get() {
                    return this.$store.getters.getLocale;
                },
                set(newValue) {
                    console.log(newValue)
                    this.$store.commit("updateLocale", newValue);
                }
            },
            vis_dtps: function () {
                let l
                if (this.street == null) this.street = ""
                if (this.lang === "ru") l = "ru"
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
                if (this.weather != '' && this.weather != 'Все') res['weather'] = this.weather;
                if (this.alcohol != '') res['alcohol'] = this.alcohol;
                if (this.date != null) res['date'] = this.date;
                return res;
            },
        },
        methods: {
            test: async function () {
                this.street = this.options['street'][this.options['street'].indexOf(this.street) + 1]
            },
            translate: async function (word) {
                if (word in translations) {
                    return translations[word]
                } else {
                    let trans = await (await fetch(`http://194.87.99.72:3000/translate?word=${word}`)).json()
                    translations[word] = trans['translation']
                    return trans['translation']
                }
            },
            calc: function () {
                let poss = []
                for (let dtp of this.dtps) {
                    for (let w of dtp.weather)
                        if (!poss.includes(w)) {
                            poss.push(w)
                        }
                }
                console.log(poss)
            },
            turnHmapOn: function () {
                if (this.heatmapMode) {
                    this.heatmapType = 0
                } else {
                    this.heatmapType = 3
                }
                this.heatmapMode = !this.heatmapMode
            },
            showClusterMode: async function () {
                await this.removeAllPlacemarks()

                function getRandomColor() {
                    var letters = '0123456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                }
                console.log(Object.keys(clusters))
                let features = []
                let color = getRandomColor()
                for (let i = 0; i < clusters[this.currentCluster].length; i++) {
                    console.log(clusters[this.currentCluster])
                    features[i] = {
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [Number(this.dtps[clusters[this.currentCluster][i]].COORD_W), Number(this.dtps[clusters[this.currentCluster][i]].COORD_L)]
                        },
                        options: {
                            iconColor: color
                        },
                        properties: {}
                    }
                }
                this.objectManager.add(features)
            },
            findInfoDistrict: function () {
                let dat = {}
                let a = 0
                for (let i = 0; i < this.vis_dtps.length; i++) {
                    if (dat[this.vis_dtps[i]['district']]) {
                        dat[this.vis_dtps[i]['district']]['count']++
                        dat[this.vis_dtps[i]['district']]['deaths'] += this.vis_dtps[i].death
                    } else {
                        dat[this.vis_dtps[i]['district']] = {}
                        dat[this.vis_dtps[i]['district']]['count'] = 1
                        dat[this.vis_dtps[i]['district']]['deaths'] = this.vis_dtps[i].death
                        a += 1
                    }
                }
                return [dat, this.vis_dtps.length / a]
            },
            showDistrictMode: async function () {
                this.hideDistrictMode()
                this.district = ""
                if (this.showingPolygon) {
                    this.map.geoObjects.remove(this.showingPolygon)
                }
                let [nums, mean] = this.findInfoDistrict()
                this.removeAllPlacemarks()
                for (let d of this.options['district']) {
                    if (!(d in nums)) {
                        continue
                    }
                    let a = nums[d]['count']
                    let c = ""
                    if (a < 0.5 * mean) {
                        c = '#6BDB42'
                    } else if (0.5 * mean < a && a < 0.8 * mean) {
                        c = "#F5EA1E"
                    } else if (0.8 * mean < a && a < 1.2 * mean) {
                        c = "#F2C13D"
                    } else if (1.2 * mean < a && a < 1.5 * mean) {
                        c = "#F5A22B"
                    } else {
                        c = "#EB5443"
                    }
                    let myPolygon = new ymaps.Polygon(districtCoords.district_coords[d], {hintContent: `район ${d}: ${nums[d]['count']} дтп, смертей - ${nums[d]['deaths']}`},
                        {
                            fillColor: c,
                            hasBalloon: true,
                            hasHint: true,
                        })
                    myPolygon.events.add("mouseenter", function (e) {
                        myPolygon.options.set({
                            fillColor: "#000000",
                            hasBalloon: true,
                            hasHint: true,
                        })
                    })
                    myPolygon.events.add("mouseleave", function (e) {
                        myPolygon.options.set({
                            fillColor: c,
                            hasBalloon: true,
                            hasHint: true,
                        })
                    })
                    this.multiplePolygons.push(myPolygon)
                    this.map.geoObjects.add(myPolygon)
                    var geoObject = new ymaps.Placemark(Data['disctrict_centres'][d], {
                        // Data for generating a diagram.
                        data: [
                            {weight: nums[d]['deaths'], color: '#F50F04'},
                            {weight: nums[d]['count'], color: '#4D9F0E'},
                        ]
                    }, {
                        iconLayout: 'default#pieChart',
                        // You can also use the "icon" prefix to redefine layout options.
                        iconPieChartCoreRadius: 10,
                        iconContent: nums[d]['count'],
                        pieChartCaptionMaxWidth: 5,
                        pieChartRadius: function (sum) {
                            return 5 + Math.log(sum)
                        }
                    });
                    this.pieCharts.push(geoObject)
                    if (this.showPieCharts) {
                        this.map.geoObjects.add(geoObject)
                    }
                }
            },
            hideDistrictMode: function () {
                for (let p of this.multiplePolygons) {
                    this.map.geoObjects.remove(p)
                }
                for (let p of this.pieCharts) {
                    this.map.geoObjects.remove(p)
                }
                this.multiplePolygons = []
                this.pieCharts = []
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
                async function refreshObjectManager(self) {
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
                    self.objectManager = objectManager
                    self.map.geoObjects.add(self.objectManager)
                }

                this.map.geoObjects.remove(this.objectManager)
                refreshObjectManager(this)
            },
            addPlacemarks: async function (points) {
                let features = []
                for (let i = 0; i < points.length; i++) {
                    let flag = false
                    let death = false
                    for (let a of ["Иная образовательная организация", "Иное образовательное учреждение", "Школа либо иная детская (в т.ч. дошкольная) организация", "Школа либо иное детское (в т.ч. дошкольное) учреждение"]) {
                        if (points[i].OBJ_DTP.includes(a)) {
                            flag = true
                        }
                        if (points[i].death > 0) {
                            death = true
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
                            iconColor: death ? "red" : (flag ? "orange" : "blue")
                        },
                        properties: {
                            clusterCaption: "ДТП №" + points[i].id,
                            balloonContent: `<h1 style="color: #4F51E1"><strong>${this.lang === "ru" ? points[i].DTP_V : translations[points[i].DTP_V]}</strong></h1>` +
                                (this.lang === "ru" ? `<p><strong>Дата:</strong> ${points[i].date}</p>  <p><strong>Адрес:</strong> ${points[i].address}</p> <p><strong>Основная причина:</strong> ${points[i].NPDD[0]}</p><p><strong>Освещение:</strong> ${points[i].osv}</p>` : `<p><strong>Date:</strong> ${points[i].date}</p>  <p><strong>Address:</strong> ${await this.translate(points[i].address)}</p> <p><strong>Main reason:</strong> ${translations[points[i].NPDD[0]]}</p><p><strong>Time of day:</strong> ${translations[points[i].osv]}</p>`) +
                                (this.lang === "ru" ? `<button class="button is-small"><a href="#/dtp_info/${points[i].id}" target="_blank">Подробнее</a></button>` : `<button class="button is-small"><a href="#/dtp_info/${points[i].id}" target="_blank">Details</a></button>`)
                            // `<button class="button is-small"><a href="#/delete/${points[i].id}" class target="_blank">Удалить</a></button>`
                        }
                    }
                }
                this.objectManager.add(features)
            },
            search: function (fltr) {
                if (this.helpvar) {
                    console.log("")
                }
                console.log(this.helpvar)

                function isSubArray(main, sub) {
                    return sub.every((eachEle) => {
                        return main.includes(eachEle);
                    });
                }

                if (Object.keys(fltr).length == 0) return this.dtps;
                // if(this.lang === "en"){
                //     if(fltr['NPDD']) {
                //         for (let i=0;i< fltr['NPDD'].length;i++)
                //             fltr['NPDD'][i] = this.translations[fltr['NPDD'][i]]
                //     }
                //     if(fltr['weather']) {
                //         for (let i=0;i< fltr['weather'].length;i++) {
                //             fltr['weather'][i] = this.translations[fltr['weather'][i]]
                //         }
                //     }
                //     if(fltr['OBJ_DTP']){
                //         for (let i=0;i< fltr['OBJ_DTP'].length;i++)
                //             fltr['OBJ_DTP'][i] = this.translations[fltr['OBJ_DTP'][i]]
                //     }
                //     if(fltr['osv']){
                //             fltr['osv'] = this.translations[fltr['osv']]
                //     }
                //     if(fltr['district']) {
                //         fltr['district'] = this.translations[fltr['district']]
                //     }
                // }
                console.log(fltr)
                return this.dtps.filter((el) => {
                    let npdd = false
                    let obj = false
                    let weath = false
                    if (!fltr['NPDD']) {
                        npdd = true
                    } else {
                        npdd = isSubArray(el['NPDD'], fltr['NPDD'])
                    }
                    if (!fltr['weather']) {
                        weath = true
                    } else {
                        weath = isSubArray(el['weather'], fltr['weather'])
                    }
                    if (!fltr['OBJ_DTP']) {
                        obj = true
                    } else {
                        obj = isSubArray(el['OBJ_DTP'], fltr['OBJ_DTP'])
                    }

                    return new Date(fltr['date'][0]) <= (new Date(el.date.split('.')[2] + '-' + el.date.split('.')[1] + '-' + el.date.split('.')[0])) && (new Date(el.date.split('.')[2] + '-' + el.date.split('.')[1] + '-' + el.date.split('.')[0])) <= new Date(fltr['date'][1]) &&
                        (fltr['DTP_V'] ? el.DTP_V === fltr['DTP_V'] : true) &&
                        (fltr['osv'] ? el.osv === fltr['osv'] : true) &&
                        (fltr['alcohol'] ? el.alcohol === fltr['alcohol'] : true) &&
                        (fltr['street'] ? el.street.toLowerCase().includes(fltr['street']?.toLowerCase()) : true) &&
                        (fltr['district'] ? el.district.toLowerCase().includes(fltr['district']?.toLowerCase()) : true) &&
                        obj &&
                        weath &&
                        npdd
                })
            },
            loadingAsync: async function (year, context) {
                return [await (await fetch(`http://194.87.99.72:3000/get_dtps_year?year=${year}`)).json(), context]
            },
            showHeatmapmode: async function () {
                this.removeAllPlacemarks()
                let features = []
                for (let i = 0; i < this.vis_dtps.length; i++) {
                    if (this.heatmapType == 1) {
                        let flag = false
                        for (let a of ["Иная образовательная организация", "Иное образовательное учреждение", "Школа либо иная детская (в т.ч. дошкольная) организация", "Школа либо иное детское (в т.ч. дошкольное) учреждение"]) {
                            if (this.vis_dtps[i].OBJ_DTP.includes(a)) {
                                flag = true
                            }
                        }
                        if (flag) {
                            features.push({
                                type: 'Feature',
                                id: i,
                                geometry: {
                                    type: 'Point',
                                    coordinates: [Number(this.vis_dtps[i].COORD_W), Number(this.vis_dtps[i].COORD_L)]
                                },
                            })
                        }
                    } else if (this.heatmapType == 2) {
                        if (this.vis_dtps[i].death > 0) {
                            features.push({
                                type: 'Feature',
                                id: i,
                                geometry: {
                                    type: 'Point',
                                    coordinates: [Number(this.vis_dtps[i].COORD_W), Number(this.vis_dtps[i].COORD_L)]
                                },
                            })
                        }
                    } else {
                        features.push({
                            type: 'Feature',
                            id: i,
                            geometry: {
                                type: 'Point',
                                coordinates: [Number(this.vis_dtps[i].COORD_W), Number(this.vis_dtps[i].COORD_L)]
                            },
                        })
                    }
                }
                var data = {
                    type: 'FeatureCollection',
                    features: features
                }
                this.hmap.setData(data)
                this.hmap.setMap(this.map);
            },
            hideHeatmapMode: async function () {
                this.hmap.setData([])
                this.hmap.setMap(this.map);
            }
        },
        watch: {
            showPieCharts(val) {
                if (val) {
                    for (let p of this.pieCharts) {
                        this.map.geoObjects.add(p)
                    }
                } else {
                    for (let p of this.pieCharts) {
                        this.map.geoObjects.remove(p)
                    }
                }
            },
            pieCharts(val) {
                if (this.showPieCharts) {
                    for (let p of val) {
                        this.map.geoObjects.add(p)
                    }
                }
            },
            vis_dtps(val) {
                if (this.objectManager) {
                    if (this.districtMode && this.heatmapMode) {
                        console.log("Mega error")
                        this.districtMode = false
                        this.heatmapMode = false
                        this.helpvar = !this.helpvar
                    } else {
                        if (this.heatmapMode) {
                            console.log("aaaaaa")
                            this.showHeatmapmode()
                        } else if (this.districtMode) {
                            console.log("bbbbbb")
                            this.showDistrictMode()
                        } else if (this.clusterMode) {
                            this.showClusterMode()
                        } else {
                            this.removeAllPlacemarks()
                            this.addPlacemarks(val)
                        }
                    }
                }
            }
            ,
            district(val) {
                if (!this.districtMode) {
                    let myPolygon = new ymaps.Polygon(districtCoords.district_coords[val])
                    if (this.showingPolygon) {
                        this.map.geoObjects.remove(this.showingPolygon)
                    }
                    this.showingPolygon = myPolygon
                    this.map.geoObjects.add(myPolygon)
                }
            }
            ,
            districtMode(val) {
                if (!this.heatmapMode && !this.clusterMode) {
                    if (val) {
                        this.showDistrictMode()
                    } else {
                        this.hideDistrictMode()
                        this.helpvar = !this.helpvar
                    }
                }
            }
            ,
            clusterMode(val) {
                if (!this.heatmapMode && !this.districtMode) {
                    if (val) {
                        this.showClusterMode()
                    } else {
                        this.hideClusterMode()
                        this.helpvar = !this.helpvar
                    }
                }
            }
            ,
            heatmapType(val) {
                if (!this.districtMode && !this.clusterMode) {
                    if (val > 0) {
                        this.showHeatmapmode()
                    } else {
                        this.hideHeatmapMode()
                        this.helpvar = !this.helpvar
                    }
                }
            },
            currentCluster(val) {
                if (!this.districtMode && !this.heatmapMode) {
                    if (val > -1) {
                        this.showClusterMode()
                    } else {
                        this.hideClusterMode()
                        this.helpvar = !this.helpvar
                    }
                }
            }
            ,
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
                apiKey: '4877efab-fec0-4e66-956d-33db0d22ab10',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            }
            await loadYmap(settings)
            let heatmapScript = document.createElement('script')
            heatmapScript.setAttribute('src', 'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js')
            document.head.appendChild(heatmapScript)
            console.log("start")
            this.options.street.en = [...new Set(this.options['street']['en'])]
            setTimeout(() => {
                ymaps.modules.require(['Heatmap']).spread((Heatmap) => {
                    console.log("end")
                    this.hmap = new Heatmap([], {dissipating: true, intensityOfMidpoint: 0.2,});
                }, function (error) {
                    console.log(error)
                });
            }, 700)
        }
    }
</script>
<style>
    .curtain-hide-enter-active { /* shtorka open */
        transition: transform .5s ease-out;
    }

    .curtain-hide-leave-active { /* button hide */
        transition: opacity 0s;
    }

    .curtain-hide-enter { /* shtorka-start */
        transform: translateX(89.5%);
    }

    .curtain-hide-leave-to { /* button-end */
        opacity: 0;
    }

    .curtain-open-enter-active { /* button open */
        transition: opacity .5s cubic-bezier(1, -1, 1, -1);
    }

    .curtain-open-leave-active { /* sthorka hide */
        transition: transform .5s ease-in;
    }

    .curtain-open-leave-to { /* shtorka-end */
        transform: translateX(89.5%);
    }

    .curtain-open-enter { /* button-start */
        opacity: 0;
    }
</style>
<style scoped>
    .el-select-dropdown__item {
        width: 350px;
        white-space: normal;
        overflow: unset;
        height: auto;
        /*line-height: normal;*/
        padding-top: 10;
        padding-bottom: 10;
    }


</style>
<style>
    body {
        overflow-y: hidden;
    }

</style>
