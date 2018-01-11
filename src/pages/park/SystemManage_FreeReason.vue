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
                :showdateSelector="showdateSelector"
                :hideTool="hideTool"
                :showParkInfo="showParkInfo"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"

                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {path, checkURL, checkUpload, checkNumber, payType} from '../../api/api';
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
                loading: false,
                hideExport: true,
                hideSearch: false,
                showdateSelector: true,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,
                showParkInfo: false,
                hideTool: false,

                queryapi: '/freereason/query',
                btswidth: '100',
                fieldsstr: 'id__name__sort',
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
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '名称',
                            prop: 'name',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '排序',
                            prop: 'sort',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',

                        }]
                    }


                ],
                searchtitle: '查询明细',

            }
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                for (var item of user.authlist) {
                    if (AUTH_ID.showSystemManage_Commute_auth_id == item.auth_id) {
                        console.log(item.sub_auth)
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

