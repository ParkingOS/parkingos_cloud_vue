<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">人力资源<span style="margin: 2px">-</span>消息通知</p>
                <div class="float-right">
                    <el-button type="text" size="mini" class="addStyle" @click="addPersonnel" icon="el-icon-plus">添加人员</el-button>
                    <el-button type="text" size="mini" @click="initFn" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
        </div>
    <div class="table-wrapper-style" style="margin: 0 20px">
        <el-table
                :data="tableData"
                :height="tableheight"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="wx_img"
                    label="微信头像"
                    width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.wx_img" alt="" class="imgSize">
                </template>
            </el-table-column>
            <el-table-column
                    prop="wx_name"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="openid"
                    label="openid">
            </el-table-column>
        </el-table>
        <el-dialog
                title="添加员工"
                :visible.sync="centerDialogVisible"
                width="30%"
                @close="closeMode"
                center>
            <div class="modeStyle">
                <img :src="scanData.imgsrc" alt="" class="imgModeSize">
                <p>请员工使用微信扫一扫，员工会接受消息通知</p>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="移除提示"
                :visible.sync="centerDialogVisible2"
                width="30%"
                center>
            <div class="modeStyle">
                <i class="el-icon-warning iconStyle"></i>
                <p>确定要解除绑定 <span style="margin: 0 5px">{{names}}</span> 么？</p>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="removeData">确 定</el-button>
  </span>
        </el-dialog>
    </div>
    </section>
</template>

<script>
    import { path,bolinkPath} from '../../api/api';
    import common from '../../common/js/common'
    export default {
        name: "message-ntification",
        data(){
            return {
                centerDialogVisible:false,
                centerDialogVisible2:false,
                tableheight:0,
                names:'',
                uid:'',
                imgUrl:'http://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg',
                scanData:{

                },
                tableData: []
            }
        },
        methods:{
            initFn(){
                this.getTableData(this)
            },
            closeMode:function () {
                this.getTableData(this)
            },
            handleClick:function (row) {
                this.names = row.wx_name;
                this.uid = row.id;
                this.centerDialogVisible2 = true;
            },
            addPersonnel:function () {
                this.addRen(this)
                this.centerDialogVisible = true;

            },
            removeRen(){

            },
            //removeData
            removeData(){
                let that = this;
                that.$axios.post(bolinkPath+'/wxpubmessage/deleteuser'+'?token='+sessionStorage.getItem('token')+'&id='+that.uid)
                    .then( res=>{
                        let ret = res.data;
                        if(ret.state == 1){
                            that.centerDialogVisible2 = false;
                            that.$message({
                                message: '移除成功',
                                type: 'success'
                            });
                            that.getTableData(that)
                        }else{
                            that.$message({
                                message: '移除失败，请重试',
                                type: 'error'
                            });
                        }
                    })
                    .catch( err=>{

                    })
            },
            //addRen
            addRen(that){
                that.scanData = {};
                that.$axios.post(bolinkPath+'/wxpubmessage/getaddqurl'+'?token='+sessionStorage.getItem('token'))
                    .then( res=>{
                        let ret = res.data;
                        if(ret.validate!='undefined'&&ret.validate=='0'){
                            //未携带令牌.重新登录
                            setTimeout(()=>{that.alertInfo('未携带令牌,请重新登录!')},150)
                        }else if(ret.validate!='undefined'&&ret.validate=='1'){
                            //过期.重新登录
                            setTimeout(()=>{that.alertInfo('登录过期,请重新登录!')},150)
                        }else if(ret.validate!='undefined'&&ret.validate=='2'){
                            //令牌无效.重新登录
                            setTimeout(()=>{that.alertInfo('登录异常,请重新登录!')},150)
                        }else{
                            that.scanData = ret;
                        }
                    })
                    .catch( err=>{

                    });
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        this.$router.push('/login');
                    }
                });
            },
            //拉取表格数据
            getTableData(that){
                that.tableData = [];
                that.$axios.post(bolinkPath+'/wxpubmessage/getuserlist'+'?token='+sessionStorage.getItem('token'))
                    .then( res=>{
                        let ret = res.data;
                        if(ret.state == 1){
                            that.tableData = ret.user_list;
                        }else{
                            that.tableData = [];
                        }
                    })
                    .catch( err=>{

                    })

            },
        },
        beforeMount(){
            window.onresize=()=>{this.tableheight=common.gwh()-145;}
            this.tableheight=common.gwh()-145;
        },
        mounted() {
            this.getTableData(this)
        },
    }
</script>

<style scoped>
    .addStyle{
        margin-bottom: 10px;
    }
    .modeStyle{
        text-align: center;
    }
    .imgModeSize{
        display: inline-block;
        width: 200px;
        height: 200px;
    }
    .imgSize{
        width: 40px;
        height: 40px;
    }
    .iconStyle{
        font-size: 80px;
        color: #F8BB86;
    }
</style>