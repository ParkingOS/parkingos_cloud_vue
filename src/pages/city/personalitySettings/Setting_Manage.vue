<template>
    <section>
       <div style="padding:20px">
             <span style="padding:20px">设置是否可修改月卡续费开始时间:</span>
             <el-radio-group v-model="radio1" @change="changeBeginTimeSetting" >
                 <el-radio :label="0">不可以</el-radio>
                 <el-radio :label="1">可以</el-radio>
            </el-radio-group>
       </div>

        <div style="padding:20px">
             <span style="padding:20px">设置是否可修改月卡续费结束时间:</span>
             <el-radio-group v-model="radio2" @change="changeEndTimeSetting" >
                 <el-radio :label="0">不可以</el-radio>
                 <el-radio :label="1">可以</el-radio>
            </el-radio-group>
        </div>

     </section>
</template>

<script>
    import {
        path
    } from '@/api/api';
export default {
    data() {
      return {
        radio1: 0,
        radio2: 0,
        editapi: '/cityuin/edit',
        queryapi:'/cityuin/query',
      }
    },
     methods: {

        changeBeginTimeSetting(value) {
                  var _this = this;
                  console.log("==>>>begingTime:"+value);
                  let aform = {}
                  aform.cityid = sessionStorage.getItem('cityid')
                  aform.state = value
                  aform.type = 1
                  _this.changeState(aform);
           },

           changeEndTimeSetting(value) {
                     var _this = this;
                     console.log("==>>>begingTime:"+value);
                     let aform = {}
                     aform.cityid = sessionStorage.getItem('cityid')
                     aform.state = value
                     aform.type = 2
                     _this.changeState(aform);
            },

       changeState(aform) {
                var _this = this;
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
               _this.radio1=ret.self_setting.self_setting
               _this.radio2=ret.self_setting.end_time_setting

          }).catch(function (error) {

          })
       }
    },
    mounted() {
       this.getMonthSetting();
    }
}

</script>