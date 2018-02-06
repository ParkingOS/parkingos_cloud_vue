<template>
  <div class="complexedit">
    <el-dialog title="编辑" :visible.sync="editVisible" custom-class="dialog" @close="onclose" @open="onopen" :close-on-click-modal="false" top="8%" width="30%">

		<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" style="width:98%">
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

		<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdit" size="small">清空</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editloading" size="small" >保存</el-button>
			</span>

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
export default {
	components:{
		number:EditNumber,
		str:EditText,
		date:EditDate,
		selection:EditSelect,
		upload:EditUpload,
		multitext:EditTextarea,
        employeerole:AddEmployeeRole,
	},
	data () {
		return {
			editForm:{},
			tempeditForm:{},
		}
	},

	props:['editVisible','edititems','editFormRules','rowdata','editsize','dialogsize','editloading'],
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
			this.rowdata=common.clone(this.rowdata)
		},
		onclose(){
			// this.editloading=false
			this.cleanSubs()
			//关闭对话框
			setTimeout(()=>{this.$emit('editdialog',false)},0)
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
            Object.assign(this.editForm,{'id':this.rowdata.id})
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
		}
 	 },
	mounted(){
	}
}
</script>
<style>

</style>