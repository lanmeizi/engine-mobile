<template>
  <div id="pagination">
    <div class="clickPage">
      <ul class="ulpage">
        <li class="prev" :class="{'pageStyleActive': currentPage === 1}" @click="prevPage">上一页</li>
        <li class="totalList" @click="goToInputPage">
          <div class="curTolStyle"><span>{{currentPage}}/{{total}}页</span></div>
          <div class="img"><img src="../../../assets/index/c3.png" width="16" height="16" /></div>
        </li>
        <li class="totalList1">共{{totalLists}}条</li>
        <li class="next" :class="{'pageStyleActive': currentPage === total}" @click="nextPage">下一页</li>
      </ul>
    </div>
    <van-popup v-model="show" closeable close-icon="close" position="bottom" get-container="body">
      <div style="height: 210px;">
        <van-divider :style="{ fontSize: '17px', marginTop: '40px', marginBottom: '30px' }">
          请输入页码
        </van-divider>
        <div class="input-box">
          <div class="left">跳至</div>
          <div class="center">
            <van-cell-group>
              <van-field
                v-model="pageNum"
                center
                clearable
                type="number"
                maxlength="7"
                input-align="center"
                error-message-align="center"
                placeholder="请输入页码"
                class="pageSize"
              />
            </van-cell-group>
          </div>
          <div class="right">页</div>
        </div>
        <div class="btn-buju">
          <van-button style="width: 30%;border-radius: 30px;height: 40px;" type="default" @click="closePopup">取消</van-button>
          <van-button style="width: 30%;border-radius: 30px;height: 40px;" type="info" @click="confirmInputNum">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    totalLists: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      show: false,  // 弹出框
      pageNum: '',
      pattern: /^[1-9][0-9]*$/,
      errMsg: {
        message: ''
      }
    }
  },
  methods: {
    prevPage () {  // 上一页
      this.$emit('prevPage')
    },
    nextPage () {  // 下一页
      this.$emit('nextPage')
    },
    goToInputPage () {  // 跳转到指定的页面
      this.show = true
      this.pageNum = this.currentPage
      this.errMsg.message = ''
    },
    closePopup () {
      this.show = false
    },
    confirmInputNum() {
      // if (!this.pageNum) {
      //   this.errMsg.message = '请输入页码'
      //   return false
      // } else 
      if (!this.pageNum || !this.pattern.test(this.pageNum)) {
        this.show = false
        this.$emit('jumpToPageSize', 1)
      } else if (this.pattern.test(this.pageNum)) {
        let num = parseInt(this.pageNum)
        if (num <= this.total) {
          this.show = false
          this.$emit('jumpToPageSize', num)
        } else if (num > this.total) {
          this.show = false
          this.$emit('jumpToPageSize', this.total)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@--border-color: #ebedf0;
@--border-top-color: #f5f6f7;
.pageSize {
  height: 0.88rem !important;
}
#pagination {
  .clickPage {
    height: 1.06667rem;
    line-height: 1.06667rem;
    .ulpage {
      display: flex;
      text-align: center;
      color: #715641;
      .prev {
        border: 1px solid @--border-color;
        flex: 0 0 25%;
      }
      .totalList {
        flex: 0 0 28%;
        border-top: 1px solid #ebedf0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F6F3F1;
        .curTolStyle {
          color: #6C3B14;
        }
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .totalList1 {
        flex: 0 0 22%;
        color: #646566;
        border-top: 1px solid #ebedf0;
      }
      .next {
        border: 1px solid @--border-color;
        flex: 0 0 25%;
      }
    }
  }
  .pageStyleActive {
    color: #c7bdb5;
    background-color: #fbfcfd;
  }
}
</style>
<style lang="less">

.input-box {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #715641;
  .center {
    flex: 0 0 120px;
    border: 1px solid #715641;
    .van-field__control {
      color: #715641;
    }
  }
  .left {
    margin-right: 8px;
  }
  .right {
    margin-left: 8px;
  }
}
.btn-buju {
  margin: 36px 0 37px;
  display: flex;
  justify-content: space-between;
  &:before,
  &:after {
    content: '';
    display: block;
  }
}
</style>
