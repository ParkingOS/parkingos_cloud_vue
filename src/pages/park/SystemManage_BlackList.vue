<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            系统管理-黑名单管理
            <div class="float-right">
                <el-button @click="handleAdd" type="primary" size="mini" v-if="hideAdd">添加黑名单</el-button>
                <el-button size="mini" @click="resetForm">刷新</el-button>
            </div>
        </header>
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
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
                    v-on:cancelDel="cancelDel"
            ></tab-pane>
        </div>
    </section>
</template>


<script>
    import {blackStateType} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    export default {
        components: {
            TabPane
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
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    count:0
                },
                searchForm:{},
                queryapi: '/blackuser/query',
                addapi: '/blackuser/add',
                delapi: '/blackuser/delete',
                editapi: '/blackuser/edit',
                btswidth: '100',
                fieldsstr: 'id__car_number__ctime__utime__remark__operator__state',
                tableitems: [{
                    hasSubs:false,
                    subs: [{
                        label: '操作',
                        columnType:'render',
                        align: 'center',
                        width:'100',
                        hidden:false,
                        unsortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h('ElButton', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:this.showEdit?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            this.editRowData = params.row;
                                            this.editRowData.state = this.editRowData.state+'';
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
                                        marginRight: '5px',
                                        color:'red',
                                        display:this.showdelete?'':'none'
                                    },
                                    on: {
                                        click: () => {
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
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号码',
                                prop: 'car_number',
                                width: '123',
                                editable: true,
                                searchable: true,
                                addtable: true,
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
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '添加时间',
                            prop: 'ctime',
                            width: '180',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.ctime))
                                ]);
                            },
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '修改时间',
                            prop: 'utime',
                            width: '167',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.utime))
                                ]);
                            },
                        }]

                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '123',
                            selectlist: blackStateType,
                            editable: true,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row, blackStateType, 'state'))
                                ]);
                            },
                            "type": "radio",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [
                                {required: true, message: '请选择角色', trigger: 'blur'}
                            ],
                            'size':'',
                            "options": blackStateType,
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '操作人',
                            prop: 'operator',
                            width: '155',
                            editable: true,
                            searchable: false,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": true,
                            "value": '',
                            'size':'',
                            "subtype": "text",
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            width: '180',
                            editable: true,
                            searchable: false,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'',
                            "subtype": "textarea",
                        }]
                    },


                ],
                searchtitle: '高级查询',
                addtitle: '添加黑名单',
                addFormRules: {
                    car_number: [
                        {required: true, message: '请输入车牌号', trigger: 'blur'}
                    ],
                    operator: [
                        {required: true, message: '请输入操作人', trigger: 'blur'}
                    ],
                },
                hideAdd:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,
            }
        },
        methods:{
            //编辑
            editInput(eform){
                this.editRowData = eform;
            },
            //添加
            handleAdd(){
                this.addRowData.operator = sessionStorage.getItem('nickname');
                this.addTo++;
            },
            addInput(aform){
                this.addRowData = aform;
            },
            //删除
            cancelDel(){
                this.delForm.delVisible = false;
            },
            //刷新
            resetForm(){
                let that = this;
                that.searchFormData.count = that.searchFormData.count++;
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    for (var item of user.authlist) {
                        if (AUTH_ID.systemManage_BlackList == item.auth_id) {
                            this.hideAdd = common.showSubAdd(item.sub_auth)
                            this.showEdit = common.showSubEdit(item.sub_auth)
                            this.showdelete = common.showSubDel(item.sub_auth)
                            if(!this.showEdit&&!this.showdelete){
                                this.hideOptions = true;
                            }
                            break;
                        }
                    }

                }
            }
        },
        mounted() {
            this.setAuthorityFn();
            this.$refs['tabPane'].getTableData({},this)
        },
        activated() {

        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[0].subs[0].hidden = val
            },
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

