<template>
  <div>
    <h1>IndexedDB</h1>
    이름: <input
      v-model="hyunsu"
      type="text"><br>
    나이: <input
      v-model="age"
      type="number"><br>
    성별:
    남 <input
      v-model="sex"
      type="radio"
      value="m">
    여 <input
      v-model="sex"
      type="radio"
      value="f">
    <button @click="addStoreObejct">객체저장소에 데이터 추가</button>
    <br>
    <ul>
      <li
        v-for="({ hyunsu, age, sex }, index) in aInfo"
        :key="index">
        {{ hyunsu }} - {{ age }} - {{ sex }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hyunsu: '',
      age: 0,
      sex: 'm',
      vueTestDB: null,
      aInfo: []
    }
  },

  async mounted() {
    this.createIndexedDB()
    await this.getAllHyunsuData()
  },
  methods: {
    getDBInstance: function() {
      return 'db'
    },
    getAllHyunsuData: async function() {
      console.log('call!!')
      if (!this.vueTestDB) {
        console.log('vueTestDB IS NULL!!')
        return
      }

      const transaction = this.vueTestDB.taransaction('lee').objectStore('lee')
      transaction.openCursor().onsuccess = function(event) {
        const cursor = event.target.result
        if (!cursor) {
          return
        }
        console.log(cursor)
      }
    },

    addStoreObejct: function() {
      if (!this.vueTestDB) {
        console.log('vueTestDB IS NULL!!')
        return
      }

      const transaction = this.vueTestDB.transaction(
        ['lee', 'lim'],
        'readwrite'
      )

      let { hyunsu, age, sex } = this
      const _this = this
      transaction.objectStore('lee').put({
        hyunsu,
        age: +age,
        sex
      }).onsuccess = function(event) {
        console.log('SUCCESS!!')
        _this.hyunsu = ''
        _this.age = 0
        _this.sex = 'm'
      }

      transaction.oncomplete = function(event) {
        console.log('Store ADD COMPLETE!!!')
      }
    },

    createIndexedDB: async function() {
      const _this = this
      // 1. vueTestDB 데이터베이서 open 요청을 한다.
      const request = indexedDB.open('vueTestDB', 2)

      request.onerror = function(event) {
        console.log('error: ', event)
        alert('Databse error: ', event.target.errorCode)
      }

      // 2. "객체저장소" 생성을 한다.
      request.onupgradeneeded = function(event) {
        console.log('upgradeneede')
        vueTestDB = event.target.result
        vueTestDB.createObjectStore('lee', {
          keyPath: 'hyunsu'
        })
        vueTestDB.createObjectStore('lim', {
          keyPath: 'hana'
        })
      }

      // 3. 요청 성공
      request.onsuccess = function(event) {
        console.log('success')
        _this.vueTestDB = request.result
        console.log(this.vueTestDB)
      }
    }
  }
}
</script>
