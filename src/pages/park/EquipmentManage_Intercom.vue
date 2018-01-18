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

    import {path, checkURL, checkUpload, checkNumber, showType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {httpUrl} from '../../api/http_url'

    export default {
        components: {       //组件加载
            CommonTable      //表格
        },
        data() {
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
                queryapi: '/EQ_intercom/query',    //数据请求路径
                addapi: '/EQ_intercom/add',
                editapi: '/EQ_intercom/edit',
                delapi: '/EQ_intercom/remove',
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
                            addable: false,          //是否可添加
                            unsortable: false,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'trade_no',
                            width: '100',
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
                            label: '分机号',
                            prop: 'card_id',
                            width: '150',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车场主机号',
                            prop: 'pay_time',
                            width: '190',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '集团主机号',
                            prop: 'amount_receivable',
                            width: '150',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '监控名称',
                            prop: 'amount_pay',
                            width: '150',
                            type: 'selection',
                            //selectlist:showType,//该处引用监控管理中的名称作为下拉选项
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center'
                        }]
                    },
                ],

                addtitle: '添加对讲',
                searchtitle: '搜索对讲',
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
        methods: {},

    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>