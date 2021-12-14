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
                    <div class="box"
                         style="position: relative;text-align: center;width: 23vw;height: 23vw; padding: 1vw">
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
                        <p class="subtitle">
                            {{ this.dtpData.data['date'] }} {{lang==="ru"?"в":"at"}} {{ this.dtpData.data['Time'] }} |
                            {{ this.dtpData.data['infoDtp']['address'] }}</p>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i class="fa fa-car fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">{{lang==="ru"?"Транспорт":"Vehicle"}}: {{
                                        this.dtpData.data['K_TS'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i aria-hidden="true" class="fa fa-user-circle-o fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">{{lang==="ru"?"Участники":"Participants"}}: {{
                                        this.dtpData.data['K_UCH'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left" style="margin-bottom: 8px">
                            <div class="level-item">
                                <i class="fas fa-user-injured fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">{{lang==="ru"?"Пострадавшие":"Wounded"}}: {{
                                        this.dtpData.data['RAN'] }}</p>
                                </div>
                            </div>
                        </nav>
                        <nav class="level-left">
                            <div class="level-item">
                                <i class="fas fa-dizzy fa-3x"></i>
                            </div>
                            <div class="level-item">
                                <div>
                                    <p class="subtitle">{{lang==="ru"?"Погибшие":"Casualties"}}: {{
                                        this.dtpData.data['POG'] }}</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="box has-text-left">
                <div class="title is-4">
                    {{lang==="ru"?"Подробности ДТП":"Detailed information about the accident"}}
                </div>
                <div class="block">
                    <div :key="b" v-for="b in this.dtpData.data['infoDtp']['ts_info']">
                        <div :key="c" v-for="c in b['ts_uch']">
                            <div :key="d" v-for="d in c['NPDD']">
                                <li class="subtitle is-5" v-if="d != 'Нет нарушений' && d !='No violations'">
                                    {{lang==="ru"?"ПричиныДТП":"Accident reasons"}}: {{ d }}
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <li class="subtitle is-5">{{lang==="ru"?"Участок дороги":"Road section"}}: <span :key="b"
                                                                                                     v-for="b in this.dtpData.data['infoDtp']['sdor']">{{b}} </span>
                    </li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">{{lang==="ru"?"Дорожное значение":"Effect on the traffic"}}:
                        <span>{{ this.dtpData.data['infoDtp']['dor_z'] }}</span></li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">{{lang==="ru"?"Погода":"Weather"}}: <span :key="b"
                                                                                        v-for="b in this.dtpData.data['infoDtp']['s_pog']">{{ b }}</span>
                    </li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">{{lang==="ru"?"Дорожное покрытие":"Road surface"}}:
                        {{this.dtpData.data['infoDtp']['s_pch'] }}
                    </li>
                </div>
                <div class="block">
                    <li class="subtitle is-5">{{lang==="ru"?"Изменение режима движения":"Change in the traffic
                        situation"}}: {{
                        this.dtpData.data['infoDtp']['change_org_motion']
                        }}
                    </li>
                </div>
            </div>
            <div class="box  is-shadowless">
                <div class="title is-4">{{lang==="ru"?"Участники ДТП":"Accident participants"}}</div>
                <div class="tile is-ancestor">
                    <div class="tile is-vertical">

                        <div :key="b" style="margin-top: 10px" v-for="b in this.dtpData.data['infoDtp']['ts_info']">
                            <div class="tile">
                                <div class="box has-text-left">
                                    <div class="level-left">
                                        <div class="level-item is-one-fifth">
                                            <i class="fa fa-bicycle fa-2x"
                                               v-if="b['t_ts'] == 'Персональное электрическое средство передвижения малой мощности'"></i>
                                            <i class="fa fa-car fa-2x" v-else-if="b['t_ts'] != 'Велосипеды'"></i>
                                            <i class="fas fa-bicycle fa-2x" v-else></i>
                                        </div>
                                        <div>
                                            <div class="title is-5">
                                                <span v-if="b['t_ts'] == 'Персональное электрическое средство передвижения малой мощности'">Персональное электрическое средство передвижения малой мощности</span>
                                                <span
                                                        v-else-if="b['t_ts'] != 'Велосипеды'">{{
                            b['marka_ts'] != '' ? b['marka_ts'] : 'Автомобиль'
                          }},
                          {{
                            b['m_ts'] != '' ? b['m_ts'] : 'модель не указана'
                          }}, {{ b['g_v'] != '' ? b['g_v'] : 'год выпуска не указан' }},
                          {{ b['color'] != '' ? b['color'] : 'цвет не указан' }}</span>
                                                <span v-else>{{lang==="ru"?"Велосипед":"Bicycle"}}</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="level-left">
                                        <li>{{ b['t_n'] }}</li>
                                    </div>
                                    <div :key="c" v-for="c in b['ts_uch']">
                                        <div class="tile is-child">
                                            <div class="box is-shadowless">
                                                <div class="level">
                                                    <div class="title is-5">
                                                        <span>{{ c['K_UCH'] }}, {{lang==="ru"?"пол":"sex"}} {{ c['POL'] }}</span>
                                                    </div>
                                                </div>
                                                <div class="level-left">
                                                    <div class="is-one-fifth">
                                                        <div :key="d" v-for="d in c['NPDD']"><i
                                                                class="fa fa-exclamation"></i> {{ d }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="level-left">
                                                    <div class="is-one-fifth">
                                                        <p><i class="fa fa-heartbeat"></i> {{ c['S_T'] }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div :key="d" style="margin-top: 10px" v-for="d in this.dtpData.data['infoDtp']['uchInfo']">
                            <div class="tile">
                                <div class="box has-text-left">
                                    <div class="level-left">
                                        <div class="level-item is-one-fifth">
                                            <i class="fas fa-walking fa-2x"></i>
                                        </div>
                                        <div>
                                            <div class="title is-5">
                                                <span>{{ d['K_UCH'] }}, {{lang==="ru"?"пол":"sex"}} {{d['POL'] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tile is-child box is-shadowless">
                                        <div class="level-left">
                                            <div class="is-one-fifth">
                                                <div :key="b" v-for="b in d['NPDD']"><i class="fa fa-exclamation"></i>
                                                    {{b}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="level-left">
                                            <div class="is-one-fifth">
                                                <p><i class="fa fa-heartbeat"></i> {{ d['S_T'] }}</p>
                                                <!--тут тоже умпалумпа -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="title is-4">{{lang==="ru"?"Панорама с места ДТП":"Panoramic view of the scene"}}</div>
                <div class="player" id="player1" style="height: 70vh"></div>
            </div>

        </section>
    </div>
</template>

<script>
    import {loadYmap} from "vue-yandex-maps";
    import translations from "../assets/translations"

    export default {
        name: "dtpInfo",
        props: ['id'],
        data() {
            return {
                dtpData: {},
                loading: true

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

        },
        methods: {
            translate: async function (word) {
                const pat = /^[\u0400-\u04FF]/iu
                if (pat.test(word)) {
                    if (word in translations) {
                        return translations[word]
                    } else {
                        let trans = await (await fetch(`http://194.87.99.72:3000/translate?word=${word}`)).json()
                        translations[word] = trans['translation']
                        return trans['translation']
                    }
                }
                return word
            }
        },
        async mounted() {
            const resp = await (await fetch(`http://194.87.99.72:3000/get_dtp?id=${this.id}`)).json()
            this.dtpData = resp[0]
            this.loading = false

            const settings = {
                apiKey: '4877efab-fec0-4e66-956d-33db0d22ab10',
                lang: 'en_RU',
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
            const translate = this.translate
            if (this.lang === "en") {

                await getFiniteValue(this.dtpData.data);

                async function getFiniteValue(obj) {
                    await getProp(obj);

                    async function getProp(o) {
                        for (var prop in o) {
                            if (typeof (o[prop]) === 'object') {
                                getProp(o[prop]);
                            } else if(typeof(o[prop]) === "string"){
                                o[prop] = await translate(o[prop])
                            }
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
