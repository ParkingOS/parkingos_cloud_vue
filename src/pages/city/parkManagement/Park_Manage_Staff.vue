<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">车场管理<span style="margin: 2px">-</span>员工设置</p>
                <div class="float-right">
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="saveModify" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                    <el-button type="text" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div style="margin: 0 30px">
                <el-tabs v-model="classSetting" @tab-click="handleClick">
                    <el-tab-pane label="员工管理" name="staff"></el-tab-pane>
                    <!--<el-tab-pane label="分时计费" name="charging"></el-tab-pane> -->
                </el-tabs>
            </div>
            <div v-if="classSetting == 'staff'">
                <StaffAssembly :showState="showState" :count="count"></StaffAssembly>
            </div>
            <div v-if="classSetting == 'charging'">
                <ChargingAssembly :showState="showState" :count="count"></ChargingAssembly>
            </div>
        </div>


        <!--重置密码-->



    </section>
</template>

<script>
    import StaffAssembly from './template/StaffAssembly'
    import ChargingAssembly from './template/ChargingAssembly'
    export default {
        name: 'shop-mange_-shop_-staff',
        components: {
            StaffAssembly,ChargingAssembly
        },
        data() {
            return {
                count:0,
                showState:'staff',
                classSetting:'staff',
                orderImg:require('@/assets/images/order-back.png'),
            }
        },
        methods:{
            handleClick(tab, event){
                // console.log(tab.name)
                setTimeout(()=>{
                    this.showState = tab.name;
                },60)





            },
            saveModify: function () {
                this.$router.history.go(-1);
            },
            changeDateFormat(val){

            },
            resetForm(){
                this.count++
            }
        },
        mounted() {


        },
        activated() {
            this.showState='staff';
            this.classSetting='staff';
        },
        watch: {

        }
    };
</script>

<style scoped>

</style>
