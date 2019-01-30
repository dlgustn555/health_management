<template>
  <div>
    <textarea v-model="pushText" />
    <button @click="clickWebPush">
      크롬알림 푸시
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pushText: ''
    }
  },
  methods: {
    clickWebPush: function() {
      const notification = new Notification('크롭 웹 푸시알림', {
        body: this.pushText,
        timestamp: 360370800000,
        icon: 'https://talk.naver.com/static/img/bi_60.png'
      })

      console.log(this.pushText)

      notification.onclick = function(event) {
        notification.close()
        window.open('http://blog.naver.com/naver_talk/220869831326')
      }
    }
  }
}
</script>
