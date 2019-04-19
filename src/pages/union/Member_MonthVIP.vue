<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员<span style="margin: 2px">-</span>月卡会员</p>
                <div class="float-right">
                    <el-button type="text"  @click="registerMember" native-type="button" icon="el-icon-plus" v-show="showCustomizeAdd">注册月卡</el-button>
                    <el-button type="text"  @click="handleImport" native-type="button" icon="el-icon-upload" v-show="hideImport">导入月卡</el-button>
                    <el-button type="text"  @click="exportFn" native-type="button" icon="el-icon-printer" v-show="hideExport">导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="车主姓名" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入车主姓名" class="shop-custom-input"></el-input>
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
                        <el-form-item label="购买时间">
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
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.com_id" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号" class="clear-style margin-left-20">
                            <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" class="shop-custom-input" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                        </el-form-item>
                        <!--<div class="float-right">-->
                            <!--<el-form-item class="shop-clear-style">-->
                                <!--<el-button type="primary"  @click="exportFn" native-type="button">导出</el-button>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                    </div>

                </el-form>
            </div>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :delapi="delapi"
                    :del-form="delForm"
                    v-on:cancelDel="cancelDel"
                    :editTo="editTo"
                    :editapi="editapi"
                    :editRowData="editRowData"
                    v-on:editInput="editInput"
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    :format-collectors="cartype"
                    :pname="singleDoubleType"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>

        <el-dialog
                :show-close="false"
                :visible.sync="showUpload"
                custom-class="import-owners"
                width="479px">
            <header class="dialog-header" slot="title">
                导入月卡<i class="el-icon-close dialog-header-iconfont" @click="showUpload = false"></i>
            </header>
            <div class="import-tip">
                请选择Excel文件，支持xls,xlsx等格式。 <a href="https://image.bolink.club/monthcard.xlsx" download class="import-download">点击下载</a>
            </div>
            <div class="import-input-wrapper">
                <el-upload class="upload-demo" ref="upload" :action="uploadapi" :auto-upload="false"
                           :on-success="uploadSuccess" :on-remove="handleRemove" :on-change="handleChange">
                    <el-button slot="trigger" size="small" type="primary" @click="handleSelect">选取文件</el-button>
                    <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定导入-->
                    <!--</el-button>-->
                    <!--<div slot="tip" class="el-upload__tip">请选择Excel文件，支持xls,xlsx等格式</div>-->
                </el-upload>
            </div>
            <div style="margin-top: 15px;height: 20px" v-html="uploadMsg"></div>
            <div style="margin-top:15px;text-align:center">
                <el-button style="margin-left: 10px;box-shadow: 0 3px 6px 0 rgba(51,121,233,0.30);" type="primary" @click="submitUpload">确定导入</el-button>
            </div>

        </el-dialog>


        <!--注册和编辑月卡-->
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
                            <el-form-item label="所属车场">
                                <el-select v-model="refillForm.comid" @change="getCarTypeFn" style="width:100%" filterable>
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
                            <el-form-item label="起始日期" :prop="b_time">
                                <el-date-picker type="date" placeholder="选择日期时间" v-model="refillForm.b_time" style="width:100%"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="购买月数" :prop="months">
                                <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:100%">
                                    <el-option
                                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                            :label="item"
                                            :value="item"
                                            :key="item"
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
                                <el-select v-model="refillForm.car_type_id" placeholder="所属车场为全部时，无需选择" filterable @change="getProByCar" style="width:100%" :disabled="unavailable">
                                    <el-option
                                            v-for="item in cartype"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                            :key="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="包月产品" :prop="p_name">
                                <el-select v-model="refillForm.p_name" placeholder="所属车场为全部时，无需选择" filterable @change="getRefillTotal" style="width:100%" :disabled="unavailable">
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
    </section>
</template>

