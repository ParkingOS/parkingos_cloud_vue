<template>
  <section style="padding: 10px;">

    <!--账户名称-->
    <el-row>
      <el-col :span="24" style="font-size: 18px;font-weight: bold;">
           &nbsp;账户名称&nbsp;: <span style="color: red">{{name}}</span>
      </el-col>
    </el-row>

     <el-row :gutter="15" style="margin-top:20px">
      <el-col :span="8">
        <el-card class="box-card" style="height:180px">
          <div>
            <div>账户余额(元)&nbsp;:  <el-button class="detailed-style" type="text" @click="detailedModelFn">提现明细</el-button></div>
            <div style="text-align:center;margin-top:45px;color:#9B9EA0;font-size:22px;font-weight:bold;">{{balance+'元'}}</div>
          </div>
        </el-card>
        <el-button-group style="width:100%">
          <el-button style="display:inline;width:50%;margin-top:-4px" type="primary"  @click="recharge"><span style="font-weight: bold;">充值</span></el-button>
          <el-button style="display:inline;width:50%;margin-top:-4px" :disabled="nocard" type="primary" @click="withdrawFormVisible = true"><span style="font-weight: bold;">提现</span></el-button>
        </el-button-group>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="height:212px">
          <div align="center">
              <div style="text-align:left">概况&nbsp;:</div>
              <!--总车位数,剩余车位数,创建时间,更新时间,状态,所属平台,所属服务商,-->
              <div style="font-size:15px;width:350px;text-align:left;padding-top:10px">
                <div class="parkstatus" v-if="roleid==5">所属平台:<span class="statustext">{{account.union_name}}</span></div>
                <div class="parkstatus">{{typename}}状态:<span class="statustext">{{status}}</span></div>
                <div class="parkstatus">创建时间:<span class="statustext">{{common.dateformat(ctime)}}</span></div>
                <div class="parkstatus">更新时间:<span class="statustext">{{common.dateformat(utime)}}</span></div>
              </div>
          </div>
        </el-card>
      </el-col>
      </el-row>

    <!--提现申请-->
		<el-dialog :visible.sync="withdrawFormVisible" :close-on-click-modal="false" size="tiny" @close="closeWithdraw">
            <div slot="title">
                <span style="font-weight: bold;font-size: 18px">提现申请</span> <a href="https://image.bolink.club/bolinkfee.pdf" target="_blank">发票提交说明(点击下载)</a>
            </div>
              <el-col :span="24" style="margin-left:5%" >
                    <el-form :model="withdrawForm" label-width="100px" :rules="withdrawFormRules" ref="withdrawForm" style="width:92%">
                        <div style="width:100%;text-align:center">
                          <div style="color:#888888;font-size:12px;margin-bottom:25px">账户余额为0元时, 本平台会员不能使用余位查询和自动扣费功能</div>
                        </div>
                        <el-form-item label="银行卡 ">
                            <el-input v-model="cardnum" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="提现金额" prop="money">
                            <el-input v-model="withdrawForm.money"></el-input>
                        </el-form-item>
                        <el-form-item label="发票信息" prop="remark">
                            <el-input v-model="withdrawForm.remark"></el-input>
                        </el-form-item>
                    </el-form>
              </el-col>
			<div style="width:100%;text-align:center;margin-bottom:10px">
                <div style="color:#888888;font-size:12px">单笔500元以下,提现手续费3元</div>
            </div>
			<span :span="24" align="right" slot="footer" style="padding-bottom: 20px">
				<el-button @click.native="withdrawFormVisible = false" size="small" style="margin-right: 30px">取消</el-button>
				<el-button type="primary" @click.native="withdrawSubmit" :loading="withdrawLoading" size="small">提交</el-button>
              </span>

    </el-dialog>


    <!--可修改信息-->
    <el-row :gutter="15" style="margin-top:20px">
      <el-col :span="14">
        <el-card class="box-card">
          <div style="text-align:left">{{typename}}信息&nbsp;:</div>
          <el-form :model="account" label-width="110px" ref="editForm" :rules="accountFormRules" style="width:80%;margin-left:30px">
            <el-input v-model="account.id" style="display:none"></el-input>
            <el-form-item label="名称" prop="name" style="height:30px">
              <el-input v-model="account.name"  ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone" style="height:30px">
              <el-input v-model="account.phone" ></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" style="height:30px">
              <el-input v-model="account.address"></el-input>
            </el-form-item>
            </br>
          </el-form>
          <el-col :span="24" align="right" style="margin-bottom: 15px">
            <el-button @click="resetEdit" size="small">重置</el-button>
            <el-button type="primary" @click="editSubmit" size="small" :loading="loading">保存</el-button>
          </el-col>
        </el-card>
      </el-col>
  </el-row>
      <!--///////////////////////////////////////////////////////////////////-->
      <!--提现明细模态-->
      <el-dialog title="提现明细"
                 width="80%"
                 :visible.sync="detailedModelShow"
                 :close-on-click-modal="false"
                 @close="closeWithdraw">
          <el-table :data="gridData" :height="tableHeights">
              <el-table-column property="id" width="100" label="提现编号" ></el-table-column>
              <el-table-column property="date" width="190" label="提现日期" ></el-table-column>
              <el-table-column property="money" width="130" label="提现金额" :formatter="moneyformat"></el-table-column>
              <el-table-column property="fee" width="100" label="手续费" :formatter="feeformat"></el-table-column>
              <el-table-column property="state" width="120" label="提现状态" :formatter="formatterState"></el-table-column>
              <el-table-column property="type" width="100" label="提现方式" :formatter="formatterTypeState"></el-table-column>
              <el-table-column property="trade_no" width="260" label="流水号"></el-table-column>
              <el-table-column property="remark" label="说明"></el-table-column>
          </el-table>

      </el-dialog>
  </section>

