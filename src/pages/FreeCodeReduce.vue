<template>
    <section class="car-reduce-bg" :style="{background:'url('+bgimg+'),#1D1D1D no-repeat','background-size':'100% 100%'}">
        <div class="car-reduce-content">
            <img :src="qrsrc" style="width: 318px;height: 318px;margin-bottom: 33px">
            <div class="tip" :style="{background:'url('+tipbg+'),#1D1D1D no-repeat','background-size':'290px 52px'}">扫码支付</div>
        </div>
        <canvas id="canvas" style="display:none"></canvas>
        <canvas id="img" style="display:none"></canvas>
    </section>

</template>


<script>
    import { path } from '../api/api';


    export default {
        data(){
            return {
                timer:null,
                $url:'',
                qrsrc:'',
                bgimg:require('../assets/images/shop/carbg.png'),
                tipbg:require('../assets/images/shop/ocr-tip-bg.png'),
                type:'',
                reduce:'',
                isauto:'',
                free_limit_times:'',
                freeLimit:'',
                code:'',
            }
        },
        mounted(){
            let urls = window.location.href.split('?')[1];
            let data = urls.split('-');
            this.type = data[0];
            this.isauto = data[1];
            this.free_limit_times = data[2];
            this.freeLimit = data[3];
            this.getTicketCode();
        },
        methods:{
            //获取减免二维码
            getTicketCode(){
                let vm = this;
                // vm.$axios.post(path+"/shopticket/createticket?shopid="+sessionStorage.getItem('shopid')+"&uin="+sessionStorage.getItem('loginuin')+"&type="+vm.type+"&reduce="+vm.reduce+"&isauto="+(vm.isauto?1:0),{
                vm.$axios.post(path+"/shopticket/createticket?shopid="+sessionStorage.getItem('shopid')+"&uin="+sessionStorage.getItem('loginuin')+"&type="+vm.type+"&isauto="+(vm.isauto?1:0)+"&free_limit_times="+vm.free_limit_times+"&time_range="+vm.freeLimit,{
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {

                    let ret = response.data;
                    if(ret.state==1){
                        //第一次获取成功后，开启定时任务
                        window.clearInterval(vm.timer)
                        vm.timer = window.setInterval(vm.getCodeStatus,10000)
                        vm.code = ret.code;
                        vm.ticket_url = ret.ticket_url;
                        vm.genqr(vm.ticket_url,vm)
                    }else{
                        vm.$message({
                            message: "获取失败" + ret.error,
                            type: 'error',
                            duration: 1200
                        });
                    }

                });

            },
            genqr(url,vm){
                var canvas = document.getElementById('canvas');
                vm.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {
                    if (error){} else{}
                })
                var context=canvas.getContext('2d');
                var imageData = context.getImageData(0,0,canvas.width,canvas.height);

                var img = document.getElementById("img");
                img.width=canvas.width
                img.height=canvas.height
                var context2 = img.getContext('2d');
                context2.fillStyle="white";
                context2.fillRect(0,0,canvas.width,(canvas.height));
                context2.putImageData(imageData,0,0);
                context2.font="bold 10px 微软雅黑"
                context2.fillStyle="black"
                var url = img.toDataURL("image/png");
                vm.qrsrc = url;
            },
            getCodeStatus(){
                let vm = this;
                vm.$axios.post(path+"/shopticket/ifchangecode?code="+vm.code,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if(ret.state==1){
                        vm.getTicketCode();
                        vm.$message({
                            message: "二维码已更新" ,
                            type: 'success',
                            duration: 1200
                        });
                    }
                });
            },
        },
        activated(){

        },
        watch:{

        }

    }

</script>

<style scoped>
    .car-reduce-bg{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .car-reduce-content{
        position: absolute;
        width: 318px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .tip{
        margin: 0 auto;
        width: 290px;
        height: 52px;
        line-height: 52px;
        font-size: 22px;
        color: #FFFFFF;
        text-align: center;
    }

</style>