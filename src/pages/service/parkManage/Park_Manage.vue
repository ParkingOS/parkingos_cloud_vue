<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>车场管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd('add')" native-type="button" v-if="showCustomizeAdd" icon="el-icon-plus">注册车场</el-button>
                    <el-button type="text"  @click="exportFn" native-type="button"  icon="el-icon-printer" v-if="hideExport">导出</el-button>
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


        <!--
        * @update:20190507
         * @operator:cyzhi
         * @description:添加操作
         * @condition:
        -->
        <el-dialog
                width="600px"
                :show-close="false"
                :visible.sync="addFormVisible"
                custom-class="custom-dialog custom-dialog-register"
                @close="closeAddDialog">
            <header class="dialog-header" slot="title">
                {{addTitle}}<i class="el-icon-close dialog-header-iconfont" @click="addFormVisible = false"></i>
            </header>
            <el-form ref="addForm" label-width="120px" :rules="addFormRules" :model="addForm" class="dialog-form-width">
                <div style="height: 30px"></div>
                <el-form-item label="服务商">
                    <el-select v-model="addForm.serverid"  placeholder="请选择" style="width: 100%" @change="getGroupsByServer">
                        <el-option
                                v-for="item in serverList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运营集团">
                    <el-select v-model="addForm.groupid"  placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in unionList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车场名称" prop="name">
                    <el-input v-model.trim="addForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="互联车场编号" v-show="addType == 'edit'">
                    <el-input v-model.trim="addForm.park_id"  placeholder="" :readonly="addType == 'edit'"></el-input>
                </el-form-item>
                <el-form-item label="车位总数" prop="total_plot">
                    <el-input v-model.trim="addForm.total_plot"  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系手机" prop="phone">
                    <el-input v-model.trim="addForm.phone"  placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false"  style="width: 90px;">取 消</el-button>
                <el-button type="primary"  @click="addSubmitFn" :loading="addLoading" style="width: 90px;margin-left: 60px">确 定</el-button>
            </footer>
        </el-dialog>
        <router-view></router-view>
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
    import {
        path,
        bolinkPath,
        genderType,
        collectType,
        inparkType,
        checkParkMobile,
    } from '../../../api/api';
    import common from '../../../common/js/common'
    import { getTableQuery } from '../../../api/base'
    import {AUTH_ID_SERVER} from '../../../common/js/const'
    import TabPane from '../../../components/table/TabPane';
    import superForm from '../../../components/super-form/inline-form';
    import axios from 'axios/index'

    export default {
        components: {
            TabPane,superForm
        },
        data() {
            return {
                allunionList:[],
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
                            label:'车场名称',
                            type:'input',
                            subtype: "text",
                            prop:'name'
                        },{
                            label:'互联车场编号',
                            type:'input',
                            subtype: "text",
                            prop:'park_id'
                        },{
                            label:'运营集团',
                            type:'select',
                            prop:'group_id',
                            options:[],
                        }],
                    second:[
                        {
                            label:'服务商',
                            type:'select',
                            prop:'serverid',
                            options:[],
                        },
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
                noimg:require('../../../assets/images/no.png'),
                offimg:require('../../../assets/images/off.png'),
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
                queryapi: '/park/querynew',
                setapi: '/cityparks/setpark',
                addapi: '/park/add',
                editapi: '/park/edit',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                fieldsstr: 'park_id__name__group_id__server_id__ukey__empty_plot__total_plot__address__phone__ctime__utime__last_pay_time__state__balance',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场名称（编号）',
                                prop: 'name',
                                width:200,
                                unsortable: true,
                                editable: true,
                                addtable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.name+'('+params.row.park_id+')';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入车场名称', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '互联车场编号',
                                prop: 'park_id',
                                hidden:true,
                                addtable: true,
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入车场编号', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场状态',
                                prop: 'state',
                                searchable: true,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.state != 1?'禁用':'正常';
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
                                width:150,
                                label: '运营集团',
                                prop: 'group_name',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                // columnType:'render',
                                // render: (h, params) => {
                                //     let str = common.formatCommonSateFn(this.unionList,params.row.group_id);
                                //     return h('div', [
                                //         h('span', str)
                                //     ]);
                                // },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                            },
                        ]
                    },{
                        hasSubs: false, subs: [
                            {
                                width:150,
                                label: '服务商',
                                prop: 'server_id',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(this.serverList,params.row.server_id);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '支付平台登录账号',
                                prop: 'uid',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.balance,2);
                                    return h('div', [
                                        h('ElButton', {
                                            props: {
                                                size: 'small'
                                            },
                                            style: {

                                            },
                                            on: {
                                                click: (e) => {
                                                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                    this.getLoginUser(params.row.id)
                                                }
                                            }
                                        }, '获取登录账号'),
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:180,
                                label: '互联车场秘钥',
                                prop: 'ukey',
                                unsortable: true,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '心跳时间',
                                prop: 'utime',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.utime);
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
                                label: '最新交易时间',
                                prop: 'last_pay_time',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.last_pay_time);
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
                                label: '新建日期',
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
                                label: '联系手机',
                                prop: 'phone',
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
                                    {required: true,validator: checkParkMobile, trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:200,
                                label: '车场地址',
                                prop: 'address',
                                addtable: true,
                                editable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "textarea",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "textarea",

                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '账号余额',
                                prop: 'balance',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.balance,2);
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
                                label: '车位数',
                                prop: 'total_plot',

                                addtable: true,
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
                                    {required: true, message: '请输入车位总数', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '余位数',
                                prop: 'empty_plot',
                                unsortable: true,
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            fixed:'right',
                            label: '操作',
                            width: '200',
                            hidden:this.hideOptions,
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
                                                this.addForm = JSON.parse(JSON.stringify(params.row));
                                                this.$set(this.addForm,'groupid',this.addForm.group_id+'');
                                                this.$set(this.addForm,'serverid',this.addForm.server_id+'');
                                                this.addForm.groupid = this.addForm.group_id+'';
                                                if(this.addForm.groupid == '-1' || this.addForm.groupid == null || this.addForm.groupid == 'null' || this.addForm.groupid == undefined){
                                                    this.addForm.groupid = '';
                                                }
                                                if(this.addForm.serverid == '-1' || this.addForm.serverid == null || this.addForm.serverid == 'null' || this.addForm.serverid == undefined){
                                                    this.addForm.serverid = '';
                                                }
                                                this.handleAdd('edit',this.addForm)
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
                                                this.$router.push({
                                                    path: '/server_park_manage/server_park_manage_staff',
                                                    name:'serverParkManageStaff',
                                                    query: {
                                                        bolink_id: params.row.park_id,
                                                        union_id: params.row.union_id
                                                    }
                                                })

                                            }
                                        }
                                    }, '员工设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:(params.row.state != 1)?true:false
                                        },
                                        style: {
                                            color:(params.row.state != 1)?'#666':'red',
                                            display:this.showResources?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.prohibitFn(params.row)
                                            }
                                        }
                                    }, '禁用'),

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
                serverList:[],
                showCustomizeAdd:false,
                showSetting:false,
                showEdit:false,
                showResources:false,
                hideExport: false,
                bolinkServerId:'',
            }
        },
        methods: {
            //获取登录账号
            getLoginUser(id){
                let adminForm = new FormData();
                adminForm.append('token',sessionStorage.getItem('token'));
                adminForm.append('platform_id',id);
                adminForm.append('user_type',4);
                axios.post(bolinkPath+'/user/admin',adminForm).then(res=>{
                    if(res.data.length>0) {
                        let userId = res.data[0].id;
                        this.$alert('支付平台登录账号： ' + userId, '登录账号', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        })
                    }
                }).catch(err=>{

                })
            },
            //添加操作
            addSubmitFn(){
                this.$refs.addForm.validate((valid) => {
                    if(valid){
                        let that = this;
                        let addForm = JSON.parse(JSON.stringify(this.addForm));
                        let newForm = {};
                        that.addLoading = true;

                        //add-----------------------
                        if(that.addType == 'add'){
                            newForm.server_id = addForm.serverid;
                            newForm.groupid = addForm.groupid;
                            newForm.company_name = addForm.name;
                            // newForm.bolink_id = addForm.park_id;
                            newForm.parking_total = addForm.total_plot;
                            newForm.mobile = addForm.phone;
                            common.generateForm(newForm);
                            axios.get(path+'/cityparks/editpark',{
                                params:newForm
                            })
                                .then(res=>{
                                    if(res.data.state == 0){
                                        that.$message({
                                            message: res.data.msg,
                                            type: 'error',
                                            duration: 600
                                        });
                                        that.addLoading = false;
                                    }else{
                                        that.$message({
                                            message: '添加成功!',
                                            type: 'success',
                                            duration: 600
                                        });
                                        setTimeout(()=>{
                                            that.addFormVisible = false;
                                            that.addLoading = false;
                                            that.searchValueFn(that.searchData,true);
                                        },60);
                                    }

                                }).catch(err=>{
                                that.$message({
                                    message: '更新失败',
                                    type: 'error',
                                    duration: 600
                                });
                                that.addLoading = false;
                            })
                        }else{
                            newForm.id = addForm.id;
                            newForm.server_id = addForm.serverid;
                            newForm.groupid = addForm.groupid;
                            newForm.company_name = addForm.name;
                            newForm.bolink_id = addForm.park_id;
                            newForm.parking_total = addForm.total_plot;
                            newForm.mobile = addForm.phone;
                            common.generateForm(newForm);
                            axios.get(path+'/cityparks/editpark',{
                                params:newForm
                            })
                                .then(res=>{
                                    if(res.data.state == 0){
                                        that.$message({
                                            message: res.data.msg,
                                            type: 'error',
                                            duration: 600
                                        });
                                        that.addLoading = false;
                                    }else{
                                        that.$message({
                                            message: '编辑成功!',
                                            type: 'success',
                                            duration: 600
                                        });
                                        setTimeout(()=>{
                                            that.addFormVisible = false;
                                            that.addLoading = false;
                                            that.searchValueFn(that.searchData,true);
                                        },60);
                                    }

                                }).catch(err=>{
                                that.$message({
                                    message: '更新失败',
                                    type: 'error',
                                    duration: 600
                                });
                                that.addLoading = false;
                            })
                        }

                    }else{

                    }
                })
            },
            closeAddDialog(){
                this.addFormVisible = false;
                this.addForm = {};
                this.$refs['addForm'].clearValidate();
            },
            handleAdd(type,row){
                if(type == 'add'){
                    this.addTitle = '添加';
                    this.addForm = {};
                    let serverid = sessionStorage.getItem('bolink_serverid')
                    this.$set(this.addForm,'serverid',serverid);
                    this.getGroupsByServer(serverid)
                    this.addType = 'add';
                }else{
                    this.addTitle = '编辑';
                    this.addType = 'edit';
                }
                this.addFormVisible = true;
            },
            //禁用操作
            prohibitFn(row){
                let that= this;
                let cloneRow = JSON.parse(JSON.stringify(row));
                this.$confirm('此操作将禁用该车场，支付功能将不可用，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {

                    let formData  = new FormData();
                    formData.bolink_id = cloneRow.park_id;
                    formData.union_id = cloneRow.union_id;

                    axios.get(path+this.delapi,{
                        params:{
                            bolink_id:cloneRow.park_id,
                            union_id:cloneRow.union_id
                        }
                    }).then(res=>{
                        that.$message({
                            message: '已禁用',
                            type: 'success',
                            duration: 600
                        });
                        setTimeout(()=>{
                            that.searchValueFn(that.searchData,true);
                        },60)

                    }).catch(err => {
                        that.$message({
                            message: '更新失败',
                            type: 'error',
                            duration: 600
                        });
                    })

                }).catch(() => {

                });
            },

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
            resetData() {
                let qform = {};
                let vm = this;
                let api = this.resetapi;
                if (this.pwd == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }


                this.resetloading = true;
                let rform = {
                    'password': this.pwd,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token'),
                    'loginuin':sessionStorage.getItem('loginuin')
                };

                vm.$axios.post(path + api, vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;

                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        if (ret > 0 || ret.state == 1) {
                            //重置成功
                            vm.initFn(vm)
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 2000
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加

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
            getGroupsByServer(serverid){
                this.$set(this.addForm,'groupid','');
                axios.get(path+'/getdata/getGroupsByServer?serverid='+serverid)
                    .then(res=>{
                        this.unionList = res.data;
                    })
                    .catch(err=>{
                        this.unionList = [];
                        console.log('get group by server error--->',err)
                    })
            },
            getQuery(){
                let _this = this;
                axios.all([
                    axios.get(bolinkPath+'/getdata/subServerlist?token='+sessionStorage.getItem('token')),
                    axios.get(path+'/getdata/getGroupsByServer?serverid='+sessionStorage.getItem('serverid')+'&type=0')
                ])
                    .then(axios.spread(function (serverList,allunionList) {
                        _this.serverList = serverList.data;
                        _this.allunionList = allunionList.data;
                    }))

                this.$nextTick(res=>{
                    this.initFn(this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SERVER.server_park_manage == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            this.showSetting = common.showSetting(item.sub_auth);
                            this.showResources = common.showResources(item.sub_auth);
                            if(!this.showEdit&&!this.showSetting && !this.showResources){
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
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

            // this.initFn(this)
        },
        activated() {
            this.initunionid = sessionStorage.getItem('unionid')
            this.getQuery();
        },
        watch: {
            allunionList: function (val) {
                this.formConfig.first[2].options = val;
            },
            serverList:function(val){
              this.formConfig.second[0].options = val;
            },
            readonly:function (val) {
                this.tableitems[5].subs[0].readonly = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
