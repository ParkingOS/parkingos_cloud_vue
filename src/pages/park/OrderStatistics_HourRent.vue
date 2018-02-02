<template>
    <section>
        <!--<common-table-->
        <!--:queryapi="queryapi"-->
        <!--:tableheight="tableheight"-->
        <!--:fieldsstr="fieldsstr"-->
        <!--:tableitems="tableitems"-->
        <!--:btswidth="btswidth"-->
        <!--:hide-export="hideExport"-->
        <!--:hide-options="hideOptions"-->
        <!--:searchtitle="searchtitle"-->
        <!--:showdateSelector="showdateSelector"-->
        <!--:hideTool="hideTool"-->
        <!--:hideSearch="hideSearch"-->
        <!--:hideAdd="hideAdd"-->
        <!--ref="bolinkuniontable"-->
        <!--&gt;</common-table>-->
        <el-button type="primary" size="small" @click="handlePrint()">打印</el-button>
        <el-row style="margin-bottom:8px">
            <el-col :span="24" align="left">
                <el-col :span="18" align="left">
                    <div v-if="showdateSelector" style="float: left;margin-right: 10px;">
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

                <el-col :span="6" align="right">
                    <el-button @click="refresh" type="text" size="small">刷新&nbsp;&nbsp;</el-button>
                </el-col>
            </el-col>

        </el-row>
        <el-table :data="table" border highlight-current-row style="width:100%;" :height="tableheight"
                  v-loading="loading" @sort-change="sortChange" id="tablearea">


            <el-table-column
                    align="center"
                    type="index"
                    width="83"
                    label="索引"
                    fixed="left">
            </el-table-column>
            <!--<div>-->
            <el-table-column
                    label="集团"
                    prop="groupid"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="车场"
                    prop="comid"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="收费员"
                    width="123"
                    align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="text" style="color: #109EFF;"
                               @click="handleWorkDetail(scope.$index, scope.row)">
                        {{scope.row.name}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="账号"
                    prop="out_uid"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="日期"
                    prop="sdate"
                    align="center"
                    width="320">
            </el-table-column>
            <el-table-column
                    label="总订单数"
                    width="100"
                    align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="text" style="color: #109EFF;"
                               @click="handleOrderDetail(scope.$index, scope.row)">
                        {{scope.row.scount}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="月卡订单数"
                    prop="monthcount"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="现金结算"
                    prop="cash_pay"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="现金预付"
                    prop="cash_prepay"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="电子支付"
                    prop="electronic_pay"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="免费金额"
                    prop="free_pay"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="减免券支付"
                    prop="reduce_pay"
                    align="center"
                    width="123">
            </el-table-column>
            <el-table-column
                    label="合计"
                    prop="amount_receivable"
                    align="center"
                    width="123">
            </el-table-column>
            <!--</div>-->

        </el-table>
        <el-dialog title="工作详情" v-model="showWorkDetail" size="large">
            <span slot="footer" class="dialog-footer">
				<el-button type="primary" size="small" @click="showWorkDetail = false">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog title="订单详情" v-model="showOrderDetail">
            <span slot="footer" class="dialog-footer">
				<el-button type="primary" size="small" @click="showOrderDetail = false">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import Printd from 'printd'
    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: true,
                hideSearch: false,
                showdateSelector: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,

                queryapi: '/parkorder/query',
                workdetailapi: '/parkorder/workdetail',
                orderdetailapi: '/parkorder/orderdetail',
                btswidth: '100',
                fieldsstr: 'groupid__comid__name__out_uid__sdate__scount__monthcount__cash_pay__cash_prepay__electronic_pay__free_pay__reduce_pay__amount_receivable',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '集团',
                            prop: 'groupid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场',
                                prop: 'comid',
                                width: '123',
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
                                label: '收费员',
                                prop: 'name',
                                width: '123',
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
                                label: '账号',
                                prop: 'out_uid',
                                width: '123',
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

                        hasSubs: false,
                        subs: [{
                            label: '日期',
                            prop: 'sdate',
                            width: '320',
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
                            label: '总订单数',
                            prop: 'scount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '月卡订单数',
                            prop: 'monthcount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '现金结算',
                            prop: 'cash_pay',
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
                            label: '现金预付',
                            prop: 'cash_prepay',
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
                            label: '电子预付',
                            prop: 'electronic_pay',
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
                            label: '免费金额',
                            prop: 'free_pay',
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
                            label: '减免券支付',
                            prop: 'reduce_pay',
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
                            label: '合计',
                            prop: 'amount_receivable',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '高级查询',

                datesselector: '',
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
                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                table: [],
                sform: {},
                showWorkDetail: false,
                showOrderDetail: false,
                currentRow:'',
            }
        },
        methods: {
            handlePrint(elem){
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
                d.print( document.getElementById('tablearea'), cssText )
            },
            handleWorkDetail:function (index,row) {
                this.showWorkDetail = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + _this.workdetailapi + '?out_uid=' + row.out_uid)
                    .then(function (response) {
                        console.log(response)
                        // let ret = response.data;

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            handleOrderDetail:function (index,row) {
                this.showOrderDetail = true;
                let _this = this;
                _this.currentRow = row;
                _this.$axios.get(path + _this.orderdetailapi + '?out_uid=' + row.out_uid)
                    .then(function (response) {
                        console.log(response)
                        // let ret = response.data;

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            changeanalysisdate: function (input) {
                //修改车场统计分析日期
                console.log(input)
                var date = {'date': input}
                this.searchDate = input;
                this.currentPage = 1;
                this.getTableData(date)
            },
            //拉取表格数据
            getTableData: function (sform) {
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
            alertInfo: function (msg) {
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
            refresh() {
                if (this.showdateSelector) {

                    //this.$extend(this.sform,{'date':this.datesselector})
                    this.sform.date = this.searchDate
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
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            // var user = sessionStorage.getItem('user');
            // this.user = user
            // if (user) {
            //     user = JSON.parse(user);
            //     for (var item of user.authlist) {
            //         if (AUTH_ID.showOrderStatistics_HourRent_auth_id == item.auth_id) {
            //             console.log(item.sub_auth)
            //             break;
            //         }
            //     }
            //
            // }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            // this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            // this.$refs['bolinkuniontable'].getTableData({})
            this.getTableData(this.sform);
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

