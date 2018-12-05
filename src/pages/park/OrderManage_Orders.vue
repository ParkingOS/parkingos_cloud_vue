<template>
    <section class="right-wrapper-size" id="scrollBarDom">
            <header class="custom-header">
                订单管理-订单记录
            </header>
            <div class="workbench-wrapper">
                <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                    <el-form-item label="" class="clear-style margin-left-clear">
                        <el-radio-group v-model="searchFormData.orderfield" size="mini" @change="changeRadio">
                            <el-radio-button label="create_time">按入场时间</el-radio-button>
                            <el-radio-button label="end_time">按出场时间</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="clear-style">
                        <el-date-picker
                                style="width: 370px"
                                size="mini"
                                v-model="searchFormData.currentData"
                                type="datetimerange"
                                range-separator="-"
                                :default-time="['00:00:00','23:59:59']"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                @change="changeDateFormat"
                        >
                            <!--:picker-options="pickerOptions"-->
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="车牌号" class="clear-style">
                        <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                    <el-form-item class="clear-style">
                        <el-button type="primary" size="mini" @click="searchFn" native-type="button">搜索</el-button>
                        <el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px;"></i> 更多选项</el-button>
                    </el-form-item>
                    <el-form-item class="clear-style float-right">
                        <el-button size="mini" @click="exportFn" native-type="button" v-if="!hideExport">导出</el-button>
                        <el-button size="mini" @click="resetForm" native-type="button">刷新</el-button>
                    </el-form-item>
                    <div class="second-search-item-style" v-show="isShow">
                        <el-form-item label="订单状态" class="clear-style">
                            <el-select v-model="searchFormData.state" placeholder="请选择" size="mini">
                                <el-option
                                        v-for="item in orderStateType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="支付方式" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.pay_type" placeholder="请选择" size="mini">
                                <el-option
                                        v-for="item in orderPayType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="实收金额" class="clear-style margin-left-20">
                            <el-input size="mini" v-model="searchFormData.total_start"
                                      style="width: 80px;"></el-input>
                            <span style="margin-top: 10px;"> - </span>
                            <el-input size="mini" v-model="searchFormData.total_end"
                                      style="width: 80px;"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="table-wrapper-style">
                <tab-pane
                        :queryapi="queryapi"
                        :exportapi="exportapi"
                        :fieldsstr="fieldsstr"
                        :orderfield="orderfield"
                        :format-collectors="collectors"
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
    import {path, orderStateType, orderPayType} from '../../api/api';
    import util from '../../common/js/util';
    import common from '../../common/js/common';
    import {AUTH_ID} from '../../common/js/const';
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';
    import ElButton from 'element-ui/packages/button/src/button';
    export default {
        components: {
            ElButton,
            TabPane
        },
        data() {
            var that = this;
            return {
                hideExport:true,
                hideSearch:true,
                isShow:false,
                currentHeight:'500',
                queryapi: '/order/query',
                exportapi: '/order/exportExcel',
                imgapi: '/order/getOrderPicture',
                fieldsstr: 'id__c_type__car_number__car_type__create_time__end_time__duration__pay_type__freereasons__amount_receivable__total__electronic_prepay__cash_prepay__electronic_pay__cash_pay__reduce_amount__uid__out_uid__state__url__in_passid__out_passid__order_id_local',
                orderfield:'create_time',
                searchFormData:{
                    orderfield:'create_time',
                    currentData:'',
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    end_time: 'between',
                    end_time_start: '',
                    end_time_end: '',
                    car_number:'',
                    state:'',
                    state_start:'',
                    pay_type:'',
                    pay_type_start:'-1',
                    total:'between',
                    total_start:'',
                    total_end:''
                },
                pickerOptions:{
                    onPick(dates) {
                        that.minDate = dates.minDate;
                        that.maxDate = dates.maxDate;
                    },

                    disabledDate(time){
                        return time.getTime() >  new Date(that.minDate).getTime()+30*24*3600000||time.getTime()>Date.now()||time.getTime() <  new Date(that.minDate).getTime()-30*24*3600000;
                    }
                },
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'order-manage',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车场订单编号',
                            prop: 'order_id_local',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
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
                            label: '入场方式',
                            prop: 'c_type',
                            width: '123',
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
                                label: '车牌号码',
                                prop: 'car_number',

                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '车型',
                            prop: 'car_type',
                            width: '100',
                            type: 'str',
                            hidden:true,
                            searchable: false,

                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '停车时长',
                            prop: 'duration',
                            width: '180',
                            type: 'number',
                            editable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '订单状态',
                            prop: 'state',
                            type: 'selection',
                            selectlist: orderStateType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, orderStateType, 'state'))
                                ]);
                            }
                        }]
                    }, {

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
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, orderPayType, 'pay_type'))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠原因',
                            prop: 'freereasons',
                            width: '100',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.freereasons;
                                return pass == '' || pass == undefined ? '无' : pass;
                            },
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', (params.row.freereasons == '' || params.row.freereasons == undefined) ? '无' :params.row.freereasons)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '应收金额',
                            prop: 'amount_receivable',
                            width: '100',
                            type: 'number',
                            hidden:true,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '实收金额',
                            prop: 'total',
                            width: '100',
                            type: 'number',

                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '入场时间',
                            prop: 'create_time',
                            unsortable: true,
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.create_time))
                                ]);
                            }
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '出场时间',
                            prop: 'end_time',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.end_time))
                                ]);
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '电子预付金额',
                            prop: 'electronic_prepay',
                            width: '150',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '现金预付金额',
                            prop: 'cash_prepay',
                            width: '150',
                            type: 'str',
                            hidden:true,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '电子结算金额',
                            prop: 'electronic_pay',
                            width: '150',
                            type: 'str',
                            hidden:true,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '现金结算金额',
                            prop: 'cash_pay',
                            width: '150',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '减免金额',
                            prop: 'reduce_amount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场收费员',
                            prop: 'uid',
                            width: '123',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            hidden:true,
                            render:true,
                            align: 'center',
                            // format: (row) => {
                            //     // let uidstr = common.nameformat(row,this.collectors,'uid')
                            //     // return uidstr==''||uidstr==undefined?(row.uid==-1?'无':row.uid):uidstr
                            //     return common.nameformat(row, this.collectors, 'uid');
                            // },
                            columnType:'expand',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, this.collectors, 'uid'))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收款人',
                            prop: 'out_uid',
                            width: '123',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: true,
                            addable: true,
                            hidden:true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                // let uidstr = common.nameformat(row,this.collectors,'out_uid')
                                // return uidstr==''||uidstr==undefined?row.uid:uidstr
                                return common.nameformat(row, this.collectors, 'out_uid');
                            }
                        }]
                    },{

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
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.in_passid;
                                return pass == '' || pass == undefined ? '无' : pass;
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '出场通道',
                            prop: 'out_passid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.out_passid;
                                return pass == '' || pass == undefined ? '无' : pass;
                            }
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            fixed:'right',
                            width:'80',
                            unsortable: true,
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
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
                collectors:undefined,
                orderStateType:orderStateType,
                orderPayType:orderPayType,
                searchForm:{}
            };
        },
        methods: {
            changeRadio(val){
                this.orderfield = val;
            },
            //查看详情
            handleShowOrderDetail(index, row) {
                // let container = this.$el.querySelector('.el-table__body-wrapper');
                // this.getScrollHeight = container.scrollTop;
                //跳转到订单详情
                this.$router.push({path: '/orderManage_OrderDetail', query: {index: index, row: row}});
                sessionStorage.setItem('orderRow',JSON.stringify(row));
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
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                        orderfield:'create_time',
                        currentData:'',
                        create_time:'between',
                        create_time_start:'',
                        create_time_end:'',
                        end_time: '',
                        end_time_start: '',
                        end_time_end: '',
                        car_number:'',
                        state:'',
                        state_start:'',
                        pay_type:'',
                        pay_type_start:'-1',
                        total:'between',
                        total_start:'',
                        total_end:''
                };
                let currentTime =  common.currentDateArray(3);
                // that.searchFormData.currentData = [new Date(currentTime[0]),new Date(currentTime[1])];
                that.searchFormData.currentData = [common.timestampFormat(currentTime[0]),common.timestampFormat(currentTime[1])];
                that.searchFormData.create_time_start = common.timestampFormat(currentTime[0]);
                that.searchFormData.create_time_end = common.timestampFormat(currentTime[1]);
                that.searchFormData.end_time_start = '';
                that.searchFormData.end_time_end = '';
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                // console.log('this.searchFormData',this.searchFormData)
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let timer =  this.searchFormData.currentData;
                if(timer != null){
                    let currentData = JSON.parse(JSON.stringify(this.searchFormData.currentData));
                    if(typeof timer[0] == 'object'){
                        currentData = [Date.parse(currentData[0]),Date.parse(currentData[1])]
                    }
                    if(this.orderfield == 'create_time'){
                        this.searchFormData.create_time='between';
                        this.searchFormData.create_time_start = currentData[0];
                        this.searchFormData.create_time_end = currentData[1];
                        this.searchFormData.end_time='';
                        this.searchFormData.end_time_start = '';
                        this.searchFormData.end_time_end = '';
                    }else{
                        this.searchFormData.create_time='';
                        this.searchFormData.create_time_start = '';
                        this.searchFormData.create_time_end = '';
                        this.searchFormData.end_time='between';
                        this.searchFormData.end_time_start = currentData[0];
                        this.searchFormData.end_time_end = currentData[1];
                    }
                }else{
                    this.searchFormData.create_time='';
                    this.searchFormData.create_time_start = '';
                    this.searchFormData.create_time_end = '';
                    this.searchFormData.end_time_start = '';
                    this.searchFormData.end_time_end = '';
                    this.searchFormData.end_time='';
                }
                let sform = this.searchFormData;
                sform.state_start = sform.state;
                sform.pay_type_start = sform.pay_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.create_time_start = '';
                    this.searchFormData.create_time_end = '';
                    this.searchFormData.end_time_start = '';
                    this.searchFormData.end_time_end = ''
                }else{
                    if(this.orderfield == 'create_time'){
                        this.searchFormData.create_time_start = val[0];
                        this.searchFormData.create_time_end = val[1];
                        this.searchFormData.end_time_start = '';
                        this.searchFormData.end_time_end = '';
                    }else{
                        this.searchFormData.create_time_start = '';
                        this.searchFormData.create_time_end = '';
                        this.searchFormData.end_time_start = val[0];
                        this.searchFormData.end_time_end = val[1];
                    }

                }
            },
            handleScroll() {
                var scrollTop = document.getElementById('scrollBarDom').pageYOffset || document.getElementById('scrollBarDom').scrollTop || document.getElementById('scrollBarDom').scrollTop
                console.log('scrollTop',scrollTop)

            },
            getQuery(){
                let _this = this;
                axios.all([common.getCollector()])
                    .then(axios.spread(function (ret) {
                        _this.collectors = ret.data;
                    }));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.orderManage_Orders == item.auth_id) {
                            this.hideExport = !common.showSubExport(item.sub_auth);
                            this.hideSearch = true;
                            break;
                        }
                    }

                }
            }
        },
        beforeMount(){

        },
        mounted() {
            this.setAuthorityFn()
            this.initFn(this)
            this.getQuery()
            this.$refs['tabPane'].getTableData({},this)

        },
        activated() {

        },
        watch: {
            collectors: function (val) {
                this.tableitems[16].subs[0].selectlist = val;
                this.tableitems[17].subs[0].selectlist = val;
            }
        }
    };

</script>

<style lang="scss" src="../../styles/common-style.scss">

</style>
