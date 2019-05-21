<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>物料管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>

            <header class="m-header" v-if="roleid == 4">
                <el-button icon="el-icon-arrow-left" type="primary" round @click="backFn">返回</el-button>
            </header>
            <el-row class="center-park-margin" :gutter="10" style="padding-top: 10px;margin-left: 10px">
                <el-col :xs="24" :sm="12" :md="5" v-if="roleid == 2">
                    <div class="card">
                        <p class="title">物料申请车场</p>
                        <div class="content">
                            <countTo :startVal='0' :endVal='countForm.total' :duration='1000'></countTo><span>个</span>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="5" v-if="roleid == 2">
                    <div class="card">
                        <p class="title">物料激活车场</p>
                        <div class="content">
                            <countTo :startVal='0' :endVal='countForm.active' :duration='1000'></countTo><span>个</span>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="5">
                    <div class="card">
                        <p class="title">物料积分 <a class="title-integral" @click="getIntegral">积分记录</a></p>
                        <div class="content">
                            <countTo :startVal='0' :endVal='countForm.score' :duration='1000'></countTo><span>分</span>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="5">
                    <div class="card" @click="showApply">
                        <p class="apply-btn"><i class="el-icon-plus"></i>申请物料</p>
                    </div>
                </el-col>
            </el-row>

            <div class="console-wrapper" v-if="roleid == 2">
                <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                    <el-form-item class="clear-style" label="申请时间">
                        <el-date-picker
                                style="width: 312px"
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
                    <el-form-item label="车场名称" class="clear-style">
                        <!--<el-input v-model="searchFormData.parkId" placeholder="请输入车场名称"  style="width: 140px"></el-input>-->
                        <el-select v-model="searchFormData.parkId" placeholder="请选择" style="width: 180px" filterable>
                            <el-option
                                    v-for="item in plist"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                                <span>{{formatterSub(item.value_name)}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态" class="clear-style margin-left-clear">
                        <el-select v-model="searchFormData.state" placeholder="请选择" style="width: 140px">
                            <el-option
                                    v-for="item in stateOption"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="clear-style">
                        <el-button type="primary" @click="searchFn">搜索</el-button>
                    </el-form-item>
                    <el-form-item style="float: right">
                        <el-button @click="resetForm">刷新</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>

        <div>

            <div class="table-wrapper-style">
                <tab-pane
                        :isBolink="true"
                        :open-fixed-height="true"
                        :suction-top-visible="false"
                        :queryapi="queryapi"
                        :orderfield="orderfield"
                        :fieldsstr="fieldsstr"
                        :table-items="tableitems"
                        align-pos="right"
                        bts-width="200"
                        :searchForm="searchForm"
                        fixedDom="scrollBarDom"
                        v-on:transferData="transferData"
                        ref="tabPane"
                ></tab-pane>
            </div>
        </div>

        <!--物料申请-->
        <el-dialog
                width="500px"
                custom-class="custom-dialog"
                :visible.sync="dialogVisible"
                @close="closeAddFn"
                >
            <div slot="title" class="title">
                {{!toggleActive?'物料申请':'查看'}}
            </div>
            <div class="content">
                <el-form ref="addForm" :model="addForm" :rules="rulesAddForm"  label-width="110px" style="padding-right: 20px">
                    <el-form-item label="车场名称" prop="parkId" v-if="roleid == 2">
                        <el-select v-model="addForm.parkId" placeholder="车场名称" style="width: 100%" @change="changePackName"  :readonly="toggleActive" filterable>
                            <el-option
                                    v-for="item in plist"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                                <span>{{formatterSub(item.value_name)}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="无牌车入场码" prop="payCode">
                        <el-input-number v-model="addForm.inparkCode" :step="1" :min="0" :readonly="toggleActive"></el-input-number>
                    </el-form-item>
                    <el-form-item label="无牌车入场通道号" prop="inChannel">
                        <el-input v-model.trim="addForm.inChannel" :readonly="toggleActive" placeholder="用逗号隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="电子支付码（场内+出口）" prop="activePayCode">
                        <el-input-number v-model="addForm.payCode" :step="1" :min="0" :readonly="toggleActive"></el-input-number>
                    </el-form-item>
                    <el-form-item label="出场通道号" prop="outChannel">
                        <el-input v-model.trim="addForm.outChnnel" :readonly="toggleActive" placeholder="用逗号隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人" prop="receiver">
                        <el-input v-model.trim="addForm.receiver" :readonly="toggleActive"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model.trim="addForm.mobile" :readonly="toggleActive"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model.trim="addForm.address" :readonly="toggleActive"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model.trim="addForm.remark" :readonly="toggleActive"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="addSubmit" :loading="addLoading" v-if="!toggleActive">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <!--积分记录-->
        <el-dialog title="积分记录" :visible.sync="dialogTableVisible" width="775px">
            <el-table :data="gridData" max-height="500" align="center">

                <el-table-column property="order_id" label="申请单号" width="220"></el-table-column>
                <el-table-column property="state" label="单号状态" width="120">
                    <template slot-scope="scope">
                        <span>{{formatterFn(scope.row.state)}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="use_score" label="积分增减" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.use_score}}分</span>
                    </template>
                </el-table-column>
                <el-table-column property="curr_score" label="当前积分" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.curr_score}}分</span>
                    </template>
                </el-table-column>
                <el-table-column property="remark" label="备注" width="150"></el-table-column>
            </el-table>
        </el-dialog>
        <creatQrcode :qrVisible="qrVisible" v-on:closeQr="closeQr" :parkid="parkid" :initunionid="initunionid"></creatQrcode>
    </section>
