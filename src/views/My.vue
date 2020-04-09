<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div class="info-container">
        <div class="info-item">
          <span>用户名：</span>
          <span>{{ userInfo.uname }}</span>
        </div>
        <div class="info-item">
          <span>密码：</span>
          <Input v-model="userInfo.upwd" type="password" password style="width: 350px"></Input>
          <!-- <Button type="primary" @click="update">修改</Button> -->
        </div>
        <div class="info-item">
          <span>姓名：</span>
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="info-item">
          <span>电话：</span>
          <span>{{ userInfo.phone }}</span>
        </div>
        <div class="info-item">
          <span>性别：</span>
          <span>{{ userInfo.sex }}</span>
        </div>
        <div class="info-item">
          <span>余额：</span>
          <span>{{ userInfo.money }}</span>
        </div>
        <div class="info-item">
          <span>地址：</span>
          <Input v-model="userInfo.address" style="width: 350px"></Input>
          <!-- <Button type="primary">修改</Button> -->
        </div>   
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
		}
  },
  methods: {

  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  }
}
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
</style>