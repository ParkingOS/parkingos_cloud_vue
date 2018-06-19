<template>
    <div class="middle-control" id="middle">
        <div class="middle-title">无人化自助停车系统中控室
            <span v-show="ieShow" id="full-screen" @click="fullScreens" class="switch">
                <img   :src="imgSrc" width="100%" height="100%"/>
            </span>
        </div>
        <div style="padding: 0" class="middle-main" id="middleWrapper">
            <el-aside width="18%" style="margin-left: 1%;overflow-x:hidden;overflow-y: auto" id="left-wrapper">
                <div class="middle-console">
                    <span>监控列表</span>
                    <button class="middle-console-btn" @click="listDetail"><i class="icon iconfont el-icon-mvp-skip"></i> 详情</button>
                </div>
                <div class="video-left">
                    <div v-show="videoList.monitor1" class="minVW">
                        <button @click="videoPlay(videoList.monitor1,videoList.video1)" class="minVBtn"></button>
                        <div style="height: 100%" id="viDiv1">
                            <video id="myPlayer1" poster=""  autoplay width="100%" height="100%">
                                <source :src="videoList.video1" type="rtmp/flv" />
                                <source :src="videoList.video1" type="application/x-mpegURL" />
                            </video>
                        </div>
                    </div>
                    <div v-show="videoList.monitor2" class="minVW">
                        <button @click="videoPlay(videoList.monitor2,videoList.video2)" class="minVBtn"></button>
                        <div style="height: 100%"  id="viDiv2">
                            <video id="myPlayer2" poster=""  autoplay width="100%" height="100%">
                                <source :src="videoList.video1" type="rtmp/flv" />
                                <source :src="videoList.video1" type="application/x-mpegURL" />
                            </video>
                        </div>
                    </div>
                    <div v-show="videoList.monitor3" class="minVW">
                        <button @click="videoPlay(videoList.monitor3,videoList.video3)" class="minVBtn"></button>
                        <div style="height: 100%"  id="viDiv3">
                            <video id="myPlayer3" poster=""  autoplay width="100%" height="100%">
                                <source :src="videoList.video1" type="rtmp/flv" />
                                <source :src="videoList.video1" type="application/x-mpegURL" />
                            </video>
                        </div>
                    </div>
                    <div v-show="videoList.monitor4" class="minVW">
                        <button @click="videoPlay(videoList.monitor4,videoList.video4)" class="minVBtn"></button>
                        <div style="height: 100%"  id="viDiv4">
                            <video id="myPlayer4" poster=""  autoplay width="100%" height="100%">
                                <source :src="videoList.video1" type="rtmp/flv" />
                                <source :src="videoList.video1" type="application/x-mpegURL" />
                            </video>
                        </div>
                    </div>

                </div>
            </el-aside>
            <el-aside width="52%" style="margin: 0 1%">
                <div class="center-wrapper" style="position: relative">
                    <div style="position: relative">
                        <el-button type="info" v-show="lifting" @click="liftRod" class="lifting">抬杆</el-button>
                        <div id="maxVideo" ref="maxVideo">
                            <video id="myPlayer" autoplay preload="" width="701" height="394">
                                <source :src="videoList.video2" type="rtmp/flv" />
                                <source :src="videoList.video2" type="application/x-mpegURL" />
                            </video>
                        </div>
                    </div>
                    <div class="count-chart-wrapper" ref="countChartWrapper" id="countChartWrapper">
                        <div class="data-box" ref="posuse" style="margin-top: 0">
                            <div class="portlet-title" style="padding: 0 10px">
                                <div class="caption">
                                    <!--<i class="icon-equalizer font-blue"></i>-->
                                    <span class="caption-subject font-blue bold uppercase">泊位使用率</span>
                                </div>
                            </div>
                            <div id="placeChart"></div>
                        </div>
                    </div>
                    <div id="conss" class="con" v-show="boxVision">
                        <h3 style="padding: 0px 20px;background: #FB6E17;line-height: 40px;color: #fff">
                            <span>{{orderTitle}}</span>
                            <el-button @click="closeWrapper" type="text" style="float: right;color: #fff">关闭</el-button>
                            <div style="clear: both;height: 0;width: 0"></div>
                        </h3>
                        <div class="mate-order">
                            <el-row style="height: 100%">
                                <el-col  :span="8" v-if="stay" style="height: 100%">
                                    <h3 style="line-height: 40px;text-align: center;color: #fff">出场待确认车辆</h3>
                                    <div class="confirmed_car">
                                        <img :src="paths+'/images/monitor/'+accurate.picName" :title="accurate.car_nmber" :alt="accurate.car_nmber">
                                    </div>
                                </el-col>
                                <el-col :span="16"
                                        v-if="stay"
                                        style="height: 100%"
                                        v-loading="loading"
                                        element-loading-background="rgba(0, 0, 0, 0.8)"
                                        >

                                    <div class="undefindOrder" v-show="undefindOrder">
                                        <p>未找到车牌号相似的订单</p>
                                        <button class="btnStyle" @click="openjk" >打开监控</button><button class="btnStyle btnStyle2" @click="placeOrderError(manualData)">完成</button>
                                    </div>
                                    <div  class="alternative" v-show="!undefindOrder">
                                        <a class="alterNativeHeight" href="javascript:;" v-for="item in vague" :key="item.orderId">
                                            <img :src="paths+'/images/monitor/'+item.picName" :alt="item.carNumber" :id="item.orderId" :title="item.carNumber" @click="confirmBtn(item)">
                                        </a>
                                    </div>
                                </el-col>
                                <el-col :span="12" v-if="manuals" style="height: 100%" class="manuals-left">
                                    <div class="chu">
                                        <p>订单号:{{manualData.order_id_local}}</p>
                                        <p>入场时间:{{common.timestampToTime(manualData.create_time)}}</p>
                                        <p>车牌号:{{manualData.car_number}}</p>
                                    </div>
                                    <button @click="backComeOut">返回</button>
                                </el-col>
                                <el-col :span="12" v-if="manuals" style="height: 100%" class="manuals-right">
                                    <a href="javascript:;" class="man-car">
                                        <img :src="paths+'/images/monitor/'+manualDataUrl" :alt="manualDataUrl">
                                    </a>
                                    <button @click="placeOrder(manualData)">确定</button>
                                </el-col>
                                <el-col :span="24" v-if="results" style="height: 100%" class="resultsWrapper">
                                    <div class="chu">
                                        <img :src="paths+'/images/monitor/'+resultsData.img" :alt="manualDataUrl">
                                        <h3><br/><span>{{resultsData.message}}</span><br/><br/>车牌号:{{car_number}}</h3>
                                    </div>
                                    <button @click="closeWrapper">完成</button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-aside width="27%" id="rightW" ref="rightW">
                <div class="census-wrapper">
                    <div class="census-son census-bottom">
                        <div style="width: 100%;height:calc(100% - 6px)">
                            <div class="data-box" style="width: 100%;height: 100%; position: relative;margin-top: 0;padding: 0">
                                <div class="portlet-title" style="text-indent: 10px;">
                                    <div class="caption font-dark">
                                        <span class="caption-subject font-blue bold uppercase">今日收费汇总</span>
                                    </div>
                                </div>
                                <div class="body" style="width: 100%;position: absolute;padding: 0;top:50%;transform: translateY(-23%)">
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

                    </div>
                    <div class="census-son">
                        <div style="width: 100%;height:calc(100% - 6px)">
                            <div class="data-box" style="width: 100%;height: 100%; position: relative;margin-top: 0;padding: 0">
                                <div class="portlet-title" style="text-indent: 10px;">
                                    <div class="caption font-dark">
                                        <span class="caption-subject font-blue bold uppercase">今日进出车统计</span>
                                    </div>
                                </div>
                                <div class="body" style="width: 100%;position: absolute;padding: 0;top:50%;transform: translateY(-23%)">
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

                    </div>
                </div>
                <div class="table-wrapper">
                    <div class="portlet-title" style="padding: 0 10px">
                        <div class="caption font-red font-dark">
                            <span class="caption-subject font-red bold uppercase">待处理事件</span>
                        </div>
                    </div>
                    <el-table
                            :data="evenData"
                            border
                            :height="tableHeight"
                            style="width: 100%"
                    >
                        <el-table-column
                                label="类型"
                        >
                            <template slot-scope="scope">
                                {{classify}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="car_number"
                                label="车牌号"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="80">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" style="padding: 3px 5px;background: #36d6c3;color:#fff">查看匹配</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-aside>
        </div>
        <!--监控列表详情模态-->
        <el-dialog title="监控器管理" :visible.sync="dialogTableVisible" width="80%">
            <el-table :data="mtData.rows" border  height="350">
                <el-table-column type="index" label="索引" align="center" width="50"></el-table-column>
                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="info" @click="lookVideo(scope.row)" plain size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column property="id" label="编号" sortable align="center"></el-table-column>
                <el-table-column property="name" label="名称" sortable align="center"></el-table-column>
                <el-table-column property="channel_id" label="通道"align="center" :formatter="channelFormatter"></el-table-column>
                <el-table-column property="is_show" label="是否显示" :formatter="isShow" align="center"></el-table-column>
                <el-table-column property="show_order" label="排序" sortable align="center"></el-table-column>
                <el-table-column property="play_src" label="地址" width="300"></el-table-column>
            </el-table>
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-sizes="[1, 2, 3, 4]"-->
            <!--:page-size="pageSize"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="total">-->
            <!--</el-pagination>-->
        </el-dialog>
    </div>
</template>
<script>
    import "./assets/iconfont.css"
    // require("http://test.bolink.club/cloud/dwr/engine.js")
    // require ("http://test.bolink.club/cloud/dwr/util.js")
    // require ("http://test.bolink.club/cloud/dwr/interface/Push.js")
    // import './assets/js/ezuikit'
    import {path, orderStateType, orderPayType, parkType} from './api/api';
    import axios from 'axios';
    import echarts from 'echarts';
    import common from './common/js/common';
    import NumberRoller from './components/NumberRoller';
    import ElButton from 'element-ui/packages/button/src/button';
    export default {
        name: 'app',
        data(){
            return {
                // imgSrc:"./src/assets/off.png",
                imgSrc:require('./assets/off.png'),
                fullScreen:'开启全屏',
                stay:false,
                manuals:false,
                paths:path,
                currentPage: 1,
                tableHeight:'',
                dialogTableVisible:false,
                lifting:false,
                mtData:'',
                channelName:'',
                maxVideoW:'',//大视频的宽度
                responseData: {},//请求接口返回的数据
                berthData: {},//泊位使用率
                manualData:{},//手动选择数据
                manualDataUrl:'',  //要确认的图片路径
                event_id:'', //待确认的车辆ID,备用
                order_id:'', //待确认的订单ID
                car_number:'',
                channel_id:'',
                passname:'',
                dataInteval:'',
                resultsData:[],
                dataInitCount: 0,
                pageSize:1,
                total:0,
                orderby: 'desc',
                boxVision:false,
                results:false,
                placeChartSize: {
                    width: '1px',
                    height: '1px'
                },
                evenData:[],//事件管理
                videoList:[],//视频列表
                accurate:[], //精确查询的车辆
                vague:[],//模糊查询的车辆
                classify:'人工确认订单模糊匹配',
                orderTitle:'请手动匹配订单',
                sform:{},
                videoLists:[],
                stateOn:false,
                stateOn1:false,
                videoUrl:'',
                undefindOrder:false,
                comid:sessionStorage.getItem('comid'),
                groupid:sessionStorage.getItem('groupid'),
                loading: true,
                judge:true,
                videoChannls:null,
                keycode:true,
                ieShow:true,
                errorData:[],
            }
        },
        components: {
            ElButton,
            NumberRoller
        },
        beforeMount(){
            if(document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width){
                let h = document.body.clientHeight,w = document.body.clientWidth;
                let nowH = (w*0.52)*(9/16)
                this.tableHeight=h -nowH -5-48 -2 -60;
            }else{
                let h = document.body.clientHeight,w = document.body.clientWidth;
                let nowH = (w*0.52)*(9/16)
                this.tableHeight=h -nowH -5-48 -2;
            }


        },
        mounted(){
            var stateOff = false;
            var that = this;
            var middleWrapper = document.querySelector("#middleWrapper")
            if(document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width){
                middleWrapper.style.height = document.body.clientHeight - document.querySelector(".middle-title").clientHeight +'px'
                document.querySelector("#app").style.backgroundColor = '#393a3e';
            }else{
                middleWrapper.style.height = document.body.clientHeight +'px';
                document.querySelector("#app").style.backgroundColor = '#393a3e';
            }
            document.addEventListener("fullscreenchange", function () {
                that.judge?that.judge = false : that.judge = true;
                if (that.judge) {
                    that.imgSrc = require('./assets/off.png');
                }else{
                    that.imgSrc =  require('./assets/on.png');
                }
            }, false);

            document.addEventListener("msfullscreenchange", function () {
                that.judge?that.judge = false : that.judge = true;
                if (that.judge) {
                    that.imgSrc = require('./assets/off.png');
                }else{
                    that.imgSrc =  require('./assets/on.png');
                }
            }, false);

            document.addEventListener("mozfullscreenchange", function () {
                that.judge?that.judge = false : that.judge = true;
                if (that.judge) {
                    that.imgSrc = require('./assets/off.png');
                }else{
                    that.imgSrc =  require('./assets/on.png');
                }
            }, false);

            document.addEventListener("webkitfullscreenchange", function () {
                that.judge?that.judge = false : that.judge = true;
                if (that.judge) {
                    that.imgSrc = require('./assets/off.png');
                }else{
                    that.imgSrc =  require('./assets/on.png');
                }
            }, false);
            var isIE = !!window.ActiveXObject || "ActiveXObject"in window;
            if(isIE){
                that.ieShow = false;
            }
            document.onkeydown = function() {
                if(isIE){
                    that.ieShow = false;
                    if(window.event.keyCode==27) {
                        window.event.returnValue=false;
                        that.judge = true;
                        that.imgSrc = require('./assets/off.png');
                    }
                    if(window.event.keyCode==122){
                        if(that.keycode){
                            that.judge = false;
                            that.keycode = false;
                            that.imgSrc = require('./assets/on.png');
                        }else {
                            that.judge = true;
                            that.keycode = true;
                            that.imgSrc = require('./assets/off.png');
                        }

                    }
                }
                if(window.event.keyCode==122){
                    window.event.returnValue=false;
                    // if(that.keycode){
                    //     that.judge = false;
                    //     that.keycode = false;
                    //     that.imgSrc = require('./assets/on.png');
                    // }else {
                    //     that.judge = true;
                    //     that.keycode = true;
                    //     that.imgSrc = require('./assets/off.png');
                    // }

                }
            }

            //获取浏览器的宽度，生成宽高比例
            var clientW = document.documentElement.clientWidth,
                clientH = middleWrapper.clientHeight,
                rightW = document.querySelector("#rightW").clientHeight;
            //获取视频容器的宽度
            var maxVideoW = clientW*0.52,minVideoW = clientW*0.18;
            this.maxVideoW = maxVideoW;
            var maxVideo = document.querySelector("#maxVideo"),
                countChartWrapper = document.querySelector("#countChartWrapper");
            var minVideo = document.querySelector(".video-left"),
                leftWrapper =document.querySelector("#left-wrapper"),
                rightCount = document.querySelector(".census-wrapper"),
                tableWrapper = document.querySelector(".table-wrapper");
            //设置视频容器的宽度
            maxVideo.style.height = maxVideoW*(9/16) + 'px';
            maxVideo.style.width = maxVideoW + 'px';
            //设置图表容器的宽度
            countChartWrapper.style.width = maxVideoW + 'px';
            // this.placeChartSize.width = maxVideoW + 'px';
            // this.placeChartSize.height = this.tableHeight + 'px';
            var placeChart = document.querySelector("#placeChart");
            placeChart.style.width = maxVideoW + 'px';
            placeChart.style.height = this.tableHeight + 'px';
            //设置右侧容器的宽度
            rightCount.style.height = maxVideoW*(9/16) + 'px';
            let tableWrapperH = rightW - maxVideoW*(9/16) - 5;
            tableWrapper.style.height = tableWrapperH +"px";
            //设置小视频容器的宽度
            if(minVideo.hasChildNodes()){
                leftWrapper.style.width = minVideoW + 'px';
                for(let i=0;i< minVideo.children.length;i++){
                    minVideo.children[i].style.width = minVideoW + 'px';
                    minVideo.children[i].style.height = minVideoW*(9/16) +'px'
                }
            }
            that.getDatas();
            setTimeout(function () {
                if(that.videoList.monitor1){
                    that.reloadVideo("viDiv1","myPlayer1",that.videoList['video1'],minVideoW,minVideoW*(9/16))
                }
                if(that.videoList.monitor2){
                    that.reloadVideo("viDiv2","myPlayer2",that.videoList['video2'],minVideoW,minVideoW*(9/16))
                }
                if(that.videoList.monitor3){
                    that.reloadVideo("viDiv3","myPlayer3",that.videoList['video3'],minVideoW,minVideoW*(9/16))
                }
                if(that.videoList.monitor4){
                    that.reloadVideo("viDiv4","myPlayer4",that.videoList['video4'],minVideoW,minVideoW*(9/16))
                }
                // that.reloadVideo("maxVideo","myPlayer",that.videoList['video1'],maxVideoW,maxVideoW*(9/16))
                that.videoPlay(that.videoList['monitor1'],that.videoList['video1'])
            },1000)
            //循环刷新数据
            this.dataInteval = setInterval(that.getDatas, 10000);
            //通讯
            //启动页面ReverseAjax 功能
            dwr.engine.setActiveReverseAjax(true);
            //设置页面关闭时 通知服务端销毁对话
            dwr.engine.setNotifyServerOnPageUnload(true);
            Push.onPageLoad("statusTag");
            window.popCenterVideo=function(autoMessage) {
                var data = eval("("+autoMessage+")");
                if(data !=null && typeof(data)!='undefined'){
                    if(that.comid!='undefined'&& data.main_phone_type== 0 || that.grounp != 'undefined' && data.main_phone_type==1){
                        var src = data.play_src,vid = data.id;
                        that.videoPlay(vid,src)
                    }
                }
            }
        },
        methods: {
            killesc:function () {
                var isIE = !!window.ActiveXObject || "ActiveXObject"in window;
                if(isIE){
                    alert(123)
                    if(window.event.keyCode==27)
                    {
                        window.event.keyCode=0;
                        window.event.returnValue=false;
                    }
                }
            },
            fullScreens:function(){
                var viewFullScreen = document.getElementById("full-screen");
                if (viewFullScreen && this.judge) {
                    var docElm = document.documentElement;
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    }
                    else if (docElm.msRequestFullscreen) {
                        docElm = document.body; //overwrite the element (for IE)
                        docElm.msRequestFullscreen();
                        // alert("全屏")
                        this.judge = false;
                        this.imgSrc = require('./assets/on.png');
                    }
                    else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    }
                    else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    }
                }else{
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                        // alert("非全屏")
                        this.judge = true;
                        this.imgSrc = require('./assets/off.png');
                    }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            },
            lookVideo(row){
                if(row.play_src == ""){
                    return
                }
                var tg = '';
                this.dialogTableVisible = false;
                for(let item in this.videoLists){
                    if(row.play_src == this.videoList[this.videoLists[item].video]){
                        tg = this.videoList[this.videoLists[item].monitor]
                    }
                }
                this.videoPlay(tg,row.play_src)
            },
            channelFormatter(row){
                for(var i in this.channelName){
                    if(row.channel_id == this.channelName[i].value_no){
                        return this.channelName[i].value_name
                    }
                }
            },
            isShow(row){
                switch (row.is_show){
                    case 0:
                        return "隐藏"
                        break;
                    case 1:
                        return "显示"
                        break;
                }
            },
            listDetail(){
                this.dialogTableVisible = true;
                var that = this;
                that.sform.comid = sessionStorage.getItem('comid');
                that.sform.groupid = sessionStorage.getItem('groupid');
                that.sform.rp = that.pageSize;
                that.sform.page = that.currentPage;
                that.sform.orderby = that.orderby;
                axios.all([axios.post(path +'/EQ_monitor/query', that.$qs.stringify(that.sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }),axios.get(path +'/getdata/getChannelType',{
                    params:{
                        'comid' : encodeURI(sessionStorage.getItem('comid')),
                        'groupid':sessionStorage.getItem('groupid'),
                        // 'comid':21840
                    },
                })])
                    .then(axios.spread(function (result,res) {
                        console.log(result,res)
                        that.mtData = result.data;
                        that.total =  result.data.total;
                        that.channelName = res.data;
                    }))
            },
            liftRod(){
                var that = this;
                axios.all([axios.get(path + '/centermonitor/liftrod',{
                    params:{
                        'action':'liftRod',
                        'channel_name':encodeURI(that.channel_name),
                        'channel_id':encodeURI(that.channel_id),
                        'comid' : encodeURI(sessionStorage.getItem('comid')),
                        groupid:sessionStorage.getItem('groupid')

                    },
                })])
                    .then(axios.spread(function (result) {
                        console.log(result);
                        alert(result.data.message)
                    }))
            },
            reloadVideo(divId,videoId,src,width,height){
                var dID = document.querySelector("#"+divId),str='';
                dID.innerHTML = "";
                str = "<video id='"+videoId+"' poster='' autoplay='autoplay' playsInline webkit-playsinline width='"+width+"' height='"+height+"'><source src='"+src+"' type='   '/></video>"
                dID.innerHTML = str;
                var rplayer = new EZUIPlayer(videoId);
            },
            videoPlay(monitor_id,src){
                console.log("有没有值",monitor_id)
                var that = this;
                this.reloadVideo("maxVideo","myPlayer",src,this.maxVideoW,this.maxVideoW*(9/16))
                axios.all([axios.get(path + '/centermonitor/querychannel',{
                    params:{
                        monitor_id:monitor_id
                    },
                })])
                    .then(axios.spread(function (result) {
                        console.log("是不是空",result)
                        //是否显示抬杆按钮
                        if(result.data==null){
                            that.lifting = false;
                        }else{
                            that.lifting = true;
                            that.passname = result.data.passname;
                            that.channel_id = result.data.channel_id;
                        }
                    }))
            },
            closeWrapper(){
                this.boxVision = false;
                this.stay = true;
                this.manuals = false;
                this.results = false;
                this.orderTitle = '请手动匹配订单'
            },
            openjk(){

                // this.videoPlay(tg,row.play_src)
                var that = this;
                that.sform.comid = sessionStorage.getItem('comid');
                that.sform.groupid = sessionStorage.getItem('groupid');
                that.sform.orderby = that.orderby;
                if(that.videoChannls == null){
                axios.all([axios.post(path +'/EQ_monitor/query', that.$qs.stringify(that.sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                })])
                    .then(axios.spread(function (result) {
                        that.videoChannls = result.data.rows
                        for(var i in that.videoChannls){
                            if(that.videoChannls[i]["channel_id"] ==  that.channel_id){
                                that.lookVideo(that.videoChannls[i])
                            }

                        }
                    }))

                }else{
                    for(var i in that.videoChannls){
                        if(that.videoChannls[i]["channel_id"] ==  that.channel_id){
                            that.lookVideo(that.videoChannls[i])
                        }

                    }
                }
            },
            placeOrderError(){
                var _that = this;
                var tmp = Math.random().toString();
                axios.all([axios.get(path + '/centermonitor/balanceorderinfo',{
                    params:{
                        tmp:tmp,
                        'order_id': '',
                        'action':'balanceOrderInfo',
                        'car_number':encodeURI(_that.errorData.car_number),
                        'event_id':encodeURI(_that.errorData.event_id),
                        'channel_id':encodeURI(_that.errorData.channel_id),
                        'comid' : encodeURI(sessionStorage.getItem('comid')),
                        'groupid':sessionStorage.getItem('groupid')
                    },
                })])
                    .then(axios.spread(function (ret) {
                        if(ret.data.succsess == "0"){
                            alert("处理失败")
                            _that.closeWrapper()
                        }else{
                            alert("处理成功")
                            _that.closeWrapper()
                            _that.getDatas()
                        }
                    }))

                // var _that = this;
                // var tmp = Math.random().toString();
                // axios.all([axios.get(path + '/centermonitor/balanceorderinfo',{
                //     params:{
                //         'action':'updateConfirmStatus',
                //         'id':_that.event_id
                //     },
                // })])
                //     .then(axios.spread(function (ret) {
                //         if(ret.data.succsess == '0'){
                //                 alert("处理失败")
                //                 _that.closeWrapper()
                //         }else{
                //             _that.closeWrapper()
                //             _that.getDatas()
                //         }
                //
                //
                //     }))
            },
            placeOrder(manualData){
                this.car_number = manualData.car_number;
                var _that = this;
                var tmp = Math.random().toString();
                axios.all([axios.get(path + '/centermonitor/balanceorderinfo',{
                    params:{
                        tmp:tmp,
                        'order_id': _that.order_id ,
                        'action':'balanceOrderInfo',
                        'car_number':encodeURI(_that.car_number),
                        'event_id':encodeURI(_that.event_id),
                        'channel_id':encodeURI(_that.channel_id),
                        'comid' : encodeURI(sessionStorage.getItem('comid')),
                        'groupid':sessionStorage.getItem('groupid')
                    },
                })])
                    .then(axios.spread(function (ret) {
                        if(ret.data.succsess == "1"){
                            _that.getDatas()
                        }
                        _that.resultsData = ret.data;
                        _that.orderTitle = _that.resultsData.message;
                        _that.manuals = false;
                        _that.stay = false;
                        _that.results = true;
                    }))
            },
            backComeOut(){
                this.manuals = false;
                this.stay = true;
                this.orderTitle = '请手动匹配订单';
            },
            confirmBtn(item){
                this.orderTitle = '请手动确认订单'
                this.order_id = item.orderId;
                this.manualDataUrl = item.picName;
                var _that = this;
                var tmp = Math.random().toString();
                axios.all([axios.get(path + '/centermonitor/queryselectorder',{
                    params:{
                        tmp:tmp,
                        action: 'querySelectOrder',
                        order_id:encodeURI(item.orderId) ,
                        car_number:encodeURI(item.carNumber),
                        comid:sessionStorage.getItem('comid'),
                        groupid:sessionStorage.getItem('groupid')
                    },
                })])
                    .then(axios.spread(function (ret) {
                        _that.manuals = true;
                        _that.stay = false;
                        _that.manualData = ret.data
                    }))
            },
            //查看匹配
            handleClick(row){
                this.loading = true;
                this.errorData = row;
                //转存通道号
                this.channel_id = row.channel_id;
                //转存当前车辆的id
                this.event_id = row.event_id;
                var _that = this;
                var tmp = Math.random().toString();
                // axios.all([axios.get(path + '/centermonitor/getConfirmorder?tmp='+tmp+'&action=getConfirmOrder&event_id='+row.event_id+'&car_number='+row.car_number+'&comid=' + sessionStorage.getItem('comid'))])
                axios.all([axios.get(path + '/centermonitor/getConfirmorder',{
                    params:{
                        tmp:tmp,
                        action: 'getConfirmOrder',
                        event_id:encodeURI(row.event_id) ,
                        car_number:encodeURI(row.car_number),
                        comid:sessionStorage.getItem('comid'),
                        groupid:sessionStorage.getItem('groupid')
                    },
                }),axios.get(path+'/centermonitor/matchconfirmorder',{
                    params:{
                        tmp:tmp,
                        action: 'matchConfirmOrder',
                        event_id:encodeURI(row.event_id),
                        car_number:encodeURI(row.car_number),
                        comid:sessionStorage.getItem('comid'),
                        groupid:sessionStorage.getItem('groupid')
                    },
                })])
                    .then(axios.spread(function (accurate,vague) {
                        _that.loading = false;
                        _that.accurate = accurate.data;
                        _that.vague = vague.data;
                        console.log("oder_id",_that.vague)
                        if(_that.vague.length<=0){
                            _that.undefindOrder = true;
                        }else{
                            _that.undefindOrder = false;
                        }
                    }))

                var countH = document.querySelector("#countChartWrapper").clientHeight;
                var con = document.querySelector("#conss");
                con.style.height = countH +'px'
                this.boxVision = true;
                this.stay = true;
                this.manuals = false;
                this.results = false;
                this.orderTitle = '请手动匹配订单'
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val
                console.log(`当前页: ${val}`);
            },
            getDatas() {
                let _this = this;
                //增加随机数
                var tmp = Math.random().toString();
                axios.all([axios.get(path + '/centermonitor/centermonitordata?tmp='+tmp+'&comid=' + sessionStorage.getItem('comid')+'&groupid=' + sessionStorage.getItem('groupid'))])
                    .then(axios.spread(function (ret) {
                        _this.responseData = ret.data;
                        _this.getPlaceData(_this.responseData.berthPercentData);
                        //绑定视频列表
                        _this.videoList = _this.responseData.videoMap;
                        // 重新组装视频数据
                        var monitorArr = [],videoArr = [],videoLists=[];
                        for(var i in _this.videoList){
                            if(i.indexOf('monitor')>=0){
                                monitorArr.push(i)
                            }else{
                                videoArr.push(i)
                            }
                        }
                        if(monitorArr != [] && videoArr !=[]){
                            for(var i=0;i<monitorArr.length;i++){
                                for(var j=0;j<videoArr.length;j++){
                                    if(monitorArr[i].substr(monitorArr[i].length -1,1) ==videoArr[j].substr(videoArr[j].length -1,1)){
                                        var obj ={};
                                        obj.monitor = monitorArr[i];
                                        obj.video = videoArr[j];
                                        _this.videoLists.push(Object.assign(obj))
                                    }
                                }
                            }
                        }
                        //绑定表格数据
                        _this.evenData = _this.responseData.confirmOrders;

                        //需要数据初始化以后再初始化图表。否则会绘制失败
                        _this.initChart();

                        //数字滚动的部分
                        _this.$refs['roll_cashpay'].init(_this.responseData.totalIncome.cashPay);
                        _this.$refs['roll_elepay'].init(_this.responseData.totalIncome.elePay);
                        _this.$refs['roll_reduce'].init(_this.responseData.totalIncome.freePay);
                        _this.$refs['roll_incar'].init(_this.responseData.inOutCarsCount.inCars);
                        _this.$refs['roll_outcar'].init(_this.responseData.inOutCarsCount.outCars);
                        _this.$refs['roll_inpark'].init(_this.responseData.inOutCarsCount.inPark);
                    }));

            },
            initChart: function () {
                //收费车场排行
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
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{c}'
                                }
                            }
                        }
                    }]
                },true);

            },
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

        },
        activated(){

        },
        watch:{
            stateOn(val) {
                this.stateOn = val
               // this.resizeData()
            },
            videoUrl(val){
                console.log(val)
            }
        }
    }

