<template>
        <div id="player1" class="player"></div>
</template>

<script>
    /* eslint-disable */
    import {loadYmap} from "vue-yandex-maps";

    export default {
        name: "panorama",
        props: ['latitude', 'longitude'],
        async mounted() {
            const settings = {
                apiKey: '4877efab-fec0-4e66-956d-33db0d22ab10',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            }
            await loadYmap(settings)
            ymaps.ready(function() {
                // Для начала проверим, поддерживает ли плеер браузер пользователя.
                if (!ymaps.panorama.isSupported()) {
                    // Если нет, то просто ничего не будем делать.
                    return;
                }

                // Ищем панораму в переданной точке.
                ymaps.panorama.locate([55.733685, 37.588264]).done(
                    function(panoramas) {
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
                    function(error) {
                        // Если что-то пошло не так, сообщим об этом пользователю.
                        alert(error.message);
                    }
                );

            });
        }
    }
</script>

<style scoped>

</style>
