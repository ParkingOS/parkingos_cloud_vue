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
            :hide-options="true"
            :addtitle="addtitle"
            :searchtitle="searchtitle"
            :hideTool="true"
            :hideSearch="true"
            :hideAdd="true"
            :showEdit="false"
            :showdelete="false"
            ref="bolinkuniontable"
    ></common-table>
  </section>
</template>
<script>
import {path, checkURL, checkUpload, checkNumber, monitorType, net_status} from './api/api';
import util from './common/js/util'
import common from './common/js/common'
import CommonTable from './components/CommonTable'
import {httpUrl} from './api/http_url'
import axios from 'axios'
import {AUTH_ID} from "./common/js/const";
	export default {
		name: 'app',
		components: {
      CommonTable      //表格
		},
    data: function () {
        return {
            loading: false,         //loading页面是否显示
            hideExport: true,       //隐藏导出
            hideSearch: true,      //隐藏查询
             //显示日期查询
            hideAdd: true,         //隐藏添加
            tableheight: '',        //表格高度
            showdelete: true,       //显示删除
            hideOptions: false,      //隐藏多选框
                   //显示停车信息
            hideTool: false,        //隐藏工具栏
            showEdit:true,
            queryapi: '/EQ_monitor/query',    //数据请求路径
            addapi: '/EQ_monitor/add',
            editapi: '/EQ_monitor/edit',
            delapi: '/EQ_monitor/remove',
            btswidth: '100',                 //按钮宽度
            fieldsstr: 'id__name__channel_id__net_status__is_show__show_order__play_src__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
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
                        width: '150',
                        type: 'str',
                        editable: true,
                        searchable: true,
                        addable: true,
                        unsortable: false,
                        align: 'center'
                    }]
                }
                , {

                    hasSubs: false,
                    subs: [{
                        label: '车场',
                        prop: 'comid',
                        width: '150',
                        type: 'selection',
                        editable: true,
                        searchable: true,
                        addable: true,
                        unsortable: true,
                        align: 'center'
                    }]
                }
                , {

                    hasSubs: false,
                    subs: [{
                        label: '通道',
                        prop: 'channel_id',
                        width: '150',
                        type: 'selection',
                        selectlist:this.channelType,//此处引用通道管理的名称栏
                        editable: true,
                        searchable: true,
                        addable: true,
                        unsortable: true,
                        align: 'center',
                        format: (row) => {
                            return common.nameformat(row, this.channelType, 'channel_id')
                        }
                    }]
                }, /*{

                    hasSubs: false,
                    subs: [{
                        label: '网络状态',
                        prop: 'net_status',
                        width: '120',
                        type: 'selection',
                        selectlist:net_status,
                        editable: false,
                        searchable: true,
                        addable: false,
                        unsortable: false,
                        align: 'center',
                        format: function (row) {
                            return common.nameformat(row, net_status, 'net_status')
                        }
                    }]
                },*/ {

                    hasSubs: false,
                    subs: [{
                        label: '是否显示',
                        prop: 'is_show',
                        width: '100',
                        type: 'selection',
                        selectlist:monitorType,
                        editable: true,
                        searchable: false,
                        addable: true,
                        unsortable: true,
                        align: 'center',
                        format: function (row) {
                            return common.nameformat(row, monitorType, 'is_show')
                        }
                    }]
                }, {

                    hasSubs: false,
                    subs: [{
                        label: '排序',
                        prop: 'show_order',
                        width: '100',
                        type: 'number',
                        editable: true,
                        searchable: false,
                        addable: true,
                        unsortable: false,
                        align: 'center'
                    }]
                }, {

                    hasSubs: false,
                    subs: [{
                        label: '地址',
                        prop: 'play_src',
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
            addtitle: '添加监控器',
            searchtitle: '搜索监控器',
            channelType:'',
        }
    },
    mounted() {
        // window.onresize = () => {
        //     this.tableheight = common.gwh() - 143;
        // };
        // this.tableheight = common.gwh() - 143;
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        var type = '';
        var id ='';
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == 'type'){
                   type = pair[1];
                 }
                 else if(pair[0] == 'id'){
                   id = pair[1];
                 }
         }
         let _this = this;
         var param = {
           comid:id
         }
         if(type=='group'){
           param = {
             groupid:id
           }
           _this.queryapi = '/EQ_monitor/groupmonitors';
         }
        //this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
        setTimeout(function(){
          _this.$refs['bolinkuniontable'].getTableData(param);
        },10)



            // axios.all([common.getChannelTypeByComid(comid)])
            //     .then(axios.spread(function (ret) {
            //         _this.channelType = ret.data;
            //     }))


    },
    activated() {

    },
    watch: {
        channelType: function (val) {
            this.tableitems[2].subs[0].selectlist = val;
            console.log(val);
        }
    },
    methods: {

    }
	}

</script>

<style lang="scss">
	body {
		margin: 0px;
		padding: 0px;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
    background-color: #393a3e;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

</style>
