<template>
  <!-- 网上商城 -->
  <div id="onlineMall">
    <van-tabs v-model="active">
      <van-tab title="产品等级">
        <div class="shopBox">
          <div class="shop-item" :class="{'notActive': index !== 0}" v-for="(good, index) in goodsLists" :key="index">
            <div class="item-top">
              <div class="img"><img src="" /></div>
              <div class="money">
                <div class="title">{{ good.title }}</div>
                <div><span class="yuan">&yen;{{ good.money }}</span><span class="year">/年</span><van-tag color="#FE504F" plain>即{{ good.oneDayMoney }}元/天</van-tag></div>
              </div>
              <div class="buyBtn">
                <van-button v-if="index === 0" @click="payment(good, index)" round color="linear-gradient(to right, #4693FF, #5D72FC)" style="height: 26px; line-height: 26px;">购买</van-button>
                <!-- <van-button @click="payment(good, index)" round color="linear-gradient(to right, #4693FF, #5D72FC)" style="height: 26px; line-height: 26px;">续费</van-button> -->
                <van-button v-else round disabled color="#ccc" style="height: 26px; line-height: 26px;">购买</van-button>
              </div>
            </div>
            <div class="item-center">
              <div class="word">赠送:</div>
              <div class="tag">
                <van-tag plain v-for="(tag, i) in good.tags" :key="i">{{ tag.name }}</van-tag>
              </div>
            </div>
            <div class="note" v-if="index === 0">
              <van-notice-bar wrapable :scrollable="false">
                备注：持续续费，终身享有上述优惠价格和尊贵用户等级赠送权益
              </van-notice-bar>
            </div>
            <div class="bar" v-if="index === 0">
              <div class="word">名额递减中</div>
              <div class="progress">
                <van-progress 
                  :percentage="75" 
                  :show-pivot="false" 
                  stroke-width="10"
                  track-color="#FDEDCC"
                  color="linear-gradient(to right, #F8A302, #f2826a)"
                  style="width: 120px;"
                />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="VIP升级">
        <div class="shopBox">
          <div style="height: 100px; background: linear-gradient(to right, #4693FF, #5D72FC); text-align: center; line-height: 100px; color: #fff;">您的账号有效期还有34天</div>
          <van-divider :style="{ fontSize: '17px', marginTop: '40px', marginBottom: '30px' }">
            您可选择下列升级服务
          </van-divider>
          <van-grid :column-num="2" :gutter="10">
            <van-grid-item @click="clickUpgrade(item, index)" v-for="(item, index) in gridItems" :key="index">
              <!-- <van-checkbox v-model="checked"></van-checkbox> -->
              <van-image width="50" height="50" :src="item.img" />
              <span>{{ item.test }}</span>
            </van-grid-item>
          </van-grid>
          <!-- <div style="margin: 20px 10px 0;"><van-button block type="info">购买</van-button></div> -->
        </div>
      </van-tab>
      <!-- 测试开始 -->
      <van-tab title="产品测试">
        <div class="shopBox">
          <div><van-button plain type="info" size="small">新增文件夹</van-button></div>
          <div class="fileList">
            <div style="margin: 10px;" v-for="(item, index) in files" :key="item.id">
              <img src="../../assets/index/wenjianjia.png" width="20px" height="20px" style="margin-right: 10px;" />
              <van-field v-if="currentIndex === index" v-model="item.title" placeholder="请输入文件名" clearable />
              <span v-else>{{ item.title }}</span>
              <van-button v-if="currentIndex === index" plain type="primary" size="mini" @click="confirmFileName(item.title)">确定</van-button>
              <van-button v-else plain type="primary" size="mini" @click="editFileName(index)">编辑</van-button>
              <van-button type="danger" size="mini">删除</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- 测试结束 -->
    </van-tabs>
    <!-- <div class="shopBox">
      <div class="shop-item" :class="{'notActive': index !== 0}" v-for="(good, index) in goodsLists" :key="index">
        <div class="item-top">
          <div class="img"><img src="" /></div>
          <div class="money">
            <div class="title">{{ good.title }}</div>
            <div><span class="yuan">&yen;{{ good.money }}</span><span class="year">/年</span><van-tag color="#FE504F" plain>即{{ good.oneDayMoney }}元/天</van-tag></div>
          </div>
          <div class="buyBtn">
            <van-button v-if="index === 0" @click="payment(good, index)" round color="linear-gradient(to right, #4693FF, #5D72FC)" style="height: 26px; line-height: 26px;">购买</van-button>
            <van-button @click="payment(good, index)" round color="linear-gradient(to right, #4693FF, #5D72FC)" style="height: 26px; line-height: 26px;">续费</van-button>
            <van-button v-else round disabled color="#ccc" style="height: 26px; line-height: 26px;">购买</van-button>
          </div>
        </div>
        <div class="item-center">
          <div class="word">赠送:</div>
          <div class="tag">
            <van-tag plain v-for="(tag, i) in good.tags" :key="i">{{ tag.name }}</van-tag>
          </div>
        </div>
        <div class="note" v-if="index === 0">
          <van-notice-bar wrapable :scrollable="false">
            备注：持续续费，终身享有上述优惠价格和尊贵用户等级赠送权益
          </van-notice-bar>
        </div>
        <div class="bar" v-if="index === 0">
          <div class="word">名额递减中</div>
          <div class="progress">
            <van-progress 
              :percentage="75" 
              :show-pivot="false" 
              stroke-width="10"
              track-color="#FDEDCC"
              color="linear-gradient(to right, #F8A302, #f2826a)"
              style="width: 120px;"
            />
          </div>
        </div>
      </div>
    </div> -->
    <!-- 确认购买商品弹框 -->
    <van-popup v-model="show" position="top" :style="{ height: '100%', width: '100%', background: '#FAF9FA' }">
      <div class="shopBox popup">
        <h3>请确认您购买的产品</h3>
        <div class="shop-item">
          <div class="item-top">
            <div class="img"></div>
            <div class="money">
              <div class="title">{{ buyItem.title }}</div>
              <div><span class="yuan">&yen;{{ buyItem.money }}</span><span class="year">/年</span><van-tag color="#FE504F" plain>即1元/天</van-tag></div>
            </div>
          </div>
          <div class="item-center">
            <div class="word">赠送:</div>
            <div class="tag">
              <van-tag plain v-for="(tag, index) in buyItem.tags" :key="index">{{ tag.name }}</van-tag>
            </div>
          </div>
          <div class="note">
            <van-notice-bar wrapable :scrollable="false">
              备注：持续续费，终身享有上述优惠价格和尊贵用户等级赠送权益
            </van-notice-bar>
          </div>
        </div>
        <div class="dingwei">
          <div class="payMethods">
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">微信支付</van-radio>
              <van-radio name="2">支付宝支付</van-radio>
            </van-radio-group>
          </div>
          <div style="margin-top: 50px;"><van-button :disabled="!checked" @click="confirmPayment" block type="info" style="border-radius: 30px;">确认支付{{ buyItem.money }}元</van-button></div>
          <div class="agree"><van-checkbox v-model="checked" icon-size="16px">我同意<a href="#">《用户协议》</a></van-checkbox></div>
        </div>
      </div>
    </van-popup>
    <!-- 支付成功弹框 -->
    <van-popup v-model="showPayEnd" position="top" :style="{ height: '100%', width: '100%', background: '#FAF9FA' }">
      <div class="shopBox">
        <div style="text-align: center; margin-top: 100px;">
          <van-icon name="certificate" color="#4288FF" size="100" /><br />
          <span style="font-size: 16px; font-weight: bold;">支付成功</span><br />
          <span style="color: #C4CBDF;">谢谢您</span>
        </div>
        <div style="margin-top: 50px;"><van-button @click="closePopup" block type="info" style="border-radius: 30px;">关闭</van-button></div>
        <div style="margin-top: 100px; text-align: center; line-height: 22px; font-size: 16px;"><span>请及时登录PC端</span><br /><span style="color: #C4CBDF;">www.holywiser.com</span></div>
      </div>
    </van-popup>
    <!-- 点击续费页面弹框 -->
    <van-popup v-model="showRenew" position="top" :style="{ height: '100%', width: '100%', background: '#FAF9FA' }">
      <div class="popup">
        <h3>请确认您购买的产品</h3>
        <div class="shop-item">
          <div class="item-top">
            <div class="img"></div>
            <div class="money">
              <div class="title">{{ buyItem.title }}</div>
              <div><span class="yuan">&yen;{{ buyItem.money }}</span><span class="year">/年</span><van-tag color="#FE504F" plain>即{{ buyItem.oneDayMoney }}元/天</van-tag></div>
            </div>
          </div>
          <div class="item-center">
            <div class="word">赠送:</div>
            <div class="tag">
              <van-tag plain v-for="(tag, index) in buyItem.tags" :key="index">{{ tag.name }}</van-tag>
            </div>
          </div>
          <div class="note">
            <van-notice-bar wrapable :scrollable="false">
              备注：持续续费，终身享有上述优惠价格和尊贵用户等级赠送权益
            </van-notice-bar>
          </div>
        </div>
        <div class="dingwei">
          <div class="payMethods">
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">微信支付</van-radio>
              <van-radio name="2">支付宝支付</van-radio>
            </van-radio-group>
          </div>
          <div style="margin-top: 50px;"><van-button :disabled="!checked" @click="confirmPayment" block type="info" style="border-radius: 30px;">继续充值请确认</van-button></div>
          <div class="agree"><van-checkbox v-model="checked" icon-size="16px">我同意<a href="#">《用户协议》</a></van-checkbox></div>
        </div>
      </div>
    </van-popup>
    <!-- 点击升级弹框 -->
    <van-popup v-model="showUpgrade" closeable close-icon="close" position="top" :style="{ height: '100%', width: '100%' }">
      <van-divider :style="{ fontSize: '17px', marginTop: '40px', marginBottom: '30px' }">
        VIP升级
      </van-divider>
      <div class="upgradeItems">
        <van-checkbox-group v-model="result" @change="toggle">
          <van-cell-group>
            <van-cell v-for="(list, index) in list" :key="index">
              <template #title>
                <span style="font-weight: bold;">一键上传</span>
              </template>
              <template #label>
                <span style="color: red; font-weight: bold;">&yen;365</span><span>(X元=X天*0.20元/天)</span>
              </template>
              <template #right-icon>
                <van-checkbox :name="list" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <div style="margin: 20px 10px 0;"><van-button block type="info">确定</van-button></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1, // tab切换
      show: false, // 确认商品付费弹框
      showPayEnd: false, // 支付成功弹框
      showRenew: false, // 续费弹框
      showUpgrade: false, // 升级弹框
      checked: false,
      radio: '1',
      goodsLists: [
        {id: 1, imgUrl: '', title: '全国版种子用户', money: 365, oneDayMoney: 10, tags: [
          {id: 1, name: '地方版'},
          {id: 2, name: '我的秘书'},
          {id: 3, name: '智慧云端'},
          {id: 4, name: '一键上传'},
          {id: 5, name: '条约检索'},
          {id: 6, name: '税收优惠检索'},
          {id: 7, name: '行业检索'},
          {id: 8, name: '进出口税收检索'},
          {id: 9, name: '移动云擎'}
        ]},
        {id: 2, imgUrl: '', title: '全国版钻石用户', money: 730, oneDayMoney: 2, tags: [
          {id: 1, name: '地方版'},
          {id: 2, name: '我的秘书'},
          {id: 3, name: '智慧云端'},
          {id: 5, name: '条约检索'},
          {id: 6, name: '税收优惠检索'},
          {id: 7, name: '行业检索'},
          {id: 8, name: '进出口税收检索'},
          {id: 9, name: '移动云擎'}
        ]},
        {id: 2, imgUrl: '', title: '全国版黄金用户', money: 1095, oneDayMoney: 3, tags: [
          {id: 1, name: '地方版'},
          {id: 2, name: '我的秘书'},
          {id: 3, name: '智慧云端'},
          {id: 5, name: '条约检索'},
          {id: 6, name: '税收优惠检索'},
          {id: 7, name: '行业检索'},
          {id: 8, name: '进出口税收检索'},
          {id: 9, name: '移动云擎'}
        ]},
        {id: 4, imgUrl: '', title: '全国版白银用户', money: 1460, oneDayMoney: 4, tags: [
          {id: 1, name: '地方版'},
          {id: 2, name: '我的秘书'},
          {id: 3, name: '智慧云端'},
          {id: 5, name: '条约检索'},
          {id: 6, name: '税收优惠检索'},
          {id: 7, name: '行业检索'},
          {id: 8, name: '进出口税收检索'},
          {id: 9, name: '移动云擎'}
        ]},
        {id: 5, imgUrl: '', title: '全国版普通用户', money: 1825, oneDayMoney: 5, tags: [
          {id: 1, name: '地方版'},
          {id: 2, name: '我的秘书'},
          {id: 3, name: '智慧云端'},
          {id: 5, name: '条约检索'},
          {id: 6, name: '税收优惠检索'},
          {id: 7, name: '行业检索'},
          {id: 8, name: '进出口税收检索'},
          {id: 9, name: '移动云擎'}
        ]}
      ], //  购买列表数据
      buyItem: {}, // 点击购买的项
      gridItems: [
        {test: '一键删除', img: 'https://img.yzcdn.cn/vant/apple-1.jpg'},
        {test: '分屏权限', img: 'https://img.yzcdn.cn/vant/apple-2.jpg'},
        {test: '文件仓库', img: 'https://img.yzcdn.cn/vant/apple-3.jpg'},
        {test: 'VIP组合', img: 'https://img.yzcdn.cn/vant/apple-3.jpg'}
      ],
      upgradeItem: {},
      list: ['a', 'b'],
      result: [],
      files: [
        {id: 1, title: '文件夹一'},
        {id: 2, title: '文件夹二'},
        {id: 3, title: '文件夹三'}
      ],
      currentIndex: -1,
      inputCodefocus: false
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  },
  methods: {
    editFileName(index) {
      console.log('index666==>>', index)
      this.currentIndex = index

      // let that = this
      // setTimeout(() => {
      //   console.log('11111111')
      //   that.inputCodefocus = true
      //   console.log('22222222')
      // }, 50);
    },
    confirmFileName(title) {
      console.log('title===>', title)
      if (!title) {
        console.log('文件名不能为空')
      } else {
        console.log('文件名修改成功')
        this.currentIndex = -1
      }
    },
    // 购买
    payment(item, index) {
      console.log('item, index==>', item, index)
      if (this.userId) {
        this.buyItem = item
        // 购买
        this.show = true
        this.radio = '1'
        this.checked = false
        // 续费
        // this.showRenew = true
        // this.radio = '1'
        // this.checked = false
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先登录' })
      }
    },
    // 确认支付
    confirmPayment() {
      this.show = false
      this.showPayEnd = true
      // console.log('this.radio===>', this.radio)
      // console.log('this.checked===>', this.checked)
    },
    // 关闭
    closePopup() {
      this.showPayEnd = false
    },
    // 点击升级宫格
    clickUpgrade(item, index) {
      console.log('item, index===>', item, index)
      this.showUpgrade = true
      this.upgradeItem = item
    },
    toggle(index) {
      // this.$refs.checkboxes[index].toggle()
      console.log('index=>', index)
    }
  }
}
</script>

