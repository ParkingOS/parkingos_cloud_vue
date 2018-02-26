<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"
                :hideTool="hideTool"
                :showParkInfo="showParkInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :dialogVisible="dialogVisible"
                :exportapi="exportapi"
                ref="bolinkuniontable"
        ></common-table>      	
    </section>
    
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, ticketQueryType,statType} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
            	dialogVisible:false,
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: false,
                hideTool: false,
                queryapi: '/shopticket/quickquery',
                btswidth: '100',
                exportapi: '/shopticket/exportExcel',
                fieldsstr: 'id__money__umoney__limit_day__car_number',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, 
                    {
                        hasSubs: false, subs: [
                            {
                                label: '商户名称',
                                prop: 'shop_name',
                                width: '180',
                                type: 'str',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠时长(分钟)',
                            prop: 'money',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	 if(row.ticket_unit==1&&row.money!=0){
                            	 		return row.money;
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠时长(小时)',
                            prop: 'money',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	 if(row.ticket_unit==2&&row.money!=0){
                            	 		return row.money;
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '优惠时长(天)',
                            prop: 'money',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	 if(row.ticket_unit==3&&row.money!=0){
                            	 		return row.money;
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '优惠金额',
                            prop: 'umoney',
                            width: '180',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	 if(row.ticket_unit==4&&row.umoney!=0){
                            	 		return row.umoney;
                            	 }else{
                            	 	return "";
                            	 }
                            }
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '到期时间',
                            prop: 'limit_day',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	return common.dateformat(row.limit_day);;
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                           label: '状态',
                            prop: 'state',
                            width: '100',
                            type: 'selection',
                            selectlist:statType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function (row) {
                                if(row.state==0){
                                	return "未使用"
                                }else if(row.state==1){
                                	return "已使用";
                                }else{
                                	return "回收作废";
                                }
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车牌号',
                            prop: 'car_number',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '优惠类型',
                            prop: 'type',
                            width: '100',
                            type: 'selection',
                            selectlist:ticketQueryType,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function (row) {
                                if(row.type==3){
                                	return "时长减免"
                                }else if(row.type==5){
                                	return "金额减免";
                                }else if(row.type==4){
                                	return "全免券";
                                }else{
                                	return row.type;
                                }
                            }
                        }]
                    }

                ],
                searchtitle: '搜索优惠券',

            }
        },
        mounted() {
        	window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                for (var item of user.authlist) {
                	
                    if (AUTH_ID.shopManage_Coupon == item.auth_id) {
                        this.hideSearch = !common.showSubSearch(item.sub_auth) 
                        //this.hideExport = common.showSubExport(item.sub_auth)
                        break;
                    }
                }
            }
        	
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

