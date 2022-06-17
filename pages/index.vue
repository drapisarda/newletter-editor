<template>
  <div class="template">
    <div class="container">
      <button class="button" @click="handleAdd">Add</button>
      <div class="template__news-list">
        <NewsItem
          v-for="item in news"
          :key="item.id"
          v-bind="item"
          @newsDelete="handleDelete"
        ></NewsItem>
      </div>
    </div>

    <div class="container">
      <details class="email-preview">
        <summary>Email Preview</summary>
        <EmailPreview></EmailPreview>
      </details>
    </div>

    <div class="container">
      <details class="email-output">
        <summary>Results</summary>
        <EmailTemplateCode></EmailTemplateCode>
      </details>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HdButton } from 'homeday-blocks'
import NewsItem from '~/components/NewsItem.vue'
import EmailTemplateCode from '~/components/EmailTemplateCode.vue'
import EmailPreview from '~/components/EmailPreview.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HdButton,
    NewsItem,
    EmailTemplateCode,
    EmailPreview,
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
        url: 'google.it',
        title: 'News!!!',
        content: `This is the news page!`,
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
