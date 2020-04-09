const axios = window.axios
const user = {
  //用户注册
  user_register (params) {
    return axios.post(`/api/user/register`, params)
  },
  //商家注册
  seller_register (params) {
    return axios.post(`/api/seller/register`, params)
  },
  get_order_list(params) {
    return axios.get(`/api/user/lookOrder`, {
      params: params
    })
  },
  access_arival(params) {
    return axios.put(`/api/user/updateUserOrderFlag`, params)
  },
  add_rate(params) {
    return axios.post(`/api/user/UserEvaluate`, params)
  },
  search_collect_seller(params) {
    return axios.get(`/api/user/lookCollectSeller`, {
      params: params
    })
  }
}

export default user