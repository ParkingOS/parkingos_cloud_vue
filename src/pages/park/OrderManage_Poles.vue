<template>
    <section class="right-wrapper-size" id="scrollBarDom">
        <header class="custom-header">
            订单管理-抬杆记录
        </header>
        <div class="workbench-wrapper">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
                <el-form-item class="clear-style">
                    <el-date-picker
                            size="mini"
                            v-model="searchFormData.currentData"
                            type="datetimerange"
                            range-separator="-"
                            :default-time="['00:00:00','23:59:59']"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"
                            @change="changeDateFormat"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="收费员" class="clear-style">
                    <el-select v-model="searchFormData.uin" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in collectors"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="clear-style">
                    <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
                    <el-button type="text" size="mini" @click="changeMore" style="color: rgb(14, 95, 246)"> <i :class="isShow ? 'iconfont icon-gengduo-zhankaizhuangtai': 'iconfont icon-gengduo-shouqizhuangtai'" style="font-size: 12px"></i> 更多选项</el-button>
                </el-form-item>
                <el-form-item class="clear-style float-right">
                    <el-button size="mini" @click="exportFn">导出</el-button>
                    <el-button size="mini" @click="resetForm">刷新</el-button>
                </el-form-item>
                <div class="second-search-item-style" v-show="isShow">
                    <el-form-item label="抬杆编号" class="clear-style">
                        <el-input v-model="searchFormData.liftrod_id" placeholder="请输入抬杆编号" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                    <el-form-item label="通道" class="clear-style">
                        <el-input v-model="searchFormData.out_channel_id" placeholder="请输入通道名称" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                    <el-form-item label="抬杆原因" class="clear-style margin-left-20">
                        <el-select v-model="searchFormData.reason" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in reasons"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :orderfield="orderfield"
                    :queryapi="queryapi"
                    :exportapi="exportapi"
                    :fieldsstr="fieldsstr"
                    :format-collectors="collectors"
                    :table-items="tableitems"
                    align-pos="right"
                    bts-width="200"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    ref="tabPane"
            ></tab-pane>
        </div>
        <el-dialog :visible.sync="imgDialog" custom-class="custom-dialog-ordermanage">
            <i class="iconfont icon-guanbi dialog-header-iconfont" @click="imgDialog = false"></i>
            <img v-bind:src="imgdialog_url" style="display: inline-block;width: 100%;height: 100%;"/>
        </el-dialog>
    </section>
</template>


