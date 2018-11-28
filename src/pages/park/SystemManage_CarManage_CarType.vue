<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            系统管理-车型管理-车型设定
            <div class="float-right">
                <el-button @click="handleAdd" type="primary" size="mini" >添加车型</el-button>
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
                    v-on:cancelDel="cancelDel"
                    :queryapi="queryapi"
                    :fieldsstr="fieldsstr"
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
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util';
    import common from '../../common/js/common';
    import {AUTH_ID} from '../../common/js/const';
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
                queryapi: '/cartype/query',
                addapi: '/cartype/add',
                delapi: '/cartype/delete',
                editapi: '/cartype/edit',
                btswidth: '100',
                fieldsstr: 'id__name__cartype_id__sort',
                tableitems: [{
                    hasSubs:false,
                    subs: [{
                        label: '操作',
                        columnType:'render',
                        align: 'center',
                        width:'100',
                        unsortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h('ElButton', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
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
                                        color:'red'
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
                },{
                    hasSubs:false,
                    subs: [{
                        label: '索引',
                        columnType:'render',
                        align: 'center',
                        width:'100',
                        unsortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.index +1),
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
                                label: '名称',
                                prop: 'name',
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
                                'size':'mini',
                                "subtype": "text",
                                "rules": [
                                    {required: true, message: '请输入名称', trigger: 'blur'}
                                ],
                            }
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '系统编号',
                            prop: 'cartype_id',
                            width: '150',
                            type: 'str',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '排序',
                            prop: 'sort',
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
                            'size':'mini',
                            "subtype": "text",

                        }]
                    }


                ],
                searchtitle: '高级查询',
                addtitle: '添加车型',
                addFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                }


            };
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
        },
        mounted() {
            this.$refs['tabPane'].getTableData({},this)
        },
        activated() {

        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>

