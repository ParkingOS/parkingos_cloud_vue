<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员<span style="margin: 2px">-</span>储值卡会员</p>
                <div class="float-right">
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="车主姓名" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入车主姓名" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="储值卡编号" class="clear-style">
                            <el-input v-model="searchFormData.card_id" placeholder="请输入储值卡编号" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.park_id" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item>
                            <el-select v-model="searchFormData.time_type" placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 100px">
                                <el-option
                                        v-for="item in timerType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
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
                        <el-form-item label="车牌号" class="clear-style margin-left-20">
                            <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <div class="float-right">
                            <el-form-item class="shop-clear-style">
                                <!--<el-button type="primary" @click="registerMember">注册会员</el-button>-->
                                <el-button type="primary" @click="registerMember" v-if="showCustomizeAdd">注册会员</el-button>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>

        <div class="table-wrapper-style">
            <tab-pane
                    :editTo="editTo"
                    :editapi="editapi"
                    :editRowData="editRowData"
                    v-on:editInput="editInput"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :delapi="delapi"
                    :del-form="delForm"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    :format-collectors="cartype"
                    :pname="pname"
                    :single-double-type="singleDoubleType"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:cancelDel="cancelDel"
            ></tab-pane>
        </div>
        <!--月卡续费的dialog-->
        <el-dialog
                width="600px"
                :visible.sync="showRefill" custom-class="custom-dialog" :show-close="false">
            <header class="dialog-header" slot="title">
                储值卡续费<i class="el-icon-close dialog-header-iconfont" @click="showRefill = false"></i>
            </header>
            <el-form ref="refillForm" label-width="120px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-form-item label="储值卡编号" class="clear-style">
                    <el-input v-model="refillForm.card_id" placeholder=""  :readonly=true></el-input>
                </el-form-item>
                <el-form-item label="车主姓名" class="clear-style margin-left-clear">
                    <el-input v-model="refillForm.name" placeholder=""  :readonly=true></el-input>
                </el-form-item>

                <el-form-item label="充值金额" :prop="add_money">
                    <el-input v-model.trim="refillForm.add_money"  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model.trim="refillForm.remark"  placeholder="" ></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="showRefill = false"  class="custom-btns-style">取 消</el-button>
                <el-button type="primary"  @click="handleRefill" :loading="resetloading" class="custom-btns-style" style="margin-left: 60px">确 定</el-button>
			</footer>
        </el-dialog>
        <el-dialog
                width="600px"
                :show-close="false"
                :visible.sync="showRegis"
                custom-class="custom-dialog custom-dialog-register"
                @close="closeDialog">
            <header class="dialog-header" slot="title">
                添加储值卡<i class="el-icon-close dialog-header-iconfont" @click="showRegis = false"></i>
            </header>
            <el-form ref="refillForm" label-width="120px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-tabs v-model="selectActive" @tab-click="selectChange"  type="card">
                    <div class="dialog-form-width">
                        <el-form-item label="所属车场">
                            <el-select v-model="refillForm.park_id" style="width:100%" filterable>
                                <el-option
                                        v-for="item in this.parklist"
                                        :label="item.value_name"
                                        :value="item.value_no"
                                        :key="item.value_no"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号码" :prop="car_number">
                            <el-input v-model.trim="refillForm.car_number" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="车主姓名">
                            <el-input v-model.trim="refillForm.name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model.trim="refillForm.mobile"  placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model.trim="refillForm.remark" placeholder="" ></el-input>
                        </el-form-item>
                    </div>
                </el-tabs>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="showRegis = false"  style="width: 90px;">取 消</el-button>
                <el-button type="primary"  @click="handleRegis" :loading="resetloading" style="width: 90px;margin-left: 60px">确 定</el-button>
            </footer>
        </el-dialog>

    </section>
</template>

