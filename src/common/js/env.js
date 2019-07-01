/*
 * 配置编译环境和线上环境之间的切换
 * 以及静态变量
 * baseUrl: 域名地址
 *
 */
let path = '';
let path2 = '';
let server = '';
let bolinkPath ='';
let percision = '';
if(process.env.NODE_ENV == 'development'){ //开发环境
    path = "http://test.bolink.club/cloud";
    path2 = "https://test.bolink.club";
    server = "http://test.bolink.club";
    bolinkPath = "https://beta.bolink.club/web"
    percision = 5;
}else if(process.env.NODE_ENV == 'test'){  //测试环境地址
    path = "http://test.bolink.club/cloud";
    path2 = "https://test.bolink.club";
    server = "http://test.bolink.club";
    bolinkPath = "https://beta.bolink.club/web"
    percision = 5;
} else if (process.env.NODE_ENV == 'production') { //生产环境走的地址
    path = "http://yun.bolink.club/cloud";
    path2 = "https://yun.bolink.club";
    server = "http://yun.bolink.club";
    bolinkPath = "https://s.bolink.club/web"
    percision = 2;
}else{
    path = "http://test.bolink.club/cloud";
    path2 = "https://test.bolink.club";
    server = "http://test.bolink.club";
    bolinkPath = "https://beta.bolink.club/web"
}
module.exports = {
    path,
    path2,
    server,
    bolinkPath,
    percision
}