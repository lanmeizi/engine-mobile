<template>
  <!-- 底部导航 -->
  <div id="tabbar">
    <div v-if="selectedID === 'a'">
      <van-tabbar v-model="active" @change="change" :border="false">
        <van-tabbar-item>
          <span>法规分类</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>法规层级</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>一键上传</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>{{ chooseUp1 }}</span>
          <template #icon="props">
            <img :src="props.active && flag1 ? icon3.active : icon3.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div v-if="selectedID === 'b'">
      <van-tabbar v-model="active" @change="change" :border="false">
        <van-tabbar-item>
          <span>法规分类</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>法规层级</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>一键上传</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>{{ chooseUp2 }}</span>
          <template #icon="props">
            <img :src="props.active && flag2 ? icon3.active : icon3.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div v-if="selectedID === 'c'">
      <van-tabbar v-model="active" @change="change" :border="false">
        <van-tabbar-item>
          <span>法规分类</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>法规层级</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>一键删除</span>
          <template #icon="props">
            <img :src="props.active ? icon4.active : icon4.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>{{ delWord }}</span>
          <template #icon="props">
            <img :src="props.active && flag3 ? icon5.active : icon5.inactive" />
          </template>
        </van-tabbar-item>
        <!-- <van-tabbar-item>
          <span>删除废止</span>
          <template #icon="props">
            <img :src="props.active ? icon4.active : icon4.inactive" />
          </template>
        </van-tabbar-item> -->
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedID: {
      type: String
    }
  },
  data() {
    return {
      active: -1,
      icon: {
        active: require('../../../assets/index/tab3.png'),
        inactive: require('../../../assets/index/tab3.png'),
      },
      icon1: {
        active: require('../../../assets/index/tab4.png'),
        inactive: require('../../../assets/index/tab4.png'),
      },
      icon2: {
        active: require('../../../assets/index/tab1.png'),
        inactive: require('../../../assets/index/tab1.png'),
      },
      icon3: {
        active: require('../../../assets/index/tab2.png'),
        inactive: require('../../../assets/index/tab2.png'),
      },
      icon4: {
        active: require('../../../assets/index/delete.png'),
        inactive: require('../../../assets/index/delete.png'),
      },
      icon5: {
        active: require('../../../assets/index/cdelete.png'),
        inactive: require('../../../assets/index/cdelete.png'),
      }
    }
  },
  computed: {
    delWord() {
      return this.$store.state.choose.delWord
    },
    chooseUp1() {
      return this.$store.state.choose.chooseUp1
    },
    chooseUp2() {
      return this.$store.state.choose.chooseUp2
    },
    flag1() {
      return this.$store.state.choose.flag1
    },
    flag2() {
      return this.$store.state.choose.flag2
    },
    flag3() {
      return this.$store.state.choose.flag3
    },
    lists() {
      return this.$store.state.choose.lists
    }
  },
  methods: {
    change(active) {
      if (active === 0) {
        this.active = -1
        this.$emit('alertBars')
      } else if (active === 1) {
        this.active = -1
        this.$emit('alertCengji')
      } else if (active === 2) {
        this.active = -1
        this.$emit('updateOrDelete')
      } else if (active === 3) {
        this.active = -1
        this.$emit('chooseUpdateOrDelete')
      }
      // else if (active === 4) {
      //   this.active = -1
      //   this.$emit('deleteAbolish')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
