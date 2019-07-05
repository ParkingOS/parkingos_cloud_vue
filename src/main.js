//引入全局样式
import './styles/index.scss'
import './styles/Home.scss'
import './styles/common-style.scss'


//全局引入自定义iconfont
import './assets/iconfont/iconfont.css'
import './assets/shop-iconfont/iconfont.css'

//引入公用组件
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import routes from './router/routes';
import {path,path2} from './api/api';
import common from './common/js/common';
import axios from 'axios';
import store from './store';

import './common/js/const.js';
import 'babel-polyfill'
import QRCode from 'qrcode';
import VueClipboard from 'vue-clipboard2'
import scroll from 'vue-seamless-scroll';
import math from 'mathjs'
import jQuery from 'jquery'
Vue.use(scroll)
Vue.use(QRCode)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueClipboard)
Vue.prototype.$axios=axios;
Vue.prototype.$qs=require('qs');
Vue.prototype.$math = math;
Vue.prototype.QRCode=QRCode
Vue.prototype.common=common;

Vue.prototype.$post=jQuery.post;
Vue.prototype.$ajax=jQuery.ajax;
Vue.prototype.$getJSON=jQuery.getJSON;
Vue.prototype.$extend=jQuery.extend;

const router = new VueRouter({
    routes
});

/**
 *
 * @date 20190404
 * @author: cyz
 * @describe:百度流量统计
 */

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c7e225d3f79576d85cfd59703506510f";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

router.beforeEach((to, from, next) => {

    //把页面推送给百度统计
    if (_hmt) {
        if (to.path) {
            // eslint-disable-next-line
            _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        }
    }

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
        next({ path: '/loginCloud' });
    }
    else {
        if((from.path == '/') && to.path == '/dataScreen'){
            axios.get(path+'/bigscreen/getstate',{params:{
                    'comid':sessionStorage.getItem('comid')
                }}).then((response)=> {
                    if(response.status == 200){
                        let data = response.data;
                        if(data.state ==0){
                            next({ path: '/loginCloud' });
                        }else{next();}
                    }
            }).catch((error)=>{
                alert('请求错误')
            })
        }else{
            next();
        }

    }
});

var vue1 = new Vue({
    store: store,
  router,
  render: h => h(App)
})
vue1.$mount('#app');


