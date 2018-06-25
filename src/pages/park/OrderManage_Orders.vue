<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :exportapi="exportapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"

                :orderfield="orderfield"
                :hideTool="hideTool"
                :showParkInfo="showParkInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showImgSee="showImg"
                v-on:showImg_Order="showImgDialog"
                :imgapi="imgapi"
                ref="bolinkuniontable"
        ></common-table>
        <el-dialog title="车辆图片" :visible.sync="imgDialog" width="40%">
            <!--<img v-bind:src="imgdialog_url" width="600px" height="450px"/>-->
            <!--<img src="https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg"/>-->
            <p>入场图片</p>
            <div v-for="img in img_in">
                <img v-bind:src="imgpath+img" :width="imgSize*4/3" :height="imgSize"/>
            </div>
            <p>出场图片</p>
            <div v-for="img in img_out">
                <img v-bind:src="imgpath+img" :width="imgSize*4/3" :height="imgSize"/>
            </div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="imgDialog = false" size="small">确 认</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType} from '../../api/api';
    import util from '../../common/js/util';
    import common from '../../common/js/common';
    import {AUTH_ID} from '../../common/js/const';
    import CommonTable from '../../components/CommonTable';
    import axios from 'axios';

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                currentScrollHeight:0,
                loading: false,
                hideExport: false,
                hideSearch: false,
                orderfield:'create_time',
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: true,
                hideTool: false,
                showImg: true,
                imgSize: 450,
                queryapi: '/order/query',
                exportapi: '/order/exportExcel',
                imgapi: '/order/getOrderPicture ',
                btswidth: '100',
                fieldsstr: 'id__c_type__car_number__car_type__create_time__end_time__duration__pay_type__freereasons__amount_receivable__total__electronic_prepay__cash_prepay__electronic_pay__cash_pay__reduce_amount__uid__out_uid__state__url__in_passid__out_passid__order_id_local',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车场订单编号',
                            prop: 'order_id_local',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',

                            searchable: true,
                            hidden:true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场方式',
                            prop: 'c_type',
                            width: '123',
                            type: 'str',
                            hidden:true,
                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号码',
                                prop: 'car_number',
                                width: '123',
                                type: 'str',

                                searchable: true,

                                unsortable: true,
                                align: 'center'
                            }
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '车型',
                            prop: 'car_type',
                            width: '100',
                            type: 'str',
                            hidden:true,
                            searchable: false,

                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '停车时长',
                            prop: 'duration',
                            width: '180',
                            type: 'number',
                            editable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '订单状态',
                            prop: 'state',
                            width: '100',
                            type: 'selection',
                            selectlist: orderStateType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, orderStateType, 'state');
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '支付方式',
                            prop: 'pay_type',
                            width: '100',
                            type: 'selection',
                            selectlist: orderPayType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, orderPayType, 'pay_type');
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠原因',
                            prop: 'freereasons',
                            width: '100',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.freereasons;
                                return pass == '' || pass == undefined ? '无' : pass;
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '应收金额',
                            prop: 'amount_receivable',
                            width: '100',
                            type: 'number',
                            hidden:true,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '实收金额',
                            prop: 'total',
                            width: '100',
                            type: 'number',

                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '入场时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,

                            unsortable: false,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time);
                            }
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '出场时间',
                            prop: 'end_time',
                            width: '180',
                            type: 'date',

                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.end_time);
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '电子预付金额',
                            prop: 'electronic_prepay',
                            width: '150',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '现金预付金额',
                            prop: 'cash_prepay',
                            width: '150',
                            type: 'str',
                            hidden:true,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '电子结算金额',
                            prop: 'electronic_pay',
                            width: '150',
                            type: 'str',
                            hidden:true,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '现金结算金额',
                            prop: 'cash_pay',
                            width: '150',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '减免金额',
                            prop: 'reduce_amount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场收费员',
                            prop: 'uid',
                            width: '123',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            hidden:true,
                            align: 'center',
                            format: (row) => {
                                // let uidstr = common.nameformat(row,this.collectors,'uid')
                                // return uidstr==''||uidstr==undefined?(row.uid==-1?'无':row.uid):uidstr
                                return common.nameformat(row, this.collectors, 'uid');
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收款人',
                            prop: 'out_uid',
                            width: '123',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: true,
                            addable: true,
                            hidden:true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                // let uidstr = common.nameformat(row,this.collectors,'out_uid')
                                // return uidstr==''||uidstr==undefined?row.uid:uidstr
                                return common.nameformat(row, this.collectors, 'out_uid');
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '查看车辆图片',
                            prop: 'url',
                            width: '123',
                            type: 'str',

                            unsortable: true,
                            hidden: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入场通道',
                            prop: 'in_passid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            hidden:true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.in_passid;
                                return pass == '' || pass == undefined ? '无' : pass;
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '出场通道',
                            prop: 'out_passid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            hidden:true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.out_passid;
                                return pass == '' || pass == undefined ? '无' : pass;
                            }
                        }]
                    }

                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                img_in: [],
                img_out: [],
                imgpath: '',
                collectors: ''
            };
        },
        methods: {
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                console.log(this.imgdialog_url);

                let _this = this;
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path;
                        console.log(_this.img_in);
                        console.log(_this.img_out);
                    }));

                this.imgDialog = true;
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            let user = sessionStorage.getItem('user');
            // this.user = user;
            if (user) {
                user = JSON.parse(user);
                // console.log(user.authlist.length);
                for (var item of user.authlist) {
                    if (AUTH_ID.orderManage_Orders == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth);
                        // this.hideSearch = !common.showSubSearch(item.sub_auth);
                        this.hideSearch = true;
                        break;
                    }
                }

            }

        /*
        * 初次加载数据
        * */
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({});
            // getCollector
            let _this = this;
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    _this.collectors = ret.data;
                    // console.log(ret.data)
                }));

        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.imgSize = common.gww() / 4;
            // this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            // this.$refs['bolinkuniontable'].getTableData({});
            // // getCollector
            // let _this = this;
            // axios.all([common.getCollector()])
            //     .then(axios.spread(function (ret) {
            //         _this.collectors = ret.data;
            //         // console.log(ret.data)
            //     }));
        },
        watch: {
            collectors: function (val) {
                this.tableitems[16].subs[0].selectlist = val;
                this.tableitems[17].subs[0].selectlist = val;
            }
        }
    };

</script>

<style>
    .gutter {
        display: none
    }
</style>
