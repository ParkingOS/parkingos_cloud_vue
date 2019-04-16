<template>
    <div class="table-expand-reset">
        <div v-if="nameType == 'order-manage'">
            <el-row :gutter="20">
                <el-col :span="12" class="order-expand-style">
                    <div class="order-expand-box order-expand-box-left">
                        <div class="order-img-box">
                            <img style="width: 203px;height: 115px;vertical-align: middle;" :src="img_in" alt="入场图片">
                            <span>入场图片</span>
                        </div>

                        <div class="order-expand-info">
                            <p><span>入场方式：</span>{{expandData.c_type}}</p>
                            <p><span>入场通道：</span>{{expandData.in_passid}}</p>
                            <p><span>入场时间：</span>{{common.dateformat(expandData.create_time)}}</p>
                            <p><span>收费人员：</span>{{common.nameformat(expandData, formatCollectors, 'uid')}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="order-expand-style">
                    <div class="order-expand-box">
                        <div class="order-img-box">
                            <img style="width: 203px;height: 115px;vertical-align: middle;" :src="img_out" alt="出场图片">
                            <span>出场图片</span>
                        </div>
                        <div class="order-expand-info">
                            <p><span>停车时长：</span>{{expandData.duration}}</p>
                            <p><span>出场通道：</span>{{expandData.out_passid}}</p>
                            <p><span>出场时间：</span>{{common.dateformat(expandData.end_time)}}</p>
                            <p><span>收费人员：</span>{{common.nameformat(expandData, formatCollectors, 'out_uid')}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="nameType == 'month-member'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="创建时间">
                    <span>{{ common.dateformat(expandData.create_time) }}</span>
                </el-form-item>
                <el-form-item label="车位">
                    <span>{{expandData.p_lot}}</span>
                </el-form-item>
                <div>
                    <el-form-item label="购买时间">
                        <span>{{ common.dateformat(expandData.create_time) }}</span>
                    </el-form-item>
                    <el-form-item label="地址">
                        <span>{{expandData.address}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车辆类型">
                        <span>{{common.nameformat(expandData, this.formatCollectors, 'car_type_id')}}</span>
                    </el-form-item>
                    <el-form-item label="套餐名称">
                        <span>{{common.nameformat(expandData, this.pname, 'pid')}}</span>
                    </el-form-item>
                </div>
                <el-form-item label="单双日限行">
                    <span>{{common.nameformat(expandData, singleDoubleType, 'limit_day_type')}}</span>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="nameType == 'month-member-refill'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="开始时间">
                    <span>{{common.dateformat(expandData.start_time)}}</span>
                </el-form-item>
                <el-form-item label="应收金额">
                    <span>{{expandData.amount_receivable}}</span>
                </el-form-item>
                <div>
                    <el-form-item label="结束时间">
                        <span>{{common.dateformat(expandData.limit_time)}}</span>
                    </el-form-item>
                    <el-form-item label="收费员">
                        <span>{{expandData.collector}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div v-if="nameType == 'shop'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="创建时间">
                        <span>{{common.dateformat(expandData.create_time)}}</span>
                    </el-form-item>
                    <el-form-item label="优惠类型">
                        <span>{{expandData.ticket_type == 1? '时长减免':'金额减免'}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="地址">
                        <span>{{expandData.address}}</span>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <span>{{expandData.mobile}}</span>
                    </el-form-item>
                </div>
                <div class="custem-width">
                    <el-form-item label="手输额度">
                        <span>{{expandData.hand_input_enable == 0?'不支持':'支持'}}</span>
                    </el-form-item>
                    <el-form-item label="全免券">
                        <span>{{expandData.support_type == 0?'不支持':'支持'}}</span>
                    </el-form-item>
                    <el-form-item label="固定码使用">
                        <span>{{expandData.use_fix_code == 0?'不支持':'支持'}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div v-if="nameType == 'coupon'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                     <el-form-item label="编号">
                        <span>{{expandData.id}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{common.dateformat(expandData.create_time)}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用时间">
                        <span>{{common.dateformat(expandData.use_time)}}</span>
                    </el-form-item>
                </div>

            </el-form>
        </div>
        <div v-if="nameType == 'employee-permission'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="创建时间">
                        <span>{{common.dateformat(expandData.reg_time)}}</span>
                    </el-form-item>
                    <el-form-item label="电话">
                        <span>{{expandData.phone}}</span>
                    </el-form-item>
                </div>

            </el-form>
        </div>
        <div v-if="nameType == 'fixCode'" style="width: 100%">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="可用时段">
                        <span>{{expandData.time_inuse}}</span>
                    </el-form-item>
                    <el-form-item label="">

                    </el-form-item>
                </div>

            </el-form>
        </div>
        <div v-if="nameType == 'business-order-cars'">
            <el-row :gutter="20">
                <el-col :span="12" class="order-expand-style">
                    <div class="order-expand-box">
                        <div class="order-img-box">
                            <img style="width: 203px;height: 115px;vertical-align: middle;" :src="img_in" alt="入场图片">
                            <span>入场图片</span>
                        </div>

                        <div class="order-expand-info">
                            <p><span>入场方式：</span>{{expandData.c_type}}</p>
                            <p><span>停车时长：</span>{{expandData.duration}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="order-expand-style">

                </el-col>
            </el-row>
        </div>
        <div v-if="nameType == 'business-order-orders'">
            <el-row :gutter="20">
                <el-col :span="12" class="order-expand-style">
                    <div class="order-expand-box order-expand-box-left">
                        <div class="order-img-box">
                            <img style="width: 203px;height: 115px;vertical-align: middle;" :src="img_in" alt="入场图片">
                            <span>入场图片</span>
                        </div>

                        <div class="order-expand-info">
                            <p><span>车型：</span>{{expandData.car_type}}</p>
                            <p><span>入场方式：</span>{{expandData.c_type}}</p>
                            <p><span>入场通道：</span>{{expandData.in_passid}}</p>
                            <p><span>入场时间：</span>{{common.dateformat(expandData.create_time)}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="order-expand-style">
                    <div class="order-expand-box">
                        <div class="order-img-box">
                            <img style="width: 203px;height: 115px;vertical-align: middle;" :src="img_out" alt="出场图片">
                            <span>出场图片</span>
                        </div>
                        <div class="order-expand-info">
                            <p><span>收款人名称：</span>{{common.nameformat(expandData, formatCollectors, 'out_uid')}}</p>
                            <p><span>收款人账号：</span>{{expandData.out_uid}}</p>
                            <p><span>出场通道：</span>{{expandData.out_passid}}</p>
                            <p><span>出场时间：</span>{{common.dateformat(expandData.end_time)}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="nameType == 'memner-monthvip'">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="单双号限行">
                        <span>{{common.nameformat(expandData,pname,'limit_day_type')}}</span>
                    </el-form-item>
                    <el-form-item label="车型类型">
                        <span>{{common.nameformat(expandData, formatCollectors, 'car_type_id')}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="联系电话">
                        <span>{{expandData.mobile}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{expandData.remark}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div v-if="nameType == 'setting-park'">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="剩余车位数">
                        <span>{{expandData.empty}}</span>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <span>{{common.dateformat(expandData.update_time)}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车场地址">
                        <span>{{expandData.address}}</span>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div v-if="nameType == 'member-white-list'">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="更新时间">
                        <span>{{common.dateformat(expandData.u_time)}}</span>
                    </el-form-item>
                    <el-form-item label="车主姓名">
                        <span>{{expandData.user_name}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车主电话">
                        <span>{{expandData.mobile}}</span>
                    </el-form-item>
                    <el-form-item label="车位">
                        <span>{{expandData.car_location}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {path} from '../../api/api';
    import common from '../../common/js/common';
    import ElForm from 'element-ui/packages/form/src/form';
    export default {
        components: {ElForm},
        name: 'table-expand',
        props:{
            nameType:String,
            expandData:Object,
            expandLabel:Array,
            formatCollectors:Array,
            pname:Array,
            singleDoubleType:Array,
        },
        data(){
            return {
                imgapi: '/order/getOrderPicture',
                img_in:"",
                img_out:'',
            }
        },
        methods:{
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&id=' + row.id+ '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                let _this = this;
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path;
                    }));

            }
        },
        mounted(){
            let that = this;
            if(that.nameType == 'order-manage' || that.nameType == 'business-order-cars' ||that.nameType == 'business-order-orders'){
                if(that.nameType == 'business-order-cars' ||that.nameType == 'business-order-orders'){
                    this.imgdialog_url = path + this.imgapi + '?orderid=' + this.expandData.order_id_local + '&comid=' + this.expandData.comid + '&token=' + sessionStorage.getItem('token');
                }else{
                    this.imgdialog_url = path + this.imgapi + '?orderid=' + this.expandData.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token');
                }

                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        if(ret.status == 200){
                            that.img_in = path+ret.data.in;
                            that.img_out =path+ ret.data.out;
                        }else{
                            that.img_in = '';
                            that.img_out ='';
                        }
                    }));
            }else{

            }


        },
        activated(){

        },
        watch:{

        }
    };
</script>

<style lang="scss">
    .demo-table-expand {
        font-size: 0;
        .custem-width{
            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 25%;
            }
            label {
                width: 90px;
                color: #99a9bf;
            }
        }
        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
        label {
            width: 90px;
            color: #99a9bf;
        }
    }
    .order-expand-box{
        height: 115px;
        .order-img-box{
            position: relative;
            float: left;
            span{
                position: absolute;
                bottom: 5px;
                right: 17px;
                z-index: 2;
                font-size: 14px;
                color: rgba(255,255,255,0.80);
                text-shadow:2px 0px 2px #000;
            }
        }
    }
    .order-expand-box-left{
        border-right: 1px dotted #979797;
    }
    .order-expand-info{
        margin-left: 230px;
        p{
            line-height: 28px;
            font-size: 14px;
            color: rgba(0,0,0,0.80);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span{
                font-size: 14px;
                color: rgba(0,0,0,0.80);
                font-weight: 700;
            }
        }
    }

</style>
