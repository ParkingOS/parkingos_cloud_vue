<template>
    <div>
        <el-dialog
                :width="dialogStyle.dialogWidth"
                :visible.sync="addVisible"
                custom-class="custom-dialog"
                @close="onClose"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                {{title}}<i class="el-icon-close dialog-header-iconfont" @click="cancelAdd"></i>
            </header>

            <el-form
                    class="custom-form-style"
                    :model="value"
                    :label-width="dialogStyle.dialogFormLableWidth"
                    ref="addForm"
                    :style="{width:dialogStyle.dialogFormWidth}" >
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
                <slot/>
            </el-form>

            <footer slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd" class="dialog-footer-btn">取 消</el-button>
                <el-button type="primary" style="margin-left: 60px" :loading="addLoading" @click="addSubmit" :disabled="addLoading" class="dialog-footer-btn">确 定</el-button>
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
                addLoading:false,
            }
        },
        props:{
            loading:{
                type:Boolean,
                default:false
            },
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
            onClose(){
                this.$refs['addForm'].clearValidate()
                setTimeout(()=>{
                    this.addLoading = false;
                },1000)

            },
            handleInput(val, key) {
                // 这里element-ui没有上报event，直接就是value了
                this.$emit('input', { ...this.value, [key]: val })
            },
            addSubmit(){
                //通知父组件用户点了确定按钮
                // this.addLoading = true;
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
        watch:{
            loading:function (val) {
                if(val){
                    this.addLoading = true;
                }else{
                    this.addLoading = false;
                }
            }
        }
    };
</script>

<style scoped>

</style>