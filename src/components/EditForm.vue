<template>
  <div class="complexedit">
    <el-dialog
			:visible.sync="editVisible"
			custom-class="custom-dialog"
			:show-close="false"
			@open="onopen"
			:close-on-click-modal="false">
		<header class="dialog-header" slot="title">
			<span class="dialog-title-icon"></span>编辑
			<i class="iconfont icon-guanbi dialog-header-iconfont" @click="cancelEdit"></i>
		</header>
		<el-form :model="editForm" label-width="200px" :rules="editFormRules" ref="editForm" class="dialog-form-width">
			<el-input v-model="editForm.id" style="display:none"></el-input>
			<div v-for="items in edititems">
				<el-form-item v-for="item in items.subs" v-if="item.editable" :label="item.label" :prop="item.prop">
					<p
						:is="item.type"
						:id="item.prop"
						:ref="item.prop"
						:rowdata="rowdata"
						:disable="item.disable"
						:selectlist="item.selectlist"
						v-on:fromedititem="listenedititem"
					></p>
				</el-form-item>
			</div>
		</el-form>
		<!--<span slot="footer" class="dialog-footer">-->
				<!--<el-button @click="resetEdit" size="small">清空</el-button>-->
				<!--<el-button type="primary" @click="editSubmit" :loading="editloading" size="small" >保存</el-button>-->
			<!--</span>-->
		<footer slot="footer" class="dialog-footer">
			<el-button type="primary" size="small" @click="editSubmit" :loading="editloading" style="width: 90px;">确 定</el-button>
			<el-button size="small" style="width: 90px;margin-left: 60px" @click="cancelEdit">取 消</el-button>
		</footer>
		</el-dialog>
  </div>
</template>

<script>
import common from '../common/js/common.js'
import EditNumber from './edit-subs/EditNumber'
import EditDate from './edit-subs/EditDate'
import EditText from './edit-subs/EditText'
import EditTextarea from './edit-subs/EditTextarea'
import EditSelect from './edit-subs/EditSelect'
import EditUpload from './edit-subs/EditUpload'
import AddEmployeeRole from './add-subs/AddEmployeeRole'
import EditRadio from './edit-subs/EditRadio'
export default {
	components:{
		number:EditNumber,
		str:EditText,
		date:EditDate,
		selection:EditSelect,
		upload:EditUpload,
		multitext:EditTextarea,
        employeerole:AddEmployeeRole,
		radio:EditRadio
	},
	data () {
		return {
			editForm:{},
			tempeditForm:{},
            rowdata:{},
		}
	},

	// props:['editVisible','edititems','editFormRules','rowdatas','editsize','dialogsize','editloading'],
	props:{
        editVisible:{
            type:Boolean,
			default:false
		},
        edititems:Array,
        editFormRules:Object,
        rowdatas:Object,
        editloading:Boolean
	},
  	methods:{
		listenedititem:function(formitem){
			//editForm中存在则覆盖，不存在则加入该属性
			// this.$extend(this.editForm,formitem)
            Object.assign(this.editForm,formitem)
		},
		onopen(){
			console.log('onopen')
			//重置表单验证
			if(typeof(this.$refs['editForm'])!='undefined'){
				this.$refs['editForm'].resetFields()
			}
			this.rowdata=common.clone(this.rowdatas)
			// this.rowdata = JSON.parse(JSON.stringify( this.rowdatas ))
		},

        beforeClose(){
		    console.log('111111111111')
            this.$emit('cancelEdit',false)
		},
		onclose(){
            console.log('222222222222222222')
            // this.$emit('cancelEdit',false)
			// this.editloading=false
			this.cleanSubs()
			//关闭对话框
			// setTimeout(()=>{this.$emit('editdialog',false)},0)
			// setTimeout(()=>{this.$emit('cancelEdit',false)},0)
			//重置表单数据
			//this.editForm=common.clone(this.tempeditForm)
		},
		resetEdit(){
			//还原表单this.editForm=common.clone(this.tempeditForm)
			this.$refs['editForm'].resetFields()
			//不能修改rowdata,且清空子组件内容
			//循环调用，清除所以子组件内的表单值
			this.cleanSubs()
			this.editForm=common.clone(this.tempeditForm)
		},
		editSubmit(){
			// this.$extend(this.editForm,{'id':this.rowdata.id})
            Object.assign(this.editForm,{'id':this.rowdata.id,'card_id':this.rowdata.card_id})
			//将editForm传递给父组件,在父组件调用ajax保存数据
			this.$emit('edit',this.editForm)
		},
		cleanSubs(){
			for(var i=0;i<this.edititems.length;i++){
				for(var x in this.edititems[i].subs){
					var t=this.edititems[i].subs[x].prop;
					if(typeof(this.$refs[t])!='undefined'&&t!='etype'){
						this.$refs[t][0].cleanf()
					}
				}
			}
		},
        cancelEdit(){
            this.$emit('cancelEdit',false)
        },
 	 },
	mounted(){
	}
}
</script>
<style>

</style>