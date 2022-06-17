<template>
  <div class="email-preview">
    <table
      id="bgtable"
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      height="100%"
      width="100%"
      ref="bgtable"
    >
      <tr>
        <td align="center" valign="top">
          <!-- container 600px -->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="container"
            width="600"
          >
            <tr
              class="email-content"
            >
              <td>
                <p>{{ content }}</p>
              </td>
            </tr>
            <tr
              class="item"
              v-for="item in news"
              :key="item.id"
            >
              <td>
                <a class="email-title" v-bind:href="item.url">{{ item.title }}</a>
                <p class="email-content" v-text="item.content"></p>
              </td>
            </tr>
          </table>
          <!-- container 600px -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { component as VueCodeHighlight } from 'vue-code-highlight'
import emailTemplate from '../templates/emailTemplate.html?raw'

export default {
  name: 'EmailPreview',
  components: {
    VueCodeHighlight,
  },
  data() {
    return {
      contentPlaceholder: '<!-- content -->',
      tableStartPlaceholder: '<!-- background table start -->',
      tableEndPlaceholder: '<!-- background table end -->',
    }
  },
  computed: {
    news() {
      return this.$store.state.news.items
    },
    content() {
      return this.$store.state.news.content
    },
    emailTop() {
      return emailTemplate.substring(
        emailTemplate.indexOf(this.tableStartPlaceholder) +
          this.tableStartPlaceholder.length,
        emailTemplate.indexOf(this.contentPlaceholder)
      )
    },
    emailBottom() {
      return emailTemplate.substring(
        emailTemplate.indexOf(this.contentPlaceholder) +
          this.contentPlaceholder.length,
        emailTemplate.indexOf(this.tableEndPlaceholder)
      )
    },
    content() {
      return this.$store.state.news.content
    },
  },
  updated() {
    this.$store.commit('news/updateEmailHtml', this.$refs.bgtable.outerHTML)
  },
}
</script>

<style lang="scss">
@import '../styles/email.css';
.email-preview {
}
</style>