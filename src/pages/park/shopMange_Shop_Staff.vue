<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">商户管理<span style="margin: 2px">-</span>商户管理<span style="margin: 2px">-</span>员工管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="saveModify" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">

                        <!--<el-form-item label="创建时间">-->
                            <!--<el-date-picker-->
                                    <!--style="width: 350px"-->
                                    <!--class="shop-custom-datepicker"-->
                                    <!--v-model="searchFormData.currentData"-->
                                    <!--type="datetimerange"-->
                                    <!--range-separator="至"-->
                                    <!--:default-time="['00:00:00','23:59:59']"-->
                                    <!--start-placeholder="请输入时间"-->
                                    <!--end-placeholder="请输入时间"-->
                                    <!--value-format="timestamp"-->
                                    <!--@change="changeDateFormat"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->

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
    import {blackStateType} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    export default {
        name: 'shop-mange_-shop_-staff',
        components: {
            TabPane
        },
        data() {
            return {
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
                  shop_id:''
                },
                addTo:0,
                //删除
                delForm:{},
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    shop_id:'',
                    currentData:'',
                    nickname:'',
                    count:0
                },
                searchForm:{},
                queryapi:'/shopmember/quickquery',
                addapi: '/shopmember/create',
                delapi: '/shopmember/delete',
                editapi: '/shopmember/create',
                btswidth: '100',
                fieldsstr: 'id__reg_time__logon_time__nickname__strid__mobile__phone__auth_flag',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '100',
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
                                width: '160',
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
                            width: '160',
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
                            width: '100',
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
                            width: '123',
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
                            width: '123',
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
                            width: '123',
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
                            label: '角色',
                            prop: 'auth_flag',
                            width: '100',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.strFormat(params.row))
                                ]);
                            },
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
                                                this.editRowData.shop_id = this.searchFormData.shop_id;
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
                var vm = this
                if (this.pwd1 == '' || this.pwd2 == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }
                if (!(/^(\w){6,12}$/.test(this.pwd1)) || !(/^(\w){6,12}$/.test(this.pwd2))) {
                    this.$message.error('密码为6-12位字母,数字或下划线!');
                    return
                }
                if (this.pwd1 != this.pwd2) {
                    this.$message.error('两次输入密码不一致!');
                    return
                }
                var formObj = {};
                formObj.newpass = this.pwd1;
                formObj.confirmpass = this.pwd2;
                formObj.id = this.rowid;
                common.editPass(formObj).then(function (ret) {
                    if (ret.data.validate != 'undefined' && ret.data.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.data.validate != 'undefined' && ret.data.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret.data.state == 1) {
                            //更新成功
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false
                            vm.searchFn()
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!',
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }
                });
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
                this.searchForm = JSON.parse(JSON.stringify( this.searchFormData ));
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
                this.addedValue.shop_id = this.searchFormData.shop_id;
                this.addRowData = {};
                this.addRowData.shop_id = this.searchFormData.shop_id;
                this.addRowData.auth_flag = 14;
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
            }
        },
        mounted() {
            // this.setAuthorityFn();

        },
        activated() {
            let $url =  document.location.href;
            this.searchFormData.shop_id = $url.split('=')[1];
            this.searchFn();
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
        }
    };
</script>

<style scoped>

</style>