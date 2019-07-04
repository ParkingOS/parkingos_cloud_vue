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

                            <el-submenu v-if="this.showUnionItem.data_Center" index="/data">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-shujuzhongxin"></i>
                                    <span class="menuitem">数据中心</span></template>
                                <el-menu-item index="/data_Center" v-if="this.showUnionItem.data_Center">数据中心
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu v-if="this.showUnionItem.businessOrder" index="/businessOrder">
                                <template slot="title">
                                    <i class="menu-icon icon iconfont icon-order"></i>
                                    <span
                                            class="menuitem">业务订单</span></template>
                                <el-menu-item index="/businessOrder_Cars" v-if="this.showUnionItem.businessOrder_Cars">在场车辆
                                </el-menu-item>
                                <el-menu-item index="/businessOrder_Orders" v-if="this.showUnionItem.businessOrder_Orders">
                                    订单记录
                                </el-menu-item>
                                <el-menu-item index="/businessOrder_Poles" v-if="this.showUnionItem.businessOrder_Poles">
                                    抬杆记录
                                </el-menu-item>
                                <el-menu-item index="/businessOrder_Income" v-if="this.showUnionItem.businessOrder_Income">
                                    交易记录
                                </el-menu-item>
                                <el-menu-item index="/businessOrder_Expense" v-if="this.showUnionItem.businessOrder_Expense">
                                    支出记录
                                </el-menu-item>
                                <el-menu-item index="/businessOrder_Reduce" v-if="this.showUnionItem.businessOrder_Reduce">
                                    减免记录
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu v-if="this.showUnionItem.member" index="/member">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-yueqiahuiyuan"></i><span
                                        class="menuitem">会员</span>
                                </template>
                                <el-menu-item index="/member_MonthVIP" v-if="this.showUnionItem.member_MonthVIP">
                                    月卡会员
                                </el-menu-item>
                                <el-menu-item index="/member_PrepayCardVIP" v-if="this.showUnionItem.member_PrepayCardVIP">
                                    储值卡会员
                                </el-menu-item>
                                <el-menu-item index="/member_BlackList" v-if="this.showUnionItem.member_BlackList">
                                    黑名单管理
                                </el-menu-item>
                                <el-menu-item index="/member_WhiteList" v-if="this.showUnionItem.member_WhiteList">
                                    白名单管理
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu v-if="this.showUnionItem.strategicAnalysis" index="/strategicAnalysis">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-shujufenxi"></i><span
                                        class="menuitem">财务报表</span></template>

                                <el-menu-item index="/strategicAnalysis_DailyParkReport"
                                              v-if="this.showUnionItem.strategicAnalysis_DailyParkReport">
                                    车场日报统计
                                </el-menu-item>

                                <el-menu-item index="/strategicAnalysis_DailyReport"
                                              v-if="this.showUnionItem.strategicAnalysis_DailyReport">
                                    集团日报统计
                                </el-menu-item>
                                <el-menu-item index="/strategicAnalysis_MonthReport"
                                              v-if="this.showUnionItem.strategicAnalysis_MonthReport">
                                    集团月报统计
                                </el-menu-item>

                            </el-submenu>
                            <el-submenu v-if="this.showUnionItem.systemSetting" index="/systemSetting">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-xitongguanli"></i>
                                    <span
                                            class="menuitem">系统设置</span>
                                </template>
                                <el-submenu index="/systemSetting_Company" v-if="this.showUnionItem.systemSetting_Company">
                                    <template slot="title"><span class="menuitem" style="font-size: 14px;">企业信息</span>
                                    </template>
                                    <el-menu-item index="/systemSetting_Account"
                                                  v-if="this.showUnionItem.systemSetting_Account">账户信息
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item index="/systemSetting_Park" v-if="this.showUnionItem.systemSetting_Park">
                                    停车场
                                </el-menu-item>
                                <el-submenu index="/systemSetting_HR" v-if="this.showUnionItem.systemSetting_HR">
                                    <template slot="title"><span class="menuitem" style="font-size: 14px;">人力资源</span>
                                    </template>
                                    <el-menu-item index="/systemSetting_RoleManage"
                                                  v-if="this.showUnionItem.systemSetting_RoleManage">角色管理
                                    </el-menu-item>
                                    <el-menu-item index="/systemSetting_EmployeeManage"
                                                  v-if="this.showUnionItem.systemSetting_EmployeeManage">员工管理
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="/systemSetting_LogsManage"
                                            v-if="this.showUnionItem.systemSetting_LogsManage">
                                    <template slot="title"><span class="menuitem" style="font-size: 14px;">日志管理</span>
                                    </template>
                                    <el-menu-item index="/systemSetting_LogsOperates"
                                                  v-if="this.showUnionItem.systemSetting_LogsOperates">操作日志管理
                                    </el-menu-item>
                                    <el-menu-item index="/systemSetting_LogsCollector"
                                                  v-if="this.showUnionItem.systemSetting_LogsCollector">收费员日志
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu index="/unionValueAddedService" v-if="this.showUnionItem.unionValueAddedService">
                                <template slot="title">
                                    <i class="el-icon-star-off" style="width: 20px;font-size: 20px;margin-right: 0"></i>
                                    <span class="menuitem">增值服务</span>
                                </template>
                                <el-menu-item index="/unionValueAddedService_Sms" v-if="this.showUnionItem.unionValueAddedService_Sms">短信服务
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu v-if="this.showUnionItem.centerMonitor" index="centerMonitor"
                                        style="font-weight: normal">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-zhongyangjiankong"></i><span
                                        class="menuitem">中央监控</span></template>
                                <!--<el-menu-item index="centerMonitor"-->
                                <!--v-if="this.showUnionItem.centerMonitor">中央监控-->
                                <!--</el-menu-item>-->
                                <el-menu-item index="/monitorApp" v-if="this.showUnionItem.centerMonitor">中央监控
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
    import { server } from '../api/api';

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
                shop:false,
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
                //showParkItem: sessionStorage.getItem('showParkItem') == null ? showParkItem_const : JSON.parse(sessionStorage.getItem('showParkItem')),
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
                this.active = a;
                this.$router.push(a);
            },
            handleselect: function (a, b) {
                if(a == '/monitorApp'){
                    let routeData = this.$router.resolve({
                        name: "自定义监控",
                    });
                    window.open(routeData.href, '_blank');
                    return;
                }
                if (a == 'centerMonitor') {
                    let routetocm = 'http://yun.bolink.club/tcbcloud/monitor.do?loginuin=' + sessionStorage.getItem('loginuin');
                    let comid = sessionStorage.getItem('comid');
                    let groupid = sessionStorage.getItem('groupid');
                    if (comid != '' && comid != 'undefined') {
                        routetocm = routetocm + '&comid=' + comid;
                    }
                    if (groupid != '' && groupid != 'undefined') {
                        routetocm = routetocm + '&groupid=' + groupid;
                    }
                    window.open(routetocm);
                    return;
                }
                var cpath = this.$router.currentRoute.fullPath;
                var options = this.$router.options.routes;
                this.highlightindex = a;
                this.expandindex = a.split('_')[0];
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
                this.highlightindex = cpath;
                if (cpath == '/query/queryout') {
                    this.active = '/query/queryin';
                } else if (cpath == '/order/orderout') {
                    this.active = '/order/orderin';
                } else {
                    this.active = cpath;
                }

                let logo1 =  sessionStorage.getItem('logo1');
                if(logo1 != undefined && logo1 != '' && logo1 != null){
                    this.logo1 = sessionStorage.getItem('logo1');
                    this.logo2 = sessionStorage.getItem('logo2');
                }else{
                    /**
                     *
                     * @type {boolean|app.mutations.authFlag|(function(*): *)}
                     * @description:根据权限引入不同的logo
                     */
                    this.$store.commit('authFlag')
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
        watch: {
            $route: {
                handler: function(val, oldVal){
                    let str = val.fullPath.split('/');
                    this.highlightindex = '/'+str[1];
                    sessionStorage.setItem('highlightindex',this.highlightindex)
                },
                // 深度观察监听
                deep: true
            }
        },
    };

</script>
<!--<style lang="scss" src="../styles/Home.scss" scoped>-->

<!--</style>-->
