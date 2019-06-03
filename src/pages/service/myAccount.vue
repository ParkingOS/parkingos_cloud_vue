<template>
    <section class="bd-body">
        <header class="hd-wrapper">
            <p class="hd-name">账户名称: <span>{{name}}</span></p>
        </header>
        <el-row>
            <el-col :span="8">
                <el-card>
                    <div>账户余额(元)</div>
                    <div class="my-account-money-style">{{balance+'元'}}</div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {bolinkPath,percision} from '../../api/api';

    export default {
        name: 'myAccount',
        data(){
            return {
                name:'',
                balance:0,
                account:{},
            }
        },
        methods:{
            getAccountInfo(){
                let vm=this;
                this.$axios.post(bolinkPath+'/server/serverinfo'+"?token="+sessionStorage.getItem('token')).then( res =>{
                    let ret = res.data;
                    vm.account=ret;
                    let num2=ret.balance.toFixed((percision+1));
                    let mun3 = num2.substring(0,num2.lastIndexOf('.')+(percision+1));
                    vm.balance = mun3;
                    vm.name=ret.name;
                }).catch( err =>{

                })
            },
        },
        activated() {
            this.getAccountInfo()
        }
    };
</script>

<style lang="scss" scoped>
    .hd-wrapper{
        padding: 20px 0;
        font-size: 18px;
        font-weight: bold;
        .hd-name{
            span{
                color: red;
            }
        }
    }
    .bd-body{
        padding: 10px;
    }
    .my-account-money-style{
        text-align:center;
        padding:30px 0;
        color:#9B9EA0;
        font-size:22px;
        font-weight:bold;
    }
</style>