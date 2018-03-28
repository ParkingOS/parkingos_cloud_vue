<template>

    <section class="data-sec">
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple panel-left">
                    <div class="pannel-center">
                        <div class="data-box">
                            <div class="title">今日收费总汇</div>
                            <div class="body">
                                <div class="item">
                                    <div class="item-txt">电子收费</div>
                                    <div class="item-num">
                                        <div class="data-num">0</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">3</div>
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="item-txt">电子收费</div>
                                    <div class="item-num">
                                        <div class="data-num">0</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">3</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="data-box" ref="echartBox">
                            <div class="title">今日收费构成</div>
                            <div class="body">
                                <div id="todayMoneyChart" v-bind:style="topParkChartSize"></div>
                            </div>
                        </div>

                        <div class="data-box">
                            <div class="title">车场在线状态</div>
                            <div class="body">
                                <div class="item-list">
                                    <div class="bar-item">
                                        <div class="bar bar-green"></div>
                                        <div class="bar-text">车场1</div>
                                    </div>
                                    <div class="bar-item">
                                        <div class="bar bar-red"></div>
                                        <div class="bar-text">车场2</div>
                                    </div>
                                    <div class="bar-item">
                                        <div class="bar bar-green"></div>
                                        <div class="bar-text">车场1</div>
                                    </div>
                                    <div class="bar-item">
                                        <div class="bar bar-red"></div>
                                        <div class="bar-text">车场2</div>
                                    </div>
                                    <div class="bar-item">
                                        <div class="bar bar-green"></div>
                                        <div class="bar-text">车场1</div>
                                    </div>
                                    <div class="bar-item">
                                        <div class="bar bar-red"></div>
                                        <div class="bar-text">车场2</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light pannel-center-sec">
                    <div class="pannel-center">
                        <div class="cart-in-out">
                            <div class="data-box cart-box">
                                <!--<div class="title">进场车辆</div>-->
                                <!--<div class="body">-->
                                <!--<el-table-->
                                <!--:data="inPartData"-->
                                <!--stripe-->
                                <!--style="width: 100%" height="250">-->
                                <!--<el-table-column-->
                                <!--prop="parkName"-->
                                <!--label="车场名称"-->
                                <!--width="100">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                <!--prop="time"-->
                                <!--label="时间"-->
                                <!--width="60">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                <!--prop="cartId"-->
                                <!--label="车牌">-->
                                <!--</el-table-column>-->
                                <!--</el-table>-->

                                <!--</div>-->
                                <div class="title">进场车辆</div>
                                <div style="background: white;color: black;padding:5px;">
                                    <div style="background: lightgray;display: flex;flex-direction: row;align-items: center;background-color: #F5F7FA;height: 48px;">
                                        <span style="flex: 2;text-align: center;">车场名称</span>
                                        <span style="flex: 1;text-align: center;">时间</span>
                                        <span style="flex: 2;text-align: center;">车牌号</span></div>
                                    <div id="box">

                                        <ul id="con1" ref="con1" :class="{anim:animate==true}">
                                            <!--<li v-for='item in items'>{{item.name}}</li>-->
                                            <li v-for='(item,index) in inPartData'>
                                                <!--<div >-->
                                                <div :style="indexrule(index)?styledouble:stylesingle">
                                                    <!--<div :style="currentindex%2===0?styledouble:stylesingle">-->
                                                    <span style="flex: 2;text-align: center;">{{item.parkName}}</span>
                                                    <span style="flex: 1;text-align: center;">{{item.time}}</span>
                                                    <span style="flex: 2;text-align: center;">{{item.cartId}}</span>
                                                </div>
                                                <!--<div style="background-color: #EBEEF5;height: 1px;"></div>-->
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="data-box cart-box">
                                <div class="title">出场车辆</div>
                                <div class="body">
                                    <el-table
                                            :data="outPartData"
                                            stripe
                                            style="width: 100%" height="250">
                                        <el-table-column
                                                prop="parkName"
                                                label="车场名称"
                                                width="100">
                                        </el-table-column>
                                        <el-table-column
                                                prop="time"
                                                label="时间"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                prop="cartId"
                                                label="车牌">
                                        </el-table-column>
                                    </el-table>

                                </div>
                            </div>
                        </div>
                        <div class="pos-use">
                            <div class="data-box" ref="posuse">
                                <div class="title">泊位使用率</div>
                                <div class="body">
                                    <div id="placeChart" v-bind:style="placeChartSize"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple panel-right">
                    <div class="pannel-center">
                        <div class="data-box">
                            <div class="title">今日收费车场排行</div>
                            <div class="body">
                                <div id="topParkChart" v-bind:style="topParkChartSize"></div>
                            </div>
                        </div>
                        <div class="data-box">
                            <div class="title">进出车统计</div>
                            <div class="body">
                                <div class="item">
                                    <div class="item-txt">今日进场</div>
                                    <div class="item-num">
                                        <div class="data-num">0</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">3</div>
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="item-txt">今日离场</div>
                                    <div class="item-num">
                                        <div class="data-num">0</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">3</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="item-txt">在场车辆</div>
                                    <div class="item-num">
                                        <div class="data-num">0</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">2</div>
                                        <div class="data-num">3</div>
                                        <div class="data-num">3</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="data-box">
                            <div class="title">异常事件处理统计</div>
                            <div class="body">
                                <div class="body">
                                    <div id="eventChart" v-bind:style="topParkChartSize"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util';
    import echarts from 'echarts';
    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import CommonTable from '../../components/CommonTable';

    import axios from 'axios';

    export default {
        data() {
            return {
                animate: false,//用于循环滚动在/出场车辆列表
                stylesingle: ' display: flex;flex-direction: row;align-items: center;background-color:#FFFFFF',
                styledouble: ' display: flex;flex-direction: row;align-items: center;background-color:#EBEEF5',
                currentindex: 0,
                transfer: false,

                topParkChartSize: {
                    width: '1px',
                    height: '200px'
                },
                placeChartSize: {
                    width: '1px',
                    height: '1px'
                },
                inPartData: [
                    {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N11111'
                    },
                    {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N22222'
                    },
                    {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N33333'
                    }, {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N44444'
                    }, {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N55555'
                    }, {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N66666'
                    }
                ],
                outPartData: [{
                    parkName: '上地车场',
                    time: '10:12',
                    cartId: '京N34344'
                },
                    {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N34344'
                    },
                    {
                        parkName: '上地车场',
                        time: '10:12',
                        cartId: '京N34344'
                    }
                ]
            };
        },
        methods: {
            getPlaceData: function () {
                let resutltData = [
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521536400',
                        time: '17',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521540000',
                        time: '18',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521543600',
                        time: '19',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521547200',
                        time: '20',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521550800',
                        time: '21',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521554400',
                        time: '22',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521558000',
                        time: '23',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521561600',
                        time: '0',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521565200',
                        time: '1',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521568800',
                        time: '2',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521572400',
                        time: '3',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521576000',
                        time: '4',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521579600',
                        time: '5',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521583200',
                        time: '6',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521586800',
                        time: '7',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521590400',
                        time: '8',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521594000',
                        time: '9',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521597600',
                        time: '10',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521601200',
                        time: '11',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521604800',
                        time: '12',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521608400',
                        time: '13',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521612000',
                        time: '14',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '4',
                        create_time: '1521615600',
                        time: '15',
                        percent: '0',
                        refreshBerth: 'true'
                    },
                    {
                        asum: '10001',
                        usum: '5',
                        create_time: '1521619200',
                        time: '16',
                        percent: '0',
                        refreshBerth: 'true'
                    }
                ];
                var rData = {};
                rData.data = resutltData;
                rData.date = [];
                for (var i = 0; i < resutltData.length; i++) {
                    rData.date.push(resutltData[i].time);
                }
                return rData;
            },
            initChart: function () {
                //收费车场排行
                this.topParkChart = echarts.init(document.getElementById('topParkChart'));
                this.eventChart = echarts.init(document.getElementById('eventChart'));
                this.todayMoneyChart = echarts.init(document.getElementById('todayMoneyChart'));
                this.placeChart = echarts.init(document.getElementById('placeChart'));
                var placeData = this.getPlaceData();
                this.placeChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}时:\n{c}%'
                    },
                    legend: {
                        data: ['使用率%']
                    },
                    grid: {
                        containLabel: true,
                        x1: 50,
                        x2: 50,
                        y1: 10,
                        y2: 35
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: placeData.date,
                        axisLabel: {
                            show: true,
                            interval: 0,
                            formatter: '{value}\n时'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: '{value}'
                        },
                        show: true
                    },
                    series: [{
                        name: '使用率%',
                        type: 'line',
                        stack: '总量',
                        data: placeData.data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{c}'
                                }
                            }
                        }
                    }]
                });


                this.todayMoneyChart.setOption({
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        show: false
                    },
                    series: [
                        {
                            name: '收费占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: '电子'},
                                {value: 310, name: '现金'},
                                {value: 234, name: '减免'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
                this.eventChart.setOption({
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        position: 'right',
                        type: 'category',
                        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口']
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: [18203, 23489, 29034, 14970, 31744, 30230]
                        }
                    ]
                });
                this.topParkChart.setOption({
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        position: 'right',
                        type: 'category',
                        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口']
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: [18203, 23489, 29034, 14970, 31744, 30230]
                        }
                    ]
                });
            },
            scroll() {
                let con1 = this.$refs.con1;
                con1.style.marginTop = '-48px';
                this.animate = !this.animate;
                let that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.inPartData.push(that.inPartData[0]);
                    that.inPartData.shift();
                    // con1.style.marginTop = '0px';
                    that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    that.transfer = !that.transfer;//这里给判断规则取反，防止因index奇偶变换导致的颜色变换
                }, 1000);
            },
            indexrule(index) {
                if (this.transfer) {
                    return index % 2 !== 0;
                } else {
                    return index % 2 === 0;
                }

            }
        },
        mounted() {
            this.initChart();
        },
        activated() {
            let that = this;
            let widthCss = window.getComputedStyle(that.$refs.echartBox).width;
            let posCss = window.getComputedStyle(that.$refs.posuse).width.replace('px', '');
            let intCss = parseInt(posCss);
            that.topParkChartSize.height = that.topParkChartSize.width = widthCss;
            that.placeChartSize.height = (intCss / 2) + 'px';
            that.placeChartSize.width = intCss + 'px';
            setTimeout(function () {
                that.topParkChart.resize();
                that.todayMoneyChart.resize();
                that.eventChart.resize();
                that.placeChart.resize();
            }, 1);


            window.onresize = () => {
                var widthCss = window.getComputedStyle(this.$refs.echartBox).width;
                this.topParkChartSize.height = this.topParkChartSize.width = widthCss;
                var posCss = window.getComputedStyle(that.$refs.posuse).width.replace('px', '');
                var intCss = parseInt(posCss);

                that.placeChartSize.height = (intCss / 2) + 'px';

                that.placeChartSize.width = intCss + 'px';

                this.topParkChart.resize();
                this.todayMoneyChart.resize();
                this.eventChart.resize();
                this.placeChart.resize();
            };
        },
        watch: {},
        created() {
            setInterval(this.scroll, 1500); // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
        }
    };

