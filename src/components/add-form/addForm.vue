<template>
    <div>
        <el-dialog
                :visible.sync="addVisible"
                custom-class="custom-dialog"
                @close="onClose"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                <span class="dialog-title-icon"></span>{{title}}
                <i class="iconfont icon-guanbi dialog-header-iconfont" @click="cancelAdd"></i>
            </header>

            <el-form :model="value" label-width="200px" ref="addForm" class="dialog-form-width">
                <el-input v-model="value.id" style="display:none"></el-input>
                <template v-for="items in addFormConfig">
                    <dynamic-form-item
                            v-for="item in items.subs"
                            :key="item.prop"
                            v-if="item.addtable"
                            :item="item"
                            :value="value[item.prop]"
                            @input="handleInput($event, item.prop)"
                            :style="{'min-width':columnMinWidth}"></dynamic-form-item>
                </template>
                <!--<dynamic-form-item-->
                        <!--v-for="item in editFormConfig.formItemList"-->
                        <!--:key="item.key"-->
                        <!--v-if="value[item.key]!==undefined"-->
                        <!--:item="item"-->
                        <!--:value="value[item.key]"-->
                        <!--@input="handleInput($event, item.key)"-->
                        <!--:style="{'min-width':columnMinWidth}"></dynamic-form-item>-->
                <slot/>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <el-button size="small" style="width: 90px;" @click="cancelAdd">取 消</el-button>
                <el-button type="primary" size="small" style="width: 90px;margin-left: 60px" @click="addSubmit">确 定</el-button>
            </footer>
        </el-dialog>
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

            }
        },
        props:{
            addVisible:{
                type:Boolean,
                default:false
            },
            addFormConfig: {
                type: Array,
                required: true
            },
            value: {
                type: Object,
                required: true
            },
            columnMinWidth: {
                type: String
            },
            title:{
                type:String
            }
        },
        methods:{
            onClose(){
                this.$refs['addForm'].clearValidate()
            },
            handleInput(val, key) {
                // 这里element-ui没有上报event，直接就是value了
                this.$emit('input', { ...this.value, [key]: val })
            },
            addSubmit(){
                //通知父组件用户点了确定按钮
                this.$emit('add',true)
            },
            cancelAdd(){
                this.$emit('cancelAdd',false)
            },
            setDefaultValue() {
                const formData = { ...this.value }
                // 设置默认值
                for( var items in this.addFormConfig){
                    this.addFormConfig[items].subs.forEach(item => {
                        const { key, value } = item
                        if (formData[key] === undefined || formData[key] === null) {
                            formData[key] = value
                        }
                    })
                }
                // this.editFormConfig.formItemList.forEach(item => {
                //     const { key, value } = item
                //     if (formData[key] === undefined || formData[key] === null) {
                //         formData[key] = value
                //     }
                // })
                this.$emit('input', { ...formData })
            }
        },
        mounted() {
            this.setDefaultValue()
        },
    };
</script>

<style scoped>

</style>