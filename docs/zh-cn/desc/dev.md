# 主题定制和二次开发


##  主题定制：

主题定制主要是用户根据自己的特点定制一套颜色主题。
parkingos前端是一个以vue+ElementUI为基础开发的开源软件
主题定制上我们只要按照element的方式进行定制就可以了

主题定制是在工程parkingos_cloud_vue

1.首先安装element-theme主题定制工具

```
npm i element-theme -D

```
然后打开src/styles/element-variables.scss文件


```
/* Colors
-------------------------- */
$--color-white: #fff !default;
$--color-black: #000 !default;

$--color-primary: #2D3A4B !default;
$--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
$--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
$--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
$--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */


$--color-success: #67c23a !default;
$--color-warning: #e6a23c !default;
$--color-danger: #f56c6c !default;
$--color-info: #909399 !default;

$--color-success-light: mix($--color-white, $--color-success, 80%) !default;
$--color-warning-light: mix($--color-white, $--color-warning, 80%) !default;
$--color-danger-light: mix($--color-white, $--color-danger, 80%) !default;
$--color-info-light: mix($--color-white, $--color-info, 80%) !default;

$--color-success-lighter: mix($--color-white, $--color-success, 90%) !default;
$--color-warning-lighter: mix($--color-white, $--color-warning, 90%) !default;
$--color-danger-lighter: mix($--color-white, $--color-danger, 90%) !default;
$--color-info-lighter: mix($--color-white, $--color-info, 90%) !default;

$--color-text-primary: #303133 !default;
$--color-text-regular: #606266 !default;
$--color-text-secondary: #909399 !default;
$--color-text-placeholder: #c0c4cc !default;

/* parkingOS
--------------------------*/

$--parkingos-header-background: #2d3a4b !default;
$--parkingos-sidemenu-background: #545c64 !default;
$--parkingos-sidemenu-background-9: #434A50 !default; /* ecf5ff */
$--parkingos-datacenter-background: #393a3e !default;
...

```
其中：

$--color-primary  //是主题色

$--color-text-primary //文字颜色

$--parkingos-header-background  //顶部banner的颜色  

$--parkingos-sidemenu-background  //左边导航底色

$--parkingos-sidemenu-background-9 // 左边导航选中颜色

$--parkingos-datacenter-background // 数据中心底色


其他具体组件的主题可以在相应的位置修改,比如button
```
/* Button
-------------------------- */
$--button-font-size: 14px !default;
$--button-font-weight: $--font-weight-primary !default;
$--button-border-radius: $--border-radius-base !default;
$--button-padding-vertical: 12px !default;
$--button-padding-horizontal: 20px !default;

$--button-medium-font-size: 14px !default;
$--button-medium-border-radius: $--border-radius-base !default;
$--button-medium-padding-vertical: 10px !default;
$--button-medium-padding-horizontal: 20px !default;

$--button-small-font-size: 12px !default;
$--button-small-border-radius: #{$--border-radius-base - 1} !default;
$--button-small-padding-vertical: 9px !default;
$--button-small-padding-horizontal: 15px !default;

$--button-mini-font-size: 12px !default;
$--button-mini-border-radius: #{$--border-radius-base - 1} !default;
$--button-mini-padding-vertical: 7px !default;
$--button-mini-padding-horizontal: 15px !default;

$--button-default-color: $--color-text-regular !default;
$--button-default-fill: $--color-white !default;
$--button-default-border: $--border-color-base !default;

$--button-disabled-color: $--color-text-placeholder !default;
$--button-disabled-fill: $--color-white !default;
$--button-disabled-border: $--border-color-lighter !default;

$--button-primary-border: $--color-primary !default;
$--button-primary-color: $--color-white !default;
$--button-primary-fill: $--color-primary !default;

$--button-success-border: $--color-success !default;
$--button-success-color: $--color-white !default;
$--button-success-fill: $--color-success !default;

$--button-warning-border: $--color-warning !default;
$--button-warning-color: $--color-white !default;
$--button-warning-fill: $--color-warning !default;

$--button-danger-border: $--color-danger !default;
$--button-danger-color: $--color-white !default;
$--button-danger-fill: $--color-danger !default;

$--button-info-border: $--color-info !default;
$--button-info-color: $--color-white !default;
$--button-info-fill: $--color-info !default;

$--button-hover-tint-percent: 20% !default;
$--button-active-shade-percent: 10% !default;
```
修改完运行主题编译命令：

根目录下运行
```
et -b -c src/styles/element-variables.scss

```

然后重新运行build 部署parkingos_cloud_vue,查看结果


在本地调试的时候可以在parkingos_cloud_vue在根目录下分别运行：

```
et -b -c src/styles/element-variables.scss

```

```
npm run dev

```
来实时调试

##  导航icon定制：

parkingos云平台的logo和导航图标也是可以定制的。
logo和图标都是用iconfont来实现的，推荐使用
阿里的<a href="http://www.iconfont.cn/">iconfont</a>平台来进行定制.
我们的iconfont名字命名如下图所示：
<img src="assets/iconfont.png" >

在iconfont平台上新建项目，然后新建上面13个icon(命名要一样)，
然后点击下载到本地，解压。然后将里面的：

iconfont.css

iconfont.eot

iconfont.svg

iconfont.ttf

iconfont.woff

这几个文件放到parkingos_cloud_vue/src/assets/下

覆盖即可。

##  二次开发：

parkingos 后端采用标准的spring-mvc 开发
http请求入口包是：

parkingos.com.bolink.actions

二次开发的时候到这里修改或者添加spring controller 即可。


parkingos 前端采用vue+ElementUI作为框架开发。


要添加和修改页面都非常简单
比如添加页面只要修改底下几个文件夹即可
```
parkingos-cloud-vue
│
└───src
    │   
    │   
    └───pages(新添加一个.vue文件作为页面)
    │   
    │   
    └───routes.js(路由配置文件里面添加新的路由j)

```

然后再在src/pages里的HomeCloud开头的vue文件修改添加相应的导航，
使菜单点击到对应的vue即可

vue的编写可以直接参考<a href="https://vuejs.org/">vue官网</a>
