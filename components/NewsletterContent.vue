<template>
  <div class="content">
    <label class="label">Newsletter intro</label>
    <textarea
      class="textarea"
      v-model="content"
      placeholder="e.g. Hello world"
    ></textarea>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'

export default {
  name: 'NewsletterContent',
  components: {},
  props: {},
  data() {
    return {
      contentEdit: false,
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
  mounted() {},
  methods: {
    contentClick() {
      this.contentEdit = true
      this.$nuxt.$emit('contentEdit', this.id)
    },
    disableEdit() {
      this.contentEdit = false
    },
    handleSave() {
      this.$store.commit('news/addOrUpdateContent', this.content)

      this.disableEdit()
    },
  },
  watch: {
    content: _debounce(function (value) {
      this.handleSave()
    }, 500),
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