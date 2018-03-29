<template>
    <section style="padding: 50px;"  >

        <p>欢迎使用ParkingOS开源停车云平台，请完整填写下面资料，如车场需和泊链平台做数据交互，请务必填写泊链厂商编号和厂商秘钥，否则后续新建车场无法与泊链连接。</p>

        <el-row style="margin-top:100px;margin-left: 160px;" >
            <div>
                <el-row>
                    <el-form ref="addFormPark" style="width:50%;margin-top: 20px;" label-width="180px" :rules="addFormRules"
                                     :model="addFormPark">
                        <el-form-item label="厂商名称" :prop="name">
                            <el-input v-model="addFormPark.name" style="width:90%" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="泊链厂商编号" :prop="union_id">
                            <el-input v-model="addFormPark.union_id" style="width:90%" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item label="泊链厂商秘钥" :prop="ukey">
                            <el-input v-model="addFormPark.ukey" style="width:90%" placeholder=""></el-input>
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

                addFormPark: {},

                editapi: '/cityuin/create',
                bodyloading:false,

                name:'name',
                union_id:'union_id',
                ukey:'ukey',

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

            saveModify: function () {
                //注册车场
                let _this = this;
                this.$refs.addFormPark.validate((valid) => {

                    if (valid) {
                        _this.bodyloading = true;
                        let aform = _this.addFormPark;
                        _this.$axios.post(path + _this.editapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            console.log('chnasdafafa'+ret.state);
                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.alertInfo('保存成功,请重新登录!')

                            } else {
                                //更新失败
                               _this.alertInfo('保存失败!')
                            }
                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
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