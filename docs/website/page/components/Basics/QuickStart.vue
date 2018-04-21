<template>
  <div class="intro-container specification-container">
    <p class="title">  </p>

    <section>
      <p class="title">ParkingOS简介</p>
      <p>
        <br />
        <p>ParkingOS是由泊链联盟联合多家停车厂商开发并且开源的帮助停车场实现无人化的车场云平台 </p>
          <br />
        </p>
        <p>
        <span class="title">1.系统运行环境:</span>
            <ol>
              <li>windows/linux</li>
              <li><a href="https://www.postgresql.org/">postgres</a></li>
              <li><a href="https://www.mongodb.com/">mongodb</a></li>
              <li><a href="http://tomcat.apache.org/">tomcat</a>等javaweb容器</li>
            </ol>

        <span class="title">2.系统构成模块/工程:</span>
            <ol>
              <li><a href="https://github.com/ParkingOS/parkingos_cloud_vue">parkingos_cloud_vue</a>(云平台前端工程)</li>
              <li><a href="https://github.com/ParkingOS/parkingos_cloud_vue_server">parkingos_cloud_vue_server</a>(云平台后端工程)</li>
              <li><a href="https://github.com/ParkingOS/ParkingOS_cloud/tree/master/parkingos_cloud_api">parkingos_cloud_api</a>(云平台sdk上报接口)</li>
              <li><a href="https://github.com/ParkingOS/ParkingOS_cloud/tree/master/parkingos_anlysis">parkingos_anlysis</a>(定时统计模块)</li>
            </ol>

            <span class="title">3.parkingos架构图:</span>
            <div style="margin:50px 0px;border:1px solid #000;border-radius:2px;" >
            <img src="../../assets/images/parkingos.jpeg" >
            </div>
            <span class="title">4.私有云平台搭建:</span>
                <ol>
                  <li>点击<a href="#/quick/backend">后端项目搭建说明</a>查看云平台后端搭建</li>
                  <li>点击<a href="#/quick/backend">前端项目搭建说明</a>查看云平台前端搭建</li>
              </ol>
          <span class="title">4.云平台技术架构介绍:</span>
              <ol>
                <li>点击查看<a href="#/desc/be">后端技术架构</a></li>
                <li>点击查看<a href="#/desc/fe">前端技术架构</a></li>
                <li>点击查看<a href="#/desc/db">表结构说明</a></li>
             </ol>
      </p>
    </section>

  </div>
</template>

<script>
import Markdown from '../Components/Markdown.vue';

export default {
  name: 'GetStarted',
  data() {
    return {
      currDevOS: 'macos',
      currTargetOs: 'web',
      devOSList: [
        {
          id: 'macos',
          name: 'macOS',
        },
        {
          id: 'windows',
          name: 'Windows',
        },
        {
          id: 'linux',
          name: 'Linux',
        },
      ],
      targetOSList: [
        {
          id: 'web',
          name: 'Web',
        },
        {
          id: 'ios',
          name: 'iOS',
        },
        {
          id: 'android',
          name: 'Android',
        },
      ],
    };
  },
  computed: {
    article() {
      return `basic-quick-${this.currDevOS}-${this.currTargetOs}`;
    },
  },
  components: {
    markdown: Markdown,
  },
  methods: {
    changeDevOS(e) {
      this.currDevOS = e;
    },
    changeTargetOS(e) {
      this.currTargetOs = e;
    },
  },
};
</script>

<style lang="sass">
.title{
  font-weight: bold;
}
.os-list {
  display: inline-block;
  .active {
    background-color: #3898FC;
    color: #fff;
  }
  li {
    button {

      margin: 3px;
      padding: 6px;
      background-color: #fff;
      border:1px solid #3898FC;
      border-radius: 5px;
      cursor: pointer;
      color: #3898FC;
      font-size: 18px;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

      &:focus {
        outline: 0;
      }
    }
    display: inline-block;
  }
}

.intro-container {

  section {
    ol {

      margin: 10px 20px;
      list-style-type: decimal;
      a {
        color: #175199;
        text-decoration: underline;
      }
    }

  }
}

</style>
