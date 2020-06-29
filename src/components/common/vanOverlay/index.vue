<template>
  <!-- 遮罩层 加载 -->
  <van-overlay :show="showLoding" @click="showLoding = false" z-index="9999" :custom-style="{background: 'transparent'}">
    <div class="wrapper" @click.stop>
      <van-loading type="spinner" color="#1989fa"></van-loading>
      <!-- <van-loading type="spinner" color="#1989fa">文件加载中...</van-loading> -->
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    showLoding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
