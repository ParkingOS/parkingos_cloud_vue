<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">业务订单<span style="margin: 2px">-</span>在场车辆</p>
                <div class="float-right">
                    <el-button type="text" icon="el-icon-printer"  @click="exportFn" native-type="button" >导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="车场订单编号" class="clear-style">
                            <el-input v-model="searchFormData.order_id_local" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="收费员" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.uid_start" placeholder="请选择" class="shop-custom-input" style="width: 170px">
                                <el-option
                                        v-for="item in collectors"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="入场时间">
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
                            <el-select v-model="searchFormData.comid_start"  filterable placeholder="请选择" class="shop-custom-input" style="width: 180px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号" class="clear-style">
                            <el-input style="width: 140px" v-model="searchFormData.car_number" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <!--<div class="float-right">-->
                            <!--<el-form-item class="shop-clear-style">-->
                                <!--<el-button type="primary"  @click="exportFn" native-type="button" v-if="!hideExport">导出</el-button>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
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
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util';
    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';

    export default {
        components: {
            TabPane
        },
        data() {
            return {
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    currentData:'',
                    create_time:'',
                    create_time_start:'',
                    create_time_end:'',
                    comid_start:'',
                    car_number:'',
                    uid:'',
                    uid_start:'',
                    order_id_local:''
                },
                searchForm:{

                },
                isShow:false,

                ////////////////////////////////////////
                loading: false,
                hideExport: false,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                imgSize: 450,
                hideTool: false,
                showImg: true,
                orderfield:"create_time",
                showBusinessCars: true,
                queryapi: '/unorder/query',
                exportapi: '/unorder/exportExcel',
                imgapi: '/order/getOrderPicture',
                btswidth: '100',
                fieldsstr: 'id__groupid__comid__berthsec_id__cid__uid__prepaid__parking_type__c_type__car_number__create_time__duration__state__id__in_passid__order_id_local',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'business-order-cars',
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
                            // width: '100',
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
                            // width: '150',
                            type: 'selection',
                            selectlist: this.parklist,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
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

                        hasSubs: false,
                        subs: [{
                            label: '入场收费员',
                            prop: 'uid',
                            // width: '120',
                            type: 'selection',
                            selectlist: this.collectors,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.nameformat(params.row, this.collectors, 'uid');
                                if (result == '请选择')result = '';
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '预付金额',
                            prop: 'prepaid',
                            width: '123',
                            type: 'str',
                            searchable: false,
                            hidden: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车场类型',
                            prop: 'parking_type',
                            width: '123',
                            type: 'selection',
                            selectlist: parkType,
                            searchable: false,
                            hidden: true,
                            unsortable: true,
                            align: 'center',
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '入场方式',
                            prop: 'c_type',
                            width: '100',
                            type: 'str',
                            hidden:true,
                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号',
                                prop: 'car_number',
                                // width: '100',
                                type: 'str',

                                searchable: true,

                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场时间',
                            prop: 'create_time',
                            // width: '160',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.dateformat(params.row.create_time)
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '停车时长',
                            prop: 'duration',
                            width: '120',
                            type: 'number',
                            editable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '123',
                            type: 'selection',
                            selectlist: orderStateType,
                            editable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.nameformat(params.row, orderStateType, 'state')
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '查看车辆图片',
                            prop: 'url',
                            width: '123',
                            type: 'str',

                            unsortable: true,
                            hidden: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场通道',
                            prop: 'in_passid',
                            // width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '车场订单编号',
                            prop: 'order_id_local',
                            // width: '200',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },

                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                img_in: [],
                img_out: [],
                imgpath: '',
                collectors: '',
                parklist: ''
            };
        },
        methods: {
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                sform.uid = sform.uid_start;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.create_time= '';
                    this.searchFormData.create_time_start = '';
                    this.searchFormData.create_time_end = '';
                }else{
                    this.searchFormData.create_time= 'between';
                    this.searchFormData.create_time_start = val[0];
                    this.searchFormData.create_time_end = val[1];
                }
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
                    create_time:'',
                    create_time_start:'',
                    create_time_end:'',
                    comid_start:'',
                    car_number:'',
                    uid:'',
                    uid_start:'',
                    order_id_local:''
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
        },
        mounted() {
            this.getQuery();
            this.initFn(this);
        },
        activated() {

        },
        watch: {
            collectors: function (val) {
                this.tableitems[2].subs[0].selectlist = val;
            },
            parklist: function (val) {
                this.tableitems[1].subs[0].selectlist = val;
            }
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

