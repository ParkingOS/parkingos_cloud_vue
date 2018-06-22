# 云平台后台项目


在开始搭建之前，我们需要安装nodejs和npm

Node.js 就是运行在服务端的 JavaScript。
npm 是javascript包管理工具。
这里我们不展开讲，可以参考

<a href="http://www.runoob.com/nodejs/nodejs-tutorial.html">nodejs和npm的安装文档</a>


然后下载项目代码
```
git clone https://github.com/ParkingOS/parkingos_cloud_vue.git
```

打开src/api/api.js

修改云平台请求的服务器地址为后端项目里“云平台后台服务器模块”的服务地址，如下所示：

```
export const path = 'http://120.25.121.204:8080/cloud';  //这里需要改成自己的私有云地址
```

然后在根目录下运行(安装项目依赖的js包):

```
npm install
```

然后在根目录下运行构建命令:


```
npm run build
```

构建命令会生成一个user文件夹

文件夹下有3个html和一个static目录

其中login.html就是云平台的首页

static目录里存放js/css/images 等静态资源


将user的文件夹下的文件整个拷贝到tomcat的ROOT目录下
然后访问login.html库即可
