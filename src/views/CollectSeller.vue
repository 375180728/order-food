<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div class="recommend-seller-container">
        <Card style="width: 22%; margin-right: 3%; margin-bottom: 40px" v-for="item in sellerList" :key="item.sid">
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
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
export default {
	components: { HeadInfos },
	data () {
		return {
      userInfo: null,
      sellerList: [],
		}
  },
  methods: {
    getCollectSeller() {
      this.$api.user.search_collect_seller({
        uid: this.userInfo.uid
      })
      .then(res => {
        this.sellerList = res.list
        console.log(res)
      })
    },
    toDetail(sid) {
      this.$router.push(`/seller/${sid}`);
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.getCollectSeller()
  }
}
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
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  img {
    width: 100%;
    margin: 10px 0;
  }
}
</style>