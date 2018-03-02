<template>
    <section>
        <CommonTable
                :queryapi="queryapi"
                :exportapi="exportapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"

                :hideTool="hideTool"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showImg="showImg"
                v-on:showImg_Order="showImgDialog"
                :imgapi="imgapi"
                ref="bolinkuniontable"
        ></CommonTable>
        <el-dialog title="车辆图片" :visible.sync="imgDialog" width="40%">
            <p>进场图片</p>
            <div v-for="img in img_in">
                <img v-bind:src="imgpath+img" width="600px" height="450px"/>
            </div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="imgDialog = false" size="small">确 认</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    import {path, orderStateType, orderPayType, parkType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'

    import axios from 'axios'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: false,
                hideSearch: false,

                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,

                hideTool: false,
                showImg: true,
                showBusinessCars: true,
                queryapi: '/unorder/query',
                exportapi: '/order/exportExcel',
                imgapi: '/order/getOrderPicture ',
                btswidth: '100',
                fieldsstr: 'id__groupid__comid__berthsec_id__cid__uid__prepaid__parking_type__c_type__car_number__create_time__duration__state__id__in_passid__order_id_local',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '所属车场',
                            prop: 'comid',
                            width: '150',
                            type: 'selection',
                            selectlist: this.parklist,
                            searchable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                let result = common.nameformat(row, this.parklist, 'comid');
                                if (result == '请选择')
                                    result = '';
                                return result;
                            }

                        }]
                    },
                    // {
                    //
                    //     hasSubs: false,
                    //     subs: [{
                    //         label: '所属泊位段',
                    //         prop: 'berthsec_id',
                    //         width: '123',
                    //         type: 'str',
                    //
                    //         searchable: true,
                    //
                    //         unsortable: true,
                    //         align: 'center'
                    //     }]
                    // }, {
                    //
                    //     hasSubs: false,
                    //     subs: [{
                    //         label: '泊位编号',
                    //         prop: 'cid',
                    //         width: '123',
                    //         type: 'str',
                    //
                    //         searchable: true,
                    //
                    //         unsortable: true,
                    //         align: 'center'
                    //     }]
                    // },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '进场收费员',
                            prop: 'uid',
                            width: '150',
                            type: 'selection',
                            selectlist: this.collectors,
                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                let result = common.nameformat(row, this.collectors, 'uid');
                                if (result == '请选择')
                                    result = '';
                                return result;
                                // return common.nameformat(row, this.collectors, 'uid');
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '预付金额',
                            prop: 'prepaid',
                            width: '123',
                            type: 'str',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车场类型',
                            prop: 'parking_type',
                            width: '123',
                            type: 'selection',
                            selectlist: parkType,
                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, parkType, 'parking_type')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '进场方式',
                            prop: 'c_type',
                            width: '123',
                            type: 'str',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车牌号',
                                prop: 'car_number',
                                width: '123',
                                type: 'str',

                                searchable: true,

                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '进场时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: false,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '停车时长',
                            prop: 'duration',
                            width: '180',
                            type: 'number',
                            editable: true,

                            addable: true,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '状态',
                            prop: 'state',
                            width: '123',
                            type: 'selection',
                            selectlist: orderStateType,
                            editable: true,

                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.nameformat(row, orderStateType, 'state')
                            }
                        }]
                    }, {

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
                            label: '进场通道',
                            prop: 'in_passid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                let pass = row.in_passid
                                return pass == '' || pass == undefined ? '无' : pass
                            }
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '车场订单编号',
                            prop: 'order_id_local',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },

                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                img_in: [],
                img_out: [],
                imgpath: '',
                collectors: '',
                parklist: '',
            }
        },
        methods: {
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token')
                console.log(this.imgdialog_url)

                let _this = this
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path
                        console.log(_this.img_in)
                        console.log(_this.img_out)
                    }))

                this.imgDialog = true
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID_UNION.businessOrder_Cars == item.auth_id) {
                        // console.log(item.sub_auth)
                        // this.hideExport = !common.showSubExport(item.sub_auth)
                        // this.hideSearch = !common.showSubSearch(item.sub_auth)
                        break;
                    }
                }

            }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
            // getCollector
            let _this = this
            axios.all([common.getAllCollector(), common.getAllParks()])
                .then(axios.spread(function (ret, parks) {
                    _this.collectors = ret.data;
                    _this.parklist = parks.data;
                    // console.log(ret.data)
                }))
        },
        watch: {
            collectors: function (val) {
                this.tableitems[2].subs[0].selectlist = val
            },
            parklist: function (val) {
                this.tableitems[1].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

