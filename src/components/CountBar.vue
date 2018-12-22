<template>
    <div>
        <div :style="{padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'center'}" v-if="type == 'carCount'">
            <div :style="{width:'22px',marginRight:'15px'}"><img :src="imgSrc" style="width: 21px;height: 21px"></div>
            <div :style="{width:'75px',fontSize:'12px',marginRight:'15px',}"><div class="">{{countBarTitle}}</div></div>
            <div :style="{flex:1}"><div class="count-bar-style">
                <div class="count-bar-item-style"  :style="{background:countBarColor,width:countWidth}"></div>
            </div></div>
            <div :style="{width:'50px',fontSize:'12px',fontWeight:'bold',marginLeft:'15px'}"><countTo :startVal='0' :endVal='newVal' :duration='1000'></countTo></div>
        </div>
        <div v-if="type == 'total'" class="total-wrapper">
            <div style="padding:8px 0 0 0">{{countBarTitle}} {{countWidth}}</div>
            <div :style="{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'5px'}" >
                <div :style="{flex:1}">
                    <div class="count-bar-style-total">
                        <div class="count-bar-item-style"  :style="{background:countBarColor,width:countWidth}"></div>
                    </div>
                </div>
                <div :style="{width:'80px',fontWeight:'bold',marginLeft:'15px'}"><countTo :startVal='0' :endVal='newVal' :duration='1000'></countTo>元</div>
            </div>
        </div>

    </div>
</template>
<script>
    import countTo from 'vue-count-to';
    export default {
        name: 'count-bar',
        components: { countTo },
        props:{
            type:{
                type:String,
                default:'carCount'
            },
            CountBarWrapperHeight:String,
            imgSrc:{
                type:String,
                default:''
            },
            countBarTitle:{
                type:String,
                default:''
            },
            countBarColor:String,
            maxVal:{
                type:Number,
                default:5
            },
            currentVal:{
                type:Number,
                default:0
            },
        },
        data(){
            return {
                newVal:0,
                countWidth:0
            }
        },
        mounted(){
            this.countWidthFn()
        },
        computed:{

        },
        methods:{
            countWidthFn(){
                if(this.currentVal == 0){
                    this.newVal = 0;
                }else{
                    this.newVal = +(this.currentVal);
                }

                if(this.currentVal == 0){

                }else{
                    // this.countWidth = Math.ceil((this.currentVal / this.maxVal)*100) +'%'
                    let round = (this.currentVal / this.maxVal)*100;
                    this.countWidth = Math.round(round * 100) / 100 +'%';
                }
            }
        },
        watch:{
            currentVal:{
                handler(newVal,oldVal){
                    this.newVal = newVal;
                    if(this.currentVal == 0){

                    }else{
                        // this.countWidth = Math.ceil((this.currentVal / this.maxVal)*100) +'%'
                        let round = (this.currentVal / this.maxVal)*100;
                        this.countWidth = Math.round(round * 100) / 100 +'%';
                    }
                },
                deep:true
            },
        }
    };
</script>
<style scoped>
    .count-bar-style{
        position: relative;
        width: 100%;
        height: 12px;
        border-radius: 8px;
        background: #eee;
        overflow: hidden;
    }
    .count-bar-style-total{
        position: relative;
        width: 100%;
        height: 12px;
        border-radius: 8px;
        background: #041632;
        overflow: hidden;
    }
    .count-bar-item-style{
        position: absolute;
        top:0;
        left: 0;
        height: 100%;
        transition: all 1s;
    }
</style>