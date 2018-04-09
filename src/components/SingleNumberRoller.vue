<template>
    <div class="scroll-wrap">
        <div class="scroll-content" :style="{ top }">
            <div class="scroll-content-div" v-for="item in prizeList">{{item}}</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'single-number-roller',
        data() {
            return {
                prizeList: [0,1,2,3,4,5,6,7,8,9],
                prizeList1: [],
                activeIndex: 0,
                currentnum:0,
            };
        },
        props: ['num'],
        methods: {
            init(number) {
                this.initNumRoller(number);
            },
            initNumRoller(number) {
                let gap = 0;
                if(this.currentnum===number&&number>0){
                    return;
                }
                else{

                  gap =  this.currentnum - number;
                }
                this.currentnum = number;
                let loop = setInterval(_ => {
                  //如果数字变大，则往上滚动
                    if(gap>0){
                      this.activeIndex--;
                    }
                    else if (gap<0){//如果数字变小，往下滚动
                      this.activeIndex++;
                    }
                    //如果滚动到相应为止
                    if(this.activeIndex == this.currentnum){
                      clearInterval(loop);
                    }

                }, 100);
            }
        },
        activated() {

        },
        computed: {
            top() {
                return -this.activeIndex * 20 + 'px';
            }
        }
    };
</script>

<style scoped>
    .item-num {
        display: flex;
    }

    .data-num {
        background-color: #393a3e;
        text-align: center;
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: 2px;
        border-radius: 2px;
        color: white;
        width: 20px;
    }

    .scroll-wrap {
        width: 20px;
        height: 20px;
        overflow: hidden;
    }

    .scroll-content {
        position: relative;
        transition: all 0.01s;
    }

    .scroll-content-div {
        color: white;
        line-height: 20px;
        text-align: center;
    }
</style>
