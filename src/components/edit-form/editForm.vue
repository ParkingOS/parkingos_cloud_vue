<template>
    <div class="complexedit">
        <el-dialog
                :width="dialogStyle.dialogWidth"
                :visible.sync="editVisible"
                custom-class="custom-dialog"
                @close="onClose"
                :show-close="false"
                :close-on-click-modal="false">
            <header class="dialog-header" slot="title">
                {{title}}<i class="el-icon-close dialog-header-iconfont" @click="cancelEdit"></i>
            </header>

            <el-form
                    :model="value"
                    :label-width="dialogStyle.dialogFormLableWidth"
                    ref="editForm"
                    :style="{width:dialogStyle.dialogFormWidth}" >
                <el-input v-model="value.id" style="display:none"></el-input>
                <template v-for="items in filterEditTableItems">
                    <dynamic-form-item
                            v-for="item in items.subs"
                            :key="item.prop"
                            :item="item"
                            :value="value[item.prop]"
                            @input="handleInput($event, item.prop)"
                            :style="{'min-width':columnMinWidth}"></dynamic-form-item>
                </template>
                <slot/>
            </el-form>
            <footer slot="footer" class="dialog-footer">
                <!--<el-button size="small" style="width: 90px;" @click="cancelEdit">取 消</el-button>-->
                <!--<el-button type="primary" size="small" style="width: 90px;margin-left: 60px" @click="editSubmit">确 定</el-button>-->
                <el-button @click="cancelEdit" class="dialog-footer-btn">取 消</el-button>
                <el-button type="primary" style="margin-left: 60px" @click="editSubmit" class="dialog-footer-btn" :loading="editLoading">确 定</el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
    import dynamicFormItem from  './item'
    export default {
        name: 'edit-form',
        components:{
            dynamicFormItem
        },
        data () {
            return {
                editLoading:false,
                editForm:{},
                tempeditForm:{},
                rowdata:{},
            }
        },
        props:{
            loading:{
                type:Boolean,
                default:false
            },
            editVisible:{
                type:Boolean,
                default:false
            },
            editFormConfig: {
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
            },
            dialogStyle:{
                type:Object,
                default:()=>{
                    return {
                        dialogWidth:'470px',
                        dialogFormLableWidth:'100px',
                        dialogFormWidth:''

                    }

                }
            }
        },
        methods:{
            onClose(){
                this.$refs['editForm'].clearValidate()
                setTimeout(()=>{
                    this.editLoading = false;
                },1000)
            },
            handleInput(val, key) {
                // 这里element-ui没有上报event，直接就是value了
                this.$emit('input', { ...this.value, [key]: val })
            },
            editSubmit(){
                //通知父组件用户点了确定按钮
                this.$emit('edit',true)
            },
            cancelEdit(){
                this.$emit('cancelEdit',false)
            },
            setDefaultValue() {
                const formData = { ...this.value }
                // 设置默认值
                for( var items in this.editFormConfig){
                    // console.log('items.sub',this.editFormConfig[items].subs)
                    this.editFormConfig[items].subs.forEach(item => {
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
        computed:{
            filterEditTableItems:function () {
                return this.editFormConfig.filter(function(item){
                    return item.subs[0].editable == true
                })
            }
        },
        watch:{
            loading:function (val) {
                console.log('---val',val)
                if(val){
                    this.editLoading = true;
                }else{
                    this.editLoading = false;
                }
            }
        }
    };
</script>

<style scoped>

</style>