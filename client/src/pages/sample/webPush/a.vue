<template>
  <div>
    <h1>크롭 웹 푸시 등록</h1>
    <span>웹푸시 ON/OFF</span>
    <input
      :checked="isUseWebPush"
      type="checkbox">
    <button
      :disabled="isDisabled"
      @click="toggleUseWebPush">
      {{ toggleText }}
    </button>
    <br>
  </div>
</template>
<script>
import { applicationServerPublicKey, urlB64ToUint8Array } from '../js/utils.js'

export default {
  data() {
    return {
      isUseWebPush: false,
      toggleText: '크롬웹 푸시 등록',
      serviceWorker: null,
      isDisabled: false
    }
  },
  mounted() {
    this.initRegistServiceWorker()
  },
  methods: {
    initRegistServiceWorker: function() {
      if ('serviceWorker' in navigator) {
        const _this = this
        window.addEventListener('load', function() {
          navigator.serviceWorker
            .register('/service_worker.js')
            .then(function(registration) {
              console.log('서비스워커 js 파일 등록됨.', registration)
              _this.serviceWorker = registration
              _this.checkIsUseWebPush()
            })
        })
      }
    },

    checkIsUseWebPush: function() {
      const _this = this
      this.serviceWorker.pushManager
        .getSubscription()
        .then(function(subscription) {
          _this.isUseWebPush = subscription !== null
          if (_this.isUseWebPush) {
            _this.toggleText = '크롭웹 푸시 구독 중'
            _this.isUseWebPush = true
          }
        })
        .catch(function(error) {
          console.log('Regist Error : ', error)
        })
    },

    toggleUseWebPush: function() {
      const callServiceWorker = this.isUseWebPush ? null : this.subscribeWebPush
      callServiceWorker()
    },

    // 크롭웹 푸시 구독!!
    subscribeWebPush: function() {
      console.log('subscribe Web!!')

      const applicationServerKey = urlB64ToUint8Array(
        applicationServerPublicKey
      )

      const _this = this
      this.serviceWorker.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })
        .then(function(subscription) {
          console.log('User is subscribe!! :', subscription)
          console.log(subscription.endpoint)
          _this.isDisabled = true
          _this.toggleText = '크롭웹 푸시 구독 중'
          _this.isUseWebPush = true
        })
        .catch(function(error) {
          console.log('WebPush Subscribe Fail!! : ', error)
        })
    }
  }
}
</script>
