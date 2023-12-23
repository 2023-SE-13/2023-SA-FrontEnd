<template>
  <div class="explore-unit">
      <div class="result-unit" @click="gotoArticle">
          <!-- 论文题目 -->
          <h2 class="unit-title">
          {{ this.paperData._source.title }}
          </h2>
          <!-- 作者 -->
          <div class="unit-author">
              <i class="el-icon-user-solid">
                &nbsp;
                  <span v-for="name in this.paperData._source.authorships" >{{ name.author.display_name }} ,</span>
              </i>
          </div>
          <!-- 来源期刊 -->
          <!-- <div class="unit-source">《ENVIRONMENTAL SCIENCE AND ECOTECHNOLOGY》</div> -->
          <!-- 论文摘要 -->
          <div class="unit-preview">
            {{ this.paperData._source.abstract }}
          </div>
          <div class="unit-keywords">
          <!-- POPs Primary and secondary sources Primary and secondary emissions
          Primary and secondary distribution patterns Primary and secondary
          fractionations -->
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
      return {
        id: 'https://openalex.org/W2783557622'
      };
  },
  methods: {
    gotoArticle() {
      this.$router.push("/article/" + btoa(encodeURIComponent(JSON.stringify(this.id))));
    }
  }
};
</script>
<style scoped>
.explore-unit {
  background-color: rgb(221, 236, 255);
  width: 95%;
  height: 200px;
  /* padding: 10px; */
  display: block;
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
  line-height: 2.0;
  word-break: break-word;
  cursor: pointer;
}

.unit-author {
  display: flex;
  flex-direction: column;
  /* line-height: 1.7; */
  overflow: hidden;
}

.unit-author i {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* 控制显示的行数 */
  white-space: normal;
  line-height: 1.2;
  width: 90%;
  text-align: left;
  margin-left: 20px;
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
