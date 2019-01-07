<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">业务订单<span style="margin: 2px">-</span>订单记录</p>
                <div class="float-right">
                    <el-button type="text"  @click="exportFn" native-type="button" icon="el-icon-printer" v-if="hideExport">导出</el-button>
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div style="display: block;background: #fff">
                <div class="refill-money-wrapper bgcolor-white" style="margin-top: 0;text-align: center">
                    <el-row type="flex" justify="center" align="center">
                        <el-col :span="12" style="border-right: 2px solid #DDDDDD;color: #F5B962;">
                            <div class="refill-money-left">
                                <i class="iconfont icon-jine money-icon" ></i>
                                <p class="refill-month-title">现金支付</p>
                                <p class="refill-month-count" >
                                    <countTo :startVal='0' :endVal='cashpay' :decimals="2" :duration='1000'></countTo>元
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="12" style="color: #8693F3">
                            <div class="refill-money-left">
                                <i class="iconfont icon-jine money-icon" ></i>
                                <p class="refill-month-title">移动支付</p>
                                <p class="refill-month-count">
                                    <countTo :startVal='0' :endVal='elepay' :decimals="2" :duration='1000'></countTo>元
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="收款人名称" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.out_uid" filterable placeholder="请选择" class="shop-custom-input" style="width: 170px">
                                <el-option
                                        v-for="item in collectors"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车场订单编号" class="clear-style">
                            <el-input v-model="searchFormData.order_id_local" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>

                    </div>
                    <div class="console-main">
                        <el-form-item>
                            <el-select v-model="searchFormData.time_type" placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 100px">
                                <el-option
                                        v-for="item in timerType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
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
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.comid_start" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号" class="clear-style margin-left-20">
                            <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" class="shop-custom-input" style="width: 150px"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    :format-collectors="collectors"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:transferData="transferDataFn"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import axios from 'axios'
    import TabPane from '../../components/table/TabPane';
    import countTo from 'vue-count-to';
    export default {
        components: {
            TabPane,countTo
        },
        data() {
            return {
                cashpay:0,
                elepay:0,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    currentData:'',
                    time_type:'1',
                    comid_start:'',
                    car_number:'',
                    out_uid:'',
                    order_id_local:'',
                },
                searchForm:{},
                isShow:false,
                timerType:[
                    {
                        'value_name':'入场时间',
                        'value_no':'1'
                    },
                    {
                        'value_name':'出场时间',
                        'value_no':'2'
                    },
                ],
                /////////////////////////////////////////////
                loading: false,
                hideExport: false,
                hideSearch: false,

                orderfield:'create_time',

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showBusinessOrder:true,
                hideTool: false,
                showImg: true,
                showBusinessCars: true,
                queryapi: '/cityorder/query',
                exportapi: '/cityorder/exportExcel',
                imgapi: '/order/getOrderPicture',
                btswidth: '100',
                imgSize:450,
                fieldsstr: 'id__groupid__comid__out_uid__collector__c_type__car_number__create_time__end_time__duration__pay_type__amount_receivable__total__electronic_prepay__cash_prepay__electronic_pay__cash_pay__reduce_amount__state__isclick__id__in_passid__out_passid__order_id_local',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'business-order-orders',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            type: 'number',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '所属车场',
                            prop: 'comid',
                            type: 'selection',
                            selectlist: this.parklist,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                let result = common.nameformat(row, this.parklist, 'comid');
                                if (result == '请选择')
                                    result = '';
                                return result;
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.nameformat(params.row, this.parklist, 'comid');
                                if (result == '请选择')result = '';
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号码',
                                prop: 'car_number',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '入场时间',
                            prop: 'create_time',
                            type: 'date',
                            width:160,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time)
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.dateformat(params.row.create_time);
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '出场时间',
                            prop: 'end_time',
                            type: 'date',
                            width:160,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.end_time)
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.dateformat(params.row.end_time);
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '支付方式',
                            prop: 'pay_type',
                            type: 'selection',
                            selectlist: orderPayType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, orderPayType, 'pay_type')
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.nameformat(params.row, orderPayType, 'pay_type');
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    },  {
                        hasSubs: false,
                        subs: [{
                            label: '车场订单编号',
                            prop: 'order_id_local',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            width:'120',
                            hidden:false,
                            unsortable: true,
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.handleShowOrderDetail(params.index,params.row)
                                            }
                                        }
                                    }, '详情')

                                ]);
                            }
                        }]
                    },
                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                img_in: [],
                img_out: [],
                imgpath: '',
                collectors: [],
                parklist:[],
            }
        },
        methods: {
            //查看详情
            handleShowOrderDetail(index, row) {
                // let container = this.$el.querySelector('.el-table__body-wrapper');
                // this.getScrollHeight = container.scrollTop;
                //跳转到订单详情
                this.$router.push({path: '/businessOrder_Details', query: {index: index, row: row}});
                sessionStorage.setItem('orderRow',JSON.stringify(row));
            },
            transferDataFn(val){
                this.cashpay = !isNaN(+val.cashpay)?+val.cashpay:0;
                this.elepay = !isNaN(+val.elepay)?+val.elepay:0;
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                if(sform.currentData != null && sform.currentData != ''){
                    if(sform.time_type == 1){
                        sform.create_time = 'between';
                        sform.create_time_start = sform.currentData[0];
                        sform.create_time_end = sform.currentData[1];
                    }else{
                        sform.end_time = 'between';
                        sform.end_time_start = sform.currentData[0];
                        sform.end_time_end = sform.currentData[1];
                    }
                }

                sform.out_uid_start = sform.out_uid;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeDateFormat(val){

            },
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    time_type:'1',
                    comid_start:'',
                    car_number:'',
                    out_uid:'',
                    order_id_local:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            resetForm(){
                this.initFn(this)
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            getQuery(){
                let _this = this;
                axios.all([common.getAllCollector(), common.getAllParks()])
                    .then(axios.spread(function (ret, parks) {
                        _this.collectors = ret.data;
                        _this.parklist = parks.data;
                    }));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_UNION.businessOrder_Orders == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            break;
                        }
                    }
                }

            },
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local+ '&id=' + row.id + '&comid=' + row.comid + '&token=' + sessionStorage.getItem('token');
                console.log(this.imgdialog_url);

                let _this = this;
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path;
                        console.log(_this.img_in);
                        console.log(_this.img_out)
                    }));

                this.imgDialog = true
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.getQuery();
            this.initFn(this)
        },
        activated() {

        },
        watch: {

        }
    }

</script>

<style scoped lang="scss">
    .refill-money-wrapper{
        padding:0 0 20px 0;
        margin: 0 20px;
        border-bottom: 1px dotted #979797;
    }
    .refill-money-left{
        display: inline-block;
        width: 250px;
        height: 60px;
        text-align: left;
    }
    .money-icon{
        float: left;
        font-size: 60px;
        margin-right: 26px;
    }
    .refill-month-title{
        font-size: 14px;
        font-weight:400;
        color:#666;
        padding-top: 9px;
    }
    .refill-month-count{
        font-size: 24px;
        font-weight: 400;
    }

</style>

