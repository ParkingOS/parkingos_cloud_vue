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
                :showEdit="showEdit"
                :showdelete="showdelete"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :addtitle="addtitle"
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
                hideSearch: true,
                showEdit: false,
                showdelete: false,
                hideAdd: false,
                tableheight: '',
                hideOptions: false,
                hideTool: false,
                queryapi: '/freereason/query',
                addapi: '/freereason/add',
                editapi: '/freereason/edit',
                delapi: '/freereason/delete',
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

                            searchable: true,

                            unsortable: true,
                            align: 'center'
                        }]
                    }, {
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
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '排序',
                            prop: 'sort',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',

                        }]
                    }


                ],
                searchtitle: '高级查询',
                addtitle: '添加免费原因',
                addFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },

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
                    if (AUTH_ID.showSystemManage_FreeReason_auth_id == item.auth_id) {
                        console.log(item.sub_auth)
                        // this.hideSearch= !common.showSubSearch(item.sub_auth)
                        // this.hideAdd= !common.showSubAdd(item.sub_auth)
                        // this.hideExport = !common.showSubExport(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)

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

