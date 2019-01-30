const webpush = require('web-push')

// const vapidKeys = webpush.generateVAPIDKeys()

// webpush.setGCMAPIKey('AAAA5_fhjBw:APA91bHNpkVkYdc3ylTj-GsREmBmeVNolMYTTC8Or4s7bV4BUWJDNOhgKBv0llENNYaLpNqp2bgZEAC2G4LH6truaqnk5tZ5eARmIvIa6Ifa-JSzRmLPLyi-UfZoMFQKObMKTTnKavL9')

// const vapidKeys = {
//   publicKey: 'BKXUSosFB1UPM2nA7SJnVqYpi8u5vXKhPvYXrbUumqkFwHUlbfLcNS0tLJ8rC9DktmGrLjIewMe1J2nAYXPS0Co',
//   privateKey: '8yx_Of8TaU1lfr8lLqF_f0M6lSZozWJYOP0P0AVn'
// }

// webpush.setVapidDetails(
//   'mainto:dlgustn555@naver.com',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// )


const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/e3fxO7jB5LY:APA91bFbbnYfqeIu9u3BOZGF5JT4Bp5UNOuHhrirkR9GDVXNnLe9dztxxCNz2E70rm5bCsoMIrMwDo01fdSkGBOpzcUfD4qcY58WrY-A-zERiegFc_Sr2ApI6iBr7CkrGMR1AqqO4U5v',
  keys: {
    p256dh: 'BKXUSosFB1UPM2nA7SJnVqYpi8u5vXKhPvYXrbUumqkFwHUlbfLcNS0tLJ8rC9DktmGrLjIewMe1J2nAYXPS0Co',
    auth: '8yx_Of8TaU1lfr8lLqF_f0M6lSZozWJYOP0P0AVn-MA'
  }
}

const payload = '가나다라'

const option = {
  // setGCMAPIKey: webpush.get
}
webpush.sendNotification(pushSubscription)