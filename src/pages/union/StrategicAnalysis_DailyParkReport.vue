<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">财务报表<span style="margin: 2px">-</span>车场日报</p>
                <div class="float-right">
                    <el-button type="text"  icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="选择时间">
                            <el-date-picker
                                    style="width: 150px"
                                    class="shop-custom-date"
                                    v-model="searchFormData.currentData"
                                    type="date"
                                    :placeholder="start_placeholder"
                                    value-format="timestamp"
                                    @change="changeCurrentDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="车场名称" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.selParkId" placeholder="请选择" class="shop-custom-input">
                                <el-option
                                        v-for="item in parklistChart"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
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
        <div class="charts-wrapper">
            <div  id="chart" class="count-charts-style" ></div>
        </div>

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
                        prop="comid"
                        label="车场名称"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="time"
                        label="日期"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="scount"
                        label="总订单数">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="amount_receivable"
                        label="应收金额">
                </el-table-column>
                <el-table-column label="实收金额" align="center">
                    <el-table-column
                            align="center"
                            prop="cash_pay"
                            label="现金支付">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="electronic_pay"
                            label="电子支付">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="act_total"
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
                    selParkId:-1,
                    date:'',
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
                exportapi: '/cityparkorderanlysis/exportExcel',
                queryapi: '/cityparkorderanlysis/query',
                fieldsstr: 'time__comid__amount_receivable__cash_pay__electronic_pay__act_total__free_pay',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场名称',
                                prop: 'comid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日期',
                                prop: 'time',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '总订单数',
                            prop: 'scount',
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
                            label: '应收金额',
                            prop: 'amount_receivable',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        label: '实收金额',
                        hasSubs: true,
                        subs: [

                            {
                                label: '现金支付',
                                prop: 'cash_pay',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {

                                hasSubs: false,

                                label: '电子支付',
                                prop: 'electronic_pay',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {

                                hasSubs: false,

                                label: '合计',
                                prop: 'act_total',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '减免金额',
                            prop: 'free_pay',
                            width: '123',
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

                datesselector: '',

                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                table: [],
                sform: {},
                showWorkDetail: false,
                showOrderDetail: false,
                currentRow: ''
            };
        },
        methods: {
            changeCurrentDate(val){
                this.searchFormData.date = val/1000;
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
                    selParkId:'',
                    date:''
                };
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

            queryForChart: function (isFirst) {
                let api = this.queryapi;
                var formdata = {};
                let vm = this;
                formdata.rp = 360;
                formdata.page = this.currentPage;
                formdata.orderby = this.orderby;
                formdata.orderfield = this.orderfield;
                formdata.fieldsstr = this.fieldsstr;
                if(this.searchFormData.currentData != null && this.searchFormData.currentData != ''){
                    formdata.date = (this.searchFormData.currentData)/1000;
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
                    // 把配置和数据放这里
                    let seriesData = [
                        {
                            name: '现金支付',
                            type: 'line',
                            stack: '总量1',
                            data: []
                        },
                        {
                            name: '应收金额',
                            type: 'line',
                            stack: '总量2',
                            data: []
                        },
                        {
                            name: '电子支付',
                            type: 'line',
                            stack: '总量3',
                            data: []
                        },
                        {
                            name: '实收金额',
                            type: 'line',
                            stack: '总量4',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: []
                        },
                        {
                            name: '减免金额',
                            type: 'line',
                            stack: '总量5',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: []
                        }
                    ];
                    let xAxisData = [];
                    let dataRows = response.data.rows;
                    vm.tableData = dataRows;
                    // console.log(response.data.rows);
                    for (let i = 0; i < dataRows.length; i++) {
                        let rData = dataRows[i];
                        xAxisData[i] = rData.comid;
                        seriesData[0].data[i] = rData.cash_pay; //现金支付
                        seriesData[1].data[i] = rData.amount_receivable;  //应收金额
                        seriesData[2].data[i] = rData.electronic_pay;  //电子支付
                        seriesData[3].data[i] = rData.act_total;  //实收金额
                        seriesData[4].data[i] = rData.free_pay;  //减免金额,字段是free_pay
                    }
                    vm.chart.setOption({
                        title: {
                            text: '车场日报'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        color:['#727BDD','#00CAAA','#FAB127','#51A5DE','#76DDFB'],
                        legend: {
                            data: ['现金支付', '应收金额', '电子支付', '实收金额', '减免金额']
                        },
                        toolbox: {
                            right: 20,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: xAxisData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: seriesData
                    });
                });
            },
            getQuery(){
                let _this = this;
                _this.$nextTick(function () {
                    axios.all([common.getAllParks()])
                        .then(axios.spread(function (ret) {
                            _this.parklist = ret.data;
                            _this.parklistChart =  ret.data;
                            _this.parklistChart.push({
                                value_name:'全部车场',
                                value_no:-1}
                            );
                            _this.queryForChart(1);
                        }));
                });
            },
            //导出表格数据
            handleExport() {
                let vm = this;
                let api = this.exportapi;
                let params = '';
                if (common.getLength(this.searchFormData) == 0) {
                    params = 'fieldsstr=' + this.fieldsstr + '&token=' + sessionStorage.getItem('token');
                } else {
                    for (var x in this.searchFormData) {
                        //console.log(this.sform[x])
                        if(x=='car_number'||x=='nickname1'){
                            params += x + '=' + encodeURI(encodeURI(this.searchFormData[x])) + '&';
                        }else{
                            params += x + '=' + this.searchFormData[x] + '&';
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
            this.initChart();
        },

        activated() {
            this.start_placeholder = common.currentDate();
            this.getQuery();
            this.chart.resize();
            window.addEventListener('resize', () => {
                this.chart.resize();
            });
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

