<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">系统管理<span style="margin: 2px">-</span>时租价格管理</p>
                <div class="float-right">
                    <el-button @click="handleAdd" type="text" icon="el-icon-plus"  v-if="hideAdd">添加价格</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item>
                            <el-select v-model="searchFormData.time_type" placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 100px">
                                <el-option
                                        v-for="item in timeTypeOption"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentData"
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
                        <el-form-item label="编号">
                            <el-input style="width: 120px" v-model="searchFormData.id_start" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="车辆类型">
                            <el-input style="width: 120px" v-model="searchFormData.car_type_zh" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="价格描述">
                            <el-input style="width: 100px" v-model="searchFormData.describe" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
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
                    v-on:cancelDel="cancelDel"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :orderfield="orderfield"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';

    export default {
        components: {
            TabPane
        },
        data() {
            return {
                timeTypeOption:[
                    {
                        'value_no':'0',
                        'value_name':'创建时间',
                    },{
                        'value_no':'1',
                        'value_name':'修改时间',
                    },
                ],
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{

                },
                addTo:0,
                //删除
                delForm:{},
                //搜索
                searchFormData:{
                    currentData:'',
                    time_type:'0',
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    update_time:'',
                    update_time_start:'',
                    update_time_end:'',
                    car_type_zh:'',
                    describe:'',
                    id:'3',
                    id_start:'',
                },
                searchForm:{},
                queryapi: '/price/query',
                addapi: '/price/add',
                delapi: '/price/delete',
                editapi: '/price/edit',
                btswidth: '100',
                fieldsstr: 'id__create_time__update_time__car_type_zh__describe',
                orderfield:'id',
                tableitems: [
                    {
                    hasSubs:false,
                    subs: [{
                        label: '索引',
                        columnType:'render',
                        align: 'center',
                        width:'100',
                        unsortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.index +1),
                            ]);
                        }
                    }]
                },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.create_time))
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '修改时间',
                            prop: 'update_time',
                            width: '180',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.update_time))
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车辆类型',
                            prop: 'car_type_zh',
                            width: '120',
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
                                {required: true, message: '请输入车辆类型', trigger: 'blur'}
                            ],
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '价格描述',
                            prop: 'describe',
                            width: '200',
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
                            "rules": [
                                {required: true, message: '请输入价格描述', trigger: 'blur'}
                            ],
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
                                            marginRight: '5px',
                                            color:'red',
                                            display:this.showdelete?'':'none',
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
                addtitle: '添加价格',
                addFormRules: {
                    car_type_zh: [
                        {required: true, message: '请输入车辆类型', trigger: 'blur'}
                    ],
                    describe: [
                        {required: true, message: '请输入价格描述', trigger: 'blur'}
                    ],
                },
                hideAdd:false,
                hideExport:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,
            }
        },
        methods:{
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let val = this.searchFormData.currentData;
                if(val != null && val != ''){
                    if(this.searchFormData.time_type == '0'){
                        this.searchFormData.create_time='between';
                        this.searchFormData.create_time_start = val[0];
                        this.searchFormData.create_time_end = val[1];
                        this.searchFormData.update_time='';
                        this.searchFormData.update_time_start = '';
                        this.searchFormData.update_time_end = '';
                    }else{
                        this.searchFormData.create_time='';
                        this.searchFormData.create_time_start = '';
                        this.searchFormData.create_time_end = '';
                        this.searchFormData.update_time='between';
                        this.searchFormData.update_time_start = val[0];
                        this.searchFormData.update_time_end = val[1];
                    }
                }
                let sform = this.searchFormData;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    time_type:'0',
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    update_time:'',
                    update_time_start:'',
                    update_time_end:'',
                    car_type_zh:'',
                    describe:'',
                    id:'3',
                    id_start:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            //刷新
            resetForm(){
                this.initFn(this)
            },
            //格式化时间
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.create_time='';
                    this.searchFormData.create_time_start = '';
                    this.searchFormData.create_time_end = '';
                    this.searchFormData.update_time='';
                    this.searchFormData.update_time_start = '';
                    this.searchFormData.update_time_end = '';
                }else{
                    if(this.searchFormData.time_type == '0'){
                        this.searchFormData.create_time='between';
                        this.searchFormData.create_time_start = val[0];
                        this.searchFormData.create_time_end = val[1];
                        this.searchFormData.update_time='';
                        this.searchFormData.update_time_start = '';
                        this.searchFormData.update_time_end = '';
                    }else{
                        this.searchFormData.create_time='';
                        this.searchFormData.create_time_start = '';
                        this.searchFormData.create_time_end = '';
                        this.searchFormData.update_time='between';
                        this.searchFormData.update_time_start = val[0];
                        this.searchFormData.update_time_end = val[1];
                    }
                }
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addRowData = {};
                this.addRowData.operator = sessionStorage.getItem('nickname');
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.systemManage_Price == item.auth_id) {
                            this.hideAdd = common.showSubAdd(item.sub_auth)
                            this.hideExport = common.showSubExport(item.sub_auth)
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
            this.setAuthorityFn();
            this.$refs['tabPane'].getTableData({},this)
        },
        activated() {

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

