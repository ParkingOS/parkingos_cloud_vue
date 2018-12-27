<template>
    <section class="data-screen-wrapper" :style="wrapperStyle">
        <header class="header" ref="header" :style="headerStyle">
            <span class="header-title">智慧停车指挥中心</span>
            <div class="customDigigface header-date">{{headerDate}}</div>
        </header>
        <div class="main" :style="mainStyle">
            <div class="subject">
                <!--三等分subject-->
                <el-row type="flex" justify="space-between" class="subject-main">
                    <el-col class="subject-item-left">
                        <!--左侧-->
                        <!--综合信息、入场车辆、出场车辆-->

                        <el-row type="flex" class="subject-item">
                            <!--1、综合信息-->
                            <el-col class="subject-item__common subject-item__info" :style="infoStyle">
                                <div class="info-wrapper-style">
                                    <div class="info-title">综合信息</div>
                                    <div class="info-content">
                                        <el-row :gutter="33" class="info-content__body">
                                            <el-col :span="12"  class="info-content__col">
                                                <div  class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="customDigigface info-content__item_text_top" style="color:#02CAFF">
                                                        {{otherData.parkEmpty}}
                                                    </p>
                                                    <p class="info-content__item_text_bottom">空车位（个）</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="info-content__col">
                                                <div class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="customDigigface info-content__item_text_top" style="color:#FFED74">{{otherData.monthTotal}}</p>
                                                    <p class="info-content__item_text_bottom">月卡会员（人）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="33" class="info-content__body info-content__body_bottom">
                                            <el-col :span="12"  class="info-content__col">
                                                <div  class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="customDigigface info-content__item_text_top" style="color:#ABFF74">{{otherData.ticketCount}}</p>
                                                    <p class="info-content__item_text_bottom">优惠券发放（张）</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="info-content__col">
                                                <div class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="customDigigface info-content__item_text_top" style="color:#FE7153">{{otherData.vistorCount}}</p>
                                                    <p class="info-content__item_text_bottom">访客未处理（人）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <!--入场信息-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">入场车辆</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="8"  justify="center" align="center"></el-col>
                                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="inPartData" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in inPartData' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="inParkStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.cartId}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                            <!--出场信息-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">出场车辆</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="8"  justify="center" align="center"></el-col>
                                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="outPartData" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in outPartData' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="outParkStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.cartId}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="subject-item">
                        <el-row type="flex" class="subject-item" style="height: 100%">
                            <el-col class="subject-item__income" :style="parkAllStyle">
                                <div class="subject-income">
                                    <div class="subject-income__title">车场总收入 <span class="info-title__right">单位（元）</span></div>
                                    <div class="subject-income__body">
                                        <el-row :gutter="8" justify="space-between" class="income-body__money" type="flex">
                                            <el-col class="money-list-item" v-for="(item,index) in moneyList"
                                                    :key="index">
                                                <div :style="incomeBg" class="customDigigface money-list-item__text">
                                                    <span class="item__text">{{item}}</span>
                                                </div>
                                                </el-col>
                                        </el-row>
                                        <div class="count-bar">
                                            <count-bar
                                                    type="total"
                                                    :max-val = "incomePie.all"
                                                    :current-val = "incomePie.electronics"
                                                    count-bar-title="电子支付占比"
                                                    count-bar-color="linear-gradient(270deg, #A5D4F3 0%, #6CA9E3 100%)"
                                            ></count-bar>
                                            <count-bar
                                                    type="total"
                                                    :max-val = "incomePie.all"
                                                    :current-val = "incomePie.cash"
                                                    count-bar-title="现金支付占比"
                                                    count-bar-color="linear-gradient(270deg, #FFE5A2 0%, #FEC769 100%)"
                                            ></count-bar>
                                            <count-bar
                                                    type="total"
                                                    :max-val = "incomePie.all"
                                                    :current-val = "incomePie.reduction"
                                                    count-bar-title="减免金额占比"
                                                    count-bar-color="linear-gradient(270deg, #FFA98A 0%, #FE7052 100%)"
                                            ></count-bar>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <!--泊位使用率-->
                            <el-col class="subject-item__utilization" :style="infoStyle" style="height: 33%">
                                <div class="subject-utilization">
                                    <div class="subject-utilization__title" ref="utilizationTitle">泊位使用率</div>
                                    <div class="subject-utilization__body" :style="utilizationTitleStyle">
                                        <charts-pie
                                                :is-show="false"
                                                charts-title="泊位使用率"
                                                charts-type="screenLine"
                                                :charts-data="berthData"
                                                :charts-wrapper-height="currentHeight"
                                        ></charts-pie>
                                    </div>
                                </div>
                            </el-col>
                            <!--进出车辆统计-->
                            <el-col class="subject-item__common subject-item__inout" :style="inoutParkStyle">
                                <div class="subject-inout">
                                    <div class="subject-inout__title">进出车辆统计</div>
                                    <el-row class="subject-inout__body" type="flex" justify="space-between" :style="inoutcount">
                                        <el-col class="subject-inout__body__item">
                                            <div class="customDigigface subject-inout__text__top" style="color: #57F986;">{{inOutCarsCount.inCars}}</div>
                                            <div class="subject-inout__text__bottom">入场车辆</div>
                                        </el-col>
                                        <el-col class="subject-inout__body__item">
                                            <div class="customDigigface subject-inout__text__top" style="color: #F9A957;">{{inOutCarsCount.outCars}}</div>
                                            <div class="subject-inout__text__bottom">离场车辆</div>
                                        </el-col>
                                        <el-col class="subject-inout__body__item">
                                            <div class="customDigigface subject-inout__text__top" style="color: #5782F9;">{{inOutCarsCount.inPark}}</div>
                                            <div class="subject-inout__text__bottom">在场车辆</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="subject-item-left">
                        <el-row type="flex" class="subject-item">
                            <!--今日收费排行-->
                            <el-col class="subject-item__common subject-item__utilization" :style="infoStyle">
                                <div class="subject-utilization">
                                    <div class="subject-utilization__title" ref="utilizationTitle">今日收费排行</div>
                                    <div class="subject-utilization__body" :style="utilizationTitleStyle">
                                        <charts-pie
                                                :is-show="false"
                                                charts-title="今日收费排行"
                                                charts-type="screenBar"
                                                :charts-data="rankData"
                                                :charts-wrapper-height="currentHeight"
                                        ></charts-pie>
                                    </div>
                                </div>
                            </el-col>
                            <!--在线设备-->
                            <el-col class="subject-item__common subject-item__online" :style="onlineBgStyle">
                                <div class="subject-online">
                                    <div class="subject-online__title">在线设备</div>
                                    <div class="subject-online__body">
                                        <el-row :gutter="21" class="subject-online__list">
                                            <el-col :span="8"  class="subject-online__item" v-for="item in parkStateOne">
                                                <div  class="subject-online__col__item" :style="onLine" v-if="item.state == 1">
                                                    <p class="subject-online__item_text_bottom">{{item.localid}}</p>
                                                </div>
                                                <div  class="subject-online__col__item" :style="offLine" v-else-if="item.state == 0">
                                                    <p class="subject-online__item_text_bottom">{{item.localid}}</p>
                                                </div>
                                                <div  class="subject-online__col__item" :style="notUsed" v-else>
                                                    <p class="subject-online__item_text_bottom"></p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="21" class="subject-online__list subject-online__list__margin">
                                            <el-col :span="8"  class="subject-online__item" v-for="item in parkStateTwo">
                                                <div  class="subject-online__col__item" :style="onLine" v-if="item.state == 1">
                                                    <p class="subject-online__item_text_bottom">{{item.localid}}</p>
                                                </div>
                                                <div  class="subject-online__col__item" :style="offLine" v-else-if="item.state == 0">
                                                    <p class="subject-online__item_text_bottom">{{item.localid}}</p>
                                                </div>
                                                <div  class="subject-online__col__item" :style="notUsed" v-else>
                                                    <p class="subject-online__item_text_bottom"></p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <!--抬杆原因-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">异常抬杆</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="6"  justify="center" align="center"></el-col>
                                            <el-col :span="6"  justify="center" align="center">通道</el-col>
                                            <el-col :span="6"  justify="center" align="center">收费员</el-col>
                                            <el-col :span="6"  justify="center" align="center">原因</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="exceptionDataPole" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in exceptionDataPole' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="abnormalStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.passid}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.uin}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.reason}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util';
    import echarts from 'echarts';
    import axios from 'axios';
    import countTo from 'vue-count-to';
    import countBar from '../../components/CountBar';
    import chartsPie from  '../../components/ChartsPie'
    export default {
        name: 'data_-screen',
        components: { countTo,countBar,chartsPie },
        data(){
            let that = this;
            return {
                dialogArr:[],
                bigScreen:{
                    state:1,
                    warn:3
                },
                renewalImg:require('@/assets/images/renewal.png'),
                headerDate:'',
                //数据组
                otherData:{
                    monthTotal:0, //月卡
                    parkEmpty:0,    //空车位
                    receiveTotal:0,//总收入
                    ticketCount:0,//优惠券
                    vistorCount:0,//访客
                },
                topParkChartData:[],//今日收费车场排行
                parkState: [],//车场在线状态
                parkStateOne:[],
                parkStateTwo:[],
                inPartData: [],//入场车辆轮播
                outPartData: [],//出场车辆轮播
                berthData: [],//泊位使用率
                rankData: [],//收费排行
                exceptionData: {},//异常列表
                exceptionDataPole: [],//异常列表抬杆轮播
                incomePie: {
                    electronics:0,
                    cash:0,
                    reduction:0,
                    all:0,
                },//今日收费构成饼图
                inOutCarsCount:{
                    inCars:0, //今日入场车辆
                    inPark:0,//今日在场车辆
                    outCars:0,//今日离场车辆
                },//进出车辆统计
                currentHeight:'200px',
                dataInteval:null, //定时器


                moneyList:['-','-','-','-','-','-','-','-'],
                newVal:201821,
                inPartData:[],
                incomeBg:{
                    background:'url('+require('@/assets/images/screen/incomeBg.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                inoutcount:{
                    background:'url('+require('@/assets/images/screen/inoutcount.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                onLine:{
                    background:'url('+require('@/assets/images/screen/onLine.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                offLine:{
                    background:'url('+require('@/assets/images/screen/offLine.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                notUsed:{
                    background:'url('+require('@/assets/images/screen/notUsed.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                information:require('@/assets/images/screen/information.png'),
                abnormalStyle:{
                    background:'url('+require('@/assets/images/screen/abnormal.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                outParkStyle:{
                    background:'url('+require('@/assets/images/screen/outPark.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                inParkStyle:{
                    background:'url('+require('@/assets/images/screen/inpark.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                wrapperStyle:{
                    background:'url('+require('@/assets/images/screen/screenBg.png')+'),#041535',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                headerStyle:{
                    background:'url('+require('@/assets/images/screen/headerBg.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                mainStyle:{
                    height:'790px'
                },
                parkEnteranceBodyStyle:{

                },
                utilizationTitleStyle:{

                },
                infoStyle:{
                    background:'url('+require('@/assets/images/screen/information.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                infoItemStyle:{
                    background:'url('+require('@/assets/images/screen/infoItem.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                entranceStyle:{
                    background:'url('+require('@/assets/images/screen/entrance.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                parkAllStyle:{
                    background:'url('+require('@/assets/images/screen/parkall.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                    height: '43%'
                },
                inoutParkStyle:{
                    background:'url('+require('@/assets/images/screen/inoutpark.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                },
                onlineBgStyle:{
                    background:'url('+require('@/assets/images/screen/onlineBg.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                }
            }
        },
        mounted(){
            if(this.$refs['header'].offsetHeight != undefined){
                let currentHeaderHeight = this.$refs['header'].offsetHeight;
                let parkEntranceHeaderHeight = this.$refs['parkEntranceHeader'].offsetHeight;
                let utilizationTitleHeight = this.$refs['utilizationTitle'].offsetHeight;
                this.mainStyle = {
                    height:'calc(100% - '+currentHeaderHeight+'px)'
                };
                this.parkEnteranceBodyStyle = {
                    height:'calc(100% - '+parkEntranceHeaderHeight+'px)'
                };
                this.utilizationTitleStyle = {
                    height:'calc(100% - '+utilizationTitleHeight+'px)'
                }
                window.addEventListener('resize', () => {
                    if(this.$refs['header'].offsetHeight != undefined){
                        let currentHeaderHeight = this.$refs['header'].offsetHeight;
                        let parkEntranceHeaderHeight = this.$refs['parkEntranceHeader'].offsetHeight;
                        let utilizationTitleHeight = this.$refs['utilizationTitle'].offsetHeight;
                        this.mainStyle = {
                            height:'calc(100% - '+currentHeaderHeight+'px)'
                        };
                        this.parkEnteranceBodyStyle = {
                            height:'calc(100% - '+parkEntranceHeaderHeight+'px)'
                        };
                        this.utilizationTitleStyle = {
                            height:'calc(100% - '+utilizationTitleHeight+'px)'
                        }
                    }
                });
            }
            let that = this;
            that.getDatas();
            that.getLangDate();
            this.dataInteval = setInterval(that.getDatas, 60000);
            this.openTip(this)
        },
        computed: {
            classOption () {
                return {
                    step:0.5,
                    direction: 1
                }
            }
        },
        activated(){
            let that = this;
            that.getDatas();
            clearInterval(this.dataInteval);
            this.dataInteval = setInterval(that.getDatas, 60000);

        },
        deactivated(){
            clearInterval(this.dataInteval);
        },
        methods: {
            getLangDate(){
                var dateObj = new Date(); //表示当前系统时间的Date对象
                var year = dateObj.getFullYear(); //当前系统时间的完整年份值
                var month = dateObj.getMonth()+1; //当前系统时间的月份值
                var date = dateObj.getDate(); //当前系统时间的月份中的日
                var day = dateObj.getDay(); //当前系统时间中的星期值
                var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
                var hour = dateObj.getHours(); //当前系统时间的小时值
                var minute = dateObj.getMinutes(); //当前系统时间的分钟值
               var second = dateObj.getSeconds(); //当前系统时间的秒钟值
                var timeValue = "" +((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午" ); //当前时间属于上午、晚上还是下午
                this.headerDate = this.dateFilter(year)+"-"+this.dateFilter(month)+"-"+this.dateFilter(date)+" "+" "+this.dateFilter(hour)+":"+this.dateFilter(minute)+":"+this.dateFilter(second);
                setTimeout(this.getLangDate,1000);
            },
            dateFilter(date){
                if(date < 10){
                     return "0"+date;
                }
                return date;
            },
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

                            if(that.otherData.receiveTotal){
                               that.moneyList = that.receiveTotalFormat(that.otherData.receiveTotal,that)
                            }

                            let totalIncomPie= parkAllData.totalIncomPie; //今日收费汇总
                            if(totalIncomPie.length >0){
                                that.incomePieAll(totalIncomPie,that)
                            }
                            let parkState = parkAllData.parkState; //车场状态
                            that.parkState = parkState; //车场状态
                            that.parkStateFormat(parkState,that);

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
            incomePieAll(row,that){
                that.incomePie.electronics = +row[0].value;
                that.incomePie.cash = +row[1].value;
                that.incomePie.reduction = +row[2].value;
                that.incomePie.all =  parseFloat(row[0].value) + parseFloat(row[1].value)+parseFloat(row[2].value)
            },
            //格式化在线设备
            parkStateFormat(parkState,that){
                //格式化在线设备数据格式化
                that.parkStateOne = [];
                that.parkStateTwo = [];
                if(parkState.length !=0 && parkState.length<=3){
                    for(let item in parkState){
                        that.parkStateOne.push(parkState[item])
                    }
                    if(parkState.length != 3){
                        let con = 3 -parkState.length
                        for(let i=0;i<con;i++){
                            that.parkStateOne.push({
                                state:'-1',
                                localid:''
                            })
                        }
                    }
                    for(let item in [4,5,6]){
                        that.parkStateTwo.push({
                            state:'-1',
                            localid:''
                        })
                    }
                }else if(parkState.length > 3){
                    var len = parkState.length;
                    for(let i=0;i<3;i++){
                        that.parkStateOne.push(parkState[i])
                    }
                    if(len <6){
                        for(let i=3;i<len;i++){
                            that.parkStateTwo.push(parkState[i])
                        }
                        for(let i=0;i<6-len;i++){
                            that.parkStateTwo.push({
                                state:'-1',
                                localid:''
                            })
                        }
                    }else if(len >=6){
                        for(let i=3;i<6;i++){
                            that.parkStateTwo.push(parkState[i])
                        }
                    }
                }else{
                    for(let i=0;i<3;i++){
                        that.parkStateOne.push({
                            state:'-1',
                            localid:''
                        })
                        that.parkStateTwo.push({
                            state:'-1',
                            localid:''
                        })
                    }
                }
            },
            //格式化泊位使用率数据
            berthDataFormat(berthData){
                let rData = [];
                if(berthData.length > 0){
                    rData.value = [];
                    rData.name = [];
                    for (var i = 0; i < berthData.length; i++) {
                        rData.name.push(berthData[i].time);
                        rData.value.push(((berthData[i].percent)));
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
            //格式化进出车辆统计数据补零
            maxValFormat(data){
                let arr = data;
                let obj = {
                    inCars:this.prefixInteger(arr.inCars,5,'0'),
                    inPark:this.prefixInteger(arr.inPark,5,'0'),
                    outCars:this.prefixInteger(arr.outCars,5,'0')
                }
                return obj
            },
            prefixInteger(num, length,str) {
                return (Array(length).join(str) + num).slice(-length);
            },
            roundFormat(num,point){
                if(isNaN(num)){
                    return null;
                }
                point=Math.pow(10,point+1);
                num=num*point;
                if(num===+num){
                    return parseInt((num+5)/10)/point*10;
                }else{
                    return +num;
                }
            },
            //格式化车场总收入
            receiveTotalFormat(data,that){
                let receiveTotal = that.otherData.receiveTotal;
                let receiveTotal_str = receiveTotal.toString();
                // let receiveTotal_num =parseInt(receiveTotal_str.substring(0,receiveTotal_str.indexOf('.')));
                let receiveTotal_num =Math.round(receiveTotal_str);
                let sumCount = this.prefixInteger(receiveTotal_num,8,'-');
                return sumCount;
            },
            openTip(that){
                const h = this.$createElement;
                let str = '该服务还有'+that.bigScreen.warn+'天到期,请及时续费。';
                that.dialogArr=[];
                that.dialogArr.push(
                    that.$notify({
                        title: '续费提醒',
                        duration:0,
                        position: 'bottom-right',
                        dangerouslyUseHTMLString: true,
                        message: h('div', {
                            style:{
                                textAlign:'center',
                            }
                        }, [
                            h('p', {
                                style:{
                                    height:'30px',
                                    lineHeight:'30px',
                                    fontSize:'18px'
                                }
                            }, str),
                            h('div', {
                                class:'screen-btn',
                                on:{
                                    click:this.clickFn
                                }
                            }, "我要去续费")
                        ]),
                    })
                )
            },
            clickFn(){
                alert('去续费')
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../../styles/mixin.scss";
    .data-screen-wrapper{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(4,21,53,1);
        .header{
            position: relative;
            padding: 0;
            margin: 0;
            @include scaleHeightPx(59px);
            .header-title{
                position: absolute;
                top:40%;
                left: 50%;
                transform: translate(-50%,-50%);
                color: #B3EFFF;
                text-align: center;
                font-family: PingFangSC-Medium;
                font-size: 28px;
            }
            .header-date{
                @include scalePosBottomRight(100px,3px);
                /*font-family: CustomDigigface;*/
                font-size: 18px;
                color: #28D0FD;
            }
        }
        .main{
            position: relative;
            .subject{
                position: absolute;
                top:10px;
                right: 26px;
                bottom: 10px;
                left: 26px;
                .subject-main{
                    height: 100%;
                    .subject-item-left{
                        height: 100%;
                    }
                }
                .subject-item{
                    flex-direction:column;
                    height: 100%;
                    .subject-item__common{
                        flex: 1;
                    }
                }
            }
        }
    }


    .subject-item__info{
        position: relative;
        .info-wrapper-style{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .info-title{
                @include scalePadding(19px,0,13px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .info-content{
                padding: 0 22px 0 18px;
                .info-content__body{
                    @include scaleHeightPx(60px);
                    .info-content__col{
                        height: 100%;
                        .info-content__col__item{
                            height: 100%;
                            text-align: center;
                            .info-content__item_text_top{
                                /*font-family: CustomDigigface;*/
                                @include scaleFontSize(24px);
                                color: #02CAFF;
                                height: 60%;
                                line-height: 1.5;
                            }
                            .info-content__item_text_bottom{
                                font-family: PingFangSC-Medium;
                                font-size: 12px;
                                color: #D0F5FF;
                                height: 40%;
                                line-height: 2.1;
                            }
                        }
                    }
                }
                .info-content__body_bottom{
                    @include scaleMargin(15px,0,0,0);
                }
            }

        }
    }
    .subject-item__utilization{
        position: relative;
        .subject-utilization{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-utilization__title{
                @include scalePadding(17px,0,10px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .subject-utilization__body{
                padding: 0 19px;
            }
        }
    }

    .subject-item__income{
        position: relative;
        .subject-income{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-income__title{
                @include scalePadding(19px,0,13px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
                .info-title__right{
                    float: right;
                    color: #D0F5FF;
                    margin-right: 19px;
                }
            }
            .subject-income__body{
                padding: 0 19px;
                .income-body__money{
                    @include scaleHeightPx(50px);
                    .money-list-item{
                        height: 100%;
                        .money-list-item__text{
                            position: relative;
                            /*font-family: CustomDigigface;*/
                            height: 100%;
                            text-align: center;
                            @include scaleFontSize(40px);
                            color: #ABFF74;
                            .item__text{
                                position: absolute;
                                top:50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                    }
                }
                .count-bar{
                    color: #D0F5FF;
                    @include scalePadding(10px,0,0,0);
                    @include scaleFontSize(14px);
                    .total-wrapper{
                        @include scaleMargin(0,0,2px,0);
                    }
                }
            }

        }
    }
    .subject-item__entrance{
        position: relative;
        .subject-park-entrance{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .park-entrance__title{
                position: absolute;
                top:0;
                left: 0;
                @include scalePadding(12px,0,11px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .park-entrance__header{
                @include scalePadding(19px,0,5px,0);
                @include scaleFontSize(12px);
                color: #D0F5FF;
            }
            .park-entrance__body{
                .scroll-item-style{
                    height: 30px;
                    line-height: 30px;
                    color: #D0F5FF;
                    @include scaleFontSize(12px);
                    /*font-size: 14px;*/
                    .scroll-tiem__overflow{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .inpark{
                            display:inline-block;
                            width: 10px;
                            height: 10px;
                            vertical-align: middle;
                            margin-right: 11px;
                        }
                    }
                }
            }

        }
    }

    .subject-item__inout{
        position: relative;
        .subject-inout{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-inout__title{
                @include scalePadding(8px,0,8px,27px);
                @include scaleFontSize(16px);
                @include scaleMargin(0,0,10px,0);
                color: #D0F5FF;
            }
            .subject-inout__body{
                @include scaleMargin(0,30px,0,26px);
                @include scaleHeightPx(85px);
                .subject-inout__body__item{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    .subject-inout__text__top{
                        height: 65%;
                        line-height: 2.5;
                        /*font-family: CustomDigigface;*/
                        @include scaleFontSize(27px);
                        color: #57F986;
                    }
                    .subject-inout__text__bottom{
                        height: 35%;
                        font-size: 14px;
                        color: #D0F5FF;

                    }
                }
            }
        }
    }

    .subject-item__online{
        position: relative;
        .subject-online{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-online__title{
                @include scalePadding(8px,0,8px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .subject-online__body{
                padding: 0 22px 0 18px;
                .subject-online__list{
                    @include scaleMargin(10px,0,0,0);
                    @include scaleHeightPx(60px);
                    .subject-online__item{
                        height: 100%;
                        .subject-online__col__item{
                            position: relative;
                            height: 100%;
                            text-align: center;
                            .subject-online__item_text_bottom{
                                position: absolute;
                                left: 10px;
                                right: 10px;
                                bottom:7px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                @include scaleFontSize(12px);
                                color: #D0F5FF;
                            }
                        }
                    }
                }
                .subject-online__list__margin{
                    @include scaleMargin(17px,0,0,0);
                }
            }
        }
    }
</style>