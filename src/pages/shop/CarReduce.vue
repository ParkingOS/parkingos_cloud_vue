<template>
    <div>
        <div class="item-header"
             :style="{background:'url('+shopHeaderBg1+') no-repeat',
                   'background-size': '100% 100%'
                   }">
            <p class="item-header__title">减免券</p>
            <div class="item_header__content">
                <p class="item-info__data">{{ticketLimit}}</p>
                <span class="iten-info__company">{{ticketUnit}}</span>
            </div>
        </div>
        <div class="item-content custom-item-content">
            <el-tabs v-model="reductionActiveName" @tab-click="handleClick" :stretch="true">
                <el-tab-pane label="扫码减免" :name="reduction.scanCode">
                    <div class="item-content__scancode">
                        <el-form class="scancode-input custom-form-style" :model="codeReduce" ref="codeReduce" :rules="withdrawFormRules" @submit.native.prevent="submit">
                            <el-form-item prop="reduce">
                                <el-popover
                                        placement="top"
                                        width="304"
                                        v-model="visibleQuota">
                                    <div class="derate-amount">
                                        <span v-for="item in reductionList" @click="selectQuota(item)">{{item}}</span>
                                    </div>
                                    <el-input slot="reference" v-model.trim="codeReduce.reduce" placeholder="输入减免额度" class="custom-input-height" :readonly="readonly"></el-input>
                                </el-popover>
                            </el-form-item>
                        </el-form>
                        <el-checkbox v-model="codeReduce.isauto" style="margin-left: 33px">自动更新</el-checkbox>
                        <div class="shop-common-btn scancode-btn2">
                            <el-button type="primary" @click="getTicketCode" :loading="loading" class="custom-primary-btn" style="width: 144px">获取</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="车辆减免" :name="reduction.vehicle">
                    <div class="item-content__scancode">
                        <el-form class="car-reduction custom-form-style" :model="carNumReduce" ref="carNumReduce" :rules="carNumReduceFormRules" @submit.native.prevent="submit">
                            <el-form-item prop="reduce">
                                <el-popover
                                        placement="top"
                                        width="304"
                                        v-model="visibleCarReduction">
                                    <div class="derate-amount">
                                        <span v-for="item in reductionList" @click="carSelectQuota(item)">{{item}}</span>
                                    </div>
                                    <el-input slot="reference" v-model.trim="carNumReduce.reduce" placeholder="请输入减免额度" class="custom-input-height" :readonly="readonly"></el-input>
                                </el-popover>
                            </el-form-item>
                            <el-form-item prop="car_number" style="position: relative">
                                <el-popover
                                placement="top"
                                width="304"
                                v-model="visibleKeyboard">
                                    <CustomKeyboard v-on:input="keyBoardFn" :keyboardStart="keyboardStart"></CustomKeyboard>
                                    <el-input slot="reference" @change="changeCarNumber" v-model.trim="carNumReduce.car_number" placeholder="请输入车牌号" class="custom-input-height"></el-input>
                                </el-popover>

                            </el-form-item>
                        </el-form>
                        <div class="shop-common-btn scancode-btn">
                            <el-button  @click="getOrderDetail" :loading="currentOrderLoading" plain class="custom-plain-btn">订单</el-button>
                            <el-button type="primary" @click="useTicketByCarNumber" :loading="reduceSubmitLoading" class="custom-primary-btn" style="margin-left: 28px">确定</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="导出减免" :name="reduction.export">
                    <div class="item-content__scancode">
                        <el-form class="car-reduction custom-form-style" :model="educeExportForm" ref="reduceExport" :rules="exportRules">
                            <el-form-item prop="reduce">
                                <el-popover
                                        placement="top"
                                        width="304"
                                        v-model="visibleExportReduction">
                                    <div class="derate-amount">
                                        <span v-for="item in reductionList" @click="reduceSelectQuota(item)">{{item}}</span>
                                    </div>
                                    <el-input slot="reference" v-model.trim="educeExportForm.reduce" placeholder="请输入单张优惠额度" class="custom-input-height" :readonly="readonly"></el-input>
                                </el-popover>
                            </el-form-item>
                            <el-form-item prop="number">
                                <el-input v-model.trim="educeExportForm.number" placeholder="请输入优惠券数量" class="custom-input-height"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="shop-common-btn scancode-btn">
                            <el-button type="primary" @click="exportReduce" :loading="exportReduceLoading" class="custom-primary-btn" style="width: 144px">导出</el-button>
                            <el-popover
                                    placement="top-start"
                                    width="230"
                                    trigger="hover"
                                    content="提示:导出为excel表格，商户可以自己选择普通打印机或者58mm热敏打印机来打印">
                                <i slot="reference" class="el-icon-question" style="color: #A4B2C9;font-size: 22px;margin-left: 24px;cursor: pointer"></i>
                            </el-popover>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--展示二维码-->
        <el-dialog
                center
                top="20vh"
                @close="closeFn"
                custom-class="custom-shop-dialog"
                :visible.sync="qrCodeView">
            <div class="shop-dialog-content">
                <img :src="qrsrc">
            </div>
            <div class="shop-dialog-footer">
                <el-button><a :href="qrsrc" download>保存到本地</a></el-button>
                <el-button type="primary" class="custom-dialog-btn" @click="handleCodeReduce">新建窗口打开</el-button>
            </div>
        </el-dialog>
        <!--当前订单-->
        <el-dialog
                center
                top="20vh"
                custom-class="custom-shop-clear-dialog"
                :visible.sync="currentOrderVisible">
            <div class="current-order-style">
                <div class="order-header">
                    <div class="order-header-item order-header-item__border">
                        <p class="order-header-item__title">停车费用</p>
                        <p class="order-header-item__data">{{currentOrderForm.money}}元</p>
                    </div>
                    <div class="order-header-item">
                        <p class="order-header-item__title">车牌号码</p>
                        <p class="order-header-item__data">{{currentOrderForm.car_number}}</p>
                    </div>
                </div>
                <div class="order-info">
                    <ul v-if="orderInfoVisible">
                        <li><span class="label">停车位置：</span>{{currentOrderForm.park_name}}{{currentOrderForm.separate}}{{currentOrderForm.stop_position}}</li>
                        <li><span class="label">进场时间：</span>{{currentOrderForm.in_time}}</li>
                        <li><span class="label">停车时长：</span>{{currentOrderForm.duration}}</li>
                        <li><span class="label">减免金额：</span><span style="color: #F56D6D">{{currentOrderForm.derate_money}}元</span></li>
                        <li><span class="label">减免时长：</span>{{currentOrderForm.derate_duration}}</li>
                        <li><span class="label">已付金额：</span><span style="color:#3C75CF">{{currentOrderForm.prepay}} 元</span></li>
                    </ul>
                    <div class="order-info-error" v-else>
                        <img style="display: inline-block;width: 167px;height: 167px" src="../../assets/images/shop/order-info-error.png" alt="">
                    </div>
                </div>
            </div>
        </el-dialog>

        <!--canvas 容器隐藏-->
        <canvas id="canvas" style="display:none"></canvas>
        <canvas id="img" style="display:none"></canvas>
    </div>

