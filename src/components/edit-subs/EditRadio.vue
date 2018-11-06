<template>
    <div class="number" style="margin-right: 15px">
        <el-radio-group v-model.trim="selectForm.select" @change="uptoeditdialog" :disabled="disable" style="width:100%" size="mini">
            <el-radio
                    v-for="(item,index) in selectlist"
                    :label="item.value_no"
                    :key="index"
                    border
            >
                {{item.value_name}}
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script>
    import common from '../../common/js/common.js'

    export default {
        name: 'edit-radio',
        data () {
            return {
                selectForm:{
                    select:''
                },
                tempForm:{
                    select:''
                },
                upForm:{}
            }
        },
        props:['selectlist','id','rowdata','disable'],
        methods:{
            uptoeditdialog:function(){
                if(this.select!=''){
                    this.upForm[this.id]=this.selectForm.select
                    this.$emit('fromedititem',this.upForm)
                }
            },
            setValue:function(){
                for(var x in this.rowdata){
                    if(this.id==x){
                        this.selectForm.select=this.rowdata[x]+''
                    }
                }
            },
            cleanf:function(val){
                this.upForm={}
                this.selectForm=common.clone(this.tempForm)
            }
        },
        watch:{
            'rowdata':function(){
                this.setValue()
                this.uptoeditdialog()
            }
        },
        mounted(){
            this.setValue()
            this.uptoeditdialog()
        }

    }
</script>