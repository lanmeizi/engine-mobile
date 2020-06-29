<template>
<!-- video视频播放页面 -->
  <div id="videoPresentationPlayVideo">
    <div class="videoBox">
       <!-- muted -->
      <video :src="playFileurl" loop="loop" autoplay id="video" controls webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-orientation="h5" x5-video-player-fullscreen="true" preload="auto"></video>
    </div>
    <div class="showPlayVideoTitle">
      <div class="playVideoTitle">{{ showPlayVideoTitle }}</div>
      <div class="changeVideoType">
        <div v-if="videoPcType === 1" class="word" @click="changeWatchVideoType(1)">观看应用场景类</div>
        <div v-else class="word" @click="changeWatchVideoType(2)">观看功能模块类</div>
      </div>
    </div>
    <div class="videoTypeTitle">
      {{ videoPcType === 1 ? '功能模块类' : '应用场景类' }}
    </div>
    <div class="videoLists">
      <div v-if="videoPcType === 1">
        <div v-for="(item, index) in pcFunction" :key="item.id" class="list" :class="{'activeStyle': playFunVideoIndex === index}" @click="playVideo(item, index)">
          <p>{{item.title}}</p>
          <p v-if="playFunVideoIndex === index && watchVideoPlayOrStop"><img src="../../assets/video/2.gif" alt=""></p>
          <p v-else-if="playFunVideoIndex === index && !watchVideoPlayOrStop"><img src="../../assets/video/stop.png" alt=""></p>
          <p v-else><img src="../../assets/video/play.png" alt=""></p>
        </div>
      </div>
      <div v-if="videoPcType === 2">
        <div v-for="(item, index) in pcApplication" :key="item.id" class="list" :class="{'activeStyle': playAppVideoIndex === index}" @click="playVideo(item, index)">
          <p>{{item.title}}</p>
          <p v-if="playAppVideoIndex === index && watchVideoPlayOrStop"><img src="../../assets/video/2.gif" alt=""></p>
          <p v-else-if="playAppVideoIndex === index && !watchVideoPlayOrStop"><img src="../../assets/video/stop.png" alt=""></p>
          <p v-else><img src="../../assets/video/play.png" alt=""></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLists: [],
      pcFunction: [],
      pcApplication: [],
      playFileurl: '',
      itemList: {},
      showPlayVideoTitle: '',
      videoPcType: 1, //视频分类  视频分类1=功能类，2=应用类
      videoSource: 1, //视频来源 1 PC端  2 移动端
      playFunVideoIndex: 0,
      playAppVideoIndex: 0,
      watchVideoPlayOrStop: true
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   document.getElementById('video').addEventListener('WeixinJSBridgeReady', () => {
    //     console.log('123')
    //     document.getElementById("video").play()
    //   })
    // })

    this.videoData()
    this.watchControlsStatu()

  },
  methods: {
    // 数据
    videoData() {
      this.videoLists = JSON.parse(localStorage.getItem('videoLists'))
      this.pcFunction = JSON.parse(localStorage.getItem('pcFunction'))
      this.pcApplication = JSON.parse(localStorage.getItem('pcApplication'))
      this.itemList = JSON.parse(this.$route.query.item)
      this.videoPcType = JSON.parse(this.$route.query.type)
      this.videoSource = JSON.parse(this.$route.query.source)
      this.showPlayVideoTitle = this.itemList.title
      this.playFileurl = this.itemList.fileurl

      if (this.$route.query.source === 1 && this.$route.query.type === 1) {
        this.playFunVideoIndex = this.$route.query.index
        this.playAppVideoIndex = -1
      } else if (this.$route.query.source === 1 && this.$route.query.type === 2) {
        this.playAppVideoIndex = this.$route.query.index
        this.playFunVideoIndex = -1
      }

      // console.log('this.playFunVideoIndex', this.playFunVideoIndex)
      // console.log('this.$route.query', this.$route.query)
      // console.log('this.itemList', this.itemList)
    },
    // 点击列表播放视频
    playVideo(item, index) {
      this.playFunVideoIndex = index
      if (item.type === 1 && item.fileurl) {
        this.playFunVideoIndex = index
        this.playAppVideoIndex = -1
        this.playFileurl = item.fileurl
        this.showPlayVideoTitle = item.title
      } else {
        if (item.type === 1) {
          this.playFunVideoIndex = index
          this.playAppVideoIndex = -1
          this.playFileurl = item.fileurl
          this.showPlayVideoTitle = item.title
        } else if (item.type === 2) {
          this.playAppVideoIndex = index
          this.playFunVideoIndex = -1
          this.playFileurl = item.fileurl
          this.showPlayVideoTitle = item.title
        }
      }
    },
    // 点击改变播放类型
    changeWatchVideoType(type) {
      if (type === 1) {
        this.videoPcType = 2
      } else if (type === 2) {
        this.videoPcType = 1
      }
    },
    // 监听视频是播放还是暂停状态
    watchControlsStatu() {
      let video = document.getElementById('video')
      const that = this
      video.addEventListener('play', function() {
        that.watchVideoPlayOrStop = true
        // console.log('播放')
      })
      video.addEventListener('pause', function() {
        that.watchVideoPlayOrStop = false
        // console.log('暂停')
      })
    }
  }
}
</script>

<style lang="less" scoped>
#videoPresentationPlayVideo {
  height: 100vh;
  .videoBox {
    width: 100%;
    height: 40vh;
    #video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .showPlayVideoTitle {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .playVideoTitle {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      padding-left: 10px;
    }
    .changeVideoType {
      flex: 0 0 110px;
      font-size: 12px;
      .word {
        background: #ccc;
        padding: 4px 0 4px 8px;
        border-radius: 12px 0 0 12px;
      }
    }
  }
  .videoTypeTitle {
    padding: 0 10px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .videoLists {
    height: 40vh;
    overflow-y: scroll;
    padding: 0 10px;
    .list {
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      height: 50px;
      img {
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }
    }
    .activeStyle {
      color: #F0691C;
    }
  }
}
</style>
