<template>
    <div class="number" style="margin-right: 15px">

        <el-select v-model="role.value_no" placeholder="请选择" @change="uptoeditdialog" filterable style="width:100%">
            <el-option

                    v-for="item in roles"
                    :label="item.value_name"
                    :value="item.value_no"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import common from '../../common/js/common.js'
    import {path} from '../../api/api';

    export default {
        name:'role',
        components: {},
        data() {
            return {
                // rolevalueno: '',
                tempForm: {value_no: ''},
                upForm: {role_id: ''},
                roles: [],
                role: {value_no: '', value_name: ''}
            }
        },
        methods: {
            uptoeditdialog: function () {
                if (this.select != '') {
                    this.upForm.role_id = this.role.value_no
                    this.$emit('fromedititem', this.upForm)
                }
            },
            setValue: function () {
                this.dateForm = common.clone(this.tempForm)
                this.upForm = {}
            }
        },
        mounted() {
            // var _this = this
            // this.$post(path + '/member/getrole', {
            //     comid: sessionStorage.getItem('comid'),
            //     loginuin: sessionStorage.getItem('loginuin')
            // }, function (ret) {
            //     _this.roles = eval("(" + ret + ")");
            //     console.log(_this.roles)
            // })
        },
    }
</script>

<style scoped>

</style>