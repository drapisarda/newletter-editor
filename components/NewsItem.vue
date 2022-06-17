<template>
  <div class="news card">
    <div class="card-content">
      <div class="news__input">
        <label>ID:</label>
        <div class="news__value news__value--no-edit">
          {{ id }}
        </div>
      </div>
      <div class="news__input">
        <label for="url">Url:</label>
        <div class="news__value" @click="urlClick">
          <input v-if="urlEdit" type="text" v-model="url" />
          <p v-else>{{ url }}</p>
        </div>
      </div>
      <div class="news__input">
        <label for="title">Title:</label>
        <div class="news__value" @click="titleClick">
          <input v-if="titleEdit" type="text" v-model="title" />
          <h2 v-else>{{ title }}</h2>
        </div>
      </div>
      <div class="news__input">
        <label for="content">Content:</label>
        <div class="news__value" @click="contentClick">
          <textarea v-show="contentEdit" type="text" v-model="content" ref="contentTextArea" @input="handleTextAreaInput"/>
          <p  v-show="!contentEdit">{{ content }}</p>
        </div>
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
</template>

<script>
import { HdButton } from 'homeday-blocks'

export default {
  name: 'NewsItem',
  components: {
    HdButton,
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
  watch: {
    // url: _debounce(function () {
    //   console.log('LOL')
    //   this.urlEdit = false

    //   if (this.title && this.content) return

    //   scrape(this.url)
    //     .then((metadata) => {
    //       console.log('metadata', metadata);
    //       // if (!this.title)
    //       //   this.title = metadata.getContentByPropertyName('title')
    //       // if (!this.content)
    //       //   this.content = metadata.getContentByPropertyName('description')
    //     })
    // }, 300),
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

  label {
    flex: 1;
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