<template>
    <div>
        <div class="shop-custom-console">
            <el-form :inline="inline" :model="value" class="shop-custom-form-search">
                <div class="advanced-options" v-if="isShow && isThird">
                    <template v-for="(items,$index) in formConfig.third">
                        <dynamic-form-item
                                :key="items.prop"
                                :item="items"
                                :value="value[items.prop]"
                                @input="handleInput($event, items.prop,items.type,items.subtype,items.subprop)"
                        ></dynamic-form-item>
                    </template>
                </div>
                <div class="advanced-options" v-if="isShow && isSecond">
                    <slot name="second"></slot>
                    <template v-for="(items,$index) in formConfig.second">
                        <dynamic-form-item
                                :key="items.prop"
                                :item="items"
                                :value="value[items.prop]"
                                @input="handleInput($event, items.prop,items.type,items.subtype,items.subprop)"
                                ></dynamic-form-item>
                    </template>
                </div>
                <div class="console-main" v-if="isFirst">
                    <slot name="first"></slot>
                    <template v-for="(items,$index) in formConfig.first">
                        <dynamic-form-item
                                :key="items.prop"
                                :item="items"
                                :value="value[items.prop]"
                                @input="handleInput($event, items.prop,items.type,items.subtype,items.subprop)"
                                :style="{'min-width':columnMinWidth}"></dynamic-form-item>
                    </template>
                    <el-form-item class="shop-clear-style">
                        <el-button type="primary" @click="searchFn" icon="el-icon-search">搜索</el-button>
                        <el-button type="text"
                                   v-show="formConfig.showMore"
                                   @click="changeMore"
                                   style="color:#3C75CF;font-size: 16px;"><img :src="isShow ?offimg:noimg" style="display: inline-block;vertical-align: text-top"> 高级搜索</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
    import dynamicFormItem from  './item'
    export default {
        name: 'add-form',
        components:{
            dynamicFormItem
        },
        data () {
            return {
                searchFormData:{
                    key:0,
                },
                addLoading:false,
                isShow:false,
                isFirst:false,
                isSecond:false,
                isThird:false,
                noimg:require('../../assets/images/no.png'),
                offimg:require('../../assets/images/off.png'),
            }
        },
        props:{
            value:{
                type: Object
            },
            formConfig: {
                type: Object
            },
            inline:{
              type:String,
              default:'inline'
            },
            loading:{
                type:Boolean,
                default:false
            },
            addVisible:{
                type:Boolean,
                default:false
            },
            // value: {
            //     type: Object,
            //     required: true
            // },
            columnMinWidth: {
                type: String
            },
            title:{
                type:String,
                default:'添加'
            },
            dialogStyle:{
              type:Object,
               default:()=>{
                    return {
                        dialogWidth:'470px',
                        dialogFormLableWidth:'100px',
                        dialogFormWidth:''
                        // dialogWidth:'640px',
                        // dialogFormLableWidth:'200px',
                        // dialogFormWidth:'450px'
                    }

                }
            }
        },
        methods:{
            searchFn(){
                this.$emit('input',this.value,true)
            },
            changeMore(){
                this.isShow = !this.isShow;
                this.$nextTick(()=>{
                    this.$store.commit('updateTableMaxHeight')
                })
            },
            handleInput(val, key,type,subtype,subkey) {

                if(subtype == 'datetimerange'){
                    if(val == null || val == ''){
                        this.value = Object.assign( this.value, {[subkey]:'',[key]: val,[subkey+'_start']: '',[subkey+'_end']: ''});
                    }else{
                        this.value = Object.assign( this.value, {[subkey]:'between',[key]: val,[subkey+'_start']: val[0],[subkey+'_end']: val[1]});
                    }

                }else if(type == 'select'){
                    this.value = Object.assign( this.value, {[key]: val,[key+'_start']: val,[key+'_end']: val});
                }else{
                    this.value = Object.assign( this.value, {[key]: val})
                }

                // 这里element-ui没有上报event，直接就是value了
                this.$emit('input',this.value,false)
            },
            addSubmit(){
                //通知父组件用户点了确定按钮
                // this.addLoading = true;
                this.$emit('add',true)
            },
            cancelAdd(){
                this.$emit('cancelAdd',false)
            },

        },
        mounted() {

        },
        computed:{
            // value:{
            //     get(){
            //         return {
            //             keys:0,
            //             currentDate:[]
            //         };
            //     },
            //     set(){
            //         return this.searchFormData;
            //     }
            // }
        },
        watch:{
            'formConfig':{
                handler:function(val) {
                    if(val.first){
                        this.isFirst = true;
                        if(val.second){
                            this.isSecond = true;
                            if(val.third){
                                this.isThird = true;
                            }
                        }
                    }else{
                        this.isFirst = false;
                        this.isSecond = false;
                        this.isThird = false;
                    }
                },
                deep: true,
                immediate: true,
            }
        }
    };
</script>

<style scoped>

</style>
