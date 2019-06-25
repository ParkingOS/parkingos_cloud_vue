<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">运营集团<span style="margin: 2px">-</span>运营集团管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd" native-type="button" icon="el-icon-plus" v-if="showCustomizeAdd">注册运营集团</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="互联运营集团编号" class="clear-style">
                            <el-input v-model="searchFormData.operatorid" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="服务商">
                            <el-select v-model="searchFormData.serverid_start"  placeholder="请选择" class="shop-custom-input" style="width: 100%">
                                <el-option
                                        v-for="item in serverList"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    style="width: 350px"
                                    class="shop-custom-datepicker"
                                    v-model="searchFormData.currentDate"
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
                        <el-form-item label="编号" class="clear-style">
                            <el-input v-model="searchFormData.id_start" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" class="clear-style">
                            <el-input v-model="searchFormData.name" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>

                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                            <el-button type="text"
                                       @click="changeMore"
                                       style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
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
                    :fieldsstr="fieldsstr"
                    :format-collectors="collectors"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {
        path,
        genderType,
        collectType,
        parkState,
        inparkType,
        checkParkMobile,
    } from '../../../api/api';
    import common from '../../../common/js/common'
    import {AUTH_ID_CITY} from '../../../common/js/const'
    import TabPane from '../../../components/table/TabPane';


    export default {
        components: {
            TabPane
        },
        data() {
            return {
                showEdit:false,
                showCustomizeAdd:false,
                showSetting:false,
                hideOptions:false,
                hideExport:false,
                showdelete:false,
                isShow:false,
                noimg:require('../../../assets/images/no.png'),
                offimg:require('../../../assets/images/off.png'),
                searchFormData:{
                    currentDate:'',
                    id:3,
                    id_start:'',
                    name:'',
                    operatorid:'',
                    serverid_start:'',
                },
                searchForm:{},
                //编辑
                editRowData:{},
                editTo:0,
                //添加
                addRowData:{

                },
                addTo:0,
                //删除
                delForm:{},
                /////////////////////////////////////////
                loading: false,
                hideSearch: false,
                orderfield:'id',

                hideAdd: true,
                tableheight: '',
                imgSize:450,
                hideTool: false,
                showImg: true,
                showBusinessPoles: true,
                queryapi: '/citygroup/query',
                addapi: '/citygroup/addAndEdit',
                editapi: '/citygroup/addAndEdit',
                delapi: '/citygroup/delete',
                btswidth: '100',
                fieldsstr: 'id__name__parking_type__parking_total__etc__state__areaid__city__address__longitude__latitude__mobile__create_time__update_time__ukey__operatorid__serverid',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                type: 'number',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'name',
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
                                    {required: true, message: '请输入名称', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'create_time',
                                type: 'date',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.create_time);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '互联运营集团编号',
                                prop: 'operatorid',
                                addtable: true,
                                editable: true,
                                searchable: true,
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
                                label: '服务商',
                                prop: 'serverid',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "options":[],
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(this.serverList,params.row.serverid);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '地址',
                                prop: 'address',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '160',
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
                                            display:this.showEdit? '' : 'none',
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.editRowData.serverid = this.editRowData.serverid+'';
                                                if(this.editRowData.serverid == '-1' || this.editRowData.serverid == undefined || this.editRowData.serverid == 'undefined'){
                                                    this.editRowData.serverid = ''
                                                }
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
                                            display: this.showSetting ? '':'none',
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.$router.push({path: '/union_manage_staff?shop_id='+params.row.id});
                                            }
                                        }
                                    }, '设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'red',
                                            display: this.showdelete ? '':'none',
                                            marginLeft: '5px'
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
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: [],
                parklist:[],
                serverList:[],
            }
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
                    currentDate:'',
                    id:3,
                    id_start:'',
                    name:'',
                    operatorid:'',
                    serverid_start:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                if(sform.currentDate != null && sform.currentDate != ''){
                    sform.create_time = 'between';
                    sform.create_time_start = sform.currentDate[0];
                    sform.create_time_end = sform.currentDate[1];
                }
                if(sform.serverid_start != undefined && sform.serverid_start != ''){
                    sform.serverid = 3;
                }
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
                this.$axios.get(path+'/getdata/getServersByUnion?unionid='+sessionStorage.getItem('unionid'))
                    .then(res=>{
                        _this.serverList = res.data;

                    })
                    .catch(err=>{

                    })
                _this.$nextTick(()=>{
                    _this.initFn(_this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_CITY.cityUnionManage_unionManagePage == item.auth_id) {
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            this.showSetting = common.showSetting(item.sub_auth);
                            this.showdelete = common.showSubDel(item.sub_auth)
                            if(!this.showEdit&&!this.showSetting && !this.showdelete){
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
                            break;
                        }
                    }

                }
            },
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?liftrodid=' + encodeURI(encodeURI(row.liftrod_id)) + '&id=' + row.id + '&comid=' + row.comid + '&token=' + sessionStorage.getItem('token');
                this.imgDialog = true
            }
        },
        mounted() {
            this.setAuthorityFn(this);

        },
        activated() {
            this.getQuery()
        },
        watch: {
            collectors: function (val) {
                this.tableitems[2].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            },
            serverList:function (val) {
                this.tableitems[4].subs[0].options = val
            },
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
