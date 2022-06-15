<template>
  <div class="news">
    <div class="container">
      <div class="news__input">
        <h1>{{ id }}</h1>
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
          <h2 v-else class="news__value">{{ title }}</h2>
        </div>
      </div>
      <div class="news__input">
        <label for="content">Content:</label>
        <div class="news__value" @click="contentClick">
          <textarea v-if="contentEdit" type="text" v-model="content" />
          <p v-else>{{ content }}</p>
        </div>
      </div>
    </div>
    <div class="news__actions">
      <HdButton
        :modifier="'primary'"
        @click="saveAction"
        :disabled="!saveIsEnabled"
        >Save</HdButton
      >
      <HdButton :modifier="'primary'" @click="handleDelete">Delete</HdButton>
    </div>
  </div>
</template>

<script>
import { HdButton } from 'homeday-blocks'

export default {
  name: 'News',
  components: {
    HdButton,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    defaultUrl: {
      type: String,
      default: '',
    },
    defaultTitle: {
      type: String,
      default: '',
    },
    defaultContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      urlEdit: false,
      titleEdit: false,
      contentEdit: false,
      url: this.defaultUrl,
      title: this.defaultTitle,
      content: this.defaultContent,
    }
  },
  computed: {
    saveIsEnabled() {
      return this.urlEdit || this.titleEdit || this.contentEdit
    },
  },
  created() {
    this.$nuxt.$on('contentEdit', (editingNewsId) => {
      console.log('contentEdit', editingNewsId)
      if (this.id !== editingNewsId) this.disableEdit()
    })
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
      this.$nuxt.$emit('newsSave', {
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
  },
}
</script>

<style lang="scss">
.news {
  background-color: #f500f5;
  margin-bottom: 1em;

  &__input {
    display: flex;
    margin-bottom: 0.5em;
  }

  &__value {
    border: 1px solid #fefefe;
    flex: 1;
  }

  input,
  textarea {
    width: 100%;
  }
}
</style>