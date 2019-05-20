import LoginCloud from './pages/LoginCloud.vue';
import NotFound from './pages/404.vue';
import CodeReduce from './pages/CodeReduce.vue';
import FreeCodeReduce from './pages/FreeCodeReduce.vue';
import CarReduce from './pages/CarReduce.vue';
import FreeCarReduce from './pages/FreeCarReduce.vue';
import ReduceExport from './pages/ReduceExport.vue';
import FreeReduceExport from './pages/FreeReduceExport.vue';
import HomeCloud from './pages/HomeCloud.vue';
import HomeCloud_Union from './pages/HomeCloud_Union.vue';
import HomeCloud_Admin from './pages/HomeCloud_Admin.vue';

//云平台页面-车场
import index from './pages/park/index.vue';
import Data_Center_Park from './pages/park/Data_Center_Park.vue';
import OrderManage_Orders from './pages/park/OrderManage_Orders.vue';
import OrderManage_Poles from './pages/park/OrderManage_Poles.vue';
import Bolink_Expense from './pages/park/Bolink_Expense.vue';
import Bolink_Income from './pages/park/Bolink_Income.vue';
import Reduce_Record from './pages/park/Reduce_Record.vue';
import OrderManage_OrderDetail from './pages/park/OrderManage_OrderDetail.vue';
import MonthMember_Refill from './pages/park/MonthMember_Refill.vue';
import MonthMember_VIP from './pages/park/MonthMember_VIP.vue';
import PrepayCard_VIP from './pages/park/PrepayCard_VIP.vue';
import PrepayCard_Trade from './pages/park/PrepayCard_Trade.vue';
import PrepayCard_Use from './pages/park/PrepayCard_Use.vue';
import OnlinePay_CashManage from './pages/park/OnlinePay_CashManage.vue';
import OnlinePay_Income from './pages/park/OnlinePay_Income.vue';
import OrderStatistics_DailyReport from './pages/park/OrderStatistics_DailyReport.vue';
import OrderStatistics_DailyBalance from './pages/park/OrderStatistics_DailyBalance.vue';
import OrderStatistics_CollectorReport from './pages/park/OrderStatistics_CollectorReport.vue';
import OrderStatistics_MonthReport from './pages/park/OrderStatistics_MonthReport.vue';
import ShopManage_Coupon from './pages/park/ShopManage_Coupon.vue';
import ShopManage_Shop from './pages/park/ShopManage_Shop.vue';
import ShopMange_Shop_Staff from './pages/park/shopMange_Shop_Staff.vue';
import ShopManage_QueryAccount from './pages/park/ShopManage_QueryAccount.vue';
import Park_WhiteList from './pages/park/Park_WhiteList.vue';
//设备管理
import EquipmentManage_Watchhouse from './pages/park/EquipmentManage_Watchhouse.vue';
import EquipmentManage_Monitor from './pages/park/EquipmentManage_Monitor.vue';
import EquipmentManage_Intercom from './pages/park/EquipmentManage_Intercom.vue';
import EquipmentManage_WorkStation from './pages/park/EquipmentManage_WorkStation.vue';
import EquipmentManage_Channel from './pages/park/EquipmentManage_Channel.vue';
import EquipmentManage_Camera from './pages/park/EquipmentManage_Camera.vue';
import EquipmentManage_LED from './pages/park/EquipmentManage_LED.vue';
import VistorManage_VistorMember from './pages/park/VistorManage_VistorMember.vue';
import VistorManage_HomeOwner from './pages/park/VistorManage_HomeOwner.vue';
import EmployeePermission_Manage from './pages/park/EmployeePermission_EmployeeManage.vue';
import EmployeePermission_Role from './pages/park/EmployeePermission_RoleManage.vue';
import SystemManage_BlackList from './pages/park/SystemManage_BlackList.vue';
import SystemManage_Commute from './pages/park/SystemManage_Commute.vue';
import SystemManage_Account from './pages/park/SystemManage_Account.vue';
import SystemManage_Params from './pages/park/SystemManage_Params.vue';
import SystemManage_FreeReason from './pages/park/SystemManage_FreeReason.vue';
import SystemManage_CarManage_CarType from './pages/park/SystemManage_CarManage_CarType.vue';
import SystemManage_CarManage_BindType from './pages/park/SystemManage_CarManage_BindType.vue';
import SystemManage_Price from './pages/park/SystemManage_Price.vue';
import SystemManage_MonthCard from './pages/park/SystemManage_MonthCard.vue';
import SystemManage_Logs from './pages/park/SystemManage_Logs.vue';
import SystemManage_AddedService_Sms from './pages/park/SystemManage_Sms';
import SystemManage_AddedService_Screen from './pages/park/SystemManage_Screen';
import AddServices_Program from './pages/park/AddServices_Program';
import SystemManage_AddServices_Public from './pages/park/AddServices_Public';

