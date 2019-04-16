export const AUTH_ID = {
    orderManage: 2, //订单管理
    data_Center_park: 69, //订单管理
    orderManage_Orders: 83, //订单记录
    orderManage_Poles: 84, //抬杆记录
    orderManage_Income:353,//交易记录
    orderManage_Expense:354,//支出记录
    orderManage_Record:355,//减免记录
    monthMember: 7, //月卡会员-大菜单
    monthMember_Refill: 297, //月卡续费记录
    monthMember_VIP: 298, //月卡会员-小菜单
    prepay_card:339,
    prepay_card_trade:340,
    prepay_card_use:341,
    orderStatistics: 11, //统计分析
    orderStatistics_DailyReport: 12, //统计分析-时租订单统计-日报
    orderStatistics_MonthReport: 318, //统计分析-时租订单统计-日报
    orderStatistics_CollectorReport:321,//统计分析-收费员统计
    shopManage: 71, //商户管理-大菜单
    shopManage_Coupon: 305, //优惠券管理
    shopManage_Shop: 299, //商户管理-小菜单
    shopManage_QueryAccount: 300, //流水查询
    systemManage_AddedService_Sms:344,//短信服务
    systemManage_AddedService_Screen:345,//数据大屏
	systemManage_AddServices_Public:356,//商户公众号
    systemManage_AddServices_Program:352, //车场小程序
    systemManage_AddedService:343, //增值服务
    equipmentManage: 346, //设备管理
	equipmentManage_Watchhouse:357, //岗亭管理
    equipmentManage_Monitor: 347, //监控管理
    equipmentManage_Intercom: 348, //对讲管理
    equipmentManage_WorkStation: 349,//工作站管理
    equipmentManage_Channel: 350, //通道管理
    equipmentManage_Camera: 19, //摄像头管理
    equipmentManage_LED: 20, //LED屏管理
    employeePermission: 21, //员工权限
    employeePermission_Role: 22, //角色管理
    employeePermission_Manage: 23, //员工管理
    systemManage: 24, //系统管理
    systemManage_BlackList: 303, //黑名单管理
    systemManage_Commute: 304, //上下班记录
    systemManage_Account: 25, //账户管理
    systemManage_Params: 26, //参数设置
    systemManage_FreeReason: 72, //免费原因
    systemManage_CarManage_BindType: 260, //绑定车型
    systemManage_CarManage_CarType: 259, //车型设定
    systemManage_CarManage: 27, //车型管理
    systemManage_Price: 28, //时租价格管s理
    systemManage_MonthCard: 29, //月卡套餐管理
    systemManage_Logs: 80, //系统日志
    centerMonitor: 342, //中央监控
    onlinePay: 8, //电子支付
    onlinePay_Income: 10, //电子收款
    onlinePay_CashManage: 9, //提现管理
	vistorManage_VistorMember:324,
    vistorManage_homeOwner:336,
    vistorManage:323
};
export const AUTH_ID_ADMIN = {
    city_Manage: 118
};
export const showParkItem_const = {
    orderManage: false,
    data_Center_park: false,
    orderManage_Orders: false,
    orderManage_Poles: false,
    orderManage_Income:false,//交易记录
    orderManage_Expense:false,//支出记录
    orderManage_Record:false,//减免记录
    monthMember: false,
    monthMember_Refill: false,
    monthMember_VIP: false,
    prepay_card:false,
    prepay_card_trade:false,
    prepay_card_use:false,
    orderStatistics: false,
    orderStatistics_DailyReport: false,
    orderStatistics_MonthReport: false,
    orderStatistics_CollectorReport:false,//统计分析-收费员统计
    onlinePay: false,
    onlinePay_Income: false,
    onlinePay_CashManage: false,
    shopManage: false,
    shopManage_Coupon: false,
    shopManage_Shop: false,
    shopManage_QueryAccount: false,
    equipmentManage: false,
	equipmentManage_Watchhouse:false,
    equipmentManage_Monitor: false,
    equipmentManage_Intercom: false,
    equipmentManage_WorkStation: false,
    equipmentManage_Channel: false,
    equipmentManage_Camera: false,
    equipmentManage_LED: false,
    employeePermission: false,
    employeePermission_Role: false,
    employeePermission_Manage: false,
    systemManage: false,
    systemManage_BlackList: false,
    systemManage_Commute: false,
    systemManage_Account: false,
    systemManage_Params: false,
    systemManage_FreeReason: false,
    systemManage_CarManage_CarType: false,
    systemManage_CarManage_BindType: false,
    systemManage_CarManage: false,
    systemManage_Price: false,
    systemManage_MonthCard: false,
    systemManage_Logs: false,
	systemManage_AddServices_Public:false,
    systemManage_AddedService_Sms:false,
    systemManage_AddedService_Screen:false,
    systemManage_AddServices_Program:false,
    systemManage_AddedService:false,
    vistorManage_VistorMember:false,
    vistorManage_homeOwner:false,
    vistorManage:false,
    centerMonitor: false
};
export const AUTH_ID_UNION = {
    businessOrder: 105, //业务订单
    data_Center: 114, //概况-数据中心
    businessOrder_Cars: 208, //在场车辆
    businessOrder_Orders: 104, //订单记录
    businessOrder_Poles: 106, //抬杆记录
    businessOrder_Income:358, //交易记录
    businessOrder_Expense:359, //支出记录
    member: 212, //会员
    member_MonthVIP: 214, //月卡会员
    member_BlackList: 215, //黑名单管理
    systemSetting: 238, //系统设置
    systemSetting_Company: 240, //企业信息
    systemSetting_Account: 247, //账户信息
    systemSetting_Park: 243, //停车场
    systemSetting_HR: 239, //人力资源
    systemSetting_EmployeeManage: 246, //员工管理
    systemSetting_RoleManage: 245, //角色管理
    systemSetting_LogsManage: 244, //日志管理
    systemSetting_LogsOperates: 284, //操作日志管理
    systemSetting_LogsCollector: 2830000, //收费员日志
    strategicAnalysis: 219, //决策分析
    strategicAnalysis_DailyReport: 319, //封闭车场订单统计-车场日报
    strategicAnalysis_MonthReport:320,
    strategicAnalysis_DailyParkReport:322,//车场日报
    centerMonitor: 310 //中央监控
};
export const showUnionItem_const = {
    businessOrder: false,
    data_Center: false, //概况-数据中心
    businessOrder_Cars: false,
    businessOrder_Orders: false,
    businessOrder_Poles: false,
    businessOrder_Income:false, //交易记录
    businessOrder_Expense:false, //支出记录
    member: false,
    member_MonthVIP: false,
    member_BlackList: false,
    systemSetting: false,
    systemSetting_Account: false,
    systemSetting_Company: false,
    systemSetting_Park: false,
    systemSetting_EmployeeManage: false,
    systemSetting_RoleManage: false,
    systemSetting_HR: false,
    systemSetting_LogsOperates: false,
    systemSetting_LogsCollector: false,
    systemSetting_LogsManage: false,
    strategicAnalysis: false,
    strategicAnalysis_DailyReport: false,
    strategicAnalysis_MonthReport: false,
    strategicAnalysis_DailyParkReport:false,//车场日报
    centerMonitor: false
};

export const showShopItem_const = {
    shop: false,
    fixCode: false,
    ticketManage: false,
    shopRecharge: false,
    member: false,
    shopRole:false,
    shopMember:false
};

export const AUTH_ID_SHOP = {
    shop: 325,
    fixCode: 331,
    ticketManage: 330,
    shopRecharge: 328,
    member: 333,
    shopRole:335,
    shopMember:334
};


export const showBossItem_const = {
    systemSetting_UnionManage: true,
    systemSetting_ParkManage: true
};
export const ROLE_ID = {
    // 30 车场,26集团,,,27渠道,,28联盟,,,29城市
    //2018.2.6修改 2 集团...............8 车场 ........   7城市
    GROUP: 222,
    CHANNEL: 27,
    UNION: 2,
    CITY: 7,
    PARK: 8,
    BOSS:5,
    CITYREGIS:1001,
    SHOP:10
};
