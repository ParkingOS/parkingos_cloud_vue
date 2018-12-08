<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            储值卡会员-储值卡充值记录
        </header>
        <div class="refill-money-wrapper bgcolor-white margin-20" style="margin-top: 0;text-align: center">
            <el-row type="flex" justify="center" align="center">
                <el-col :span="12" style="color: #8693F3">
                    <div class="refill-money-left">
                        <i class="iconfont icon-jine money-icon" ></i>
                        <p class="refill-month-title">续费金额</p>
                        <p class="refill-month-count">
                            <countTo :startVal='0' :decimals=2 :endVal='amountReceivable' :duration='1000'></countTo>元
                        </p>
                    </div>

                </el-col>
            </el-row>
        </div>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item label="类型" class="clear-style margin-left-clear">
                    <el-select v-model="searchFormData.time_type" placeholder="请选择" size="mini" style="width: 140px">
                        <el-option
                                v-for="item in timerType"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="clear-style">
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
                <el-form-item label="车牌号" class="clear-style">
                    <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" size="mini" style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                    <el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px"></i> 更多选项</el-button>
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
                <div class="second-search-item-style" v-show="isShow">
                    <el-form-item label="姓名" class="clear-style margin-left-clear">
                        <el-input v-model="searchFormData.name" placeholder="" size="mini" style="width: 140px"></el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:transferData="transferDataFn"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import countTo from 'vue-count-to';
    export default {
        components: {
            TabPane,countTo
        },
        data() {
            return {
                hideExport:false,
                searchForm:{},
                searchFormData:{
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                    collector:'',
                    trade_no:''
                },
                isShow:false,
                actReceivable:0,
                amountReceivable:0,
                queryapi: '/prepaycardtrade/query',
                exportapi: '/prepaycardtrade/exportExcel',
                orderfield:'id',
                fieldsstr: 'id__trade_no__card_id__pay_time__amount_receivable__amount_pay__name__pay_type__car_number__user_id__limit_time__resume__start_time',
                tableitems: [

                    {

                        hasSubs: false,
                        subs: [{
                            label: '车主姓名',
                            prop: 'name',
                            width: '140',
                            type: 'str',
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
                            label: '车牌号码',
                            prop: 'car_number',
                            width: '165',
                            type: 'str',
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
                            label: '续费时间',
                            prop: 'pay_time',
                            width: '210',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.pay_time))
                                ]);
                            }
                        }]
                    },

                    {
                        hasSubs: false,
                        subs: [{
                            label: '充值前金额',
                            prop: 'add_money_before',
                            width: '180',
                            type: 'str',
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
                            label: '充值金额',
                            prop: 'add_money',
                            width: '180',
                            type: 'str',
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
                            label: '充值后金额',
                            prop: 'add_money_after',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                ],
                timerType:[
                    {
                        'value_name':'续费时间',
                        'value_no':'3'
                    },
                ],
            }
        },
        methods:{
            transferDataFn(val){
                console.log('val--------',val)
                this.actReceivable = val.actReceivable;
                this.amountReceivable = val.amountReceivable;
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.state_start = sform.state;
                sform.pay_type_start = sform.pay_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.ctime_start = '';
                    this.searchFormData.ctime_end = ''
                }else{
                    this.searchFormData.ctime_start = val[0];
                    this.searchFormData.ctime_end = val[1]
                }
            },
            resetForm(){
                this.initFn(this)
            },
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                    pid:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.prepay_card_trade == item.auth_id) {
                            this.hideExport = !common.showSubExport(item.sub_auth);
                            break;
                        }
                    }

                }

            }
        },
        beforeMount(){

        },
        mounted() {
            this.setAuthorityFn()
            this.$refs['tabPane'].getTableData({},this);
        },
    }

</script>

<style scoped lang="scss">
    .refill-money-wrapper{
        padding: 20px;

    }
    .refill-money-left{
        display: inline-block;
        width: 250px;
        height: 60px;
        text-align: left;
    }
    .money-icon{
        float: left;
        font-size: 60px;
        margin-right: 26px;
    }
    .refill-month-title{
        font-size: 14px;
        font-weight:400;
        color:#666;
        padding-top: 9px;
    }
    .refill-month-count{
        font-size: 24px;
        font-weight: 400;
    }

</style>

