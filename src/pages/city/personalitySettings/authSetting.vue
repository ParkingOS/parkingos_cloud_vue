<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span class="card-title">权限设置</span>
            </div>
            <div class="auth-setting">
                <p>车场管理员</p>
                <p><el-button type="primary" @click="showRolePermission">编辑权限</el-button></p>
            </div>
            <p class="auth-set-tip"><span>*</span>可编辑车场总管理员账号的页面操作权限，请慎重操作！</p>
        </el-card>

<!--        权限编辑-->
        <el-dialog
                width="650px"
                :visible.sync="isShowPermission"
                custom-class="custom-dialog"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                权限设置<i class="el-icon-close dialog-header-iconfont" @click="isShowPermission = false"></i>
            </header>

            <el-scrollbar class="set-jurisdiction">
                <div  style="padding: 10px">
                    <div v-for="sub of permissions" style="padding-bottom: 10px">
                        <div class="dividing-wrapper">
                            <el-checkbox @change="subchange(sub)" v-model="sub.ischeck">{{sub.subname}}</el-checkbox><p class="dividing-line"></p>
                        </div>
                        <div style="margin-left: 40px;" v-for="sub_ of sub.subpermission">
                            <el-checkbox @change="sub_change(sub,sub_)" v-model="sub_.ischeck">{{sub_.subname}}</el-checkbox>
                            <div style="margin-left: 20px;flex-wrap:wrap;">
                                <div style="margin-left: 20px;"
                                     v-for="sub__ of sub_.subpermission">
                                    <el-checkbox @change="sub__change(sub,sub_,sub__)"
                                                 v-model="sub__.ischeck">{{sub__.subname}}
                                    </el-checkbox>
                                    <div style="margin-left: 20px;display: flex;flex-direction: row;"><div style="margin-left: 20px">
                                        <el-checkbox v-for="sub___ of sub__.subpermission"
                                                     @change="sub___change(sub,sub_,sub__,sub___)"
                                                     v-model="sub___.ischeck">{{sub___.subname}}
                                        </el-checkbox>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            <footer slot="footer" class="dialog-footer">
                <el-button size="small" style="width: 90px;" @click="isShowPermission = false">取 消</el-button>
                <el-button type="primary" :loading="dialogloading" size="small" style="width: 90px;margin-left: 60px" @click="handleSavePermission">确 定</el-button>
            </footer>
        </el-dialog>

    </div>
</template>

<script>
    import { path } from '@/api/api';
    export default {
        name: 'authSetting',
        data(){
            return {
                roleId:undefined,
                dialogloading:false,
                isShowPermission:false,
                permissions:[],
                authlist:undefined,
            }
        },
        methods:{
            showRolePermission: function (index, row) {
                this.isShowPermission = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + '/cityuin/getSingleAuth' + '?cityid=' + sessionStorage.getItem('cityid')+'&t='+Date.now())
                    .then(function (response) {
                        let ret = response.data;
                        _this.authlist = response.data;
                        _this.permissions = _this.authlist.allAuth;
                        _this.roleId = _this.authlist.role_id;
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            handleSavePermission: function () {

                let _this = this;
                _this.$axios.post(path + '/cityuin/setSingleAuth', _this.$qs.stringify({
                    roleId: _this.roleId,
                    cityid:sessionStorage.getItem('cityid'),
                    auths: JSON.stringify(_this.authlist)
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    if (ret.state == 1) {
                        _this.$message({
                            message: '更新成功!',
                            type: 'success',
                            duration: 600
                        });
                        _this.isShowPermission = false;
                    } else {
                        _this.$message({
                            message: '更新失败!' + ret.msg,
                            type: 'error',
                            duration: 600
                        });
                    }
                }).catch(function (error) {
                    console.log('error-->',error);
                })

            },
            vertifyArray: function (array) {
                //确认是合法数组
                if (array != null && array != '' && array.length > 0) {
                    return true;
                }
                return false;
            },
            subchange: function (sub) {
                if (!this.vertifyArray(sub.subpermission))
                    return;
                for (let item of sub.subpermission) {
                    item.ischeck = sub.ischeck;
                    if (!this.vertifyArray(item.subpermission))
                        continue;
                    for (let item_ of item.subpermission) {
                        item_.ischeck = sub.ischeck;
                        if (!this.vertifyArray(item_.subpermission))
                            continue;
                        for (let item__ of item_.subpermission) {
                            item__.ischeck = item_.ischeck;
                        }
                    }
                }
            },
            sub_change: function (sub, sub1) {
                if (sub1.ischeck) {
                    sub.ischeck = true;
                }
                this.subchange(sub1)

            },
            sub__change: function (sub, sub1, sub2) {
                if (sub2.ischeck) {
                    sub1.ischeck = true;
                    sub.ischeck = true;
                }
                this.sub_change(sub1, sub2)
            },
            sub___change: function (sub, sub1, sub2, sub3) {
                if (sub3.ischeck) {
                    sub2.ischeck = true;
                    sub1.ischeck = true;
                    sub.ischeck = true;
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .auth-setting{
        p{
            display: inline-block;
            margin-right: 20px;
        }
    }
    .auth-set-tip{
        margin-top: 10px;
        font-size: 12px;
        color: #666;
        span{
            color: red;
        }
    }
</style>