<template>
    <section>
        <!--//////////////////搜索条件+操作按钮//////////////////////-->
        <el-form :inline="true" v-model="formItem" class="demo-form-inline">
            <el-form-item label="姓名" class="inp-margin-buttom">
                <el-input v-model="formItem.name" placeholder="业主姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" class="inp-margin-buttom">
                <el-input v-model="formItem.phone" placeholder="业主手机号"></el-input>
            </el-form-item>
            <el-form-item class="inp-margin-buttom">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="handleAdd">添加</el-button>
                <el-button type="primary" @click="handleImport">导入</el-button>
                <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                    <el-button type="primary" @click="handleExport">导出</el-button>
                </el-tooltip>
            </el-form-item>
        </el-form>

        <!--//////////////////////table/////////////////////////////////////////-->
        <el-table :data="table" border highlight-current-row style="width:100%;" :height="tableheight"
                  v-loading="loading" @sort-change="sortChange">

             <el-table-column label="操作" :width="btswidth" v-if="!hideOptions" align="center" fixed="left">
                     <template scope="scope">
                         <el-button  size="small" type="text" @click="handleEdit(scope.row)">
                             编辑
                         </el-button>
                     </template>
             </el-table-column>
            <!--子项折叠最终通过rowStyle实现。实际是项的显示/隐藏-->
            <el-table-column v-for="(items, index) in tableitems" :key="items.subs[0].prop"
                             :label="items.subs[0].label" :align="items.subs[0].prop=='name'?'left':'center'"
                             min-width="50"
                             :width="items.subs[0].prop=='identity_card'||items.subs[0].prop=='phone'||items.subs[0].prop=='home_number'||items.subs[0].prop=='remark'?200:130"
                             :sortable="!items.subs[0].unsortable">
                <!--设置部分列宽度-->
                <template scope="scope">
                    <span v-if="items.subs[0].prop=='state'">{{stateformat(scope.row[items.subs[0].prop])}}</span>
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

       <el-dialog
               :title="addHomeOwnerTitle"
               :visible.sync="addHomeOwnerVisible"
               width="30%"
               size="tiny">
           <el-form ref="form" label-width="120px" style="margin-bottom:-30px" :rules="homeOwnerFormRules" :model="user">
               <el-form-item label="姓名" :prop="name">
                   <el-input v-model="user.name" style="width:90%"></el-input>
               </el-form-item>
               <el-form-item label="房号">
                   <el-input v-model="user.home_number" style="width:90%"></el-input>
               </el-form-item>
               <el-form-item label="手机号" :prop="phone">
                  <el-input v-model="user.phone" style="width:90%"></el-input>
               </el-form-item>
               <el-form-item label="身份证号">
                  <el-input v-model="user.identity_card" style="width:90%"></el-input>
               </el-form-item>
               <el-form-item label="状态">
                   <el-select placeholder="全部" v-model="user.state" style="width:90%">
                      <el-option
                              v-for="item in stateType"
                              :key="item.value_no"
                              :label="item.value_name"
                              :value="item.value_no">
                      </el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="备注">
                  <el-input v-model="user.remark" style="width:90%"></el-input>
               </el-form-item>

           </el-form>
           <span slot="footer" class="dialog-footer">
            <el-button @click="onclose" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="saveUser">保存</el-button>
        </span>
       </el-dialog>


       <el-dialog
               title="导入业主"
               :visible.sync="showUpload"
               width="30%">
           <el-upload class="upload-demo" ref="upload" :action="uploadapi" :auto-upload="false"
                      :on-success="uploadSuccess" :on-remove="handleRemove" :on-change="handleChange">
               <el-button slot="trigger" size="small" type="primary" @click="handleSelect">选取文件</el-button>
               <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定导入
               </el-button>
               <div slot="tip" class="el-upload__tip">请选择Excel文件，支持xls,xlsx等格式</div>
           </el-upload>
           <div v-html="uploadMsg"></div>
           <span slot="footer" class="dialog-footer">
            <el-button @click="showUpload = false" size="small" type="primary">确 定</el-button>
        </span>
       </el-dialog>

    </section>
</template>


