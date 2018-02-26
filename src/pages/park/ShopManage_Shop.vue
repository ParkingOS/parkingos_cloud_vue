<template>
    <div>
        <section>
            <common-table
                    :queryapi="queryapi"
                    :addapi="addapi"
                    :showCustomizeAdd="showCustomizeAdd"
                    :editapi="editapi"
                    :hideAdd="hideAdd"
                    :delapi="delapi"
                    :tableheight="tableheight"
                    :fieldsstr="fieldsstr"
                    :tableitems="tableitems"
                    :btswidth="btswidth"
                    :hide-export="hideExport"
                    :addtitle="addtitle"
                    :showdelete="showdelete"
                    :showresetpwd="showresetpwd"
                    :showmRefill="showmRefill"
                    :hideOptions="hideOptions"
                    :hideSearch="hideSearch"
                    :showShopEdit="showShopEdit"
                    :showsetting="showsetting"
                    
                    v-on:showrefill="showrefill"
                    v-on:showSetting="showSetting"
                    v-on:customizeadd="showadd"
                    v-on:showeditshop="showeditshop"
                    ref="bolinkuniontable"
            ></common-table>
        </section>
        <!--重置密码-->
        <el-dialog
                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="30%"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="请输入新密码">
                    <el-input v-model="pwd1" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="pwd2" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="resetPwdVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="resetPwd">确 定</el-button>
			</span>
        </el-dialog>
        <!--注册员工-->
        <el-dialog
                :title="regUserTitle"
                :visible.sync="regUserVisible"
                width="30%"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="编号" v-if="showInput">
                    <el-input :disabled="true" v-model="user.id" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="user.nickname" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="登陆账号"  v-if="showInput">
                    <el-input v-model="user.strid" :disabled="true" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="user.phone" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="user.mobile" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="user.auth_flag" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="创建时间" v-if="showInput">
                    <el-input :disabled="true" v-model="user.reg_time" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="最近登陆时间" v-if="showInput">
                    <el-input :disabled="true" v-model="user.logon_time" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="regUserVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="saveUser">保存</el-button>
			</span>
        </el-dialog>
        <!--员工管理-->
        <el-dialog
                title="商户设置-员工管理"
                :visible.sync="employeeVisible"
                >

            <div>
                <el-button type="primary" size="small" @click="regUser">注册员工</el-button>
            </div>
            <template>
                <el-table
                        :data="employeeData"
                        style="width: 100%"
                        max-height="250">
                    <el-table-column
                            fixed="left"
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="handleEdit(scope.row)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.row)"
                                    type="text"
                                    size="small"
                                    style="color:red">
                                删除
                            </el-button>
                            <el-button
                                    @click.native.prevent="resetPassword(scope.row)"
                                    type="text"
                                    size="small">
                                修改密码
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    <el-table-column
                            type="index"
                            label="索引"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="strid"
                            label="登陆账号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            :formatter="strFormat"
                            prop="auth_flag"
                            label="角色"
                            width="120">
                    </el-table-column>

                    <el-table-column
                            :formatter="dateFormat"
                            prop="reg_time"
                            label="创建时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            :formatter="dateFormat"
                            prop="logon_time"
                            label="最近登陆时间"
                            width="180">
                    </el-table-column>

                </el-table>
            </template>

            <!--简单分页工具条-->
            <el-pagination
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total">
            </el-pagination>
        </el-dialog>
        <!--renewDialog-->
        <el-dialog
                :title="renewTitle"
                :visible.sync="renewVisible"
                width="30%"
                size="tiny">
            <el-form label-width="150px" style="margin-bottom:-30px">

                <el-form-item :label="discount_money_title" v-if="showTicketTime">
                    <el-input v-model="ticket_val" style="width:70%"></el-input>
                    <span>{{discount_money_body}}</span>
                </el-form-item>
                <el-form-item label="减免券(元):" v-if="showTicketMoney">
                    <el-input v-model="ticket_val" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="全免券(张):">
                    <el-input v-model="ticketfree_limit" style="width:70%"></el-input>
                    <span>(每张{{free_money}}元)</span>
                </el-form-item>
                <el-form-item label="应收金额(元):">
                    <el-input v-model="totalMoney" :disabled="true" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="当前折扣(%):">
                    <el-input v-model="discount_percent" :disabled="true" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="实收金额(元):">
                    <el-input v-model="addmoney" :disabled="true" style="width:70%"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="renewSub">确 定</el-button>
			</span>
        </el-dialog>


        <!--删除提示框-->
        <el-dialog
                title="提示"
                :visible.sync="delVisible"
                size="tiny"
                width="30%"
                custom-class="deleteTip">
            <div class="el-message-box__status el-icon-warning"></div>
            <br/>
            <div style="margin-left:50px;vertical-align:middle;">确定删除吗?此操作不可恢复!</div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="handledelete" size="small">确 定</el-button>
			</span>

        </el-dialog>

        <!--添加商户-->
        <el-dialog
                :title="shopTitle"
                :visible.sync="showRegis"
                width="30%"
                size="tiny">
            <el-form ref="shopForm" label-width="120px" style="margin-bottom:-30px" :rules="shopFormRules"
                     :model="shopForm">
                <el-form-item label="编号">
                    <el-input :disabled="true" v-model="shopForm.id" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商户名称" :prop="name">
                    <el-input v-model="shopForm.name" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="shopForm.address" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="shopForm.mobile" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型">
                    <el-select v-model="shop_ticket_type" filterable style="width:90%">
                        <el-option
                                v-for="item in ticketType"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券单位">
                    <el-select v-model="unit" filterable style="width:90%">
                        <el-option
                                v-for="item in ticketUnit"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="默认显示额度" :prop="default_limit">
                    <el-input v-model="shopForm.default_limit" style="width:90%" placeholder=""
                    ></el-input>
                </el-form-item>
                <el-form-item label="商户折扣/%" :prop="v_discount_percent">
                    <el-input v-model="shopForm.v_discount_percent" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item :label="discount_money_name" v-if="showDiscountMoney" :prop="v_discount_money">
                    <el-input v-model="shopForm.v_discount_money" style="width:90%" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="全免每张/元" :prop="v_free_money">
                    <el-input v-model="shopForm.v_free_money" style="width:90%" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="有效期/小时" :prop="validite_time">
                    <el-input v-model="shopForm.validite_time" style="width:90%" placeholder=""></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">				
				<el-button type="primary" size="small" @click="loadDefaultData">重 置</el-button>
				<el-button type="primary" size="small" @click="handleRegis">保 存</el-button>
			</span>
        </el-dialog>

    </div>


