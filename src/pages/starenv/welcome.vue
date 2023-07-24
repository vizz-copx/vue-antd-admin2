<template>
  <div>
    <a-card class="main">
      <h1 style="color: white;font-size: xxx-large"><img src="/galaxy.png" class="logo"/>智能研发助手</h1>
      <div style="margin: 50px 0">
        <p class="info-p">
          智能研发助手是基于开源代码大模型的创新工具，为开发人员提供全方位的编程问题解决方案，包括单元测试生成、代码解释、代码检测等，同时还能回答关于编程语言、常用库、算法、数据结构、代码优化技巧等问题。无论你遇到什么疑问，智能研发助手都能详细地提供答案。</p>
        <p class="info-p">
          无论你是新手还是有经验的开发者，智能研发助手都能为你节省大量的时间和精力，让你更专注于解决真正的技术挑战。欢迎体验智能研发助手，让它成为你日常开发中最可靠的伙伴，带来更快、更智能的编程体验！
        </p>
      </div>


      <span style="font-size: x-large;">
          <span>— <a-icon style="margin: 0 5px;" type="fire"/>Examples —</span><br/>

                  <a-button class="play-btn" ghost icon="play-circle" size="large"
                            @click="ask( `为以下JAVA代码添加单元测试：\n${c1}`)">
          为以下JAVA代码添加单元测试：...
        </a-button><br/>




                  <a-button class="play-btn" ghost icon="play-circle" size="large"
                            @click="ask( `解释这段代码：\n${c2}`)">
          解释这段代码：...
        </a-button><br/>

                                <a-button class="play-btn" ghost icon="play-circle" size="large"
                                          @click="ask('JDK11相对于JDK8有哪些新特性？')">
          JDK11相对于JDK8有哪些新特性？
          </a-button><br/>



        </span>


      <br/>
      <br/>
      <!--      <p>-->
      <!--        — Shout out to-->
      <!--        <a-icon type="smile"/>-->
      <!--        Vizz —-->
      <!--      </p>-->


      <p>
        <a-icon type="smile"/>
        云计算实验室出品
      </p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data: function () {
    return {
      c1:          "public List <CmsSubject> list(String keyword, Integer pageNum, Integer pageSize) {\n" +
          "        PageHelper.startPage(pageNum, pageSize);\n" +
          "        CmsSubjectExample example = new CmsSubjectExample();\n" +
          "        CmsSubjectExample.Criteria criteria = example.createCriteria();\n" +
          "        if (!StrUtil.isEmpty(keyword)) {\n" +
          "            criteria.andTitleLike(\"%\" + keyword + \"%\");\n" +
          "        }\n" +
          "        return subjectMapper.selectByExample(example);\n" +
          "    }",
      c2:          "@Around(\"dataSourcePointCut()\")\n" +
          "    public Object around(ProceedingJoinPoint point) throws Throwable {\n" +
          "        MethodSignature signature = (MethodSignature) point.getSignature();\n" +
          "        Class targetClass = point.getTarget().getClass();\n" +
          "        Method method = signature.getMethod();\n" +
          "        DataSource targetDataSource = (DataSource)targetClass.getAnnotation(DataSource.class);\n" +
          "        DataSource methodDataSource = method.getAnnotation(DataSource.class);\n" +
          "        if(targetDataSource != null || methodDataSource != null){\n" +
          "            String value;\n" +
          "            if(methodDataSource != null){\n" +
          "                value = methodDataSource.value();\n" +
          "            }else {\n" +
          "                value = targetDataSource.value();\n" +
          "            }\n" +
          "\n" +
          "            DynamicContextHolder.push(value);\n" +
          "            logger.debug(\"set datasource is {}\", value);\n" +
          "        }\n" +
          "\n" +
          "        try {\n" +
          "            return point.proceed();\n" +
          "        } finally {\n" +
          "            DynamicContextHolder.poll();\n" +
          "            logger.debug(\"clean datasource\");\n" +
          "        }\n" +
          "    }"
    }
  },
  methods: {
    ask(question) {
      this.$emit('question', question)
    }
  }
}
</script>

<style scoped>
.play-btn {
  margin: 10px;
  width: 500px;
}

.info-p {
  font-size: larger;
  margin: 5px 20vh;
  text-align: left;
  text-indent: 2em;
}

.logo {
  height: 50px;
  width: 50px;
  margin: 0 10px 10px 0;
}

.main {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  color: white;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
