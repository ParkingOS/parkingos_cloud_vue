<template>
    <div class="login-wrapper" :style="{'background': 'url('+loginBg+'),#112068 no-repeat','background-size': '100% 100%',
        'background-position': 'center center'}">

        <div class="header-wrapper">
            <div class="logo" :style="{'background':'url('+logoImg+') no-repeat','background-size': '100% 100%',
        'background-position': 'center center'}"></div>
            <div class="logo-title" :style="{'background':'url('+logoTipImg+') no-repeat','background-size': '100% 100%',
        'background-position': 'center center'}"></div>
        </div>

        <div class="main-wrapper">
            <div class="login" v-if="loginShow">
                <p class="login-title">用户登录</p>
                <el-form ref="form" :model="loginForm" class="login-form">
                    <el-form-item>
                        <div :class="userError?'login-item-wrapper username-error':'login-item-wrapper'">
                            <div class="error-tip">{{userErrorTip}}</div>
                            <div class="img-wrapper">
                                <img :src="userImg">
                            </div>
                            <el-input v-model="loginForm.username" @change="changeInputUser" placeholder="请输入账号"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div :class="passError?'login-item-wrapper password-error':'login-item-wrapper'">
                            <div class="error-tip">{{passErrorTip}}</div>
                            <div class="img-wrapper">
                                <img :src="passImg" class="img-pass">
                            </div>
                            <el-input v-model="loginForm.password"
                                      @change="changeInputPass"
                                      @keyup.enter.native="handleSubmit2"
                                      :type="eyeState?'password':'input'"
                                      placeholder="请输入密码" >
                                <img :src="eyeState?eyeImgHide:eyeImgShow" style="cursor: pointer" slot="suffix" @click="eyeChange">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="login-btn">
                            <el-button class="custom-btn" :loading="logining" @click.native.prevent="handleSubmit2">登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="login-expand">
                    <!--:style="{'background':'url('+checkedImg+')',}"-->
                    <div class="remember" @click="checkedPass"><i :class="checked?'checked-password':'unchecked-password'"></i>记住密码</div>
                    <div class="forget" @click="handleReset">忘记密码?</div>
                </div>
            </div>
            <div class="update-pass" v-show="getPassVisible">
                <div class="update-title">{{updataPass1?'找回密码':'修改密码'}}</div>
                <img :src="closeImg" class="close-update" @click="closeFn">
                <!--修改密码第一步-->
                <el-form ref="form" :model="getpass" class="updata-form" v-show="updataPass1">
                    <el-form-item style="margin-top: 25px">
                        <div :class="userError?'login-item-wrapper username-error':'login-item-wrapper'">
                            <div class="error-tip">{{userErrorTip}}</div>
                            <div class="img-wrapper">
                                <img :src="userImg">
                            </div>
                            <el-input v-model="getpass.userid" placeholder="请输入账号" @change="changeInputUser"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-top: 25px">
                        <div :class="mobileError?'login-item-wrapper password-error':'login-item-wrapper'">
                            <div class="error-tip">{{mobileErrorTip}}</div>
                            <div class="img-wrapper">
                                <img :src="mobileImg" class="img-mobile">
                            </div>
                            <el-input v-model="getpass.mobile" placeholder="请输入密保手机号" @change="changeInputMobile">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item style="position: relative;margin-top: 25px">
                        <div :class="vcodeError?'login-item-wrapper vcode-error':'login-item-wrapper'" style="width: 152px;padding-right: 0">
                            <div class="error-tip">{{vcodeErrorTip}}</div>
                            <div class="img-wrapper">
                                <img :src="vcodeImg" class="img-vcode">
                            </div>
                            <el-input v-model="getpass.code" placeholder="请输入验证码" class="code-class" @change="changeInputVcode" ></el-input>
                        </div>
                        <div class="getcode"
                             @click="getckey"
                             v-if="!readSecond">获取验证码</div>
                        <!--<div class="getcode" @click="getckey" v-if="!readSecond">获取验证码</div>-->
                        <div class="getcode dis-getcode" v-else><span class="timer">{{time}}</span> S</div>
                    </el-form-item>
                    <el-form-item style="margin-top: 25px">
                        <div class="login-btn">
                            <el-button class="custom-btn" :loading="loading" @click="checkCode">下一步</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <!--修改密码第二步-->
                <el-form ref="form" :model="resetPassForm" class="updata-form" v-show="updataPass2">
                    <el-form-item>
                        <div :class="passError?'login-item-wrapper password-error':'login-item-wrapper'">
                            <div class="img-wrapper">
                                <img :src="passImg" class="img-pass">
                            </div>
                            <el-input v-model="resetPassForm.pass1" type="password" placeholder="新密码" ></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div :class="passError?'login-item-wrapper password-error':'login-item-wrapper'">
                            <div class="img-wrapper">
                                <img :src="passImg" class="img-pass">
                            </div>
                            <el-input v-model="resetPassForm.pass2" type="password" placeholder="确认密码" ></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item style="font-size: 16px;color: #F57272;text-align: center">
                        <div class="error-tip" v-if="passDiff">{{passErrorTip}}</div>
                        <div class="amend-success" v-if="countDownShow">
                            密码修改成功<span class="count-down">{{countDown}}s</span><span class="back"  @click="closeFn">返回登录</span>
                        </div>
                    </el-form-item>
                    <el-form-item style="position:absolute;bottom: 30px">
                        <div class="login-btn">
                            <el-button v-if="countDownShow" class="custom-btn" :loading="loading">确认修改</el-button>
                            <el-button v-else class="custom-btn" :loading="loading" @click.native.prevent="resetPasss">确认修改</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import CryptoJS from 'crypto-js';
    import {path, checkPass} from '../api/api';
    import MD5 from 'crypto-js/md5';
    import common from '../common/js/common';
    import {ROLE_ID, AUTH_ID, AUTH_ID_UNION, showUnionItem_const, showParkItem_const,showShopItem_const,AUTH_ID_SHOP} from '../common/js/const';

    var key = CryptoJS.enc.Utf8.parse('zldboink20170613');
    var iv = CryptoJS.enc.Utf8.parse('zldboink20170613');
    var timer,timer2;
    var obtainValidation = undefined;
    // import SvgIcon from '../components/SvgIcon/index.vue'// svg组件
    export default {
        // components: {svgicon: SvgIcon},
        data() {
            return {
                loginShow:true,
                passDiff:false,
                updataPass1:true,
                updataPass2:false,
                second:30,
                countDown:5,
                countDownShow:false,
                readSecond:false,
                vcodeError:false,
                vcodeErrorTip:'请输入验证码',
                mobileError:false,
                mobileErrorTip:'请输入手机号',
                userErrorTip:'账号错误',
                userError:false,
                passErrorTip:'密码错误',
                passError:false,
                eyeState:true,
                userImg:require('../assets/images/user.png'),
                passImg:require('../assets/images/password.png'),
                eyeImg:require('../assets/images/eye-hide.png'),
                eyeImgHide:require('../assets/images/eye-hide.png'),
                eyeImgShow:require('../assets/images/eye-show.png'),
                checkedImg:require('../assets/images/checked.png'),
                closeImg:require('../assets/images/close.png'),
                mobileImg:require('../assets/images/mobile.png'),
                vcodeImg:require('../assets/images/vcode.png'),
                loginBg:require('../assets/images/bgImg.jpg'),
                logoImg:require('../assets/images/logo.png'),
                logoTipImg:require('../assets/images/bgtext.png'),
                ///////////////////////////////////////////////////////////////
                expandindex: '',   //'/order',//展开的sub_menu
                highlightindex: '',//'/orderManage_Poles',//高亮的item
                //根据权限控制页面是否显示
                showParkItem: showParkItem_const,
                showUnionItem: showUnionItem_const,
                showShopItem:showShopItem_const,
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
                time: 30,


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
            // document.addEventListener('keydown', function (e) {
            //     if (e.keyCode == 13) {
            //         console.log('按下回车',vm.loginShow)
            //         if(vm.loginShow){
            //             vm.handleSubmit2();
            //         }
            //
            //     }
            // }, false);
            vm.iEVersionCheck();
            obtainValidation = new TencentCaptcha('2043299115',function (res) {
                if(res.ret === 0){
                    vm.time = 30;
                    vm.readSecond = true;
                    timer = window.setInterval(vm.getCodeBtn, 1000);
                    vm.getVCode(vm,res)
                }

            })
        },

        created(){
            this.getCookie()
        },
        methods: {
            getVCode(vm,res){
                let cform = {};
                cform.mobile = vm.getpass.mobile;
                cform.userid = vm.user_id;
                cform.ticket = res.ticket;
                cform.randstr = res.randstr;
                vm.$axios.post(path + '/user/sendcode', vm.$qs.stringify(cform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    var ret = response.data;
                    if(ret.state==1){
                        vm.$message.success('验证码已发送，请注意查收');
                    }
                    else {
                        vm.time = 30;
                        vm.readSecond = false;
                        window.clearInterval(timer);
                        vm.mobileErrorTip = ret.errmsg;
                        vm.mobileError = true;
                    }
                }).catch(function (error) {
                    vm.$message.error(error.data);
                });
            },
            resetPasss() {
                let vm = this;
                let vpass = /^(\w){6,12}$/;
                //密码为6-12位字母,数字或下划线
                //重置密码
                if(this.resetPassForm.pass1 == ''){
                    this.passError = true;
                    this.passDiff = true;
                    this.passErrorTip = '密码不能为空'
                }else if(!vpass.test(this.resetPassForm.pass1)){
                    this.passError = true;
                    this.passDiff = true;
                    this.passErrorTip = '密码为6-12位字母,数字或下划线'
                }
                else if(this.resetPassForm.pass1 != this.resetPassForm.pass2){
                    this.passError = true;
                    this.passDiff = true;
                    this.passErrorTip = '两次输入密码不相同'
                }else{
                    vm.loading = true;
                    var cform = {'passwd': this.resetPassForm.pass1,'user_id': vm.user_id, 'token': vm.token};
                    vm.$axios.post(path + '/user/resetpwd', vm.$qs.stringify(cform), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function (response) {
                        vm.loading = false;
                        var ret = response.data;
                        if(ret.state==1){
                            vm.passError = false;
                            vm.passDiff = false;
                            vm.countDownShow = true;
                            timer2 = setInterval(function () {
                                if(vm.countDown == 0){
                                    vm.countDown = 5;
                                    vm.closeFn(vm)
                                }
                                vm.countDown --;

                            },1000)
                        }
                        else {
                            vm.passError = true;
                            vm.passDiff = true;
                            vm.passErrorTip = '密码修改失败'
                        }
                    }).catch(function (error) {
                        vm.$message.error(error.data);
                    });
                }
            },
            changeInputVcode(){
                this.vcodeError = false;
            },
            changeInputMobile(){
                this.mobileError = false;
            },
            changeInputUser(){
                this.userError = false;
            },
            changeInputPass(){
                this.passError = false;
            },
            checkedPass(){
                this.checked = !this.checked;
            },
            eyeChange(){
                this.eyeState = !this.eyeState;
            },
            getCodeBtn() {
                if (this.time > 0) {
                    this.time -= 1;
                }
                if (this.time == 0) {
                    this.readSecond = false;
                }
            },
            handleReset() {
                // console.log('忘记密码')
                this.loginShow = false;
                this.userError = false;
                this.passError = false;
                this.getPassVisible = true;
            },
            closeFn(){
                this.loginShow = true;
                this.userError = false;
                this.passError = false;
                this.userErrorTip = '';
                this.passErrorTip = '';
                this.passDiff = false;
                this.mobileError = false;
                this.mobileErrorTip = '';
                this.vcodeError = false;
                this.vcodeErrorTip = '';
                this.updataPass1 = true;
                this.updataPass2 = false;
                this.getPassVisible = false;
                this.second = 30;
                this.countDown = 5;
                this.countDownShow = false;
                this.readSecond = false;

                this.getpass = {
                    user_type: '',
                    userid: '',
                    mobile: '',
                    code: ''
                };
                this.resetPassForm = {
                    pass1: '',
                    pass2: '',
                }
                clearInterval(timer)
                clearInterval(timer2)
            },
            //////////////////////////////////////////////////////////////////////
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
                let vMobile = /^1[3456789]\d{9}$/;

                if(cform.userid != "" && vMobile.test(cform.mobile)){
                    vm.$axios.post(path + '/user/getckey', vm.$qs.stringify(cform), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function (response) {
                        var ret = response.data;
                        if(ret.state==1){
                            vm.user_id= ret.userid;
                            obtainValidation.show();
                        }
                        else {
                            vm.time = 30;
                            vm.readSecond = false;
                            window.clearInterval(timer);
                            vm.mobileErrorTip = ret.errmsg;
                            vm.mobileError = true;
                        }
                    }).catch(function (error) {
                        vm.$message.error(error.data);
                    });
                }else{
                    if(cform.userid == ''){
                        this.userError = true;
                        this.userErrorTip = '请输入账号';
                    }else if(cform.mobile == ''){
                        this.mobileError = true;
                        this.mobileErrorTip = '请输入手机号';
                    }else if(!vMobile.test(cform.mobile)){
                        this.mobileError = true;
                        this.mobileErrorTip = '无效手机号';
                    }
                }
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

            checkCode(){
                let that = this;
                let vMobile = /^1[3456789]\d{9}$/;
                let uform = this.getpass;
                let vcode = (uform.code.length == 4)?true:false;
                if(uform.userid !='' && vMobile.test(uform.mobile) && vcode){
                    that.loading = true;
                    var cform = {'mobile': this.getpass.mobile, 'userid': this.getpass.userid, 'code': this.getpass.code};
                    that.$axios.post(path + '/user/checkcode', that.$qs.stringify(cform), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function (response) {
                        that.loading = false;
                        var ret = response.data;
                        if(ret.state==1){
                            that.updataPass1 = false;
                            that.updataPass2 = true;
                        }
                        else {
                            that.vcodeError = true;
                            that.vcodeErrorTip = '验证码错误';
                        }
                    }).catch(function (error) {
                        that.$message.error(error.data);
                    });
                }else{
                    if(uform.userid == ''){
                        this.userError = true;
                        this.userErrorTip = '请输入账号';
                    }else if(uform.mobile == ''){
                        this.mobileError = true;
                        this.mobileErrorTip = '请输入手机号';
                    }else if(!vMobile.test(uform.mobile)){
                        this.mobileError = true;
                        this.mobileErrorTip = '无效手机号';
                    }
                    else if(uform.code == ''){
                        this.vcodeError = true;
                        this.vcodeErrorTip = '请输入验证码';
                    }else if(uform.code.length != 4){
                        this.vcodeError = true;
                        this.vcodeErrorTip = '验证码错误';
                    }
                }
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
                this.userError = false;
                this.passError = false;
                var _this = this;
                var pwd = CryptoJS.AES.encrypt(this.loginForm.password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC
                }).toString();
                if(this.loginForm.username != '' && this.loginForm.password != ''){
                    sessionStorage.clear();
                    this.logining = true;
                    var _this = this;
                    var loginParams = {'username': this.loginForm.username, 'password': pwd};
                    _this.$axios.post(path + '/user/dologin', _this.$qs.stringify(loginParams), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function (response) {
                        let ret = response.data;
                        if (ret.state) {
                            if(_this.checked){
                                _this.setCookie(_this.loginForm.username,_this.loginForm.password,720);
                            }else{
                                _this.clearCookie();
                            }
                            var u = ret.user;
                            if(u.authlist==""){
                                _this.$message.error("没有权限");
                                _this.logining = false;
                                return;
                            }
                            sessionStorage.setItem('user', JSON.stringify(u));
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
                            sessionStorage.setItem('nickname1', u.nickname);

                            // 26集团,,,27渠道,,28联盟,,,29城市,30 车场
                            if (u.oid == ROLE_ID.GROUP) {
                                // _this.$router.push({path: '/bolinkunion'});
                            }
                            // else if (u.oid == ROLE_ID.CITYREGIS) {
                            //     _this.$router.push({path: '/CreateUin'});
                            // }
                            // else if (u.oid == ROLE_ID.CHANNEL) {
                            //     // _this.$router.push({path: '/account'});
                            // }
                            else if (u.oid == ROLE_ID.UNION) {
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
                                if (_this.highlightindex == '') {
                                    _this.$router.push({path: '/index_Union'});
                                } else {
                                    // _this.highlightindex = '/data_Center';//先写死跳转到数据中心。后面权限加上了这句就注释掉
                                    _this.$router.push({path: _this.highlightindex});
                                    sessionStorage.setItem('highlightindex', _this.highlightindex);
                                }
                            }
                            else if (u.oid == ROLE_ID.CITY) {
                                for(let item in showShopItem_const){
                                    showShopItem_const[item] = false;
                                }
                                sessionStorage.removeItem('showShopItem');
                                _this.highlightindex = '/union_manage';
                                _this.$router.push({path: _this.highlightindex});
                                sessionStorage.setItem('highlightindex', _this.highlightindex);
                            }
                            else if (u.oid == ROLE_ID.SHOP) {
                                //alert(JSON.stringify(u.authlist))
                                for (let item in _this.showShopItem) {
                                    //第一层循环，取出标签的 v-if
                                    for (let p in AUTH_ID_SHOP) {
                                        //第二层循环，取出AUTH_ID的item
                                        //alert(p)
                                        if (p == item) {
                                            //如果两个item名字相同，则检验登录返回的authlist是否有此项权限
                                            _this.showShopItem[item] = common.pageShow(u, AUTH_ID_SHOP[p]);
                                            if (_this.highlightindex == '') {
                                                //没有导航到任意界面，则继续检测
                                                //带下划线的才是页面
                                                if (_this.showShopItem[item]) {
                                                    if(item=="member"){

                                                    }else{
                                                        _this.highlightindex = '/'+item;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if(u.use_fix_code==0){
                                    _this.showShopItem['fixCode']=false;
                                }
                                sessionStorage.setItem('showShopItem', JSON.stringify(_this.showShopItem));
                                //alert(JSON.stringify(_this.showShopItem))
                                //_this.highlightindex = '/shop';
                                _this.$router.push({path: _this.highlightindex});
                                sessionStorage.setItem('highlightindex', _this.highlightindex);
                                // _this.$router.push({path: '/Park_Manage'});
                            }
                            else if (u.oid == ROLE_ID.BOSS) {
                                for(let item in showShopItem_const){
                                    showShopItem_const[item] = false;
                                }
                                sessionStorage.removeItem('showShopItem');
                                _this.highlightindex = '/city_manage';
                                _this.$router.push({path: _this.highlightindex});
                                sessionStorage.setItem('highlightindex', _this.highlightindex);
                            }
                            else if (u.oid == ROLE_ID.PARK) {
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

                            }else{
                                _this.$message({
                                    message: '无登录权限',
                                    type: 'warning',
                                    duration:6000,
                                    showClose:true
                                });
                                _this.logining = false;
                            }
                        } else {
                            _this.logining = false;
                            if(ret.state == false){
                                _this.userError = true;
                                _this.userErrorTip = '账号错误';
                                _this.passError = true;
                                _this.passErrorTip = '密码错误';
                            }
                        }
                    }).catch(function (error) {
                        _this.$message.error(error.data);
                    });
                }else{
                    if(this.loginForm.username == ''){
                        this.userError = true;
                        this.userErrorTip = '账号不能为空';

                    }else if(this.loginForm.password == ''){
                        this.passError = true;
                        this.passErrorTip = '密码不能为空';
                    }
                }

            }
            //     });
            // }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .login-wrapper{
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        /*background: url("../assets/images/bgImg.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        /*background-position: center center;*/
        .header-wrapper{
            position: absolute;
            top:27%;
            left: 18%;
            width: 285px;
            height: 64px;
            .logo{
                display: inline-block;
                width: 64px;
                height: 64px;
                /*background: url("../assets/images/logo.png") no-repeat;*/
                /*background-size: 100% 100%;*/
                /*background-position: center center;*/
                margin-right: 19px;
            }
            .logo-title{
                display: inline-block;
                width: 198px;
                height: 64px;
                /*background: url("../assets/images/bgtext.png") no-repeat;*/
                /*background-size: 100% 100%;*/
                /*background-position: center center;*/
            }
        }
        .main-wrapper{
            position: absolute;
            top:25%;
            right: 18%;
            width: 360px;
            height: 365px;
            background: #FFFFFF;
            box-shadow: 0 2px 18px 0 rgba(0,0,0,0.13);
            border-radius: 3px;
            overflow: hidden;
            .login{
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Chrome/Safari/Opera */
                -khtml-user-select: none; /* Konqueror */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently not supported by any browser */
                .login-title{
                    width: 80px;
                    height: 26px;
                    font-family: SFNSDisplay;
                    font-size: 20px;
                    color: #292929;
                    margin: 24px 29px 8px 29px;
                }
                .login-form{
                    margin: 0 29px;
                    .el-form-item{
                        margin: 0;
                        margin-top: 30px;
                        .login-btn{
                            margin-top: 17px;
                            margin-bottom: 25px;
                            width: 304px;
                            height: 46px;
                            background: #3C75CF;
                            box-shadow: 0 8px 17px 0 rgba(51,121,233,0.30);
                            border-radius: 2px;
                            color: #fff;
                            .custom-btn{
                                width: 100%;
                                height: 100%;
                                background: rgba(0,0,0,0);
                                color: #fff;
                                font-size: 18px;
                                border:none;
                                letter-spacing:2px;
                            }
                            /*margin: 0 28px;*/
                        }
                    }
                }
                .login-expand{
                    width: 304px;
                    height: 20px;
                    line-height: 20px;
                    margin: 0 28px;
                    &>div{
                        font-size: 14px;
                        color: #999999;
                    }
                    .remember{
                        float: left;
                        height: 20px;
                        line-height: 20px;
                        display: flex;
                        cursor: pointer;
                        .unchecked-password{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background: #FBFEFF;
                            border: 1px solid #E6E6E6;
                            border-radius: 2px;
                            margin-right: 14px;
                            cursor: pointer;
                        }
                        .checked-password{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background: url(../assets/images/checked.png),#3379E9;
                            background-size: 9px 7px;
                            background-position: center center;
                            background-repeat: no-repeat;
                            border: 1px solid #E6E6E6;
                            border-radius: 2px;
                            margin-right: 14px;
                            cursor: pointer;
                        }
                    }
                    .forget{
                        float: right;
                        cursor: pointer;
                    }
                }
            }
            .update-pass{
                position: absolute;
                top:0;
                left: 0;
                z-index: 3;
                width: 100%;
                height: 100%;
                background: #fff;
                .close-update{
                    position: absolute;
                    right: 35px;
                    top:20px;
                    cursor: pointer;
                }
                .update-title{
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    font-family: SFNSDisplay;
                    font-size: 20px;
                    color: #292929;
                    margin: 16px 29px 0px 29px;
                }
                .updata-form{
                    margin: 0 29px;
                    .el-form-item{

                        margin: 0;
                        margin-top: 30px;





                        .login-btn{
                            /*margin-top: 17px;*/
                            /*margin-bottom: 25px;*/
                            width: 304px;
                            height: 46px;
                            background: #3C75CF;
                            box-shadow: 0 8px 17px 0 rgba(51,121,233,0.30);
                            border-radius: 2px;
                            color: #fff;
                            .custom-btn{
                                width: 100%;
                                height: 100%;
                                background: rgba(0,0,0,0);
                                color: #fff;
                                font-size: 18px;
                                border:none;
                                letter-spacing:2px;
                            }
                            /*margin: 0 28px;*/
                        }
                    }
                }
            }
            .login-item-wrapper{
                display: flex;
                align-items:center;
                background: #FBFEFF;
                border: 1px solid #E6E6E6;
                border-radius: 2px;
                padding: 0 16px 0 0;
                height: 46px;
                line-height: 26px;
                .error-tip{
                    display: none;
                }
                .img-wrapper{
                    position: relative;
                    /*display: flex;*/
                    /*align-items:center;*/
                    /*justify-content:center;*/
                    width: 43px;
                    height: 21px;
                    line-height: 21px;
                    border-right: 1px solid rgba(151,151,151,0.12);
                    text-align: center;
                    img{
                        position: absolute;
                        left: 50%;
                        top:50%;
                        transform: translate(-50%,-50%);
                        display: inline-block;
                        width: 21px;
                        height: 21px;
                    }
                    .img-pass{
                        display: inline-block;
                        width: 15px;
                        height: 19px;
                    }
                    .img-mobile{
                        display: inline-block;
                        width: 14px;
                        height: 20px;
                    }
                    .img-vcode{
                        display: inline-block;
                        width: 17px;
                        height: 14px;
                    }
                }

                .el-input{
                    border:none;
                    color: #999;
                    .el-input__inner{
                        border:none;
                        font-size: 16px;
                        height: 26px;
                        line-height: 26px;
                    }
                }
                .code-class{
                    .el-input__inner{
                        padding: 0 10px;
                    }
                }
            }
            .getcode{
                position: absolute;
                right: 0;
                top:0;
                width: 112px;
                height: 46px;
                text-align: center;
                line-height: 46px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #FFFFFF;
                background: #90BBFF;
                border-radius: 2px;
                cursor: pointer;

            }
            .dis-getcode{
                background: #C0C1C2;
                cursor: default;
                .timer{
                    font-size: 16px;
                    color: #fff;
                }
            }
            .username-error{
                position: relative;
                background: #FBFEFF;
                border: 1px solid #F57272;
                border-radius: 2px;
                transition: all 0.5s;
                .error-tip{
                    display: block;
                    position: absolute;
                    top:-25px;
                    left: 0;
                    font-size: 14px;
                    color: #F57272;
                }
            }
            .password-error{
                position: relative;
                background: #FBFEFF;
                border: 1px solid #F57272;
                border-radius: 2px;
                transition: all 0.5s;
                .error-tip{
                    display: block;
                    position: absolute;
                    top:-25px;
                    left: 0;
                    font-size: 14px;
                    color: #F57272;
                }
            }
            .vcode-error{
                position: relative;
                background: #FBFEFF;
                border: 1px solid #F57272;
                border-radius: 2px;
                transition: all 0.5s;
                .error-tip{
                    display: block;
                    position: absolute;
                    top:-25px;
                    left: 0;
                    font-size: 14px;
                    color: #F57272;
                }
            }
            .amend-success{
                margin: 0 auto;
                width: 226px;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #3B3B3B;
                background: rgba(216,216,216,0.27);
                border-radius: 4px;
                .count-down{
                    margin: 0 5px;
                }
                .back{
                    font-size: 16px;
                    color: #2A75D6;
                    cursor: pointer;
                }
            }
        }
    }

</style>
