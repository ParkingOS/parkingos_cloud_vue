<template>
    <div :style="{background:backgroundImg,height: '100px',color:'#fff',position:'relative',overflow: 'hidden',borderRadius:'6px'}" shadow="never">
        <div class="left-img-wrapper">
            <img :src="imgUrl">
        </div>
        <div class="right-text-wrapper">
            <p class="info-card-tip">{{introText}}</p>
            <p class="info-card-count">
                <countTo :startVal='0' :endVal='endVal' :decimals="retain" :duration='1000'></countTo>
            </p>
        </div>
        <!--        <el-col :span="6">-->
<!--            <div>-->
<!--                <img :src="imgUrl">-->
<!--            </div>-->
<!--        </el-col>-->
<!--        <el-col :span="18">-->
<!--            <div>-->
<!--                <p class="info-card-tip">{{introText}}</p>-->
<!--                <p class="info-card-count">-->
<!--                    <countTo :startVal='0' :endVal='endVal' :decimals="retain" :duration='1000'></countTo>-->
<!--                </p>-->
<!--            </div>-->
<!--        </el-col>-->
    </div>
</template>
<script>
    import countTo from 'vue-count-to';
    export default {
        name: 'infor-card',
        components: { countTo },
        data(){
            return {

            }
        },
        props: {
            retain:Number,
            idName: String,
            endVal: Number,
            color: String,
            backgroundImg:String,
            introText: String,
            countSize: {
                type: String,
                default: '30px'
            },
            countWeight: {
                type: Number,
                default: 700
            },
            imgUrl:String,
        }
    };
</script>

<style scoped>
    .left-img-wrapper{
        float: left;
        width: 150px;
        height: 100px;
    }
    .left-img-wrapper img{
        width: 100%;
        height: 100%;
    }
    .right-text-wrapper{
        padding: 20px 0;
    }
    .info-card-tip{
        color: #fff;
        font-size: 14px;
    }
    .info-card-count{
        line-height: 50px;
        font-size: 35px;
        font-weight: bold;
    }
    .bg-img{
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        width: 100%;
    }
</style>