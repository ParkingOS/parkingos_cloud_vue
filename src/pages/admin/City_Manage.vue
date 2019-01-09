<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">厂商管理<span style="margin: 2px">-</span>厂商管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd" native-type="button" v-if="hideAdd" icon="el-icon-plus">注册厂商</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="厂商编号" class="clear-style">
                            <el-input v-model="searchFormData.union_id" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="厂商秘钥" class="clear-style">
                            <el-input v-model="searchFormData.ukey" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentDate"
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
                        <el-form-item label="编号" class="clear-style">
                            <el-input v-model="searchFormData.id_start" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
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
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {
        path,
        genderType,
        collectType,
        parkState,
        inparkType,
        checkParkMobile,
    } from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios'

    export default {
        components: {
            TabPane
        },
        data() {
            return {

                isShow:false,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    currentDate:'',
                    id:3,
                    id_start:'',
                    name:'',
                    union_id:'',
                    ukey:''
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
                queryapi: '/admin/query',
                addapi: '/admin/addAndEdit',
                editapi: '/admin/addAndEdit',
                delapi: '/admin/delete',
                btswidth: '100',
                fieldsstr: 'id__name__parking_type__parking_total__etc__state__areaid__city__address__longitude__latitude__mobile__ctime__update_time__union_id__ukey',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                type: 'number',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'name',
                                searchable: true,
                                addtable: true,
                                editable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入名称', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'ctime',
                                type: 'date',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.ctime);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '厂商编号',
                                prop: 'union_id',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入厂商平台编号', trigger: 'blur'}
                                ],
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '厂商秘钥',
                                prop: 'ukey',
                                type: 'str',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入厂商平台秘钥', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '160',
                            hidden:false,
                            type: 'str',
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
                                        style: {},
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.$router.push({path: '/city_manage_staff?shop_id='+params.row.id});
                                            }
                                        }
                                    }, '设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'red'
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
            }
        },
        methods: {
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
                that.searchFormData ={
                    currentDate:'',
                    id:3,
                    id_start:'',
                    name:'',
                    union_id:'',
                    ukey:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                if(sform.currentDate != null && sform.currentDate != ''){
                    sform.ctime = 'between';
                    sform.ctime_start = sform.currentDate[0];
                    sform.ctime_end = sform.currentDate[1];
                }
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.ctime_start = '';
                    this.searchFormData.ctime_end = ''
                }else{
                    this.searchFormData.ctime_start = val[0];
                    this.searchFormData.ctime_end = val[1]
                }
            },
            getQuery(){
                let _this = this;
                axios.all([common.getAllCollector(), common.getLiftReason(),common.getAllParks()])
                    .then(axios.spread(function (collector, reason,parks) {
                        _this.collectors = collector.data;
                        _this.collectors.unshift({
                            value_name: '全部',
                            value_no: ''
                        })
                        _this.reasons = reason.data;
                        _this.parklist = parks.data;

                    }))
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
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?liftrodid=' + encodeURI(encodeURI(row.liftrod_id)) + '&id=' + row.id + '&comid=' + row.comid + '&token=' + sessionStorage.getItem('token');
                this.imgDialog = true
            }
        },
        mounted() {
            this.setAuthorityFn(this);
            this.getQuery()
            this.initFn(this)
        },
        activated() {
        },
        watch: {
            collectors: function (val) {
                this.tableitems[2].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
