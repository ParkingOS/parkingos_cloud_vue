<template>
  <section style="padding: 10px;">

    <!--账户名称-->
    <el-row>
      <el-col :span="24" style="font-size: 18px;font-weight: bold;">
           &nbsp;商户名称: <span style="color: red">{{shopname}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-top:28px" >

      <el-col :span="15">
      <el-col :span="12" >
        <el-card class="box-card" style="height:180px">
          <div>
            <div><span  style="font-size:20px">减免券:</span></div>
            <div style="text-align:center;margin-top:45px;color:#9B9EA0;font-size:22px;font-weight:bold;">{{ticketLimit+ticketUnit}}</div>
          </div>
        </el-card>
            <el-button-group style="width:100%">
                  <el-button style="display:inline;width:50%;margin-top:-4px" @click="withdrawFormVisible = true" type="primary" >扫码减免</el-button>
                  <el-button style="display:inline;width:50%;margin-top:-4px" @click="setupVisible = true" type="primary" >车牌减免</el-button>
            </el-button-group>
      </el-col>

       <el-col :span="12" >
           <el-card class="box-card" style="height:180px">
             <div>
               <div>全免券:</div>
               <div style="text-align:center;margin-top:45px;color:#9B9EA0;font-size:22px;font-weight:bold;">{{ticketfree_limit+'张'}}</div>
             </div>
           </el-card>
           <el-button-group style="width:100%">
                     <el-button style="display:inline;width:50%;margin-top:-4px" @click="setupVisible = true" type="primary" >扫码减免</el-button>
                     <el-button style="display:inline;width:50%;margin-top:-4px" @click="setupVisible = true" type="primary" >车牌减免</el-button>
           </el-button-group>
       </el-col>

      <el-col :span="24" style="margin-top:20px">
        <el-card class="box-card" style="height:220px">
          <div>
            <div>商户信息:</div>
            <div style="">
              <el-row style="padding:20px;padding-left:1px">
                 <el-form ref="accountModify" :model="accountModify" label-width="100px" :rules="accountFormRules" style="width:85%">
                    <el-form-item label="商户名称" prop="name">
                      <el-input v-model="accountModify.name"></el-input>

                    </el-form-item>
                    <el-form-item label="商户地址" prop="address">
                      <el-input v-model="accountModify.address"></el-input>
                    </el-form-item>
                    <el-form-item label="车场电话" prop="phone" style="display:none">
                      <el-input v-model="accountModify.phone"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-col :span="24" align="right" style="margin-bottom: 15px">
                    <el-button @click="resetEdit" size="small">重置</el-button>
                    <el-button type="primary" @click="editSubmit" size="small" :loading="loading">保存</el-button>
                  </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      </el-col>

      <el-col :span="9" style="margin-left:-8px">
        <el-card class="box-card" style="height:455px">
          <div align="center">
              <div style="text-align:left">商户设置&nbsp;:</div>
              <!--总车位数,剩余车位数,创建时间,更新时间,状态,所属平台,所属服务商,-->
              <div style="">
                <el-row style="padding:20px;padding-left:1px">
                   <el-form ref="infoModify" :model="infoModify" label-width="110px"  style="width:85%">

                      <el-form-item label="默认显示额度" prop="default_limit">
                        <el-input v-model="infoModify.default_limit"></el-input>
                      </el-form-item>
                      <el-form-item label="有效期/小时" prop="validite_time">
                        <el-input v-model="infoModify.validite_time"></el-input>
                      </el-form-item>
                      <el-form-item label="手输额度" prop="hand_input_enable" >
                        <el-select v-model="infoModify.hand_input_enable">
                          <el-option
                              v-for="item in handInputType"
                              :label="item.value_name"
                              :value="item.value_no">
                          </el-option>
                        </el-select>
                      </el-form-item>

                    </el-form>
                    <el-col :span="24" align="right" style="margin-bottom: 15px">
                      <el-button @click="inforesetEdit" size="small">重置</el-button>
                      <el-button type="primary" @click="infoEditSubmit" size="small" :loading="infoloading">保存</el-button>
                    </el-col>
                </el-row>
              </div>
          </div>
        </el-card>
     </el-col>
    </el-row>
    <!--提现申请-->
	<el-dialog title="扫码减免" center="true" :visible.sync="withdrawFormVisible" :close-on-click-modal="false"  @close="closeWithdraw">
        <el-col :span="24" style="margin-left:5%" >
            <el-form :model="withdrawForm" label-width="80px" :rules="withdrawFormRules" ref="withdrawForm">
				<el-form-item >
					<el-input v-model="setup.reduce" style="width:65%" placeholder="输入优惠时长"></el-input>
					<el-button @click="getTicketCode" type="primary" size ="small">获 取</el-button>
				</el-form-item>
                 <el-form-item label="自动更新" >
                     <div>
                       <el-checkbox id="box" v-model="setup.isauto" ></el-checkbox>
                     </div>
                </el-form-item>
		    </el-form>
        </el-col>
	</el-dialog>

    </el-form>
        <el-dialog title="车牌减免" center="true" :visible.sync="setupVisible" :close-on-click-modal="false" size="tiny" @close="closesetup">
            <el-col :span="24" style="margin-left:5%" >
                <el-form :model="setup" label-width="110px" ref="setup">
                    <el-form-item >
                        <el-input v-model="setup.reduce" style="width:65%" placeholder="输入车牌号"></el-input>
                        <el-button @click="getTicketCode" type="primary" size ="small">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-dialog>
  </section>

</template>

<script>
import { path,carditems,checkPhone,dtypelist,cardtypeitems,otypelist,accountitems,belongitems,settleitems,percision } from '../../api/api';
import common from '../../common/js/common'
import CommonTable from '../../components/CommonTable'

export default {
  components:{
    CommonTable
  },
  data(){
    return{
      loading: false,
      infoloading: false,
      cycleisdisable:false,
      moneyisdisable:false,
      checkisdisable:false,
      withdrawFormVisible:false,
      setupVisible:false,
      addloading:false,
      setup:{
        reduce:'',
        isauto:false,
      },
      handInputType: [
          {'value_name': '不支持', 'value_no': '0'},
          {'value_name': '支持', 'value_no': '1'}
      ],
      withdrawLoading:false,
      ticketUnit:'元',
      type:'3',
      code:'',
      noStation:false,
      account:{},
      card:{},
      cardid:'',
      nocard:false,
      bankname:'无',
      cardnum:'暂未绑定银行卡',
      shopname:'获取中...',
      ticketLimit:'获取中...',
      ticketfree_limit:'获取中...',

      withdrawForm:{
        money:''
      },
      form:{
        name:''
      },
      status:'',

      infoModify:{
        id:'',
        hand_input_enable:'',
        validite_time:'',
        default_limit:''
      },
      accountModify:{
        id:'',
        name:'',
        address:'',
        phone:''
      },
      parkstations:[],
      temp:{},
      infotemp:{},
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
      withdrawFormRules:{
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
      },
    }
  },
  mounted(){
  },
  methods: {
    selectChecked(){
        var vm=this;
        window.setTimeout(()=> {
            if(vm.checkisdisable){

            }else{
                vm.moneyisdisable = false
                vm.cycleisdisable = false
                if(!vm.setup.checked){
                    vm.setup.money=""
                    vm.setup.cycle=""
                    vm.moneyisdisable = true
                    vm.cycleisdisable = true
                }else{
                     vm.moneyisdisable = false
                     vm.cycleisdisable = false
                }
            }
        },0)
    },
    cycleinputFunc(){
     var vm=this;
     vm.moneyisdisable = false
     vm.checkisdisable = false
     if(this.setup.cycle!=null&&this.setup.cycle!=""){
        vm.setup.money=""

     }
    },
     moneyinputFunc(){
         var vm=this;
         vm.cycleisdisable = false
         vm.checkisdisable = false
         if(this.setup.money!=null&&this.setup.money!=""){
            vm.setup.cycle=""

         }
        },
    getAutoWithDraw(){

         var vm=this;
        			this.$post(path+"/park/autoWithdrawalMoney?token="+sessionStorage.getItem('token'),function(result){
                var ret = eval('('+result+')')
                vm.account=ret;
                if(ret.withdrawal_money>0){
                    vm.setup.money = ret.withdrawal_money
                    vm.setup.oldmoney = ret.withdrawal_money
                }
                if(ret.withdrawal_cycle>0){
                    vm.setup.cycle = ret.withdrawal_cycle
                    vm.setup.oldcycle = ret.withdrawal_cycle
                }
                if(ret.withdrawal_money==0&&ret.withdrawal_cycle==0){
                    vm.setup.checked = false
                    vm.moneyisdisable = true
                    vm.cycleisdisable = true
                }

              });
    },
    getCodeStatus(){
         let vm = this;
        vm.$axios.post(path+"/shopticket/ifchangecode?code="+vm.code,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (response) {
          let ret = response.data;
          console.log('陈博文'+ret.state);
          if(ret.state==1){
             //this.$options.methods.getTicketCode();
          }
        });
    },
    getTicketCode(){
            let vm = this;
            vm.$axios.post(path+"/shopticket/createticket?shopid="+sessionStorage.getItem('shopid')+"&type="+vm.type+"&reduce="+vm.setup.reduce+"&isauto="+(vm.setup.isauto?1:0),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (response) {
                let ret = response.data;
                //var ret = eval('('+result+')')
                if(ret.state==1){
                    vm.code = ret.code;
                }else{
                    vm.$message({
                        message: "获取失败" + ret.error,
                        type: 'error',
                        duration: 1200
                    });
                }

            });
    },
    getShopAccountInfo(){
      let vm = this;
      vm.$axios.post(path+"/shopaccount/shopinfo?id="+sessionStorage.getItem('shopid'),{
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
      }).then(function (response) {
        let ret = response.data;
        //var ret = eval('('+result+')')
        vm.account=ret;
        if(ret.hand_input_enable==1){
             vm.infoModify.hand_input_enable='支持';
        }else{
            vm.infoModify.hand_input_enable='不支持';
        }
        vm.shopname=ret.name
        if(ret.ticket_unit==1){
            vm.ticketLimit=ret.ticket_limit
            vm.ticketUnit = '分钟'
        }else if(ret.ticket_unit==2){
            vm.ticketLimit=ret.ticket_limit
            vm.ticketUnit = '小时'
        }
        else if(ret.ticket_unit==3){
            vm.ticketLimit=ret.ticket_limit
            vm.ticketUnit = '天'
        }else if(ret.ticket_unit==4){
             vm.ticketLimit=ret.ticket_money
             vm.ticketUnit = '元'
             vm.type = '5'
         }

        vm.ticketfree_limit=ret.ticketfree_limit
        vm.accountModify.id=ret.id
        vm.accountModify.name=ret.name
        vm.accountModify.address=ret.address
        vm.infoModify.id=ret.id
        vm.infoModify.default_limit=ret.default_limit
        vm.infoModify.validite_time=ret.validite_time
        vm.temp=common.clone(vm.accountModify)
        vm.infotemp=common.clone(vm.infoModify)
      });
    },
    resetEdit(){
      this.accountModify=common.clone(this.temp)
    },
     inforesetEdit(){
      this.infoModify=common.clone(this.infotemp)
    },
    closeWithdraw(){
      this.withdrawForm.money=''
    },
     closesetup(){
          this.setup.cycle = this.setup.oldcycle
          this.setup.money = this.setup.oldmoney
        },
  },
  activated(){
      //this.getAutoWithDraw()
      this.getShopAccountInfo()

      window.setInterval(this.getCodeStatus,2000000)
      //this.getParkCardInfo()
      //this.getParkStatus()
      //window.setInterval(this.getParkStatus,10000)
      //window.setInterval(this.getParkAccountInfo,120000)
	},
  watch:{
    account:function(val,oldVal){
      this.account = val
    }
  }

}

</script>

<style>
  .parkstatus{
    margin-top:5px
  }
  .statustext{
    font-weight:bold;margin-left:10px;color:#9B9EA0
  }
</style>