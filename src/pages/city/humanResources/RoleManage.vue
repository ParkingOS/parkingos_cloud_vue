<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">人力资源<span style="margin: 2px">-</span>角色管理</p>
                <div class="float-right">
                    <el-button @click="handleAdd" icon="el-icon-plus" type="text"  v-if="hideAdd">添加角色</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
        </div>


        <!--<header class="custom-header">-->
        <!--员工权限-角色管理 <div class="float-right"><el-button @click="handleAdd" type="primary" size="mini" v-if="hideAdd">添加角色</el-button>-->
        <!--<el-button size="mini" @click="resetForm">刷新</el-button></div>-->
        <!--</header>-->

        <div class="table-wrapper-style">
            <tab-pane
                    :delapi="delapi"
                    :del-form="delForm"
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    :searchForm="searchForm"
                    align-pos="right"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:cancelDel="cancelDel"
            ></tab-pane>
        </div>
        <custom-add-form
                ref="addref"
                :value="addFormData"
                :addFormConfig="tableitems"
                title="添加"
                v-on:input="onAddInput"
                v-on:add="onAdd"
                v-on:cancelAdd="cancelAdd"
                :addVisible="addFormVisible"></custom-add-form>
        <custom-edit-form
                ref="editref"
                :value="rowdata"
                :editFormConfig="tableitems"
                title="编辑"
                v-on:input="onEditInput"
                v-on:edit="onEdit"
                v-on:cancelEdit="cancelEdit"
                :editVisible="editFormVisible"></custom-edit-form>
        <el-dialog
                width="650px"
                :visible.sync="isShowPermission"
                custom-class="custom-dialog"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                权限设置<i class="el-icon-close dialog-header-iconfont" @click="isShowPermission = false"></i>
            </header>

            <el-scrollbar class="set-jurisdiction">
                <div  style="padding: 10px">
                    <div v-for="sub of permissions" style="padding-bottom: 10px">
                        <div class="dividing-wrapper">
                            <el-checkbox @change="subchange(sub)" v-model="sub.ischeck">{{sub.subname}}</el-checkbox><p class="dividing-line"></p>
                        </div>
                        <div style="margin-left: 40px;" v-for="sub_ of sub.subpermission">
                            <el-checkbox @change="sub_change(sub,sub_)" v-model="sub_.ischeck">{{sub_.subname}}</el-checkbox>
                            <div style="margin-left: 20px;display: flex;flex-wrap:wrap;">
                                <div style="margin-left: 20px;"
                                     v-for="sub__ of sub_.subpermission">
                                    <el-checkbox @change="sub__change(sub,sub_,sub__)"
                                                 v-model="sub__.ischeck">{{sub__.subname}}
                                    </el-checkbox>
                                    <div style="margin-left: 20px;display: flex;flex-direction: row;"><div style="margin-left: 20px">
                                        <el-checkbox v-for="sub___ of sub__.subpermission"
                                                     @change="sub___change(sub,sub_,sub__,sub___)"
                                                     v-model="sub___.ischeck">{{sub___.subname}}
                                        </el-checkbox>
                                    </div></div>

                                    <!--</el-checkbox>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            <footer slot="footer" class="dialog-footer">
                <el-button size="small" style="width: 90px;" @click="isShowPermission = false">取 消</el-button>
                <el-button type="primary" :loading="dialogloading" size="small" style="width: 90px;margin-left: 60px" @click="handleSavePermission">确 定</el-button>
            </footer>
        </el-dialog>
    </section>
</template>


