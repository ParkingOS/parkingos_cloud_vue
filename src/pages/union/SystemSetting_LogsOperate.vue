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

                :hideTool="hideTool"
                :showdateSelector="showdateSelector"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import CommonTable from '../../components/CommonTable';
    import axios from 'axios';

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
                showdelete: true,
                hideOptions: true,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/citylog/query',
                btswidth: '100',
                fieldsstr: 'id__log_id__operate_time__content__operate_user__remark',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '日志编号',
                                prop: 'log_id',
                                width: '123',
                                type: 'str',
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
                            label: '操作时间',
                            prop: 'operate_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.operate_time);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作内容',
                            prop: 'content',
                            width: '300',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收费员',
                            prop: 'operate_user',
                            width: '123',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, this.collectors, 'operate_user');
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            width: '150',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '查询明细',
                collectors: ''

            };
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                for (let item of user.authlist) {
                    if (AUTH_ID_UNION.systemSetting_LogsOperates == item.auth_id) {
                        console.log(item.sub_auth);
                        // this.hideSearch= !common.showSubSearch(item.sub_auth)
                        // this.hideExport = !common.showSubExport(item.sub_auth)
                        break;
                    }
                }
            }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({});
            let _this = this;
            axios.all([common.getAllCollector()])
                .then(axios.spread(function (collector, reason) {
                    _this.collectors = collector.data;
                }));
        },
        watch: {
            collectors: function (val) {
                this.tableitems[4].subs[0].selectlist = val;
            }
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

