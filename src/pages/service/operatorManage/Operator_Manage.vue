<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">运营集团管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd" native-type="button" v-if="showCustomizeAdd" icon="el-icon-plus">注册运营集团</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="名称" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="互联运营集团编号" class="clear-style">
                            <el-input v-model="searchFormData.operatorid" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
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
        <router-view></router-view>
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
    } from '../../../api/api';
    import common from '../../../common/js/common'
    import {AUTH_ID_SERVER} from '../../../common/js/const'
    import TabPane from '../../../components/table/TabPane';
    import axios from 'axios/index'

    export default {
        components: {
            TabPane
        },
        data() {
            return {
                isShow:false,
                searchFormData:{
                    name:'',
                    operatorid:'',
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
                queryapi: '/unionserver/groupsByServer',
                addapi: '/citygroup/addAndEdit',
                editapi: '/citygroup/addAndEdit',
                delapi: '/citygroup/delete',
                btswidth: '100',
                fieldsstr: 'id__name__operatorid',
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
                                prop: 'create_time',
                                type: 'date',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.create_time);
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
                                label: '互联运营集团编号',
                                prop: 'operatorid',
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
                            },
                        ]
                    },
                    // {
                    //     hasSubs: false, subs: [
                    //         {
                    //             label: '服务商',
                    //             prop: 'serverid',
                    //             addtable: true,
                    //             editable: true,
                    //             searchable: true,
                    //             unsortable: true,
                    //             align: 'center',
                    //             "type": "select",
                    //             "disable": false,
                    //             "readonly": false,
                    //             "value": "",
                    //             'size':'',
                    //             "options":[],
                    //             columnType:'render',
                    //             render: (h, params) => {
                    //                 let str = common.formatCommonSateFn(this.serverList,params.row.serverid);
                    //                 return h('div', [
                    //                     h('span', str)
                    //                 ]);
                    //             }
                    //         },
                    //     ]
                    // },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '地址',
                                prop: 'address',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '120',
                            hidden:this.hideOptions,
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
                                            display:this.showEdit?'':'none'
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
                                            display:this.showSetting?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.$router.push({path: '/operator_manage/operator_manage_staff?shop_id='+params.row.id});
                                            }
                                        }
                                    }, '员工设置'),
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
                serverList:[],
                showCustomizeAdd:false,
                showEdit:false,
                showSetting:false,
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
                    name:'',
                    operatorid:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
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
                let _this = this;
                _this.$nextTick(()=>{
                    _this.initFn(_this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SERVER.operator_manage == item.auth_id) {
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            this.showSetting = common.showSetting(item.sub_auth);
                            if(!this.showEdit&&!this.showSetting){
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
                            break;
                        }
                    }

                }
            },
        },
        mounted() {
            this.setAuthorityFn(this);
            this.getQuery()

        },
        activated() {
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
            collectors: function (val) {
                this.tableitems[2].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            },
            serverList:function (val) {
                this.tableitems[4].subs[0].options = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
