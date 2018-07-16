<template>
    <div style="width: 100%;height: 100%; display: flex;flex-direction: column;align-items: center;justify-content: center;">
        <div style="width: 100%;">
            <div style="font-family: STXinwei;margin-left:10px;font-size:30px;postition:relative;line-height:60px;vertical-align:middle;font-weight:bold">
                智慧停车云 · 行业领导者
            </div>
        </div>

        <div class="login-container" style="align-items: center;justify-content: center;flex-align:center;flex:16;display: flex;">

            <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="rules2" ref="loginForm"
                     label-position="left">
                <div class="title-container">
                    <h3 class="title">管理后台</h3>
                </div>

                <el-form-item prop="username">
                    <span class="svg-container svg-container_login"><img src="../assets/user.png"
                                                                         style="padding-top: 5px;width: 25px;height: 25px;"/></span>
                    <el-input type="text" v-model="loginForm.username" autoComplete="on" placeholder="账 号"
                              style="font-size: 16px;"/>
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container"><img src="../assets/pwd.png"
                                                     style="padding-top: 5px;width: 25px;height: 25px;"/></span>
                    <el-input :type="passwordType" @keyup.enter.native="handleSubmit2"
                              v-model="loginForm.password" autoComplete="on" placeholder="密 码"
                              style="font-size: 16px;"/>
                    <span class="show-pwd" @click="showPwd"><img src="../assets/eye.png"/></span>
                </el-form-item>

                <span>
                     <el-checkbox v-model="checked" ><font color="white" size="2">记住密码</font></el-checkbox>
                     <el-button @click="handleReset"  size="small" type="text" style="color:white;margin-left:300px;" ><font size="2">忘记密码?</font></el-button>
                </span>

                <el-button type="primary"
                           style="width:100%;margin-bottom:30px;margin-left:0px;background: #109EFF;height: 47px;font-size: 16px;"
                           :loading="loading"
                           @click.native.prevent="handleSubmit2">登 录
                </el-button>
            </el-form>
        </div>
        <div style="height:40px;line-height:40px;text-align:center;width: 100%;">
            © 2014 - 2018 All Rights Reserved
        </div>
        <el-dialog title="本系统不支持ie10以下浏览器！" :visible.sync="isIE10">
          <el-alert
            title="本系统不支持ie10以下浏览器！"
            type="error"
            description="本系统不支持ie10以下浏览器，强烈推荐google chrome浏览器，或者使用ie11版本以上的浏览器！"
            show-icon>
          </el-alert>
      </el-dialog>


      <!--重置密码对话框-->
        <el-dialog
            title="找回密码"
            :visible.sync="getPassVisible"
            size="tiny"
            @close="closeGetPass">
            <el-form ref="passform" :model="getpass" :rules="getPassFormRules" label-width="90px" style="width:96%">

                <el-form-item label="登录账户" prop="userid">
                    <el-input v-model="getpass.userid"></el-input>
                </el-form-item>
                <el-form-item label="密保手机" prop="mobile">
                    <el-input v-model="getpass.mobile"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="getpass.code" style="width:50%"></el-input>
                    <el-button  type="success"  @click="getckey" :disabled="codeBtn" style="color:blue">{{passinfo}}</el-button>
                </el-form-item>
                </el-form>
                <el-col align="right" style="margin-bottom:2px;margin-top:-10px;">
                    <el-button @click="getPassVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="checkCode" size="small" :disabled="hasCode">确 定</el-button>
                </el-col>
        </el-dialog>


        <!--获取ckey对话框-->
        <el-dialog
            title="获取验证码"
            :visible.sync="getckeyVisible"
            top="25%"
            size="tiny"
            @close="closegetckey">
            <el-form ref="ckeyform" :model="getckeyForm" label-width="80px" style="width:85%;margin-left:20px">
                <el-form-item label="机器码">
                    <div class="keyCode" >{{ckey}}</div>
                </el-form-item>
                <el-form-item label="请输入">
                    <el-input v-model="getckeyForm.ckey"></el-input>
                </el-form-item>
                </el-form>
                <el-col align="right" style="margin-bottom:12px;margin-top:-10px;">
                    <el-button @click="getckeyVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="reguser" size="small">确 定</el-button>
                </el-col>
        </el-dialog>


        <!--重置密码对话框-->
        <el-dialog
            title="重置密码"
            :visible.sync="resetPassVisible"
            top="25%"
            size="tiny"
            @close="closeResetPass">
            <el-form ref="resetpassform" :model="resetPassForm" :rules="resetPassFormRules" label-width="100px" style="width:85%;margin-left:20px">
                <el-form-item label="请输入密码" prop="pass1">
                    <el-input v-model="resetPassForm.pass1" type="password" ></el-input>
                </el-form-item>
                <el-form-item label="再输入密码" prop="pass2">
                    <el-input v-model="resetPassForm.pass2" type="password"></el-input>
                </el-form-item>
                </el-form>
                <el-col align="right" style="margin-bottom:18px;margin-top:-10px;">
                    <el-button @click="resetPassVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="resetPasss" size="small">确 定</el-button>
                </el-col>
        </el-dialog>

    </div>

