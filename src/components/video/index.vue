<template>
<!-- video视频页面 -->
  <div id="videoPresentationIndex">
    <!-- <van-tabs v-model="activeName" title-active-color="#1989FA" line-width="0" line-height="0"> -->
    <van-tabs v-model="activeName" color="#1989FA" title-active-color="#1989FA">
      <van-tab title="功能模块类" name="a">
        <div class="videoBox">
          <div class="videoContent" v-for="(item, index) in pcFunction" :key="item.id" @click="playVideo(item, item.source, item.type, index)">
            <div class="img"><img src="../../assets/video/video.png" alt=""></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="应用场景类" name="b">
        <div class="videoBox">
          <div class="videoContent" v-for="(item, index) in pcApplication" :key="item.id" @click="playVideo(item, item.source, item.type, index)">
            <div class="img"><img src="../../assets/video/video.png" alt=""></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getVideoLists } from '@/api/api'

export default {
  data() {
    return {
      img: require('../../assets/video/video.png'),
      activeName: 'a',
      videoLists: [],
      pcFunction: [],
      pcApplication: []
    }
  },
  created() {
    this.getVideoList()
  },
  methods: {
    playVideo(item, source, type, index) {
      let itemObj = JSON.stringify(item)
      this.$router.push({
        path: 'playVideo',
        query: {
          item: itemObj,
          source,
          type,
          index
        }
      })
    },
    // 获取播放列表
    async getVideoList() {
      let { data } = await getVideoLists()
      this.videoLists = data
      localStorage.setItem('videoLists', JSON.stringify(data))
      this.videoLists.forEach(item => {
        if (item.source === 1 && item.type === 1) {
          this.pcFunction.push(item)
          localStorage.setItem('pcFunction', JSON.stringify(this.pcFunction))
        } else if (item.source === 1 && item.type === 2) {
          this.pcApplication.push(item)
          localStorage.setItem('pcApplication', JSON.stringify(this.pcApplication))
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#videoPresentationIndex {
  padding-bottom: 20px;
  background-color: #F5F5F5;
  .videoBox {
    display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
    margin: 0 10px;
    .videoContent {
      width: calc(50% - 5px);
      height: 200px;
      background:#fff;
      margin: 14px 0 0 0;
      border-radius: 6px;
      .img {
        width: 100%;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px 6px 0 0;
        }
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        padding: 4px;
        font-size: 14px;
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: center;
      }
    }
  }
}
</style>
