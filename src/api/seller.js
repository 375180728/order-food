import base from './base.js'
const axios = window.axios
const food = {
  get_seller_list() {
    return axios.get(`/api/HomePageController/Recommend`)
  },
  get_home_hot_food() {
    return axios.get(`/api/HomePageController/HotFoodRecommend`)
  },
  get_good_seller() {
    return axios.get(`/api/HomePageController/goodSeller`)
  },
  get_seller_info(params) {
    return axios.get(`/api/SellerPage/lookSeller`, {
      params: params
    })
  },
  get_food_list(params) {
    return axios.get(`/api/SellerPage/lookAllFood`, {
      params: params
    })
  },
  get_hot_food(params) {
    return axios.get(`/api/SellerPage/LookSellerHot`, {
      params: params
    })
  },
  order_food(params) {
    return axios.post(`/api/SellerPage/addToCar`, params)
  },
  get_order_info(params) {
    return axios.get(`/api/SellerPage/lookOder`, {
      params: params
    })
  },
  get_rest_money(params) {
    return axios.get(`/api/SellerPage/lookUserMoney`, {
      params: params
    })
  },
  add_remark(params) {
    return axios.post(`/api/SellerPage/addRemarks`, params)
  },
  pay_order(params) {
    return axios.put(`/api/SellerPage/payOrder`, params)
  },
  collect_seller(params) {
    return axios.post(`/api/SellerPage/addCollect`, params)
  },
  search_collect_num(params) {
    return axios.get(`/api/SellerPage/lookUserMoney`, {
      params: params
    })
  },
  search_seller(params) {
    return axios.post(`/api/HomePageController/searchSeller`, params)
  },
  search_food(params) {
    return axios.post(`/api/HomePageController/searchFood`, params)
  },
  change_flag(params) {
    return axios.put(`/api/seller/changeFlag`, params)
  },
  get_all_food(params) {
    return axios.get(`/api/food/findAllFood`, {
      params: params
    })
  },
  update_food(params) {
    return axios.put(`/api/food/updateTwo`, params)
  },
  delete_food(params) {
    return axios.post(`/api/food/deleteFood`, params)
  },
  set_hot_food(params) {
    return axios.post(`/api/food/saveHotFood`, params)
  },
  cancel_hot_food(params) {
    return axios.put(`/api/food/cancelHotFood`, params)
  },
  add_food(params) {
    return axios.post(`/api/food/upload`, params)
  },

  get_order_list(params) {
    return axios.get(`/api/seller/lookSellerOrder`, {
      params: params
    })
  },
  start_send(params) {
    return axios.put(`/api/seller/updateOrderFlag`, params)
  },

  get_evaluate(params) {
    return axios.get(`/api/seller/sellerLookEvaluate`, {
      params: params
    })
  }
}

export default food
