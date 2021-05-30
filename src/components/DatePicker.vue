<template>
    <div class="block">
        <el-date-picker
                :picker-options="pickerOptions"
                align="right"
                end-placeholder="End date"
                range-separator="To"
                start-placeholder="Start date"
                type="datetimerange"
                v-model="value2"
                @input="$emit('input', value2)">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DatePicker",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '2021',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(2021,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '2020',
                        onClick(picker) {
                            const end = new Date(2020,12,31);
                            const start = new Date(2020,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '2019',
                        onClick(picker) {
                            const end = new Date(2019,12,31);
                            const start = new Date(2019,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '2018',
                        onClick(picker) {
                            const end = new Date(2018,12,31);
                            const start = new Date(2018,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '2017',
                        onClick(picker) {
                            const end = new Date(2017,12,31);
                            const start = new Date(2017,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '2016',
                        onClick(picker) {
                            const end = new Date(2016,12,31);
                            const start = new Date(2016,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '2015',
                        onClick(picker) {
                            const end = new Date(2015,12,31);
                            const start = new Date(2015,0,1);
                            picker.$emit('pick', [start, end]);
                        }
                    },]
                },
                value2: ''
            };
        }
    }
</script>

<style scoped>

</style>
