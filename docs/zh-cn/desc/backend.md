# 后端项目结构
parkingos_cloud_vue_server 项目
新的parkingos后端使用成熟的springmvc+myibatis来实现
项目的源码结构和说明大概如下，并不是特别复杂

```
parkingos.com.bolink  
│
└───actions(spring controller类，请求的入口)
│   
│   
└───dao(dao层，写后台服务的都懂)
│   
│   
└───enums（枚举类）
│   
│   
└───filter（过滤器，跨域头添加在这里实现）
│   
│   
└───models(模型包，数据类)
│   
│   
└───qo(分页，高级查询等数据库查询辅助类)
│   
│   
└───service(service层，写后台服务的都懂)
│   
│   
└───utils(工具类)
    │   
    │   
    └───payutils（支付相关工具类）

```

基本上熟悉spring+myibatis的技术人员都可以看懂。

另外泊链在myibatis基础上封装链一个CommonDao来减少
一些xml配置的编写，二次开发的同学也可以继续使用xml写sql的方式来
实现对数据库的查询。
