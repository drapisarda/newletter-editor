<template>
  <div class="email-template">
    <vue-code-highlight language="html" :key="renderKey">
      <pre v-text="emailTop"></pre>
      <pre v-text="generatedHtml"></pre>
      <pre v-text="emailBottom"></pre>
    </vue-code-highlight>
  </div>
</template>

<script lang="ts">
import { component as VueCodeHighlight } from 'vue-code-highlight'
import emailCss from '../styles/email.css?raw'
import emailTemplate from '../templates/emailTemplate.html?raw'

export default {
  name: 'EmailTemplateCode',
  components: {
    VueCodeHighlight,
  },
  mounted() {
    this.handleContentChange();
  },
  created() {
    this.$nuxt.$on('updateCode', this.handleContentChange);
  },
  data() {
    return {
      contentPlaceholder: '<!-- content -->',
      tableStartPlaceholder: '<!-- background table start -->',
      tableEndPlaceholder: '<!-- background table end -->',
      generatedHtml: this.$store.state.news.emailHtml,
      renderKey: 0,
    }
  },
  computed: {
    emailTop() {
      const fill = emailTemplate.replace('<style type="text/css"></style>', `<style type="text/css"> \n${emailCss}\n</style>`)
      return fill.substring(0, fill.indexOf(this.contentPlaceholder))
    },
    emailBottom() {
      return emailTemplate.substring(emailTemplate.indexOf(this.contentPlaceholder) + this.contentPlaceholder.length)
    },
  },
  methods: {
    handleContentChange() {
      this.generatedHtml = this.$store.state.news.emailHtml;
      this.renderKey++;
    },
  }
}
</script>

<style lang="scss">
@import 'vue-code-highlight/themes/prism-coy.css';
.email-template {
  pre code{
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>