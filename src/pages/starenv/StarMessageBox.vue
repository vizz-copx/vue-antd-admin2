<template>
  <div>
    <div v-for="(item,index) in history" :key="index">
      <a-card style="width: 100%;">
<!--        user message-->
        <span class="box" v-if="index%2===0">
          <span><a-avatar  shape="square" size="large" style="backgroundColor:#87d068">ME</a-avatar></span>
          <span class="message" v-html="makeVal(item)"></span>
          <div class="actions">
            <a-button type="dashed" icon="edit"></a-button>
          </div>
        </span>

<!--        bot message-->
        <span class="box" v-else>
          <span><a-avatar  shape="square" size="large" style="backgroundColor:#faad14" icon="robot"></a-avatar></span>
          <span class="message" v-html="makeVal(item)" ></span>
          <span class="actions">
            <a-button type="dashed" icon="copy"></a-button>
            <a-button type="dashed" icon="like"></a-button>
            <a-button type="dashed" icon="dislike"></a-button>
          </span>
        </span>
      </a-card>
    </div>

    <div v-html="makeVal(this.markdownContent)"></div>
  </div>
</template>

<script>
import myHistory from "@/pages/starenv/mockHistory";
import MarkdownIt from 'markdown-it';
import mdHighlightjs from 'markdown-it-highlightjs';
import "highlight.js/styles/atom-one-light.css";
import ClipboardJS from 'clipboard';

export default {
  name: "StarMessageBox",
  data() {
    return {
      history: myHistory,
      markdownContent: '# Hello, *Vue*!\n```java\n public static void main(){}\n```\n'
    }
  },
  computed: {
    compiledMarkdown() {
      const md = new MarkdownIt();
      md.use(mdHighlightjs);
      return md.render(this.markdownContent);
    }
  },
  created() {

  },
  mounted() {
    // this.$nextTick(() => {
    //   // 初始化复制按钮
    //   const codeBlocks = document.querySelectorAll('pre');
    //
    //   codeBlocks.forEach((codeBlock) => {
    //     const copyButton = document.createElement('button');
    //     copyButton.className = 'copy-button';
    //     copyButton.innerText = 'Copy';
    //
    //     codeBlock.parentNode.insertBefore(copyButton, codeBlock);
    //
    //     const clipboard = new ClipboardJS(copyButton, {
    //       target: () => codeBlock
    //     });
    //
    //     clipboard.on('success', (e) => {
    //       e.clearSelection();
    //       copyButton.innerText = 'Copied!';
    //       setTimeout(() => {
    //         copyButton.innerText = 'Copy';
    //       }, 2000);
    //     });
    //   });
    // });
  },
  methods:{
    makeVal(str){
      const md = new MarkdownIt();
      md.use(mdHighlightjs);
      return md.render(str);
    }
  }

}
</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: center;
}

.message {
  /*display: flex;*/
  width: 70%;
  /*min-width: 400px;*/
  padding: 0px 15px;
}

.actions{
  width:100px;
}
</style>
