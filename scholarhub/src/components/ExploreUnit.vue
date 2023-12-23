<template>
  <div class="explore-unit">
      <div class="result-unit" @click="gotoArticle">
          <!-- 论文题目 -->
          <h2 class="unit-title">
          Persistent organic pollutants in global surface soils: Distributions and
          fractionations
          </h2>
          <!-- 作者 -->
          <div class="unit-author">
          <i class="el-icon-user-solid"
              ><span>Eulogio Oset ,LianRong Dai ,LiSheng Geng</span></i
          >
          </div>
          <!-- 来源期刊 -->
          <div class="unit-source">《ENVIRONMENTAL SCIENCE AND ECOTECHNOLOGY》</div>
          <!-- 论文摘要 -->
          <div class="unit-preview">
          Microbiome research has generated an extensive amount of data, resulting
          in a wealth of publicly accessible samples. Accurate annotation of these
          samples is crucial for effectively utilizing microbiome data across
          scientific disciplines. However, a notable challenge arises from the
          lack of essential annotations, particularly regarding collection
          location and sample biome information, which significantly hinders
          environmental microbiome research. In this study, we introduce
          Meta-Sorter, a novel approach utilizing neural networks and transfer
          learning, to enhance biome labeling for thousands of microbiome samples
          in the MGnify database that have incomplete information. Our findings
          demonstrate that Meta-Sorter achieved a remarkable accuracy rate of
          96.7% in classifying samples among the 16,507 lacking detailed biome
          annotations. Notably, Meta-Sorter provides precise classifications for
          representative environmental samples that were previously ambiguously
          labeled as "Marine" in MGnify, thereby elucidating their specific
          origins in benthic and water column environments. Moreover, Meta-Sorter
          effectively distinguishes samples derived from human-environment
          interactions, enabling clear differentiation between environmental and
          human-related studies. By improving the completeness of biome label
          information for numerous microbial community samples, our research
          facilitates more accurate knowledge discovery across diverse
          disciplines, with particular implications for environmental research.
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
      paper: {
          type: Object,
          default: () => {
          return {};
          },
      },
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