<script>

    import {
        centerpayset,
        singleDoubleType,
        path
    } from '../../api/api';

    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import TabPane from '../../components/table/TabPane';
    import AddDate from '../../components/add-subs/AddDate';

    import axios from 'axios';

    export default {
        components: {
            TabPane,
            AddDate

        },
        data() {
            return {
                isShow:false,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    currentData:'',
                    car_number:'',
                    com_id:'',
                    pid:'',
                    name:''
                },
                searchForm:{},
                /////////////////////////////////////////
                orderfield:'id',
                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                hideImport:false,
                tableheight: '',
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: true,
                hideAdd: true,
                showUploadMonthCard: true,
                queryapi: '/cityvip/query',
                exportapi: '/cityvip/exportExcel',
                addapi: '/cityvip/add',
                editapi: '/cityvip/edit',
                delapi: '/cityvip/delete',
                uploadapi: path + '/cityvip/importExcel?1=1' + common.commonParams(),
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                btswidth: '200',
                fieldsstr: 'id__pid__com_id__name__car_number__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'memner-monthvip',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '月卡编号',
                                prop: 'id',
                                type: 'number',
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },{
                        hasSubs: false, subs: [
                            {
                                label: '所属车场',
                                prop: 'com_id',
                                type: 'selection',
                                selectlist: this.parklist,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.parklist, 'com_id');
                                    if(str == '请选择')str='';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            }
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
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '购买时间',
                                prop: 'create_time',
                                type: 'date',
                                width:'160',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                },
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.create_time))
                                    ]);
                                }
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '开始时间',
                                prop: 'b_time',
                                type: 'date',
                                width:'160',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.b_time);
                                },
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.b_time))
                                    ]);
                                }
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '结束时间',
                                prop: 'e_time',
                                type: 'date',
                                width:'160',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.e_time);
                                },
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.e_time))
                                    ]);
                                }
                            }

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '套餐名称',
                                prop: 'pid',
                                width: '100',
                                type: 'selection',
                                selectlist: this.pname,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    return common.nameformat(row, this.pname, 'pid');
                                },
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.nameformat(params.row, this.pname, 'pid'))
                                    ]);
                                }
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系电话',
                                prop: 'mobile',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                hidden:true,
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
                                selectlist: singleDoubleType,
                                editable: true,
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                hidden:true,
                                align: 'center',
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
                datereadonly: true,
                pname: [],
                cartype: [],
                p_name: 'p_name',
                newPname: [],
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
                refillstartDate: 0,
                parklist: [],
                showUpload: false,
                uploadMsg: '',
            //    注册月卡------------
                refillForm: {
                    comid:'',
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
                selectActive:'1',
                unavailable:true,
                //编辑
                editRowData:{},
                editTo:0,
                editFormVisible:false,
                editloading:false,
                rowdata:{},
                delForm:{},
                delVisible:false,
            };
        },
        methods: {
            cancelDel(){
                this.delForm.delVisible = false;
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //当选择所属车场后获取车辆类型
            getCarTypeFn(val){
                if(val === ''){
                    this.cartype = [];
                    this.newPname = [];
                    this.refillForm.car_type_id = '';
                    this.refillForm.p_name = '';
                    this.unavailable=true;
                }else{
                    let _this = this;
                    this.refillForm.car_type_id = '';
                    this.refillForm.p_name = '';
                    this.unavailable=false;
                    axios.get(path+'/getdata/getcartype',{
                        params:{
                            token:sessionStorage.getItem('token'),
                            comid:val,
                            loginuin:sessionStorage.getItem('loginuin'),
                            supperadmin:sessionStorage.getItem('supperadmin'),
                            nickname1:encodeURI(encodeURI(sessionStorage.getItem('nickname1')))
                        }
                    }).then((response)=>{
                        _this.cartype = response.data;
                    })
                }
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
            getProByCar:function(){
                //alert(this.refillForm.car_type_id);
                var carId = this.refillForm.car_type_id;
                var comId = this.refillForm.comid;
                var _this = this;
                axios.get(path+'/getdata/getpnamebycar',{
                    params:{
                        carId:carId,
                        token:sessionStorage.getItem('token'),
                        comid:comId,
                        loginuin:sessionStorage.getItem('loginuin'),
                        supperadmin:sessionStorage.getItem('supperadmin'),
                        nickname1:encodeURI(encodeURI(sessionStorage.getItem('nickname1')))
                    }
                }).then((response)=>{
                    _this.newPname = response.data;
                })
                _this.refillForm.p_name='';
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
            selectChange(val){
                // console.log('val',val)
            },
            closeDialog(){
                this.refillForm = {
                    comid:'',
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
            registerMember(){
                this.refillForm.remark = '云平台注册';
                this.showRegis = true;
                this.selectActive = '1';
            },
            handleImport: function () {
                this.showUpload = true;
                this.handleSelect();
            },
            handleSelect() {
                //点击选择文件，清空当前文件列表和上传信息
                this.$refs.upload.clearFiles();
                this.uploadMsg = '';
            },
            submitUpload() {
                //上传文件
                this.$refs.upload.submit();
            },

            handleChange(file, fileList) {
                // console.log(file);
                // console.log(fileList);
                //校验文件
                let that = this;
                if (!(file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
                    this.$alert('请选择正确的Excel文件', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            that.$refs.upload.clearFiles();
                        }
                    });
                }

            },
            handleRemove(file, fileList) {
                this.uploadMsg = '';
            },
            uploadSuccess(response, file, filelist) {
                // console.log(response);
                // console.log(file);
                // console.log(filelist);
                this.$message({
                    message: '上传成功!',
                    type: 'success',
                    duration: 600
                });
                this.uploadMsg = response.msg;
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
                    currentData:'',
                    car_number:'',
                    com_id:'',
                    pid:'',
                    name:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                if(sform.currentData != null && sform.currentData != ''){
                    sform.create_time = 'between';
                    sform.create_time_start = sform.currentData[0];
                    sform.create_time_end = sform.currentData[1];
                }
                sform.com_id_start = sform.com_id;
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
            getQuery(){
                // common.getCarType(),retcartype,
                // _this.cartype = retcartype.data;
                let _this = this;
                axios.all([common.getAllPName(), common.getAllParks()])
                    .then(axios.spread(function (retpname,parks) {
                        _this.pname = retpname.data;
                        _this.parklist = parks.data;
                        _this.parklist.unshift({
                            value_name:'全部',
                            value_no:''
                        })
                        if (_this.parklist != undefined) {
                            for (let park of _this.parklist) {
                                park.ischeck = false;
                            }
                        }
                    }));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_UNION.member_MonthVIP == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            this.hideImport = common.showSubImport(item.sub_auth);
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showmRefill = common.showSubReFill(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            if(!this.showEdit&&!this.showdelete){
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
                            break;
                        }
                    }

                }
            },
            ///////////////////////////////////////////////////


        },
        mounted() {
            this.setAuthorityFn();
            this.getQuery();
            this.initFn(this);
        },
        activated() {


        },
        watch: {
            pname: function (val) {
                this.tableitems[1].subs[0].selectlist = val;
            },
            // cartype: function (val) {
            //     this.tableitems[11].subs[0].selectlist = val;
            // },
            parklist: function (val) {
                this.tableitems[2].subs[0].selectlist = val;
            },
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            }
        }
    };

</script>