</script>

<style lang="scss">

    html,body{
        height: 100%;
    }
    body {
        margin: 0px;
        padding: 0px;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        /*background-color: #393a3e;*/
    }
    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }
    .middle-footer{
        display: flex;
    }
    .middle-control{
        width: 100%;
        background-color: #393a3e;
    }
    .middle{
        width: 100%;
        background-color: #393a3e;
        height: 100%;
    }
    .middle-title{
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        color:#fff;
    }
    .middle-main{
        display: flex;
        background-color: #393a3e;
    }
    .middle-console{
        display: block;
        background: #fff;
        /*height: 80px;*/
        padding: 20px;
        span{
            font-size: 16px;
            text-indent: 20px;
            line-height: 25px;
            color: #3598dc;
        }
    }
    .middle-console-btn{
        float: right;
        cursor: pointer;
        display: inline-block;
        border-radius: 13px;
        border:1px solid #3598dc;
        /*border-color: #3598dc;*/
        color: #3598dc;
        background: none;
        padding: 4px 10px;
        font-size: 13px;
        line-height: 1.5;
        outline: none;
        box-shadow: none;
        &:hover{
            border-color: #3598dc;
            color: #FFFFFF;
            background-color: #3598dc;
        }
    }
    .video-left{
        margin-right: 2px;
        height: calc(100% - 65px);
        overflow-y: auto;
        overflow-x: hidden;
        div{
            margin-bottom: 5px;
        }
        div:first-child{
            margin-top: 2px;
        }
        div:last-child{
            margin: 0;
        }
    }
    .census-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        .census-son{
            flex: 1;
            background: #fff;
        }
        .census-bottom{
            margin-bottom: 5px;
        }
    }
    .table-wrapper{
        width: 100%;
        background: #fff;
        margin-top: 5px;
    }
    .center-wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }
    .count-chart-wrapper{
        flex:1;
        margin-top: 5px;
        background: #fff;
    }



    .statistics-right{
        margin-left: 2px;
        height: 100%;
        display: flex;
        flex-direction: column;
        .stat-right-slast{
            flex: 1;
        }
        .stat-right-son:last-child{
            margin: 0;
        }
    }
    .stat-right-son{
        flex: 1;
        margin-bottom: 5px;
        background: #fff;
    }
    .video-center{
        height: 100%;
        display: flex;
        flex-direction: column;
        div{
            background: #fff;
        }
    }
    .portlet {
        margin-top: 0px;
        margin-bottom: 0px !important;
        padding: 0px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -ms-border-radius: 4px;
        -o-border-radius: 4px;
        border-radius: 4px;
    }
    .portlet-title{
        min-height: 48px;
        line-height: 48px;
        background: #fff;
    }
    .portlet.light {
        padding: 12px 20px 15px 20px;
        background-color: #fff;
    }
    .portlet.light.bordered {
        /*border: 1px solid #e7ecf1 !important;*/
    }
    .portlet.light .portlet-body {
        padding-top: 8px;
        clear: both;
    }
    .font-blue {
        color: #3598dc !important;
    }
    .font-red {
        color: #e7505a !important;
    }
    .appOrderTotalFont {
        height: 50%;
        width: 8%;
        margin-left: 2%;
        margin-top: 5%;
        text-align: center;
        font-size: 35px;
        color: black;
        float: left;
        display: table;
    }
    .appOrderFont {
        width: 11.5%;
        padding: 5px 0;
        margin-left: 2%;
        margin-top: 5%;
        background-color: #393a3e !important;
        text-align: center;
        font-size: 35px;
        color: white;
        float: left;
        display: table;
    }
    .centerContent {
        vertical-align: middle;
        display: table-cell;
    }
    .con{
        position: absolute;
        bottom:0;
        left: 0;
        width: 100%;
        height: 262px;
        background-color: rgb(57, 58, 62);
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .mate-order{
        height: calc(100% - 40px);
    }
    .confirmed_car{
        height: calc(100% - 40px);
        padding: 0 10px 10px 10px;
        text-align: center;
        img{
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .alternative{
        padding: 10px;
        height: 100%;
        text-align: center;
        overflow-x: hidden;
        overflow-y: auto;
        a{
            display: inline-block;
            float: left;
            width: 48%;
            height:130px;
            margin-left: 2%;
            margin-bottom: 2%;
        }
        img{
            width:100%;
            height:100%;
            /*max-width: 100%;*/
            /*max-height: 100%;*/
        }
    }

    .manuals-left{
        padding: 2% 5%;
        .chu{
            height: calc(100% - 40px);
            p{
                font-size: 18px;
                line-height: 50px;
                color: #fff;
            }
        }

        button{
            width: 80%;
            display:inline-block;
            text-align: center;
            line-height: 30px;
            color: #fff;
            border:none;
            outline: none;
            background-color: #F59A55;
            cursor: pointer;
            margin-top: 10px;
        }
    }
    .undefindOrder{
        text-align: center;
        color: #fff;
        /*line-height: 150px;*/
        font-size: 18px;
        p{
            line-height: 150px;
        }
    }
    .manuals-right{
        padding: 2% 5%;
        .man-car{
            display: block;
            text-align: center;
            height: calc(100% - 40px);
            img{
                display: inline-block;
                max-width: 100%;
                max-height: 100%;
            }
        }

        button{
            width: 80%;
            display:inline-block;
            text-align: center;
            line-height: 30px;
            color: #fff;
            border:none;
            outline: none;
            background-color: #F59A55;
            cursor: pointer;
            margin-top: 10px;
        }
    }
    .resultsWrapper{
        padding: 2% 5%;
        .chu{
            display: block;
            text-align: center;
            height: calc(100% - 40px);
            img{
                display: inline-block;
                vertical-align: top;
                max-width: 100%;
                max-height: 100%;
            }
            h3{
                display: inline-block;
                font-size: 18px;
                color:#fff;
                span{
                    font-size: 30px;
                }
            }
        }

        button{
            width: 100%;
            display:inline-block;
            text-align: center;
            line-height: 30px;
            color: #fff;
            border:none;
            outline: none;
            background-color: #F59A55;
            cursor: pointer;
            margin-top: 10px;
        }
    }
    .minVW{
        position: relative;
        .minVBtn{
            position: absolute;
            background: transparent;
            border: none;
            outline: 1px solid #0d638f;
            top:0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
    .lifting{
        position: absolute;
        bottom: 100px;
        right: 30px;
        z-index: 99;
    }
    .switch{
        display: inline-block;
        float: right;
        margin-right: 50px;
        margin-top: 10px;
        cursor: pointer;
        width: 30px;
        height: 30px;
    }
    .btnStyle{
        width: 30%;
        display:inline-block;
        text-align: center;
        line-height: 30px;
        color: #fff;
        border:none;
        outline: none;
        background-color: #F59A55;
        cursor: pointer;
        margin-top: 10px;
    }
    .btnStyle2{
        margin-left: 20px;
        background: #0c91e5;
    }
</style>
