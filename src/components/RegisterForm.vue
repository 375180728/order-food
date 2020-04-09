<template>
  <div>
    <Drawer
      title="注册"
      v-model="regDrawerValue"
      width="20"
      :closable="false"
      :mask-closable="false"
      :styles="styles"
      class="regDrawer"
    >
      <Form :model="user_formData" :show-message="true" v-show="this.role == '顾客'">
        <Row>
          <Col>
            <FormItem label="用户名" prop="username">
              <Input
                v-model="user_formData.uname"
                placeholder="请输入用户名"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="密码" prop="password">
              <Input
                v-model="user_formData.upwd"
                placeholder="请输入密码"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="姓名" prop="name">
              <Input v-model="user_formData.name" placeholder="请输入姓名">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="手机号码" prop="phone">
              <Input v-model="user_formData.phone" placeholder="请输入手机号码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="收货地址" prop="address">
              <Input
                v-model="user_formData.address"
                placeholder="请输入收货地址"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem prop="sex">
              <RadioGroup v-model="role" type="button" class="role_container">
                <Radio label="商家"></Radio>
                <Radio label="顾客"></Radio>
              </RadioGroup>
              <RadioGroup v-model="user_formData.sex" type="button" class="sex_container">
                <Radio label="男"></Radio>
                <Radio label="女"></Radio>
              </RadioGroup>  
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Form :model="seller_formData" :show-message="true" v-show="this.role == '商家'">
        <Row>
          <Col>
            <FormItem label="用户名" prop="username">
              <Input
                v-model="seller_formData.sName"
                placeholder="请输入用户名"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="密码" prop="password">
              <Input
                v-model="seller_formData.sPwd"
                placeholder="请输入密码"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="店铺名" prop="spName">
              <Input v-model="seller_formData.spName" placeholder="请输入店铺名">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="电话号码" prop="num">
              <Input v-model="seller_formData.num" placeholder="请输入电话号码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="店铺地址" prop="sAddress">
              <Input
                v-model="seller_formData.sAddress"
                placeholder="请输入店铺地址"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="菜系" prop="soc">
              <Select v-model="seller_formData.soc" style="width:200px">
                <Option v-for="item in socList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioGroup v-model="role" type="button" class="role_container">
              <Radio label="商家"></Radio>
              <Radio label="顾客"></Radio>
            </RadioGroup>
          </Col>
        </Row>
      </Form>
      <div>
        <a v-on:click="changeLoginReg">已有账号登录</a>
      </div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeRegDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="handleSubmit"
          >注册</Button
        >
      </div>
    </Drawer>
  </div>
</template>
<script>
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
        name: '',
        sex: '',
        phone: '',
        address: '',
      },
      seller_formData: {
        sName: '',
        sPwd: '',
        num: '',
        spName: '',
        sAddress: '',
        soc: '',
      },
      socList: [
        {
          value: '川菜',
          label: '川菜'
        },
        {
          value: '粤菜',
          label: '粤菜'
        },
        {
          value: '鲁菜',
          label: '鲁菜'
        },
        {
          value: '苏菜',
          label: '苏菜'
        },
        {
          value: '浙菜',
          label: '浙菜'
        },
        {
          value: '闽菜',
          label: '闽菜'
        },
        {
          value: '湘菜',
          label: '湘菜'
        },
        {
          value: '徽菜',
          label: '徽菜'
        }
      ],
      role: '顾客',
    };
  },
  methods: {
    ...mapMutations(['handleLoginDrawer', 'handleRegDrawer', 'handleUserInfo']),
    formDataInit() {
      this.user_formData = {
        uname: '',
        upwd: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
      }
      this.seller_formData = {
        sName: '',
        sPwd: '',
        num: '',
        spName: '',
        sAddress: '',
        soc: '',
      }
    },
    openRegDrawer() {
      this.handleRegDrawer(true);
    },
    closeRegDrawer() {
      this.handleRegDrawer(false);
    },
    openLoginDrawer() {
      this.handleLoginDrawer(true);
    },
    changeLoginReg() {
      this.closeRegDrawer();
      this.openLoginDrawer();
    },
    handleSubmit() {
      console.log(this.user_formData);
      if (this.role == '商家') {
        this.$api.user.seller_register(this.seller_formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        this.$api.user.user_register(this.user_formData)
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  },
  computed: {
    ...mapState(['regDrawerValue']),
  },
  watch: {},
};
</script>
<style lang="less">
.regDrawer {
  .ivu-drawer-right {
    height: 600px !important;
    right: 40% !important;
    margin-top: 50px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
  .sex_container {
    display: block;
    margin-top: 20px;
  }
  .role_container {
    margin-bottom: 10px;
  }
}

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
}
</style>
