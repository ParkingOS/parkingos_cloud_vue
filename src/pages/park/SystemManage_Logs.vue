<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            系统管理-系统日志
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item label="编号" class="clear-style margin-left-clear">
                    <el-input v-model="searchFormData.id_start" placeholder="编号" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="日志编号" class="clear-style-10">
                    <el-input v-model="searchFormData.log_id" placeholder="名称" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="操作类型" class="clear-style-10">
                    <el-select v-model="searchFormData.operate_type"  size="mini" style="width: 140px">
                        <el-option
                                v-for="item in operateTypes"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作模块" class="clear-style-10">
                    <el-select v-model="searchFormData.type"  size="mini" style="width: 140px">
                        <el-option
                                v-for="item in types"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="clear-style-10">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                    <el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px"></i> 更多选项</el-button>
                </el-form-item>
                <el-form-item class="clear-style-10 float-right">
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
                <div class="second-search-item-style" v-show="isShow">
                    <el-form-item class="clear-style margin-left-clear" label="操作时间">
                        <el-date-picker
                                style="width: 312px"
                                size="mini"
                                v-model="searchFormData.currentData"
                                type="datetimerange"
                                range-separator="-"
                                :default-time="['00:00:00','23:59:59']"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="timestamp"
                                @change="changeDateFormat"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" class="clear-style">
                        <el-input v-model="searchFormData.remark" placeholder="备注" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
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
    import {path, checkURL, checkUpload, checkNumber, payType,types,operateTypes} from '../../api/api';
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
                types:types,
                operateTypes:operateTypes,
                isShow:false,
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
                    operate_time:'between',
                    operate_time_start:'',
                    operate_time_end:'',
                    id:'3',
                    id_start:'',
                    log_id:'',
                    operate_type_start:'',
                    operate_type:'',
                    type_start:'',
                    type:'',
                    remark:''
                },
                searchForm:{},
                orderfield:'id',
                queryapi: '/parklog/query',
                btswidth: '100',
                fieldsstr: 'id__log_id__operate_time__content__operate_user__remark__operate_type__type',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日志编号',
                                prop: 'log_id',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '操作类型',
                                prop: 'operate_type',
                                width: '123',
                                type: 'selection',
                                selectlist: operateTypes,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = '';
                                    switch (params.row.operate_type){
                                        case 0:
                                            str = '登录';
                                            break;
                                        case 1:
                                            str = '增加';
                                            break;
                                        case 2:
                                            str = '编辑';
                                            break;
                                        case 3:
                                            str = '删除';
                                            break;
                                        case 4:
                                            str = '导出';
                                            break;
                                        case 5:
                                            str = '导入';
                                            break;
                                        default:
                                            str = '其他操作';

                                    }
                                    return h('div', [
                                        h('span', str),
                                    ]);
                                },
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '操作模块',
                                prop: 'type',
                                width: '123',
                                type: 'selection',
                                selectlist: types,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {

                                    return h('div', [
                                        h('span', common.nameformat(params.row, types, 'type')),
                                    ]);
                                },
                            },
                        ]
                    },

                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作时间',
                            prop: 'operate_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.operate_time)),
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作内容',
                            prop: 'content',
                            width: '202',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作员',
                            prop: 'operate_user',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            width: '138',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '高级查询',

            }
        },
        mounted() {
            this.getQuery()
            this.$refs['tabPane'].getTableData({},this)
        },
        methods:{
            changeMore(){
                this.isShow = !this.isShow
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.type_start = this.searchFormData.type;
                sform.operate_type_start =this.searchFormData.operate_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    operate_time:'between',
                    operate_time_start:'',
                    operate_time_end:'',
                    id:'3',
                    id_start:'',
                    log_id:'',
                    operate_type_start:'',
                    operate_type:'',
                    type_start:'',
                    type:'',
                    remark:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            resetForm(){
                this.initFn(this)
            },
            //格式化时间
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.operate_time='';
                    this.searchFormData.operate_time_start = '';
                    this.searchFormData.operate_time_end = '';
                }else{
                    this.searchFormData.operate_time='between';
                    this.searchFormData.operate_time_start = val[0];
                    this.searchFormData.operate_time_end = val[1];
                }
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
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
            getQuery(){
                let _this = this
                _this.$axios.all([common.getCarType()])
                    .then(_this.$axios.spread(function (retcartype) {
                        _this.cartype = retcartype.data;
                    }))
            },
        },
        activated() {

        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