<script>
    import {path} from '../../api/api';
    import util from '../../common/js/util';
    import common from '../../common/js/common';
    import {AUTH_ID} from '../../common/js/const';
    import TabPane from '../../components/table/TabPane';
    import axios from 'axios';
    import ElButton from 'element-ui/packages/button/src/button';
    export default {
        components: {
            ElButton,
            TabPane
        },
        data() {
            return {
                imgDialog:false,
                imgdialog_url:'',
                orderfield:'id',
                isShow:false,
                currentHeight:'500',
                queryapi: '/liftRod/query',
                exportapi: '/liftRod/exportExcel',
                imgapi: '/liftRod/getLiftRodPicture',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                searchFormData:{
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    uin:'',
                    uin_start:'',
                    liftrod_id:'',
                    out_channel_id:'',
                    reason:'',
                    reason_start:'',
                },
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '抬杆编号',
                            prop: 'liftrod_id',
                            width: '165',
                            type: 'str',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '时间',
                            prop: 'ctime',
                            width: '165',
                            type: 'date',
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.dateformat(params.row.ctime))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收费员',
                            prop: 'uin',
                            width: '165',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                let uidstr = common.nameformat(params.row, this.collectors, 'uin');
                                return h('div', [
                                    h('span', uidstr == '' || uidstr == undefined ? params.row.uid : uidstr )
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '通道',
                            prop: 'out_channel_id',
                            width: '165',
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
                            label: '抬杆原因',
                            prop: 'reason',
                            width: '165',
                            type: 'selection',
                            selectlist: this.reasons,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            columnType:'render',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', common.nameformat(params.row,this.reasons,'reason'))
                                ]);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'resume',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs:false,
                        subs: [{
                            label: '操作',
                            columnType:'render',
                            align: 'center',
                            fixed:'right',
                            width:'100',
                            unsortable: true,
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
                                                this.imgdialog_url = path + this.imgapi + '?liftrodid=' + encodeURI(encodeURI(params.row['liftrod_id'])) + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                                                this.imgDialog = true;

                                            }
                                        }
                                    }, '查看图片')
                                ]);
                            }
                        }]
                    },
                    // {
                    //
                    //     hasSubs: false,
                    //     subs: [{
                    //         label: '查看抬杆图片',
                    //         prop: 'url',
                    //         width: '123',
                    //         type: 'number',
                    //         editable: true,
                    //         searchable: false,
                    //         addable: true,
                    //         unsortable: true,
                    //         hidden: true,
                    //         align: 'center',
                    //         format: function (row) {
                    //             return "查看抬杆图片"
                    //         }
                    //     }]
                    // },

                ],
                collectors:undefined,
                reasons:undefined,
                searchForm:{}
            };
        },
        methods: {
            //查看详情
            handleShowOrderDetail(index, row) {
                console.log('index',index,'row',row)
                // let container = this.$el.querySelector('.el-table__body-wrapper');
                // this.getScrollHeight = container.scrollTop;
                //跳转到订单详情
                this.$router.push({path: '/orderManage_OrderDetail', query: {index: index, row: row}});
                sessionStorage.setItem('orderRow',JSON.stringify(row));
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
                that.searchFormData ={
                    currentData:'',
                    ctime:'between',
                    ctime_start:'',
                    ctime_end:'',
                    uin:'',
                    uin_start:'',
                    liftrod_id:'',
                    out_channel_id:'',
                    reason:'',
                    reason_start:'',
                };
                let currentTime =  common.currentDateArray(1);
                that.searchFormData.currentData = [new Date(currentTime[0]),new Date(currentTime[1])];
                that.searchFormData.ctime_start = common.timestampFormat(currentTime[0]);
                that.searchFormData.ctime_end = common.timestampFormat(currentTime[1]);
                that.searchForm = JSON.parse(JSON.stringify( that.searchFormData ));
            },
            searchFn() {
                /*
                * 点击搜索后，克隆一份表单数据进行查询，以触发table的查询事件
                * */
                let sform = this.searchFormData;
                sform.uin_start = sform.uin;
                sform.reason_start = sform.reason;
                this.searchForm = JSON.parse(JSON.stringify( sform ))
            },
            changeMore(){
                this.isShow = !this.isShow
            },
            changeDateFormat(val){
                if(val == null){
                    this.searchFormData.ctime_start = '';
                    this.searchFormData.ctime_end = ''
                }else{
                    this.searchFormData.ctime_start = val[0];
                    this.searchFormData.ctime_end = val[1]
                }
            },
            getQuery(){
                let _this = this;
                axios.all([common.getCollector(), common.getLiftReason()])
                    .then(axios.spread(function (collector, reason) {
                        _this.collectors = collector.data;
                        _this.collectors.unshift({
                            value_name: '全部',
                            value_no: ''
                        })
                        _this.reasons = reason.data;
                    }))
            }
        },
        beforeMount(){
            this.currentHeight = common.gwh() - 55 ;
        },
        mounted() {
            this.currentHeight = common.gwh() - 55 ;
            window.addEventListener('resize', () => {
                this.currentHeight = common.gwh() - 55;
            });
            this.initFn(this)
            this.getQuery()
            this.$refs['tabPane'].getTableData({},this)

        },
        activated() {

        },
        watch: {
            collectors: function (val) {
                this.tableitems[3].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
                if(this.tableitems[5].subs[0].selectlist[0].value_name === ''){
                    this.tableitems[5].subs[0].selectlist[0].value_name = '全部'
                }

            }
        }
    };

</script>

