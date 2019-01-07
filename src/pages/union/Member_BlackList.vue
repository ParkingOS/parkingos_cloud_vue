<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员<span style="margin: 2px">-</span>黑名单管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="exportFn" native-type="button" icon="el-icon-printer" v-if="hideExport">导出</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="车牌号" class="clear-style margin-left-20">
                            <el-input v-model="searchFormData.car_number" placeholder="请输入车牌号" class="shop-custom-input" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.state" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option label="漂白"  value="1"></el-option>
                                <el-option label="正常"  value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属车场" class="clear-style margin-left-20">
                            <el-select v-model="searchFormData.comid" filterable placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 160px">
                                <el-option
                                        v-for="item in parklist"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
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
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
        <!--修改状态-->
        <el-dialog
                title="修改状态"
                :visible.sync="showEditDialog"
                width="30%">
            <el-form ref="editform" label-width="120px" style="margin-bottom:-30px">
                {{this.editText}}
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handleEditState" :loading="resetloading">确 定</el-button>
        </span>
        </el-dialog>
    </section>
</template>

<script>
    import {
        path, blackStateType
    } from '../../api/api';
    import common from '../../common/js/common';
    import {AUTH_ID_UNION} from '../../common/js/const';
    import ComplexSearch from '../../components/ComplexSearch';
    import axios from 'axios';
    import TabPane from '../../components/table/TabPane';
    export default {
        components: {
            ComplexSearch,TabPane
        },
        data() {
            return {
                searchFormData:{
                    car_number:'',
                    comid:'',
                    state:''
                },
                searchForm:{},
                ///////////////////////////////////
                parklist: [],
                table: [],
                orderfield: '',
                ef: 'editref',
                af: 'addref',
                searchFormVisible: false,
                table: [],
                pageSize: 20,
                currentPage: 1,
                orderby: 'desc',
                orderfield: 'id',
                orderby: 'desc',
                sform: {},
                loading: false,
                rowdata: {},
                total: 0,
                showEditDialog: false,
                editform: {},

                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: common.gwh() - 143,
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: false,
                hideAdd: true,
                queryapi: '/cityblackuser/query',
                exportapi: '/cityblackuser/exportExcel',
                addapi: '/vip/add',
                editapi: '/cityblackuser/edit',
                delapi: '/vip/delete',
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                hideSearch: false,
                btswidth: '200',
                fieldsstr: 'id__mobile__car_number__black_uuid__state__comid__ctime__utime__remark',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                type: 'number',
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '手机',
                                prop: 'mobile',
                                type: 'str',
                                searchable: false,
                                hidden: true,
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
                                label: '状态',
                                prop: 'state',
                                type: 'selection',
                                selectlist: blackStateType,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.state;
                                    if(str == 1){
                                        str = '漂白'
                                    }else{
                                        str = '正常'
                                    }
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            }
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '所属车场',
                                prop: 'comid',
                                type: 'selection',
                                selectlist: this.parklist,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.parklist, 'comid');
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
                                label: '新建时间',
                                prop: 'ctime',
                                width: '160',
                                type: 'date',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.ctime))
                                    ]);
                                }
                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '修改时间',
                                prop: 'utime',
                                width: '160',
                                type: 'date',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.utime))
                                    ]);
                                }
                            }

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '备注',
                                prop: 'remark',
                                type: 'str',
                                addable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '100',
                            hidden:false,
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.handleEdit(params.index, params.row)

                                            }
                                        }
                                    }, params.row.state =='1'?'还原':'漂白'),

                                ]);
                            }
                        }]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                readonly: true,
                datereadonly: true,
                editText: '',
                currentState: '',
                currentId: ''
            };
        },
        methods: {
            handleEditState() {
                let _this = this;
                this.loading = true;
                _this.$axios.get(path + _this.editapi + '?state=' + _this.currentState + '&id=' + this.currentId +common.commonParams())
                    .then(function (response) {
                        _this.loading = false;
                        if (response.data.state == 1) {
                            _this.$message({
                                message: response.data.msg + '!',
                                type: 'success',
                                duration: 600
                            });
                            _this.searchFn();
                            // _this.getTableData(_this.sform);
                        } else {
                            _this.$message({
                                message: msg,
                                type: 'error',
                                duration: 1200
                            });
                        }

                    })
                    .catch(function (error) {
                        _this.loading = false;
                        _this.$message({
                            message: error,
                            type: 'error',
                            duration: 1200
                        });
                    });
                this.showEditDialog = false;
            },
            handleEdit(index, row) {
                this.showEditDialog = true;
                this.currentState = row.state;
                this.currentId = row.id;
                if (row.state == 1) {
                    this.editText = '确定要还原吗？';
                } else {
                    this.editText = '确定要漂白吗？';
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
                    car_number:'',
                    comid:'',
                    state:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                sform.comid_start = sform.comid;
                sform.state_start = sform.state;
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
                    for (let item of user.authlist) {
                        if (AUTH_ID_UNION.member_BlackList == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            if (!this.showEdit) {
                                this.hideOptions = true;
                            }
                            break;
                        }
                    }

                }
            },
        },
        mounted() {
            this.getQuery();
            this.setAuthorityFn();
            this.initFn(this);
        },
        activated() {


        },
        watch: {
            parklist: function (val) {
                this.tableitems[5].subs[0].selectlist = val;
            },
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        },
        created() {
            let _this = this;
            _this.$nextTick(function () {
                axios.all([common.getAllParks()])
                    .then(axios.spread(function (ret) {
                        console.log(ret);
                        _this.parklist = ret.data;
                    }));
            });

        }
    };

</script>