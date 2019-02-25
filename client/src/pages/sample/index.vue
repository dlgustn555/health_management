<template>
  <div>
    <div
      style="border: 1px solid black;position:relative;"
      @click="addTags">
      <img src="~assets/images/7.jpg">
      <div
        v-for="(tag, index) in tags"
        :style="tag.oStyle"
        :key="index"
        class="tag"
        @click.stop="updateTag(tag, 'form')">
        <span v-if="tag.status === 'none'">{{ tag.name }}</span>
        <a
          v-else-if="tag.status === 'done'"
          target="_blank"
          @click.stop="clickTagLink(tag, $event)">{{ tag.name }}</a>
        <div v-else>
          <p>태그명 : <input
            v-model="tag.name"
            type="text"></p>
          <p>링크 : <input
            v-model="tag.href"
            type="text"></p>
          <button @click.stop="updateTag(tag, 'done')">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      a: 'abcd',
      count: 0,
      tags: []
    }
  },
  mounted() {
    console.log('page')
  },
  methods: {
    addTags(event) {
      const id = this.count++
      const tag = {
        id,
        name: `tagName_${id}`,
        href: '',
        status: 'none',
        oStyle: {
          top: event.clientY + 'px',
          left: event.clientX + 'px'
        }
      }
      this.tags.push(tag)
    },
    updateTag(tag, status) {
      tag.status = status
      this.tags = this.tags.map(t => (t.id === tag.id ? tag : t))
    },
    clickTagLink(tag, event) {
      event.preventDefault()
      location.href = tag.href
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
.tag {
  position: absolute;
  top: 0;
  left: 0;
  background: silver;
}
</style>
