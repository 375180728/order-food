<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu
          active-name="1-1"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-1" to="/">
            <Icon type="ios-home"></Icon>
            <span>首页</span>
          </MenuItem>
          <MenuItem name="1-2" to="/seller" v-show="this.isUser">
            <Icon type="md-restaurant" />
            <span>点餐</span>
          </MenuItem>
          <MenuItem name="1-3" to="/my" v-show="this.isUser">
            <Icon type="md-person" />
            <span>个人信息</span>
          </MenuItem>
          <MenuItem name="1-4" to="/cart" v-show="this.isUser">
            <Icon type="md-cart" />
            <span>购物车</span>
          </MenuItem>
          <MenuItem name="1-5" to="/order/search" v-show="this.isUser">
            <Icon type="md-paper" />
            <span>查看订单</span>
          </MenuItem>
          <MenuItem name="1-6" to="/user/collect" v-show="this.isUser">
            <Icon type="md-star" />
            <span>我的收藏</span>
          </MenuItem>
          <!-- <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu> -->
          <MenuItem name="2-1" to="/admin" v-show="this.isSeller">
            <Icon type="md-person" />
            <span>管理店铺</span>
          </MenuItem>
          <MenuItem name="2-2" to="/admin/order" v-show="this.isSeller">
            <Icon type="md-list-box" />
            <span>管理订单</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <router-view />
      </Layout>
      <LoginForm />
      <RegisterForm />
    </Layout>
    
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      isCollapsed: false,
      isUser: false,
      isSeller: false,
      token: '',
    };
  },
  computed: {
    menuitemClasses: function() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    },
  },
  methods: {
    ...mapMutations([
      'handleUserInfo'
    ]),
  },
  watch: {
    userInfo: {
      handler(val) {
        if(!val) {
          this.isUser = false
          this.isSeller = false
          return
        }
        if(val.role == 1) {
          this.isUser = true
          return
        } 
        if(val.role == 2) {
          this.isSeller = true
          return
        }
      },
      deep: true
    },
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if(!this.userInfo) {
      this.isUser = false
      this.isSeller = false
      return
    }
    if(this.userInfo.role == 1) {
      this.isUser = true
      return
    } 
    if(this.userInfo.role == 2) {
      this.isSeller = true
      return
    }
  }
};
</script>
<style scoped>
/* .ivu-layout-sider {
  width: 10vw !important;
} */
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
