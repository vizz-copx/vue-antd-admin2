<template>
  <div>
    <welcome v-show="welcome" @question="onSendMsg" style="height: 90vh;">

    </welcome>
    <!--    <a-button icon="snippets" type="dashed"></a-button>-->
    <!--    <a-button icon="check" type="dashed"></a-button>-->
    <div style="height: calc(100vh - 185px);overflow: auto;" class="beauty-scroll" ref="scrollArea">
      <div v-for="(item,index) in history" :key="index">
        <a-card style="width: 100%;" class="user-card" v-if="index%2===0">
          <!--        user message-->
          <span class="box">
          <span><a-avatar shape="square" size="large" style="background-color:#23a6d5">ME</a-avatar></span>
          <span class="message" v-html="makeVal(item)"></span>
          <span class="actions">
          </span>
        </span>
        </a-card>

        <a-card style="width: 100%;" class="bot-card" v-else>
          <!--        bot message-->
          <span class="box">
          <span><a-avatar shape="square" size="large" style="background-color:#23d5ab" icon="robot"></a-avatar></span>
          <span class="message" v-html="makeVal(item)"></span>
          <span class="actions">
<!--            <a-button type="dashed" icon="copy"></a-button>-->
            <a-button type="dashed" icon="like"></a-button>
            <a-button type="dashed" icon="dislike"></a-button>
          </span>
        </span>
        </a-card>
      </div>
    </div>


    <!--    <a-affix :offset-bottom="0">-->
    <div class="prompt-card">

         <a-tooltip title="清除当前对话信息">
          <a-button class="prompt-btn" size="large" icon="delete" @click="history=[]"></a-button>
        </a-tooltip>

<!--        <a-tooltip title="下载当前对话信息">-->
<!--          <a-button class="prompt-btn" size="large" icon="download"></a-button>-->
<!--        </a-tooltip>-->

<!--        <a-tooltip title="切换历史对话模式">-->

<!--          <a-button class="prompt-btn" :type="historyMode?'primary':''" size="large" icon="history"-->
<!--                    @click="historyMode=!historyMode"></a-button>-->
<!--        </a-tooltip>-->
        <a-textarea
            class="prompt-input"
            style="font-size: larger;height: 40px;"
            placeholder="Enter键发送,Shift+Enter换行"
            autoSize
            @keydown.native="Keydown"
            v-model="prompt"
        />

      <a-spin :spinning="isSpin" style="margin: 10px"/>
      </div>

    <!--    </a-affix>-->

    <div ref="scrollContainer"></div>

  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import mdHighlightjs from 'markdown-it-highlightjs';
import "highlight.js/styles/vs2015.css";
import ClipboardJS from 'clipboard';
import welcome from './welcome.vue';  //引入组件

