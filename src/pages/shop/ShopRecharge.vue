<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">充值明细<span style="margin: 2px">-</span>充值明细</p>
                <div class="float-right"><el-button type="text" size="mini" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" v-model="formItem" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="formItem.currentData"
                                    type="datetimerange"
                                    range-separator="至"
                                    :default-time="['00:00:00','23:59:59']"
                                    start-placeholder="请输入时间"
                                    end-placeholder="请输入时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="changeDateFormat"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item style="width: 125px">
                            <el-select placeholder="全部" v-model="formItem.operate_type" class="shop-custom-input">
                                <el-option
                                        v-for="item in operateType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" style="width: 86px" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <!--table-->
        <div class="table-wrapper-style">
            <tab-pane
                    :stripe="true"
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType, operateType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';

    export default {
        components: {
            TabPane
        },
        data() {
            return {
                searchForm:{},
                formItem:{
                    operate_type:'',
                    currentData:'',

                },
                //////////////////////
                loading: false,
                hideExport: true,
                hideSearch: true,
                orderfield:'id',
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showdateSelector: true,
                showoperateSelector: true,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/shopaccount/getshoprecharge',
                btswidth: '100',
                fieldsstr: 'id__park_id__operate_time__ticketfree_limit__ticket_limit__ticket_money__operate_type__add_money',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '192',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '充值时间',
                            prop: 'operate_time',
                            width: '192',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.operate_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '充值额度',
                                prop: 'ticket_limit',
                                width: '192',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = '';let unit = params.row.ticket_unit;
                                    if(unit==1){
                                        str = params.row.ticket_limit+' 分钟'
                                    }else if(unit==2){
                                      str =  params.row.ticket_limit+' 小时'
                                    }else if(unit==3){
                                        str = params.row.ticket_limit+' 天'
                                    }else if(unit==4){
                                        str = params.row.ticket_money+' 元'
                                    }
                                    return h('div', [
                                        h('span', str )
                                    ]);
                                }
                            },
                        ]
                    },
                     {
                    hasSubs: false, subs: [
                        {
                            label: '充值全免券',
                            prop: 'ticketfree_limit',
                            width: '192',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', params.row.ticketfree_limit +' 张' )
                                ]);
                            }

                        },
                    ]
                    },
                     {

                        hasSubs: false,
                        subs: [{
                            label: '充值金额',
                            prop: 'add_money',
                            width: '192',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span',params.row.add_money !=undefined ?params.row.add_money +' 元':'-' )
                                ]);
                            }
                        }]
                    },  {

                      hasSubs: false,
                      subs: [{
                          label: '流水类型',
                          prop: 'operate_type',
                          width: '192',
                          type: 'selection',
                          selectlist:operateType,
                          editable: true,
                          searchable: true,
                          addable: true,
                          unsortable: true,
                          align: 'center',
                          columnType:'render',
                          render: (h, params) => {
                              return h('div', [
                                  h('span', params.row.operate_type == 1 ?'续费':'回收充值')
                              ]);
                          }
                      }]
                  }


                ],
                operateType:[
                    {'value_no': "", 'value_name': '全部'},
                    {'value_no': 1, 'value_name': '续费'},
                    {'value_no': 2, 'value_name': '回收充值'}
                ],
                searchtitle: '查询明细',

            }
        },
        methods:{
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.formItem;
                if(sform.currentData != null && sform.currentData != ''){
                    sform.date = sform.currentData[0]+encodeURI(encodeURI('至'))+sform.currentData[1];
                }else{
                    sform.date = '';
                }
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeDateFormat(val){
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.formItem ={
                    operate_type:'',
                    currentData:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
        },
        mounted() {

        },
        activated() {
            this.initFn(this);
            this.$refs['tabPane'].getTableData({},this);
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

