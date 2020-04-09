<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div>
        <div>
          <div class="seller-info-container">

          </div>
          <div class="seller-action-container">

          </div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <span style="line-height: 32px" v-show="JSON.stringify(hotFoodList) !== '[]'">
            本店推荐：
          </span>
          <span v-show="this.sellerInfo.flag == '0'" style="color: red">暂未营业</span>
          <span v-show="JSON.stringify(hotFoodList) == '[]'">商家暂无推荐</span>
          <span style="float: right">
            <Button type="primary" @click="collectSeller">收藏</Button>
          </span>
        </div>
        <div class="hot-food-container">
          <Card style="width: 28%;" v-for="item in hotFoodList" :key="item.sid">
            <div>
              <span style="">菜名: </span>
              <span style="margin-right: 15px; color: grey">{{ item.fName }}</span>
              <span style="margin-right: 15px">剩余:{{ item.fStock }}</span>
              <span style="margin-right: 15px">价格:{{ item.fPrice }}</span>
              <span>销量:{{ item.fsv }}</span>
            </div>
            <img src="../assets/bg.jpg" alt="">
            <div class="food-action">
              <div>
                <span>菜品简介：</span>
                <span>{{ item.fIntroduce }}</span>
              </div>
              <div>
                <span>选择数量：</span>
                <InputNumber :max="item.fStock" :min="0" v-model="item.orderNum" style="width: 60px" @on-change="orderFood(item)"></InputNumber>
              </div>
              <!-- <Button icon="ios-add" type="success" shape="circle" @click=""></Button> -->
            </div>
          </Card>
        </div>
        <Divider></Divider>
        <List item-layout="vertical">
          <ListItem v-for="item in foodList" :key="item.sid">
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
              :title="item.fName"
              :description="item.soc"
            />
            <template slot="action">
              <li><span>价格：</span>{{ item.fPrice }}</li>
              <li><span>销量：</span>{{ item.fsv }}</li>
              <li><span>剩余：</span>{{ item.fStock }}</li>
            </template>
            <div>
              <span>选择数量：</span>
              <InputNumber :max="item.fStock" :min="0" v-model="item.orderNum" style="width: 60px" @on-change="orderFood(item)"></InputNumber>
            </div>
          </ListItem>
        </List>
        <Page :total="total" show-total style="margin-top: 15px" :page-size="pageSize" @on-change="pageChange" :current="currentPage"/>
        <Divider></Divider>
        <div style="margin-top: 30px">
          <div>
            评论： 
          </div>
          <List item-layout="vertical">
          <ListItem v-for="item in evaluateList" :key="item.eid">
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
              title="匿名"
              :description="item.content"
            />
            <template slot="action">
              <li>
                <span>评分：</span>
                <span>{{ item.score }}</span>
              </li>
            </template>
          </ListItem>
        </List>
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
import { mapMutations, mapState } from 'vuex';

export default {
	components: { HeadInfos },
	data () {
		return {
      sid: 0,
      foodList: [],
      hotFoodList: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      userInfo: null,
      fidList: [],
      orderList: [],
      evaluateList: [],
      sellerInfo: {}
		}
  },
  methods: {
    ...mapMutations(['handleOrderList', 'handleFidList']),
    getFoodList(currentPage) {
      this.$api.seller.get_food_list({
        sid: this.sid,
        page: currentPage,
        size: this.pageSize,
      })
      .then(res => {
        this.foodList = res.list
        this.total = res.total
        this.foodList.map((val) => {
          val.orderNum = 0
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    getSellerInfo() {
      this.$api.seller.get_seller_info({
        sid: this.sid,
      })
      .then(res => {
        this.sellerInfo = res.atWillBean
      })
      .catch(err => {
        console.log(err)
      })
    },
    getHotFood() {
      this.$api.seller.get_hot_food({
        sid: this.sid
      })
      .then(res => {
        this.hotFoodList = res.list
        this.hotFoodList.map((val) => {
          val.orderNum = 0
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    submitFood() {

    },
    pageChange(i) {
      this.currentPage = i
      this.getFoodList(this.currentPage)
    },
    orderFood(item) {
      let scUid = this.userInfo.uid
      let params = {
        scFid: item.fid,
        num: item.orderNum,
        scUid: scUid,
        fName: item.fName,
        fPrice: item.fPrice,
        fStock: item.fStock
      }
      if(this.fidList.indexOf(item.fid) == -1) {
        this.fidList.push(item.fid)
        this.handleFidList(this.fidList)
        this.orderList.push(params)
      } else {
        this.orderList.forEach((val) => {
          if(val.scFid == item.fid) {
            val.num = item.orderNum
          }
        })
      }
      this.handleOrderList(this.orderList)
      // this.orderList.map((e) => {
        // if(e.scFid != item.fid) {
          // this.orderList.push(params)
        // }
        // e.keys(scFid)
        // console.log(Object.keys(e))
      // })
      // console.log(this.orderList)

      // this.$api.seller.order_food(params)
      // .then(res => {
      //   this.$Message.success(res.message)
      //   console.log(res)
      // })
    },
    collectSeller() {
      let params = {
        ccUid: this.userInfo.uid,
        ccSid: this.sid
      }
      this.$api.seller.collect_seller(params)
      .then(res => {
        if(res.flag) {
          this.$Message.success(res.message)
        } else {
          this.$Message.error('您已收藏，请勿重复收藏')
        }
        console.log(res)
      })
    },
    getEvaluate() {
      this.$api.seller.get_evaluate({
        sid: this.sid,
        page: 1,
        size: 100
      })
      .then(res => {
        this.evaluateList = res.list
        console.log(res)
      })
    }
  },
  created() {
    this.sid = location.pathname.split('/')[2]
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if(this.userInfo == null) {
      location.pathname = '/'
    }
    this.getFoodList()
    this.getSellerInfo()
    this.getHotFood()
    this.getEvaluate()
  }
}
</script>

<style lang="less">
.hot-food-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  margin-bottom: 40px;
  .food-action {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
  }
  img {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
