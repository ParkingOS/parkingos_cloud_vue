<template>
    <el-row class="container">
        <el-col :span="24" class="header not-print">
            <el-col :span="17">
                <div style="display:flex">
                <div style="width:50px;height:50px;" >
                  <i style="color:red;width:50px;height:50px;font-size:50px" class="icon iconfont icon-tingchechang"></i>
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
                        style="height:50px;width: 100px;float: right;background-color:#2d3a4b;border-right: solid 0px #e6e6e6;"
                        @select="selectTop">
                    <el-menu-item index="/loginCloud" style="height:50px;"><span
                            style="color:#fff;font-size:13px;float: right;height:50px;color: #109EFF">退出登录</span>
                        <!--<el-menu-item @click="logout"><span style="color:#fff;font-size:13px;float: right;">退出登录</span>-->
                    </el-menu-item>
                </el-menu>
            </el-col>

        </el-col>

        <el-col :span="24" class="main">
            <aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
              <el-radio-group v-model="isCollapse"
                             style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;">
                  <el-radio-button :label="false" style="flex: 1;text-align:right;">展开</el-radio-button>
                  <el-radio-button :label="true" v-show="!isCollapse" style="flex: 1">收起</el-radio-button>
              </el-radio-group>
                <el-menu class="el-menu-vertical-demo" @open="handleopen"
                         @close="handleclose"
                         @select="handleselect"
                         unique-opened
                         background-color="#545c64" text-color="#fff" active-text-color="#109EFF"
                         :default-active="highlightindex"
                         :collapse="isCollapse">


                    <el-submenu v-if="this.showUnionItem.businessOrder" index="/data">
                        <template slot="title">
                          <i  class="menu-icon icon iconfont icon-analysis"></i>
                          <span class="menuitem">数据中心</span></template>
                        <el-menu-item index="/data_Center" v-if="this.showUnionItem.businessOrder_Cars">数据中心
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showUnionItem.businessOrder" index="/businessOrder">
                        <template slot="title">
                          <i  class="menu-icon icon iconfont icon-order"></i>
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
                          <i  class="menu-icon icon iconfont icon-monthvip"></i><span
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
                          <i  class="menu-icon icon iconfont icon-analysis"></i><span
                                class="menuitem">决策分析</span></template>
                        <el-menu-item index="/strategicAnalysis_DailyReport"
                                      v-if="this.showUnionItem.strategicAnalysis_DailyReport">
                            车场日报
                        </el-menu-item>
                        <el-menu-item index="/strategicAnalysis_MonthReport"
                                      v-if="this.showUnionItem.strategicAnalysis_DailyReport">
                            车场月报
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.showUnionItem.systemSetting" index="/systemSetting">
                        <template slot="title">
                           <i  class="menu-icon icon iconfont icon-systemsetting"></i>
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
                          <i  class="menu-icon icon iconfont icon-monitor"></i><span
                                class="menuitem">中央监控</span></template>
                        <el-menu-item index="centerMonitor"
                                      v-if="this.showUnionItem.centerMonitor">中央监控
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

    export default {
        data() {
            return {
                isCollapse: false,
                activeIndex: '/loginCloud',
                active: '',
                bolink: false,
                park: false,
                union: false,
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
            openSecurity() {
                this.active = '/securitycenter';
                console.log(this.active);
                this.$router.push('/securitycenter');
            },
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
                    let routetocm = 'http://test.bolink.club/tcbcloud/monitor.do?loginuin=' + sessionStorage.getItem('loginuin');
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
                // this.highlightindex = a;
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
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //折叠导航栏
            // collapse: function () {
            //     this.collapsed = !this.collapsed;
            //     if (this.left == false) {
            //         this.left = true;
            //         this.right = false;
            //     } else {
            //         this.left = false;
            //         this.right = true;
            //     }
            //
            // },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {
            console.log('home  mounted');
            let vm = this;
            let user = sessionStorage.getItem('user');

            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.nickname || '';

                var cpath = this.$router.currentRoute.fullPath;
                console.log(cpath);
                this.highlightindex = cpath;
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
                    this.nickname = '集团';
                    this.union = true;
                }

            }
        },
        activated() {
            console.log('home active');
        },
        watch: {
            ulist: function (val) {
                this.sysUserName = val.nickname;
            }
        }

    };

</script>
<style lang="scss" scoped>

    $bg: #2d3a4b; //#008F4C; //#324157;//#0080dd;//#35495E;//#1F2D3D
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;

        width: 100%;
        .header {
            height: 50px;
            line-height: 50px;

            background: $bg;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 20px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                //width:180px;
                height: 50px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 180px;
            }
            .logo-collapse-width {
                width: 60px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 50px;
                line-height: 50px;
                cursor: pointer;
            }
        }
        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 50px;
            bottom: 0px;
            overflow: hidden;
            aside {
                background: #EEF1F6;
                flex: 0 0 180px;
                width: 180px;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;

                }

                .collapsed {
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }
            .menuitem {
                font-size: 16px;
                /*margin-left: 12px;*/
                //color:black
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 70px;
            }
            .menu-expanded {
                /*flex: 0 0 180px;*/
                width: 80px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 180px;
                overflow-y: hidden;
                padding: 10px;
                padding-top: 8px;
                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 180px;
                        float: left;
                        color: #475669;
                    }
                    .title2 {
                        width: 160px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }

    /*el-menu-item选中加粗 左侧item*/
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        font-weight: bold;
    }

    @media print {
        .not-print {
            /*opacity: 0*/
        }
    }

    .el-menu--collapse {
        width: 70px;
    }
    /*为了解决添加 展开-收起 两个按钮后，左侧栏出现滚动条（即使高度够用也出现）*/
    .el-menu-vertical-demo{
        /*充满剩余空间*/
        height: 0;
        flex: 1;
    }
    .container .main aside .el-menu[data-v-cbbc73a8] {
        /*item列表高度设置为0*/
        height: 0;
    }
    .menu-icon{
      color:#6d9eeb;
      width:50px;
      height:50px;
      font-size:20px;
      margin-right: 5px;
    }
</style>
