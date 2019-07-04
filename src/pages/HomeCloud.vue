<template>
    <el-row class="container">
        <div class="mian-header" style="border-bottom: 1px solid #ebeef5;">
            <div class="logo">
                <div class="logo-one">
                    <img :src="logo1">
                </div>
                <div class="logo-two">
                    <img :src="logo2">
                </div>
            </div>
            <div class="console">
                <div class="img-box"><img src="../assets/images/login-user.png"></div>
                <div class="username">{{nickname}}:{{sysUserName}}</div>
                <div class="outlogin" @click="isoutloginVisible">退出</div>
            </div>
        </div>

        <el-col :span="24" class="main">
            <aside :class="isCollapse?'scroll-hidden menu-collapsed':'scroll-hidden menu-expanded'">
                <!--<el-button v-show="!isCollapse" @click="isCollapse = !isCollapse"-->
                           <!--class="menu-expan-button menu-expan-button2 menu-open-color">-->
                    <!--<i class="iconfont icon-fanxiangmulujiantou"></i>-->
                <!--</el-button>-->
                <!--<el-button v-show="isCollapse" @click="isCollapse = !isCollapse" class="menu-expan-button menu-open-color">-->
                    <!--<i class="iconfont icon-mulujiantou"></i>-->
                <!--</el-button>-->

                <!--text-color="#fff" active-text-color="#109EFF"-->
                <!--应用element内置自定义滚动条-->
                <el-scrollbar :native="true">
                    <div :style="{height: currentHeight}">
                        <el-menu class="el-menu-vertical-demo" @open="handleopen"
                         @close="handleclose"
                         @select="handleselect"
                         unique-opened
                         text-color="#fff"
                         active-text-color="#64C0FF"
                         :default-active="highlightindex"
                         :collapse="isCollapse">

                    <el-submenu v-if="this.showParkItem.data_Center_park" index="/data">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-shujuzhongxin"></i>
                            <span class="menuitem">数据中心</span></template>
                        <el-menu-item index="/data_Center_park" v-if="this.showParkItem.data_Center_park">数据中心
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.orderManage" index="/orderManage">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-dingdanguanli"></i>
                            <span class="menuitem">订单管理</span></template>
                        <el-menu-item index="/orderManage_Orders" v-if="this.showParkItem.orderManage_Orders">订单记录
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Poles" v-if="this.showParkItem.orderManage_Poles">抬杆记录
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Income" v-if="this.showParkItem.orderManage_Income">交易记录
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Expense" v-if="this.showParkItem.orderManage_Expense">支出记录
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Abnormal" v-if="this.showParkItem.orderManage_Abnormal">异常订单
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Record" v-if="this.showParkItem.orderManage_Record">减免记录
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.monthMember" index="/monthMember">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-yueqiahuiyuan"></i>
                            <span class="menuitem">会员管理</span></template>
                        <el-menu-item index="/monthMember_VIP" v-if="this.showParkItem.monthMember_VIP">月卡会员
                        </el-menu-item>
                        <el-menu-item index="/monthMember_Refill" v-if="this.showParkItem.monthMember_Refill">月卡续费记录
                        </el-menu-item>
                        <el-menu-item index="/prepay_card" v-if="this.showParkItem.prepay_card">储值卡会员
                        </el-menu-item>
                        <el-menu-item index="/prepay_card_trade" v-if="this.showParkItem.prepay_card_trade">储值卡充值记录
                        </el-menu-item>
                        <el-menu-item index="/prepay_card_use" v-if="this.showParkItem.prepay_card_use">储值卡使用记录
                        </el-menu-item>
                        <el-menu-item index="/park_white_list" v-if="this.showParkItem.park_white_list">白名单管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.vistorManage" index="/vistorManage">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-fangkeguanli"></i>
                            <span class="menuitem">访客管理</span></template>
                        <el-menu-item index="/vistorManage_VistorMember" v-if="this.showParkItem.vistorManage_VistorMember">访客人员管理
                        </el-menu-item>
                        <el-menu-item index="/vistorManage_homeOwner" v-if="this.showParkItem.vistorManage_homeOwner">业主管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.orderStatistics" index="/orderStatistics">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-shujufenxi"></i>
                            <span class="menuitem">统计分析</span></template>

                        <el-menu-item index="/orderStatistics_CollectorReport"
                                  v-if="this.showParkItem.orderStatistics_CollectorReport">收费员日报
                        </el-menu-item>
                        <el-menu-item index="/orderStatistics_DailyReport"
                                  v-if="this.showParkItem.orderStatistics_DailyReport">车场日报
                        </el-menu-item>

                        <el-menu-item index="/orderStatistics_MonthReport"
                                      v-if="this.showParkItem.orderStatistics_MonthReport">车场月报
                        </el-menu-item>
                        <el-menu-item index="/systemManage_Commute" v-if="this.showParkItem.systemManage_Commute">
                            上下班记录
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.shopManage" index="/shopManage">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-shanghuguanli"></i>
                            <span class="menuitem">商户管理</span></template>
                        <el-menu-item index="/shopManage_Shop" v-if="this.showParkItem.shopManage_Shop">商户管理
                        </el-menu-item>
                        <el-menu-item index="/shopManage_QueryAccount"
                                      v-if="this.showParkItem.shopManage_QueryAccount">
                            流水查询
                        </el-menu-item>
                        <el-menu-item index="/shopManage_Coupon" v-if="this.showParkItem.shopManage_Coupon">优惠券管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.employeePermission" index="/employeePermission">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-yuangongguanli"></i>
                            <span class="menuitem">员工权限</span></template>
                        <el-menu-item index="/employeePermission_Role"
                                      v-if="this.showParkItem.employeePermission_Role">
                            角色管理
                        </el-menu-item>
                        <el-menu-item index="/employeePermission_Manage"
                                      v-if="this.showParkItem.employeePermission_Manage">
                            员工管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="/system_addedService" v-if="this.showParkItem.systemManage_AddedService">
                                <template slot="title">
                                    <i class="el-icon-star-off" style="width: 20px;font-size: 20px;margin-right: 0"></i>
                                    <span class="menuitem">增值服务</span></template>
                                <el-menu-item index="/systemManage_AddedService_Sms" v-if="this.showParkItem.systemManage_AddedService_Sms">短信服务</el-menu-item>
                                <el-menu-item index="/systemManage_AddedService_Screen" v-if="this.showParkItem.systemManage_AddedService_Screen">数据大屏</el-menu-item>
                                <el-menu-item index="/systemManage_AddServices_Public" v-if="this.showParkItem.systemManage_AddServices_Public">商户公众号</el-menu-item>
                                <el-menu-item index="/systemManage_AddServices_Program" v-if="this.showParkItem.systemManage_AddServices_Program">小程序收费</el-menu-item>
                            </el-submenu>
                    <el-submenu index="/systemManage" v-if="this.showParkItem.systemManage"
                                style="font-weight: normal;padding-bottom: 30px">
                        <template slot="title">
                            <i class="menu-icon iconfont icon-xitongguanli"></i>
                            <span class="menuitem">系统管理</span></template>
                        <el-submenu index="/equipmentManage" v-if="this.showParkItem.equipmentManage">
                            <template slot="title">
                                <!--<i class="menu-icon iconfont icon-shebeiguanli"></i>-->
                                <span class="menuitem" style="font-size: 14px">设备管理</span></template>
                            <el-menu-item index="/equipmentManage_Watchhouse"
                                          v-if="this.showParkItem.equipmentManage_Watchhouse">
                                岗亭管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Monitor"
                                          v-if="this.showParkItem.equipmentManage_Monitor">
                                监控管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Intercom"
                                          v-if="this.showParkItem.equipmentManage_Intercom">对讲管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_WorkStation"
                                          v-if="this.showParkItem.equipmentManage_WorkStation">
                                工作站管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Channel"
                                          v-if="this.showParkItem.equipmentManage_Channel">
                                通道管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Camera"
                                          v-if="this.showParkItem.equipmentManage_Camera">
                                摄像头管理
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_LED" v-if="this.showParkItem.equipmentManage_LED">
                                LED屏管理
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="/systemManage_BlackList"
                                      v-if="this.showParkItem.systemManage_BlackList">
                            黑名单管理
                        </el-menu-item>

                        <el-menu-item index="/systemManage_Account" v-if="this.showParkItem.systemManage_Account">
                            账户管理
                        </el-menu-item>
                        <el-menu-item index="/systemManage_Params" v-if="this.showParkItem.systemManage_Params">参数设置
                        </el-menu-item>
                        <el-menu-item index="/systemManage_FreeReason"
                                      v-if="this.showParkItem.systemManage_FreeReason">
                            免费原因
                        </el-menu-item>
                        <el-submenu index="/system_cartype" v-if="this.showParkItem.systemManage_CarManage">
                            <template slot="title"><span class="menuitem" style="font-size: 14px;">车型管理</span>
                            </template>
                            <el-menu-item index="/systemManage_CarManage_CarType"
                                          v-if="this.showParkItem.systemManage_CarManage_CarType">车型设定
                            </el-menu-item>
                            <el-menu-item index="/systemManage_CarManage_BindType"
                                          v-if="this.showParkItem.systemManage_CarManage_BindType">绑定车型
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="/systemManage_Price" v-if="this.showParkItem.systemManage_Price">时租价格管理
                        </el-menu-item>

                        <el-menu-item index="/systemManage_MonthCard"
                                      v-if="this.showParkItem.systemManage_MonthCard">
                            月卡套餐管理
                        </el-menu-item>
                        <el-menu-item index="/systemManage_Logs" v-if="this.showParkItem.systemManage_Logs">系统日志</el-menu-item>
                        <el-menu-item index="/monitorApp" v-if="this.showParkItem.centerMonitor||this.showUnionItem.centerMonitor">中央监控</el-menu-item>
                    </el-submenu>

                </el-menu>
                    </div>
                </el-scrollbar>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <!--<el-col :span="24" class="content-wrapper">-->
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    <!--</el-col>-->
                </div>
                <!--退出提示-->
                <el-dialog
                        width="478px"
                        :visible.sync="outloginVisible"
                        :show-close="false"
                        custom-class="custom-dialog deleteTip">

                    <header class="dialog-header" slot="title">
                        提示<i class="el-icon-close dialog-header-iconfont" @click="outloginVisible = false"></i>
                    </header>
                    <div class="dialog-body" style="height: 40px;line-height: 40px;text-align: center;font-size: 16px">
                        <p>真的要退出吗?</p>
                    </div>
                    <footer slot="footer" class="dialog-footer">
                        <el-button type="primary" class="dialog-footer-btn" @click="logout" >确 定</el-button>
                        <el-button @click="outloginVisible = false" class="dialog-footer-btn" style="margin-left: 36px">取 消</el-button>
                    </footer>
                </el-dialog>
            </section>
        </el-col>

    </el-row>
