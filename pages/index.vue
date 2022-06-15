<template>
  <div class="template">
    <div class="container">
      <h1>Hello Vue!</h1>
      <HdButton :modifier="'primary'" @click="addAction">Add</HdButton>
      <div class="template__news-list">
        <News v-for="item in news" :key="item.id" v-bind="item" @newsDelete="handleDelete"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HdButton } from 'homeday-blocks';
import News from '~/components/News.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HdButton,
    News
  },
  props: {
    defaultNews: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultNewsItem: {
        title: 'News!!!',
        content: `This is the news page!`,
      },
      news: this.defaultNews,
    }
  },
  methods: {
    addAction() {
      this.news.push({
        id: (+new Date).toString(36).slice(-8),
        ...this.defaultNewsItem,
      });
    },
    handleDelete(value: number) {
      this.news = this.news.filter(item => item.id !== value);
    }
  }
});
</script>

<style lang="scss">
.template {
  &__news-list {
    margin-top: 20px;
  }
}
</style>