</template>

<script>

    import {
        path,
        checkURL,
        checkUpload,
        checkNumber,
        percision,
        parktypelist,
        distinctslist,
        checkCityInfo,
        provincelist,
        checkPass,
        centerpayset,
        singleDoubleLimit,
        ticketType
    } from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {AUTH_ID} from '../../common/js/const'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
            	showEmployeeEdit:false,
                ticketfree_limit: 0,
                validite_time: 'validite_time',
                name: 'name',
                default_limit: 'default_limit',
                v_free_money: 'v_free_money',
                v_discount_percent: 'v_discount_percent',
                v_discount_money: 'v_discount_money',
                shopFormRules: {
                    default_limit: [
                        {required: true, message: '默认额度不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '商户名称不能为空', trigger: 'blur'}
                    ],
                    v_discount_percent: [
                        {required: true, message: '商户折扣不能为空', trigger: 'blur'}
                    ],
                    validite_time: [
                        {required: true, message: '有效期不能为空', trigger: 'blur'}
                    ],
                    v_discount_money: [
                        {required: true, message: '单价不能为空', trigger: 'blur'}
                    ],
                    v_free_money: [
                        {required: true, message: '全免券单价不能为空', trigger: 'blur'}
                    ]
                },
                hideAdd: true,
                shopTitle: '添加商户',
                showDiscountMoney: true,
                shop_ticket_type: 1,
                unit: 1,
                discount_money_name: '每分钟/元',
                ticketUnit: [
                    {'value_name': '分钟', 'value_no': 1},
                    {'value_name': '小时', 'value_no': 2},
                    {'value_name': '天', 'value_no': 3}
                ],
                ticketType: [
                    {'value_name': '时长减免', 'value_no': 1},
                    {'value_name': '金额减免', 'value_no': 2}
                ],
                shopForm: {},
                showRegis: false,
                showCustomizeAdd: true,
                ticket_type: '',
                showTicketMoney: false,
                showTicketTime: false,
                renewTitle: '',
                regUserTitle: '',
                page: 1,
                total: 0,
                showInput: false,
                user: {
                    id: '',
                    auth_flag: 14,
                    mobile: '',
                    phone: '',
                    nickname: '',
                    comid: '',
                    reg_time: '',
                },
                delVisible: false,
                rowid: 0,
                resetPwdVisible: false,
                regUserVisible: false,
                discount_money: 1,
                addmoney: 0,
                discount_percent: 0,
                totalMoney: 0,
                renewVisible: false,
                ticket_val: 0,
                employeeVisible: false,
                showsetting: false,
                hideSearch: true,
                loading: false,
                showresetpwd: false,
                hideExport: true,
                tableheight: '',
                hideOptions: false,
                showdelete: false,
                showShopEdit: false,
                showmRefill: false,
                resetloading: false,
                queryapi: '/shop/quickquery',
                addapi: '/shop/create',
                editapi: '/shop/create',
                delapi: '/shop/delete',
                parkid: '',
                btswidth: '180',
                fieldsstr: 'id__name__address__create_time__mobile__validite_time__ticket_money__ticket_type__default_limit__discount_percent',
                tableitems: [{
                    hasSubs: false, subs: [
                        {
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                        },
                    ]
                },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '商户名称',
                            prop: 'name',
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
                            label: '地址',
                            prop: 'address',
                            width: '180',
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
                            label: '创建时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '手机',
                            prop: 'mobile',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '优惠券额度(分钟)',
                            prop: 'ticket_limit',
                            width: '180',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_unit == 1) {
                                    return row.ticket_limit;
                                } else {
                                    return "";
                                }
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠券额度(小时)',
                            prop: 'ticket_limit',
                            width: '180',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_unit == 2) {
                                    return row.ticket_limit;
                                } else {
                                    return "";
                                }
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '优惠券额度(天)',
                            prop: 'ticket_limit',
                            width: '180',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_unit == 3) {
                                    return row.ticket_limit;
                                } else {
                                    return "";
                                }
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '全免券额度(张)',
                            prop: 'ticketfree_limit',
                            width: '180',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠券额度(元)',
                            prop: 'ticket_money',
                            width: '180',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_type == 1) {
                                    return "";
                                } else {
                                    return row.ticket_money;
                                }
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠类型',
                            prop: 'ticket_type',
                            width: '100',
                            type: 'selection',
                            selectlist: ticketType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_type == 1) {
                                    return "时长减免"
                                } else if (row.ticket_type == 2) {
                                    return "金额减免";
                                } else {
                                    return row.ticket_type;
                                }
                            }
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '优惠券单位',
                            prop: 'ticket_unit',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.ticket_unit == 1) {
                                    return "分钟";
                                } else if (row.ticket_unit == 2) {
                                    return "小时";
                                } else if (row.ticket_unit == 3) {
                                    return "天";
                                } else {
                                    return "元";
                                }
                            }
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '默认显示额度',
                            prop: 'default_limit',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }
                    , {

                        hasSubs: false,
                        subs: [{
                            label: '有效期/小时',
                            prop: 'validite_time',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }

                ],
                addtitle: '添加商户',
                employeeData: [],
                shop_id: '',
                pwd1: '',
                pwd2: '',
                options: [{
                    value: 14,
                    label: '负责人'
                }, {
                    value: 15,
                    label: '工作人员'
                }],
                free_money: 0,
                discount_money_body: '',
                discount_money_title: '减免分钟(分):'
            }
        },
        methods: {
            showSetting: function (row) {
                this.shop_id = row.id;

                //请求员工数据
                var user = sessionStorage.getItem('user')
                user = JSON.parse(user)
                this.loadData();
                //设置
                this.employeeVisible = true;
            },
            showrefill: function (index, row) {
                this.ticket_type = row.ticket_type;
                if (row.ticket_type == 1) {
                    //时长减免
                    this.renewTitle = "减免券购买(时长)";
                    this.showTicketTime = true;
                    this.showTicketMoney = false;
                } else {
                    //金额减免
                    this.renewTitle = "减免券购买(金额)";
                    this.showTicketTime = false;
                    this.showTicketMoney = true;
                }
                if (row.ticket_unit == 1) {
                    this.discount_money_title = '减免分钟(分):'
                    this.discount_money_body = "(每分钟" + row.discount_money + "元)"
                } else if (row.ticket_unit == 2) {
                    this.discount_money_title = '减免小时(时):'
                    this.discount_money_body = "(每小时" + row.discount_money + "元)"
                } else if (row.ticket_unit == 3) {
                    this.discount_money_title = '减免天数(天):'
                    this.discount_money_body = "(每天" + row.discount_money + "元)"
                } else if (row.ticket_unit == 4) {
                    //金额减免
                    this.renewTitle = "减免券购买(金额)";
                    this.showTicketTime = false;
                    this.showTicketMoney = true;
                }
                this.free_money = row.free_money;
                this.ticket_val = 0;
                this.ticketfree_limit = 0;
                this.free_money = row.free_money;
                this.id = row.id;
                this.ticket_money = row.ticket_money;
                this.discount_percent = row.discount_percent;
                this.discount_money = row.discount_money;
                this.renewVisible = true;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.loadData();
            },

            renewSub() {
            	if(this.ticket_val%1 != 0 || this.ticketfree_limit%1 != 0||this.ticket_val<0||this.ticketfree_limit<0){
            		this.$message({
                                message: '续费数据必须为正整数!',
                                type: 'error',
                                duration: 800,
                            });
            		return;
            	}
                var vm = this;
                var api = this.editapi;
                var user = sessionStorage.getItem('user');
                user = JSON.parse(user)

                var formObj = {}
                formObj.shop_id = this.id;

                formObj.addmoney = this.addmoney;
                formObj.operator = user.userid;
                formObj.parkid = user.parkid;
                formObj.ticketfree_limit = this.ticketfree_limit;
                if (this.ticket_type == 1) {
                    formObj.ticket_time = this.ticket_val;
                    formObj.ticket_money = "";
                } else {
                    formObj.ticket_val = "";
                    formObj.ticket_money = this.ticket_val;
                }
                common.addMoney(formObj).then(function (ret) {
                    if (ret.data.validate != 'undefined' && ret.data.validate == '1') {

                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.data.validate != 'undefined' && ret.data.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret.data.state === 1) {
                            //更新成功
                            vm.$message({
                                message: '续费成功!',
                                type: 'success',
                                duration: 600,
                            });
                            vm.$refs.bolinkuniontable.getTableData({});

                        } else {
                            //更新失败
                            vm.$message({
                                message: '续费失败!',
                                type: 'error',
                                duration: 600
                            });
                        }

                        vm.renewVisible = false;
                    }
                });

            },
            resetPassword(row) {
                this.rowid = row.id
                this.pwd1 = ''
                this.pwd2 = ''
                //显示充值密码对话框
                this.resetPwdVisible = true;
            },
            loadData() {
                var vm = this;

                var formObj = {}
                formObj.shop_id = this.shop_id;
                formObj.page = this.page;

                common.getShopMemberList(formObj).then(function (ret) {
                    vm.employeeData = ret.data.rows;
                    vm.total = ret.data.total;
                    vm.page = ret.data.page;
                });

            },
            saveUser(userId) {

                var vm = this;
                var user = sessionStorage.getItem('user');
                user = JSON.parse(user)
                var formObj = {};
                formObj.shop_id = this.shop_id;
                formObj.comid = user.comid;
                formObj.nickname = this.user.nickname;
                formObj.phone = this.user.phone;
                formObj.mobile = this.user.mobile;
                formObj.auth_flag = this.user.auth_flag;
                formObj.userId = this.user.id;
                if (formObj.nickname == undefined) {
                    formObj.nickname = '';
                }
                if (formObj.phone == undefined) {
                    formObj.phone = "";
                }
                if (formObj.mobile == undefined) {
                    formObj.mobile = '';
                }
                if (formObj.auth_flag == undefined) {
                    formObj.auth_flag = 14;
                }
                common.saveShopMember(formObj).then(function (ret) {
                    if (ret.data.state === 1) {
                        //更新成功
                        vm.$message({
                            message: '操作成功!',
                            type: 'success',
                            duration: 600,
                        });
                    } else {
                        //更新失败
                        vm.$message({
                            message: '操作失败!',
                            type: 'error',
                            duration: 600
                        });
                    }
                    vm.loadData();
                    vm.regUserVisible = false
                })

            },
            deleteRow(row) {
                this.rowid = row.id
                this.delVisible = true
            },
            //删除
            handledelete() {
                var vm = this;

                common.deleteShopMember(this.rowid).then(function (ret) {
                    if (ret.data.state == 1) {
                        vm.loadData();
                        //删除成功
                        vm.$message({
                            message: '删除成功!',
                            type: 'success',
                            duration: 600
                        });
                        vm.delVisible = false

                    } else {
                        //更新失败
                        vm.$message({
                            message: "更新失败",
                            type: 'error',
                            duration: 1200
                        });
                    }
                });

            },
            resetPwd() {
                var vm = this
                if (this.pwd1 == '' || this.pwd2 == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }
                if (!(/^(\w){6,12}$/.test(this.pwd1)) || !(/^(\w){6,12}$/.test(this.pwd2))) {
                    this.$message.error('密码为6-12位字母,数字或下划线!');
                    return
                }
                if (this.pwd1 != this.pwd2) {
                    this.$message.error('两次输入密码不一致!');
                    return
                }
                var formObj = {};
                formObj.newpass = this.pwd1;
                formObj.confirmpass = this.pwd2;
                formObj.id = this.rowid;
                common.editPass(formObj).then(function (ret) {
                    if (ret.data.validate != 'undefined' && ret.data.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.data.validate != 'undefined' && ret.data.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret.data.state == 1) {
                            //更新成功
                            vm.loadData()
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!',
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }
                });
            },
            handleEdit(row) {
                this.user = row;
                if (!isNaN(row.reg_time)) {
                    this.user.reg_time = common.dateformat(row.reg_time);
                }
                if (!isNaN(row.logon_time)) {
                    this.user.logon_time = common.dateformat(row.logon_time);
                }
                this.regUserTitle = '编辑',
                    this.showInput = true;
                this.regUserVisible = true;
            },
            regUser() {
                this.user = {};
                this.showInput = false;
                this.regUserTitle = '注册员工',
                    this.regUserVisible = true;
            },

            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                if (isNaN(date)) {
                    return date;
                }
                return common.dateformat(row.reg_time);
            },
            strFormat(row, column) {
                if (row.auth_flag == 14) {
                    return "负责人"
                } else {
                    return "工作人员"
                }
            },
            showadd: function () {
                this.loadDefaultData();
                this.shopForm.id = '';
                this.shopTitle = '添加商户'
                this.showRegis = true;

            },
            loadDefaultData: function (row) {
                var id = this.shopForm.id
                this.shopForm = {
                    id: '',
                    name: '',
                    address: '',
                    mobile: '',
                    shop_ticket_type: 1,
                    unit: 1,
                    default_limit: '5,10,20',
                    v_discount_percent: '100',
                    v_discount_money: '1',
                    v_free_money: '1',
                    validite_time: '24'
                }
                this.shopForm.id = id;
            },
            handleRegis: function () {
                let _this = this
                this.$refs.shopForm.validate((valid) => {
                    if (valid) {
                        _this.resetloading = true
                        let aform = {}
                        aform.token = sessionStorage.getItem('token')
                        aform.comid = sessionStorage.getItem('comid')
                        aform.groupid = sessionStorage.getItem('groupid')
                        aform.cityid = sessionStorage.getItem('cityid')
                        aform.unionid = sessionStorage.getItem('unionid')
                        aform.channelid = sessionStorage.getItem('channelid')
                        aform.loginuin = sessionStorage.getItem('loginuin')
                        aform.nickname = sessionStorage.getItem('nickname')
                        aform.oid = sessionStorage.getItem('oid')

                        aform.id = this.shopForm.id;
                        aform.name = this.shopForm.name;
                        aform.address = this.shopForm.address;
                        aform.mobile = this.shopForm.mobile;
                        aform.ticket_type = this.shop_ticket_type;
                        aform.ticket_unit = this.unit
                        aform.default_limit = this.shopForm.default_limit
                        aform.discount_percent = this.shopForm.v_discount_percent
                        aform.discount_money = this.shopForm.v_discount_money
                        aform.free_money = this.shopForm.v_free_money
                        aform.validite_time = this.shopForm.validite_time

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

            },
            showeditshop: function (index, row) {
                console.log(row)
                this.shopForm.id = row.id
                this.shopForm.name = row.name
                this.shopForm.address = row.address
                this.shopForm.mobile = row.mobile
                this.shopForm.v_free_money = row.free_money + ""
                this.shopForm.default_limit = row.default_limit
                this.shopForm.validite_time = row.validite_time + ""
                this.shopForm.ticket_limit = row.ticket_limit + ""
                this.shopForm.v_discount_money = row.discount_money + ""
                this.shopForm.v_discount_percent = row.discount_percent + ""
                this.shopTitle = "编辑"
                this.shop_ticket_type = row.ticket_type
                this.unit = row.ticket_unit
                this.showRegis = true
            },
            getAddMoney() {
                this.totalMoney = 0;
                this.addmoney = 0;
                var ticket_val = Number(this.ticket_val);
                var ticketfree_limit = this.ticketfree_limit;
                if (!isNaN(ticket_val)) {
                    if (this.ticket_type == 1) {
                        this.totalMoney = ticket_val * this.discount_money;
                    } else {
                        this.totalMoney = ticket_val;
                    }
                }
                if (!isNaN(ticketfree_limit)) {
                    this.totalMoney = ticketfree_limit * this.free_money + this.totalMoney;
                }
                this.addmoney = this.totalMoney * this.discount_percent / 100;

            }
        }
        ,
        mounted() {
        	window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                for (var item of user.authlist) {
                	
                    if (AUTH_ID.shopManage_Shop == item.auth_id) {
                        this.showShopEdit = common.showSubEdit(item.sub_auth)
                        this.showsetting = common.showSetting(item.sub_auth)
                        this.showdelete = common.showSubReFill(item.sub_auth)
                        this.showmRefill = common.showSubReFill(item.sub_auth)
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
            //所有厂商,所有服务商
            //this.axios.all([common.getServerList(), common.getUnionList(), common.getBankInfo(), common.getBaPayUnionList()])
        },
        created() {

        },
        watch: {

            ticketfree_limit(curVal, oldVal) {
                this.getAddMoney();
            },
            ticket_val(curVal, oldVal) {
                this.getAddMoney();
            },
            shop_ticket_type(curVal, oldVal) {
                if (curVal == 2) {
                    this.ticketUnit = [
                        {'value_name': '元', 'value_no': 4},
                    ],
                        this.showDiscountMoney = false,
                        this.unit = 4
                } else {
                    this.ticketUnit = [
                        {'value_name': '分', 'value_no': 1},
                        {'value_name': '时', 'value_no': 2},
                        {'value_name': '天', 'value_no': 3}
                    ],
                        this.showDiscountMoney = true,
                        this.unit = 1
                }
            },
            unit(curVal, oldVal) {
                if (curVal == 1) {
                    this.discount_money_name = "每分钟/元";
                } else if (curVal == 2) {
                    this.discount_money_name = "每小时/元";
                } else {
                    this.discount_money_name = "每天/元";
                }
            }
        }

    }

</script>
