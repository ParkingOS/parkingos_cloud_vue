export const { AUTH_ID,AUTH_ID_ADMIN, showParkItem_const,
    AUTH_ID_UNION,showUnionItem_const,
    showShopItem_const,AUTH_ID_SHOP,
    showBossItem_const,
    AUTH_ID_SERVER,showServerItems_const,
    AUTH_ID_CITY,showCityItems_const,
    ROLE_ID }  = process.env.NODE_ENV == 'production' ? require('./const_yun'): require('./const_test');