import axios from 'axios'
import Element from 'element-ui'
import store from './store'
import router from './router'

axios.defaults.baseURL="http://localhost:80"

axios.interceptors.request.use(config=>{
    return config
})
axios.interceptors.response.use(response=>{
    let res = response.data;

    if (res.code===200){
        return response
    }else {
        Element.Message.error('请求错误，请修改后重试',{duarr: 3*1000})

        return Promise.reject(response.data.msg)
    }
},
    error => {

    if (error.response.data){
        error.message=error.response.data.msg
    }

        if (error.response.state===401){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        Element.Message.error(error.message,{duarr: 3*1000})
        return Promise.reject(error)
    }

)