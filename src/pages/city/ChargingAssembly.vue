<template>
    <section class="shop-table-wrapper">
        <div class="shop-custom-operation">
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <div>
                            <el-button type="primary" @click="handleAdd"  style="width: 120px;margin-right: 20px" :disabled="isSHow">新增</el-button>
                            <el-checkbox v-model="priority"  @change="firstCloud">平台计费优先</el-checkbox>
                            <a href="javasript:;" style="margin-left: 20px" >使用说明</a>
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
                    v-on:transferData="transferData"
                    v-on:totalCount="totalCount"
            ></tab-pane>
        </div>
        <!--重置密码-->
        <el-dialog
                custom-class="custom-dialog"
                :show-close="false"
                :close-on-click-modal="false"
                :visible.sync="ruleVisible"
                width="450px"
        >
            <header class="dialog-header" slot="title">
                计费测试<i class="el-icon-close dialog-header-iconfont" @click="cancelModel"></i>
            </header>
            <el-form
                    class="custom-form-style"
                    :model="ruleFrom"
                    label-width="80"
                    >
                <el-form-item label="入场时间">
                    <el-date-picker
                            v-model="ruleFrom.inlasse"
                            type="datetime"
                            default-time="00:00:00"
                            value-format="timestamp"
                            placeholder="选择入场时间"
                            @change="changeDateFormat">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出场时间">
                    <el-date-picker
                            v-model="ruleFrom.appearance"
                            type="datetime"
                            default-time="23:59:59"
                            value-format="timestamp"
                            placeholder="选择出场时间"
                            @change="changeDateFormat">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="金额统计">
                    <p>{{ruleFrom.money}}</p>
                </el-form-item>
            </el-form>
        </el-dialog>


    </section>
</template>

