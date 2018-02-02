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
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :hidePagination="hidePagination"
                ref="bolinkuniontable"
        ></common-table>

    </section>
</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common'
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
                showdateSelector: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination:true,
                queryapi: '/parkorder/query',
                workdetailapi: '/parkorder/workdetail',
                orderdetailapi: '/parkorder/orderdetail',
                btswidth: '100',
                fieldsstr: 'groupid__comid__name__out_uid__sdate__scount__monthcount__cash_pay__cash_prepay__electronic_pay__free_pay__reduce_pay__amount_receivable',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '收费员',
                                prop: 'name',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '账号',
                                prop: 'out_uid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                hidden:true,
                                align: 'center',
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '总订单数',
                            prop: 'scount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '应收金额',
                            prop: 'amount_receivable',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        label: '实收金额',
                        hasSubs: true,
                        subs: [

                            {
                                // label: 'aha',
                                // hasSubs: true,
                                // subs: [{
                                    label: '现金支付',
                                    prop: 'cash_pay',
                                    width: '123',
                                    type: 'str',
                                    editable: true,
                                    searchable: true,
                                    addable: true,
                                    unsortable: true,
                                    align: 'center'
                                // }, {
                                //
                                //     hasSubs: false,
                                //
                                //     label: '免费金额',
                                //     prop: 'free_pay',
                                //     width: '123',
                                //     type: 'str',
                                //     editable: true,
                                //     searchable: true,
                                //     addable: true,
                                //     unsortable: true,
                                //     align: 'center'
                                //
                                // }, {
                                //
                                //     hasSubs: false,
                                //
                                //     label: '减免券支付',
                                //     prop: 'reduce_pay',
                                //     width: '123',
                                //     type: 'str',
                                //     editable: true,
                                //     searchable: true,
                                //     addable: true,
                                //     unsortable: true,
                                //     align: 'center'
                                //
                                // }]
                            }, {

                                hasSubs: false,

                                label: '电子支付',
                                prop: 'electronic_pay',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {

                                hasSubs: false,

                                label: '合计',
                                prop: 'act_total',
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
                            label: '减免金额',
                            prop: 'reduce_pay',
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

                datesselector: '',

                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                table: [],
                sform: {},
                showWorkDetail: false,
                showOrderDetail: false,
                currentRow: '',
            }
        },
        methods: {},
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            // var user = sessionStorage.getItem('user');
            // this.user = user
            // if (user) {
            //     user = JSON.parse(user);
            //     for (var item of user.authlist) {
            //         if (AUTH_ID.showOrderStatistics_HourRent_auth_id == item.auth_id) {
            //             console.log(item.sub_auth)
            //             break;
            //         }
            //     }
            //
            // }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            // this.getTableData(this.sform);
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

