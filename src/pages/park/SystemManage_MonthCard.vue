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
                :showdateSelector="showdateSelector"
                :hideTool="hideTool"
                :showParkInfo="showParkInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                :addtitle="addtitle"
                :addapi="addapi"
                :delapi="delapi"
                :editapi="editapi"
                :addFormRules="addFormRules"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
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
                hideExport: true,
                hideSearch: false,
                showdateSelector: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: false,
                showParkInfo: false,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/product/query',
                addapi: '/product/add',
                delapi: '/product/delete',
                editapi: '/product/edit',
                btswidth: '100',
                fieldsstr: 'id__p_name__price__create_time__update_time__car_type_id__describe__period',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'p_name',
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
                                label: '价格',
                                prop: 'price',
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

                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',

                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '修改时间',
                            prop: 'update_time',
                            width: '180',
                            type: 'date',

                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.update_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车型类型',
                            prop: 'car_type_id',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '月卡描述',
                            prop: 'describe',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '续费周期',
                            prop: 'period',
                            width: '123',
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
                addtitle: '添加套餐',
                addFormRules: {
                    p_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    car_type_id: [
                        {required: true, message: '请输入车型类型', trigger: 'blur'}
                    ],
                    period: [
                        {required: true, message: '请输入续费周期', trigger: 'blur'}
                    ]
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
                    if (AUTH_ID.showSystemManage_MonthCard_auth_id == item.auth_id) {
                        console.log(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
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

