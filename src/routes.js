// import Login from './pages/Login.vue'
import LoginCloud from './pages/LoginCloud.vue';
import NotFound from './pages/404.vue';
// import Home from './pages/Home.vue'
import HomeCloud from './pages/HomeCloud.vue';

//云平台页面-车场
import index from './pages/park/index.vue';
import OrderManage_Orders from './pages/park/OrderManage_Orders.vue';
import OrderManage_Poles from './pages/park/OrderManage_Poles.vue';
import MonthMember_Refill from './pages/park/MonthMember_Refill.vue';
import MonthMember_VIP from './pages/park/MonthMember_VIP.vue';
import OnlinePay_CashManage from './pages/park/OnlinePay_CashManage.vue';
import OnlinePay_Income from './pages/park/OnlinePay_Income.vue';
import OrderStatistics_DailyReport from './pages/park/OrderStatistics_DailyReport.vue';
import OrderStatistics_MonthReport from './pages/park/OrderStatistics_MonthReport.vue';
import OrderStatistics_Settlement from './pages/park/OrderStatistics_Settlement.vue';
import ShopManage_Coupon from './pages/park/ShopManage_Coupon.vue';
import ShopManage_Shop from './pages/park/ShopManage_Shop.vue';
import ShopManage_QueryAccount from './pages/park/ShopManage_QueryAccount.vue';
import EquipmentManage_Monitor from './pages/park/EquipmentManage_Monitor.vue';
import EquipmentManage_Intercom from './pages/park/EquipmentManage_Intercom.vue';
import EquipmentManage_WorkStation from './pages/park/EquipmentManage_WorkStation.vue';
import EquipmentManage_Channel from './pages/park/EquipmentManage_Channel.vue';
import EquipmentManage_Camera from './pages/park/EquipmentManage_Camera.vue';
import EquipmentManage_LED from './pages/park/EquipmentManage_LED.vue';
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

//云平台页面-集团
import Data_Center from './pages/union/Data_Center.vue';
import BusinessOrder_Cars from './pages/union/BusinessOrder_Cars.vue';
import BusinessOrder_Orders from './pages/union/BusinessOrder_Orders.vue';
import BusinessOrder_Poles from './pages/union/BusinessOrder_Poles.vue';
import Member_MonthVIP from './pages/union/Member_MonthVIP.vue';
import Member_BlackList from './pages/union/Member_BlackList.vue';
import SystemSetting_Account from './pages/union/SystemSetting_Account.vue';
import SystemSetting_Park from './pages/union/SystemSetting_Park.vue';
import SystemSetting_EmployeeManage from './pages/union/SystemSetting_EmployeeManage.vue';
import SystemSetting_RoleManage from './pages/union/SystemSetting_RoleManage.vue';
import SystemSetting_LogsOperate from './pages/union/SystemSetting_LogsOperate.vue';
import SystemSetting_LogsCollector from './pages/union/SystemSetting_LogsCollector.vue';
import StrategicAnalysis_DailyReport from './pages/union/StrategicAnalysis_DailyReport.vue';
import StrategicAnalysis_MonthReport from './pages/union/StrategicAnalysis_MonthReport.vue';

let routes = [

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
        // name: '订单管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/orderManage_Orders', component: OrderManage_Orders, name: '订单记录'},
            {path: '/orderManage_Poles', component: OrderManage_Poles, name: '抬杆记录'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '月卡会员管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/monthMember_Refill', component: MonthMember_Refill, name: '月卡续费记录'},
            {path: '/monthMember_VIP', component: MonthMember_VIP, name: '月卡会员'}
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
            {path: '/orderStatistics_DailyReport', component: OrderStatistics_DailyReport, name: '时租订单统计'},
            {path: '/orderStatistics_Settlement', component: OrderStatistics_Settlement, name: '日报'},
            {path: '/orderStatistics_MonthReport', component: OrderStatistics_MonthReport, name: '月报'}
            // {path: '/orderStatistics_DailyReport', component: OrderStatistics_Commute, name: '订单'},
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '商户管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/shopManage_Coupon', component: ShopManage_Coupon, name: '商户管理'},
            {path: '/shopManage_Shop', component: ShopManage_Shop, name: '流水查询'},
            {path: '/shopManage_QueryAccount', component: ShopManage_QueryAccount, name: '优惠券管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '设备管理',
        iconCls: 'el-icon-document',
        children: [
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
            {path: '/systemManage_Logs', component: SystemManage_Logs, name: '系统日志'}


        ]
    },

    /*
    * 以下是集团页面
    *
    * */
    {
        path: '/',
        component: HomeCloud,
        name: '数据中心',
        iconCls: 'el-icon-document',
        children: [
            {path: '/data_Center', component: Data_Center, name: '数据中心'},
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '业务订单',
        iconCls: 'el-icon-document',
        children: [
            {path: '/businessOrder_Orders', component: BusinessOrder_Orders, name: '订单记录'},
            {path: '/businessOrder_Poles', component: BusinessOrder_Poles, name: '抬杆记录'},
            {path: '/businessOrder_Cars', component: BusinessOrder_Cars, name: '在场车辆'}
        ]
    },

    {
        path: '/',
        component: HomeCloud,
        name: '会员',
        iconCls: 'el-icon-document',
        children: [
            {path: '/member_MonthVIP', component: Member_MonthVIP, name: '月卡会员'},
            {path: '/member_BlackList', component: Member_BlackList, name: '黑名单管理'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '决策分析',
        iconCls: 'el-icon-document',
        children: [
            {path: '/strategicAnalysis_DailyReport', component: StrategicAnalysis_DailyReport, name: '车场日报'},
            {path: '/strategicAnalysis_MonthReport', component: StrategicAnalysis_MonthReport, name: '车场月报'}
        ]
    },
    {
        path: '/',
        component: HomeCloud,
        name: '系统设置',
        iconCls: 'el-icon-document',
        children: [
            {path: '/systemSetting_Account', component: SystemSetting_Account, name: '账户信息'},
            {path: '/systemSetting_Park', component: SystemSetting_Park, name: '停车场'},
            {path: '/systemSetting_EmployeeManage', component: SystemSetting_EmployeeManage, name: '员工管理'},
            {path: '/systemSetting_RoleManage', component: SystemSetting_RoleManage, name: '角色管理'},
            {path: '/systemSetting_LogsOperates', component: SystemSetting_LogsOperate, name: '操作日志管理'},
            {path: '/systemSetting_LogsCollector', component: SystemSetting_LogsCollector, name: '收费员日志'}

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
    }
];

export default routes;
