<template>
    <div v-if="loading">
        <img src="../../src/assets/gifs/loading.gif"/>
    </div>
    <div v-else>
      <div>KartId : {{this.dtpData.data['KartId']}}</div>
      <div>rowNum : {{this.dtpData.data['rowNum']}}</div>
      <div>date : {{this.dtpData.data['date']}}</div>
      <div>Time : {{this.dtpData.data['Time']}}</div>
      <div>District : {{this.dtpData.data['District']}}</div>
      <div>DTP_V : {{this.dtpData.data['DTP_V']}}</div>
      <div>POG : {{this.dtpData.data['POG']}}</div>
      <div>RAN : {{this.dtpData.data['RAN']}}</div>
      <div>K_TS : {{this.dtpData.data['K_TS']}}</div>
      <div>K_UCH : {{this.dtpData.data['K_UCH']}}</div><strong>infoDtp</strong>
      <div style="margin-left:0px;"><strong>ndu</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['ndu']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div><strong>sdor</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['sdor']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div><strong>ts_info</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['ts_info']" :key="b" style="margin-left:30px;">
            <div>n_ts : {{b['n_ts']}}</div>
            <div>ts_s : {{b['ts_s']}}</div>
            <div>t_ts : {{b['t_ts']}}</div>
            <div>marka_ts : {{b['marka_ts']}}</div>
            <div>m_ts : {{b['m_ts']}}</div>
            <div>color : {{b['color']}}</div>
            <div>r_rul : {{b['r_rul']}}</div>
            <div>g_v : {{b['g_v']}}</div>
            <div>m_pov : {{b['m_pov']}}</div>
            <div>t_n : {{b['t_n']}}</div>
            <div>f_sob : {{b['f_sob']}}</div>
            <div>o_pf : {{b['o_pf']}}</div><strong>ts_uch</strong>
            <div>
              <div v-for="c in b['ts_uch']" :key="c" style="margin-left:45px;">
                <div>K_UCH : {{c['K_UCH']}}</div><strong>NPDD</strong>
                <div>
                  <div v-for="d in c['NPDD']" :key="d" style="margin-left:60px;">{{d}}</div>
                </div>
                <div>S_T : {{c['S_T']}}</div>
                <div>POL : {{c['POL']}}</div>
                <div>V_ST : {{c['V_ST']}}</div>
                <div>ALCO : {{c['ALCO']}}</div><strong>SOP_NPDD</strong>
                <div>
                  <div v-for="d in c['SOP_NPDD']" :key="d" style="margin-left:60px;">{{d}}</div>
                </div>
                <div>SAFETY_BELT : {{c['SAFETY_BELT']}}</div>
                <div>S_SM : {{c['S_SM']}}</div>
                <div>N_UCH : {{c['N_UCH']}}</div>
                <div>S_SEAT_GROUP : {{c['S_SEAT_GROUP']}}</div>
                <div>INJURED_CARD_ID : {{c['INJURED_CARD_ID']}}</div>
              </div>
            </div>
          </div>
        </div>
        <div>n_p : {{this.dtpData.data['infoDtp']['n_p']}}</div>
        <div>street : {{this.dtpData.data['infoDtp']['street']}}</div>
        <div>house : {{this.dtpData.data['infoDtp']['house']}}</div>
        <div>dor : {{this.dtpData.data['infoDtp']['dor']}}</div>
        <div>km : {{this.dtpData.data['infoDtp']['km']}}</div>
        <div>m : {{this.dtpData.data['infoDtp']['m']}}</div>
        <div>k_ul : {{this.dtpData.data['infoDtp']['k_ul']}}</div>
        <div>dor_k : {{this.dtpData.data['infoDtp']['dor_k']}}</div>
        <div>dor_z : {{this.dtpData.data['infoDtp']['dor_z']}}</div><strong>factor</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['factor']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div><strong>s_pog</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['s_pog']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div>
        <div>s_pch : {{this.dtpData.data['infoDtp']['s_pch']}}</div>
        <div>osv : {{this.dtpData.data['infoDtp']['osv']}}</div>
        <div>change_org_motion : {{this.dtpData.data['infoDtp']['change_org_motion']}}</div>
        <div>s_dtp : {{this.dtpData.data['infoDtp']['s_dtp']}}</div>
        <div>COORD_W : {{this.dtpData.data['infoDtp']['COORD_W']}}</div>
        <div>COORD_L : {{this.dtpData.data['infoDtp']['COORD_L']}}</div><strong>OBJ_DTP</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['OBJ_DTP']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div><strong>uchInfo</strong>
        <div>
          <div v-for="b in this.dtpData.data['infoDtp']['uchInfo']" :key="b" style="margin-left:30px;">{{b}}</div>
        </div>
      </div>
    </div>
</template>

<script>
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
        },
        methods : {
        }
    }
</script>

<style scoped>

</style>
