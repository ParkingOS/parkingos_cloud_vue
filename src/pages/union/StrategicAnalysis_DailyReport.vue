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
                        :showdateSelector="showdateSelector"
                        :showParkSelector="showParkSelector"
                        :hide-options="hideOptions"
                        :searchtitle="searchtitle"

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
                        <el-select v-model="selParkId" filterable placeholder="请选择" @change="changeanalysisdatepark">
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
                    <div  id="chart" class="chart-style" v-bind:style="{height:chartHeight,width:chartWidth}"></div>
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

                loading: false,
                hideExport: false,
                hideSearch: true,
                showdateSelector: true,
                showParkSelector:true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination: true,

                queryapi: '/cityparkorder/query',
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
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '车场',
                                prop: 'comid',
                                width: '123',
                                type: 'selection',
                                selection: this.parklist,
                                editable: false,
                                searchable: true,
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
                currentRow: '',
                parklist: [],
                parklistChart: [],
            }
        },
        methods: {
            initChart: function() {
                //初始化图表
                this.chart = echarts.init(document.getElementById('chart'));
            },
            changeanalysisdate(input2) {
                //修改车场统计分析日期
                console.log(input2);
                console.log(this.chartDate);

                // if (input2.length > 0) {
                //     let input = input2[0] + '至' + input2[1];
                //     this.currentdate = input;
                //     let date = {'date': input, 'out_uid': this.currentcollect, 'comid_start': this.currentpark};
                //     this.searchDate = input;
                //     this.currentPage = 1;
                //     this.getTableData(date);
                // }
                // let
                // this.queryForChart();
                this.queryForChart();
            },
            changeanalysisdatepark(val) {
                this.selParkId = val
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
                if(this.selParkId>0){
                    formdata.comid_start = this.selParkId;
                    formdata.comid = '';
                }
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
                        xAxisData[i] = rData.time;
                        //seriesData[0].data[i] = rData.scount  ;//订单总数
                        seriesData[0].data[i] = rData.cash_pay ; //现金支付
                        seriesData[1].data[i] = rData.amount_receivable;  //应收金额
                        seriesData[2].data[i] = rData.electronic_pay;  //电子支付
                        seriesData[3].data[i] = rData.act_total;  //实收金额
                        seriesData[4].data[i] = rData.reduce_pay;  //减免金额
                    }
                    vm.chart.setOption({
                        title: {
                            text: '车场日报'
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
                this.chartHeight = (common.gwh()-143)+'px';
                this.chartWidth = (common.gww()/common.gwh())*common.gwh();
            };
            this.tableheight = common.gwh() - 143;
            this.chartHeight = (common.gwh()-143)+'px';
            this.chartWidth = (common.gww()/common.gwh())*common.gwh();
            // const end = new Date();
            // const start = new Date();
            // this.chartDate = [new Date(start.getTime() - 3600 * 1000 * 24 * 30),end];
            this.chartDate = [common.currentDate()+' 00:00:00',common.currentDate()+' 23:59:59'];
            this.initChart();



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
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
                this.chartHeight = (common.gwh()-143)+'px';
                this.chartWidth = (common.gww()/common.gwh())*common.gwh();
                //console.log(this.chartHeight,this.chartWidth);
            };
            this.chartHeight = (common.gwh()-143)+'px';
            this.chartWidth = (common.gww()/(common.gwh()-143))*common.gwh();


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
