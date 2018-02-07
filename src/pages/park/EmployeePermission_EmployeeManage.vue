<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"

                :addtitle="addtitle"
                :hideTool="hideTool"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                :showresetpwd="showresetpwd"
                :addFormRules="addFormRules"
                :editFormRules="editFormRules"
                :addapi="addapi"
                :delapi="delapi"
                :editapi="editapi"
                :resetapi="resetapi"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {genderType, collectType} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import axios from 'axios'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,

                hideExport: true,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showresetpwd: true,
                hideOptions: false,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                // showSettingFee:true,
                // showCommutime:true,
                // showPermission:true,
                addapi: '/member/createmember',
                delapi: '/member/delmember',
                editapi: '/member/editmember',
                queryapi: '/member/query',
                resetapi: '/member/editpass',
                btswidth: '180',
                fieldsstr: 'id__nickname__strid__phone__mobile__role_id__reg_time__sex__logon_time__isview',

                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',
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
                                label: '姓名',
                                prop: 'nickname',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '登录账号',
                                prop: 'strid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,

                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '电话',
                                prop: 'phone',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '手机',
                                prop: 'mobile',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '角色',
                                prop: 'role_id',
                                width: '123',
                                type: 'selection',
                                selectlist: this.aroles,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    // console.log(this.aroles)
                                    //这里注意，一定要使用箭头函数，因为箭头函数中的this是延作用域向上取到最近的一个
                                    //也就是data中的this,可以获取到this.aroles
                                    //如果是普通函数，this.aroles获取到的是undefined,因为this的作用域是本身，并没有aroles这个变量
                                    return common.nameformat(row, this.aroles, 'role_id')
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'reg_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.reg_time)
                            }
                        }]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '性别',
                                prop: 'sex',
                                width: '100',
                                type: 'selection',
                                selectlist: genderType,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.nameformat(row, genderType, 'sex')
                                }
                            },
                        ]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '最近登录时间',
                            prop: 'logon_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.logon_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收费',
                            prop: 'isview',
                            width: '123',
                            type: 'selection',
                            selectlist: collectType,
                            hidden:true,


                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, collectType, 'isview')
                            }
                        }]
                    }


                ],
                searchtitle: '高级查询',
                addtitle: '注册员工',
                addFormRules: {
                    nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ]
                },
                editFormRules: {
                    nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },

                aroles: [],
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
                    if (AUTH_ID.employeePermission_Manage == item.auth_id) {
                        console.log(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
                        this.showresetpwd = common.showSubReset(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        // this.showPermission= common.showSubPermission(item.sub_auth)
                        // this.showSettingFee= common.showSubSetFee(item.sub_auth)
                        break;
                    }
                }

            }
            console.log(this.aroles)
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }

            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})

            let _this = this
            axios.all([common.getEmployeeRole()])
                .then(axios.spread(function (ret) {
                    // _this.aroles = _this.aroles.concat(ret.data);
                    _this.aroles = ret.data;
                    // console.log(_this.aroles)
                }))
            // console.log(this.aroles)
        },
        watch: {
            aroles: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

