import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js


//登录
export function login() { 
  return fetch({
    url: api.login,
    method: 'get',//请求方法
    params:{
     
    }
  })
}
