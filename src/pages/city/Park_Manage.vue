<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>车场管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd" native-type="button" v-if="hideAdd" icon="el-icon-plus">注册停车场</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="advanced-options" v-show="isShow">
                        <el-form-item label="泊链车场编号" class="clear-style">
                            <el-input v-model="searchFormData.bolink_id" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="泊链车场秘钥" class="clear-style">
                            <el-input v-model="searchFormData.ukey" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                    </div>
                    <div class="console-main">
                        <el-form-item label="编号" class="clear-style">
                            <el-input v-model="searchFormData.id_start" placeholder="请输入搜索内容" class="shop-custom-input" style="width: 180px"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" class="clear-style">
                            <el-input v-model="searchFormData.company_name" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>
                        </el-form-item>
                        <el-form-item label="所属运营集团" class="clear-style">
                            <el-select v-model="searchFormData.groupid_start"  placeholder="请选择" class="shop-custom-input" style="width: 150px">
                                <el-option
                                        v-for="item in unionList"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                            <!--<el-input v-model="searchFormData.groupid_start" placeholder="请输入搜索内容" class="shop-custom-input"></el-input>-->
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
        <el-dialog
                width="478px"
                :visible.sync="resetDataVisible"
                :show-close="false"
                custom-class="custom-dialog deleteTip">
            <header class="dialog-header" slot="title">
                车场数据重置提示<i class="el-icon-close dialog-header-iconfont" @click="resetDataVisible=false"></i>
            </header>
            <el-form ref="form" label-width="120px">
                <div class="dialog-body" style="line-height: 25px;text-align: center;font-size: 16px">
                    <p><img class="info-icon" :src="infoIcon"> 车场重置后会清掉车场所有订单和抬杆数据,收费员与月卡等数据会保留,请慎重操作。</p>
                </div>
                <el-form-item label="厂商登录密码" style="margin-top: 30px">
                    <el-input v-model="pwd" style="width:90%"></el-input>
                </el-form-item>

            </el-form>

            <footer slot="footer" class="dialog-footer">
                <el-button type="primary" class="dialog-footer-btn" :loading="resetloading" @click="resetData" >确 定</el-button>
                <el-button @click="resetDataVisible=false" class="dialog-footer-btn" style="margin-left: 36px">取 消</el-button>
            </footer>
        </el-dialog>
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
    } from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios'

    export default {
        components: {
            TabPane
        },
        data() {
            return {
                readonly:false,
                rowid:'',
                resetloading:false,
                pwd:'',
                infoIcon:require('@/assets/images/info-icon.png'),
                resetDataVisible:false,
                unionList:[],
                isShow:false,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchFormData:{
                    id:3,
                    id_start:'',
                    company_name:'',
                    parking_total:3,
                    parking_total_start:'',
                    groupid:'',
                    groupid_start:'',
                    mobile:'',
                    bolink_id:'',
                    ukey:'',
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
                hideExport: false,
                hideSearch: false,

                orderfield:'id',

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                imgSize:450,
                hideTool: false,
                showImg: true,
                showBusinessPoles: true,
                queryapi: '/cityparks/query',
                setapi: '/cityparks/setpark',
                addapi: '/cityparks/editpark',
                editapi: '/cityparks/editpark',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                fieldsstr: 'id__company_name__parking_type__parking_total__etc__state__areaid__city__address__longitude__latitude__mobile__create_time__update_time__ukey__bolink_id__groupid',
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
                                prop: 'company_name',
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
                                label: '车位总数',
                                prop: 'parking_total',
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
                                "rules": [
                                    {required: true, message: '请输入车位总数', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '所属运营集团',
                                prop: 'groupid',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.nameformat(params.row, this.unionList, 'groupid');
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':this.unionList,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系手机',
                                prop: 'mobile',
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
                                "rules": [
                                    {required: true,validator: checkParkMobile, trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '泊链车场编号',
                                prop: 'bolink_id',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": this.readonly,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '泊链车场秘钥',
                                prop: 'ukey',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
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
                            width: '200',
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
                                                this.readonly = true;
                                                this.editRowData = params.row;
                                                this.editRowData.groupid = this.editRowData.groupid+'';
                                                if(this.editRowData.groupid == '-1'){
                                                    this.editRowData.groupid = '';
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
                                        style: {},
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.$router.push({path: '/park_manage_staff?shop_id='+params.row.id});
                                            }
                                        }
                                    }, '设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'red'
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
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'red'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.pwd = '';
                                                this.resetDataVisible = true;
                                                this.rowid = params.row.id;
                                            }
                                        }
                                    }, '重置'),
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
            }
        },
        methods: {
            resetData() {
                let qform = {};
                let vm = this;
                let api = this.resetapi;
                if (this.pwd == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }


                this.resetloading = true;
                let rform = {
                    'password': this.pwd,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token'),
                    'loginuin':sessionStorage.getItem('loginuin')
                };

                vm.$axios.post(path + api, vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;

                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        if (ret > 0 || ret.state == 1) {
                            //重置成功
                            vm.initFn(vm)
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 2000
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.readonly = false;
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
                    id:3,
                    id_start:'',
                    company_name:'',
                    parking_total:3,
                    parking_total_start:'',
                    groupid:'',
                    groupid_start:'',
                    mobile:'',
                    bolink_id:'',
                    ukey:'',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            getQuery(){
                let _this = this;
                axios.all([common.getUnionList()])
                    .then(axios.spread(function (retUnionList) {
                        _this.unionList = retUnionList.data;

                    }))
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_UNION.businessOrder_Poles == item.auth_id) {
                            this.hideExport = common.showSubExport(item.sub_auth);
                            break;
                        }
                    }

                }
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        if(this.$router){
                            this.$router.push('/login');
                        }

                    }
                });
            },
        },
        mounted() {
            this.setAuthorityFn(this);
            this.getQuery()
            this.initFn(this)
        },
        activated() {
        },
        watch: {
            unionList: function (val) {
                this.tableitems[3].subs[0].options = val
            },
            readonly:function (val) {
                this.tableitems[5].subs[0].readonly = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
