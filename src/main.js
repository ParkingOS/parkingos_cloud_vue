import '../theme/index.css'; //主题色
// import './common/css/index.css'  //本地色

//全局引入iconfont
import './assets/iconfont/iconfont.css'
import './assets/shop-iconfont/iconfont.css'
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import routes from './routes';
import common from './common/js/common';
import axios from 'axios';
import store from './store';
import BaiduMap from 'vue-baidu-map';
import './styles/element-variables.scss'; // global css
import './styles/index.scss'; // global css
import './styles/common-style.scss'
import './common/js/const.js';
import 'babel-polyfill'
import QRCode from 'qrcode';
import VueClipboard from 'vue-clipboard2'
import scroll from 'vue-seamless-scroll';
Vue.use(scroll)
Vue.use(QRCode)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(BaiduMap,{
  ak:'Ona5elzlpSrwOeeAI1k0EE2yHtpLoxlN'
});
Vue.use(VueClipboard)
Vue.prototype.$axios=axios;
Vue.prototype.$qs=require('qs');

Vue.prototype.QRCode=QRCode

Vue.prototype.common=common;
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    //NProgress.start();
    let state = store.state.app.screenPower;
    if (to.path == '/loginCloud') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/loginCloud') {
        next({ path: '/loginCloud' });
    }
    else if(!(from.path == '/') && to.path == '/dataScreen'){

    }
    else {
        next();
    }
});

var vue1 = new Vue({
    store: store,
  router,
  render: h => h(App)
})
vue1.$mount('#app');