<script>

    import {
        parktypelist,
        distinctslist,
        checkCityInfo,
        provincelist,
        checkPass,
        centerpayset,
        singleDoubleLimit,
        singleDoubleType,
        path
    } from '../../api/api';

    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import AddDate from '../../components/add-subs/AddDate'
    import TabPane from '../../components/table/TabPane';
    import countTo from 'vue-count-to';
    import axios from 'axios'
    import ElRadioButton from 'element-ui/packages/radio/src/radio-button';
    import { editTableData } from '../../api/base'
    export default {
        components: {
            ElRadioButton,
            CommonTable,
            AddDate,
            TabPane,
            countTo
        },
        data() {
            return {
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                highlightindex:sessionStorage.getItem('highlightindex'),
                renewalImg:require('../../assets/images/renewal.png'),
                //短信模块
                smsData:{
                    message_count:0,
                    before_notice:30,
                    send_freq:0,
                    notice_switch:1,
                },
                setSmSVible:false,
                //编辑
                editRowData:{},
                editTo:0,
                editFormVisible:false,
                editloading:false,
                rowdata:{},
                selectActive:'1',
                name:'month-member',
                isShow:false,
                currentHeight:'300px',
                searchForm:{},
                searchFormData:{
                    park_id:'',
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                },
                orderfield:'id',
                fieldsstr: 'id__card_id__pid__park_id__name__car_number__p_lot__ctime__b_time__e_time__total__add_money__mobile__car_type_id__limit_day_type__remark',
                queryapi: '/cityprepaycard/query',
                exportapi: '/prepaycard/exportExcel',
                addapi: '/cityprepaycard/add',
                editapi: '/cityprepaycard/edit',
                delapi: '/cityprepaycard/delete',
                renewapi:'/cityprepaycard/renewproduct',
                delForm:{},
                delVisible:false,
                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: '',
                hideOptions: undefined,
                showSetSMS:false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: false,
                hideAdd: true,
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                btswidth: '200',
                parklist: [],
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '储值卡编号',
                                prop: 'card_id',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '所属车场',
                                prop: 'park_id',
                                selectlist: this.parklist,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.parklist, 'park_id');
                                    if(str == '请选择')str='';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                addtable:true,
                                editable: true,
                                "type": "select",
                                "value": "",
                                "button": false,
                                "border": true,
                                "rules": [
                                    {required: true, message: '请选择所属车场', trigger: 'blur'}
                                ],
                                'size':'',
                                "options": this.parklist,
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车主姓名',
                                prop: 'name',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号码',
                                prop: 'car_number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入车牌号', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '账户余额',
                                prop: 'money',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系电话',
                                prop: 'mobile',
                                type: 'str',
                                selectlist: provincelist,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text"
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'ctime',
                                type: 'date',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.ctime))
                                    ]);
                                }
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '备注',
                                prop: 'remark',
                                type: 'input',
                                addable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            width:'150',
                            hidden:this.hideOptions,
                            unsortable: true,
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showEdit?'':'none'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = JSON.parse(JSON.stringify(params.row));
                                                this.editRowData.park_id = this.editRowData.park_id+'';
                                                this.editTo++;
                                            }
                                        }
                                    }, '编辑'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showmRefill?'':'none'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showrefill(params.index, params.row)
                                            }
                                        }
                                    }, '续费'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color:'#F54B4B',
                                            display:this.showdelete?'':'none'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.delForm = {
                                                    $index:params.index,
                                                    delVisible:true,
                                                    id:params.row.id,
                                                    card_id:params.row.card_id,
                                                    park_id:params.row.park_id,
                                                }
                                            }
                                        }
                                    }, '删除'),
                                ]);
                            }
                        }]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                readonly: true,
                datereadonly:true,
                refillFormRules: {
                    total: [
                        {required: true, message: '应收金额不能为空', trigger: 'blur'}
                    ]
                    ,
                    add_money: [
                        {required: true, message: '充值金额不能为空', trigger: 'blur'}
                    ],
                    car_number: [
                        {required: true, message: '请填写车牌号码', trigger: 'blur'}
                    ],
                    months: [
                        {required: true, message: '请选择购买月数', trigger: 'change', type: 'number'}
                    ],
                    // p_name: [
                    //     {required: true, message: '请选择包月产品', trigger: 'change',}
                    // ],
                    b_time: [
                        {required: true, message: '请选择起始日期', trigger: 'change', type: 'date'}
                    ],
                    limit_day_type: [
                        {required: true, message: '请选择限行限制', trigger: 'change', type: 'number'}
                    ],

                },
                pname: [],
                newPname: [],
                cartype: [],
                refillForm: {
                    park_id:'',
                    id:'',
                    name: '',
                    car_number: '',
                    p_lot:'',
                    p_name: '',
                    months: '',
                    b_time: '',
                    total: '',
                    add_money: '',
                    mobile: '',
                    remark: '',
                },
                p_name: 'p_name',
                months: 'months',
                b_time: 'b_time',
                total: 'total',
                add_money: 'add_money',
                car_number: 'car_number',
                limit_day_type: 'limit_day_type',
                singleDoubleType: [
                    {'value_name': '不限制', 'value_no': 0},
                    {'value_name': '限制', 'value_no': 1}
                ],
                timerType:[
                    {
                        'value_name':'创建时间',
                        'value_no':'3'
                    }
                ],
                refillstartDate: 0,

            }
        },
        methods: {
            goShopSms(){
                this.setSmSVible = false;
                sessionStorage.setItem('highlightindex', '/systemManage_AddedService_Sms');
                this.$router.push({path: '/systemManage_AddedService_Sms'});

            },
            //短信设置
            setSMS(){
                let _this = this;
                axios.get(path+this.getsms, {
                    params: { 'comid': sessionStorage.getItem('comid') }
                }).then(function (response) {
                    if(response.status == 200){
                        _this.setSmSVible = true;
                        _this.smsData = response.data;
                    }else{
                        _this.$message({
                            message: '获取失败，请稍后重试',
                            type: 'error',
                            duration: 600
                        });
                    }
                }).catch(function (error) {
                    _this.$message({
                        message: '获取失败，请稍后重试',
                        type: 'error',
                        duration: 600
                    });
                });
            },
            handleSmS(){
                let _this = this;
                let aform = this.smsData;
                aform.comid = sessionStorage.getItem('comid');
                _this.$axios.post(path + '/vip/tomessageset', _this.$qs.stringify(aform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    if(response.status == 200){
                        let res = response.data;
                        if(res.state == 1){
                            _this.setSmSVible = false;
                            _this.$message({
                                message: res.msg,
                                type: 'success',
                                duration: 600
                            });
                        }else{
                            _this.$message({
                                message: res.msg,
                                type: 'error',
                                duration: 600
                            });
                        }
                    }else{
                        _this.$message({
                            message: '设置失败,请稍后重试',
                            type: 'error',
                            duration: 600
                        });
                    }

                }).catch(function (error) {
                    _this.$message({
                        message: '设置失败,请稍后重试',
                        type: 'error',
                        duration: 600
                    });
                })
            },
            getProByCar:function(){
                //alert(this.refillForm.car_type_id);
                var carId = this.refillForm.car_type_id
                var _this = this;
                axios.all([common.getPNameByCar(carId)])
                    .then(axios.spread(function (retpname) {
                        _this.newPname = retpname.data;
                    }))
                _this.refillForm.p_name='';
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //云平台续费
            showrefill: function (index, row) {
                console.log('-------',index,row)
                let _this = this;
                 _this.refillstartDate=0;
                this.currentIndex = index;
                this.currentRow = row;
                this.refillForm.name = row.name;
                this.refillForm.card_id = row.card_id;
                this.refillForm.remark = row.remark;
                this.refillForm.id = row.id;
                this.refillForm.park_id = row.park_id;
                this.showRefill = true;
            },
            getTime: function (time) {
                this.refillForm.b_time = time
            },
            //提交续费
            handleRefill: function () {
                let _this = this;
                this.$refs.refillForm.validate((valid) => {
                    if (valid) {
                       _this.resetloading = true;
                       let aform = _this.refillForm;
                       aform = common.generateForm(aform);
                       _this.$axios.post(path + _this.renewapi, _this.$qs.stringify(aform), {
                           headers: {
                               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                           }
                       }).then(function (response) {
                           let ret = response.data;
                           if (ret > 0 || ret.state == 1) {
                               //更新成功
                               _this.$refs['tabPane'].getTableData({},_this);
                               _this.$message({
                                   message: '续费成功!',
                                   type: 'success',
                                   duration: 600
                               });
                               _this.showRefill = false;
                               // _this.refillForm.resetFields();
                               _this.$refs['refillForm'].resetFields()
                               _this.resetloading = false
                           } else {
                               //更新失败
                               _this.$message({
                                   message: ret.msg,
                                   type: 'error',
                                   duration: 1200
                               });
                                _this.resetloading = false
                           }
                       }).catch(function (error) {
                            console.log('===>>>prepaycard error:',error);
                            _this.$message({
                               message: "请求失败！请重新登录",
                               type: 'error',
                               duration: 1200
                           });
                           _this.resetloading = false;
                       })
                    }
                })

            },

            handleRegis: function () {
                let _this = this;
                this.$refs.refillForm.validate((valid) => {
                    if (valid) {
                        _this.resetloading = true;
                        let aform = _this.refillForm;
                        aform = common.generateForm(aform);
                        _this.$axios.post(path + _this.addapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {

                            let ret = response.data;

                            if (ret > 0 || ret.state == 1) {
                                //更新成功
                                _this.$refs['tabPane'].getTableData({},_this);
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.showRegis = false;
                                // _this.refillForm.resetFields();
                                _this.refillForm.name = '';
                                 _this.refillForm.p_lot = '';
                                 _this.refillForm.mobile = '';
                                 _this.refillForm.car_type_id = '';
                                _this.$refs['refillForm'].resetFields()
                                _this.resetloading = false
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                                 _this.resetloading = false
                            }
                        }).catch(function (error) {
                            _this.resetloading = false;
                        })
                    }
                })
            },
            getQuery(){
                let _this = this;
                axios.all([common.getPName(), common.getCarType(), common.getAllParks()])
                    .then(axios.spread(function (retpname, retcartype,parks) {
                        _this.pname = retpname.data;
                        _this.newPname = retpname.data;
                        _this.cartype = retcartype.data;

                        _this.parklist = parks.data;
                        _this.parklist.unshift({
                            value_name:'全部',
                            value_no:''
                        })
                    }))
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
                    park_id:'',
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                sform.park_id_start = sform.park_id;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
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
            cancelDel(){
                this.delForm.delVisible = false;
            },
            cancelEdit(){
                this.editFormVisible = false;
            },
            selectChange(val){
                // console.log('val',val)
            },
            registerMember(){
                this.showRegis = true;
                this.selectActive = '1';
            },
            closeDialog(){
                this.refillForm = {
                    park_id:'',
                    name: '',
                    car_number: '',
                    p_lot:'',
                    p_name: '',
                    months: '',
                    b_time: '',
                    total: '',
                    add_money: '',
                    mobile: '',
                    limit_day_type: 0,
                    remark: '',
                    car_type_id:'',
                    address:'',
                }
                this.$refs['refillForm'].resetFields()
            },
            //编辑的确认操作
            onEdit: function (eform) {
                //发送ajax,提交表单更新
                let that = this;
                let api = this.editapi;
                eform = common.generateForm(eform);
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    if (valid) {
                        editTableData(api,eform).then(res=>{
                            console.log('res成功之后的',res)
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '更新成功!',
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
                            console.log('月卡会员编辑提交错误',err)
                        })
                    }
                });
            },

            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_UNION.member_PrepayCardVIP == item.auth_id) {
                            this.hideExport = !common.showSubExport(item.sub_auth);
                            this.hideSearch = !common.showSubSearch(item.sub_auth);
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showmRefill = common.showSubReFill(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            // this.showSetSMS = common.showSetSMS(item.sub_auth);
                            // console.log(!this.showEdit&&!this.showdelete&&!this.showmRefill)
                            if(!this.showEdit&&!this.showdelete&&!this.showmRefill){
                                 this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
                            break;
                        }
                    }

                }

            }
        },
        beforeMount(){
            this.currentHeight = common.gwh() - 55 ;
        },
        mounted() {
            this.setAuthorityFn()
            this.getQuery();
            this.$refs['tabPane'].getTableData({},this);

        },
        activated() {

        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
            parklist: function (val) {
                this.tableitems[1].subs[0].options = val;
            },
        }
    }

</script>
<style lang="scss" scoped>
    .sms-header{
        position: relative;
        height:55px;
        background:rgba(216,216,216,0.273);
        border-radius:4px;
        line-height: 55px;
        padding: 0 29px;
        margin-bottom: 40px;
        p{
            font-size: 16px;
            color: #363636;
            .sms-count{
                margin-left: 25px;
                margin-right: 5px;
                font-size: 22px;
                color: #3C75CF;
            }
        }
        .renewal-btn{
            position: absolute;
            top:50%;
            right: 30px;
            transform: translateY(-50%);
            width:97px;
            height:31px;
            line-height: 31px;
            text-align: center;
            background:linear-gradient(151deg,rgba(250,217,97,1) 0%,rgba(247,107,28,1) 100%);
            border-radius:23px 23px 23px 23px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            .renewalImg{
                vertical-align: middle;
                margin-right: 3px;
            }
        }
    }
</style>
