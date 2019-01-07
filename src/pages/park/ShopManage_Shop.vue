<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">商户管理<span style="margin: 2px">-</span>商户管理</p>
                <div class="float-right"><el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button></div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true"  class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="叠加用券" class="clear-style margin-left-clear">
                            <el-select v-model="superimposed" @change="changeSuperimposed" placeholder="请选择" class="shop-custom-input" style="width: 150px">
                                <el-option
                                        v-for="item in superimposedType"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="float-right">
                        <el-form-item class="shop-clear-style">
                            <el-button type="primary" @click="showadd" v-if="showCustomizeAdd" style="outline: none">添加商户</el-button>
                        </el-form-item>
                        </div>
                    </div>
                </el-form>

            </div>
        </div>

        <div class="table-wrapper-style">
            <tab-pane
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

        <custom-edit-form
                ref="editref"
                :value="rowdata"
                :editFormConfig="tableitems"
                title="编辑"
                v-on:input="onEditInput"
                v-on:edit="onEdit"
                v-on:cancelEdit="cancelEdit"
                :editVisible="editFormVisible"></custom-edit-form>
        <!--重置密码-->
        <el-dialog
                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="30%"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="请输入新密码">
                    <el-input v-model="pwd1" style="width:90%" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="pwd2" style="width:90%" size="mini"></el-input>
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
                width="500px"
                size="tiny">
            <el-form ref="form" label-width="80px" style="margin-bottom:-30px">
                <el-form-item label="编号" v-if="showInput">
                    <el-input :disabled="true" v-model="user.id" style="width:90%" ></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="user.nickname" style="width:90%" ></el-input>
                </el-form-item>
                <el-form-item label="登陆账号"  v-if="showInput">
                    <el-input v-model="user.strid" :disabled="true" style="width:90%" ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="user.phone" style="width:90%" ></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="user.mobile" style="width:90%" ></el-input>
                </el-form-item>


                <el-form-item label="创建时间" v-if="showInput">
                    <el-input :disabled="true" v-model="user.reg_time" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="最近登陆时间" v-if="showInput">
                    <el-input :disabled="true" v-model="user.logon_time" style="width:100%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="regUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveUser">保存</el-button>
        </span>
        </el-dialog>
        <!--员工管理-->
        <el-dialog
                custom-class="custom-dialog"
                :close-on-click-modal="false"
                :show-close="false"
                :visible.sync="employeeVisible"
        >
            <header class="dialog-header" slot="title">
                商户设置-员工管理<i class="el-icon-close dialog-header-iconfont" @click="employeeVisible=false"></i>
            </header>
            <div>
            <el-button type="primary"  @click="regUser" size="mini">注册员工</el-button>
        </div>
            <template>
                <el-table
                        :data="employeeData"
                        style="width: 100%"
                        height="250">
                    <el-table-column
                            fixed="left"
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="handleEdit(scope.row)"
                                    type="text"
                            >
                                编辑
                            </el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.row)"
                                    type="text"

                                    style="color:red">
                                删除
                            </el-button>
                            <el-button
                                    @click.native.prevent="resetPassword(scope.row)"
                                    type="text"
                            >
                                修改密码
                            </el-button>
                        </template>
                    </el-table-column>
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
                width="500px"
                custom-class="custom-dialog"
                :close-on-click-modal="false"
                :show-close="false"
                :visible.sync="renewVisible"
                >
            <header class="dialog-header" slot="title">
                {{renewTitle}}<i class="el-icon-close dialog-header-iconfont" @click="renewVisible=false"></i>
            </header>
            <el-form label-width="120px">
                <el-form-item :label="discount_money_title" v-if="showTicketTime">
                    <el-input v-model="ticket_val"></el-input>
                    <span>{{discount_money_body}}</span>
                </el-form-item>
                <el-form-item label="减免券(元):" v-if="showTicketMoney" >
                    <el-input v-model="ticket_val"></el-input>
                </el-form-item>
                <el-form-item label="全免券(张):">
                    <el-input v-model="ticketfree_limit" ></el-input>
                    <span>(每张{{free_money}}元)</span>
                </el-form-item>
                <el-form-item label="应收金额(元):">
                    <el-input v-model="totalMoney" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前折扣(%):">
                    <el-input v-model="discount_percent" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="实收金额(元):">
                    <el-input v-model="addmoney" :disabled="true" ></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button size="small"  @click="renewVisible = false" class="custom-btns-style">取 消</el-button>
                <el-button type="primary" size="small" @click="renewSub" :disabled="renewDisabled" class="custom-btns-style" style="margin-left: 60px">确 定</el-button>
            </footer>
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


        <!--销户提示框-->
        <el-dialog
                :title="logoutTitle"
                :visible.sync="logoutTip"
                size="tiny"
                width="30%"
                custom-class="deleteTip">
            <div class="el-message-box__status el-icon-warning"></div>
            <br/>
            <div style="margin-left:50px;vertical-align:middle;" v-if="showShopDelete">完全删除该商户的所有信息，车场平台不可见该商户信息，确定删除吗？</div>
            <div style="margin-left:50px;vertical-align:middle;" v-if="showShoplogOut">须先退款当前剩余额度，注销后该商户账号不可用，未使用的优惠券失效，确定销户吗？</div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="logoutTip = false" size="small">取 消</el-button>
            <el-button type="primary" :disabled="logoutDisabled" @click="logoutShop" size="small">确 定</el-button>
        </span>

        </el-dialog>

        <!--销户或删除-->
        <el-dialog
                :close-on-click-modal="false"
                :show-close="false"
                :visible.sync="logoutVisible"
                width="450px"
                size="tiny">
            <header class="dialog-header" slot="title">
                <span class="dialog-title-icon"></span>商户销户
                <i class="el-icon-close dialog-header-iconfont" style="position: absolute;right: 20px;top:15px;font-size: 20px;cursor: pointer" @click="logoutVisible=false"></i>
            </header>
            <el-form ref="logoutForm" label-width="80px" style="margin-bottom:-30px">
                <el-form-item label="销户">
                    <el-select v-model="logoutState" filterable style="width:100%">
                        <el-option
                                v-for="item in logoutType"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="logoutVisible = false" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="confirmLogout">确 定</el-button>
        </span>
        </el-dialog>


        <!--退款-->
        <el-dialog
                width="500px"
                custom-class="custom-dialog"
                :close-on-click-modal="false"
                :show-close="false"
                :visible.sync="refundVisible">
            <header class="dialog-header" slot="title">
                商户退款<i class="el-icon-close dialog-header-iconfont" @click="refundVisible=false"></i>
            </header>
            <el-form ref="logoutForm" label-width="120px" style="margin-bottom:-30px">
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
                <el-form-item label="合计金额(元):">
                    <el-input v-model="totalMoney" :disabled="true" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="当前折扣(%):">
                    <el-input v-model="discount_percent" :disabled="true" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="应退金额(元):">
                    <el-input v-model="addmoney" :disabled="true" style="width:70%"></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="refundVisible = false" class="custom-btns-style">取 消</el-button>
                <el-button type="primary"  @click="refundShop" style="margin-left: 60px" class="custom-btns-style">确 定</el-button>
            </footer>
        </el-dialog>

        <!--添加商户-->
        <el-dialog
                width="840px"
                :visible.sync="showRegis"
                custom-class="custom-dialog-top"
                :close-on-click-modal="false"
                :show-close="false"
                @close="closeTest">
            <header class="dialog-header" slot="title">
                {{shopTitle}}<i class="el-icon-close dialog-header-iconfont" @click="showRegis=false"></i>
            </header>
            <el-steps :active="activeIndex" simple style="padding: 18px 20%;">
                <el-step title="步骤 1" icon="iconfont icon-icon-test1"></el-step>
                <el-step title="步骤 2" icon="iconfont icon-icon-test"></el-step>
            </el-steps>
            <el-form ref="shopForm" label-width="120px" :rules="shopFormRules"
                     :model="shopForm">
                <div v-show="activeIndex == 1">
                    <div class="add-shop-form-wrapper">
                        <div class="add-shop-wrapper-left">
                            <el-form-item label="商户名称" :prop="name">
                                <el-input v-model="shopForm.name" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="地址信息">
                                <el-input v-model="shopForm.address" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <el-input v-model="shopForm.mobile" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="商户折扣(%)" :prop="v_discount_percent">
                                <el-input v-model="shopForm.v_discount_percent" placeholder=""></el-input>
                            </el-form-item>
                        </div>
                        <div class="add-shop-wrapper-right">
                            <el-form-item label="有效期/小时" :prop="validite_time">
                                <el-input v-model="shopForm.validite_time" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="手输额度" >
                                <el-select v-model="hand_input_enable" filterable style="width:100%">
                                    <el-option
                                            v-for="item in handInputType"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="叠加限制" >
                                <el-select v-model="use_limit" filterable style="width:100%">
                                    <el-option
                                            v-for="item in useLimitType"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="固定码使用" >
                                <el-select v-model="use_fix_code" filterable style="width:100%">
                                    <el-option
                                            v-for="item in useFixCode"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="display: block;text-align: center">
                        <el-button type="primary" style="text-align: center;width: 144px" @click="nextStep">下一步</el-button>
                    </div>
                </div>

                <div v-show="activeIndex == 2">
                    <div style="width: 390px;padding-left: 30px;padding-top: 30px">
                        <el-form-item label="优惠券类型">
                            <el-select v-model="shop_ticket_type" filterable style="width:100%">
                                <el-option
                                        v-for="item in ticketType"
                                        :label="item.value_name"
                                        :value="item.value_no"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-shop-form-wrapper" style="padding-top:0 ">
                        <div class="add-shop-wrapper-left">
                            <el-form-item label="全免券">
                                <el-select v-model="shop_support_type" filterable style="width:100%">
                                    <el-option
                                            v-for="item in handInputType"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="优惠券单位">
                                <el-select v-model="unit" filterable style="width:100%">
                                    <el-option
                                            v-for="item in ticketUnit"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="默认显示额度" :prop="default_limit">
                                <el-input v-model="shopForm.default_limit" placeholder=""
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div class="add-shop-wrapper-right">
                            <el-form-item :label="discount_money_name" v-if="showDiscountMoney" :prop="v_discount_money">
                                <el-input v-model="shopForm.v_discount_money" placeholder="" ></el-input>
                            </el-form-item>

                            <el-form-item label="全免每张/元" :prop="v_free_money">
                                <el-input v-model="shopForm.v_free_money" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="全免券使用限制" label-width="135px">
                                <el-select v-model="free_limit_times" filterable style="width:100%">
                                    <el-option
                                            v-for="item in freeLimitTime"
                                            :label="item.value_name"
                                            :value="item.value_no"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="display: block;text-align: center">
                        <el-button @click="prveStep" class="custom-btns-style">上一步</el-button>
                        <el-button type="primary" @click="handleRegis" style="margin-left: 60px" class="custom-btns-style">确 定</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </section>


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
        ticketType,
        checkValiTime
    } from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {AUTH_ID} from '../../common/js/const'
    import TabPane from '../../components/table/TabPane';
    import customEditForm from '../../components/edit-form/editForm'
    import ElButton from 'element-ui/packages/button/src/button';
    export default {
        components: {
            ElButton,
            CommonTable,TabPane,customEditForm
        },
        data() {
            return {
                activeIndex:1,
                rowdata:{},
                searchFormData:{
                    count:0
                },
                editFormVisible:false,
                searchForm:{},
                superimposed:'1',
                logoutDisabled:false,
                refundDisabled:false,
                logoutModel:{},
                logoutVisible:false,
                logoutTip:false,
                logoutTitle:'',
                refundVisible:false,
                logoutState:0,
                showShopDelete:false,
                showShoplogOut:false,
                renewDisabled:false,
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
                        {validator: checkValiTime, trigger: 'blur'}
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
                shop_support_type:1,
                unit: 2,
                hand_input_enable:0,
                use_limit:1,
                free_limit_times:0,
                use_fix_code:1,
                discount_money_name: '每小时/元',
                superimposedType: [
                    {'value_name': '限制一张', 'value_no': '0'},
                    {'value_name': '限制两张', 'value_no': '2'},
                    {'value_name': '限制三张', 'value_no': '3'},
                    {'value_name': '限制四张', 'value_no': '4'},
                    {'value_name': '限制五张', 'value_no': '5'},
                    {'value_name': '限制六张', 'value_no': '6'},
                    {'value_name': '限制七张', 'value_no': '7'},
                    {'value_name': '限制八张', 'value_no': '8'},

                    {'value_name': '限制九张', 'value_no': '9'},

                    {'value_name': '不限制', 'value_no': '1'}
                ],
                ticketUnit: [
                    {'value_name': '分钟', 'value_no': 1},
                    {'value_name': '小时', 'value_no': 2},
                    {'value_name': '天', 'value_no': 3}
                ],
                ticketType: [
                    {'value_name': '时长减免', 'value_no': 1},
                    {'value_name': '金额减免', 'value_no': 2}
                ],
                handInputType: [
                    {'value_name': '不支持', 'value_no': 0},
                    {'value_name': '支持', 'value_no': 1}
                ],
                useLimitType: [

                    {'value_name': '无限制', 'value_no': 0},
                    {'value_name': '限制一张', 'value_no': 1},
                    {'value_name': '限制二张', 'value_no': 2},
                    {'value_name': '限制三张', 'value_no': 3},
                    {'value_name': '限制四张', 'value_no': 4},
                    {'value_name': '限制五张', 'value_no': 5},
                    {'value_name': '限制六张', 'value_no': 6},
                    {'value_name': '限制七张', 'value_no': 7},
                    {'value_name': '限制八张', 'value_no': 8},
                    {'value_name': '限制九张', 'value_no': 9}



                ],

                freeLimitTime:[
                     {'value_name': '单次有效', 'value_no': 0},
                     {'value_name': '多次有效', 'value_no': 1}
                ],
                logoutType:[
                    {'value_name': '删除商户', 'value_no': 0},
                    {'value_name': '商户销户', 'value_no': 1}
                ],
                useFixCode:[
                     {'value_name': '不支持', 'value_no': 0},
                     {'value_name': '支持', 'value_no': 1}
                ],
                shopForm: {},
                showRegis: false,
                showCustomizeAdd: false,
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
                showlogout:false,
                showrefund:false,
                showShopEdit: false,
                showmRefill: false,
                showSuperimposed:true,
                resetloading: false,
                queryapi: '/shop/quickquery',
                addapi: '/shop/create',
                editapi: '/shop/create',
                addmoneyapi:'/shop/addmoney',
                delapi: '/shop/delete',
                refundapi:'/shop/refund',
                parkid: '',
                btswidth: '210',
                fieldsstr: 'id__name__address__create_time__mobile__validite_time__ticket_money__ticket_type__default_limit__discount_percent__hand_input_enable__use_limit__free_limit_times__use_fix_code',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '',
                            nameType:'shop',
                            columnType:'expand',
                            align: 'center',
                            width:'50',
                        }]
                    },
                    {
                    hasSubs: false, subs: [
                        {
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            editable: true,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            "type": "input",
                            "disable": true,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
                        },
                    ]
                },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '商户名称',
                            prop: 'name',
                            width: '180',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',

                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
                            "rules": [
                                {required: true, message: '商户名称不能为空', trigger: 'blur'}
                            ],
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '地址',
                            prop: 'address',
                            width: '180',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            hidden:true,
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
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
                            hidden:true,
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.create_time))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '手机号码',
                            prop: 'mobile',
                            width: '180',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            hidden:true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
                        }]
                    }, {
                        hasSubs:false,
                        subs: [{
                            label: '优惠券额度',
                            align: 'center',
                            width:'110',
                            unsortable: true,
                            columnType:'render',
                            render: (h, params) => {
                                let unit = '元';
                                let str = '';
                                if (params.row.ticket_unit == 1) {
                                    unit = "分钟";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 2) {
                                    unit = "小时";
                                    str = params.row.ticket_limit+unit;
                                } else if (params.row.ticket_unit == 3) {
                                    unit = "天";
                                    str = params.row.ticket_limit+unit;
                                } else {
                                    unit = "元";
                                    str = params.row.ticket_money+unit;
                                }
                                return h('div', [
                                    h('span', {
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            }
                        }]
                    },{
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
                            },
                            hidden:true,
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
                            },
                            hidden:true,
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
                            },
                            hidden:true,
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '全免券额度',
                            prop: 'ticketfree_limit',
                            width: '120',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = params.row.ticketfree_limit+'张';
                                return h('div', [
                                    h('span', {
                                        props: {

                                        },
                                        style: {

                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            }
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
                            },
                            hidden:true,
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠券类型',
                            prop: 'ticket_type',
                            width: '100',
                            type: 'selection',
                            selectlist: ticketType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "radio",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'mini',
                            "options": [
                                {
                                    "value": "1",
                                    "label": "时长减免",
                                    "disabled": false
                                },
                                {
                                    "value": "2",
                                    "label": "金额减免",
                                    "disabled": false
                                }
                            ],
                            format: function (row) {
                                if (row.ticket_type == 1) {
                                    return "时长减免"
                                } else if (row.ticket_type == 2) {
                                    return "金额减免";
                                } else {
                                    return row.ticket_type;
                                }
                            },
                            hidden:true,
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '全免券',
                            prop: 'support_type',
                            width: '100',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.support_type == 1) {
                                    return "支持"
                                } else if (row.support_type == 0) {
                                    return "不支持";
                                }
                            },
                            hidden:true,
                            "type": "radio",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'mini',
                            "options": [
                                {
                                    "value": "1",
                                    "label": "支持",
                                    "disabled": false
                                },
                                {
                                    "value": "0",
                                    "label": "不支持",
                                    "disabled": false
                                }
                            ],
                        }]
                    },

                    {
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
                            },
                            hidden:true,
                            "type": "radio",
                            "value": "",
                            "button": false,
                            "border": true,
                            "rules": [],
                            'size':'mini',
                            "options": [
                                {
                                    "value": "2",
                                    "label": "元",
                                    "disabled": false
                                }
                            ],
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '默认显示额度',
                            prop: 'default_limit',
                            width: '178',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
                        }]
                    } ,
                    {

                        hasSubs: false,
                        subs: [{
                            label: '有效期',
                            prop: 'validite_time',
                            width: '130',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = params.row.validite_time+'小时';
                                return h('div', [
                                    h('span', {
                                        props: {

                                        },
                                        style: {

                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            }
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '手输额度',
                            prop: 'hand_input_enable',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.hand_input_enable == 0) {
                                    return "不支持";
                                } else if (row.hand_input_enable == 1) {
                                    return "支持";
                                }
                            },
                            hidden:true,
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '叠加限制',
                            prop: 'use_limit',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let str = '';
                                switch (params.row.use_limit){
                                    case 0:
                                        str = '无限制';
                                        break;
                                    case 1:
                                        str = '限制一张';
                                        break;
                                    case 2:
                                        str = '限制两张';
                                        break;
                                    case 3:
                                        str = '限制三张';
                                        break;
                                    case 4:
                                        str = '限制四张';
                                        break;
                                    case 5:
                                        str = '限制五张';
                                        break;
                                    case 6:
                                        str = '限制六张';
                                        break;
                                    case 7:
                                        str = '限制七张';
                                        break;
                                    case 8:
                                        str = '限制八张';
                                        break;
                                    case 9:
                                        str = '限制九张';
                                        break;
                                    default:
                                        str = '无限制'
                                }
                                return h('div', [
                                    h('span', {
                                        props: {

                                        },
                                        style: {

                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                            }
                                        }
                                    }, str),
                                ]);
                            },
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '全免券使用限制',
                            prop: 'free_limit_times',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.free_limit_times == 0) {
                                    return "单次有效";
                                } else if (row.free_limit_times == 1) {
                                    return "多次有效";
                                }
                            },
                            hidden:true,
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '固定码使用',
                            prop: 'use_fix_code',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                if (row.use_fix_code == 0) {
                                    return "不支持";
                                } else if (row.use_fix_code == 1) {
                                    return "支持";
                                }
                            },
                            hidden:true,
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            width: '244',
                            hidden:false,
                            unsortable: true,
                            render: (h, params) => {
                                let isDisabled = params.row.state == 2 ? true:false;

                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showShopEdit?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                let row = params.row;
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
                                                this.shop_support_type =row.support_type
                                                this.hand_input_enable = row.hand_input_enable
                                                this.free_limit_times=row.free_limit_times;
                                                this.use_fix_code=row.use_fix_code;
                                                this.use_limit = row.use_limit
                                                this.unit = row.ticket_unit
                                                this.showRegis = true

                                            }
                                        }
                                    }, '编辑'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showsetting?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();

                                                //跳转到商户自家的员工管理
                                                this.$router.push({path: '/ShopManage_Coupon_Staff?shop_id='+params.row.id});

                                                // this.shop_id = params.row.id;
                                                //
                                                // //请求员工数据
                                                // var user = sessionStorage.getItem('user')
                                                // user = JSON.parse(user)
                                                // this.loadData();
                                                // //设置
                                                // this.employeeVisible = true;
                                            }
                                        }
                                    }, '设置'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color:isDisabled ?'': '#F54B4B',
                                            display:this.showlogout?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showLogout(params.row)
                                            }
                                        }
                                    }, '销户'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showmRefill?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showrefill(params.index,params.row)
                                            }
                                        }
                                    }, '续费'),
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled:isDisabled
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display:this.showrefund?'':'none'
                                        },
                                        on: {
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.showRefund(params.row)
                                            }
                                        }
                                    }, '退款'),
                                ]);
                            }
                        }]
                    },
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
            nextStep(){
                this.activeIndex = 2;
            },
            prveStep(){
              this.activeIndex = 1;
            },
            changeSuperimposed : function(value){
                let vm = this;
                let api = "/shop/changeSuperimposed";
                let sform = {'comid': '',superimposed:''};
                sform.superimposed = value;
                sform = common.generateForm(sform);

                vm.$axios.post(path + api, vm.$qs.stringify(sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    vm.loading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 150);
                    } else {
                        console.log(ret);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },
            closeTest:function(){
                this.activeIndex = 1;
                this.$refs['shopForm'].clearValidate()
            },
            showLogout: function (row) {
                this.logoutDisabled=false;
                this.logoutModel=row;
                this.logoutState=0;
                this.logoutVisible = true;
            },
            showRefund: function (row) {
                this.refundDisabled=false;
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
                this.ticket_val = '';
                this.ticketfree_limit = '';
                this.free_money = row.free_money;
                this.id = row.id;
                this.ticket_money = row.ticket_money;
                this.discount_percent = row.discount_percent;
                this.discount_money = row.discount_money;
                this.addMoney='';
                this.totalMoney='';
                this.refundVisible = true;
            },
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
                this.renewDisabled=false;
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
                this.ticket_val = '';
                this.ticketfree_limit = '';
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
            	this.renewDisabled=true;
                var vm = this;
                var api = this.addmoneyapi;
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
                formObj = common.generateForm(formObj);
                vm.$axios.post(path + api, vm.$qs.stringify(formObj), {
                      headers: {
                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                      }
                  }).then(function (ret) {
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
                            vm.$refs['tabPane'].getTableData({},vm);
                            vm.renewVisible=false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '续费失败!',
                                type: 'error',
                                duration: 600
                            });
                        }
                    }
                }).catch(function (error) {
                    vm.$message({
                        message: "发生异常！",
                        type: 'error',
                        duration: 1200
                    });
                   vm.renewDisabled = false;
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
            refundShop(){
                if(this.ticket_val%1 != 0 || this.ticketfree_limit%1 != 0||this.ticket_val<0||this.ticketfree_limit<0){
                    this.$message({
                          message: '退款数据必须为正整数!',
                          type: 'error',
                          duration: 800,
                    });
                    return;
                }
                  this.refundDisabled=true;
                  var vm = this;
                  var api = this.refundapi;

                  var formObj = {}
                  formObj.shop_id = this.id;
                  formObj.addmoney = this.addmoney;
                  formObj.ticketfree_limit = this.ticketfree_limit;
                  if (this.ticket_type == 1) {
                      formObj.ticket_time = this.ticket_val;
                      formObj.ticket_money = "";
                  } else {
                      formObj.ticket_val = "";
                      formObj.ticket_money = this.ticket_val;
                  }
                  formObj = common.generateForm(formObj);
                  //发送请求,删除id为row.id的数据
                  vm.$axios.post(path + api, vm.$qs.stringify(formObj), {
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
                          console.log(ret);
                          if (ret > 0 || ret.state == 1) {
                              // if (ret > 0) {
                              //成功
                              vm.$refs['tabPane'].getTableData({},vm);
                              vm.$message({
                                  message: ret.msg,
                                  type: 'success',
                                  duration: 600
                              });
                              vm.refundVisible = false;
                          } else {
                              //更新失败
                              vm.$message({
                                  message: ret.msg,
                                  type: 'error',
                                  duration: 1200
                              });
                              vm.refundDisabled=false
                          }
                      }
                  }).catch(function (error) {
                        vm.$message({
                            message: "发生异常！",
                            type: 'error',
                            duration: 1200
                        });
                    vm.refundDisabled = false;
                 });
              },
            confirmLogout(){
                if(this.logoutState==0){
                    this.showShopDelete=true;
                    this.showShoplogOut=false;
                    this.logoutTitle="删除商户"
                }else{
                    this.showShopDelete=false;
                    this.showShoplogOut=true;
                    this.logoutTitle="商户销户"
                };
                this.logoutVisible = false;
                this.logoutTip=true;
            },
            logoutShop(){
                this.logoutDisabled=true;
                let vm = this;
                let api = this.delapi;
                let dform = {'id': this.logoutModel.id, 'logoutState': this.logoutState};
                dform = common.generateForm(dform);
                //发送请求,删除id为row.id的数据
                vm.$axios.post(path + api, vm.$qs.stringify(dform), {
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
                        console.log(ret);
                        if (ret > 0 || ret.state == 1) {
                            // if (ret > 0) {
                            //删除成功
                            vm.$refs['tabPane'].getTableData({},vm);
                            vm.$message({
                                message: ret.msg,
                                type: 'success',
                                duration: 600
                            });
                            //vm.logoutVisible = false;
                            vm.logoutTip=false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: ret.msg,
                                type: 'error',
                                duration: 1200
                            });
                            vm.logoutDisabled=false;
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
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

                this.use_limit=0
                this.free_limit_times=0
                this.use_fix_code=1
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
                    shop_support_type:1,
                    hand_input_enable: 0,
                    use_limit:1,
                    unit: 2,
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
                        aform.nickname1 = sessionStorage.getItem('nickname1')

                        aform.id = this.shopForm.id;
                        aform.name = this.shopForm.name;
                        aform.address = this.shopForm.address;
                        aform.mobile = this.shopForm.mobile;
                        aform.ticket_type = this.shop_ticket_type;
                        aform.support_type = this.shop_support_type;
                        aform.hand_input_enable = this.hand_input_enable;
                        aform.free_limit_times=this.free_limit_times;
                        aform.use_fix_code=this.use_fix_code;
                        aform.use_limit = this.use_limit;
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
                                _this.$refs['tabPane'].getTableData({},_this);
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
                this.shop_support_type =row.support_type
                this.hand_input_enable = row.hand_input_enable
                this.free_limit_times=row.free_limit_times;
                this.use_fix_code=row.use_fix_code;
                this.use_limit = row.use_limit
                this.unit = row.ticket_unit
                this.showRegis = true
            },
            getAddMoney() {
                //this.totalMoney = 0;
                //this.addmoney = 0;
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
            },
        //    //////////////////////////////////////////////////////////////////////////////
            onEditInput:function (eform) {
                this.rowdata=eform;
            },
            onEdit: function () {
                //发送ajax,提交表单更新
                let that = this;
                let api = this.editapi;
                let eform = this.rowdata;
                eform = common.generateForm(eform);
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    console.log('valid',valid,eform)
                    if (valid) {
                        editTableData(api,eform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '更新成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.editFormVisible = false;
                                        that.$refs['tabPane'].getTableData(that.formItem,that);
                                    },60)
                                }else{
                                    that.$message({
                                        message: res.data.msg,
                                        type: 'info',
                                        duration: 600
                                    });
                                }
                            }
                        }).catch(err => {
                            that.$message({
                                message: '更新失败',
                                type: 'error',
                                duration: 600
                            });
                        })
                    }
                });
            },
            cancelEdit(){
                this.editFormVisible = false;
            },
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
                        if (AUTH_ID.shopManage_Shop == item.auth_id) {
                            this.showCustomizeAdd = common.showSubAdd(item.sub_auth)
                            this.showShopEdit = common.showSubEdit(item.sub_auth)
                            this.showsetting = common.showSetting(item.sub_auth)
                            //this.showdelete = common.showSubDel(item.sub_auth)
                            this.showlogout = common.showSubDel(item.sub_auth)
                            this.showrefund=common.showRefund(item.sub_auth)
                            this.showmRefill = common.showSubReFill(item.sub_auth)
                            if(this.showShopEdit==false&&this.showsetting==false&&this.showlogout==false&&this.showmRefill==false&&this.showrefund==false){
                                this.hideOptions=true;
                            }
                            break;
                        }
                    }

                }

            }
        }
        ,
        mounted() {
            this.setAuthorityFn()
            this.$refs['tabPane'].getTableData({},this);
        },
        activated() {
            let that = this;
            common.getSuperimposed().then(function (response) {
                that.superimposed = response.data.superimposed
            })
        },
        created() {

        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
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
                        this.unit = 2
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
<style scoped lang="scss">
    .add-shop-form-wrapper{
        padding: 30px 30px 0 30px;
        display: flex;
        .add-shop-wrapper-left{
            position: relative;
            flex: 1;
        }
        .add-shop-wrapper-left::after{
            position: absolute;
            top: 0;
            right: -20px;
            bottom: 25px;
            border: 1px dotted #979797;;
            content: '';
        }
        .add-shop-wrapper-right{
            flex:1;
        }
    }
</style>