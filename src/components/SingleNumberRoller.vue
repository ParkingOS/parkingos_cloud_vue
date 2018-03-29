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
                prizeList: [],
                prizeList1: [],
                activeIndex: 0,
                activeIndex1: 0
            };
        },
        props: ['num'],
        methods: {
            init(number) {
                this.initNumRoller(number);
            },
            initNumRoller(index) {
                for (let i = 0; i <= index; i++) {
                    this.prizeList.push(i);
                }
                this.activeIndex = 0;
                let loop = setInterval(_ => {
                    if (this.activeIndex < this.prizeList.length - 1) {
                        this.activeIndex += 1;
                    } else {
                        clearInterval(loop);
                    }
                }, 100);
            }
        },
        activated() {
            // this.initNumRoller(this.num);
            // console.log('66666666666')
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