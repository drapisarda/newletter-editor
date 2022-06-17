<template>
  <div class="template">
    <div class="container section is-small">
      <h2 class="is-size-3">Newsletter editor</h2>
    </div>

    <div class="container section">
      <div class="card">
        <div class="card-content">
          <NewsletterContent></NewsletterContent>
        </div>
      </div>
    </div>

    <div class="container section">
      <div class="card">
        <div class="card-content">
          <h2 class="is-size-3">Newletter items</h2>
          <button class="button" @click="handleAdd">Add a new item</button>
          <div class="template__news-list">
            <NewsItem
              v-for="item in news"
              :key="item.id"
              v-bind="item"
              @newsDelete="handleDelete"
            ></NewsItem>
          </div>
        </div>
      </div>
    </div>

    <div class="container section">
      <div class="card">
        <div class="card-content">
          <details class="email-preview">
            <summary>Email Preview</summary>
            <EmailPreview></EmailPreview>
          </details>
        </div>
      </div>
    </div>

    <div class="container section">
      <div class="card">
        <div class="card-content">
          <details class="email-output">
            <summary>Results</summary>
            <EmailTemplateCode></EmailTemplateCode>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NewsItem from '~/components/NewsItem.vue'
import EmailTemplateCode from '~/components/EmailTemplateCode.vue'
import EmailPreview from '~/components/EmailPreview.vue'
import NewsletterContent from '~/components/NewsletterContent.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NewsItem,
    EmailTemplateCode,
    EmailPreview,
    NewsletterContent,
  },
  props: {
    defaultNews: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultItem: {
        url: 'https://www.homeday.de/de/',
        title: 'This is a title for a good news!',
        content: 'Nice things happen here!',
      },
    }
  },
  computed: {
    news() {
      return this.$store.state.news.items
    },
  },
  methods: {
    handleAdd() {
      this.$store.commit('news/addOrUpdate', {
        id: (+new Date()).toString(36).slice(-8),
        ...this.defaultItem,
      })
    },
    handleDelete(value: number) {
      this.$store.commit('news/remove', value)
    },
  },
  watch: {
    news() {
      // this.$store.commit('news/updateNewsHtml', document.querySelector('.email-preview table'));
    },
  },
})
</script>

<style lang="scss">
.template {
  &__news-list {
    margin-top: 20px;
  }
}
</style>
