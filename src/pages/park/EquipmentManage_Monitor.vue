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
                :addtitle="addtitle"
                :searchtitle="searchtitle"
                :showdateSelector="showdateSelector"
                :hideTool="hideTool"
                :showParkInfo="showParkInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>

<script>

    import {path, checkURL, checkUpload, checkNumber, monitorType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {       //组件加载
            CommonTable      //表格
        },
        data: function () {
            return {
                loading: false,         //loading页面是否显示
                hideExport: true,       //隐藏导出
                hideSearch: false,      //隐藏查询
                showdateSelector: true,//显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                showParkInfo: false,     //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                queryapi: '/EQ_monitor/query',    //数据请求路径
                addapi: '/EQ_monitor/add',
                editapi: '/EQ_monitor/edit',
                delapi: '/EQ_monitor/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__trade_no__card_id__pay_time__amount_receivable__amount_pay__collector__pay_type__car_number__user_id__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',          //页面表格显示
                            prop: 'id',             //对应表中字段
                            width: '100',           //列宽度
                            type: 'number',         //对应表中字段类型
                            editable: true,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: true,          //是否可添加
                            unsortable: false,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'trade_no',
                            width: '150',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '通道',
                            prop: 'card_id',
                            width: '100',
                            type: 'selection',
                            //selectlist:payType,//此处引用通道管理的名称栏
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '网络状态',
                            prop: 'pay_time',
                            width: '140',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: false,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '是否显示',
                            prop: 'amount_receivable',
                            width: '100',
                            type: 'selection',
                            editable: true,
                            searchable: false,
                            addable: true,
                            selectlist:monitorType,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '排序',
                            prop: 'amount_pay',
                            width: '100',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: false,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '地址',
                            prop: 'collector',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                ],
                addtitle: '添加监控器',
                searchtitle: '搜索监控器',
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({})
        },
        methods: {}
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>