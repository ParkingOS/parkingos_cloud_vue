<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">员工管理<span style="margin: 2px">-</span>角色管理</p>
                <div class="float-right"><el-button type="text" size="mini" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" v-model="formItem" class="shop-custom-form-search">
                    <div class="console-main">

                        <el-form-item label="名称" >
                            <el-input v-model="formItem.role_name" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" style="width: 86px" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                    <el-button type="primary" style="width: 114px" v-if="hideAdd" @click="handleAdd" icon="el-icon-circle-plus-outline">添加角色</el-button>
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
        <el-dialog
                width="600px"
                :show-close="false"
                :visible.sync="isShowPermission"
                custom-class="custom-dialog">
            <header class="dialog-header" slot="title">
                权限设置<i class="el-icon-close dialog-header-iconfont" @click="isShowPermission = false"></i>
            </header>
            <div class="set-jurisdiction">
                <div style="padding: 10px">
                    <div v-for="sub of permissions" style="padding-bottom: 10px">
                        <div class="dividing-wrapper">
                            <el-checkbox @change="subchange(sub)" v-model="sub.ischeck">{{sub.subname}}</el-checkbox><p class="dividing-line"></p>
                        </div>
                        <div style="margin-left: 40px;" v-for="sub_ of sub.subpermission">
                            <el-checkbox @change="sub_change(sub,sub_)" v-model="sub_.ischeck">{{sub_.subname}}</el-checkbox>
                            <div style="margin-left: 20px;display: flex;flex-direction: row;">
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
                                </div>
                            </div>
                        </div>
                        <!--<div style="width: 100%;height: 1px;background-color:#475669;margin: 20px 0;"></div>-->

                    </div>
                </div>
            </div>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="isShowPermission = false" class="dialog-footer-btn">取 消</el-button>
                <el-button type="primary" style="margin-left: 60px" @click="handleSavePermission" :loading="dialogloading" class="dialog-footer-btn">确 定</el-button>
            </footer>
        </el-dialog>
    </section>
</template>


<script>
    import {path, RoleFuncion} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_SHOP} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import TabPane from '../../components/table/TabPane';

    export default {
        components: {
            CommonTable,TabPane
        },
        data() {
            return {
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
                formItem:{
                    role_name:''
                },
                //////////////////////////////////////////
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                orderfield:'id',
                // showSettingFee: true,
                // showCommutime: true,
                showPermission: true,
                addapi: '/adminrole/addrole',
                delapi: '/adminrole/deleterole',
                editapi: '/adminrole/editrole',
                queryapi: '/adminrole/query',
                permissionapi: '/adminrole/getroleauth',
                permissioneditapi: '/adminrole/editroleauth',
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
                            addable: false,
                            unsortable: true,
                            align: 'center',
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '角色名称',
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
                                "value": '',
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请填写角色名称', trigger: 'blur'}
                                ],
                                placeholder:'请输入角色名称'
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
                            label: '备注信息',
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
                            "value": '',
                            'size':'',
                            "subtype": "textarea",
                            placeholder:'请输入角色备注信息'
                        }]
                    },{
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
                                            color:'#3C75CF',
                                            display:this.showEdit?'':'none',
                                        },
                                        on: {
                                            click: () => {
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
                                            color:'#3C75CF',
                                            display:this.showPermission?'':'none',
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showRolePermission(params.index,params.row);
                                            }
                                        }
                                    }, '编辑权限'),
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
                authlist: {

                },
                nickname: '',
                checksub: false,
                currentRow: ''
            }
        },
        methods: {
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
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
                    role_name:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
            /////////////////////////////////////////////////////
            showRolePermission: function (index, row) {
                this.isShowPermission = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + _this.permissionapi +'?shopid=' + sessionStorage.getItem('shopid')+ '&loginroleid=' + sessionStorage.getItem('loginroleid') + '&id=' + row.id+'&t='+Date.now())
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
                        if (AUTH_ID_SHOP.shopRole == item.auth_id) {
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
            this.$refs['tabPane'].getTableData({},this);
        },
        watch: {
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

