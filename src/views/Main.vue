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
          <router-link to="/infgr"><i aria-hidden="true" class="link is-info fa fa-bar-chart fa-lg"></i>
          </router-link>
        </p>
      </nav>
      <div style="position: relative">
        <div v-if="showMap">
          <yandex-map :coords="map ? map.getCenter() : [55.7522, 37.6156]"
                      @map-was-initialized="initHandler" map-type="map"
                      style="width: 100%; height: 700px;"
                      zoom="16"
          >
          </yandex-map>
        </div>
        <transition name="curtain">
          <div class="has-background-white-ter"
               style="position: absolute; top:0; right:0;margin-top: 45px; margin-right: 0px" v-if="show">
            <button style="width: 20vh" v-on:click="show=!show" class="button">
              Свернуть фильтры
            </button>
            <div class="container">
              <div>
                <label class="label" for="type">Тип ДТП</label>
                <el-select clearable filterable id="type" size="small" style="width: 100%"
                           v-model="DTP_V">
                  <el-option :key="opt" :label="opt" :value="opt"
                             v-for="opt in options['DTP_V']"></el-option>
                </el-select>
              </div>
              <div>
                <label class="label" for="crime">Тип нарушения ПДД</label>
                <el-select :popper-append-to-body="false" collapse-tags filterable id="crime"
                           multiple size="small" style="width: 100%"
                           v-model="NPDD">
                  <el-option :key="opt" :label="opt" :value="opt"
                             v-for="opt in options['NPDD']">
                  </el-option>
                </el-select>
              </div>
              <div>
                <label class="label">Время суток</label>
                <el-select clearable id="osv" size="small" style="width: 100%" v-model="osv">
                  <el-option :key="opt" :label="opt" :value="opt"
                             v-for="opt in options['osv']"></el-option>
                </el-select>
              </div>
              <div>
                <label class="label">Место поблизости</label>
                <el-select collapse-tags id="OBJ_DTP" multiple size="small" style="width: 100%"
                           v-model="OBJ_DTP">
                  <el-option :key="opt" :label="opt" :value="opt"
                             v-for="opt in options['OBJ_DTP']"></el-option>
                </el-select>
              </div>
              <div class="container">
                <label class="label">Улица</label>
                <el-select clearable filterable size="small" style="width: 100%"
                           v-model="street">
                  <el-option :key="opt" :label="opt" :value="opt"
                             v-for="opt in options['street']"></el-option>
                </el-select>
              </div>
              <div class="container">
                <label class="label">Район</label>
                <div>
                  <el-select clearable filterable id="district" size="small"
                             style="width: 80%" v-model="district">
                    <el-option :key="opt" :label="opt" :value="opt"
                               v-for="opt in options['district']">
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
                <label class="label">Дата</label>
                <DatePicker v-model="date"
                ></DatePicker>
              </div>
              <div class="buttons">
                <button :disabled="heatmapMode" @click="heatmapMode?()=>{}:districtMode = !districtMode"
                        class="button"
                        style="margin-top: 20px">Статистика по
                  районам
                </button>
                <button :disabled="districtMode" @click="districtMode?()=>{}:heatmapMode = !heatmapMode"
                        class="button"
                        style="margin-top: 20px">Тепловая
                  карта
                </button>
              </div>
            </div>

          </div>
        </transition>
<!--        <transform class="sus">-->

<!--        </transform>-->
        <div style="position: absolute; top:0; right:0;margin-top: 45px; margin-right: 0px;" v-if="!show">
          <button style="width: 20vh" v-on:click="show=!show" class="button">
            Развернуть фильтры
          </button>
        </div>
      </div>
      <footer class="footer" style="margin-top: -40px">
        <div class="has-text-centered">
          <img src="../assets/images/placemark_regular.png" style="max-height: 40px">
          - ДТП
          <img src="../assets/images/placemark_orange.png" style="max-height: 40px">
          - ДТП около образовательных учереждений
          <img src="../assets/images/placemark_red.png" style="max-height: 40px">
          - смертельные ДТП
          <img src="../assets/images/cluster_green.png" style="max-height: 40px">
          - небольшое кол-во ДТП
          <img src="../assets/images/cluster_red.png" style="max-height: 40px">
          -большое кол-во ДТП
        </div>
      </footer>
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

export default {
  name: 'Main',
  components: {DatePicker, infgr},
  data() {
    return {
      show: true,
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
      multiplePolygons: [],
      pieCharts: [],
      districtMode: false,
      showPopup: false,
      heatmapMode: false,
      hmap: null
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
  },
  methods: {
    test: async function () {

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
        let myPolygon = new ymaps.Polygon(this.options.district_coords[d], {hintContent: `район ${d}: ${nums[d]['count']} дтп, смертей - ${nums[d]['deaths']}`},
            {
              fillColor: c,
              hasBalloon: true,
              hasHint: true,
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
          pieChartCaptionMaxWidth: 30,
          pieChartRadius: function (sum) {
            return 10 + 2 * Math.log(sum)
          }
        });
        this.pieCharts.push(geoObject)
        this.map.geoObjects.add(geoObject)

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
      this.objectManager.removeAll()
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
            balloonContent: `<h3>${points[i].DTP_V}</h3>` +
                `<p>Дата: ${points[i].date}</p>  <p>Адрес: ${points[i].address}</p> <p>Основная причина: ${points[i].NPDD[0]}</p><p>Освещение: ${points[i].osv}</p>` +
                `<button class="button is-small"><a href="#/dtp_info/${points[i].id}" class target="_blank">Подробнее</a></button>`
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
    loadingAsync: async function (year, context) {
      return [await (await fetch(`http://195.133.147.101:3000/get_dtps_year?year=${year}`)).json(), context]
    },
    showHeatmapmode: async function () {
      this.removeAllPlacemarks()
      let features = []
      for (let i = 0; i < this.vis_dtps.length; i++) {
        features[i] = {
          type: 'Feature',
          id: i,
          geometry: {
            type: 'Point',
            coordinates: [Number(this.vis_dtps[i].COORD_W), Number(this.vis_dtps[i].COORD_L)]
          },

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
          } else {
            this.removeAllPlacemarks()
            this.addPlacemarks(val)
          }
        }
      }
    },
    district(val) {
      if (!this.districtMode) {
        let myPolygon = new ymaps.Polygon(this.options.district_coords[val])
        if (this.showingPolygon) {
          this.map.geoObjects.remove(this.showingPolygon)
        }
        this.showingPolygon = myPolygon
        this.map.geoObjects.add(myPolygon)
      }
    },
    districtMode(val) {
      if (!this.heatmapMode) {
        if (val) {
          this.showDistrictMode()
        } else {
          this.hideDistrictMode()
          this.helpvar = !this.helpvar
        }
      }
    },
    heatmapMode(val) {
      if (!this.districtMode) {
        if (val) {
          this.showHeatmapmode()
        } else {
          this.hideHeatmapMode()
          this.helpvar = !this.helpvar
        }
      }
    },
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
    let heatmapScript = document.createElement('script')
    heatmapScript.setAttribute('src', 'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js')
    document.head.appendChild(heatmapScript)
    ymaps.modules.require(['Heatmap'], (Heatmap) => {
      this.hmap = new Heatmap([], {dissipating: true, intensityOfMidpoint: 0.2,});
    });
  }
}
</script>
<style>
.curtain-enter-active {
  transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-property: width;
}

.curtain-leave-active {
  transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.curtain-enter, .curtain-leave-to {
  transform: translateX(10px);
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
.sus{
  transform: rotate(-90deg)
}
</style>
