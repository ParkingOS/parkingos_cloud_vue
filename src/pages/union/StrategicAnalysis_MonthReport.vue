<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :exportapi="exportapi"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"
                :showdateSelectorMonth="showdateSelectorMonth"
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
    import common from '../../common/js/common';
    import CommonTable from '../../components/CommonTable';

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: false,
                hideSearch: true,
                showdateSelectorMonth: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination: true,
                queryapi: '/groupmonthorder/query',
                exportapi: '/groupmonthorder/exportExcel',
                btswidth: '100',
                fieldsstr: 'sdate__scount__amount_receivable__cash_pay__electronic_pay__free_pay',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日期',
                                prop: 'sdate',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '总订单数',
                                prop: 'scount',
                                width: '123',
                                type: 'number',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,

                                align: 'center'
                            }
                        ]
                    },
                    {

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
                                label: '现金支付',
                                prop: 'cash_pay',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

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
                    }
                    , {

                        hasSubs: false,
                        subs: [{
                            label: '减免金额',
                            prop: 'free_pay',
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
                currentRow: ''
            };
        },
        methods: {},
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            // var user = sessionStorage.getItem('user');
            // this.user = user
            // if (user) {
            //     user = JSON.parse(user);
            //     for (var item of user.authlist) {
            //         if (AUTH_ID.showOrderStatistics_DailyReport_auth_id == item.auth_id) {
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
            };
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({date: '', out_uid: ''});
            // this.getTableData(this.sform);
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

