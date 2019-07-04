<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">设备管理</p>
                <div class="float-right">
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
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
        <el-dialog
                width="600px"
                :visible.sync="visibleDialog" custom-class="custom-dialog" :show-close="false">
            <header class="dialog-header" slot="title">
                编辑<i class="el-icon-close dialog-header-iconfont" @click="visibleDialog = false"></i>
            </header>
            <el-form ref="refillForm" label-width="120px" :model="editForm" class="dialog-form-width">
                <el-form-item label="厂商">
                    <el-select v-model="editForm.cityid" filterable @change="getParkList"  style="width: 100%">
                        <el-option
                                v-for="item in cityList"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车场">
                    <el-select v-model="editForm.comid" filterable  style="width: 100%">
                        <el-option
                                v-for="item in parkList"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button @click="visibleDialog = false"  class="custom-btns-style">取 消</el-button>
                <el-button type="primary"  @click="submitEdit" :loading="editLoading" class="custom-btns-style" style="margin-left: 60px">确 定</el-button>
            </footer>
        </el-dialog>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import TabPane from '../../components/table/TabPane';
    export default {
        components: {
            TabPane
        },
        data() {
            return {
                visibleDialog:false,
                editLoading:false,
                editRowData:{},
                cityList:[],
                parkList:[],
                editForm:{

                },
                //更多
                isShow:false,
                //搜索
                searchFormData:{
                    count:0
                },
                searchForm:{},
                queryapi: '/cameraManage/adminQuery',
                addapi: '/freereason/add',
                editapi: '/postmanage/edit',
                delapi: '/freereason/delete',
                btswidth: '100',
                fieldsstr: 'id__name__sort',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '厂商',
                            prop: 'city_name',
                            width: '180',
                            align: 'center',

                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '车场',
                            prop: 'park_name',
                            align: 'center',
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '相机名称',
                            prop: 'cam_name',
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '相机ID',
                            prop: 'cam_id',
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '模式',
                            prop: 'mode',
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '心跳时间',
                            prop: 'beat_time',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.beat_time))
                                ]);
                            }
                        }]
                    },{
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            align: 'center',
                            width:'100',
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
                                            click: (e) => {
                                                window.event? window.event.cancelBubble = true : e.stopPropagation();
                                                this.editRowData = params.row;
                                                this.formatCityItem(params.row.cityid)
                                                this.visibleDialog = true;
                                            }
                                        }
                                    }, '编辑'),
                                ]);
                            }
                        }]
                    },


                ],
                hideAdd:false,
                showEdit:false,
                showdelete:false,
                hideOptions:false,

            }
        },
        methods:{

            submitEdit(){
                let data = new FormData();
                data.append('id',this.editRowData.id);
                data.append('cityid',this.editForm.cityid);
                data.append('comid',this.editForm.comid);
                this.editLoading = true;
                this.$axios.post(path+'/cameraManage/bindPark',data)
                    .then(res=>{
                        this.editLoading = false;
                        if(res.data.state == 1){
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                            this.visibleDialog = false;
                            this.resetForm()
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err=>{
                        this.editLoading = false;
                        this.$message.error('网络错误');
                    })

            },
            formatCityItem(cityid){
                let arr = this.cityList.filter((item)=>{
                    return item.value_no == cityid;
                })
                if(arr && arr[0]){
                    this.$set(this.editForm,'cityid',arr[0].value_no);
                    this.getParkList(cityid);

                }else{
                    this.editForm.cityid = '';
                    this.editForm.comid = '';
                }

            },
            formatParkItem(){
                let comid = this.editRowData.comid;
                let arr = this.parkList.filter((item)=>{
                    return item.value_no == comid;
                });
                if(arr && arr[0]){
                    this.$set(this.editForm,'comid',arr[0].value_no);
                }else{
                    this.editForm.comid = '';
                }
            },
            //刷新
            resetForm(){
                let that = this;
                that.searchFormData.count = that.searchFormData.count++;
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            setAuthorityFn(){
                let user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                }
            },
            getCityList(){
                this.$axios.get(path+'/getdata/getAllCitys')
                    .then((res)=>{
                        this.cityList = res.data;
                    })
                    .catch((err)=>{

                    })
            },
            getParkList(cityid){
                this.$axios.get(path+'/getdata/cityparks?cityid='+cityid)
                    .then((res)=>{
                        this.parkList = res.data;
                        this.formatParkItem()
                    })
                    .catch((err)=>{

                    })
            },
        },
        mounted() {
            this.setAuthorityFn();
            this.$refs['tabPane'].getTableData({},this)
        },
        activated() {
            this.getCityList()
        },
        watch: {
            hideOptions:function (val,oldVal) {
                let len = this.tableitems.length;
                this.tableitems[len -1].subs[0].hidden = val
            },
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

