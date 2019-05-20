<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">开发配置</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd('add')" native-type="button" v-if="hideAdd" icon="el-icon-plus">添加回调地址</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>

        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :isBolink="true"
                    :open-fixed-height="true"
                    :suction-top-visible="false"
                    :editTo="editTo"
                    :editapi="editapi"
                    :editRowData="editRowData"
                    v-on:editInput="editInput"
                    :addTo="addTo"
                    :addapi="addapi"
                    :addRowData="addRowData"
                    v-on:addInput="addInput"
                    :delapi="delapi"
                    :del-form="delForm"
                    v-on:cancelDel="cancelDel"
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :format-collectors="collectors"
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
    const parkState = [
        {
            value_name:'未审核',
            value_no:'0'
        },
        {
            value_name:'已审核',
            value_no:'1'
        },
        {
            value_name:'禁用',
            value_no:'2'
        },
        {
            value_name:'已锁定',
            value_no:'3'
        }
    ];
    const addAccountState = [
        {
            value_name:'未提交',
            value_no:'0'
        },
        {
            value_name:'待审核',
            value_no:'2'
        },
        {
            value_name:'待补充',
            value_no:'3'
        },
        {
            value_name:'审核完成',
            value_no:'1'
        },
    ];

    const eventlist=[
        {'value_no':'1','value_name':"车辆进场通知"},
        {'value_no':'2','value_name':"车辆出场通知"},
        {'value_no':'3','value_name':"查询订单实时金额通知"},
        {'value_no':'4','value_name':"车主会员状态变更通知"},
        {'value_no':'5','value_name':"获取车场二维码"},
        {'value_no':'6','value_name':"预付订单通知"},
        {'value_no':'7','value_name':"预付订单回调通知"},
        {'value_no':'8','value_name':"订单结算待支付通知"},
        {'value_no':'9','value_name':"订单结算待支付回调通知"},
        {'value_no':'10','value_name':"获取进场图片地址"},
        {'value_no':'11','value_name':"通用支付回调地址"},
        {'value_no':'12','value_name':"电子收费异步返回结果"},
        {'value_no':'13','value_name':"电子退款异步返回结果"},
        {'value_no':'14','value_name':"无牌车入场通知"},
        {'value_no':'15','value_name':"优惠券获取接口"},
        {'value_no':'16','value_name':"优惠券核销接口"},
        {'value_no':'17','value_name':"车场进场通知简化版"},
    ];
    import {
        path,
        bolinkPath,
        genderType,
        collectType,
        inparkType,
        checkParkMobile,
        checkURL
    } from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import superForm from '../../components/super-form/inline-form';
    import axios from 'axios'

    export default {
        name:'development',
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
                exportapi:'/park/export',
                queryapi: '/account/queryeventurl',
                addapi: '/account/addeventurl',
                editapi: '/account/editeventurl',
                delapi: '/account/deleventurl',
                fieldsstr: 'id__etype__url__ctime',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '事件类型',
                                prop: 'etype',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(eventlist,params.row.etype);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "addtable": true,
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "rules": [
                                    {required: true, message: '请选择事件类型', trigger: 'blur'}
                                ],
                                "options":eventlist
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '地址',
                                prop: 'url',
                                editable: true,
                                addtable: true,
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    { required: true, validator:checkURL, trigger: 'blur' }
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {

                                label: '创建日期',
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

                        hasSubs: false,
                        subs: [{
                            fixed:'right',
                            label: '操作',
                            width: '120',
                            hidden:false,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editTo++;
                                            }
                                        }
                                    }, '编辑'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'red',
                                            marginLeft:'10px'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.delForm = {
                                                    $index:params.index,
                                                    delVisible:true,
                                                    id:params.row.id,
                                                }
                                            }
                                        }
                                    }, '删除'),
                                ]);
                            }
                        }]
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
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addRowData = {};
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
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
            this.initunionid = sessionStorage.getItem('unionid')
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
