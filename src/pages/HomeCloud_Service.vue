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
                            <el-menu-item index="/my_account" v-if="showServerItem.my_account">
                                <i class="el-icon-news"></i>
                                <span slot="title">我的账户</span>
                            </el-menu-item>
                            <el-menu-item index="/operator_manage" v-if="showServerItem.operator_manage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">运营集团管理</span>
                            </el-menu-item>
                            <el-menu-item index="/server_park_manage" v-if="showServerItem.server_park_manage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">车场管理</span>
                            </el-menu-item>
                            <el-menu-item index="/subservice_manage" v-if="showServerItem.subservice_manage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">子服务商管理</span>
                            </el-menu-item>
                            <el-submenu index="/serverTrade" v-if="showServerItem.serverTrade">
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span class="menuitem">交易中心</span></template>
                                <el-menu-item index="/serverTrade_MoneyRecord" v-if="showServerItem.serverTrade_MoneyRecord">
                                    资金流水
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="/serverStatistics" v-if="showServerItem.serverStatistics">
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span class="menuitem">统计分析</span></template>
                                <el-menu-item index="/serverStatistics_NewUnionProfit" v-if="showServerItem.serverStatistics_NewUnionProfit">
                                    车场分润报表
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="/serverResources" v-if="showServerItem.serverResources">
                                <template slot="title">
                                    <i class="menu-icon iconfont icon-yuangongguanli"></i>
                                    <span class="menuitem">员工权限</span></template>
                                <el-menu-item index="/serverResources_RoleManage" v-if="showServerItem.serverResources_RoleManage">
                                    角色管理
                                </el-menu-item>
                                <el-menu-item index="/serverResources_EmployeeManage" v-if="showServerItem.serverResources_EmployeeManage">
                                    员工管理
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-scrollbar>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
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
    import { showServerItems_const,ROLE_ID } from '../common/js/const';
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
                showServerItem: sessionStorage.getItem('showServerItem') == null ? showServerItems_const : JSON.parse(sessionStorage.getItem('showServerItem')),
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
        }
    };

</script>
<!--<style lang="scss" src="../styles/Home.scss" scoped>-->

<!--</style>-->
