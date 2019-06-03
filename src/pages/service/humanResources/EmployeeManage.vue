<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">员工权限<span style="margin: 2px">-</span>员工管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="编号">
                            <el-input style="width: 140px" v-model="searchFormData.id_start" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input style="width: 140px" v-model="searchFormData.nickname" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="登录账号">
                            <el-input style="width: 140px" v-model="searchFormData.strid" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item  class="clear-style" label="角色">
                            <el-select v-model="searchFormData.role_id"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in aroles"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button @click="handleAdd" type="primary" v-if="hideAdd">注册员工</el-button>
                            </el-form-item>
                        </div>
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
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :orderfield="orderfield"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:cancelDel="cancelDel"
            ></tab-pane>
        </div>
        <!--重置密码-->
        <el-dialog
                @close="closeFn"
                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="560px">
            <el-form ref="passwordRef" :model="resPwd" :rules="rules"  label-width="200px" style="margin-bottom:-30px">
                <el-form-item label="请输入新密码" prop="pass" >
                    <el-input type="password" v-model="resPwd.pass" style="width:240px" size="" ></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码" prop="checkPass">
                    <el-input type="password" v-model="resPwd.checkPass" style="width:240px" size=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="resetPwdVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="resetPwdFn" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    import {genderType, collectType, checkTelePhone, checkMobile,path} from '../../../api/api';
    import common from '../../../common/js/common';
    import {AUTH_ID_SERVER} from '../../../common/js/const';
    import CommonTable from '../../../components/CommonTable';
    import axios from 'axios';
    import TabPane from '../../../components/table/TabPane';
    export default {
        components: {
            CommonTable,TabPane
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
                //重置密码
                rules:{
                    pass:[{  validator: validatePass,  trigger: 'blur' }],
                    checkPass:[{  validator: validatePass2, trigger: 'blur', }]
                },
                rowid:'',
                resetloading:false,
                resetPwdVisible:false,
                resPwd:{
                    pass:'',
                    checkPass:''
                },
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{},
                addTo:0,
                //删除
                delForm:{},
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    id:'3',
                    id_start:'',
                    nickname:'',
                    strid:'',
                    role_id:'',
                    role_id_start:'',

                },
                searchForm:{},

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
                addapi: '/unionserver/addMemberFromServer',
                delapi: '/unionserver/deleteMember',
                editapi: '/unionserver/editMember',
                queryapi: '/unionserver/queryMember',
                resetapi: '/unionserver/editMemberPass',
                btswidth: '180',
                orderfield:'id',
                fieldsstr: 'id__nickname__strid__phone__mobile__role_id__reg_time__sex__logon_time__isview',

                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'employee-permission',
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
                            width: '130',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '姓名',
                                prop: 'nickname',
                                width: '130',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入姓名', trigger: 'blur'}
                                ],
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '登录账号',
                                prop: 'strid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,

                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '电话',
                                prop: 'phone',
                                width: '123',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                hidden:true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '手机',
                                prop: 'mobile',
                                width: '113',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '角色',
                                prop: 'role_id',
                                width: '130',
                                selectlist: this.aroles,
                                editable: true,
                                searchable: true,
                                addtable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.nameformat(params.row, this.aroles, 'role_id'))
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
                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'reg_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                        }]
                    },
                    // {
                    //     hasSubs: false, subs: [
                    //         {
                    //             label: '性别',
                    //             prop: 'sex',
                    //             width: '100',
                    //             selectlist: genderType,
                    //             editable: true,
                    //             searchable: true,
                    //             addtable: true,
                    //             unsortable: true,
                    //             align: 'center',
                    //             columnType:'render',
                    //             render: (h, params) => {
                    //                 return h('div', [
                    //                     h('span', common.nameformat(params.row, genderType, 'sex'))
                    //                 ]);
                    //             },
                    //             "type": "select",
                    //             "value": "",
                    //             "button": false,
                    //             "border": true,
                    //             "rules": [
                    //                 {required: true, message: '请选择角色', trigger: 'blur'}
                    //             ],
                    //             'size':'',
                    //             "options": genderType,
                    //         }
                    //     ]
                    // },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '最近登录时间',
                            prop: 'logon_time',
                            width: '180',
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
                            },
                        }]
                    }, {

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
                            width:'180',
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
                                            display:this.showEdit?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editRowData.role_id = this.editRowData.role_id+'';
                                                this.editRowData.sex = this.editRowData.sex+'';
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
                                            marginRight: '5px',
                                            color:'red',
                                            display:this.showdelete?'':'none'
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
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showresetpwd?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.rowid = params.row.id;
                                                this.resetPwdVisible = true;
                                            }
                                        }
                                    }, '重置密码'),
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
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.id = sform.id_start;
                sform.role_id_start = sform.role_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    id:'3',
                    id_start:'',
                    nickname:'',
                    strid:'',
                    role_id:'',
                    role_id_start:'',

                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            closeFn(){
                this.$refs['passwordRef'].resetFields()
            },
            resetForm(){
                this.initFn(this)
            },
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
                                    vm.resetPwdVisible = false;
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
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addRowData = {};
                this.addTo++
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            changeDateFormat() {
                ;
            },
            getQuery(){
                let _this = this;
                this.$axios.get(path+'/unionserver/getRolesFromUnion?serverid='+sessionStorage.getItem('serverid')+'&loginuin='+sessionStorage.getItem('loginuin'))
                    .then( ret =>{
                        _this.aroles = ret.data;
                    })
                    .catch(err=>{
                        console.log('err-->',err)
                    })
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
                        if (AUTH_ID_SERVER.serverResources_EmployeeManage == item.auth_id) {
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showresetpwd = common.showSubReset(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.hideAdd = common.showSubAdd(item.sub_auth);
                            if (!this.showEdit && !this.showdelete && !this.showresetpwd) {
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
            this.$refs['tabPane'].getTableData({},this);
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
            aroles: function (val) {
                this.tableitems[6].subs[0].options = val;
            }
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

