import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

import {path} from './api';
import VueRouter from 'vue-router';
import routes from '../routes';
// create an axios instance
const router = new VueRouter({
    routes
});
const service = axios.create({
    baseURL: path, // api 的 base_url
    //timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        let token = sessionStorage.getItem('token');
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const ret = response.data;
        if (ret.validate != 'undefined' && ret.validate == '0') {
            //未携带令牌.重新登录
            setTimeout(() => {
                MessageBox.alert('未携带令牌,请重新登录!','登录超时提示',{
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        window.location.reload()
                        // router.push({
                        //     path:'/loginCloud'
                        // })
                    }
                })
            }, 150);
        } else if (ret.validate != 'undefined' && ret.validate == '1') {
            //过期.重新登录
            setTimeout(() => {
                MessageBox.alert('未携带令牌,请重新登录!','登录超时提示',{
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        window.location.reload()
                        // router.push({
                        //     path:'/loginCloud'
                        // })
                    }
                })
            }, 150);
        } else if (ret.validate != 'undefined' && ret.validate == '2') {
            //令牌无效.重新登录
            setTimeout(() => {
                MessageBox.alert('未携带令牌,请重新登录!','登录超时提示',{
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('comid');
                        localStorage.removeItem('groupid');
                        window.location.reload()
                        // router.push({
                        //     path:'/loginCloud'
                        // })
                    }
                })
            }, 150);
        }else{
            return response;
        }

        return response;
    },
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
        // response => {
        //   const res = response.data
        //   if (res.code !== 20000) {
        //     Message({
        //       message: res.message,
        //       type: 'error',
        //       duration: 5 * 1000
        //     })
        //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //       // 请自行在引入 MessageBox
        //       // import { Message, MessageBox } from 'element-ui'
        //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //         confirmButtonText: '重新登录',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //       }).then(() => {
        //         store.dispatch('FedLogOut').then(() => {
        //           location.reload() // 为了重新实例化vue-router对象 避免bug
        //         })
        //       })
        //     }
        //     return Promise.reject('error')
        //   } else {
        //     return response.data
        //   }
        // },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
