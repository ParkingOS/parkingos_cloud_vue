<template>
<section>
       <br/><br/><br/>
      <span style="margin-left: 10px">设置是否可修改月卡续费开始时间：</span>
      <el-tooltip :content="value5" placement="top" style="margin-left: 30px">
        <el-switch
          v-model="value5"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="不可修改"
          inactive-value="可修改"
          @change = 'changeState'>
        </el-switch>
      </el-tooltip>

     </section>
</template>

<script>
    import {
        path
    } from '../../api/api';
export default {
    data() {
      return {
        value5: '不可修改',
        state:0,
        editapi: '/cityuin/edit',
        queryapi:'/cityuin/query',
      }
    },
     methods: {
       changeState(value) {//回调值，改成了不可修改
              var _this = this;
              if(value=='不可修改'){
                _this.state =0;
              }else{
                 _this.state =1;
              }
              let aform = {}
              aform.cityid = sessionStorage.getItem('cityid')
              aform.state = _this.state
               _this.$axios.post(path + _this.editapi, _this.$qs.stringify(aform), {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                  }
              }).then(function (response) {
                  let ret = response.data;
                  if (ret > 0 || ret.state == 1) {
                      //更新成功
                      _this.$message({
                          message: '修改成功!',
                          type: 'success',
                          duration: 1200
                      });
                  } else {
                      //更新失败
                      _this.$message({
                          message: ret.msg,
                          type: 'error',
                          duration: 1200
                      });
                  }
                  _this.getMonthSetting();
              }).catch(function (error) {

              })
       },
       getMonthSetting(){
            var _this = this;
            let aform = {}
            aform.cityid = sessionStorage.getItem('cityid')
           this.$axios.post(path + this.queryapi, this.$qs.stringify(aform), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
          }).then(function (response) {
              let ret = response.data;
              console.log('获得自定义设置：'+ret.self_setting.self_setting);
              if(ret.self_setting.self_setting){
                _this.value5="可修改"
              }
          }).catch(function (error) {

          })
       }
    },
    mounted() {
       this.getMonthSetting();
    }
}

</script>