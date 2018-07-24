<template>
    <section>
        <!--//////////////////搜索条件+操作按钮//////////////////////-->
        <el-form :inline="true" v-model="formItem" class="demo-form-inline">
            <el-form-item label="车牌号" class="inp-margin-buttom">
                <el-input v-model="formItem.car_number" placeholder="车牌号"></el-input>
            </el-form-item>
            <el-form-item label="状态:" class="inp-margin-buttom">
                <el-select placeholder="全部" v-model="formItem.state">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            v-for="item in stateType"
                            :key="item.value_no"
                            :label="item.value_name"
                            :value="item.value_no">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="inp-margin-buttom">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                    <el-button type="primary" @click="handleExport">导出</el-button>
                </el-tooltip>
                <el-button @click="getCode()" icon="search" type="primary">访客二维码
                </el-button>
            </el-form-item>
        </el-form>

        <!--//////////////////////table/////////////////////////////////////////-->
        <el-table :data="table" border highlight-current-row style="width:100%;" :height="tableheight"
                  v-loading="loading" @sort-change="sortChange">
            <!--子项折叠最终通过rowStyle实现。实际是项的显示/隐藏-->
            <el-table-column v-for="(items, index) in tableitems" :key="items.subs[0].prop"
                             :label="items.subs[0].label" :align="items.subs[0].prop=='name'?'left':'center'"
                             min-width="50"
                             :width="items.subs[0].prop=='car_number'||items.subs[0].prop=='mobile'||items.subs[0].prop=='state'?130:200"
                             :sortable="!items.subs[0].unsortable">
                <!--设置部分列宽度-->
                <template scope="scope">
                    <el-button v-if="items.subs[0].prop=='state'" size="small" type="text"
                               style="color: #0000ff;"
                               @click="handleShowEditStart(scope.$index, scope.row)">{{stateformat(scope.row[items.subs[0].prop])}}
                    </el-button>
                    <span v-else-if="items.subs[0].prop=='create_time'">{{common.dateformat(scope.row[items.subs[0].prop])}}</span>
                    <span v-else-if="items.subs[0].prop=='begin_time'">{{common.dateformat(scope.row[items.subs[0].prop])}}</span>
                    <span v-else-if="items.subs[0].prop=='end_time'">{{common.dateformat(scope.row[items.subs[0].prop])}}</span>
                    <span v-else>{{scope.row[items.subs[0].prop]}}</span>
                    <!--不同列的表现形式、格式化-->
                </template>

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



        <!--/////////////////////////////////////////////////////////////////////////-->
        <!--访客二维码-->
        <el-dialog
            title="访客二维码"
            :visible.sync="codeDialog"
            width="25%"
            center>
            <el-form style="margin-bottom:50px">
                 <el-row>
                <el-col :span="23" :offset="1" style="padding-top:0px;margin-top: 8px;margin-bottom:7px">
                    地址:
                </el-col>
                <el-col :span="23" :offset="1" >
                    <el-input v-model="qrurl" ></el-input>
                </el-col>
                </el-row>


                <el-form-item style="text-align: center">
                    <img style="display: inline-block" :src="qrsrc"/>
                    <el-button @click="down" type="primary" icon="el-icon-download">下载二维码</el-button>
                    <!--<a  :href="downloadQrUrl" style="font-size:10px;text-decoration:none" >下载二维码</a>-->
                </el-form-item>

            </el-form>

        </el-dialog>
        <canvas id="canvas" style="display:none"></canvas>
        <canvas id="img" style="display:none"></canvas>

        <!--修改状态-->
        <el-dialog
                title="审核状态"
                :visible.sync="startModel"
                width="25%">
            <el-form v-model="startForm" class="demo-form-inline" label-width="80px">
                <el-form-item label="状态:" class="inp-margin-buttom">
                    <el-select placeholder="全部" v-model="startForm.state">
                        <el-option
                                v-for="item in stateType"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" maxlength="20" v-model="startForm.remark"  :autosize="{ minRows: 2, maxRows: 3}" style="resize:none"></el-input>
                    <p><sup style="color: red">*</sup>提示:备注还可输入<span style="color: red" v-text="20- result"></span>/20个字符</p>
                </el-form-item>

                <el-form-item class="inp-margin-buttom">
                    <el-button plain @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>

                </el-form-item>
            </el-form>


        </el-dialog>


    </section>
</template>


