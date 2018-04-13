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

                :addtitle="addtitle"
                :addapi="addapi"
                :editapi="editapi"

                :showCode="showCode"
                v-on:showCode_Fix="downloadCode"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType, stateType} from '../../api/api';
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

                hideAdd: false,
                tableheight: '',
                showdelete: false,
                hideOptions: false,

                showCode:true,


                hideTool: false,
                showEdit: true,
                queryapi: '/fixcode/query',
                addapi:'/fixcode/add',
                editapi:'/fixcode/edit',
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
                               label: '剩余金额',
                               prop: 'money_limit',
                               width: '123',
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
                               label: '剩余时间',
                               prop: 'time_limit',
                               width: '123',
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
                               label: '剩余张数',
                               prop: 'free_limit',
                               width: '123',
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

                           hasSubs: false,
                           subs: [{
                               label: '二维码链接',
                               prop: 'code_src',
                               width: '180',
                               type: 'str',
                               editable: false,
                               searchable: false,
                               addable: false,
                               unsortable: true,
                               align: 'center',
                           }]
                       },
                       {

                          hasSubs: false,
                          subs: [{
                              label: '有效期',
                              prop: 'limit',
                              width: '180',
                              type: 'str',
                              editable: false,
                              searchable: false,
                              addable: true,
                              unsortable: true,
                              hidden: true,
                              align: 'center',
                          }]
                      },
                       {

                         hasSubs: false,
                         subs: [{
                             label: '状态',
                             prop: 'state',
                             width: '100',
                             type: 'selection',
                             selectlist:stateType,
                             editable: true,
                             searchable: true,
                             addable: true,
                             unsortable: true,
                             align: 'center',
                             format:function (row) {
                                 if(row.state==1){
                                   return "不可用";
                                 }else{
                                   return "可用";
                                 }
                             }
                         }]
                     }

                ],
                searchtitle: '查询明细',
                addtitle:"添加",
            }
        },
         methods: {
            downloadCode: function (index, row) {
                //this.imgdialog_url = path + this.imgapi + '?liftrodid=' + row.liftrod_id + '&id=' + row.id + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                //console.log(this.imgdialog_url);
                //this.imgDialog = true
                alert('ssssssss');
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

