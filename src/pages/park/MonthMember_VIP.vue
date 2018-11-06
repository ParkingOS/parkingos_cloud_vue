<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            月卡会员
        </header>
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
                    <el-button type="primary" size="mini" @click="registerMember">注册会员</el-button>
                    <el-button size="mini" @click="exportFn">导出</el-button>
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
                <div class="second-search-item-style" v-show="isShow">
                    <el-form-item label="车主姓名" class="clear-style margin-left-clear">
                        <el-input v-model="searchFormData.name" placeholder="请输入车主姓名" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                    <el-form-item label="月卡编号" class="clear-style">
                        <el-input v-model="searchFormData.card_id" placeholder="请输入月卡编号" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐名称" class="clear-style margin-left-20">
                        <el-select v-model="searchFormData.pid" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in pname"
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
        <!--表单编辑-->
        <edit-form
                :editVisible="editFormVisible"
                :edititems="tableitems"
                :editloading="editloading"
                :rowdatas="rowdata"
                v-on:cancelEdit="cancelEdit"
                v-on:edit="onEdit"
                ref="editref">
        </edit-form>
        <!--月卡续费的dialog-->
        <el-dialog :visible.sync="showRefill" :show-close="false">
            <header class="dialog-header" slot="title">
                <span class="dialog-title-icon"></span>月卡续费
                <i class="iconfont icon-guanbi dialog-header-iconfont" @click="showRefill = false"></i>
            </header>
            <el-form ref="refillForm" label-width="200px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-form-item label="包月产品" :prop="p_name">
                    <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal" size="mini" style="width: 250px">
                        <el-option
                                v-for="item in pname"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="续费月数" :prop="months">
                    <el-select v-model="refillForm.months" @change="getRefillTotal"  size="mini" style="width: 250px">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应收金额" :prop="total">
                    <el-input v-model.trim="refillForm.total" placeholder=""  size="mini" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="实收金额" :prop="act_total">
                    <el-input v-model.trim="refillForm.act_total"  size="mini" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-date-picker type="datetime" v-model="refillstartDate"  size="mini" style="width: 250px"
                     :readonly='datereadonly'></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model.trim="refillForm.remark"  size="mini" placeholder="" :readonly=true></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handleRefill" :loading="resetloading" style="width: 90px;">确 定</el-button>
				<el-button @click="showRefill = false" size="small" style="width: 90px;margin-left: 60px">取 消</el-button>
			</footer>
        </el-dialog>
        <el-dialog :visible.sync="showRegis" custom-class="custom-dialog-register" @close="closeDialog">
            <header class="dialog-header" slot="title">
                <span class="dialog-title-icon"></span>注册会员
            </header>
            <el-form ref="refillForm" label-width="200px" :rules="refillFormRules" :model="refillForm" class="dialog-form-width">
                <el-tabs v-model="selectActive" @tab-click="selectChange" style="width: 600px" type="card">
                    <el-tab-pane name="1">
                        <span slot="label"><i style="color: red">*</i> 必填项</span>
                        <div class="dialog-form-width">
                            <el-form-item label="车牌号码" :prop="car_number">
                                <el-input v-model.trim="refillForm.car_number" size="mini" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="起始日期" :prop="b_time">
                                <el-date-picker type="date" placeholder="选择日期时间" size="mini" v-model="refillForm.b_time" style="width: 250px"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="购买月数" :prop="months">
                                <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:250px" size="mini">
                                    <el-option
                                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                            :label="item"
                                            :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单双日限行">
                                <el-radio-group v-model="refillForm.limit_day_type" size="mini" style="width: 250px">
                                    <el-radio  v-for="(item,index) in singleDoubleType" :key="index" :label="item.value_no" border>{{item.value_name}}</el-radio >
                                </el-radio-group>
                            </el-form-item>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="选填项" name="0">
                        <div class="dialog-form-width">
                            <el-form-item label="车主姓名">
                                <el-input v-model.trim="refillForm.name" size="mini" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="车位">
                                <el-input v-model.trim="refillForm.p_lot" size="mini" placeholder="多个车位,用英文','隔开"></el-input>
                            </el-form-item>
                            <el-form-item label="车辆类型">
                                <el-select v-model="refillForm.car_type_id" style="width:250px" size="mini">
                                    <el-option
                                            v-for="item in cartype"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="包月产品" :prop="p_name">
                                <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal" size="mini" style="width:250px">
                                    <el-option
                                            v-for="item in pname"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model.trim="refillForm.mobile" size="mini"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-input v-model.trim="refillForm.address" size="mini" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model.trim="refillForm.remark" size="mini" placeholder="" :readonly=true></el-input>
                            </el-form-item>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handleRegis" :loading="resetloading" style="width: 90px;">确 定</el-button>
                <el-button @click="showRegis = false" size="small" style="width: 90px;margin-left: 60px">取 消</el-button>
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
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import AddDate from '../../components/add-subs/AddDate'
    import TabPane from '../../components/table/TabPane';
    import EditForm from '../../components/EditForm';
    import axios from 'axios'
    import ElRadioButton from 'element-ui/packages/radio/src/radio-button';
    import { editTableData } from '../../api/base'
    export default {
        components: {
            ElRadioButton,
            CommonTable,
            AddDate,
            TabPane,
            EditForm
        },
        data() {
            return {
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
                    pid:''
                },
                orderfield:'id',
                fieldsstr: 'id__card_id__pid__name__car_number__p_lot__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                queryapi: '/vip/query',
                exportapi: '/vip/exportExcel',
                addapi: '/vip/add',
                editapi: '/vip/edit',
                delapi: '/vip/delete',
                delForm:{},
                delVisible:false,
                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: '',
                hideOptions: false,
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
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车主姓名',
                                prop: 'name',
                                width:'120',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
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
                                align: 'center'
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
                                align: 'center'
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
                                }
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
                                unsortable: false,
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
                                unsortable: false,
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
                            unsortable: true,
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editFormVisible = true;
                                                this.rowdata = params.row
                                            }
                                        }
                                    }, '编辑'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
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
                                            color:'#F54B4B'
                                        },
                                        on: {
                                            click: () => {
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
                cartype: [],
                refillForm: {
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
            }
        },
        methods: {
            //云平台续费
            showrefill: function (index, row) {
                console.log('-------',index,row)
                let _this = this;
                 _this.refillstartDate=0;
                this.currentIndex = index;
                this.currentRow = row;
                this.refillForm.p_name ='';
                let now = new Date().getTime();
                let endtime = row.e_time;
                this.refillForm.remark = '云平台续费';
                let newDate = new Date();
                if (now / 1000 > endtime) {
                    _this.refillstartDate = new Date(newDate.setTime(now));
                } else {
                    _this.refillstartDate = newDate.setTime(endtime * 1000);
                }

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
                        if(_this.datereadonly){
                            _this.currentRow.e_time=_this.currentRow.e_time>new Date().valueOf()/1000?_this.currentRow.e_time:new Date().valueOf()/1000
                        }else{
                            _this.currentRow.e_time = Date.parse(new Date(this.refillstartDate))/1000
                        }
                        _this.currentRow.name=_this.currentRow.name==undefined?'':_this.currentRow.name

                        _this.resetloading = true;
                        axios.all([common.reNewProduct(_this.refillForm.p_name, _this.refillForm.months, encodeURI(encodeURI(_this.currentRow.name)), _this.currentRow.e_time, _this.currentRow.id, encodeURI(encodeURI(_this.refillForm.remark)), _this.refillForm.act_total,_this.refillForm.total, encodeURI(encodeURI(sessionStorage.getItem('nickname'))),encodeURI(encodeURI(_this.currentRow.card_id)))])
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
                // console.log('计算续费金额' + this.refillForm.p_name + ' -- ' + this.refillForm.months)
                // if (this.refillForm.p_name == '' || this.refillForm.months == '')
                //     return;

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
                axios.all([common.getProdSum(this.refillForm.p_name, this.refillForm.months)])
                    .then(axios.spread(function (ret) {
                        _this.refillForm.total = ret.data + '';
                        _this.refillForm.act_total = ret.data + '';
                        // console.log(ret.data)
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
                    pid:''
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
        },
        beforeMount(){
            this.currentHeight = common.gwh() - 55 ;
        },
        mounted() {
            this.currentHeight = common.gwh() - 55 ;
            window.addEventListener('resize', () => {
                this.currentHeight = common.gwh() - 55;
            });
            this.getQuery();
            this.$refs['tabPane'].getTableData({},this);
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if(user.self_setting){//如果设置了，那么日期可以修改
                    this.datereadonly=false;
                }
            }
        },
        activated() {

        },
        watch: {

        }
    }

</script>