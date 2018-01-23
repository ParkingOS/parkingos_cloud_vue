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
                v-on:showRolePermission="showRolePermission"
                ref="bolinkuniontable"
        ></common-table>
        <el-dialog title="权限设置" v-model="isShowPermission">
                <div>
                    <el-checkbox>订单管理</el-checkbox>
                    <div style="margin-left: 20px;">
                        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                        <!--<div style="margin: 15px 0;"></div>-->
                        <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
                            <!--<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
                        <!--</el-checkbox-group>-->
                    </div>
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
    import {RoleFuncion} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
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
                addapi: '/adminrole/addrole',
                delapi: '/adminrole/deleterole',
                editapi: '/adminrole/editrole',
                queryapi: '/adminrole/query',
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
                isShowPermission: false,
                dialogloading: false,
            }
        },
        methods: {
            showRolePermission: function (index, row) {
                this.isShowPermission = true;
            },
            handleSavePermission:function () {

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
                    if (AUTH_ID.showEmployeePermission_Role_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        this.showPermission = common.showSubPermission(item.sub_auth)
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

