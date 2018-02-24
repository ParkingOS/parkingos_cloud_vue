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

    import {path, checkURL, checkUpload, checkNumber, channlManager,channlManagerType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import axios from 'axios'

    export default {
        components: {       //组件加载
            CommonTable      //表格
        },
        data() {
            return {
                loading: false,         //loading页面是否显示
                hideExport: true,       //隐藏导出
                hideSearch: true,      //隐藏查询
                 //显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                       //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                queryapi: '/EQ_channel/query',    //数据请求路径
                addapi: '/EQ_channel/add',
                editapi: '/EQ_channel/edit',
                delapi: '/EQ_channel/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__passname__passtype__worksite_id__month_set__month2_set__description__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',          //页面表格显示
                            prop: 'id',             //对应表中字段
                            width: '100',           //列宽度
                            type: 'number',         //对应表中字段类型
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: false,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'passname',
                            width: '160',
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
                            label: '通道类型',
                            prop: 'passtype',
                            width: '150',
                            type: 'selection',
                            selectlist:channlManagerType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,channlManagerType,'passtype')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '所属工作站',
                            prop: 'worksite_id',
                            width: '190',
                            type: 'selection',
                            selectlist:this.worksite_id,//选项为工作站管理页面的名称栏
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:(row)=>{
                                return common.nameformat(row, this.worksite_id, 'worksite_id')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '非月卡车',
                            prop: 'month_set',
                            width: '150',
                            type: 'selection',
                            selectlist:channlManager,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,channlManager,'month_set')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '月卡第二辆车',
                            prop: 'month2_set',
                            width: '150',
                            type: 'selection',
                            selectlist:channlManager,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,channlManager,'month2_set')
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '说明',
                            prop: 'description',
                            width: '300',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                ],

                addtitle: '添加通道',
                worksite_id:'',
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
                    if (AUTH_ID.showEquipmentManage_Channel_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
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

            let _this = this
            axios.all([common.getWorkSite_id()])
                .then(axios.spread(function (ret) {
                    _this.worksite_id = ret.data;
                    //console.log(ret.data);
                }))

        },
        watch: {
            worksite_id: function (val) {
                this.tableitems[3].subs[0].selectlist = val;
                //console.log(val);
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>