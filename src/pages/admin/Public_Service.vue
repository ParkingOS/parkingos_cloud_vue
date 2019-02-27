<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">增值服务<span style="margin: 2px">-</span>商户公众号</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="续费时间">
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
                        <el-form-item label="厂商名称" class="clear-style">
                            <el-input v-model="searchFormData.union_name" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
                        </el-form-item>
                        <el-form-item label="车场名称" class="clear-style">
                            <el-input v-model="searchFormData.park_name" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
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
                    union_name:'',
                    park_name:''
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
                queryapi: '/addvalue/shopofficial',
                fieldsstr: 'pay_time__union_name__park_name__etime',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '厂商名称',
                                prop: 'union_name',
                                type: 'str',
                                searchable: false,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场名称(编号)',
                                prop: 'park_name',
                                type: 'str',
                                searchable: false,
                                addable: true,
                                unsortable: true,
                                align: 'center',

                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '续费时间',
                                prop: 'pay_time',
                                type: 'date',
                                searchable: true,
                                addable: false,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.pay_time);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '支付金额',
                                prop: 'money',
                                type: 'str',
                                addable: true,
                                editable: true,
                                searchable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '流水号',
                                prop: 'trade_no',
                                type: 'str',
                                addable: true,
                                editable: true,
                                searchable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
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
                let sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                let val = sform.currentData;
                if(val != null && val != ''){
                    sform.utime='between';
                    sform.utime_start = val[0];
                    sform.utime_end = val[1];
                }
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    union_name:'',
                    park_name:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            resetForm(){
                this.initFn(this)
            },
            //格式化时间
            changeDateFormat(val){

            },
        },
        activated() {

        }
    }

</script>

<style>

</style>

