<template>
  <div class="news card">
    <div class="card-content">
      <div class="news__input">
        <label class="label"for="url">Url:</label>
        <div class="news__value" @click="urlClick">
          <input v-if="urlEdit" class="input" type="text" v-model="url" />
          <p v-else>{{ url }}</p>
        </div>
      </div>
      <div class="news__input">
        <label class="label" for="title">Title:</label>
        <div class="news__value" @click="titleClick">
          <input v-if="titleEdit" class="input" type="text" v-model="title" />
          <h2 v-else>{{ title }}</h2>
        </div>
      </div>
      <div class="news__input">
        <label class="label" for="content">Content:</label>
        <div class="news__value" @click="contentClick">
          <textarea v-show="contentEdit" class="textarea" type="text" v-model="content" ref="contentTextArea" @input="handleTextAreaInput"/>
          <p  v-show="!contentEdit">{{ content }}</p>
        </div>
      </div>
      <div class="news__actions buttons">
        <button
          class="button is-primary"
          @click="saveAction"
          :disabled="!saveIsEnabled"
          >Save</button>
        <button class="button is-danger" @click="handleDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewsItem',
  components: {
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      urlEdit: false,
      titleEdit: false,
      contentEdit: false,
      url: '',
      title: '',
      content: '',
    }
  },
  computed: {
    saveIsEnabled() {
      return this.urlEdit || this.titleEdit || this.contentEdit
    },
  },
  created() {
    this.$nuxt.$on('contentEdit', (editingNewsId) => {
      if (this.id !== editingNewsId) this.disableEdit()
    })
  },
  mounted() {
    const { id, url, title, content } = this.$store.state.news.items.find(item => item.id === this.id)
    this.url = url
    this.title = title
    this.content = content
  },
  methods: {
    urlClick() {
      this.urlEdit = true
      this.$nuxt.$emit('contentEdit', this.id)
    },
    titleClick() {
      this.titleEdit = true
      this.$nuxt.$emit('contentEdit', this.id)
    },
    contentClick() {
      this.contentEdit = true
      this.$nuxt.$emit('contentEdit', this.id)
    },
    disableEdit() {
      this.urlEdit = false
      this.titleEdit = false
      this.contentEdit = false
    },
    saveAction() {
      this.$store.commit('news/addOrUpdate', {
        id: this.id,
        url: this.url,
        title: this.title,
        content: this.content,
      })

      this.disableEdit()
    },
    handleDelete() {
      this.$emit('newsDelete', this.id)
    },
    handleTextAreaInput() {
      this.$refs.contentTextArea.style.height = "";
      this.$refs.contentTextArea.style.height = this.$refs.contentTextArea.scrollHeight + "px";
    },
  },
}
</script>

<style lang="scss">
.news {
  background-color: #efefef;
  margin-bottom: 1em;

  &__input {
    display: flex;
    margin-bottom: 0.5em;
  }

  .label {
    flex: 1;
    margin-bottom: 0;
  }

  &__value {
    border: 1px solid #fefefe;
    display: flex;
    flex: 5;

    > * {
      padding: 0.3em 0.5em;
      border: none;
    }

    &--no-edit {
      border: none;
    }
  }

  input,
  textarea {
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }
}
</style>