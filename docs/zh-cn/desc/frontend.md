# 前端项目架构
parkingos_cloud_vue 项目
前端项目使用vue+element-ui技术打造。

##  项目总结构：
```
parkingos-cloud-vue
│
└───build(webpack 构建相关，具体可看webpack文档，完全标准化写法)
│   
│   
└───config(构建环境变量配置，具体可看webpack文档，完全标准化写法)
│   
│   
└───src(项目源码)
│   
│   
└───theme（主题包，element主题包，可以通过修改这里的代码替换主题）
│   
│   
└───index.html(主页模版)

```

##  项目源码结构：

```
parkingos-cloud-vue
│
└───src
    │
    └───api(api地址配置及一些公用方法)
    │   
    │   
    └───assets(静态资源如图片等存放目录)
    │   
    │   
    └───common(公共css样式和js类)
    │   
    │   
    └───components（vue公共组件，比如滚动字，公共表格，公共高级搜索等）
    │   
    │   
    └───pages(具体页面，比如登陆/首页/统计等各个页面，其中LoginCloud.vue是登陆页面，登陆成果根据权限跳转其他页面)
    │   
    │   
    └───main.js(整个工程的入口js)
    │   
    │   
    └───App.vue(vue组建入口，main.js引入)    
    │   
    │   
    └───routes.js(路由文件，vue-router的标准写法，具体可看官方文档)
    
```
