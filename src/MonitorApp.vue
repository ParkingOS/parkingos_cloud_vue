<template>
  <!-- BEGIN CONTAINER -->
  <div>
  <div class="page-container my-container">
      <!-- BEGIN CONTENT -->
      <div class="page-content-wrapper">
          <!-- BEGIN CONTENT BODY -->
          <div class="page-content my-page-content">
              <!-- BEGIN PAGE HEAD-->
              <div class="page-head">
                  <!-- BEGIN PAGE TITLE -->
                  <div style="text-align:center;">
                      <div style="overflow:visible;float:right;display:none">
                          <button class="btn btn-outline btn-circle btn-sm blue" onclick="exitFullScreen()">
                              退出全屏
                          </button>
                      </div>
                      <div style="overflow:visible;float:right;display:none">
                          <button class="btn btn-outline btn-circle btn-sm blue" onclick="fullScreen()">
                              全屏
                          </button>
                      </div>
                      <h1 style="color: white;">无人化自助停车系统中控室</h1>
                  </div>
                  <!-- END PAGE TITLE -->
              </div>
              <!-- END PAGE HEAD-->
              <!-- BEGIN PAGE BASE CONTENT -->
              <!-- BEGIN DASHBOARD STATS 1-->
              <div class="row">
                  <div class="page-left">
                      <div class="monitorStyleDiv">
                          <div class="portlet light bordered" id="monitorDiv">
                              <div class="portlet-title" id="monitorTitleDiv">
                                  <div class="caption font-dark">
                                      <span class="caption-subject font-green bold uppercase">监控列表</span>
                                      <!--<span class="caption-helper">（7日之内）</span>-->
                                  </div>
                                  <div class="tools"> </div>
                                  <div class="actions">
                                      <button class="btn btn-outline btn-circle btn-sm blue" data-toggle="modal" data-target="#myModal">
                                          <i class="fa fa-share"></i>详情
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div>
                          <div class="item-box-left-div">
                              <button class="item-box-left-button" onclick="reloadCenterVideo('','')"></button>
                          </div>
                          <div id="sVideo1" style="margin-top: 10px;border: 1px;">
                              <video id="myPlayer1" poster="" controls="controls" autoplay height="157.5" width="280">
                                  <source src="rtmp://rtmp.open.ys7.com/openlive/e4b090c3f8234036b597a528b523b2ec" type="" />
                              </video>
                          </div>
                      </div>
                      <div>
                          <div class="item-box-left-div">
                              <button class="item-box-left-button" onclick="reloadCenterVideo('','')"></button>
                          </div>
                          <div id="sVideo2" style="margin-top: 10px;border: 1px;">
                              <video id="myPlayer2" poster="" controls="controls" autoplay height="157.5px" width="280px">
                                  <source src="rtmp://rtmp.open.ys7.com/openlive/50ab2363093040589f4ceab4abf4dbed" type="" />
                              </video>
                          </div>
                      </div>
                      <div>
                          <div class="item-box-left-div">
                              <button class="item-box-left-button" onclick="reloadCenterVideo('','')"></button>
                          </div>
                          <div id="sVideo3" style="margin-top: 10px;border: 1px;">
                              <video id="myPlayer3" poster="" controls="controls" autoplay height="157.5px" width="280px">
                                  <source src="rtmp://rtmp.open.ys7.com/openlive/50ab2363093040589f4ceab4abf4dbed" type="" />

                              </video>
                          </div>
                      </div>
                      <div>
                          <div class="item-box-left-div">
                              <button class="item-box-left-button" onclick="reloadCenterVideo('','')"></button>
                          </div>
                          <div id="sVideo4" style="margin-top: 10px;border: 1px;">
                              <video id="myPlayer4" poster="" controls="controls" autoplay height="157.5px" width="280px">
                                  <source src="rtmp://rtmp.open.ys7.com/openlive/50ab2363093040589f4ceab4abf4dbed" type="" />
                                  <!--<source src="http://hls.open.ys7.com/openlive/50ab2363093040589f4ceab4abf4dbeid.hd.m3u8" type="application/x-mpegURL" />-->

                                  <!--<source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="application/x-mpegURL" />-->

                              </video>
                          </div>
                      </div>
                  </div>



                  <div class="page-center">

                       <div class="item-box-channel-div" style="display:none">
                           <div class="btn-group">
                               <button type="button" class="btn btn-Primary dropdown-toggle" onclick="qryChannels()" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   选择通道 <span class="caret"></span>
                               </button>
                               <ul class="dropdown-menu" id="channel_ul">

                               </ul>
                           </div>
                       </div>
                       <div class="item-box-center-div">
                           <div class="actions" id="rodDiv">
                               <a onclick="liftRod()" class="btn btn-outline btn-circle btn-sm blue">
                                    抬&nbsp&nbsp&nbsp杆 </a>
                               <input type="hidden" id="rodChannelName"></input>
                               <input type="hidden" id="rodChannelId"></input>
                               <input type="hidden" id="rodConfirmComid"></input>
                           </div>
                       </div>
                       <div id="centerVideoDiv">
                           <div class="col-lg-12">
                               <div class="portlet light bordered">
                                   <video id="myPlayer5" poster="" controls="controls" autoplay width="900px" height="486.5px">
                                       <!--<source src="rtmp://rtmp.open.ys7.com/openlive/50ab2363093040589f4ceab4abf4dbed" type=""/>-->

                              <source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="application/x-mpegURL" />

                                   </video>
                               </div>
                           </div>
                       </div>

                       <div class="berthDiv">
                           <div class="col-lg-12">
                               <div class="portlet light bordered">
                                   <div class="portlet-title">
                                       <div class="caption">
                                           <i class="icon-equalizer font-yellow"></i>
                                           <span class="caption-subject font-yellow bold uppercase">泊位使用率</span>
                                       </div>
                                   </div>
                                   <div class="portlet-body">
                                       <div>
                                           <div id="echartmain5"></div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div class="eventDiv" style="display:none">
                           <div style="z-index: 1; visibility: hidden;" id="loading">
                               <div class="loading-indicator">
                                   <label style="font-size: 15px; color: red"></label>
                               </div>
                           </div>
                           <div class="modal-content" id="eventContent">
                               <div class="modal-header" style="background-color: #FB6E17;text-align: center">
                                   <h4 class="modal-title" onclick="closeEventDiv()" style="overflow: visible;float: right;border:2px;border-color: #393a3e;color:white">关闭</h4>
                                   <h4 class="modal-title" id="eventTitle" style="color:white">请手动匹配订单</h4>
                               </div>

                               <div class="modal-body" style="background-color: #393a3e" id="eventBody">

                                   <div class="col-lg-5" style="" id="confirmDiv">
                                       <div style="text-align: center;margin-top: 20px" class="centerWrap">
                                           <div class="centerContent"><span style="color:white;font-size: 20px">出场待确认车辆</span></div>
                                       </div>
                                       <div style="text-align: center;padding: 15px;" class="centerWrap">
                                           <div class="centerContent"><img id="carpic" src="" /></div>
                                       </div>
                                       <input type="hidden" id="channelId">
                                       <input type="hidden" id="confirmComid">
                                   </div>
                                   <div id="matDiv" class="col-lg-7" style="display:none;overflow: auto">
                                       <div id="matLeftDiv" class="col-lg-6">

                                       </div>
                                       <div id="matCenterDiv" class="col-lg-6">

                                       </div>
                                   </div>
                                   <div id="matFailDiv" class="col-lg-7" style="display:none">
                                       <div style="text-align: center;margin-top: 20px" class="centerWrap" id="matFailFontDiv">
                                           <div class="centerContent ">
                                               <span style="color:white;font-size: 20px ">未找到车牌号相似的入场订单</span>
                                           </div>
                                       </div>
                                       <div>
                                           <div class="col-lg-6 ">
                                               <button type="button " class="btn " style="background-color: #F59A55 " onclick=" " disabled="true ">打开监控</button>
                                           </div>
                                           <div class="col-lg-6 ">
                                               <input type="hidden " id="confirmId ">
                                               <button type="button " class="btn " style="background-color: #0390CB " onclick="closeEventDiv(0) ">完成</button>
                                           </div>
                                       </div>
                                   </div>

                                   <div id="balDiv " class="col-lg-6 " style="display:none;text-align: center ">
                                       <div id="balOrderId " class="centerWrap ">
                                           <div class="bottomContent ">
                                               <h4 style="color:white ">订单号:</h4></div>
                                       </div>
                                       <div id="balIntime " class="centerWrap ">
                                           <div class="bottomContent ">
                                               <h4 style="color:white ">进场时间:</h4></div>
                                       </div>
                                       <div id="balCarNum " class="centerWrap ">
                                           <div class="bottomContent ">
                                               <h4 style="color:white ">车牌号码:</h4></div>
                                       </div>
                                   </div>
                                   <div class="col-lg-6 " id="selectDiv " style="display:none ">
                                       <div style="padding: 15px; ">
                                           <img id="carpicSelected " src=" " />
                                       </div>
                                   </div>
                                   <div id="balButtonDiv " style="display:none; ">
                                       <div class="col-lg-6 ">
                                           <button type="button " class="btn " style="background-color: #F59A55 " onclick="back() ">返回</button>
                                       </div>
                                       <div class="col-lg-6 ">
                                           <button type="button " class="btn " style="background-color: #0390CB " onclick="balanceOrder() ">确定</button>
                                       </div>
                                   </div>

                                   <div id="sucDiv " style="display:none ">
                                       <div id="sucWrap " class="centerWrap ">
                                           <div class="centerContent ">
                                               <div style="float: left;margin-left: 35% ">
                                                   <img id="sucImg " />
                                               </div>
                                               <div style="float: left; ">
                                                   <h2 style="color:white " id="sucMesg ">处理成功</h2>
                                                   <h4 style="color:white;margin-top: 10px " id="balSucCarNum ">车牌号</h4>
                                               </div>
                                           </div>
                                       </div>
                                       <div>
                                           <button type="button " id="sucBtton " style="background-color: #0390CB " class="btn " onclick="closeEventDiv(1) ">完成</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>


                  <div class="page-right ">
                      <div class="electradeDiv ">
                          <div class="portlet light bordered " id="tradeTotalMainDiv ">
                              <div class="portlet-title ">
                                  <div class="caption font-dark ">
                                      <span class="caption-subject font-purple bold uppercase ">今日电子交易金额</span>
                                  </div>
                              </div>

                                    <div class="portlet-body table-both-scroll">
        					                   <div id="tradeTotalDiv" style="height: 76.3775px;">
                                       <div class="appOrderTotalFont">
                                         <div class="centerContent">￥</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                       <div class="appOrderFont">
                                         <div class="centerContent">0</div>
                                       </div>
                                     </div>
        					                </div>


                          </div>
                          <div class="portlet light bordered " id="tradeCountMainDiv ">
                              <div class="portlet-title ">
                                  <div class="caption font-dark ">
                                      <span class="caption-subject font-purple bold uppercase ">今日电子交易笔数</span>
                                  </div>
                              </div>
                              <div class="portlet-body table-both-scroll ">
                                  <div id="tradeCountDiv " style="height: 76.3775px;">
                                    <div class="appOrderTotalFont">
                                      <div class="centerContent">￥</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                    <div class="appOrderFont">
                                      <div class="centerContent">0</div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div style="margin-top:10px ">
                          <div id=" ">
                              <div class="portlet light bordered ">
                                  <div class="portlet-title ">
                                      <div class="caption font-dark ">
                                          <i class="icon-settings font-red "></i>
                                          <span class="caption-subject font-red bold uppercase ">事件管理</span>
                                      </div>

                                  </div>
                                  <div class="portlet-body table-both-scroll ">
                                      <div id="eventManagerDiv ">
                                          <div id="site_statistics_loading ">
                                              <img src="assets/loading.gif " alt="loading " />
                                          </div>
                                          <table class="table table-striped table-bordered table-hover order-column datatable-top-border " id="sample_1 ">
                                              <tbody>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div id="monitorManagerDiv " class="monitorManagerDiv " style="visibility: hidden;display:none ">
      <iframe style="width:100%;height:100% " src="monitor.do?action=monitorManager "></iframe>
  </div>

  <!-- 监控列表模态框（Modal） -->
  <div class="modal fade " id="myModal " tabindex="-1 " role="dialog " aria-labelledby="myModalLabel " aria-hidden="true ">
      <div class="modal-dialog " style="width:900px; ">
          <div class="modal-content ">
              <div class="modal-header ">
                  <button type="button " class="close " data-dismiss="modal " aria-hidden="true " title="关闭 ">&times;</button>
                  <h4 class="modal-title " id="myModalLabel ">监控器管理</h4>
              </div>
              <div class="modal-body " style="height:600px; ">
                  <iframe style="width:100%;height:100% " src="monitor.do?action=monitorManager&iframe=1 "></iframe>
              </div>
          </div>
      </div>
  </div>
  <!-- 播放监控视频模态框（Modal） -->
  <div class="modal fade " id="videoModal " tabindex="-1 " role="dialog " aria-labelledby="videoModalLabel " aria-hidden="true ">
      <div class="modal-dialog " style="width:900px; ">
          <div class="modal-content ">
              <div class="modal-header ">
                  <button type="button " class="close " data-dismiss="modal " aria-hidden="true " title="关闭 ">&times;</button>
                  <h4 class="modal-title " id="videoModalLabel ">监控视频</h4>
              </div>
              <div class="modal-body " style="height:600px; ">

              </div>
          </div>
      </div>
  </div>
</div>
</template>
<script>
import "./assets/iconfont.css"
	export default {
		name: 'app',
		components: {

		},
	}

</script>

<style lang="scss">
	body {
		margin: 0px;
		padding: 0px;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
    background-color: #393a3e;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

</style>
