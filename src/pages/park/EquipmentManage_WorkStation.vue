<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            设备管理-工作站管理
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item label="名称" class="clear-style margin-left-clear">
                    <el-input v-model="searchFormData.worksite_name" placeholder="请输入名称" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="说明" class="clear-style">
                    <el-input v-model="searchFormData.description" placeholder="请输入说明" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-button size="mini" @click="handleAdd" type="primary" v-if="hideAdd">添加工作站</el-button>
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>


            </el-form>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
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
    </section>
</template>

<script>

    import {path, checkURL, checkUpload, checkNumber, monitorType, net_status} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import TabPane from '../../components/table/TabPane';
    import customEditForm from '../../components/edit-form/editForm'
    import customAddForm from '../../components/add-form/addForm'
    import axios from 'axios'
    import {AUTH_ID} from "../../common/js/const";
    import {editTableData,addTableData} from "../../api/base";
    export default {
        components: {       //组件加载
            TabPane,customEditForm,customAddForm
        },
        data: function () {
            return {
                isShow:false,
                delForm:{},
                rowdata:{},
                editFormVisible:false,
                editloading:false,
                addFormVisible:false,
                addloading:false,
                addFormData:{},
                searchFormData:{
                    worksite_name:'',
                    worksite_name:'',
                },
                searchForm:{},
                queryapi: '/EQ_workStation/query',    //数据请求路径
                addapi: '/EQ_workStation/add',
                editapi: '/EQ_workStation/edit',
                delapi: '/EQ_workStation/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'worksite_name__description__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            fixed:'left',
                            width:'100',
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
                                            display:this.showEdit?'':'none',
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editFormVisible = true;
                                                this.rowdata = params.row;
                                                this.rowdata.monitor_id = this.rowdata.monitor_id+'';
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
                                            display:this.showdelete?'':'none',
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.delForm = {
                                                    $index:params.index,
                                                    delVisible2:true,
                                                    id:params.row.id,
                                                }

                                            }
                                        }
                                    }, '删除'),
                                ]);
                            }
                        }]
                    },{
                        hasSubs:false,
                        subs: [{
                            label: '索引',
                            columnType:'render',
                            align: 'center',
                            fixed:'left',
                            width:'100',
                            unsortable: true,
                            render: (h, params) => {
                                return h('div', [
                                    h('span', params.index+1),
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '100',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'worksite_name',
                            width: '300',
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
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '说明',
                            prop: 'description',
                            width: '550',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'left',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "textarea",
                        }]
                    },
                ],
                hideAdd:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.$refs['tabPane'].getTableData({},this)
        },
        methods:{
            changeMore(){
                this.isShow = !this.isShow
            },
            cancelDel(){
                this.delForm.delVisible2 = false;
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
                                if(res.data == 1){
                                    that.$message({
                                        message: '编辑成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.editFormVisible = false;
                                        that.$refs['tabPane'].getTableData(that.searchFormData,that);
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
            handleAdd(){
                this.addFormData = {};
                this.addFormVisible = true;
            },
            onAdd:function () {
                console.log('aform',this.addFormData)
                //发送请求,添加一条记录
                let that = this;
                let api = this.addapi;
                let aform = this.addFormData;
                aform = common.generateForm(aform);
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addTableData(api,aform).then(res=>{
                            if(res.status == 200){
                                if(res.data == 1){
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
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    worksite_name:'',
                    worksite_name:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.equipmentManage_WorkStation == item.auth_id) {
                            this.hideAdd= common.showSubAdd(item.sub_auth)
                            this.showEdit= common.showSubEdit(item.sub_auth)
                            this.showdelete= common.showSubDel(item.sub_auth)
                            if(this.showEdit==false&&this.showdelete==false){
                                this.hideOptions= true
                            }
                            break;
                        }
                    }

                }

            }
        },
        activated() {
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
        },
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>