</template>

<script>
    import CryptoJS from 'crypto-js';
    import {path, checkPass} from '../api/api';
    import MD5 from 'crypto-js/md5';
    import common from '../common/js/common';
    import {ROLE_ID, AUTH_ID, AUTH_ID_UNION, showUnionItem_const, showParkItem_const} from '../common/js/const';

    var key = CryptoJS.enc.Utf8.parse('zldboink20170613');
    var iv = CryptoJS.enc.Utf8.parse('zldboink20170613');
    var timer;

    // import SvgIcon from '../components/SvgIcon/index.vue'// svg组件

    export default {
        // components: {svgicon: SvgIcon},
        data() {
            return {
                expandindex: '',   //'/order',//展开的sub_menu
                highlightindex: '',//'/orderManage_Poles',//高亮的item
                //根据权限控制页面是否显示
                showParkItem: showParkItem_const,
                showUnionItem: showUnionItem_const,
                isIE10:false,
                logining: false,
                getPassVisible: false,
                getckeyVisible: false,
                resetPassVisible: false,
                codeBtn: false,
                hasCode: true,
                passinfo: '获取验证码',
                top: '',
                bgheight: '',
                user_id:'',
                content: '',
                form: '',
                wrap: '',
                bg: '',
                // account:'account',
                // checkPass:'checkPass',
                rules2: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false,
                getpass: {
                    user_type: '',
                    userid: '',
                    mobile: '',
                    code: ''
                },
                getckeyForm: {
                    ckey: ''
                },
                ckey: '',
                resetPassForm: {
                    pass1: '',
                    pass2: ''
                },
                token: '',
                getPassFormRules: {

                    userid: [
                        {required: true, message: '请输入账户名称', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入密保电话', trigger: 'blur'}
                    ]
                },
                resetPassFormRules: {
                    pass1: [
                        {validator: checkPass, required: true, trigger: 'blur'}
                    ],
                    pass2: [
                        {validator: checkPass, required: true, trigger: 'blur'}
                    ]
                },
                time: '',


                loginForm: {
                    username: '',
                    password: ''
                },
                passwordType: 'password',
                loading: false,
                showDialog: false
            };
        },

        mounted() {
            //alert(common.gwh())

            var vm = this;
            vm.getCookie()
            var pad = Math.ceil((common.gww() - 1366) / 2);
            this.top = 'height:60px;padding-left:' + pad + 'px;padding-right:' + pad + 'px';
            this.bgheight = 'height:' + (common.gwh() - 110) + 'px;width:' + common.gww() + 'px';
            this.content = 'float:left;width:1250px;height:' + (common.gwh() - 110) + 'px;margin-left:' + Math.ceil((common.gww() - 1500) / 2) + 'px';

            //检测回车按键
            document.addEventListener('keydown', function (e) {
                if (e.keyCode == 13) {
                    vm.handleSubmit2();
                }
            }, false);
            vm.iEVersionCheck();
        },
        methods: {

              iEVersionCheck() {

                 var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                 var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
                 var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
                 var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
                 var fIEVersion = 11;
                 if(isIE) {
                     var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                     reIE.test(userAgent);
                     fIEVersion = parseFloat(RegExp["$1"]);
                 } else if(isEdge) {
                     fIEVersion = 12;
                 } else if(isIE11) {
                     fIEVersion = 11; //IE11
                 }else{
                     fIEVersion = -1;//不是ie浏览器
                 }
                 if(fIEVersion>0 && fIEVersion <=10){
                   this.isIE10 = true;
                 }
                 console.log('ie10:',this.isIE10);
             },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = '';
                } else {
                    this.passwordType = 'password';
                }
            },
            handleReset() {
                // console.log('忘记密码')
                this.getPassVisible = true;
            },
            closegetckey() {
                this.getckeyForm.ckey = '';
            },
            closeGetPass() {
                this.getpass.code = '';
                window.clearInterval(timer);
                this.codeBtn = false;
                this.passinfo = '获取验证码';
                this.$refs['passform'].resetFields();
            },
            closeResetPass() {
                this.resetPassForm.pass1 = '';
                this.resetPassForm.pass2 = '';
            },
            getckey() {
                var vm = this;
                var cform = this.getpass;
                this.$refs.passform.validate((valid) => {
                    if (valid) {
                        vm.$axios.post(path + '/user/getckey', vm.$qs.stringify(cform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            var ret = response.data;
                            if(ret.state==1){
                                vm.ckey = CryptoJS.AES.decrypt(ret.ckey, key, {
                                    iv: iv,
                                    mode: CryptoJS.mode.CBC
                                }).toString(CryptoJS.enc.Utf8);
                                vm.user_id=ret.userid;
                                vm.getckeyVisible = true;
                            }
                            else {

                                vm.$message.error(ret.errmsg);
                            }
                        }).catch(function (error) {
                             vm.$message.error(error.data);
                        });

                    }
                });

            },
            reguser() {
                var vm = this;
                //alert(vm.ckey);
                if (this.getckeyForm.ckey != vm.ckey) {
                    vm.$message({
                        message: '请输入正确的验证码',
                        type: 'error',
                        duration: 2000
                    });
                    return;
                }
                var vm = this;
                var win = window;
                var cform = {'mobile': this.getpass.mobile, 'ckey': this.getckeyForm.ckey};

                vm.$axios.post(path + '/user/reguser', vm.$qs.stringify(cform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    var ret = response.data;
                    if(ret.state==1){
                        vm.$message({
                            message: '验证码已发送,请注意查收',
                            type: 'success',
                            duration: 1500
                        });
                        vm.getckeyVisible = false;
                        vm.hasCode = false;
                        //验证码发送成功
                        vm.time = 60;
                        vm.codeBtn = true;
                        timer = win.setInterval(vm.getCodeBtn, 1000);
                    }
                    else {

                        //更新失败
                        vm.$message({
                            message: ret.errmsg,
                            type: 'error',
                            duration: 4000
                        });
                    }
                }).catch(function (error) {
                     vm.$message.error(error.data);
                });
            },
            getCodeBtn() {
                if (this.time > 0) {
                    this.time -= 1;
                    this.passinfo = this.time + '秒后重发';
                }
                if (this.time == 0) {
                    this.codeBtn = false;
                    this.passinfo = '获取验证码';
                }

            },
            checkCode() {
                var vm = this;
                if (this.getpass.code.length != 4) {
                    vm.$message({
                        message: '请输入正确的验证码',
                        type: 'error',
                        duration: 2000
                    });
                    return;
                }
                var cform = {'mobile': this.getpass.mobile, 'userid': this.getpass.userid, 'code': this.getpass.code};

                vm.$axios.post(path + '/user/checkcode', vm.$qs.stringify(cform), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function (response) {
                        var ret = response.data;
                        if(ret.state==1){
                            //关闭当前对话框
                            vm.getPassVisible = false;
                            //开启充值密码对话框
                            vm.resetPassVisible = true;
                            //vm.user_id = vm.getpass.userid;
                            //alert(vm.getpass.userid+vm.user_id)
                        }
                        else {
                           //更新失败
                           vm.$message({
                             message: ret.errmsg,
                             type: 'error',
                             duration: 4000
                         });
                        }
                    }).catch(function (error) {
                         vm.$message.error(error.data);
                    });
            },
            resetPasss() {
                //alert(this.getpass)
                //重置密码
                var vm = this;
                if (this.resetPassForm.pass1 != this.resetPassForm.pass2) {
                    vm.$message({
                        message: '两次输入密码不同',
                        type: 'error',
                        duration: 2000
                    });
                    return;
                }
                var cform = {'passwd': this.resetPassForm.pass1,'user_id': vm.user_id, 'token': this.token};
                this.$refs.resetpassform.validate((valid) => {
                    if (valid) {

                    vm.$axios.post(path + '/user/resetpwd', vm.$qs.stringify(cform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            var ret = response.data;
                            if(ret.state==1){
                               vm.$message({
                                   message: '密码重置成功!',
                                   type: 'success',
                                   duration: 1500
                               });
                               vm.resetPassVisible = false;
                            }
                            else {
                              vm.$message({
                                  message: '密码重置失败!',
                                  type: 'error',
                                  duration: 3000
                              });
                            }
                        }).catch(function (error) {
                             vm.$message.error(error.data);
                        });
                    }
                });
            },
            setCookie(c_name,c_pwd,exdays) {
                //alert(c_name+c_pwd)
                var exdate=new Date();//获取时间
                exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
                //字符串拼接cookie
                window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
                window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
            },
            getCookie:function () {
                if (document.cookie.length>0) {
                  var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                  for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');//再次切割
                    //判断查找相对应的值
                    if(arr2[0]=='userName'){
                      this.loginForm.username=arr2[1];//保存到保存数据的地方
                      this.checked = true;
                    }else if(arr2[0]=='userPwd'){
                      this.loginForm.password=arr2[1];
                      this.checked = true;
                    }
                  }
                }
              },
              clearCookie:function () {
                  this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
              },

            onSubmit() {
                this.handleSubmit2();
                // this.logining = true;
                // sessionStorage.setItem('user', '{}');
                // sessionStorage.setItem('token', '')
                // this.$router.push({path: '/orderManage_Orders'});
                // this.$router.push({path: '/monthMember_Refill'});
            },
            handleSubmit2: function () {
                var _this = this;
                var pwd = CryptoJS.AES.encrypt(this.loginForm.password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC
                }).toString();
                // console.log(pwd)
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        var _this = this;
                        var loginParams = {'username': this.loginForm.username, 'password': pwd};

                        _this.$axios.post(path + '/user/dologin', _this.$qs.stringify(loginParams), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            console.log(response);
                            let ret = response.data;
                            if (ret.state) {

                                //alert(_this.checked+_this.loginForm.password+_this.loginForm.username);
                                if(_this.checked){
                                    _this.setCookie(_this.loginForm.username,_this.loginForm.password,720);
                                }else{
                                    _this.clearCookie();
                                }
                                var u = ret.user;
                                sessionStorage.setItem('user', JSON.stringify(u));
                                //localStorage.setItem('user', JSON.stringify(u));
                                sessionStorage.setItem('token', ret.token);
                                sessionStorage.setItem('comid', u.comid);
                                localStorage.setItem('comid', u.comid)
                                sessionStorage.setItem('groupid', u.groupid);
                                localStorage.setItem('groupid', u.groupid)
                                sessionStorage.setItem('channelid', u.channelid);
                                sessionStorage.setItem('unionid', u.unionid);
                                sessionStorage.setItem('cityid', u.cityid);
                                sessionStorage.setItem('loginuin', u.loginuin);
                                sessionStorage.setItem('oid', u.oid);
                                sessionStorage.setItem('nickname', u.nickname);
                                sessionStorage.setItem('ishdorder', u.ishdorder);
                                sessionStorage.setItem('loginroleid', u.loginroleid);
                                sessionStorage.setItem('supperadmin', u.supperadmin);
                                sessionStorage.setItem('shopid', u.shopid);

                                // 26集团,,,27渠道,,28联盟,,,29城市,30 车场
                                if (u.oid == ROLE_ID.GROUP) {
                                    // _this.$router.push({path: '/bolinkunion'});
                                } else if (u.oid == ROLE_ID.CITYREGIS) {
                                    _this.$router.push({path: '/CreateUin'});
                                } else if (u.oid == ROLE_ID.CHANNEL) {
                                    // _this.$router.push({path: '/account'});
                                } else if (u.oid == ROLE_ID.UNION) {
                                    // _this.$router.push({path: '/account'});
                                    for (let item in _this.showUnionItem) {
                                        //第一层循环，取出标签的 v-if
                                        for (let p in AUTH_ID_UNION) {
                                            //第二层循环，取出AUTH_ID的item
                                            if (p == item) {
                                                //如果两个item名字相同，则检验登录返回的authlist是否有此项权限
                                                _this.showUnionItem[item] = common.pageShow(u, AUTH_ID_UNION[p]);
                                                if (_this.highlightindex == '') {
                                                    //没有导航到任意界面，则继续检测
                                                    if (item.indexOf('_') > -1) {
                                                        //带下划线的才是页面
                                                        if (_this.showUnionItem[item]) {
                                                            _this.highlightindex = '/' + item;
                                                            _this.expandindex = '/' + item.split('_')[0];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    sessionStorage.setItem('showUnionItem', JSON.stringify(_this.showUnionItem));
                                    // console.log(_this.showUnionItem)
                                    if (_this.highlightindex == '') {
                                        _this.$router.push({path: '/index'});
                                    } else {
                                        // _this.highlightindex = '/data_Center';//先写死跳转到数据中心。后面权限加上了这句就注释掉
                                        _this.$router.push({path: _this.highlightindex});
                                        sessionStorage.setItem('highlightindex', _this.highlightindex);
                                    }
                                } else if (u.oid == ROLE_ID.CITY) {
                                    _this.highlightindex = '/union_manage';
                                    _this.$router.push({path: _this.highlightindex});
                                    sessionStorage.setItem('highlightindex', _this.highlightindex);
                                    // _this.$router.push({path: '/Park_Manage'});
                                } else if (u.oid == ROLE_ID.SHOP) {
                                      _this.highlightindex = '/shop';
                                      _this.$router.push({path: _this.highlightindex});
                                      sessionStorage.setItem('highlightindex', _this.highlightindex);
                                      // _this.$router.push({path: '/Park_Manage'});
                                } else if (u.oid == ROLE_ID.BOSS) {
                                    _this.highlightindex = '/city_manage';
                                    _this.$router.push({path: _this.highlightindex});
                                    sessionStorage.setItem('highlightindex', _this.highlightindex);
                                    //_this.$router.push({path: '/City_Manage'});
                                } else if (u.oid == ROLE_ID.PARK) {
                                    //先跳转空页面，然后再根据数据情况显示页面再跳转
                                    // _this.$router.push({path: '/index'});
                                    // _this.$router.push({path: '/orderManage_Orders'});
                                    for (let item in _this.showParkItem) {
                                        //第一层循环，取出标签的 v-if
                                        for (let p in AUTH_ID) {
                                            //第二层循环，取出AUTH_ID的item
                                            if (p == item) {
                                                //如果两个item名字相同，则检验登录返回的authlist是否有此项权限
                                                _this.showParkItem[item] = common.pageShow(u, AUTH_ID[p]);
                                                if (_this.highlightindex == '') {
                                                    //没有导航到任意界面，则继续检测
                                                    if (item.indexOf('_') > -1) {
                                                        //带下划线的才是页面
                                                        if (_this.showParkItem[item]) {
                                                            _this.highlightindex = '/' + item;
                                                            _this.expandindex = '/' + item.split('_')[0];
                                                        }
                                                    }
                                                }

                                            }
                                        }
                                    }

                                    sessionStorage.setItem('showParkItem', JSON.stringify(_this.showParkItem));
                                    // console.log(_this.showParkItem)
                                    if (_this.highlightindex == '') {
                                        _this.$router.push({path: '/index'});
                                    } else {
                                        // _this.highlightindex = '/data_Center_park';//先写死跳转到数据中心。后面权限加上了这句就注释掉
                                        _this.$router.push({path: _this.highlightindex});
                                        sessionStorage.setItem('highlightindex', _this.highlightindex);
                                    }
                                }
                                // 还有一种没有roleid,它是根据另一种判断登录的
                                //role: 0总管理员，1停车场后台管理员 ，2车场收费员，3财务，4车主  5市场专员 6录入员
                                else if (u.role == 0) {

                                } else if (u.role == 1) {

                                } else if (u.role == 2) {

                                } else if (u.role == 3) {

                                } else if (u.role == 4) {

                                } else if (u.role == 5) {

                                } else if (u.role == 6) {

                                }
                            } else {
                                _this.logining = false;
                                _this.$message.error(ret.msg);
                            }
                        }).catch(function (error) {
                            _this.$message.error(error.data);
                        });
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .keyCode{
            background:url(../assets/code.png);
            font-family:Arial;
            font-style:italic;
            color:blue;
            font-size:30px;
            border:0;
            padding:2px 3px;
            letter-spacing:3px;
            font-weight:bolder;
            float:left;
            cursor:pointer;
            width:100px;
            height:36px;
            line-height:36px;
            text-align:center;
            vertical-align:middle;
        }
</style>
<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 75%;
            input {
                background: $bg;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 20px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;

            color: $bg;
            background-color: $bg;
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    @import "../styles/mixin.scss";

    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        @include relative;
        height: 100vh;
        justify-content: center;
        background-color: $bg;
        .login-form {

            left: 0;
            right: 0;
            width: 450px;

            padding-bottom: 100px;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 0px 0px 0px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                font-weight: 400;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }


    }
</style>
