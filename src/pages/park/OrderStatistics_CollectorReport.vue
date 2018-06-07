<template>
    <!--<section>-->
    <!--<common-table-->
    <!--:queryapi="queryapi"-->
    <!--:tableheight="tableheight"-->
    <!--:fieldsstr="fieldsstr"-->
    <!--:tableitems="tableitems"-->
    <!--:btswidth="btswidth"-->
    <!--:hide-export="hideExport"-->
    <!--:exportapi="exportapi"-->
    <!--:hide-options="hideOptions"-->
    <!--:searchtitle="searchtitle"-->
    <!--:showdateSelector="showdateSelector"-->
    <!--:showCollectorSelector="showCollectorSelector"-->
    <!--:hideTool="hideTool"-->
    <!--:hideSearch="hideSearch"-->
    <!--:hideAdd="hideAdd"-->
    <!--:hidePagination="hidePagination"-->
    <!--ref="bolinkuniontable"-->
    <!--&gt;</common-table>-->
    <!--</section>-->

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
                        :showdateSelector33="showdateSelector33"
                        :showCollectorSelector="showCollectorSelector"
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
                        <el-select v-model="selParkId" filterable placeholder="全部" @change="changeanalysisdatepark">
                            <el-option
                                    v-for="item in parklistChart"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
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
                        <el-date-picker
                                v-model="chartDate"
                                type="date"
                                align="right"
                                unlink-panels

                                :placeholder="start_placeholder"

                                @change="changeanalysisdate"
                                >
                        </el-date-picker>
                        <!--<el-button type="primary" @click="queryForChart">确定</el-button>-->
                    </section>

                </section>
                <!--<section >-->
                    <!--<div  id="chart"  v-bind:style="{height:chartHeight,width:chartWidth}" style="overflow-y: auto;padding-right: 30px;"></div>-->
                    <!--&lt;!&ndash;<div id="chart" :style="chartstyles"></div>&ndash;&gt;-->
                <!--</section>-->
                <section class="chart-sec">
                    <!--<div  id="chart" class="chart-style"  style="overflow-y: auto;padding-right: 30px;width:800px;height:460px;"></div>-->
                    <div  id="chart" class="chart-style"  :style='chartstyles'></div>
                </section>
            </el-tab-pane>
        </el-tabs>


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
                orderfield: 'id',
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
                queryapi: '/parkordercollector/query',
                exportapi: '/parkordercollector/exportExcel',

                btswidth: '100',
                fieldsstr: 'groupid__comid__name__out_uid__sdate__scount__monthcount__cash_pay__cash_prepay__electronic_pay__free_pay__reduce_pay__amount_receivable',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '收费员',
                                prop: 'name',
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
                                label: '账号',
                                prop: 'out_uid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                hidden: true,
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
                                // label: 'aha',
                                // hasSubs: true,
                                // subs: [{
                                label: '现金支付',
                                prop: 'cash_pay',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                                // }, {
                                //
                                //     hasSubs: false,
                                //
                                //     label: '免费金额',
                                //     prop: 'free_pay',
                                //     width: '123',
                                //     type: 'str',
                                //     editable: true,
                                //     searchable: true,
                                //     addable: true,
                                //     unsortable: true,
                                //     align: 'center'
                                //
                                // }, {
                                //
                                //     hasSubs: false,
                                //
                                //     label: '减免券支付',
                                //     prop: 'reduce_pay',
                                //     width: '123',
                                //     type: 'str',
                                //     editable: true,
                                //     searchable: true,
                                //     addable: true,
                                //     unsortable: true,
                                //     align: 'center'
                                //
                                // }]
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
            initChart: function () {
                //初始化图表
                this.chart = echarts.init(document.getElementById('chart'));
                console.log('chart加载');
                console.log(this.chart);
            },
            changeanalysisdate(input2) {
                //修改车场统计分析日期
                console.log(input2);
                console.log(this.chartDate);
                this.queryForChart();
            },
            changeanalysisdatepark(val) {
                this.selParkId = val;
                this.queryForChart();
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
                if (this.selParkId > 0) {
                    formdata.out_uid = this.selParkId;
                    formdata.comid = '';
                }
                if (isFirst !== 1) {
                    //formdata.time = 'between';//this.chartDate[1].getTime() ;
                    // formdata.time_start = this.chartDate[0].getTime(); //;
                    // formdata.time_end = this.chartDate[1].getTime();
                    //formdata.date = this.chartDate[0] + '至' + this.chartDate[1];
                    formdata.date = new Date(this.chartDate).getTime()/1000;
                }

                formdata = common.generateForm(formdata);
                vm.$axios.post(path + api, vm.$qs.stringify(formdata), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // 把配置和数据放这里

                    let seriesData = [
                        // {
                        //     name:'订单总数',
                        //     type:'line',
                        //     stack: '总量',
                        //     areaStyle: {normal: {}},
                        //     data:[]
                        // },
                        {
                            name: '现金支付',
                            type: 'line',
                            stack: '总量1',
                            // areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '应收金额',
                            type: 'line',
                            stack: '总量2',
                            // areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '电子支付',
                            type: 'line',
                            stack: '总量3',
                            // areaStyle: {normal: {}},
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
                            // areaStyle: {normal: {}},
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
                            // areaStyle: {normal: {}},
                            data: []
                        }
                    ];
                    let xAxisData = [];
                    let dataRows = response.data.rows;
                    console.log(response.data.rows);
                    for (let i = 0; i < dataRows.length; i++) {
                        let rData = dataRows[i];
                        xAxisData[i] = rData.name;
                        //seriesData[0].data[i] = rData.scount  ;//订单总数
                        seriesData[0].data[i] = rData.cash_pay; //现金支付
                        seriesData[1].data[i] = rData.amount_receivable;  //应收金额
                        seriesData[2].data[i] = rData.electronic_pay;  //电子支付
                        seriesData[3].data[i] = rData.act_total;  //实收金额
                        seriesData[4].data[i] = rData.free_pay;  //减免金额,字段是free_pay
                    }
                    vm.chart.setOption({
                        title: {
                            text: '收费员日报'
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
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;


        },
        created(){
            this.chartstyles = 'overflow-y: auto;padding-right: 30px;width: ' + (common.gww() - 566) + 'px;height: ' + (common.gwh() - 187) + 'px;';
        },
        activated() {
            this.activeName= 'tableStyle',
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({date: '', out_uid: ''});
            // this.getTableData(this.sform);
            this.chartHeight = (common.gwh()-200)+'px';
            this.chartWidth = (common.gww()/(common.gwh()-200))*common.gwh();
            // console.log(common.gwh());
            // console.log(common.gww());
            // 637
            // 1366
            //this.start_placeholder = common.getFirstDayOfWeek();
            this.start_placeholder = common.currentDate();
            //console.log('chenbowen~~~~~~~~~~~~~~~'+common.getFirstDayOfWeek());
            this.end_placeholder = common.currentDate() + ' 23:59:59';
            this.chartDate = [common.getFirstDayOfWeek() + ' 00:00:00', common.currentDate() + ' 23:59:59'];
            this.selParkId = -1;

            let _this = this;
            _this.$nextTick(function () {
                axios.all([common.getCollector()])
                    .then(axios.spread(function (ret) {
                        _this.parklistChart = ret.data;
                        _this.parklistChart.push({
                                value_name: '全部',
                                value_no: -1
                            }
                        );
                        _this.queryForChart(1);
                    }));
            });

            this.initChart();
        }
    };

</script>

<style>
    .gutter {
        display: none
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

