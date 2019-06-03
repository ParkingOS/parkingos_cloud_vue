<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>详情页</p>
                <div class="float-right">
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="saveModify" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                </div>
            </header>
        </div>
        <div class="order-base-info">
            <p class="order-title"><span class="bar-icon"></span>基本信息</p>
            <el-row type="flex" justify="start" align="center" class="order-detail-row">
                <el-col :span="5" class="order-detail-lable">状态</el-col>
                <el-col :span="7" class="order-detail-content">{{currentRow.state == 1?'正常':'禁用' }}</el-col>
                <el-col :span="5" class="order-detail-lable">车场地址</el-col>
                <el-col :span="7" class="order-detail-content">{{currentRow.address}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="margin-top: 20px">
                <el-col :span="3" class="order-detail-lable">车位数</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.total_plot}}</el-col>
                <el-col :span="3" class="order-detail-lable">余位数</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.empty_plot}}</el-col>
                <el-col :span="3" class="order-detail-lable">联系手机</el-col>
                <el-col :span="5" class="order-detail-content">{{currentRow.phone}}</el-col>
            </el-row>
            <el-row type="flex" justify="start" align="center" class="order-detail-row" style="margin-top: 20px">
                <el-col :span="3" class="order-detail-lable">余额</el-col>
                <el-col :span="5" class="order-detail-content">{{common.balanceformat(currentRow.balance,2)}}</el-col>
                <el-col :span="3" class="order-detail-lable">新建日期</el-col>
                <el-col :span="5" class="order-detail-content">{{common.dateformat(currentRow.ctime)}}</el-col>
                <el-col :span="3" class="order-detail-lable">修改日期</el-col>
                <el-col :span="5" class="order-detail-content">{{common.dateformat(currentRow.utime)}}</el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import {path} from '@/api/api';
    import common from '@/common/js/common';
    import axios from 'axios';

    export default {
        components: {},
        data() {
            return {
                currentIndex: 0,
                currentRow: {},
                getNewRowApi:'/order/getorderdetail',
                orderImg:require('@/assets/images/order-back.png'),
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
        },
        mounted() {

        },
        computed: {

        },
        activated() {
            if(typeof this.$route.query.row =="string"){
                this.currentRow = JSON.parse(sessionStorage.getItem('orderRow'));
            }else{
                this.currentRow = this.$route.query.row;
            }
            this.detailStyle = 'width: 100%;height: ' + (common.gwh() - 80) + 'px;overflow-y: auto;';

        }
    };
</script>

<style scoped>
</style>