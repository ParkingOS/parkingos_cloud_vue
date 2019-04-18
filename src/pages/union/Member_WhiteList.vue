<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">会员<span style="margin: 2px">-</span>白名单管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleImport" native-type="button" icon="el-icon-upload"  v-show="hideImport">导入白名单</el-button>
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
                                <el-option label="已过期"  value="0"></el-option>
                                <el-option label="正常"  value="1"></el-option>
                            </el-select>
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

                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                        <el-form-item class="float-right">
                            <el-button type="primary"  @click="handleAdd" native-type="button" icon="el-icon-plus" v-if="showCustomizeAdd">添加</el-button>
                        </el-form-item>
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
                    :addTo="addTo"
                    :addapi="addapi"
                    :addRowData="addRowData"
                    v-on:addInput="addInput"
                    :delapi="delapi"
                    :del-form="delForm"
                    v-on:cancelDel="cancelDel"
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

        <!--导入白名单-->
        <el-dialog
                :show-close="false"
                :visible.sync="showUpload"
                custom-class="import-owners"
                width="479px">
            <header class="dialog-header" slot="title">
                导入白名单<i class="el-icon-close dialog-header-iconfont" @click="showUpload = false"></i>
            </header>
            <div class="import-tip">
                请选择Excel文件，支持xls,xlsx等格式。 <a href="https://image.bolink.club/whitelist.xls" download class="import-download">点击下载</a>
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
    import ElFormItem from 'element-ui/packages/form/src/form-item';
    export default {
        components: {
            ElFormItem,
            ComplexSearch,TabPane
        },
        data() {
            return {
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{

                },
                addTo:0,
                //删除
                delForm:{},
                uploadMsg:'',
                showUpload: false,
                ///////////////////////////////////////
                searchFormData:{
                    car_number:'',
                    park_id:'',
                    state:''
                },
                searchForm:{},
                ///////////////////////////////////
                parklist: [],
                table: [],
                ef: 'editref',
                af: 'addref',
                searchFormVisible: false,
                pageSize: 20,
                currentPage: 1,
                orderfield: 'id',
                orderby: 'desc',
                sform: {},
                loading: false,
                rowdata: {},
                total: 0,
                showEditDialog: false,
                editform: {},
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: common.gwh() - 143,
                hideOptions: false,
                showEdit: false,
                showdelete: false,
                showModifyCarNumber: true,
                showmRefill: false,
                showCustomizeAdd: false,
                hideImport:false,
                hideAdd: false,
                uploadapi: path + '/groupwhite/importExcel?1=1' + common.commonParams(),
                queryapi: '/groupwhite/query',
                exportapi: '/groupwhite/exportExcel',
                addapi: '/groupwhite/add',
                editapi: '/groupwhite/edit',
                delapi: '/groupwhite/delete',
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                hideSearch: false,
                btswidth: '200',
                whiteStateType:[
                    {'value_name': '正常', 'value_no': '1'},
                    {'value_name': '已过期', 'value_no': '0'}
                ],
                fieldsstr: 'id__mobile__car_number__black_uuid__state__park_id__ctime__utime__remark',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'member-white-list',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
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
                                label: '车牌号',
                                prop: 'car_number',
                                searchable: true,
                                addtable: true,
                                editable: true,
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
                                label: '状态',
                                prop: 'state',
                                type: 'selection',
                                selectlist: this.whiteStateType,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.state;
                                    if(str == 1){
                                        str = '已过期'
                                    }else{
                                        str = '可用'
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
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                addtable:true,
                                editable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.parklist, 'park_id');
                                    if(str == '请选择')str='';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
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
                                label: '开始时间',
                                prop: 'b_time',
                                width: '160',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                addtable:true,
                                editable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('span', common.dateformat(params.row.b_time))
                                    ]);
                                },
                                "type": "date",
                                "subtype":"datetime",
                                "disable": false,
                                "viewFormat":"yyyy/MM/dd HH:mm:ss",
                                "valueFormat":'timestamp',
                                'size':'',
                                "rules": [
                                    {required: true, message: '请选择开始时间', trigger: 'blur'}
                                ],
                            }

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '结束时间',
                                prop: 'e_time',
                                width: '160',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                addtable:true,
                                editable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = '';
                                    if(params.row.end_type == 1){
                                        str = '长期'
                                    }else{
                                        str = common.dateformat(params.row.e_time)
                                    }
                                    return h('div', [
                                        h('span',str )
                                    ]);
                                },
                                "type": "date",
                                "subtype":"datetime",
                                "disable": false,
                                "viewFormat":"yyyy/MM/dd HH:mm:ss",
                                "valueFormat":'timestamp',
                                'size':'',
                                "rules": [
                                    {required: true, message: '请选择结束时间', trigger: 'blur'}
                                ],
                                "placeholder":"结束时间选择长期时，此处随便选"
                            }

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '',
                                prop: 'end_type',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                hidden:true,
                                "type": "checkbox",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "options":[{
                                    value:false,
                                    disabled:false,
                                    label:'结束时间:长期',
                                    trueLabel:1,
                                    falseLabel:0
                                }],

                            }
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车主姓名',
                                prop: 'user_name',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                hidden:true,
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
                                label: '车主电话',
                                prop: 'mobile',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                hidden:true,
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
                                label: '车位',
                                prop: 'car_location',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                hidden:true,
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
                                label: '备注',
                                prop: 'remark',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                hidden:false,
                                "type": "textarea",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "textarea",
                            }
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '100',
                            hidden:this.hideOptions,
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
                                            display:this.showEdit?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editRowData.comid = params.row.park_id+'';
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
                                            color:'#f56c6c',
                                            display:this.showdelete?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.delForm = {
                                                    $index:params.index,
                                                    delVisible:true,
                                                    id:params.row.id,
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
                editText: '',
                currentState: '',
                currentId: ''
            };
        },
        methods: {
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addRowData = {};
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
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
                    park_id:'',
                    state:''
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData ));
                sform.park_id_start = sform.park_id;
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
                // axios.all([common.getAllPName(), common.getCarType(), common.getAllParks()])
                //     .then(axios.spread(function (retpname, retcartype, parks) {
                //         _this.pname = retpname.data;
                //         _this.cartype = retcartype.data;
                //         _this.parklist = parks.data;
                //         if (_this.parklist != undefined) {
                //             for (let park of _this.parklist) {
                //                 park.ischeck = false;
                //             }
                //         }
                //     }));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (let item of user.authlist) {
                        if (AUTH_ID_UNION.member_WhiteList == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.hideImport = common.showSubImport(item.sub_auth);
                            this.showdelete = common.showSubDel(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            if (!this.showEdit && !this.showdelete) {
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
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
                this.tableitems[4].subs[0].options = val;
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
                        _this.parklist = ret.data;
                    }));
            });

        }
    };

</script>
