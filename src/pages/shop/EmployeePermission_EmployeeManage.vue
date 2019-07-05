<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">员工管理<span style="margin: 2px">-</span>员工管理</p>
                <div class="float-right"><el-button type="text" size="mini" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;"  @click="resetForm">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" v-model="formItem" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <div>
                            <el-form-item label="登录时间">
                                <el-date-picker
                                        style="width: 350px"
                                        class="shop-custom-datepicker"
                                        v-model="formItem.currentData2"
                                        type="datetimerange"
                                        range-separator="至"
                                        :default-time="['00:00:00','23:59:59']"
                                        start-placeholder="请输入时间"
                                        end-placeholder="请输入时间"
                                        value-format="timestamp"
                                        @change="changeDateFormat2"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="电话" >
                                <el-input v-model.number="formItem.phone" placeholder="请输入电话号" class="shop-custom-input" style="width: 240px"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" >
                                <el-input v-model.number="formItem.mobile" placeholder="请输入手机号" class="shop-custom-input" style="width: 240px"></el-input>
                            </el-form-item>
                        </div>
                        <div style="padding-top: 19px">
                            <el-form-item label="编号" >
                                <el-input v-model.number="formItem.id_start" placeholder="请输入" class="shop-custom-input" style="width: 171px"></el-input>
                            </el-form-item>
                            <span style="line-height: 40px;font-size: 16px">-</span>
                            <el-form-item style="margin-left: 10px">
                                <el-input v-model.number="formItem.id_end" placeholder="请输入" class="shop-custom-input" style="width: 171px"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input v-model.number="formItem.strid" placeholder="请输入账号" class="shop-custom-input" style="width: 240px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="formItem.role_id" placeholder="员工角色" class="shop-custom-input" style="width: 141px">
                                    <el-option
                                            v-for="item in aroles"
                                            :key="item.value_no"
                                            :label="item.value_name"
                                            :value="item.value_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="formItem.sex" placeholder="员工性别" class="shop-custom-input" style="width: 138px">
                                    <el-option
                                            v-for="item in genderType"
                                            :key="item.value_no"
                                            :label="item.value_name"
                                            :value="item.value_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="console-main">
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
                        <el-form-item label="姓名" >
                            <el-input v-model="formItem.nickname" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 150px"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" style="width: 86px" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button type="primary" style="width: 114px" @click="handleAdd" icon="el-icon-circle-plus-outline" v-if="hideAdd">添加员工</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :delapi="delapi"
                    :del-form="delForm"
                    v-on:cancelDel="cancelDel"
                    :editTo="editTo"
                    :editapi="editapi"
                    :editRowData="editRowData"
                    v-on:editInput="editInput"
                    addTitle="添加"
                    :dialogStyle="dialogStyle"
                    :addTo="addTo"
                    :addapi="addapi"
                    :addRowData="addRowData"
                    v-on:addInput="addInput"
                    :stripe="true"
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
        <!--编辑-->
        <el-dialog
                width="478px"
                :visible.sync="editVisible"
                custom-class="custom-dialog em-edit-dialog"
                @close="onClose"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                编辑<i class="el-icon-close dialog-header-iconfont" @click="cancelEdit"></i>
            </header>
            <div class="custom-tab-wrapper">
                <div class="tab-item-wrapper">
                    <div :class="active?'tab-item tab-item-active':'tab-item'" @click="tabTeggle(0)">基本设置</div>
                    <div :class="!active?'tab-item tab-item-active':'tab-item'" @click="tabTeggle(1)">密码设置</div>
                </div>
            </div>
            <div class="tab-content" v-if="active">
                <el-form
                        :rules="editFormRules"
                        :model="editFormItem"
                        label-width="80px"
                        ref="editForm">
                    <el-form-item label="名称"  prop="nickname">
                        <el-input v-model="editFormItem.nickname" placeholder="" class="shop-custom-input"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="editFormItem.phone" placeholder="" class="shop-custom-input"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model="editFormItem.mobile" placeholder="" class="shop-custom-input"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="editFormItem.role_id" placeholder="员工角色" class="shop-custom-input" style="width: 100%">
                            <el-option
                                    v-for="item in aroles"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="editFormItem.sex" placeholder="员工性别" class="shop-custom-input" style="width: 100%">
                            <el-option
                                    v-for="item in genderType"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" style="height:46px;width: 144px;box-shadow:0px 3px 6px 0px rgba(51,121,233,0.3);" @click="editInput" :loading="editLoading">保 存</el-button>
                </div>
            </div>
            <div class="tab-content" v-else>
                <el-form
                        :rules="rules"
                        :model="resPwd"
                        label-width="120px"
                        ref="passwordRef">
                    <el-form-item label="请输入新密码"  prop="pass">
                        <el-input type="password" v-model="resPwd.pass" placeholder="" class="shop-custom-input"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="checkPass">
                        <el-input type="password" v-model="resPwd.checkPass" placeholder="" class="shop-custom-input"></el-input>
                    </el-form-item>

                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" style="height:46px;width: 144px;box-shadow:0px 3px 6px 0px rgba(51,121,233,0.3);" @click="resetPwdFn" :loading="resetloading">保 存</el-button>
                </div>
            </div>
        </el-dialog>
    </section>