</template>

<script>
    import {checkPhone, bolinkPath, percision} from '../../api/api';
    import common from '../../common/js/common'

    export default {
  components:{

  },
  data(){
    return{
        tableHeights:400,
        gridData:[],
        detailedModelShow:false,
      bankCardHeight:'212px',
      roleid:'',
      unionid:'',
      serverid:'',
      operatorid:'',
      loading: false,
      rechargeFormVisible: false,
      withdrawFormVisible: false,
      ctime:'',
      utime:'',
      tempaccount:{},
      account:{
        balance:0,
      },
      rechargeForm:{
        cardid:'',
        money:''
      },
      withdrawForm:{
          money:'',
          remark:''
      },
      withdrawLoading:false,
      rechargeLoading:false,
      withdrawFormRules:{
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
      },
      rechargeFormRules:{},
      editFormRules:{},
      accountFormRules:{
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        phone: [
          { validator:checkPhone, required: true,  trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
      },
      bankname:'无',
      queryaccount:'/union/unioninfo',
      editaccount:'/union/unionedit',
      unionname:'',
      balance:'获取中...',
      name:'获取中...',
      componentStatu:'未提交',
      bigScreen:false,
      typename:'',
      cardnum:'',
      nocard:'',
      status:'',
    }
  },
  mounted(){



    // var user = sessionStorage.getItem('user');
    // if (user) {
    //   user = JSON.parse(user);
    //   this.roleid = user.roleid;
    //   if(this.roleid==2){
    //     this.typename='厂商平台'
    //     this.unionid=user.unionid
    //     this.queryaccount='/union/unioninfo'
    //     this.editaccount='/union/unionedit'
    //   }else if(this.roleid==3){
    //     this.typename='服务商'
    //     this.serverid=user.serverid
    //     this.queryaccount='/server/serverinfo'
    //     this.editaccount='/server/serveredit'
    //     this.bankCardHeight='180px'
    //   }else if(this.roleid==5){
    //    this.typename='运营商'
    //    this.operatorid=user.operatorid
    //    this.queryaccount='/operator/operatorinfo'
    //    this.editaccount='/operator/operatoredit'
    //  }
    // }
  },
  methods: {
      moneyformat:function(row){
         return common.balanceformat(row.money,2);
      },
      feeformat:function(row){
          return common.balanceformat(row.fee,2);
      },
      formatterState:function (row) {
      //        格式化状态
         // console.log(row.state)
          switch (row.state){
              case -1:
                  return '审核未通过'
                  break;
              case 0:
                  return '提现审核中'
                  break;
              case 1:
                  return '提现成功'
              break;
              case 2:
                  return '提现失败'
              break;
              case 3:
                  return '提现处理中'
                  break;
              default:
                  return '提现失败'
          }
      },
      formatterTypeState:function (row) {
          //        格式化状态
         // console.log(row.type)
          switch (row.type){
              case 0:
                  return '手动提现'
                  break;
              case 1:
                  return '自动提现'
                  break;
              default:
                  return '无'
          }
      },
      detailedModelFn:function () {
          //显示提现明细，并赋值
          let vm = this;
          let platform_id = this.unionid;

          this.$axios.post(bolinkPath+"/account/withdrawlist?token="+sessionStorage.getItem('token')+"&platform_id="+platform_id+"&user_type=2").then( res=>{
              let ret = res.data;
              if(ret.state==1){
                  vm.gridData=ret.rows;
              }
          }).catch( err=>{

          })
          vm.tableHeights = (window.screen.availHeight)*0.5;
          vm.detailedModelShow = true;
      },
    editServerComponent(){
                sessionStorage.setItem("component_platformid",'')
				sessionStorage.setItem("component_usertype",3)
				this.active="/servercomponent"
				this.$router.push("/servercomponent");
     },
      /**
       *
       * @获取个人基本信息
       * @function getAccountInfo
       * @param:balance 账户余额
       * @param:name  账户名称
       * @param:unionname 概况那
       * @param:ctime 创建时间
       * @param:utime 更新时间
       * @param:componentStatu 银行卡状态
       * @param:state 状态
       */
    getAccountInfo(){
        let vm=this;
        this.$axios.post(bolinkPath+vm.queryaccount+"?token="+sessionStorage.getItem('token')).then( res =>{
            console.log('get query accountInfo-->',res.data);
            let ret = res.data;
            vm.account=ret;
            let num2=ret.balance.toFixed((percision+1));
            let mun3 = num2.substring(0,num2.lastIndexOf('.')+(percision+1));
            vm.balance = mun3;
            vm.name=ret.name;

            vm.ctime=ret.reg_time;
            vm.utime=ret.update_time;

            switch (ret.state) {
                case 0:
                    vm.status='未审核';
                    break;
                case 1:
                    vm.status='已审核';
                    break;
                case 2:
                    vm.status='禁用';
                    break;
                default:
                    vm.status = '未审核'

            }

            if(ret.state==1){
                vm.status='已审核'
            }else if(ret.state==0){
                vm.status='未审核'
            }else if(ret.state==2){
                vm.status='禁用'
            }
            vm.tempaccount=common.clone(ret)

        }).catch( err =>{

        })
    },
    recharge(){
      window.open(bolinkPath+'/recharge/kftPreRecharg?token='+sessionStorage.getItem('token'));
    },
    resetEdit(){
      this.account=common.clone(this.tempaccount)
    },
    editSubmit(){
      //发送ajax,提交表单更新
      var vm = this;
      var eform=this.account;
      this.$extend(eform,{'token':sessionStorage.getItem('token')})
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          vm.loading=true
          vm.$post(bolinkPath+this.editaccount,eform,function(ret){
            if(ret>0){
              //更新成功
              vm.getAccountInfo();
              vm.$message({
                message: '更新成功!',
                type: 'success',
                duration: 600
              });
              vm.loading=false
            }else{
              //更新失败
              vm.$message({
                message: '更新失败!',
                type: 'error',
                duration: 600
              });
              vm.loading=false
            }
          },"json")
        }
      })
    },
    //获取银行卡信息
    getCardInfo(){
      let vm=this;
      this.$axios.post(bolinkPath+'/account/querycard'+'?token='+sessionStorage.getItem('token')+'&platform_id='+this.unionid+'user_type=2')
          .then( res =>{
              let ret = res.data;
              if(ret.total<1){
                  //无绑定卡
                  vm.nocard = true
              }else{
                  vm.nocard = false;
                  vm.card=ret.rows[0];
                  vm.cardid=ret.rows[0].id;
                  vm.bankname=ret.rows[0].bank_name;
                  vm.cardnum=ret.rows[0].card_number;
              }
          }).catch( err =>{

      })
    },
    closeWithdraw(){
      this.withdrawForm.money=''
    },
    withdrawSubmit(){
       var vm = this
       var wform = {'cardid':this.cardid,'money':this.withdrawForm.money,'remark':this.withdrawForm.remark,'token':sessionStorage.getItem('token')}
       this.$refs.withdrawForm.validate((valid)=>{
         if(valid){
             vm.withdrawLoading=true;
             let wform = new FormData();
             wform.append('cardid',vm.cardid);
             wform.append('money',vm.withdrawForm.money);
             wform.append('remark',vm.withdrawForm.remark);
             wform.append('token',sessionStorage.getItem('token'));
             vm.$axios.post(bolinkPath+'/kftwithdraw/single',wform)
                 .then( res =>{
                     let ret = res.data;
                     if(ret.state){
                         //更新成功
                         vm.getAccountInfo();
                         vm.$message({
                             message: ret.errmsg,
                             type: 'success',
                             duration: 3000
                         });
                         vm.withdrawLoading=false
                         vm.withdrawFormVisible=false
                     }else{
                         //更新失败
                         vm.$message({
                             message: ret.errmsg,
                             type: 'error',
                             duration: 5000
                         });
                         vm.withdrawLoading=false
                     }
                 })
                 .catch( err =>{

                 })
            }
         })
     },
  },
  activated(){
      //取屏幕分辨率
      let screenHeight = window.screen.height
      let screenWidth = window.screen.width
      this.bigScreen =screenWidth>1366;
      this.unionid = sessionStorage.getItem('unionid')
      this.getAccountInfo()
      this.getCardInfo()
	},
  watch:{
    account:function(val,oldVal){
      this.account = val
    }
  }

}

</script>

<style>
.el-button+.el-button {
    margin-left: 0px;
}
.parkstatus{
  margin-top:12px
}
.statustext{
  font-weight:bold;margin-left:10px;color:#9B9EA0
}
    .detailed-style{
        float: right;
        padding: 0 !important;
        margin: 0;
    }
</style>
