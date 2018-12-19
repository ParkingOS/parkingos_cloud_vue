<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">设备管理<span style="margin: 2px">-</span>通道管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item  class="clear-style" label="非月卡车">
                            <el-select v-model="searchFormData.month_set"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in channlManager"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="说明">
                            <el-input style="width: 140px" v-model="searchFormData.description" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="编号">
                            <el-input style="width: 120px" v-model="searchFormData.id" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input style="width: 140px" v-model="searchFormData.passname" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item  class="clear-style" label="通道类型">
                            <el-select v-model="searchFormData.passtype"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in channlManagerType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  class="clear-style" label="工作站">
                            <el-select v-model="searchFormData.worksite_id"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in worksite_id"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button  @click="handleAdd" type="primary" v-if="hideAdd">添加通道</el-button>

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

    import {path, checkURL, checkUpload, checkNumber, channlManager,channlManagerType} from '../../api/api';
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
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                orderfield:'id',
                channlManagerType:channlManagerType,
                channlManager:channlManager,
                isShow:false,
                delForm:{

                },
                rowdata:{},
                editFormVisible:false,
                editloading:false,
                addFormVisible:false,
                addloading:false,
                addFormData:{
                    tele_phone:''
                },
                searchFormData:{
                    id:'',
                    id_start:'',
                    passname:'',
                    passtype:'',
                    passtype_start:'',
                    worksite_id:'',
                    worksite_id_start:'',
                    month_set:'',
                    month_set_start:'',
                    month2_set:'',
                    month2_set_start:'',
                    description:'',
                },
                searchForm:{},
                queryapi: '/EQ_channel/query',    //数据请求路径
                addapi: '/EQ_channel/add',
                editapi: '/EQ_channel/edit',
                delapi: '/EQ_channel/remove',
                fieldsstr: 'id__passname__passtype__worksite_id__month_set__month2_set__description__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
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
                            prop: 'passname',
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
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '通道类型',
                            prop: 'passtype',
                            width: '150',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, channlManagerType, 'passtype'))
                                ]);
                            },
                            "type": "select",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'',
                            "options": channlManagerType
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '所属工作站',
                            prop: 'worksite_id',
                            width: '150',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, this.worksite_id, 'worksite_id'))
                                ]);
                            },
                            "type": "select",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'',
                            "options": this.worksite_id
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '非月卡车',
                            prop: 'month_set',
                            width: '150',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, channlManager, 'month_set'))
                                ]);
                            },
                            "type": "select",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'',
                            "options": channlManager
                        }]
                    },
                    // {
                    //
                    //     hasSubs: false,
                    //     subs: [{
                    //         label: '月卡第二辆车',
                    //         prop: 'month2_set',
                    //         width: '150',
                    //         editable: true,
                    //         searchable: true,
                    //         addtable: true,
                    //         unsortable: true,
                    //         align: 'center',
                    //         columnType:'render',
                    //         render: (h, params) => {
                    //             return h('div', [
                    //                 h('span', common.nameformat(params.row, channlManager, 'month_set'))
                    //             ]);
                    //         },
                    //         "type": "select",
                    //         "value": "",
                    //         "button": false,
                    //         "border": true,
                    //         "rules": [],
                    //         'size':'mini',
                    //         "options": channlManager
                    //     }]
                    // },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '说明',
                            prop: 'description',
                            width: '183',
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
                            "subtype": "textarea",
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
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
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editFormVisible = true;
                                                this.rowdata = params.row;
                                                if(this.rowdata.worksite_id == '-1'){
                                                    this.rowdata.worksite_id = '';
                                                }else{
                                                    this.rowdata.worksite_id = this.rowdata.worksite_id+'';
                                                }
                                                if( this.rowdata.month_set == '-1'){
                                                    this.rowdata.month_set = '';
                                                }else{
                                                    this.rowdata.month_set = this.rowdata.month_set+'';
                                                }

                                                // this.rowdata.month2_set = this.rowdata.month2_set+'';
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
                                            click: (e) => {
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
                    },
                ],
                worksite_id:undefined,
                hideAdd:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.getQuery();
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
                    id:'',
                    id_start:'',
                    passname:'',
                    passtype:'',
                    passtype_start:'',
                    worksite_id:'',
                    worksite_id_start:'',
                    month_set:'',
                    month_set_start:'',
                    month2_set:'',
                    month2_set_start:'',
                    description:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.id_start = sform.id;
                sform.passtype_start = sform.passtype;
                sform.worksite_id_start = sform.worksite_id;
                sform.month_set_start = sform.month_set;
                sform.month2_set_start = sform.month2_set;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getQuery(){
                let _this = this
                axios.all([common.getWorkSite_id()])
                    .then(axios.spread(function (ret) {
                        _this.worksite_id = ret.data;
                    }))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.equipmentManage_Channel == item.auth_id) {
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
                this.tableitems[len - 1].subs[0].hidden = val
            },
            worksite_id:function (newVal,oldVal) {
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
