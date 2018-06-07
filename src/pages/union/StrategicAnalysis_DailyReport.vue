<template>

    <section>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane  name="tableStyle" class="tab-content-pad">
                <span slot="label"><i class="el-icon-tickets"></i> 表格模式</span>
                <common-table
                        :queryapi="queryapi"
                        :tableheight="tableheight"
                        :fieldsstr="fieldsstr"
                        :tableitems="tableitems"
                        :btswidth="btswidth"
                        :hide-export="hideExport"
                        :showdateSelector10="showdateSelector"
                        :showParkSelector="showParkSelector"
                        :hide-options="hideOptions"
                        :searchtitle="searchtitle"
                        :exportapi="exportapi"
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
                    <section >

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
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                :start-placeholder="start_placeholder"
                                :end-placeholder="end_placeholder"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="chartPickerOptions"
                                @change="changeanalysisdate"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                        <!--<el-button type="primary" @click="queryForChart">确定</el-button>-->
                    </section >

                </section>
                <section class="chart-sec">
                    <!--<div  id="chart" class="chart-style" v-bind:style="{height:chartHeight,width:chartWidth}" style="overflow-y: auto;padding-right: 30px;"></div>-->
                    <div  id="chart" class="chart-style"  :style='chartstyles'></div>

                </section>
            </el-tab-pane>
        </el-tabs>


    </section>
</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import axios from 'axios'
    import echarts from 'echarts'
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
                chartstyles:'',
                chartPickerOptions:{
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
                showdateSelector: true,
                showParkSelector:false,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination: true,
                exportapi: '/cityorderanlysis/exportExcel',
                queryapi: '/cityorderanlysis/query',
                btswidth: '100',
                fieldsstr: 'time__comid__amount_receivable__cash_pay__electronic_pay__act_total__free_pay',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日期',
                                prop: 'time',
                                width: '123',
                                type: 'date',
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
                                label: '应收金额',
                                prop: 'amount_receivable',
                                width: '123',
                                type: 'selection',
                                editable: false,
                                searchable: false,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
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
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '减免金额',
                            prop: 'free_pay',
                            width: '123',
                            type: 'str',
                            editable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '高级查询',

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
            }
        },
        methods: {
            initChart: function() {
                //初始化图表
                this.chart = echarts.init(document.getElementById('chart'));
                console.log('chart加载')
                console.log(this.chart)
            },
            changeanalysisdate(input2) {
                //修改车场统计分析日期
                console.log(input2);
                console.log(this.chartDate);
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

                if(isFirst!==1){
                    formdata.time = 'between';//this.chartDate[1].getTime() ;
                    // formdata.time_start = this.chartDate[0].getTime(); //;
                    // formdata.time_end = this.chartDate[1].getTime();
                    formdata.date = this.chartDate[0] + '至' + this.chartDate[1];
                }

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
                            stack: '总量1',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'应收金额',
                            type:'line',
                            stack: '总量2',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'电子支付',
                            type:'line',
                            stack: '总量3',
                            // areaStyle: {normal: {}},
                            data:[]
                        },
                        {
                            name:'实收金额',
                            type:'line',
                            stack: '总量4',
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
                            stack: '总量5',
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
                        xAxisData[i] = rData.time;
                        //seriesData[0].data[i] = rData.scount  ;//订单总数
                        seriesData[0].data[i] = rData.cash_pay ; //现金支付
                        seriesData[1].data[i] = rData.amount_receivable;  //应收金额
                        seriesData[2].data[i] = rData.electronic_pay;  //电子支付
                        seriesData[3].data[i] = rData.act_total;  //实收金额
                        seriesData[4].data[i] = rData.free_pay;  //减免金额
                    }
                    vm.chart.setOption({
                        title: {
                            text: '集团日报统计'
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
                // this.chartHeight = (common.gwh()-143)+'px';
                // this.chartWidth = (common.gww()/common.gwh())*common.gwh();
            };
            this.initChart();
        },
        created(){
            this.chartstyles = 'overflow-y: auto;padding-right: 30px;width: ' + (common.gww() - 566) + 'px;height: ' + (common.gwh() - 187) + 'px;';
        },
        activated() {
            this.activeName= 'tableStyle',
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
                this.chartHeight = (common.gwh()-200)+'px';
                this.chartWidth = (common.gww()/common.gwh())*common.gwh();
                //console.log(this.chartHeight,this.chartWidth);
            };
            this.chartHeight = (common.gwh()-200)+'px';
            this.chartWidth = (common.gww()/(common.gwh()-200))*common.gwh();
            this.chartDate = common.currentDateArray(10);
            this.selParkId = -1;

            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({date: '', out_uid: ''});
            // this.getTableData(this.sform);
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
                    }))
            });
            this.start_placeholder = common.currentDate() + ' 00:00:00';
            this.end_placeholder = common.currentDate() + ' 23:59:59';
        },
        watch: {
            parklist: function (val) {
                this.tableitems[1].subs[0].selectlist = val
            }
        },
    }

</script>

<style>
    .tab-content-pad {
        padding-left: 10px;
    }
    .date-picker-sec , .chart-sec{
        width: 100%;
        display: flex;
        justify-content:space-around;
    }
    .chart-style{
        padding-top: 60px;
    }

</style>