</script>

<style>
    .data-sec {
        background-color: #393a3e;
        color: #ffffff;
        border-radius: 2px;
        padding-bottom: 20px;
    }

    .pannel-center-sec .panel-right .panel-left {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }

    .panel-left .pannel-center, .panel-right .pannel-center, .pannel-center-sec .pannel-center {
        width: 90%;
        margin: auto;

    }

    .data-box {
        margin-top: 20px;
    }

    .cart-box {
        width: 48%;
    }

    .data-box .title {
        width: 90%;
    }

    .data-box .body {
        padding: 10px;
        background-color: #ffffff;
    }

    .caption {
        border-bottom: 1px solid #eef1f5;
    }

    .data-box .item-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .data-box .body .bar-item {
        margin-left: 5px;
        width: 40px;
        margin-bottom: 5px;
    }

    .data-box .body .bar-item .bar-text {
        color: #393a3e;
        line-height: 12px;
        text-align: center;
        font-size: 12px;
        margin-top: 6px;
    }

    .data-box .body .bar-item .bar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .data-box .body .bar-green {
        background-color: green;
    }

    .data-box .body .bar-red {
        background-color: red;
    }

    .data-box .body .item {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
    }

    .data-box .body .item-txt {
        color: #393a3e;
        line-height: 20px;
        font-size: 12px;
    }

    .data-box .body .item-num {
        display: flex;
    }

    .data-box .data-num {
        background-color: #393a3e;
        text-align: center;
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: 2px;
        border-radius: 2px;
        color: white;
        width: 20px;
    }

    .cart-in-out {
        display: flex;
        justify-content: space-around;
    }

    .font-yellow {
        color: #c49f47;
    }

    .gutter {
        display: none
    }

    * {
        margin: 0;
        padding: 0;
    }

    #box {
        height: 240px;
        line-height: 48px;
        overflow: hidden;
        transition: all 0.5s;
    }

    /*动画执行时间 0.5s*/
    .anim {
        transition: all 0.5s;
    }

    #con1 li {
        list-style: none;
        line-height: 48px;
        height: 48px;
    }

    .nthdiv:nth-child(odd) {
        background: #ff0000;
    }

    .nthdiv:nth-child(even) {
        background: #0000ff;
    }
</style>
