<template>
    <el-card :style="{background:color,height: '100px',color:'#fff',position:'relative',overflow: 'hidden',borderRadius:'6px'}" shadow="never">
        <img class="bg-img" :src="bgImg" >
        <el-col :span="18">
            <div>
                <p class="info-card-tip">{{introText}}</p>
                <p class="info-card-count">
                    <countTo :startVal='0' :endVal='endVal' :decimals="retain" :duration='1000'></countTo>
                </p>
            </div>
        </el-col>
        <el-col :span="6"><div>
            <i :class="iconType" :style="{fontSize:iconSize+'px'}"></i>
        </div>
        </el-col>

    </el-card>
</template>
<script>
    import countTo from 'vue-count-to';
    export default {
        name: 'infor-card',
        components: { countTo },
        data(){
          return {
              bgImg:require('../assets/images/data-bg.png')
          }
        },
        props: {
            retain:Number,
            idName: String,
            endVal: Number,
            color: String,
            iconType: String,
            introText: String,
            countSize: {
                type: String,
                default: '30px'
            },
            countWeight: {
                type: Number,
                default: 700
            },
            iconSize: {
                type: Number,
                default: 40
            }
        }
    };
</script>

<style scoped>
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