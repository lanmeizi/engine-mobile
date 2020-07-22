<template>
  <!-- 搜索引擎 -->
  <div id="search">
    <div class="timeBox">
      <div class="time" @click="showStart = true">
        <div>请选择时间范围</div>
        <div v-if="startAndEndTimeOne && startAndEndTimeTwo">{{ startAndEndTimeOne }}—{{ startAndEndTimeTwo }}</div>
        <div v-else><van-icon name="arrow" /></div>
      </div>
      <div class="icon" v-if="startAndEndTimeOne && startAndEndTimeTwo" @click="clearTime"><van-icon name="clear" size="16" /></div>
    </div>
    <van-popup v-model="showStart" position="bottom" :style="{ height: '50%' }">
      <div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '16px' }">
          请选择开始时间
        </van-divider>
        <van-datetime-picker
          v-model="currentDateStart"
          type="date"
          :min-date="minDateStart"
          :max-date="maxDateStart"
          @confirm="confirmStateTime"
          @cancel="showStart = false"
        />
      </div>
    </van-popup>
    <van-popup v-model="showEnd" position="bottom" :style="{ height: '50%' }">
      <div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '16px' }">
          请选择结束时间
        </van-divider>
        <van-datetime-picker
          v-model="currentDateEnd"
          type="date"
          :min-date="minDateEnd"
          :max-date="maxDateEnd"
          @confirm="confirmEndTime"
          @cancel="backToShowStart"
        />
      </div>
    </van-popup>
    <van-search
      v-model="keyword"
      show-action
      shape="round"
      placeholder="请输入文件名关键词"
      @search="onSearch"
    >
      <template #action>
        <div class="searchBtnStyle" @click="onSearch">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '', // 搜索框的内容
      minDateStart: new Date(1949, 0, 1),
      maxDateStart: new Date(),
      minDateEnd: new Date(1949, 0, 1),
      maxDateEnd: new Date(),
      currentDateStart: new Date(), // 开始时间
      currentDateEnd: new Date(), // 结束时间
      dateStart: '', // 选择后的开始时间
      dateEnd: '', // 选择后的结束时间
      showStart: false, // 选择开始时间弹框
      showEnd: false, // 选择结束时间按弹框
      startAndEndTimeOne: '', //开始和结束时间区间显示
      startAndEndTimeTwo: '' //开始和结束时间区间显示
    }
  },
  methods: {
    // 点击搜索按钮
    onSearch() {
      // if (this.keyword) {
        this.$emit('searchKeyWord', this.keyword)
      // }
    },
    // 选择结束时间的取消按钮
    backToShowStart() {
      this.showStart = true
      this.showEnd = false
    },
    // 开始时间弹框
    confirmStateTime(val) {
      this.showStart = false
      this.showEnd = true
      this.dateStart = this.moment(val).format('YYYY-MM-DD')
    },
    // 结束时间弹框
    confirmEndTime(val) {
      this.dateEnd = this.moment(val).format('YYYY-MM-DD')
      if (this.dateStart > this.dateEnd) {
        this.$toast.fail('开始时间不能大于结束时间')
        this.showEnd = true
      } else {
        this.showEnd = false
        this.startAndEndTimeOne = this.dateStart
        this.startAndEndTimeTwo = this.dateEnd
        let timeObj = {
          stime: this.dateStart,
          etime: this.dateEnd
        }
        this.$emit('selectTime', timeObj)
      }
    },
    // 清除时间范围
    clearTime() {
      this.startAndEndTimeOne = ''
      this.startAndEndTimeTwo = ''
      this.$emit('clearTime')
    },
    // 清除搜索框的内容和清除时间
    clearMsg() {
      this.keyword = ''
      this.startAndEndTimeOne = ''
      this.startAndEndTimeTwo = ''
    }
  }
}
</script>

<style lang="less" scoped>
#search {
  margin-top: 2px;
  margin-bottom: 2px;
  .timeBox {
    height: 45px;
    display: flex;
    background: #fff;
    margin: 0 0 2px 0;
    padding: 0 8px 0 15px;
    .time {
      flex: 1;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 8px;
    }
    .icon {
      flex: 0 0 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 4px;
    }
  }
  .searchBtnStyle {
    width: 80px;
    height: 100%;
    height: 0.95rem;
    line-height: 0.95rem;
    text-align: center;
    border-radius: 0 0.95rem 0.95rem  0;
    font-size: 14px;
    color: #fff;
  }
}
</style>
