<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :addtitle="addtitle"

                :hideTool="hideTool"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>

    </section>
</template>

<script>

    import {path, checkURL, checkUpload, checkNumber, workStation} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {AUTH_ID} from "../../common/js/const";

    export default {
        components: {       //组件加载
            CommonTable      //表格
        },
        data() {
            return {
                loading: false,         //loading页面是否显示
                hideExport: true,       //隐藏导出
                hideSearch: false,      //隐藏查询
                 //显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                       //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                queryapi: '/EQ_workStation/query',    //数据请求路径
                addapi: '/EQ_workStation/add',
                editapi: '/EQ_workStation/edit',
                delapi: '/EQ_workStation/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'worksite_name__description__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    /*{
                        hasSubs: false,
                        subs: [{
                            label: '编号',          //页面表格显示
                            prop: 'id',             //对应表中字段
                            width: '100',           //列宽度
                            type: 'number',         //对应表中字段类型
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: true,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    },*/
                    {

                        hasSubs: false,
                        subs: [{
                            label: '名称',          //页面表格显示
                            prop: 'worksite_name',             //对应表中字段
                            width: '300',           //列宽度
                            type: 'str',         //对应表中字段类型
                            editable: true,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: true,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '说明',
                            prop: 'description',
                            width: '500',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, /*{

                        hasSubs: false,
                        subs: [{
                            label: '网络类型',
                            prop: 'net_type',
                            width: '150',
                            type: 'selection',
                            selectlist:workStation,//流量、宽带
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,workStation,'net_type')
                            }
                        }]
                    },*/
                ],

                addtitle: '添加工作站',
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.equipmentManage_WorkStation == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
                        if(this.showEdit==false&&this.showdelete==false){
                            this.hideOptions= true
                        }
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