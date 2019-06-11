<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">增值服务<span style="margin: 2px">-</span>短信服务<span style="margin: 2px">-</span>短信分配</p>
                <div class="float-right">
                    <el-button type="text" size="mini" style="font-size: 14px;color: #1E1E1E;" @click="blackFn" ><img :src="orderImg" style="margin-right: 5px;vertical-align: text-top">返回</el-button>
                    <el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button>
                </div>
            </header>
            <div class="shop-custom-console">
                <el-form :inline="true" :model="searchFormData" class="shop-custom-form-search">
                    <div class="console-main">
                        <el-form-item label="车场名称">
                            <el-input v-model="parkname" class="shop-custom-input" placeholder="" v-on:input="parkNameChange"></el-input>
                        </el-form-item>
                        <el-form-item class="float-right">
                            <el-tooltip class="item" effect="dark" content="保存当前选择的车场分配方案" placement="top-start">
                                <el-button type="primary" @click="submitActiveItemFn">保存分配方案</el-button>
                            </el-tooltip>
                        </el-form-item>
                    </div>

                </el-form>

            </div>
        </div>
        <div class="table-wrapper-style">
            <section style="padding: 21px 16px;margin: 0 10px;background: #fff">
                <el-table
                        ref="multipleTable"
                        :data="tableData2"
                        tooltip-effect="dark"
                        style="width: 100%"
                        v-loading="loading"
                        border
                        @filter-change="filterChange"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="车场名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="车场编号"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="use_count"
                            label="已使用数量（条）"
                            >
                    </el-table-column>
                </el-table>
            </section>
        </div>
    </section>
</template>

<script>
    import {path} from '@/api/api';
    import { getTableQuery} from '@/api/base';
    import common from '@/common/js/common';
    export default {
        name: 'smsDistribution',
        components: {

        },
        data(){
            return {
                orderImg:require('@/assets/images/order-back.png'),
                loading:false,
                tableData:[],
                multipleSelection:[],
                parkname:'',
                searchFormData:{},
                isIndeterminate:false,
                checkAll:false,
                queryapi:'/groupmessage/getselectparks',
                orderfield:'id',
                fieldsstr:'',
                searchForm:{},
                activeSelectionItems:[]
            }
        },
        mounted(){
            this.initFn(this)
        },
        methods:{
            blackFn(){
                this.$router.history.go(-1);
            },
            submitActiveItemFn(){
                let items = this.activeSelectionItems;
                let newArr = [];
                if(items.length>0){
                    for(let item in items){
                        newArr.push(items[item].id)
                    }
                    let data = new FormData();
                    data.append('select_parks',JSON.stringify(newArr));
                    if(items.length == this.tableData.length){
                        data.append('select_all',1);
                    }else{
                        data.append('select_all',0);
                    }
                    data.append('groupid',sessionStorage.getItem('groupid'))
                    this.$axios.post(path+'/groupmessage/setselectparks',data)
                        .then(res=>{
                            if(res.data.state == 1){
                                this.$message({
                                    message: '当前分配方案保存成功',
                                    type: 'success',
                                    duration:2000
                                });
                            }else{
                                this.$message({
                                    message: '保存失败',
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(err=>{
                            this.$message({
                                message: '网络繁忙!',
                                type: 'warning'
                            });
                        })

                }else{
                    let data = new FormData();
                    data.append('select_all',0);
                    data.append('select_parks','');
                    data.append('groupid',sessionStorage.getItem('groupid'))
                    this.$axios.post(path+'/groupmessage/setselectparks',data)
                        .then(res=>{
                            if(res.data.state == 1){
                                this.$message({
                                    message: '当前分配方案保存成功',
                                    type: 'success',
                                    duration:2000
                                });
                            }else{
                                this.$message({
                                    message: '保存失败',
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(err=>{
                            this.$message({
                                message: '网络繁忙!',
                                type: 'warning'
                            });
                        })
                }
            },
            getTableData(sform){
                let that = this;
                let nform = sform;
                nform.rp = this.pageSize;
                nform.page = this.currentPage;
                nform.orderby = this.orderby;
                nform.fieldsstr = this.fieldsstr;
                nform.orderfield = this.orderfield;
                nform = common.generateForm(nform);
                that.loading = true;
                getTableQuery(path+'/groupmessage/getselectparks',nform).then(response =>{
                    that.loading = false;
                    if(response.status == 200){
                        let tableData =  response.data.data;
                        that.tableData= tableData;
                        that.tableData2= tableData;
                        that.$nextTick(()=>{
                            that.formatData()
                        })
                    }
                }).catch(err => {
                    that.loading = false;
                    console.log('拉取错误了',err)
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.activeSelectionItems = val;
            },
            formatData(val){
                if(this.tableData.length>0){
                   this.activeSelectionItems = this.tableData.filter(data => data.flag)
                }
                this.toggleSelection(this.activeSelectionItems)
            },
            filterChange(val){
              console.log('filter val--->',val)
            },
            parkNameChange(val){
                this.$nextTick(()=>{
                    this.formatData()
                })
            },
            searchFn(){

            },
            handleCheckAllChange(){

            },
            transferData(){

            },
            initFn(that){
                this.getTableData({})
            },
            resetForm(){
                this.initFn(this)
            },
        },
        computed:{
            tableData2:{
                get: function () {
                    return this.tableData.filter(data => !this.parkname || data.name.toLowerCase().includes(this.parkname.toLowerCase()));
                },
                set: function (value) {

                }
            }
        },
        watch:{
            tableData(val){

            }
        }
    };
</script>

<style scoped>

</style>