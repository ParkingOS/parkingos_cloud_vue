<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">设备管理<span style="margin: 2px">-</span>岗亭管理</p>
                <div class="float-right">
                    <!--<el-button @click="handleAdd" type="text" icon="el-icon-plus"  v-if="hideAdd">添加岗亭</el-button>-->
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
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
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
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
                queryapi: '/postmanage/query',
                addapi: '/freereason/add',
                editapi: '/postmanage/edit',
                delapi: '/freereason/delete',
                btswidth: '100',
                fieldsstr: 'id__name__sort',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'local_name',
                            width: '180',
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
                                {required: true, message: '请输入名称', trigger: 'blur'}
                            ],
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '岗亭编号',
                            prop: 'local_id',
                            searchable: true,
                            unsortable: true,
                            align: 'left',
                            editable: true,
                            addtable:true,
                            "type": "input",
                            "disable": false,
                            "readonly": true,
                            "value": "",
                            'size':'',
                            "subtype": "text",
                        }]
                    }, {
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
                                            display:this.showEdit?'':'none',
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                // this.editRowData.state = this.editRowData.state+'';
                                                this.editTo++;
                                            }
                                        }
                                    }, '编辑'),
                                ]);
                            }
                        }]
                    },


                ],
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
                        if (AUTH_ID.equipmentManage_Watchhouse == item.auth_id) {
                            this.hideAdd= common.showSubAdd(item.sub_auth)
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

