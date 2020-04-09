<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <!-- <List item-layout="vertical">
          <ListItem v-for="item in sellerList" :key="item.sid">
            <a @click="toDetail(item.sid)">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                :title="item.spName"
                :description="item.soc"
              />
            </a>
            <template slot="action">
              <li><Icon type="ios-star-outline" /> 123</li>
              <li><Icon type="ios-thumbs-up-outline" /> 234</li>
              <li><Icon type="ios-chatbubbles-outline" /> 345</li>
            </template>
          </ListItem>
        </List> -->
        <div class="search-container">
          <Input placeholder="输入关键字" style="width: 300px" v-model="searchInfo">
            <Button slot="append" icon="ios-search"></Button>
          </Input>
          <Button type="primary" class="search-btn" @click="searchSeller">搜索商家</Button>
          <Button type="primary" class="search-btn" @click="searchFood">搜索菜品</Button> 
        </div>
        <div v-show="JSON.stringify(searchSellerList) !== '[]'">
          <h3 style="margin-top: 10px">搜索商家结果：</h3>
          <div class="search-seller-container">
            <Card style="width: 22%; margin-right: 4%" v-for="item in searchSellerList" :key="item.sid">
              <a @click="toDetail(item.sid)">
                <div>
                  <span>店铺名字：</span>
                  <span>{{ item.spName }}</span>
                </div>
              </a>
            </Card>
          </div>
        </div>
        <div v-show="JSON.stringify(searchFoodList) !== '[]'">
          <h3 style="margin-top: 10px">搜索菜品结果：</h3>
          <div class="search-seller-container">
            <Card style="width: 22%; margin-right: 4%" v-for="item in searchFoodList" :key="item.sid">
              <a @click="toDetail(item.cSid)">
                <div>
                  <span>菜品名字：</span>
                  <span>{{ item.fName }}</span>
                </div>
              </a>
            </Card>
          </div>
        </div>
        <h3 style="margin-top: 10px">今日推荐商家：</h3>
        <div class="recommend-seller-container">
          <Card style="width: 22%;" v-for="item in sellerList" :key="item.sid">
            <a @click="toDetail(item.sid)">
              <div>
                <span>店铺名字：</span>
                <span>{{ item.spName }}</span>
              </div>
              <img src="../assets/bg.jpg" alt="">
              <div>
                <span>所属菜系：</span>
                <span>{{ item.soc }}</span>
              </div>
            </a>
          </Card>
        </div>
        <h3 style="margin-top: 10px">热销菜品：</h3>
        <div class="recommend-seller-container">
          <Card style="width: 22%;" v-for="item in hotFoodList" :key="item.fid">
            <a @click="toDetail(item.cSid)">
              <div>
                <span>菜品名：</span>
                <span>{{ item.fName }}</span>
              </div>
              <img src="../assets/bg.jpg" alt="">
              <div>
                <span>所属菜系：</span>
                <span>{{ item.foc }}</span>
              </div>
            </a>
          </Card>
        </div>
        <h3 style="margin-top: 10px">好评商家：</h3>
        <div class="recommend-seller-container">
          <Card style="width: 22%;" v-for="item in goodSellerList" :key="item.sid">
            <a @click="toDetail(item.sid)">
              <div>
                <span>店名：</span>
                <span>{{ item.spName }}</span>
              </div>
              <img src="../assets/bg.jpg" alt="">
              <div>
                <span>所属菜系：</span>
                <span>{{ item.soc }}</span>
              </div>
            </a>
          </Card>
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
export default {
  components: { HeadInfos },
  data() {
    return {
      sellerList: [],
      hotFoodList: [],
      goodSellerList: [],
      searchSellerList: [],
      searchFoodList: [],
      userInfo: null,
      searchInfo: '',
    };
  },
  methods: {
    getSellerList() {
      this.$api.seller.get_seller_list()
      .then((res) => {
        this.sellerList = res.list;
      });
    },
    toDetail(sid) {
      this.$router.push(`/seller/${sid}`);
    },
    getHotFoodList() {
      this.$api.seller.get_home_hot_food()
      .then(res => {
        console.log(res)
        this.hotFoodList = res.list
      })
      .catch(err => {
        console.log(err)
      })
    },
    getGoodSeller() {
      this.$api.seller.get_good_seller()
      .then(res => {
        this.goodSellerList = res.list
      })
    },
    searchSeller() {
      this.$api.seller.search_seller({
        spName: this.searchInfo
      })
      .then(res => {
        this.searchSellerList = res.list
        console.log(res)
      })
    },
    searchFood() {
      this.$api.seller.search_food({
        fName: this.searchInfo
      })
      .then(res => {
        this.searchFoodList = res.list
        console.log(res)
      })
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if(this.userInfo == null) {
      location.pathname = '/'
    }
    this.getSellerList();
    this.getHotFoodList()
    this.getGoodSeller()
  },
};
</script>

<style lang="less">
a {
  color: black;
}
a:hover {
  color: black;
}
.search-container {
  display: flex;
  .search-btn {
    margin-left: 20px;
  }
}
.recommend-seller-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  img {
    width: 100%;
    margin: 10px 0;
  }
}

.search-seller-container {
  margin-top: 10px;
  display: flex;
  img {
    width: 100%;
    margin: 10px 0;
  }
}
</style>