<script>
    import {path, RoleFuncion} from '@/api/api';
    import common from '@/common/js/common'
    import {AUTH_ID_CITY} from '@/common/js/const'
    import TabPane from '@/components/table/TabPane';
    import customEditForm from '@/components/edit-form/editForm'
    import customAddForm from '@/components/add-form/addForm'
    import {editTableData,addTableData} from "@/api/base";

    export default {
        components: {
            TabPane,customEditForm,customAddForm
        },
        data() {
            return {
                searchFormData:{
                    count:0
                },
                searchForm:{},
                addFormData:{},
                addFormVisible:false,
                rowdata:{},
                editFormVisible:false,
                editloading:false,
                delForm:{},
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: false,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                orderfield:'id',
                // showSettingFee: true,
                // showCommutime: true,
                showPermission: true,
                addapi: '/city/addOrEditRole',
                delapi: '/city/addOrEditRole',
                editapi: '/city/addOrEditRole',
                queryapi: '/city/getRoles',
                permissionapi: '/grouprole/getroleauth',
                permissioneditapi: '/grouprole/editroleauth',
                btswidth: '180',
                fieldsstr: 'id__role_name__func__resume',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '角色编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addtable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'role_name',
                                width: '123',
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
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '功能',
                                prop: 'func',
                                width: '123',
                                type: 'selection',
                                selectlist: RoleFuncion,
                                editable: false,
                                searchable: true,
                                addable: false,
                                unsortable: true,
                                hidden: true,
                                align: 'center',
                                format: function (row) {
                                    return common.funcformat(row.is_collector, row.is_inspect, row.is_opencard)
                                    // return RoleFuncion[1].value_name
                                }
                            },
                        ]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'resume',
                            width: '180',
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
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            width:'180',
                            hidden:false,
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
                                                this.editFormVisible = true;
                                                this.rowdata = params.row;
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
                                                    state:1,
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
                                            display:this.showPermission?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showRolePermission(params.index,params.row);
                                            }
                                        }
                                    }, '修改权限'),
                                ]);
                            }
                        }]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '添加角色',
                addFormRules: {
                    role_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    role_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                isShowPermission: false,
                dialogloading: false,
                permissions: [],
                authlist: {},
                nickname: '',
                checksub: false,
                currentRow: ''
            }
        },
        methods: {

            resetForm(){
                let that = this;
                that.searchFormData.count = that.searchFormData.count++;
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            onAdd:function () {
                //发送请求,添加一条记录
                let that = this;
                let api = this.addapi;
                let aform = this.addFormData;
                aform = common.generateForm(aform);
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addTableData(api,aform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '添加成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.addFormVisible = false;
                                        that.$refs['tabPane'].getTableData({},that);
                                    },60)
                                }else{
                                    that.$message({
                                        message: '添加失败',
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
            cancelAdd:function () {
                this.addFormVisible = false;
            },
            onAddInput:function (aform) {
                this.addFormData = aform;
            },
            handleAdd(){
                this.addFormData = {};
                this.addFormVisible = true;
            },
            onEditInput:function (eform) {
                this.rowdata=eform;
            },
            onEdit: function () {
                //发送ajax,提交表单更新
                let that = this;
                let api = this.editapi;
                let eform = this.rowdata;
                eform = common.generateForm(eform);
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    console.log('valid',valid,eform)
                    if (valid) {
                        editTableData(api,eform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '编辑成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.editFormVisible = false;
                                        that.$refs['tabPane'].getTableData({},that);
                                    },60)
                                }else{
                                    that.$message({
                                        message: '编辑失败',
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
            cancelEdit(){
                this.editFormVisible = false;
            },
            cancelDel:function () {
                this.delForm.delVisible = false;
            },
            showRolePermission: function (index, row) {
                this.isShowPermission = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + _this.permissionapi + '?loginroleid=' + sessionStorage.getItem('loginroleid') + '&id=' + row.id+'&t='+Date.now())
                    .then(function (response) {
                        // console.log(response)
                        let ret = response.data;
                        _this.authlist = response.data;
                        console.log(_this.authlist)
                        _this.permissions = _this.authlist.allAuth;
                        _this.nickname = _this.authlist.nickname;
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            handleSavePermission: function () {

                let _this = this;
                _this.$axios.post(path + _this.permissioneditapi, _this.$qs.stringify({
                    id: _this.currentRow.id,
                    auths: JSON.stringify(_this.authlist)
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    if (ret.state == 1) {
                        _this.$message({
                            message: '更新成功!',
                            type: 'success',
                            duration: 600
                        });
                        _this.isShowPermission = false;
                    } else {
                        _this.$message({
                            message: '更新失败!' + ret.msg,
                            type: 'error',
                            duration: 600
                        });
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        _this.alertInfo('请求失败!' + error)
                    }, 150)
                })

            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        this.$router.push('/login');
                    }
                });
            },
            vertifyArray: function (array) {
                //确认是合法数组
                if (array != null && array != '' && array.length > 0) {
                    return true;
                }
                return false;
            },
            subchange: function (sub) {
                if (!this.vertifyArray(sub.subpermission))
                    return;
                for (let item of sub.subpermission) {
                    item.ischeck = sub.ischeck;
                    if (!this.vertifyArray(item.subpermission))
                        continue;
                    for (let item_ of item.subpermission) {
                        item_.ischeck = sub.ischeck;
                        if (!this.vertifyArray(item_.subpermission))
                            continue;
                        for (let item__ of item_.subpermission) {
                            item__.ischeck = item_.ischeck;
                        }
                    }
                }
            },
            sub_change: function (sub, sub1) {
                if (sub1.ischeck) {
                    sub.ischeck = true;
                }
                this.subchange(sub1)

            },
            sub__change: function (sub, sub1, sub2) {
                if (sub2.ischeck) {
                    sub1.ischeck = true;
                    sub.ischeck = true;
                }
                this.sub_change(sub1, sub2)
            },
            sub___change: function (sub, sub1, sub2, sub3) {
                if (sub3.ischeck) {
                    sub2.ischeck = true;
                    sub1.ischeck = true;
                    sub.ischeck = true;
                }
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_CITY.cityResources_RoleManage == item.auth_id) {
                            this.showdelete = common.showSubDel(item.sub_auth)
                            this.showEdit = common.showSubEdit(item.sub_auth)
                            this.hideAdd = common.showSubAdd(item.sub_auth)
                            this.showPermission = common.showSubPermission(item.sub_auth)
                            if(!this.showEdit&&!this.showdelete&&!this.showPermission){
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
            this.$refs['tabPane'].getTableData({},this)
        },
        watch:{
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

