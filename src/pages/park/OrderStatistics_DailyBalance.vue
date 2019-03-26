<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">统计分析<span style="margin: 2px">-</span>车场日报</p>
                <div class="float-right">
                    <el-button type="text"  icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="选择时间">
                            <el-date-picker
                                    style="width: 360px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentData"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    :start-placeholder="start_placeholder"
                                    :end-placeholder="end_placeholder"
                                    :picker-options="chartPickerOptions"
                                    :default-time="['00:00:00', '23:59:59']"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="changeCurrentDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="queryForChart" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                                    <el-button type="primary" @click="handleExport"  native-type="button">导出</el-button>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>
        <!--折线图-->
        <!--<div class="charts-wrapper">
            <div  id="chart" class="count-charts-style" ></div>
        </div>-->

        <div class="count-table-wrapper-style">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="index"
                        label="索引"
                        width="70">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="e_time"
                        label="日期"
                        width="110">
                </el-table-column>

                <el-table-column label="电子收入" align="center">
                    <el-table-column
                            align="center"
                            prop="ele_prepay"
                            label="场内预付">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ele_pay"
                            label="出场结算">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ele_total"
                            label="合计">
                    </el-table-column>
                </el-table-column>

                <el-table-column label="现金收入" align="center">
                    <el-table-column
                            align="center"
                            prop="cash_prepay"
                            label="场内预付">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="cash_pay"
                            label="出场结算">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="cash_total"
                            label="合计">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="free_pay"
                        label="减免金额">
                </el-table-column>
            </el-table>
        </div>

    </section>

</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common';
    import CommonTable from '../../components/CommonTable';
    import axios from 'axios';
    import echarts from 'echarts';

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                tableData:[],
                searchFormData:{
                    currentData:'',
                    date:''
                },
                /////////////////////////////////////////
                //图表相关
                start_placeholder: '',
                end_placeholder: '',
                activeName: 'tableStyle',
                chartDate: '',
                selParkId: -1,
                chartHeight: '600px',
                chartWidth: '800px',
                chartstyles: '',
                chartPickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                table: [],
                sform: {},
                showWorkDetail: false,
                showOrderDetail: false,
                currentRow: '',
                parklist: [],
                parklistChart: [],
                loading: false,
                hideExport: false,
                hideSearch: true,
                showdateSelector33: true,
                showCollectorSelector: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination: true,
                queryapi: '/parkbalance/query',
                exportapi: '/parkbalance/exportExcel',
                btswidth: '100',
                fieldsstr: 'groupid__comid__name__out_uid__sdate__scount__monthcount__cash_pay__cash_prepay__electronic_pay__free_pay__reduce_pay__amount_receivable',
                searchtitle: '高级查询',
                datesselector: '',
                orderfield: 'id',
            };
        },
        methods: {
            changeCurrentDate(val){
                if(val != null && val != ''){
                    this.searchFormData.date = val[0] + encodeURI(encodeURI('至')) + val[1];
                }else{
                    this.searchFormData.date = '';
                }
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData={
                    currentData:'',
                    date:'',
                };
                this.searchFormData.currentData = [common.getFirstDayOfWeek() + ' 00:00:00', common.currentDate() + ' 23:59:59'];
                that.queryForChart();
            },
            searchFn(){

            },
            exportFn(){

            },
            ////////////////////////////////////////////////////////
            initChart: function () {
                //初始化图表
                this.chart = echarts.init(document.getElementById('chart'));
            },

            queryForChart: function () {
                let api = this.queryapi;
                var formdata = {};
                let vm = this;
                formdata.rp = 360;
                formdata.page = this.currentPage;
                formdata.orderby = this.orderby;
                formdata.orderfield = this.orderfield;
                formdata.fieldsstr = this.fieldsstr;
                formdata.time = 'between';
                if(this.searchFormData.currentData != null && this.searchFormData.currentData != ''){
                    formdata.date = this.searchFormData.currentData[0] + '至' + this.searchFormData.currentData[1];
                }else{
                    formdata.date = '';
                }
                if (this.searchFormData.selParkId > 0) {
                    formdata.out_uid = 3;
                    formdata.out_uid_start = this.searchFormData.selParkId;
                    formdata.comid = '';
                }else {
                    formdata.out_uid = '';
                    formdata.out_uid_start = '';
                    formdata.comid = '';
                }
                formdata = common.generateForm(formdata);
                vm.$axios.post(path + api, vm.$qs.stringify(formdata), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let dataRows = response.data.rows;
                    vm.tableData = dataRows;

                });
            },
            getQuery(){
                let _this = this;
                _this.queryForChart();
            },
            //导出表格数据
            handleExport() {
                let vm = this;
                let api = this.exportapi;
                let params = '';
                let exportForm = JSON.parse(JSON.stringify( vm.searchFormData));
                exportForm = common.generateForm(exportForm);
                if (common.getLength(exportForm) == 0) {
                    params = 'fieldsstr=' + this.fieldsstr + '&token=' + sessionStorage.getItem('token');
                } else {
                    for (var x in exportForm) {
                        //console.log(this.sform[x])
                        if(x=='car_number'||x=='nickname1'){
                            params += x + '=' + encodeURI(encodeURI(exportForm[x])) + '&';
                        }else{
                            params += x + '=' + exportForm[x] + '&';
                        }
                    }
                }
                let groupid = sessionStorage.getItem('groupid');
                let cityid = sessionStorage.getItem('cityid');
                if (groupid != 'undefined' && !(params.indexOf('groupid=') > -1)) {
                    params += '&groupid=' + groupid;
                }
                if (cityid != 'undefined' && !(params.indexOf('cityid=') > -1)) {
                    params += '&cityid=' + cityid;
                }
                if (params.indexOf('comid=') > -1) {
                    window.open(path + api + '?' + params);
                } else {
                    window.open(path + api + '?' + params + '&comid=' + sessionStorage.getItem('comid'));
                }
            },
        },
        mounted() {
            //this.initChart();
        },
        activated() {
            this.start_placeholder = common.currentDate() + ' 00:00:00';
            this.end_placeholder = common.currentDate() + ' 23:59:59';
            this.searchFormData.currentData = [common.getFirstDayOfWeek() + ' 00:00:00', common.currentDate() + ' 23:59:59'];
            this.getQuery();
            //this.chart.resize();
            //window.addEventListener('resize', () => {
            //    this.chart.resize();
            //});-->
        }
    };

</script>

<style>

    .charts-wrapper{
        margin: 12px;
        padding: 23px 45px 38px 20px;
        height: 327px;
        background: #fff;
    }
    .count-charts-style {
        /*width: 100%;*/
        height: 100%;
    }
    .count-table-wrapper-style{
        margin: 14px 12px;
        padding: 20px 16px;
        background: #fff;
    }
    .date-picker-sec, .chart-sec {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }


</style>

