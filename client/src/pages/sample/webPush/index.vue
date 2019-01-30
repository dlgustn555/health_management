<template>
  <div>
    <h1>Chrome Web Push</h1>
    <p>{{ statusMessage }} !!</p>
    <button
      :disabled="isDisabled"
      @click="clickPushButton">
      {{ textContent }}
    </button>
    <pre>
      {{ responseText }}
    </pre>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      applicationServerPublicKey:
        'BKXUSosFB1UPM2nA7SJnVqYpi8u5vXKhPvYXrbUumqkFwHUlbfLcNS0tLJ8rC9DktmGrLjIewMe1J2nAYXPS0Co',
      swRegistration: null,
      isSubscribed: null,
      textContent: 'PUSH BUTTON',
      isDisabled: false,
      statusMessage: '',
      responseText: ''
    }
  },
  mounted() {
    this.registServiceWorker()
  },
  methods: {
    clickPushButton: function() {
      this.isDisabled = true
      if (this.isSubscribed) {
        // TODO
      } else {
        this.subscribeUser()
      }
    },

    subscribeUser: function() {
      const applicationServerKey = this.urlB64ToUint8Array(
        this.applicationServerPublicKey
      )
      const _this = this
      this.swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })
        .then(function(subscription) {
          console.log('User is subscribed: ', subscription)

          _this.responseText = JSON.stringify(subscription)
          _this.isSubscribed = true
          _this.updateBtnUI()
        })
    },

    // 서비스 워커 파일을 등록한다.
    registServiceWorker: function() {
      if ('serviceWorker' in navigator) {
        const target = this

        window.addEventListener('load', function() {
          navigator.serviceWorker
            // 크롬 > Application > Service Worker 에 해당 파일을 등록한다.
            .register('/service_worker.js')
            .then(function(registration) {
              console.log('Service Worker is registered', registration)
              target.swRegistration = registration
              target.initialiseUI()
            })
            .catch(function(err) {
              console.error(err)
            })
        })
      }
    },

    initialiseUI: function() {
      const target = this
      this.swRegistration.pushManager
        .getSubscription()
        .then(function(subscription) {
          target.isSubscribed = !(subscription === null)
          target.statusMessage = target.isSubscribed
            ? 'USER is Subscribed.'
            : 'USER is NOT Subscribed'

          target.updateBtnUI()
        })
    },

    updateBtnUI: function() {
      if (Notification.permission === 'denied') {
        this.textContent = 'Push Messaging Blocked.'
        this.isDisabled = true
        return
      }

      this.textContent = this.isSubscribed
        ? 'Disable Push Messaging'
        : 'Enable Push Messaging'
      this.isDisabled = false
    },

    urlB64ToUint8Array: function(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  }
}
</script>
