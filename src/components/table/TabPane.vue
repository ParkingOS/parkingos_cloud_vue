<template>
    <section style="margin: 0 20px">
        <sticky class-name="sub-navbar" :fixedDom="fixedDom" stickyTop='50' zIndex='999' v-on:topShow="topShowFn">
            <ul style="display: flex;" v-if="topShow">
                <template v-for="items in TableItems" >
                    <li
                        :style="tableitem.width ? {width:tableitem.width+'px',textAlign:'center',lineHeight:'44px',color:'#909399',fontWeight:'500',backgroundColor: '#F4F8FF'} : isWidthStyle"
                        v-if="!tableitem.hidden"
                        v-for="(tableitem,index) in items.subs"
                    >{{tableitem.label}}</li>
                </template>
            </ul>
        </sticky>
        <!--列表-->
        <el-table
                :loading="loading"
                :data="tableData"
                border
                resizable="false"
                highlight-current-row
                style="width:100%;padding-bottom: 70px"
                :min-height="300"
                v-loading="loading"
                @sort-change="sortChange"
                @row-click = "rowClickFn"
                ref="refTable">
            <template v-for="(items,index) in TableItems">
                <el-table-column
                        v-for="(tableitem,index) in items.subs"
                        v-if="!tableitem.hidden"
                        :type="tableitem.columnType"
                        :label="tableitem.label"
                        :header-align="tableitem.headerAlign"
                        :align="tableitem.align"
                        :sortable="!tableitem.unsortable"
                        :width="tableitem.width"
                        :formatter="tableitem.format"
                        :fixed="tableitem.fixed"
                >
                    <template slot-scope="scope">
                       <table-expand
                               :format-collectors="formatCollectors"
                               :pname="pname"
                               :single-double-type="singleDoubleType"
                               :expand-data="scope.row"
                               :expand-label="TableItems"
                               :name-type="tableitem.nameType"
                               v-if="tableitem.columnType == 'expand'"></table-expand>
                        <expand
                                v-else-if="tableitem.columnType === 'render'"
                                :row="scope.row"
                                :column="tableitem"
                                :index="scope.$index"
                                :render="tableitem.render"></expand>
                        <span v-else> {{scope.row[tableitem.prop]}}</span>
                    </template>
                </el-table-column>
            </template>


        </el-table>
        <div class="pagination-pos">
            <!--工具条-->
            <el-col :span="24"  align="bottom" style="margin-top:5px;margin-bottom:5px">
                <el-col :span="24" align="right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-sizes="[20, 40, 80]" :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
            </el-col>
        </div>
        <!--删除提示框-->
        <el-dialog
                :visible.sync="delForm.delVisible"
                :show-close="false"
                custom-class="deleteTip">

            <header class="dialog-header" slot="title">
                <span class="dialog-title-icon"></span>提示
                <i class="iconfont icon-guanbi dialog-header-iconfont" @click="cancelDel"></i>
            </header>
            <div class="dialog-body" style="height: 100px;line-height: 100px;text-align: center;font-size: 24px">
                 <p><i class="el-icon-warning" style="margin-right: 19px;color: #f44336"></i> 删除后不可恢复！确定此操作？</p>
            </div>
            <footer slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handledelete" style="width: 90px;">确 定</el-button>
                <el-button @click="cancelDel" size="small" style="width: 90px;margin-left: 60px">取 消</el-button>
            </footer>
        </el-dialog>
    </section>
</template>

