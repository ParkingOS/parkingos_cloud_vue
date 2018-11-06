<template>
    <section>
        <!--工具条 2018/4/23-->
        <el-form :inline="true" v-if='hideLift' :model="formInline" class="demo-form-inline">
            <el-form-item label="" style="margin-bottom: 5px;">
                <el-date-picker
                        v-model="datesselector2"
                        type="datetimerange"
                        align="right"
                        style="float:left"
                        unlink-panels
                        range-separator="至"
                        :start-placeholder="start_placeholder"
                        :end-placeholder="end_placeholder"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions2"
                        @change="changeTimer"
                        :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="收费员:" style="margin-bottom: 5px;">
                <el-select v-model="formInline.name" placeholder="全部"
                           style="float: left;margin-right: 30px;">
                    <el-option
                            v-for="item in parentSf"
                            :key="item.value_no"
                            :label="item.value_name"
                            :value="item.value_no">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 5px;">
                <!--<el-button @click="changeParkTime(datesselector1)" icon="search" type="primary">搜索-->
                <!--</el-button>-->
                <el-button @click="liftRod" icon="search" type="primary">搜索
                </el-button>
                <el-button type="primary" @click="handleExport" v-if="!hideExport">导出
                </el-button>
            </el-form-item>
            <el-button @click="changeParkText" type="text" v-if="showParkInfo" style="color: #109EFF;">
                {{parkText}}
            </el-button>
            <el-button @click="changeParkText" type="text" v-if="showParkInfo2" style="color: #109EFF;">
                {{parkText}}
            </el-button>
            <el-col :span="2" align="right" style="float: right">
                <!--<span style="color:red;font-size:8px">提示:刷新后会重置高级查询</span>-->
                <!--<el-button @click="reset" type="primary" size="small">清空高级查询</el-button>-->
                <el-button @click="refresh" type="text">刷新&nbsp;&nbsp;</el-button>
            </el-col>
            <div :style="parkExpanStyle">
                <el-form-item label="抬杆编号:" style="margin-bottom: 5px">
                    <el-input v-model="formInline.number" placeholder="抬杆编号"></el-input>
                </el-form-item>
                <el-form-item label="通道:" style="margin-bottom: 5px">
                    <el-input v-model="formInline.channel"  placeholder="通道"></el-input>
                </el-form-item>
                <el-form-item label="抬杆原因:" style="margin-bottom: 5px">
                    <el-select  v-model="formInline.cause"  placeholder="全部">
                        <el-option
                                v-for="item in parentMsg"
                                :key="item.value_no"
                                :label="item.value_name"
                                :value="item.value_no">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>


        <el-form :inline="true" v-if='hideVisitor' :model="formVisitor" class="demo-form-inline">

            <el-form-item label="车牌号:" style="margin-bottom: 5px">
                <el-input v-model="formVisitor.car_number"  placeholder="车牌号"></el-input>
            </el-form-item>

            <el-form-item label="状态:" style="margin-bottom: 5px;">
                <el-select v-model="formVisitor.state" placeholder="全部"
                           style="float: left;margin-right: 30px;">
                    <el-option
                            v-for="item in stateType"
                            :key="item.value_no"
                            :label="item.value_name"
                            :value="item.value_no">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 5px;">
                <el-button @click="doSearch()" icon="search" type="primary">搜索
                </el-button>
                <el-button type="primary" @click="handleExport" v-if="!hideExport">导出
                </el-button>
            </el-form-item>

             <el-form-item  >

                 <el-button @click="getCode()" icon="search" type="primary">访客二维码
                </el-button>

            </el-form-item>

            <el-col :span="2" align="right" style="float: right">
                <!--<span style="color:red;font-size:8px">提示:刷新后会重置高级查询</span>-->
                <!--<el-button @click="reset" type="primary" size="small">清空高级查询</el-button>-->
                <el-button @click="refresh" type="text">刷新&nbsp;&nbsp;</el-button>
            </el-col>

        </el-form>



        <!--工具条-->
        <el-row style="margin-bottom:8px" v-if="!hideTool">
            <el-col :span="24" align="left">
                <el-col :span="22" align="left">
                    <div v-if="showTicketInfo" style="display:inline;margin-right:10px;float: left">
                        <div>
                             <el-input v-model="parkcarnum" style="width:200px;background:white;">
                                <template slot="prepend">车牌号</template>
                             </el-input>
                             <el-button @click="changeCarNumber" icon="search" type="primary">搜索
                             </el-button>
                        </div>
                    </div>

                    <div v-if="showParkInfo" style="display:inline;margin-right:10px;float: left">
                        <div style="float:left">
                            <el-select v-model="currentTimeType" placeholder="入场时间" @change="changeParkTimestr"
                                       style="float: left;margin-right: 10px;width: 123px;">
                                <el-option
                                        v-for="item in InOutTime"
                                        :key="item.value_no"
                                        :label="item.value_name"
                                        :value="item.value_no">
                                </el-option>
                            </el-select>
                              <el-date-picker
                                     v-model="datesselector"
                                     type="datetimerange"
                                     align="right"
                                     style="float:left"
                                     unlink-panels
                                     range-separator="至"
                                     :start-placeholder="start_placeholder"
                                     :end-placeholder="end_placeholder"
                                     value-format="yyyy-MM-dd HH:mm:ss"
                                     :picker-options="pickerOptions3"
                                     :editable=false
                                     @change="changeParkTime"
                                      ref="timeDom"
                                     @blur="inputBlur"
                                     :default-time="['00:00:00', '23:59:59']">
                             </el-date-picker>

                            <el-input v-model="parkcarnum" style="float:left;width:200px;background:white;">
                                <template slot="prepend">车牌号</template>
                            </el-input>
                            <!--<el-button @click="changeParkText" icon="search">{{parkText}}-->
                            <!--</el-button>-->
                            <el-button style="float:left;" @click="changeParkTime(datesselector)" icon="search" type="primary">搜索
                            </el-button>
                        </div>

                    </div>
                    <div v-if="showRefillInfo" style="display:inline;margin-right:100px;float: left">
                        <el-input v-model="shouldpay" style="width:200px;background:white;" disabled>
                            <template slot="prepend">应收</template>
                        </el-input>
                        <el-input v-model="actualpay" style="width:200px;background:white;" disabled>
                            <template slot="prepend">实收</template>
                        </el-input>
                    </div>


                    <!--<div v-if="showParkInfo" style="display:inline;margin-right:50px;float: left">-->
                    <!--<el-input v-model="parkspace_park" style="width:150px;background:white;margin-right: 0.5px;"-->
                    <!--disabled>-->
                    <!--<template slot="prepend">场内停车</template>-->
                    <!--</el-input>-->
                    <!--<el-input v-model="parkspace_park" style="width:150px;background:white;" disabled>-->
                    <!--<template slot="prepend">临停车</template>-->
                    <!--</el-input>-->
                    <!--<el-input v-model="parkspace_blank" style="width:150px;background:white;" disabled>-->
                    <!--<template slot="prepend">空车位</template>-->
                    <!--</el-input>-->
                    <!--</div>-->
                    <div v-if="showBusinessOrder" style="display:inline;margin-right:100px;float: left">
                        <el-input v-model="sumtotal" style="width:200px;background:white;" disabled>
                            <template slot="prepend">订单总金额</template>
                        </el-input>
                        <el-input v-model="cashpay" style="width:200px;background:white;" disabled>
                            <template slot="prepend">现金支付</template>
                        </el-input>
                        <el-input v-model="elepay" style="width:200px;background:white;" disabled>
                            <template slot="prepend">手机支付</template>
                        </el-input>
                    </div>
                    <div v-if="showCollectorSelector" style="float: left;margin-right: 10px;">
                        <el-select v-model="currentcollect" placeholder="请选择收费员" @change="changeanalysisdatecollect"
                                   style="float: left;margin-right: 30px;">
                            <el-option
                                    v-for="item in collectors"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="showParkSelector" style="float: left;margin-right: 10px;">
                        <el-select v-model="currentpark" placeholder="全部车场" @change="changeanalysisdatepark"
                                   style="float: left;margin-right: 30px;">
                            <el-option
                                    v-for="item in parks"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="showdateSelector" style="float: left;margin-right: 10px;">

                        <span class="demonstration">日期</span>
                        <el-date-picker
                                v-model="datesselector"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                :start-placeholder="start_placeholder"
                                :end-placeholder="end_placeholder"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions2"
                                @change="changeanalysisdate"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </div>

                    <div v-if="showoperateSelector" style="float: left;margin-left: 10px;">
                        <span style="float: left;margin-top: 10px;">类型：</span>
                        <el-select v-model="currentoperate"  @change="changeoperate"
                                   style="float: left;margin-right: 30px;">
                            <el-option
                                    v-for="item in operateType"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="showshopdateSelector" >

                        <span class="demonstration">日期</span>
                        <el-date-picker
                                v-model="datesselector"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                :start-placeholder="start_placeholder"
                                :end-placeholder="end_placeholder"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions2"
                                @change="changeanalysisdate"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </div>

                    <div v-if="showdateSelector22" style="float: left;margin-right: 10px;">

                        <span class="demonstration">日期</span>
                        <el-date-picker
                                v-model="datesselector"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                :start-placeholder="start_placeholder1"
                                :end-placeholder="end_placeholder1"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions2"
                                @change="changeanalysisdate"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </div>

                     <div v-if="showdateSelector33" style="float: left;margin-right: 10px;">

                        <span class="demonstration">日期</span>
                       <el-date-picker
                               v-model="datesselector"
                               type="date"
                               align="right"
                               unlink-panels
                               :placeholder="start_placeholder33"
                               @change="changeanalysisdate"
                               >
                       </el-date-picker>

                    </div>
                    <div v-if="showdateSelector10" style="float: left;margin-right: 10px;">

                        <span class="demonstration">日期</span>
                        <el-date-picker
                                v-model="datesselector"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                :start-placeholder="start_placeholder"
                                :end-placeholder="end_placeholder"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions2"
                                @change="changeanalysisdate"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </div>

                    <div v-if="showdateSelectorMonth" style="float: left;margin-right: 10px;">
                        <!--<div style="float: left;margin-right: 10px;">-->
                        <el-date-picker
                                v-model="monthReportStart"
                                type="month"
                                value-format="yyyy-MM"
                                :picker-options="pickerOptionsBefore"
                                :placeholder="start_month_placeholder">
                        </el-date-picker>
                        <span> 至 </span>
                        <el-date-picker
                                v-model="monthReportEnd"
                                type="month"
                                value-format="yyyy-MM"
                                :picker-options="pickerOptionsAfter"
                                :placeholder="start_month_placeholder">
                        </el-date-picker>
                        <el-tooltip class="item" effect="dark" content="最多支持12个月的数据查询" placement="bottom">
                            <el-button type="primary" @click="handleSearchMonthReport" align="center">查询
                            </el-button>
                        </el-tooltip>
                    </div>

                     <div v-if="showdateSelectorMonth22" style="float: left;margin-right: 10px;">
                        <!--<div style="float: left;margin-right: 10px;">-->
                        <el-date-picker
                                v-model="monthReportStart"
                                type="month"
                                value-format="yyyy-MM"
                                :picker-options="pickerOptionsBefore"
                                :placeholder="start_month_placeholder11">
                        </el-date-picker>
                        <span> 至 </span>
                        <el-date-picker
                                v-model="monthReportEnd"
                                type="month"
                                value-format="yyyy-MM"
                                :picker-options="pickerOptionsAfter"
                                :placeholder="end_month_placeholder11">
                        </el-date-picker>
                        <el-tooltip class="item" effect="dark" content="最多支持12个月的数据查询" placement="bottom">
                            <el-button type="primary" @click="handleSearchMonthReport" align="center">查询
                            </el-button>
                        </el-tooltip>
                    </div>

                    <el-button type="primary" @click="handleCustomizeAdd" v-if="showCustomizeAdd">
                        {{addtitle}}
                    </el-button>

                    <div v-if="showSuperimposed"  style="display:inline;float: left">
                        <span style="float: left;margin-top: 10px;margin-left: 20px;">叠加用券：</span>
                        <el-select v-model="superimposed"
                                   style="float: left;margin-right: 10px;width: 123px;" @change="changeSuperimposed">
                            <el-option
                                    v-for="item in superimposedType"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                    </div>

                    <el-button type="primary" @click="handleSearch" v-if="!hideSearch" icon="search">高级查询
                    </el-button>
                    <el-button type="primary" @click="handleUpload" v-if="showUploadMonthCard"
                               icon="search">导入月卡
                    </el-button>
                    <el-button type="primary" @click="handlePublic" v-if="showPublic"
                               icon="search">公众号设置
                    </el-button>

                    <el-tooltip class="item" effect="dark" content="导出内容为当前查询条件下所有数据" placement="bottom">
                        <el-button type="primary" @click="handleExport" v-if="!hideExport">导出
                        </el-button>
                    </el-tooltip>
                    <el-button @click="changeParkText" type="text" v-if="showParkInfo" style="color: #109EFF;">
                        {{parkText}}
                    </el-button>
                    <el-button type="primary" @click="handleAdd" v-if="!hideAdd">{{addtitle}}</el-button>
                    <!--<el-button type="primary" size="small" @click="handlePrint()">打印</el-button>-->
                    <div :style="parkExpanStyle" >

                        <span style="float: left;margin-top: 10px;">订单状态：</span>
                        <el-select v-model="currentState" placeholder="未结算"
                                   style="float: left;margin-right: 10px;width: 123px;">
                            <el-option
                                    v-for="item in orderStateType"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                        <span style="float: left;margin-top: 10px;margin-left: 10px">支付方式：</span>
                        <el-select v-model="currentPayType" placeholder="现金"
                                   style="float: left;margin-right: 10px;width: 123px;">
                            <el-option
                                    v-for="item in orderPayType"
                                    :key="item.value_no"
                                    :label="item.value_name"
                                    :value="item.value_no">
                            </el-option>
                        </el-select>
                        <span style="float: left;margin-top: 10px;margin-left: 10px">实收金额：</span>
                        <el-input v-model="parkAccoutRece_start" v-on:input="changeParkReceive"
                                  style="width: 100px;"></el-input>
                        <span style="margin-top: 10px;"> - </span>
                        <el-input v-model="parkAccoutRece_end" v-on:input="changeParkReceive"
                                  style="width: 100px;"></el-input>
                    </div>
                </el-col>

                <el-col :span="2" align="right" style="float: right">
                    <!--<span style="color:red;font-size:8px">提示:刷新后会重置高级查询</span>-->
                    <!--<el-button @click="reset" type="primary" size="small">清空高级查询</el-button>-->
                    <el-button @click="refresh" type="text">刷新&nbsp;&nbsp;</el-button>
                </el-col>
            </el-col>

        </el-row>
        <!--列表-->
        <el-table :data="table" border highlight-current-row style="width:100%;"
                  :height="tableheight2"
                  v-loading="loading" @sort-change="sortChange" id="tablearea">

            <el-table-column label="操作" :width="btswidth" v-if="!hideOptions" align="center" fixed="left">
                <template scope="scope">
                    <el-button v-if="showEdit" :disabled='scope.row.state==2' size="small" type="text" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="showCustomizeEdit" type="text" size="small"
                               @click="handleCustomizeEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="showShopEdit" :disabled='scope.row.state==2' size="small" type="text" @click="handleCustomizeEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="showModifyCarNumber" type="text" size="small"
                               @click="handleModifyCarNumber(scope.$index, scope.row)">修改车牌
                    </el-button>
                    <el-button v-if="showsetting" type="text" size="small"
                               @click="handlesetting(scope.$index, scope.row)">设置
                    </el-button>
                    <el-button v-if="showShopSetting" :disabled='scope.row.state==2' type="text" size="small"
                               @click="handlesetting(scope.$index, scope.row)">设置
                    </el-button>
                    <el-button v-if="showqrurl" size="small" type="text" @click="handleqrurl(scope.$index, scope.row)">
                        生成车场二维码
                    </el-button>
                    <el-button v-if="showdelete" size="small" type="text" @click="openDelete(scope.$index, scope.row)">
                        <span style="color:red">删除</span></el-button>
                    <el-button v-if="showlogout" size="small" type="text" :disabled='scope.row.state==2' @click="showLogout(scope.$index, scope.row)">
                    <span style="color:red">销户</span></el-button>
                    <el-button v-if="showmapdialog" size="small" type="text"
                               @click="handlemap(scope.$index, scope.row)">车场定位
                    </el-button>
                    <el-button v-if="showresetpwd" size="small" type="text"
                               @click="handleresetpwd(scope.$index, scope.row)">重置密码
                    </el-button>
                    <el-button v-if="showresetdata" size="small" type="text"
                               @click="handleresetdata(scope.$index, scope.row)"><span style="color:red">重置</span>
                    </el-button>
                    <el-button v-if="showmRefill" :disabled='scope.row.state==2' size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">续费
                    </el-button>
                    <el-button v-if="showrefund" size="small" :disabled='scope.row.state==2' type="text" @click="showRefund(scope.$index, scope.row)">
                    <span>退款</span></el-button>
                    <el-button v-if="showPermission" size="small" type="text"
                               @click="handlePermission(scope.$index, scope.row)">编辑权限
                    </el-button>
                    <el-button v-if="showSettingFee" size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">收费设置
                    </el-button>
                    <el-button v-if="showCommutime" size="small" type="text"
                               @click="handleRefill(scope.$index, scope.row)">上班时间
                    </el-button>

                    <!--
                    <el-button
                        v-for="bt in bts"
                        v-on:click="bt.func"
                    >{{bt.name}}</el-button>
                    -->
                </template>
            </el-table-column>

            <el-table-column
                    v-if="!indexHide"
                    align="center"
                    type="index"
                    width="83"
                    label="索引"
                    fixed="left">
            </el-table-column>
            <!--在构建自定义表格时，一定要严格按照-->
            <!--<template>-->
            <!--<el-table-colum></el-table-colum>-->
            <!--<el-table-colum></el-table-colum>-->
            <!--</template>-->
            <!--中间不要出现其他标签，引发问题：-->
            <!--当表格无索引时，数据加载顺序错乱-->
            <template v-for="items in tableitems">
                <el-table-column
                        v-if="items.hasSubs"
                        :label="items.label"
                        header-align="center">
                    <el-table-column
                            v-for="tableitem in items.subs"
                            v-if="!tableitem.hidden"
                            :prop="tableitem.prop"
                            :label="tableitem.label"
                            header-align="center"
                            :align="tableitem.align"
                            :sortable="!tableitem.unsortable"
                            :width="tableitem.width"
                            :formatter="tableitem.format"
                    >
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        v-for="tableitem in items.subs"
                        v-if="!tableitem.hidden && !items.hasSubs"
                        :prop="tableitem.prop"
                        :label="tableitem.label"
                        header-align="center"
                        :align="tableitem.align"
                        :sortable="!tableitem.unsortable"
                        :width="tableitem.width"
                        :formatter="tableitem.format"
                >
                </el-table-column>
            </template>

            <el-table-column label="操作" :width="btswidth" v-if="showImg" align="center">
                <!--<el-button @click.native="showDetail(row)">查看详情</el-button>-->
                <template scope="scope">
                    <!--<span class="link-type" @click="handleShowImg(scope.$index, scope.row)" v-if="showImg">123</span>-->
                    <el-button size="small" type="text" style="color: #109EFF;"
                               @click="handleShowImg(scope.$index, scope.row)">
                        查看图片
                    </el-button>
                </template>
            </el-table-column>


            <el-table-column label="二维码图片" :width="btswidth" v-if="showCode" align="center">
                <template scope="scope">
                     <el-button size="small" type="text" style="color: #109EFF;"
                                @click="downloadCode(scope.$index, scope.row)">
                         下载二维码
                     </el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作" :width="btswidth" v-if="showImgSee" align="center" fixed="left">
                <!--<el-button @click.native="showDetail(row)">查看详情</el-button>-->
                <template scope="scope">
                    <!--<span class="link-type" @click="handleShowImg(scope.$index, scope.row)" v-if="showImg">123</span>-->
                    <el-button size="small" type="text" style="color: #109EFF;"
                               @click="handleShowOrderDetail(scope.$index, scope.row)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" v-if="!hidePagination" align="bottom" style="margin-top:5px;margin-bottom:5px">
            <el-col :span="24" align="right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage" :page-sizes="[20, 40, 80]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </el-col>
        </el-col>

        <!--高级查询-->
        <complex-search
                :searchVisible="searchFormVisible"
                :title="searchtitle"
                :searchitems="tableitems"
                v-on:searchdialog="closesearch"
                v-on:search="onSearch"
                ref="search">
        </complex-search>

        <!--表格编辑-->
        <edit-form
                :editVisible="editFormVisible"
                :edititems="tableitems"
                :editloading="editloading"
                :editFormRules="editFormRules"
                :rowdata="rowdata"
                :dialogsize="dialogsize"
                v-on:editdialog="closeedit"
                v-on:edit="onEdit"
                :ref="ef">
        </edit-form>

        <!--表格添加-->
        <add-form
                :addtitle="addtitle"
                :addVisible="addFormVisible"
                :addloading="addloading"
                :additems="tableitems"
                :addFormRules="typeof(addFormRules)=='undefined'?editFormRules:addFormRules"
                :dialogsize="dialogsize"
                v-on:adddialog="closeadd"
                v-on:add="onAdd"
                :ref="af">
        </add-form>

        <!--删除提示框-->
        <el-dialog
                title="提示"
                :visible.sync="delVisible"
                width="30%"
                custom-class="deleteTip">
            <div class="el-message-box__status el-icon-warning" style="padding-bottom: 10px;"></div>
            <div style="margin-left:50px;vertical-align:middle;">确定删除吗?此操作不可恢复!</div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="handledelete" size="small">确 定</el-button>
			</span>
        </el-dialog>

        <!--地图-->
        <input v-show="false" v-model.number="center.lng">
        <input v-show="false" v-model.number="center.lat">

        <el-dialog :visible.sync="mapVisible" @close="dclose" top="10%">
            <div>
                <baidu-map v-if="showMap" :style="mapstyle" :center="center" :zoom="16" @click="clickmap"
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

        <!--重置密码-->
        <el-dialog
                title="重置密码"
                :visible.sync="resetPwdVisible"
                width="30%">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="请输入新密码">
                    <el-input v-model="pwd1" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="pwd2" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="resetPwdVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="resetPwd" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>

        <el-dialog
                title="车场数据重置"
                :visible.sync="resetDataVisible"
                width="30%"
                style="text-align:center" >
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <div style="color:red;text-align: justify">车场重置后会清掉车场所有订单和抬杆数据,收费员与月卡等数据会保留,请慎重操作.</div>
                <el-form-item label="厂商登录密码">
                    <el-input v-model="pwd" style="width:90%"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="resetDataVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="resetData" :loading="resetloading">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    import {path} from '../api/api';
    import common from '../common/js/common';
    import ComplexSearch from './ComplexSearch';
    import EditForm from './EditForm';
    import AddForm from './AddForm';
    import Printd from 'printd';
    import axios from 'axios'

    export default {
        components: {
            ComplexSearch, EditForm, AddForm
        },
        data() {
            let that = this;
            return {
                formInline: {
                    timer:'',
                    name: '',
                    number: '',
                    channel: '',
                    cause: ''
                },
                formVisitor: {
                   car_number: ''
               },
                dateStart:'',
                dateEnd:'',
                searchForm:{
                    liftrod_id: '',
                    out_channel_id: '',
                    loginuin: '',
                    reason_start: '',
                    reason: ''
                },
                ctime_start:'',
                formitem:{

                },
                ef: 'editref',
                af: 'addref',
                editdisable:false,
                searchFormVisible: false,
                editFormVisible: false,
                addFormVisible: false,
                mapVisible: false,
                delVisible: false,
                currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',
                table: [],
                loading: false,
                resetloading: false,
                editloading: false,
                addloading: false,
                showMarker: false,
                //showMap:false,
                maploading: false,
                centralpaymentlist: '',
                searchForm: {},
                tempSearchForm: {},
                collectors: [],
                InOutTime: [
                    {
                        value_name: '入场时间',
                        value_no: 'create_time'
                    }, {
                        value_name: '出场时间',
                        value_no: 'end_time'
                    }],
                orderStateType: [
                    {'value_name': '全部类型', 'value_no': ''},
                    {'value_name': '未结算', 'value_no': '0'},
                    {'value_name': '已结算', 'value_no': '1'}
                ],
                superimposedType: [
                    {'value_name': '限制一张', 'value_no': '0'},
                    {'value_name': '限制两张', 'value_no': '2'},
                    {'value_name': '限制三张', 'value_no': '3'},
                    {'value_name': '限制四张', 'value_no': '4'},
                    {'value_name': '限制五张', 'value_no': '5'},
                    {'value_name': '限制六张', 'value_no': '6'},
                    {'value_name': '限制七张', 'value_no': '7'},
                    {'value_name': '限制八张', 'value_no': '8'},

                    {'value_name': '限制九张', 'value_no': '9'},

                    {'value_name': '不限制', 'value_no': '1'}
                ],
                orderPayType: [
                    //0:帐户支付,1:现金支付,2:手机支付 3:包月 4:现金预支付 5：银联卡(中央预支付，后面废弃) 6：商家卡(中央预支付，后面废弃) 8：免费放行 9：刷卡
                    // {'value_name': '账户支付', 'value_no': 0},
                    {'value_name': '全部类型', 'value_no': ''},
                    {'value_name': '现金支付', 'value_no': '1'},
                    {'value_name': '手机支付', 'value_no': '2'},
                    {'value_name': '包月', 'value_no': '3'},
                    // {'value_name': '现金预支付', 'value_no': 4,},
                    // {'value_name': '银联卡支付', 'value_no': 5,},
                    // {'value_name': '商家卡支付', 'value_no': 6,},
                    {'value_name': '免费放行', 'value_no': '8'}
                    // {'value_name': '刷卡', 'value_no': 9}
                ],
                currentcollect: '',
                currentpark: '',
                currentoperate:'',
                sform: {},
                rowdata: {},


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
                rowid: 0,
                ps: 1,
                keyword: '',
                cityName: '',
                shouldpay: '0.00 元',
                actualpay: '0.00 元',
                parkspace_blank: '0辆',
                parkspace_park: '0辆',
                cashpay: '0.00 元',
                elepay: '0.00 元',
                sumtotal: '0.00 元',
                label: {content: 'Marker Label', opts: {offset: {width: 20, height: -10}}},
                centralpayment: -3,
                todayTotal: '',
                balance: '',
                analysisdate: '',
                datesselector: '',
                cloneTime:'',
                datesselector1:'',
                datesselector2:'',
                monthReportStart: '',
                monthReportEnd: '',

                card_id:'',

                pickerOptionsBefore: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                pickerOptionsAfter: {
                    disabledDate(time) {
                        var date1 = new Date(that.monthReportStart);
                        var date2 = new Date(date1);
                        return time.getTime() > Date.now()  || time.getTime() <= date2.getTime();
                    }
                },

                 pickerOptionsBefore2: {
                    disabledDate(time) {
                        var date1 = new Date(that.dateEnd);
                        //alert(date1.getTime())
                        var date2 = new Date(date1.getTime()-31*24*60*60*1000);
                        return time.getTime() > Date.now()||time.getTime() < date2.getTime()||time.getTime()>date1.getTime();
                    }
                },
                pickerOptionsAfter2: {
                    disabledDate(time) {
                        var date1 = new Date(that.dateStart);
                        var date2 = new Date(date1);
                        return time.getTime() > Date.now()  || time.getTime() < date2.getTime();
                    }
                },

                searchDate: '',
                analysisdateopt: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                start_placeholder: '',
                start_placeholder1: '',
                start_placeholder33:'',
                end_placeholder: '',
                end_placeholder1:'',
                start_month_placeholder: '',
                start_month_placeholder11: '',
                end_month_placeholder11: '',

                minDate : '',
                maxDate : '',
                pickerOptions3:{

                    onPick(dates) {
                      that.minDate = dates.minDate;
                      //console.log('最小日期'+that.minDate)
                      that.maxDate = dates.maxDate;
                    },

                  disabledDate(time){
                     //console.log('======>>>>>>>>'+that.minDate)
                     //console.log('!!!!!!!>>>>>>>>'+new Date(that.minDate).getTime())
                      //if (that.maxDate ) {
                      //      return time.getTime() <  new Date(that.maxDate).getTime()-31*24*3600000||time.getTime()>Date.now();
                      // } else if (that.minDate) {
                      //      return time.getTime() >  new Date(that.minDate).getTime()+31*24*3600000||time.getTime()>Date.now();
                      // }

                        return time.getTime() >  new Date(that.minDate).getTime()+30*24*3600000||time.getTime()>Date.now()||time.getTime() <  new Date(that.minDate).getTime()-30*24*3600000;
                  }
                },


                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                //start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                                this.sform.page = 1;
                            }
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                start.setHours(0);
                                start.setMinutes(0);
                                start.setSeconds(0);
                                end.setHours(23);
                                end.setMinutes(59);
                                end.setSeconds(59);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
                resetPwdVisible: false,
                resetDataVisible:false,
                // imgDialog: false,
                // imgdialog_url: '',
                pwd1: '',
                pwd2: '',
                pwd:'',
                currentdate: '',
                tableheight2: '',
                parks: '',
                operateType:[
                    {'value_no': "", 'value_name': '全部'},
                    {'value_no': 1, 'value_name': '续费'},
                    {'value_no': 2, 'value_name': '回收充值'}
                ],
                stateType:[
                     {'value_no': "", 'value_name': '全部'},
                     {'value_no': 0, 'value_name': '待审批'},
                     {'value_no': 1, 'value_name': '已通过'},
                     {'value_no': 2, 'value_name': '已拒绝'}
                 ],
                //订单页面相关
                ordertime: 'between',
                ordertime_start: 0,
                ordertime_end: 0,
                ordertimetype: 'create_time',
                parkcarnum: '',
                parkText: '显示高级选项',
                parkExpanded: false,
                parkExpanStyle: 'display:none;',
                currentTimeType: '入场时间',
                currentState: '',
                superimposed: '0',
                currentPayType: '',
                parkAccoutRece_start: '',
                parkAccoutRece_end: '',
                getScrollHeight:0,
            };
        },
        props: ['tableitems', 'fieldsstr', 'hideOptions', 'hideExport', 'hideAdd', 'showCustomizeAdd', 'showCustomizeEdit', 'hideSearch', 'showLeftTitle', 'leftTitle', 'editFormRules', 'addFormRules',
            'tableheight', 'bts', 'btswidth', 'queryapi', 'queryparams', 'exportapi', 'editapi', 'addapi', 'resetapi', 'delapi', 'searchtitle', 'addtitle', 'addfailmsg',
            'dialogsize', 'showqrurl', 'showdelete','showlogout','showrefund', 'showmapdialog', 'showMap', 'showsetting','showShopSetting', 'hidePagination', 'showRefillInfo', 'showParkInfo','showTicketInfo', 'showBusinessOrder', 'hideTool', 'showanalysisdate', 'showresetpwd','showresetdata', 'showdateSelector','showdateSelector22','showdateSelector33','showdateSelector10', 'showCollectorSelector', 'showshopdateSelector','showParkSelector','showoperateSelector', 'showdateSelectorMonth','showdateSelectorMonth22',
            'showModifyCarNumber', 'showmRefill', 'showEdit','showShopEdit', 'showImg','showCode','showPublic', 'showImgSee', 'showCommutime', 'showSettingFee', 'showPermission', 'imgapi', 'showUploadMonthCard','showSuperimposed','hideLift','hideVisitor','indexHide','parentMsg','parentSf','orderfield','editdisable','showParkInfo2'],
        methods: {
            changeTimer:function (value) {
                console.log(value)
            },
            liftRod:function () {
                // console.log(this.formInline)
              var timer =  this.datesselector2
                if(timer != null){
                  var date1 = new Date(Date.parse(timer[0].replace(/-/g, "/")));
                  var date2 = new Date(Date.parse(timer[1].replace(/-/g, "/")));
                    this.sform.ctime = 'between';
                    this.sform.ctime_start = date1.getTime();
                    this.sform.ctime_end = date2.getTime();
                }
                //抬杆数据
                this.sform.uin = this.formInline.name;
                this.sform.uin_start = this.formInline.name;
                this.sform.liftrod_id = this.formInline.number;
                this.sform.out_channel_id = this.formInline.channel;
                this.sform.reason = this.formInline.cause;
                this.sform.reason_start = this.formInline.cause;
                //当前页数
                this.currentPage = 1;
                this.getTableData(this.sform);
            },
            //刷新页面
            refresh() {
                if (this.showdateSelector) {
                    //this.$extend(this.sform,{'date':this.datesselector})
                    this.sform.date = this.searchDate;
                    if (this.sform.date == '') {
                        this.sform.date = common.currentFormatDate();
                    }
                    this.sform.out_uid = this.currentcollect;
                    this.sform.comid_start = this.currentpark;
                    this.getTableData(this.sform);
                } else {
                    this.getTableData(this.sform);
                }
                //清空高级查询表单项内容
                this.$message({
                    message: '刷新成功!',
                    type: 'success',
                    duration: 600
                });
            },
            //重置高级查询
            reset() {
                console.log('reset');
                this.getTableData({});
                //清空高级查询表单项内容
                this.$refs['search'].resetSearch();
                this.sform = common.clone(this.tempSearchForm);
                this.$message({
                    message: '清空成功!',
                    type: 'success',
                    duration: 600
                });
            },
            //分页变动
            handleSizeChange(val) {
                this.pageSize = val;
                // console.log('size change');
                this.getTableData(this.sform);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                // console.log('page change');
                this.sform.date = this.searchDate;
                this.getTableData(this.sform);
            },
            //排序变动
            sortChange(val) {
                if (val.order != null && val.order.substring(0, 1) == 'a') {
                    this.orderby = 'asc';
                } else {
                    this.orderby = 'desc';
                }
                if(val.prop==null){
                    this.orderfield = 'id'
                }else{
                    this.orderfield = val.prop;
                }
                console.log('sort change');
                this.getTableData(this.sform);
            },
            handleSearchMonthReport() {
                this.sform.btime = this.monthReportStart;
                this.sform.etime = this.monthReportEnd;
                this.currentPage = 1;
                this.getTableData(this.sform);
            },

            changeSuperimposed : function(value){
                let vm = this;
                let api = "/shop/changeSuperimposed";
                let sform = {'comid': '',superimposed:''};
                sform.superimposed = value;
                sform = common.generateForm(sform);

                vm.$axios.post(path + api, vm.$qs.stringify(sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    // console.log(ret)
                    let ret = response.data;
                    vm.loading = false;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 150);
                    } else {
                        console.log(ret);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },
            //增加从url里面读取的2个参数
            getMonitorParamFromUrl(){
              var query = window.location.search.substring(1);
              var vars = query.split("&");
              var type = '';
              var id ='';
               for (var i=0;i<vars.length;i++) {
                       var pair = vars[i].split("=");
                       if(pair[0] == 'type'){
                         type = pair[1];
                       }
                       else if(pair[0] == 'id'){
                         id = pair[1];
                       }
               }
               let _this = this;
               var param = {
                 comid:id
               }
               if(type=='group'){
                 param = {
                   groupid:id
                 }
               }
               return param;
            },
            //拉取表格数据
            getTableData(sform1) {
                let param = this.getMonitorParamFromUrl()
                sform1.groupid = param.groupid;
                sform1.comid = param.comid;
                let vm = this;
                this.loading = false;
                let api = this.queryapi;
                sform1.rp = this.pageSize;
                sform1.page = this.currentPage;
                sform1.orderby = this.orderby;
                sform1.orderfield = this.orderfield;
                sform1.fieldsstr = this.fieldsstr;
                this.sform = common.generateForm(sform1);
                //保证5秒后把loading干掉
                setTimeout(() => {
                    vm.loading = false;
                }, 5000);
                vm.$axios.post(path + api, vm.$qs.stringify(this.sform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    vm.loading = false;
                    // console.log('resset loading!!!!!');
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '0') {
                        vm.loading = false;
                        //未携带令牌.重新登录
                        setTimeout(() => {
                            vm.alertInfo('未携带令牌,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '1') {
                        vm.loading = false;
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 150);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        vm.loading = false;
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 150);
                    } else {
                      //  console.log('这是查询出来的结果'+ret);
                        if (ret.total == 0) {
                            vm.table = [];
                        } else {
                            vm.table = ret.rows;
                        }
                        if (ret.actReceivable != undefined) {
                            //月卡续费记录实收
                            vm.actualpay = ret.actReceivable + '元';
                        }
                        if (ret.amountReceivable != undefined) {
                            //月卡续费记录应收
                            vm.shouldpay = ret.amountReceivable + '元';
                        }
                        if (ret.blank != undefined) {
                            //订单记录 车位统计-空车位
                            vm.parkspace_blank = ret.blank;
                        }
                        if (ret.parktotal != undefined) {
                            //订单记录 车位统计-场内停车
                            vm.parkspace_park = ret.parktotal;
                        }
                        if (ret.cashpay != undefined) {
                            //集团 业务订单-订单记录-现金支付
                            vm.cashpay = ret.cashpay + '元';
                        }
                        if (ret.elepay != undefined) {
                            //集团 业务订单-订单记录-手机支付
                            vm.elepay = ret.elepay + '元';
                        }
                        if (ret.sumtotal != undefined) {
                            //集团 业务订单-订单记录-订单总金额
                            vm.sumtotal = ret.sumtotal + '元';
                        }

                        vm.total = ret.total;
                        vm.loading = false;
                    }
                        //  console.log("get table 55555:",vm.$refs['search'].searchForm);
                }).catch(function (error) {
                    vm.loading = false;
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },

            //高级查询
            handleSearch() {
                //弹出高级查询界面
                //全平台服务商
                //console.log("get table fffaaaaa:",this.$refs['search'].searchForm);
                let vm = this;
                try{
                let user = sessionStorage.getItem('user');

                user = JSON.parse(user);
                for (let i = 0; i < this.tableitems.length; i++) {
                    // console.log('>>'+this.tableitems[i].customSelect)

                    if (this.tableitems[i].customSelect == 'parkserver') {
                        //重置该selectlist,根据
                        var params;
                        if (user.roleid == 1) {
                            if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')};
                            }
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')};
                            } else if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')};
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/serverlist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        vm.$axios.post(path + '/getdata/serverlist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret;
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    } else if (this.tableitems[i].customSelect == 'park') {
                        var params;
                        if (user.roleid == 1) {
                        } else if (user.roleid == 2) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')};
                            } else if (this.tableitems[i].searchSelect == 'all') {
                                params = {'query': 1, 'token': sessionStorage.getItem('token')};
                            }
                        } else if (user.roleid == 3) {
                            if (this.tableitems[i].searchSelect == 'local_all') {
                                params = {'token': sessionStorage.getItem('token')};
                            }
                        }
                        // this.$ajax({
                        //     url: path + '/getdata/parklist',
                        //     data: params,
                        //     async: false,
                        //     success: function (ret) {
                        //         vm.tableitems[i].selectlist = ret
                        //     }
                        // })
                        // console.log('-----------------------')
                        vm.$axios.post(path + '/getdata/parklist', vm.$qs.stringify(params), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            vm.tableitems[i].selectlist = ret;
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    }
                }

              }
              catch(ex){


              }
                this.searchFormVisible = true;

            },
            closesearch: function (val) {
                this.searchFormVisible = val;
            },
            onSearch: function (sform) {
                //在这里得到表单项,提交查询
                this.sform = sform;
                this.getTableData(sform);
            },
            //表格编辑
            handleEdit(index, row) {
                //拿到当前行数据row,传递给表单编辑子组件,子组建中包括重置和保存按钮
                this.rowdata = row;
                //获取角色编号,获取rowid,
                this.editFormVisible = true;
            },
            //
            handleqrurl(index, row) {
                //调用父组件的方法,传row
                this.$emit('qrurl', row.park_id);
            },
            //单击设置触发
            handlesetting(index, row) {
                //调用父组件的方法,传row
                this.$emit('showSetting', row);
            },
            handleUpload() {
                this.$emit('showUpload');
            },
            showLogout(index, row) {
                //调用父组件的方法,传row
                this.$emit('showLogout', row);
            },
            showRefund(index, row) {
              //调用父组件的方法,传row
              this.$emit('showRefund', row);
            },
            handlePublic() {
                this.$emit('handlePublic');
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
            closeedit: function (val) {
                this.editFormVisible = val;
                this.editloading = val;
            },
            onEdit: function (eform) {
                //发送ajax,提交表单更新
                let vm = this;
                let api = this.editapi;
                eform = common.generateForm(eform);
                this.$refs.editref.$refs.editForm.validate((valid) => {
                    if (valid) {
                        vm.editloading = true;
                        vm.$axios.post(path + api, vm.$qs.stringify(eform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret.validate != 'undefined' && ret.validate == '1') {
                                //过期.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录过期,请重新登录!');
                                }, 100);
                            } else if (ret.validate != 'undefined' && ret.validate == '2') {
                                //令牌无效.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录异常,请重新登录!');
                                }, 100);
                            } else {
                                if (ret > 0 || ret.state == 1) {
                                    //更新成功
                                    vm.getTableData(vm.sform);
                                    vm.$message({
                                        message: '更新成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    vm.editFormVisible = false;
                                    setTimeout(vm.editloading=false, 5000);
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: '更新失败!' + ret.msg,
                                        type: 'error',
                                        duration: 600
                                    });
                                    setTimeout(vm.editloading=false, 5000);
                                }

                            }
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    }
                });
            },
            handleCustomizeAdd() {
                this.$emit('customizeadd');
            },
            handlePrint(elem) {
                // var mywindow = window.open('', 'PRINT', 'height=800,width=1200');
                //
                // // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
                // // mywindow.document.write('</head><body >');
                // // mywindow.document.write('<h1>' + document.title  + '</h1>');
                // // mywindow.document.write(document.getElementById(elem).innerHTML);
                // // mywindow.document.write('</body></html>');
                //
                // mywindow.document.write(this.$el.innerHTML);
                //
                // mywindow.document.close(); // necessary for IE >= 10
                // mywindow.focus(); // necessary for IE >= 10*/
                //
                // mywindow.print();
                // mywindow.close();


                // let subOutputRankPrint = document.getElementById('tablearea');
                // console.log(subOutputRankPrint.innerHTML);
                // let newContent =subOutputRankPrint.innerHTML;
                // let oldContent = document.body.innerHTML;
                // document.body.innerHTML = newContent;
                // window.print();
                // window.location.reload();
                // document.body.innerHTML = oldContent;
                // return false;

                const cssText = 'tablearea {font-size: 85%;font-family: sans-serif;border-spacing: 0;border-collapse: collapse;}';
                const d = new Printd();

                // opens the "print dialog" of your browser to print the element
                d.print(document.getElementById('tablearea'), cssText);
            },
            handleAdd() {
                this.addFormVisible = true;
            },
            closeadd(val) {
                this.addFormVisible = val;
                this.addLoading = val;
            },
            onAdd(aform) {
                console.log(aform);
                //发送请求,添加一条记录
                let vm = this;
                let api = this.addapi;
                let msg = this.addfailmsg;
                aform = common.generateForm(aform);
                this.$refs.addref.$refs.addForm.validate((valid) => {
                    if (valid) {
                        vm.addloading = true;

                        vm.$axios.post(path + api, vm.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;
                            if (ret.validate != 'undefined' && ret.validate == '1') {
                                //过期.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录过期,请重新登录!');
                                }, 100);
                            } else if (ret.validate != 'undefined' && ret.validate == '2') {
                                //令牌无效.重新登录
                                setTimeout(() => {
                                    vm.alertInfo('登录异常,请重新登录!');
                                }, 100);
                            } else {
                                if (ret > 0 || ret.state == 1) {
                                    //更新成功
                                    vm.getTableData(vm.sform);
                                    vm.$message({
                                        message: '添加成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    vm.addFormVisible = false;
                                    vm.addloading = false;
                                } else {
                                    //更新失败
                                    vm.$message({
                                        message: msg,
                                        type: 'error',
                                        duration: 1200
                                    });
                                }
                            }
                        }).catch(function (error) {
                            setTimeout(() => {
                                vm.alertInfo('请求失败!' + error);
                            }, 150);
                        });
                    }
                });
            },

            openDelete(index, row) {
                this.rowid = row.id;
                this.card_id = row.card_id;
                this.delVisible = true;
            },
            //删除
            handledelete() {
                let vm = this;
                let api = this.delapi;
                let qform = this.sform;
                let dform = {'id': this.rowid, 'token': sessionStorage.getItem('token'),'card_id': this.card_id};
                dform = common.generateForm(dform);
                //发送请求,删除id为row.id的数据
                vm.$axios.post(path + api, vm.$qs.stringify(dform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        console.log(ret);
                        if (ret > 0 || ret.state == 1) {
                            // if (ret > 0) {
                            //删除成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '删除成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.delVisible = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败' + ret.msg,
                                type: 'error',
                                duration: 1200
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },
            alertInfo(msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        if(this.$router){
                          this.$router.push('/login');
                        }

                    }
                });
            },
            handlemap(index, row) {

                if (row.lat == null || row.lat == 'null') {
                    row.lat = 39.915797;
                    row.lng = 116.404119;
                }
                this.rowid = row.id;
                this.label.content = row.name;
                this.center.lat = row.lat;
                this.center.lng = row.lng;
                this.marker.lat = row.lat;
                this.marker.lng = row.lng;
                this.showMap = true;
                this.showMarker = true;
                this.mapVisible = true;
                // console.log(this.center.lat, this.center.lng);
            },
            handleShowImg(index, row) {
                // alert(index + '>' + row.id)
                if (row.liftrod_id == undefined) {
                    //订单图片
                    this.$emit('showImg_Order', index, row);
                } else {
                    //抬杆图片
                    this.$emit('showImg_Pole', index, row);
                }
            },

            downloadCode(index, row) {
                if (row.code_src == undefined) {
                    //订单图片
                    alert('链接为空');
                } else{
                    var params="url="+row.code_src;
                    this.$emit('selfExport',params)
                }
            },

            getCode(){
                this.$emit('getCode');
            },

            handleShowOrderDetail(index, row) {
                let container = this.$el.querySelector('.el-table__body-wrapper');
                this.getScrollHeight = container.scrollTop;
                //跳转到订单详情
                this.$router.push({path: '/orderManage_OrderDetail', query: {index: index, row: row}});
                sessionStorage.setItem('orderRow',JSON.stringify(row));
                this.parkText = '显示高级选项';//收起高级选项
            },
            handleModifyCarNumber(index, row) {
                //修改车牌号
                this.$emit('showreset', index, row);
            },
            handleRefill(index, row) {
                //月卡续费
                // alert('功能正在开发，请耐心等待')
                this.$emit('showrefill', index, row);
            },
            handleCustomizeEdit(index, row) {
                this.$emit('customizeedit', index, row);
            },
            handlePermission(index, row) {
                //员工权限-角色管理-编辑权限
                // alert('功能正在开发，请耐心等待')
                this.$emit('showRolePermission', index, row);
            },
            handleresetpwd(index, row) {
                this.rowid = row.id;
                this.pwd1 = '';
                this.pwd2 = '';
                //显示充值密码对话框
                this.resetPwdVisible = true;
            },
            handleresetdata(index, row) {
               this.rowid = row.id;
                this.pwd = '';
               //显示重置车场数据框
               this.resetDataVisible = true;
           },
            resetPwd() {

                let qform = this.sform;
                let vm = this;
                let api = this.resetapi;
                if (this.pwd1 == '' || this.pwd2 == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }
                if (!(/^(\w){6,12}$/.test(this.pwd1)) || !(/^(\w){6,12}$/.test(this.pwd2))) {
                    this.$message.error('密码为6-12位字母,数字或下划线!');
                    return;
                }
                if (this.pwd1 != this.pwd2) {
                    this.$message.error('两次输入密码不一致!');
                    return;
                }
                this.resetloading = true;
                let rform = {
                    'newpass': this.pwd1,
                    'confirmpass': this.pwd2,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token')
                };
                rform = common.generateForm(rform);
                vm.$axios.post(path + api, vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        if (ret > 0 || ret.state == 1) {
                            //更新成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetPwdVisible = false;
                            vm.resetloading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },

            resetData() {

                let qform = this.sform;
                let vm = this;
                let api = this.resetapi;
                if (this.pwd == '') {
                    this.$message.error('密码不能为空!');
                    return;
                }


                this.resetloading = true;
                let rform = {
                    'password': this.pwd,
                    'id': this.rowid,
                    'token': sessionStorage.getItem('token'),
                    'loginuin':sessionStorage.getItem('loginuin')
                };

                vm.$axios.post(path + api, vm.$qs.stringify(rform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;

                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        if (ret > 0 || ret.state == 1) {
                            //重置成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '重置成功!',
                                type: 'success',
                                duration: 1500
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 2000
                            });
                            vm.resetDataVisible = false;
                            vm.resetloading = false;
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });
            },
            modifyPosition() {
                let vm = this;
                let api = this.editapi;
                let eform = {
                    'id': this.rowid,
                    'lng': this.marker.lng,
                    'lat': this.marker.lat,
                    'token': sessionStorage.getItem('token')
                };
                let qform = this.sform;
                //发起修改位置
                vm.maploading = true;

                vm.$axios.post(path + api, vm.$qs.stringify(eform), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    let ret = response.data;
                    if (ret.validate != 'undefined' && ret.validate == '1') {
                        //过期.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录过期,请重新登录!');
                        }, 100);
                    } else if (ret.validate != 'undefined' && ret.validate == '2') {
                        //令牌无效.重新登录
                        setTimeout(() => {
                            vm.alertInfo('登录异常,请重新登录!');
                        }, 100);
                    } else {
                        if (ret > 0) {
                            //更新成功
                            vm.getTableData(qform);
                            vm.$message({
                                message: '更新成功!',
                                type: 'success',
                                duration: 600
                            });
                            vm.mapVisible = false;
                            vm.maploading = false;
                        } else {
                            //更新失败
                            vm.$message({
                                message: '更新失败!' + ret.msg,
                                type: 'error',
                                duration: 600
                            });
                        }
                    }
                }).catch(function (error) {
                    setTimeout(() => {
                        vm.alertInfo('请求失败!' + error);
                    }, 150);
                });

            },
            makePoint(type) {
                this.showMarker = false;
                this.marker.lat = type.point.lat;
                this.marker.lng = type.point.lng;
                this.showMarker = true;
                //console.log(this.marker.lat,this.marker.lng)
            },
            mouseup(type) {
                this.marker.lat = type.point.lat;
                this.marker.lng = type.point.lng;
                //console.log(this.marker.lat,this.marker.lng)
            },
            clickmap(type) {
                //console.log(type.point)
            },
            sclick() {
                let vm = this;
                let myGeo = new BMap.Geocoder();

                myGeo.getPoint(this.keyword, function (point) {
                    if (point) {
                        if (point.lat == vm.center.lat && point.lng == vm.center.lng) {
                            alert('输入的地址相同或地址不正确!');
                        } else {
                            vm.center.lat = point.lat;
                            vm.center.lng = point.lng;
                            vm.showMarker = false;
                            vm.label.content = vm.keyword;
                            vm.marker.lat = point.lat;
                            vm.marker.lng = point.lng;
                            vm.showMarker = true;
                        }
                    } else {
                        alert('您选择地址没有解析到结果!');
                    }
                }, '中国');
            },
            dclose() {
                // console.log('close')
                setTimeout(() => {
                    this.showMarker = false;
                    this.showMap = false;
                    this.keyword = '';
                }, 100);
            },
            mapready(map) {
                alert('map render');
            },
            mapSearch() {

            },
            changeanalysisdatecollect(val) {
                this.currentcollect = val;
                this.sform.out_uid = this.currentcollect;
                //this.sform.date = this.currentdate;
                //if (this.currentdate == '') {
                //    this.currentdate = common.currentFormatDate();
                //}
                let form = {'date': this.currentdate, 'out_uid': '3','out_uid_start':val};
                this.currentPage = 1;
                this.getTableData(form);
            },
            changeanalysisdatepark(val) {
                this.currentpark = val;
                this.sform.date = this.searchDate;
                this.sform.comid_start = this.currentpark;
                if (this.currentdate == '') {
                    this.currentdate = new Date(common.currentDate()).getTime()/1000;
                }
                let form = {'date': this.currentdate, 'comid_start': val};
                this.currentPage = 1;
                this.getTableData(form);
            },
            changeoperate(val){
                this.currentoperate = val;
                this.sform.date = this.searchDate;
                this.sform.operate_type = this.currentoperate;
                if (this.currentdate == '') {
                    this.currentdate = common.currentFormatDate();
                }
                let form = {'date': this.currentdate, 'operate_type': val};
                this.currentPage = 1;
                this.getTableData(form);
            },
            changeanalysisdate(input2) {
                //修改车场统计分析日期
                console.log(input2);
                if (input2.length > 0) {
                    this.sform.comid_start = this.currentpark;
                    this.sform.out_uid = this.currentcollect;
                    let input = input2[0] + encodeURI(encodeURI('至')) + input2[1];
                    this.searchDate = input;
                    this.sform.date = this.searchDate;
                    this.currentdate = input;
                    let date = {'date': input, 'out_uid': this.currentcollect, 'comid_start': this.currentpark, 'operate_type':this.currentoperate};
                    this.searchDate = input;
                    this.currentPage = 1;
                    this.getTableData(date);
                }else{
                    var date = new Date(input2);
                    console.log(date.getTime())
                    let data = {'date': date.getTime()/1000,'out_uid': this.currentcollect};
                    this.currentdate =date.getTime()/1000;
                    this.getTableData(data);
                }

            },
            changeCarNumber(){
                this.sform.car_number = this.parkcarnum;
                this.getTableData(this.sform);
            },
            inputBlur:function (e) {
                if(this.datesselector === "" || this.datesselector === null){

                    this.start_placeholder= this.cloneTime[0];
                    this.end_placeholder= this.cloneTime[1];
                    console.log('what is this'+this.minDate)
                    this.minDate = '';
                    this.maxDate = '';
                }else{
                    console.log('this.cloneTime2:'+this.cloneTime);
                    //this.datesselector = JSON.parse(JSON.stringify(this.cloneTime));
                    this.start_placeholder= this.cloneTime[0];
                    this.end_placeholder= this.cloneTime[1];
                }
            },

            doSearch(){
                this.sform.car_number = this.formVisitor.car_number;
                this.sform.state_start =this.formVisitor.state;
                this.sform.state = this.formVisitor.state;
                this.getTableData(this.sform);
            },

            changeParkTime(datearr) {
                if (datearr !== null && datearr.length > 1) {
                    if (this.ordertimetype === 'end_time') {
                        this.ordertime_start = (new Date(datearr[0].replace(new RegExp(/-/gm) ,"/"))).getTime();
                        this.ordertime_end = (new Date(datearr[1].replace(new RegExp(/-/gm) ,"/"))).getTime();

                        var region =Math.ceil((this.ordertime_end-this.ordertime_start)/ 1000 / 60 / 60 / 24);
                        if(region > 31){

                            this.$refs["timeDom"].focus();
                            this.start_placeholder= this.cloneTime[0];
                            this.end_placeholder= this.cloneTime[1];
                            this.datesselector='';
                            //console.log('what is that '+ this.datesselector);
                            this.$message({
                                message: '最多可选择31天',
                                type: 'warning'
                            });
                            return ;
                        }else{

                            this.cloneTime = datearr;
                        }

                        this.sform.end_time = this.ordertime;
                        this.sform.end_time_start = this.ordertime_start;
                        this.sform.end_time_end = this.ordertime_end;

                        this.sform.create_time = '';
                        this.sform.create_time_start = 0;
                        this.sform.create_time_end = 0;
                    } else if (this.ordertimetype === 'create_time') {
                        this.ordertime_start = (new Date(datearr[0].replace(new RegExp(/-/gm) ,"/"))).getTime();
                        this.ordertime_end = (new Date(datearr[1].replace(new RegExp(/-/gm) ,"/"))).getTime();

                        var region =Math.ceil((this.ordertime_end-this.ordertime_start)/ 1000 / 60 / 60 / 24);
                        if(region > 31){
                            this.$refs["timeDom"].focus();
                            //this.datesselector= this.cloneTime;
                            this.start_placeholder= this.cloneTime[0];
                            this.end_placeholder= this.cloneTime[1];
                            this.datesselector='';
                            //console.log('what is that a'+ this.datesselector);
                            this.$message({
                                message: '最多可选择31天',
                                type: 'warning'
                            });
                            return ;
                        }else{
                            this.cloneTime = datearr;
                        }

                        this.sform.create_time = this.ordertime;
                        this.sform.create_time_start = this.ordertime_start;
                        this.sform.create_time_end = this.ordertime_end;

                        //抬杆查询
                        // this.sform.ctime = this.ordertime;
                        // this.sform.ctime_start = this.ordertime_start;
                        // this.sform.ctime_end = this.ordertime_end;

                        this.sform.end_time = '';
                        this.sform.end_time_start = 0;
                        this.sform.end_time_end = 0;

                    } else {
                        this.ordertime_start = (new Date(datearr[0].replace(new RegExp(/-/gm) ,"/"))).getTime();
                        this.ordertime_end = (new Date(datearr[1].replace(new RegExp(/-/gm) ,"/"))).getTime();

                        this.sform.end_time = this.ordertime;
                        this.sform.end_time_start = this.ordertime_start;
                        this.sform.end_time_end = this.ordertime_end;

                        this.ordertime_start = (new Date(datearr[0].replace(new RegExp(/-/gm) ,"/"))).getTime();
                        this.ordertime_end = (new Date(datearr[1].replace(new RegExp(/-/gm) ,"/"))).getTime();

                        this.sform.create_time = this.ordertime;
                        this.sform.create_time_start = this.ordertime_start;
                        this.sform.create_time_end = this.ordertime_end;
                    }

                    console.log(this.sform);

                }

                this.minDate = '';
                this.maxDate = '';

                this.sform.car_number = this.parkcarnum;
                this.sform.state_start = this.currentState;
                this.sform.state = this.currentState;
                this.sform.pay_type_start = this.currentPayType;
                this.sform.pay_type = this.currentPayType;
                //抬杆数据
                // this.sform.uin = this.formInline.name;
                // this.sform.uin_start = this.formInline.name;
                // this.sform.liftrod_id = this.formInline.number;
                // this.sform.out_channel_id = this.formInline.channel;
                // this.sform.reason = this.formInline.cause;
                // this.sform.reason_start = this.formInline.cause;

                //当前页数
                this.currentPage = 1;
                this.getTableData(this.sform);

                // create_time: between
                // create_time_start: 1519887179000
                // create_time_end: 1522133584000

                // ordertime:'between',
                //     ordertime_start:0,
                //     ordertime_end:0,
                //     ordertimetype:'end_time',

            },
            changeParkTimestr(val) {
                console.log(val);
                this.ordertimetype = val;
            },
            changeParkText() {
                if (this.parkExpanded) {
                    this.parkText = '显示高级选项';
                    this.parkExpanStyle = 'display:none;';
                    this.tableheight2 = common.gwh() - 143;

                    //重置抬杆数据
                    // this.formInline.name = '';
                    // this.formInline.number = '';
                    // this.formInline.channel = '';
                    // this.formInline.cause = '';
                } else {
                    this.parkText = '隐藏高级选项';
                    this.parkExpanStyle = 'display:block;margin-top:5px';
                    this.tableheight2 = common.gwh() - 190;
                }
                this.parkExpanded = !this.parkExpanded;
            },

            changeParkReceive() {
                if (this.parkAccoutRece_start >= 0 && this.parkAccoutRece_end >= 0) {
                    this.sform.total = 'between';
                    this.sform.total_start = this.parkAccoutRece_start;
                    this.sform.total_end = this.parkAccoutRece_end;
                }
            }
            // parkAccoutRece_start:'',
            // parkAccoutRece_end:'',
            // amount_receivable: between
            // amount_receivable_start: 1
            // amount_receivable_end: 5

        },
        updated(){
                  //  console.log("get table eeeee33:",this.$refs['search'].searchForm);
        },
        beforeMount(){
            var urls = window.location.href.split("_")[0];
            var urlsSplit = urls.split("/");
            var urlsName = urlsSplit[urlsSplit.length -1];
            if(urlsName == "orderStatistics" || urlsName == "strategicAnalysis"){
                this.tableheight2 = common.gwh() - 165;
            }else{
                this.tableheight2 = common.gwh() - 143;
            }
        },
        mounted() {
            let _this = this;
            //window.onresize=()=>{alert('123');this.mapheight=common.gwh()*0.5}
            this.mapheight = common.gwh() * 0.5;
            this.mapstyle = 'width:inherit;height:' + common.gwh() / 2 + 'px';
          //  console.log('commontable mount',this.searchForm);////
            //拷贝查询表单,用来在重置时清空表单内容
            this.tempSearchForm = common.clone(this.searchForm);
            //this.superimposed = sessionStorage.getItem('superimposed');
            try{
              common.getSuperimposed().then(function (response) {
                  _this.superimposed = response.data.superimposed
               })
              // console.log("get table eeeeeaaa:",this.$refs['search'].searchForm);
            }
            catch(e){

            }

            /*
           * 订单记录
           * */
            if (_this.showParkInfo) {
                _this.datesselector = common.currentDateArray(3);
                _this.start_placeholder = common.currentDateArray(3)[0];
                _this.end_placeholder = common.currentDateArray(3)[1];
                _this.cloneTime = common.currentDateArray(3);
                _this.datesselector1 = common.currentDateArray(1);

            }
            if(_this.showParkInfo2){
                _this.datesselector2 = common.currentDateArray(1);
            }
        },

        activated() {

            //通过url 进行判断，是否是需要的页面
            var urls = window.location.href.split("_")[0];
            var urlsSplit = urls.split("/");
            var urlsName = urlsSplit[urlsSplit.length -1];

            if(urlsName == "orderStatistics" || urlsName == "strategicAnalysis"){
                this.tableheight2 = common.gwh() - 165;
            }else{
                this.tableheight2 = common.gwh() - 143;
            }
            window.onresize = () => {
                // this.tableheight2 = common.gwh() - 143;
                if(urlsName == "orderStatistics" || urlsName == "strategicAnalysis"){
                    this.tableheight2 = common.gwh() - 165;
                }else{
                    this.tableheight2 = common.gwh() - 143;
                }
            };

            // this.tableheight2 = common.gwh() - 143;
            //window.onresize=()=>{alert('123');this.mapheight=common.gwh()*0.5}
            let _this = this;
            this.analysisdate = Date.now();
            this.mapheight = common.gwh() * 0.5;
            this.mapstyle = 'width:inherit;height:' + common.gwh() / 2 + 'px';
            // console.log('commontable active')
            if(!_this.showParkInfo){
                this.currentPage = 1;
                //this.sform = {};
            }

            //this.date_selector ='123434342'
            if (this.showdateSelector) {
                _this.start_placeholder1 = common.getFirstDayOfWeek() + ' 00:00:00';
                _this.start_placeholder = common.currentDate() + ' 00:00:00';
                console.log(_this.start_placeholder)
                _this.end_placeholder = common.currentDate() + ' 23:59:59';
                _this.currentcollect = '';
                _this.currentpark = '';
                _this.currentdate = '';
                _this.datesselector = '';
                _this.searchDate = '';
                _this.$axios.all([common.getCollector(), common.getAllParks()])
                    .then(_this.$axios.spread(function (ret, retpark) {
                        _this.collectors = [{value_no: '', value_name: '全部'}];
                        _this.collectors = _this.collectors.concat(ret.data);
                        _this.parks = [{value_no: '', value_name: '全部车场'}];
                        _this.parks = _this.parks.concat(retpark.data);
                    }));
            }
            if (this.showshopdateSelector) {
                _this.start_placeholder = common.currentDate() + ' 00:00:00';
                _this.end_placeholder = common.currentDate() + ' 23:59:59';
                _this.currentoperate = '';
                _this.currentdate = '';
                _this.datesselector = '';
                _this.searchDate = '';
            }

            if (this.showdateSelector33) {
                 _this.datesselector = '';
                 _this.currentcollect = '';
                  _this.currentpark = '';
                _this.start_placeholder33 = common.currentDate() ;
               _this.$axios.all([common.getCollector(), common.getAllParks()])
                   .then(_this.$axios.spread(function (ret, retpark) {
                       _this.collectors = [{value_no: '', value_name: '全部'}];
                       _this.collectors = _this.collectors.concat(ret.data);
                       _this.parks = [{value_no: '', value_name: '全部车场'}];
                       _this.parks = _this.parks.concat(retpark.data);
                   }));

            }

            if (this.showdateSelector22) {
                _this.start_placeholder1 = common.getFirstDayOfWeek() + ' 00:00:00';
                _this.end_placeholder1 = common.currentDate() + ' 23:59:59';
                _this.currentcollect = '';
                _this.currentpark = '';
                _this.currentdate = '';
                _this.datesselector = '';
                _this.searchDate = '';
                _this.$axios.all([common.getCollector(), common.getAllParks()])
                    .then(_this.$axios.spread(function (ret, retpark) {
                        _this.collectors = [{value_no: '', value_name: '全部'}];
                        _this.collectors = _this.collectors.concat(ret.data);
                        _this.parks = [{value_no: '', value_name: '全部车场'}];
                        _this.parks = _this.parks.concat(retpark.data);
                    }));
            }
            if (this.showdateSelector10) {
                _this.start_placeholder = common.currentDateArray(10)[0];
                _this.end_placeholder = common.currentDateArray(10)[1];
                _this.currentcollect = '';
                _this.currentpark = '';
                _this.currentdate = '';
                _this.datesselector = '';
                _this.searchDate = '';
                _this.$axios.all([common.getCollector(), common.getAllParks()])
                    .then(_this.$axios.spread(function (ret, retpark) {
                        _this.collectors = [{value_no: '', value_name: '全部'}];
                        _this.collectors = _this.collectors.concat(ret.data);
                        _this.parks = [{value_no: '', value_name: '全部车场'}];
                        _this.parks = _this.parks.concat(retpark.data);
                    }));
            }
            if (this.showdateSelectorMonth) {
                _this.monthReportStart = '';
                _this.monthReportEnd = '';
                _this.start_month_placeholder = common.currentMonth();
            }
             if (this.showdateSelectorMonth22) {
                _this.monthReportStart = '';
                _this.monthReportEnd = '';
                _this.start_month_placeholder11 = common.yearStart();
                _this.end_month_placeholder11 = common.currentMonth();
            }
            // console.log(_this.showParkInfo);
            /*
            * 订单记录
            * */
            // if (_this.showParkInfo) {
            //     _this.datesselector = common.currentDateArray(3);
            //      _this.start_placeholder = common.currentDateArray(3)[0];
            //     _this.end_placeholder = common.currentDateArray(3)[1];
            //     _this.cloneTime = common.currentDateArray(3);
            //     _this.datesselector1 = common.currentDateArray(1);
            // }
            if (_this.showParkInfo2) {
                _this.ordertime_start = 0;
                _this.ordertime_end = 0;
                _this.ordertimetype = 'create_time';
                _this.parkcarnum = '';
                _this.parkExpanded = false;
                _this.parkExpanStyle = 'display:none;';
                _this.currentTimeType = '入场时间';
                _this.currentState = '';
                _this.currentPayType = '';
                _this.parkAccoutRece_start = '';
                _this.parkAccoutRece_end = '';
                _this.datesselector = common.currentDateArray(3);
                _this.start_placeholder = common.currentDateArray(3)[0];
                _this.end_placeholder = common.currentDateArray(3)[1];
                _this.cloneTime = common.currentDateArray(3);
                _this.datesselector1 = common.currentDateArray(1);
            }
            //重置抬杆数据
            // this.formInline.name = '';
            // this.formInline.number = '';
            // this.formInline.channel = '';
            // this.formInline.cause = '';
            //这里也要判断是不是需要的页面
            if(urlsName != "orderStatistics" && urlsName != "strategicAnalysis"){
                this.parkExpanded = true;
                this.changeParkText()
            }

        }
    };

</script>

<style>

    .deleteTip {
        vertical-align: middle
    }

    .el-table__fixed {
        box-shadow: 0 0 0 #fff;
    }

    .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        color: black
    }

    .el-input-group > .el-input__inner {
        text-align: center;
    }

    /*table表格 表头背景色*/
    /*.el-table th {*/
        /*background-color: #F5F7FA;*/
    /*}*/

    .el-table tr {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