export default {
  name: "StarMessageBox",
  components: {
    welcome
  },
  data() {
    return {
      welcome:true,
      isSpin: false,
      history: [],
      prompt: '',
      historyMode: false,
      enhancedCodeBlockNum: 0,
      systemPrompt: 'Below is an instruction that describes a task. Write a response that appropriately completes the request.'
    }
  },
  computed: {},
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.flushCB()
    });
  },
  methods: {
    scrollToBottom() {
      // const container = this.$refs.scrollContainer;
      // container.scrollTop = container.scrollHeight;
      // this.$refs.scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });

      const container = this.$refs.scrollArea;
      container.scrollTop = container.scrollHeight + 50;
      this.$refs.scrollArea.scrollIntoView({behavior: 'smooth', block: 'end'});

      // window.scrollTo({
      //   top: document.documentElement.scrollHeight,
      //   behavior: 'smooth'
      // });
      // window.scrollTo({
      //   top: document.documentElement.scrollHeight,
      //   behavior: 'smooth'
      // });

      // const codeBlocks = document.querySelectorAll('pre');
      // const lastCB = codeBlocks[codeBlocks.length - 1];
      // if (lastCB) {
      //   lastCB.scrollIntoView({behavior: 'smooth', block: 'end'});
      // }
    },
    enhanceCodeBlock(codeBlock) {
      let copyLogo = '<button data-v-1bdf03e4="" type="button" class="ant-btn ant-btn-dashed ant-btn-icon-only" ant-click-animating-without-extra-node="false"><i aria-label="图标: snippets" class="anticon anticon-snippets"><svg viewBox="64 64 896 896" data-icon="snippets" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M832 112H724V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H500V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H320c-17.7 0-32 14.3-32 32v120h-96c-17.7 0-32 14.3-32 32v632c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32v-96h96c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM664 888H232V336h218v174c0 22.1 17.9 40 40 40h174v338zm0-402H514V336h.2L664 485.8v.2zm128 274h-56V456L544 264H360v-80h68v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h152v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h68v576z"></path></svg></i></button>'

      const codeTools = document.createElement('div')
      codeTools.style.textAlign = 'right'

      //显示代码类型
      const codeLabel = document.createElement('span')
      const classInfo = codeBlock.querySelector('code').getAttribute('class').split('language-')

      codeLabel.innerText = classInfo.length > 1 ? classInfo[1] : ""
      codeLabel.style.margin = '5px'

      //复制按钮
      const copyButton = document.createElement('span');
      //深色
      copyButton.innerHTML = copyLogo

      //光标插入代码按钮
      // const insertButton = document.createElement('span');
      // insertButton.innerHTML = '<button type="button" class="ant-btn ant-btn-dashed ant-btn-icon-only"><i aria-label="图标: pic-center" class="anticon anticon-pic-center"><svg viewBox="64 64 896 896" data-icon="pic-center" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M952 792H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-632H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM848 660c8.8 0 16-7.2 16-16V380c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16v264c0 8.8 7.2 16 16 16h672zM232 436h560v152H232V436z"></path></svg></i></button>'
      // insertButton.addEventListener('click', function () {
      //   console.log(classInfo); // 输出 "highlight"
      // });

      //新建文件按钮
      // const newFileButton = document.createElement('span');
      // newFileButton.innerHTML = '<button data-v-1bdf03e4="" type="button" class="ant-btn ant-btn-dashed ant-btn-icon-only"><i aria-label="图标: file-add" class="anticon anticon-file-add"><svg viewBox="64 64 896 896" data-icon="file-add" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z"></path></svg></i></button>'

      //终端运行按钮
      // const terminalButton = document.createElement('span');
      // terminalButton.innerHTML = '<button data-v-1bdf03e4="" type="button" class="ant-btn ant-btn-dashed ant-btn-icon-only"><i aria-label="图标: code" class="anticon anticon-code"><svg viewBox="64 64 896 896" data-icon="code" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg></i></button>'

      codeTools.appendChild(codeLabel)
      codeTools.appendChild(copyButton)
      // codeTools.appendChild(insertButton)
      // codeTools.appendChild(newFileButton)
      // codeTools.appendChild(terminalButton)

      // codeBlock.appendChild(codeTools);
      codeBlock.parentNode.insertBefore(codeTools, codeBlock);


      const clipboard = new ClipboardJS(copyButton, {
        target: () => codeBlock
      });

      clipboard.on('success', (e) => {
        e.clearSelection();
        this.$message.success('复制代码成功！')
      });
    },
    makeVal(str) {
      const md = new MarkdownIt();
      md.use(mdHighlightjs);
      return md.render(str);
    },
    Keydown(e) {
      if (!e.shiftKey && e.keyCode === 13) {
        e.cancelBubble = true; //ie阻止冒泡行为
        e.stopPropagation();//Firefox阻止冒泡行为
        e.preventDefault(); //取消事件的默认动作*换行
        //以下处理发送消息代码
        this.onSendMsg(this.prompt);
        console.log(this.prompt);
      }
    },
    onSendMsg(prompt) {
      this.welcome=false;
      console.log(prompt);
      this.history.push(prompt);
      this.prompt = ''
      this.history.push('');
      this.scrollToBottom()
      const self = this

      fetch('http://122.178.8.121:1111/json-stream', {
      // fetch('http://127.0.0.1:9088/json-stream', {
        headers: {
          Accept: 'application/x-json-stream',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          "text": `${this.systemPrompt}\n\n### Instruction:\n${prompt}\n\n### Response:`,
          "question": prompt,
          "len": "3072",
          "step": "32"
        }),
      })
          .then(response => {
            self.isSpin=true
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            function processChunk(chunk) {
              buffer += decoder.decode(chunk, {stream: true});
              const lines = buffer.split('\n');
              buffer = lines.pop(); // 保存未完成的行
              lines.forEach(line => {
                // 在这里处理每一行数据
                const jsonObject = JSON.parse(line);
                // 进行显示或其他操作
                self.history.pop();
                self.history.push(jsonObject['content']);
                self.scrollToBottom()
              });


            }

            function readChunk() {
              return reader.read().then(({done, value}) => {
                if (done) {
                  // 数据流结束，处理最后的未完成行（如果有）
                  if (buffer) {
                    const jsonObject = JSON.parse(buffer);
                    // 进行显示或其他操作
                    // console.log(jsonObject);
                  }
                  return;
                }

                processChunk(value);
                return readChunk();
              });
            }


            return readChunk();
          })
          .then(() => {
            //完成后，进行一次代码块的高亮
            this.flushCB()
            self.scrollToBottom()
            self.isSpin=false
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },
    flushCB() {
      const codeBlocks = document.querySelectorAll('pre');
      for (let i = this.enhancedCodeBlockNum; i < codeBlocks.length; i++) {
        this.enhanceCodeBlock(codeBlocks[i])
      }
      this.enhancedCodeBlockNum = codeBlocks.length
    },
  }

}
</script>

<style scoped>
body {
  overflow: hidden;
}

.box {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: center;
}

.user-card {
  background-color: rgb(248,248,248);
}

/*.bot-card{*/
/*  border-radius: 0 40px 40px 40px;*/
/*}*/

pre {
  position: relative;
}

.message {
  /*display: flex;*/
  width: 70%;
  /*min-width: 400px;*/
  padding: 0px 15px;
}

.actions {
  width: 100px;
}

.prompt-card {
  width: 96%;
  display: flex;
  align-items: flex-end;
  height: 40px; /* 设置容器高度以便显示效果,一定要设置，否则文本框会在多行的时候往下拖 */

  position: fixed;
  bottom: 10px;
}

.prompt-btn {
  margin: 5px 0 5px 5px;
  padding: 0 10px;
}

.prompt-input {

  margin: 5px;
  resize: none;
  height: 40px;

  overflow: hidden; /* 隐藏滚动条 */
}
pre{
  border-radius: 20px;
}
</style>
