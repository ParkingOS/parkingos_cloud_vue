<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"
                :hideTool="hideTool"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                :showPermission="showPermission"
                :addtitle="addtitle"
                :delapi="delapi"
                :editapi="editapi"
                :addFormRules="addFormRules"
                :editFormRules="editFormRules"
                v-on:showRolePermission="showRolePermission"
                ref="bolinkuniontable"
        ></common-table>
        <el-dialog title="权限设置" :visible.sync="isShowPermission" style="overflow: scroll" width="50%">
            <div v-for="sub of permissions">

                <el-checkbox @change="subchange(sub)" v-model="sub.ischeck">{{sub.subname}}</el-checkbox>

                <div style="margin-left: 40px;" v-for="sub_ of sub.subpermission">

                    <el-checkbox @change="sub_change(sub,sub_)" v-model="sub_.ischeck">{{sub_.subname}}</el-checkbox>
                    <div v-if="sub_.subname==='收费员收入分析'||sub_.subname==='人力资源'||sub_.subname==='日志管理'" style="margin-left: 20px;display: flex;flex-direction: column;">
                        <div style="margin-left: 20px;"
                             v-for="sub__ of sub_.subpermission">

                            <el-checkbox @change="sub__change(sub,sub_,sub__)"
                                         v-model="sub__.ischeck">{{sub__.subname}}
                            </el-checkbox>
                            <div style="margin-left: 20px;display: flex;flex-direction: row;">
                                <div style="margin-left: 20px">

                                <el-checkbox v-for="sub___ of sub__.subpermission"
                                             @change="sub___change(sub,sub_,sub__,sub___)"
                                             v-model="sub___.ischeck">{{sub___.subname}}
                                </el-checkbox>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-else style="margin-left: 20px;display: flex;flex-direction: row;">
                        <div style="margin-left: 20px;"
                             v-for="sub__ of sub_.subpermission">

                            <el-checkbox @change="sub__change(sub,sub_,sub__)"
                                         v-model="sub__.ischeck">{{sub__.subname}}
                            </el-checkbox>
                            <div style="margin-left: 20px;display: flex;flex-direction: row;">
                                <div style="margin-left: 20px">

                                <el-checkbox v-for="sub___ of sub__.subpermission"
                                             @change="sub___change(sub,sub_,sub__,sub___)"
                                             v-model="sub___.ischeck">{{sub___.subname}}
                                </el-checkbox>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div style="width: 100%;height: 1px;background-color:#475669;margin: 20px 0;"></div>

            </div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="isShowPermission = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleSavePermission"
                           :loading="dialogloading">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>


<script>
    import {path, RoleFuncion} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                // showSettingFee: true,
                // showCommutime: true,
                showPermission: true,
                addapi: '/grouprole/addrole',
                delapi: '/grouprole/deleterole',
                editapi: '/grouprole/editrole',
                queryapi: '/grouprole/query',
                permissionapi: '/grouprole/getroleauth',
                permissioneditapi: '/grouprole/editroleauth',
                btswidth: '180',
                fieldsstr: 'id__role_name__func__resume',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '角色编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'role_name',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '功能',
                                prop: 'func',
                                width: '123',
                                type: 'selection',
                                selectlist: RoleFuncion,
                                editable: false,
                                searchable: true,
                                addable: false,
                                unsortable: true,
                                hidden: true,
                                align: 'center',
                                format: function (row) {
                                    return common.funcformat(row.is_collector, row.is_inspect, row.is_opencard)
                                    // return RoleFuncion[1].value_name
                                }
                            },
                        ]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'resume',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }
                ],
                searchtitle: '高级查询',
                addtitle: '添加角色',
                addFormRules: {
                    role_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    role_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                isShowPermission: false,
                dialogloading: false,
                permissions: [],
                authlist: {
                    // nickname:'',
                    // allAuth:[
                    // {
                    //     subname: '订单管理',
                    //     ischeck: false,
                    //     subpermission: [
                    //         {
                    //             subname: '订单记录',
                    //             ischeck: false,
                    //             subpermission: [
                    //                 {subname: '查看', ischeck: false},
                    //                 {subname: '导出', ischeck: false}
                    //             ]
                    //         }, {
                    //             subname: '抬杆记录',
                    //             ischeck: false,
                    //             subpermission: [
                    //                 {subname: '查看', ischeck: false},
                    //                 {subname: '导出', ischeck: false}
                    //             ]
                    //         }
                    //     ]
                    // },
                    // {
                    //     subname: '月卡会员',
                    //     ischeck: false,
                    //     subpermission: [
                    //         {
                    //             subname: '月卡续费记录',
                    //             ischeck: false,
                    //             subpermission: [
                    //                 {subname: '查看', ischeck: false},
                    //                 {subname: '导出', ischeck: false}
                    //             ]
                    //         }, {
                    //             subname: '月卡会员',
                    //             ischeck: false,
                    //             subpermission: [
                    //                 {subname: '查看', ischeck: false},
                    //                 {subname: '导出', ischeck: false},
                    //                 {subname: '注册会员修改车牌', ischeck: false},
                    //                 {subname: '删除', ischeck: false},
                    //                 {subname: '续费', ischeck: false}
                    //             ]
                    //         }
                    //     ]
                    // },
                    // ]
                },
                nickname: '',
                checksub: false,
                currentRow: ''
            }
        },
        methods: {
            showRolePermission: function (index, row) {
                this.isShowPermission = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + _this.permissionapi + '?loginroleid=' + sessionStorage.getItem('loginroleid') + '&id=' + row.id)
                    .then(function (response) {
                        // console.log(response)
                        let ret = response.data;
                        _this.authlist = response.data;
                        console.log(_this.authlist)
                        _this.permissions = _this.authlist.allAuth;
                        _this.nickname = _this.authlist.nickname;
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            },
            handleSavePermission: function () {

                let _this = this;
                _this.$axios.post(path + _this.permissioneditapi, _this.$qs.stringify({
                    id: _this.currentRow.id,
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
                    setTimeout(() => {
                        _this.alertInfo('请求失败!' + error)
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
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                for (var item of user.authlist) {
                    if (AUTH_ID_UNION.systemSetting_RoleManage == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        this.showPermission = common.showSubPermission(item.sub_auth)
                        if(!this.showEdit&&!this.showdelete&&!this.showPermission){
                            this.hideOptions = true;
                        }
                        break;
                    }
                }
            }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