<script>
    import axios from 'axios';
    import {blackStateType,path} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    export default {
        name: 'charging_assembly',
        components: {
            TabPane
        },
        props:{
            showState:{
                type:String,
                defalut:'staff'
            },
            count:{
                type:Number,
                defalut:0
            }
        },
        data() {
            return {
                ////////////////////////////////////////
                isSHow:false,
                $uid:'',
                offState:false,
                ruleFrom:{
                    inlasse:'',
                    appearance:'',
                    money:''
                },
                priority:false,
                /////////////////////////////////////////////////////
                aroles:[],
                pwd1:'',
                pwd2:'',
                ruleVisible:false,
                orderImg:require('@/assets/images/order-back.png'),
                shop_id:'',
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{},
                addedValue:{
                    comid:''
                },
                addTo:0,
                //删除
                delForm:{},
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    comid:'',
                    count:0
                },
                searchForm:{},
                queryapi:'/charging/query',
                addapi: '/charging/add',
                delapi: '/charging/delete',
                editapi: '/charging/edit',
                btswidth: '100',
                fieldsstr: 'id__name__remark__comid__js_content',
                tableitems: [
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
                                                this.editRowData.comid = this.searchFormData.comid;
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
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.resetPassword(params.row)
                                            }
                                        }
                                    }, '测试'),
                                    h('ElPopover',{
                                        props:{
                                            placement:'top',
                                            trigger:'click'
                                        }
                                    },[
                                        h('p',{},'确定要更改操作吗？'),
                                        h('div',{},[
                                            h('ElSwitch',{
                                                props:{
                                                    activeText:'ON',
                                                    inactiveText:'OFF',
                                                    value:(params.row.is_open == 1)?true:false
                                                },
                                                on: {
                                                    change: (e) => {

                                                        // console.log('----id',params.row.id)
                                                        this.changeState(e,params.row)
                                                    }
                                                }
                                            })
                                        ]),
                                        h('ElButton', {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            slot:'reference',
                                            style: {
                                                marginRight: '5px',
                                            },
                                            on: {
                                                click:(e)=>{
                                                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                    // this.$uid =
                                                }
                                            }
                                        }, '开关'),
                                    ]),
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
                    {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'name',
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
                            label: '计费代码',
                            prop: 'js_content',
                            addtable:true,
                            editable:true,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "textarea",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "textarea",
                            "rows":4,
                            "rules": [
                                {required: true, message: '请输入计费代码', trigger: 'blur'}
                            ],
                            columnType:'render',
                            render: (h, params) => {
                                let str = params.row.js_content;
                                if(str.length >60){
                                    str = str.substring(0,60)+'...'
                                }
                                return h('div', [
                                    h('span', str)
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
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
            totalCount(val){
                if(val>=1){
                    this.isSHow = true;
                }else{
                    this.isSHow = false;
                }
            },
            transferData(val){
                if(val.total>=1){
                  this.isSHow = true;
                }else{
                  this.isSHow = false;
                }
            },
            changeDateFormat(val){
                if(this.ruleFrom.inlasse != "" && this.ruleFrom.inlasse != null && this.ruleFrom.appearance != '' && this.ruleFrom.appearance != null){
                    let vm = this;
                    // this.searchFormData.comid
                    let rform = {
                        comid:vm.searchFormData.comid,
                        cloud_first:vm.priority?'1':'0'
                    }
                    vm.$axios.get(path + '/charging/testjs?id='+vm.rowid+'&begin_time='+vm.ruleFrom.inlasse+'&end_time='+vm.ruleFrom.appearance+'&tmp='+new Date().getTime()).then(function (response) {
                        // console.log('优先级别',response)
                        if(response.status == 200){
                            vm.ruleFrom.money = response.data;
                        }
                    }).catch(function (error) {
                        vm.$message.error(ndata.msg);
                    })
                }
            },
            changeState(e,row){
                let vm = this;
                let rform = {
                    id:row.id,
                    is_open:e?'1':'0'
                }
                vm.$axios.post(path + '/charging/openorclose', vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ndata = response.data;
                    if(ndata.state == 1){
                        // vm.offState = e;
                        row.is_open = e?'1':'0';
                        vm.$message.success(ndata.msg);
                    }else if(ndata.state == 0){
                        vm.$message.error(ndata.msg);
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })
            },
            firstCloud(){
                let vm = this;
                let rform = {
                    comid:vm.searchFormData.comid,
                    cloud_first:vm.priority?'1':'0'
                }
                vm.$axios.post(path + '/charging/cloudfirst', vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    console.log('优先级别',response)
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })
            },
            cancelModel(){
                this.ruleVisible = false;
            },
            handleClick(){

            },
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
                vm.$axios.post(path + '/member/editpass', vm.$qs.stringify(rform), {
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
                            vm.ruleVisible = false;
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
                //测试对话框
                this.ruleVisible = true;
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
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addedValue.comid = this.searchFormData.comid;
                this.addRowData = {};
                this.addRowData.comid = this.searchFormData.comid;
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
                // that.searchFormData.strid= '';
                // that.searchFormData.nickname= '';
                // that.searchFormData.currentData='';

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
                let vm = this;
                vm.$axios.get(path + '/charging/getfirstornot?comid='+id).then(function (response) {
                    vm.priority = response.data == 1?true:false;
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
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
        },
        mounted() {
            // this.setAuthorityFn();

        },
        activated() {
            let $url =  document.location.href;
            this.searchFormData.comid = $url.split('=')[1];
            this.getQuery(this.searchFormData.comid);
            this.resetForm()
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
            showState:function (newVal,oldVal) {

                if(newVal == 'charging'){
                    let $url =  document.location.href;
                    this.searchFormData.comid = $url.split('=')[1];
                    this.getQuery(this.searchFormData.comid);
                    this.resetForm()
                }
            },
            count:function (newVal,oldVal) {
                if(this.showState == 'charging'){
                    let $url =  document.location.href;
                    this.searchFormData.comid = $url.split('=')[1];
                    this.getQuery(this.searchFormData.comid);
                    this.resetForm()
                }
            }
        }
    };
</script>

<style scoped>

</style>