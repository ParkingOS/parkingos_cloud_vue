<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">增值服务<span style="margin: 2px">-</span>小程序收费</p>
                <div class="float-right"><el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button></div>
            </header>
            <div class="showcase">
                <!--<p>有效期剩余<span class="sms-count"><countTo :startVal='0' :endVal='message_count' :duration='1000'></countTo></span>天</p>-->
                <div class="purchase" @click="goshop">
                    <img :src="shopCar">购买
                </div>
                <p class="shop-tip"><i class="el-icon-question" style="margin-right: 10px"></i>员工账号所属角色勾选“登录小程序”，且购买该服务后，在有效期内可登录小程序场内预付收费</p>
            </div>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search" v-if="active">
                    <div class="console-main">
                        <el-form-item label="续费时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentData"
                                    type="datetimerange"
                                    range-separator="至"
                                    :default-time="['00:00:00','23:59:59']"
                                    start-placeholder="请输入时间"
                                    end-placeholder="请输入时间"
                                    value-format="timestamp"
                                    @change="changeDateFormat"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button type="primary" style="width: 120px" @click="exportFn" v-if="hideExport">导出</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>

        <!--table-->
        <div class="table-wrapper-style">
            <div class="custom-tab-wrapper">
                <div class="tab-item-wrapper">
                    <div :class="active?'tab-item tab-item-active':'tab-item'" >充值流水</div>
                </div>
            </div>
            <div v-if="active">
                <tab-pane
                        :stripe="true"
                        :queryapi="queryapi"
                        :orderfield="orderfield"
                        :fieldsstr="fieldsstr"
                        :exportapi="exportapi"
                        :table-items="tableitems"
                        align-pos="right"
                        :searchForm="searchForm"
                        fixedDom="scrollBarDom"
                        v-on:transferData="transferData"
                        ref="tabPane"
                ></tab-pane>
            </div>
        </div>

        <!--购买-->
        <el-dialog
                custom-class="shop-fixedCode-dialog"
                :show-close="false"
                :visible.sync="purchaseSMSVisible"
                @close="closeFn">
            <header class="fixed-code__title" slot="title" style="font-size: 18px;font-weight: bold;">
                购买<i class="el-icon-close dialog-header-iconfont" @click="purchaseSMSVisible=false"></i>
            </header>
            <el-steps :active="activeIndex" simple style="padding: 18px 20%;">
                <el-step title="数量选择" icon="icon"></el-step>
                <el-step title="扫码支付" icon="icon"></el-step>
            </el-steps>
            <el-form ref="addForm" label-width="80px" :model="purchaseSMS" class="custom-form-style fiexd-code-form" :rules="rules">
                <div v-show="activeIndex == 1">
                    <el-form-item label="登录账号" prop="username">
                        <el-select v-model="purchaseSMS.username" filterable style="width: 292px" @change="changeUsername">
                            <el-option
                                    v-for="item in collectors"
                                    :label="item.value_no"
                                    :value="item.value_no"
                                    :key="item.value_no"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="purchaseSMS.user_name" placeholder="姓名不可编辑" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="购买月份" prop="count">
                        <el-select v-model="purchaseSMS.count" style="width: 292px" @change="changeCount">
                            <el-option
                                    v-for="item in countSelectData"
                                    :label="item.count"
                                    :value="item.count"
                                    :key="item.id"
                            >
                                <span style="float: left">{{ item.count }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">月</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付费用">
                        <p>{{purchaseSMS.money}} 元</p>
                    </el-form-item>
                    <div class="fixed-code-btn">
                        <el-button type="primary" style="width: 144px" @click="getCode" :loading="nextLoad">下一步</el-button>
                    </div>
                </div>
                <div v-show="activeIndex == 2">
                    <div class="code-wrapper">
                        <img :src="qrsrc">
                        <div class="pay-state" v-if="payState == 1 || payState == 0">
                            <img class="pay-state-img" :src="(payState==1)?paySuccessImg:payErrorImg">
                        </div>
                        <p v-show="payState == 2">扫码支付</p>
                        <p class="pay-success" v-show="payState == 1">
                            支付成功<span style="margin: 0 3px">{{readSecondSuccess}}</span>秒后<a class="back" @click="backList">返回列表</a>
                        </p>
                        <p class="pay-error" v-show="payState == 0">
                            支付失败<span style="margin: 0 3px">{{readSecondError}}</span>秒后<a class="back" @click="getCode">重新获取二维码</a>
                        </p>
                    </div>
                    <div class="fixed-code-btn">
                        <el-button style="width: 144px;" @click="upperStep">上一步</el-button>
                        <el-button type="primary" style="width: 144px;margin-left: 60px" @click="purchaseSMSVisible = false">确定</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <!--canvas 容器隐藏-->
        <canvas id="canvas" style="display:none"></canvas>
        <canvas id="img" style="display:none"></canvas>
    </section>
</template>

<script>
    import {AUTH_ID} from '../../common/js/const'
    import {path,path2} from '../../api/api';
    import common from '../../common/js/common'
    import {getPayState} from '../../api/base';
    import axios from 'axios'
    import countTo from 'vue-count-to';
    import TabPane from '../../components/table/TabPane';
    export default {
        name: 'system-manage_-sms',
        components: {
            TabPane,
            countTo
        },
        data(){
            return {
                collectors:[],
                readSecondSuccess:5,
                readSecondError:5,
                payState:0,
                trade_no:'',
                timer:null,
                paySuccess:null,
                payError:null,
                nextLoad:false,
                qrsrc:'',
                purchaseSMSVisible:false,
                months:24,
                purchaseSMS:{
                    username:'',
                    user_name:'',
                    user_id:'',
                    count:'',
                    money:'-'
                },
                countSelectData:[],
                activeIndex:1,
                active:true,
                message_count:0,
                smsData:{
                    message_count:888
                },
                searchForm:{},
                searchFormData:{
                    currentData:'',
                },
                exportapi: '/userprogram/exportbuytrade',
                queryapi: '/userprogram/getbuytrade',
                orderfield:'id',
                fieldsstr:'id__count__utime__pay_time__etime__money__trade_no',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '登录账号',
                                prop: 'user_id',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addtable: true,
                                hidden:'',
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '姓名',
                                prop: 'user_name',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addtable: true,
                                hidden:'',
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '购买月数',
                                prop: 'buy_month',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addtable: true,
                                hidden:'',
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '续费日期',
                            prop: 'utime',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.pay_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '到期日期',
                            prop: 'etime',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.end_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '支付金额',
                            prop: 'end_time',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', params.row.money+' 元')
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '流水号',
                                prop: 'trade_no',
                                type: 'str',
                                hidden:false,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                ],
                rules:{
                    username:[
                        { required: true, message: '请选择小程序登录账号', trigger: 'change' },
                    ],
                    count:[
                        { required: true, message: '请选择购买月份', trigger: 'change' },
                    ]
                },
                shopCar:require('../../assets/images/shop-car.png'),
                paySuccessImg:require('../../assets/images/pay-success.png'),
                payErrorImg:require('../../assets/images/pay-error.png'),
                hideExport:false,
            }
        },
        mounted(){
            let _this = this;
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    _this.collectors = ret.data;
                }));
        },
        methods:{
            transferData(res){
                this.message_count = res.limit_day;
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
                this.activeIndex = 2;
            },
            getCode(){
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        clearInterval(this.timer);
                        let _this = this;
                        _this.payState = 2;
                        _this.nextLoad = true;
                        //暂时重置为0.01元
                        _this.purchaseSMS.money = 0.01;
                        let timestamp = Math.random().toString();
                        axios.get(path+'/userprogram/tobuy', {
                            params: {
                                'tmp': timestamp,
                                'comid': sessionStorage.getItem('comid'),
                                'buy_month':this.purchaseSMS.count,
                                'money': this.purchaseSMS.money,
                                'user_id':this.purchaseSMS.user_id
                            }
                        }).then(function (response) {
                            _this.nextLoad = false;
                            // console.log('response',response)
                            if(response.data.state == 1){
                                let _url = path2 + '/zld/buymessage?trade_no='+ response.data.trade_no;
                                _this.trade_no = response.data.trade_no;
                                _this.timer = setInterval(()=>{
                                    _this.getPayStateFn(_this);
                                },2500);
                                _this.genqr(_url)
                            }else{
                                _this.nextLoad = false;
                                _this.$message({
                                    message: '获取失败，请稍后重试',
                                    type: 'error',
                                    duration: 600
                                });
                            }
                        }).catch(function (error) {
                            _this.nextLoad = false;
                            _this.$message({
                                message: '获取失败，请稍后重试',
                                type: 'error',
                                duration: 600
                            });
                        });

                    } else {
                        return false;
                    }
                });
            },
            changeUsername(val){
                let data = this.collectors;
                for(let i in  data){
                    let item = data[i];
                    if(item.value_no == val){
                        this.purchaseSMS.user_name = item.value_name;
                        this.purchaseSMS.user_id = item.value_no;
                    }
                }
            },
            changeCount(val){
                let data = this.countSelectData;
                for(let i in  this.countSelectData){
                    let item = this.countSelectData[i];
                    if(item.count == val){
                        this.purchaseSMS.money = item.totalMoney;
                    }
                }
            },
            goshop(){
                this.getQuery(this)
                this.purchaseSMSVisible = true;
            },
            upperStep(){
                this.activeIndex = 1;
            },
            nextStep(){
                this.activeIndex = 2;
            },
            closeFn(){
                this.activeIndex = 1;
                this.payState = 2;
                this.readSecondSuccess=5;
                this.readSecondError=5;
                clearInterval(this.timer);
                clearInterval(this.paySuccess);
                clearInterval(this.payError);

            },
            changeDateFormat:function () {
                ;
            },
            tabTeggle(){
                this.active = !this.active;
            },
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( {} ));
            },
            searchFn(){
                /*
                                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                                * */
                let sform = {};
                sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                if(sform.currentData != null && sform.currentData != ''){
                    sform.pay_time = 'between';
                    sform.pay_time_start = sform.currentData[0];
                    sform.pay_time_end = sform.currentData[1];
                }else{
                    sform.pay_time = '';
                    sform.pay_time_start = '';
                    sform.pay_time_end = '';
                }
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getQuery(){
                axios.get(path+'/getdata/getprogramprice',{params:{
                        'comid':sessionStorage.getItem('comid')
                    }}).then((response)=>{
                    if(response.status == 200){
                        this.countSelectData = response.data;
                        for(let item in this.countSelectData){
                            if(this.countSelectData[item].count == 3){
                                this.purchaseSMS.count = this.countSelectData[item].count;
                                this.purchaseSMS.money = this.countSelectData[item].totalMoney;
                            }
                        }
                    }
                }).catch((error)=>{
                    console.log(error)
                    this.$message({
                        message: '网络异常，请稍后重试!',
                        type: 'warning'
                    });
                })
            },
            getPayStateFn(that){
                let params = {trade_no:that.trade_no};
                getPayState('/message/getcodestate',params).then(res=>{
                    let state = res.data.state;
                    that.payState = state;
                    if(state == 2){
                    //    支付中
                    }else if(state == 1){
                    //    支付成功
                        clearInterval(that.timer);
                        that.paySuccess = setInterval(()=>{
                            that.readSecondSuccess --;
                            if(that.readSecondSuccess <= 0){
                                clearInterval(that.paySuccess);
                                that.resetForm();
                                that.purchaseSMSVisible = false;
                            }
                        },1000)
                    }else{
                        //支付失败
                        clearInterval(that.timer)
                        that.payError = setInterval(()=>{
                            that.readSecondError --;
                            if(that.readSecondError <=0){
                                clearInterval(that.payError)
                                that.getCode();
                            }
                        },1000)
                    }
                }).catch(err => {
                    console.log('payError',err)
                })
            },
            backList(){
                this.purchaseSMSVisible = false;
                this.resetForm()
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.systemManage_AddedService_Sms == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth)
                            break;
                        }
                    }
                }
            }
        },
        activated() {
            this.setAuthorityFn();
            this.resetForm();
            // this.$refs['tabPane'].getTableData({},this);
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
        }
    };
