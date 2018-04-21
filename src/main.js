import '../theme/index.css'; //主题色
// import './common/css/index.css'  //本地色
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
//
import VueRouter from 'vue-router';
import routes from './routes';
//
import common from './common/js/common';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map';
import './styles/element-variables.scss'; // global css
import './styles/index.scss'; // global css
import './common/js/const.js';
import "babel-polyfill"
import QRCode from 'qrcode'

Vue.use(QRCode)


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(BaiduMap,{
  ak:'Ona5elzlpSrwOeeAI1k0EE2yHtpLoxlN'
});

Vue.prototype.$axios=axios;
Vue.prototype.$qs=require('qs');

Vue.prototype.QRCode=QRCode

Vue.prototype.common=common;

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/loginCloud') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/loginCloud') {
    next({ path: '/loginCloud' });
  } else {
    next();
  }
});


var vue1 = new Vue({
  router,
  render: h => h(App)
})
vue1.$mount('#app');
