<template>
    <section style="padding: 10px;">
        <div :style="detailStyle">
            <el-row>
                <el-button @click="saveModify"> < 订单记录/订单详情</el-button>
            </el-row>
            <el-row style="margin-top:28px">
                <el-col :span="12" style="padding: 10px">
                    <table align="center" border="1px" bordercolor="#000000" cellspacing="0px">
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">车场订单编号</td>
                            <td style="width:250px;text-align:center">{{currentRow.order_id_local}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">进场方式</td>
                            <td style="width:250px;text-align:center">{{currentRow.c_type}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">车牌号码</td>
                            <td style="width:250px;text-align:center">{{currentRow.car_number}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">车型</td>
                            <td style="width:250px;text-align:center">{{currentRow.car_type}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">进场时间</td>
                            <td style="width:250px;text-align:center">{{common.dateformat(currentRow.create_time)}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">进场通道</td>
                            <td style="width:250px;text-align:center">{{currentRow.in_passid}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">出场时间</td>
                            <td style="width:250px;text-align:center">{{common.dateformat(currentRow.end_time)}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">出场通道</td>
                            <td style="width:250px;text-align:center">{{currentRow.out_passid}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">停车时长</td>
                            <td style="width:250px;text-align:center">{{currentRow.duration}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">支付方式</td>
                            <td style="width:250px;text-align:center">{{common.nameformat(currentRow, orderPayType,
                                'pay_type')}}
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">优惠原因</td>
                            <td style="width:250px;text-align:center">{{currentRow.freereasons}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">应收金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.amount_receivable}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">实收金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.total}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">电子预付金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.electronic_prepay}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">现金预付金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.cash_prepay}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">电子结算金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.electronic_pay}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">现金结算金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.cash_pay}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">减免金额</td>
                            <td style="width:250px;text-align:center">{{currentRow.reduce_amount}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">入场收费员</td>
                            <td style="width:250px;text-align:center">{{common.nameformat(currentRow, collectors, 'uid')}}</td>
                        </tr>
                        <tr>
                            <td style="background-color:#CCCCCC;height:30px;width:150px;text-align:center">出场收费员</td>
                            <td style="width:250px;text-align:center">{{common.nameformat(currentRow, collectors, 'out_uid')}}</td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="12" style="padding: 10px">
                    <p>进场图片</p>
                    <div v-for="img in img_in">
                        <img v-bind:src="imgpath+img" :width="imgSize*4/3" :height="imgSize"/>
                    </div>
                    <p>出场图片</p>
                    <div v-for="img in img_out">
                        <img v-bind:src="imgpath+img" :width="imgSize*4/3" :height="imgSize"/>
                    </div>
                </el-col>

            </el-row>
        </div>
    </section>

</template>

<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common';
    import axios from 'axios';

    export default {
        components: {},
        data() {
            return {
                currentIndex: 0,
                currentRow: {},
                img_in: [],
                img_out: [],
                imgpath: '',
                imgdialog_url: '',
                imgapi: '/order/getOrderPicture ',
                imgSize: 300,
                detailStyle: '',
                orderPayType: [
                    //0:帐户支付,1:现金支付,2:手机支付 3:包月 4:现金预支付 5：银联卡(中央预支付，后面废弃) 6：商家卡(中央预支付，后面废弃) 8：免费放行 9：刷卡
                    // {'value_name': '账户支付', 'value_no': 0},
                    {'value_name': '无', 'value_no': -1},
                    {'value_name': '现金支付', 'value_no': 1},
                    {'value_name': '手机支付', 'value_no': 2},
                    {'value_name': '包月', 'value_no': 3},
                    // {'value_name': '现金预支付', 'value_no': 4,},
                    // {'value_name': '银联卡支付', 'value_no': 5,},
                    // {'value_name': '商家卡支付', 'value_no': 6,},
                    {'value_name': '免费放行', 'value_no': 8}
                    // {'value_name': '刷卡', 'value_no': 9}
                ],
                collectors: []
            };
        },
        methods: {

            saveModify: function () {

                // this.$router.pop();
                // console.log(this.$route.query.index);
                // console.log(this.$route.query.row);
                this.$router.history.go(-1);


            },
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                console.log(this.imgdialog_url);

                let _this = this;
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path;
                        // console.log(_this.img_in);
                        // console.log(_this.img_out);
                    }));

            }
        },
        mounted() {

        },
        activated() {
            this.currentRow = this.$route.query.row;
            this.currentIndex = this.$route.query.index;
            this.showImgDialog(this.currentIndex, this.currentRow);
            // console.log(this.currentRow);
            this.detailStyle = 'width: 100%;height: ' + (common.gwh() - 80) + 'px;overflow-y: auto;';

            let _this = this;
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    _this.collectors = ret.data;
                    // console.log(ret.data)
                }));
        }
    };
</script>

<style scoped>
    .el-dialog__body {
        padding: 60px 20px;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
    }
</style>