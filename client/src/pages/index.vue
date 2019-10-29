<template>
  <div>
    <p>userAnge: {{ userAgent }}</p>
    <p>naverAppUserAgentRegEx: {{ naverAppUserAgentRegEx }}</p>
    <p>matchingData: {{ matchingData }}</p>
    <p>isNaverApp: {{ isNaverApp }}</p>
    <p>serviceCode: {{ getNaverAPPInfo().serviceCode }}</p>
    <p>appVersion: {{ getNaverAPPInfo().appVersion }}</p>
    <p>isIOS: {{ isIOS }}</p>
    <a href="http://itunes.apple.com/kr/app/id393499958?mt=8">Apple Store > Naver</a>

    <a
      href="/#"
      @click.prevent="friendsAgreemntUrl">친구이용동의 약관</a>
  </div>
</template>
<script>
import { getUA, isAndroid, isIOS } from 'mobile-device-detect'
const naverAppUserAgentRegEx = /NAVER\([inapp|higgs]+;[^0-9]*search;[^0-9]*(\d+);[^0-9]*(\d+.\d+.\d+).*\)/gim

export default {
  data() {
    return {
      userAgent: getUA,
      naverAppUserAgentRegEx,
      friends: 'https://dev.friends.naver.com',
      pay: 'https://new-alpha-m.pay.naver.com'
    }
  },
  computed: {
    matchingData() {
      return this.naverAppUserAgentRegEx.exec(this.userAgent)
    },
    isNaverApp() {
      const { isNaverApp } = this.getNaverAPPInfo()
      return isNaverApp
    }
  },
  methods: {
    getNaverAPPInfo() {
      return !this.matchingData
        ? {
            userAgent: this.userAgent,
            isNaverApp: false,
            serviceCode: 0,
            appVersion: 0,
            availableTouchId: false,
            availableOfflineQR: false,
            availableMiniApp: false
          }
        : {
            userAgent: this.userAgent,
            match: this.matchingData[0],
            isNaverApp: true,
            serviceCode: this.matchingData[1],
            appVersion: this.matchingData[2]
          }
    },
    friendsAgreemntUrl() {
      if (this.isNaverApp) {
        window.location.href = `${
          this.friends
        }/home?svc=pay&url=${encodeURIComponent(this.pay)}`
      } else if (isAndroid || isIOS) {
        window.location.href = `intent://inappbrowser?version=30&url=${encodeURIComponent(
          `${this.friends}/home?svc=pay&url=`
        )}${
          this.pay
        }#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end`
        if (isIOS) {
          const appstoreUrl = 'http://itunes.apple.com/kr/app/id393499958?mt=8'
          const clickedAt = +new Date()
          setTimeout(() => {
            if (+new Date() - clickedAt < 2000) {
              window.locataion.href = appstoreUrl
            }
          }, 1500)
        }
      }
    }
  }
}
</script>
