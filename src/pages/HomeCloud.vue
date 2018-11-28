<template>
    <el-row class="container">
        <div class="mian-header" style="border-bottom: 1px solid #ebeef5;">
            <div class="logo">
                <div class="logo-one">
                    <img src="../assets/images/within-logo.png">
                </div>
                <div class="logo-two">
                    <img src="../assets/images/within-logo2.png">
                </div>
            </div>
            <div class="console">
                <div class="img-box"><img src="../assets/images/login-user.png"></div>
                <div class="username">{{nickname}}:{{sysUserName}}</div>
                <div class="outlogin" @click="logout">退出</div>
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
                         active-text-color="#74DBFF"
                         :default-active="highlightindex"
                         :collapse="isCollapse">

                    <el-submenu v-if="this.showParkItem.data_Center_park" index="/data">
                        <template slot="title">
                            <i class="iconfont icon-shujuzhongxin"></i>
                            <span class="menuitem">数据中心</span></template>
                        <el-menu-item index="/data_Center_park" v-if="this.showParkItem.data_Center_park">数据中心
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.orderManage" index="/orderManage">
                        <template slot="title"><i class="iconfont icon-yewudingdan"></i>
                            <span class="menuitem">订单管理</span></template>
                        <el-menu-item index="/orderManage_Orders" v-if="this.showParkItem.orderManage_Orders">订单记录
                        </el-menu-item>
                        <el-menu-item index="/orderManage_Poles" v-if="this.showParkItem.orderManage_Poles">抬杆记录
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.monthMember" index="/monthMember">
                        <template slot="title"><i class="iconfont icon-yueqiahuiyuan"></i>
                            <span class="menuitem">月卡会员</span></template>
                        <el-menu-item index="/monthMember_VIP" v-if="this.showParkItem.monthMember_VIP">月卡会员
                        </el-menu-item>
                        <el-menu-item index="/monthMember_Refill" v-if="this.showParkItem.monthMember_Refill">月卡续费记录
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.vistorManage" index="/vistorManage">
                        <template slot="title"><i class="iconfont icon-fangkeguanli"></i><span
                                class="menuitem">访客管理</span></template>
                        <el-menu-item index="/vistorManage_VistorMember" v-if="this.showParkItem.vistorManage_VistorMember">访客人员管理
                        </el-menu-item>
                        <el-menu-item index="/vistorManage_homeOwner" v-if="this.showParkItem.vistorManage_homeOwner">业主管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.onlinePay" index="/onlinePay">
                        <template slot="title"><img src="../assets/menu.svg" style="margin-right: 5px;"><span
                                class="menuitem">电子支付</span></template>
                        <el-menu-item index="/onlinePay_CashManage" v-if="this.showParkItem.onlinePay_CashManage">
                            提现管理
                        </el-menu-item>
                        <el-menu-item index="/onlinePay_Income" v-if="this.showParkItem.onlinePay_Income">电子收款
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.orderStatistics" index="/orderStatistics">
                        <template slot="title"><i class="iconfont icon-tongjifenxi"></i>
                            <span class="menuitem">统计分析</span></template>
                        <el-menu-item index="/orderStatistics_CollectorReport"
                                  v-if="this.showParkItem.orderStatistics_CollectorReport">收费员日报
                        </el-menu-item>

                        <el-menu-item index="/orderStatistics_DailyReport"
                                      v-if="this.showParkItem.orderStatistics_DailyReport">车场日报
                        </el-menu-item>
                        <!--<el-menu-item index="/orderStatistics_Settlement"-->
                        <!--v-if="this.showParkItem.orderStatistics_DailyReport">日报统计-->
                        <!--</el-menu-item>-->
                        <el-menu-item index="/orderStatistics_MonthReport"
                                      v-if="this.showParkItem.orderStatistics_MonthReport">车场月报
                        </el-menu-item>

                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.shopManage" index="/shopManage">
                        <template slot="title"><i class="iconfont icon-shanghuguanli"></i><span
                                class="menuitem">商户管理</span></template>
                        <el-menu-item index="/shopManage_Shop" v-if="this.showParkItem.shopManage_Shop">商户管理
                        </el-menu-item>
                        <el-menu-item index="/shopManage_QueryAccount"
                                      v-if="this.showParkItem.shopManage_QueryAccount">
                            流水查询
                        </el-menu-item>
                        <el-menu-item index="/shopManage_Coupon" v-if="this.showParkItem.shopManage_Coupon">优惠券管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="/equipmentManage" v-if="this.showParkItem.equipmentManage">
                        <template slot="title"><i class="iconfont icon-shebeiguanli"></i><span
                                class="menuitem">设备管理</span></template>
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
                    <el-submenu v-if="this.showParkItem.employeePermission" index="/employeePermission">
                        <template slot="title"><i class="iconfont icon-yuangongguanli"></i><span
                                class="menuitem">员工权限</span></template>
                        <el-menu-item index="/employeePermission_Role"
                                      v-if="this.showParkItem.employeePermission_Role">
                            角色管理
                        </el-menu-item>
                        <el-menu-item index="/employeePermission_Manage"
                                      v-if="this.showParkItem.employeePermission_Manage">
                            员工管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="/systemManage" v-if="this.showParkItem.systemManage">
                        <template slot="title"><i class="iconfont icon-xitongshezhi1"></i>
                            <span class="menuitem">系统管理</span></template>
                        <el-menu-item index="/systemManage_BlackList"
                                      v-if="this.showParkItem.systemManage_BlackList">
                            黑名单管理
                        </el-menu-item>
                        <el-menu-item index="/systemManage_Commute" v-if="this.showParkItem.systemManage_Commute">
                            上下班记录
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
                        <el-menu-item index="/systemManage_Logs" v-if="this.showParkItem.systemManage_Logs">系统日志
                        </el-menu-item>

                    </el-submenu>
                    <el-submenu v-if="this.showParkItem.centerMonitor||this.showUnionItem.centerMonitor" index="centerMonitor"
                                style="font-weight: normal;padding-bottom: 20px">
                        <template slot="title"><i class="iconfont icon-zhongyangjiankong1"></i><span
                                class="menuitem">中央监控</span></template>
                        <!--<el-menu-item index="centerMonitor" v-if="this.showParkItem.centerMonitor">中央监控-->
                        <!--</el-menu-item>-->
                        <el-menu-item index="/monitorApp" v-if="this.showParkItem.centerMonitor||this.showUnionItem.centerMonitor">中央监控
                        </el-menu-item>
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
            //退出登录
            logout: function () {
                var _this = this;
                let user = sessionStorage.getItem('user');
                let u = JSON.parse(user);
                let logoutParams = {userid: u.userid, token: sessionStorage.getItem('token')};
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    //this.$post(path+"/user/dologout",logoutParams)
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('token');
                    localStorage.removeItem('comid');
                    localStorage.removeItem('groupid');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },

        },
        mounted() {
            console.log('home  mounted');
            let vm = this;
            let user = sessionStorage.getItem('user');
            this.ccccccc = true;
            if (user) {
                user = JSON.parse(user);
                var maxLength1 = user.nickname.length;//管理员名称
                var maxLength2 = user.name.length;

                console.log('~~~~~~~'+user.nickname+'~~~'+(maxLength1>8));
                this.sysUserName = maxLength1>10?user.nickname.slice(0,10)+'...':user.nickname;
                this.nickname = maxLength2>20?user.name.slice(0,20)+'...':user.name;
                //this.sysUserName =user.nickname;
                //this.nickname=user.name;
                var cpath = this.$router.currentRoute.fullPath;
                console.log(cpath);
                if(cpath.indexOf('orderManage_OrderDetail') > -1 ){
                    this.highlightindex ='/orderManage_Orders'
                }else{
                     this.highlightindex = cpath;
                }
                // this.highlightindex = '/data_Center_park';
                if (cpath == '/query/queryout') {
                    this.active = '/query/queryin';
                } else if (cpath == '/order/orderout') {
                    this.active = '/order/orderin';
                } else {
                    this.active = cpath;
                }
                if (user.oid == 0 || user.oid == ROLE_ID.PARK) {
                //    this.nickname = '车场';
                    this.park = true;
                }
                if (user.oid == ROLE_ID.UNION) {
                    this.nickname = '集团';
                    this.union = true;
                }
                if (user.oid == ROLE_ID.CITY) {
                    this.nickname = "厂商";
                    this.city = true;
                }
                if (user.oid == ROLE_ID.BOSS) {
                    this.nickname = "Admin";
                    this.admin = true;
                }

            }

            this.currentHeight =  (document.body.clientHeight - 45) + 'px'
            window.addEventListener('resize', () => {
                this.currentHeight =  (document.body.clientHeight - 45) + 'px'
            });
        },


    };

</script>
<style lang="scss" src="../styles/Home.scss" scoped>

</style>
