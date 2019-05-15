<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">资金流水</p>
                <div class="float-right">
                    <el-button type="text"  @click="exportFn" native-type="button"  icon="el-icon-printer">导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>

            <!--开发superForm组件-->
            <!--formConfig   表单的配置文件-->
            <!--searchData   基础传入的数据 可为空对象-->
            <!--searchValueFn 数据传递一周后输出的值-->
            <super-form :form-config="formConfig" :value="searchData" v-on:input="searchValueFn">

            </super-form>
            <!--结束end-->

        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :isBolink="true"
                    :open-fixed-height="true"
                    :suction-top-visible="false"
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :exportapi="exportapi"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>

    </section>
</template>


<script>
    const paytypelist=[
        //{'value_no':'-1',"value_name":"-"},
        {'value_no':'0',"value_name":"主扫"},
        {'value_no':'1',"value_name":"被扫"},
        {'value_no':'2',"value_name":"免密"},
        {'value_no':'3',"value_name":"现金"},
        {'value_no':'4',"value_name":"公众号"}
    ];
    const dtypelist=[
        {'value_no':'0','value_name':'余位调用'},
        {'value_no':'1','value_name':"交易订单"},
        {'value_no':'2','value_name':"充值"},
        {'value_no':'3','value_name':"提现"},
        {'value_no':'4','value_name':"月卡续费"},
        {'value_no':'5','value_name':"通用支付"},
        {'value_no':'6','value_name':"无感支付"}
    ]
    const paychannellist=[
        //{'value_no':'-1',"value_name":"-"},
        {'value_no':'0',"value_name":"微信"},
        {'value_no':'1',"value_name":"支付宝"},
        {'value_no':'2',"value_name":"余额"},
        {'value_no':'3',"value_name":"银联"},
        {'value_no':'4',"value_name":"建行"},
        {'value_no':'5',"value_name":"银盛"},
        {'value_no':'7',"value_name":"汇付天下"}
    ]
    const otypelist=[
        {'value_no':'0',"value_name":"收入"},{'value_no':'1',"value_name":"支出"}
    ];
    import {
        path,
        bolinkPath,
        genderType,
        collectType,
        inparkType,
        checkParkMobile,
    } from '../../api/api';
    import common from '../../common/js/common'
    import { getTableQuery } from '../../api/base'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import superForm from '../../components/super-form/inline-form';
    import axios from 'axios'

    export default {
        components: {
            TabPane,superForm
        },
        data() {
            return {
                /////////add///////////////////
                addType:'',
                addTitle:'',
                addFormVisible:false,
                addLoading:false,
                addForm:{},
                addFormRules:{
                    'name':[{required: true, message: '请输入车场名称', trigger: 'blur'}],
                    'park_id':[{required: true, message: '请输入车场编号', trigger: 'blur'}],
                    'total_plot':[{required: true, message: '请输入车位总数', trigger: 'blur'}],
                    'phone':[{required: true,validator: checkParkMobile, trigger: 'blur'}]
                },
                /////////////////////////////////
                initunionid:'',
                loadingqrcode:false,
                downloadName:'',
                downloadQrUrl:'',
                unionid:'',
                generateloading:false,
                hasQr:false,
                type:'',
                qrVisible:false,
                checkQrBox:[],
                needChannel:false,
                generatable:false,
                qrsrc:'',
                qrurl:'',
                channelValue:'',
                qrtype:[
                    {'name':'场内预支付','type':1},
                    {'name':'出口直付','type':2},
                    {'name':'无牌车入场','type':3},
                ],
                ///////////////////////////////////
                searchData:{},
                expandForm:{},
                formConfig:{
                    showMore:true,
                    first:[
                        {
                            label:'交易时间',
                            type:'date',
                            subtype:'datetimerange',
                            prop:'currentDate',
                            subprop:'ctime',
                            valueFormat:'timestamp'
                        },
                        {
                            label:'交易流水号',
                            type:'input',
                            subtype: "text",
                            prop:'trade_no'
                        }],
                    second:[
                        {
                            label:'订单编号',
                            type:'input',
                            subtype: "text",
                            prop:'order_id'
                        },
                        {
                            label:'查询编号',
                            type:'input',
                            subtype: "text",
                            prop:'query_id'
                        },
                        {
                            label:'财务类型',
                            type:'select',
                            prop:'dtype',
                            options:dtypelist,
                        }
                    ]
                },
                readonly:false,
                rowid:'',
                resetloading:false,
                pwd:'',
                infoIcon:require('@/assets/images/info-icon.png'),
                resetDataVisible:false,
                unionList:[],
                isShow:false,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    id:3,
                    id_start:'',
                    company_name:'',
                    parking_total:3,
                    parking_total_start:'',
                    groupid:'',
                    groupid_start:'',
                    mobile:'',
                    bolink_id:'',
                    ukey:'',
                },
                searchForm:{},
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{

                },
                addTo:0,
                //删除
                delForm:{},
                /////////////////////////////////////////
                loading: false,
                hideExport: false,
                hideSearch: false,

                orderfield:'id',

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                imgSize:450,
                hideTool: false,
                showImg: true,
                showBusinessPoles: true,
                exportapi:'/trade/export',
                queryapi: '/trade/moneyrecord',
                setapi: '/cityparks/setpark',
                addapi: '/park/add',
                editapi: '/park/edit',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                fieldsstr:'order_id__query_id__trade_no__pay_type__pay_channel__dtype__otype__ctime__money__remark',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '订单编号',
                                prop: 'order_id',
                                width:200,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.order_id?params.row.order_id:'-';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '查询编号',
                                prop: 'query_id',
                                width:120,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.query_id?params.row.query_id:'-';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '交易流水号',
                                prop: 'trade_no',
                                unsortable: true,
                                width:270,

                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '支付方式',
                                prop: 'pay_type',
                                width:100,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(paytypelist,params.row.pay_type);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:100,
                                label: '支付通道',
                                prop: 'pay_channel',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(paychannellist,params.row.pay_channel);
                                    return h('div', [
                                        h('span', {}, str),
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:180,
                                label: '账务类型',
                                prop: 'dtype',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(dtypelist,params.row.dtype);
                                    return h('div', [
                                        h('span', {}, str),
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:100,
                                label: '收支类型',
                                prop: 'otype',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(otypelist,params.row.otype);
                                    return h('div', [
                                        h('span', {}, str),
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '交易时间',
                                prop: 'ctime',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.ctime);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '金额',
                                prop: 'money',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.money,5);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:400,
                                label: '说明',
                                prop: 'remark',
                                unsortable: true,
                            },
                        ]
                    },
                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: [],
                parklist:[],
                yunParkManageData:[],
            }
        },
        methods: {

            ///////////////////////////////////////////////////////////////
            transferDataFn(data){
                // console.log('data-->',data)
            },

            ///////////////////////////////////////////start/////////////////////////////
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    this.searchData.query_from = 2;
                    this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
                }else{
                    this.searchData = Object.assign({},val)
                }
            },
            //////////////////////////////////////////end////////////////////////////////
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
                this.searchData = {
                    query_from:2
                };
                this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            getQuery(){
                this.$nextTick(res=>{
                    this.initFn(this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_UNION.businessOrder_Poles == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            break;
                        }
                    }

                }
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        if(this.$router){
                            this.$router.push('/login');
                        }

                    }
                });
            },
        },
        mounted() {
            let that = this;
            //通知开启表格固定高度
            this.$store.commit('updateTableMaxHeight');
            window.addEventListener('resize', () => {
                var isDom = document.getElementById('consoleCurrentHeight');
                if(isDom){
                    that.$nextTick(()=>{
                        this.$store.commit('updateTableMaxHeight')
                    })
                }
            });

            this.setAuthorityFn(this);
            this.getQuery()
        },
        activated() {

        },
        watch: {

        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
