let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/community/verifycode’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://app.123667.com/community/verifycode’
let _host= localhostDev ? 'http://localhost:8080/community' : 'http://app.123667.com/community';
let httpUrl = {

    //物业版对外接口集成
    'verifycode': _host + '/verifycode',                                            //获取图片验证码
    'login': _host + '/login',                                                       //登录
    'forgetpass': _host + '/api/validate/forgetpass',                               //获取短信验证码
    'register': _host + '/register',                                                 //注册
    'forgetPass': _host + '/forgetPass',                                            //忘記密碼
    'login/quite': _host + '/login/quite',                                          //用戶退出
    'pushInfo': _host + '/pushInfo',                                                //通知推送管理
    'pushInfoAdd': _host + '/pushInfo/add',                                         //发布通知
    'pushInfoSend': _host + '/pushInfo/send',                                       //通知推送
    'pushInfoEdit': _host + '/pushInfo/edit',                                       //修改通知
    'pushInfoDelete': _host + '/pushInfo/delete',                                   //删除通知
    'park': _host + '/park',                                                            //查询所有车场
    'parkAccountMoney': _host + '/park/accountmoney',                               //临时车收费查询
    'parkOrderMonthCardDefer': _host + '/park/orderMonthCardDefer',                 //月租车续费
    'tradePayformoney': _host + '/tradePayformoney',                                    //完成缴费
    'repairWork': _host + '/repairWork',                                                //家政服务列表
    'repairWorkView': _host + '/repairWork/view',                                       //家政服务详情
    'repairWorkAddRun': _host + '/repairWork/addRun',                                   //家政服务流程
    'repairWorkDelete': _host + '/repairWork/delete',                                   //删除家政服务
    'repairman': _host + '/repairman',                                                  //获取家政服务指派人员
    'repairmanAdd': _host + '/repairman/add',                                           //添加家政服务指派人员
    'repairItems': _host + '/repairItems',                                              //获取家政服务类型列表
    'owner': _host + '/owner',                                                              //获取业主列表
    'ownerCreate': _host + '/owner/create',                                                 //添加业主
    'ownerUpdate': _host + '/owner/update',                                                //修改业主信息
    'ownerDelete': _host + '/owner/delete',                                                  //删除业主
    'ownerChangeStatus': _host + '/owner/changestatus',                                     //业主启用/禁用
    'ownerCall': _host + '/owner/call',                                                     //呼叫转移
    'ownerAuth': _host + '/owner/auth',                                                 //设置业主房间认证状态
    'buildingBuildings': _host + '/building/buildings',                               //获取楼宇列表
    'unitUnits': _host + '/unit/units',                                                 //（9）获取单元列表
    'unittypeUnittypes': _host + '/unittype/unittypes',                               //（10）获取户型列表
    'roomLoad': _host + '/room/load',                                                   //（11）获取房间信息
    'passInfo': _host + '/passInfo',                                                                                    //获取访客通行列表
    'checkworkHistoryAdd': _host + '/checkworkHistory/add',                          //(1)	添加物业巡更
    'checkworkHistory': _host + '/checkworkHistory',                                  //(2)	物业巡更记录
    'borrow': _host + '/borrow',                                                        //获取借用物品列表
    'borrowAdd': _host + '/borrow/add',                                              //(2)添加借用物品
    'borrowEdit': _host + '/borrow/edit',                                              //(3)	修改借用物品
    'borrowDelete': _host + '/borrow/delete',                                         //(4)	删除借用物品
    'userBorrow': _host + '/userBorrow',                                                //(5)	获取借用记录列表
    'userBorrowChangeState': _host + '/userBorrow/changeState',                      //(6)	借用物品通过/驳回操作
    'suitWork': _host + '/suitWork',                                                 //（1）投诉报修列表
    'suitWorkDelete': _host + '/suitWork/delete',                                    //（2）删除投诉报修
    'suitWorkEdit': _host + '/suitWork/edit',                                       //（3）回复（服务器异常）
    'celebrationItem': _host + '/celebrationItem',                                  //(1)	获取家有喜事类型列表
    'celebration': _host + '/celebration',                                          //(2)	获取家有喜事列表
    'celebrationEdit': _host + '/celebration/edit',                                 //(3)	家有喜事类型通过/驳回操作
    'door': _host + '/door',                                                            //（1）门禁列表
    'doorOpen': _host + '/door/open',                                                //（2）一键开门
    'doorGetpass': _host + '/door/getpass',                                         //（3）密码开门
    'track': _host + '/track',                                                          //（1）朋友圈列表
    'trackShielding': _host + '/track/shielding',                                       //屏蔽/取消屏蔽 朋友圈信息
    'infotype': _host + '/infotype',                                                      //（1）获取资讯类别列表
    'information': _host + '/information',                                              //（2）获取资讯列表
    'informationCreate': _host + '/information/create',                                 //（3）发布资讯
    'informationEdit': _host + '/information/edit',                                      //（4）修改资讯
    'informationDelete': _host + '/information/delete',                                 //（5）删除资讯
    'activity': _host + '/activity',                                                       //（1）获取社区活动
    'createCreate': _host + '/activity/create',                                           //（2）发布社区活动
    'activityEdit': _host + '/activity/edit',                                              //（3）编辑社区活动
    'activityDelete': _host + '/activity/delete',                                          //（4）删除社区活动
    'shoptype': _host + '/shoptype',                                                         //（1）获取生活服务类别列表
    'shop': _host + '/shop',                                                                  //（2）获取生活服务列表
    'shopAdd': _host + '/shop/add',                                                         //（3）添加生活服务
    'shopDelete': _host + '/shop/delete',                                                   //（4）删除生活服务
    'trading': _host + '/trading',                                                          //获取交易买卖列表
    'tradingCreate': _host + '/trading/create',                                          //（2）发布交易买卖
    'tradingDelete': _host + '/trading/delete',                                          //（3）删除交易买卖
    'cellinfoLog': _host + '/cellinfo/log',                                              //小区动态
    'user': _host + '/user',                                                            //（1）物管人员列表
    'userCreate': _host + '/user/create',                                               //（2）添加管理员
    'cellinfo': _host + '/cellinfo',                                                   //（3）检索所有小区
    'cellinfoChange': _host + '/cellinfo/change',                                    //（4）切换小区
    'role': _host + '/role',                                                            //（5）检索角色信息
    'userUpdate': _host + '/user/update',                                              //（6）编辑管理员
    'userStatus': _host + '/user/status',                                               //（7）启用/禁用管理员
    'city': _host + '/city',                                                            //（1）检索省市区街道信息
    'loginCreateCell': _host + '/login/create/cell',                                 //（2）临时创建小区（新建管理员无绑定小区时使用）
    'cellinfoCreate': _host + '/cellinfo/create',                                    //（3）添加小区
    'cellinfoEdit': _host + '/cellinfo/edit',                                         //（4）修改资讯
    'cellNeighbors': _host + '/cell/neighbors',                                      // 检索邻里通
    'apiForwarding': _host + '/api/forwarding',                                       // 手动设置呼叫转移
    'apiDoorChangename': _host + '/api/door/changename',                           // 修改蓝牙门禁名称



    //业主版接口
    'apiLogin': _host + '/api/login',                                                       //登录
    'apiOwnerQuite': _host + '/api/owner/quite',                                           //退出登录
    'apiOwnerRegister': _host + '/api/owner/register',                                     //注册
    'apiOwnerVerifycode': _host + '/api/owner/verifycode',                               //获取验证码
    'apiOwnerCells': _host + '/api/owner/cells',                                          //获取用户所有的小区信息
    'apiOwnerChangecell': _host + '/api/owner/changecell',                               //绑定小区住所
    'apiAdvQueryAdvList': _host + '/api/adv/queryAdvList',                               //获取广告内容(app)
    'apiAdvQueryAdvDetailList': _host + '/api/adv/queryAdvDetailList',                  //获取广告内容（广告机器）
    'apiPushQueryPushInfoList': _host + '/api/push/queryPushInfoList',                  //获取物业通知
    'apiOptionLog': _host + '/api/optionLog',                                              //获取实时动态日志列表
    'apiDoorDoors': _host + '/api/door/doors',                                            //获取用户所有门禁
    'apiDoorOpen': _host + '/api/door/open',                                               //远程开门
    'apiDoorSip': _host + '/api/door/sip',                                                  //sip开门
    'apiDoorGetkey': _host + '/api/door/getkey',                                            //密码开门
    'apiCode': _host + '/api/code',                                                          //扫码开门
    'apiPark': _host + '/api/park',                                                         //检索停车场
    'apiParkV1Accountmoney': _host + '/api/park/v1/accountmoney',                     //临时缴费查询
    'apiParkV1OrderMonthCardDefer': _host + '/api/park/v1/orderMonthCardDefer',      //月租续费
    'apiOrderCreateAlipayOrder': _host + '/api/order/createAlipayOrder',              //生成支付宝订单(web)
    'apiBillFindTotalMoney': _host + '/api/bill/findTotalMoney',                      //获取未交费总金额
    'apiBillQueryBillInfoList': _host + '/api/bill/queryBillInfoList',               //获取缴费列表
    'apiBillQueryBillGatherList': _host + '/api/bill/queryBillGatherList',           //获取预交物业费
    'apiBillBillGatherAlipay': _host + '/api/bill/billGatherAlipay',                  //获取预交物业费支付宝参数
    'apiBillCreateOrder': _host + '/api/bill/createOrder',                              // 获取订单号
    'apiPayAliPay': _host + '/api/pay/aliPay',                                       // 获取支付宝参数
    'apiPayCreateAlipayOrder': _host + '/api/pay/createAlipayOrder',                // 跳转支付宝支付（网页）
    'apiOwnerIntegralAdd': _host + '/api/ownerIntegral/add',                        //支付回调
    'apiShopQueryCommodityList': _host + '/api/shop/queryCommodityList',            //获取商品列表
    'apiShopQueryShopList': _host + '/api/shop/queryShopList',                        //获取商铺列表
    'apiShopView': _host + '/api/shop/view',                                            //获取商品详情
    'apiShopAdd': _host + '/api/shop/add',                                              //添加订单
    'apiShopQueryOrderList': _host + '/api/shop/queryOrderList',                      //查询订单
    'apiShopAliPay': _host + '/api/shop/aliPay',                                        //支付订单接口
    'apiShopEdit': _host + '/api/shop/edit',                                            //取消/确认收货订单
    'apiShopQueryCommodityClassList': _host + '/api/shop/queryCommodityClassList',   //获取商品类别列表（主要应用：商品首页—>首页推荐 所有分类）
    'apiShopQueryShopTypeList': _host + '/api/shop/queryShopTypeList',                //获取商铺类别列表（主要应用：商品首页顶部类别）
    'apiSuitWorkQuerySuitTypeList': _host + '/api/suitWork/querySuitTypeList',      //获取投诉建议类型
    'apiSuitWorkAdd': _host + '/api/suitWork/add',                                      //添加投诉建议
    'apiSuitWorkQuerySuitWorkList': _host + '/api/suitWork/querySuitWorkList',       //获取我的投诉建议记录
    'apiSuitWorkView': _host + '/api/suitWork/view',                                    //查看投诉建议详情
    'apiSuitWorkQuerySuitSorceList': _host + '/api/suitWork/querySuitSorceList',     //获取评论时星级列表
    'apiSuitWorkComment': _host + '/api/suitWork/comment',                             //评论投诉建议
    'apiTrading': _host + '/api/trading',                                               // 获取交易信息
    'apiTradingUpload': _host + '/api/trading/upload',                                  // 上传交易信息图片
    'apiTradingCreate': _host + '/api/trading/create',                                  //发布新的交易
    'apiTradingUpdate': _host + '/api/trading/update',                                  //更新交易信息
    'apiRepairWorkRueryRepairItemList': _host + '/api/repairWork/queryRepairItemList',  //获取服务类型
    'apiRepairWorkAdd': _host + '/api/repairWork/add',                                   //添加家政服务
    'apiRepairWorkQueryRepairWorkList': _host + '/api/repairWork/queryRepairWorkList', //报修记录
    'apiRepairWorkQueryRepairSorceList': _host + '/api/repairWork/queryRepairSorceList', //获取维修星级
    'apiRepairWorkComment': _host + '/api/repairWork/comment',                           //添加报修评论
    'apiRepairWorkView': _host + '/api/repairWork/view',                                  //查看详情
    'apiRepairWorkDelete': _host + '/api/repairWork/delete',                            //取消报修
    'apiShopShopTypes': _host + '/api/shop/shopTypes',                                  //获取周边生活类型
    'apiBorrowQueryBorrowShopList': _host + '/api/borrow/queryBorrowShopList',      //获取物品借用列表
    'apiBorrowQueryUserBorrowList': _host + '/api/borrow/queryUserBorrowList',      //我的借用记录
    'apiOwnerDepartments': _host + '/api/owner/departments',                            //客服中心
    'apiPassAdd': _host + '/api/pass/add',                                              //添加访客放行
    'apiPassQueryPassList': _host + '/api/pass/queryPassList',                          //获取我的访客放行记录
    'celebrationAdd': _host + '/celebration/add',                                       //添加家有喜事
    'apiCelebrationQueryCelebrationInfoList': _host + '/api/celebration/queryCelebrationInfoList',// 获取家有喜事预约类型
    'apiCelebrationView': _host + '/api/celebration/view',                              //查看预约详情
    'apiActivityQueryActivityList': _host + '/api/activity/queryActivityList',         //获取活动列表
    'apiActivityQueryMyActivityList': _host + '/api/activity/queryMyActivityList',  //获取服务类型
    'apiActivityView': _host + '/api/activity/view',                                   //查看活动详情
    'apiActivityAdd': _host + '/api/activity/add',                                      //加入活动
    'apiActivityDelete': _host + '/api/activity/delete',                                //取消加入
    'apiActivityAddHeart': _host + '/api/activity/addHeart',                           //点赞
    'apiActivityRemoveHeart': _host + '/api/activity/removeHeart',                    //取消点赞
    'apiTrack': _host + '/api/track',                                                   //获取所有的朋友圈状态
    'apiTrackCreate': _host + '/api/track/create',                                     //发布新的朋友圈信息
    'apiTrackDelete': _host + '/api/track/delete',                                      //删除朋友圈动态（只能删除自己的）
    'apiTrackReply': _host + '/api/track/reply',                                        //回复朋友圈信息/评论
    'apiTrackGetReply': _host + '/api/track/getReply',                                  //获取评论/回复
    'apiTrackDeletereply': _host + '/api/track/deletereply',                             //删除回复/评论
    'apiTrackGood': _host + '/api/track/good',                                          //朋友圈点赞/取消点赞
    'apiInfoTypes': _host + '/api/info/types',                                           //检索新闻资讯分类信息
    'apiInfo': _host + '/api/info',                                                         // 检索资讯信息
    'apiLifetype': _host + '/api/lifetype',                                                 //快捷查询服务
    'apiOwnerHeadimg': _host + '/api/owner/headimg',                                        //更换头像
    //'apiOwnerIntegralAdd': _host + '/api/ownerIntegral/add',                            //添加积分（比如签到）
    'apiOwnerIntegralQueryOwnerIntegralList': _host + '/api/ownerIntegral/queryOwnerIntegralList', //获取积分记录
    'apiOwnerIntegralIntegral': _host + '/api/ownerIntegral/integral',              //我的积分
    'apiGetbalance': _host + '/api/getbalance',                                         //我的余额
    //'city': _host + '/city',                                                            //检索省市区街道信息
    'apiCells': _host + '/api/cells',                                                   //选择小区
    'apiCell': _host + '/api/cell',                                                   //小区信息(支持模糊检索)
    'apiOwnerBuildings': _host + '/api/owner/buildings',                            //选择楼栋
    'apiOwnerUnits': _host + '/api/owner/units',                                      //选择单元
    'apiOwnerRoom': _host + '/api/owner/room',                                        //检索房间信息
    'apiOwnerApply': _host + '/api/owner/apply',                                        //添加住所
    //'apiOwnerChangecell': _host + '/api/owner/changecell',                             //切换住所（同绑定住所）
    'apiShopGiveCoupon': _host + '/api/shop/giveCoupon',                              //获取红包
    'apiShopGiveMyCouponList': _host + '/api/shop/giveMyCouponList',             //我的卡卷
    'apiCar': _host + '/api/car',                                                       //获取活动列表
    'apiCarCreate': _host + '/api/car/create',                                          //添加车牌号
    'apiCarUpdate': _host + '/api/car/update',                                          //修改车牌号
    'apiCarDelete': _host + '/api/car/delete',                                         //删除车牌号
    'apiOwnerAddress': _host + '/api/owner/address',                                  //获取用户地址
    'apiOwnerAddressCreate': _host + '/api/owner/address/create',                    //添加新的地址
    'apiOwnerAddressUpdate': _host + '/api/owner/address/update',                    //编辑地址
    'apiOwnerAddressDelete': _host + '/api/owner/address/delete',                    //删除地址
    'apiVersion': _host + '/api/version',                                               //APP版本更新接口
    'apiOwnerNeighbors': _host + '/api/owner/neighbors',                               //业主APP邻里通
    'apiDoorChangecards': _host + '/api/door/changecards',                            //蓝牙门禁卡片同步
};
export {httpUrl}