<style lang="less" scoped>
#onlineMall {
  margin-top: 12px;
  font-size: 14px;
  .shopBox {
    margin: 10px 14px;
  }
  .popup {
    height: 96%;
    .dingwei {
      width: 94%;
      position: absolute;
      bottom: 40px;
      left: 10px;
      .payMethods {
        display: flex;
        justify-content: center;
      }
      .agree {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        a {
          color: #818AFB;
        }
      }
    }
  }
  .shop-item {
    background: #fff;
    padding: 12px 10px;
    margin-bottom: 10px;
    .item-top {
      border-bottom: 1px solid #EFEFEF;
      padding-bottom: 12px;
      height: 50px;
      display: flex;
      .img {
        flex: 0 0 70px;
        border: 1px solid blue;
        margin-right: 10px;
      }
      .money {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
        .yuan {
          color: #CB4649;
          font-size: 14px;
          font-weight: bold;
        }
        .year {
          font-size: 12px;
          color: #CB4649;
          margin-right: 10px;
        }
      }
      .buyBtn {
        display: flex;
        align-items: center;
      }
    }
    .item-center {
      padding-top: 10px;
      display: flex;
      .word {
        flex: 0 0 40px;
        padding: 2px 0 0 2px;
      }
      .tag {
        flex: 1;
      }
    }
    .note {
      margin: 12px 0;
    }
    .bar {
      display: flex;
      justify-content: flex-end;
      .word {
        width: 70px;
        font-size: 12px;
      }
      .progress {
        display: flex;
        align-items: center;
      }
    }
  }
  .notActive {
    opacity: .5;
  }
  .van-tag {
    margin: 2px;
  }
  .van-notice-bar {
    padding: 0;
  }
  .van-notice-bar--wrapable {
    padding: 0 4px;
    font-size: 12px;
  }
}
</style>
