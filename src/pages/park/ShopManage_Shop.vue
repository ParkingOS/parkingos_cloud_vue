<template>
    <div>
    	<el-button type="primary" @click="showShopDialog" icon="el-icon-search">添加商户</el-button>
    	<el-table
		    :data="tableData"
		    border
		    style="width: 100%;height:100%">
		    	<el-table-column
		    	  fixed="left"
			      label="操作"
			      width="200">
			      <template slot-scope="scope">
			        <el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="setting(scope.row)" type="text" size="small">设置</el-button>
			        <el-button @click="renew(scope.row)" type="text" size="small">续费</el-button>
			        <el-button @click="showWindow(scope.row)" type="text" size="small">刪除</el-button>
			      </template>
			    </el-table-column>
			     <el-table-column
			      type="index" 
			      label="索引"
			      width="100"
			      :index="indexMethod">
			    </el-table-column>
			    <el-table-column
			      prop="id"
			      label="编号"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="商户名称"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="地址"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="create_time"
				  :formatter="dateFormat"			      
			      label="创建时间"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="手机"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="validite_time"
			      label="优惠券额度(小时)"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="ticket_money"
			      label="优惠券额度(元)"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="ticket_type"
			      label="优惠券类型"
			      :formatter="strFormat"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="default_limit"
			      label="默认显示额度"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="validite_time"
			      label="有效期(小时)"
			      width="150">
			    </el-table-column>			  
		  </el-table>
		  <el-dialog
			  title="添加商户"
			  :visible.sync="dialogVisible"
			  width="30%"
			  center>
			  <el-button type="primary" @click="save" icon="el-icon-search">保存</el-button>
			  <el-button type="primary" @click="clear" icon="el-icon-search">重置</el-button>
			  <el-button type="primary" @click="dialogVisible = false" icon="el-icon-search">取消</el-button>
			  
			  <form>
			  	<table>
			  		<tr>
			  			<td>
			  				编号：<el-input  v-model="id" :disabled="true"></el-input></el-input>
			  			</td>
			  			<td>商户名称：<el-input v-model="name" placeholder="请输入内容"></el-input></td>
			  		</tr>
			  		<tr>
			  			<td>
			  				地址：<el-input v-model="address" placeholder="请输入内容"></el-input>
			  			</td>
			  			<td>手机：<el-input v-model="mobile" placeholder="请输入内容"></el-input></td>
			  		</tr>
			  		<tr>
			  			<td>
			  				优惠券类型：<template>
										  <el-select v-model="ticket_type" placeholder="请选择">
										    <el-option
										      v-for="item in options"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										  </el-select>
										</template>
			  			</td>
			  			<td>默认显示额度：<el-input v-model="default_limit" placeholder="请输入内容"></el-input></td>
			  		</tr>
			  		<tr>
			  			<td>
			  				商户折扣/%：<el-input v-model="discount_percent" placeholder="请输入内容"></el-input>
			  			</td>
			  			<td>每小时/元：<el-input v-model="discount_money" placeholder="请输入内容"></el-input></td>
			  		</tr>
			  		<tr>
			  			<td colspan="2">
			  				有效期/小时：<el-input v-model="validite_time" placeholder="请输入内容"></el-input>
			  			</td>			  			
			  		</tr>
			  	</table>
			  	
			  </form>
			  
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="centerDialogVisible"
		  width="20%"

		  center>
		  <span>您确定删除吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="deleteShop">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<!--renewDialog-->
		<el-dialog
		  title="减免券购买(时长)"
		  :visible.sync="renewVisible"
		  width="10%"
		  :before-close="handleClose">
		  <form name="renewForm">
		  	<el-row>
			  	  <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
				  <el-col :span="6"><div style="font-size: 2em;" class="grid-content bg-purple">减免小时(时)</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light"><el-input v-model="ticket_time" placeholder="请输入内容"></el-input></div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light">(每小时{{discount_money}}元)</div></el-col>
				  <el-col :span="2"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
			  </el-row>
			  <input type="hidden" name="shop_id" v_model="id" />
			   <el-row>
			  	  <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple">应收金额(元)</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light"><el-input placeholder="" v-model="totalMoney" :disabled="true"> </el-input></div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
				  <el-col :span="2"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
			  </el-row>
			   <el-row>
			  	  <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple">当前折扣(%)</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light"><el-input placeholder=""  v-model="discount_percent" :disabled="true"> </el-input></div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
				  <el-col :span="2"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
			  </el-row>
			   <el-row>
			  	  <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple">实收金额(元)</div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light"><el-input placeholder="" name="addmoney" v-model="addmoney" :disabled="true"> </el-input></div></el-col>
				  <el-col :span="6"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
				  <el-col :span="2"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
			  </el-row>
		  </form>
		  
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="reFromSub">确 定</el-button>
		  </span>
		</el-dialog>
	
    </div>
    
