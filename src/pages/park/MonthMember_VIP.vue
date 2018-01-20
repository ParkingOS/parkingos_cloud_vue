<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :searchtitle="searchtitle"
                :addtitle="addtitle"
                :addFormRules="addFormRules"
                :editFormRules="editFormRules"
                :showdelete="showdelete"
                :showresetpwd="showresetpwd"
                :showmRefill="showmRefill"
                :showModifyCarNumber="showModifyCarNumber"
                :hideOptions="hideOptions"
                :showEdit="showEdit"
                :hideAdd="hideAdd"
                v-on:showreset="showreset"
                v-on:showrefill="showrefill"
                ref="bolinkuniontable"
        ></common-table>
        <!--修改车牌-->
        <el-dialog
                title="修改车牌"
                v-model="showResetCarnumber"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="车牌号码">
                    <el-input v-model="resetCarnumber" style="width:90%" placeholder="多个车牌,用英文','隔开"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showResetCarnumber = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handlereset" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
                title="月卡续费"
                v-model="showRefill"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="包月产品">
                    <el-select v-model="pnameno"  filterable @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in pname"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始日期">
                    <AddDate v-model="Btime"  placeholder="" ></AddDate>
                </el-form-item>
                <el-form-item label="续费月数">
                    <el-select v-model="refillcount"  filterable @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应收金额">
                    <el-input v-model="RefillTotal" style="width:90%" placeholder="" ></el-input>
                </el-form-item>
                <el-form-item label="实收金额">
                    <el-input v-model="RefillTotalact" style="width:90%" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRefill = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleRefill" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>

<script>

    import {
        parktypelist,
        distinctslist,
        checkCityInfo,
        provincelist,
        checkPass,
        centerpayset,
        singleDoubleLimit
    } from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import AddDate from '../../components/add-subs/AddDate'
    import axios from 'axios'
    export default {
        components: {
            CommonTable,
            AddDate
        },
        data() {
            return {
                loading: false,
                resetloading:false,
                showresetpwd: false,
                hideExport: false,
                tableheight: '',
                hideOptions: false,
                showEdit:true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                hideAdd:false,
                queryapi: '/vip/query',
                addapi: '/vip/add',
                editapi: '/vip/edit',
                delapi: '/vip/remove',
                parkid: '',
                currentIndex:0,
                currentRow:'',
                showResetCarnumber:false,
                showRefill:false,
                resetCarnumber:'',
                btswidth: '220',
                fieldsstr: 'id__pid__name__car_number__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                width: '100',
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
                                label: '套餐名称',
                                prop: 'pid',
                                width: '100',
                                type: 'str',
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车主姓名',
                                prop: 'name',
                                width: '180',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号',
                                prop: 'car_number',
                                width: '150',
                                type: 'str',
                                editable: false,
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
                                label: '购买时间',
                                prop: 'create_time',
                                width: '180',
                                type: 'date',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '开始时间',
                                prop: 'b_time',
                                width: '180',
                                type: 'date',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.b_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '结束时间',
                                prop: 'e_time',
                                width: '180',
                                type: 'date',
                                selectlist: centerpayset,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                                ,
                                format: function (row) {
                                    return common.dateformat(row.e_time);
                                }
                            },

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '应收金额',
                                prop: 'total',
                                width: '100',
                                type: 'number',
                                selectlist: centerpayset,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '实收金额',
                                prop: 'act_total',
                                width: '150',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系电话',
                                prop: 'mobile',
                                width: '150',
                                type: 'str',
                                selectlist: provincelist,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车型类型',
                                prop: 'car_type_id',
                                width: '175',
                                type: 'str',
                                searchable: true,
                                align: 'center',
                                unsortable: true,
                                format: function (row) {
                                    return row.car_type_id==-1?'':row.car_type_id;
                                }

                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'create_time',
                                width: '175',
                                type: 'date',
                                searchable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '单双日限行',
                                prop: 'limit_day_type',
                                width: '123',
                                type: 'str',
                                editable: true,
                                addable: true,
                                searchable: false,
                                unsortable: true,
                                align: 'center',
                                format:function (row) {
                                    return common.singelDoubleFormat(row.limit_day_type)
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '备注',
                                prop: 'remark',
                                width: '180',
                                type: 'number',
                                searchable: false,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                addFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    distincts: [
                        {required: true, validator: checkCityInfo, trigger: 'change'}
                    ],
                    address: [
                        {required: true, message: '请输入缴费机安置详细地址', trigger: 'blur'}
                    ],
                    // model: [
                    // 	{ required: true, message: '请输入缴费机型号', trigger: 'blur' }
                    // ],
                    password: [
                        {required: true, validator: checkPass, trigger: 'blur'}
                    ],
                    province_abbr: [
                        {required: true, message: '请输入默认省份缩写', trigger: 'change'}
                    ],
                },
                editFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入缴费机安置详细地址', trigger: 'blur'}
                    ],
                    // model: [
                    // 	{ required: true, message: '请输入缴费机型号', trigger: 'blur' }
                    // ],
                    province_abbr: [
                        {required: true, message: '请输入默认省份缩写', trigger: 'change'}
                    ],
                },
                pname:[],
                pnameno:'',
                refillcount:'',
                RefillTotal:'',
                RefillTotalact:'',
                Btime:''
            }
        },
        methods:{
            showreset:function (index,row) {
                this.currentIndex=index;
                this.currentRow=row;
                this.showResetCarnumber = true;
            },
            showrefill:function (index,row) {
                this.currentIndex=index;
                this.currentRow=row;
                this.showRefill = true;
            },
            handlereset:function () {
                console.log('>>>>>>>>>>'+this.currentIndex)
                console.log(this.currentRow)
                this.resetloading = true

            },
            handleRefill:function () {
                console.log('>>>>>>>>>>'+this.currentIndex)
                console.log(this.currentRow)
                this.showRefill = true
                let _this = this
                axios.all([common.reNewProduct(this.pnameno,this.refillcount),row.name,this.Btime,row.pid,])
                    .then(axios.spread(function (ret) {

                        // console.log(ret.data)
                        this.resetloading = false
                    }))
            },
            getRefillTotal:function () {
                console.log('计算续费金额'+this.pnameno+'  '+this.refillcount)
                if(this.pnameno==''||this.refillcount=='')
                    return;
                let _this = this
                axios.all([common.getProdSum(this.pnameno,this.refillcount)])
                    .then(axios.spread(function (ret) {
                        _this.RefillTotal = ret.data.total;
                        _this.RefillTotalact = ret.data.total;
                        // console.log(ret.data)
                    }))
            },

        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.showMonthMember_VIP_auth_id == item.auth_id) {
                        console.log(item.sub_auth)
                        this.hideExport= !common.showSubExport(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
                        this.showmRefill= common.showSubReFill(item.sub_auth)
                        this.showModifyCarNumber= common.showSubUpdate(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        break;
                    }
                }

            }
        },
        activated() {
            console.log('active')
            console.log(distinctslist)
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            let _this = this
            axios.all([common.getPName()])
                .then(axios.spread(function (ret) {
                    _this.pname = ret.data;
                    // console.log(ret.data)
                    console.log(_this.pname)
                }))
        },
        // watch: {
        //     aroles: function (val) {
        //         this.tableitems[5].subs[0].selectlist = val
        //     }
        // }
    }

</script>