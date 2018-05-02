<template>
    <div id="keyboards">
        <div class="content-car-number">
            <div class="content-section">
                <div class="content-section-flex flex-card" style="width: 700px">
                    <div class="content-section-flex flex-card-border">
                        <button type="button" id="font" class="flex-btn" @click="btnClickYue" v-bind:class="{isClick: isYue }">
                            {{carNumver.areaName}}
                        </button>
                        <span class="blank-border blank-border-first"></span>
                        <button id='letter' type="button" class="flex-btn" @click="btnClickA" v-bind:class="{isClick: isA}">
                            {{carNumver.areaLetter}}
                        </button>
                        <div class="flex-mid"><span></span></div>
                        <div class="flex-btns">
                            <button id='numOne' type="button" @click="btnClickNum('one')" v-bind:class="{isNumClick: isNumOne }">{{carNumver.numOne}}</button>
                            <span class="blank-border"></span>
                            <button id='numTwo' type="button" @click="btnClickNum('two')" v-bind:class="{isNumClick: isNumTwo }">{{carNumver.numTwo}}</button>
                            <span class="blank-border"></span>
                            <button id='numThree' type="button" @click="btnClickNum('three')" v-bind:class="{isNumClick: isNumThree }">{{carNumver.numThree}}
                            </button>
                            <span class="blank-border"></span>
                            <button id='numFour' type="button" @click="btnClickNum('four')" v-bind:class="{isNumClick: isNumFour }">{{carNumver.numFour}}
                            </button>
                            <span class="blank-border"></span>
                            <button id='numFive' type="button" @click="btnClickNum('five')" v-bind:class="{isNumClick: isNumFive }">{{carNumver.numFive}}
                            </button>
                            <span class="blank-border" v-if="checkbox"></span>
                            <button v-if="checkbox" id='numSix' @click="btnClickNum('six')" type="button"
                                    v-bind:class="{isNumClick: isNumSix }">{{carNumver.numSix}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--键盘html-->
        <div class="keyboard" v-if="keyboardShow" :class='{animationDown:isDown,animationUp:isUp}'>
            <button type="button" class="btn-complete" @click="completeClick"><span>完成</span></button>
            <div v-if="keyboard == 'txt'">
                <div class="keyboard-row" v-for="(item,rows) in carTxt">
                    <button type="button" class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                    </button>
                </div>
                <div class="keyboard-row">
                    <!-- <div class="keyboard-row-items"> -->
                    <button type="button" class="keyboard-row-item bottom" @click="btnBottomClick('新')">新</button><button class="keyboard-row-item bottom" @click="btnBottomClick('临')">临</button>
                    <button type="button" v-for="j in noneBottomtxt" class="none-botton">{{j}}</button>
                    <div class="keyboard-row-item clear" @click="clearClick">
                        <i class="el-icon-close"></i>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
            <div v-if="keyboard == 'num'">
                <div class="keyboard-row" v-for="(item,rows) in carNum">
                    <button type="button" :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 " class="keyboard-row-item"
                            v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                    </button>
                </div>
                <div class="keyboard-row">
                    <!-- <div class="keyboard-row-bottom"> -->
                    <button type="button" :disabled="isSelectl" v-for="item in carNumBottom" class="keyboard-row-item bottom"
                            @click="btnBottomNumClick(item)">{{item}}
                    </button>
                    <button type="button" v-for="j in noneBottom" class="none-botton">{{j}}</button>
                    <div class="keyboard-row-item clear" @click="clearClick">
                        <i class="el-icon-close"></i>
                    </div>
                    <!-- </div> -->

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Keyboard',
        data (){
            return {
                isFeeHourClick: false,
                checkbox: false,
                isDown: false,
                isUp: false,
                selected: null,
                isSelectx: false,
                isSelectl: false,
                key: 1,
                carNumver:{
                    numOne: '',
                    numTwo: '',
                    numThree: '',
                    numFour: '',
                    numFive: '',
                    numSix: '',
                    areaName: '',
                    areaLetter: '',
                },
                isYue: false,
                keyboardShow: false,
                keyboard: false,
                isA: false,
                isNumOne: false,
                isNumTwo: false,
                isNumThree: false,
                isNumFour: false,
                isNumFive: false,
                isNumSix: false,
                isDisable: false,
                isOne: false,
                isTwo: false,
                isThree: false,
                isFour: false,
                isFive: false,
                isSix: false,
                isSeven: false,
                isEight: false,
                isOther: false,
                carTxt: [
                    { name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
                    { name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
                    { name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] }
                ],
                carNumBottom: ['W', 'X', 'Y', 'Z'],
                noneBottom: ['', '', '', ''],
                noneBottomtxt: ['', '', '', '', '', ''],
                carNum: [
                    { name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
                    { name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
                    { name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] }
                ],
                addedCarNum: '',
            }
        },
        methods: {
            btnBottomClick (val) {
                if (val === '新') {
                    if (this.carNumver.areaName === '临') {
                        this.carNumver.areaLetter = ''
                        this.carNumver.numOne = ''
                        this.carNumver.numTwo = ''
                        this.carNumver.numThree = ''
                        this.carNumver.numFour = ''
                        this.carNumver.numFive = ''
                        this.carNumver.numSix = ''
                    }
                    this.carNumver.areaName = '新'
                    this.isSelectx = true
                    this.isSelectl = false
                    document.getElementById('letter').click()
                } else if (val === '临') {
                    this.carNumver.areaName = '临'
                    this.isSelectl = true
                    this.isSelectx = false
                    this.isDisable = true
                    this.carNumver.areaLetter = ''
                    this.carNumver.numOne = ''
                    this.carNumver.numTwo = ''
                    this.carNumver.numThree = ''
                    this.carNumver.numFour = ''
                    this.carNumver.numFive = ''
                    this.carNumver.numSix = ''
                    document.getElementById('letter').click('isLin')
                }
            },
            btnBottomNumClick (i) {
                this.selected = i
                if (this.key === 2) {
                    this.carNumver.areaLetter = i
                    document.getElementById('numOne').click()
                } else if (this.key === 3) {
                    this.carNumver.numOne = i
                    document.getElementById('numTwo').click()
                } else if (this.key === 4) {
                    this.carNumver.numTwo = i
                    document.getElementById('numThree').click()
                } else if (this.key === 5) {
                    this.carNumver.numThree = i
                    document.getElementById('numFour').click()
                } else if (this.key === 6) {
                    this.carNumver.numFour = i
                    document.getElementById('numFive').click()
                } else if (this.key === 7) {
                    this.carNumver.numFive = i
                    if (this.checkbox) {
                        document.getElementById('numSix').click()
                    }
                } else if (this.key === 8) {
                    this.carNumver.numSix = i
                }
            },
            btnWordClick (rows, index, i) {
                this.selected = i
                if (this.key === 1) {
                    if (this.carNumver.areaName === '临') {
                        this.carNumver.areaLetter = ''
                        this.carNumver.numOne = ''
                        this.carNumver.numTwo = ''
                        this.carNumver.numThree = ''
                        this.carNumver.numFour = ''
                        this.carNumver.numFive = ''
                        this.carNumver.numSix = ''
                    }
                    this.carNumver.areaName = i
                    this.isSelectl = false
                    document.getElementById('letter').click()
                } else if (this.key === 2) {
                    this.carNumver.areaLetter = i
                    document.getElementById('numOne').click()
                } else if (this.key === 3) {
                    this.carNumver.numOne = i
                    document.getElementById('numTwo').click()
                } else if (this.key === 4) {
                    this.carNumver.numTwo = i
                    document.getElementById('numThree').click()
                } else if (this.key === 5) {
                    this.carNumver.numThree = i
                    document.getElementById('numFour').click()
                } else if (this.key === 6) {
                    this.carNumver.numFour = i
                    document.getElementById('numFive').click()
                } else if (this.key === 7) {
                    this.carNumver.numFive = i
                    if (this.checkbox) {
                        document.getElementById('numSix').click()
                    }
                } else if (this.key === 8) {
                    this.carNumver.numSix = i
                }
                if (this.key === 7 || this.key === 8) {
                    this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
                    this.noneBottom = ['']
                } else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
                    this.carNumBottom = ['W', 'X', 'Y', 'Z']
                    this.noneBottom = ['', '', '', '']
                }
            },
            btnClickNum (name) {
                if (this.isSelectl) {
                    this.isDisable = true
                } else {
                    this.isDisable = false
                }
                this.keyboard = 'num'
                this.keyboardShow = true
                this.isYue = false
                this.isA = false
                this.isNumOne = false
                this.isNumTwo = false
                this.isNumThree = false
                this.isNumFour = false
                this.isNumFive = false
                this.isNumSix = false
                this.isUp = true
                if (name === 'one') {
                    this.isNumOne = true
                    this.key = 3
                } else if (name === 'two') {
                    this.isNumTwo = true
                    this.key = 4
                } else if (name === 'three') {
                    this.isNumThree = true
                    this.key = 5
                } else if (name === 'four') {
                    this.isNumFour = true
                    this.key = 6
                } else if (name === 'five') {
                    this.isNumFive = true
                    this.key = 7
                } else if (name === 'six') {
                    this.isNumSix = true
                    this.key = 8
                }
                if (name === 'five' || name === 'six') {
                    this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
                    this.noneBottom = ['']
                } else {
                    this.carNumBottom = ['W', 'X', 'Y', 'Z']
                    this.noneBottom = ['', '', '', '']
                }
            },
            clearClick () {
                if (this.key === 1) {
                    this.carNumver.areaName = ''
                } else if (this.key === 2) {
                    document.getElementById('font').click()
                    this.carNumver.areaLetter = ''
                } else if (this.key === 3) {
                    document.getElementById('letter').click()
                    this.carNumver.numOne = ''
                } else if (this.key === 4) {
                    document.getElementById('numOne').click()
                    this.carNumver.numTwo = ''
                } else if (this.key === 5) {
                    document.getElementById('numTwo').click()
                    this.carNumver.numThree = ''
                } else if (this.key === 6) {
                    document.getElementById('numThree').click()
                    this.carNumver.numFour = ''
                } else if (this.key === 7) {
                    document.getElementById('numFour').click()
                    this.carNumver.numFive = ''
                } else if (this.key === 8) {
                    document.getElementById('numFive').click()
                    this.carNumver.numSix = ''
                }
            },
            completeClick () {
                if(this.checkbox){
                    var carH = String(this.carNumver.areaName)+String(this.carNumver.areaLetter)+String(this.carNumver.numOne)+String(this.carNumver.numTwo)+String(this.carNumver.numThree)+String(this.carNumver.numFour)
                        +String(this.carNumver.numFive)+String(this.carNumver.numSix)
                    if(carH.length === 8){
                        this.$emit('car',carH)
                    }else{
                        this.$message({
                            message: "请输入车牌号",
                            type: 'error',
                            duration: 1200
                        });
                    }
                }else{
                    var carH = String(this.carNumver.areaName)+String(this.carNumver.areaLetter)+String(this.carNumver.numOne)+String(this.carNumver.numTwo)+String(this.carNumver.numThree)+String(this.carNumver.numFour)
                        +String(this.carNumver.numFive)
                    if(carH.length === 7){
                        this.$emit('car',carH)
                    }else{
                        this.$message({
                            message: "请输入车牌号",
                            type: 'error',
                            duration: 1200
                        });
                    }
                }


                this.isYue = false
                this.isA = false
                this.isNumOne = false
                this.isNumTwo = false
                this.isNumThree = false
                this.isNumFour = false
                this.isNumFive = false
                this.isNumSix = false
                this.isUp = false
                this.isDown = true
                this.keyboardShow = false

            },
            btnClickA () {
                this.isDisable = true
                this.isA = true
                this.isYue = false
                this.isUp = true
                this.isNumOne = false
                this.isNumTwo = false
                this.isNumThree = false
                this.isNumFour = false
                this.isNumFive = false
                this.isNumSix = false
                this.keyboardShow = true
                this.keyboard = 'num'
                this.key = 2
            },
            btnClickYue () {
                this.isYue = true
                this.isA = false
                this.isUp = true
                this.isNumOne = false
                this.isNumTwo = false
                this.isNumThree = false
                this.isNumFour = false
                this.isNumFive = false
                this.isNumSix = false
                this.keyboardShow = true
                this.keyboard = 'txt'
                this.key = 1
            },
        },
        props:{
            checkboxStart:{
                type:Object,
                default:false,
            }
        },
        mounted(){

        },
        watch:{
            'checkboxStart.checkbox':function (val,oldVal) {
                this.checkbox = val;
                if( !this.checkbox){
                    this.carNumver.numSix = ''
                }
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .content-car-number {
    /*padding: 64px 0 0;*/
    .car-content-title {
        display: flex;
        justify-content: space-between;
        padding: 0 32px;
        margin-bottom: 16px;
    span {
        font-size: 34px;
    }
    .ze-checkbox {
        display: flex;
        align-items: center;
    }
    .ze-radio-text {
        font-size: 28px;
    }
    .ze-checkbox-icon {
        color: #FFEDB1 !important;
        margin-right: 8px;
    }
    }
    .content-section {
    .content-section-flex {
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        font-size: 40px;
        margin-bottom: 35px;
    .blank-border {
        height: 44px;
        width: 1px; /*no*/
        border-right: 1px solid #ddd; /*no*/
        margin-top: 27px;
        float: left;
        margin-left: -15px;
        z-index: 1;
    &.blank-border-first {
         margin-top: 0px;
     }
    }
    &.flex-card {
         color: #000;
    .flex-btn {
        width: 98px;
        height: 98px;
        border: none;
        text-align: center;
        background: #fff;
        font-size: 40px;
        color: #000;

    }
    .flex-btns {
        text-align: center;
        background: #fff;
        width: fit-content;
        position: relative;
        height: 98px;
    button {
        width: 98px;
        height: 98px;
        border: none;
        font-size: 40px;
        color: #000;
        border-radius: 50%;
        background: transparent;
        float: left;
        margin-left: -20px;
        z-index: 2;
        position: relative;
    &:first-child {
         margin-left: 0;
     }
    }
    }
    .flex-mid {
        margin: 0 0.1rem;
    span {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
    }
    }
    .isClick {
        border: 1px solid #ffc200; /*no*/
        z-index: 50;
        border-radius: 8px;
    }
    .isNumClick {
        border-radius: 8px !important;
        border: 1px solid #ffc200 !important; /*no*/
        z-index: 10;
        background-color: #fff !important;
    }
    }
    .flex-card-border {
        border: 1px solid #ddd; /*no*/
        border-radius: 8px;
    }
    }
    }
    }
    .keyboard {
        /*width: 60%;*/
        width: 800px;
        height: 388px;
        position: fixed;
        /*left: 20%;*/
        left:50%;
        margin-left: -400px;
        bottom: 20px;
        background: #eeeeee;
        z-index: 10;
        border:1px solid #eee;
    &.animationDown {
         animation: slide_dowms 0.3s ease-out;
         animation-fill-mode: forwards;
     }
    &.animationUp {
         animation: slide_ups 0.3s ease-out;
         animation-fill-mode: forwards;
     }
    .btn-complete {
        height: 50px;
        text-align: right;
        color: #ffc200;
        font-size: 30px;
        width: 100%;
        background: #fff;
        border: none;
        border-top: 1px solid #eee;
        margin-bottom: 30px;
    span {
        margin-right: 30px;
    }
    }
    .keyboard-row {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        color: #333;
    &:first-child {
         margin-top: 0;
     }
    .keyboard-row-items {
        display: flex;
        justify-content: left;
    }
    .keyboard-row-bottom {
        display: flex;
        justify-content: space-between;
    }
    .keyboard-row-item {
        width: 60px;
        height: 60px;
        background: #fff;
        font-size: 30px;
        text-align: center;
        border: 1px solid #ccc; /*no*/
        border-radius: 10px;
        color: #333;
    &.bottom {
         height: 60px;
         width: 60px;
         background: #fff;
         color: #333;
         /*margin-right: 0.08rem;*/
     }
    &.clear {
         width: 140px;
         height: 60px;
         display: flex;
         align-items: center;
         justify-content: center;
    img {
        width: 62px;
    }
    }
    }
    .none-botton {
        border: none;
        height: 60px;
        width: 60px;
        visibility: hidden;
    }
    }
    button {
    &:active {
         background: #f4f4f4 !important;
         color: #999 !important;
     }
    }
    }
</style>