<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">商户管理<span style="margin: 2px">-</span>流水查询</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="formItem" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item  class="clear-style">
                            <el-select v-model="formItem.shop_id"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        label="全部商户"
                                        value="">
                                </el-option>
                                <el-option
                                        v-for="item in shops"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号">
                            <el-input style="width: 140px" v-model="formItem.car_number" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item  class="clear-style-10">
                            <el-select placeholder="全部" v-model="formItem.state" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        label="全部状态"
                                        value="">
                                </el-option>
                                <el-option
                                        v-for="item in stateType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="formItem.currentData"
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
                                <el-button type="primary"  @click="exportFn" native-type="button" v-if="hideExport">导出</el-button>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>

        <div class="table-wrapper-style">
            <tab-pane
                    :exportapi="exportapi"
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
    
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, ticketQueryType,statType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';
    export default {
        components: {
            CommonTable,TabPane
        },
        data() {
            var _this = this;
            return {
                searchForm:{

                },
                formItem:{
                    currentData:'',
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    car_number:'',
                    state:'',
                    datesselector:'',
                    shop_id:'',
                },
                shops:[],
                total:0,
                start_placeholder: '',
                end_placeholder: '',
                datesselector: '',
                minDate : '',
                maxDate : '',
                pickerOptions3:{
                    onPick(dates) {
                      _this.minDate = dates.minDate;
                      //console.log('最小日期'+that.minDate)
                      _this.maxDate = dates.maxDate;
                    },

                  disabledDate(time){
                        return time.getTime() >  new Date(_this.minDate).getTime()+30*24*3600000||time.getTime()>Date.now()||time.getTime() <  new Date(_this.minDate).getTime()-30*24*3600000;
                  }
                },

                stateType:[
                    {'value_no': '0', 'value_name': '未使用'},
                    {'value_no': '1', 'value_name': '已使用'},
                    {'value_no': '2', 'value_name': '回收作废'}
                ],
                createtime:'between',
                table: [],
                pageSize: 20,
                currentPage: 1,
                orderby: 'desc',
                orderfield: 'id',
            	dialogVisible:false,
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: false,
                hideTool: false,
                queryapi: '/shopticket/quickquery',
                btswidth: '100',
                exportapi: '/shopticket/exportExcel',
                fieldsstr: 'id__money__umoney__limit_day__car_number__create_time__use_time__shop_id',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'coupon',
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
                            width: '110',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, 
                    {
                        hasSubs: false, subs: [
                            {
                                label: '商户名称',
                                prop: 'shop_name',
                                width: '200',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                           label: '状态',
                            prop: 'state',
                            width: '120',
                            type: 'selection',
                            selectlist:statType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.stateformat(params.row.state))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '120',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠时长',
                            prop: 'money',
                            width: '120',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.moneyformat(params.row))
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠金额',
                            prop: 'umoney',
                            width: '113',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.umoneyformat(params.row))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠类型',
                            prop: 'type',
                            width: '100',
                            type: 'selection',
                            selectlist:ticketQueryType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.typeformat(params.row.type))
                                ]);
                            }
                        }]
                    },
                    // {
                    //
                    //     hasSubs: false,
                    //     subs: [{
                    //         label: '创建时间',
                    //         prop: 'create_time',
                    //         width: '180',
                    //         type: 'date',
                    //         editable: true,
                    //         searchable: true,
                    //         addable: true,
                    //         unsortable: true,
                    //         align: 'center',
                    //         columnType:'render',
                    //         render: (h, params) => {
                    //             return h('div', [
                    //                 h('span', common.dateformat(params.row.create_time))
                    //             ]);
                    //         }
                    //     }]
                    // },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '到期时间',
                            prop: 'limit_day',
                            width: '200',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.limit_day))
                                ]);
                            }
                        }]
                    },
                     // {
                     //
                     //     hasSubs: false,
                     //     subs: [{
                     //         label: '使用时间',
                     //         prop: 'use_time',
                     //         width: '180',
                     //         type: 'date',
                     //         editable: true,
                     //         searchable: true,
                     //         addable: true,
                     //         unsortable: true,
                     //         align: 'center',
                     //         columnType:'render',
                     //         render: (h, params) => {
                     //             return h('div', [
                     //                 h('span', common.dateformat(params.row.use_time))
                     //             ]);
                     //         }
                     //     }]
                     // }


                ],
                searchtitle: '搜索优惠券',
                moneyformat:function(row){
                    if(row.ticket_unit==1&&row.money!=0){
                        return row.money+'分钟';
                     }else if(row.ticket_unit==2&&row.money!=0){
                        return row.money+'小时';
                     }else if(row.ticket_unit==3&&row.money!=0){
                        return row.money+'天';
                     }else{
                        return "";
                     }
                },
                umoneyformat:function(row){
                    if(row.ticket_unit==4&&row.umoney!=0){
                        return row.umoney+'元';
                     }else{
                        return "";
                     }
                },
                stateformat:function(state){
                    if(state==0){
                        return "未使用"
                    }else if(state==1){
                        return "已使用";
                    }else{
                        return "回收作废";
                    }
                },
                typeformat:function(type){
                    if(type==3){
                        return "时长减免"
                    }else if(type==5){
                        return "金额减免";
                    }else if(type==4){
                        return "全免券";
                    }else{
                        return "";
                    }
                }
            }
        },
        methods:{
            getQuery(){
                let _this = this;
                axios.all([common.getAllShops()])
                    .then(axios.spread(function ( shops) {
                        _this.shops = shops.data;
                    }));
            },
            changeDateFormat(val){
                if(val == null){
                    this.formItem.create_time_start = '';
                    this.formItem.create_time_end = ''
                }else{
                    this.formItem.create_time_start = val[0];
                    this.formItem.create_time_end = val[1]
                }
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.formItem ={
                    currentData:'',
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    car_number:'',
                    state:'',
                    datesselector:'',
                    shop_id:'',
                };
                let currentTime =  common.currentDateArray(1);
                that.formItem.currentData = [common.timestampFormat(currentTime[0]),common.timestampFormat(currentTime[1])];
                that.formItem.create_time_start = common.timestampFormat(currentTime[0]);
                that.formItem.create_time_end = common.timestampFormat(currentTime[1]);
                that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.formItem;
                sform.state_start = sform.state;
                sform.shop_id_start = sform.shop_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            resetForm(){
                this.initFn(this)
            },
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.shopManage_Coupon == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth)
                            break;
                        }
                    }

                }

            }
             ////////////////////////////////////////////////////////////////////////////////
        },
        mounted() {
            this.setAuthorityFn();
            this.initFn(this);
            this.getQuery();
            this.$refs['tabPane'].getTableData({},this);
        },
        beforeMount(){

            },
        activated() {

        }
    }

</script>

<style>
    .gutter {
        display: none
    }
     .inp-margin-buttom{
            margin-bottom: 10px!important;
     }
     .state-buttom{
         margin-bottom: 10px!important;
         width:100px;
     }
     .carnumner-buttom{
         margin-bottom: 10px!important;
     }
</style>

