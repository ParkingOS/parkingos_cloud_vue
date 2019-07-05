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
                            <!--
                        @date:20190515
                        @author:cyzhi
                        @description:泊链页面迁移至云平台
                        @page:Account、
                    -->
                            <el-menu-item index="/city_account" v-if="showCityItem.city_account">
                                <i class="el-icon-news"></i>
                                <span slot="title">我的账户</span>
                            </el-menu-item>
                            <el-menu-item index="/citySerManage_serManagePage" v-if="showCityItem.citySerManage_serManagePage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">服务商管理</span>
                            </el-menu-item>
                            <el-menu-item index="/cityUnionManage_unionManagePage" v-if="showCityItem.cityUnionManage_unionManagePage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">运营集团管理</span>
                            </el-menu-item>
<!--                            <el-submenu index="/citySerManage" v-if="showCityItem.citySerManage">-->
<!--                                <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span-->
<!--                                        class="menuitem">工程服务商</span></template>-->
<!--                                <el-menu-item index="/citySerManage_serManagePage" v-if="showCityItem.citySerManage_serManagePage">服务商管理-->
<!--                                </el-menu-item>-->
<!--                            </el-submenu>-->

<!--                            <el-submenu index="/cityUnionManage" v-if="showCityItem.cityUnionManage">-->
<!--                                <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span-->
<!--                                        class="menuitem">运营集团</span></template>-->
<!--                                <el-menu-item index="/cityUnionManage_unionManagePage" v-if="showCityItem.cityUnionManage_unionManagePage">运营集团管理-->
<!--                                </el-menu-item>-->
<!--                            </el-submenu>-->
                            <el-submenu index="/cityParkManage"  v-if="showCityItem.cityParkManage">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span
                                        class="menuitem">车场管理</span></template>
                                <el-menu-item index="/cityParkManage_parkManagePage"  v-if="showCityItem.cityParkManage_parkManagePage">车场管理
                                </el-menu-item>
                                <el-menu-item index="/cityParkManage_materielPage" v-if="showCityItem.cityParkManage_materielPage">物料管理
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item index="/cityTrade_MoneyRecord" v-if="showCityItem.cityTrade_MoneyRecord">
                                <i class="el-icon-document"></i>
                                <span slot="title">资金流水</span>
                            </el-menu-item>

                            <el-menu-item index="/cityStatistics_NewUnionProfit" v-if="showCityItem.cityStatistics_NewUnionProfit">
                                <i class="el-icon-document"></i>
                                <span slot="title">车场分润报表</span>
                            </el-menu-item>

                            <el-submenu index="/cityResources" v-if="showCityItem.cityResources">
                                <template slot="title"><i class="menu-icon iconfont icon-yuangongguanli" style="margin-right: 5px"></i>
                                    <span class="menuitem">人力资源</span></template>
                                <el-menu-item index="/cityResources_RoleManage" v-if="showCityItem.cityResources_RoleManage">角色管理</el-menu-item>
                                <el-menu-item index="/cityResources_EmployeeManage" v-if="showCityItem.cityResources_EmployeeManage">员工管理</el-menu-item>
                                <el-menu-item index="/cityResources_MessageNtification" v-if="showCityItem.cityResources_MessageNtification">消息通知</el-menu-item>
                            </el-submenu>

                            <el-submenu index="/citySettingManage" v-if="showCityItem.citySettingManage">
                                <template slot="title"><i class="el-icon-setting"></i><span
                                        class="menuitem">个性化设置</span></template>
                                <el-menu-item index="/citySettingManage_settingPage" v-if="showCityItem.citySettingManage_settingPage">个性化设置
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item index="/city_systemMange" v-if="showCityItem.city_systemMange">
                                <i class="menu-icon icon iconfont icon-order"></i>
                                <span slot="title">系统日志</span>
                            </el-menu-item>

                            <el-menu-item v-if="this.city" index="/development">
                                <i class="el-icon-edit"></i>
                                <span slot="title">开发配置</span>
                            </el-menu-item>

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
    import { showCityItems_const,ROLE_ID } from '../common/js/const';
    import { server } from '../api/api';

    export default {
        data() {
            return {
                city:false,
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
                showCityItem: sessionStorage.getItem('showCityItem') == null ? showCityItems_const : JSON.parse(sessionStorage.getItem('showCityItem')),
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
                this.city = user.docking_type == 2?true:false;
                this.sysUserName = maxLength1>10?user.nickname.slice(0,10)+'...':user.nickname;
                this.nickname = maxLength2>20?user.name.slice(0,20)+'...':user.name;
                var cpath = this.$router.currentRoute.fullPath;
                this.highlightindex = cpath;
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
