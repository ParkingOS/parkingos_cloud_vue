import 'assets/css/monitor.css';
import 'assets/css/bootstrap.css';
import 'assets/css/components.css';
/*定义全局变量*/
import Vue from 'vue';
import MoniterApp from './MonitorApp';
import ElementUI from 'element-ui';
import common from './common/js/common';
import axios from 'axios';
import "babel-polyfill"
Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.prototype.$qs=require('qs');
Vue.prototype.common=common;
var path = "";
new Vue({
  render: h => h(MoniterApp)
}).$mount('#app');
