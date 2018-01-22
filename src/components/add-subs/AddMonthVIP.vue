<template>

    <!--<el-dialog-->
            <!--title="月卡续费"-->
            <!--v-model="showRefill"-->
            <!--size="tiny">-->
        <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
            <el-form-item label="包月产品">
                <el-select v-model="pnameno" filterable @change="getRefillTotal" style="width:90%">
                    <el-option
                            v-for="item in pname"
                            :label="item.value_name"
                            :value="item.value_no"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起始日期">
                <AddDate v-model="Btime" placeholder="" v-on:selectdata="getTime"></AddDate>
            </el-form-item>
            <el-form-item label="续费月数">
                <el-select v-model="refillcount" filterable @change="getRefillTotal" style="width:90%">
                    <el-option
                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                            :label="item"
                            :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="应收金额">
                <el-input v-model="RefillTotal" style="width:90%" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="实收金额">
                <el-input v-model="RefillTotalact" style="width:90%" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <!--<span slot="footer" class="dialog-footer">-->
				<!--<el-button @click="showRefill = false" size="small">取 消</el-button>-->
				<!--<el-button type="primary" size="small" @click="handleRefill" :loading="resetloading">确 定</el-button>-->
			<!--</span>-->
    <!--</el-dialog>-->
</template>

<script>
    import axios from 'axios'
    import common from '../../common/js/common'
    import AddDate from './AddDate.vue'
    export default {
        components: {
            AddDate
        },
        data() {
            return {
                resetloading: false,
                showRefill: true,
                pname: [],
                pnameno: '',
                refillcount: '',
                RefillTotal: '',
                RefillTotalact: '',
                Btime: ''
            }
        },
        methods: {
            getTime: function (time) {
                this.Btime = time
            },
            handleRefill: function () {
                this.resetloading = true
                let _this = this
                axios.all([common.reNewProduct(this.pnameno, this.refillcount, this.currentRow.name, this.Btime, this.currentRow.id, this.currentRow.remark, this.RefillTotalact, sessionStorage.getItem('nickname'))])
                    .then(axios.spread(function (ret) {
                        let data = ret.data
                        console.log(data)
                        if (data.state == 1) {
                            _this.$refs['bolinkuniontable'].getTableData({})
                            _this.$message({
                                message: '续费成功!',
                                type: 'success',
                                duration: 600
                            });
                            _this.showRefill = false;
                        } else {
                            //更新失败
                            _this.$message({
                                message: data.msg + '!',
                                type: 'error',
                                duration: 600
                            });
                        }
                        _this.resetloading = false
                    }))
            },
            getRefillTotal: function () {
                console.log('计算续费金额' + this.pnameno + '  ' + this.refillcount)
                if (this.pnameno == '' || this.refillcount == '')
                    return;
                let _this = this
                axios.all([common.getProdSum(this.pnameno, this.refillcount)])
                    .then(axios.spread(function (ret) {
                        _this.RefillTotal = ret.data;
                        _this.RefillTotalact = ret.data;
                        // console.log(ret.data)
                    }))
            },
        },
        activated(){
            let _this = this
            axios.all([common.getPName()])
            .then(axios.spread(function (ret) {
                _this.pname = ret.data;
                // console.log(ret.data)
                // console.log(_this.pname)
            }))
        }
    }
</script>

<style scoped>

</style>