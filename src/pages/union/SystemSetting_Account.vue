<template>
    <section :style="style">

        <el-row>
            <!--<el-col> 历史总收入:0.00，账号当前余额：0.00，账号可提现余额：0.00</el-col>-->
            <el-col style="margin-left: 10px;">
                <el-button type="primary" @click="saveModify">保存信息</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:28px">
            <el-col :span="10" style="padding: 10px">
                <el-card style="height:200px">
                    <div>运营集团信息</div>
                    <div>
                        <el-row>
                            <el-form style="width:90%;margin-top: 20px;" label-width="100px">
                                <el-form-item label="编号">
                                    <el-input :readonly="paridreadonly" v-model="group.id"></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="group.name"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="车场类型">-->
                                <!--<el-input v-model="group.type"></el-input>-->
                                <!--</el-form-item>-->
                            </el-form>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <!--<el-col :span="10" style="padding: 10px">-->
            <!--<el-card style="height:380px">-->
            <!--<div>我的账户信息</div>-->
            <!--<div>-->
            <!--<el-row>-->
            <!--<el-form style="width:90%;margin-top: 20px;" label-width="100px">-->
            <!--<el-form-item label="姓名">-->
            <!--<el-input v-model="group.nickname"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="电话">-->
            <!--<el-input v-model="group.phone"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="手机">-->
            <!--<el-input v-model="group.mobile"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="新密码">-->
            <!--<el-input v-model="group.newpass"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="确认密码">-->
            <!--<el-input v-model="group.confirmpass"></el-input>-->
            <!--</el-form-item>-->

            <!--</el-form>-->
            <!--</el-row>-->
            <!--</div>-->
            <!--</el-card>-->
            <!--</el-col>-->

        </el-row>
        <el-row style="margin-top:28px">
            <el-col :span="10" style="padding: 10px">
                <el-card style="height:380px">
                    <div>我的账户信息</div>
                    <div>
                        <el-row>
                            <el-form style="width:90%;margin-top: 20px;" label-width="100px" :rules="rules"
                                     ref="group" :model="group">
                                <el-form-item label="姓名">
                                    <el-input v-model="group.nickname"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" :prop="phone">
                                    <el-input v-model="group.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="手机" :prop="mobile">
                                    <el-input v-model="group.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input v-model="group.newpass" type="password"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input v-model="group.confirmpass" type="password"></el-input>
                                </el-form-item>

                            </el-form>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </section>

</template>

<script>
    import {path, checkTelePhone,checkMobile} from '../../api/api';
    import common from '../../common/js/common';

    export default {
        components: {},
        data() {
            return {
                paridreadonly: true,
                queryapi: '/group/query',
                editapi: '/group/edit',
                bodyloading: false,
                group: {},
                style: '',
                mobile: 'mobile',
                phone: 'phone',
                rules: {
                    mobile: [
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkTelePhone, trigger: 'blur'}
                    ]
                },
                AccountForm: {}

            };
        },
        methods: {
            getInfo: function () {
                this.bodyloading = true;
                let qform = {};
                qform.groupid = common.attachParams('groupid', 1);
                qform.cityid = common.attachParams('cityid', 1);
                qform.loginuin = common.attachParams('loginuin', 1);
                let vm = this;

                vm.$axios.post(path + vm.queryapi, vm.$qs.stringify(qform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;

                    vm.bodyloading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 150);
                    } else {
                        // console.log(ret);
                        // vm.accountinfo = ret
                        vm.group = ret.group;
                        vm.group.nickname = ret.user.nickname;
                        vm.group.phone = ret.user.phone;
                        vm.group.mobile = ret.user.mobile;
                    }

                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },
            saveModify: function () {
                // this.$ref.AccountForm.validate((valid) => {
                        this.$refs.group.validate((valid) => {
                    if (valid) {


                        this.bodyloading = true;
                        if (this.group.newpass === undefined || this.group.newpass.length < 1) {
                            this.$message({
                                message: '请填写密码!',
                                type: 'error',
                                duration: 2000
                            });
                            return;
                        }
                        if (this.group.newpass !== this.group.confirmpass) {
                            this.$message({
                                message: '两次填写的密码不一致!',
                                type: 'error',
                                duration: 2000
                            });
                            return;
                        }
                        if (this.group.newpass.length < 6) {
                            this.$message({
                                message: '密码长度不应小于6位!',
                                type: 'error',
                                duration: 2000
                            });
                            return;
                        }
                        let vm = this;
                        vm.group.loginuin = common.attachParams('loginuin', 1);
                        vm.group.nickname1 = common.attachParams('nickname1', 1);
                        vm.group.groupid = common.attachParams('groupid', 1);
                        vm.$axios.post(path + vm.editapi, vm.$qs.stringify(vm.group), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.bodyloading = false;
                            if (ret.validate != 'undefined' && ret.validate == '0') {
                                vm.loading = false;
                                //未携带令牌.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('未携带令牌,请重新登录!');
                                }, 150);
                            } else if (ret.validate != 'undefined' && ret.validate == '1') {
                                vm.loading = false;
                                //过期.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录过期,请重新登录!');
                                }, 150);
                            } else if (ret.validate != 'undefined' && ret.validate == '2') {
                                vm.loading = false;
                                //令牌无效.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录异常,请重新登录!');
                                }, 150);
                            } else {
                                if (ret > 0 || ret.state == 1) {
                                    //更新成功
                                    vm.getInfo();
                                    vm.$message({
                                        message: '保存成功!',
                                        type: 'success',
                                        duration: 1500
                                    });
                                    vm.resetPwdVisible = false;
                                    vm.resetloading = false;
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: '保存失败!',
                                        type: 'error',
                                        duration: 2000
                                    });
                                }

                            }
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    }
                });
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        this.$router.push('/login');
                    }
                });
            }

        },
        mounted() {

        },
        activated(){
            this.getInfo();
            this.tableheight = common.gwh() - 100;
            this.style = 'padding: 10px;overflow-y: auto;height: ' + this.tableheight + 'px;';
        }
    };
</script>

<style scoped>

</style>