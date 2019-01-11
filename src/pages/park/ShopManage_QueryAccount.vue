<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">商户管理<span style="margin: 2px">-</span>流水查询</p>
                <div class="float-right"><el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="流水类型" class="clear-style">
                            <el-select v-model="searchFormData.operate_type" placeholder="请选择" class="shop-custom-input">
                                <el-option
                                        v-for="item in operateType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>
                    <div class="console-main">
                        <el-form-item label="商户名称">
                            <el-input style="width: 140px" v-model="searchFormData.shop_name" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="操作人">
                            <el-input style="width: 140px" v-model="searchFormData.nickname" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentData"
                                    type="datetimerange"
                                    range-separator="至"
                                    :default-time="['00:00:00','23:59:59']"
                                    start-placeholder="请输入时间"
                                    end-placeholder="请输入时间"
                                    value-format="timestamp"
                                    @change="changeDateFormat"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
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
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
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
                            width: '112',
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
                            columnType:'render',
                            render: (h, params) => {
                                var unit = '元';
                                var str = '';
                                if (params.row.ticket_unit == 1) {
                                    unit = "分钟";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 2) {
                                    unit = "小时";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 3) {
                                    unit = "天";
                                    str = params.row.ticket_limit+unit;
                                } else if(params.row.ticket_unit == 4){
                                    unit = "元";
                                    str = params.row.ticket_money+unit;
                                }else if(params.row.ticket_unit == 5){
                                    unit = "张";
                                    str = params.row.ticket_money+unit;
                                }else{
                                    str='--'
                                }
                                return h('div', [
                                    h('span', {
                                        on: {
                                            click: (e) => {
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

