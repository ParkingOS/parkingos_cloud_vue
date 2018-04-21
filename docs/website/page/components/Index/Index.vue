<template>
  <div class="index-container">
    <section class="banner">
      <content class="particles">
        <div class="mask" id="particles-js"></div>
        <p class="title">泊链云平台</p>
        <p class="subtitle">泊链开源云平台，助力您完成停车无人化</p>
        <div class="button-group">
          <!-- <router-link to="/basics/quickstart" class="button-start">快速开始</router-link> -->
          <router-link to="/basics/quickstart" class="button-doc">查看文档</router-link>
          <router-link to="/basics/quickstart" class="button-demo">查看文档</router-link>
        </div>
      </content>
    </section>
    <section class='feature'>
      <content>
        <div class="feature-article">
          <p class="title">全新技术实现，稳定可靠</p>
          <p class="subtitle">
            前后端完全分离，架构解藕合理。前端采用vue+vue-router技术栈实现spa单页面web系统。
            后端采用成熟的springmvc+myibatis技术框架实现，成熟稳定。
          </p>
        </div>
        <div class="img-div">
          <div>
            <img src="../../assets/images/spring.jpg" >
            <img src="../../assets/images/vue.jpg" >
          </div>
        </div>

      </content>
    </section>
    <section class='feature'>
      <content>
        <div class="img-div">
          <div>
            <img src="../../assets/images/onekey.jpg" >
          </div>
        </div>
        <div class="feature-article">
          <p class="title">简单易用，一键打包</p>
          <p class="subtitle">前端工程构建基于最新的webpack打包工具，后端采用maven作为包管理工具进行构建，都是一键构建输出包，直接部署服务器即可</p>
        </div>
      </content>
    </section>
    <section class='feature'>
      <content>
        <div class="feature-article">
          <p class="title">体验流畅，主题自由定制</p>
          <p class="subtitle">
            基于vue+vue-router的单页面程序，完全无刷新的流畅体验。另外界面色调图标等可以自定义，为自己选择更加贴合自己的主题
          </p>
        </div>
        <div class="img-div">
          <div>
            <img src="../../assets/images/eu.jpeg" >
          </div>
        </div>
      </content>
    </section>
  </div>
</template>

<script>
import particlesJS from '../../assets/js/particles/particles.js'
import option from '../../assets/js/particles/particles.json'

export default {
  name: 'Index',
  mounted() {
    particlesJS('particles-js', option)
  }
}
</script>
<style lang="sass">
.index-container {
  margin: 0!important;
  width: 100%!important;

  section {
    width: 100%;

    content {
      display: flex;
      align-items: center;
      margin: 0 auto;
      width: 100%;
      .img-div {
        margin-left: 20px;
        padding: 10px 10px;
        border-radius: 5px;

        img {
          width: 274px;
          margin: auto;
          display:block;
        }
      }

      &.particles {
        position: relative;
        height: 100%;

        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgb(0, 143, 76);
        }
      }
    }

    &.banner {
      height: 460px;
      background-color: rgb(0, 143, 76);

      content {
        flex-direction: column;

        .title {
          margin-top: 132px;
          font-size: 48px;
          color: #fff;
          letter-spacing: 0;
          line-height: 67px;
          z-index: 1;
          text-align: center;
        }
        .subtitle {
          font-size: 20px;
          color: #fff;
          letter-spacing: 0;
          line-height: 28px;
          z-index: 1;
          text-align: center;
        }
        .button-group {
          margin-top: 66px;
          z-index: 1;

          a {
            display: inline-block;
            margin-right: 10px;
            width: 180px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            color: #fff;
            border: 1px solid #3399ff;
            border-radius: 4px;
            font-size: 20px;

            &.button-start {
              background-color: #3399ff;
            }
          }
          .button-demo {
            display: none;
          }
        }
      }
    }

    &.feature {
      height: 413px;
      background-color: #FFF;

      content {
        height: 100%;
        margin: 0 100px;
        justify-content: space-between;
        align-items: center;
        .feature-article {
          width: 530px;
          .title {
            font-size: 20px;
            font-weight: bolder;
            line-height: 24px;
            color: rgb(0, 143, 76);
          }
          .subtitle {
            margin-top: 10px;
            font-size: 16px;
            color: #737373;
            line-height: 24px;
          }
        }

      }

      &:nth-child(even) {
        content {
          img {

          }
        }
      }

      &:nth-child(odd) {
        content {
          img {

          }
        }
      }
    }
  }
}

@media (max-width: 1400px) {
  .index-container {
    section {
      content {
        min-width: 0;
        width: auto;
      }
    }
  }
}

@media (max-width: 600px) {
  .index-container {
    section {
      content {
        min-width: 0;
      }

      &.banner {
        .particles {
          width: 100%;
          margin: 0;

          .title {
            margin: 80px 20px 0;
            font-size: 40px;
            line-height: 50px;
            text-align: center;
          }
          .subtitle {
            margin: 30px 20px 0;
            text-align: center;
            font-size: 18px;
            line-height: 24px;
          }
          .button-group {
            margin-top: 55px;

            .button-doc {
              display: none;
            }
            .button-start {
              display: none;
            }
            .button-demo {
              display: inline-block;
            }
          }
        }
      }

      &.feature {
        height: auto;

        &:last-child {

          content {
            border-bottom: none;
          }
        }

        content {
          margin: 0 8%;
          width: auto;
          height: auto;
          box-sizing: border-box;
          flex-direction: column;
          border-bottom: 1px solid #dcdcdc;

          .feature-article {
            width: 100%;

            .title {
              text-align: center;
              font-size: 24px;
            }

            .subtitle {
              margin-top: 3vw;
              margin-bottom: 10.6vw;
              font-size: 18px;
              line-height: 32px;
              color: #737373;
            }
          }

          img {
            margin-top: 12vw;
            margin-bottom: 10vw;
            height: 30vw;
          }
        }

        &:nth-child(even) {
          content {
            img {
              margin-left: 0;
              order: -1;
            }
          }
        }

        &:nth-child(odd) {
          content {
            img {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
