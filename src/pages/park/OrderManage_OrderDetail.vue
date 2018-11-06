<template>
    <section class="right-wrapper-size">
        <header class="custom-header" @click="saveModify" style="cursor: pointer">
            <i class="el-icon-arrow-left"></i>订单管理-订单记录-详情页
        </header>
        <div class="workbench-wrapper">
            <p class="order-title"><span class="bar-icon"></span>基本信息</p>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="4" class="order-detail-lable">订单编号</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.order_id_local}}</el-col>
                <el-col :span="4" class="order-detail-lable">车牌号码</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.car_number}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">车型</el-col>
                <el-col :span="8" class="order-detail-content" style="border-right: 1px solid #EEE">{{currentRow.car_type}}</el-col>
            </el-row>
            <p class="order-title"><span class="bar-icon"></span>出入场信息</p>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="4" class="order-detail-lable">入场方式</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.c_type}}</el-col>
                <el-col :span="4" class="order-detail-lable">停车时长</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.duration}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">入场通道</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.in_passid}}</el-col>
                <el-col :span="4" class="order-detail-lable">出场通道</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.out_passid}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">入场时间</el-col>
                <el-col :span="8" class="order-detail-content">{{common.dateformat(currentRow.create_time)}}</el-col>
                <el-col :span="4" class="order-detail-lable">出场时间</el-col>
                <el-col :span="8" class="order-detail-content">{{common.dateformat(currentRow.end_time)}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">入场收费员</el-col>
                <el-col :span="8" class="order-detail-content">{{common.nameformat(currentRow, collectors, 'uid')}}</el-col>
                <el-col :span="4" class="order-detail-lable">出场收费员</el-col>
                <el-col :span="8" class="order-detail-content">{{common.nameformat(currentRow, collectors, 'out_uid')}}</el-col>
            </el-row>

            <p class="order-title"><span class="bar-icon"></span>收费信息</p>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="4" class="order-detail-lable">支付方式</el-col>
                <el-col :span="8" class="order-detail-content" style="border-right: 1px solid #EEE">{{common.nameformat(currentRow, orderPayType, 'pay_type')}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">应收金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.amount_receivable}}</el-col>
                <el-col :span="4" class="order-detail-lable">实收金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.total}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">减免金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.reduce_amount}}</el-col>
                <el-col :span="4" class="order-detail-lable">优惠原因</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.freereasons}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">电子预付金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.electronic_prepay}}</el-col>
                <el-col :span="4" class="order-detail-lable">电子结算金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.electronic_pay}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-top: none;">
                <el-col :span="4" class="order-detail-lable">现金预付金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.cash_prepay}}</el-col>
                <el-col :span="4" class="order-detail-lable">现金结算金额</el-col>
                <el-col :span="8" class="order-detail-content">{{currentRow.cash_pay}}</el-col>
            </el-row>
            <p class="order-title"><span class="bar-icon"></span>影像信息</p>
            <el-row type="flex" justify="center" align="center">
                <el-col :span="10"  class="out_photo">
                    <p class="out_photo_text">入场图片</p>
                    <img :src="imgpath+img_in" style="display: inline-block;width: 100%;height: 100%">
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="10" class="out_photo">
                    <p class="out_photo_text">出场图片</p>
                    <img :src="imgpath+img_out" style="display: inline-block;width: 100%;height: 100%">
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
                defalut:require('@/assets/images/no_car_photo.png'),
                img_in: '',
                img_out: '',
                imgpath: '',
                imgdialog_url: '',
                imgapi: '/order/getOrderPicture',
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
                this.$router.history.go(-1);
            },
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                let _this = this;
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path;
                    }));

            }
        },
        mounted() {
        },
        activated() {
            if(typeof this.$route.query.row =="string"){
                this.currentRow = JSON.parse(sessionStorage.getItem('orderRow'));
            }else{
                this.currentRow = this.$route.query.row;
            }
            this.currentIndex = this.$route.query.index;
            this.img_in = [];
            this.img_out = [];
            this.showImgDialog(this.currentIndex, this.currentRow);
            this.detailStyle = 'width: 100%;height: ' + (common.gwh() - 80) + 'px;overflow-y: auto;';

            let _this = this;
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    _this.collectors = ret.data;
                }));
        }
    };
</script>

<style scoped>
</style>