<template>
  <div>
    <p>userAnge: {{ userAgent }}</p>
    <p>naverAppUserAgentRegEx: {{ naverAppUserAgentRegEx }}</p>
    <p>matchingData: {{ matchingData }}</p>
    <p>isNaverApp: {{ isNaverApp }}</p>
    <p>serviceCode: {{ getNaverAPPInfo().serviceCode }}</p>
    <p>appVersion: {{ getNaverAPPInfo().appVersion }}</p>
    <a href="intent://qmenu=voicerecg&version=1#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end">페이 홈으로 이동</a>
  </div>
</template>
<script>
import { getUA } from 'mobile-device-detect'
const naverAppUserAgentRegEx = /NAVER\([inapp|higgs]+;[^0-9]*search;[^0-9]*(\d+);[^0-9]*(\d+.\d+.\d+).*\)/gim

export default {
  data() {
    return {
      userAgent: getUA,
      naverAppUserAgentRegEx
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
    }
  }
}
</script>
