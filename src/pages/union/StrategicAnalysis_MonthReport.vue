<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">


            <header class="shop-custom-header">
                <p style="float: left">财务报表<span style="margin: 2px">-</span>集团月报</p>
                <div class="float-right">
                    <el-button type="text"  icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="选择月份">
                            <el-date-picker
                                    style="width: 120px"
                                    class="shop-custom-date"
                                    v-model="searchFormData.btime"
                                    type="month"
                                    value-format="yyyy-MM"
                                    :picker-options="pickerOptionsBefore"
                                    :placeholder="start_month_placeholder">
                            </el-date-picker>
                            <span> 至 </span>
                            <el-date-picker
                                    style="width: 120px"
                                    class="shop-custom-date"
                                    v-model="searchFormData.etime"
                                    type="month"
                                    value-format="yyyy-MM"
                                    :picker-options="pickerOptionsAfter"
                                    :placeholder="start_month_placeholder">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="queryForChart" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-tooltip class="item" effect="dark" content="最多支持12个月的数据查询" placement="bottom">
                                    <el-button type="primary" @click="handleExport"  native-type="button">导出</el-button>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>
        <!--折线图-->

        <div class="count-table-wrapper-style">
            <div class="check-list">
                <el-checkbox-group v-model="checkList" >
                    <el-checkbox label="ele_pay">电子支付</el-checkbox>
                    <el-checkbox label="out_money">支出</el-checkbox>
                    <el-checkbox label="ele_sett">电子结算</el-checkbox>
                    <el-checkbox label="cash_pay">现金收入</el-checkbox>
                    <el-checkbox label="free_pay">减免金额</el-checkbox>
                </el-checkbox-group>
            </div>
            <el-table
                    :key="key"
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
                        prop="sdate"
                        label="日期"
                        width="110">
                </el-table-column>

                <el-table-column label="收入" align="center" v-if="checkObject.ele_pay  || checkObject.cash_pay">
                    <el-table-column
                            v-if="checkObject.cash_pay"
                            align="center"
                            prop="cash_pay"
                            label="现金支付">
                    </el-table-column>
                    <el-table-column
                            v-if="checkObject.ele_pay"
                            align="center"
                            prop="ele_pay"
                            label="电子支付">
                    </el-table-column>
                    <el-table-column
                            v-if="checkObject.ele_pay  && checkObject.cash_pay"
                            align="center"
                            prop="act_total"
                            label="合计">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        v-if="checkObject.out_money"
                        align="center"
                        prop="out_money"
                        label="支出">
                </el-table-column>
                <el-table-column
                        v-if="checkObject.ele_sett"
                        align="center"
                        prop="ele_total"
                        label="电子结算">
                </el-table-column>
                <el-table-column
                        v-if="checkObject.free_pay"
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
            var that = this;
            return {
                key:1,
                checkList:['ele_pay','out_money','ele_sett'],
                checkObject:{
                    ele_pay:true,
                    out_money:true,
                    ele_sett:true,
                },
                start_month_placeholder:'',
                tableData:[],
                searchFormData:{
                    btime:'',
                    etime:''
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
                pickerOptionsBefore: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                pickerOptionsAfter: {
                    disabledDate(time) {
                        var date1 = new Date(that.searchFormData.btime);
                        var date2 = new Date(date1);
                        return time.getTime() > Date.now() - 8.64e7 || time.getTime() < date2.getTime();
                    }
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
                queryapi: '/groupmonthorder/query',
                exportapi: '/groupmonthorder/exportExcel',
                btswidth: '100',
                fieldsstr: 'sdate__scount__amount_receivable__cash_pay__electronic_pay__free_pay',
                searchtitle: '高级查询',
                datesselector: '',
                orderfield: 'id',

            };
        },
        methods: {
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData={
                    btime:'',
                    etime:'',
                };
                this.searchFormData.btime = common.yearStart();
                this.searchFormData.etime = common.currentMonth();
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
                formdata.btime = this.searchFormData.btime;
                formdata.etime = this.searchFormData.etime;
                formdata = common.generateForm(formdata);
                vm.$axios.post(path + api, vm.$qs.stringify(formdata), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // 把配置和数据放这里
                    let dataRows = response.data.rows;
                    vm.tableData = dataRows;
                    // console.log(response.data.rows);

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
            this.start_month_placeholder = common.currentMonth();
            this.searchFormData.btime = common.yearStart();
            this.searchFormData.etime = common.currentMonth();
            this.getQuery();
            //this.chart.resize();
            //window.addEventListener('resize', () => {
            //    this.chart.resize();
            //});
        },
        watch: {
            checkList(valArr){
                this.checkObject ={};
                if(valArr.length > 0){
                    for(let item in valArr){
                        let i = valArr[item];
                        this.checkObject[i] = true;
                    }
                }else{
                    this.checkObject = {};
                }
                this.key ++;
            }
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

