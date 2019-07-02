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



/**
 *
 * @date:20190620
 * description:云平台集团权限的页面
 */




//总后台页面
import City_Manage from './pages/admin/City_Manage.vue';
import City_Manage_Staff from './pages/admin/City_Manage_Staff.vue';
import CreateUin from './pages/admin/CreateUin.vue';
import Message_Service from './pages/admin/Message_Service.vue';
import BigScreen_Service from './pages/admin/BigScreen_Service.vue';
import Public_Service from './pages/admin/Public_Service.vue';
import Program_Service from './pages/admin/Program_Service.vue';
import Device_Manage from './pages/admin/Device_manage.vue';

//Public_Service
//商户后台页面
import ShopAccount from './pages/shop/ShopAccount.vue';
import ShopRecharge from './pages/shop/ShopRecharge.vue';
import TicketManage from './pages/shop/TicketManage.vue';
import FixCode from './pages/shop/FixCode.vue';
import EmployeePermission_ShopMember from './pages/shop/EmployeePermission_EmployeeManage.vue';
import EmployeePermission_ShopRole from './pages/shop/EmployeePermission_RoleManage.vue';



const CommonRouteItems = [

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
    {
        path: '/',
        component: HomeCloud_Admin,
        name: '设备管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/device_manage', component: Device_Manage, name: '设备管理'},
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




    {
        path: '/loginCloud',
        component: LoginCloud,
        name: '',
        hidden: true
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


/**
 *
 * @date:20190620
 * @description:整理router页面路由 改为按需加载路由
 *
 * @update:20190620
 * @description:车场端的页面路由整理
 */
//云平台页面-车场
// index 空页面
const index = () => import('./pages/park/index.vue');
//数据中心
const Data_Center_Park = () => import(/* webpackChunkName: "park-items" */ './pages/park/Data_Center_Park.vue');
//订单管理下 ---
//      订单记录、抬杆记录、支出记录、交易记录、异常订单、减免记录
//          --订单详情
const OrderManage_Orders = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderManage_Orders.vue');
const OrderManage_Poles = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderManage_Poles.vue');
const Bolink_Expense = () => import(/* webpackChunkName: "park-items" */ './pages/park/Bolink_Expense.vue');
const Bolink_Income = () => import(/* webpackChunkName: "park-items" */ './pages/park/Bolink_Income.vue');
const Abnormal_Order = () => import(/* webpackChunkName: "park-items" */ './pages/park/Abnormal_Order.vue');
const Reduce_Record = () => import(/* webpackChunkName: "park-items" */ './pages/park/Reduce_Record.vue');
const OrderManage_OrderDetail = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderManage_OrderDetail.vue');

//会员管理
    //月卡会员、月卡续费记录、储值卡会员、储值卡充值记录、储值卡使用记录、白名单管理
const MonthMember_VIP = () => import(/* webpackChunkName: "park-items" */ './pages/park/MonthMember_VIP.vue');
const MonthMember_Refill = () => import(/* webpackChunkName: "park-items" */ './pages/park/MonthMember_Refill.vue');
const PrepayCard_VIP = () => import(/* webpackChunkName: "park-items" */ './pages/park/PrepayCard_VIP.vue');
const PrepayCard_Trade = () => import(/* webpackChunkName: "park-items" */ './pages/park/PrepayCard_Trade.vue');
const PrepayCard_Use = () => import(/* webpackChunkName: "park-items" */ './pages/park/PrepayCard_Use.vue');
const Park_WhiteList = () => import(/* webpackChunkName: "park-items" */ './pages/park/Park_WhiteList.vue');

//访客管理
    //访客人员管理、业主管理
const VistorManage_VistorMember = () => import(/* webpackChunkName: "park-items" */ './pages/park/VistorManage_VistorMember.vue');
const VistorManage_HomeOwner = () => import(/* webpackChunkName: "park-items" */ './pages/park/VistorManage_HomeOwner.vue');

//统计分析
    //收费员日报、车场日报、车场日报、上下班记录
const OrderStatistics_CollectorReport = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderStatistics_CollectorReport.vue');
const OrderStatistics_DailyReport = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderStatistics_DailyReport.vue');
const OrderStatistics_MonthReport = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderStatistics_MonthReport.vue');
const SystemManage_Commute = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Commute.vue');
        //其他
const OrderStatistics_DailyBalance = () => import(/* webpackChunkName: "park-items" */ './pages/park/OrderStatistics_DailyBalance.vue');

//商户管理
    //商户管理、流水查询、优惠券管理
        //商户管理下的员工设置
const ShopManage_Shop = () => import(/* webpackChunkName: "park-items" */ './pages/park/ShopManage_Shop.vue');
const ShopMange_Shop_Staff = () => import(/* webpackChunkName: "park-items" */ './pages/park/shopMange_Shop_Staff.vue');
const ShopManage_QueryAccount = () => import(/* webpackChunkName: "park-items" */ './pages/park/ShopManage_QueryAccount.vue');
const ShopManage_Coupon = () => import(/* webpackChunkName: "park-items" */ './pages/park/ShopManage_Coupon.vue');


//电子支付
    //提现设置、电子收款
const OnlinePay_CashManage = () => import(/* webpackChunkName: "park-items" */ './pages/park/OnlinePay_CashManage.vue');
const OnlinePay_Income = () => import(/* webpackChunkName: "park-items" */ './pages/park/OnlinePay_Income.vue');

//员工权限
    //角色管理、员工管理
const EmployeePermission_Role = () => import(/* webpackChunkName: "park-items" */ './pages/park/EmployeePermission_RoleManage.vue');
const EmployeePermission_Manage = () => import(/* webpackChunkName: "park-items" */ './pages/park/EmployeePermission_EmployeeManage.vue');

//增值服务
    //短信服务、数据大屏、商户公众号、小程序收费
const SystemManage_AddedService_Sms = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Sms.vue');
const SystemManage_AddedService_Screen = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Screen.vue');
const AddServices_Program = () => import(/* webpackChunkName: "park-items" */ './pages/park/AddServices_Program.vue');
const SystemManage_AddServices_Public = () => import(/* webpackChunkName: "park-items" */ './pages/park/AddServices_Public.vue');

//系统管理
    //设备管理、黑名单管理、账户管理、免费原因、车型管理、时租价格管理、月卡套餐管理、系统日志
        //设备管理下--> 岗亭管理、监控管理、对讲管理、工作站管理、通道管理


//设备管理
const EquipmentManage_Watchhouse = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_Watchhouse.vue');
const EquipmentManage_Monitor = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_Monitor.vue');
const EquipmentManage_Intercom = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_Intercom.vue');
const EquipmentManage_WorkStation = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_WorkStation.vue');
const EquipmentManage_Channel = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_Channel.vue');
const EquipmentManage_Camera = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_Camera.vue');
const EquipmentManage_LED = () => import(/* webpackChunkName: "park-items" */ './pages/park/EquipmentManage_LED.vue');


const SystemManage_BlackList = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_BlackList.vue');
const SystemManage_Account = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Account.vue');
const SystemManage_Params = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Params.vue');
const SystemManage_FreeReason = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_FreeReason.vue');
const SystemManage_CarManage_CarType = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_CarManage_CarType.vue');
const SystemManage_CarManage_BindType = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_CarManage_BindType.vue');
const SystemManage_Price = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Price.vue');
const SystemManage_MonthCard = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_MonthCard.vue');
const SystemManage_Logs = () => import(/* webpackChunkName: "park-items" */ './pages/park/SystemManage_Logs.vue');
const Camera_Manage = () => import(/* webpackChunkName: "park-items" */ './pages/park/Camera_Manage.vue');

//打开新窗口的页面
/**
 * 监控中心暂时无法懒加载，原因不详
 * 如果按照常规方法写错懒加载，则左侧菜单栏高度出现错误
 */
//数据大屏、监控中心
const DataScreen = () => import(/* webpackChunkName: "park-items" */ './pages/park/Data_Screen.vue');
import  MonitorApp from './MonitorApp.vue';


const ParkRouteItems = [
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
            {path: '/orderManage_Abnormal', component: Abnormal_Order, name: '异常订单'},
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
            {path: '/equipmentManage_ParkCamera', component: Camera_Manage, name: '车牌相机管理'},
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
];


/**
 *
 * @date:20190612
 * @author:cyzhi
 * @title:city
 * @description:厂商路由管理
 * @update:20190612
 * @description:泊链厂商页面迁移至云平台
 */

const HomeCloud_City = () => import(/* webpackChunkName: "city-items" */ './pages/HomeCloud_City');
const Account = () => import(/* webpackChunkName: "city-items" */ './pages/city/Account.vue');
const MoneyRecord = () => import(/* webpackChunkName: "city-items" */ './pages/city/MoneyRecord.vue');
const NewUnionProfit = () => import(/* webpackChunkName: "city-items" */ './pages/city/NewUnionProfit.vue');
const ManufacturerRoleManagement = () => import(/* webpackChunkName: "city-items" */ './pages/city/humanResources/RoleManage.vue');
const PersonnelManagement = () => import(/* webpackChunkName: "city-items" */ './pages/city/humanResources/EmployeeManage.vue');
const MessageNtification = () => import(/* webpackChunkName: "city-items" */ './pages/city/humanResources/MessageNtification.vue');
const FirmSystemManageLogs = () => import(/* webpackChunkName: "city-items" */ './pages/city/Firm_SystemManage_Logs.vue');
const Development = () => import(/* webpackChunkName: "city-items" */ './pages/city/Development.vue');
const MaterielTable = () => import(/* webpackChunkName: "city-items" */ './pages/city/parkManagement/MaterielTable.vue');
const Park_Manage = () => import(/* webpackChunkName: "city-items" */ './pages/city/parkManagement/Park_Manage.vue');
const Park_Manage_Staff = () => import(/* webpackChunkName: "city-items" */ './pages/city/parkManagement/Park_Manage_Staff.vue');
const Union_Manage = () => import(/* webpackChunkName: "city-items" */ './pages/city/unionManagement/Union_Manage.vue');
const Union_Manage_Staff = () => import(/* webpackChunkName: "city-items" */ './pages/city/unionManagement/Union_Manage_Staff.vue');
const Setting_Manage = () => import(/* webpackChunkName: "city-items" */ './pages/city/Setting_Manage.vue');
const Ser_Manage = () => import(/* webpackChunkName: "city-items" */ './pages/city/serManagement/Ser_Manage.vue');
const Ser_Manage_Staff = () => import(/* webpackChunkName: "city-items" */ './pages/city/serManagement/Ser_Manage_Staff.vue');

const CityRouteItems = [
    {
        path: '/',
        component: HomeCloud_City,
        name: '',
        iconCls: 'el-icon-document',
        children: [
            {path: '/city_account', component: Account, name: 'Account'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: '工程服务商',
        iconCls: 'el-icon-document',
        children: [
            {path: '/citySerManage_serManagePage', component: Ser_Manage, name: 'Ser_Manage'},
            {path: '/ser_manage_staff', component: Ser_Manage_Staff, name: 'ser_manage_staff'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: '运营集团',
        iconCls: 'el-icon-document',
        children: [
            {path: '/cityUnionManage_unionManagePage', component: Union_Manage, name: 'Union_Manage'},
            {path: '/union_manage_staff', component: Union_Manage_Staff, name: 'Union_Manage_Staff'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: '车场管理',
        iconCls: 'el-icon-document',
        children: [
            {path: '/cityParkManage_parkManagePage', component: Park_Manage, name: 'Park_Manage'},
            {path: '/cityParkManage_materielPage', component: MaterielTable, name: 'MaterielTable'},
            {path: '/park_manage_staff', component: Park_Manage_Staff, name: 'park_manage_staff'},

        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/cityTrade_MoneyRecord', component: MoneyRecord, name: 'MoneyRecord'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/cityStatistics_NewUnionProfit', component: NewUnionProfit, name: 'NewUnionProfit'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/cityResources_RoleManage', component: ManufacturerRoleManagement, name: 'ManufacturerRoleManagement'},
            {path: '/cityResources_EmployeeManage', component: PersonnelManagement, name: 'PersonnelManagement'},
            {path: '/cityResources_MessageNtification', component: MessageNtification, name: 'MessageNtification'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/city_systemMange', component: FirmSystemManageLogs, name: 'citySystemMange'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: '个性化设置',
        iconCls: 'el-icon-document',
        children: [
            {path: '/citySettingManage_settingPage', component: Setting_Manage, name: 'Setting_Manage'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_City,
        name: 'plat',
        iconCls: 'el-icon-document',
        children: [
            {path: '/development', component: Development, name: 'Development'},
        ]
    },
];

/*------------end---------------*/

/**
 *
 * @date:20190604
 * @author:cyzhi
 * @description:集团路由管理
 */
//云平台页面-集团
const Data_Center = () => import(/* webpackChunkName: "union-items" */ './pages/union/Data_Center.vue');
const BusinessOrder_Cars = () => import(/* webpackChunkName: "union-items" */ './pages/union/BusinessOrder_Cars.vue');
const BusinessOrder_Orders = () => import(/* webpackChunkName: "union-items" */ './pages/union/BusinessOrder_Orders.vue');
const BusinessOrder_Details = () => import(/* webpackChunkName: "union-items" */ './pages/union/BusinessOrderDetails.vue');
const BusinessOrder_Poles = () => import(/* webpackChunkName: "union-items" */ './pages/union/BusinessOrder_Poles.vue');
const Member_MonthVIP = () => import(/* webpackChunkName: "union-items" */ './pages/union/Member_MonthVIP.vue');
const Member_PrepayCardVIP = () => import(/* webpackChunkName: "union-items" */ './pages/union/Member_PrepayCardVIP.vue');
const Member_BlackList = () => import(/* webpackChunkName: "union-items" */ './pages/union/Member_BlackList.vue');
const Member_WhiteList = () => import(/* webpackChunkName: "union-items" */ './pages/union/Member_WhiteList.vue');
const SystemSetting_Account = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_Account.vue');
const SystemSetting_Park = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_Park.vue');
const SystemSetting_Park_Staff = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_Park_Staff.vue');
const SystemSetting_EmployeeManage = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_EmployeeManage.vue');
const SystemSetting_RoleManage = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_RoleManage.vue');
const SystemSetting_LogsOperate = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_LogsOperate.vue');
const SystemSetting_LogsCollector = () => import(/* webpackChunkName: "union-items" */ './pages/union/SystemSetting_LogsCollector.vue');
const StrategicAnalysis_DailyReport = () => import(/* webpackChunkName: "union-items" */ './pages/union/StrategicAnalysis_DailyReport.vue');
const strategicAnalysis_DailyParkReport = () => import(/* webpackChunkName: "union-items" */ './pages/union/strategicAnalysis_DailyParkReport.vue');
const StrategicAnalysis_MonthReport = () => import(/* webpackChunkName: "union-items" */ './pages/union/StrategicAnalysis_MonthReport.vue');
const Union_Bolink_Expense = () => import(/* webpackChunkName: "union-items" */ './pages/union/Bolink_Expense.vue');
const Union_Bolink_Income = () => import(/* webpackChunkName: "union-items" */ './pages/union/Bolink_Income.vue');
const BusinessOrder_Reduce = () => import(/* webpackChunkName: "union-items" */ './pages/union/BusinessOrder_Reduce.vue');
const unionSmsService = () => import(/* webpackChunkName: "union-items" */ './pages/union/valueAddedService/smsService/smsService.vue');
const unionSmsServiceDistribution = () => import(/* webpackChunkName: "union-items" */ './pages/union/valueAddedService/smsService/smsDistribution.vue');

/***--------------end-------------**/

const UnionRouteItems = [
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
    {
        path: '/',
        component: HomeCloud_Union,
        children: [
            {path: '/unionValueAddedService_Sms', component: unionSmsService, name: 'unionSmsService'},
            {path: '/unionValueAddedService_Sms/sms_distribution', component: unionSmsServiceDistribution, name: 'unionSmsServiceDistribution'}
        ]
    },
];

/**
 *
 * @date: 20190528
 * @author: cyzhi
 * @description:服务商路由管理
 */

//HomeCloud_Service 服务商的左侧列表，公共页面
import HomeCloud_Service from './pages/HomeCloud_Service.vue';

//服务商下
//      我的账户
const myAccount = () => import(/* webpackChunkName: "service-items" */ './pages/service/myAccount');
//      运营商管理
const operatorManage = () => import(/* webpackChunkName: "service-items" */ './pages/service/operatorManage/Operator_Manage');
//      运营商管理下的员工
const operatorManageStaff = () => import(/* webpackChunkName: "service-items" */ './pages/service/operatorManage/Operator_Manage_Staff');
//      车场管理
const serverParkManage = () => import(/* webpackChunkName: "service-items" */ './pages/service/parkManage/Park_Manage');
//      车场管理下的员工
const serverParkManageStaff = () => import(/* webpackChunkName: "service-items" */ './pages/service/parkManage/Park_Manage_Staff');
//      车场管理下的查看详情
const serverParkManageDetail = () => import(/* webpackChunkName: "service-items" */ './pages/service/parkManage/Park_Manage_Detail');
//      子服务商管理
const subServiceManage = () => import(/* webpackChunkName: "service-items" */ './pages/service/subService/subservice_Manage');
const subServiceManageStaff = () => import(/* webpackChunkName: "service-items" */ './pages/service/subService/subservice_Manage_Staff');
//      资金流水
const serverMoneyRecord = () => import(/* webpackChunkName: "service-items" */ './pages/service/MoneyRecord');
//      车场分润报表
const serverNewUnionProfit = () => import(/* webpackChunkName: "service-items" */ './pages/service/NewUnionProfit');
//      人力资源  1---角色管理  2---员工管理
const serverRoleManage = () => import(/* webpackChunkName: "service-items" */ './pages/service/humanResources/RoleManage');
const serverEmployeeManage = () => import(/* webpackChunkName: "service-items" */ './pages/service/humanResources/EmployeeManage');

const ServerRouteItems = [
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/my_account', component: myAccount, name: 'myAccount'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/operator_manage', component: operatorManage, name: 'operatorManage',children:[
                    {path: '/operator_manage/operator_manage_staff', component: operatorManageStaff, name: 'operatorManageStaff'}
                ]}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/server_park_manage', component: serverParkManage, name: 'serverParkManage'},
            {path: '/server_park_manage/server_park_manage_staff', component: serverParkManageStaff, name: 'serverParkManageStaff'},
            {path: '/server_park_manage/server_park_manage_detail', component: serverParkManageDetail, name: 'serverParkManageDetail'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/subservice_manage', component: subServiceManage, name: 'subServiceManage'},
            {path: '/subservice_manage/subservice_manage_staff', component: subServiceManageStaff, name: 'subServiceManageStaff'}
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/serverTrade_MoneyRecord', component: serverMoneyRecord, name: 'serverMoneyRecord'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/serverStatistics_NewUnionProfit', component: serverNewUnionProfit, name: 'serverNewUnionProfit'},
        ]
    },
    {
        path: '/',
        component: HomeCloud_Service,
        children: [
            {path: '/serverResources_RoleManage', component: serverRoleManage, name: 'serverRoleManage'},
            {path: '/serverResources_EmployeeManage', component: serverEmployeeManage, name: 'serverEmployeeManage'},
        ]
    }
];
const routes = [
    ...CommonRouteItems,
    ...ParkRouteItems,
    ...UnionRouteItems,
    ...ServerRouteItems,
    ...CityRouteItems
];
export default routes;
