<template>
  <div v-if="loading">
    <img src="../../src/assets/gifs/loading.gif"/>
  </div>
  <div v-else>
    <section class="container is-fluid" style="margin-top: 32px">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="box">
            <figure class="image">
              <img src="..\assets\images\normal-dtp_256x256.jpg" class="scheme">
            </figure>
          </div>
        </div>
        <div class="column">
          <div class="content">
            <div class="title is-4">
              <h1>{{ this.dtpData.data['DTP_V'] }}</h1>
            </div>
            <p class="subtitle">{{ this.dtpData.data['date'] }} в {{ this.dtpData.data['Time'] }} |
              Район {{ this.dtpData.data['District'] }}, {{ this.dtpData.data['infoDtp']['street'] }},
              {{ this.dtpData.data['infoDtp']['house'] }}</p>
            <nav class="level-left" style="margin-bottom: 8px">
              <div class="level-item">
                <i class="fa fa-car fa-3x"></i>
              </div>
              <div class="level-item">
                <div>
                  <p class="heading">Транспорт</p>
                  <p class="title">{{ this.dtpData.data['K_TS'] }}</p>
                </div>
              </div>
            </nav>
            <nav class="level-left" style="margin-bottom: 8px">
              <div class="level-item">
                <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
              </div>
              <div class="level-item">
                <div>
                  <p class="heading">Участники</p>
                  <p class="title">{{ this.dtpData.data['K_UCH'] }}</p>
                </div>
              </div>
            </nav>
            <nav class="level-left" style="margin-bottom: 8px">
              <div class="level-item">
                <i class="fas fa-user-injured fa-3x"></i>
              </div>
              <div class="level-item">
                <div>
                  <p class="heading">Пострадавшие</p>
                  <p class="title">{{ this.dtpData.data['RAN'] }}</p>
                </div>
              </div>
            </nav>
            <nav class="level-left">
              <div class="level-item">
                <i class="fas fa-dizzy fa-3x"></i>
              </div>
              <div class="level-item">
                <div>
                  <p class="heading">Погибшие</p>
                  <p class="title">{{ this.dtpData.data['POG'] }}</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="box has-text-left">
        <div class="title is-4">
          Подробности ДТП
        </div>
        <div class="block">
          <li class="subtitle is-5">Причины ДТП: <span v-for="b in this.dtpData.data['infoDtp']['ndu']"
                                                       :key="b">{{ b }}</span></li>
        </div>
        <div class="block">
          <li class="subtitle is-5">Участок дороги: <span v-for="b in this.dtpData.data['infoDtp']['sdor']"
                                                          :key="b">{{ b }} </span></li>
        </div>
        <div class="block">
          <li class="subtitle is-5">Дорожное значение: <span>{{ this.dtpData.data['infoDtp']['dor_z'] }}</span></li>
        </div>
        <div class="block">
          <li class="subtitle is-5">Погода: <span v-for="b in this.dtpData.data['infoDtp']['s_pog']"
                                                  :key="b">{{ b }}</span></li>
        </div>
        <div class="block">
          <li class="subtitle is-5">Дорожное покрытие: {{ this.dtpData.data['infoDtp']['s_pch'] }}</li>
        </div>
        <div class="block">
          <li class="subtitle is-5">Изменение режима движения: {{ this.dtpData.data['infoDtp']['change_org_motion'] }}
          </li>
        </div>
        алпо вал ав
      </div>
      <div class="box  is-shadowless">
        <div class="title is-4">Участники ДТП</div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <div v-for="b in this.dtpData.data['infoDtp']['ts_info']" :key="b">
                <div class="tile is-child">
                  <div class="box has-text-left">
                    <div class="level-left">
                      <div class="level-item is-one-fifth">
                        <i class="fa fa-car fa-2x"></i>
                      </div>
                      <div class="level-item">
                        <div class="title is-5">
                          <span>{{ b['marka_ts'] }} {{ b['m_ts'] }}, {{ b['g_v'] }}, {{ b['color'] }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="level-left">
                      <li>{{ b['t_n'] }}</li>
                    </div>
                    <div v-for="c in b['ts_uch']" :key="c">
                      <div class="tile is-child">
                        <div class="box is-shadowless">
                          <div class="level">
                            <div class="title is-5">
                              <span>{{ c['K_UCH'] }}, {{ c['POL'] }}</span>
                            </div>
                          </div>
                          <div class="level-left">
                            <div class="level-item is-one-fifth">
                              <i class="fa fa-exclamation"></i>
                            </div>
                            <div class="level-item">
                              <div v-for="d in c['NPDD']" :key="d">{{ d }}</div>
                            </div>
                          </div>
                          <div class="level-left">
                            <div class="level-item is-one-fifth">
                              <i class="fa fa-heartbeat"></i>
                            </div>
                            <div class="level-item block">
                              <!-- Эта умпалумпа не влезает в box! Сделать какое-то ограничение для этой хуйни -->
                              <p> {{ c['S_T'] }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent">
              <div v-for="d in this.dtpData.data['infoDtp']['uchInfo']" :key="d">
                <div class="tile is-child">
                  <div class="box has-text-left">
                    <div class="level-left">
                      <div class="level-item is-one-fifth">
                        <i class="fas fa-walking fa-2x"></i>
                      </div>
                      <div class="level-item">
                        <div class="title is-5">
                          <span>{{ d['K_UCH'] }}, {{ d['POL'] }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="tile is-child box is-shadowless">
                      <div class="level-left">
                        <div class="level-item is-one-fifth">
                          <i class="fa fa-exclamation"></i>
                        </div>
                        <div class="level-item">
                          <div v-for="b in d['NPDD']" :key="b">{{ b }}</div>
                        </div>
                      </div>
                      <div class="level-left">
                        <div class="level-item is-one-fifth">
                          <i class="fa fa-heartbeat"></i>
                        </div>
                        <div class="level-item">
                          <p>{{ d['S_T'] }}}</p> <!--тут тоже умпалумпа -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="title is-4">Панорама с места ДТП</div>
          <div id="player1" class="player" style="height: 70vh"></div>
      </div>

      <!--      <strong>ts_info</strong>-->
      <!--      <div>-->
      <!--        <div v-for="b in this.dtpData.data['infoDtp']['ts_info']" :key="b">-->
      <!--          <div>порядковый номер тр средства : {{ b['n_ts'] }}</div>-->
      <!--          <div>состояние тс (остался на месте дтп да\нет): {{ b['ts_s'] }}</div>-->
      <!--          <div>тип транспортного средства (класс) : {{ b['t_ts'] }}</div>-->
      <!--          <div>марка транпортного средства : {{ b['marka_ts'] }}</div>-->
      <!--          <div>модель тс : {{ b['m_ts'] }}</div>-->
      <!--          <div>цвет тс : {{ b['color'] }}</div>-->
      <!--          <div>передний или задний привод : {{ b['r_rul'] }}</div>-->
      <!--          <div>год выпуска : {{ b['g_v'] }}</div>-->
      <!--          <div>m_pov (без понятия, что это) : {{ b['m_pov'] }}</div>-->
      <!--          <div>технические неисправности : {{ b['t_n'] }}</div>-->
      <!--          <div>тип собственности транпротного средства : {{ b['f_sob'] }}</div>-->
      <!--          <div>у кого в собственности (физ или юр лицо) : {{ b['o_pf'] }}</div>-->
      <!--          <strong>ts_uch</strong>-->
      <!--          <div>-->
      <!--            <div v-for="c in b['ts_uch']" :key="c" style="margin-left:45px;">-->
      <!--              <div>тип участника : {{ c['K_UCH'] }}</div>-->
      <!--              <strong>нарушение ПДД</strong>-->
      <!--              <div>-->
      <!--                <div v-for="d in c['NPDD']" :key="d" style="margin-left:60px;">{{ d }}</div>-->
      <!--              </div>-->
      <!--              <div>состояние потерпевшего : {{ c['S_T'] }}</div>-->
      <!--              <div>пол : {{ c['POL'] }}</div>-->
      <!--              <div>возраст : {{ c['V_ST'] }}</div>-->
      <!--              <div>наличие алкогольного опьянения : {{ c['ALCO'] }}</div>-->
      <!--              <strong>Сопротивление полиции</strong>-->
      <!--              <div>-->
      <!--                <div v-for="d in c['SOP_NPDD']" :key="d" style="margin-left:60px;">{{ d }}</div>-->
      <!--              </div>-->
      <!--              <div>ремень безопасности : {{ c['SAFETY_BELT'] }}</div>-->
      <!--              <div>скрылся с места происшествия (да\нет) : {{ c['S_SM'] }}</div>-->
      <!--              <div>порядковый номер участника : {{ c['N_UCH'] }}</div>-->
      <!--              <div>S_SEAT_GROUP (хз, что это) : {{ c['S_SEAT_GROUP'] }}</div>-->
      <!--              <div>INJURED_CARD_ID (без понятия): {{ c['INJURED_CARD_ID'] }}</div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div>населенный пункт : {{ this.dtpData.data['infoDtp']['n_p'] }}</div>-->
      <!--      <div>улица : {{ this.dtpData.data['infoDtp']['street'] }}</div>-->
      <!--      <div>дом : {{ this.dtpData.data['infoDtp']['house'] }}</div>-->
      <!--      <div>подъезд : {{ this.dtpData.data['infoDtp']['dor'] }}</div>-->
      <!--      <div>километр дороги: {{ this.dtpData.data['infoDtp']['km'] }}</div>-->
      <!--      <div>метр дороги : {{ this.dtpData.data['infoDtp']['m'] }}</div>-->
      <!--      <div>тип улицы : {{ this.dtpData.data['infoDtp']['k_ul'] }}</div>-->
      <!--      <div>dor_k (хз, что это): {{ this.dtpData.data['infoDtp']['dor_k'] }}</div>-->
      <!--      <div>дорожное значение (например, местного значения) : {{ this.dtpData.data['infoDtp']['dor_z'] }}</div>-->
      <!--      <strong>factor (?)</strong>-->
      <!--      <div>-->
      <!--        <div v-for="b in this.dtpData.data['infoDtp']['factor']" :key="b" style="margin-left:30px;">{{ b }}</div>-->
      <!--      </div>-->
      <!--      <strong>состояние погоды</strong>-->
      <!--      <div>-->
      <!--        <div v-for="b in this.dtpData.data['infoDtp']['s_pog']" :key="b" style="margin-left:30px;">{{ b }}</div>-->
      <!--      </div>-->
      <!--      <div>состояние дорожного покрытия : {{ this.dtpData.data['infoDtp']['s_pch'] }}</div>-->
      <!--      <div>освещение (время суток\освещение) : {{ this.dtpData.data['infoDtp']['osv'] }}</div>-->
      <!--      <div>наличие изменений режима движения на данном участке : {{-->
      <!--          this.dtpData.data['infoDtp']['change_org_motion']-->
      <!--        }}-->
      <!--      </div>-->
      <!--      <div>s_dtp (хз) : {{ this.dtpData.data['infoDtp']['s_dtp'] }}</div>-->
      <!--      <div>COORD_W : {{ this.dtpData.data['infoDtp']['COORD_W'] }}</div>-->
      <!--      <div>COORD_L : {{ this.dtpData.data['infoDtp']['COORD_L'] }}</div>-->
      <!--      <strong>объекты в непоср близости ДТП (остановки\пешеходные переходы и т дё0</strong>-->
      <!--      <div>-->
      <!--        <div v-for="b in this.dtpData.data['infoDtp']['OBJ_DTP']" :key="b" style="margin-left:30px;">{{ b }}</div>-->
      <!--      </div>-->
      <!--      <strong>uchInfo</strong>-->
      <!--      <div>-->
      <!--        <div v-for="b in this.dtpData.data['infoDtp']['uchInfo']" :key="b" style="margin-left:30px;">{{ b }}</div>-->
      <!--      </div>-->
    </section>
  </div>
</template>

<script src="https://use.fontawesome.com/ab5204b274.js"></script>
<script>
console.log('Не сясь')
import {loadYmap} from "vue-yandex-maps";

console.log('Сясь')

export default {
  name: "dtpInfo",
  props: ['id'],
  data() {
    return {
      dtpData: {},
      loading: true

    }
  },
  async mounted() {
    const resp = await (await fetch(`http://195.133.147.101:3000/get_dtp?id=${this.id}`)).json()
    console.log(resp)
    this.dtpData = resp[0]
    this.loading = false
    console.log(this.dtpData)
    const settings = {
      apiKey: '8984067c-7841-4a8a-aa3e-8d6920ceea02',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }
    await loadYmap(settings)
    ymaps.ready(() => {
      // Для начала проверим, поддерживает ли плеер браузер пользователя.
      if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
      }

      // Ищем панораму в переданной точке.
      ymaps.panorama.locate([this.dtpData.data['infoDtp']['COORD_W'], this.dtpData.data['infoDtp']['COORD_L']]).done(
          function (panoramas) {
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) {
              // Создаем плеер с одной из полученных панорам.
              var player = new ymaps.panorama.Player(
                  'player1',
                  // Панорамы в ответе отсортированы по расстоянию
                  // от переданной в panorama.locate точки. Выбираем первую,
                  // она будет ближайшей.
                  panoramas[0],
                  // Зададим направление взгляда, отличное от значения
                  // по умолчанию.
                  {
                    direction: [256, 16]
                  }
              );
            }
          },
          function (error) {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
          }
      );

    });
  },
  methods: {}
}
</script>
<style scoped>

</style>
