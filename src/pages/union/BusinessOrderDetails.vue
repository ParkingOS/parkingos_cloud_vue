<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">业务订单<span style="margin: 2px">-</span>订单记录<span style="margin: 2px">-</span>详情页</p>
                <div class="float-right">
                    <!--<el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>-->
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="saveModify" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                </div>
            </header>
        </div>
        <div class="order-base-info">
            <p class="order-title"><span class="bar-icon"></span>基本信息</p>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="3" class="order-detail-lable">订单编号</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.order_id_local}}</el-col>
                <el-col :span="3" class="order-detail-lable">车牌号码</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.car_number}}</el-col>
                <el-col :span="3" class="order-detail-lable">车型信息</el-col>
                <el-col :span="5" class="order-detail-content" style="border-right: 1px solid #EEE">{{currentRow.car_type}}</el-col>
            </el-row>
        </div>
        <div class="order-base-info">
            <p class="order-title"><span class="bar-icon"></span>收费信息</p>
            <el-row type="flex" justify="start" align="center" class="order-money-wrapper" style="margin-bottom: 20px">
                <el-col class="order-info-receivable" :span="10">
                    <p class="rece-title">应收金额</p>
                    <div class="rece-content"><span class="rece-money">{{currentRow.amount_receivable}}元</span>（<span>实收金额 {{sumMoney}} 元</span><span>减免金额 {{currentRow.reduce_amount}} 元）</span></div>
                </el-col>
                <el-col class="order-info-receivable order-info-receipts" :span="14">
                    <p class="rece-title">实收金额</p>
                    <div class="rece-content"><span class="rece-money" style="color:#3C75CF">{{sumMoney}}元</span>(<span>电子预付 {{currentRow.electronic_prepay}} 元</span><span>现金预付 {{currentRow.cash_prepay}} 元</span><span>电子结算 {{currentRow.electronic_pay}} 元</span><span>现金结算 {{currentRow.cash_pay}} 元</span>)</div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="3" class="order-detail-lable">停车时长</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.duration}}</el-col>
                <el-col :span="3" class="order-detail-lable">支付方式</el-col>
                <el-col :span="5" class="order-detail-content">{{common.nameformat(currentRow, orderPayType, 'pay_type')}}</el-col>
                <el-col :span="5" class="order-detail-lable">优惠原因</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.freereasons}}</el-col>
            </el-row>
        </div>
        <div class="order-base-info" style="padding-bottom: 30px">
            <p class="order-title"><span class="bar-icon"></span>出入场信息</p>
            <div class="entrance-info">
                <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border:none">
                    <el-col style="width: 361px;margin-right: 42px;overflow: hidden;box-sizing: border-box">
                        <img :src="imgpath+img_in" style="width: 100%;height: 185px">
                    </el-col>
                    <el-col class="order-wrapper-s">
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none">
                            <el-col :span="6" class="order-detail-lable">车型</el-col>
                            <el-col :span="18" class="order-detail-content">{{currentRow.car_type}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none;">
                            <el-col :span="6" class="order-detail-lable">入场方式</el-col>
                            <el-col :span="18" class="order-detail-content">{{currentRow.c_type}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none">
                            <el-col :span="6" class="order-detail-lable">入场通道</el-col>
                            <el-col :span="18" class="order-detail-content">{{currentRow.in_passid}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" >
                            <el-col :span="6" class="order-detail-lable" >入场时间</el-col>
                            <el-col :span="18" class="order-detail-content">{{common.dateformat(currentRow.create_time)}}</el-col>
                        </el-row>

                    </el-col>
                </el-row>
                <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border:none;margin-top: 20px">
                    <el-col style="width: 361px;margin-right: 42px;overflow: hidden;box-sizing: border-box">
                        <img :src="imgpath+img_out" style="width: 100%;height: 185px">
                    </el-col>
                    <el-col class="order-wrapper-s">
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none;">
                            <el-col :span="6" class="order-detail-lable">收款人员</el-col>
                            <el-col :span="18" class="order-detail-content">{{common.nameformat(currentRow, collectors, 'out_uid')}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none">
                            <el-col :span="6" class="order-detail-lable">收款账号</el-col>
                            <el-col :span="18" class="order-detail-content">{{currentRow.out_uid == '-1'?'':currentRow.out_uid}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" style="border-bottom: none">
                            <el-col :span="6" class="order-detail-lable">出场通道</el-col>
                            <el-col :span="18" class="order-detail-content">{{currentRow.out_passid}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="start" align="center" class="order-detail-row" >
                            <el-col :span="6" class="order-detail-lable" >出场时间</el-col>
                            <el-col :span="18" class="order-detail-content">{{common.dateformat(currentRow.end_time)}}</el-col>
                        </el-row>

                    </el-col>
                </el-row>
            </div>
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
                orderImg:require('@/assets/images/order-back.png'),
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
                collectors: [],
                parklist:[],
            };
        },
        methods: {

            saveModify: function () {
                this.$router.history.go(-1);
            },
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + row.comid + '&token=' + sessionStorage.getItem('token');
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
        computed: {
            sumMoney: function () {
                let n = common.accAdd(this.currentRow.electronic_prepay,this.currentRow.cash_prepay);
                let n1 = common.accAdd(this.currentRow.electronic_pay,this.currentRow.cash_pay);
                let str = common.accAdd(n,n1);
                return str;
            }
        },
        activated() {
            if(typeof this.$route.query.row =="string"){
                this.currentRow = JSON.parse(sessionStorage.getItem('orderRow'));
            }else{
                this.currentRow = this.$route.query.row;
            }
            this.currentIndex = this.$route.query.index;
            this.img_in = '';
            this.img_out = '';
            this.imgpath= '';
            this.imgdialog_url='';
            this.showImgDialog(this.currentIndex, this.currentRow);
            this.detailStyle = 'width: 100%;height: ' + (common.gwh() - 80) + 'px;overflow-y: auto;';

            let _this = this;
            axios.all([common.getAllCollector(), common.getAllParks()])
                .then(axios.spread(function (ret, parks) {
                    _this.collectors = ret.data;
                    _this.parklist = parks.data;
                    // console.log(ret.data)
                }))
        }
    };
</script>

<style scoped>
</style>
