<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div style="margin-bottom: 20px">
        <Button icon="ios-add" @click="openAddFoodDrawer" style="margin-right: 30px">新增菜品</Button>
        <i-Switch size="large" @on-change="changeFlag" v-model="flag">
          <span slot="open">营业</span>
          <span slot="close">打烊</span>
        </i-Switch>
      </div>
      <List item-layout="vertical">
        <ListItem v-for="item in foodList" :key="item.sid">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
            :title="item.fName"
            :description="item.soc"
          />
          <template slot="action">
            <li><span>原价：</span>{{ item.fPrice }}</li>
            <li><span>销量：</span>{{ item.fsv }}</li>
            <li><span>现有库存：</span>{{ item.fStock }}</li>
          </template>
          <div>
            <span>修改库存为：</span>
            <InputNumber
              :min="0"
              v-model="item.updateStock"
              style="width: 60px"
            ></InputNumber>
            <span style="margin-left: 20px">修改价格为：</span>
            <InputNumber
              :min="0"
              v-model="item.updatePrice"
              style="width: 60px"
            ></InputNumber>
            <Button
              type="primary"
              style="margin-left: 100px"
              @click="updateFood(item)"
              >确认修改</Button
            >
            <Button
              type="success"
              style="margin-left: 20px"
              @click="setHotFood(item)"
              v-show="item.hot == 0"
              >设为推荐</Button
            >
            <Button
              type="warning"
              style="margin-left: 20px"
              @click="cancelHotFood(item)"
              v-show="item.hot == 1"
              >取消推荐</Button
            >
            <Button
              type="error"
              style="margin-left: 20px"
              @click="deleteFood(item)"
              >删除菜品</Button
            >
          </div>
        </ListItem>
      </List>
    </Card>
    <Drawer
      title="新增菜品"
      v-model="addDrawerValue"
      width="20"
      class="rate-drawer"
    >
      <div style="margin-bottom: 20px">
        <div style="margin-bottom: 20px">
          <span>菜品菜系：</span>
          <Select v-model="addFoodForm.foc" style="width:200px">
            <Option
              v-for="item in socList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
        <div style="margin-bottom: 20px">
          <span>菜品名：</span>
          <Input v-model="addFoodForm.fName"></Input>
        </div>
        <div style="margin-bottom: 20px">
          <span>菜品简介：</span>
          <Input v-model="addFoodForm.fIntroduce"></Input>
        </div>
        <div style="margin-bottom: 20px">
          <span>菜品价格：</span>
          <InputNumber
            :min="0"
            v-model="addFoodForm.fPrice"
            style="width: 60px"
          ></InputNumber>
          ￥
        </div>
        <div style="margin-bottom: 20px">
          <span>菜品库存：</span>
          <InputNumber
            :min="0"
            v-model="addFoodForm.fStock"
            style="width: 60px"
          ></InputNumber>
          份
        </div>
        
        <!-- <div> -->
          <!-- <span>菜品图片：</span> -->
          <!-- <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="http://120.26.173.224:8080/order-1.0-SNAPSHOT/food/uploadPicture"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload> -->
          <!-- <Upload action="http://120.26.173.224:8080/order-1.0-SNAPSHOT/food/uploadPicture" :data="imgData">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload> -->
          <!-- <input type="file"> -->
        <!-- </div> -->
        <div>
          <span> </span>
        </div>
      </div>
      <div></div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeAddFoodDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="submitForm"
          >添加</Button
        >
      </div>
    </Drawer>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
export default {
  components: { HeadInfos },
  data() {
    return {
      userInfo: null,
      sid: 0,
      foodList: [],
      addFoodForm: {
        fPrice: 1,
        fStock: 1,
      },
      addDrawerValue: false,
      socList: [
        {
          value: '川菜',
          label: '川菜',
        },
        {
          value: '粤菜',
          label: '粤菜',
        },
        {
          value: '鲁菜',
          label: '鲁菜',
        },
        {
          value: '苏菜',
          label: '苏菜',
        },
        {
          value: '浙菜',
          label: '浙菜',
        },
        {
          value: '闽菜',
          label: '闽菜',
        },
        {
          value: '湘菜',
          label: '湘菜',
        },
        {
          value: '徽菜',
          label: '徽菜',
        },
      ],
      uploadList: [],
      imgData: {
        sid: 0
      },
      flag: true,
    };
  },
  methods: {
    getAllFood() {
      this.$api.seller
        .get_all_food({
          sid: this.sid,
          size: 100,
        })
        .then((res) => {
          this.foodList = res.list;
          this.foodList.map((val) => {
            val.updatePrice = val.fPrice;
            val.updateStock = val.fStock;
          });
          console.log(res);
        });
    },
    updateFood(item) {
      let params = {
        fid: item.fid,
        cSid: item.cSid,
        fStock: item.updateStock,
        fPrice: item.updatePrice,
      };
      this.$api.seller.update_food(params).then((res) => {
        if (res.flag) {
          this.$Message.success('修改成功');
          this.getAllFood();
        } else {
          this.$Message.error('修改失败');
        }
        console.log(res);
      });
    },
    deleteFood(item) {
      let params = {
        fid: item.fid,
      };
      this.$api.seller.delete_food(params).then((res) => {
        if (res.flag) {
          this.$Message.success('删除成功');
          this.getAllFood();
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    setHotFood(item) {
      let params = {
        fid: item.fid
      }
      this.$api.seller.set_hot_food(params)
      .then(res => {
        if(!res.flag) {
          this.$Message.error(res.message)
          return
        }
        this.getAllFood()
        this.$Message.success('设置成功')
        console.log(res)
      })
    },
    cancelHotFood(item) {
      let params = {
        fid: item.fid
      }
      this.$api.seller.cancel_hot_food(params)
      .then(res => {
        this.getAllFood()
        this.$Message.success('取消成功')
        console.log(res)
      })
    },
    openAddFoodDrawer() {
      this.addDrawerValue = true;
    },
    closeAddFoodDrawer() {
      this.addDrawerValue = false;
    },
    submitForm() {
      this.addFoodForm.cSid = this.sid
      this.$api.seller.add_food(this.addFoodForm)
      .then(res => {
        this.$Message.success(res.message)
        this.getAllFood()
        this.closeAddFoodDrawer()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeFlag() {
      let params = {
        sid: this.sid
      }
      this.$api.seller.change_flag(params)
      .then(res => {
        this.userInfo.flag = this.flag
        window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        console.log(res)
      })
    },
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    this.sid = this.userInfo.sid;
    this.imgData.sid = this.sid
    this.getAllFood();
    this.flag = this.userInfo.flag == 1 ? true : false
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
    height: 420px !important;
    right: 40% !important;
    margin-top: 60px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
}
</style>
