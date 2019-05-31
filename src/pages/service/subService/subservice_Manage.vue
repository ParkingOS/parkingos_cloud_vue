<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">子服务商管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd('add')" native-type="button" v-if="showCustomizeAdd" icon="el-icon-plus">注册服务商</el-button>
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
                    :isTree="true"
                    :isBolink="true"
                    :open-fixed-height="true"
                    :suction-top-visible="false"
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
                    :exportapi="exportapi"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:transferData="transferDataFn"
            ></tab-pane>
        </div>





        <!--
        * @update:20190507
         * @operator:cyzhi
         * @description:添加操作
         * @condition:
        -->
        <el-dialog
                width="600px"
                :show-close="false"
                :visible.sync="addFormVisible"
                custom-class="custom-dialog custom-dialog-register"
                @close="closeAddDialog">
            <header class="dialog-header" slot="title">
                {{addTitle}}<i class="el-icon-close dialog-header-iconfont" @click="addFormVisible = false"></i>
            </header>
            <el-form ref="addForm" label-width="120px" :rules="addFormRules" :model="addForm" class="dialog-form-width">
                <div style="height: 30px"></div>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="addForm.name" placeholder=""></el-input>
                </el-form-item>
<!--                <el-form-item label="上级服务商" prop="parentId" v-if="addType == 'add'">-->
<!--                    <el-select v-model="addForm.parentId"  placeholder="请选择" style="width: 100%" >-->
<!--                        <el-option-->
<!--                                v-for="item in unionList"-->
<!--                                :key="item.value_no"-->
<!--                                :label="item.value_name"-->
<!--                                :value="item.value_no">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item label="地址" prop="area">
                    <el-input v-model.trim="addForm.area"  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.trim="addForm.phone"  placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false"  style="width: 90px;">取 消</el-button>
                <el-button type="primary"  @click="addSubmitFn" :loading="addLoading" style="width: 90px;margin-left: 60px">确 定</el-button>
            </footer>
        </el-dialog>
        <el-dialog title="分润比例调整"
                   :visible.sync="showEditPercent"
                   size="tiny"
        >
            <div style="margin-left:50px;vertical-align:middle;">
                <span>填写分润比例：</span>
                <el-input v-model="setpercent.percent" style="width:150px"></el-input>
                <span>(最高100)</span>
            </div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showEditPercent = false" size="small">取 消</el-button>
				<el-button type="primary" @click="handleEditPercent" size="small">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    const parkState = [
        {
            value_name:'未审核',
            value_no:'0'
        },
        {
            value_name:'已审核',
            value_no:'1'
        },
        {
            value_name:'禁用',
            value_no:'2'
        },
        {
            value_name:'已锁定',
            value_no:'3'
        }
    ];
    const addAccountState = [
        {
            value_name:'未提交',
            value_no:'0'
        },
        {
            value_name:'待审核',
            value_no:'2'
        },
        {
            value_name:'待补充',
            value_no:'3'
        },
        {
            value_name:'审核完成',
            value_no:'1'
        },
    ];
    import {
        path,
        bolinkPath,
        genderType,
        collectType,
        inparkType,
        checkParkMobile,
    } from '@/api/api';
    import common from '@/common/js/common'
    import { getTableQuery } from '@/api/base'
    import {AUTH_ID_SERVER} from '@/common/js/const'
    import TabPane from '@/components/table/TabPane';
    import expand from '@/components/table/expand.js';
    import superForm from '@/components/super-form/inline-form';
    import axios from 'axios'

    export default {
        components: {
            TabPane,superForm,expand
        },
        data() {
            return {
                ////////////////////////////////////////////////////////////////////
                defaultExpandAll:true,
                treeStructure:false,
                key:1,
                tableData:[],
                tableMaxHeight:500,
                ///////////////////////////////////////////////////////////////
                /////////add///////////////////
                addType:'',
                addTitle:'',
                addFormVisible:false,
                addLoading:false,
                addForm:{},
                addFormRules:{
                    'name':[{required: true, message: '请输入车场名称', trigger: 'blur'}],
                    'parentId':[{required: true, message: '请选择上级服务商', trigger: 'blur'}],
                    'area':[{required: true, message: '请输入地址', trigger: 'blur'}],
                    'phone':[{required: true,validator: checkParkMobile, trigger: 'blur'}]
                },
                /////////////////////////////////
                initunionid:'',
                loadingqrcode:false,
                downloadName:'',
                downloadQrUrl:'',
                unionid:'',
                generateloading:false,
                hasQr:false,
                type:'',
                qrVisible:false,
                checkQrBox:[],
                needChannel:false,
                generatable:false,
                qrsrc:'',
                qrurl:'',
                channelValue:'',
                qrtype:[
                    {'name':'场内预支付','type':1},
                    {'name':'出口直付','type':2},
                    {'name':'无牌车入场','type':3},
                ],
                ///////////////////////////////////
                searchData:{},
                expandForm:{},
                formConfig:{
                    showMore:false,
                    first:[
                        {
                            label:'新建时间',
                            type:'date',
                            subtype:'datetimerange',
                            prop:'pantTime',
                            subprop:'ctime',
                            valueFormat:'timestamp'
                        },
                        {
                            label:'编号',
                            type:'input',
                            subtype: "text",
                            prop:'id_start'
                        },{
                            label:'名称',
                            type:'input',
                            subtype: "text",
                            prop:'name'
                        }],
                },
                readonly:false,
                rowid:'',
                resetloading:false,
                pwd:'',
                infoIcon:require('@/assets/images/info-icon.png'),
                resetDataVisible:false,
                unionList:[],
                isShow:false,
                noimg:require('@/assets/images/no.png'),
                offimg:require('@/assets/images/off.png'),
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
                imgSize:450,
                hideTool: false,
                showImg: true,
                showBusinessPoles: true,
                exportapi:'/subserver/export',
                queryapi: '/subserver/query',
                setapi: '/cityparks/setpark',
                addapi: '/park/add',
                editapi: '/park/edit',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                fieldsstr: 'id__name__ctime',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                width:200,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'name',
                                width:200,
                                align:'left',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:150,
                                label: '支付平台登录账号',
                                prop: 'group_id',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    return h('div', [
                                        h('ElButton', {
                                            props: {
                                                size: 'small'
                                            },
                                            style: {

                                            },
                                            on: {
                                                click: (e) => {
                                                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                    this.getLoginUser(params.row.id)
                                                }
                                            }
                                        }, '获取登录账号'),
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:150,
                                label: '手续费分润%',
                                prop: 'percent',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.percent;
                                    return h('div',{
                                        style:{
                                            color:'#0000ff',
                                            cursor:'pointer'
                                        },
                                        on:{
                                            click:()=>{
                                                this.handleShowEditPercent(params.index, params.row,0)
                                            }
                                        }
                                    }, [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:150,
                                label: '广告费分润%',
                                prop: 'adpercent',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.adpercent;
                                    return h('div',{
                                        style:{
                                            color:'#0000ff',
                                            cursor:'pointer'
                                        },
                                        on:{
                                            click:()=>{
                                                this.handleShowEditPercent(params.index, params.row,1)
                                            }
                                        }
                                    }, [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '地址',
                                prop: 'area',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:180,
                                label: '联系电话',
                                prop: 'phone',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '新建日期',
                                prop: 'ctime',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.ctime);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '修改日期',
                                prop: 'utime',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.utime);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '状态',
                                prop: 'state',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.stateformat(params.row.state);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '余额',
                                prop: 'balance',
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
                                width:200,
                                label: '管理员账号',
                                prop: 'tid',
                                addtable: true,
                                editable: true,
                                unsortable: true,
                                align: 'center',
                                "type": "textarea",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "textarea",

                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            fixed:'right',
                            label: '操作',
                            width: '200',
                            hidden:this.hideOptions,
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
                                            display:this.showEdit? '' : 'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                let eform = {};
                                                this.addForm =  Object.assign(eform,params.row);
                                                this.handleAdd('edit',this.addForm)
                                            }
                                        }
                                    }, '编辑'),

                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            display: this.showSetting ? '':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.$router.push({
                                                    path: '/subservice_manage/subservice_manage_staff',
                                                    name:'subservice_manage_staff',
                                                    query: {
                                                        serverid: params.row.id
                                                    }
                                                })

                                            }
                                        }
                                    }, '员工设置'),
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
                yunParkManageData:[],
                percentType:'',
                showEditPercent:false,
                currentIndex:'',
                currentRow:{},
                maxPercent:'',
                maxAdPercent:'',
                minPercent:'',
                minAdPercent:'',
                setpercent:{
                    percent:'',
                    id:''
                },
                table:[],
                showEdit:false,
                showCustomizeAdd:false,
                showSetting:false,
                hideOptions: false,
            }
        },
        methods: {
            //获取登录账号
            getLoginUser(id){
                let adminForm = new FormData();
                adminForm.append('token',sessionStorage.getItem('token'));
                adminForm.append('platform_id',id);
                adminForm.append('user_type',4);
                axios.post(bolinkPath+'/user/admin',adminForm).then(res=>{
                    if(res.data.length>0) {
                        let userId = res.data[0].id;
                        this.$alert('支付平台登录账号： ' + userId, '登录账号', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        })
                    }
                }).catch(err=>{

                })
            },
            //添加操作
            addSubmitFn(){
                this.$refs.addForm.validate((valid) => {
                    if(valid){
                        let that = this;
                        let cloneForm = {};
                        let addForm = Object.assign(cloneForm,this.addForm);
                        let newForm = {};
                        that.addLoading = true;

                        //add-----------------------
                        if(that.addType == 'add'){
                            newForm.name = addForm.name;
                            newForm.address = addForm.area;
                            newForm.phone = addForm.phone;
                            newForm.parent_id = sessionStorage.getItem('serverid');
                            common.generateForm(newForm);
                            axios.get(path+'/unionserver/addAndEdit',{
                                params:newForm
                            })
                                .then(res=>{
                                    if(res.data.state == 0){
                                        that.$message({
                                            message: res.data.msg,
                                            type: 'error',
                                            duration: 600
                                        });
                                        that.addLoading = false;
                                    }else{
                                        that.$message({
                                            message: '添加成功!',
                                            type: 'success',
                                            duration: 600
                                        });
                                        setTimeout(()=>{
                                            that.addFormVisible = false;
                                            that.addLoading = false;
                                            that.searchValueFn(that.searchData,true);
                                        },60);
                                    }

                                }).catch(err=>{
                                that.$message({
                                    message: '更新失败',
                                    type: 'error',
                                    duration: 600
                                });
                                that.addLoading = false;
                            })
                        }else{
                            newForm.id = addForm.id;
                            newForm.name = addForm.name;
                            newForm.address = addForm.area;
                            newForm.phone = addForm.phone;
                            common.generateForm(newForm);
                            axios.get(path+'/unionserver/addAndEdit',{
                                params:newForm
                            })
                                .then(res=>{
                                    if(res.data.state == 0){
                                        that.$message({
                                            message: res.data.msg,
                                            type: 'error',
                                            duration: 600
                                        });
                                        that.addLoading = false;
                                    }else{
                                        that.$message({
                                            message: '编辑成功!',
                                            type: 'success',
                                            duration: 600
                                        });
                                        setTimeout(()=>{
                                            that.addFormVisible = false;
                                            that.addLoading = false;
                                            that.searchValueFn(that.searchData,true);
                                        },60);
                                    }

                                }).catch(err=>{
                                that.$message({
                                    message: '更新失败',
                                    type: 'error',
                                    duration: 600
                                });
                                that.addLoading = false;
                            })
                        }

                    }else{

                    }
                })
            },
            closeAddDialog(){
                this.addFormVisible = false;
                this.addForm = {};
                this.$refs['addForm'].clearValidate();
            },
            handleAdd(type,row){
                if(type == 'add'){
                    this.addTitle = '添加';
                    this.addForm = {};
                    this.addType = 'add';
                }else{
                    this.addTitle = '编辑';
                    this.addType = 'edit';
                }
                this.addFormVisible = true;
            },
            handleEditPercent(){
                let vm = this;
                if (!common.CheckNum(vm.setpercent.percent)) {
                    vm.$message({
                        message: '数据格式错误!',
                        type: 'error'
                    });
                    return;
                }else {
                    if (vm.setpercent.percent > 100) {
                        vm.$message({
                            message: '最大比例为100!',
                            type: 'error'
                        });
                        return;
                    }

                    vm.setpercent.id = vm.currentRow.id;
                }

                var api = '/server/setpercent';
                var qform = JSON.parse(JSON.stringify(this.setpercent));
                let params = '?token='+sessionStorage.getItem('token')+'&percentType='+vm.percentType+'&percent='+qform.percent+'&id='+qform.id;
                this.$axios.post(bolinkPath+api+params)
                    .then((res)=>{
                        let ret = res.data;
                        vm.loading = false;
                        vm.showEditPercent = false;
                        if (ret.result == 1) {
                            vm.searchValueFn(vm.searchData,true)
                        } else {
                            vm.$message({
                                message: '请求错误!' + ret.errmsg,
                                type: 'error',
                                duration: 600
                            });
                        }
                    })
                    .catch(err=>{
                        console.log('get query error-->',err)
                    })

            },
            handleShowEditPercent(index,row,type){
                let vm = this;
                this.percentType=type;
                this.showEditPercent = true;
                this.currentIndex = index;
                this.currentRow = row;
                if (vm.currentRow._parent) {
                    for (let item of vm.table) {
                        if (vm.currentRow.pid == item.id) {

                            vm.maxPercent = item.percent;
                            vm.maxAdPercent = item.adpercent;
                        }
                    }
                } else {
                    vm.maxPercent = '100';
                    vm.maxAdPercent = '100';
                }
                let first = true;
                if (vm.currentRow.children && vm.currentRow.children.length > 0) {
                    for (let item of vm.table) {
                        if (vm.currentRow.id == item.pid) {
                            if (first) {
                                vm.minPercent = item.percent;
                                vm.minAdPercent = item.adpercent;
                                first = false;
                            }

                            if (vm.minPercent < item.percent) {
                                vm.minPercent = item.percent;
                            }
                            if (vm.minAdPercent < item.adpercent) {
                                vm.minAdPercent = item.adpercent;
                            }
                        }
                    }
                } else {
                    vm.minPercent = 0;
                    vm.minAdPercent = 0;
                }
                if(type == 0){
                    vm.setpercent.percent = row.percent;
                }else{
                    vm.setpercent.percent = row.adpercent;
                }
            },
            ///////////////////////////////////////////////////////////////
            transferDataFn(data){
                // console.log('data-->',data)
                this.table = data.rows;
            },

            ///////////////////////////////////////////start/////////////////////////////
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    this.searchData.id = 3;
                    this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
                }else{
                    this.searchData = Object.assign({},val)
                }
            },
            //////////////////////////////////////////end////////////////////////////////
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
                this.searchData = {
                    query_from:2
                };
                this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
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
                _this.$axios.get(bolinkPath+'/getdata/serverlist?token='+sessionStorage.getItem('token'))
                    .then((retSList)=>{
                        _this.unionList = retSList.data;
                    })
                this.$nextTick(res=>{
                    this.initFn(this)
                })
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SERVER.subservice_manage == item.auth_id) {
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            this.showSetting = common.showSetting(item.sub_auth);
                            if(!this.showEdit&&!this.showSetting){
                                this.hideOptions = true;
                            }else{
                                this.hideOptions = false;
                            }
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

            this.setAuthorityFn(this);
            this.getQuery()
            this.initFn(this)
        },
        activated() {
            this.initunionid = sessionStorage.getItem('unionid')
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        }
    }

</script>

<style scoped>
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }

    .ms-tree-space::before {
        content: ""
    }
</style>
