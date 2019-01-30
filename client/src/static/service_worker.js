self.addEventListener('install', function(event) {
  console.log('service_worker.js is INSTALLED!!')
  // 대기상태를 건너뛰고 바로 활성화 된다.
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {})

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push message received', event)
  console.log(`
    [Service Worker] Push had this data: ${event.data.text()}`)

  const title = 'Push CodeLab'
  const options = {
    body: 'Yay it works',
    icon: 'https://talk.naver.com/static/img/bi_60.png'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] NOtification click Recevied.')

  event.notification.close()

  event.waitUntil(clients.openWindow('https://developers.google.com/web/'))
})
