<template>
    <section>
        <CommonTable
                :queryapi="queryapi"
                :exportapi="exportapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hideExport="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"

                :hideTool="hideTool"

                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showImg="showImg"
                v-on:showImg_Pole="showImgDialog"
                :imgapi="imgapi"
                ref="bolinkuniontable"
        ></CommonTable>
        <el-dialog title="抬杆图片" :visible.sync="imgDialog" width="40%">
            <!--<p>入场图片：</p>-->
            <!--<img v-bind:src="imgdialog_url" width="600px" height="450px"/>-->
            <!--<img v-bind:src="imgdialog_url" width="600px" height="450px"/>-->
            <!--<p>出场图片：</p>-->
            <img v-bind:src="imgdialog_url" width="600px" height="450px"/>
            <!--<img src="https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg"/>-->
            <span slot="footer" class="dialog-footer">
				<el-button @click="imgDialog = false" size="small">确 认</el-button>
			</span>
        </el-dialog>
    </section>
</template>


<script>
    import {path} from '../../api/api';
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
                showBusinessPoles: true,
                queryapi: '/cityliftRod/query',
                exportapi: '/liftRod/exportExcel',
                imgapi: '/liftRod/getLiftRodPicture',
                btswidth: '100',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '100',
                            type: 'number',

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '抬杆编号',
                            prop: 'liftrod_id',
                            width: '200',
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
                            width: '180',
                            type: 'date',

                            searchable: true,

                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.ctime)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '收费员',
                            prop: 'uin',
                            width: '100',
                            type: 'selection',
                            selectlist: this.collectors,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                let uidstr = common.nameformat(row, this.collectors, 'uin')
                                return uidstr == '' || uidstr == undefined ? row.uid : uidstr
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '通道',
                            prop: 'out_channel_id',
                            width: '100',
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
                            width: '200',
                            type: 'selection',
                            selectlist: this.reasons,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                // console.log(this.reasons)

                                // let reasss = common.nameformat(row, this.reasons, 'reason')
                                // console.log(row.reason)
                                // return reasss
                                return common.nameformat(row, this.reasons, 'reason')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'resume',
                            width: '200',
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
                            label: '查看抬杆图片',
                            prop: 'url',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            hidden: true,
                            align: 'center',
                            format: function (row) {
                                return "查看抬杆图片"
                            }
                        }]
                    },

                ],
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: []
            }
        },
        methods: {
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?liftrodid=' + row.liftrod_id + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token')
                console.log(this.imgdialog_url)
                this.imgDialog = true
            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID_UNION.businessOrder_Poles == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
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
            let _this = this
            axios.all([common.getAllCollector(), common.getLiftReason()])
                .then(axios.spread(function (collector, reason) {
                    _this.collectors = collector.data;
                    _this.reasons = reason.data;
                }))
        },
        watch: {
            collectors: function (val) {
                this.tableitems[3].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

