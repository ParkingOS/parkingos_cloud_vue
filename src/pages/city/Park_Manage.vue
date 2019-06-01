<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>车场管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="handleAdd('add')" native-type="button" v-if="hideAdd" icon="el-icon-plus">注册停车场</el-button>
                    <el-button type="text"  @click="exportFn" native-type="button"  icon="el-icon-printer">导出</el-button>
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

        <!--生成二维码-->
        <el-dialog
                width="600px"
                title="生成车场二维码"
                :visible.sync="qrVisible"
                @close="qrclose"
                @open="qropen"
                top="6%"
                custom-class="el-dialog--tiny"
                size="tiny">
            <div v-if="qrVisible" >
                <el-row >
                    <el-col :span="11" :offset="1"  style="padding-top:0px;margin-bottom:10px">
                        <span>二维码类型:</span>
                    </el-col>
                    <el-col :span="11" :offset="1"  style="padding-top:0px;margin-bottom:10px">
                        <span v-if="needChannel">{{channelType}}:</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-select v-model="type" filterable placeholder="请选择" @change="selectQrType">
                            <el-option
                                    v-for="item in qrtype"
                                    :label="item.name"
                                    :value="item.type">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-input v-if="needChannel" v-model.trim="channelValue" placeholder="请输入通道编号" @change="changeChanneFn"></el-input>
                    </el-col>
                </el-row>


                <el-row v-show="loadingqrcode">
                    <!--<span>&nbsp;正在努力生成二维码,请稍后...</span>-->
                </el-row>

                <div v-show="hasQr">
                    <el-row>
                        <el-col :span="23" :offset="1" style="padding-top:0px;margin-top: 8px;margin-bottom:7px">
                            二维码地址:
                        </el-col>
                        <el-col :span="23" :offset="1" >
                            <el-input v-model="qrurl" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" :offset="1" style="margin-top: 10px;margin-bottom:5px">
                            二维码图片:
                        </el-col>
                        <el-row>
                            <el-col :span="10" :offset="1" >
                                <el-checkbox-group v-model="checkQrBox" @change="changeQrBox" style="margin-top:10px;margin-left:12px">
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="1">平台环境</el-checkbox></el-row>
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="2">车场名称</el-checkbox></el-row>
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="3">二维码类型</el-checkbox></el-row>
                                    <el-row v-if="needChannel" style="line-height:30px;display:inline"><el-checkbox label="4">通道编号</el-checkbox></el-row>
                                </el-checkbox-group>
                            </el-col>
                            <el-col :span="12" :offset="1" >
                                <canvas id="canvas" style="display:none"></canvas>
                                <canvas id="img" style="display:none"></canvas>
                                <img :src="qrsrc" width="100%"/>
                                <a id="downloadqr" v-show="generatable" style="font-size:10px;margin-left:80px;text-decoration:none" :href="downloadQrUrl" :download="downloadName">下载二维码</a>
                            </el-col>
                        </el-row>
                    </el-row>
                </div>
                <br/>
                <footer slot="footer" class="dialog-footer" style="text-align: right">
                    <el-button @click="qrVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="generateQR" :disabled="generatable" :loading="generateloading" size="small">点击生成二维码</el-button>
                </footer>
            </div>
        </el-dialog>



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
                <el-form-item label="服务商">
                    <el-select v-model="addForm.serverid"  placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in bolinkServerList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运营集团">
                    <el-select v-model="addForm.groupid"  placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in unionList"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车场名称" prop="name">
                    <el-input v-model.trim="addForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="互联车场编号" v-if="addType == 'edit'">
                    <el-input v-model.trim="addForm.park_id"  placeholder="" :readonly="addType == 'edit'"></el-input>
                </el-form-item>
                <el-form-item label="车位总数" prop="total_plot">
                    <el-input v-model.trim="addForm.total_plot"  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系手机" prop="phone">
                    <el-input v-model.trim="addForm.phone"  placeholder=""></el-input>
                </el-form-item>
                <!--<el-form-item label="车场地址">-->
                    <!--<el-input v-model.trim="addForm.address" placeholder="" ></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false"  style="width: 90px;">取 消</el-button>
                <el-button type="primary"  @click="addSubmitFn" :loading="addLoading" style="width: 90px;margin-left: 60px">确 定</el-button>
            </footer>
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
    } from '../../api/api';
    import common from '../../common/js/common'
    import { getTableQuery } from '../../api/base'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import superForm from '../../components/super-form/inline-form';
    import axios from 'axios'

    export default {
        components: {
            TabPane,superForm
        },
        data() {
            return {
                serverList:[],
                bolinkServerList:[],
                /////////add///////////////////
                addType:'',
                addTitle:'',
                addFormVisible:false,
                addLoading:false,
                addForm:{},
                addFormRules:{
                    'name':[{required: true, message: '请输入车场名称', trigger: 'blur'}],
                    'park_id':[{required: true, message: '请输入车场编号', trigger: 'blur'}],
                    'total_plot':[{required: true, message: '请输入车位总数', trigger: 'blur'}],
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
                    showMore:true,
                    first:[
                        {
                            label:'车场名称',
                            type:'input',
                            subtype: "text",
                            prop:'name'
                        },{
                            label:'互联车场编号',
                            type:'input',
                            subtype: "text",
                            prop:'park_id'
                        },{
                            label:'运营集团',
                            type:'select',
                            prop:'group_id',
                            options:[],
                        }],
                    second:[
                        {
                            label:'心跳时间',
                            type:'date',
                            subtype:'datetimerange',
                            prop:'pantTime',
                            subprop:'utime',
                            valueFormat:'timestamp'
                        },{
                            label:'服务商',
                            type:'select',
                            prop:'server_id',
                            options:[],
                        },
                    ]
                },
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
                exportapi:'/park/export',
                queryapi: '/park/querynew',
                setapi: '/cityparks/setpark',
                addapi: '/park/add',
                editapi: '/park/edit',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                fieldsstr: 'park_id__name__group_id__server_id__ukey__empty_plot__total_plot__address__phone__ctime__utime__last_pay_time__state__balance',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场名称（编号）',
                                prop: 'name',
                                width:200,
                                unsortable: true,
                                editable: true,
                                addtable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.name+'('+params.row.park_id+')';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入车场名称', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '互联车场编号',
                                prop: 'park_id',
                                hidden:true,
                                addtable: true,
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入车场编号', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场状态',
                                prop: 'state',
                                searchable: true,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.state != 1?'禁用':'正常';
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
                                width:150,
                                label: '运营集团',
                                prop: 'group_name',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                // columnType:'render',
                                // render: (h, params) => {
                                //     let str = common.formatCommonSateFn(this.unionList,params.row.group_id);
                                //     return h('div', [
                                //         h('span', str)
                                //     ]);
                                // },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                            },
                        ]
                    },{
                        hasSubs: false, subs: [
                            {
                                width:150,
                                label: '服务商',
                                prop: 'server_id',
                                addtable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(this.bolinkServerList,params.row.server_id);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '支付平台登录账号',
                                prop: 'uid',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.balance,2);
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
                                width:180,
                                label: '互联车场秘钥',
                                prop: 'ukey',
                                unsortable: true,
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '心跳时间',
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
                                label: '最新交易时间',
                                prop: 'last_pay_time',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.last_pay_time);
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
                                label: '联系手机',
                                prop: 'phone',
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
                                label: '车场地址',
                                prop: 'address',
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
                        hasSubs: false, subs: [
                            {
                                width:160,
                                label: '账号余额',
                                prop: 'balance',
                                unsortable: true,
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.balanceformat(params.row.balance,2);
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
                                label: '车位数',
                                prop: 'total_plot',

                                addtable: true,
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
                                width:160,
                                label: '余位数',
                                prop: 'empty_plot',
                                unsortable: true,
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            fixed:'right',
                            label: '操作',
                            width: '200',
                            hidden:false,
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
                                                this.addForm = JSON.parse(JSON.stringify(params.row));
                                                this.$set(this.addForm,'groupid',this.addForm.group_id+'');
                                                this.$set(this.addForm,'serverid',this.addForm.server_id+'');
                                                this.addForm.groupid = this.addForm.group_id+'';
                                                if(this.addForm.groupid == '-1' || this.addForm.groupid == null || this.addForm.groupid == 'null'){
                                                    this.addForm.groupid = '';
                                                }
                                                if(this.addForm.serverid == '-1' || this.addForm.serverid == null || this.addForm.serverid == 'null'){
                                                    this.addForm.serverid = '';
                                                }
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

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.generateurl(params.index, params.row.park_id)
                                            }
                                        }
                                    }, '二维码'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {},
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                // this.$router.push({path: '/park_manage_staff?bolink_id='+params.row.park_id+'&union_id='+params.row.union_id});
                                                this.$router.push({
                                                    path: '/park_manage_staff',
                                                    name:'park_manage_staff',
                                                    query: {
                                                        bolink_id: params.row.park_id,
                                                        union_id: params.row.union_id
                                                    }
                                                })

                                            }
                                        }
                                    }, '员工设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:(params.row.state != 1)?true:false
                                        },
                                        style: {
                                            color:(params.row.state != 1)?'#666':'red'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.prohibitFn(params.row)
                                            }
                                        }
                                    }, '禁用'),
                                    // h('ElButton', {
                                    //     props: {
                                    //         type: 'text',
                                    //         size: 'small'
                                    //     },
                                    //     style: {
                                    //         color:'red'
                                    //     },
                                    //     on: {
                                    //         click: (e) => {
                                    //             window.event? window.event.cancelBubble = true : e.stopPropagation();
                                    //             this.pwd = '';
                                    //             this.resetDataVisible = true;
                                    //             this.rowid = params.row.id;
                                    //         }
                                    //     }
                                    // }, '重置'),
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
                        let addForm = JSON.parse(JSON.stringify(this.addForm));
                        let newForm = {};
                        that.addLoading = true;

                        //add-----------------------
                        if(that.addType == 'add'){
                            newForm.server_id = addForm.serverid;
                            newForm.group_id = addForm.groupid;
                            newForm.company_name = addForm.name;
                            // newForm.bolink_id = addForm.park_id;
                            newForm.parking_total = addForm.total_plot;
                            newForm.mobile = addForm.phone;
                            common.generateForm(newForm);
                            axios.get(path+'/cityparks/editpark',{
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
                            newForm.server_id = addForm.serverid;
                            newForm.group_id = addForm.groupid;
                            newForm.company_name = addForm.name;
                            newForm.bolink_id = addForm.park_id;
                            newForm.parking_total = addForm.total_plot;
                            newForm.mobile = addForm.phone;
                            // newForm.address = addForm.address;
                            common.generateForm(newForm);
                            axios.get(path+'/cityparks/editpark',{
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
            //禁用操作
            prohibitFn(row){
                let that= this;
                let cloneRow = JSON.parse(JSON.stringify(row));
                this.$confirm('此操作将禁用该车场，支付功能将不可用，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {

                    let formData  = new FormData();
                    formData.bolink_id = cloneRow.park_id;
                    formData.union_id = cloneRow.union_id;

                    axios.get(path+this.delapi,{
                        params:{
                            bolink_id:cloneRow.park_id,
                            union_id:cloneRow.union_id
                        }
                    }).then(res=>{
                        that.$message({
                            message: '已禁用',
                            type: 'success',
                            duration: 600
                        });
                        setTimeout(()=>{
                            that.searchValueFn(that.searchData,true);
                        },60)

                    }).catch(err => {
                        that.$message({
                            message: '更新失败',
                            type: 'error',
                            duration: 600
                        });
                    })

                }).catch(() => {

                });
            },
            //生成二维码的相关操作
            generateurl(index,park_id){
                this.parkid = park_id
                //显示生成二维码对话框
                this.qrVisible = true
            },
            changeQrBox(event){
                //1平台类型,2车场名称,3二维码类型,4通道编号
                this.generatable = false
            },
            changeChanneFn(val){
                console.log('--->',val)
                this.generatable = false;
            },
            qrclose(){
                this.type=''
                this.qrVisible=false
                this.hasQr=false;
                this.generateloading=false
                setTimeout(()=>{this.unionid=''},300)
            },
            qropen(){
                if(path=='https://s.bolink.club/web'){
                    this.checkQrBox = ["2","3"]
                }else{
                    this.checkQrBox = ["1","2","3"]
                }
                this.needChannel=false
                this.hasQr=false;
                this.loadingqrcode=true;
                this.qrsrc=''
                this.qrurl=''
                this.type=''
                this.channelValue=''
                this.generatable=true;
                //this.generateQR()
            },
            selectQrType(){
                this.hasQr=false
                if(path=='https://s.bolink.club/web'){
                    this.checkQrBox = ["2","3","4"]
                }else{
                    this.checkQrBox = ["1","2","3","4"]
                }
                this.channelValue=''
                if(this.type>1){
                    this.needChannel=true
                    if(this.type==2){
                        this.channelType='请输入出场通道编号'
                    }else if(this.type==3){
                        this.channelType='请输入入场通道编号'
                    }
                }else{
                    this.needChannel=false
                    this.generateQR()
                }
                this.generatable=false;

            },
            generateQR(){
                if(this.type>1){
                    if(this.channelValue==''||this.channelValue==null){
                        this.$message({
                            message: '请填写通道编号!',
                            type: 'warning',
                            duration:5000
                        });
                        return
                    }
                }

                this.generateloading=true
                let vm = this;
                let box = "";
                for(var x in this.checkQrBox){
                    box += this.checkQrBox[x];
                }
                let params = {qrBox:box,park_id:this.parkid,union_id:this.unionid,type:this.type,channel_id:this.channelValue,token:sessionStorage.getItem('token')}


                axios.get(bolinkPath+'/park/getqrurl',{
                    params:params
                }).then(result=>{
                    let ret =result;
                    if(ret.validate!='undefined'&&ret.validate=='0'){
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(()=>{vm.alertInfo('未携带令牌,请重新登录!')},150)
                    }else if(ret.validate!='undefined'&&ret.validate=='1'){
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(()=>{vm.alertInfo('登录过期,请重新登录!')},150)
                    }else if(ret.validate!='undefined'&&ret.validate=='2'){
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(()=>{vm.alertInfo('登录异常,请重新登录!')},150)
                    }else{
                        if(ret.data.state){
                            vm.qrurl=ret.data.qrurl
                            vm.hasQr=true
                            vm.text=ret.data.text
                            vm.generateloading=false
                            vm.generatable=true
                            vm.loadingqrcode=false;
                            vm.genqr(ret.data.qrurl,ret.data.text);
                            var params = "park_id="+vm.parkid+"&union_id="+vm.initunionid+"&qr_url="+vm.qrurl+"&token="+sessionStorage.getItem('token')+"&text="+encodeURIComponent(vm.text)
                            vm.downloadQrUrl = encodeURI(bolinkPath + "/park/downloadqr?" + params)
                        }else{
                            vm.$alert(ret.msg, '提示', {
                                confirmButtonText: '确定',
                                type: 'warning',
                                callback: action => {
                                    vm.hasQr=false
                                    vm.generateloading=false
                                    vm.generatable=false
                                }
                            })
                        }
                    }
                }).catch(err=>{
                    console.log('get qrurl error==>',err)
                })

            },
            genqr(url,text){
                var canvas = document.getElementById('canvas')
                this.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {

                })
                var context=canvas.getContext('2d');
                var imageData = context.getImageData(0,0,canvas.width,canvas.height);

                var img = document.getElementById("img");
                img.width=canvas.width
                img.height=canvas.height+text.length*15+8
                var context2 = img.getContext('2d');
                context2.fillStyle="white";
                context2.fillRect(0,0,canvas.width,(canvas.height+text.length*15+8));
                context2.putImageData(imageData,0,0);
                context2.font="bold 10px 微软雅黑"
                context2.fillStyle="black"
                for(var i=0;i<text.length;i++){
                    var len = 16,str = text[i];
                    if(str.length> len){
                        str = str.substring(0,10)+"***"+str.substring(str.length-5)
                    }
                    context2.fillText(str,14,canvas.height+5+15*i)
                }

                var url = img.toDataURL("image/png");
                this.qrsrc = url
                var filename = this.initunionid+"-"+this.parkid+"-"+this.randomNum(6)+".png"
                // var triggerDownload = this.$("#download").attr("href", url).attr("download", filename);
                this.downloadName = filename;
            },
            randomNum(n){
                var t='';
                for(var i=0;i<n;i++){
                    t+=Math.floor(Math.random()*10);
                }
                return t;
            },
            ///////////////////////////////////////////////////////////////
            transferDataFn(data){
                // console.log('data-->',data)
            },

            ///////////////////////////////////////////start/////////////////////////////
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    this.searchData.query_from = 2;
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
                let listparams = '&unionid='+sessionStorage.getItem('unionid')+'&state=1';
                axios.all([
                    axios.get(bolinkPath+'/getdata/serverlist?unionid='+sessionStorage.getItem('unionid')+'&token='+sessionStorage.getItem('token')+'&state=1'),
                    common.getUnionList(),
                    axios.get(path+'/getdata/getServersByUnion?unionid='+sessionStorage.getItem('unionid'))
                ])
                    .then(axios.spread(function (bolinkServerList,retUnionList,serverList) {
                        _this.bolinkServerList = bolinkServerList.data;
                        _this.unionList = retUnionList.data;
                        _this.serverList = serverList.data;
                    }))

                this.$nextTick(res=>{
                    this.initFn(this)
                })
            },
            setAuthorityFn(){
                // let user = sessionStorage.getItem('user');
                // if (user) {
                //     user = JSON.parse(user);
                //     for (var item of user.authlist) {
                //         if (AUTH_ID_UNION.businessOrder_Poles == item.auth_id) {
                //             this.hideExport = common.showSubExport(item.sub_auth);
                //             break;
                //         }
                //     }
                //
                // }
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
        },
        activated() {
            this.initunionid = sessionStorage.getItem('unionid');
            this.getQuery()
        },
        watch: {
            bolinkServerList:function(val){
                this.formConfig.second[1].options = val;
            },
            unionList: function (val) {
                this.formConfig.first[2].options = val;
            },
            serverList:function(val){
              // this.formConfig.second[1].options = val;
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
