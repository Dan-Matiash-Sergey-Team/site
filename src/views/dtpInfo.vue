<template>
    <!--eslint-disable -->
    <div v-if="loading">
      <div style="position: absolute; width: 100%; top: 40%; text-align: center;
    font-size: 500%; font-weight: 700">
        Карта ДТП по Москве
      </div>
    </div>
    <div v-else>
        <section class="container is-fluid" style="margin-top: 3vh">
            <div class="columns">
                <div class="column is-one-quarter">
                    <div class="box" style="position: relative;text-align: center;width: 23vw;height: 23vw;">
                        <yandex-map
                                :behaviors="[]"
                                :controls="[]"
                                :coords="[dtpData.data['infoDtp']['COORD_W'], dtpData.data['infoDtp']['COORD_L']]"
                                :scroll-zoom="false"
                                map-type="map"
                                style="position: relative;text-align: center;width: 21vw;height: 21vw"
                                zoom="16"
                        >
                            <ymap-marker
                                    :coords="[dtpData.data['infoDtp']['COORD_W'], dtpData.data['infoDtp']['COORD_L']]"
                                    marker-id="123"
                            />
                        </yandex-map>
                    </div>
                </div>
                <div class="column">
                    <div class="content">
                        <div class="title is-4">
                            <h1>{{ this.dtpData.data['DTP_V'] }}</h1>
                        </div>
                        <p class="subtitle"
                           v-if="this.dtpData.data['infoDtp']['street'] != '' & this.dtpData.data['infoDtp']['house'] != ''">
                            {{ this.dtpData.data['date'] }} в {{ this.dtpData.data['Time'] }} |
                            Район {{ this.dtpData.data['District'] }}, {{ this.dtpData.data['infoDtp']['street'] }},
                            {{ this.dtpData.data['infoDtp']['house'] }}</p>
                        <p class="subtitle"
                           v-else-if="this.dtpData.data['infoDtp']['street'] === '' || this.dtpData.data['infoDtp']['house'] === ''">
                            {{ this.dtpData.data['date'] }} в {{ this.dtpData.data['Time'] }} |
                            Район {{ this.dtpData.data['District'] }}, Точный адрес не указан</p>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i class="fa fa-car fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">Транспорт: {{ this.dtpData.data['K_TS'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i aria-hidden="true" class="fa fa-user-circle-o fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">Участники: {{ this.dtpData.data['K_UCH'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i class="fas fa-user-injured fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">Пострадавшие: {{ this.dtpData.data['RAN'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left">
                            <div class="level-item">
                                <i class="fas fa-dizzy fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">Погибшие: {{ this.dtpData.data['POG'] }}</p>
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
                    <div :key="b" v-for="b in this.dtpData.data['infoDtp']['ts_info']">
                        <div :key="c" v-for="c in b['ts_uch']">
                            <div :key="d" v-for="d in c['NPDD']">
                                <li class="subtitle is-5" v-if="d != 'Нет нарушений'">Причины ДТП: {{d}}</li>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <li class="subtitle is-5">Участок дороги: <span :key="b"
                                                                    v-for="b in this.dtpData.data['infoDtp']['sdor']">{{ b }} </span>
                    </li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">Дорожное значение:
                        <span>{{ this.dtpData.data['infoDtp']['dor_z'] }}</span></li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">Погода: <span :key="b"
                                                            v-for="b in this.dtpData.data['infoDtp']['s_pog']">{{ b }}</span>
                    </li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">Дорожное покрытие: {{ this.dtpData.data['infoDtp']['s_pch'] }}</li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">Изменение режима движения: {{
                        this.dtpData.data['infoDtp']['change_org_motion']
                        }}
                    </li>
                </div>
            </div>
            <div class="box  is-shadowless">
                <div class="title is-4">Участники ДТП</div>
                <div class="tile is-ancestor">
                    <div class="tile is-vertical">
                        <div class="tile is-parent">
                            <div :key="b" v-for="b in this.dtpData.data['infoDtp']['ts_info']">
                                <div class="tile is-child">
                                    <div class="box has-text-left">
                                        <div :key="c" v-for="c in b['ts_uch']">
                                            <div class="level-left">
                                                <div class="level-item is-one-fifth">
                                                    <i class="fa fa-car fa-2x" v-if="b['t_ts'] != 'Велосипеды'"></i>
                                                    <i class="fas fa-bicycle fa-2x" v-else></i>
                                                </div>
                                                <div class="level-item">
                                                    <div class="title is-5">
                            <span v-if="b['t_ts'] != 'Велосипеды'">{{ b['marka_ts'] }} {{ b['m_ts'] }}, {{ b['g_v'] }}, {{
                                b['color']
                              }}</span>
                                                        <span v-else>Велосипед</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="level-left">
                                                <li>{{ b['t_n'] }}</li>
                                            </div>
                                            <div class="tile is-child">
                                                <div class="box is-shadowless">
                                                    <div class="level">
                                                        <div class="title is-5">
                                                            <span>{{ c['K_UCH'] }}, пол {{ c['POL'] }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="level-left">
                                                        <div class="level-item is-one-fifth">
                                                            <i class="fa fa-exclamation"></i>
                                                        </div>
                                                        <div class="level-item">
                                                            <div :key="d" v-for="d in c['NPDD']">{{ d }}</div>
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
                            <div :key="d" v-for="d in this.dtpData.data['infoDtp']['uchInfo']">
                                <div class="tile is-child">
                                    <div class="box has-text-left">
                                        <div class="level-left">
                                            <div class="level-item is-one-fifth">
                                                <i class="fas fa-walking fa-2x"></i>
                                            </div>
                                            <div class="level-item">
                                                <div class="title is-5">
                                                    <span>{{ d['K_UCH'] }}, пол {{ d['POL'] }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tile is-child box is-shadowless">
                                            <div class="level-left">
                                                <div class="level-item is-one-fifth">
                                                    <i class="fa fa-exclamation"></i>
                                                </div>
                                                <div class="level-item">
                                                    <div :key="b" v-for="b in d['NPDD']">{{ b }}</div>
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
                <div class="player" id="player1" style="height: 70vh"></div>
            </div>

        </section>
    </div>
</template>

<script src="https://use.fontawesome.com/ab5204b274.js"></script>
<script>
    import {loadYmap} from "vue-yandex-maps";

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
                apiKey: '4877efab-fec0-4e66-956d-33db0d22ab10',
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