</template>

<script>

    import { path,server,carditems,checkPhone,checkMoney,checkNumber,dtypelist,cardtypeitems,otypelist,accountitems,belongitems,settleitems,percision } from '../../api/api';
    import common from '../../common/js/common'
    import CustomKeyboard from '../../components/CustomKeyboard'
    export default {
        components:{
            CustomKeyboard
        },
        props:{
            ticketLimit:{
                type:String,
                defalut:'获取中...'
            },
            ticketUnit:{
                type:String,
                defalut:'元'
            },
            reductionList:{
                type:Array,
                default:function () {
                    return []
                }
            },
        },
        data(){
            return{
                timer:null,
                keyboardStart:'text',
                visibleKeyboard:false,
                visibleExportReduction:false,
                exportReduceLoading:false,
                reduceSubmitLoading:false,
                educeExportForm:{
                    reduce:'',
                    number:'',
                },
                exportRules:{
                    reduce: [
                        { validator:checkMoney,required: true,  trigger: 'change' }
                    ],
                    number: [
                        { validator:checkNumber,required: true,  trigger: 'blur' }
                    ]
                },
                orderInfoVisible:true,
                currentOrderForm:{
                    separate:'',
                    stop_position:'',
                    derate_duration:'',
                    derate_money:'',
                    prepay:'',
                    money:'',
                    car_number:'',
                    in_time:'',
                    park_name:'',
                    duration:'',
                },
                currentOrderLoading:false,
                currentOrderVisible:false,
                visibleCarNumber:false,
                carNumReduceFormRules:{
                    reduce: [
                        { required: true, message: '请输入减免额度'},
                        { validator:checkMoney, message: '额度必须为数字值'}
                    ],
                    car_number:[
                        { required: true, message: '请输入车牌号'},
                        {
                            min: 7,
                            max: 10,
                            message: '长度在 7 到 10 个字符'
                        },
                    ]
                },
                visibleCarReduction:false,
                carNumReduce:{
                    reduce:'',
                    car_number:''
                },
                qrCodeView:false,
                withdrawFormRules:{
                    reduce: [
                        { required: true, message: '请输入减免额度'},
                        { validator:checkMoney, message: '额度必须为数字值'}
                    ],
                },
                loading: false,
                // reductionList:undefined,
                visibleQuota:false,
                codeReduce:{
                    reduce:'',
                    isauto:false,
                },
                reductionActiveName:'scanCode',
                reduction:{
                    scanCode:'scanCode',
                    vehicle:'vehicle',
                    export:'export'
                },
                shopHeaderBg1:require('../../assets/images/shop/shop-header-bg.png'),
                shopHeaderBg2:require('../../assets/images/shop/shop-header-bg2.png'),
                shopBgImg:require('../../assets/images/shop/shop-admin-bgimg.png'),
                qrsrc:'',
                ticket_url:'',
                //  -----------------------------------------------------------------
                accountModify:{
                    id:'',
                    name:'',
                    address:'',
                    phone:''
                },
                codeReduce:{
                    reduce:'',
                    isauto:false,
                },
                carNumReduce:{
                    reduce:'',
                    car_number:'',
                },
                exportModel:{
                    reduce:'',
                    number:'',
                },
                // ticketUnit:'元',
                // ticketLimit:'获取中...',
                type:'3',
                code:'',
                freecode:'',
                ticket_url:'',
                free_ticket_url:'',
                noStation:false,
                account:{},
                card:{},
                cardid:'',

                freeqrsrc:'',
                nocard:false,
                bankname:'无',
                cardnum:'暂未绑定银行卡',
                shopname:'获取中...',

                ticketfree_limit:'获取中...',
                readonly:false,
            }
        },
        mounted(){
            this.getShopAccountInfo()
        },
        methods:{
            closeFn(){
                console.log('关闭了弹窗')
                clearInterval(this.timer)
            },
            changeCarNumber(val){
                this.carNumReduce.car_number = val.toUpperCase()
            },
            keyBoardFn(val){
                this.carNumReduce.car_number = this.carNumReduce.car_number.concat(val)
                if(this.carNumReduce.car_number.length>0){
                  this.keyboardStart = 'num';
                }else{
                    this.keyboardStart = 'text';
                }
            },
            handleClick(row){
                this.codeReduce={
                    reduce:'',
                    isauto:false,
                }
                this.carNumReduce = {
                    reduce:'',
                    car_number:''
                };
                this.educeExportForm = {
                    reduce:'',
                        number:'',
                }
                if(row.index == 0){
                    this.$refs['codeReduce'].clearValidate()
                }
                if(row.index == 1){
                    this.$refs['carNumReduce'].clearValidate()
                }
                if(row.index == 2){
                    this.$refs['reduceExport'].clearValidate()
                }

            },
            tabClick(){

            },
            reduceSelectQuota(val){
                this.educeExportForm.reduce = +val;
                this.visibleExportReduction = false;
            },
            //导出减免
            exportReduce(){
                let vm = this;
                vm.$refs.reduceExport.validate((valid) => {
                    if (valid) {
                        vm.exportReduceLoading = true;
                        vm.$axios.post(path+"/shopticket/exportcode?shop_id="+sessionStorage.getItem('shopid')+"&uin="+sessionStorage.getItem('loginuin')+"&number="+vm.educeExportForm.number+"&type="+vm.type+"&reduce="+vm.educeExportForm.reduce,{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

                            }
                        }).then(function (response) {
                            vm.exportReduceLoading = false;
                            let ret = response.data;
                            if(ret.state==1){
                                window.location.href = path + "/shopticket/export?code="+ret.code;
                                vm.$emit('refresh')
                            }else{
                                vm.$message({
                                    message: ret.error,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                        });
                    }
                });

            },
            //车牌减免
            useTicketByCarNumber(){
                let vm = this;
                vm.$refs.carNumReduce.validate((valid) => {
                    if (valid) {
                        vm.reduceSubmitLoading = true;
                        vm.$axios.post(server+"/zld/shopticket?action=noscan&shop_id="+sessionStorage.getItem('shopid')+"&uin="+sessionStorage.getItem('loginuin')+"&car_number="+encodeURI(encodeURI(vm.carNumReduce.car_number))+"&type="+vm.type+"&reduce="+vm.carNumReduce.reduce,{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            vm.reduceSubmitLoading = false;
                            let ret = response.data;
                            //var ret = eval('('+result+')')
                            if(ret.result==1){
                                vm.$message({
                                    message: '用券成功!',
                                    type: 'success',
                                    duration: 1200
                                });
                                vm.$emit('refresh')
                            }else{
                                vm.$message({
                                    message: ret.error,
                                    type: 'error',
                                    duration: 1200
                                });
                            }

                        });
                    }
                });

            },
            //获取当前订单
            getOrderDetail(){
                let vm = this;
                vm.currentOrderForm = {
                    separate:'',
                    stop_position:'',
                    derate_duration:'---',
                    derate_money:'---',
                    prepay:'---',
                    money:'---',
                    car_number:'---',
                    in_time:'---',
                    park_name:'---',
                    duration:'---',
                }
                vm.$refs.carNumReduce.validate((valid) => {
                    if (valid) {
                        vm.currentOrderLoading = true;
                        vm.orderInfoVisible = true;
                        vm.$axios.post(server+"/zld/shopticket?action=getorderdetail&comid="+sessionStorage.getItem('comid')+"&car_number="+encodeURI(encodeURI(vm.carNumReduce.car_number))+"&reduce="+vm.carNumReduce.reduce,{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            console.log('ret',ret);
                            vm.currentOrderLoading = false;
                            if(ret.state==1||ret.state==2){
                                vm.currentOrderVisible = true;
                                vm.currentOrderForm.money=ret.money;
                                vm.currentOrderForm.car_number=ret.plate_number;
                                vm.currentOrderForm.in_time=ret.start_time;
                                vm.currentOrderForm.park_name=ret.park_name;
                                vm.currentOrderForm.duration=ret.duration;
                                if(ret.position&&ret.park_name){
                                    vm.currentOrderForm.separate='-';
                                }
                                if(ret.position){
                                    vm.currentOrderForm.stop_position=ret.position;
                                }
                                if(ret.derate_money){
                                    vm.currentOrderForm.derate_money=ret.derate_money;
                                }
                                if(ret.prepay){
                                    vm.currentOrderForm.prepay=ret.prepay;
                                }
                                if(ret.derate_duration){
                                    vm.currentOrderForm.derate_duration=ret.derate_duration;
                                }
                            }else if(ret.state==0||ret.state==3){
                                let errmsg = '';
                                if(ret.errmsg.indexOf('<br/>')>-1){
                                    errmsg = ret.errmsg.replace('<br/>',',');
                                }else{
                                    errmsg = ret.errmsg
                                }
                                vm.$message({
                                    message: errmsg,
                                    type: 'warning',
                                    duration: 3000
                                });
                            }else{
                                vm.$message({
                                    message: ret.error,
                                    type: 'error',
                                    duration: 2000
                                });
                                vm.currentOrderVisible = true;
                                vm.orderInfoVisible = false;
                            }
                        });
                    }
                });
            },
            //获取减免二维码
            getTicketCode(){
                let vm = this;
                vm.$refs.codeReduce.validate((valid) => {
                    if (valid) {
                        vm.loading = true;
                        vm.$axios.post(path+"/shopticket/createticket?shopid="+sessionStorage.getItem('shopid')+"&uin="+sessionStorage.getItem('loginuin')+"&type="+vm.type+"&reduce="+vm.codeReduce.reduce+"&isauto="+(vm.codeReduce.isauto?1:0),{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            vm.loading = false;
                            let ret = response.data;
                            if(ret.state==1){
                                vm.code = ret.code;
                                vm.ticket_url = ret.ticket_url;
                                //第一次获取成功后，开启定时任务
                                if(vm.qrCodeView == false){
                                    vm.timer = window.setInterval(vm.getCodeStatus,10000)
                                }
                                vm.genqr(vm.ticket_url)
                                vm.$emit('refresh')
                            }else{
                                vm.$message({
                                    message: "获取失败" + ret.error,
                                    type: 'error',
                                    duration: 1200
                                });
                            }

                        });
                    }
                });

            },
            genqr(url){
                var canvas = document.getElementById('canvas')
                this.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {
                    if (error){} else{}
                })
                var context=canvas.getContext('2d');
                var imageData = context.getImageData(0,0,canvas.width,canvas.height);

                var img = document.getElementById("img");
                img.width=canvas.width
                img.height=canvas.height
                var context2 = img.getContext('2d');
                context2.fillStyle="white";
                context2.fillRect(0,0,canvas.width,(canvas.height));
                context2.putImageData(imageData,0,0);
                context2.font="bold 10px 微软雅黑"
                context2.fillStyle="black"

                var url = img.toDataURL("image/png");
                this.qrsrc = url;
                this.qrCodeView = true;
            },
            //扫码减免
            selectQuota(val){
                this.codeReduce.reduce = +val;
                this.visibleQuota = false;
            },
            carSelectQuota(val){
                this.carNumReduce.reduce = +val;
                this.visibleCarReduction = false;
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

                    if(ret.hand_input_enable==1){
                        vm.readonly=false;
                    }else{
                        vm.readonly=true;
                    }

                    vm.shopname=ret.name;
                    if(ret.ticket_unit==1){
                        // vm.ticketLimit=ret.ticket_limit;
                        // vm.ticketUnit = '分钟'
                    }else if(ret.ticket_unit==2){
                        // vm.ticketLimit=ret.ticket_limit;
                        // vm.ticketUnit = '小时'
                    }
                    else if(ret.ticket_unit==3){
                        // vm.ticketLimit=ret.ticket_limit;
                        // vm.ticketUnit = '天';
                    }else if(ret.ticket_unit==4){
                        // vm.ticketLimit=ret.ticket_money;
                        // vm.ticketUnit = '元';
                        vm.type = '5'
                    }
                    vm.accountModify.id=ret.id;
                    vm.accountModify.name=ret.name;
                    vm.accountModify.address=ret.address;
                });
            },
            //新打开页面
            handleCodeReduce() {
                let routeData = this.$router.resolve({
                    name: "CodeReduce",
                });
                let parems = "?"+this.type+'-'+this.codeReduce.reduce+'-'+this.codeReduce.isauto
                window.open(routeData.href+parems, '_blank');
            },
            getCodeStatus(){
                let vm = this;
                vm.$axios.post(path+"/shopticket/ifchangecode?code="+vm.code,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if(ret.state==1){
                        vm.getTicketCode();
                        vm.$message({
                            message: "二维码已更新" ,
                            type: 'success',
                            duration: 1200
                        });
                    }
                });
            },
        },
        activated(){

        },
        watch:{
            account:function(val,oldVal){
                this.account = val
            },
            'carNumReduce.car_number':function (newVal,oldVal) {
                if(newVal.length>0){
                    this.keyboardStart = 'num';
                }else{
                    this.keyboardStart = 'text';
                }
            }
        }



    }

</script>

<style lang="scss" scoped>

</style>