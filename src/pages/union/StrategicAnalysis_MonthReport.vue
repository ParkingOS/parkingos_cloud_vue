<template>
    <section>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane name="tableStyle" class="tab-content-pad">
                <span slot="label"><i class="el-icon-tickets"></i> 表格模式</span>
                <common-table
                        :queryapi="queryapi"
                        :tableheight="tableheight"
                        :fieldsstr="fieldsstr"
                        :tableitems="tableitems"
                        :btswidth="btswidth"
                        :hide-export="hideExport"
                        :exportapi="exportapi"
                        :hide-options="hideOptions"
                        :searchtitle="searchtitle"
                        :showdateSelectorMonth="showdateSelectorMonth"
                        :hideTool="hideTool"
                        :hideSearch="hideSearch"
                        :hideAdd="hideAdd"
                        :hidePagination="hidePagination"
                        ref="bolinkuniontable"
                ></common-table>
            </el-tab-pane>
            <el-tab-pane name="chartStyle" class="tab-content-pad">
                <span slot="label"><i class="el-icon-picture"></i> 图表模式</span>

                <section class="date-picker-sec">
                    <section>
                        <!--<el-select v-model="selParkId" filterable placeholder="请选择">-->
                        <!--<el-option-->
                        <!--v-for="item in parklistChart"-->
                        <!--:key="item.value_no"-->
                        <!--:label="item.value_name"-->
                        <!--:value="item.value_no">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<el-date-picker-->
                        <!--v-model="chartDate"-->
                        <!--type="datetimerange"-->
                        <!--format="yyyy-MM-dd hh:mm:ss"-->
                        <!--align="right"-->
                        <!--unlink-panels-->
                        <!--range-separator="至"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期"-->
                        <!--:picker-options="chartPickerOptions" >-->
                        <!--</el-date-picker>-->
                        <!--<el-button type="primary" @click="queryForChart">确定</el-button>-->

                        <el-date-picker
                                v-model="monthReportStart"
                                type="month"
                                :picker-options="pickerOptionsBefore"
                                value-format="yyyy-MM"
                                :placeholder="start_month_placeholder">
                        </el-date-picker>
                        <span> 至 </span>
                        <el-date-picker
                                v-model="monthReportEnd"
                                type="month"
                                :picker-options="pickerOptionsAfter"
                                value-format="yyyy-MM"
                                :placeholder="start_month_placeholder">
                        </el-date-picker>
                        <el-tooltip class="item" effect="dark" content="最多支持12个月的数据查询" placement="bottom">
                            <el-button type="primary" @click="queryForChart" align="center">查询
                            </el-button>
                        </el-tooltip>
                    </section>

                </section>
                <section class="chart-sec">
                    <div style="overflow-y: auto;padding-right: 30px;" id="chart" class="chart-style" v-bind:style="{height:chartHeight,width:chartWidth}"></div>
                </section>
            </el-tab-pane>
        </el-tabs>


    </section>
</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common';
    import CommonTable from '../../components/CommonTable';
    import echarts from 'echarts';
    import axios from 'axios'
    export default {
        components: {
            CommonTable
        },
        data() {
            let that = this;
            return {
                //图表相关
                activeName: 'tableStyle',
                chartDate: '',
                monthReportStart:'',
                monthReportEnd:'',
                start_month_placeholder:'',
                selParkId: -1,
                chartHeight: '600px',
                chartWidth: '800px',

                pickerOptionsBefore: {
                     disabledDate(time) {
                       return time.getTime() > Date.now() - 8.64e7;
                     }
                },
                pickerOptionsAfter: {
                     disabledDate(time) {
                        var date1 = new Date(that.monthReportStart);
                        var date2 = new Date(date1);
                       return time.getTime() > Date.now() - 8.64e7 || time.getTime() < date2.getTime();
                     }
                },

                loading: false,
                hideExport: false,
                hideSearch: true,
                showdateSelectorMonth: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination: true,
                queryapi: '/groupmonthorder/query',
                exportapi: '/groupmonthorder/exportExcel',
                btswidth: '100',
                fieldsstr: 'sdate__scount__amount_receivable__cash_pay__electronic_pay__free_pay',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日期',
                                prop: 'sdate',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '总订单数',
                                prop: 'scount',
                                width: '123',
                                type: 'number',
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
                    }
                    , {

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
                currentRow: ''
            };
        },
        methods: {
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
                if(this.selParkId>0){
                    formdata.comid_start = this.selParkId;
                    formdata.comid = '';
                }
                formdata.time = 'between';//this.chartDate[1].getTime() ;
                formdata.btime = this.monthReportStart;
                formdata.etime = this.monthReportEnd;
                formdata = common.generateForm(formdata);
                vm.$axios.post(path + api, vm.$qs.stringify(formdata), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // 把配置和数据放这里

                    let seriesData =[
                        // {
                        //     name:'订单总数',
                        //     type:'line',
                        //     stack: '总量',
                        //     areaStyle: {normal: {}},
                        //     data:[]
                        // },
                        {
                            name:'现金支付',
                            type:'line',
                            stack: '总量',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'应收金额',
                            type:'line',
                            stack: '总量',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'电子支付',
                            type:'line',
                            stack: '总量',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'实收金额',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'减免金额',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            // areaStyle: {normal: {}},
                            data:[]
                        }
                    ];
                    let xAxisData = [];
                    let dataRows = response.data.rows;
                    console.log(response.data.rows);
                    for(let i = 0 ; i < dataRows.length;i++){
                        let rData = dataRows[i];
                        xAxisData[i] = rData.sdate;
                        //seriesData[0].data[i] = rData.scount  ;//订单总数
                        seriesData[0].data[i] = rData.cash_pay ; //现金支付
                        seriesData[1].data[i] = rData.amount_receivable;  //应收金额
                        seriesData[2].data[i] = rData.electronic_pay;  //电子支付
                        seriesData[3].data[i] = rData.act_total;  //实收金额
                        seriesData[4].data[i] = rData.free_pay;  //减免金额
                    }
                    vm.chart.setOption({
                        title: {
                            text: '车场月报'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data:['现金支付','应收金额','电子支付','实收金额','减免金额']
                        },
                        toolbox: {
                            right:20,
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
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : xAxisData
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : seriesData
                    });
                })
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            // var user = sessionStorage.getItem('user');
            // this.user = user
            // if (user) {
            //     user = JSON.parse(user);
            //     for (var item of user.authlist) {
            //         if (AUTH_ID.showOrderStatistics_DailyReport_auth_id == item.auth_id) {
            //             console.log(item.sub_auth)
            //             break;
            //         }
            //     }
            //
            // }
            this.initChart();
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.chartHeight = (common.gwh()-200)+'px';
            this.chartWidth = (common.gww()/(common.gwh()-200))*common.gwh();

            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({date: '', out_uid: ''});
            // this.getTableData(this.sform);
            this.start_month_placeholder = common.currentMonth();
            this.monthReportStart = common.currentMonth();
            this.monthReportEnd = common.currentMonth();
            this.queryForChart();
        }
    };

</script>

<style>
    .gutter {
        display: none
    }

    .tab-content-pad {
        padding-left: 10px;
    }

    .date-picker-sec, .chart-sec {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .chart-style {
        padding-top: 60px;
    }

</style>

