<template>
    <section>
        <!--<common-table-->
        <!--:queryapi="queryapi"-->
        <!--:exportapi="exportapi"-->
        <!--:addapi="addapi"-->
        <!--:editapi="editapi"-->
        <!--:delapi="delapi"-->
        <!--:tableheight="tableheight"-->
        <!--:fieldsstr="fieldsstr"-->
        <!--:tableitems="tableitems"-->
        <!--:btswidth="btswidth"-->
        <!--:hide-export="hideExport"-->
        <!--:searchtitle="searchtitle"-->
        <!--:addtitle="addtitle"-->
        <!--:showdelete="showdelete"-->
        <!--:showresetpwd="showresetpwd"-->
        <!--:showmRefill="showmRefill"-->
        <!--:showModifyCarNumber="showModifyCarNumber"-->
        <!--:hideOptions="hideOptions"-->
        <!--:showEdit="showEdit"-->
        <!--:showCustomizeAdd="showCustomizeAdd"-->
        <!--:hideAdd="hideAdd"-->
        <!--ref="bolinkuniontable"-->
        <!--&gt;</common-table>-->
        <!--工具条-->
        <el-row style="margin-bottom:8px">
            <el-col :span="24" align="left">
                <el-col :span="18" align="left">
                    <el-button type="primary" size="small" @click="handleSearch" v-if="!hideSearch" icon="search">高级查询
                    </el-button>
                </el-col>
                <el-col :span="6" align="right" style="float: right">
                    <el-button @click="refresh" type="text" size="small">刷新&nbsp;&nbsp;</el-button>
                </el-col>
            </el-col>

        </el-row>
        <!--列表-->
        <el-table :data="table" border highlight-current-row style="width:100%;" :height="tableheight"
                  v-loading="loading" @sort-change="sortChange" id="tablearea">

            <el-table-column
                    label="操作"
                    width="83"
                    v-if="!hideOptions"
                    align="center"
                    fixed="left"
                    prop="id">
                <template scope="scope">
                    <el-button v-if="showEdit" size="small" type="text" @click="handleEdit(scope.$index, scope.row)"
                               style="color: #109EFF">
                        {{scope.row.state=='1'?'还原':'漂白'}}
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
            <el-table-column
                    label="编号"
                    prop="id"
                    align="center"
                    width="123">
            </el-table-column>
            <!--<el-table-column-->
            <!--label="手机"-->
            <!--prop="phone"-->
            <!--align="center"-->
            <!--width="123">-->
            <!--</el-table-column>-->
            <el-table-column
                    label="车牌号"
                    prop="car_number"
                    align="center"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="序列号"
                    prop="black_uuid"
                    align="center"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="state"
                    align="center"
                    width="123">
                <template scope="scope">
                    {{scope.row.state=='1'?'漂白':'正常'}}
                </template>
            </el-table-column>
            <el-table-column
                    label="所属车场"
                    prop="comid"
                    align="center"
                    width="150">
                <template scope="scope">
                    {{nameformatpark(scope.row, parklist)}}
                </template>
            </el-table-column>

            <el-table-column
                    label="新建时间"
                    prop="ctime"
                    align="center"
                    width="180">
                <template scope="scope">
                    {{common.dateformat(scope.row.ctime)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="修改时间"
                    prop="utime"
                    align="center"
                    width="180">
                <template scope="scope">
                    {{common.dateformat(scope.row.utime)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="备注"
                    prop="remark"
                    align="center"
                    width="150">
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" align="bottom" style="margin-top:5px;margin-bottom:5px">
            <el-col :span="24" align="right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage" :page-sizes="[20, 40, 80]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </el-col>
        </el-col>

        <!--高级查询-->
        <complex-search
                :searchVisible="searchFormVisible"
                :title="searchtitle"
                :searchitems="tableitems"
                v-on:searchdialog="closesearch"
                v-on:search="onSearch"
                ref="search">
        </complex-search>
        <!--修改状态-->
        <el-dialog
                title="修改状态"
                :visible.sync="showEditDialog"
                width="30%">
            <el-form ref="editform" label-width="120px" style="margin-bottom:-30px">
                {{this.editText}}
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handleEditState" :loading="resetloading">确 定</el-button>
        </span>
        </el-dialog>

    </section>
</template>

<script>
    import {
        path, blackStateType
    } from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import ComplexSearch from '../../components/ComplexSearch'
    import axios from 'axios'

    export default {
        components: {
            ComplexSearch,
        },
        data() {
            return {
                parklist: [],
                table: [],
                orderfield: '',
                ef: 'editref',
                af: 'addref',
                searchFormVisible: false,
                table: [],
                pageSize: 20,
                currentPage: 1,
                orderby: 'desc',
                orderfield: 'id',
                orderby: 'desc',
                sform: {},
                loading: false,
                rowdata: {},
                total: 0,
                showEditDialog: false,
                editform: {},

                loading: false,
                resetloading: false,
                showresetpwd: false,
                hideExport: false,
                tableheight: common.gwh() - 143,
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showModifyCarNumber: true,
                showmRefill: true,
                showCustomizeAdd: false,
                hideAdd: true,
                queryapi: '/cityblackuser/query',
                exportapi: '/vip/exportExcel',
                addapi: '/vip/add',
                editapi: '/cityblackuser/edit',
                delapi: '/vip/delete',
                parkid: '',
                currentIndex: 0,
                currentRow: '',
                showResetCarnumber: false,
                showRefill: false,
                showRegis: false,
                resetCarnumber: '',
                hideSearch: false,
                btswidth: '200',
                fieldsstr: 'id__mobile__car_number__black_uuid__state__comid__ctime__utime__remark',
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
                                label: '手机',
                                prop: 'mobile',
                                width: '123',
                                type: 'str',
                                searchable: false,
                                hidden: true,
                                unsortable: true,
                                align: 'center',
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
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '序列号',
                                prop: 'black_uuid',
                                width: '150',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '状态',
                                prop: 'state',
                                width: '150',
                                type: 'selection',
                                selectlist: blackStateType,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    return common.nameformat(row, blackStateType, 'state')
                                }
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '所属车场',
                                prop: 'comid',
                                width: '150',
                                type: 'selection',
                                selectlist: this.parklist,
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                                format: (row) => {
                                    return common.nameformat(row, this.parklist, 'comid')
                                }
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '新建时间',
                                prop: 'ctime',
                                width: '180',
                                type: 'date',

                                searchable: true,
                                addable: true,
                                unsortable: false,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.ctime);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '修改时间',
                                prop: 'utime',
                                width: '180',
                                type: 'date',


                                searchable: true,

                                unsortable: false,
                                align: 'center'
                                ,
                                format: function (row) {
                                    return common.dateformat(row.utime);
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
                searchtitle: '高级查询',
                addtitle: '注册会员',
                readonly: true,
                datereadonly: true,
                editText: '',
                currentState: '',
                currentId: '',
            }
        },
        methods: {

            handleEditState() {
                let _this = this;
                this.loading = true;
                _this.$axios.get(path + _this.editapi + '?state=' + _this.currentState + '&id=' + this.currentId)
                    .then(function (response) {
                        _this.loading = false;
                        if (response.data.state == 1) {
                            _this.$message({
                                message: response.data.msg + '!',
                                type: 'success',
                                duration: 600
                            });
                            _this.getTableData(_this.sform);
                        } else {
                            _this.$message({
                                message: msg,
                                type: 'error',
                                duration: 1200
                            });
                        }

                    })
                    .catch(function (error) {
                        _this.loading = false;
                        _this.$message({
                            message: error,
                            type: 'error',
                            duration: 1200
                        });
                    });
                this.showEditDialog = false;
            },
            handleEdit(index, row) {
                this.showEditDialog = true;
                this.currentState = row.state;
                this.currentId = row.id;
                if (row.state == 1) {
                    this.editText = '确定要还原吗？'
                } else {
                    this.editText = '确定要漂白吗？'
                }
            },
            //分页变动
            handleSizeChange(val) {
                this.pageSize = val;
                // console.log('size change');
                this.getTableData(this.sform);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                // console.log('page change');
                this.sform.date = this.searchDate;
                this.getTableData(this.sform);
            },
            //排序变动
            sortChange(val) {
                if (val.order != null && val.order.substring(0, 1) == "a") {
                    this.orderby = "asc";
                } else {
                    this.orderby = "desc";
                }
                this.orderfield = val.prop;
                console.log('sort change');
                this.getTableData(this.sform);
            },
            //拉取表格数据
            getTableData(sform) {
                let vm = this;
                this.loading = true;
                let api = this.queryapi;

                sform.rp = this.pageSize;
                sform.page = this.currentPage;
                sform.orderby = this.orderby;
                sform.orderfield = this.orderfield;
                sform.fieldsstr = this.fieldsstr;
                sform.comid = sessionStorage.getItem('comid') == 'undefined' ? '' : sessionStorage.getItem('comid');
                sform.groupid = sessionStorage.getItem('groupid') == 'undefined' ? '' : sessionStorage.getItem('groupid');
                sform.cityid = sessionStorage.getItem('cityid') == 'undefined' ? '' : sessionStorage.getItem('cityid');
                sform.unionid = sessionStorage.getItem('unionid') == 'undefined' ? '' : sessionStorage.getItem('unionid');
                sform.channelid = sessionStorage.getItem('channelid') == 'undefined' ? '' : sessionStorage.getItem('channelid');
                sform.loginuin = sessionStorage.getItem('loginuin') == 'undefined' ? '' : sessionStorage.getItem('loginuin');
                sform.ishdorder = sessionStorage.getItem('ishdorder') == 'undefined' ? '' : sessionStorage.getItem('ishdorder');
                sform.token = sessionStorage.getItem('token') == 'undefined' ? '' : sessionStorage.getItem('token');
                sform.roleid = sessionStorage.getItem('loginroleid') == 'undefined' ? '' : sessionStorage.getItem('loginroleid');

                vm.$axios.post(path + api, vm.$qs.stringify(sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 150)
                    } else {
                        if (ret.total == 0) {
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
            //高级查询
            handleSearch() {
                //弹出高级查询界面
                this.searchFormVisible = true;
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
            onSearch: function (sform) {
                //在这里得到表单项,提交查询
                this.sform = sform
                this.getTableData(sform)
            },
            closesearch: function (val) {
                this.searchFormVisible = val;
            },
            nameformatpark: function (row, list) {
                for (let item of list) {
                    // console.log(item.value_no+' === '+row.comid)
                    if (item.value_no == row.comid) {
                        return item.value_name;
                    }
                }
            }
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
                for (let item of user.authlist) {
                    if (AUTH_ID_UNION.member_BlackList == item.auth_id) {
                        console.log(item.sub_auth)
                        // this.hideExport = !common.showSubExport(item.sub_auth);
                        // this.hideSearch = !common.showSubSearch(item.sub_auth);
                        // this.showdelete = common.showSubDel(item.sub_auth);
                        // this.showmRefill = common.showSubReFill(item.sub_auth);
                        // this.showModifyCarNumber = common.showSubUpdate(item.sub_auth);
                        this.showEdit = common.showSubEdit(item.sub_auth);
                        // this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                        if (!this.showEdit) {
                            this.hideOptions = true;
                        }
                        break;
                    }
                }

            }
        },
        activated() {

            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            };
            this.tableheight = common.gwh() - 135;
            // this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            // this.$refs['bolinkuniontable'].getTableData({});
            this.getTableData({});
            this.sform = {};

        },
        watch: {
            parklist: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        },
        created() {
            let _this = this;
            _this.$nextTick(function () {
                axios.all([common.getAllParks()])
                    .then(axios.spread(function (ret) {
                        console.log(ret)
                        _this.parklist = ret.data;
                    }))
            })

        }
    }

</script>