<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">统计分析 <span>-</span> 车场分润报表</p>
                <div class="float-right">
                    <el-button type="text"  @click="exportFn" native-type="button"  icon="el-icon-printer" v-if="hideExport">导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>

            <!--开发superForm组件-->
            <!--formConfig   表单的配置文件-->
            <!--searchData   基础传入的数据 可为空对象-->
            <!--searchValueFn 数据传递一周后输出的值-->
            <super-form :form-config="formConfig" :value="searchData" v-on:input="searchValueFn">
                <div style="display: inline-block;" slot="first">
                    <el-input  slot="first" style="width: 220px" v-model="money" :readonly="true">
                        <template slot="prepend">厂商分润</template>
                    </el-input>
                    <el-input  slot="first" style="width: 220px;margin-right: 10px" v-model="servermoney" :readonly="true">
                        <template slot="prepend">工程商分润</template>
                    </el-input>
                </div>

                <el-form-item label="日期" class="clear-style" slot="first">
                    <el-date-picker
                            style="width: 250px"
                            v-model="currentDate"
                            class="shop-custom-datepicker"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
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
                    v-on:transferData="transferDataFn"
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
    import {AUTH_ID_SERVER} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import superForm from '../../components/super-form/inline-form';
    import axios from 'axios'

    export default {
        components: {
            TabPane,superForm
        },
        data() {
            return {
                servermoney:0,
                money:0,
                parkLists:[],
                currentDate:null,
                pickerOptions:{
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                searchData:{},
                expandForm:{},
                formConfig:{
                    showMore:false,
                    first:[
                        {
                            label:'车场名称',
                            type:'select',
                            prop:'name',
                            options:[],
                        }],
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
                exportapi:'/trade/profitexport',
                queryapi: '/trade/profit',
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
                                label: '车场名称(编号)',
                                prop: 'name',
                                width:260,
                                unsortable: true,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '电子交易笔数',
                                prop: 'order_count',
                                width:200,
                                unsortable: true,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '厂商分润(元)',
                                prop: 'profit_amount',
                                unsortable: true,
                                width:200,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.profit_amount,5);
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
                                label: '工程商分润(元)',
                                prop: 'server_profit_amount',
                                width:200,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.server_profit_amount,5);
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
                                width:210,
                                label: '日期',
                                prop: 'w_date',
                                unsortable: true,
                            },
                        ]
                    }
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
                this.money = data.money?data.money:0;
                this.servermoney = data.servermoney?data.servermoney:0;
            },

            ///////////////////////////////////////////start/////////////////////////////
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    if(this.currentDate != null){
                        this.searchData.date = this.currentDate[0]+'至'+this.currentDate[1]
                    }else{
                        this.searchData.date = null;
                    }
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
                this.currentDate = null;
                this.searchData = {

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
                let pramas = '?token='+sessionStorage.getItem('token')+'&union_id='+sessionStorage.getItem('unionid')
                this.$axios.get(bolinkPath+'/getdata/parklist'+pramas)
                    .then(res=>{
                        // console.log('get query parkList-->',res)
                        this.parkLists = res.data;
                    })
                    .catch(err=>{

                    })
                this.$nextTick(res=>{
                    this.initFn(this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SERVER.serverStatistics_NewUnionProfit == item.auth_id) {
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
            parkLists:function (val) {
                this.formConfig.first[0].options = val;
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