</template>



<script>
    import common from '../common/js/common';
    import {AUTH_ID, showParkItem_const, AUTH_ID_UNION, showUnionItem_const, ROLE_ID} from '../common/js/const';
    import {path,server, orderStateType, orderPayType, parkType} from '../api/api';
    export default {
        data() {
            return {
                logo1:'',
                logo2:'',
                outloginVisible:false,
                isCollapse: false,
                activeIndex: '/loginCloud',
                active: '',
                bolink: false,
                park: false,
                union: false,
                ccccccc: false,
                city:false,
                admin:false,
                platform: false,
                left: true,
                right: false,
                sysName: '联盟管理后台',
                server: '',
                collapsed: false,
                sysUserName: '',
                nickname: '',
                user: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                secureVisible: false,
                //根据权限控制页面是否显示
                showParkItem: sessionStorage.getItem('showParkItem') == null ? showParkItem_const : JSON.parse(sessionStorage.getItem('showParkItem')),
                showUnionItem: sessionStorage.getItem('showUnionItem') == null ? showUnionItem_const : JSON.parse(sessionStorage.getItem('showUnionItem')),
                expandindex: '',   //'/order',//展开的sub_menu
                highlightindex: sessionStorage.getItem('highlightindex'),//'/orderManage_Poles',//高亮的item
                currentHeight:'500px'
            };
        },
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            selectTop(a, b) {
                //console.log(a)
                //console.log(b)
                console.log(this.active);
                this.active = a;
                this.$router.push(a);
                console.log(this.active);
            },
            handleselect: function (a, b) {
                // console.log(this.active)
                // console.log(a)
                // console.log(b)
                // console.log(this.$router)
                if (a == 'centerMonitor') {
                    let routetocm = 'http://yun.bolink.club/tcbcloud/monitor.do?loginuin=' + sessionStorage.getItem('loginuin');
                    let comid = sessionStorage.getItem('comid');
                    let groupid = sessionStorage.getItem('groupid');
                    if (comid != '' && comid != 'undefined') {
                        console.log(comid);
                        routetocm = routetocm + '&comid=' + comid;
                    }
                    if (groupid != '' && groupid != 'undefined') {
                        console.log(groupid);
                        routetocm = routetocm + '&groupid=' + groupid;
                    }
                    console.log(routetocm);
                    window.open(routetocm);
                    return;
                }
                // alert(a)
                if(a == '/monitorApp'){
                    let routeData = this.$router.resolve({
                        name: "自定义监控",
                    });
                    window.open(routeData.href, '_blank');
                    return;
                }
                var cpath = this.$router.currentRoute.fullPath;

                //console.log(cpath)
                var options = this.$router.options.routes;
                this.highlightindex = a;
                this.expandindex = a.split('_')[0];
                // console.log('>>>' + a)
                // console.log('>>>' + a.split('_')[0])
                this.$router.push(a);
            },
            isoutloginVisible(){
                this.outloginVisible = true;
            },
            //退出登录
            logout: function () {
                var _this = this;
                let user = sessionStorage.getItem('user');
                let u = JSON.parse(user);
                let logoutParams = {userid: u.userid, token: sessionStorage.getItem('token')};
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                localStorage.removeItem('comid');
                localStorage.removeItem('groupid');
                _this.$router.push('/login');
            },

        },
        mounted() {
            let vm = this;
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                var maxLength1 = user.nickname.length;//管理员名称
                var maxLength2 = user.name.length;
                this.sysUserName = maxLength1>10?user.nickname.slice(0,10)+'...':user.nickname;
                this.nickname = maxLength2>20?user.name.slice(0,20)+'...':user.name;
                var cpath = this.$router.currentRoute.fullPath;
                if(cpath.indexOf('orderManage_OrderDetail') > -1 ){
                    this.highlightindex ='/orderManage_Orders'
                }else{
                     this.highlightindex = cpath;
                }
                if (cpath == '/query/queryout') {
                    this.active = '/query/queryin';
                } else if (cpath == '/order/orderout') {
                    this.active = '/order/orderin';
                } else {
                    this.active = cpath;
                }

                let logo1 =  sessionStorage.getItem('logo1');
                if(logo1 != undefined && logo1 != ''){
                    this.logo1 = sessionStorage.getItem('logo1');
                    this.logo2 = sessionStorage.getItem('logo2');
                }else{
                    /**
                     *
                     * @type {boolean|app.mutations.authFlag|(function(*): *)}
                     * @description:根据权限引入不同的logo
                     */
                    let authFlag = this.$store.state.app.authFlag;
                    if(authFlag){
                        this.logo1 = require('@/assets/images/within-logo.png');
                        this.logo2 = require('@/assets/images/within-logo2.png');
                    }else{
                        this.logo1 = require('@/pages/other/assets/images/within-logo.png');
                        this.logo2 = require('@/pages/other/assets/images/within-logo2.png');
                    }
                }
            }

            this.currentHeight =  (document.body.clientHeight - 45) + 'px'
            window.addEventListener('resize', () => {
                this.currentHeight =  (document.body.clientHeight - 45) + 'px'
            });
        },
        activated(){

        },
        watch: {
            $route: {
                handler: function(val, oldVal){
                    this.highlightindex = val.fullPath;
                    sessionStorage.setItem('highlightindex',this.highlightindex)
                },
                // 深度观察监听
                deep: true
            }
        },


    };

</script>
<style lang="scss" src="../styles/Home.scss" scoped>

</style>