</template>


<script>
    import {genderType, collectType, checkTelePhone, checkMobile,path} from '../../api/api';
    import { getTableQuery,delTableData ,editTableData,addTableData} from '../../api/base'
    import common from '../../common/js/common';
    import {AUTH_ID_SHOP} from '../../common/js/const';
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';
    import ElFormItem from 'element-ui/packages/form/src/form-item';

    export default {
        components: {
            ElFormItem,
            TabPane
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(/^(\w){6,12}$/.test(value)){
                    if (this.resPwd.checkPass !== '') {
                        this.$refs.passwordRef.validateField('checkPass');
                    }
                    callback();
                }else{
                    callback(new Error('密码为6-12位字母,数字或下划线!'));
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resPwd.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                rowid:'',
                resetloading:false,
                //重置密码
                rules:{
                    pass:[{  validator: validatePass,  trigger: 'blur' }],
                    checkPass:[{  validator: validatePass2, trigger: 'blur', }]
                },
                active:true,
                editVisible:false,
                editLoading:false,
                editFormItem:{
                    nickname:'',
                    phone:'',
                    mobile:'',
                    role_id:'',
                    sex:'',
                },
                resPwd:{
                    pass:'',
                    checkPass:''
                },
                dialogStyle:{
                    dialogWidth:'478px',
                    dialogFormLableWidth:'100px',
                    dialogFormWidth:''
                },
                //删除
                delForm:{},
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{},
                addTo:0,
                searchForm:{},
                genderType:genderType,
                isShow:false,
                formItem:{
                  id:'between',
                  id_start:'', //编号
                    id_end:'',
                    nickname:'',//姓名
                    strid:'',//登录账号
                    phone:'',//电话
                    mobile:'',//手机
                    currentData:'',
                    currentData2:'',
                    reg_time:'',//创建时间
                    reg_time_start:'',
                    reg_time_end:'',
                    logon_time:'',
                    logon_time_start:'',
                    logon_time_end:'',
                    role_id:'',
                    role_id_start:'',
                    sex:'',
                    sex_start:'',
                },
                orderfield:'id',
                /////////////////////////////////////////////////
                loading: false,

                hideExport: true,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showresetpwd: true,
                hideOptions: false,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                // showSettingFee:true,
                // showCommutime:true,
                // showPermission:true,
                addapi: '/shopmember/create',
                delapi: '/shopmember/delete',
                editapi: '/shopmember/create',
                queryapi: '/shopmember/quickquery',
                resetapi: '/shopmember/editpass',
                btswidth: '180',
                fieldsstr: 'id__nickname__strid__phone__mobile__role_id__reg_time__sex__logon_time__isview',

                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '80',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'reg_time',
                            width: '155',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.reg_time))
                                ]);
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '最近登录时间',
                            prop: 'logon_time',
                            width: '155',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.logon_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '姓名',
                                prop: 'nickname',
                                width: '99',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": '',
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入姓名', trigger: 'blur'}
                                ],
                                "placeholder":'请输入姓名',

                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '登录账号',
                                prop: 'strid',
                                width: '103',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },{
                        hasSubs: false, subs: [
                            {
                                label: '手机',
                                prop: 'mobile',
                                width: '108',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": '',
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {validator: checkMobile, trigger: 'blur'}
                                ],
                                "placeholder":'请输入手机号',
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '电话',
                                prop: 'phone',
                                width: '131',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": '',
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {validator: checkTelePhone, trigger: 'blur'}
                                ],
                                "placeholder":'请输入电话号',
                            }
                        ]
                    },  {
                        hasSubs: false, subs: [
                            {
                                label: '角色',
                                prop: 'role_id',
                                width: '120',
                                selectlist: this.aroles,
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.nameformat(params.row,this.aroles, 'role_id'))
                                    ]);
                                },
                                "type": "select",
                                "value": "",
                                "button": false,
                                "border": true,
                                "rules": [
                                    {required: true, message: '请选择角色', trigger: 'blur'}
                                ],
                                'size':'',
                                "options": this.aroles,
                            }
                        ]
                    },
                     {
                        hasSubs: false, subs: [
                            {
                                label: '性别',
                                prop: 'sex',
                                width: '80',
                                type: 'selection',
                                selectlist: genderType,
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.nameformat(params.row,genderType, 'sex'))
                                    ]);
                                },
                                "type": "select",
                                "value": "",
                                "button": false,
                                "border": true,
                                "rules": [],
                                'size':'',
                                "options": genderType,
                            }
                        ]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '收费',
                            prop: 'isview',
                            width: '123',
                            type: 'selection',
                            selectlist: collectType,
                            hidden: true,


                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, collectType, 'isview');
                            }
                        }]
                    },{
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            width:'105',
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
                                            color:'#3C75CF',
                                            display:this.showEdit?'':'none',
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.rowid = params.row.id;
                                                this.editFormItem = params.row;
                                                this.editFormItem.role_id = this.editFormItem.role_id+'';
                                                this.editFormItem.sex = this.editFormItem.sex+'';
                                                this.editVisible = true;
                                            }
                                        }
                                    }, '编辑'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color:'#F56D6D',
                                            display:this.showdelete?'':'none',
                                        },
                                        on: {
                                            click: () => {
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
                addtitle: '注册员工',
                addFormRules: {
                    nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    mobile: [
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkTelePhone, trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    mobile: [
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkTelePhone, trigger: 'blur'}
                    ]
                },

                aroles: []
            };
        },
        methods:{
            //修改密码
            resetPwdFn() {
                this.$refs['passwordRef'].validate((valid)=>{
                    if(valid){
                        let qform = {};
                        let vm = this;
                        let api = this.resetapi;
                        this.resetloading = true;
                        let rform = {
                            'newpass': this.resPwd.pass,
                            'confirmpass': this.resPwd.checkPass,
                            'id': this.rowid,
                            'token': sessionStorage.getItem('token')
                        };
                        rform = common.generateForm(rform);
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
                                    //更新成功
                                    // vm.getTableData(qform);
                                    vm.$message({
                                        message: '重置成功!',
                                        type: 'success',
                                        duration: 1500
                                    });
                                    vm.editVisible= false;
                                    vm.resetloading = false;
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: '更新失败!' + ret.msg,
                                        type: 'error',
                                        duration: 2000
                                    });
                                }
                            }
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    }
                })

            },
            tabTeggle(){
                this.active = !this.active;
            },
            cancelEdit(){
                if(this.active){
                    this.$refs['editForm'].clearValidate();
                }else{
                    this.$refs['passwordRef'].clearValidate();
                }
                this.editVisible = false;
            },
            onClose(){
                if(this.active){
                    this.$refs['editForm'].clearValidate();
                }else{
                    this.$refs['passwordRef'].clearValidate();
                }

            },
            changeDateFormat(val){
                if(val == null){
                    this.formItem.reg_time = '';
                    this.formItem.reg_time_start = '';
                    this.formItem.reg_time_end = '';

                }else{
                    this.formItem.reg_time = 'between';
                    this.formItem.reg_time_start = val[0];
                    this.formItem.reg_time_end = val[1];
                }
            },
            changeDateFormat2(val){
                if(val == null){
                    this.formItem.logon_time = '';
                    this.formItem.logon_time_start = '';
                    this.formItem.logon_time_end = '';

                }else{
                    this.formItem.logon_time = 'between';
                    this.formItem.logon_time_start = val[0];
                    this.formItem.logon_time_end = val[1];
                }
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            //编辑
            // editInput(){
            //     // this.editRowData = this.editFormItem;
            // },
            editInput: function () {
                //发送ajax,提交表单更新
                let that = this;
                let api = this.editapi;
                let eform = this.editFormItem;
                eform = common.generateForm(eform);
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        that.editLoading = true;
                        editTableData(api,eform).then(res=>{
                            that.editLoading = false;
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '编辑成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.editVisible = false;
                                        that.active = true;
                                        this.$refs['tabPane'].getTableData({},this);
                                    },60)
                                }else{
                                    that.$message({
                                        message: res.data.msg,
                                        type: 'info',
                                        duration: 600
                                    });
                                }
                            }
                        }).catch(err => {
                            that.$message({
                                message: '更新失败',
                                type: 'error',
                                duration: 600
                            });
                        })
                    }
                });
            },
            //添加
            handleAdd(){
                this.addRowData = {

                };
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            searchFn(){
                let sform = this.formItem;
                sform.sex_start = sform.sex;
                sform.role_id_start = sform.role_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.formItem ={
                    id:'between',
                    id_start:'', //编号
                    id_end:'',
                    nickname:'',//姓名
                    strid:'',//登录账号
                    phone:'',//电话
                    mobile:'',//手机
                    currentData:'',
                    currentData2:'',
                    reg_time:'',//创建时间
                    reg_time_start:'',
                    reg_time_end:'',
                    logon_time:'',
                    logon_time_start:'',
                    logon_time_end:'',
                    role_id:'',
                    role_id_start:'',
                    sex:'',
                    sex_start:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
            getQuery(){
                let _this = this;
                axios.all([common.getShopRole()])
                    .then(axios.spread(function (ret) {
                        _this.aroles = ret.data;
                    }));
            },
            changeMore(){
                this.isShow = !this.isShow
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
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SHOP.shopMember == item.auth_id) {
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showresetpwd = common.showSubReset(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.hideAdd = common.showSubAdd(item.sub_auth);
                            if (!this.showEdit && !this.showdelete) {
                                this.hideOptions = true;
                            }
                            break;
                        }
                    }
                }
            }
        },
        mounted() {

        },
        activated() {
            this.setAuthorityFn();
            this.getQuery();
            this.initFn(this);
            this.$refs['tabPane'].getTableData({},this);
        },
        watch: {
            aroles: function (val) {
                this.tableitems[7].subs[0].options = val;
            },
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

