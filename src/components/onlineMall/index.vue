<template>
  <!-- 网上商城 -->
  <div id="onlineMall">
    <div class="shopBox">
      <div class="shop-item">
        <div class="item-top">
          <div class="img"></div>
          <div class="money">
            <div class="title">全国版种子用户</div>
            <div><span class="yuan">&yen;365</span><span class="year">/年</span><van-tag color="#FE504F" plain>即1元/天</van-tag></div>
          </div>
          <div class="buyBtn">
            <van-button  @click="payment" round color="linear-gradient(to right, #4693FF, #5D72FC)" style="height: 26px; line-height: 26px;">购买</van-button>
          </div>
        </div>
        <div class="item-center">
          <div class="word">赠送:</div>
          <div class="tag">
            <van-tag plain>地方版</van-tag>
            <van-tag plain>我的秘书</van-tag>
            <van-tag plain>智慧云端</van-tag>
            <van-tag plain>一键上传</van-tag>
            <van-tag plain>条约检索</van-tag>
            <van-tag plain>税收优惠检索</van-tag>
            <van-tag plain>行业检索</van-tag>
            <van-tag plain>进出口税收检索</van-tag>
            <van-tag plain>移动云擎</van-tag>
          </div>
        </div>
        <div class="note">
          <van-notice-bar wrapable :scrollable="false">
            备注：持续续费，终身享有上述优惠价格和尊贵用户等级赠送权益
          </van-notice-bar>
        </div>
        <div class="bar">
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
    <!-- 确认购买商品弹框 -->
    <van-popup v-model="show" position="top" :style="{ height: '100%', width: '100%', background: '#FAF9FA' }">
      <div class="popup">
        <h3>请确认您购买的产品</h3>
        <div class="shop-item">
          <div class="item-top">
            <div class="img"></div>
            <div class="money">
              <div class="title">全国版种子用户</div>
              <div><span class="yuan">&yen;365</span><span class="year">/年</span><van-tag color="#FE504F" plain>即1元/天</van-tag></div>
            </div>
          </div>
          <div class="item-center">
            <div class="word">赠送:</div>
            <div class="tag">
              <van-tag plain>地方版</van-tag>
              <van-tag plain>我的秘书</van-tag>
              <van-tag plain>智慧云端</van-tag>
              <van-tag plain>一键上传</van-tag>
              <van-tag plain>条约检索</van-tag>
              <van-tag plain>税收优惠检索</van-tag>
              <van-tag plain>行业检索</van-tag>
              <van-tag plain>进出口税收检索</van-tag>
              <van-tag plain>移动云擎</van-tag>
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
          <div style="margin-top: 50px;"><van-button :disabled="!checked" @click="confirmPayment" block type="info" style="border-radius: 30px;">确认支付356元</van-button></div>
          <div class="agree"><van-checkbox v-model="checked" icon-size="16px">我同意<a href="#">《用户协议》</a></van-checkbox></div>
        </div>
      </div>
    </van-popup>
    <!-- 支付成功弹框 -->
    <van-popup v-model="showPayEnd" position="top" :style="{ height: '100%', width: '100%', background: '#FAF9FA' }">
      <div class="popup1">
        <div style="text-align: center; margin-top: 100px;">
          <van-icon name="certificate" color="#4288FF" size="100" /><br />
          <span style="font-size: 16px; font-weight: bold;">支付成功</span><br />
          <span style="color: #C4CBDF;">谢谢您</span>
        </div>
        <div style="margin-top: 50px;"><van-button @click="closePopup" block type="info" style="border-radius: 30px;">关闭</van-button></div>
        <div style="margin-top: 100px; text-align: center; line-height: 22px; font-size: 16px;"><span>请及时登录PC端</span><br /><span style="color: #C4CBDF;">www.holywiser.com</span></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showPayEnd: false,
      checked: false,
      radio: '1'
    }
  },
  methods: {
    // 购买
    payment() {
      this.show = true
      this.radio = '1'
      this.checked = false
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
    }
  }
}
</script>

<style lang="less" scoped>
#onlineMall {
  margin-top: 12px;
  font-size: 14px;
  background: #f5f5f5;
  .shopBox {
    margin: 10px 14px;
  }
  .popup {
    height: 96%;
    margin: 10px 14px;
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
  .popup1 {
    margin: 10px 14px;
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
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .yuan {
          color: #CB4649;
          font-size: 18px;
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
