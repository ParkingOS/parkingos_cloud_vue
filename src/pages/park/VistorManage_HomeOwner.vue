<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            业主管理
        </header>
        <!--//////////////////搜索条件+操作按钮//////////////////////-->
        <div class="workbench-wrapper">
            <el-form :inline="true" v-model="formItem" class="demo-form-inline">
                <el-form-item label="姓名" class="clear-style margin-left-clear">
                    <el-input v-model="formItem.name" placeholder="业主姓名" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="clear-style">
                    <el-input v-model="formItem.phone" placeholder="业主手机号" size="mini"></el-input>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="primary" @click="searchFn" size="mini">搜索</el-button>
                    <el-button type="primary" @click="handleAdd" size="mini">添加</el-button>
                    <el-button type="primary" @click="handleImport" size="mini">导入</el-button>
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                        <el-button @click="exportFn" size="mini">导出</el-button>
                    </el-tooltip>
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
            </el-form>
        </div>


        <div class="table-wrapper-style">
            <tab-pane
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
        <!--表单编辑-->
        <custom-edit-form
                ref="editref"
                :value="rowdata"
                :editFormConfig="tableitems"
                title="编辑"
                v-on:input="onEditInput"
                v-on:edit="onEdit"
                v-on:cancelEdit="cancelEdit"
                :editVisible="editFormVisible"></custom-edit-form>

        <custom-add-form
                ref="addref"
                :value="addFormData"
                :addFormConfig="tableitems"
                title="添加"
                v-on:input="onAddInput"
                v-on:add="onAdd"
                v-on:cancelAdd="cancelAdd"
                :addVisible="addFormVisible"></custom-add-form>

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
    // import CommonTable from '../../components/CommonTable'
    import axios from 'axios'
    import TabPane from '../../components/table/TabPane';
    import AddForm from '../../components/AddForm';
    import EditForm from '../../components/EditForm';
    import customEditForm from '../../components/edit-form/editForm'
    import customAddForm from '../../components/add-form/addForm'
    import { editTableData,addTableData } from '../../api/base'
    export default {
        components: {
            TabPane,EditForm,AddForm,
            customEditForm,customAddForm
        },
        data() {
            let that = this;
            return {
                addFormData:{
                    state:'0'
                },
                addFormVisible:false,
                addloading:false,
                searchForm:{},
                editFormVisible:false,
                editloading:false,
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
                editapi:'/homeowner/add',
                addapi:'/homeowner/add',
                uploadapi: path + '/homeowner/importExcel?1=1' + common.commonParams(),
                btswidth: '100',
                showUpload:false,
                fieldsstr: 'id__name__phone',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '操作',
                            prop: 'name',
                            width: '100',
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('ElButton', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editFormVisible = true;
                                                this.rowdata = params.row
                                                this.rowdata.state = this.rowdata.state+''
                                            }
                                        }
                                    }, '编辑'),

                                ]);
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '姓名',
                            prop: 'name',
                            width: '130',
                            unsortable: true,
                            editable: true,
                            addtable: true,
                            align: 'center',

                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            "placeholder": "请输入姓名",
                            "rules": [
                                {required: true, message: '请输入业主姓名', trigger: 'blur'}
                            ],
                            'size':'mini',
                            "subtype": "text",
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '房号',
                            prop: 'home_number',
                            width: '130',
                            unsortable: true,
                            editable: true,
                            addtable: true,
                            align: 'center',
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
                            label: '手机号',
                            prop: 'phone',
                            width: '150',
                            addtable: true,
                            unsortable: true,
                            editable: true,
                            align: 'center',
                            "type": "input",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "text",
                            "rules": [
                                {required: true, message: '手机号不能为空', trigger: 'blur'}
                            ],
                        }]
                    }, {

                       hasSubs: false,
                       subs: [{
                           label: '身份证号',
                           prop: 'identity_card',
                           width: '200',
                           type: 'str',
                           searchable: true,
                           addtable: true,
                           unsortable: true,
                           editable: true,
                           align: 'center',
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
                              label: '状态',
                              prop: 'state',
                              width: '80',
                              selectlist: [
                                  {'value_no': '0', 'value_name': '正常'},
                                  {'value_no': '1', 'value_name': '禁用'}
                              ],
                              editable: true,
                              addtable: true,
                              unsortable: true,
                              align: 'center',
                              columnType:'render',
                              render: (h, params) => {
                                  return h('div', [
                                      h('span', this.stateformat(params.row.state))
                                  ]);
                              },
                              "type": "radio",
                              "value": "",
                              "button": false,
                              "border": true,
                              "rules": [],
                              'size':'mini',
                              "options": [
                                  {
                                      "value_no": "0",
                                      "value_name": "正常",
                                      "disabled": false
                                  },
                                  {
                                      "value_no": "1",
                                      "value_name": "禁用",
                                      "disabled": false
                                  }
                              ]
                          }]
                      }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            editable: true,
                            searchable: true,
                            addtable: true,
                            unsortable: true,
                            align: 'center',
                            "type": "textarea",
                            "disable": false,
                            "readonly": false,
                            "value": "",
                            'size':'mini',
                            "subtype": "textarea",
                            'rows':'2'
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
                    // name: [
                    //     {required: true, message: '请输入业主姓名', trigger: 'blur'}
                    // ]
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
            //----------------------------------------------------------------//
            handleAdd(){
                // this.user = {
                //   "state":"0"
                // };
                // this.addHomeOwnerTitle="添加业主"
                // this.addHomeOwnerVisible=true
                this.addFormVisible = true;

            },
            closeadd:function () {
                ;
            },
            onAddInput:function (aform) {

                this.addFormData = aform;
            },
            onAdd:function () {
                console.log('aform',this.addFormData)
            //发送请求,添加一条记录
                let that = this;
                let api = this.addapi;
                let aform = this.addFormData;
                aform = common.generateForm(aform);
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addTableData(api,aform).then(res=>{
                            if(res.status == 200){
                                if(res.data.state == 1){
                                    that.$message({
                                        message: '更新成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    setTimeout(()=>{
                                        that.addFormVisible = false;
                                        that.$refs['tabPane'].getTableData({},that);
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
            cancelAdd:function () {
                this.addFormVisible = false;
            },
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
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.formItem;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            resetForm(){
                this.initFn(this)
            },
            exportFn(){
                /*
                * 导出数据，通过ref 进行定位拉取
                * */
                this.$refs['tabPane'].handleExport()
            },
            initFn(that){
                /*
                * 初始化操作
                * 点击刷新时 和初进入页面时
                * */
                that.formItem = {
                    name:'',
                    phone:''
                },
                    that.searchForm = JSON.parse(JSON.stringify( that.formItem ));
            },
        },
        mounted() {
            this.$refs['tabPane'].getTableData({},this);
        },
        beforeMount(){

        },
        activated() {


        },
        watch: {

            // collectors: function (val) {
            //     this.tableitems[3].subs[0].selectlist = val
            // },
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