<script>
    import {path,server} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import axios from 'axios'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                qrurl:'',
                downloadQrUrl:'',
                codeDialog:false,
                qrsrc:'',
                indexHide: false,
                parkText: '显示高级选项',
                hideVisitor:true,
                monthReportStart:'',
                activeName: 'tableStyle',
                loading: false,
                hideExport: false,
                hideSearch: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: false,
                showImg: false,
                imgSize:450,
                queryapi: '/visitor/query',
                exportapi: '/visitor/exportExcel',
                btswidth: '100',
                fieldsstr: 'id__car_number__mobile__create_time__begin_time__end_time__remark__state',
                tableitems: [
                    {

                            hasSubs: false,
                            subs: [{
                                label: '编号',
                                prop: 'id',
                                width: '60',
                                type: 'str',

                                searchable: true,

                                unsortable: true,
                                align: 'center'
                            }]
                        },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '130',
                            type: 'str',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '手机号',
                            prop: 'mobile',
                            width: '130',
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center',

                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '申请时间',
                            prop: 'create_time',
                            width: '150',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                             format: function (row) {
                                return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                       hasSubs: false,
                       subs: [{
                           label: '开始时间',
                           prop: 'begin_time',
                           width: '150',
                           type: 'date',
                           editable: true,
                           searchable: true,
                           addable: true,
                           unsortable: true,
                           align: 'center',
                            format: function (row) {
                               return common.dateformat(row.create_time)
                           }
                       }]
                   }, {

                          hasSubs: false,
                          subs: [{
                              label: '结束时间',
                              prop: 'end_time',
                              width: '150',
                              type: 'date',
                              editable: true,
                              searchable: true,
                              addable: true,
                              unsortable: true,
                              align: 'center',
                               format: function (row) {
                                  return common.dateformat(row.create_time)
                              }
                          }]
                      }, {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '110',
                            type: 'selection',
                            selectlist: this.states,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                if(row.state== 0){
                                    return '待审批'
                                }
                                else if(row.state==1){
                                     return '已通过'
                                }else if(row.state==2){
                                     return '已拒绝'
                                }
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            width: '200',
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
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: [],
                formItem:{
                    car_number:'',
                    state:''
                },
                stateType:[
                    {'value_no': '0', 'value_name': '待审批'},
                    {'value_no': '1', 'value_name': '已通过'},
                    {'value_no': '2', 'value_name': '已拒绝'}
                ],
                stateformat:function (state) {

                    if(state=='0')return "待审批"
                    if(state=='1')return "已通过"
                    if(state=='2')return "已拒绝"
                },
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
                startForm:{
                    state:'',
                    remark:'',
                    id:''
                },
                startModel:false,
            }
        },
        methods: {
            search:function () {
                this.sform = {};
                if(this.formItem.car_number != ""){
                    this.sform.car_number = this.formItem.car_number;
                }
                if(this.formItem.state != ""){
                    console.log(this.formItem.state)
                    this.sform.state = this.formItem.state;
                    this.sform.state_start = this.formItem.state;
                }
                console.log(this.formItem.car_number)

                this.getTableData(this.sform)
            },
            //分页变动
            handleSizeChange(val) {
                this.pageSize = val;
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
            cancel:function () {
                this.startModel = false;
                this.startForm.state = "";
                this.startForm.remark = "";
            },
            confirm:function () {
                var vm = this;
                let aform = common.generateForm(vm.startForm);
                vm.$axios.post(path + '/visitor/editstate', vm.$qs.stringify(aform), {
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
                        if (ret > 0 || ret.state == 1) {
                            //更新成功
                            vm.getTableData(vm.sform);
                            vm.$message({
                                message: '添加成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.startModel = false;
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
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },
            handleShowEditStart:function (index,row) {
                console.log(row)
                this.startForm.id = row.id; //转存id
                this.startForm.state =String(row.state);
                this.startForm.remark = row.remark;
                this.startModel = true;
            },
            getCode(){
                let vm = this;
                this.qrurl = server+"/zld/visitor/tovisit?comid="+sessionStorage.getItem('comid')
                console.log(this.qrurl)
                //var params = "park_id="+sessionStorage.getItem('comid')+"&url="+this.qrurl
                //vm.downloadQrUrl=path + "/park/downloadqr?" + params
                this.downloadQrUrl = path+"/visitor/downloadCode?url="+this.qrurl;
                vm.genqr(this.qrurl);
                vm.codeDialog=true;

            },
            down(){
                console.log(path,this.qrurl)
                window.open(path+"/visitor/downloadCode?url="+this.qrurl);
            },
            downloadQr(){
                location=this.qrsrc
            },
            genqr(url){
                var canvas = document.getElementById('canvas')
                console.log('-----------'+canvas)
                this.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {
                    //console.log(url)
                    if (error){
                        //console.error(error)
                    } else{
                        //console.log('success!');
                    }
                })
                console.log("qqqqqqqqqqqqq"+canvas.width)
                var context=canvas.getContext('2d');
                var imageData = context.getImageData(0,0,canvas.width,canvas.height);

                var img = document.getElementById("img");
                img.width=canvas.width
                img.height=canvas.height
                var context2 = img.getContext('2d');
                context2.fillStyle="white";
                context2.fillRect(0,0,canvas.width,(canvas.height));
                context2.putImageData(imageData,0,0);
                context2.font="bold 10px 微软雅黑"
                context2.fillStyle="black"

                var url = img.toDataURL("image/png");
                console.log(url+'---------------------------')
                this.qrsrc = url
                 console.log(this.qrsrc+"  ~~~~~~~")
            },
            //增加从url里面读取的2个参数
            getMonitorParamFromUrl(){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                var type = '';
                var id ='';
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == 'type'){
                        type = pair[1];
                    }
                    else if(pair[0] == 'id'){
                        id = pair[1];
                    }
                }
                let _this = this;
                var param = {
                    comid:id
                }
                if(type=='group'){
                    param = {
                        groupid:id
                    }
                }
                return param;
            },
            //拉取表格数据
            getTableData(sform1) {
                let param = this.getMonitorParamFromUrl()
                sform1.groupid = param.groupid;
                sform1.comid = param.comid;
                let vm = this;
                this.loading = false;
                let api = this.queryapi;
                sform1.rp = this.pageSize;
                sform1.page = this.currentPage;
                sform1.orderby = this.orderby;
                sform1.orderfield = this.orderfield;
                sform1.fieldsstr = this.fieldsstr;
                this.sform = common.generateForm(sform1);
                //保证5秒后把loading干掉
                setTimeout(() => {
                    vm.loading = false;
                }, 5000);
                vm.$axios.post(path + api, vm.$qs.stringify(this.sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    vm.loading = false;
                    // console.log('resset loading!!!!!');
                    let ret = response.data;
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
                        //  console.log('这是查询出来的结果'+ret);
                        if (ret.total == 0) {
                            vm.table = [];
                        } else {
                            vm.table = ret.rows;
                        }
                        if (ret.actReceivable != undefined) {
                            //月卡续费记录实收
                            vm.actualpay = ret.actReceivable + '元';
                        }
                        if (ret.amountReceivable != undefined) {
                            //月卡续费记录应收
                            vm.shouldpay = ret.amountReceivable + '元';
                        }
                        if (ret.blank != undefined) {
                            //订单记录 车位统计-空车位
                            vm.parkspace_blank = ret.blank;
                        }
                        if (ret.parktotal != undefined) {
                            //订单记录 车位统计-场内停车
                            vm.parkspace_park = ret.parktotal;
                        }
                        if (ret.cashpay != undefined) {
                            //集团 业务订单-订单记录-现金支付
                            vm.cashpay = ret.cashpay + '元';
                        }
                        if (ret.elepay != undefined) {
                            //集团 业务订单-订单记录-手机支付
                            vm.elepay = ret.elepay + '元';
                        }
                        if (ret.sumtotal != undefined) {
                            //集团 业务订单-订单记录-订单总金额
                            vm.sumtotal = ret.sumtotal + '元';
                        }

                        vm.total = ret.total;

                        vm.loading = false;
                    }
                    //  console.log("get table 55555:",vm.$refs['search'].searchForm);
                }).catch(function (error) {
                    vm.loading = false;
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },
            //导出表格数据
            handleExport() {
                let vm = this;
                let api = this.exportapi;
                let params = '';
                if (common.getLength(this.sform) == 0) {
                    params = 'fieldsstr=' + this.fieldsstr + '&token=' + sessionStorage.getItem('token');
                } else {
                    for (var x in this.sform) {
                        if(x=='car_number'||x=='nickname1'){
                            params += x + '=' + encodeURI(encodeURI(this.sform[x])) + '&';
                        }else{
                            params += x + '=' + this.sform[x] + '&';
                        }
                    }
                }
                let groupid = sessionStorage.getItem('groupid');
                let cityid = sessionStorage.getItem('cityid');
                if (groupid != 'undefined' && !(params.indexOf('groupid=') > -1)) {
                    params += '&groupid=' + groupid;
                }
                if (cityid != 'undefined' && !(params.indexOf('cityid=') > -1)) {
                    params += '&cityid=' + cityid;
                }
                // params += '&groupid=' + groupid + '&cityid=' + cityid
                if (params.indexOf('comid=') > -1) {
                    window.open(path + api + '?' + params);
                } else {
                    window.open(path + api + '?' + params + '&comid=' + sessionStorage.getItem('comid'));
                }

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
            //showImgDialog: function (index, row) {
            //   this.imgdialog_url = path + this.imgapi + '?liftrodid=' + row.liftrod_id + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
            //    console.log(this.imgdialog_url);
            //    this.imgDialog = true
            // }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };

            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user;
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length);
                //for (var item of user.authlist) {
                //    if (AUTH_ID.orderManage_Poles == item.auth_id) {
                //        // console.log(item.sub_auth)
                //        this.hideExport = !common.showSubExport(item.sub_auth);
                //        this.hideSearch = !common.showSubSearch(item.sub_auth);
                //        break;
                //    }
                //}

            }


        },
        beforeMount(){
            this.tableheight=common.gwh()-150;
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 150;
            };
            this.tableheight = common.gwh() - 150;
            this.imgSize = common.gww()/4;
            // this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.formItem.car_number = '';
            this.formItem.state = '';
            this.getTableData({});
            let _this = this;

        },
        watch: {

            collectors: function (val) {
                this.tableitems[3].subs[0].selectlist = val
            },
        },
        computed:{
            result:function(){
                var l = 0;
                var arr = [];
                var reg = /^[\s]$/g;
//                        l = (this.visitorForm.remark).toString().replace(/\s/g,"").length;
                l = (this.startForm.remark).toString().length;
                arr.push(l);
                return arr;
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
    .inp-margin-buttom{
        margin-bottom: 10px!important;
    }
</style>