//cyz add
import  MonitorApp from './MonitorApp.vue';
import  DataScreen from './pages/park/Data_Screen.vue'

//cyz add end
//云平台页面-集团
import Data_Center from './pages/union/Data_Center.vue';
import BusinessOrder_Cars from './pages/union/BusinessOrder_Cars.vue';
import BusinessOrder_Orders from './pages/union/BusinessOrder_Orders.vue';
import BusinessOrder_Details from './pages/union/BusinessOrderDetails.vue';
import BusinessOrder_Poles from './pages/union/BusinessOrder_Poles.vue';
import Member_MonthVIP from './pages/union/Member_MonthVIP.vue';
import Member_PrepayCardVIP from './pages/union/Member_PrepayCardVIP.vue';//储值卡会员
import Member_BlackList from './pages/union/Member_BlackList.vue';
import Member_WhiteList from './pages/union/Member_WhiteList.vue';
import SystemSetting_Account from './pages/union/SystemSetting_Account.vue';
import SystemSetting_Park from './pages/union/SystemSetting_Park.vue';
import SystemSetting_Park_Staff from './pages/union/SystemSetting_Park_Staff.vue'
import SystemSetting_EmployeeManage from './pages/union/SystemSetting_EmployeeManage.vue';
import SystemSetting_RoleManage from './pages/union/SystemSetting_RoleManage.vue';
import SystemSetting_LogsOperate from './pages/union/SystemSetting_LogsOperate.vue';
import SystemSetting_LogsCollector from './pages/union/SystemSetting_LogsCollector.vue';
import StrategicAnalysis_DailyReport from './pages/union/StrategicAnalysis_DailyReport.vue';
import strategicAnalysis_DailyParkReport from './pages/union/strategicAnalysis_DailyParkReport.vue';

import StrategicAnalysis_MonthReport from './pages/union/StrategicAnalysis_MonthReport.vue';

import Union_Bolink_Expense from './pages/union/Bolink_Expense.vue';
import Union_Bolink_Income from './pages/union/Bolink_Income.vue';

//集团减免记录 BusinessOrder_Reduce
import BusinessOrder_Reduce from './pages/union/BusinessOrder_Reduce.vue';
//厂商页面
import Park_Manage from './pages/city/Park_Manage.vue';
import Park_Manage_Staff from './pages/city/Park_Manage_Staff.vue';
import Union_Manage from './pages/city/Union_Manage.vue';
import Union_Manage_Staff from './pages/city/Union_Manage_Staff.vue';
import Setting_Manage from './pages/city/Setting_Manage.vue';

//总后台页面
import City_Manage from './pages/admin/City_Manage.vue';
import City_Manage_Staff from './pages/admin/City_Manage_Staff.vue';
import CreateUin from './pages/admin/CreateUin.vue';
import Message_Service from './pages/admin/Message_Service.vue';
import BigScreen_Service from './pages/admin/BigScreen_Service.vue';
import Public_Service from './pages/admin/Public_Service.vue';
import Program_Service from './pages/admin/Program_Service.vue';

//Public_Service
//商户后台页面
import ShopAccount from './pages/shop/ShopAccount.vue';
import ShopRecharge from './pages/shop/ShopRecharge.vue';
import TicketManage from './pages/shop/TicketManage.vue';
import FixCode from './pages/shop/FixCode.vue';
import EmployeePermission_ShopMember from './pages/shop/EmployeePermission_EmployeeManage.vue';
import EmployeePermission_ShopRole from './pages/shop/EmployeePermission_RoleManage.vue';


/**
 *
 * @date:20190515
 * @author:cyzhi
 * @description:泊链厂商页面迁移至云平台
 * @page:Account
 */
