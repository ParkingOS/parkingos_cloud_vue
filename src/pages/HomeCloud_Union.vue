<template>
    <el-row class="container">
        <el-col :span="24" class="header not-print">
            <el-col :span="17">
                <div style="display:flex">
                    <div style="width:40px;height:40px;margin-left: 20px;">
                        <i style="width:40px;height:40px;font-size:40px" class=" icon iconfont icon-park"></i>
                    </div>
                    <div style="margin-left:5px;font-size:30px;postition:relative;line-height:50px;vertical-align:middle;float:left;font-family:STXinwei">
                        智慧停车云
                    </div>
                </div>
            </el-col>
            <el-col :span="7" style="padding-right:10px">
                <div style="color:#fff;font-size:15px;display:inline;right:235px;position:absolute">{{nickname}}:
                    {{sysUserName}}
                </div>
                <el-menu
                        style="height:50px;width: 100px;float: right;border-right: solid 0px #e6e6e6;"
                        @select="selectTop" class="logout-button">
                    <el-menu-item index="/loginCloud" style="height:50px;"><span
                            style="color:#fff;font-size:13px;float: right;height:50px;color: #109EFF">退出登录</span>
                        <!--<el-menu-item @click="logout"><span style="color:#fff;font-size:13px;float: right;">退出登录</span>-->
                    </el-menu-item>
                </el-menu>
            </el-col>

        </el-col>

        <el-col :span="24" class="main">
            <aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
                <!--<el-radio-group v-model="isCollapse"-->
                <!--style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;">-->
                <!--<el-radio-button :label="false" style="flex: 1;text-align:right;">展开</el-radio-button>-->
                <!--<el-radio-button :label="true" v-show="!isCollapse" style="flex: 1">收起</el-radio-button>-->
                <!--</el-radio-group>-->
                <el-button v-show="!isCollapse" @click="isCollapse = !isCollapse"
                           class="menu-expan-button menu-expan-button2">
                    <i class="menu-icon icon iconfont icon-menuclose"></i>
                </el-button>
                <el-button v-show="isCollapse" @click="isCollapse = !isCollapse" class="menu-expan-button">
                    <i class="menu-icon icon iconfont icon-menuopen"></i>
                </el-button>
                <el-menu class="el-menu-vertical-demo" @open="handleopen"
                         @close="handleclose"
                         @select="handleselect"
                         unique-opened
                          text-color="#fff" active-text-color="#109EFF"
                         :default-active="highlightindex"
                         :collapse="isCollapse">


                    <el-submenu v-if="this.showUnionItem.data_Center" index="/data">
                        <template slot="title">
                            <i class="menu-icon icon iconfont icon-analysis"></i>
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
                    </el-submenu>
                    <el-submenu v-if="this.showUnionItem.member" index="/member">
                        <template slot="title">
                            <i class="menu-icon icon iconfont icon-monthvip"></i><span
                                class="menuitem">会员</span>
                        </template>
                        <el-menu-item index="/member_MonthVIP" v-if="this.showUnionItem.member_MonthVIP">
                            月卡会员
                        </el-menu-item>
                        <el-menu-item index="/member_BlackList" v-if="this.showUnionItem.member_BlackList">
                            黑名单管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showUnionItem.strategicAnalysis" index="/strategicAnalysis">
                        <template slot="title">
                            <i class="menu-icon icon iconfont icon-analysis"></i><span
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
                            <i class="menu-icon icon iconfont icon-systemsetting"></i>
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
                    <el-submenu v-if="this.showUnionItem.centerMonitor" index="centerMonitor"
                                style="font-weight: normal">
                        <template slot="title">
                            <i class="menu-icon icon iconfont icon-monitor"></i><span
                                class="menuitem">中央监控</span></template>
                        <!--<el-menu-item index="centerMonitor"-->
                                      <!--v-if="this.showUnionItem.centerMonitor">中央监控-->
                        <!--</el-menu-item>-->
                        <el-menu-item index="/monitorApp" v-if="this.showParkItem.centerMonitor">中央监控
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
                <!--</div>-->
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <keep-alive>
                            <router-view></router-view>

                        </keep-alive>
                    </el-col>
                </div>
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
                showParkItem: sessionStorage.getItem('showParkItem') == null ? showParkItem_const : JSON.parse(sessionStorage.getItem('showParkItem')),
                showUnionItem: sessionStorage.getItem('showUnionItem') == null ? showUnionItem_const : JSON.parse(sessionStorage.getItem('showUnionItem')),
                expandindex: '',   //'/order',//展开的sub_menu
                highlightindex: sessionStorage.getItem('highlightindex')//'/orderManage_Poles',//高亮的item
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
                if(a == '/monitorApp'){
                    window.open(server + '/#/monitorApp')
                    // window.open('http://192.168.199.219:8086/#/monitorApp')
                    return;
                }
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
            }
        },
        mounted() {
            // console.log('home  mounted');
            let vm = this;
            let user = sessionStorage.getItem('user');

            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.nickname || '';

                var cpath = this.$router.currentRoute.fullPath;
                console.log(cpath);
                this.highlightindex = cpath;
                // this.highlightindex = '/data_Center';
                if (cpath == '/query/queryout') {
                    this.active = '/query/queryin';
                } else if (cpath == '/order/orderout') {
                    this.active = '/order/orderin';
                } else {
                    this.active = cpath;
                }
                if (user.oid == 0 || user.oid == ROLE_ID.PARK) {
                    this.nickname = '车场';
                    this.park = true;
                }
                if (user.oid == ROLE_ID.UNION) {
                    this.nickname = '运营集团';
                    this.union = true;
                }
                if (user.oid == ROLE_ID.SHOP) {
                    this.nickname = '商户';
                    this.shop = true;
                }

            }
        }
    };

</script>
<style lang="scss" src="../styles/Home.scss" scoped>

</style>
