<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">系统设置<span style="margin: 2px">-</span>日志管理<span style="margin: 2px">-</span>操作日志管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="操作时间">
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
                        <el-form-item label="备注">
                            <el-input style="width: 140px" v-model="searchFormData.remark" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="编号">
                            <el-input style="width: 140px" v-model="searchFormData.id_start" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item  class="clear-style" label="操作类型">
                            <el-select v-model="searchFormData.operate_type"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in operateTypes"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  class="clear-style" label="操作模块">
                            <el-select v-model="searchFormData.type"  filterable
                                       placeholder="请选择" class="shop-custom-input" style="width: 140px">
                                <el-option
                                        v-for="item in unionTypes"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.park_id" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
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
                    </div>

                </el-form>
            </div>
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
    import {path, unionTypes,operateTypes} from '../../api/api';
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
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                unionTypes:unionTypes,
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
                    park_id:'',
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
                queryapi: '/citylog/query',
                btswidth: '100',
                fieldsstr: 'id__log_id__operate_time__content__operate_user__remark__operate_type__type__park_id',
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
                                label: '所属车场',
                                prop: 'park_id',
                                type: 'selection',
                                selectlist: this.parklist,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.parklist, 'park_id');
                                    if(str == '请选择')str='';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            }
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
                                selectlist: unionTypes,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {

                                    return h('div', [
                                        h('span', common.nameformat(params.row, unionTypes, 'type')),
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
                parklist:[],

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
                sform.park_id_start = this.searchFormData.park_id;
                sform.operate_type_start =this.searchFormData.operate_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))

            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    park_id:'',
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
                _this.$axios.all([common.getCarType(),common.getAllParks()])
                    .then(_this.$axios.spread(function (retcartype,parks) {
                        _this.cartype = retcartype.data;
                        _this.parklist = parks.data;
                        _this.parklist.unshift({
                            value_name:'全部',
                            value_no:''
                        })
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

