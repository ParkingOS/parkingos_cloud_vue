<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">运营集团管理<span style="margin: 2px">-</span>员工管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="saveModify" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">

                        <el-form-item label="姓名" class="clear-style margin-left-20">
                            <el-input v-model="searchFormData.nickname" placeholder="请输入姓名" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button type="primary" @click="handleAdd" >添加员工</el-button>
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
                    :addedValue="addedValue"
                    v-on:addInput="addInput"
                    :delapi="delapi"
                    :del-form="delForm"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
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
                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="30%"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="请输入新密码">
                    <el-input v-model="pwd1" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="pwd2" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="resetPwdVisible = false" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="resetPwd">确 定</el-button>
        </span>
        </el-dialog>


    </section>
</template>

<script>
    import axios from 'axios/index';
    import {path,blackStateType} from '../../../api/api';
    import common from '../../../common/js/common'
    import {AUTH_ID} from '../../../common/js/const'
    import TabPane from '../../../components/table/TabPane';
    export default {
        name: 'shop-mange_-shop_-staff',
        components: {
            TabPane
        },
        data() {
            return {
                aroles:[],
                pwd1:'',
                pwd2:'',
                resetPwdVisible:false,
                orderImg:require('@/assets/images/order-back.png'),
                shop_id:'',
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{},
                addedValue:{
                    groupid:''
                },
                addTo:0,
                //删除
                delForm:{},
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    oid:2,
                    groupid:'',
                    nickname:'',
                    count:0
                },
                searchForm:{},
                queryapi:'/groupmember/query',
                addapi: '/groupmember/createmember',
                delapi: '/groupmember/delmember',
                editapi: '/groupmember/editmember',
                btswidth: '100',
                fieldsstr: 'id__nickname__strid__phone__mobile__role_id__reg_time__sex__logon_time__isview',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            type: 'number',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'reg_time',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.reg_time))
                                    ]);
                                },
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '最近登录时间',
                            prop: 'logon_time',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.logon_time))
                                ]);
                            },
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '姓名',
                            prop: 'nickname',
                            searchable: true,
                            unsortable: true,
                            addtable: true,
                            editable:true,
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
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '登录账号',
                            prop: 'strid',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '手机',
                            prop: 'mobile',
                            addtable:true,
                            editable:true,
                            searchable: true,
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

                        hasSubs: false,
                        subs: [{
                            label: '电话',
                            prop: 'phone',
                            addtable:true,
                            editable:true,
                            searchable: true,
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
                            width:'160',
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
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editRowData.role_id = params.row.role_id+'';
                                                this.editRowData.groupid = this.searchFormData.groupid;
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

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.resetPassword(params.row)
                                            }
                                        }
                                    }, '修改密码'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color:'red',
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
                addtitle: '添加黑名单',
                addFormRules: {
                    car_number: [
                        {required: true, message: '请输入车牌号', trigger: 'blur'}
                    ],
                    operator: [
                        {required: true, message: '请输入操作人', trigger: 'blur'}
                    ],
                },
                hideAdd:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,
            }
        },
        methods:{
            resetPwd() {
                let vm = this;
                if (this.pwd1 === '' || this.pwd2 === '') {
                    this.$message.error('密码不能为空!');
                    return;
                }
                if (!(/^(\w){6,12}$/.test(this.pwd1)) || !(/^(\w){6,12}$/.test(this.pwd2))) {
                    this.$message.error('密码为6-12位字母,数字或下划线!');
                    return
                }
                if (this.pwd1 !== this.pwd2) {
                    this.$message.error('两次输入密码不一致!');
                    return
                }
                let rform = {
                    'newpass': this.pwd1,
                    'confirmpass': this.pwd2,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token')
                };
                vm.$axios.post(path + '/groupmember/editpass', vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate !== 'undefined' && ret.validate === '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate !== 'undefined' && ret.validate === '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret > 0 || ret.state === 1) {
                            //更新成功
                            vm.searchFn()
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false;
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
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })
            },
            resetPassword(row) {
                this.rowid = row.id
                this.pwd1 = ''
                this.pwd2 = ''
                //显示充值密码对话框
                this.resetPwdVisible = true;
            },
            saveModify: function () {
                this.$router.history.go(-1);
            },
            searchFn(){
                this.searchForm = JSON.parse(JSON.stringify( this.searchFormData));
            },
            regUser(){

            },
            strFormat(row, column) {
                if (row.auth_flag == 14) {
                    return "负责人"
                } else {
                    return "工作人员"
                }
            },
            changeDateFormat(val){

            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addedValue.groupid = this.searchFormData.groupid;
                this.addedValue.oid = this.searchFormData.oid;
                this.addRowData = {};
                this.addRowData.groupid = this.searchFormData.groupid;
                this.addRowData.oid = this.addRowData.oid;
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            //刷新
            resetForm(){
                let that = this;
                that.searchFormData.count = that.searchFormData.count++;
                that.searchFormData.nickname= '';
                that.searchFormData.currentData='';

                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.systemManage_BlackList == item.auth_id) {
                            this.hideAdd = common.showSubAdd(item.sub_auth)
                            this.showEdit = common.showSubEdit(item.sub_auth)
                            this.showdelete = common.showSubDel(item.sub_auth)
                            if(!this.showEdit&&!this.showdelete){
                                this.hideOptions = true;
                            }
                            break;
                        }
                    }

                }
            },
            getQuery(id){
                let _this = this;
                sessionStorage.setItem('comid', id);
                axios.all([common.getEmployeeRole()])
                    .then(axios.spread(function (ret) {
                        _this.aroles = ret.data;
                        sessionStorage.setItem('comid', '')
                    }))
            }
        },
        mounted() {
            let gid = this.$route.query.shop_id;
            this.searchFormData.groupid = gid;
            this.searchFn();
        },
        activated() {

        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
            aroles:function (newVal,oldVal) {
                this.tableitems[7].subs[0].options = newVal;
            }
        }
    };
</script>

<style scoped>

</style>