</script>

<style lang="scss" scoped>
    .shop-tip{
        margin-left: 20px;
        color: #989898;
    }
    .showcase{
        position: relative;
        background: #fff;
        padding: 17px 20px;
        color: #363636;
        font-size: 16px;
        &:after{
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 20px;
            left: 20px;
            height: 1px;
            content: "";
            border-bottom: 1px dotted #979797;
        }

        p{
            display: inline-block;
            .sms-count{
                margin-left: 15px;
                margin-right: 5px;
                font-size: 22px;
                color: #3C75CF;
            }
        }
        .purchase{
            position: relative;
            top:-5px;
            display: inline-block;
            width:81px;
            height:31px;
            line-height: 31px;
            background:rgba(250,250,250,1);
            border-radius:23px 23px 23px 23px;
            border:1px solid rgba(60,117,207,1);
            text-align: center;
            margin-left: 34px;
            font-size: 16px;
            color: #3C75CF;
            cursor: pointer;
            img{
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-right: 2px;
                vertical-align: text-top;
            }
        }
    }
    .custom-tab-wrapper{
        position: relative;
        height: 54px;
        margin: 0 12px;
        background:rgba(245,247,250,1);
        .tab-item-wrapper{
            position: absolute;
            left: 23px;
            bottom: 0;
            width: 212px;
            height: 48px;
            display: flex;
            .tab-item{
                flex: 1;
                text-align: center;
                height: 48px;
                line-height: 48px;
                box-sizing: border-box;
                color: #909399;
                font-size: 16px;
                cursor: pointer;
            }
            .tab-item-active{
                border-top: 1px solid #193C7B;
                background: #FFFFFF;
                color: #3C75CF;
            }
        }
    }
    .tab-content{
        padding: 30px 50px 10px 50px;
        height: 380px;
    }
    .fiexd-code-form{
        position: relative;
        padding: 30px 53px 0 53px;
        height: 275px;
    }
    .fixed-code-btn{
        position: absolute;
        bottom: -25px;
        display: block;
        width: 372px;
        text-align: center;
    }
    .code-wrapper{
        position: relative;
        width: 100%;
        text-align: center;
        img{
            display: inline-block;
            width: 196px;
            height: 196px;
        }
        .pay-state{
            position: absolute;
            top:0;
            left: 50%;
            transform: translateX(-50%);
            width: 196px;
            height: 196px;
            background: rgba(255,255,255,0.9);
            z-index: 3;
            .pay-state-img{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 112px;
                height: 112px;
            }
        }
        p{
            font-size:16px;
            line-height: 30px;
            color:rgba(54,54,54,1);
        }
        .back{
            margin-left: 7px;
            color: #3C75CF;
            cursor: pointer;
        }
    }
</style>