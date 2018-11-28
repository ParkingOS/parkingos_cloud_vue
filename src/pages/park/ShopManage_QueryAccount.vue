<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            商户管理-流水查询
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item label="商户名称"  class="clear-style margin-left-clear">
                    <el-input v-model="searchFormData.shop_name" placeholder="请输入商户名称" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="操作人" class="clear-style">
                    <el-input v-model="searchFormData.nickname" placeholder="操作人" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item class="clear-style" label="操作时间">
                    <el-date-picker
                            style="width: 312px"
                            size="mini"
                            v-model="searchFormData.currentData"
                            type="datetimerange"
                            range-separator="-"
                            :default-time="['00:00:00','23:59:59']"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"
                            @change="changeDateFormat"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px"></i> 更多选项</el-button>
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
                <div class="second-search-item-style" v-show="isShow">
                    <el-form-item label="流水类型" class="clear-style margin-left-clear">
                        <el-select v-model="searchFormData.operate_type" placeholder="请选择" size="mini" style="width: 140px">
                            <el-option
                                    v-for="item in operateType"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
        <!--<common-table-->
                <!--:queryapi="queryapi"-->
                <!--:tableheight="tableheight"-->
                <!--:fieldsstr="fieldsstr"-->
                <!--:tableitems="tableitems"-->
                <!--:btswidth="btswidth"-->
                <!--:hide-export="hideExport"-->
                <!--:hide-options="hideOptions"-->
                <!--:searchtitle="searchtitle"-->
                <!--:hideTool="hideTool"-->
                <!--:orderfield="orderfield"-->

                <!--:showParkInfo="showParkInfo"-->
                <!--:hideSearch="hideSearch"-->
                <!--:hideAdd="hideAdd"-->
                <!--ref="bolinkuniontable"-->
        <!--&gt;</common-table>-->
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, operateType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import TabPane from '../../components/table/TabPane';

    export default {
        components: {
            CommonTable,TabPane
        },
        data() {
            return {
                isShow:false,
                searchForm:{},
                searchFormData:{
                    shop_name:'',
                    currentData:'',
                    operate_time:'between',
                    operate_time_start:'',
                    operate_time_end:'',
                    operate_type:'',
                    nickname:'',
                },
                operateType:operateType,
            	orderfield:'id',
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: false,
                hideTool: false,
                queryapi: '/shopaccount/quickquery',
                btswidth: '100',
                fieldsstr: 'shop_name__operate_time',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '商户编号',
                            prop: 'shop_id',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, 
                    {
                        hasSubs: false, subs: [
                            {
                                label: '商户名称',
                                prop: 'shop_name',
                                width: '197',
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
                            label: '额度',
                            prop: 'ticket_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                if(row.ticket_unit==1){
                                    if(row.ticket_limit==0){
                                        return "";
                                    }else{
                                        return row.ticket_limit;
                                    }
                                }else{
                                    return "";
                                }
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let unit = '元';
                                let str = '';
                                if (params.row.ticket_unit == 1) {
                                    unit = "分钟";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 2) {
                                    unit = "小时";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 3) {
                                    unit = "天";
                                    str = params.row.ticket_limit+unit;
                                } else {
                                    unit = "元";
                                    str = params.row.ticket_money+unit;
                                }
                                return h('div', [
                                    h('span', {
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '额度(分钟)',
                            prop: 'ticket_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            format:function(row){
                            	 if(row.ticket_unit==1){
                            	 	if(row.ticket_limit==0){
                            	 		return "";
                            	 	}else{
                            	 		return row.ticket_limit;
                            	 	}
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '额度(小时)',
                            prop: 'ticket_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            format:function(row){
                            	 if(row.ticket_unit==2){
                            	 	if(row.ticket_limit==0){
                            	 		return "";
                            	 	}else{
                            	 		return row.ticket_limit;
                            	 	}
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '额度(天)',
                            prop: 'ticket_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            format:function(row){
                            	 if(row.ticket_unit==3){
                            	 	if(row.ticket_limit==0){
                            	 		return "";
                            	 	}else{
                            	 		return row.ticket_limit;
                            	 	}
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '全免券',
                            prop: 'ticketfree_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function (row) {
                                if(row.ticketfree_limit==0){
                                	return ""
                                }else{
                                	return row.ticketfree_limit;
                                }
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let str = params.row.ticketfree_limit+' 张';
                                return h('div', [
                                    h('span', {
                                        props: {

                                        },
                                        style: {

                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '额度(元)',
                            prop: 'ticket_money',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            format:function (row) {
                                if(row.ticket_money==0){
                                	return ""
                                }else{
                                	return row.ticket_money;
                                }
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '缴费金额',
                            prop: 'add_money',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = params.row.add_money? params.row.add_money+' 元' :'0'+' 元';
                                return h('div', [
                                    h('span', str),
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作人',
                            prop: 'nickname',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {

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
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.operate_time)),
                                ]);
                            }
                            // format:function (row) {
                            //     return common.dateformat(row.operate_time)
                            // }
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
                                }else if(row.operate_type==2){
                                	return "回收充值";
                                }else if(row.operate_type==3){
                                    return "退款";
                                }
                            },
                            columnType:'render',
                            render: (h, params) => {
                                let str = '';
                                switch (params.row.operate_type){
                                    case 1:
                                        str = '续费';
                                        break;
                                    case 2:
                                        str = '回收充值';
                                        break;
                                    case 3:
                                        str = '退款';
                                        break;
                                    default:
                                        str = '';
                                }
                                // let str = params.row.operate_type+' 元';
                                return h('div', [
                                    h('span', str),
                                ]);
                            }
                        }]
                    }

                ],
                searchtitle: '流水查询',

            }
        },
        methods:{
            changeMore(){
                this.isShow = !this.isShow
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    shop_name:'',
                    currentData:'',
                    operate_time:'between',
                    operate_time_start:'',
                    operate_time_end:'',
                    operate_type:'',
                    nickname:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.operate_time_start = '';
                    this.searchFormData.operate_time_end = ''
                }else{
                    this.searchFormData.operate_time_start = val[0];
                    this.searchFormData.operate_time_end = val[1]
                }
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.operate_type_start = sform.operate_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            resetForm(){
                this.initFn(this)
            },
        },
        mounted() {
            this.$refs['tabPane'].getTableData({},this);

        },
        activated() {

        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