</template>

<script>
     import {path, checkPass} from '../../api/api'
     import common from '../../common/js/common'
     export default {
    methods: {
    	reFromSub:function(){
    		var vm = this;
    		var formObj = {};
    		formObj.shop_id=this.id;
    		formObj.ticket_time=this.ticket_time;
    		formObj.addmoney=this.addmoney;
    		
    		vm.$.post(path + '/shop/addmoney', formObj, function (ret) {
				this.loadData()
          }, "json")
    		
    	}
    	,
    	renew:function(row){
    		this.id=row.id;
    		this.ticket_money=row.ticket_money;
    		this.discount_percent=row.discount_percent;
    		this.discount_money=row.discount_money;
    		this.renewVisible=true;
    	},
    	setting:function(row){
    		alert("设置");
    	},
    	//时间格式化  
          dateFormat:function(row, column) {  
          var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }          
         return common.dateformat(row.create_time);
        }  ,
        strFormat:function(row){
        	if(row.ticket_type==1){
        		return "时长减免";
        	}else{
        		return "减免金额";
        	}
        },
        showShopDialog:function(){
        	this.dialogVisible = true;
        	this.id='',
	        this.name='',
	        this.address='',
	        this.mobile=''	       
        }
        ,
      indexMethod(index) {
        return index * 2;
      },
      handleClick(row) {
        console.log(row);
      },
     
      showEdit:function(row){
      	this.id=row.id,
      	this.name=row.name,
      	this.address=row.address,
      	this.mobile=row.mobile,
      	this.ticket_type=row.ticket_type,
      	this.default_limit=row.default_limit,
      	this.discount_percent=row.discount_percent,
      	this.discount_money=row.discount_money,
      	this.validite_time=row.validite_time,
      	this.dialogVisible=true
      },
      save:function(){
      	alert("sava...");
      	 var vm = this
         var cform = {}
         alert(this.id);
         cform.id=vm.id;
         cform.name=vm.name;
         cform.address=vm.address;
         cform.mobile=vm.mobile;
         cform.ticket_type=vm.ticket_type;
         cform.default_limit=vm.default_limit;
         cform.discount_percent=vm.discount_percent;
         cform.discount_money=vm.discount_money;
         cform.validite_time=vm.validite_time;
         
         this.dialogVisible=false
         
          vm.$.post(path + '/shop/create', cform, function (ret) {
				this.loadData()
          }, "json")
          
      },
      clear:function(){
      	this.name='',
      	this.address='',
      	this.mobile=''
      },
      showWindow:function(row){
      	this.id=row.id;
      	this.centerDialogVisible=true;     	
      },
      deleteShop:function(){
      	var vm = this   	
        var cform = {}
        this.centerDialogVisible=false;
        cform.id=this.id
        alert("删除id:"+this.id);
      	vm.$.post(path + '/shop/delete', cform, function (ret) { 
      			this.loadData()
      	}, "json")
      	this.loadData()
      },
      loadData:function(){
      	var vm = this
        var cform = {}       
        vm.$.post(path + '/shop/quickquery', cform, function (ret) {
                          vm.tableData=ret.rows;
            }, "json") 
      }
    },

    data() {
      return {
      	renewVisible:false,
        tableData: [],
        dialogVisible: false,
        addmoney:0,
        totalMoney:0,
        id:'',
        name:'',
        address:'',
        mobile:'',
        ticket_type:1,
        ticket_time:0,
        default_limit:'5,10,20,30',
        discount_percent:100,
        discount_money:1,
        validite_time:24,
        options: [{
          value: 1,
          label: '减免时长'
        }, {
          value: 2,
          label: '减免金额'
        }],
        centerDialogVisible:false
      }
    },
   	 mounted() {
   	 	this.loadData()                   
     },
     watch:{
     	ticket_time(curVal,oldVal){
　　　　　　　　　　if(!isNaN(curVal)){
					this.totalMoney=curVal*this.discount_money;
					this.addmoney=curVal*this.discount_money*this.discount_percent/100;
				}else{
					this.totalMoney=0;
					this.addmoney=0;
					this.curVal=0;
				}
　　　　　}
     }
  }
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: white;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: white;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: white;
  }
</style>
