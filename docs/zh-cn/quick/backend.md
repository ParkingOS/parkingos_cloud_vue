# 后端模块列表
要运行云平台，需要运行以下几个模块:
现在后台使用的jdk都是1.7
1.parkingos_cloud_vue_server(云平台后台模块)

2.parkingos_cloud_api(sdk上报接口服务)

3.parkingos_anlysis(统计分析模块)


## 首先安装数据库依赖

### 1.mongodb

  mongodb在parkingos中被用来存储图片（包括出入场图片）
  mongodb在社区应用非常广泛，这里就不具体描述安装过程，推荐用户可以去<a href="https://www.mongodb.com/">mongodb官网</a>或者<a href="http://www.runoob.com/mongodb/mongodb-tutorial.html">mongodb中文文档</a>查看

### 2.postgres

  postgres是一个专业的关系型数据库，parkingos的数据库采用postgres来作为数据存储。postgres也是一个被广泛应用的关系型数据库。
  社区文档非常全面。这里也不在描述安装过程。用户可以到<a href="https://www.postgresql.org">官网</a>或者<a href="http://www.postgres.cn/docs/9.6/index.html">postgres中文</a>文档网站参考



## java包管理工具maven配置。
  parkingos后端统一采用java语言开发，使用maven来管理jar包依赖。maven包的安装这里就不描述了，需要的用户可以自行搜索，非常简单。
  安装完maven后，需要增加泊链联盟的私有仓库来获取一些私有jar包。设置自己的maven根目录下的conf/settings.xml，增加一个profile和镜像:

  mirror:

  ```
  <mirror>
      <id>local_mirror</id>
      <mirrorOf>*</mirrorOf>
      <name>local_mirror</name>
      <url>http://106.75.7.55:8081/nexus/content/groups/public/</url>
  </mirror>
  ```
  profile:

  ```
  <profile>
     <id>nexus</id>
     <repositories>
             <repository>
              <id>thirdparty</id>
              <url>http://106.75.7.55:8081/nexus/content/repositories/thirdparty/</url>
      </repository>
      <repository>
              <id>local_nexus_releases</id>
              <url>http://106.75.7.55:8081/nexus/content/repositories/releases/</url>
      </repository>
      <repository>
              <id>local_nexus_snapshots</id>
              <url>http://106.75.7.55:8081/nexus/content/repositories/snapshots/</url>
      </repository>
     </repositories>
</profile>

  ```


## 云平台后台服务器模块安装

首先下载parkingos_cloud_vue_server工程(需要安装git)

```
git clone https://github.com/ParkingOS/parkingos_cloud_vue_server.git
```

首先创建数据库：

zldetc,然后创建用户名和密码，然后把postgres20180420/pgv3.0_20180420.dump导入zldetc数据库。然后修改数据库配置：

src\main\resources\proxool.xml:

```
<alias>master</alias>
  <driver-url>jdbc:postgresql://zlddb.tq.cn:5432/zldetc</driver-url>
  <driver-class>org.postgresql.Driver</driver-class>
  <driver-properties>
      <property name="user" value="postgres" />
      <property name="password" value="1234" />
  </driver-properties>
```
</br></br></br>
<font color=red>数据库保留着用户登录信息以及订单等信息。没有必要的话不要直接操作数据库。
但是对于这一套不熟悉的人很容易操作失误。这里列出了最容易出错的地方。
刚开始搭建平台的时候,不知道对应的是正式还是测试平台造成的错误。首先把org_city_merchants
这个表里的数据删除。其次把user_info_tb数据删除。然后重新登录会让你重新录入厂商信息。
</font>



修改基本配置文件：
src\main\resources\config.properties:

```
MONGOADDRESS=s.zldmongodb.com:27017   //mongodb地址 
IMAGEURL=http://120.25.121.204:8080/cloud  //本服务地址,比如左边是工程部署到120.25.121.204:8080
UNIONIP=https://s.bolink.club/unionapi/ //泊链的api地址
UNIONVALUE=yun   //这个对应的是小程序登录的时候的前缀  如果需要使用小程序，需要改成自己的前缀，把前缀告诉我们，泊链这边配置跳转。
UNIONADMIN=1001   //填1001就行
SHOPOID=10      //不用修改
TICKETURL=http://test/yun.bolink.club/zld/qr/c/   //api服务地址 后台优惠券使用
FIXCODEURL=http://test/yun.bolink.club/zld/qr/d/  //api服务地址  后台固定码使用
```

修改完直接在根目录下执行mvn package
然后将在target目录下生成的war包放到自己的tomcat即可。</br></br></br>
<font color=red>备注:刚从git上来下来的代码config文件都是对应测试平台。config文件根据需要进项修改。
</font>


## sdk上报api服务安装
这个项目主要是用来接收从车场sdk发送到云平台里的服务，上面的TICKETURL即指这个服务地址
api服务地址在：
https://github.com/ParkingOS/ParkingOS_cloud
执行
```
git clone https://github.com/ParkingOS/ParkingOS_cloud.git
```
下载工程然后打开

parkingos_cloud_api目录

修改数据库配置成刚安装的数据库配置
src\main\resources\proxool.xml:

```
<alias>master</alias>
  <driver-url>jdbc:postgresql://zlddb.tq.cn:5432/zldetc</driver-url>
  <driver-class>org.postgresql.Driver</driver-class>
  <driver-properties>
      <property name="user" value="postgres" />
      <property name="password" value="1234" />
  </driver-properties>
```

修改配置文件
src\main\filters\yun.properties

```
server.domain=yun.bolink.club  //api域名地址
server.unionIp=https://s.bolink.club/unionapi/ //泊链api地址
cloud.unionId=200002   //泊链联盟id
cloud.unionKey=EA2  //泊链密钥
wx.redirect_url=yun.bolink.club  //api域名地址
wx.appId=xxx     //微信appid
wx.appSecret=yyy   //微信appkey
log.dir=${catalina.home}/logs/upp.log
wx.local=0
pg.port=5432  //数据库端口

```

修改完直接在根目录下执行mvn package
然后将在target目录下生成的war包放到自己的tomcat即可。
这时候已经可以通过泊链的sdk把数据上传到自己的私有云,在sdk初始化的时候填写

cloud_addr： api服务地址

cport： api服务端口

具体的可以看文档：
<a href="https://www.kancloud.cn/bolink/sdk/465620">sdk对接文档</a>


### 统计分析模块安装
统计分析模块是用来统计车场相关统计数据的一个模块。
这个模块在https://github.com/ParkingOS/ParkingOS_cloud下的parkingos_anlysis目录下的一个
anlysispark.rar包。
解压anlysispark.rar



到这里搭建云平台所需要的后端服务都已经搭建完毕
