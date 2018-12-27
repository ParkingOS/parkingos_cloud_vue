<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员<span style="margin: 2px">-</span>月卡会员</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleImport" native-type="button" icon="el-icon-upload">导入月卡</el-button>
                    <el-button type="text"  @click="exportFn" native-type="button" icon="el-icon-printer">导出</el-button>
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
                导入业主<i class="el-icon-close dialog-header-iconfont" @click="showUpload = false"></i>
            </header>
            <div class="import-tip">
                请选择Excel文件，支持xls,xlsx等格式。 <a href="https://image.bolink.club/%E4%B8%9A%E4%B8%BB%E7%AE%A1%E7%90%86.xlsx" download class="import-download">点击下载</a>
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

        <!--<el-dialog-->
                <!--title="导入月卡"-->
                <!--:visible.sync="showUpload"-->
                <!--width="30%">-->
            <!--<el-upload class="upload-demo" ref="upload" :action="uploadapi" :auto-upload="false"-->
                       <!--:on-success="uploadSuccess" :on-remove="handleRemove" :on-change="handleChange">-->
                <!--<el-button slot="trigger" size="small" type="primary" @click="handleSelect">选取文件</el-button>-->
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定导入-->
                <!--</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">请选择Excel文件，支持xls,xlsx等格式</div>-->
            <!--</el-upload>-->
            <!--<div v-html="uploadMsg"></div>-->
            <!--<span slot="footer" class="dialog-footer">-->
				<!--<el-button @click="showUpload = false" size="small" type="primary">确 定</el-button>-->
			<!--</span>-->
        <!--</el-dialog>-->

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
                tableheight: '',
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: false,
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
                                format: (row) => {
                                    let result = common.nameformat(row, this.parklist, 'com_id');
                                    if (result == '请选择')
                                        result = '';
                                    return result;
                                },
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
                                label: '车主姓名',
                                prop: 'name',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号',
                                prop: 'car_number',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
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
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                readonly: true,
                datereadonly: true,
                pname: [],
                cartype: [],
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
                refillstartDate: 0,
                parklist: '',
                showUpload: false,
                uploadMsg: ''
            };
        },
        methods: {
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
                let _this = this;
                axios.all([common.getAllPName(), common.getCarType(), common.getAllParks()])
                    .then(axios.spread(function (retpname, retcartype, parks) {
                        _this.pname = retpname.data;
                        _this.cartype = retcartype.data;
                        _this.parklist = parks.data;
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
                            break;
                        }
                    }

                }
            },
            ///////////////////////////////////////////////////


        },
        mounted() {
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
            }
        }
    };

</script>