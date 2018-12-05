<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">固定码管理<span style="margin: 2px">-</span>固定码管理</p>
                <div class="float-right"><el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button></div>
            </header>
             <div class="shop-custom-console">
                 <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                     <div class="advanced-options" v-show="isShow">
                         <el-form-item label="状态">
                             <el-select v-model="searchFormData.state" placeholder="请选择" class="shop-custom-input">
                                 <el-option
                                         v-for="item in stateList"
                                         :key="item.value_no"
                                         :label="item.value_name"
                                         :value="item.value_no">
                                 </el-option>
                             </el-select>
                         </el-form-item>
                     </div>
                     <div class="console-main">
                         <el-form-item>
                             <el-select v-model="searchFormData.time_type" @change="setTimeChange" placeholder="请选择" class="shop-custom-input shop-custom-suffix" style="width: 100px">
                                 <el-option label="创建时间" value="1"></el-option>
                                 <el-option label="开始时间" value="2"></el-option>
                                 <el-option label="结束时间" value="3"></el-option>
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
                         <el-form-item label="名称">
                             <el-input style="width: 140px" v-model="searchFormData.name" class="shop-custom-input" placeholder="请输入搜索内容"></el-input>
                         </el-form-item>
                         <el-form-item class="shop-clear-style">
                             <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                             <el-button type="text"
                                        @click="changeMore"
                                        style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                         </el-form-item>
                         <div class="float-right">
                             <el-form-item class="shop-clear-style">
                                 <el-button type="primary" icon="el-icon-plus" style="padding: 12px 10px" @click="addFixedCode" v-if="showCustomizeAdd">添加固定码</el-button>
                                 <el-button type="primary" icon="el-icon-setting" style="padding: 12px 10px" @click="setPublic" v-if="showPublic">公众号设置</el-button>
                             </el-form-item>
                         </div>
                     </div>

                 </el-form>
             </div>
        </div>

        <!--table-->
        <div class="table-wrapper-style">
            <tab-pane
                    :stripe="true"
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
        <!--添加固定码-->
        <el-dialog custom-class="shop-fixedCode-dialog" :visible.sync="addFormVisible" @close="closeFn">
            <header class="fixed-code__title" slot="title">
                添加固定码
            </header>
            <el-steps :active="activeIndex" simple style="padding: 18px 20%;">
                <el-step title="步骤 1" icon="iconfont icon-icon-test1"></el-step>
                <el-step title="步骤 2" icon="iconfont icon-icon-test"></el-step>
            </el-steps>
            <el-form ref="addFormPark" label-width="80px" :model="addFormPark" :rules="addFormRules" class="custom-form-style fiexd-code-form">
                <div v-show="activeIndex == 1">
                    <el-form-item label="名称"  :prop="name">
                        <el-input v-model.trim="addFormPark.name"  placeholder="请输入固定码名称"></el-input>
                    </el-form-item>

                    <el-form-item label="减免类型">
                        <el-select v-model="reducetype" style="width: 292px">
                            <el-option
                                    v-for="item in reduceType"
                                    :label="item.value_name"
                                    :value="item.value_no"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单张额度" v-if="showamount" :prop="amount_limit">
                        <el-input v-model.number="addFormPark.amount_limit"  placeholder="请输入单张的额度"></el-input>
                    </el-form-item>
                    <el-form-item label="总张数" v-if="showfree" :prop="free_limit">
                        <el-input v-model.number="addFormPark.free_limit"  placeholder="请输入总张数"></el-input>
                    </el-form-item>
                    <div class="fixed-code-btn">
                        <el-button type="primary" style="width: 144px" @click="nextStep">下一步</el-button>
                    </div>
                </div>
                <div v-show="activeIndex == 2">
                    <el-form-item label="起始日期" prop="begin_time">
                        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="addFormPark.begin_time" style="width: 292px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="有效期" prop="end_time">
                        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="addFormPark.end_time" style="width: 292px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="可用时段">
                        <el-time-picker
                                style="width: 292px"
                                is-range
                                arrow-control
                                v-model="addFormPark.time_inuse"
                                :picker-options="{
                                  format:'HH:mm'
                                }"
                                format="HH:mm"
                                value-format="HH:mm"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                >
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="状态" >
                        <el-select v-model="addFormPark.state" style="width: 292px">
                            <el-option
                                    v-for="item in stateList"
                                    :label="item.value_name"
                                    :value="item.value_no"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="fixed-code-btn">
                        <el-button style="width: 144px;margin-right: 47px" @click="upperStep">上一步</el-button>
                        <el-button type="primary" style="width: 144px" :loading="addloading" @click="handleAdd">添加</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>

        <!--公众号设置-->
        <el-dialog custom-class="shop-fixedCode-dialog" :visible.sync="showPublicDialog" @close="closeFn1">
            <header class="fixed-code__title" slot="title">
                公众号设置
            </header>
            <div class="fixes-code__tip">
                如果启用了公众号设置，必须关注该公众号才能使用固定码功能，且只支持微信扫码！
            </div>
            <el-form ref="publicForm"
                     label-width="120px"
                     class="custom-form-style fiexd-code-form1"
                     :model="publicFormModel"
                     :rules="publicFormRules">
                <el-form-item label="公众号设置" >
                    <el-select v-model="public_state" style="width: 328px">
                        <el-option
                                v-for="item in setList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公众号appid"  :prop="appid" v-if="showPublicSet">
                    <el-input v-model="publicFormModel.appid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="公众号秘钥"  :prop="secret" v-if="showPublicSet">
                    <el-input v-model="publicFormModel.secret" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="关注地址"  :prop="concern_address" v-if="showPublicSet">
                    <el-input v-model="publicFormModel.concern_address" placeholder=""></el-input>
                </el-form-item>
                <div class="fixed-code-btn">
                    <el-button type="primary" style="width: 144px" @click="addPublic" :loading="addloading">确定</el-button>
                </div>
            </el-form>

        </el-dialog>

        <!--操作-->
        <el-dialog custom-class="shop-fixedCode-dialog shop-fixedCode-edit" :visible.sync="showOperation" @close="closeFn2">
            <header class="fixed-code__title" slot="title">
                编辑
            </header>
            <el-form ref="pwdForm"
                     label-width="100px"
                     class="custom-form-style fiexd-code-form2"
                     :model="pwdFormModel"
                     :rules="pwdFormRules">
                <el-form-item label="状态" >
                    <el-select v-model="pwdFormModel.public_state" style="width:250px">
                        <el-option
                                v-for="item in stateList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码管理" v-show="pwdFormModel.public_state == 0">
                    <el-select v-model="pwd_state" style="width:250px">
                        <el-option
                                v-for="item in setList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" v-if="pwdFormModel.public_state == 0 && showPwdSet">
                    <el-input v-model.trim="pwdFormModel.password" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" style="width: 144px" @click="addPwd" :loading="addloading">确定</el-button>
                </div>
            </el-form>
        </el-dialog>

        <!--展示二维码-->
        <el-dialog
                center
                top="20vh"
                custom-class="custom-shop-dialog"
                :visible.sync="qrCodeView">
            <div class="shop-dialog-content">
                <img :src="qrsrc">
            </div>
            <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="qrurl" readonly="readonly" class="custom-append-style">
                    <el-button
                            slot="append"
                            @click="copyLink">复制链接</el-button>
                </el-input>
            </div>
            <div class="shop-dialog-footer" style="margin-top: 15px;">
                <el-button type="primary" style="background: #3C75CF;color: #FFF"><a style="color: #FFFFFF;" :href="qrsrc" download>保存到本地</a></el-button>
            </div>
        </el-dialog>
        <!--canvas 容器隐藏-->
        <canvas id="canvas" style="display:none"></canvas>
        <canvas id="img" style="display:none"></canvas>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType,stateType,checkValiTime} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID_SHOP} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import ElButton from 'element-ui/packages/button/src/button';
    import ElFormItem from 'element-ui/packages/form/src/form-item';

    export default {
        components: {
            ElFormItem,
            ElButton,
            TabPane
        },
        data() {
            return {
                copyBtn:null,
                qrurl:'',
                qrsrc:'',
                qrCodeView:false,
                availableState:false,
                showOperation:false,
                activeIndex:1,
                addFormPark: {
                    name:'',
                    reducetype:'',
                    end_time:'',
                    amount_limit:'',
                    free_limit:'',
                    state:0,
                    time_inuse:'',
                },
                addFormVisible:false,
                available:require('../../assets/images/shop/state-available.png'),
                unavailable:require('../../assets/images/shop/state-unavailable.png'),
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
                searchForm:{},
                isShow:false,
                searchFormData:{
                    currentData:null,
                    name:'', //名称
                    state:'', //状态
                    state_start:'',//
                    time_type:'1',
                },
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'fixCode',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'name',
                                width: '150',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addtable: true,
                                hidden:'',
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '创建日期',
                            prop: 'create_time',
                            width: '160',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.create_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '开始日期',
                            prop: 'begin_time',
                            width: '160',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.begin_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '结束日期',
                            prop: 'end_time',
                            width: '160',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.end_time))
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '剩余时长',
                                prop: 'time_limit',
                                width: '120',
                                type: 'str',
                                hidden:false,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '剩余金额',
                                prop: 'money_limit',
                                width: '120',
                                type: 'str',
                                hidden:false,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '剩余张数',
                                prop: 'free_limit',
                                width: '80',
                                type: 'str',
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '100',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = '',className = '',colors='';
                                switch (params.row.state){
                                    case 0:
                                        str = '可用';className = 'el-icon-circle-check';colors = 'rgba(125,198,115,1)';
                                        break;
                                    case 1:
                                        str = '不可用';className = 'el-icon-circle-close';colors = 'rgba(245,109,109,1)';
                                        break;
                                    default:
                                        str = '过期';className = 'el-icon-circle-close';colors = 'rgba(140,140,140,1)';
                                }
                                return h('div', [
                                    h('i',{
                                        class:className,
                                        style:{
                                            color:colors,
                                            marginRight:'4px'
                                        }
                                    },''),
                                    h('span', str)
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '二维码',
                            prop: 'end_time',
                            width: '78',
                            type: 'date',
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton',{
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.qrurl = params.row.code_src;
                                                this.genqr(this.qrurl)
                                            }
                                        },
                                        style:{
                                            color:'rgba(51,121,233,0.8)'
                                        }
                                    }, '查看')
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            width: '78',
                            type: 'date',
                            hidden:false,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let state = params.row.state;let off = false;
                                if(state != 0 && state != 1){
                                    off = true;
                                }else{
                                    off = false;
                                }
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:off
                                        },
                                        style: {
                                            color:off?'': 'rgba(51,121,233,1)',
                                            display:this.showEdit?'':'none'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.pwd_state = params.row.use_pwd+'';
                                                if(params.row.pass_word == undefined ||params.row.pass_word == null){
                                                    this.pwdFormModel.password = '';
                                                }else{
                                                    this.pwdFormModel.password = params.row.pass_word;
                                                }

                                                this.pwdFormModel.id = params.row.id;
                                                this.pwdFormModel.public_state = params.row.state;
                                                this.showOperation = true;
                                            }
                                        }
                                    }, '编辑')
                                ]);
                            }
                        }]
                    },
                ],
                pwdFormModel:{
                    id:'',
                    password:'',
                    public_state:0,
                },
                //------------------------------------------
                showPwdSet:false,
                showPublicSet:false,
                loading: false,
                hideExport: true,
                hideSearch: false,
                orderfield:'id',
                tableheight: '',
                showdelete: false,
                hideOptions: false,
                addloading:false,

                showCode:true,
                showPublic:true,
                hideAdd: true,


                public_state:'0',
                pwd_state:'0',
                publicFormModel:{
                    id:'',
                    appid:'',
                    secret:'',
                    concern_address:'',
                },
                showRegisPark: false,
                showPublicDialog:false,
                showPwdDialog:false,
                showCustomizeAdd:true,

                showamount:true,
                showfree:true,
                state:'可用',
                reducetype:'减免券',
                reduceType:[
                    { 'value_name': '减免券','value_no': 1},
                    { 'value_name': '全免券','value_no': 2},

                ],
                stateList :[
                     {'value_name': '可用','value_no': 0},
                     {'value_name': '不可用','value_no': 1},
                ],
                setList :[
                     {'value_no': '0','value_name': '关闭'},
                     {'value_no': '1','value_name': '开启'},
                ],
                tempSetForm:{
                    id:"",
                    appid:'',
                    secret:'',
                    concern_address:'',
                    public_state:'',
                },
                hideTool: false,
                showEdit: true,
                showPassWord:false,
                queryapi: '/fixcode/query',
                selfexportapi:'/fixcode/downloadCode',
                addapi:'/fixcode/add',
                editapi:'/fixcode/edit',
                publicapi:'/fixcode/public',
                pwdapi:'/fixcode/editAndPwd',
                btswidth: '160',
                href:'https://www.baidu.com/s?wd=node-pre-gyp+install+--fallback-to-build&ie=UTF-8&tn=39042058_20_oem_dg',
                fieldsstr: 'id__park_id__operate_time__ticketfree_limit__ticket_limit__ticket_money__operate_type__add_money__state__create_time__name',
                searchtitle: '高级查询',
                addtitle:"添加固定码",



                amount_limit:"amount_limit",
                free_limit:"free_limit",
                validite_time:"validite_time",
                name:"name",

                addFormRules: {
                    name: [
                        {required: true, message: '请输入固定码名称', trigger: 'blur'}
                    ],
                    amount_limit: [
                        {required: true, message: '请输入单张额度', trigger: 'blur'}
                    ],
                    free_limit:[
                      {required: true, message: '请输入总张数', trigger: 'blur'}
                    ],
                    validite_time:[
                      {validator: checkValiTime, trigger: 'blur'}
                    ],
                },

                appid:"appid",
                secret:"secret",
                concern_address:"concern_address",
                publicFormRules: {
                   appid: [
                       {required: true, message: '请输入公众号appid', trigger: 'blur'}
                   ],
                   secret: [
                       {required: true, message: '请输入公众号秘钥', trigger: 'blur'}
                   ],
                   concern_address:[
                     {required: true, message: '请输入公众号关注地址', trigger: 'blur'}
                   ],
               },
               password:'password',
               pwdFormRules: {
                  password: [
                      {required: true, message: '请输入4位数字密码',min:4,max:4, trigger: 'blur'}
                  ],
              }
            }
        },
        methods:{
            setTimeChange(val){

            },
            copyLink() {
                let _this = this;
                this.$copyText(this.qrurl).then(function (e) {
                    _this.$message({
                        message: '复制成功，已复制到剪切板',
                        type: 'success'
                    });
                }, function (e) {
                    _this.$message({
                        message: '复制失败，请手动操作',
                        type: 'warning'
                    });
                })
            },
            genqr(url){
                var canvas = document.getElementById('canvas')
                this.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {
                    if (error){} else{}
                })
                var context=canvas.getContext('2d');
                var imageData = context.getImageData(0,0,canvas.width,canvas.height);

                var img = document.getElementById("img");
                img.width=canvas.width
                img.height=canvas.height
                var context2 = img.getContext('2d');
                context2.fillStyle="white";
                context2.fillRect(0,0,canvas.width,(canvas.height));
                context2.putImageData(imageData,0,0);
                context2.font="bold 10px 微软雅黑"
                context2.fillStyle="black"

                var url = img.toDataURL("image/png");
                this.qrsrc = url;
                this.qrCodeView = true;
            },
            addPwd(){
                let _this = this;
                this.$refs.pwdForm.validate((valid) => {
                    if (valid) {
                        if((_this.pwd_state == 1) && ((this.pwdFormModel.password == '' || isNaN(this.pwdFormModel.password)) || this.pwdFormModel.password.length != 4)){
                            _this.$message({
                                message: '请输入密码（四位数字）',
                                type: 'error',
                                duration: 3000
                            });
                            return;
                        }
                        _this.addloading = true;
                        let aform = _this.generateForm(_this.pwdFormModel);
                        aform.state = _this.pwdFormModel.public_state;
                        aform.pwd_state=_this.pwd_state;
                        aform.password=_this.pwdFormModel.password;
                        aform.id=_this.pwdFormModel.id;
                        _this.$axios.post(path + _this.pwdapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.$refs['tabPane'].getTableData({},_this);
                                _this.$message({
                                    message: '编辑成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.showOperation = false;
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            addPublic(){
                let _this = this;
                this.$refs.publicForm.validate((valid) => {
                    if (valid) {
                        _this.addloading = true;
                        let aform = _this.publicFormModel;
                        aform.loginuin = common.attachParams('loginuin', 1);
                        aform.shopid = common.attachParams('shopid', 1);
                        aform.public_state=_this.public_state;
                        _this.$axios.post(path + _this.publicapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.getShopAccountInfo();
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.showPublicDialog = false;
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            setPublic(){
                this.publicFormModel =common.clone(this.tempSetForm);
                this.public_state=this.tempSetForm.public_state
                this.showPublicDialog=true
            },
            closeFn(){
                this.$refs['addFormPark'].clearValidate()
                this.activeIndex = 1;
            },
            closeFn1(){
                this.$refs['publicForm'].clearValidate()
            },
            closeFn2(){
                this.$refs['pwdForm'].clearValidate()
            },
            addFixedCode(){
                // this.$refs['addFormPark'].clearValidate();
                this.addFormVisible = true;
            },
            handleAdd(){
                let _this = this;

                this.$refs.addFormPark.validate((valid) => {
                    if (valid) {
                        _this.addloading = true;
                        let aform = _this.addFormPark;
                        aform.loginuin = common.attachParams('loginuin', 1);
                        aform.shopid = common.attachParams('shopid', 1);
                        aform.type = this.reducetype;
                        _this.$axios.post(path + _this.addapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.$refs['tabPane'].getTableData({},_this);
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.addFormVisible = false;
                                _this.addFormPark = {};
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            upperStep(){
                this.activeIndex = 1;
            },
            nextStep(){
                this.activeIndex = 2;
            },
            resetForm(){
                this.initFn(this)
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.searchFormData ={
                    currentData:null,
                    name:'', //名称
                    state:'', //状态
                    state_start:'',//
                    time_type:'1',
                };
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            changeDateFormat:function () {
                ;
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = {};
                sform = JSON.parse(JSON.stringify( this.searchFormData )) ;
                sform.state_start = sform.state;
                if(sform.currentData != null){
                    if(sform.time_type == '1'){
                        sform.create_time = 'between';
                        sform.create_time_start = sform.currentData[0];
                        sform.create_time_end = sform.currentData[1];
                    }else if(sform.time_type == '2'){
                        sform.begin_time = 'between';
                        sform.begin_time_start = sform.currentData[0];
                        sform.begin_time_end = sform.currentData[1];
                    }else{
                        sform.end_time = 'between';
                        sform.end_time_start = sform.currentData[0];
                        sform.end_time_end = sform.currentData[1];
                    }
                }

                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            getShopAccountInfo(){
                let vm = this;
                vm.$axios.post(path+"/shopaccount/shopinfo?id="+sessionStorage.getItem('shopid'),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if(ret.ticket_unit==1||ret.ticket_unit==2||ret.ticket_unit==3){
                        vm.tableitems[5].subs[0].hidden = "true";
                    }

                    else if(ret.ticket_unit==4){
                        //金额  隐藏剩余时长
                        vm.tableitems[4].subs[0].hidden = "true";
                    }

                    if(ret.support_type==0){
                        vm.reduceType=[
                            { 'value_name': '减免券','value_no': 1},
                        ]
                    }
                    //console.log("~~~~~:"+ret.appid)
                    vm.tempSetForm.id= ret.id;
                    vm.public_state= ret.public_state+'';
                    vm.tempSetForm.public_state= ret.public_state+'';
                    if(ret.appid&&ret.secret&&ret.concern_address){
                        vm.tempSetForm.appid= ret.appid;
                        vm.tempSetForm.secret= ret.secret;
                        vm.tempSetForm.concern_address= ret.concern_address;
                    }
                });
            },
            generateForm(sform) {
                //用来构建相同的参数
                sform.loginuin = common.attachParams('loginuin', 1);
                sform.shopid = common.attachParams('shopid', 1);
                sform.type = this.reducetype;
                sform.state = this.state;
                return sform;
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID_SHOP.fixCode == item.auth_id) {
                            this.showEdit = common.showSubEdit(item.sub_auth);
                            this.showPublic=common.showPublic(item.sub_auth);
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                            if(!this.showEdit){
                                this.hideOptions=true
                            }
                            break;
                        }
                    }
                }
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.getShopAccountInfo()
            this.$refs['tabPane'].getTableData({},this);
        },
        activated() {

        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
            reducetype : function (val) {
                if(val==1){//时长减免

                    this.showamount = false;
                    this.showfree = false;
                    this.addFormPark.validite_time='24';
                    this.showamount = true;
                    this.showfree = true;

                }else{//全免
                    this.showamount = false;
                    this.showfree = false;
                    this.addFormPark.validite_time='24'
                    this.showfree = true;
                }
            },
            public_state: function (val) {
                if(val==1){
                    this.showPublicSet=true
                }else{
                    this.showPublicSet=false
                }
            },
            pwd_state:function (val) {
              if(val==1){
                  this.showPwdSet=true
              }else{
                  this.showPwdSet=false
              }
            },
        },
    }

</script>

<style lang="scss" scoped>
    .fiexd-code-form{
        position: relative;
        padding: 30px 53px 0 53px;
        height: 275px;
    }
    .fiexd-code-form1{
        position: relative;
        padding: 50px 20px 0 10px;
        height: 275px;
    }
    .fiexd-code-form2{
        padding: 30px 53px 25px 53px;
        /*height: 275px;*/
    }
    .fixed-code-btn{
        position: absolute;
        bottom: -25px;
        left: 0;
        right: 0;
        display: block;
        margin: 0 auto;
        text-align: center;
    }
    .fixes-code__tip{
        position: relative;
        top:18px;
        padding: 10px 23px;
        border-radius: 4px;
        background: rgba(216,216,216,0.27);
        font-size: 14px;
        color: #858585;
        margin: 0 37px;
    }
</style>
