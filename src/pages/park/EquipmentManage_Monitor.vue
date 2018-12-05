<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            设备管理-监控管理
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item label="编号" class="clear-style margin-left-clear">
                    <el-input v-model="searchFormData.id" placeholder="请输入编号" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="名称" class="clear-style">
                    <el-input v-model="searchFormData.name" placeholder="请输入名称" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="通道" class="clear-style">
                    <el-select v-model="searchFormData.channel_id" placeholder="请选择通道" size="mini" style="width: 140px">
                        <el-option
                                v-for="item in channelType"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" class="clear-style">
                    <el-input v-model="searchFormData.play_src" placeholder="请输入地址" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                    <!--<el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px"></i> 更多选项</el-button>-->
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-button size="mini" @click="handleAdd" type="primary" v-if="hideAdd">添加监控器</el-button>
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
                delForm:{

                },
                rowdata:{},
                editFormVisible:false,
                editloading:false,
                addFormVisible:false,
                addloading:false,
                addFormData:{
                    state:'0'
                },
                searchFormData:{
                    id:'',
                    id_start:'',
                    name:'',
                    channel_id:'',
                    channel_id_start:'',
                    play_src:'',
                },
                searchForm:{},
                loading: false,         //loading页面是否显示
                hideExport: true,       //隐藏导出
                hideSearch: false,      //隐藏查询
                 //显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                       //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                queryapi: '/EQ_monitor/query',    //数据请求路径
                addapi: '/EQ_monitor/add',
                editapi: '/EQ_monitor/edit',
                delapi: '/EQ_monitor/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__name__channel_id__net_status__is_show__show_order__play_src__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
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
                                            display:this.showEdit?'':'none'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editFormVisible = true;
                                                this.rowdata = params.row;
                                                this.rowdata.is_show = this.rowdata.is_show+'';
                                                if(this.rowdata.channel_id == undefined){
                                                    this.rowdata.channel_id = '';
                                                }else{
                                                    this.rowdata.channel_id = this.rowdata.channel_id+'';
                                                }
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
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',          //页面表格显示
                            prop: 'id',             //对应表中字段
                            width: '100',           //列宽度
                            type: 'number',         //对应表中字段类型
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: false,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'name',
                            width: '165',
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
                                {required: true, message: '请输入名称', trigger: 'blur'}
                            ],
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '通道',
                            prop: 'channel_id',
                            width: '150',
                            selectlist:this.channelType,//此处引用通道管理的名称栏
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, this.channelType, 'channel_id'))
                                ]);
                            },
                            "type": "select",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'',
                            "options": this.channelType
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '是否显示',
                            prop: 'is_show',
                            width: '100',
                            selectlist:monitorType,
                            editable: true,
                            searchable: false,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, monitorType, 'is_show'))
                                ]);
                            },
                            "type": "radio",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'',
                            "options": [
                                {
                                    "value_no": "0",
                                    "value_name": "隐藏",
                                    "disabled": false
                                },
                                {
                                    "value_no": "1",
                                    "value_name": "显示",
                                    "disabled": false
                                }
                            ]
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '排序',
                            prop: 'show_order',
                            width: '100',
                            editable: true,
                            searchable: false,
                            addtable: true,
                            unsortable: false,
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
                            width:'420',
                            label: '地址',
                            prop: 'play_src',
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
                ],
                addtitle: '添加监控器',
                searchtitle: '搜索监控器',
                channelType:'',
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.getQuery();
            this.$refs['tabPane'].getTableData({},this)
        },
        methods:{
            cancelDel(){
                this.delForm.delVisible = false;
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
                                        that.$refs['tabPane'].getTableData(that.searchFormData,that);
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
                    id:'',
                    id_start:'',
                    name:'',
                    channel_id:'',
                    channel_id_start:'',
                    play_src:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.id_start = sform.id;
                sform.channel_id_start = sform.channel_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getQuery(){
                let _this = this
                axios.all([common.getChannelType()])
                    .then(axios.spread(function (ret) {
                        _this.channelType = ret.data;
                    }))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.equipmentManage_Monitor == item.auth_id) {
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
            channelType:function (newVal,oldVal) {
                this.tableitems[3].subs[0].options = newVal;
            }
        },
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>
