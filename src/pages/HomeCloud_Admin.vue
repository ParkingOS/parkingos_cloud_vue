<template>
    <el-row class="container">
        <el-col :span="24" class="header not-print">
            <el-col :span="17">
                <div style="display:flex">
                    <div style="width:40px;height:40px;margin-left: 20px;">
                        <i style="width:40px;height:40px;font-size:40px" class="icon iconfont icon-park"></i>
                    </div>
                    <div style="margin-left:5px;font-size:30px;postition:relative;line-height:50px;vertical-align:middle;float:left;font-family:STXinwei">
                        智慧停车云
                    </div>
                </div>
            </el-col>
            <el-col :span="7" style="padding-right:10px">
                <div style="color:#fff;font-size:15px;display:inline;right:235px;position:absolute;">{{nickname}}:
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
                <!--<div style="height: 38px;width: 100%;">-->
                <!--<el-radio-group v-model="isCollapse"-->
                <!--style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;">-->
                <!--<el-radio-button :label="false" style="flex: 1;text-align:right;">展开</el-radio-button>-->
                <!--<el-radio-button :label="true" v-show="!isCollapse" style="flex: 1">收起</el-radio-button>-->
                <!--</el-radio-group>-->
                <!--</div>-->
                <el-button v-show="!isCollapse" @click="isCollapse = !isCollapse"
                           class="menu-expan-button menu-expan-button2">
                    <i class="menu-icon icon iconfont icon-menuclose"></i>
                </el-button>
                <el-button v-show="isCollapse" @click="isCollapse = !isCollapse" class="menu-expan-button">
                    <i class="menu-icon icon iconfont icon-menuopen"></i>
                </el-button>
                <el-menu class="el-menu-vertical-demo el-parkingos-menu" @open="handleopen"
                         @close="handleclose"
                         @select="handleselect"
                         unique-opened
                          text-color="#fff" active-text-color="#109EFF"
                         :default-active="highlightindex"
                         :collapse="isCollapse">

                    <el-submenu v-if="this.cityregis" index="/createUin">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">注册厂商</span></template>
                        <el-menu-item index="/createUin">注册厂商
                        </el-menu-item>
                    </el-submenu>

                     <el-submenu v-if="this.shop" index="/shop">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">商户管理</span></template>
                        <el-menu-item index="/shop">商户管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.shop" index="/fix_code">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">固定码管理</span></template>
                        <el-menu-item index="/fix_code">固定码管理
                        </el-menu-item>
                    </el-submenu>
                     <el-submenu v-if="this.shop" index="/ticket_manage">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">用券明细</span></template>
                        <el-menu-item index="/ticket_manage">用券明细
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.shop" index="/shop_recharge">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">充值明细</span></template>
                        <el-menu-item index="/shop_recharge">充值明细
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu v-if="this.admin" index="/city_manage">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">厂商管理</span></template>
                        <el-menu-item index="/city_manage">厂商管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.city" index="/union_manage">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">运营集团管理</span></template>
                        <el-menu-item index="/union_manage">运营集团管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.city" index="/park_manage">
                        <template slot="title"><i class="menu-icon icon iconfont icon-order"></i><span
                                class="menuitem">车场管理</span></template>
                        <el-menu-item index="/park_manage">车场管理
                        </el-menu-item>
                    </el-submenu>

                </el-menu>

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
                shop:false,
                ccccccc: false,
                city: false,
                cityregis: false,
                admin: false,
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
                //this.expandindex = a.split('_')[0];
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
            console.log('home  mounted');
            let vm = this;
            let user = sessionStorage.getItem('user');
            this.ccccccc = true;
            if (user) {

                user = JSON.parse(user);
                console.log('00000000000000000000000')
                //console.log('chen:'+user.nickname)
               console.log(user.name+'~~~'+user.nickname)
               var maxLength1 = user.nickname.length;//管理员名称
               var maxLength2 = user.name.length;

               //console.log('~~~~~~~'+user.nickname+'~~~'+(maxLength1>8));
               this.sysUserName = maxLength1>10?user.nickname.slice(0,10)+'...':user.nickname;
               this.nickname = maxLength2>20?user.name.slice(0,20)+'...':user.name;
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
                    this.nickname = '运营集团';
                    this.union = true;
                }
                if (user.oid == ROLE_ID.CITY) {
                    //this.nickname = '厂商';
                    this.city = true;
                }
                if (user.oid == ROLE_ID.BOSS) {
                    this.nickname = 'Admin';
                    this.admin = true;
                }
                if (user.oid == ROLE_ID.CITYREGIS) {
                    this.nickname = '注册厂商';
                    this.cityregis = true;
                }
                if (user.oid == ROLE_ID.SHOP) {
                    //this.nickname = '商户';
                    this.shop = true;
                }

            }
        }


    };

</script>
<style lang="scss" src="../styles/Home.scss" scoped>
  el-menu {
    background-color: $--parkingos-sidemenu-background;
  }
</style>