<script>
    import {path,server,checkMobile} from '../../api/api';
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
                user: {
                    id:'',
                    name: '',
                    state: '0',
                    phone: '',
                    home_number: '',
                    identity_card: '',
                    remark: '',
                },
                addHomeOwnerVisible:false,
                addHomeOwnerTitle:'',
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
                hideOptions: false,
                showParkInfo: false,
                showImg: false,
                imgSize:450,
                queryapi: '/homeowner/query',
                exportapi: '/homeowner/exportExcel',
                uploadapi: path + '/homeowner/importExcel?1=1' + common.commonParams(),
                btswidth: '100',
                showUpload:false,
                fieldsstr: 'id__name__phone',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '姓名',
                            prop: 'name',
                            width: '130',
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '房号',
                            prop: 'home_number',
                            width: '130',
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center',

                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '手机号',
                            prop: 'phone',
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
                           label: '身份证号',
                           prop: 'identity_card',
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
                uploadMsg: '',
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: [],
                formItem:{
                    name:'',
                    phone:''
                },
                stateType:[
                    {'value_no': '0', 'value_name': '正常'},
                    {'value_no': '1', 'value_name': '禁用'}
                ],
                accessType:[
                    {'value_no': '0', 'value_name': '不允许申请访客'},
                    {'value_no': '1', 'value_name': '允许申请访客'}
                ],
                autoType:[
                    {'value_no': '0', 'value_name': '人工审核'},
                    {'value_no': '1', 'value_name': '自动审核'}
                ],
                stateformat:function (state) {
                    if(state=='0')return "正常"
                    if(state=='1')return "禁用"
                },
                rowdata: {},
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
                visitorSetForm:{
                    access_cert:'1',
                    auto_cert:'1',
                    access_not_cert:'1',
                    auto_not_cert:'0'
                },
                tempSetForm:{
                    id:"",
                    access_cert:'1',
                    auto_cert:'1',
                    access_not_cert:'1',
                    auto_not_cert:'0'
                },
                startModel:false,
                visitorSetModel:false,
                phone:'phone',
                name:'name',
                tempeditForm:{},
                homeOwnerFormRules: {
                    phone: [
                        {message: '请输入业主手机号', required: true,trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入业主姓名', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            onclose(){
                this.addHomeOwnerVisible = false
                //关闭对话框
                //重置表单数据
                //this.user=common.clone(this.tempeditForm)
            },
            search:function () {
                this.sform = {};
                if(this.formItem.name != ""){
                    this.sform.name = this.formItem.name;
                }
                if(this.formItem.phone != ""){
                    console.log(this.formItem.phone)
                    this.sform.phone = this.formItem.phone;
                }
                console.log(this.formItem.phone)

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
            saveUser(userId) {

                var vm = this;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        var user = sessionStorage.getItem('user');
                        user = JSON.parse(user)
                        var formObj = {};

                        formObj.comid = user.comid;
                        formObj.id = this.user.id;
                        formObj.name = this.user.name;
                        formObj.phone = this.user.phone;
                        formObj.home_number = this.user.home_number;
                        formObj.identity_card = this.user.identity_card;
                        formObj.state = this.user.state;
                        formObj.remark = this.user.remark;
                        formObj = common.generateForm(formObj);
                        vm.$axios.post(path + '/homeowner/add', vm.$qs.stringify(formObj), {
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
                                    vm.addHomeOwnerVisible = false;
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: ret.msg,
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

                     }
                 })
            },
            handleAdd(){
              this.user = {
                "state":"0"
              };
              this.addHomeOwnerTitle="添加业主"
              this.addHomeOwnerVisible=true
            },
             handleEdit(row) {
                this.user =common.clone(row);
                this.user.state=row.state+"";
                //拿到当前行数据row,传递给表单编辑子组件,子组建中包括重置和保存按钮
                //获取角色编号,获取rowid,
                this.addHomeOwnerTitle="编辑业主"
                this.addHomeOwnerVisible = true;
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

            handleImport: function () {
                this.showUpload = true;
                this.handleSelect();
            },
            submitUpload() {
                //上传文件
                this.$refs.upload.submit();
            },
            handleSelect() {
                //点击选择文件，清空当前文件列表和上传信息
                this.$refs.upload.clearFiles();
                this.uploadMsg = '';
            },
            handleChange(file, fileList) {
                // console.log(file);
                // console.log(fileList);
                //校验文件
                let that = this;
                if (!(file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
                    this.$alert('请选择正确的Excel文件', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            that.$refs.upload.clearFiles();
                        }
                    });
                }

            },
            handleRemove(file, fileList) {
                this.uploadMsg = '';
            },
            uploadSuccess(response, file, filelist) {
                // console.log(response);
                // console.log(file);
                // console.log(filelist);
                this.$message({
                    message: '上传成功!',
                    type: 'success',
                    duration: 600
                });
                this.uploadMsg = response.msg;
                this.getTableData({});
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
            this.formItem.name = '';
            this.formItem.phone = '';
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
    .inp-margin-buttom-self{
        margin-bottom: 10px!important;
        text-align:right
    }
</style>

