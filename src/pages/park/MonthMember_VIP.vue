<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :exportapi="exportapi"
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
                :showdelete="showdelete"
                :showresetpwd="showresetpwd"
                :showmRefill="showmRefill"
                :showModifyCarNumber="showModifyCarNumber"
                :hideOptions="hideOptions"
                :showEdit="showEdit"
                :showCustomizeAdd="showCustomizeAdd"
                :hideAdd="hideAdd"
                v-on:showreset="showreset"
                v-on:showrefill="showrefill"
                v-on:customizeadd="showadd"
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
            <el-form ref="refillForm" label-width="120px" style="margin-bottom:-30px" :rules="refillFormRules"
                     :model="refillForm">
                <el-form-item label="包月产品" :prop="p_name">
                    <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in pname"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-input v-model="refillstartDate" style="width:90%" :readonly="datereadonly"></el-input>
                </el-form-item>
                <el-form-item label="续费月数" :prop="months">
                    <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="应收金额" :prop="total">
                    <!--<el-input v-model="refillForm.total" style="width:90%" placeholder=""></el-input>-->
                    <el-input v-model="refillForm.total" style="width:90%" placeholder=""
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="实收金额" :prop="act_total">
                    <!--<el-input v-model="refillForm.act_total" style="width:90%" placeholder=""></el-input>-->
                    <el-input v-model="refillForm.act_total" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="refillForm.remark" style="width:90%" placeholder="" :readonly="datereadonly"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRefill = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleRefill" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
                title="注册会员"
                v-model="showRegis"
                size="tiny">
            <el-form ref="refillForm" label-width="120px" style="margin-bottom:-30px" :rules="refillFormRules"
                     :model="refillForm">
                <el-form-item label="车主姓名">
                    <el-input v-model="refillForm.name" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="车牌号码" :prop="car_number">
                    <el-input v-model="refillForm.car_number" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-select v-model="refillForm.car_type_id" style="width:90%">
                        <el-option
                                v-for="item in cartype"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="包月产品" :prop="p_name">
                    <el-select v-model="refillForm.p_name" filterable @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in pname"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始日期" :prop="b_time">
                    <!--<AddDate v-model="refillForm.b_time" placeholder="" v-on:selectdata="getTime"></AddDate>-->
                    <el-date-picker type="date" placeholder="选择日期时间" v-model="refillForm.b_time"
                                    style="width: 90%"></el-date-picker>
                </el-form-item>
                <el-form-item label="购买月数" :prop="months">
                    <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="应收金额" :prop="total">
                    <!--<el-input v-model="refillForm.total" style="width:90%" placeholder=""></el-input>-->
                    <el-input v-model="refillForm.total" style="width:90%" placeholder=""
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="实收金额" :prop="act_total">
                    <!--<el-input v-model="refillForm.act_total" style="width:90%" placeholder=""></el-input>-->
                    <el-input v-model="refillForm.act_total" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="refillForm.mobile" style="width:90%" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="单双日限行" :prop="limit_day_type">
                    <el-select v-model="refillForm.limit_day_type" filterable style="width:90%">
                        <el-option
                                v-for="item in singleDoubleType"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="refillForm.remark" style="width:90%" placeholder="" :readonly="datereadonly"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRegis = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleRegis" :loading="resetloading">确 定</el-button>
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
        singleDoubleLimit,
        singleDoubleType,
        path
    } from '../../api/api';

    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import AddDate from '../../components/add-subs/AddDate'

    import axios from 'axios'

    export default {
        components: {
            CommonTable,
            AddDate,

        },
        data() {
            return {
                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: '',
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: false,
                hideAdd: true,
                queryapi: '/vip/query',
                exportapi: '/vip/exportExcel',
                addapi: '/vip/add',
                editapi: '/vip/edit',
                delapi: '/vip/delete',
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                btswidth: '200',
                fieldsstr: 'id__card_id__pid__name__car_number__create_time__b_time__e_time__total__act_total__mobile__car_type_id__limit_day_type__remark',
                tableitems: [
                    // {
                    //     hasSubs: false, subs: [
                    //         {
                    //             label: '编号',
                    //             prop: 'id',
                    //             width: '100',
                    //             type: 'number',
                    //             searchable: true,
                    //             unsortable: true,
                    //             align: 'center',
                    //         },
                    //     ]
                    // },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '月卡编号',
                                prop: 'card_id',
                                width: '123',
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
                                label: '套餐名称',
                                prop: 'pid',
                                width: '100',
                                type: 'selection',
                                selectlist: this.pname,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    return common.nameformat(row, this.pname, 'pid')
                                }
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

                                searchable: true,

                                unsortable: false,
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

                                searchable: true,
                                addable: true,
                                unsortable: false,
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

                                searchable: true,

                                unsortable: false,
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
                                addable: true,
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
                                type: 'selection',
                                selectlist: this.cartype,
                                searchable: true,
                                align: 'center',
                                unsortable: true,
                                format: (row) => {
                                    return common.nameformat(row, this.cartype, 'car_type_id');
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
                                type: 'selection',
                                selectlist: singleDoubleType,
                                editable: true,
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.nameformat(row, singleDoubleType, 'limit_day_type')
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
                                addable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册会员',
                readonly: true,
                datereadonly:true,
                refillFormRules: {
                    total: [
                        {required: true, message: '应收金额不能为空', trigger: 'blur'}
                    ]
                    ,
                    act_total: [
                        {required: true, message: '实收金额不能为空', trigger: 'blur'}
                    ],
                    car_number: [
                        {required: true, message: '请填写车牌号码', trigger: 'blur'}
                    ],
                    months: [
                        {required: true, message: '请选择购买月数', trigger: 'change', type: 'number'}
                    ],
                    // p_name: [
                    //     {required: true, message: '请选择包月产品', trigger: 'change',}
                    // ],
                    b_time: [
                        {required: true, message: '请选择起始日期', trigger: 'change', type: 'date'}
                    ],
                    limit_day_type: [
                        {required: true, message: '请选择限行限制', trigger: 'change', type: 'number'}
                    ],

                },
                pname: [],
                cartype: [],
                refillForm: {
                    name: '',
                    car_number: '',
                    p_name: '',
                    months: '',
                    b_time: '',
                    total: '',
                    act_total: '',
                    mobile: '',
                    limit_day_type: '',
                    remark: '',
                    car_type_id:'',
                },
                p_name: 'p_name',
                months: 'months',
                b_time: 'b_time',
                total: 'total',
                act_total: 'act_total',
                car_number: 'car_number',
                limit_day_type: 'limit_day_type',
                singleDoubleType: [
                    {'value_name': '不限制', 'value_no': 0},
                    {'value_name': '限制', 'value_no': 1}
                ],
                refillstartDate: 0,
            }
        },
        methods: {
            showreset: function (index, row) {
                this.currentIndex = index;
                this.currentRow = row;
                this.showResetCarnumber = true;
            },
            showrefill: function (index, row) {
                this.currentIndex = index;
                this.currentRow = row;
                this.showRefill = true;
                let now = new Date().getTime();
                let endtime = row.e_time;
                this.refillForm.remark = '云平台续费'
                if (now / 1000 > endtime) {
                    this.refillstartDate = common.dateformat(now / 1000)
                } else {
                    this.refillstartDate = common.dateformat(endtime)
                }

                for (let item of this.pname) {
                    if (row.pid == item.value_no) {
                        this.refillForm.p_name = item.value_name;
                        this.readonly = true;
                        return;
                    }
                }
                //如果当前套餐在套餐列表中，则应收是readonly
                //当前套餐不存在，则应收可以自由填写
                this.readonly = false;

            },
            showadd: function () {
                this.showRegis = true;
                this.refillForm.p_name = '';
                this.readonly = false;
                this.refillForm.remark = '云平台注册'
            },
            handlereset: function () {
                this.resetloading = true
                let _this = this
                axios.all([common.editCarNum(this.resetCarnumber, this.currentRow.id)])
                    .then(axios.spread(function (ret) {
                        let data = ret.data
                        _this.resetloading = false
                        if (data.state == 1) {
                            _this.$refs['bolinkuniontable'].getTableData({})
                            _this.$message({
                                message: '修改成功!',
                                type: 'success',
                                duration: 600
                            });
                            _this.showResetCarnumber = false;
                            _this.resetCarnumber = '';
                        } else {
                            //更新失败
                            _this.$message({
                                message: data.msg + '!',
                                type: 'error',
                                duration: 600
                            });
                        }
                        _this.resetloading = false
                    }))
            },
            getTime: function (time) {
                this.refillForm.b_time = time
            },
            handleRefill: function () {
                // console.log('开始验证')
                let _this = this
                this.$refs.refillForm.validate((valid) => {
                    // console.log(valid)
                    console.log(_this.refillForm)
                    if (valid) {
                        _this.resetloading = true
                        // console.log(_this.refillForm.p_name)
                        // axios.all([common.reNewProduct(_this.refillForm.p_name, _this.refillForm.months, _this.currentRow.name, _this.currentRow.e_time, _this.currentRow.id, _this.refillForm.remark, _this.refillForm.act_total, sessionStorage.getItem('nickname'))])
                        axios.all([common.reNewProduct(_this.refillForm.p_name, _this.refillForm.months, encodeURI(encodeURI(_this.currentRow.name)), _this.currentRow.e_time, _this.currentRow.id, encodeURI(encodeURI(_this.refillForm.remark)), _this.refillForm.act_total, encodeURI(encodeURI(sessionStorage.getItem('nickname'))))])
                            .then(axios.spread(function (ret) {
                                let data = ret.data
                                // console.log(data)
                                if (data.state == 1) {
                                    _this.$refs['bolinkuniontable'].getTableData({})
                                    _this.$message({
                                        message: '续费成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    _this.showRefill = false;
                                    // _this.refillForm.resetFields()
                                    _this.$refs['refillForm'].resetFields()
                                    _this.refillForm.p_name = ''
                                } else {
                                    //更新失败
                                    _this.$message({
                                        message: data.msg + '!',
                                        type: 'error',
                                        duration: 600
                                    });
                                }
                                _this.resetloading = false
                            }))
                    }
                })

            },
             getRefillTotal: function () {
                // console.log('计算续费金额' + this.refillForm.p_name + ' -- ' + this.refillForm.months)
                // if (this.refillForm.p_name == '' || this.refillForm.months == '')
                //     return;

                this.readonly = false;
                for (let item of this.pname) {
                    // console.log(this.refillForm.p_name+'  '+item.value_name)
                    if (this.refillForm.p_name == item.value_name || this.refillForm.p_name == item.value_no) {
                        this.refillForm.p_name = item.value_no;
                        this.readonly = true;
                        // console.log('rrrrrreadonly true')
                        break;
                    }
                }

                if (this.refillForm.months == '')
                    return;


                let _this = this
                axios.all([common.getProdSum(this.refillForm.p_name, this.refillForm.months)])
                    .then(axios.spread(function (ret) {
                        _this.refillForm.total = ret.data + '';
                        _this.refillForm.act_total = ret.data + '';
                        // console.log(ret.data)
                    }))
            },
            handleRegis: function () {
                let _this = this
                this.$refs.refillForm.validate((valid) => {
                    if (valid) {
                        _this.resetloading = true
                        let aform = _this.refillForm

                        aform.token = sessionStorage.getItem('token')
                        aform.comid = sessionStorage.getItem('comid')
                        aform.groupid = sessionStorage.getItem('groupid')
                        aform.cityid = sessionStorage.getItem('cityid')
                        aform.unionid = sessionStorage.getItem('unionid')
                        aform.channelid = sessionStorage.getItem('channelid')
                        aform.loginuin = sessionStorage.getItem('loginuin')
                        aform.nickname = sessionStorage.getItem('nickname')
                        aform.oid = sessionStorage.getItem('oid')

                        _this.$axios.post(path + _this.addapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state == 1) {
                                //更新成功
                                _this.$refs['bolinkuniontable'].getTableData({})
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.showRegis = false;
                                // _this.refillForm.resetFields();
                                _this.refillForm.name = '';
                                _this.$refs['refillForm'].resetFields()
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.resetloading = false

                        }).catch(function (error) {
                            // setTimeout(() => {
                            //     _this.alertInfo('请求失败!'+error)
                            // }, 150)
                            //更新失败
                            // _this.$message({
                            //     message: '请求失败!'+error.data,
                            //     type: 'error',
                            //     duration: 1200
                            // });
                            _this.resetloading = false;
                        })
                    }
                })
            }

        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            var user = sessionStorage.getItem('user');
            // console.log(user)
            if (user) {
                user = JSON.parse(user);
                // console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.monthMember_VIP == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
                        this.showmRefill = common.showSubReFill(item.sub_auth)
                        this.showModifyCarNumber = common.showSubUpdate(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.showCustomizeAdd = common.showSubAdd(item.sub_auth)
                        break;
                    }
                }

            }
        },
        activated() {

            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            }
            this.tableheight = common.gwh() - 135;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            let _this = this
            axios.all([common.getPName(), common.getCarType()])
                .then(axios.spread(function (retpname, retcartype) {
                    _this.pname = retpname.data;
                    _this.cartype = retcartype.data;
                    // console.log(ret.data)
                    // console.log(_this.pname)
                }))
        },
        watch: {
            pname: function (val) {
                this.tableitems[1].subs[0].selectlist = val
            },
            cartype: function (val) {
                this.tableitems[10].subs[0].selectlist = val
            }
        }
    }

</script>