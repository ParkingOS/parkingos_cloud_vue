<template>
    <section class="data-sec" :style="containStyle">
        <div style="display: flex;flex-direction: row;width: 100%;height: 100%;align-content: stretch;">
            <div style="flex: 1;width: 0;display:flex ;flex-direction: column">
                <div style="flex: 2;padding: 5px 10px 10px 10px;overflow-y: auto;display: flex;align-items: center;justify-content: center;">

                    <div class="data-box" style="margin-top: 5px;width: 100%;">
                        <div class="title">今日收费汇总</div>
                        <div class="body">
                            <div class="item" style="padding-top: 10px;margin-bottom: 10px">
                                <div class="item-txt">电子收费</div>
                                <NumberRoller ref="roll_elepay"></NumberRoller>
                            </div>

                            <div class="item" style="margin-bottom: 10px">
                                <div class="item-txt">现金收费</div>
                                <NumberRoller ref="roll_cashpay"></NumberRoller>
                            </div>

                            <div class="item" style="margin-bottom: 10px">
                                <div class="item-txt">优惠减免</div>
                                <NumberRoller ref="roll_reduce"></NumberRoller>
                            </div>
                        </div>
                    </div>

                </div>
                <div style="flex: 3;padding: 10px;overflow-y: auto">
                    <div class="data-box" ref="echartBox">
                        <div class="title">今日收费构成</div>
                        <div class="body" style="padding: 0;">
                            <div id="todayMoneyChart" v-bind:style="topParkChartSize"></div>
                        </div>
                    </div>
                </div>
                <div class="title" style="padding-left: 10px;">在线设备</div>
                <div style="flex: 2;margin: 0 10px 10px 10px;overflow-y: auto;background-color: white;">
                    <div class="data-box" style="margin-top: 0px;">

                        <div class="body">
                            <div class="item-list">
                                <div class="bar-item" v-for='item in parkState'>
                                    <div :class="item.state===0?'bar bar-red':'bar bar-green'"></div>
                                    <div class="bar-text">{{item.parkName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="flex: 2;width: 0;display:flex ;flex-direction: column">
                <!--<div style="flex: 1;padding: 80px 10px 10px 10px;display: flex;flex-direction: row;justify-content: space-around;overflow: hidden;align-items: center;">-->
                <div :style="rollstyle">
                    <div class="data-box cart-box" style="background-color: white;">
                        <div class="title" style="width: 100%;background-color: #393a3e;">入场车辆</div>
                        <div style="background: white;color: black;padding:5px;overflow: hidden;">
                            <div style="background: lightgray;display: flex;flex-direction: row;align-items: center;background-color: #F5F7FA;height: 48px;">
                                <span style="flex: 2;text-align: center;">车场名称</span>
                                <span style="flex: 1;text-align: center;">时间</span>
                                <span style="flex: 2;text-align: center;">车牌号</span></div>
                            <div class="box">
                                <ul class="con1" ref="con1" :class="{anim:animate==true}">
                                    <li v-for='(item,index) in inPartData'>
                                        <div :style="indexrule(index)?styledouble:stylesingle">
                                            <span style="flex: 2;text-align: center;">{{item.parkName}}</span>
                                            <span style="flex: 1;text-align: center;">{{item.time}}</span>
                                            <span style="flex: 2;text-align: center;">{{item.cartId}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="data-box cart-box" style="background-color: white;">
                        <div class="title" style="width: 100%;background-color: #393a3e;">出场车辆</div>
                        <div style="background: white;color: black;padding:5px;">
                            <div style="background: lightgray;display: flex;flex-direction: row;align-items: center;background-color: #F5F7FA;height: 48px;">
                                <span style="flex: 2;text-align: center;">车场名称</span>
                                <span style="flex: 1;text-align: center;">时间</span>
                                <span style="flex: 2;text-align: center;">车牌号</span></div>
                            <div class="box">
                                <ul class="con1" ref="con2" :class="{anim:animate==true}">
                                    <li v-for='(item,index) in outPartData'>
                                        <div :style="indexrule2(index)?styledouble:stylesingle">
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
                </div>
                <div style="flex: 1;padding: 10px;">
                    <div class="data-box" ref="posuse">
                        <div class="title">泊位使用率</div>
                        <div class="body" style="padding: 10px 0;">
                            <div id="placeChart" v-bind:style="placeChartSize"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="flex: 1;width: 0;display:flex ;flex-direction: column">
                <div style="flex: 3;padding: 5px 10px 10px 10px;overflow-y: auto;display: flex;align-items: center;justify-content: center;">
                    <div class="data-box" style="width: 100%;">
                        <div class="title">今日收费排行</div>
                        <div class="body" style="padding: 0">
                            <div id="topParkChart" v-bind:style="topParkChartSize"></div>
                        </div>
                    </div>
                </div>

                <div style="flex: 2;padding: 5px 10px 10px 10px;overflow-y: auto;display: flex;align-items: center;justify-content: center;">
                    <div class="data-box" style="width: 100%;">
                        <div class="title">进出车统计</div>
                        <div class="body">
                            <div class="item" style="padding-top: 10px;margin-bottom: 10px">
                                <div class="item-txt">今日入场</div>
                                <NumberRoller ref="roll_incar"></NumberRoller>
                            </div>
                            <div class="item" style="margin-bottom: 10px">
                                <div class="item-txt">今日离场</div>
                                <NumberRoller ref="roll_outcar"></NumberRoller>
                            </div>
                            <div class="item" style="margin-bottom: 10px">
                                <div class="item-txt">在场车辆</div>
                                <NumberRoller ref="roll_inpark"></NumberRoller>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title" style="padding-left: 10px;">异常抬杆</div>
                <div style="flex: 2;margin: 0 10px 10px 10px;overflow: hidden;margin-bottom: 10px;background-color: white;">
                    <div class="data-box" style="margin-top: 0px;" >

                        <div style="background: white;color: black;padding:5px;">
                            <div style="background: lightgray;display: flex;flex-direction: row;align-items: center;background-color: #F5F7FA;height: 48px;">
                                <span style="flex: 1;text-align: center;">时间</span>
                                <span style="flex: 1;text-align: center;">通道</span>
                                <span style="flex: 1;text-align: center;">收费员</span>
                                <span style="flex: 2;text-align: center;">原因</span>
                            </div>
                            <div class="box">
                                <ul class="con1" ref="con3" :class="{anim:animate==true}">
                                    <li v-for='(item,index) in exceptionDataPole'>
                                        <div :style="indexrule3(index)?styledouble:stylesingle">
                                            <span style="flex: 1;text-align: center;">{{item.time}}</span>
                                            <span style="flex: 1;text-align: center;">{{item.passid}}</span>
                                            <span style="flex: 1;text-align: center;">{{item.uin}}</span>
                                            <span style="flex: 2;text-align: center;">{{item.reason}}</span>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util';
    import echarts from 'echarts';
    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import NumberRoller from '../../components/NumberRoller';

    import axios from 'axios';

    export default {
        components: {
            NumberRoller
        },
        data() {
            return {
                animate: false,//用于循环滚动在/出场车辆列表
                animate2: false,//用于循环滚动在/出场车辆列表
                animate3: false,//用于循环滚动在/出场车辆列表
                stylesingle: ' display: flex;flex-direction: row;align-items: center;background-color:#FFFFFF',
                styledouble: ' display: flex;flex-direction: row;align-items: center;background-color:#EBEEF5',
                transfer: false,
                transfer2: false,
                transfer3: false,
                transInteval: '',//循环
                transInteval2: '',//循环
                transInteval3: '',//循环
                dataInteval: '',//循环获取页面数据
                dataInitCount: 0,

                containStyle: '',
                flexStyle4: '',
                flexStyle3: '',
                flexStyle33: '',
                flexStyle2: '',
                flexStyle22: '',
                topParkChartSize: {
                    width: '1px',
                    height: '200px'
                }, topParkChartSize2: {
                    width: '1px',
                    height: '200px'
                },
                placeChartSize: {
                    width: '1px',
                    height: '1px'
                },
                rollstyle: '',
                dataaaa: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                parkState: [],//车场在线状态
                inPartData: [],//入场车辆轮播
                outPartData: [],//出场车辆轮播
                berthData: {},//泊位使用率
                rankData: {},//收费排行
                exceptionData: {},//异常列表
                exceptionDataPole: [],//异常列表抬杆轮播
                incomePie: [],//今日收费构成饼图
                responseData: {},//请求接口返回的数据
                response: '{"totalIncome":{"elePay":123,"cashPay":456},"totalIncomPie":[{"value":335,"name":"电子"},{"value":310,"name":"现金"},{"value":144,"name":"减免"}],"parkState":[{"parkName":"车场1","state":0},{"parkName":"车场1","state":1},{"parkName":"车场2","state":1},{"parkName":"车场3","state":1},{"parkName":"车场4","state":1},{"parkName":"车场5","state":0},{"parkName":"车场6","state":0},{"parkName":"车场7","state":1},{"parkName":"车场8","state":1},{"parkName":"车场9","state":1}],"inPartData":[{"parkName":"上地车场","time":"10:12","cartId":"京N1qw11"},{"parkName":"上地车场","time":"10:12","cartId":"京N1zx1"},{"parkName":"上地车场","time":"10:12","cartId":"京N15411"},{"parkName":"上地车场","time":"10:12","cartId":"京N111bv"},{"parkName":"上地车场","time":"10:12","cartId":"京N1te11"},{"parkName":"上地车场","time":"10:12","cartId":"京N1qw11"}],"outPartData":[{"parkName":"上地车场","time":"10:12","cartId":"京N1qw11"},{"parkName":"上地车场","time":"10:12","cartId":"京N1zx1"},{"parkName":"上地车场","time":"10:12","cartId":"京N15411"},{"parkName":"上地车场","time":"10:12","cartId":"京N111bv"},{"parkName":"上地车场","time":"10:12","cartId":"京N1te11"},{"parkName":"上地车场","time":"10:12","cartId":"京N1qw11"}],"berthPercentData":[{"time":"17","percent":3},{"time":"18","percent":30},{"time":"19","percent":23},{"time":"20","percent":13}],"parkRank":[{"parkName":"车场1","total":"4324"},{"parkName":"车场2","total":"3999"},{"parkName":"车场3","total":"3456"},{"parkName":"车场4","total":"2345"},{"parkName":"车场5","total":"876"}],"inOutCarsCount":{"inPark":168,"outCars":543,"inCars":893},"exceptionEvents":[{"exception":"异常1","count":234},{"exception":"异常2","count":345},{"exception":"异常3","count":456},{"exception":"异常4","count":567},{"exception":"异常5","count":678}]}'
            };
        },
        methods: {
            getPlaceData(data) {
                //将返回的泊位数据组装给echarts
                let rData = {};
                rData.value = [];
                rData.name = [];
                for (var i = 0; i < data.length; i++) {
                    rData.name.push(data[i].time);
                    rData.value.push(data[i].percent);
                }
                this.berthData = rData;
            },
            getRank(data) {
                //将返回的收费车场排行组装给echarts
                let rData = {};
                rData.value = [];
                rData.name = [];
                for (var i = 0; i < data.length; i++) {
                    rData.name.push(data[i].parkName);
                    rData.value.push(data[i].total);
                }
                this.rankData = rData;
            },
            getException(data) {
                //将返回的异常事件组装给echarts
                let rData = {};
                rData.value = [];
                rData.name = [];
                for (var i = 0; i < data.length; i++) {
                    rData.name.push(data[i].parkName);
                    rData.value.push(data[i].total);
                }
                this.exceptionData = rData;
            },
            initChart: function () {
                //收费车场排行
                this.topParkChart = echarts.init(document.getElementById('topParkChart'));
                // this.eventChart = echarts.init(document.getElementById('eventChart'));
                this.todayMoneyChart = echarts.init(document.getElementById('todayMoneyChart'));
                this.placeChart = echarts.init(document.getElementById('placeChart'));

                this.placeChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}时:{c}%'
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
                        data: this.berthData.name,
                        // data: [1,2,3,4,5,6,7,8,9,10],
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
                        data: this.berthData.value,
                        // data: [1,2,3,4,5,6,7,8,9,10],
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
                            center: ['50%', '50%'],
                            data: this.incomePie,
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
                // this.eventChart.setOption({
                //     title: {
                //         show: false
                //     },
                //     tooltip: {
                //         trigger: 'axis',
                //         axisPointer: {
                //             type: 'shadow'
                //         }
                //     },
                //     grid: {
                //         show: false,
                //         left: '3%',
                //         right: '4%',
                //         bottom: '3%',
                //         containLabel: true
                //     },
                //     xAxis: {
                //         show: false,
                //         type: 'value',
                //         axisLine: {
                //             show: false
                //         },
                //         boundaryGap: [0, 0.01]
                //     },
                //     yAxis: {
                //         axisLine: {
                //             show: false
                //         },
                //         position: 'right',
                //         type: 'category',
                //         data: this.exceptionData.name
                //     },
                //     series: [
                //         {
                //             // name: '2011年',
                //             type: 'bar',
                //             label: {
                //                 normal: {
                //                     show: true,
                //                     position: 'inside'
                //                 }
                //             },
                //             data: this.exceptionData.value
                //         }
                //     ]
                // });
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
                        bottom: '2%',
                        top: '4%',
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
                        data: this.rankData.name
                    },
                    series: [
                        {
                            // name: '2011年',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: this.rankData.value
                        }
                    ]
                });
            },
            scroll() {
                let con1 = this.$refs.con1;
                if (con1 == undefined) {
                    clearInterval(this.transInteval);
                    return;
                }
                con1.style.marginTop = '-48px';
                this.animate = !this.animate;
                let that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.inPartData.push(that.inPartData[0]);
                    that.inPartData.shift();
                    con1.style.marginTop = '0px';
                    that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    that.transfer = !that.transfer;//这里给判断规则取反，防止因index奇偶变换导致的颜色变换
                }, 1000);
            },
            scroll2() {
                let con2 = this.$refs.con2;
                if (con2 == undefined) {
                    clearInterval(this.transInteval2);
                    return;
                }
                con2.style.marginTop = '-48px';
                this.animate2 = !this.animate2;
                let that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.outPartData.push(that.outPartData[0]);
                    that.outPartData.shift();
                    con2.style.marginTop = '0px';
                    that.animate2 = !that.animate2;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    that.transfer2 = !that.transfer2;//这里给判断规则取反，防止因index奇偶变换导致的颜色变换
                }, 1000);
            },
            scroll3() {
                let con3 = this.$refs.con3;
                if (con3 == undefined) {
                    clearInterval(this.transInteval3);
                    return;
                }
                con3.style.marginTop = '-48px';
                this.animate3 = !this.animate3;
                let that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.exceptionDataPole.push(that.exceptionDataPole[0]);
                    that.exceptionDataPole.shift();
                    con3.style.marginTop = '0px';
                    that.animate3 = !that.animate3;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    that.transfer3 = !that.transfer3;//这里给判断规则取反，防止因index奇偶变换导致的颜色变换
                }, 1000);
            },
            indexrule(index) {
                if (this.transfer) {
                    return index % 2 !== 0;
                } else {
                    return index % 2 === 0;
                }

            },
            indexrule2(index) {
                if (this.transfer2) {
                    return index % 2 !== 0;
                } else {
                    return index % 2 === 0;
                }

            },
            indexrule3(index) {
                if (this.transfer3) {
                    return index % 2 !== 0;
                } else {
                    return index % 2 === 0;
                }

            },

            getDatas() {
                let _this = this;
                axios.all([axios.get(path + '/getparkinfo/bycomid?comid=' + sessionStorage.getItem('comid'))])
                // axios.all([axios.get('http://192.168.136.1:8080/cloud/getparkinfo/bycomid?comid=' + sessionStorage.getItem('comid'))])
                    .then(axios.spread(function (ret) {
                        console.log(ret);

                        // if(_this.dataInitCount>0&&_this.dataInitCount<2){
                        // _this.responseData = JSON.parse(_this.response);
                        // }else{
                        _this.responseData = ret.data;
                        // }
                        // _this.dataInitCount++;
                        console.log(_this.responseData);

                        _this.inPartData = _this.responseData.inPartData;
                        _this.outPartData = _this.responseData.outPartData;
                        _this.parkState = _this.responseData.parkState;
                        _this.exceptionDataPole = _this.responseData.exceptionEvents;
                        // _this.exceptionDataPole = _this.responseData.outPartData;
                        _this.getPlaceData(_this.responseData.berthPercentData);
                        _this.getRank(_this.responseData.parkRank);
                        // _this.getException(_this.responseData.exceptionEvents);
                        _this.incomePie = _this.responseData.totalIncomPie;

                        //数字滚动的部分
                        _this.$refs['roll_cashpay'].init(_this.responseData.totalIncome.cashPay);
                        _this.$refs['roll_elepay'].init(_this.responseData.totalIncome.elePay);
                        _this.$refs['roll_reduce'].init(_this.responseData.totalIncome.freePay);
                        _this.$refs['roll_incar'].init(_this.responseData.inOutCarsCount.inCars);
                        _this.$refs['roll_outcar'].init(_this.responseData.inOutCarsCount.outCars);
                        _this.$refs['roll_inpark'].init(_this.responseData.inOutCarsCount.inPark);

                        // console.log()
                        if (_this.dataInitCount > 0) {
                            return;
                        }
                        _this.dataInitCount++;
                        //需要数据初始化以后再初始化图表。否则会绘制失败
                        _this.initChart();
                        setTimeout(function () {
                            _this.topParkChart.resize();
                            _this.todayMoneyChart.resize();
                            // _this.eventChart.resize();
                            _this.placeChart.resize();
                        }, 1);


                        _this.transInteval = setInterval(_this.scroll, 1500); // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
                        _this.transInteval2 = setInterval(_this.scroll2, 1500); // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
                        _this.transInteval3 = setInterval(_this.scroll3, 1500); // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。

                    }));

            }
        },
        mounted() {

        },
        activated() {

            let that = this;
            let widthCssstr = window.getComputedStyle(that.$refs.echartBox).width.replace('px', '');
            ;
            let intwidth = parseInt(widthCssstr);
            that.topParkChartSize.width = (intwidth - 20) + 'px';
            that.topParkChartSize2.width = (intwidth - 20) + 'px';
            that.topParkChartSize.height = (intwidth * 0.75) + 'px';
            that.topParkChartSize2.height = (intwidth - 45) + 'px';

            let widthCss = window.getComputedStyle(that.$refs.echartBox).width;
            let posCss = window.getComputedStyle(that.$refs.posuse).width.replace('px', '');
            let intCss = parseInt(posCss);
            // that.topParkChartSize.height = that.topParkChartSize.width = widthCss;
            console.log(widthCss);
            that.placeChartSize.height = ((intCss / 2) - 20) + 'px';
            that.placeChartSize.width = intCss + 'px';

            // <div style="flex: 1;padding: 80px 10px 10px 10px;display: flex;flex-direction: row;justify-content: space-around;overflow: hidden;align-items: center;">
            // if (common.gww() < 1400) {
            //     this.rollstyle = 'flex: 1;padding: 80px 10px 10px 10px;display: flex;flex-direction: row;justify-content: space-around;overflow: hidden;';
            // } else {
            this.rollstyle = 'flex: 1;padding: 10px;display: flex;flex-direction: row;justify-content: space-around;overflow: hidden;';
            // }
            window.onresize = () => {
                // var widthCss = window.getComputedStyle(this.$refs.echartBox).width;
                // this.topParkChartSize.height = this.topParkChartSize.width = widthCss;
                let widthCssstr = window.getComputedStyle(this.$refs.echartBox).width.replace('px', '');
                ;
                let intwidth = parseInt(widthCssstr);
                this.topParkChartSize.width = (intwidth - 20) + 'px';
                this.topParkChartSize2.width = (intwidth - 20) + 'px';
                this.topParkChartSize.height = (intwidth * 0.75) + 'px';
                this.topParkChartSize2.height = (intwidth - 45) + 'px';

                var posCss = window.getComputedStyle(that.$refs.posuse).width.replace('px', '');
                var intCss = parseInt(posCss);

                that.placeChartSize.height = ((intCss / 2) - 20) + 'px';

                that.placeChartSize.width = intCss + 'px';

                this.topParkChart.resize();
                this.todayMoneyChart.resize();
                // this.eventChart.resize();
                this.placeChart.resize();
            };

            this.dataInitCount = 0;
            that.getDatas();
            this.dataInteval = setInterval(that.getDatas, 10000);


        },
        computed: {},
        watch: {},
        created() {
            this.containStyle = 'height: ' + (common.gwh() - 60) + 'px;overflow-y: auto;';
            this.flexStyle4 = 'height: ' + ((common.gwh() - 60) / 4 - 20) + 'px;overflow-y: auto;';
            this.flexStyle3 = 'height: ' + ((common.gwh() - 60) / 3) + 'px;overflow-y: auto;';
            this.flexStyle33 = 'height: ' + ((common.gwh() - 60) / 3 - 45) + 'px;overflow-y: auto;';
            this.flexStyle2 = 'height: ' + ((common.gwh() - 60) / 2 - 70) + 'px;overflow-y: auto;';
            this.flexStyle22 = 'height: ' + ((common.gwh() - 60) / 2 - 100) + 'px;overflow-y: auto;';
        },
        deactivated() {
            // console.log("我已经离开了！");
            clearInterval(this.transInteval);
            clearInterval(this.transInteval2);
            clearInterval(this.transInteval3);
            clearInterval(this.dataInteval);
        }
    };

</script>

<style>

    .data-sec {
        width: 100%;
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
        margin-top: 5px;
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

    .box {

        line-height: 48px;
        overflow: hidden;
        transition: all 0.5s;
    }

    /*动画执行时间 0.5s*/
    .anim {
        transition: all 0.5s;
    }

    .con1 li {
        list-style: none;
        line-height: 48px;
        height: 48px;
    }

    .flexdiv {

    }
</style>
