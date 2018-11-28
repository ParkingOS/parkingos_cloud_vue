<template>
  <section class="right-wrapper-size">
      <header class="shop-custom-header">
          <p>商户管理<span style="margin: 2px">-</span>商户管理</p>
      </header>
      <div class="shop-info"
           :style="{'background': 'url('+shopBgImg+') no-repeat,#fff',
           'background-size': '234px 100px',
           'background-position':'95% center'
           }">
        <div class="shop-info-title"><span class="shop-info-title-icon"></span>商户信息</div>
          <div class="shop-info-content">
              <p class="shop-name"><label>商户名称:</label>{{accountModify.name}}</p>
              <p class="shop-address"><label>商户地址:</label>{{accountModify.address}}</p>
          </div>
      </div>
      <div class="shop-coupon-info">
          <div class="shop-info-item">
              <CarReduce
                      v-on:refresh="refreshFn"
                      :reductionList="reductionList"
                      :ticketUnit="ticketUnit"
                      :ticketLimit="ticketLimit"></CarReduce>
          </div>
          <div class="shop-info-item shop-info__margin">
              <FreeCarReduce
                      :reductionList="reductionList"
                      ticketUnit="张"
                      :ticketLimit="ticketfree_limit"
                      v-on:refresh="refreshFn"
              ></FreeCarReduce>
          </div>
          <div class="shop-info-item shop-info__flex" style="position: relative">
              <div class="in-development">
                  <img :src="inDev">
                  <p>功能正在开发</p>
              </div>
          </div>
      </div>

  </section>

</template>

<script>
import { path,server,carditems,checkPhone,checkMoney,checkNumber,dtypelist,cardtypeitems,otypelist,accountitems,belongitems,settleitems,percision } from '../../api/api';
import common from '../../common/js/common'
import CarReduce from './CarReduce'
import FreeCarReduce from './FreeCarReduce'

export default {
  components:{
      CarReduce,FreeCarReduce
  },
  data(){
    return{
        ticketfree_limit:'获取中...',
        ticketLimit:'获取中...',
        ticketUnit:'元',
        reductionList:[],
        inDev:require('../../assets/images/shop/in-dev.png'),
        shopBgImg:require('../../assets/images/shop/shop-admin-bgimg.png'),
      //  -----------------------------------------------------------------
      infoloading: false,
      cycleisdisable:false,
      moneyisdisable:false,
      checkisdisable:false,
      withdrawFormVisible:false,
      freeCodeVisible:false,
      setupVisible:false,
      exportVisible:false,
      freeCarNumberVisible:false,
      addloading:false,
      disable:false,
      codeReduce:{
        reduce:'',
        isauto:false,
      },
      freeCodeReduce:{
          reduce:'全免券',
          isauto:false,
      },
      carNumReduce:{
         reduce:'',
         car_number:'',
      },
      freecarNumReduce:{
         reduce:'全免券',
         car_number:'',
     },
     exportModel:{
        reduce:'',
        number:'',
     },
      handInputType: [
          {'value_name': '不支持', 'value_no': '0'},
          {'value_name': '支持', 'value_no': '1'}
      ],
      withdrawLoading:false,

      type:'3',
      code:'',
      freecode:'',
      ticket_url:'',
      free_ticket_url:'',
      noStation:false,
      account:{},
      card:{},
      cardid:'',
      qrsrc:'',
      freeqrsrc:'',
      nocard:false,
      bankname:'无',
      cardnum:'暂未绑定银行卡',
      shopname:'获取中...',
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
      infoFormRules:{
        default_limit: [
          { required: true, message: '请输入默认显示额度', trigger: 'blur' }
        ],
        validite_time: [
          { required: true, message: '请输入有效期',  trigger: 'blur' }
        ]
      },
    }
  },
    mounted(){
    },
    methods:{
        refreshFn(){
            this.getShopAccountInfo()
        },
        //获取基本信息
        getShopAccountInfo(){
            let vm = this;
            vm.$axios.post(path+"/shopaccount/shopinfo?id="+sessionStorage.getItem('shopid'),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (response) {
                let ret = response.data;

                vm.shopname=ret.name
                if(ret.ticket_unit==1){
                    vm.ticketLimit=ret.ticket_limit+''
                    vm.ticketUnit = '分钟'
                }else if(ret.ticket_unit==2){
                    vm.ticketLimit=ret.ticket_limit+''
                    vm.ticketUnit = '小时'
                }
                else if(ret.ticket_unit==3){
                    vm.ticketLimit=ret.ticket_limit+''
                    vm.ticketUnit = '天'
                }else if(ret.ticket_unit==4){
                    vm.ticketLimit=ret.ticket_money+''
                    vm.ticketUnit = '元'
                    vm.type = '5'
                }
                vm.accountModify.id=ret.id
                vm.accountModify.name=ret.name
                vm.accountModify.address=ret.address
                vm.reductionList = ret.default_limit.split(',')
                vm.ticketfree_limit=ret.ticketfree_limit+''
                //----------------------------------------------------------

            });
        },
    },
    activated(){
        this.getShopAccountInfo()
    },
    watch:{
        account:function(val,oldVal){
            this.account = val
        }
    }



}

