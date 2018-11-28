<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">用券明细<span style="margin: 2px">-</span>用券明细</p>
                <div class="float-right"><el-button type="text" size="mini" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;" @click="resetForm">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" v-model="formItem" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="formItem.currentData"
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
                        <el-form-item label="车牌号" >
                            <el-input v-model="formItem.car_number" placeholder="车牌号" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 125px">
                            <el-select placeholder="全部" v-model="formItem.shopuser" class="shop-custom-input">
                                <el-option
                                        label="全部员工"
                                        value="">
                                </el-option>
                                <el-option
                                        v-for="item in shopusers"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" style="width: 86px" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                                    <el-button type="primary" style="width: 114px" @click="exportFn">导出</el-button>
                                </el-tooltip>
                            </el-form-item>
                        </div>
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
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>

    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType, operateType,ticketQueryType,statType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID_SHOP} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';

    export default {
        components: {
            TabPane
        },
        data() {
            var _this = this;
            return {
                searchForm:{},
                formItem:{
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    car_number:'',
                    state:'',
                    currentData:'',
                    shopuser:'',
                },
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            hidden:'',
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'create_time',
                            width: '160',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            hidden:'',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.create_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '到期时间',
                            prop: 'limit_day',
                            width: '160',
                            type: 'date',
                            editable: true,
                            searchable: false,
                            hidden:'',
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.limit_day))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '使用时间',
                            prop: 'use_time',
                            width: '160',
                            type: 'date',
                            editable: true,
                            hidden:'',
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.use_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠时长',
                            prop: 'money',
                            width: '120',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            hidden:'',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', params.row.money +'小时')
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠金额',
                            prop: 'umoney',
                            width: '120',
                            type: 'number',
                            hidden:'',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', params.row.umoney +'元')
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '发券人',
                            prop: 'uin',
                            width: '135',
                            type: 'selection',
                            selectlist: this.shopusers,
                            editable: true,
                            searchable: true,
                            addable: true,
                            hidden:'',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.nameformat(params.row.uin))
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠类型',
                            prop: 'type',
                            width: '110',
                            type: 'selection',
                            selectlist:ticketQueryType,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            hidden:'',
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', this.typeformat(params.row.type))
                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '110',
                            type: 'selection',
                            selectlist:statType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            hidden:'',
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = '',bgcolors = '',colors=' ';
                                switch (params.row.state){
                                    case 0:
                                        str = '未使用';colors='#363636';bgcolors = '#4D92FF';
                                        break;
                                    case 1:
                                        str = '已使用';colors='#8C8C8C;';bgcolors = '#909090';
                                        break;
                                    default:
                                        str = '回收作废';colors='#8C8C8C;';bgcolors = '#909090';
                                }
                                return h('div',{
                                    style:{
                                        position:'relative',
                                    }
                                }, [
                                    h('i',{
                                        style:{
                                            display:'block',
                                            position:'absolute',
                                            left:'5',
                                            top:'50%',
                                            width:'6px',
                                            height:'6px',
                                            borderRadius:'50%',
                                            transform:'translateY(-50%)',
                                            backgroundColor:bgcolors,
                                            marginRight:'4px'
                                        }
                                    },''),
                                    h('span',{
                                        style:{
                                            color:colors,
                                        }
                                    }, str)
                                ]);
                            }
                        }]
                    },




                ],
                /////////////////////////////////////////////////////
                createtime:'between',
                total:0,
                start_placeholder: '',
                end_placeholder: '',
                datesselector: '',
                minDate : '',
                maxDate : '',
                pickerOptions3:{
                    onPick(dates) {
                      _this.minDate = dates.minDate;
                      _this.maxDate = dates.maxDate;
                    },

                  disabledDate(time){
                        return time.getTime() >  new Date(_this.minDate).getTime()+30*24*3600000||time.getTime()>Date.now()||time.getTime() <  new Date(_this.minDate).getTime()-30*24*3600000;
                  }
                },

                table: [],
                pageSize: 20,
                currentPage: 1,
                orderby: 'desc',
                orderfield: 'id',
                shopusers:[],
                loading: false,
                hideExport: true,
                hideSearch: false,
                showTicketInfo: false,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                hidden_type:0,
                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/shopticket/getticketlog',
                exportapi: '/shopticket/exportlog',
                btswidth: '100',
                fieldsstr: 'id__money__umoney__limit_day__car_number__create_time__type__use_time__state__uin',
                searchtitle: '查询明细',
                moneyformat:function(row){
                    if(row.ticket_unit==1&&row.money!=0){
                        return row.money+'分钟';
                     }else if(row.ticket_unit==2&&row.money!=0){
                        return row.money+'小时';
                     }else if(row.ticket_unit==3&&row.money!=0){
                        return row.money+'天';
                     }else{
                        return "";
                     }
                },
                umoneyformat:function(row){
                    if(row.ticket_unit==4&&row.umoney!=0){
                        return row.umoney+'元';
                     }else{
                        return "";
                     }
                },
                stateformat:function(state){
                    if(state==0){
                        return "未使用"
                    }else if(state==1){
                        return "已使用";
                    }else{
                        return "回收作废";
                    }
                },
                typeformat:function(type){
                    if(type==3){
                        return "时长减免"
                    }else if(type==5){
                        return "金额减免";
                    }else if(type==4){
                        return "全免券";
                    }else{
                        return "";
                    }
                },
                nameformat:function(uin){
                    var shopusers = this.shopusers;
                    for (let x in shopusers) {
                        if (shopusers[x].value_no == uin) {
                            return shopusers[x].value_name;
                        }
                    }
                }
            }
        },
        methods:{
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.formItem;
                sform.uin = sform.shopuser;
                sform.uin_start = sform.shopuser;
                sform.hidden_type=this.hidden_type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeDateFormat(val){

                if(val == null){
                    this.formItem.create_time_start = '';
                    this.formItem.create_time_end = ''
                }else{
                    this.formItem.create_time_start = val[0];
                    this.formItem.create_time_end = val[1]
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
                that.formItem ={
                    create_time:'between',
                    create_time_start:'',
                    create_time_end:'',
                    car_number:'',
                    state:'',
                    currentData:'',
                    shopuser:'',
                };
                let currentTime =  common.currentDateArray(1);
                that.formItem.currentData = [common.timestampFormat(currentTime[0]),common.timestampFormat(currentTime[1])];
                that.formItem.create_time_start = common.timestampFormat(currentTime[0]);
                that.formItem.create_time_end = common.timestampFormat(currentTime[1]);
                that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
            getQuery(){
                let _this = this;
                axios.all([common.getShopUsers()])
                    .then(axios.spread(function (ret) {
                        _this.shopusers = ret.data;
                    }));
                this.getShopAccountInfo()
            },
            getShopAccountInfo(){
              let vm = this;
              vm.$axios.post(path+"/shopaccount/shopinfo?id="+sessionStorage.getItem('shopid'),{
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                  }
              }).then(function (response) {
                let ret = response.data;
                if(ret.ticket_unit==1||ret.ticket_unit==2||ret.ticket_unit==3){
                    //时长
                    vm.tableitems[5].subs[0].hidden = "true";
                    vm.sform.hidden_type=2
                    vm.hidden_type = 2;
                }

                else if(ret.ticket_unit==4){
                    //金额  隐藏时长
                    vm.tableitems[4].subs[0].hidden = "true";
                    vm.sform.hidden_type=1
                    vm.hidden_type = 1;
                 }

              });
            },
        },
         beforeMount(){

         },
        mounted() {

        },
        watch: {
            // shopusers: function (val) {
            //     this.tableitems[5].subs[0].selectlist = val;
            // }
        },
        activated() {
            this.getQuery();
            this.initFn(this);
            this.$refs['tabPane'].getTableData({},this);
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
    .member-buttom{
         margin-bottom: 10px!important;
         width:140px;
     }
</style>

