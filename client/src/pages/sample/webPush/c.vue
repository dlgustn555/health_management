<template>
  <div>
    <h1>테스트</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    this.regist()
  },
  methods: {
    regist: function() {
      navigator.serviceWorker
        .register('/service_worker.js')
        .then(function() {
          return navigator.serviceWorker.ready
        })
        .then(function(reg) {
          console.log(reg)
          return reg.pushManager.subscribe({ userVisibleOnly: true })
        })
        .catch(function(err) {
          console.log('Service Worker init fail', err)
          throw err
        })
    }
  }
}
</script>
