<template>
    <section>
        <!--工具条-->
        <el-row style="margin-bottom:8px" v-if="!hideTool">
            <el-col :span="24" v-if="!showRight" align="left">
                <el-col :span="18" align="left">

                    <div v-if="showRefillInfo" style="display:inline;margin-right:100px;float: left">
                        <el-input v-model="shouldpay" style="width:180px;background:white;" disabled>
                            <template slot="prepend">应收</template>
                        </el-input>
                        <el-input v-model="actualpay" style="width:180px;background:white;" disabled>
                            <template slot="prepend">实收</template>
                        </el-input>
                    </div>
                    <div v-if="showParkInfo" style="display:inline;margin-right:50px;float: left">
                        <el-input v-model="parkspace_park" style="width:150px;background:white;margin-right: 0.5px;"
                                  disabled>
                            <template slot="prepend">场内停车</template>
                        </el-input>
                        <el-input v-model="parkspace_park" style="width:150px;background:white;" disabled>
                            <template slot="prepend">临停车</template>
                        </el-input>
                        <el-input v-model="parkspace_blank" style="width:150px;background:white;" disabled>
                            <template slot="prepend">空车位</template>
                        </el-input>
                    </div>
                    <el-button type="primary" size="small" @click="handleCustomizeAdd" v-if="showCustomizeAdd">
                        {{addtitle}}
                    </el-button>
                    <el-button type="primary" size="small" @click="handleSearch" v-if="!hideSearch" icon="search">高级查询
                    </el-button>
                    <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                        <el-button type="primary" size="small" @click="handleExport" v-if="!hideExport">导出</el-button>
                    </el-tooltip>
                    <el-button type="primary" size="small" @click="handleAdd" v-if="!hideAdd">{{addtitle}}</el-button>
                    <!--<el-button type="primary" size="small" @click="handlePrint()">打印</el-button>-->


                    <div v-if="showdateSelector" style="float: left;margin-right: 10px;">
                        <el-select v-model="currentcollect" placeholder="请选择收费员" @change="changeanalysisdatecollect"
                                   style="float: left;margin-right: 30px;">
                            <el-option
                                    v-for="item in collectors"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                        <span class="demonstration">日期</span>
                        <el-date-picker
                                v-model="datesselector"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2"
                                @change="changeanalysisdate">
                        </el-date-picker>
                    </div>

                </el-col>

                <el-col :span="6" align="right" style="float: right">
                    <!--<span style="color:red;font-size:8px">提示:刷新后会重置高级查询</span>-->
                    <!--<el-button @click="reset" type="primary" size="small">清空高级查询</el-button>-->
                    <el-button @click="refresh" type="text" size="small">刷新&nbsp;&nbsp;</el-button>
                </el-col>
            </el-col>
            <el-col :span="24" v-if="showRight">
                <el-col :span="4" align="left" style="height:36px;padding-top:8px">
                    <span style="font-size:15px;font-weight:bold" v-if="showLeftTitle">{{leftTitle}}</span>
                </el-col>
                <el-col :span="20" align="right">
                    <el-button type="primary" @click="handleSearch" size="small" v-if="!hideSearch" align="center">
                        高级查询
                    </el-button>
                    <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                        <el-button type="primary" @click="handleExport" size="small" v-if="!hideExport">导出</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="handleAdd" size="small" v-if="!hideAdd">{{addtitle}}</el-button>
                    <el-button @click="refresh" type="text" size="small">刷新</el-button>

                </el-col>
            </el-col>
        </el-row>
        <!--列表-->
        <el-table :data="table" border highlight-current-row style="width:100%;" height="806"
                  v-loading="loading" @sort-change="sortChange" id="tablearea">

            <el-table-column label="操作" :width="btswidth" v-if="!hideOptions" align="center" fixed="left">
                <template scope="scope">
                    <el-button v-if="showEdit" size="small" type="text" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="showShopEdit" size="small" type="text" @click="editShop(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="showModifyCarNumber" size="small" type="text"
                               @click="handleModifyCarNumber(scope.$index, scope.row)">修改车牌
                    </el-button>
                    <el-button v-if="showsetting" size="small" type="text"
                               @click="handlesetting(scope.$index, scope.row)">设置
                    </el-button>
                    <el-button v-if="showqrurl" size="small" type="text" @click="handleqrurl(scope.$index, scope.row)">
                        生成车场二维码
                    </el-button>
                    <el-button v-if="showdelete" size="small" type="text" @click="openDelete(scope.$index, scope.row)">
                        <span style="color:red">删除</span></el-button>
                    <el-button v-if="showmapdialog" size="small" type="text"
                               @click="handlemap(scope.$index, scope.row)">车场定位
                    </el-button>
                    <el-button v-if="showresetpwd" size="small" type="text"
                               @click="handleresetpwd(scope.$index, scope.row)">重置密码
                    </el-button>
                    <!--<el-button v-if="showbrake" size="small" type="text"
                               @click="handlebrake(scope.$index, scope.row)"><span style="color:#008F4C">道闸</span>
                    </el-button>-->
                    <el-button v-if="showmRefill" size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">续费
                    </el-button>
                    <el-button v-if="showPermission" size="small" type="text"
                               @click="handlePermission(scope.$index, scope.row)">编辑权限
                    </el-button>
                    <el-button v-if="showSettingFee" size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">收费设置
                    </el-button>
                    <el-button v-if="showCommutime" size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">上班时间
                    </el-button>

                    <!--
                    <el-button
                        v-for="bt in bts"
                        v-on:click="bt.func"
                    >{{bt.name}}</el-button>
                    -->
                </template>
            </el-table-column>

            <el-table-column
                    align="center"
                    type="index"
                    width="83"
                    label="索引"
                    fixed="left">
            </el-table-column>

            <div v-for="items in tableitems" >
                <div v-if="items.hasSubs">
                    <el-table-column
                            :label="items.label"
                            header-align="center">

                        <!--<div v-for="item in items" >-->
                        <!--<div v-if="item.hasSubs">-->
                        <!--<el-table-column-->
                        <!--:label="item.label"-->
                        <!--header-align="center">-->

                        <!--<el-table-column-->
                        <!--v-for="tableitem in item.subs"-->
                        <!--v-if="!tableitem.hidden"-->
                        <!--:prop="tableitem.prop"-->
                        <!--:label="tableitem.label"-->
                        <!--header-align="center"-->
                        <!--:align="tableitem.align"-->
                        <!--:sortable="!tableitem.unsortable"-->
                        <!--:width="tableitem.width"-->
                        <!--:formatter="tableitem.format"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--</el-table-column>-->
                        <!--</div>-->
                        <!--<div v-if="!item.hasSubs">-->
                        <!--<el-table-column-->
                        <!--v-for="tableitem in item.subs"-->
                        <!--v-if="!tableitem.hidden"-->
                        <!--:prop="tableitem.prop"-->
                        <!--:label="tableitem.label"-->
                        <!--header-align="center"-->
                        <!--:align="tableitem.align"-->
                        <!--:sortable="!tableitem.unsortable"-->
                        <!--:width="tableitem.width"-->
                        <!--:formatter="tableitem.format"-->
                        <!--&gt;-->

                        <!--</el-table-column>-->
                        <!--</div>-->
                        <!--</div>-->

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
                    </el-table-column>
                </div>
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
                        <!--<template scope="scope" v-if="items.hasSubs">-->
                        <!--<span class="link-type" @click="handleShowImg(scope.$index, scope.row )">123333</span>-->
                        <!--</template>-->
                    </el-table-column>
                </div>
            </div>

            <el-table-column label="操作" :width="btswidth" v-if="showImg" align="center">
                <!--<el-button @click.native="showDetail(row)">查看详情</el-button>-->
                <template scope="scope">
                    <!--<span class="link-type" @click="handleShowImg(scope.$index, scope.row)" v-if="showImg">123</span>-->
                    <el-button size="small" type="text" style="color: #109EFF;"
                               @click="handleShowImg(scope.$index, scope.row)">
                        查看图片
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" v-if="!hidePagination" align="bottom" style="margin-top:5px;margin-bottom:5px">
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

        <!--表格编辑-->
        <edit-form
                :editVisible="editFormVisible"
                :edititems="tableitems"
                :editloading="editloading"
                :editFormRules="editFormRules"
                :rowdata="rowdata"
                :dialogsize="dialogsize"
                v-on:editdialog="closeedit"
                v-on:edit="onEdit"
                :ref="ef">
        </edit-form>

        <!--表格添加-->
        <add-form
                :addtitle="addtitle"
                :addVisible="addFormVisible"
                :addloading="addloading"
                :additems="tableitems"
                :addFormRules="typeof(addFormRules)=='undefined'?editFormRules:addFormRules"
                :dialogsize="dialogsize"
                v-on:adddialog="closeadd"
                v-on:add="onAdd"
                :ref="af">
        </add-form>

        <!--删除提示框-->
        <el-dialog
                title="提示"
                v-model="delVisible"
                size="tiny"
                custom-class="deleteTip">
            <div class="el-message-box__status el-icon-warning"></div>
            <br/>
            <div style="margin-left:50px;vertical-align:middle;">确定删除吗?此操作不可恢复!</div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="handledelete" size="small">确 定</el-button>
			</span>
        </el-dialog>

        <!--地图-->
        <input v-show="false" v-model.number="center.lng">
        <input v-show="false" v-model.number="center.lat">

        <el-dialog v-model="mapVisible" @close="dclose" top="10%">
            <div>
                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="16" @click="clickmap"
                           @dblclick="makePoint" :scroll-wheel-zoom="true" :double-click-zoom="false">

                    <bm-marker v-if="showMarker" :position="marker" animation="BMAP_ANIMATION_DROP" :label="label"
                               :dragging="true" @mouseup="mouseup"></bm-marker>
                    <!--<bm-local-search :keyword="keyword" :auto-viewport="true" :selectFirstResult="true" :pageCapacity="ps" :resultPanel="false" location="北京"></bm-local-search>-->
                </baidu-map>
            </div>
            <el-col :span="24" style="margin-bottom: 10px;margin-top:10px">
                <el-col :span="16">
                    <el-input
                            placeholder="请输入关键字"
                            v-model="keyword"
                            style="width:150px;"
                            size="small">
                    </el-input>
                    <el-button type="primary" icon="search" size="small" @click="sclick"></el-button>
                </el-col>
                <el-col :span="8" align="right">
                    <el-button @click="mapVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="modifyPosition" size="small" :loading="maploading">保存</el-button>
                </el-col>
            </el-col>
        </el-dialog>

        <!--重置密码-->
        <el-dialog
                title="重置密码"
                v-model="resetPwdVisible"
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
				<el-button type="primary" size="small" @click="resetPwd" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>

        <!--<el-dialog title="车辆图片" v-model="imgDialog">-->
        <!--<img v-bind:src="imgdialog_url" width="400px" height="300px"/>-->
        <!--&lt;!&ndash;<img src="https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg"/>&ndash;&gt;-->
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="imgDialog = false" size="small">确 认</el-button>-->
        <!--</span>-->
        <!--</el-dialog>-->
    </section>
