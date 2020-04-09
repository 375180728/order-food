<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div class="cart-container">
        <List item-layout="vertical">
          <ListItem v-for="item in this.orderList" :key="item.sid">
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
              :title="item.fName"
              :description="item.soc"
            />
            <div>
              <span>选择数量：</span>
              <InputNumber
                :max="item.fStock"
                :min="0"
                v-model="item.num"
                style="width: 60px"
                @on-change="orderFood(item)"
              ></InputNumber>
              <span style="margin-left: 30px">价格：</span>
              <span>{{ (item.fPrice * item.num).toFixed(2)}}</span>
            </div>
          </ListItem>
        </List>
        <div style="margin-top: 40px" v-show="JSON.stringify(orderList) !== '[]'">
          <Button type="primary" @click="submitOrder">去结算</Button>
        </div>
        <div>
          <h3 v-show="JSON.stringify(orderList) == '[]'">暂未点单</h3>
          
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations, mapState } from 'vuex';

export default {
  components: { HeadInfos },
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    ...mapMutations(['handleOrderList', 'handleFidList']),
    orderFood(item) {
      let scUid = this.userInfo.uid
    },
    deleteFood(item) {

    },
    submitOrder() {
      let params = []
      this.orderList.map((val) => {
        let obj = {
          scUid: this.userInfo.uid,
          scFid: val.scFid,
          num: val.num
        }
        params.push(obj)
      })
      this.$api.seller.order_food(params)
      .then(res => {
        if(res.flag) {
          this.$Message.success('生成订单成功')
          this.$router.push(`/order/pay`);
        } else {
          this.$Message.error(res.message)
        }
      })
    }
  },
  computed: {
    ...mapState(['orderList', 'fidList']),
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  },
};
</script>

<style lang="less">
.cart-container {
  .cart-item {
    margin-bottom: 20px;
    font-size: 18px;
    button {
      margin-left: 40px;
    }
  }
}
</style>
