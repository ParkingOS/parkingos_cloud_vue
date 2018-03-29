<template>
    <!--<section>-->
    <!--<div class="scroll-wrap">-->
    <!--<div class="scroll-content" :style="{ top }">-->
    <!--<div class="scroll-content-div" v-for="item in prizeList">{{item}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="item-num">
        <div class="data-num">
            <Number ref="roller"></Number>
        </div>
        <div class="data-num">
            <Number ref="roller1"></Number>
        </div>
        <div class="data-num">
            <Number ref="roller2"></Number>
        </div>
        <div class="data-num">
            <Number ref="roller3"></Number>
        </div>
        <div class="data-num">
            <Number ref="roller4"></Number>
        </div>
        <div class="data-num">
            <Number ref="roller5"></Number>
        </div>

    </div>
    <!--</section>-->
</template>

<script>
    import Number from './SingleNumberRoller';

    export default {
        name: 'number-roller',
        components: {
            Number
        },
        data() {
            return {
                prizeList: [],

                activeIndex: 0,

                ARR: []
            };
        },
        props: ['number'],
        methods: {
            init(index) {
                // let numstr = this.number + '';
                let numstr = index + '';
                let numarr = numstr.split('');
                for (let i = 0; i < 6; i++) {
                    if (i < 6 - numarr.length) {
                        this.ARR[i] = 0;
                    } else {
                        this.ARR[i] = numarr[i - 6 + numarr.length];
                    }
                }
                //将传进来的数字后6位转成数组
                console.log(this.ARR);

                this.$refs['roller'].init(this.ARR[0]);
                this.$refs['roller1'].init(this.ARR[1]);
                this.$refs['roller2'].init(this.ARR[2]);
                this.$refs['roller3'].init(this.ARR[3]);
                this.$refs['roller4'].init(this.ARR[4]);
                this.$refs['roller5'].init(this.ARR[5]);
            }
        },
        activated() {

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
</style>