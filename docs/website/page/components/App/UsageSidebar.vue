<template>
  <div class="usagesidebar-container">
    <aside class="usagesidebar-sidebar sidebar">
      <div class="sidebar-item-group">
        <div class="sidebar-item-group-title bold">快速开始</div>
        <template v-for="item in basics">
          <div class="sidebar-item" :class="{'active': active === item.en}" :key="item.en">
            <router-link :to="`/quick/${item.type && item.type == 'child'? 'others/':''}${item.en.toLowerCase()}`">{{ item.zh }}</router-link>
          </div>
        </template>
      </div>
      <div class="sidebar-item-group">
        <div class="sidebar-item-group-title bold">项目结构说明</div>
        <template v-for="item in android">
          <div class="sidebar-item" :class="{'active': active === item.en}" :key="item.en">
            <router-link :to="`/desc/${item.en.toLowerCase()}`">{{ item.zh }}</router-link>
          </div>
        </template>
      </div>

    </aside>
    <content>
      <template v-if="isNative(this.$route.name)">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
      <template v-else>
        <markdown :article="this.$route.params.article">
        </markdown>
      </template>
    </content>
  </div>
</template>

<script>
import Markdown from '../Components/Markdown.vue';

export default {
  name: 'UsageSidebar',
  components: {
    markdown: Markdown,
  },
  computed: {
    // isPhoneShow() {
    //   return (
    //     this.$route.matched[0].path === '/components/:component' &&
    //     this.$route.path !== '/components/rem'
    //   );
    // },
  },

  data() {
    return {
      active: '',
      basics: [
        {
          en: 'backend',
          zh: '后端项目构建',
        },
        {
          en: 'frontend',
          zh: '前端项目构建',

        },
      ],
      android: [
        {
          en: 'be',
          zh: '后端项目结构',
        },
        {
          en: 'fe',
          zh: '前端项目结构',
        },
        {
          en: 'db',
          zh: '数据库表结构',
        },
        {
          en: 'dev',
          zh: '二次开发',
        },
      ],


    };
  },
  watch: {
    $route() {
      this.highlight();
    },
  },
  created() {
    // if (
    //   /AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
    //   /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
    //     navigator.userAgent
    //   )
    // ) {
    //   window.location.href = 'https://wdfe.github.io/wdui/demo.html';
    // }
    this.highlight();
  },
  methods: {
    highlight() {
      console.log(this.$route.name);
      if (this.$route.name !== 'QuickStart') {
        this.active = this.$route.params.article;
      } else {
        this.active = this.$route.name;
      }
    },
    isNative(name) {
      const nativeList = ['QuickStart','Index'];
      return ~nativeList.indexOf(name);
    },
  },
};
</script>

<style lang="sass">
  .usagesidebar-container {
    .phone {
      flex: none;
      align-self: stretch;
      position: relative;
      padding-top: 40px;
      padding-right: 40px;
      background-color: #FFF;
      width: 370px; // background-image: url('../../assets/images/iphone.png');
      background-size: 370px;
      background-position: 0 40px;
      background-repeat: no-repeat;

      iframe {
        position: absolute;
        border: none;
        top: 132px;
        left: 24px;
        width: 322px;
        height: 571px;
      }
    }
  }
</style>
