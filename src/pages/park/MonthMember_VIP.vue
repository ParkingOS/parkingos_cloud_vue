<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :searchtitle="searchtitle"
                :addtitle="addtitle"
                :addFormRules="addFormRules"
                :editFormRules="editFormRules"
                :showdelete="showdelete"
                :showresetpwd="showresetpwd"
                :showmRefill="showmRefill"
                :showModifyCarNumber="showModifyCarNumber"
                :hideOptions="hideOptions"
                :showEdit="showEdit"
                :hideAdd="hideAdd"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>

<script>

    import {
        path,
        checkURL,
        checkUpload,
        checkNumber,
        percision,
        parktypelist,
        distinctslist,
        checkCityInfo,
        provincelist,
        checkPass,
        centerpayset,
        singleDoubleLimit
    } from '../../api/api';
    import util from '../../common/js/util'
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
                showresetpwd: false,
                hideExport: false,
                tableheight: '',
                hideOptions: false,
                showEdit:true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                hideAdd:false,
                queryapi: '/vip/query',
                addapi: '/vip/add',
                editapi: '/vip/edit',
                delapi: '/vip/remove',
                parkid: '',
                btswidth: '220',
                fieldsstr: 'id__pid__name__car_number__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                width: '100',
                                type: 'number',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '套餐名称',
                                prop: 'pid',
                                width: '100',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车主姓名',
                                prop: 'name',
                                width: '180',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号',
                                prop: 'car_number',
                                width: '150',
                                type: 'str',
                                editable: false,
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
                                label: '购买时间',
                                prop: 'create_time',
                                width: '180',
                                type: 'date',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '开始时间',
                                prop: 'b_time',
                                width: '180',
                                type: 'date',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.b_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '结束时间',
                                prop: 'e_time',
                                width: '180',
                                type: 'date',
                                selectlist: centerpayset,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                                ,
                                format: function (row) {
                                    return common.dateformat(row.e_time);
                                }
                            },

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '应收金额',
                                prop: 'total',
                                width: '100',
                                type: 'number',
                                selectlist: centerpayset,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '实收金额',
                                prop: 'act_total',
                                width: '150',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系电话',
                                prop: 'mobile',
                                width: '150',
                                type: 'str',
                                selectlist: provincelist,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车型类型',
                                prop: 'car_type_id',
                                width: '175',
                                type: 'str',
                                searchable: true,
                                align: 'center',
                                unsortable: true,
                                format: function (row) {
                                    return row.car_type_id==-1?'':row.car_type_id;
                                }

                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'create_time',
                                width: '175',
                                type: 'date',
                                searchable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '单双日限行',
                                prop: 'limit_day_type',
                                width: '123',
                                type: 'str',
                                editable: true,
                                addable: true,
                                searchable: false,
                                unsortable: true,
                                align: 'center',
                                format:function (row) {
                                    return common.singelDoubleFormat(row.limit_day_type)
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '备注',
                                prop: 'remark',
                                width: '180',
                                type: 'number',
                                searchable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                addFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    distincts: [
                        {required: true, validator: checkCityInfo, trigger: 'change'}
                    ],
                    address: [
                        {required: true, message: '请输入缴费机安置详细地址', trigger: 'blur'}
                    ],
                    // model: [
                    // 	{ required: true, message: '请输入缴费机型号', trigger: 'blur' }
                    // ],
                    password: [
                        {required: true, validator: checkPass, trigger: 'blur'}
                    ],
                    province_abbr: [
                        {required: true, message: '请输入默认省份缩写', trigger: 'change'}
                    ],
                },
                editFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入缴费机安置详细地址', trigger: 'blur'}
                    ],
                    // model: [
                    // 	{ required: true, message: '请输入缴费机型号', trigger: 'blur' }
                    // ],
                    province_abbr: [
                        {required: true, message: '请输入默认省份缩写', trigger: 'change'}
                    ],
                },
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.showMonthMember_VIP_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport= !common.showSubExport(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
                        this.showmRefill= common.showSubReFill(item.sub_auth)
                        this.showModifyCarNumber= common.showSubUpdate(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        break;
                    }
                }

            }
        },
        activated() {
            console.log('active')
            console.log(distinctslist)
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            //所有厂商,所有服务商
            this.axios.all([common.getServerList(), common.getUnionList(), common.getBankInfo(), common.getBaPayUnionList()])
        }
    }

</script>