<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            系统管理-上下班管理
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item class="clear-style margin-left-clear">
                    <el-select v-model="searchFormData.work_type"  size="mini" style="width: 100px">
                        <el-option
                                v-for="item in workTypeOption"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="clear-style-4">
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
                <el-form-item label="姓名" class="clear-style-4">
                    <el-input v-model="searchFormData.uinName" placeholder="收费员姓名" size="mini" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="编号" class="clear-style-4">
                    <el-input v-model="searchFormData.uid_start" placeholder="收费员编号" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="clear-style-4">
                    <el-select v-model="searchFormData.state_start"  size="mini" style="width: 140px">
                        <el-option
                                v-for="item in commuteStateType"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="clear-style">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                </el-form-item>
                <el-form-item class="clear-style-4 float-right">
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
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
    import {commuteStateType} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import TabPane from '../../components/table/TabPane';
    export default {
        components: {
            CommonTable,TabPane
        },
        data() {
            return {
                commuteStateType:commuteStateType,
                workTypeOption:[
                    {
                        'value_no':'0',
                        'value_name':'上班时间',
                    },{
                        'value_no':'1',
                        'value_name':'下班时间',
                    },
                ],
                //搜索
                searchFormData:{
                    currentData:'',
                    work_type:'0',
                    start_time:'between',
                    start_time_start:'',
                    start_time_end:'',
                    end_time:'',
                    end_time_start:'',
                    end_time_end:'',
                    uid:'3',
                    uid_start:'',
                    uinName:'',
                    state:'',
                    state_start:'',
                },
                searchForm:{},
                orderfield:'id',
                loading: false,
                hideExport: true,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,

                hideTool: false,

                queryapi: '/workrecord/query',
                btswidth: '100',
                // fieldsstr: 'id__uid__start_time__end_time__state',
                // fieldsstr: 'berthsec_id__end_time__history_money__id__park_id__start_time__state__uid__uuid__worksite_id',
                fieldsstr: 'id__uid__worksite_id__park_id__end_time__state__start_time__uuid__berthsec_id__history_money',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '收费员编号',
                            prop: 'uid',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            hidden:"true",
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '收费员名称',
                            prop: 'uinName',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            hidden:"true",
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '收费员名称(编号)',
                            prop: 'uidAndName',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '上班时间',
                            prop: 'start_time',
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
                                    h('span', common.dateformat(params.row.start_time))
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '下班时间',
                            prop: 'end_time',
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
                                    h('span', common.dateformat(params.row.end_time))
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '123',
                            type: 'selection',
                            selectlist:commuteStateType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, commuteStateType, 'state'))
                                ]);
                            },
                        }]
                    }


                ],
                searchtitle: '高级查询',

            }
        },
        mounted() {
            this.$refs['tabPane'].getTableData({},this)
        },
        methods:{
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let val = this.searchFormData.currentData;
                if(val != null && val != ''){
                    if(this.searchFormData.work_type == '0'){
                        this.searchFormData.start_time='between';
                        this.searchFormData.start_time_start = val[0];
                        this.searchFormData.start_time_end = val[1];
                        this.searchFormData.end_time='';
                        this.searchFormData.end_time_start = '';
                        this.searchFormData.end_time_end = '';
                    }else{
                        this.searchForm.start_time='';
                        this.searchFormData.start_time_start = '';
                        this.searchFormData.start_time_end = '';
                        this.searchFormData.end_time='between';
                        this.searchFormData.end_time_start = val[0];
                        this.searchFormData.end_time_end = val[1];
                    }
                }
                let sform = this.searchFormData;
                sform.state = sform.state_start;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    work_type:'0',
                    start_time:'between',
                    start_time_start:'',
                    start_time_end:'',
                    end_time:'',
                    end_time_start:'',
                    end_time_end:'',
                    uid:'3',
                    uid_start:'',
                    uinName:'',
                    state:'',
                    state_start:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            resetForm(){
                this.initFn(this)
            },
            //格式化时间
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.start_time='';
                    this.searchFormData.start_time_start = '';
                    this.searchFormData.start_time_end = '';
                    this.searchFormData.end_time='';
                    this.searchFormData.end_time_start = '';
                    this.searchFormData.end_time_end = '';
                }else{
                    if(this.searchFormData.work_type == '0'){
                        this.searchFormData.start_time='between';
                        this.searchFormData.start_time_start = val[0];
                        this.searchFormData.start_time_end = val[1];
                        this.searchFormData.end_time='';
                        this.searchFormData.end_time_start = '';
                        this.searchFormData.end_time_end = '';
                    }else{
                        this.searchForm.start_time='';
                        this.searchFormData.start_time_start = '';
                        this.searchFormData.start_time_end = '';
                        this.searchFormData.end_time='between';
                        this.searchFormData.end_time_start = val[0];
                        this.searchFormData.end_time_end = val[1];
                    }
                }
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

