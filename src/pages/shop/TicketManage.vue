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

                :showTicketInfo = "showTicketInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType, operateType,ticketQueryType,statType} from '../../api/api';
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

                showTicketInfo: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/shopticket/getticketlog',
                btswidth: '100',
                fieldsstr: 'id__money__umoney__limit_day__car_number',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠时长',
                            prop: 'money',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                 if(row.ticket_unit==1&&row.money!='undefined'&&row.money>0){
                                        return row.money + ' 分钟';
                                 }else if(row.ticket_unit==2&&row.money!='undefined'&&row.money>0){
                                        return row.money + ' 小时';
                                 }else if(row.ticket_unit==3&&row.money!='undefined'&&row.money>0){
                                        return row.money + ' 天';
                                 }else{
                                        return '';
                                 }
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠金额',
                            prop: 'umoney',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                 if(row.ticket_unit==4&&row.umoney!='undefined'&&row.umoney>0){
                                         return row.umoney + ' 元';
                                 }
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '到期时间',
                            prop: 'limit_day',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.dateformat(row.limit_day);;
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠类型',
                            prop: 'type',
                            width: '100',
                            type: 'selection',
                            selectlist:ticketQueryType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function (row) {
                                if(row.type==3){
                                    return "时长减免"
                                }else if(row.type==5){
                                    return "金额减免";
                                }else if(row.type==4){
                                    return "全免券";
                                }else{
                                    return row.type;
                                }
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                           label: '状态',
                            prop: 'state',
                            width: '100',
                            type: 'selection',
                            selectlist:statType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function (row) {
                                if(row.state==0){
                                    return "未使用"
                                }else if(row.state==1){
                                    return "已使用";
                                }else{
                                    return "回收作废";
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