<script>
    import {path} from '../../api/api';
    import { getTableQuery,delTableData } from '../../api/base'
    import common from '../../common/js/common';
    import Printd from 'printd';
    import axios from 'axios'
    import TableExpand from './TableExpand'
    import expand from './expand'
    import ElButton from 'element-ui/packages/button/src/button';
    import Sticky from './sticky'
    export default {
        components: {
            ElButton,
            TableExpand,expand,Sticky
        },
        data(){
            return {
                off:true,
                loading:false,
                topShow:false,
                zIndex:999,
                stickyTop:50,
                width:undefined,
                height:undefined,
                active:false,
                position:'fixed',
                isSticky:false,
                wHeight:undefined,
                isWidthStyle:"flex:1;text-align:center;line-height:44px;color:#909399;font-weight:500;background-color: #F4F8FF;",
                loading:false,
                currentHeight:'300px',
                orderby:'desc',
                pageSize:20,
                currentPage:1,
                total:0,
                tableData:[],
                sform:{}, //搜索的条件
            }
        },
        props:{
            TableItems:{
                type:Array,
                default:[],
            },
            formatCollectors:Array,
            pname:Array,
            singleDoubleType:Array,
            alignPos:String,
            btsWidth:String,
            queryapi:String,
            exportapi:String,
            delapi:String,
            fieldsstr:String,
            orderfield:String,
            fixedDom:String,
            searchForm:Object,
            delForm:{
                type:Object,
                default:()=>{
                    return {
                        delVisible:false
                    }

                }
            }
        },
        methods:{
            topShowFn(val){
                this.topShow = val;
            },
            sortChange(){

            },
            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
                this.getTableData(this.sform,this);
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.getTableData(this.sform,this);
            },
            rowClickFn(row, event, column){
                // this.$refs['refTable'].toggleRowExpansion(row)
            },
            getTableData(sform,that){
                var nform =  sform,url = that.queryapi;
                nform.rp = this.pageSize;
                nform.page = this.currentPage;
                nform.orderby = this.orderby;
                nform.fieldsstr = this.fieldsstr;
                nform.orderfield = this.orderfield;
                nform.comid = sessionStorage.getItem('comid');
                that.loading = true;
                getTableQuery(url,sform).then(response =>{
                    that.loading = false;
                    that.off = true;
                    if(response.status == 200){
                        let tableData =  response.data
                        this.total = tableData.total;
                        this.tableData= tableData.rows;
                        this.$emit('transferData',tableData);
                    }
                }).catch(err => {
                    that.loading = false;
                    that.off = true;
                    console.log('拉取错误了',err)
                })
            },
            //导出表格数据
            handleExport() {
                let vm = this;
                let api = this.exportapi;
                let params = '';
                if (common.getLength(this.sform) == 0) {
                    params = 'fieldsstr=' + this.fieldsstr + '&token=' + sessionStorage.getItem('token');
                } else {
                    for (var x in this.sform) {
                        //console.log(this.sform[x])
                        if(x=='car_number'||x=='nickname1'){
                            params += x + '=' + encodeURI(encodeURI(this.sform[x])) + '&';
                        }else{
                            params += x + '=' + this.sform[x] + '&';
                        }

                    }
                }
                let groupid = sessionStorage.getItem('groupid');
                let cityid = sessionStorage.getItem('cityid');
                if (groupid != 'undefined' && !(params.indexOf('groupid=') > -1)) {
                    params += '&groupid=' + groupid;
                }
                if (cityid != 'undefined' && !(params.indexOf('cityid=') > -1)) {
                    params += '&cityid=' + cityid;
                }
                // params += '&groupid=' + groupid + '&cityid=' + cityid
                //alert(params)
                if (params.indexOf('comid=') > -1) {
                    window.open(path + api + '?' + params);
                } else {
                    window.open(path + api + '?' + params + '&comid=' + sessionStorage.getItem('comid'));
                }

            },
            //取消删除
            cancelDel(){
                this.$emit('cancelDel',false)
            },
            //删除
            handledelete() {
                let that = this;
                let url = this.delapi;
                let dform = JSON.parse(JSON.stringify( this.delForm ));
                dform.token = sessionStorage.getItem('token');
                dform = common.generateForm(dform);
                delTableData(url,dform).then(response=>{
                    console.log('response--dform',response)
                    if(response.data.state == 1){
                        that.$emit('cancelDel',false)
                        that.tableData.splice(that.delForm.$index,1)
                        that.$message({
                            message:response.data.msg ,
                            type: 'success'
                        });
                    }else{
                        that.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }

                }).catch(err=>{
                    that.$message({
                        message: '网络错误，请稍后重试',
                        type: 'warning'
                    });
                })
            },
        },
        updated(){

        },
        activated(){

        },
        mounted(){



        },
        beforeMount(){
            this.currentHeight = common.gwh() - 100 +'px';
        },
        watch:{
            searchForm:{
                handler(newVal,oldVal){
                    if(this.off){
                        this.sform = newVal;
                        this.currentPage = 1;
                        this.off = false;
                        this.getTableData(this.sform,this)
                    }else{

                    }
                },
                deep:true
            },
        }
    };

</script>

<style>
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    ul li{
        margin: 0;
        padding: 0;
    }
    .pagination-pos{
        position: fixed;
        bottom: 17px;
        left: 180px;
        right: 40px;
        z-index: 999;
        background: #fff;
    }
</style>