</script>

<style lang="scss">
    //商户端公用样式
    .shop-info{
        padding: 15px 28px;
        margin: 20px;
        background: #FFFFFF;
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.03);
        border-radius: 2px;
        .shop-info-title{
            margin-bottom: 23px;
            padding: 0;
                position: relative;
                font-size: 18px;
                font-weight: bold;
                color: #363636;
                .shop-info-title-icon{
                    position: absolute;
                    left: -16px;
                    top:2px;
                    display: inline-block;
                    width: 2px;
                    height: 20px;
                    background: #576FDA;
            }
    }
        .shop-info-content{
            p{
                font-size: 16px;
                color: #363636;
                label{
                    margin-right: 5px;
            }
        }
            p.shop-name{
                margin-bottom: 18px;
        }
            p.shop-address{
                padding-bottom: 10px;
        }
    }
    }
    .shop-coupon-info{
        display: flex;
        align-items: stretch;
        height: 428px;
        margin: 0 20px;
        .shop-info-item{
            width: 370px;
            height: 100%;
            background: #FFFFFF;
            box-shadow: 0 5px 8px 0 rgba(0,0,0,0.03);
            border-radius: 4px 4px 2px 2px;
            .item-header{
                padding-top: 20px;
                padding-left: 74px;
                height: 80px;
                background-image: linear-gradient(-163deg, #FFE06D 0%, #D96E13 100%);
                color: #FFFFFF;
                .item-header__title{
                    font-size: 16px;
                }
                .item_header__content{
                    margin-top: 7px;
                    .item-info__data{
                        display: inline-block;
                        font-size: 36px;
                    }
                    .iten-info__company{
                        font-size: 16px;
                    }

                }
            }
            .item-content{
                .item-content__scancode{
                    position: relative;
                    top:0;
                    width: 370px;
                    height: 278px;
                    background: rgba(216,216,216,0.07);
                    .scancode-input{
                        padding: 26px 33px;
                        .el-form-item{
                            margin: 0;
                        }
                    }
                    .scancode-btn{
                        position: absolute;
                        width: 100%;
                        bottom: 53px;
                        /*margin-top: 39px;*/
                        text-align: center;
                    }
                    .scancode-btn2{
                        position: absolute;
                        width: 100%;
                        bottom: 28px;
                        text-align: center;
                    }
                    /*车牌减免*/
                    .car-reduction{
                        padding: 0 33px;
                        .el-form-item{
                            margin: 0;
                            margin-top: 25px;
                        }
                    }
                }
            }
        }
        .shop-info__margin{
            margin: 0 28px;
        }
        .shop-info__flex{
            flex: 1;
        }
    }
    .derate-amount{
        span{
            display: inline-block;
            background: #FBFEFF;
            border: 1px solid #D4D4D4;
            border-radius: 2px;
            width: 50px;
            height: 28px;
            line-height: 28px;
            margin-right: 5px;
            text-align: center;
            margin-bottom: 5px;
            cursor: pointer;
        }
    }
    .current-order-style{
        padding-top: 14px;
        .order-header{
            padding: 23px 0;
            display: flex;
            align-items: center;
            justify-content:center;
            box-shadow: 0 5px 8px 0 rgba(0,0,0,0.03);
            border-radius: 6px 6px 0 0;
            .order-header-item{
                height: 48px;
                flex: 1;
                text-align: center;
                .order-header-item__title{
                    font-size: 22px;
                    color: #363636;
                    font-weight: 500;
                }
                .order-header-item__data{
                    font-size: 18px;
                    color: #3C75CF;
                }
            }
            .order-header-item__border{
                border-right: 1px dotted #979797 ;
            }
        }
        .order-info{
            padding: 28px 60px 18px 60px;
            font-size: 18px;
            color: #363636;
            ul{
                li{
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    .label{
                        display: inline-block;
                        width: 90px;
                    }
                }
            }
            .order-info-error{
                text-align: center;
            }
        }
    }
    .in-development{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        img{
            width: 257px;
            height: 158px;
        }
        p{
            margin-top: 27px;
            font-size: 16px;
            color: #4F4F4F;
        }
    }
</style>