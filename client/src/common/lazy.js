export default {
  filter: function*(f, iter) {
    for (const item of iter) {
      if (f(item)) {
        yield item
      }
    }
  },
  take: function*(limit, iter) {
    for (const item of iter) {
      yield item
      if (--limit === 0) {
        break
      }
    }
  }
}
