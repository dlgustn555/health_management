<template>
  <div>
    <b-button
      variant="primary"
      @click.stop="eventHandler">
      버튼 1
    </b-button>
  </div>
</template>

<script>
import { fromEvent, pipe, from } from 'rxjs'
import { pluck, filter } from 'rxjs/operators'
import { users } from './js/a'

export default {
  components: {},
  data() {
    return {
      a: '123'
    }
  },
  mounted() {
    console.log(users.filter(user => user.sex === 'M'))
    const users$ = from(users).pipe(filter(user => user.sex === 'M'))
    console.log(from(users$))
    users$.subscribe(user => console.log(user))

    const observer$ = {
      next: x => console.log(`Observer가 Observable로부터 받은 데이터 : ${x}`),
      error: err =>
        console.error(`Observer가 Observable로부터 받은 에러 데이터 : ${err}`),
      complete: () =>
        console.log('Observer가 Observable로부터 종료되었다는 알림을 받은 경우')
    }

    fromEvent(document, 'click')
      .pipe(pluck('target'))
      .subscribe(observer$)
  },
  methods: {
    eventHandler: function(x) {
      if (typeof x !== 'string') {
        console.log(x.target.tagName)
      }
      console.log(x)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
