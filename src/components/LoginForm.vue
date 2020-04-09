<template>
  <div>
    <Drawer
      title="登录"
      v-model="loginDrawerValue"
      width="20"
      :closable="false"
      :mask-closable="false"
      :styles="styles"
      class="loginDrawer"
    >
      <Form :model="user_formData" :show-message="true" v-show="this.role == '顾客'">
        <Row>
          <Col>
            <FormItem label="Username" prop="username">
              <Input
                v-model="user_formData.uname"
                placeholder="please enter username"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Password" prop="password">
              <Input
                v-model="user_formData.upwd"
                placeholder="please enter password"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Form :model="seller_formData" :show-message="true" v-show="this.role == '商家'">
        <Row>
          <Col>
            <FormItem label="Username" prop="username">
              <Input
                v-model="seller_formData.sName"
                placeholder="please enter username"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Password" prop="password">
              <Input
                v-model="seller_formData.sPwd"
                placeholder="please enter password"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <RadioGroup v-model="role" type="button" class="role_container">
        <Radio label="商家"></Radio>
        <Radio label="顾客"></Radio>
      </RadioGroup>
      <div>
        <span>没有账号？</span>
        <a v-on:click="changeLoginReg">注册</a>
      </div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeLoginDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="handleSubmit"
          >登录</Button
        >
      </div>
    </Drawer>
  </div>
</template>
<script>
import crypto from 'crypto-js';
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static',
      },
      user_formData: {
        uname: '',
        upwd: '',
      },
      seller_formData: {
        sName: '',
        sPwd: '',
      },
      role: '顾客',
      userInfo: {},
    };
  },
  methods: {
    ...mapMutations(['handleLoginDrawer', 'handleRegDrawer', 'handleUserInfo']),
    formDataInit() {
      this.user_formData = {
        uname: '',
        upwd: '',
      }
      this.seller_formData = {
        sName: '',
        sPwd: '',
      }
    },
    openLoginDrawer() {
      this.handleLoginDrawer(true);
    },
    closeLoginDrawer() {
      this.handleLoginDrawer(false);
    },
    openRegDrawer() {
      this.handleRegDrawer(true);
    },
    changeLoginReg() {
      this.closeLoginDrawer();
      this.openRegDrawer();
    },
    saveUserInfo(userInfo) {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.handleUserInfo(userInfo)
    },
    handleSubmit() {
      if (this.role == '商家') {
        this.$api.auth
        .seller_login(this.seller_formData)
        .then((res) => {
          if (res.list[0] == '0') {
            this.closeLoginDrawer()
            this.$Message.error('此账户名不存在')
            return
          }
          if (res.list[1] == '0') {
            this.closeLoginDrawer()
            this.$Message.error('密码错误')
            return
          }
          location.pathname = '/'
          this.userInfo = res.atWillBean
          this.userInfo.role = 2
          this.saveUserInfo(this.userInfo)
          this.closeLoginDrawer()
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        this.$api.auth
        .user_login(this.user_formData)
        .then((res) => {
          if (res.list[0] == '0') {
            this.closeLoginDrawer()
            this.$Message.error('此账户名不存在')
            return
          }
          if (res.list[1] == '0') {
            this.closeLoginDrawer()
            this.$Message.error('密码错误')
            return
          }
          location.pathname = '/'
          this.userInfo = res.atWillBean
          this.userInfo.role = 1
          this.saveUserInfo(this.userInfo)
          this.closeLoginDrawer()
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
  },
  computed: {
    ...mapState(['loginDrawerValue']),
  },
  watch: {},
};
</script>
<style lang="less">
.demo-drawer-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
  .actionButton {
    width: 80px;
  }
}
.loginDrawer {
  .role_container {
    margin-bottom: 20px;
  }
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
