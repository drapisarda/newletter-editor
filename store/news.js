export const state = () => ({
  items: [],
  emailHtml: '',
  content: '',
})

export const getter = {
  getNews(state) {
    return state.items
  },
}

export const mutations = {
  addOrUpdate(state, item) {
    const storedItem = state.items.find(i => i.id === item.id);
    if (storedItem) {
      Object.assign(storedItem, item);
    } else state.items.push(item)

    $nuxt.$emit('contentEdit')
  },
  remove(state, id) {
    state.items = state.items.filter(item => item.id !== id)
    $nuxt.$emit('contentEdit')
  },
  updateEmailHtml(state, html) {
    state.emailHtml = html
    $nuxt.$emit('updateCode')
  },
  addOrUpdateContent(state, content) {
    state.content = content;
  }
}

export const actions = {
}