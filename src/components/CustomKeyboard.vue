<template>
    <div class="keyboard">
        <div v-if="keyboard == 'text'">
            <div class="keyboard-row" v-for="(item,rows) in carTxt">
                <button type="button" class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                </button>
            </div>
        </div>
        <div v-if="keyboard == 'num'">
            <div class="keyboard-row" v-for="(item,rows) in carNum">
                <button type="button" class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'custom-keyboard',
        props:{
            keyboardStart:String
        },
        data(){
            return {
                isSelectl:false,
                isDisable:true,
                keyboard:'text',
                carTxt: [
                    { name: ['京', '沪', '浙', '粤', '苏', '鲁', '晋', '吉', '冀', '豫'] },
                    { name: ['川', '渝', '辽', '黑', '皖', '鄂', '湘', '赣', '闽'] },
                    { name: ['陕', '甘', '宁', '蒙', '津', '桂', '云', '贵'] },
                    { name: ['琼', '青', '新', '藏', '使'] },
                ],
                carNum: [
                    { name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
                    { name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
                    { name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] },
                    { name: ['港','澳','W', 'X', 'Y', 'Z','学','领']}
                ],
            }
        },
        methods:{
            btnWordClick (rows, index, i) {
                this.$emit('input',i)
            },
        },
        watch:{
            keyboardStart(newVal,oldVal) {
                this.keyboard = newVal;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .keyboard{
        width: 304px;
        /*height: 194px;*/
        .keyboard-row{
            display: flex;
            justify-content:center;
            align-items:center;
            .keyboard-row-item{
                width: 26px;
                height: 36px;
                font-size: 16px;
                color: #3C75CF;
                background: #FBFEFF;
                border: 1px solid #3C75CF;
                border-radius: 2px;
                margin-right: 4px;
                margin-bottom: 4px;
                cursor: pointer;
            }
            .keyboard-row-item:last-child{
                margin-right: 0;
            }
        }

    }
</style>