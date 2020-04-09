<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div class="user-info">
        <Card>
          <h3>个人信息：</h3>
          <div>
            <span>送达地址：</span>
            <span>
              {{ this.userInfo.address }}
            </span>
          </div>
          <div>
            <span>姓名：</span>
            <span
              >{{ this.userInfo.name
              }}{{ this.userInfo.sex == '女' ? '（女士）' : '（先生）' }}</span
            >
            <span> {{ this.userInfo.phone }}</span>
          </div>
          <div>
            <span>余额：</span>
            <span>{{ this.restMoney }}</span>
          </div>
        </Card>
      </div>
      <div class="food-info">
        <Card>
          <h3>菜单：</h3>
          <div style="margin-top: 10px">
            <span
              >{{this.payInfo ? this.payInfo.ospName : '' }} ({{this.payInfo ? this.payInfo.oAddress : ''}})</span
            >
          </div>
          <div>
            <List item-layout="vertical">
              <ListItem v-for="item in payInfo.list" :key="item.sid">
                <ListItemMeta
                  avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                  :title="item.mfName"
                  :description="item.soc"
                />
                <template slot="action">
                  <li><span>份数：</span>x{{ item.mNum }}</li>
                  <li><span>总价：</span>{{ item.allPrice }}</li>
                </template>
              </ListItem>
            </List>
          </div>
          <div></div>
        </Card>
      </div>
      <div class="remark-info">
        <Card>
          <div>
            <span>备注信息：</span>
            <Input v-model="remark" style="width: 400px" placeholder="如少放辣等..."></Input>
          </div>
        </Card>
      </div>
      <div class="pay-action">
        <Button type="primary" @click="pay">支付</Button>
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
      payInfo: {
        list: []
      },
      remark: '',
      restMoney: 0
    };
  },
  methods: {
    ...mapMutations(['handleOrderList']),
    getOrderInfo() {
      this.$api.seller
      .get_order_info({
        uid: this.userInfo.uid,
      })
      .then((res) => {
        this.payInfo = res.atWillBean;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getRestMoney() {
      this.$api.seller.get_rest_money({
        uid: this.userInfo.uid
      })
      .then(res => {
        this.restMoney = res.atWillBean
      })
      .catch(err => {
        console.log(err)
      })
    },
    pay() {
      if(this.restMoney < this.payInfo.oPrice) {
        this.$Message.error('余额不足')
        return
      }
      let remarkParams = {
        oid: this.payInfo.oid,
        remark: this.remark
      }
      let orderParams = {
        oid: this.payInfo.oid,
        oUid: this.payInfo.oUid,
        oSId: this.payInfo.oSId,
        oPrice: this.payInfo.oPrice
      }
      this.$api.seller.add_remark(remarkParams)
      .then(res => {
        this.$api.seller.pay_order(orderParams)
        .then(res => {
          this.getRestMoney()
          this.$Message.success('支付成功')
          this.handleOrderList(null)
          this.$router.push('/order/search')
        })
      })
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    this.getRestMoney()
    this.getOrderInfo();
  },
};
</script>

<style lang="less">
.user-info {
  margin-bottom: 20px;
}
.food-info {
  margin-bottom: 20px;
}
.remark-info {
  margin-bottom: 20px;
}
</style>