import Account from  './pages/city/Account.vue'
import MoneyRecord from  './pages/city/MoneyRecord.vue'
import NewUnionProfit from './pages/city/NewUnionProfit.vue'
import ManufacturerRoleManagement from './pages/city/ManufacturerRoleManagement.vue'
import PersonnelManagement from './pages/city/PersonnelManagement.vue'
import MessageNtification from './pages/city/MessageNtification.vue'
import FirmSystemManageLogs from './pages/city/Firm_SystemManage_Logs.vue'
import Development from './pages/city/Development.vue'
import MaterielTable from './pages/city/MaterielTable'
/*--------------end---------------------*/
let routes = [

    /**
     * @date:20190515
     * @author:cyzhi
     * @description:泊链厂商页面迁移至云平台
     */
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/account', component: Account, name: 'Account'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/money_record', component: MoneyRecord, name: 'MoneyRecord'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/new_union_profit', component: NewUnionProfit, name: 'NewUnionProfit'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/manufacturer_role_management', component: ManufacturerRoleManagement, name: 'ManufacturerRoleManagement'},
            {path: '/mersonnel_management', component: PersonnelManagement, name: 'PersonnelManagement'},
            {path: '/message_ntification', component: MessageNtification, name: 'MessageNtification'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/firm_system_manage_logs', component: FirmSystemManageLogs, name: 'FirmSystemManageLogs'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/development', component: Development, name: 'Development'},
        ]
    },
    ///////////////////end////////////////////////////////////////////

    {
        path: '/',
        component: HomeCloud_Admin,
        // name: '订单管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/createUin', component: CreateUin, name: '注册厂商'}
        ]
    },
    //总后台页面
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '厂商管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/city_manage', component: City_Manage, name: '厂商管理'},
            {path: '/city_manage_staff', component: City_Manage_Staff, name: '厂商管理'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '增值服务',
        iconCls: 'el-icon-document',
        children: [
            {path: '/message_service', component: Message_Service, name: '短信服务'},
            {path: '/bigScreen_service', component: BigScreen_Service, name: '大屏服务'},
            {path: '/public_service', component: Public_Service, name: '公众号服务'},
            {path: '/program_service', component: Program_Service, name: '收费小程序'},

        ]
    },
    //商户页面
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/shop', component: ShopAccount, name: '商户管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/fixCode', component: FixCode, name: '固定码管理'}
        ]
    },

    {
        path: '/',
        component: HomeCloud_Admin,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/shopRecharge', component: ShopRecharge, name: '充值明细'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/ticketManage', component: TicketManage, name: '用券明细'}
        ]
    },

    {
        path: '/',
        component: HomeCloud_Admin,
        name: '员工管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/shopRole', component: EmployeePermission_ShopRole, name: '角色管理'},
            {path: '/shopMember', component: EmployeePermission_ShopMember, name: '员工管理'}
        ]
    },

    // 厂商页面
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '运营集团',
        iconCls: 'el-icon-document',
        children: [
            {path: '/union_manage', component: Union_Manage, name: '运营集团'},
            {path: '/union_manage_staff', component: Union_Manage_Staff, name: '运营集团'},

        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '车场管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/park_manage', component: Park_Manage, name: '车场管理'},
            {path: '/materiel_table', component: MaterielTable, name: 'MaterielTable'},
            {path: '/park_manage_staff', component: Park_Manage_Staff, name: 'park_manage_staff'},

        ]
    },
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '个性化设置',
        iconCls: 'el-icon-document',
        children: [
            {path: '/setting_manage', component: Setting_Manage, name: '运营集团'}
        ]
    },

    {
        path: '/loginCloud',
        component: LoginCloud,
        name: '',
        hidden: true
    },
    /*
    * 以下是云平台页面
    * 车场
    *
    * */
    {
        path: '/',
        component: HomeCloud,
        name: '数据中心',
        iconCls: 'el-icon-document',
        children: [
            {path: '/data_Center_park', component: Data_Center_Park, name: '数据中心'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        // name: '订单管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/orderManage_Orders', component: OrderManage_Orders, name: '订单记录'},
            {path: '/orderManage_Poles', component: OrderManage_Poles, name: '抬杆记录'},
            {path: '/orderManage_Income', component: Bolink_Income, name: '交易记录'},
            {path: '/orderManage_Expense', component: Bolink_Expense, name: '支出记录'},
            {path: '/orderManage_Record', component: Reduce_Record, name: '减免记录'},
            {path: '/orderManage_OrderDetail', component: OrderManage_OrderDetail, name: '订单详情'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '月卡会员管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/monthMember_Refill', component: MonthMember_Refill, name: '月卡续费记录'},
            {path: '/monthMember_VIP', component: MonthMember_VIP, name: '月卡会员'},
            {path: '/prepay_card', component: PrepayCard_VIP, name: '储值卡会员'},
            {path: '/prepay_card_trade', component: PrepayCard_Trade, name: '储值卡充值记录'},
            {path: '/prepay_card_use', component: PrepayCard_Use, name: '储值卡使用记录'},
            {path: '/park_white_list', component: Park_WhiteList, name: '白名单管理'},
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '访客管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/vistorManage_VistorMember', component: VistorManage_VistorMember, name: '访客人员管理'},
            {path: '/vistorManage_homeOwner', component: VistorManage_HomeOwner, name: '访客人员管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '电子支付',
        iconCls: 'el-icon-document',
        children: [
            {path: '/onlinePay_CashManage', component: OnlinePay_CashManage, name: '提现管理'},
            {path: '/onlinePay_Income', component: OnlinePay_Income, name: '电子收款'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '统计分析',
        iconCls: 'el-icon-document',
        children: [

            {path: '/orderStatistics_CollectorReport', component: OrderStatistics_CollectorReport, name: '收费员'},
            {path: '/orderStatistics_DailyReport', component: OrderStatistics_DailyReport, name: '日报'},
            {path: '/orderStatistics_DailyBalance', component: OrderStatistics_DailyBalance, name: '日报'},
            {path: '/orderStatistics_MonthReport', component: OrderStatistics_MonthReport, name: '月报'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {
                path: '/shopManage_Coupon',
                component: ShopManage_Coupon,
                name: '商户管理',
            },
            {path: '/shopManage_Shop', component: ShopManage_Shop, name: '流水查询'},
            {path: '/shopManage_QueryAccount', component: ShopManage_QueryAccount, name: '优惠券管理'},
            {path: '/ShopManage_Coupon_Staff', component: ShopMange_Shop_Staff, name: '员工管理'},
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '设备管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/equipmentManage_Watchhouse', component: EquipmentManage_Watchhouse, name: '岗亭管理'},
            {path: '/equipmentManage_Monitor', component: EquipmentManage_Monitor, name: '监控管理'},
            {path: '/equipmentManage_Intercom', component: EquipmentManage_Intercom, name: '对讲管理'},
            {path: '/equipmentManage_WorkStation', component: EquipmentManage_WorkStation, name: '工作站管理'},
            {path: '/equipmentManage_Channel', component: EquipmentManage_Channel, name: '通道管理'},
            {path: '/equipmentManage_Camera', component: EquipmentManage_Camera, name: '摄像头管理'},
            {path: '/equipmentManage_LED', component: EquipmentManage_LED, name: 'LED屏管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '员工权限',
        iconCls: 'el-icon-document',
        children: [
            {path: '/employeePermission_Role', component: EmployeePermission_Role, name: '角色管理'},
            {path: '/employeePermission_Manage', component: EmployeePermission_Manage, name: '员工管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '系统管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/systemManage_BlackList', component: SystemManage_BlackList, name: '黑名单管理'},
            {path: '/systemManage_Commute', component: SystemManage_Commute, name: '上下班记录'},
            {path: '/systemManage_Account', component: SystemManage_Account, name: '账户管理'},
            {path: '/systemManage_Params', component: SystemManage_Params, name: '参数管理'},
            {path: '/systemManage_FreeReason', component: SystemManage_FreeReason, name: '免费原因'},
            {path: '/systemManage_CarManage_CarType', component: SystemManage_CarManage_CarType, name: '车型管理dad'},
            {path: '/systemManage_CarManage_BindType', component: SystemManage_CarManage_BindType, name: '车型管理son'},
            {path: '/systemManage_Price', component: SystemManage_Price, name: '价格管理'},
            {path: '/systemManage_MonthCard', component: SystemManage_MonthCard, name: '月卡套餐管理'},
            {path: '/systemManage_Logs', component: SystemManage_Logs, name: '系统日志'},
            // {path: '/SystemManage_AddedService_Sms', component: SystemManage_AddedService_Sms, name: 'sms'},//增值服务-短信服务
            // {path: '/SystemManage_AddedService_Screen', component: SystemManage_AddedService_Screen, name: 'screen'},//增值服务-短信服务

        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '增值服务',
        children: [
            {path: '/SystemManage_AddedService_Sms', component: SystemManage_AddedService_Sms, name: 'sms'},//增值服务-短信服务
            {path: '/SystemManage_AddedService_Screen', component: SystemManage_AddedService_Screen, name: 'screen'},//增值服务-数据大屏
            {path: '/systemManage_AddServices_Program', component: AddServices_Program, name: 'program'},//增值服务-小程序
            {path: '/systemManage_AddServices_Public', component: SystemManage_AddServices_Public, name: 'public'},//增值服务-小程序


        ]
    },
    {
        path: '/monitorApp',
        component:MonitorApp ,
        name: '自定义监控'
    },
    {
        path: '/dataScreen',
        component:DataScreen ,
        name: '数据大屏'
    },
    /*
    * 以下是集团页面
    *
    * */
    {
        path: '/',
        component: HomeCloud_Union,
        name: '数据中心',
        iconCls: 'el-icon-document',
        children: [
            {path: '/data_Center', component: Data_Center, name: '数据中心'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Union,
        name: '业务订单',
        iconCls: 'el-icon-document',
        children: [
            {path: '/businessOrder_Orders', component: BusinessOrder_Orders, name: '订单记录'},
            {path: '/businessOrder_Poles', component: BusinessOrder_Poles, name: '抬杆记录'},
            {path: '/businessOrder_Cars', component: BusinessOrder_Cars, name: '在场车辆'},
            {path: '/businessOrder_Income', component: Union_Bolink_Income, name: '交易记录'},
            {path: '/businessOrder_Expense', component: Union_Bolink_Expense, name: '支出记录'},
            {path: '/businessOrder_Reduce', component: BusinessOrder_Reduce, name: '减免记录'},
            {path: '/businessOrder_Details', component: BusinessOrder_Details, name: '订单记录详情'},
        ]
    },

    {
        path: '/',
        component: HomeCloud_Union,
        name: '会员',
        iconCls: 'el-icon-document',
        children: [
            {path: '/member_MonthVIP', component: Member_MonthVIP, name: '月卡会员'},
            {path: '/member_PrepayCardVIP', component: Member_PrepayCardVIP, name: '储值卡会员'},
            {path: '/member_BlackList', component: Member_BlackList, name: '黑名单管理'},
            {path: '/member_WhiteList', component: Member_WhiteList, name: '白名单管理'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Union,
        name: '决策分析',
        iconCls: 'el-icon-document',
        children: [
            {path: '/strategicAnalysis_DailyParkReport', component: strategicAnalysis_DailyParkReport, name: '车场日报'},
            {path: '/strategicAnalysis_DailyReport', component: StrategicAnalysis_DailyReport, name: '集团日报'},
            {path: '/strategicAnalysis_MonthReport', component: StrategicAnalysis_MonthReport, name: '集团月报'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Union,
        name: '系统设置',
        iconCls: 'el-icon-document',
        children: [
            {path: '/systemSetting_Account', component: SystemSetting_Account, name: '账户信息'},
            {path: '/systemSetting_Park', component: SystemSetting_Park, name: '停车场'},
            {path:'/systemSetting_Park_Staff',component:SystemSetting_Park_Staff,name:'停车场员工'},
            {path: '/systemSetting_EmployeeManage', component: SystemSetting_EmployeeManage, name: '员工管理'},
            {path: '/systemSetting_RoleManage', component: SystemSetting_RoleManage, name: '角色管理'},
            {path: '/systemSetting_LogsOperates', component: SystemSetting_LogsOperate, name: '操作日志管理'},
            {path: '/systemSetting_LogsCollector', component: SystemSetting_LogsCollector, name: '收费员日志'},

        ]
    },

    /*
    * 404保留页面
    * */
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    },

    {
        path: '/code_reduce',
        component: CodeReduce,
        name: 'CodeReduce',
        hidden: true
    },
    {
        path: '/car_reduce',
        component: CarReduce,
        name: 'CarReduce',
        hidden: true
    },
    {
        path: '/free_car_reduce',
        component: FreeCarReduce,
        name: 'FreeCarReduce',
        hidden: true
    },
    {
        path: '/free_code_reduce',
        component: FreeCodeReduce,
        name: 'FreeCodeReduce',
        hidden: true
    },
    {
        path: '/reduce_export',
        component: ReduceExport,
        name: 'ReduceExport',
        hidden: true
    },
    {
        path: '/free_reduce_export',
        component: FreeReduceExport,
        name: 'FreeReduceExport',
        hidden: true
    },

    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: HomeCloud,
        // name: 'home',
        iconCls: 'el-icon-document',
        children: [
            {path: '/index', component: index, name: '空页面'}
        ]
    },

    {
        path: '/',
        component: HomeCloud_Union,
        // name: 'home',
        iconCls: 'el-icon-document',
        children: [
            {path: '/index_Union', component: index, name: '空页面'}
        ]
    }
];

export default routes;
