<template>
    <section style="padding: 10px;">
        <el-row>
            <el-col> 历史总收入:0.00，账号当前余额：0.00，账号可提现余额：0.00</el-col>
        </el-row>
        <el-row style="margin-top:28px">
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
                                    <el-input v-model="latlng"></el-input>
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
                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="16" @click="clickmap" style="width: inherit;height: 420px"
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
    import ElCard from "element-ui/packages/card/src/main";

    export default {
        components: {ElCard},
        data() {
            return {
                parkid: '21782',
                paridreadonly: true,
                parkname: '测试停车场',
                parkspacenums: '20',

                telephone: '10010',
                mobilephone: '18888888888',
                latlng: '122.1213331,38.08879',
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
                    // lat: 39.915797,
                    // lng: 116.404119
                },
                mapstyle: '',
                mapheight: '',
                mapwidth: '',
                label: {content: 'Marker Label', opts: {offset: {width: 20, height: -10}}},
            }
        },
        methods: {
            clicklocate: function () {

                this.center.lat = '40.042492'
                this.center.lng = '116.318287'
                this.marker.lat = '40.042492'
                this.marker.lng = '116.318287'

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
                this.showMarker = true
                //console.log(this.marker.lat,this.marker.lng)
            },
            mouseup(type) {
                this.marker.lat = type.point.lat
                this.marker.lng = type.point.lng
                //console.log(this.marker.lat,this.marker.lng)
            },
            clickmap(type) {
                console.log(type.point)
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
                console.log('----------------')
            },
            mounted(){
                this.mapstyle = 'width:420px;height:' + 420 + 'px'
            }
        }
    }
</script>

<style scoped>

</style>