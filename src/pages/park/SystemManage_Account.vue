<template>
    <section style="padding: 10px;"  >
        <!--v-loading.body="bodyloading"-->
        <!--<el-dialog v-model="bodyloading"></el-dialog>-->
        <el-row>
            <!--<el-col> 历史总收入:0.00，账号当前余额：0.00，账号可提现余额：0.00</el-col>-->
            <el-col style="margin-left: 10px;">
                <el-button type="primary" @click="saveModify" >保存信息</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:28px"  >
            <el-col :span="8" style="padding: 10px">
                <el-card style="height:240px">
                    <div>基本信息</div>
                    <div>
                        <el-row>
                            <el-form style="width:90%;margin-top: 20px;" label-width="100px">
                                <el-form-item label="车场编号">
                                    <el-input :readonly="paridreadonly" v-model="parkid"></el-input>
                                </el-form-item>
                                <el-form-item label="车场名称">
                                    <el-input v-model="parkname"></el-input>
                                </el-form-item>
                                <el-form-item label="车位总数">
                                    <el-input v-model="parkspacenums"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" style="padding: 10px">
                <el-card style="height:240px">
                    <div>位置信息</div>
                    <div>
                        <el-row>
                            <el-form style="width:90%;margin-top: 20px;" label-width="100px">
                                <el-form-item label="经纬度">
                                    <el-input v-model="latlng" :readonly="paridreadonly"></el-input>
                                </el-form-item>
                                <el-form-item label="详细地址">
                                    <el-input v-model="address"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row>
                            <el-button type="primary" @click="clicklocate" size="small">定位</el-button>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" style="padding: 10px">
                <el-card style="height:240px">
                    <div>联系方式</div>
                    <div>
                        <el-row>
                            <el-form style="width:90%;margin-top: 20px;" label-width="100px">
                                <el-form-item label="电话">
                                    <el-input v-model="telephone"></el-input>
                                </el-form-item>
                                <el-form-item label="手机">
                                    <el-input v-model="mobilephone"></el-input>
                                </el-form-item>

                            </el-form>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <input v-show="false" v-model.number="center.lng">
        <input v-show="false" v-model.number="center.lat">
        <el-dialog v-model="mapVisible" @close="dclose" top="10%">
            <div>
                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="16" @click="clickmap"
                           style="width: inherit;height: 420px"
                           @dblclick="makePoint" :scroll-wheel-zoom="true" :double-click-zoom="false">

                    <bm-marker v-if="showMarker" :position="marker" animation="BMAP_ANIMATION_DROP" :label="label"
                               :dragging="true" @mouseup="mouseup"></bm-marker>
                    <!--<bm-local-search :keyword="keyword" :auto-viewport="true" :selectFirstResult="true" :pageCapacity="ps" :resultPanel="false" location="北京"></bm-local-search>-->

                </baidu-map>
            </div>
            <el-col :span="24" style="margin-bottom: 10px;margin-top:10px">
                <el-col :span="16">
                    <el-input
                            placeholder="请输入关键字"
                            v-model="keyword"
                            style="width:150px;"
                            size="small">
                    </el-input>
                    <el-button type="primary" icon="search" size="small" @click="sclick"></el-button>
                </el-col>
                <el-col :span="8" align="right">
                    <el-button @click="mapVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="modifyPosition" size="small" :loading="maploading">保存</el-button>
                </el-col>
            </el-col>
        </el-dialog>
    </section>

</template>

