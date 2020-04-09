const axios = window.axios
const auth = {
  //用户登录
  user_login (params) {
    return axios.post(`/api/user/login`, params)
  },
  //商家登录
  seller_login (params) {
    return axios.post(`/api/seller/login`, params)
  }
}

export default auth 