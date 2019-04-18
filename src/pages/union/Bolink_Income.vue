<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">业务订单<span style="margin: 2px">-</span>交易记录</p>
                <div class="float-right">
                    <span style="padding-right: 30px">合计金额：{{allTotal}} 元</span>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="交易编号" class="clear-style">
                            <el-input v-model="searchFormData.trade_no" placeholder="请输入交易号" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="支付类型" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.type" placeholder="请选择" class="shop-custom-input">
                                <el-option
                                        v-for="item in pay_types"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款人" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.collector" placeholder="请选择" class="shop-custom-input">
                                <el-option
                                        v-for="item in collectors"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单号">
                            <el-input style="width: 140px" v-model="searchFormData.order_id" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="支付时间">
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
                                    :picker-options="pickerOptions"
                                    @change="changeDateFormat"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.comid_start" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号">
                            <el-input style="width: 140px" v-model="searchFormData.car_number" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>

                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <el-button type="primary"  @click="exportFn" native-type="button" v-if="!hideExport">导出</el-button>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>


        <div class="table-wrapper-style">
            <tab-pane
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:cancelDel="cancelDel"
                    v-on:transferData="transferData"
            ></tab-pane>
        </div>
    </section>
</template>

<script>

    import {path, checkURL, checkUpload, checkNumber, monitorType, net_status} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import TabPane from '../../components/table/TabPane';
    import customEditForm from '../../components/edit-form/editForm'
    import customAddForm from '../../components/add-form/addForm'
    import axios from 'axios'
    import {AUTH_ID} from "../../common/js/const";
    import {editTableData,addTableData} from "../../api/base";
    export default {
        components: {       //组件加载
            TabPane
        },
        data: function () {
            var that = this;
            return {
                allTotal:0,
                parklist:[],
                pay_types:'',
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                isShow:false,
                delForm:{

                },
                rowdata:{},
                editFormVisible:false,
                editloading:false,
                addFormVisible:false,
                addloading:false,
                addFormData:{
                    state:'0'
                },
                searchFormData:{
                    currentData:'',
                    trade_no:'',
                    order_id:'',
                    car_number:'',
                    type:'',
                    pay_time:'between',
                    pay_time_start:'',
                    pay_time_end:'',
                    collector:'',
                    comid_start:'',
                },
                searchForm:{},

                pickerOptions:{
                    onPick(dates) {
                        that.minDate = dates.minDate;
                        that.maxDate = dates.maxDate;
                    },

                    disabledDate(time){
                        return time.getTime() >  new Date(that.minDate).getTime()+30*24*3600000||time.getTime()>Date.now()+86399000||time.getTime() <  new Date(that.minDate).getTime()-30*24*3600000;
                    }
                },

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
                queryapi: '/bolinkincome/groupquery',    //数据请求路径
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__car_number__order_id__trade_no__pay_time__collector__type',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',          //页面表格显示
                            prop: 'id',             //对应表中字段
                            type: 'number',         //对应表中字段类型
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: false,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '所属车场',          //页面表格显示
                            prop: 'park_id',             //对应表中字段
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: false,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center',         //页面表格内容显示位置
                            columnType:'render',
                            render: (h, params) => {
                                let result = common.nameformat(params.row, this.parklist, 'park_id');
                                if (result == '请选择')result = '';
                                return h('div', [
                                    h('span', result)
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                            "rules": [
                                {required: true, message: '请输入名称', trigger: 'blur'}
                            ],
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '订单号',
                            prop: 'order_id',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                       hasSubs: false,
                       subs: [{
                           label: '支付时间',
                           prop: 'pay_time',
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
                   },{

                        hasSubs: false,
                        subs: [{
                            label: '支付金额',
                            prop: 'pay_money',
                            editable: true,
                            searchable: false,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '交易号',
                            prop: 'trade_no',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                        }]
                    },{

                          hasSubs: false,
                          subs: [{
                              label: '支付类型',
                              prop: 'type',
                              editable: true,
                              searchable: true,
                              addtable: true,
                              unsortable: true,
                              align: 'center',
                              "type": "input",
                              "disable": false,
                              "readonly": false,
                              "value": "",
                              'size':'',
                              "subtype": "text",
                              columnType:'render',
                              render: (h, params) => {
                                   //1现金预付 2电子预付 3电子支付  4月卡续费 5储值卡续费
                                  return h('div', [
                                      h('span', common.nameformat(params.row,this.pay_types,'type'))
                                  ]);
                              }
                          }]
                      },
                      {

                        hasSubs: false,
                        subs: [{
                            label: '收款人',
                            prop: 'collector',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span',common.nameformat(params.row, this.collectors, 'collector') )
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                        }]
                    }
                ],
                collectors: [],
                newitems:{},
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.initFn(this);
            this.getQuery();
            //this.$refs['tabPane'].getTableData(this.searchForm,this)
        },
        methods:{
            transferData(val){
                this.allTotal = val.money;
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.pay_time_start = '';
                    this.searchFormData.pay_time_end = ''
                }else{
                    this.searchFormData.pay_time_start = val[0];
                    this.searchFormData.pay_time_end = val[1]
                }
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            cancelDel(){
                this.delForm.delVisible = false;
            },
            onEditInput:function (eform) {
                this.rowdata=eform;
            },
            onEdit: function () {
                //发送ajax,提交表单更新
                let that = this;
                let api = this.editapi;
                let eform = this.rowdata;
                eform = common.generateForm(eform);
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    console.log('valid',valid,eform)
                    if (valid) {
                        editTableData(api,eform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '编辑成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.editFormVisible = false;
                                        that.$refs['tabPane'].getTableData(that.searchFormData,that);
                                    },60)
                                }else{
                                    that.$message({
                                        message: res.data.msg,
                                        type: 'info',
                                        duration: 600
                                    });
                                }
                            }
                        }).catch(err => {
                            that.$message({
                                message: '更新失败',
                                type: 'error',
                                duration: 600
                            });
                        })
                    }
                });
            },
            cancelEdit(){
                this.editFormVisible = false;
            },
            handleAdd(){
                this.addFormData = {};
                this.addFormVisible = true;
            },
            onAdd:function () {
                console.log('aform',this.addFormData)
                //发送请求,添加一条记录
                let that = this;
                let api = this.addapi;
                let aform = this.addFormData;
                aform = common.generateForm(aform);
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addTableData(api,aform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '添加成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.addFormVisible = false;
                                        that.$refs['tabPane'].getTableData({},that);
                                    },60)
                                }else{
                                    that.$message({
                                        message: res.data.msg,
                                        type: 'info',
                                        duration: 600
                                    });
                                }
                            }
                        }).catch(err => {
                            that.$message({
                                message: '更新失败',
                                type: 'error',
                                duration: 600
                            });
                        })
                    }
                });
            },
            cancelAdd:function () {
                this.addFormVisible = false;
            },
            onAddInput:function (aform) {

                this.addFormData = aform;
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:'',
                    trade_no:'',
                    order_id:'',
                    car_number:'',
                    type:'',
                    pay_time:'between',
                    pay_time_start:'',
                    pay_time_end:'',
                    collector:'',
                    comid_start:''
                };
                let currentTime =  common.currentDateArray(1);
                that.searchFormData.currentData = [common.timestampFormat(currentTime[0]),common.timestampFormat(currentTime[1])];
                that.searchFormData.pay_time_start = common.timestampFormat(currentTime[0]);
                that.searchFormData.pay_time_end = common.timestampFormat(currentTime[1]);
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.collector_start = sform.collector;
                sform.type_start = sform.type;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getQuery(){
                let _this = this
                // 1现金预付 2电子预付 3电子支付  4月卡续费 5储值卡续费
                _this.pay_types=[
                    {'value_name': '现金预付', 'value_no': '1'},
                    {'value_name': '电子预付', 'value_no': '2'},
                    {'value_name': '电子支付', 'value_no': '3'},
                    {'value_name': '月卡续费', 'value_no': '4'},
                    {'value_name': '通用支付', 'value_no': '5'},
                ]
                axios.all([common.getCollector(),common.getAllParks()])
                    .then(axios.spread(function (ret,parks) {
                        _this.collectors = ret.data;
                        _this.newitems = {'value_name': '系统', 'value_no': '10000000'};
                        _this.collectors.push(_this.newitems);
                        _this.parklist = parks.data;
                    }));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.orderManage_Income == item.auth_id) {
                            this.hideAdd= common.showSubAdd(item.sub_auth)
                            this.showEdit= common.showSubEdit(item.sub_auth)
                            this.showdelete= common.showSubDel(item.sub_auth)
                            if(this.showEdit==false&&this.showdelete==false){
                                this.hideOptions= true
                            }
                            break;
                        }
                    }

                }

            }
        },
        activated() {

        },
        watch: {

        },
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>
