<template>
  <div class="block">
    <el-date-picker
        :clearable="false"
        :picker-options="pickerOptions"
        @input="$emit('input', value2)"
        align="left"
        end-placeholder="Конец"
        range-separator="-"
        size="small"
        start-placeholder="Начало"
        type="daterange"
        v-model="value2">
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
            const start = new Date(2021, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2020',
          onClick(picker) {
            const end = new Date(2020, 11, 31);
            const start = new Date(2020, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2019',
          onClick(picker) {
            const end = new Date(2019, 11, 31);
            const start = new Date(2019, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2018',
          onClick(picker) {
            const end = new Date(2018, 11, 31);
            const start = new Date(2018, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2017',
          onClick(picker) {
            const end = new Date(2017, 11, 31);
            const start = new Date(2017, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2016',
          onClick(picker) {
            const end = new Date(2016, 11, 31);
            const start = new Date(2016, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '2015',
          onClick(picker) {
            const end = new Date(2015, 11, 31);
            const start = new Date(2015, 0, 1);
            picker.$emit('pick', [start, end]);
          }
        },
          {
            text: 'Все время',
            onClick(picker) {
              const end = new Date();
              const start = new Date(2015, 0, 1);
              picker.$emit('pick', [start, end]);
            }
          },]
      },
      value2: [new Date('2021-04-01'), new Date('2021-04-30'),],
    };
  },
  methods: {}
}
</script>

<style scoped>

</style>
