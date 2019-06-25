<template>
    <div>
        <el-dialog :title="title" :visible.sync="qrVisible" @close="qrclose" @open="qropen" top="6%" custom-class="el-dialog--tiny" size="tiny">
            <div v-if="qrVisible" >
                <el-row >
                    <el-col :span="11" :offset="1"  style="padding-top:0px;margin-bottom:10px">
                        <span>二维码类型:</span>
                    </el-col>
                    <el-col :span="11" :offset="1"  style="padding-top:0px;margin-bottom:10px">
                        <span v-if="needChannel">{{channelType}}:</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-select v-model="type" filterable placeholder="请选择" @change="selectQrType">
                            <el-option
                                    v-for="item in qrtype"
                                    :label="item.name"
                                    :value="item.type">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-input v-if="needChannel" v-model="channelValue" placeholder="请输入通道编号"></el-input>
                    </el-col>
                </el-row>

                <div v-show="hasQr">
                    <el-row>
                        <el-col :span="23" :offset="1" style="padding-top:0px;margin-top: 8px;margin-bottom:7px">
                            二维码地址:
                        </el-col>
                        <el-col :span="23" :offset="1" >
                            <el-input v-model="qrurl" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" :offset="1" style="margin-top: 10px;margin-bottom:5px">
                            二维码图片:
                        </el-col>
                        <el-row>
                            <el-col :span="10" :offset="1" >
                                <el-checkbox-group v-model="checkQrBox" @change="changeQrBox" style="margin-top:10px;margin-left:12px">
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="1">平台环境</el-checkbox></el-row>
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="2">车场名称</el-checkbox></el-row>
                                    <el-row style="line-height:30px;display:inline"><el-checkbox label="3">二维码类型</el-checkbox></el-row>
                                    <el-row v-if="needChannel" style="line-height:30px;display:inline"><el-checkbox label="4">通道编号</el-checkbox></el-row>
                                </el-checkbox-group>
                            </el-col>
                            <el-col :span="12" :offset="1" >
                                <canvas id="canvas" style="display:none"></canvas>
                                <canvas id="img" style="display:none"></canvas>
                                <img :src="qrsrc" width="100%"/>
                                <a id="downloadqr" v-show="generatable" style="font-size:10px;margin-left:80px;text-decoration:none" :href="downloadQrUrl">下载二维码</a>
                            </el-col>
                        </el-row>
                    </el-row>
                </div>
                <br/>
                <el-col style="margin-bottom: 15px;" align="right">
                    <el-button @click="qrclose" size="small">取 消</el-button>
                    <el-button type="primary" @click="generateQR" :disabled="generatable" :loading="generateloading" size="small">点击生成二维码</el-button>
                </el-col>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { bolinkPath} from '../../api/api';
    export default {
        name: "creat-qrcode",
        props:{
            title:{
                type:String,
                default:'二维码'
            },
            qrVisible:{
                type:Boolean,
                default:false,
            },
            parkid:{
                type:String,
                default:'',
            },
            initunionid:{
                type:String,
                default:'',
            }
        },
        data(){
            return {
                generateloading:false,
                generatable:true,
                hasQr:false,
                needChannel:false,
                channelType:'',
                qrurl:'',
                qrsrc:'',
                downloadQrUrl:'',
                checkQrBox:'',
                type:'',
                qrtype:[
                    {'name':'场内预支付','type':1},
                    {'name':'出口直付','type':2},
                    {'name':'无牌车入场','type':3},
                ],

            }
        },
        methods:{
            generateQR(){
                if(this.type>1){
                    if(this.channelValue==''||this.channelValue==null){
                        this.$message({
                            message: '请填写通道编号!',
                            type: 'warning',
                            duration:5000
                        });
                        return
                    }
                }

                this.generateloading=true
                let vm = this;
                let box = "";
                for(var x in this.checkQrBox){
                    box += this.checkQrBox[x];
                }
                let params = {qrBox:box,park_id:this.parkid,type:this.type,channel_id:this.channelValue,token:sessionStorage.getItem('token')}
                this.$ajax({
                    url:bolinkPath+"/park/getqrurl",
                    data:params,
                    asycn:false,
                    success:function(result){
                        //console.log(result)
                        let ret =eval('('+result+')')
                        //let ret = result.parseJSON()
                        //console.log(ret)
                        if(ret.validate!='undefined'&&ret.validate=='0'){
                            vm.loading = false;
                            //未携带令牌.重新登录
                            setTimeout(()=>{vm.alertInfo('未携带令牌,请重新登录!')},150)
                        }else if(ret.validate!='undefined'&&ret.validate=='1'){
                            vm.loading = false;
                            //过期.重新登录
                            setTimeout(()=>{vm.alertInfo('登录过期,请重新登录!')},150)
                        }else if(ret.validate!='undefined'&&ret.validate=='2'){
                            vm.loading = false;
                            //令牌无效.重新登录
                            setTimeout(()=>{vm.alertInfo('登录异常,请重新登录!')},150)
                        }else{
                            if(ret.state){
                                vm.qrurl=ret.qrurl
                                vm.hasQr=true
                                vm.text=ret.text
                                vm.generateloading=false
                                vm.generatable=true
                                vm.loadingqrcode=false;
                                vm.genqr(ret.qrurl,ret.text);
                                var params = "park_id="+vm.parkid+"&union_id="+vm.initunionid+"&qr_url="+vm.qrurl+"&token="+sessionStorage.getItem('token')+"&text="+encodeURIComponent(vm.text)
                                vm.downloadQrUrl = encodeURI(bolinkPath + "/park/downloadqr?" + params)
                            }else{
                                vm.$alert(ret.msg, '提示', {
                                    confirmButtonText: '确定',
                                    type: 'warning',
                                    callback: action => {
                                        vm.hasQr=false
                                        vm.generateloading=false
                                        vm.generatable=false
                                    }
                                })
                            }
                        }
                    }
                })
            },
            changeQrBox(event){
                //1平台类型,2车场名称,3二维码类型,4通道编号
                this.generatable = false
            },
            selectQrType(){
                this.hasQr=false
                if(bolinkPath=='https://s.bolink.club/web'){
                    this.checkQrBox = ["2","3","4"]
                }else{
                    this.checkQrBox = ["1","2","3","4"]
                }
                this.channelValue=''
                if(this.type>1){
                    this.needChannel=true
                    if(this.type==2){
                        this.channelType='请输入出场通道编号'
                    }else if(this.type==3){
                        this.channelType='请输入入场通道编号'
                    }
                }else{
                    this.needChannel=false
                    this.generateQR()
                }
                this.generatable=false;

            },
            qropen(){
                if(bolinkPath=='https://s.bolink.club/web'){
                    this.checkQrBox = ["2","3"]
                }else{
                    this.checkQrBox = ["1","2","3"]
                }
                this.needChannel=false
                this.hasQr=false;
                this.qrsrc='';
                this.qrurl='';
                this.type='';
                this.channelValue='';
                this.generatable=true;
            },
            qrclose(){
                this.type=''
                this.hasQr=false;
                this.generateloading=false
                setTimeout(()=>{this.unionid=''},300)

                this.$emit('closeQr',false)
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
        }


    }
</script>

<style scoped>

</style>
