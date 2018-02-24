<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"

                :hideTool="hideTool"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                :addtitle="addtitle"
                :addapi="addapi"
                :delapi="delapi"
                :editapi="editapi"
                :addFormRules="addFormRules"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: true,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: false,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/product/query',
                addapi: '/product/add',
                delapi: '/product/delete',
                editapi: '/product/edit',
                btswidth: '100',
                fieldsstr: 'id__p_name__price__create_time__update_time__car_type_id__describe__period',
                tableitems: [
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
                                prop: 'p_name',
                                width: '123',
                                type: 'str',
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
                                label: '价格',
                                prop: 'price',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',

                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '修改时间',
                            prop: 'update_time',
                            width: '180',
                            type: 'date',

                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.update_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车型类型',
                            prop: 'car_type_id',
                            width: '123',
                            type: 'selection',
                            selectlist:this.cartype,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:(row)=>{
                                let str = common.nameformat(row,this.cartype,'car_type_id')
                                return str==''||str==undefined?row.car_type_id:str;
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '月卡描述',
                            prop: 'describe',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '续费周期',
                            prop: 'period',
                            width: '123',
                            type: 'str',


                            unsortable: true,
                            hidden:true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '高级查询',
                addtitle: '添加套餐',
                addFormRules: {
                    p_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    car_type_id: [
                        {required: true, message: '请输入车型类型', trigger: 'change'}
                    ],
                    period: [
                        {required: true, message: '请输入续费周期', trigger: 'blur'}
                    ]
                },
                cartype:'',
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                for (var item of user.authlist) {
                    if (AUTH_ID.systemManage_MonthCard == item.auth_id) {
                        console.log(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
                        if(!this.showEdit&&!this.showdelete){
                            this.hideOptions = true;
                        }
                        break;
                    }
                }

            }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            let _this = this
            _this.$axios.all([common.getCarType()])
                .then(_this.$axios.spread(function (retcartype) {
                    _this.cartype = retcartype.data;
                    // console.log(ret.data)
                    // console.log(_this.pname)
                }))
        },
        watch: {

            cartype: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