<script>
    import {path} from '../../api/api';

    export default {
        components: {},
        data() {
            return {
                parkid: '21782',
                paridreadonly: true,
                parkname: '测试停车场',
                parkspacenums: '20',

                telephone: '10010',
                mobilephone: '18888888888',
                latlng: '',
                lat: '',
                lng: '',
                address: '北京市海淀区上地三街',
                mapVisible: false,
                showMarker: false,
                showMap: false,
                maploading: false,
                keyword: '',
                center: {
                    lat: 0,
                    lng: 0
                },
                marker: {
                    lat: 0,
                    lng: 0
                },
                mapstyle: '',
                mapheight: '',
                mapwidth: '',
                label: {content: '双击定位', opts: {offset: {width: 20, height: -10}}},

                queryapi: '/park/query',
                editapi: '/park/edit',
                accountinfo: [],
                bodyloading:false
            }
        },
        methods: {
            clicklocate: function () {
                let lng = this.latlng.split(' , ')[0]
                let lat = this.latlng.split(' , ')[1]
                this.center.lat = lat
                this.center.lng = lng
                this.marker.lat = lat
                this.marker.lng = lng

                this.showMap = true
                this.showMarker = true
                this.mapVisible = true
            },
            dclose: function () {
                setTimeout(() => {
                    this.showMarker = false;
                    this.showMap = false;
                    this.keyword = ''
                }, 100)
            },
            makePoint(type) {
                this.showMarker = false
                this.marker.lat = type.point.lat
                this.marker.lng = type.point.lng
                this.lat = type.point.lat
                this.lng = type.point.lng
                this.showMarker = true
                // console.log(this.marker.lat,this.marker.lng)
            },
            mouseup(type) {
                this.marker.lat = type.point.lat
                this.marker.lng = type.point.lng
                //console.log(this.marker.lat,this.marker.lng)
            },
            clickmap(type) {
                // console.log(type.point)
            },
            sclick() {
                var vm = this
                var myGeo = new BMap.Geocoder();

                myGeo.getPoint(this.keyword, function (point) {
                    if (point) {
                        console.log(point)
                        if (point.lat == vm.center.lat && point.lng == vm.center.lng) {
                            alert("输入的地址相同或地址不正确!");
                        } else {
                            vm.center.lat = point.lat
                            vm.center.lng = point.lng
                            vm.showMarker = false
                            vm.label.content = vm.keyword
                            vm.marker.lat = point.lat
                            vm.marker.lng = point.lng
                            vm.showMarker = true
                        }
                    } else {
                        alert("您选择地址没有解析到结果!");
                    }
                }, "中国");
            },
            modifyPosition() {
                this.latlng = this.lng + ' , ' + this.lat
                this.mapVisible = false
            },
            getInfo:function () {
                this.bodyloading = true;
                let qform = {comid: ''}
                qform.comid = sessionStorage.getItem('comid')
                var vm = this

                vm.$axios.post(path + vm.queryapi,vm.$qs.stringify(qform),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;

                    vm.bodyloading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 150)
                    } else {
                        // console.log(ret)
                        // vm.accountinfo = ret
                        vm.parkid = ret[41].value;              //id
                        vm.parkname = ret[12].value;            //company_name
                        vm.parkspacenums = ret[1].value;        //parking_total
                        vm.address = ret[59].value;             //address
                        vm.lng = ret[16].value;                 //longitude latitude
                        vm.lat = ret[33].value;                 //longitude latitude
                        vm.latlng = ret[16].value + ' , ' + ret[33].value;
                        vm.mobilephone = ret[34].value;         //mobile
                        vm.telephone = ret[3].value;            //phone
                    }

                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!'+error)
                    }, 150)
                })

            },
            saveModify:function () {
                this.bodyloading = true;
                let eform={
                    comid:'',
                    id:'',
                    company_name:'',
                    parking_total:'',
                    address:'',
                    longitude:'',
                    latitude:'',
                    mobile:'',
                    phone:''
                }

                eform.comid = sessionStorage.getItem('comid')
                eform.id = this.parkid
                eform.company_name = this.parkname
                eform.parking_total = this.parkspacenums
                eform.address = this.address
                eform.longitude = this.latlng.split(' , ')[0]
                eform.latitude = this.latlng.split(' , ')[1]
                eform.mobile = this.mobilephone
                eform.phone = this.telephone

                let vm = this

                vm.$axios.post(path + vm.editapi,vm.$qs.stringify(eform),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    vm.bodyloading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!')
                        }, 150)
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!')
                        }, 150)
                    } else {
                        vm.maploading = false;
                        vm.savelabel = '保存信息2'
                        if (ret > 0 || ret.state == 1) {
                            //更新成功
                            vm.getInfo();
                            vm.$message({
                                message: '保存成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false
                            vm.resetloading = false
                        } else {
                            //更新失败
                            vm.$message({
                                message: '保存失败!',
                                type: 'error',
                                duration: 2000
                            });
                        }

                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!'+error)
                    }, 150)
                })

            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        this.$router.push('/login');
                    }
                });
            },

        },
        mounted() {
            this.mapstyle = 'width:inherit;height:' + 420 + 'px'
            this.getInfo()
        }
    }
</script>

<style scoped>

</style>