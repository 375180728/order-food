<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <Tabs v-model="tabName" @on-click="getOrderList">
        <TabPane name="0" label="未付款">
          <List item-layout="vertical">
            <ListItem v-for="item in orderList" :key="item.sid">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                :title="item.ospName"
                :description="item.soc"
              />
              <div>
                <span v-for="food in item.list" :key="food.mFid">
                  <span>
                    {{ food.mfName }}
                  </span>
                  <span style="margin-right: 5px"> x{{ food.mNum }} </span>
                  <span style="margin-right: 25px">
                    {{ food.allPrice }}￥
                  </span>
                </span>
              </div>
              <template slot="action">
                <li><span>总数：</span>{{ item.oNum }}</li>
                <li><span>总价：</span>{{ item.oPrice }}</li>
                <li><span>付款时间：</span>{{ new Date(item.date) }}</li>
              </template>
            </ListItem>
          </List>
        </TabPane>
        <TabPane name="1" label="已付款">
          <List item-layout="vertical">
            <ListItem v-for="item in orderList" :key="item.sid">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                :title="item.ospName"
                :description="item.soc"
              />
              <div>
                <span v-for="food in item.list" :key="food.mFid">
                  <span>
                    {{ food.mfName }}
                  </span>
                  <span style="margin-right: 5px"> x{{ food.mNum }} </span>
                  <span style="margin-right: 25px">
                    {{ food.allPrice }}￥
                  </span>
                </span>
                <div>
                  <Button
                    type="primary"
                    style="margin-top: 10px"
                    @click="startSend(item)"
                    >开始配送</Button
                  >
                </div>
              </div>
              <template slot="action">
                <li><span>总数：</span>{{ item.oNum }}</li>
                <li><span>总价：</span>{{ item.oPrice }}</li>
                <li><span>付款时间：</span>{{ new Date(item.date) }}</li>
              </template>
            </ListItem>
          </List>
        </TabPane>
        <TabPane name="2" label="正在配送">
          <List item-layout="vertical">
            <ListItem v-for="item in orderList" :key="item.sid">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                :title="item.ospName"
                :description="item.soc"
              />
              <div>
                <span v-for="food in item.list" :key="food.mFid">
                  <span>
                    {{ food.mfName }}
                  </span>
                  <span style="margin-right: 5px"> x{{ food.mNum }} </span>
                  <span style="margin-right: 25px">
                    {{ food.allPrice }}￥
                  </span>
                </span>
              </div>
              <template slot="action">
                <li><span>总数：</span>{{ item.oNum }}</li>
                <li><span>总价：</span>{{ item.oPrice }}</li>
                <li><span>付款时间：</span>{{ new Date(item.date) }}</li>
              </template>
            </ListItem>
          </List>
        </TabPane>
        <TabPane name="3" label="已送达">
          <List item-layout="vertical">
            <ListItem v-for="item in orderList" :key="item.sid">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                :title="item.ospName"
                :description="item.soc"
              />
              <div>
                <span v-for="food in item.list" :key="food.mFid">
                  <span>
                    {{ food.mfName }}
                  </span>
                  <span style="margin-right: 5px"> x{{ food.mNum }} </span>
                  <span style="margin-right: 25px">
                    {{ food.allPrice }}￥
                  </span>
                </span>
              </div>
              <template slot="action">
                <li><span>总数：</span>{{ item.oNum }}</li>
                <li><span>总价：</span>{{ item.oPrice }}</li>
                <li><span>付款时间：</span>{{ new Date(item.date) }}</li>
              </template>
            </ListItem>
          </List>
        </TabPane>
      </Tabs>
    </Card>
    <!-- <Drawer
      title="评价"
      v-model="rateDrawerValue"
      width="20"
      class="rate-drawer"
    >
      <div style="margin-bottom: 20px">
        <div style="margin-bottom: 20px">评价一下：</div>
        <Input
          maxlength="100"
          show-word-limit
          type="textarea"
          :rows="5"
          placeholder="请输入评论..."
          v-model="rateForm.content"
        ></Input>
      </div>
      <div>
        <div style="margin-bottom: 10px">打个分吧：</div>
        <Rate show-text v-model="rateForm.score" />
      </div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeRateDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="submitRate"
          >评价</Button
        >
      </div>
    </Drawer> -->
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
export default {
  components: { HeadInfos },
  data() {
    return {
      userInfo: null,
      tabName: '0',
      orderList: [],
      rateDrawerValue: false,
      rateForm: {
        content: '',
        score: 0,
      },
    };
  },
  methods: {
    getOrderList() {
      this.$api.seller
      .get_order_list({
        sid: this.userInfo.sid,
        flag: this.tabName,
        page: 1,
        size: 100,
      })
      .then((res) => {
        this.orderList = res.list;
      });
    },
    startSend(item) {
      let params = {
        oid: item.oid,
      };
      this.$api.seller.start_send(params).then((res) => {
        this.getOrderList();
        this.$Message.success('开始配送');
      });
    },
    // openRateDrawer(item) {
    //   this.rateForm.eOid = item.oid
    //   this.rateForm.eUid = item.oUid
    //   this.rateForm.eSid = item.oSId
    //   this.rateDrawerValue = true;
    // },
    // closeRateDrawer() {
    //   this.rateDrawerValue = false;
    // },
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    this.getOrderList();
  },
};
</script>

<style lang="less">
.info-container {
  padding: 30px;
  .info-item {
    margin-bottom: 20px;
    font-size: 18px;
    button {
      margin-left: 40px;
    }
  }
}
.rate-drawer {
  .ivu-drawer-right {
    height: 400px !important;
    right: 40% !important;
    margin-top: 160px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
}
</style>
