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
                :searchtitle="searchtitle"

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

    import {path, checkURL, checkUpload, checkNumber} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {httpUrl} from '../../api/http_url'
    import axios from 'axios'

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
                queryapi: '/EQ_intercom/query',    //数据请求路径
                addapi: '/EQ_intercom/add',
                editapi: '/EQ_intercom/edit',
                delapi: '/EQ_intercom/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__name__tele_phone__park_phone__group_phone__monitor_id__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
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
                            unsortable: false,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'name',
                            width: '200',
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
                            prop: 'tele_phone',
                            width: '200',
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
                            prop: 'park_phone',
                            width: '200',
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
                            prop: 'group_phone',
                            width: '200',
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
                            label: '监控名称',
                            prop: 'monitor_id',
                            width: '250',
                            type: 'selection',
                            selectlist:this.showType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, this.showType, 'monitor_id')
                            }
                        }]
                    },
                ],

                addtitle: '添加对讲',
                searchtitle: '搜索对讲',
                showType:'',

            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            //console.log(this.showType);
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.showEquipmentManage_Intercom_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
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

            let _this = this
            axios.all([common.getMonitorName()])
                .then(axios.spread(function (ret) {
                    _this.showType = ret.data;
                    //console.log(ret.data);
                }))

        },
        watch: {
            showType: function (val) {
                this.tableitems[5].subs[0].selectlist = val;
                //console.log(val);
            }
        },
        methods: {

        },

    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>