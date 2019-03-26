<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">订单管理<span style="margin: 2px">-</span>减免记录</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="商户名称">
                            <el-input style="width: 140px" v-model="searchFormData.shop_name" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号">
                            <el-input style="width: 140px" v-model="searchFormData.car_number" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="使用时间">
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
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
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
                    shop_name:'',
                    car_number:'',
                    currentData:'',
                    use_time:'between',
                    use_time_start:'',
                    use_time_end:'',
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
                queryapi: '/reducerecord/query',    //数据请求路径
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'ticket_id__car_number__shop_name__order_id__use_time',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠券编号',          //页面表格显示
                            prop: 'ticket_id',             //对应表中字段
                            width: '140',           //列宽度
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
                               label: '商户名称',
                               prop: 'shop_name',
                               width: '165',
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
                       },{

                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '165',
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
                            width: '150',
                            selectlist:this.channelType,//此处引用通道管理的名称栏
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                       hasSubs: false,
                       subs: [{
                           width:'210',
                           label: '使用时间',
                           prop: 'use_time',
                           type: 'date',
                           editable: true,
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
                   },{

                        hasSubs: false,
                        subs: [{
                            label: '抵扣额度',
                            prop: 'deduction_amount',
                            width: '120',
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
                            width:'180',
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
                addtitle: '添加监控器',
                searchtitle: '搜索监控器',
                channelType:'',
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.initFn(this)
            this.getQuery();
            //this.$refs['tabPane'].getTableData({},this)
        },
        methods:{
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
                    //ticket_id:'',
                    //ticket_id_start:'',
                    shop_name:'',
                    car_number:'',
                    currentData:'',
                    use_time:'between',
                    use_time_start:'',
                    use_time_end:'',
                };
                let currentTime =  common.currentDateArray(1);
                that.searchFormData.currentData = [common.timestampFormat(currentTime[0]),common.timestampFormat(currentTime[1])];
                that.searchFormData.use_time_start = common.timestampFormat(currentTime[0]);
                that.searchFormData.use_time_end = common.timestampFormat(currentTime[1]);
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.use_time_start = '';
                    this.searchFormData.use_time_end = ''
                }else{
                    this.searchFormData.use_time_start = val[0];
                    this.searchFormData.use_time_end = val[1]
                }
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                //sform.ticket_id_start = sform.ticket_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getQuery(){
                let _this = this
                axios.all([common.getChannelType()])
                    .then(axios.spread(function (ret) {
                        _this.channelType = ret.data;
                    }))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.orderManage_Record == item.auth_id) {
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
