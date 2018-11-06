<template>
    <section>
        <CommonTable
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :resetapi="resetapi"
                :tableheight="tableheight"
                :showresetdata='showresetdata'
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :searchtitle="searchtitle"
                :orderfield="orderfield"
                :addtitle="addtitle"
                :showdelete="showdelete"
                :showCustomizeAdd="showCustomizeAdd"
                :hideOptions="hideOptions"
                :showCustomizeEdit="showCustomizeEdit"
                :hideAdd="hideAdd"
                :showsetting="showsetting"
                v-on:showSetting="showSetting"
                v-on:customizeadd="customizeadd"
                v-on:customizeedit="customizeedit"
                ref="bolinkuniontable"
        ></CommonTable>
        <el-dialog
                :title="addtitle"
                :visible.sync="showRegisPark"
                width="30%">
            <el-form ref="addFormPark" label-width="120px" style="margin-bottom:-30px" :rules="addFormRules"
                     :model="addFormPark">
                <el-form-item label="名称" :prop="company_name">
                    <el-input v-model="addFormPark.company_name" style="width:90%" placeholder=""></el-input>
                </el-form-item>


                <el-form-item label="车位总数" :prop="parking_total">
                    <el-input v-model="addFormPark.parking_total" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                 <el-form-item label="所属运营集团" >
                    <el-select v-model="addFormPark.group_id" style="width:90%">
                        <el-option
                                v-for="item in unionList"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="泊链车场编号" :prop="bolink_id">
                    <el-input v-model="addFormPark.bolink_id" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="联系手机" :prop="mobile">
                    <el-input v-model="addFormPark.mobile" style="width:90%" placeholder=""></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRegisPark = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleAdd" :loading="addloading">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
                title="编辑停车场"
                :visible.sync="showEditPark"
                width="30%">
            <el-form ref="addFormPark" label-width="120px" style="margin-bottom:-30px" :rules="addFormRules"
                     :model="addFormPark">
                <el-form-item label="名称" :prop="company_name">
                    <el-input v-model="addFormPark.company_name" style="width:90%" placeholder=""></el-input>
                </el-form-item>


                <el-form-item label="车位总数" :prop="parking_total">
                    <el-input v-model="addFormPark.parking_total" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="地址" :prop="address">
                    <el-input v-model="addFormPark.address" style="width:90%" placeholder=""></el-input>
                    <br/>
                </el-form-item>
                <el-form-item label="泊链车场编号" :prop="bolink_id">
                    <el-input v-model="addFormPark.bolink_id" style="width:90%" placeholder="" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系手机" :prop="mobile">
                    <el-input v-model="addFormPark.mobile" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <!--<el-form-item label="备注">-->
                <!--<el-input v-model="addFormPark.remark" style="width:90%" placeholder=""></el-input>-->
                <!--</el-form-item>-->

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showEditPark = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleEdit" :loading="addloading">确 定</el-button>
			</span>
        </el-dialog>

        <el-dialog :visible.sync="mapVisible" @close="dclose" top="10%" width="50%" :title="addressTitle">
            <el-row>
                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="13" @click="clickmap"
                           @dblclick="makePoint" :scroll-wheel-zoom="true" :double-click-zoom="false">

                    <bm-marker v-if="showMarker" :position="marker" animation="BMAP_ANIMATION_DROP" :label="mapLabel"
                               :dragging="true" @mouseup="mouseup">
                    </bm-marker>
                </baidu-map>
            </el-row>
            <el-row>
                <el-col :span="24" style="margin-top:10px">
                    <el-col :span="16">
                        <el-input
                                placeholder="请输入关键字"
                                v-model="keyword"
                                style="width:150px;"
                                size="small">
                        </el-input>
                        <el-button type="primary" icon="el-icon-search" size="small" @click="sclick"></el-button>
                    </el-col>
                    <el-col :span="8" align="right">
                        <el-button @click="mapVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="modifyPosition" size="small" :loading="maploading">保存
                        </el-button>
                    </el-col>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog title="停车场设置-员工管理" width="60%" :visible.sync="showSetPark">
            <el-row style="margin-bottom:8px">
                <el-col :span="24" align="left">
                    <el-col :span="18" align="left">
                        <el-button type="primary"  @click="handleSearch_employee" icon="search">高级查询
                        </el-button>
                        <el-button type="primary"  @click="handleAdd_employee">注册员工</el-button>
                    </el-col>

                    <el-col :span="6" align="right" style="float: right">
                        <el-button @click="refresh" type="text" >刷新&nbsp;&nbsp;</el-button>
                    </el-col>
                </el-col>

            </el-row>
            <el-row>
                <!--列表-->
                <el-table :data="table" border highlight-current-row style="width:100%;" :height="tableheight-200"
                          v-loading="loading" @sort-change="sortChange" id="tablearea">

                    <el-table-column label="操作" :width="btswidth" v-if="!hideOptions" align="center" fixed="left">
                        <template scope="scope">
                            <el-button  type="text" @click="handleEdit_employee(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button  type="text" @click="openDelete(scope.$index, scope.row)">
                                <span style="color:red">删除</span></el-button>

                            <el-button  type="text"
                                       @click="handleresetpwd(scope.$index, scope.row)">重置密码
                            </el-button>
                        </template>

                    </el-table-column>

                    <el-table-column
                            align="center"
                            type="index"
                            width="83"
                            label="索引"
                            fixed="left">
                    </el-table-column>

                    <div v-for="items in tableitems_employee">
                        <div v-if="!items.hasSubs">
                            <el-table-column
                                    v-for="tableitem in items.subs"
                                    v-if="!tableitem.hidden"
                                    :prop="tableitem.prop"
                                    :label="tableitem.label"
                                    header-align="center"
                                    :align="tableitem.align"
                                    :sortable="!tableitem.unsortable"
                                    :width="tableitem.width"
                                    :formatter="tableitem.format"
                            >
                            </el-table-column>
                        </div>
                    </div>
                </el-table>

                <!--工具条-->
                <el-col :span="24" align="bottom" style="margin-top:5px;margin-bottom:5px">
                    <el-col :span="24" align="right">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="currentPage" :page-sizes="[20, 40, 80]" :page-size="pageSize"
                                       layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    </el-col>
                </el-col>
            </el-row>


        </el-dialog>
        <!--高级查询-->
        <complex-search
                :searchVisible="searchFormVisible"
                :title="searchtitle"
                :searchitems="tableitems_employee"
                v-on:searchdialog="closesearch"
                v-on:search="onSearch"
                ref="search">
        </complex-search>

        <!--表格编辑-->
        <edit-form
                :editVisible="editFormVisible"
                :edititems="tableitems_employee"
                :editloading="addloading"
                :editFormRules="addFormRules_employee"
                :rowdata="rowdata"
                v-on:editdialog="closeedit"
                v-on:edit="onEdit"
                ref="editref">
        </edit-form>

        <!--表格添加-->
        <add-form
                addtitle="注册员工"
                :addVisible="addFormVisible"
                :addloading="addloading"
                :additems="tableitems_employee"
                :addFormRules="addFormRules_employee"

                v-on:adddialog="closeadd"
                v-on:add="onAdd"
                ref="addref">
        </add-form>
        <!--删除提示框-->
        <el-dialog
                title="提示"
                :visible.sync="delVisible"
                width="30%"
                custom-class="deleteTip">
            <div class="el-message-box__status el-icon-warning" style="padding-bottom: 10px;"></div>
            <div style="margin-left:50px;vertical-align:middle;">确定删除吗?此操作不可恢复!</div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="handledelete" size="small">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog


                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="30%">
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
				<el-button type="primary" size="small" @click="resetPwd" :loading="addloading">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>

