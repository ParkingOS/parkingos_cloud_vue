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


                :showoperateSelector="showoperateSelector"
                :showshopdateSelector="showdateSelector"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType, operateType} from '../../api/api';
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
                hideSearch: true,

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,

                showdateSelector: true,
                showoperateSelector: true,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/shopaccount/getshoprecharge',
                btswidth: '100',
                fieldsstr: 'id__park_id__operate_time__ticketfree_limit__ticket_limit__ticket_money__operate_type__add_money',
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
                                label: '充值额度',
                                prop: 'ticket_limit',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    if(row.ticket_unit==1){
                                        return row.ticket_limit+' 分钟'
                                    }else if(row.ticket_unit==2){
                                        return row.ticket_limit+' 小时'
                                    }else if(row.ticket_unit==3){
                                        return row.ticket_limit+' 天'
                                    }else if(row.ticket_unit==4){
                                        return row.ticket_money+' 元'
                                    }
                                }
                            },
                        ]
                    },
                     {
                    hasSubs: false, subs: [
                        {
                            label: '充值全免券',
                            prop: 'ticketfree_limit',
                            width: '123',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return row.ticketfree_limit+" 张"
                            }

                        },
                    ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '充值时间',
                            prop: 'operate_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.operate_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '充值金额',
                            prop: 'add_money',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                //alert(row.add_money);
                                if( row.add_money>0){
                                    return row.add_money+' 元'
                                }
                            }
                        }]
                    },  {

                      hasSubs: false,
                      subs: [{
                          label: '流水类型',
                          prop: 'operate_type',
                          width: '100',
                          type: 'selection',
                          selectlist:operateType,
                          editable: true,
                          searchable: true,
                          addable: true,
                          unsortable: true,
                          align: 'center',
                          format:function (row) {
                              if(row.operate_type==1){
                                return "续费"
                              }else{
                                return "回收充值";
                              }
                          }
                      }]
                  }


                ],
                searchtitle: '查询明细',

            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
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

