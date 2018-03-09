<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :searchtitle="searchtitle"
                :addtitle="addtitle"
                :showdelete="showdelete"
                :showCustomizeAdd="showCustomizeAdd"
                :hideOptions="hideOptions"
                :showEdit="showEdit"
                :hideAdd="hideAdd"
                :showsetting="showsetting"
                v-on:showSetting="showSetting"
                v-on:customizeadd="customizeadd"
                ref="bolinkuniontable"
        ></common-table>

        <el-dialog
                :title="addtitle"
                :visible.sync="showRegisPark"
                width="30%">
            <el-form ref="addForm" label-width="120px" style="margin-bottom:-30px" :rules="addFormRules"
                     :model="addForm">
                <el-form-item label="名称" :prop="company_name">
                    <el-input v-model="addForm.company_name" style="width:90%" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="车场类型">
                    <el-select v-model="addForm.parking_type" style="width:90%">
                        <el-option
                                v-for="item in cartype"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="车位总数">
                    <el-input v-model="addForm.parking_total" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="进场方式">
                    <el-select v-model="addForm.etc" style="width:90%">
                        <el-option
                                v-for="item in cartype"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="addForm.state" style="width:90%">
                        <el-option
                                v-for="item in cartype"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addForm.address" style="width:90%" placeholder=""></el-input>
                    <br/>
                    <el-button size="small" type="primary" @click="onMapShow">地图标注</el-button>
                </el-form-item>
                <el-form-item label="停车场电话">
                    <el-input v-model="addForm.mobile" style="width:90%" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addForm.remark" style="width:90%" placeholder=""
                              :readonly="readonly"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRegisPark = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleAdd" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>

        <el-dialog :visible.sync="mapVisible" @close="dclose" top="10%" width="50%" title="地图标注">

                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="16" @click="clickmap"
                           style="width: inherit;height: 420px"
                           @dblclick="makePoint" :scroll-wheel-zoom="true" :double-click-zoom="false">

                    <bm-marker v-if="showMarker" :position="marker" animation="BMAP_ANIMATION_DROP" :label="mapLabel"
                               :dragging="true" @mouseup="mouseup"></bm-marker>
                    <!--<bm-local-search :keyword="keyword" :auto-viewport="true" :selectFirstResult="true" :pageCapacity="ps" :resultPanel="false" location="北京"></bm-local-search>-->

                </baidu-map>

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

    import {
        parktypelist,
        distinctslist,
        checkCityInfo,
        provincelist,
        checkPass,
        centerpayset,
        singleDoubleLimit,
        singleDoubleType,
        path
    } from '../../api/api';

    import common from '../../common/js/common'
    import {AUTH_ID_UNION} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import AddDate from '../../components/add-subs/AddDate'

    import axios from 'axios'

    export default {
        components: {
            CommonTable,
            AddDate,

        },
        data() {
            return {
                readonly: true,
                loading: false,
                hideExport: false,
                tableheight: '',
                hideOptions: false,
                showEdit: true,
                showdelete: true,
                showRegisPark: false,
                showsetting: true,
                hideAdd: true,
                showCustomizeAdd: true,
                queryapi: '/cityparks/query',
                setapi: '/cityparks/setpark',
                addapi: '/cityparks/add',
                editapi: '/cityparks/edit',
                delapi: '/cityparks/delete',
                parkid: '',
                currentIndex: 0,
                currentRow: '',

                resetCarnumber: '',
                btswidth: '200',
                fieldsstr: 'id__company_name__parking_type__parking_total__etc__state__areaid__city__address__longitude__latitude__mobile__create_time__update_time__ukey',
                tableitems: [
                    {
                        hasSubs: false, subs: [
                            {
                                label: '编号',
                                prop: 'id',
                                width: '100',
                                type: 'number',
                                searchable: true,

                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '名称',
                                prop: 'company_name',
                                width: '123',
                                type: 'str',
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场类型',
                                prop: 'parking_type',
                                width: '123',
                                type: 'str',
                                searchable: false,
                                addable: true,
                                hidden: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车位总数',
                                prop: 'parking_total',
                                width: '100',
                                type: 'number',
                                addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '进场方式',
                                prop: 'etc',
                                width: '100',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '状态',
                                prop: 'state',
                                width: '100',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    // {
                    //     hasSubs: false, subs: [
                    //         {
                    //             label: '所属区域',
                    //             prop: 'areaid',
                    //             width: '100',
                    //             type: 'str', addable: true,
                    //             searchable: true,
                    //             unsortable: true,
                    //             align: 'center',
                    //         },
                    //     ]
                    // }, {
                    //     hasSubs: false, subs: [
                    //         {
                    //             label: '行政地区',
                    //             prop: 'city',
                    //             width: '100',
                    //             type: 'str', addable: true,
                    //             searchable: true,
                    //             unsortable: true,
                    //             align: 'center',
                    //         },
                    //     ]
                    // },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '地址',
                                prop: 'address',
                                width: '300',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    }, {
                        hasSubs: false, subs: [
                            {
                                label: '停车场电话',
                                prop: 'mobile',
                                width: '123',
                                type: 'str', addable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },

                    {
                        hasSubs: false, subs: [
                            {
                                label: '创建时间',
                                prop: 'create_time',
                                width: '180',
                                type: 'date',

                                searchable: true,
                                addable: true,
                                unsortable: false,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.create_time);
                                }
                            },
                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '更新时间',
                                prop: 'update_time',
                                width: '180',
                                type: 'date',
                                selectlist: centerpayset,

                                searchable: true,

                                unsortable: false,
                                align: 'center'
                                ,
                                format: function (row) {
                                    return common.dateformat(row.update_time);
                                }
                            },

                        ]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '车场秘钥',
                                prop: 'ukey',
                                width: '180',
                                type: 'str',
                                addable: true,
                                editable: true,
                                searchable: true,
                                unsortable: true,
                                align: 'center'
                            },
                        ]
                    },
                ],
                searchtitle: '高级查询',
                addtitle: '注册停车场',
                readonly: true,
                datereadonly: true,

                company_name: 'company_name',
                addFormRules: {
                    company_name: [
                        {required: true, message: '请填写停车场名称', trigger: 'blur'}
                    ],
                    act_total: [
                        {required: true, message: '实收金额不能为空', trigger: 'blur'}
                    ],
                    car_number: [
                        {required: true, message: '请填写车牌号码', trigger: 'blur'}
                    ],
                    months: [
                        {required: true, message: '请选择购买月数', trigger: 'change', type: 'number'}
                    ],
                    // p_name: [
                    //     {required: true, message: '请选择包月产品', trigger: 'change',}
                    // ],
                    b_time: [
                        {required: true, message: '请选择起始日期', trigger: 'change', type: 'date'}
                    ],
                    limit_day_type: [
                        {required: true, message: '请选择限行限制', trigger: 'change', type: 'number'}
                    ],

                },
                pname: [],
                cartype: [],
                resetloading: false,
                addForm: {},

                mapVisible:false,
                showMarker:false,
                showMap:false,
                keyword:'',
                center: {
                    lat: 0,
                    lng: 0
                },
                marker: {
                    lat: 0,
                    lng: 0
                },
                maploading:false,
                mapLabel:{content: '双击定位', opts: {offset: {width: 20, height: -10}}},
            }
        },
        methods: {
            showSetting: function (index, row) {
                //显示设置
                this.currentIndex = index;
                this.currentRow = row;
                this.showResetCarnumber = true;
            },
            customizeadd: function () {
                //显示注册新车场
                this.showRegisPark = true;
            },
            handleAdd: function () {
                //注册车场
            },
            onMapShow:function () {
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
                            vm.mapLabel.content = vm.keyword
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
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            };
            this.tableheight = common.gwh() - 135;
            let user = sessionStorage.getItem('user');
            // console.log(user)
            if (user) {
                user = JSON.parse(user);
                // console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID_UNION.systemSetting_Park == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth);
                        this.hideSearch = !common.showSubSearch(item.sub_auth);
                        this.showdelete = common.showSubDel(item.sub_auth);
                        this.showCustomizeAdd = common.showSubAdd(item.sub_auth);
                        this.showsetting = common.showSetting(item.sub_auth);
                        this.showEdit = common.showSubEdit(item.sub_auth);

                        if (!this.showsetting && !this.showdelete && !this.showEdit) {
                            this.hideOptions = true;
                        }
                        break;
                    }
                }

            }
            this.mapstyle = 'width:inherit;height:' + 480 + 'px';
        },
        activated() {

            window.onresize = () => {
                this.tableheight = common.gwh() - 135;
            };
            this.tableheight = common.gwh() - 135;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({});
            let _this = this;
            axios.all([common.getPName(), common.getCarType()])
                .then(axios.spread(function (retpname, retcartype) {
                    _this.pname = retpname.data;
                    _this.cartype = retcartype.data;
                    // console.log(ret.data)
                    // console.log(_this.pname)
                }))
        },
        watch: {
            pname: function (val) {
                this.tableitems[1].subs[0].selectlist = val
            },
            cartype: function (val) {
                this.tableitems[10].subs[0].selectlist = val
            }
        }
    }

</script>