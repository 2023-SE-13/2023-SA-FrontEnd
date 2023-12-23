<template>
  <div class="explore-unit">
      <div class="result-unit">
          <!-- 论文题目 -->
          <h2 class="unit-title">
          {{ this.paperData._source.title }}
          </h2>
          <!-- 作者 -->
          <div class="unit-author">
          <i class="el-icon-user-solid"
              ><span v-for="name in this.paperData._source.authorships" >{{ name.author.display_name }} ,</span></i
          >
          </div>
          <!-- 来源期刊 -->
          <!-- <div class="unit-source">《ENVIRONMENTAL SCIENCE AND ECOTECHNOLOGY》</div> -->
          <!-- 论文摘要 -->
          <div class="unit-preview">
            {{ this.paperData._source.abstract }}
          </div>
          <div class="unit-keywords">
          POPs Primary and secondary sources Primary and secondary emissions
          Primary and secondary distribution patterns Primary and secondary
          fractionations
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "ExploreUnit",
  props: {
    paperData:{

    }
  },
  data() {
      return {};
  },
  created(){
    console.log(this.paperData)
  }
};
</script>
<style scoped>
.explore-unit {
  background-color: rgb(221, 236, 255);
  /* padding: 10px; */
  display: inline-block;
  margin: 5px 15px;
  padding: 10px;
  font-family: Inter, Roboto, pingfang SC, hiragino sans gb, Apple SD Gothic Neo, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif, helvetica neue, arial, microsoft yahei ui, microsoft yahei, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
}
.unit-title {
  font-size: 18px;
  color: #2f3a91;
  font-weight: 600;
  font-synthsis: style;
  line-height: 1.6;
  word-break: break-word;
  cursor: pointer;
}
.unit-author {
  -webkit-box-flex: 1;
  flex: 1;
  overflow: hidden;
  display: inline-block;
  line-height: 1.7;
}
.unit-source {
  color:rgba(128, 124, 124, 0.999);
}

.unit-preview {
  font-size: 15px;
  padding-top: 5px;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 4; /* 控制显示的行数 */
  font-weight: 400;
  text-align: left; /* 设置文本靠左对齐 */
}

.unit-preview:hover {
  color: #7e7979;
}
</style>