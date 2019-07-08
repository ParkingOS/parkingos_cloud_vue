<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员管理<span style="margin: 2px">-</span>月卡会员</p>
                <div class="float-right">
                    <el-button type="text" icon="el-icon-message" @click="setSMS" v-if="showSetSMS">短信设置</el-button>
                    <el-button type="text" icon="el-icon-printer"  @click="exportFn" native-type="button" v-if="!hideExport">导出</el-button>
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="车主姓名" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入车主姓名" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="月卡编号" class="clear-style">
                            <el-input v-model="searchFormData.card_id" placeholder="请输入月卡编号" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="套餐名称" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.pid" placeholder="请选择" class="shop-custom-input">
                                <el-option
                                        v-for="item in pname"
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
                                <el-button type="primary" @click="registerMember" v-if="showCustomizeAdd">注册会员</el-button>
                                <!--<el-button type="primary"  @click="exportFn" native-type="button" v-if="!hideExport">导出</el-button>-->
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
                月卡续费<i class="el-icon-close dialog-header-iconfont" @click="showRefill = false"></i>
            </header>
            <el-form ref="refillForm" label-width="120px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-form-item label="包月产品" :prop="p_name">
                    <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal"  style="width: 100%">
                        <el-option
                                v-for="item in pname"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="续费月数" :prop="months">
                    <el-select v-model="refillForm.months" @change="getRefillTotal"   style="width: 100%">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应收金额" :prop="total">
                    <el-input v-model.trim="refillForm.total" placeholder=""  :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="实收金额" :prop="act_total">
                    <el-input v-model.trim="refillForm.act_total"   placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-date-picker type="datetime" v-model="refillstartDate"  style="width: 100%"
                     :readonly='datereadonly' @change="changeEndDate" value-format="timestamp"></el-date-picker>
                </el-form-item>

                <el-form-item label="结束日期">
                    <el-date-picker type="datetime" v-model="refillEndDate"  style="width: 100%"
                     :readonly='datereadonly2'></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model.trim="refillForm.remark"  placeholder="" :readonly=true></el-input>
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
                注册会员<i class="el-icon-close dialog-header-iconfont" @click="showRegis = false"></i>
            </header>
            <el-form ref="refillForm" label-width="120px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-tabs v-model="selectActive" @tab-click="selectChange"  type="card">
                    <el-tab-pane name="1">
                        <span slot="label"><i style="color: red">*</i> 必填项</span>
                        <div class="dialog-form-width">
                            <el-form-item label="车牌号码" :prop="car_number">
                                <el-input v-model.trim="refillForm.car_number" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="起始日期" :prop="b_time">
                                <el-date-picker type="date" placeholder="选择日期时间" v-model="refillForm.b_time" style="width:100%"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="购买月数" :prop="months">
                                <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:100%">
                                    <el-option
                                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                            :label="item"
                                            :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单双日限行">
                                <el-radio-group v-model="refillForm.limit_day_type" style="width: 250px">
                                    <el-radio  v-for="(item,index) in singleDoubleType" :key="index" :label="item.value_no" border>{{item.value_name}}</el-radio >
                                </el-radio-group>
                            </el-form-item>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="选填项" name="0">
                        <div class="dialog-form-width">
                            <el-form-item label="车主姓名">
                                <el-input v-model.trim="refillForm.name" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="车位">
                                <el-input v-model.trim="refillForm.p_lot" placeholder="多个车位,用英文','隔开"></el-input>
                            </el-form-item>
                            <el-form-item label="车辆类型">
                                <el-select v-model="refillForm.car_type_id" @change="getProByCar" style="width:100%">
                                    <el-option
                                            v-for="item in cartype"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="包月产品" :prop="p_name">
                                <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal" style="width:100%">
                                    <el-option
                                            v-for="item in newPname"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model.trim="refillForm.mobile"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-input v-model.trim="refillForm.address" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model.trim="refillForm.remark" placeholder="" :readonly=true></el-input>
                            </el-form-item>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="showRegis = false"  style="width: 90px;">取 消</el-button>
                <el-button type="primary"  @click="handleRegis" :loading="resetloading" style="width: 90px;margin-left: 60px">确 定</el-button>
            </footer>
        </el-dialog>

        <!--短信通知设置-->
        <el-dialog
                width="600px"
                :show-close="false"
                :visible.sync="setSmSVible"
                custom-class="custom-dialog custom-dialog-sms"
                @close="closeDialog">
            <header class="dialog-header" slot="title">
                短信通知设置<i class="el-icon-close dialog-header-iconfont" @click="setSmSVible = false"></i>
            </header>
            <div class="sms-header">
                <p>短信剩余<span class="sms-count"><countTo :startVal='0' :endVal='smsData.message_count' :duration='1000'></countTo></span>条</p>
                <div class="renewal-btn" @click="goShopSms" v-show="showParkItem_const.systemManage_AddedService_Sms"><img :src="renewalImg" class="renewalImg">去续费</div>
            </div>
            <el-form ref="refillForm" label-width="120px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-form-item label="续费提前通知">
                    <el-select v-model="smsData.before_notice" style="width: 100%">
                        <el-option
                                v-for="item in [3,5,10,30]"
                                :label="item"
                                :value="item"
                        >
                            <span style="float: left">{{ item }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">天</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="短信通知频率">
                    <el-select v-model="smsData.send_freq"   style="width: 100%">
                        <el-option label="每天一条" :value="0"></el-option>
                        <el-option label="只发一次" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月卡购买通知">
                    <el-radio-group v-model="smsData.notice_switch">
                        <el-radio :label="1">开</el-radio>
                        <el-radio :label="0">关</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="setSmSVible = false" class="custom-btns-style">取 消</el-button>
                <el-button type="primary"  @click="handleSmS" :loading="resetloading" style="margin-left: 60px" class="custom-btns-style">确 定</el-button>
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
    } from '@/api/api';

    import common from '@/common/js/common'
    import { AUTH_ID, showParkItem_const } from '@/common/js/const'
    import CommonTable from '@/components/CommonTable'
    import AddDate from '@/components/add-subs/AddDate'
    import TabPane from '@/components/table/TabPane';
    import countTo from 'vue-count-to';
    import axios from 'axios'
    import ElRadioButton from 'element-ui/packages/radio/src/radio-button';
    import { editTableData } from '@/api/base'
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
                showParkItem_const:showParkItem_const,
                noimg:require('@/assets/images/no.png'),
                offimg:require('@/assets/images/off.png'),
                highlightindex:sessionStorage.getItem('highlightindex'),
                renewalImg:require('@/assets/images/renewal.png'),
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
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                    pid:'',
                    pid_start:'',
                },
                orderfield:'id',
                fieldsstr: 'id__card_id__pid__name__car_number__p_lot__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                queryapi: '/vip/query',
                exportapi: '/vip/exportExcel',
                addapi: '/vip/add',
                editapi: '/vip/edit',
                delapi: '/vip/delete',
                getsms:'/vip/getmessageset',
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
                showdelete: false,
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
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'month-member',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '月卡编号',
                                prop: 'card_id',
                                width: '100',
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
                                label: '车牌号码',
                                prop: 'car_number',
                                width: '145',
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
                                label: '车主姓名',
                                prop: 'name',
                                width:'120',
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
                                label: '联系电话',
                                prop: 'mobile',
                                width: '120',
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
                                label: '车位',
                                prop: 'p_lot',
                                width: '175',
                                type: 'str',
                                addable: false,
                                editable: true,
                                hidden:true,
                                searchable: false,
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
                                label: '单双日限行',
                                prop: 'limit_day_type',
                                width: '123',
                                type: 'radio',
                                selectlist: singleDoubleType,
                                editable: true,
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                hidden:true,
                                align: 'center',
                                format: function (row) {
                                    return common.nameformat(row, singleDoubleType, 'limit_day_type')
                                },
                                "type": "radio",
                                "value": "",
                                "button": false,
                                "border": true,
                                "rules": [],
                                'size':'',
                                "options": singleDoubleType
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '开始时间',
                                prop: 'b_time',
                                width: '180',
                                type: 'date',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.b_time))
                                    ]);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '结束时间',
                                prop: 'e_time',
                                width: '180',
                                type: 'date',
                                selectlist: centerpayset,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.e_time))
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
                                // width:'103',
                                type: 'str',
                                addable: true,
                                editable: false,
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
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editRowData.limit_day_type = this.editRowData.limit_day_type+'';
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
                                            click: (e) => {
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
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.delForm = {
                                                    $index:params.index,
                                                    delVisible:true,
                                                    id:params.row.id,
                                                    card_id:params.row.card_id
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
                datereadonly2:true,
                refillFormRules: {
                    total: [
                        {required: true, message: '应收金额不能为空', trigger: 'blur'}
                    ]
                    ,
                    act_total: [
                        {required: true, message: '实收金额不能为空', trigger: 'blur'}
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
                    name: '',
                    car_number: '',
                    p_lot:'',
                    p_name: '',
                    months: '',
                    b_time: '',
                    e_time:'',
                    total: '',
                    act_total: '',
                    mobile: '',
                    limit_day_type: 0,
                    remark: '',
                    car_type_id:'',
                    address:'',
                },
                p_name: 'p_name',
                months: 'months',
                b_time: 'b_time',
                total: 'total',
                act_total: 'act_total',
                car_number: 'car_number',
                limit_day_type: 'limit_day_type',
                singleDoubleType: [
                    {'value_name': '不限制', 'value_no': 0},
                    {'value_name': '限制', 'value_no': 1}
                ],
                timerType:[
                    {
                        'value_name':'开始时间',
                        'value_no':'1'
                    },
                    {
                        'value_name':'结束时间',
                        'value_no':'2'
                    },
                    {
                        'value_name':'购买时间',
                        'value_no':'3'
                    },
                ],
                refillstartDate: 0,
                refillEndDate:0,

            }
        },
        methods: {
            changeEndDate(){
                console.log("change beginTime:"+this.refillstartDate+"~~"+this.refillForm.months)
                if (this.refillForm.months == ''){
                    return;
                }

                let _this = this;
                let newDate = new Date();

                _this.refillEndDate = new Date(newDate.setTime(_this.refillstartDate));

                axios.all([common.getEndTime(new Date(this.refillstartDate).getTime(), this.refillForm.months)])
                    .then(axios.spread(function (endTime) {
                        console.log("==endTime.data:"+endTime.data);
                        _this.refillEndDate  =endTime.data ;
                    }))
            },
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
                 _this.refillEndDate=0;
                this.currentIndex = index;
                this.currentRow = row;
                this.refillForm.p_name ='';
                let now = new Date().getTime();
                let endtime = row.e_time;
                this.refillForm.remark = '云平台续费';
                let newDate = new Date();
                if (now / 1000 > endtime) {
                    _this.refillstartDate = newDate.setTime(now);
                } else {
                    _this.refillstartDate = newDate.setTime(endtime * 1000);
                }
                console.log("begin:"+_this.refillstartDate)
                for (let item of this.pname) {
                    if (row.pid == item.value_no) {
                        this.refillForm.p_name = item.value_name;
                        this.showRefill = true;
                        this.readonly = true;
                        return;
                    }
                }

                //如果当前套餐在套餐列表中，则应收是readonly
                //当前套餐不存在，则应收可以自由填写
                this.readonly = false;
                this.showRefill = true;
            },
            getTime: function (time) {
                this.refillForm.b_time = time
            },
            //提交月卡续费
            handleRefill: function () {
                let _this = this;
                this.$refs.refillForm.validate((valid) => {
                    if (valid) {
                        //if(_this.datereadonly){
                        //    _this.currentRow.e_time=_this.currentRow.e_time>new Date().valueOf()/1000?_this.currentRow.e_time:new Date().valueOf()/1000
                        //}else{
                        //    _this.currentRow.e_time = Date.parse(new Date(this.refillstartDate))/1000
                        //}

                        _this.currentRow.e_time = Date.parse(new Date(this.refillstartDate))/1000
                        _this.currentRow.name=_this.currentRow.name==undefined?'':_this.currentRow.name

                        _this.refillForm.e_time =  Date.parse(new Date(this.refillEndDate))/1000
                        console.log("to refill:"+ _this.currentRow.e_time+"~~"+_this.refillForm.e_time)
                        _this.resetloading = true;
                        axios.all([common.reNewProduct(_this.refillForm.p_name, _this.refillForm.months, encodeURI(encodeURI(_this.currentRow.name)), _this.currentRow.e_time, _this.currentRow.id, encodeURI(encodeURI(_this.refillForm.remark)), _this.refillForm.act_total,_this.refillForm.total, encodeURI(encodeURI(sessionStorage.getItem('nickname'))),encodeURI(encodeURI(_this.currentRow.card_id)),_this.refillForm.e_time)])
                            .then(axios.spread(function (ret) {
                                let data = ret.data;
                                // console.log(data)
                                if (data.state == 1) {
                                    _this.initFn(_this)
                                    _this.$message({
                                        message: '续费成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    _this.showRefill = false;
                                    // _this.refillForm.resetFields()
                                    _this.$refs['refillForm'].resetFields();
                                    _this.refillForm.p_name = ''
                                } else {
                                    //更新失败
                                    _this.$message({
                                        message: data.msg + '!',
                                        type: 'error',
                                        duration: 600
                                    });
                                }
                                _this.resetloading = false;
                            }))
                    }
                })

            },
            getRefillTotal: function () {
                this.readonly = false;
                for (let item of this.pname) {
                    // console.log(this.refillForm.p_name+'  '+item.value_name)
                    if (this.refillForm.p_name == item.value_name || this.refillForm.p_name == item.value_no) {
                        this.refillForm.p_name = item.value_no;
                        this.readonly = true;
                        // console.log('rrrrrreadonly true')
                        break;
                    }
                }

                if (this.refillForm.months == '')
                    return;


                let _this = this;
                console.log("change months:"+_this.refillstartDate+"~~month:"+this.refillForm.months)
                let newDate = new Date();

                _this.refillEndDate = new Date(newDate.setTime(_this.refillstartDate));

                axios.all([common.getProdSum(this.refillForm.p_name, this.refillForm.months),common.getEndTime(_this.refillstartDate, this.refillForm.months)])
                    .then(axios.spread(function (ret,endTime) {
                        _this.refillForm.total = ret.data + '';
                        _this.refillForm.act_total = ret.data + '';
                        console.log("==endTime.data:"+endTime.data);
                        _this.refillEndDate  =endTime.data ;
                    }))
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
                axios.all([common.getPName(), common.getCarType()])
                    .then(axios.spread(function (retpname, retcartype) {
                        _this.pname = retpname.data;
                        _this.newPname = retpname.data;

                        _this.cartype = retcartype.data;
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
                    time_type:'3',
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    car_number:'',
                    name:'',
                    card_id:'',
                    pid:'',
                    pid_start:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.state_start = sform.state;
                sform.pay_type_start = sform.pay_type;
                sform.pid_start = sform.pid;
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
                this.refillForm.remark = '云平台注册';
                this.showRegis = true;
                this.selectActive = '1';
            },
            closeDialog(){
                this.refillForm = {
                    name: '',
                    car_number: '',
                    p_lot:'',
                    p_name: '',
                    months: '',
                    b_time: '',
                    total: '',
                    act_total: '',
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
                    if(user.self_setting){//如果设置了，那么日期可以修改
                        this.datereadonly=false;
                    }
                    if(user.end_time_setting){
                        this.datereadonly2=false;
                    }
                    for (var item of user.authlist) {
                        if (AUTH_ID.monthMember_VIP == item.auth_id) {
                            this.hideExport = !common.showSubExport(item.sub_auth);
                            this.hideSearch = !common.showSubSearch(item.sub_auth);
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showmRefill = common.showSubReFill(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            this.showSetSMS = common.showSetSMS(item.sub_auth);
                            console.log(!this.showEdit&&!this.showdelete&&!this.showmRefill)
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
                this.tableitems[10].subs[0].hidden = val
            }
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