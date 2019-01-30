<template>
  <div>
    <h3>Observable 객체를 생성하여 데이터 전파 & 해제 실습</h3>
    {{ (mNumber.length > 0) ? mNumber : '' }}
    <p>{{ complete }}</p>
    <br>
    <p>현재시각</p>
    <p
      v-for="(timer, index) in timers"
      :key="index">
      {{ timer }}
    </p>
  </div>
</template>
<script>
import { Observable, pipe } from 'rxjs'
import { map, subscribeOn } from 'rxjs/operators'

export default {
  data() {
    return {
      mNumber: [],
      complete: '',
      timers: ['']
    }
  },
  mounted() {
    this.getNumbers()
    this.getTimer()
  },
  methods: {
    getTimer: function() {
      // Observable 객체를 생성하여 데이터 셋팅
      // === new Observable(function sub...())
      const interval$ = Observable.create(function subscribe(observer) {
        const id = setInterval(function() {
          observer.next(new Date().toString())
        }, 1000)

        // unsubscribe() 호출시 실행되는 함수를 리턴
        return function() {
          console.log('intervale 제거')
          clearInterval(id)
        }
      })

      // 데이터 전파 ( subscribe )
      const subscription = interval$.subscribe(timer => this.timers.push(timer))

      // 구독 해지 ( unsubscribe )
      setTimeout(function() {
        subscription.unsubscribe()
      }, 1000 * 5)
    },

    getNumbers: function() {
      const numbers$ = new Observable(function subscribe(observer) {
        try {
          observer.next(1)
          observer.next(2)

          // throw new Error('데이터 전달 도중 에러가 발생!!')

          observer.next(3)
          observer.complete()
        } catch (e) {
          observer.error(e)
        }
      })

      numbers$.subscribe({
        next: number => this.mNumber.push(number),
        error: e => this.mNumber.push(e.message),
        complete: () => {
          this.complete = '작업이 완료되었습니다!'
        }
      })
    }
  }
}
</script>
