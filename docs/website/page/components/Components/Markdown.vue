<template>
  <div :class="`${article}-container markdown`" v-html="content">
  </div>
</template>

<script>
/*global hljs*/

import backend from '../../../../zh-cn/quick/backend.md';
import frontend from '../../../../zh-cn/quick/frontend.md';
// android
import be from '../../../../zh-cn/desc/backend.md';
import fe from '../../../../zh-cn/desc/frontend.md';
import db from '../../../../zh-cn/desc/db.md';
import dev from '../../../../zh-cn/desc/dev.md';



import { highlightInit } from '../../util/utils.js';

const mdList = {
  // ['Quickstart'.toLowerCase()]: Quickstart,
  'backend': backend,
  'frontend': frontend,
  'be': be,
  'fe': fe,
  'db': db,
  'dev': dev,
};

export default {
  name: 'Markdown',
  props: {
    article: {
      type: String,
    },
  },
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    article() {
      this.render();
    },
  },

  methods: {
    render() {
      const article = mdList[this.article];
      if (article == null) {
        console.error(`Error rendering ${this.article}`);
      } else {
        this.content = article;
        this.$nextTick(() => {
          highlightInit(hljs);
        });
      }
    },
  },
};
</script>

<style lang="sass">
.markdown {

  a {
    color: #e81000;
    font-weight: 600;
    margin: 0 2px;
  }

  h1 {
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    color: #222;
  }

  h2 {
    margin-top: 50px;
    font-size: 16px;
    line-height: 24px;
    color: #222;
    font-weight: bold;
  }

   h3 {
    margin-top: 20px;
    font-size: 14px;
    line-height: 14px;
    color: #222;
    font-weight: bold;
  }

  p {
    margin-top: 10px;
    color: #737373;

    &+p {
      margin-top: 5px;
    }
  }

  ul,ol {
    margin-top: 10px;
  }

  li {
    list-style-type: circle;
    a {
      color: #737373;
    }
  }

  img {
    max-width: 100%;
  }

  blockquote {
    border-left: 5px solid #80B0F8;
    padding-left: 5px;
    background-color: #F5F5F5;
  }

  pre {
    margin-top: 10px;
    border-left: 5px solid #EADBD9;
    background-color: #F5F5F5;
    overflow-x: auto;
  }

  code {

  }
}
</style>
