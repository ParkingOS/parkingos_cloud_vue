<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">订单管理<span style="margin: 2px">-</span>异常订单</p>
                <div class="float-right">
                    <el-button type="text" v-if="hideExport" @click="exportFn" native-type="button"  icon="el-icon-printer">导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>


            <!--开发superForm组件-->
            <!--formConfig   表单的配置文件-->
            <!--searchData   基础传入的数据 可为空对象-->
            <!--searchValueFn 数据传递一周后输出的值-->
            <super-form :form-config="formConfig" :value="searchData" v-on:input="searchValueFn">

            </super-form>
            <!--结束end-->
        </div>


        <div class="table-wrapper-style">
            <tab-pane
                    :open-fixed-height="true"
                    :suction-top-visible="false"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
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
    import superForm from '../../components/super-form/inline-form';
    export default {
        components: {       //组件加载
            TabPane,superForm
        },
        data: function () {
            var that = this;
            return {
                searchData:{},
                formConfig:{
                    showMore:true,
                    first:[
                        {
                            label:'更新时间',
                            type:'date',
                            subtype:'datetimerange',
                            prop:'currentDate',
                            subprop:'update_time',
                            valueFormat:'timestamp',
                            defaultTime:['00:00:00','23:59:59']
                        },
                        {
                            label:'车牌号',
                            type:'input',
                            subtype: "text",
                            prop:'car_number',
                            width:180
                        },{
                            label:'订单号',
                            type:'input',
                            subtype: "text",
                            prop:'order_id_local'
                        }],
                    second:[
                        {
                            label:'出场时间',
                            type:'date',
                            subtype:'datetimerange',
                            prop:'pantTime',
                            subprop:'end_time',
                            valueFormat:'timestamp',
                            defaultTime:['00:00:00','23:59:59']
                        },
                    ]
                },
                pay_types:'',
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                isShow:false,
                delForm:{},
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
                queryapi: '/orderexception/query',    //数据请求路径
                exportapi:'/orderexception/export',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__update_time__car_number__order_id_local__end_time',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '更新时间',          //页面表格显示
                            prop: 'update_time',             //对应表中字段
                            width: '160',           //列宽度
                            type: 'number',         //对应表中字段类型
                            editable: false,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: false,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center',         //页面表格内容显示位置
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.update_time))
                                ]);
                            }

                        }]
                    }, {

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
                            prop: 'order_id_local',
                            width: '150',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                       hasSubs: false,
                       subs: [{
                           width:'180',
                           label: '入场时间',
                           prop: 'create_time',
                           type: 'date',
                           editable: true,
                           searchable: true,
                           addable: true,
                           unsortable: true,
                           align: 'center',
                           columnType:'render',
                           render: (h, params) => {
                               return h('div', [
                                   h('span', common.dateformat(params.row.create_time))
                               ]);
                           }
                       }]
                   },{

                        hasSubs: false,
                        subs: [{
                            label: '出场时间',
                            prop: 'end_time',
                            width: '180',
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
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.end_time))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            width:'180',
                            label: '现金结算',
                            prop: 'cash_pay_before',
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
                              width:'150',
                              label: '更新金额',
                              prop: 'cash_pay_after',
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
                      },
                      {

                        hasSubs: false,
                        subs: [{
                            width:'120',
                            label: '减免金额',
                            prop: 'reduce_amount_before',
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
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            width:'180',
                            label: '更新减免',
                            prop: 'reduce_amount_after',
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
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            width:'180',
                            label: '出场收费员',
                            prop: 'out_uid_before',
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
                                let uidstr = common.nameformat(params.row, this.collectors, 'out_uid_before');
                                return h('div', [
                                    h('span', uidstr == '' || uidstr == undefined ? '无' : uidstr )
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            width:'180',
                            label: '更新收费员',
                            prop: 'out_uid_after',
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
                                let uidstr = common.nameformat(params.row, this.collectors, 'out_uid_after');
                                return h('div', [
                                    h('span', uidstr == '' || uidstr == undefined ? '无' : uidstr )
                                ]);
                            }
                        }]
                    }
                ],
                collectors: [],
                newitems:{},
            }
        },
        mounted() {
            let that = this;
            //通知开启表格固定高度
            this.$store.commit('updateTableMaxHeight');
            window.addEventListener('resize', () => {
                var isDom = document.getElementById('consoleCurrentHeight');
                if(isDom){
                    that.$nextTick(()=>{
                        this.$store.commit('updateTableMaxHeight')
                    })
                }
            });
            this.setAuthorityFn();
            this.getQuery();
            this.initFn(this);

        },
        methods:{
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
                }else{
                    this.searchData = Object.assign({},val)
                }
            },

            cancelDel(){
                this.delForm.delVisible = false;
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                this.searchData = {
                };
                this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
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
                let _this = this;
                axios.all([common.getCollector(), common.getLiftReason()])
                    .then(axios.spread(function (collector, reason) {
                        _this.collectors = collector.data;
                        _this.collectors.unshift({
                            value_name: '全部',
                            value_no: ''
                        })
                        _this.reasons = reason.data;
                    }))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.orderManage_Abnormal == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
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
