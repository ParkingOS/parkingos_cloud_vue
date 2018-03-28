<template>
    <section style="padding: 50px;"  >

        <p>欢迎使用ParkingOS开源停车云平台，请完整填写下面资料，如车场需和泊链平台做数据交互，请务必填写泊链厂商编号和厂商秘钥，否则后续新建车场无法与泊链连接。</p>

        <el-row style="margin-top:100px;margin-left: 160px;"  >
            <div>
                <el-row>
                    <el-form style="width:50%;margin-top: 20px;" label-width="180px" :rules="addFormRules">
                        <el-form-item label="厂商名称" :prop="name">
                            <el-input  v-model="unionname"></el-input>
                        </el-form-item>
                        <el-form-item label="泊链厂商编号" :prop="union_id">
                            <el-input v-model="unionid"></el-input>
                        </el-form-item>
                        <el-form-item label="泊链厂商秘钥" :prop="ukey">
                            <el-input v-model="u_key"></el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </el-row>

        <el-row>
            <el-col style="margin-left: 33px;" align="middle">
                <el-button  @click="saveModify" >保存信息</el-button>
            </el-col>
        </el-row>

    </section>

</template>

<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common'
    export default {
        components: {},
        data() {
            return {

                u_key:'',
                unionname:'',
                unionid:'',

                name: 'name',
                union_id: 'union_id',
                ukey: 'ukey',

                editapi: '/cityuin/create',
                bodyloading:false,

                addFormRules: {
                    name: [
                        {required: true, message: '请填写停车场名称', trigger: 'blur'}
                    ],
                    union_id: [
                        {required: true, message: '请填写泊链厂商编号', trigger: 'blur'}
                    ],
                    ukey: [
                        {required: true, message: '请填写泊链厂商秘钥', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            saveModify:function () {
                this.bodyloading = true;
                let eform={
                    name:'name',
                    union_id:'union_id',
                    ukey:'ukey',
                }

                eform.name = this.name
                eform.union_id = this.union_id
                eform.ukey = this.ukey

                let vm = this

                vm.$axios.post(path + vm.editapi,vm.$qs.stringify(eform),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    vm.bodyloading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 150)
                    } else {
                        vm.maploading = false;
                        vm.savelabel = '保存信息2'
                        if (ret > 0 || ret.state == 1) {
                            //更新成功
                            vm.$message({
                                message: '保存成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetloading = false
                            vm.alertInfo('保存成功,请重新登录!')
                        } else {
                            //更新失败
                            vm.$message({
                                message: '保存失败!',
                                type: 'error',
                                duration: 2000
                            });
                            vm.alertInfo('保存失败!'+error)
                        }

                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!'+error)
                    }, 150)
                })

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
            },
        },
    }
</script>

<style scoped>
    .el-dialog__body {
        padding: 60px 20px;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
    }
</style>