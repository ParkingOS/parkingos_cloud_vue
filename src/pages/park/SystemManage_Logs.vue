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
                :orderfield="orderfield"

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
    import {path, checkURL, checkUpload, checkNumber, payType,types,operateTypes} from '../../api/api';
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

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                orderfield:'id',

                showdateSelector: false,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/parklog/query',
                btswidth: '100',
                fieldsstr: 'id__log_id__operate_time__content__operate_user__remark__operate_type__type',
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
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '操作类型',
                                prop: 'operate_type',
                                width: '123',
                                type: 'selection',
                                selectlist: operateTypes,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format:(row) => {

                                if(row.operate_type==1){
                                    return '增加'
                                }
                                else if(row.operate_type==2){
                                    return '编辑'
                                }
                                else if(row.operate_type==3){
                                    return '删除'
                                }
                                else if(row.operate_type==4){
                                    return '导出'
                                }
                                else if(row.operate_type==0){
                                    return '登录'
                                }
                                else if(row.operate_type==5){
                                    return '导入'
                                }
                                else{
                                    return '其他操作'
                                }
                             }
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '操作模块',
                                prop: 'type',
                                width: '123',
                                type: 'selection',
                                selectlist: types,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format:(row) => {

                                     //这里注意，一定要使用箭头函数，因为箭头函数中的this是延作用域向上取到最近的一个
                                     //也就是data中的this,可以获取到this.aroles
                                     //如果是普通函数，this.aroles获取到的是undefined,因为this的作用域是本身，并没有aroles这个变量
                                    return common.nameformat(row, types, 'type');
                                }
                            },
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
                                return common.dateformat(row.operate_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作内容',
                            prop: 'content',
                            width: '180',
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
                            label: '操作员',
                            prop: 'operate_user',
                            width: '123',
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
                searchtitle: '高级查询',

            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user

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