<script>
    import {
        path,
        genderType,
        collectType,
        parkState,
        inparkType,
        checkPhone,
        checkMobile,
        checkParkMobile,
        checkTelePhone
    } from '../../api/api';

    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import ComplexSearch from '../../components/ComplexSearch'
    import EditForm from '../../components/EditForm'
    import AddForm from '../../components/AddForm'
    import employeeManage from '../union/SystemSetting_EmployeeManage'

    import AddDate from '../../components/add-subs/AddDate'

    import axios from 'axios'

    export default {
        components: {
            CommonTable,
            employeeManage,
            AddDate,
            ComplexSearch, EditForm, AddForm
        },
        data() {
            return {
                showresetdata:true,
                orderfield:'id',
                bolink_id:'',
                hideExport: true,
                tableheight: '',
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showRegisPark: false,
                showEditPark: false,
                showsetting: true,
                hideAdd: true,
                showCustomizeAdd: true,
                showCustomizeEdit: true,
                showSetPark: false,
                queryapi: '/cityparks/query',
                setapi: '/cityparks/setpark',
                addapi: '/cityparks/editpark',
                editapi: '/cityparks/editpark',
                delapi: '/cityparks/deletepark',
                resetapi:'/cityparks/resetdata',
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                parkState2: parkState,
                unionList:'',
                resetCarnumber: '',
                btswidth: '200',
                fieldsstr: 'id__company_name__parking_type__parking_total__etc__state__areaid__city__address__longitude__latitude__mobile__create_time__update_time__ukey__bolink_id__groupid',
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
                                label: '名称',
                                prop: 'company_name',
                                width: '123',
                                type: 'str',
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
                                label: '车位总数',
                                prop: 'parking_total',
                                width: '100',
                                type: 'number',
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '地址',
                                prop: 'address',
                                width: '300',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                     hasSubs: false, subs: [
                        {
                            label: '所属运营集团',
                            prop: 'groupid',
                            width: '100',
                            type: 'selection',
                            selectlist: this.unionList,
                            addable: true,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, this.unionList, 'groupid')
                            }
                        },
                    ]},
                    {
                        hasSubs: false, subs: [
                            {
                                label: '联系手机',
                                prop: 'mobile',
                                width: '123',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '泊链车场编号',
                                prop: 'bolink_id',
                                width: '123',
                                type: 'str',
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                       { hasSubs: false, subs: [
                            {
                                label: '泊链车场秘钥',
                                prop: 'ukey',
                                width: '180',
                                type: 'str',
                                addable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                ],
                tableitems_employee: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '姓名',
                                prop: 'nickname',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '登录账号',
                                prop: 'strid',
                                width: '123',
                                type: 'str',
                                editable: false,
                                searchable: true,

                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '电话',
                                prop: 'phone',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '手机',
                                prop: 'mobile',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '角色',
                                prop: 'role_id',
                                width: '123',
                                type: 'selection',
                                selectlist: this.aroles,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    // console.log(this.aroles)
                                    //这里注意，一定要使用箭头函数，因为箭头函数中的this是延作用域向上取到最近的一个
                                    //也就是data中的this,可以获取到this.aroles
                                    //如果是普通函数，this.aroles获取到的是undefined,因为this的作用域是本身，并没有aroles这个变量
                                    return common.nameformat(row, this.aroles, 'role_id')
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '创建时间',
                            prop: 'reg_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.reg_time)
                            }
                        }]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '性别',
                                prop: 'sex',
                                width: '100',
                                type: 'selection',
                                selectlist: genderType,
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: function (row) {
                                    return common.nameformat(row, genderType, 'sex')
                                }
                            },
                        ]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '最近登录时间',
                            prop: 'logon_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.logon_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收费',
                            prop: 'isview',
                            width: '123',
                            type: 'selection',
                            selectlist: collectType,
                            hidden: true,


                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, collectType, 'isview')
                            }
                        }]
                    }
                ],
                searchtitle: '高级查询',
                addtitle: '注册停车场',

                datereadonly: true,

                company_name: 'company_name',
                address: 'address',
                mobile:'mobile',
                parking_total:'parking_total',
                addFormRules: {
                    company_name: [
                        {required: true, message: '请填写停车场名称', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请标注位置', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, validator: checkParkMobile, trigger: 'blur'}
                    ],
                    parking_total: [
                       {required: true, message: '请输入车位数', trigger: 'blur'}
                    ]

                },
                nickname: 'nickname',
                role_id: 'role_id',
                addFormRules_employee: {
                    nickname: [
                        {required: true, message: '请填写姓名', trigger: 'blur'}
                    ],

                    role_id: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],mobile: [
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkTelePhone, trigger: 'blur'}
                    ]
                },
                pname: [],
                cartype: [],
                addloading: false,
                addFormPark: {},

                mapVisible: false,
                showMarker: false,
                showMap: false,
                keyword: '',
                // 116.404125,39.914257
                center: {
                    lat: 39.914257,
                    lng: 116.404125,
                },
                marker: {
                    lat: 39.914257,
                    lng: 116.404125,
                },
                maploading: false,
                mapLabel: {content: '双击定位', opts: {offset: {width: 20, height: -10}}},
                addressTitle: '',


                table: [],
                loading: false,
                sform: {},
                rowdata: {},
                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                searchFormVisible: false,
                addFormVisible: false,
                editFormVisible: false,
                delVisible: false,
                rowid: '',
                resetPwdVisible: false,
                pwd1: '',
                pwd2: '',
                aroles: '',
            }
        },
        methods: {
            showSetting: function (row) {
                //显示设置
                // console.log(this)
                this.currentRow = row;
                this.showSetPark = true;
                // this.$refs['employeeManage'].activedialog();
                this.getTableData({});
                let _this = this;
                sessionStorage.setItem('comid', row.id);
                axios.all([common.getEmployeeRole()])
                    .then(axios.spread(function (ret) {
                        _this.aroles = ret.data;
                        sessionStorage.setItem('comid', '')
                    }))
            },
            customizeadd: function () {
                //显示注册新车场
                this.showRegisPark = true;
                this.addressTitle = '';
                this.addFormPark = {};
            },
            customizeedit: function (index, row) {
                //编辑车场
                // console.log(row)
                this.addFormPark = row;
                this.showEditPark = true;
                this.addressTitle = '';

            },
            handleAdd: function () {
                //注册车场
                let _this = this;

                this.$refs.addFormPark.validate((valid) => {

                    if (valid) {
                        _this.addloading = true;
                        let aform = _this.generateForm(_this.addFormPark);
                        _this.$axios.post(path + _this.addapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.$refs['bolinkuniontable'].getTableData({});
                                _this.$message({
                                    message: ret.msg,
                                    type: 'success',
                                    duration: 1200
                                });
                                _this.showRegisPark = false;
                                _this.addFormPark = {};
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            handleEdit: function () {
                //编辑车场
                let _this = this;

                this.$refs.addFormPark.validate((valid) => {
                    if (valid) {
                        _this.addloading = true;
                        let aform = _this.generateForm(_this.addFormPark);
                        _this.$axios.post(path + _this.editapi, _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.$refs['bolinkuniontable'].getTableData({});
                                _this.$message({
                                    message: '编辑成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.showEditPark = false;
                                _this.addFormPark = {};
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            onMapShow: function () {
                this.showMap = true;
                this.showMarker = true;
                this.mapVisible = true;
            },
            dclose: function () {
                setTimeout(() => {
                    this.showMarker = false;
                    this.showMap = false;
                    this.keyword = ''
                }, 100)
            },
            makePoint(type) {
                this.showMarker = false;
                this.marker.lat = type.point.lat;
                this.marker.lng = type.point.lng;
                this.lat = type.point.lat;
                this.lng = type.point.lng;
                this.showMarker = true;
                // console.log(this.marker.lat, this.marker.lng);

                let myGeo = new BMap.Geocoder();
                let _this = this;
                myGeo.getLocation(type.point, function (rs) {
                    let addComp = rs.addressComponents;
                    // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    _this.addressTitle = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    // _this.mapLabel.content = _this.addressTitle;
                });


            },
            mouseup(type) {
                this.marker.lat = type.point.lat;
                this.marker.lng = type.point.lng
                //console.log(this.marker.lat,this.marker.lng)
            },
            clickmap(type) {
                // console.log(type.point)
            },
            sclick() {
                let vm = this;
                let myGeo = new BMap.Geocoder();
                myGeo.getPoint(this.keyword, function (point) {
                    if (point) {
                        if (point.lat === vm.center.lat && point.lng === vm.center.lng) {
                            alert("输入的地址相同或地址不正确!");
                        } else {
                            vm.center.lat = point.lat;
                            vm.center.lng = point.lng;
                            vm.showMarker = false;
                            // vm.mapLabel.content = vm.keyword;
                            vm.addressTitle = vm.keyword;
                            vm.marker.lat = point.lat;
                            vm.marker.lng = point.lng;
                            vm.showMarker = true;
                            new BMap.Label("123456",)
                            // {content: '双击定位', opts: {offset: {width: 20, height: -10}}}
                        }
                    } else {
                        alert("您选择地址没有解析到结果!");
                    }
                }, "中国");
            },
            modifyPosition() {
                this.addFormPark.address = this.addressTitle;
                this.addFormPark.latitude = this.marker.lat;
                this.addFormPark.longitude = this.marker.lng;
                this.mapVisible = false;

                // console.log(this)
                // console.log(this.$refs.employeeManage)
                // this.showSetPark = true;
                // this.$refs.employeeManage.activedialog();

            },

            /*
            * 停车场设置当中的-员工管理
            *
            * */
            //拉取表格数据
            getTableData(sform) {
                let vm = this;
                this.loading = true;
                let api = '/member/query';

                sform.rp = this.pageSize;
                sform.page = this.currentPage;
                sform.orderby = this.orderby;
                sform.orderfield = this.orderfield;
                sform.fieldsstr = 'id__nickname__strid__phone__mobile__role_id__reg_time__sex__logon_time__isview';
                sform = this.generateForm(sform);

                vm.$axios.post(path + api, vm.$qs.stringify(sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    if (ret.validate !== 'undefined' && ret.validate === '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!')
                        }, 150)
                    } else if (ret.validate !== 'undefined' && ret.validate === '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 150)
                    } else if (ret.validate !== 'undefined' && ret.validate === '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 150)
                    } else {
                        // console.log(ret);
                        if (ret.total === 0) {
                            vm.table = [];
                        } else {
                            vm.table = ret.rows;
                        }
                        vm.total = ret.total;
                        vm.loading = false;
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })

            },
            handleSearch_employee() {
                this.searchFormVisible = true;
            },
            handleAdd_employee() {
                this.addFormVisible = true;

            },
            //刷新页面
            refresh() {
                this.getTableData(this.sform);
                //清空高级查询表单项内容
                this.$message({
                    message: '刷新成功!',
                    type: 'success',
                    duration: 600
                });
            },
            //排序变动
            sortChange(val) {
                if (val.order != null && val.order.substring(0, 1) === "a") {
                    this.orderby = "asc";
                } else {
                    this.orderby = "desc";
                }
                this.orderfield = val.prop;
                this.getTableData(this.sform);
            },
            //分页变动
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData(this.sform);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData(this.sform);
            },
            handleEdit_employee(index, row) {
                this.editFormVisible = true;
                this.rowdata = row;
            },
            openDelete(index, row) {
                this.rowid = row.id;
                this.delVisible = true;
            },
            handledelete() {
                let vm = this;
                vm.$axios.post(path + '/member/delmember', vm.$qs.stringify({
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token')
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate !== 'undefined' && ret.validate === '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate !== 'undefined' && ret.validate === '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        console.log(ret);
                        if (ret > 0 || ret.state === 1) {
                            //删除成功
                            vm.getTableData({});
                            vm.$message({
                                message: '删除成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.delVisible = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: "更新失败" + ret.msg,
                                type: 'error',
                                duration: 1200
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })
            },
            handleresetpwd(index, row) {
                this.rowid = row.id;
                this.pwd1 = '';
                this.pwd2 = '';
                //显示充值密码对话框
                this.resetPwdVisible = true
            },
            resetPwd() {
                let vm = this;
                if (this.pwd1 === '' || this.pwd2 === '') {
                    this.$message.error('密码不能为空!');
                    return;
                }
                if (!(/^(\w){6,12}$/.test(this.pwd1)) || !(/^(\w){6,12}$/.test(this.pwd2))) {
                    this.$message.error('密码为6-12位字母,数字或下划线!');
                    return
                }
                if (this.pwd1 !== this.pwd2) {
                    this.$message.error('两次输入密码不一致!');
                    return
                }
                this.addloading = true;
                let rform = {
                    'newpass': this.pwd1,
                    'confirmpass': this.pwd2,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token')
                };
                vm.$axios.post(path + '/member/editpass', vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate !== 'undefined' && ret.validate === '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate !== 'undefined' && ret.validate === '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret > 0 || ret.state === 1) {
                            //更新成功
                            vm.getTableData({});
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false;
                            vm.addloading = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })
            },
            closesearch: function (val) {
                this.searchFormVisible = val;
            },
            onSearch: function (sform) {
                //在这里得到表单项,提交查询
                this.sform = sform;
                this.getTableData(sform);
            },
            closeadd(val) {
                this.addFormVisible = val;
                this.addLoading = val;
            },
            onAdd(aform) {
                let _this = this;

                // console.log(aform)
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        _this.addloading = true;
                        aform = _this.generateForm(aform);
                        _this.$axios.post(path + '/member/createmember', _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.getTableData({});
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.addFormVisible = false;
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            closeedit: function (val) {
                this.editFormVisible = val;
                this.addloading = val;
            },
            onEdit: function (aform) {
                let _this = this;

                // console.log(aform)
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.addloading = true;
                        aform = _this.generateForm(aform);
                        _this.$axios.post(path + '/member/editmember', _this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state === 1) {
                                //更新成功
                                _this.getTableData({});
                                _this.$message({
                                    message: '编辑成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.editFormVisible = false;
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.addloading = false

                        }).catch(function (error) {
                            //更新失败
                            _this.$message({
                                message: '请求失败!' + error.data,
                                type: 'error',
                                duration: 1200
                            });
                            _this.addloading = false;
                        })
                    }
                })
            },
            generateForm(sform) {
                //用来构建相同的参数
                sform.token = common.attachParams('token');
                sform.oid = common.attachParams('oid', 1);
                sform.comid = this.currentRow.id;
                sform.groupid = common.attachParams('groupid', 1);
                sform.cityid = common.attachParams('cityid', 1);
                sform.unionid = common.attachParams('unionid', 1);
                sform.channelid = common.attachParams('channelid', 1);
                sform.loginuin = common.attachParams('loginuin', 1);
                sform.ishdorder = common.attachParams('ishdorder', 1);
                sform.roleid = common.attachParams('loginroleid', 1);
                return sform;
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        this.$router.push('/login');
                    }
                });
            },
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            };
            this.tableheight = common.gwh() - 135;
            let user = sessionStorage.getItem('user');
            // console.log(user)
            if (user) {
                user = JSON.parse(user);
                // console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID_UNION.systemSetting_Park === item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth);
                        this.hideSearch = !common.showSubSearch(item.sub_auth);
                        this.showdelete = common.showSubDel(item.sub_auth);
                        this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                        this.showsetting = common.showSetting(item.sub_auth);
                        // this.showEdit = common.showSubEdit(item.sub_auth);
                        this.showCustomizeEdit = common.showSubEdit(item.sub_auth);

                        if (!this.showsetting && !this.showdelete && !this.showCustomizeEdit) {
                            this.hideOptions = true;
                        }
                        break;
                    }
                }

            }
            this.mapstyle = 'width:inherit;height:' + common.gwh()/2 + 'px';
        },
        activated() {

            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            };
            this.tableheight = common.gwh() - 135;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs.bolinkuniontable.getTableData({});
            // console.log(this)
            // console.log(this.$refs.bolinkuniontable)
            // this.$refs['employeeManage'].activedialog();
            let _this = this;
            axios.all([common.getPName(), common.getCarType() ,common.getUnionList()])
                .then(axios.spread(function (retpname, retcartype, retUnionList) {
                    _this.pname = retpname.data;
                    _this.cartype = retcartype.data;
                    _this.unionList = retUnionList.data;
                    // console.log(ret.data)
                    // console.log(_this.pname)
                }))


        },
        watch: {
            aroles: function (val) {
                this.tableitems_employee[5].subs[0].selectlist = val
            },
            unionList: function (val) {
                this.tableitems[4].subs[0].selectlist = val
            }
        }
    }

</script>