</template>

<script>
    import {path} from '../api/api';
    import common from '../common/js/common'
    import ComplexSearch from './ComplexSearch'
    import EditForm from './EditForm'
    import AddForm from './AddForm'
    import Printd from 'printd'

    export default {
        components: {
            ComplexSearch, EditForm, AddForm
        },
        data() {
            return {
                ef: 'editref',
                af: 'addref',
                searchFormVisible: false,
                editFormVisible: false,
                addFormVisible: false,
                mapVisible: false,
                delVisible: false,
                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                table: [],
                loading: false,
                resetloading: false,
                editloading: false,
                addloading: false,
                showMarker: false,
                //showMap:false,
                maploading: false,
                centralpaymentlist: '',
                searchForm: {},
                tempSearchForm: {},
                collectors: [],
                currentcollect: '',
                sform: {},
                rowdata: {},

                center: {
                    lat: 0,
                    lng: 0
                },
                marker: {
                    lat: 0,
                    lng: 0
                },
                mapstyle: '',
                mapheight: '',
                mapwidth: '',
                rowid: 0,
                ps: 1,
                keyword: '',
                cityName: '',
                shouldpay: '0.00 元',
                actualpay: '0.00 元',
                parkspace_blank: '0辆',
                parkspace_park: '0辆',
                label: {content: 'Marker Label', opts: {offset: {width: 20, height: -10}}},
                centralpayment: -3,
                todayTotal: '',
                balance: '',
                analysisdate: '',
                datesselector: '',
                searchDate: '',
                analysisdateopt: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                //start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                                this.sform.page = 1;
                            }
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
                resetPwdVisible: false,
                // imgDialog: false,
                // imgdialog_url: '',
                pwd1: '',
                pwd2: '',
                currentdate: '',
                currentcollect: ''
            }
        },
        props: ['tableitems', 'fieldsstr', 'hideOptions', 'hideExport', 'hideAdd', 'showCustomizeAdd', 'hideSearch', 'showRight', 'showLeftTitle', 'leftTitle', 'editFormRules', 'addFormRules',
            'tableheight', 'bts', 'btswidth', 'queryapi', 'queryparams', 'exportapi', 'editapi', 'addapi', 'resetapi', 'delapi', 'searchtitle', 'addtitle', 'addfailmsg',
            'dialogsize', 'showqrurl', 'showdelete', 'showmapdialog', 'showMap', 'showsetting', 'hidePagination', 'showRefillInfo', 'showParkInfo', 'hideTool', 'showanalysisdate', 'showresetpwd', 'showdateSelector',
            'showModifyCarNumber', 'showmRefill', 'showEdit', 'showImg', 'showCommutime', 'showSettingFee', 'showPermission', 'imgapi','showShopEdit'],
        methods: {
            //控制表格样式
            rowstyle(row, index) {
                if (index == 0) {
                    return 'indextext'
                }
            },
            //刷新页面
            refresh() {
                if (this.showdateSelector) {

                    //this.$extend(this.sform,{'date':this.datesselector})
                    this.sform.date = this.searchDate;
                    this.sform.out_uid = this.currentcollect;
                    this.getTableData(this.sform);
                } else {
                    this.getTableData(this.sform);
                }
                //清空高级查询表单项内容
                this.$message({
                    message: '刷新成功!',
                    type: 'success',
                    duration: 600
                });
            },
            //重置高级查询
            reset() {
                console.log('reset')
                this.getTableData({});
                //清空高级查询表单项内容
                this.$refs['search'].resetSearch()
                this.sform = common.clone(this.tempSearchForm)
                this.$message({
                    message: '清空成功!',
                    type: 'success',
                    duration: 600
                });
            },
            //分页变动
            handleSizeChange(val) {
                this.pageSize = val;
                console.log('size change')
                this.getTableData(this.sform);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log('page change')
                this.sform.date = this.searchDate
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
                console.log('sort change')
                this.getTableData(this.sform);
            },
            //拉取表格数据
            getTableData(sform) {
                var vm = this;
                this.loading = true;
                var api = this.queryapi;

                sform.rp = this.pageSize
                sform.page = this.currentPage
                sform.orderby = this.orderby
                sform.orderfield = this.orderfield
                sform.fieldsstr = this.fieldsstr
                sform.comid = sessionStorage.getItem('comid')
                sform.groupid = sessionStorage.getItem('groupid')
                sform.cityid = sessionStorage.getItem('cityid')
                sform.unionid = sessionStorage.getItem('unionid')
                sform.channelid = sessionStorage.getItem('channelid')
                sform.loginuin = sessionStorage.getItem('loginuin')
                sform.ishdorder = sessionStorage.getItem('ishdorder')
                sform.token = sessionStorage.getItem('token')

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
                        if (ret.actReceivable != undefined) {
                            //月卡续费记录实收
                            vm.actualpay = ret.actReceivable + '元'
                        }
                        if (ret.amountReceivable != undefined) {
                            //月卡续费记录应收
                            vm.shouldpay = ret.amountReceivable + '元'
                        }
                        if (ret.blank != undefined) {
                            //订单记录 车位统计-空车位
                            vm.parkspace_blank = ret.blank
                        }
                        if (ret.parktotal != undefined) {
                            //订单记录 车位统计-场内停车
                            vm.parkspace_park = ret.parktotal
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
                //全平台服务商
                var vm = this
                var user = sessionStorage.getItem('user')
                // console.log('-----------------------')
                user = JSON.parse(user)
                for (var i = 0; i < this.tableitems.length; i++) {
                    if (this.tableitems[i].customSelect == 'parkserver') {
                        //重置该selectlist,根据
                        var params;
                        if (user.roleid == 1) {
                            if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')}
                            }
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')}
                            } else if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')}
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/serverlist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        vm.$axios.post(path + '/getdata/serverlist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error)
                            }, 150)
                        })
                    } else if (this.tableitems[i].customSelect == 'park') {
                        var params;
                        var params;
                        if (user.roleid == 1) {
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')}
                            } else if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')}
                            }
                        } else if (user.roleid == 3) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')}
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/parklist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        // console.log('-----------------------')
                        vm.$axios.post(path + '/getdata/parklist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error)
                            }, 150)
                        })
                    }
                }
                this.searchFormVisible = true;
            },
            closesearch: function (val) {
                this.searchFormVisible = val;
            },
            onSearch: function (sform) {
                //在这里得到表单项,提交查询
                this.sform = sform
                this.getTableData(sform)
            },
            //表格编辑
            handleEdit(index, row) {
                //拿到当前行数据row,传递给表单编辑子组件,子组建中包括重置和保存按钮
                this.rowdata = row;
                var vm = this
                var user = sessionStorage.getItem('user')
                user = JSON.parse(user)
                for (var i = 0; i < this.tableitems.length; i++) {
                    if (this.tableitems[i].customSelect == 'parkserver') {
                        //重置该selectlist,根据
                        var params;
                        if (user.roleid == 1) {
                            if (this.tableitems[i].commonSelect == 'local_all') {
                                params = {'com_id': row.id, 'state': 1, 'token': sessionStorage.getItem('token')}
                            } else if (this.tableitems[i].commonSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')}
                            }
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].commonSelect == 'local_available') {
                                params = {'state': 1, 'token': sessionStorage.getItem('token')}
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/serverlist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        vm.$axios.post(path + '/getdata/serverlist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error)
                            }, 150)
                        })
                    }
                }
                //获取角色编号,获取rowid,
                this.editFormVisible = true;
            },
            //
            handleqrurl(index, row) {
                //调用父组件的方法,传row
                this.$emit('qrurl', row.park_id)
            },
            //单击设置触发
            handlesetting(index, row) {
                //调用父组件的方法,传row
                this.$emit('showSetting', row)
            },
            //导出表格数据
            handleExport() {
                var vm = this;
                var api = this.exportapi;
                var params = ''
                if (common.getLength(this.sform) == 0) {
                    params = 'fieldsstr=' + this.fieldsstr + '&token=' + sessionStorage.getItem('token')
                } else {
                    for (var x in this.sform) {
                        //console.log(this.sform[x])
                        params += x + '=' + this.sform[x] + '&'
                    }
                }
                console.log(params)
                if (params.indexOf('comid') > -1) {
                    window.open(path + api + '?' + params);
                } else {
                    window.open(path + api + '?' + params + '&comid=' + sessionStorage.getItem('comid'));
                }
                // window.open(path + api + '?' + params + '&comid=' + sessionStorage.getItem('comid'));
                //window.location.href(path+api + '?fieldsstr='+this.fieldsstr)
                //this.$.get(path+api,params)
            },
            closeedit: function (val) {
                this.editFormVisible = val
                this.editloading = val
            },
            onEdit: function (eform) {
                //发送ajax,提交表单更新
                var vm = this;
                var api = this.editapi;
                var qform = this.sform;

                eform.token = sessionStorage.getItem('token')
                eform.comid = sessionStorage.getItem('comid')
                eform.groupid = sessionStorage.getItem('groupid')
                eform.cityid = sessionStorage.getItem('cityid')
                eform.unionid = sessionStorage.getItem('unionid')
                eform.channelid = sessionStorage.getItem('channelid')
                eform.loginuin = sessionStorage.getItem('loginuin')


                this.$refs.editref.$refs.editForm.validate((valid) => {
                    if (valid) {
                        vm.editloading = true;

                        vm.$axios.post(path + api, vm.$qs.stringify(eform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret.validate != 'undefined' && ret.validate == '1') {
                                //过期.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录过期,请重新登录!')
                                }, 100)
                            } else if (ret.validate != 'undefined' && ret.validate == '2') {
                                //令牌无效.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录异常,请重新登录!')
                                }, 100)
                            } else {
                                if (ret > 0 || ret.state == 1) {
                                    //更新成功
                                    vm.getTableData(qform);
                                    vm.$message({
                                        message: '更新成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    vm.editFormVisible = false;
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: '更新失败!'+ret.msg,
                                        type: 'error',
                                        duration: 600
                                    });
                                }
                                setTimeout('vm.editloading=false', 5000)
                            }
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error)
                            }, 150)
                        })
                    }
                });
            },
            handleCustomizeAdd() {
                this.$emit('customizeadd')
            },
            handlePrint(elem) {
                // var mywindow = window.open('', 'PRINT', 'height=800,width=1200');
                //
                // // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
                // // mywindow.document.write('</head><body >');
                // // mywindow.document.write('<h1>' + document.title  + '</h1>');
                // // mywindow.document.write(document.getElementById(elem).innerHTML);
                // // mywindow.document.write('</body></html>');
                //
                // mywindow.document.write(this.$el.innerHTML);
                //
                // mywindow.document.close(); // necessary for IE >= 10
                // mywindow.focus(); // necessary for IE >= 10*/
                //
                // mywindow.print();
                // mywindow.close();


                // let subOutputRankPrint = document.getElementById('tablearea');
                // console.log(subOutputRankPrint.innerHTML);
                // let newContent =subOutputRankPrint.innerHTML;
                // let oldContent = document.body.innerHTML;
                // document.body.innerHTML = newContent;
                // window.print();
                // window.location.reload();
                // document.body.innerHTML = oldContent;
                // return false;

                const cssText = 'tablearea {font-size: 85%;font-family: sans-serif;border-spacing: 0;border-collapse: collapse;}'
                const d = new Printd()

                // opens the "print dialog" of your browser to print the element
                d.print(document.getElementById('tablearea'), cssText)
            },
            handleAdd() {
                var vm = this
                var user = sessionStorage.getItem('user')
                user = JSON.parse(user)
                for (var i = 0; i < this.tableitems.length; i++) {
                    if (this.tableitems[i].customSelect == 'parkserver') {
                        //重置该selectlist,根据
                        var params;
                        if (user.roleid == 1) {
                            if (this.tableitems[i].commonSelect == 'local_all') {
                                params = {'com_id': row.id, 'state': 1, 'token': sessionStorage.getItem('token')}
                            } else if (this.tableitems[i].commonSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')}
                            }
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].commonSelect == 'local_available') {
                                params = {'state': 1, 'token': sessionStorage.getItem('token')}
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/serverlist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        vm.$axios.post(path + '/getdata/serverlist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error)
                            }, 150)
                        })
                    }
                }
                this.addFormVisible = true
            },
            closeadd(val) {
                this.addFormVisible = val
                this.addLoading = val;
            },
            onAdd(aform) {
                console.log(aform)
                //发送请求,添加一条记录
                var vm = this;
                var api = this.addapi;
                var qform = this.sform;
                var msg = this.addfailmsg;

                aform.token = sessionStorage.getItem('token')
                aform.oid = sessionStorage.getItem('oid')
                aform.comid = sessionStorage.getItem('comid')
                aform.groupid = sessionStorage.getItem('groupid')
                aform.cityid = sessionStorage.getItem('cityid')
                aform.unionid = sessionStorage.getItem('unionid')
                aform.channelid = sessionStorage.getItem('channelid')
                aform.loginuin = sessionStorage.getItem('loginuin')

                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        vm.addloading = true

                        vm.$axios.post(path + api, vm.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret.validate != 'undefined' && ret.validate == '1') {
                                //过期.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录过期,请重新登录!')
                                }, 100)
                            } else if (ret.validate != 'undefined' && ret.validate == '2') {
                                //令牌无效.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录异常,请重新登录!')
                                }, 100)
                            } else {
                                if (ret > 0 || ret.state == 1) {
                                    //更新成功
                                    vm.getTableData(qform);
                                    vm.$message({
                                        message: '添加成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    vm.addFormVisible = false;
                                    vm.addloading = false
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: msg,
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
                    }
                });
            },

            openDelete(index, row) {
                this.rowid = row.id
                this.delVisible = true
            },
            //删除
            handledelete() {
                var vm = this;
                var api = this.delapi;
                var qform = this.sform;
                var dform = {'id': this.rowid, 'token': sessionStorage.getItem('token')}
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
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        console.log(ret)
                        if (ret > 0 || ret.state == 1) {
                            // if (ret > 0) {
                            //删除成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '删除成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.delVisible = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: "更新失败"+ret.msg,
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
            handlemap(index, row) {

                if (row.lat == null || row.lat == 'null') {
                    row.lat = 39.915797;
                    row.lng = 116.404119;
                }
                this.rowid = row.id
                this.label.content = row.name
                this.center.lat = row.lat
                this.center.lng = row.lng
                this.marker.lat = row.lat
                this.marker.lng = row.lng
                this.showMap = true
                this.showMarker = true
                this.mapVisible = true
                console.log(this.center.lat, this.center.lng)
            },
            handleShowImg(index, row) {
                // alert(index + '>' + row.id)
                if (row.liftrod_id == undefined) {
                    //订单图片
                    this.$emit('showImg_Order', index, row)
                } else {
                    //抬杆图片
                    this.$emit('showImg_Pole', index, row)
                }

                // this.imgdialog_url = path + this.imgapi + '?liftrodid=' + row.liftrod_id + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token')
                // console.log(this.imgdialog_url)
                // this.imgDialog = true
            },
            handleModifyCarNumber(index, row) {
                //修改车牌号
                this.$emit('showreset', index, row)
            },
            handleRefill(index, row) {
                //月卡续费
                // alert('功能正在开发，请耐心等待')
                this.$emit('showrefill', index, row)
            },
            editShop(index,row){
            	this.$emit('showeditshop', index, row)
            },
            handlePermission(index, row) {
                //员工权限-角色管理-编辑权限
                // alert('功能正在开发，请耐心等待')
                this.$emit('showRolePermission', index, row)
            },
            handleresetpwd(index, row) {
                this.rowid = row.id
                this.pwd1 = ''
                this.pwd2 = ''
                //显示充值密码对话框
                this.resetPwdVisible = true
            },
            resetPwd() {

                var qform = this.sform;
                var vm = this
                var api = this.resetapi;
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
                this.resetloading = true
                var rform = {
                    'newpass': this.pwd1,
                    'confirmpass': this.pwd2,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token')
                }
                vm.$axios.post(path + api, vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret > 0 || ret.state == 1) {
                            //更新成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false
                            vm.resetloading = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!'+ret.msg,
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
            modifyPosition() {
                var vm = this;
                var api = this.editapi;
                var eform = {
                    'id': this.rowid,
                    'lng': this.marker.lng,
                    'lat': this.marker.lat,
                    'token': sessionStorage.getItem('token')
                }
                var qform = this.sform;
                //发起修改位置
                vm.maploading = true;

                vm.$axios.post(path + api, vm.$qs.stringify(eform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 100)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 100)
                    } else {
                        if (ret > 0) {
                            //更新成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '更新成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.mapVisible = false;
                            vm.maploading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!'+ret.msg,
                                type: 'error',
                                duration: 600
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error)
                    }, 150)
                })

            },
            makePoint(type) {
                this.showMarker = false
                this.marker.lat = type.point.lat
                this.marker.lng = type.point.lng
                this.showMarker = true
                //console.log(this.marker.lat,this.marker.lng)
            },
            mouseup(type) {
                this.marker.lat = type.point.lat
                this.marker.lng = type.point.lng
                //console.log(this.marker.lat,this.marker.lng)
            },
            clickmap(type) {
                //console.log(type.point)
            },
            sclick() {
                var vm = this
                var myGeo = new BMap.Geocoder();

                myGeo.getPoint(this.keyword, function (point) {
                    if (point) {
                        if (point.lat == vm.center.lat && point.lng == vm.center.lng) {
                            alert("输入的地址相同或地址不正确!");
                        } else {
                            vm.center.lat = point.lat
                            vm.center.lng = point.lng
                            vm.showMarker = false
                            vm.label.content = vm.keyword
                            vm.marker.lat = point.lat
                            vm.marker.lng = point.lng
                            vm.showMarker = true
                        }
                    } else {
                        alert("您选择地址没有解析到结果!");
                    }
                }, "中国");
            },
            dclose() {
                console.log('close')
                setTimeout(() => {
                    this.showMarker = false;
                    this.showMap = false;
                    this.keyword = ''
                }, 100)
            },
            mapready(map) {
                alert("map render")
            },
            mapSearch() {

            },
            changeanalysisdatecollect(val) {
                console.log(val);
                this.currentcollect = val;
                if (this.currentdate == '') {
                    let start = new Date();
                    this.currentdate = start.getFullYear() + '-' + (start.getMonth() + 1 > 9 ? start.getMonth() + 1 : '0' + (start.getMonth() + 1)) + '-' + (start.getDay()>9?start.getDay():'0'+start.getDay())+' 00:00:00至'
                        + start.getFullYear() + '-' + (start.getMonth() + 1 > 9 ? start.getMonth() + 1 : '0' + (start.getMonth() + 1)) + '-' + (start.getDay()>9?start.getDay():'0'+start.getDay())+' 23:59:59'
                }
                let form = {'date': this.currentdate, 'out_uid': val};
                this.currentPage = 1;
                this.getTableData(form);
            },
            changeanalysisdate(input) {
                //修改车场统计分析日期
                console.log(input);
                this.currentdate = input;
                let date = {'date': input, 'out_uid': this.currentcollect};
                this.searchDate = input;
                this.currentPage = 1;
                this.getTableData(date)
            }
        },
        mounted() {
            //window.onresize=()=>{alert('123');this.mapheight=common.gwh()*0.5}
            this.mapheight = common.gwh() * 0.5
            this.mapstyle = 'width:inherit;height:' + 420 + 'px'
            console.log('commontable mount')
            //拷贝查询表单,用来在重置时清空表单内容
            this.tempSearchForm = common.clone(this.searchForm)

        },
        activated() {
            //window.onresize=()=>{alert('123');this.mapheight=common.gwh()*0.5}
            var _this = this
            this.analysisdate = Date.now()
            this.mapheight = common.gwh() * 0.5
            this.mapstyle = 'width:inherit;height:' + 420 + 'px'
            console.log('commontable active')
            this.currentPage = 1
            this.sform = {}
            //this.date_selector ='123434342'
            if (this.showdateSelector) {
                let _this = this;
                _this.currentcollect = '';
                _this.currentdate = '';
                _this.datesselector = ''
                _this.$axios.all([common.getCollector()])
                    .then(_this.$axios.spread(function (ret) {
                        _this.collectors = [{value_no:'',value_name:'全部'}];
                        _this.collectors = _this.collectors.concat(ret.data);
                    }))
            }
        },
    }

</script>

<style>
    .deleteTip {
        vertical-align: middle
    }

    .el-table__fixed {
        box-shadow: 0 0 0 #fff;
    }

    .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        color: black
    }

    .el-input-group > .el-input__inner {
        text-align: center;
    }
</style>
