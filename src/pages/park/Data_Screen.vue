<template>
    <section class="data-screen-wrapper" :style="wrapperStyle">
        <header class="header" ref="header" :style="headerStyle">
            <span class="header-title">智慧停车指挥中心</span>
        </header>
        <div class="main" :style="mainStyle">
            <div class="subject">
                <!--三等分subject-->
                <el-row type="flex" justify="space-between" class="subject-main">
                    <el-col class="subject-item-left">
                        <!--左侧-->
                        <!--综合信息、入场车辆、出场车辆-->

                        <el-row type="flex" class="subject-item">
                            <!--1、综合信息-->
                            <el-col class="subject-item__common subject-item__info" :style="infoStyle">
                                <div class="info-wrapper-style">
                                    <div class="info-title">综合信息</div>
                                    <div class="info-content">
                                        <el-row :gutter="33" class="info-content__body">
                                            <el-col :span="12"  class="info-content__col">
                                                <div  class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="info-content__item_text_top" style="color:#02CAFF">
                                                        201820
                                                        <!--<countTo :startVal='0' :endVal='newVal' :duration='1000'></countTo>-->
                                                    </p>
                                                    <p class="info-content__item_text_bottom">空车位（个）</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="info-content__col">
                                                <div class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="info-content__item_text_top" style="color:#FFED74">201820</p>
                                                    <p class="info-content__item_text_bottom">月卡会员（人）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="33" class="info-content__body info-content__body_bottom">
                                            <el-col :span="12"  class="info-content__col">
                                                <div  class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="info-content__item_text_top" style="color:#ABFF74">201820</p>
                                                    <p class="info-content__item_text_bottom">优惠券发放（张）</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="info-content__col">
                                                <div class="info-content__col__item" :style="infoItemStyle">
                                                    <p class="info-content__item_text_top" style="color:#FE7153">201820</p>
                                                    <p class="info-content__item_text_bottom">访客未处理（人）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <!--入场信息-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">入场车辆</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="8"  justify="center" align="center"></el-col>
                                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="inPartData" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in inPartData' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="inParkStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.cartId}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                            <!--出场信息-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">出场车辆</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="8"  justify="center" align="center"></el-col>
                                            <el-col :span="8"  justify="center" align="center">车牌号</el-col>
                                            <el-col :span="8"  justify="center" align="center">通道名称</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="inPartData" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in inPartData' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="outParkStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.cartId}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="subject-item">
                        <el-row type="flex" class="subject-item" style="height: 100%">
                            <el-col class="subject-item__income" :style="parkAllStyle">
                                <div class="subject-income">
                                    <div class="subject-income__title">车场总收入 <span class="info-title__right">单位（元）</span></div>
                                    <div class="subject-income__body">
                                        <el-row :gutter="8" justify="space-between" class="income-body__money" type="flex">
                                            <el-col class="money-list-item" v-for="(item,index) in moneyList"
                                                    :key="index">
                                                <div :style="incomeBg" class="money-list-item__text">
                                                    <span class="item__text">{{item}}</span>
                                                </div>
                                                </el-col>
                                        </el-row>
                                        <div class="count-bar">
                                            <count-bar
                                                    type="total"
                                                    :max-val = '123678'
                                                    :current-val = '103678'
                                                    count-bar-title="电子支付占比"
                                                    count-bar-color="linear-gradient(270deg, #A5D4F3 0%, #6CA9E3 100%)"
                                            ></count-bar>
                                            <count-bar
                                                    type="total"
                                                    :max-val = '123678'
                                                    :current-val = '103678'
                                                    count-bar-title="现金支付占比"
                                                    count-bar-color="linear-gradient(270deg, #FFE5A2 0%, #FEC769 100%)"
                                            ></count-bar>
                                            <count-bar
                                                    type="total"
                                                    :max-val = '123678'
                                                    :current-val = '103678'
                                                    count-bar-title="减免金额占比"
                                                    count-bar-color="linear-gradient(270deg, #FFA98A 0%, #FE7052 100%)"
                                            ></count-bar>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col class="" :style="infoStyle" style="height: 33%"></el-col>
                            <!--进出车辆统计-->
                            <el-col class="subject-item__common subject-item__inout" :style="inoutParkStyle">
                                <div class="subject-inout">
                                    <div class="subject-inout__title">进出车辆统计</div>
                                    <el-row class="subject-inout__body" type="flex" justify="space-between" :style="inoutcount">
                                        <el-col class="subject-inout__body__item">
                                            <div class="subject-inout__text__top" style="color: #57F986;">00877</div>
                                            <div class="subject-inout__text__bottom">入场车辆</div>
                                        </el-col>
                                        <el-col class="subject-inout__body__item">
                                            <div class="subject-inout__text__top" style="color: #F9A957;">00877</div>
                                            <div class="subject-inout__text__bottom">离场车辆</div>
                                        </el-col>
                                        <el-col class="subject-inout__body__item">
                                            <div class="subject-inout__text__top" style="color: #5782F9;">00877</div>
                                            <div class="subject-inout__text__bottom">在场车辆</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="subject-item-left">
                        <el-row type="flex" class="subject-item">
                            <el-col class="subject-item__common" :style="infoStyle"></el-col>
                            <!--在线设备-->
                            <el-col class="subject-item__common subject-item__online" :style="onlineBgStyle">
                                <div class="subject-online">
                                    <div class="subject-online__title">在线设备</div>
                                    <div class="subject-online__body">
                                        <el-row :gutter="21" class="subject-online__list">
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="onLine">
                                                    <p class="subject-online__item_text_bottom">字符是有限制的</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="offLine">
                                                    <p class="subject-online__item_text_bottom">字符是有限制的不信你看</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="notUsed">
                                                    <p class="subject-online__item_text_bottom">空车位（个）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="21" class="subject-online__list subject-online__list__margin">
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="onLine">
                                                    <p class="subject-online__item_text_bottom">字符是有限制的</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="offLine">
                                                    <p class="subject-online__item_text_bottom">字符是有限制的不信你看</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8"  class="subject-online__item">
                                                <div  class="subject-online__col__item" :style="notUsed">
                                                    <p class="subject-online__item_text_bottom">空车位（个）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <!--抬杆原因-->
                            <el-col class="subject-item__common subject-item__entrance" :style="entranceStyle">
                                <div class="subject-park-entrance">
                                    <div class="park-entrance__title">抬杆原因</div>
                                    <div class="park-entrance__header" ref="parkEntranceHeader">
                                        <el-row type="flex">
                                            <el-col :span="6"  justify="center" align="center"></el-col>
                                            <el-col :span="6"  justify="center" align="center">通道</el-col>
                                            <el-col :span="6"  justify="center" align="center">收费员</el-col>
                                            <el-col :span="6"  justify="center" align="center">原因</el-col>
                                        </el-row>
                                    </div>
                                    <div class="park-entrance__body" :style="parkEnteranceBodyStyle">
                                        <vue-seamless-scroll :class-option="classOption" :data="inPartData" v-bind:style="{ overflow: 'hidden',height:'95%' }">
                                            <ul>
                                                <li  v-for='(item,index) in inPartData' :key="index" class="scroll-item-style">
                                                    <el-row type="flex">
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" ><span class="inpark" :style="abnormalStyle"></span>{{item.time}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow" >{{item.cartId}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                        <el-col :span="8"  justify="center" align="center" class="scroll-tiem__overflow">{{item.parkName}}</el-col>
                                                    </el-row>
                                                </li>
                                            </ul>
                                        </vue-seamless-scroll>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
    </section>
</template>


<script>
    import countTo from 'vue-count-to';
    import countBar from '../../components/CountBar'
    export default {
        name: 'data_-screen',
        components: { countTo,countBar },
        data(){
            let that = this;
            return {
                moneyList:['-','-','-',1,2,3,6,7,8],
                newVal:201821,
                inPartData:[
                    {
                        parkName:'B2 A11 旋转入口',
                        time:'15:05:00',
                        cartId:'京A231B2'
                    },{
                        parkName:'B2 A11 旋转入口',
                        time:'15:05:01',
                        cartId:'京A231B2'
                    },{
                        parkName:'B2 A11 旋转入口',
                        time:'15:05:02',
                        cartId:'京A231B2'
                    },{
                        parkName:'B2 A11 旋转入口',
                        time:'15:05:03',
                        cartId:'京A231B2'
                    },{
                        parkName:'B2 A11 旋转入口',
                        time:'15:05:03',
                        cartId:'京A231B2'
                    }
                ],
                incomeBg:{
                    background:'url('+require('@/assets/images/screen/incomeBg.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                inoutcount:{
                    background:'url('+require('@/assets/images/screen/inoutcount.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                onLine:{
                    background:'url('+require('@/assets/images/screen/onLine.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                offLine:{
                    background:'url('+require('@/assets/images/screen/offLine.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                notUsed:{
                    background:'url('+require('@/assets/images/screen/notUsed.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                information:require('@/assets/images/screen/information.png'),
                abnormalStyle:{
                    background:'url('+require('@/assets/images/screen/abnormal.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                outParkStyle:{
                    background:'url('+require('@/assets/images/screen/outPark.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                inParkStyle:{
                    background:'url('+require('@/assets/images/screen/inpark.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                wrapperStyle:{
                    background:'url('+require('@/assets/images/screen/screenBg.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                headerStyle:{
                    background:'url('+require('@/assets/images/screen/headerBg.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                mainStyle:{
                    height:'790px'
                },
                parkEnteranceBodyStyle:{

                },
                infoStyle:{
                    background:'url('+require('@/assets/images/screen/information.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                infoItemStyle:{
                    background:'url('+require('@/assets/images/screen/infoItem.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                entranceStyle:{
                    background:'url('+require('@/assets/images/screen/entrance.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat'
                },
                parkAllStyle:{
                    background:'url('+require('@/assets/images/screen/parkall.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                    height: '43%'
                },
                inoutParkStyle:{
                    background:'url('+require('@/assets/images/screen/inoutpark.png')+') no-repeat',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                },
                onlineBgStyle:{
                    background:'url('+require('@/assets/images/screen/onlineBg.png')+')',
                    backgroundSize:'100% 100%',
                    backgroundRepeat:'no-repeat',
                }
            }
        },
        mounted(){
            if(this.$refs['header'].offsetHeight != undefined){
                let currentHeaderHeight = this.$refs['header'].offsetHeight;
                let parkEntranceHeaderHeight = this.$refs['parkEntranceHeader'].offsetHeight;
                this.mainStyle = {
                    height:'calc(100% - '+currentHeaderHeight+'px)'
                }
                this.parkEnteranceBodyStyle = {
                    height:'calc(100% - '+parkEntranceHeaderHeight+'px)'
                }
                window.addEventListener('resize', () => {
                    if(this.$refs['header'].offsetHeight != undefined){
                        let currentHeaderHeight = this.$refs['header'].offsetHeight;
                        let parkEntranceHeaderHeight = this.$refs['parkEntranceHeader'].offsetHeight;
                        this.mainStyle = {
                            height:'calc(100% - '+currentHeaderHeight+'px)'
                        }
                        this.parkEnteranceBodyStyle = {
                            height:'calc(100% - '+parkEntranceHeaderHeight+'px)'
                        }
                    }
                });
            }
        },
        computed: {
            classOption () {
                return {
                    step:0.5,
                    direction: 1
                }
            }
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../../styles/mixin.scss";
    .data-screen-wrapper{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(4,21,53,1);
        .header{
            position: relative;
            padding: 0;
            margin: 0;
            @include scaleHeightPx(59px);
            .header-title{
                position: absolute;
                top:40%;
                left: 50%;
                transform: translate(-50%,-50%);
                color: #B3EFFF;
                text-align: center;
                font-family: PingFangSC-Medium;
                font-size: 28px;
            }
        }
        .main{
            position: relative;
            .subject{
                position: absolute;
                top:10px;
                right: 26px;
                bottom: 10px;
                left: 26px;
                .subject-main{
                    height: 100%;
                    .subject-item-left{
                        height: 100%;
                    }
                }
                .subject-item{
                    flex-direction:column;
                    height: 100%;
                    .subject-item__common{
                        flex: 1;
                    }
                }
            }
        }
    }


    .subject-item__info{
        position: relative;
        .info-wrapper-style{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .info-title{
                @include scalePadding(19px,0,13px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .info-content{
                padding: 0 22px 0 18px;
                .info-content__body{
                    @include scaleHeightPx(60px);
                    .info-content__col{
                        height: 100%;
                        .info-content__col__item{
                            height: 100%;
                            text-align: center;
                            .info-content__item_text_top{
                                font-family: CustomDigigface;
                                @include scaleFontSize(24px);
                                color: #02CAFF;
                                height: 60%;
                                line-height: 1.5;
                            }
                            .info-content__item_text_bottom{
                                font-family: PingFangSC-Medium;
                                font-size: 12px;
                                color: #D0F5FF;
                                height: 40%;
                                line-height: 2.1;
                            }
                        }
                    }
                }
                .info-content__body_bottom{
                    @include scaleMargin(10px,0,0,0);
                }
            }

        }
    }
    .subject-item__income{
        position: relative;
        .subject-income{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-income__title{
                @include scalePadding(19px,0,13px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
                .info-title__right{
                    float: right;
                    color: #D0F5FF;
                    margin-right: 19px;
                }
            }
            .subject-income__body{
                padding: 0 19px;
                .income-body__money{
                    @include scaleHeightPx(50px);
                    .money-list-item{
                        height: 100%;
                        .money-list-item__text{
                            position: relative;
                            font-family: CustomDigigface;
                            height: 100%;
                            text-align: center;
                            @include scaleFontSize(40px);
                            color: #ABFF74;
                            .item__text{
                                position: absolute;
                                top:50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                    }
                }
                .count-bar{
                    color: #D0F5FF;
                    @include scaleFontSize(14px);
                    .total-wrapper{
                        @include scaleMargin(0,0,2px,0);
                    }
                }
            }

        }
    }
    .subject-item__entrance{
        position: relative;
        .subject-park-entrance{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .park-entrance__title{
                position: absolute;
                top:0;
                left: 0;
                @include scalePadding(10px,0,11px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .park-entrance__header{
                @include scalePadding(19px,0,5px,0);
                @include scaleFontSize(12px);
                color: #D0F5FF;
            }
            .park-entrance__body{
                .scroll-item-style{
                    height: 30px;
                    line-height: 30px;
                    color: #D0F5FF;
                    @include scaleFontSize(12px);
                    /*font-size: 14px;*/
                    .scroll-tiem__overflow{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .inpark{
                            display:inline-block;
                            width: 10px;
                            height: 10px;
                            vertical-align: middle;
                            margin-right: 11px;
                        }
                    }
                }
            }

        }
    }

    .subject-item__inout{
        position: relative;
        .subject-inout{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-inout__title{
                @include scalePadding(8px,0,8px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .subject-inout__body{
                @include scaleMargin(0,30px,0,26px);
                @include scaleHeightPx(85px);
                .subject-inout__body__item{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    .subject-inout__text__top{
                        height: 65%;
                        line-height: 2.5;
                        font-family: CustomDigigface;
                        @include scaleFontSize(27px);
                        color: #57F986;
                    }
                    .subject-inout__text__bottom{
                        height: 35%;
                        font-size: 14px;
                        color: #D0F5FF;

                    }
                }
            }
        }
    }

    .subject-item__online{
        position: relative;
        .subject-online{
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            .subject-online__title{
                @include scalePadding(8px,0,8px,27px);
                @include scaleFontSize(16px);
                color: #D0F5FF;
            }
            .subject-online__body{
                padding: 0 22px 0 18px;
                .subject-online__list{
                    @include scaleMargin(10px,0,0,0);
                    @include scaleHeightPx(60px);
                    .subject-online__item{
                        height: 100%;
                        .subject-online__col__item{
                            position: relative;
                            height: 100%;
                            text-align: center;
                            .subject-online__item_text_bottom{
                                position: absolute;
                                left: 10px;
                                right: 10px;
                                bottom:7px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                @include scaleFontSize(12px);
                                color: #D0F5FF;
                            }
                        }
                    }
                }
                .subject-online__list__margin{
                    @include scaleMargin(10px,0,0,0);
                }
            }
        }
    }
</style>