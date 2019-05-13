<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <!--为了动态获取元素的高度-->
        <!--id="consoleCurrentHeight"  属于必填的-->
        <div class="shop-custom-operation" id="consoleCurrentHeight">
            <header class="shop-custom-header">
                <p style="float: left">厂商管理<span style="margin: 2px">-</span>厂商管理</p>
                <div class="float-right">
                    <el-button type="text"  @click="exportFn" native-type="button" v-if="hideAdd" icon="el-icon-printer">导出</el-button>
                    <el-button type="text"  @click="handleAdd" native-type="button" v-if="hideAdd" icon="el-icon-plus">注册厂商</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>

            <!--开发superForm组件-->
            <!--formConfig   表单的配置文件-->
            <!--searchData   基础传入的数据 可为空对象-->
            <!--searchValueFn 数据传递一周后输出的值-->
            <super-form :form-config="formConfig" :value="searchData" v-on:input="searchValueFn">
                <template slot="second">
                    <el-form-item label="余额" class="clear-style">
                        <el-input v-model="expandForm.balance_start" placeholder="0" class="shop-custom-input" style="width: 110px"></el-input>-
                        <el-input v-model="expandForm.balance_end" placeholder="0" class="shop-custom-input" style="width: 110px"></el-input>
                    </el-form-item>
                </template>
            </super-form>
            <!--结束end-->

        </div>
        <div class="table-wrapper-style">
            <!--兼容bolink api-->
            <!--
                //默认不开启泊链表格模式，如果要开启 id="consoleCurrentHeight"  是必填的 位置：最外层<section>的第一个子级
                //isBolink  true 为泊链   默认false
                //open-fixed-height true 固定高度 （配合泊链使用） 默认false
                //suction-top-visible false 隐藏吸顶效果   默认为true
            -->
            <!--
            表格的一些基本参数
            //编辑
            :editTo="editTo"  type:Number 数值递增，触发视图更新
            :editapi="editapi" type:String 编辑api
            :editRowData="editRowData" type:Object  编辑传递的内容
            v-on:editInput="editInput"   //通知父级重新赋值，已完成视图更新

            //添加
            :addTo="addTo" type:Number 数值递增，触发视图更新
            :addapi="addapi" type:String 添加api
            :addRowData="addRowData" type:Object  添加传递的内容
            v-on:addInput="addInput" //通知父级重新赋值，已完成视图更新

            //搜索
            :searchForm="searchForm" //搜索传递的数值
             fixedDom="scrollBarDom" //吸顶效果依赖的根元素 和页面最大容器的ID必须一致，否则无法完成表格表头吸顶效果
             ref="tabPane"  //自定义表格的根元素

             //删除
             :delapi="delapi"  删除的api
            :del-form="delForm" 触发删除附件的参数
            v-on:cancelDel="cancelDel" 通知父级触发了删除操作
            -->


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
                    :exportapi="exportapi"
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    const stateItems = [
            {'value_name':'未审核','value_no':0},
            {'value_name':'已审核','value_no':1},
            {'value_name':'禁用','value_no':2},
            {'value_name':'已锁定','value_no':3}];

    const dockingtypeitems = [
            {'value_name':'车场','value_no':0},
            {'value_name':'云平台','value_no':2}];
    const plattypeitems = [
            {'value_name':'车场厂商','value_no':0},
            {'value_name':'停车券厂商','value_no':1}];

    import {
        path,
        bolinkPath,
        genderType,
        collectType,
        parkState,
        inparkType,
        checkParkMobile,
    } from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import superForm from '../../components/super-form/inline-form';
    import axios from 'axios'

    export default {
        components: {
            TabPane,superForm
        },
        data() {
            var that = this;
            return {
                /**
                 * 超级表单
                 * @searchData   default {}   //表单的基础数据搜索（常用到的）
                 * @expandForm   default {}   //表单基础数据之外的数据搜索（特殊的）
                 * @formConfig   //表单搜索控件的基本数据架构
                 * -----> showMore //控制高级搜索按钮是否显示
                 * ---->通过first/second/third 区分第几行显示的数据
                 * ---->常用到的 type:["date","input","select"]
                 * ---------------------->prop:'绑定的字段'
                 * -------->input 的配置
                 * ---------->{
                 *              label:'',
                 *              type:'input',
                 *              subtype:'text',
                 *              prop:''}
                 *
                 * -------->select
                 * ----------->{
                 *          label:'',
                 *          type:'select',
                 *          prop:'',
                 *          options:[{
                 *              value_name:'',
                 *              value_no:'',
                 *          }
                 *          ],//选择器的参数
                 * }
                 *
                 *
                 * ----->date
                 * --------->{
                 *      label:'',
                 *      type:'date',
                 *      subtype:'datetimerange', //暂时只支持datetimerange
                 *      prop:'currentDate', //*必须为currentDate
                 *      subprop:'',//要绑定的字段名称
                 *      valueFormat:'timestamp', //时间传递的格式 可以为timestamp / yyyy-MM-dd hh:mm:ss 等
                 * }
                 */
                searchData:{
                    id:3,
                },
                expandForm:{},
                formConfig:{
                    showMore:true,
                    first:[{
                        label:'注册日期',
                        type:'date',
                        subtype:'datetimerange',
                        prop:'currentDate',
                        subprop:'reg_time',
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
                    second:[
                        {
                            label:'密钥',
                            type:'input',
                            subtype:'text',
                            prop:'ukey',
                        },{
                            label:'商务BD',
                            type:'select',
                            prop:'bd_id',
                            options:this.bdlist,
                        },{
                            label:'对接模式',
                            type:'select',
                            prop:'docking_type',
                            options:dockingtypeitems,
                        },
                    ],
                    third:[{
                        label:'厂商类型',
                        type:'select',
                        prop:'plat_type',
                        options:plattypeitems,
                    },]
                },
                stateItems:stateItems,
                dockingtypeitems:dockingtypeitems,
                plattypeitems:plattypeitems,
                bdlist:[],
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
                showdelete: true,
                hideOptions: true,
                imgSize:450,
                hideTool: false,
                showImg: true,
                showBusinessPoles: true,
                queryapi: '/union/query',
                addapi: '/union/add',
                editapi: '/union/edit',
                exportapi:'/union/export',
                btswidth: '100',

                fieldsstr: 'id__name__phone__tmobile__address__reg_time__update_time__state__balance__bd_id__ukey__isdistibution__tid__docking_type__plat_type',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                type: 'number',
                                width:120,
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
                                width:280,
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
                                label: '地址',
                                width:400,
                                prop: 'address',
                                searchable: true,
                                unsortable: true,
                                addtable: true,
                                editable:true,
                                align: 'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入地址', trigger: 'blur'}
                                ],
                            },
                        ]
                    },
                    {hasSubs:false,subs:[
                            {label:'联系电话',
                                prop:'phone',
                                width:120,
                                editable:true,
                                searchable:true,
                                addtable:true,
                                unsortable:true,
                                align:'center',
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入联系电话', trigger: 'blur'}
                                ],
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'密保电话',
                                prop:'tmobile',
                                width:120,
                                editable:true,
                                addtable:true,
                                searchable:true,
                                unsortable:true,
                                align:'center',
                                addable:true,
                                "type": "input",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'注册日期',
                                prop:'reg_time',
                                width:'175',
                                type:'date',
                                searchable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.reg_time);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'更新日期',
                                prop:'update_time',
                                width:'175',
                                type:'date',
                                searchable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.dateformat(params.row.update_time);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                }
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'状态',
                                prop:'state',
                                width:'90',
                                editable:true,
                                searchable:true,
                                addtable:true,
                                unsortable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(stateItems,params.row.state);
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':stateItems,
                                "rules": [
                                    {required: true, message: '请选择状态', trigger: 'blur'}
                                ],
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'余额',
                                prop:'balance',
                                width:'150',
                                type:'number',
                                searchable:true,
                                align:'center',

                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'密钥',
                                prop:'ukey',
                                width:'185',
                                editable:true,
                                searchable:true,
                                unsortable:true,
                                align:'center',
                                "type": "input",
                                "disable": false,
                                "readonly": true,
                                "value": "",
                                'size':'',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入密钥', trigger: 'blur'}
                                ],},
                        ]},
                    {hasSubs:false,subs:[
                            {label:'管理员账号',
                                prop:'tid',
                                width:'120',
                                type:'number',
                                editable:false,
                                searchable:false,
                                unsortable:true,
                                align:'center',},
                        ]},
                    {hasSubs:false,subs:[
                            {
                                label: '商务BD',
                                prop: 'bd_id',
                                width: '120',
                                editable: true,
                                addtable: true,
                                searchable: true,
                                unsortable: true,
                                selectlist:this.bdlist,
                                align: 'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(this.bdlist,params.row.bd_id);
                                    return h('div', [
                                        h('span', str == ''?'-':str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':this.bdlist,
                            }
                        ]},
                    {hasSubs:false,subs:[
                            {label:'支持清分',
                                prop:'isdistibution',
                                width:'100',
                                editable:true,
                                searchable:true,
                                addtable:true,
                                unsortable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = params.row.isdistibution == 0?'否':'是';
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':[{
                                value_no:0,
                                    value_name:'否'
                                },{
                                value_no:1,
                                    value_name:'是'
                                }],
                                "rules": [
                                    {required: true, message: '请选择', trigger: 'blur'}
                                ],
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'对接模式',
                                prop:'docking_type',
                                width:'100',
                                editable:true,
                                searchable:true,
                                addtable:true,
                                unsortable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(dockingtypeitems,params.row.docking_type);;
                                    return h('div', [
                                        h('span', str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':dockingtypeitems,
                                "rules": [
                                    {required: true, message: '请选择', trigger: 'blur'}
                                ],
                            },
                        ]},
                    {hasSubs:false,subs:[
                            {label:'厂商类型',
                                prop:'plat_type',
                                width:'100',
                                editable:true,
                                searchable:true,
                                addtable:true,
                                unsortable:true,
                                align:'center',
                                columnType:'render',
                                render: (h, params) => {
                                    let str = common.formatCommonSateFn(plattypeitems,params.row.plat_type);
                                    return h('div', [
                                        h('span', str == ''?'-':str)
                                    ]);
                                },
                                "type": "select",
                                "disable": false,
                                "readonly": false,
                                "value": "",
                                'size':'',
                                'options':plattypeitems,
                                "rules": [
                                    {required: true, message: '请选择', trigger: 'blur'}
                                ],
                            },
                        ]},
                    {

                        hasSubs: false,
                        subs: [{
                            fixed:'right',
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

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
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
                                                this.$router.push({path: '/city_manage_staff?shop_id='+params.row.id});
                                            }
                                        }
                                    }, '员工设置'),
                                ]);
                            }
                        }]
                    },
                ],
            }
        },
        methods: {
            searchValueFn(val,state){
                /*
                * val  value值
                * state Boolean  true点击搜索  false日常的数据更新
                * */
                if(state){
                    //当拓展的input不为空时，拼合两个表单组合提交
                    if(this.expandForm.balance_start){
                        this.expandForm.balace = 'between';
                        Object.assign( this.searchData,this.expandForm)
                    }
                    this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
                }else{
                    this.searchData = Object.assign({},val)
                }
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                this.searchData = {
                    id:3,
                };
                this.searchForm = JSON.parse(JSON.stringify( this.searchData ));
            },
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
            getQuery(){
                let that = this;
                axios.get(bolinkPath+'/getdata/getbdinfo?token='+sessionStorage.getItem('token')).then(res=>{
                    that.bdlist = res.data || [];
                    that.bdlist.unshift({
                        value_name:'全部',
                        value_no:''
                    })
                    this.$nextTick(res=>{
                        this.initFn(this)
                    })
                }).catch(err=>{
                    that.bdlist = [];
                    console.log('Failure to obtain data',err)
                    this.$nextTick(
                        this.initFn(this)
                    )
                })

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
            this.getQuery();
        },
        activated() {

        },
        watch: {
            bdlist:function (val) {
                this.tableitems[11].subs[0].options = val;
                this.formConfig.second[1].options = val;
            },
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>
