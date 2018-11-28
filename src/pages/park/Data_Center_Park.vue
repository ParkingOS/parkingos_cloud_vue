<template>
    <section class="data-center-park" style="">
        <h3 class="title">数据中心</h3>
        <!--第一部分统计数量的卡片-->
        <el-row class="center-park-margin" :gutter="10">
            <el-col :xs="24" :sm="12" :md="5">
                <infor-card
                        id-name="allCount"
                        :end-val="otherData.receiveTotal"
                        iconType="iconfont icon-jine"
                        color="#8693F3"
                        :iconSize="36"
                        intro-text="总收入（元）"
                ></infor-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="4">
                <infor-card
                        id-name="allCount"
                        :end-val="otherData.parkEmpty"
                        iconType="iconfont icon-chewei"
                        color="#BC8DEE"
                        :iconSize="36"
                        intro-text="空车位（个）"
                ></infor-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="5">
                <infor-card
                        id-name="allCount"
                        :end-val="otherData.monthTotal"
                        iconType="iconfont icon-huiyuan1"
                        color="#50E4A0"
                        :iconSize="36"
                        intro-text="月卡会员（人）"
                ></infor-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="5">
                <infor-card
                        id-name="allCount"
                        :end-val="otherData.ticketCount"
                        iconType="iconfont icon-quan"
                        color="#F5B962"
                        :iconSize="36"
                        intro-text="优惠券发放（张）"
                ></infor-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="5">
                <infor-card
                        id-name="allCount"
                        :end-val="otherData.vistorCount"
                        iconType="iconfont icon-fangke"
                        color="#61AFF6"
                        :iconSize="36"
                        intro-text="访客未处理（人）"
                ></infor-card>
            </el-col>
        </el-row>

        <!--第二部分 今日收费汇总 车场状态 今日收费车场排行-->
        <el-row class="center-park-margin" :gutter="20">
            <el-col :xs="24" :sm="12" :md="8">
                <charts-pie
                        charts-title="今日收费汇总"
                        charts-type="pie"
                        :charts-wrapper-height="currentHeight"
                :charts-data="incomePie"
                ></charts-pie>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8">
                <el-card :body-style="{ padding: '10px 0' }">
                    <div :style="{height:currentHeight}">
                        <p class="card-title"><span class="bar-icon"></span>在线设备</p>
                        <el-row type="flex" class="seamless-item-title">
                            <el-col :span="8"  justify="center" align="center">状态</el-col>
                            <el-col :span="16"  justify="center" align="center">名称</el-col>
                        </el-row>
                        <div v-show="parkState.length == 0" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)',textAlign:'center',color:'#a1a1a1' }">
                            <i class="iconfont icon-wushuju" style="font-size: 60px"></i>
                            <p>暂无数据</p>
                        </div>
                        <vue-seamless-scroll v-show="parkState.length != 0" :data="parkState" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)' }" v-if="parkState.length>0">
                            <ul>
                                <li  v-for='(item,index) in parkState' :key="index" class="seamless-item-style">
                                    <el-row type="flex">
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;line-height: 40px;vertical-align: middle;">
                                            <img :src="item.state == 1 ? baseImg.shangxian:baseImg.xiaxian" alt="" style="display: inline-block">
                                        </el-col>
                                        <el-col :span="16"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.localid}}</el-col>
                                    </el-row>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
                <charts-pie
                        charts-title="今日收费排行"
                        charts-type="bar"
                        :charts-data="rankData"
                        :charts-wrapper-height="currentHeight"
                ></charts-pie>
            </el-col>
        </el-row>

        <!--第三部分 进出车辆统计 入场车辆信息 出场车辆信息-->
        <el-row class="center-park-margin" :gutter="20">
            <el-col :xs="24" :sm="12" :md="8">
                <el-card :body-style="{ padding: '10px' }">
                    <div :style="{height:currentHeight}">
                        <p class="card-title"><span class="bar-icon"></span>进出车辆统计</p>
                        <div v-bind:style="{ overflow: 'hidden',height:'calc(100% - 30px)' }">
                            <div style="margin-bottom: 24px;margin-top: 24px">
                                <count-bar
                                        :max-val = inOutCarsCount.maxVal
                                        :current-val = inOutCarsCount.inCars
                                        count-bar-title="今日入场车辆"
                                        :img-src="baseImg.ruchang"
                                        count-bar-color="linear-gradient(-90deg,rgba(39,227,130,1),rgba(116,248,199,1))"
                                ></count-bar>
                            </div>
                            <div style="margin-bottom: 24px">
                                <count-bar
                                        :max-val = inOutCarsCount.maxVal
                                        :current-val = inOutCarsCount.outCars
                                        count-bar-title="今日离场车辆"
                                        :img-src="baseImg.chuchang"
                                        count-bar-color="linear-gradient(-90deg,rgba(255,159,15,1),rgba(251,195,116,1))"
                                ></count-bar>
                            </div>
                            <div style="margin-bottom: 24px">
                                <count-bar
                                        :max-val = inOutCarsCount.maxVal
                                        :current-val = inOutCarsCount.inPark
                                        count-bar-title="今日在场车辆"
                                        :img-src="baseImg.zaichang"
                                        count-bar-color="linear-gradient(-90deg,rgba(82,147,250,1),rgba(116,217,250,1))"
                                ></count-bar>
                            </div>

                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
                <el-card :body-style="{ padding: '10px 0' }">
                    <div :style="{height:currentHeight}">
                        <p class="card-title"><span class="bar-icon"></span>入场车辆信息</p>
                        <el-row type="flex" class="seamless-item-title">
                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                            <el-col :span="8"  justify="center" align="center">时间</el-col>
                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                        </el-row>
                        <div v-show="inPartData.length == 0" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)',textAlign:'center',color:'#a1a1a1' }">
                            <i class="iconfont icon-wushuju" style="font-size: 60px"></i>
                            <p>暂无数据</p>
                        </div>
                        <vue-seamless-scroll v-show="inPartData.length>0" :data="inPartData" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)' }" v-if="inPartData.length>0">
                            <ul>
                                <li  v-for='(item,index) in inPartData' :key="index" class="seamless-item-style">
                                    <el-row type="flex">
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.parkName}}</el-col>
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.time}}</el-col>
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.cartId}}</el-col>
                                    </el-row>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
                <el-card :body-style="{ padding: '10px 0' }">
                    <div :style="{height:currentHeight}">
                        <p class="card-title"><span class="bar-icon"></span>出场车辆信息</p>
                        <el-row type="flex" class="seamless-item-title">
                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                            <el-col :span="8"  justify="center" align="center">时间</el-col>
                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                        </el-row>
                        <div v-show="outPartData.length == 0" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)',textAlign:'center',color:'#a1a1a1' }">
                            <i class="iconfont icon-wushuju" style="font-size: 60px"></i>
                            <p>暂无数据</p>
                        </div>
                        <vue-seamless-scroll v-show="outPartData.length>0" :data="outPartData" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)' }" v-if="outPartData.length>0">
                            <ul>
                                <li  v-for='(item,index) in outPartData' :key="index" class="seamless-item-style">
                                    <el-row type="flex">
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.parkName}}</el-col>
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.time}}</el-col>
                                        <el-col :span="8"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.cartId}}</el-col>
                                    </el-row>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!--第四部分 泊位使用率 异常抬杆-->
        <el-row class="center-park-margin" :gutter="20">
            <el-col :xs="24" :sm="12" :md="12">
                <charts-pie
                        charts-title="泊位使用率"
                        charts-type="line"
                        :charts-data="berthData"
                        :charts-wrapper-height="currentHeight"
                ></charts-pie>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12">
                <el-card :body-style="{ padding: '10px 0' }">
                    <div :style="{height:currentHeight}">
                        <p class="card-title"><span class="bar-icon"></span>异常抬杆</p>
                        <el-row type="flex" class="seamless-item-title">
                            <el-col :span="6"  justify="center" align="center">通道名称</el-col>
                            <el-col :span="6"  justify="center" align="center">时间</el-col>
                            <el-col :span="6"  justify="center" align="center">收费员</el-col>
                            <el-col :span="6"  justify="center" align="center">原因</el-col>
                        </el-row>
                        <div v-show="exceptionDataPole.length == 0" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)',textAlign:'center',color:'#a1a1a1' }">
                            <i class="iconfont icon-wushuju" style="font-size: 60px"></i>
                            <p>暂无数据</p>
                        </div>
                        <vue-seamless-scroll v-show="exceptionDataPole.length>0" :data="exceptionDataPole" v-bind:style="{ overflow: 'hidden',height:'calc(100% - 60px)' }" v-if="exceptionDataPole.length>0">
                            <ul>
                                <li  v-for='(item,index) in exceptionDataPole' :key="index" class="seamless-item-style">
                                    <el-row type="flex">
                                        <el-col :span="6"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.passid}}</el-col>
                                        <el-col :span="6"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.time}}</el-col>
                                        <el-col :span="6"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.uin}}</el-col>
                                        <el-col :span="6"  justify="center" align="center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.reason}}</el-col>
                                    </el-row>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util';
    import echarts from 'echarts';
    import axios from 'axios';
    import inforCard from  '../../components/InforCard'
    import chartsPie from  '../../components/ChartsPie'
    import countBar from '../../components/CountBar'
    export default {
        components: {
            inforCard,chartsPie,countBar
        },
        data () {
            return {
                baseImg:{
                    'ruchang':require('@/assets/images/ruchang.png'),
                    'chuchang':require('@/assets/images/chuchang.png'),
                    'zaichang':require('@/assets/images/zaichang.png'),
                    'shangxian':require('@/assets/images/shangxian.png'),
                    'xiaxian':require('@/assets/images/xiaxian.png'),
                },
                chargeSummaryData:[{
                    value: 0,
                    name: '电子支付'
                },
                    {
                        value: 0,
                        name: '现金支付'
                    },
                    {
                        value: 0,
                        name: '优惠减免'
                    }], //今日收费汇总数据
                otherData:{
                    monthTotal:0, //月卡
                    parkEmpty:0,    //空车位
                    receiveTotal:0,//总收入
                    ticketCount:0,//优惠券
                    vistorCount:0,//访客
                },
                topParkChartData:[],//今日收费车场排行
                parkState: [],//车场在线状态
                inPartData: [],//入场车辆轮播
                outPartData: [],//出场车辆轮播
                berthData: [],//泊位使用率
                rankData: [],//收费排行
                exceptionData: {},//异常列表
                exceptionDataPole: [],//异常列表抬杆轮播
                incomePie: [],//今日收费构成饼图
                inOutCarsCount:{
                    inCars:0, //今日入场车辆
                    inPark:0,//今日在场车辆
                    outCars:0,//今日离场车辆
                    maxVal:0 //最大值
                },//进出车辆统计
                currentHeight:'200px',
                dataInteval:null, //定时器
            }
        },
        mounted () {
            let that = this;
            that.getDatas();
            this.dataInteval = setInterval(that.getDatas, 10000);
        },
        updated () {



        },
        computed: {


        },
        activated(){
            let that = this;
            that.getDatas();
            clearInterval(this.dataInteval);
            this.dataInteval = setInterval(that.getDatas, 10000);
        },
        deactivated(){
            clearInterval(this.dataInteval);
        },
        methods: {
            getDatas() {
                let that = this;
                //增加随机数
                var tmp = Math.random().toString();
                axios.all([axios.get(path + '/getparkinfo/bycomid?tmp='+tmp+'&comid=' + sessionStorage.getItem('comid'))])
                    .then(axios.spread(function (ret) {
                        // console.log('获取到的数据',ret)
                        if(ret.status == 200){
                            let parkAllData = ret.data;

                             /*
                             * 总收入、空车位、月卡会员、优惠券发放、访客未处理人
                             * */

                            let otherData = parkAllData.otherData;
                            that.otherData = otherData;

                             let totalIncomPie= parkAllData.totalIncomPie; //今日收费汇总
                            that.incomePie = totalIncomPie; //今日收费汇总
                            let parkState = parkAllData.parkState; //车场状态
                            that.parkState = parkState; //车场状态
                            /*
                            * parkRank 今日收费排行
                            * 信息组装成 echarts 格式数据
                            * rankData
                            * */
                            let rankData = parkAllData.parkRank; //今日收费排行
                            that.rankData = that.renkDataFormat(rankData)

                            /*
                            * 进出车辆统计
                            * 获取最大值 maxValue
                            *数据重组，获取最大值
                            * */
                            let inOutCarsCount = parkAllData.inOutCarsCount;
                            that.inOutCarsCount = that.maxValFormat(inOutCarsCount)

                            /*
                            * 入场车辆信息
                            * inPartData
                            * */
                            let inPartData = parkAllData.inPartData
                            that.inPartData = inPartData;

                            /*
                            *出场车辆信息
                            * outPartData
                            * */
                            let outPartData = parkAllData.outPartData
                            that.outPartData = outPartData;

                            /*
                            *异常抬杆列表
                            * exceptionDataPole
                            * */
                            let exceptionDataPole = parkAllData.exceptionEvents
                            that.exceptionDataPole = exceptionDataPole;

                            /*
                            * 泊位使用率
                            * berthPercentData
                            * */
                            let berthPercentData = parkAllData.berthPercentData;
                            that.berthData = that.berthDataFormat(berthPercentData)
                        }
                    }));
            },
            //格式化泊位使用率数据
            berthDataFormat(berthData){
                let rData = [];
                if(berthData.length > 0){
                    rData.value = [];
                    rData.name = [];
                    for (var i = 0; i < berthData.length; i++) {
                        rData.name.push(berthData[i].time);
                        rData.value.push(((berthData[i].percent)/100));
                    }
                }
                return rData;
            },
            //格式化今日收费排行数据
            renkDataFormat(rankData){
                let rData = [];
                if(rankData.length>0){
                    rData.value = [];
                    rData.name = [];
                    for (var i = rankData.length - 1; i >= 0; i--) {
                        rData.name.push(rankData[i].parkName);
                        rData.value.push(rankData[i].total);
                    }
                }
                return rData;
            },
            //格式化进出车辆统计数据
            maxValFormat(data){
                let arr = [data.inCars,data.inPark,data.outCars];
                arr.sort(function (a,b) {
                    return a - b;
                })
                let maxVal = 10;
                if(arr[arr.length - 1] == 0){
                    maxVal = 10;
                }else{
                    maxVal =Math.ceil((arr[arr.length - 1])*(1.2));
                }
                let obj = {
                    inCars:data.inCars,
                    inPark:data.inPark,
                    outCars:data.outCars,
                    maxVal:maxVal
                }
                // console.log('data-----',obj)
                return obj
            }
        }
    };
</script>

<style lang="scss" src="../../styles/Home.scss" scoped>



</style>