</template>

<script>
    import {bolinkPath, path, telFormit} from '../../api/api';
    import common from '../../common/js/common'
    import axios from 'axios'
    import countTo from 'vue-count-to';
    import TabPane from '../../components/table/TabPane';
    import creatQrcode from '../../components/creat-qrcode/index'
    import superForm from '../../components/super-form/inline-form';
    export default {
        name: "materiel-table",
        components: {
            countTo,
            TabPane,
            creatQrcode,
            superForm
        },
        data () {
            return {
                parkid:'',
                initunionid:'',
                qrVisible:false,
                showHeight:'',
                roleid:2,
                toggleActive:false,
                countForm:{
                    total:0,
                    score:0,
                    active:0
                },
                dialogTableVisible:false,
                gridData:[],
                addLoading:false,
                unionid:'',
                plist:[],
                dialogVisible:false,
                startVal: 0,
                endVal: 0,
                queryapi:'/materiel/query',
                fieldsstr:'ctime__order_id__park_id__pay_code__pay_score__inpark_code__state__remark',
                orderfield:'id',
                searchForm:{},
                searchFormData:{
                    currentData:'',
                    parkId:'',
                    state:''
                },
                stateOption:[
                    {
                        'value_name':'全部',
                        'value_no':''
                    },
                    {
                        'value_name':'已驳回',
                        'value_no':-1
                    },
                    {
                        'value_name':'已撤销',
                        'value_no':-2
                    },
                    {
                        'value_name':'待审核',
                        'value_no':0
                    },
                    // {
                    //     'value_name':'已通过',
                    //     'value_no':1
                    // },
                    {
                        'value_name':'已激活',
                        'value_no':2
                    },
                    {
                        'value_name':'已发货',
                        'value_no':3
                    }
                ],
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '申请时间',
                                prop: 'ctime',
                                width: '180',
                                type: 'str',
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
                                label: '申请单号',
                                prop: 'order_id',
                                width: '200',
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
                                label: '车场名称',
                                prop: 'park_id',
                                width:'150',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let park_id = params.row.park_id;let str = "";let plist = this.plist;
                                    for(let item in plist){
                                        if(plist[item].value_no == park_id){
                                            str = plist[item].value_name;
                                        }
                                    }
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
                                label: '入口码（激活）',
                                prop: 'inpark_code',
                                width: '140',
                                type: 'str',
                                selectlist: [],
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = "";
                                    let active_inpark_code = params.row.active_inpark_code || 0;
                                    let inpark_code = params.row.inpark_code;
                                    str = active_inpark_code+"/"+inpark_code;
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
                                label: '无牌车入场通道号',
                                prop: 'in_channel',
                                width: '140',
                                type: 'str',
                                selectlist: [],
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
                                label: '支付码（激活）',
                                prop: 'pay_code',
                                width: '140',
                                addable: false,
                                editable: true,
                                searchable: false,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = "";
                                    let active_pay_code = params.row.active_pay_code || 0;
                                    let pay_code = params.row.pay_code;
                                    str = active_pay_code+"/"+pay_code;
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
                                label: '出场通道号',
                                prop: 'out_channel',
                                width: '140',
                                type: 'str',
                                selectlist: [],
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
                                label: '状态',
                                prop: 'state',
                                width: '120',
                                type: 'date',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let state = params.row.state;let str = '';let stateOption = this.stateOption;
                                    for(let item in stateOption){
                                        if(stateOption[item].value_no == state){
                                            str = stateOption[item].value_name
                                        }
                                    }
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
                                label: '物料分',
                                prop: 'pay_score',
                                width: '140',
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
                            align: 'center',
                            width:'150',
                            fixed:'right',
                            unsortable: true,
                            columnType:'render',
                            render: (h, params) => {
                                let isDisabled = false;
                                if(params.row.state == '-2' ||params.row.state == '3'){
                                    isDisabled = true;
                                }
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.toggleActive = true;
                                                this.dialogVisible = true;
                                                this.addForm =JSON.parse(JSON.stringify( params.row ));
                                                this.addForm.parkId = this.addForm.park_id+'';
                                                this.addForm.inparkCode = this.addForm.inpark_code;
                                                this.addForm.payCode = this.addForm.pay_code;
                                                this.addForm.inChannel = this.addForm.in_channel;
                                                this.addForm.outChnnel = this.addForm.out_channel;

                                            }
                                        }
                                    }, '查看'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.revokeFn(params.row)
                                            }
                                        }
                                    }, '撤回'),
                                ]);
                            }
                        }]
                    },
                ],
                addForm:{
                    parkId:'',
                    payCode:0,
                    outChnnel:'',
                    inparkCode:0,
                    inChannel:'',
                    receiver:'',
                    mobile:'',
                    address:'',
                    remark:'',
                },
                rulesAddForm:{
                    parkId:[
                        { required: true, message: '请选择车场', trigger: 'change' }
                    ],
                    receiver:[
                        { required: true, message: '请输入收货人', trigger: 'change' }
                    ],
                    mobile:[
                        { required: true,validator: telFormit, trigger: 'change' },
                    ],
                    address:[
                        { required: true, message: '请输入收货地址', trigger: 'change' }
                    ],
                }
            }
        },
        methods:{
            printMateriel(){
                let user = sessionStorage.getItem('user');
                user = JSON.parse(user);
                this.parkid = user.parkid;
                this.initunionid = user.unionid;
                this.qrVisible = true;
            },
            closeQr(){
                this.qrVisible = false;
            },
            formatterSub(item){
                let len = item.length;let str = '';
                if(len > 15){
                    str = item.substring(0,15)+'...'
                }else{
                    str = item;
                }
                return str;

            },
            backFn(){
                window.history.back()
            },
            formatterFn(state){
                let str = ''
                let stateOption = this.stateOption;
                for(let item in stateOption){
                    if(stateOption[item].value_no == state){
                        str =stateOption[item].value_name
                    }
                }
                return str;
            },
            transferData(){
                this.setAuthorityFn()
            },
            revokeFn(row) {
                let that = this;
                this.$confirm('此操作不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    var params = new FormData();
                    params.append('token', sessionStorage.getItem('token'));
                    params.append('id', row.id);
                    axios.post(bolinkPath+'/materiel/cancel',params).then((response)=> {
                        let res = response.data;
                        if(res.state == 1){
                            that.setAuthorityFn();
                            // that.initFn(that)
                            that.searchFn()
                        }else{
                            that.$message({
                                type: 'info',
                                message: res.errmsg
                            });
                        }

                    }).catch(function (error) {
                        that.$message({
                            type: 'info',
                            message:'网络错误，请稍后重试'
                        });
                    });
                }).catch(() => {
                });
            },
            getIntegral(){
                let that = this;
                var params = new FormData();
                params.append('token', sessionStorage.getItem('token'));
                axios.post(bolinkPath+'/score/query', params).then(function (response) {
                    let res = response.data;
                    that.gridData = res.rows;
                    // console.log('res---',that.gridData)
                }).catch(function (error) {

                });

                this.dialogTableVisible = true;
            },
            closeAddFn(){
                // this.initFn(this);
                this.searchFn();
                this.addForm={
                    parkId:'',
                    payCode:0,
                    inparkCode:0,
                    receiver:'',
                    mobile:'',
                    address:'',
                    remark:'',
                }
                this.$refs['addForm'].resetFields();
            },
            changePackName(val){
                // let that = this;
                // if(val != null && val != ''){
                //     var params = new FormData();
                //     params.append('parkid', val);
                //     params.append('token', sessionStorage.getItem('token'));
                //     axios.post(path+'/materiel/querypark', params).then(function (response) {
                //         let res = response.data;
                //         if(res.state == 1){
                //             if(that.addForm.receiver == ""){
                //                 that.addForm.receiver = res.receiver;
                //             }
                //             if(that.addForm.mobile == ""){
                //                 that.addForm.mobile = res.mobile;
                //             }
                //             if(that.addForm.address  == ""){
                //                 that.addForm.address = res.address;
                //             }
                //         }else{
                //
                //         }
                //     }).catch(function (error) {
                //
                //     });
                // }
            },
            getPackList(){
                let that = this;
                // this.$axios.all([common.getParkList("&union_id="+that.unionid)])
                //     .then(this.axios.spread(function(park){
                //         that.plist=park.data
                //         that.plist.unshift(
                //             {
                //                 'value_name':'全部',
                //                 'value_no':''
                //             });
                //     }))
                that.$axios.get(bolinkPath+'/getdata/parklist'+'?token=' + sessionStorage.getItem('token')+'&union_id='+that.unionid)
                    .then(res=>{
                        console.log('res--->',res)
                        that.plist = res.data;
                        that.plist.unshift({
                            'value_name':'全部',
                            'value_no':''
                        })
                    })
                    .catch( err=>{
                        console.log('get query error-->',err)
                    })
            },
            addSubmit(){
                let that = this;
                let aform = that.addForm;
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        if(aform.payCode == 0 && aform.inparkCode == 0 ){
                            that.$message({
                                message: '请选择码的数量，必选一个',
                                type: 'warning'
                            });
                            return;
                        }else{
                            that.addLoading = true;
                            var params = aform;
                            params.token = sessionStorage.getItem('token');
                            that.$post(bolinkPath+'/materiel/add', params, (response)=> {
                                let res = response;
                                that.addLoading = false;
                                if(res.state == 1){
                                    that.$message({
                                        message: res.errmsg,
                                        type: 'success'
                                    });
                                    that.dialogVisible = false;
                                }else{
                                    that.$message({
                                        message: res.errmsg,
                                        type: 'warning'
                                    });
                                }

                            }, "json");
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            showApply(){
                this.toggleActive = false;
                this.dialogVisible = true;

            },
            changeDateFormat(){

            },
            searchFn(){
                /*
                                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                                * */
                let sform =  JSON.parse(JSON.stringify( this.searchFormData )) ;
                sform.state_start = sform.state;
                if(sform.currentData != null && sform.currentData !=''){
                    sform.ctime = 'between';
                    sform.ctime_start = sform.currentData[0];
                    sform.ctime_end = sform.currentData[1];
                }else{
                    sform.ctime = '';
                    sform.ctime_start = '';
                    sform.ctime_end = '';
                }

                sform.park_id = '3';
                sform.park_id_start = sform.parkId;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            handleClose(){

            },
            setAuthorityFn(){
                let that = this;

            //    获取物料数据

                var params = new FormData();
                params.append('token', sessionStorage.getItem('token'));
                axios.post(bolinkPath+'/materiel/detail', params).then(function (response) {
                    let res = response.data;
                    that.countForm = res;
                }).catch(function (error) {
                });

            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData = {
                    currentData:'',
                    parkId:'',
                    state:''
                },
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            resetForm(){
                this.initFn(this)
            }


        },
        mounted(){
        },
        activated(){
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
            this.setAuthorityFn();
            this.getPackList();
            this.initFn(this);
            // this.$refs['tabPane'].getTableData({},this)
        }
    }
</script>

<style lang="scss" scoped>
    .m-header{
        margin-bottom: 10px;
    }
    .card{
        position: relative;
        height: 110px;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        .title{
            margin: 0;
            padding: 0;
            height: 40px;
            line-height: 40px;
            text-indent: 16px;
            font-size: 18px;
            font-weight: 500;
            .title-integral{
                float: right;
                font-size: 12px;
                margin-right: 15px;
                color: #0000ff;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .content{
            height: calc(100% - 40px);
            text-align: center;
            font-size: 30px;
        }
        .apply-btn{
            background: rgba(5,165,93,0.7);
            height: 100%;
            line-height: 110px;
            text-align: center;
            font-size: 22px;
            margin: 0;
            padding: 0;
            cursor: pointer;
            color: #fff;
            i{
                margin-right: 10px;
            }
        }
    }
    .console-wrapper{
        padding: 20px 10px 0 10px;
        /*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/
    }
    .custom-dialog{
        .title{
            font-size: 18px;
            text-align: center;
        }
        .content{

        }
    }
    .year-tip{
        color: #f33a3a;
        font-size: 16px;
        padding: 15px 22px;
        background: rgba(204,204,204,0.55);
        margin-bottom: 20px;
    }
</style>
