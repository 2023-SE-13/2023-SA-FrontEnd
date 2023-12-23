<template>
  <div class="article">
    <el-row>
      <el-col class="title-block" :span="12">
        <div class="title-text">
          {{ articleDetails._source.title }}
        </div>
        <div class="sub-title">
          <span v-for="(authorship, index) in articleDetails._source.authorships" :key="index">
            <span class="_link" @click="toAuthor(authorship.author.id)">
              {{ authorship.author.display_name }}
              <sup v-if="authorship && authorship.author_position !== 0">
                {{ getAuthorPositionNumber(authorship.author_position) }}
              </sup>
            </span>
            <span v-if="articleDetails._source.authorships.length > index + 1">,&nbsp;</span>
          </span>

        </div>
        <div v-if="articleDetails._source.authorships.some(a => a.institutions && a.institutions.length > 0)">
          <div class="sub-title">
            <span v-for="(authorship, index) in articleDetails._source.authorships" :key="index">
              <span v-if="authorship.institutions && authorship.institutions.length > 0">
                <sup>{{ index + 1 }}</sup>
                {{ authorship.institutions[0].display_name }}
              </span>
              <span
                v-if="index < articleDetails._source.authorships.length - 1 && authorship.institutions && authorship.institutions.length > 0">,&nbsp;</span>
            </span>
          </div>
        </div>

        <div class="sub-title">
          <!-- 显示出版年份 -->
          <span class="date" v-if="articleDetails._source.publication_year">
            {{ articleDetails._source.publication_year }}
          </span>
          <!-- 显示期刊信息 -->
          <span class="journal" v-if="articleDetails._source.primary_location.source.display_name">
            &nbsp;{{ articleDetails._source.primary_location.source.display_name }}
            <!-- 其他出版信息，根据您的数据结构可能需要调整 -->
            <span v-if="articleDetails._source.primary_location.source.volume"> | Volume: {{
              articleDetails._source.primary_location.source.volume }}</span>
            <span v-if="articleDetails._source.primary_location.source.first_page">, pp {{
              articleDetails._source.primary_location.source.first_page }}</span>
            <span v-if="articleDetails._source.primary_location.source.last_page">-{{
              articleDetails._source.primary_location.source.last_page }}</span>
          </span>
        </div>
        <div class="sub-title" v-if="articleDetails._source.doi">
          <!-- 显示 DOI -->
          <span class="_info">DOI: <span class="_link" @click="toDOI(articleDetails._source.doi)">{{
            articleDetails._source.doi }}</span></span>
        </div>

        <div class="title-button">
          <el-tooltip class="item" effect="light" content="下载" placement="bottom">
            <el-button type="primary" icon="el-icon-download" circle @click="download"></el-button>
          </el-tooltip>
          <!-- <el-dropdown style="margin-left: 10px; margin-right: 10px" trigger="click" @command="goLink">
            <el-tooltip class="item" effect="light" content="更多链接" placement="bottom">
              <el-button type="success" icon="el-icon-paperclip" circle></el-button>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(ins, index) in articleDetails.urls" v-bind:key="index" :command="ins">{{ ins
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-tooltip class="item" effect="light" content="认领学术成果" placement="bottom">
            <el-button type="success" icon="el-icon-check" circle @click="claimAcademic"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="light" content="收藏" placement="bottom">
            <el-button type="warning" icon="el-icon-star-off" circle @click="openCollect"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分享" placement="bottom">
            <el-button type="danger" icon="el-icon-share" circle @click="share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="引用" placement="bottom">
            <el-button type="info" icon="el-icon-s-promotion" circle @click="quote"></el-button>
          </el-tooltip>

        </div>
      </el-col>
      <!--      <el-col :span="7" class="logo-div">LOGO</el-col>-->
    </el-row>

    <el-row>
      <el-col :span="15">
        <div class="abstract-div">
          <div class="abstract-title">摘要</div>
          <div v-if="articleDetails._source.abstract && articleDetails._source.abstract.length > 0">
            <div class="abstract-content _content" v-if="articleDetails._source.abstract.length < spanLength || isSpan">
              {{ articleDetails._source.abstract }}
              <span v-if="isSpan && articleDetails._source.abstract.length >= spanLength" class="_link"
                @click="isSpan = !isSpan"> 折叠</span>
            </div>
            <div class="abstract-content _content" v-else>
              {{ articleDetails._source.abstract.substring(0, 570) }}...
              <span v-if="!isSpan" class="_link" @click="isSpan = !isSpan"> 展开</span>
            </div>
          </div>
          <div v-else>
            <div class="abstract-content _content" style="color: #909eb4; font-size: 14px">暂无摘要信息</div>
          </div>

        </div>

        <div class="detail-div">
          <el-tabs v-model="activeDetail" type="card">
            <el-tab-pane label="参考文献" name="first">
              <div class="reference-info">
                <span>共 {{ articleDetails._source.referenced_works_count }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails._source.referenced_works_count > 0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <!-- <div class="reference-article-block" v-for="(article, index) in articleDetails.reference_msg"
                  :key="index">
                  <div @click="toArticle(article.paper_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index + 1
                      }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.paper_title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                            <span v-if="index2 < 5">{{ author.author_name }}</span>
                            <span v-if="index2 < 5 && article.authors.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authors.length > 5">.etc</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div> -->
              </div>
            </el-tab-pane>
            <el-tab-pane label="引证文献" name="second">
              <div class="reference-info">
                <span>共 {{ articleDetails._source.cited_by_count }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails._source.cited_by_count > 0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <!-- <div class="reference-article-block" v-for="(article, index) in citation_msg" :key="index">
                  <div @click="toArticle(article.paper_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index + 1
                      }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.paper_title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                            <span v-if="index2 < 5">{{ author.author_name }}</span>
                            <span v-if="index2 < 5 && article.authors.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authors.length > 5">.etc</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div> -->
              </div>
              <!-- <scroll-loader :loader-method="getCitationMsg" :loader-disable="loadMoreDisable"></scroll-loader> -->
            </el-tab-pane>
            <!-- 删除了文章评论的位置 -->
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="info-div">
          <el-row class="digit _bd_bottom">
            <el-col :span="8" class="digit-num _primary">
              {{ articleDetails._source.referenced_works_count }}
              <div class="digit-text">引用量</div>
            </el-col>
            <el-col :span="8" class="digit-num _success">
              {{ articleDetails._source.cited_by_count }}
              <div class="digit-text">被引量</div>
            </el-col>
            <el-col :span="8" class="digit-num _warning">
              {{ toBigNum(articleDetails._source.collected_num) }}
              <div class="digit-text">收藏数</div>
            </el-col>
            <!-- <el-col :span="6" class="digit-num _danger">
                {{ toBigNum(this.comments.length) }}
                <div class="digit-text">评论数</div>
              </el-col> -->
          </el-row>


          <el-row class="field _bd_bottom"
            v-if="articleDetails._source.concepts && articleDetails._source.concepts.length > 0">
            <div class="field-title">领域</div>
            <div class="field-content" v-for="(concept, index) in articleDetails._source.concepts" :key="index">
              -&ensp;<span>{{ concept.display_name }}</span>
            </div>
          </el-row>

          <!-- <el-row class="relation" v-if="related_papers.length > 0"> 
            <div class="field-title">相关文献</div>
            <div class="relation-article" v-for="(article, index) in related_papers" :key="index">
              <div class="relation-title">
                <span class="_link" @click="toArticle(article.paper_id)">{{ article.paper_title }}</span>
              </div>
              <div class="relation-author _info">
                <span v-for="(author, index2) in article.authors" :key="index2">
                  <span v-if="index2 < 2">{{ author.author_name }}</span>
                  <span v-if="index2 < 2 && article.authors.length > index2 + 1">,&nbsp;</span>
                </span>
                <span v-if="article.authors.length > 2">etc.</span>
              </div>
            </div>
          </el-row> -->
        </div>
      </el-col>
    </el-row>

    <CollectDialog :curPaper="articleDetails" :showCollect="showCollect" @collectSuccess="collectSuccess"
      @closeChildDialog="closeChildDialog"></CollectDialog>

    <CiteDialog :paper_id="articleDetails._id" :showQuote="showQuote" @closeChildDialog="closeChildDialog">
    </CiteDialog>
  </div>
</template>
  
<script>
//   import user from "../../store/user";
import { GetPaper, FavoritePaper, ApplyWork } from '@/api/api';
import qs from "qs";
import CiteDialog from "../components/CiteDialog";
import CollectDialog from "../components/CollectDialog";

export default {
  name: "Article",
  components: { CiteDialog, CollectDialog },
  props: ['paper_id'],
  data() {
    return {
      msg: {
        paper_id: '',
        paper_name: '',

      },
      // 引用
      showQuote: false,

      // 收藏
      showCollect: false,

      // 点赞动画
      like: false,
      isAnimating: false,

      // 摘要展开
      isSpan: false,
      spanLength: 600,

      // 标签页
      activeDetail: "first",

      myAnswer: '',

      articleDetails: {
        "_index": "works",
        "_type": "_doc",
        "_id": "lsfpi4wBDP9OYkIT32zS",
        "_version": 1,
        "_score": 1,
        "_source": {
          "wid": "https://openalex.org/W3128502970",
          "doi": "https://doi.org/10.3390/rs13030534",
          "title": "Sub-Auroral, Mid-Latitude, and Low-Latitude Troughs during Severe Geomagnetic Storms",
          "display_name": "Sub-Auroral, Mid-Latitude, and Low-Latitude Troughs during Severe Geomagnetic Storms",
          "publication_year": 2021,
          "publication_date": "2021-02-02",
          "language": "en",
          "primary_location": {
            "source": {
              "id": "https://openalex.org/S43295729",
              "issn_l": "2072-4292",
              "issn": [
                "2072-4292"
              ],
              "display_name": "Remote Sensing",
              "publisher": "Multidisciplinary Digital Publishing Institute",
              "host_organization": "https://openalex.org/P4310310987",
              "host_organization_name": "Multidisciplinary Digital Publishing Institute",
              "host_organization_lineage": [
                "https://openalex.org/P4310310987"
              ],
              "host_organization_lineage_names": [
                "Multidisciplinary Digital Publishing Institute"
              ],
              "is_oa": true,
              "is_in_doaj": true,
              "host_institution_lineage": [],
              "host_institution_lineage_names": [],
              "publisher_lineage": [
                "https://openalex.org/P4310310987"
              ],
              "publisher_lineage_names": [
                "Multidisciplinary Digital Publishing Institute"
              ],
              "publisher_id": "https://openalex.org/P4310310987",
              "type": "journal"
            },
            "pdf_url": "https://www.mdpi.com/2072-4292/13/3/534/pdf?version=1612341605",
            "landing_page_url": "https://doi.org/10.3390/rs13030534",
            "is_oa": true,
            "version": "publishedVersion",
            "license": "cc-by",
            "doi": "https://doi.org/10.3390/rs13030534",
            "is_accepted": true,
            "is_published": true
          },
          "type": "article",
          "authorships": [
            {
              "author_position": "first",
              "author": {
                "id": "https://openalex.org/A5078348831",
                "display_name": "A. T. Karpachev",
                "orcid": "https://orcid.org/0000-0002-8831-6880"
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I4210093250",
                  "display_name": "Institute of Terrestrial Magnetism Ionosphere and Radio Wave Propagation",
                  "ror": "https://ror.org/00k9x6n46",
                  "country_code": "RU",
                  "type": "facility",
                  "lineage": [
                    "https://openalex.org/I4210093250",
                    "https://openalex.org/I4210096333"
                  ]
                }
              ],
              "countries": [
                "RU"
              ],
              "is_corresponding": true,
              "raw_author_name": "Alexander Karpachev",
              "raw_affiliation_strings": [
                "Pushkov Institute of Terrestrial Magnetism, Ionosphere, and Radiowave Propagation, (IZMIRAN), 4, Kaluzhskoe Hwy, Troitsk, 108840 Moscow, Russia"
              ],
              "raw_affiliation_string": "Pushkov Institute of Terrestrial Magnetism, Ionosphere, and Radiowave Propagation, (IZMIRAN), 4, Kaluzhskoe Hwy, Troitsk, 108840 Moscow, Russia"
            }
          ],
          "countries_distinct_count": 1,
          "institutions_distinct_count": 1,
          "cited_by_count": 4,
          "keywords": [
            {
              "keyword": "geomagnetic storms",
              "score": 0.7757
            },
            {
              "keyword": "sub-auroral",
              "score": 0.25
            },
            {
              "keyword": "mid-latitude",
              "score": 0.25
            },
            {
              "keyword": "low-latitude",
              "score": 0.25
            }
          ],
          "referenced_works_count": 35,
          "referenced_works": [
            "https://openalex.org/W1586986498",
            "https://openalex.org/W1662127126",
            "https://openalex.org/W1965206835",
            "https://openalex.org/W1966096191",
            "https://openalex.org/W1967154545",
            "https://openalex.org/W1975154262",
            "https://openalex.org/W1990731655",
            "https://openalex.org/W1990918471",
            "https://openalex.org/W1996664581",
            "https://openalex.org/W1998496929",
            "https://openalex.org/W2007210982",
            "https://openalex.org/W2015713590",
            "https://openalex.org/W2030910343",
            "https://openalex.org/W2047476732",
            "https://openalex.org/W2050088418",
            "https://openalex.org/W2051677814",
            "https://openalex.org/W2053069651",
            "https://openalex.org/W2055690023",
            "https://openalex.org/W2057859652",
            "https://openalex.org/W2058639632",
            "https://openalex.org/W2063250014",
            "https://openalex.org/W2067408522",
            "https://openalex.org/W2071577963",
            "https://openalex.org/W2077361553",
            "https://openalex.org/W2084870187",
            "https://openalex.org/W2091228866",
            "https://openalex.org/W2092803199",
            "https://openalex.org/W2108216570",
            "https://openalex.org/W2151098846",
            "https://openalex.org/W2162865699",
            "https://openalex.org/W2773245711",
            "https://openalex.org/W2894843655",
            "https://openalex.org/W2899851350",
            "https://openalex.org/W2980289011",
            "https://openalex.org/W3114886778"
          ],
          "related_works": [
            "https://openalex.org/W1990138009",
            "https://openalex.org/W2375250768",
            "https://openalex.org/W4205183638",
            "https://openalex.org/W1995190890",
            "https://openalex.org/W3175383600",
            "https://openalex.org/W3128502970",
            "https://openalex.org/W4250883010",
            "https://openalex.org/W4200211789",
            "https://openalex.org/W2492491595",
            "https://openalex.org/W4200002181"
          ],
          "counts_by_year": [
            {
              "year": 2023,
              "cited_by_count": 2
            },
            {
              "year": 2022,
              "cited_by_count": 2
            }
          ],
          "updated_date": "2023-11-02T02:19:39.258533",
          "created_date": "2021-02-15",
          "abstract_inverted_index": {
            "You": [
              0
            ],
            "are": [
              1
            ],
            "the": [
              2
            ],
            "best": [
              3
            ]
          },
          "concepts": [
            {
              "id": "https://openalex.org/C163239763",
              "wikidata": "https://www.wikidata.org/wiki/Q5153637",
              "display_name": "Common value auction",
              "level": 2,
              "score": 0.82923234
            },
            {
              "id": "https://openalex.org/C186027771",
              "wikidata": "https://www.wikidata.org/wiki/Q4008379",
              "display_name": "Valuation (finance)",
              "level": 2,
              "score": 0.7643951
            }
          ],
          "collected_num": 0
        }
      }
    }
  },
  watch: {
    citation_msg(val) {
      this.loadMoreDisable = val.length >= this.articleDetails.citation_count;
    },
  },
  methods: {
    getAuthorPositionNumber(position) {
      const positions = {
        first: 1,
        second: 2,
        third: 3,
        // 以此类推，你可以根据需要添加更多的映射
      };
      return positions[position] || position;
    },
    goLink(url) {
      window.open(url);
    },
    collectSuccess() {
      this.articleDetails.collect_count += 1;
    },
    closeChildDialog() {
      this.showQuote = false;
      this.showCollect = false;
    },
    toArticle: function (paper_id) {
      // let routeUrl = this.$router.resolve({
      //   path: '/article',
      //   query: { v: paper_id }
      // });
      this.$router.push({ name: '论文详情' }, () => { this.$router.push(`/article/${paper_id}`) })
      // window.open(routeUrl.href, "_self");
    },
    toAuthor: function (id) {
      // let routeUrl = this.$router.resolve({
      //   path: '/schPortal',
      //   query: { v: id }
      // });
      // window.open(routeUrl.href, "_self");
    },
    toDOI: function (doi) {
      window.open(doi);
    },

    toBigNum: function (num) {
      if (num >= 10000) {
        let ten_thousand = Math.floor(num / 10000)
        let thousand = Math.floor(num % 10000 / 1000)
        num = ten_thousand + "." + thousand + "w"
      }
      else if (num >= 1000) {
        let thousand = Math.floor(num / 1000)
        let hundred = Math.floor(num % 1000 / 100)
        num = thousand + "." + hundred + "k"
      }
      return num
    },
    // likeClick: function (commentIns) {
    //   const userInfo = user.getters.getUser(user.state());
    //   if (!userInfo) {
    //     this.$message.warning("请先登录！");
    //     setTimeout(() => {
    //       this.$router.push('/login');
    //     }, 500);
    //     return;
    //   }

    //   if (!commentIns.is_like)
    //     this.likeHandler(commentIns, 'comment');
    //   else
    //     this.likeHandler(commentIns, 'cancel');
    // },
    // likeHandler: function (commentIns, tag) {
    //   const userInfo = user.getters.getUser(user.state());
    //   this.$axios({
    //     url: '/social/like/' + tag,
    //     method: 'post',
    //     data: qs.stringify({
    //       user_id: userInfo.user.userId,
    //       comment_id: commentIns.id,
    //     })
    //   })
    //     .then(res => {
    //       switch (res.data.status) {
    //         case 200:
    //           commentIns.is_animating = tag === 'comment';
    //           setTimeout(() => {
    //             commentIns.is_like = !commentIns.is_like;
    //           }, 800);
    //           break;
    //         case 403:
    //           this.$message.error("评论不存在，请刷新重试！");
    //           break;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // },
    share(message) {
      let aux = document.createElement("input");
      aux.setAttribute("value", window.location.href);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("链接已复制至剪贴板");
      } else {
        this.$message.error("链接复制失败");
      }
    },

    //认领学术成果
    claimAcademic() {
      ApplyWork(this.msg.paper_id, token).then(res => {
        if (res.data.status === 'success') {
          this.$message.success("已发送认领学术成果申请");
        } else {
          this.$message.error("认领学术成果失败");
        }
      }
      )

    },

    //引用方法
    quote() {
      this.showQuote = true;
    },

    //收藏方法
    openCollect() {
      this.msg.paper_id = this.articleDetails._id;
      this.msg.paper_name = this.articleDetails._score.display_name;
      FavoritePaper(this.msg, token).then(res => {
        if (res.data.status === 'success') {
          console.log("openCollect")
          this.activeDetail.collected_num++;
        } else {
          console.log("error")
        }
      }
      )

      this.showCollect = true;
    },

    download() {
      if (this.articleDetails._source.primary_location.pdf_url.length === 0) {
        this.$message.error("未找到该文献原文PDF！");
        return;
      }
      this.$message.success("正在下载原文PDF，请耐心等待！");
      console.log(this.articleDetails._source.primary_location.pdf_url.length);
      // TIP: 下载跨域文件出问题，让后端下载到服务器再同域下载
      // this.$axios({
      //   method: 'post',
      //   url: '/upload/get/pdf',
      //   data: qs.stringify({
      //     pdf_url: this.articleDetails.pdfs[0]
      //   })
      // })
      //   .then(res => {
      //     if (res.data.success) {
      //       console.log(this.GLOBAL.backUrl + res.data.data);
      //       this.$downloadSameArea(this.GLOBAL.backUrl + res.data.data, this.articleDetails.paper_title + ".pdf");
      //       this.$message.success("下载成功！");
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error("下载失败！");
      //     console.log(err);
      //   })
      window.location.href(this.articleDetails._source.primary_location.pdf_url, this.articleDetails._source.display_name);
    },

    getRelatedPapers() {
      // this.$axios({
      //   method: 'post',
      //   url: '/es/get/related/paper',
      //   data: qs.stringify({
      //     id: this.$route.query.v
      //   })
      // })
      //   .then(res => {
      //     if (res.data.success) {
      //       this.related_papers = res.data.related;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },

    getArticleDetail() {
      GetPaper(this.paper_id).then(res => {
        if (res.data.status === 'success') {
          console.log("GetPaper")
          this.articleDetails = res.data;
        } else {
          console.log("error")
        }
      }
      )

    },

    getCitationMsg() {
      fetch('https://api.openalex.org/works/W2748952813')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // 在这里将响应转换为JSON
        })
        .then(data => {
          console.log(data);
          // 在这里处理JSON数据
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });


      // if (this.citation_msg.length >= this.articleDetails.citation_count) {
      //   this.loadMoreDisable = true;
      //   return;
      // }

      // this.$axios({
      //   method: 'post',
      //   url: '/es/get/citation/paper',
      //   data: qs.stringify({
      //     id: this.$route.query.v,
      //     page: this.cita_page_idx,
      //     size: 20
      //   })
      // })
      //   .then(res => {
      //     if (res.data.success) {
      //       this.citation_msg = this.citation_msg.concat(res.data.citations);
      //       this.cita_page_idx += 1;
      //       if (this.citation_msg.length >= this.articleDetails.citation_count)
      //         this.loadMoreDisable = true;
      //     } else {
      //       this.$message.error("获取引证文献失败！");
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },

    goDocument(node, data) {
      console.log(data)
      console.log(node)
      getNode(node.data.id).then(res => {
        if (res.data.status === 'success') {
          if (res.data.data.node_type === 'Doc') {
            console.log("go document")
            this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/${res.data.data.doc_id}`) })
          }
        }
      })
    },

    getArticle() {
      let self = this;
      let _loadingIns = this.$loading({ fullscreen: true, text: '拼命加载中' });
      this.$axios.all([this.getArticleDetail()])
        .then(this.$axios.spread(function (articleDetail) {
          _loadingIns.close();

          // Get Article Detail
          switch (articleDetail.data.status) {
            case 200:
              self.articleDetails = articleDetail.data.details;
              break;
            case 404:
              // this.$message.error("查无此文献！");
              // setTimeout(() => {
              //   this.$router.push("/");
              // }, 1500);
              break;
            case 500:
              this.$message.error("系统发生错误，请联系管理员！");
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
              break;
          }

          // switch (allComments.data.status) {
          //   case 200:
          //     self.comments = allComments.data.data.comments;
          //     break;
          //   case 403:
          //     self.comments = [];
          //     break;
          //   default:
          //     self.$message.error("评论获取失败！");
          //     break;
          // }
        }))
        .catch(err => {
          console.log(err);
        })
    },
  },
  created() {
    this.paper_id = 'https://openalex.org/W2783557622';
    this.getArticle();
    this.getCitationMsg();
    //   this.getRelatedPapers();
  },
}
</script>
  
<style scoped>
.article {
  background-color: #f1f3f6;
}

.article .title-block {
  margin-left: 180px;
  min-height: 200px;
}

.article .abstract-div {
  background-color: white;
  margin-left: 180px;
  min-height: 200px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.article .detail-div {
  background-color: white;
  margin-top: 26px;
  margin-left: 180px;
  margin-bottom: 30px;
  padding: 30px;
  min-height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.article .info-div {
  background-color: white;
  margin: 0 180px 30px 36px;
  padding: 30px;
  min-height: 666px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.article .title-text {
  font-family: Tahoma, fantasy;
  text-align: left;
  padding-top: 50px;
  padding-left: 20px;
  font-weight: bold;
  font-size: 28px;
  line-height: 40px;
  color: #353535;
}

.article .sub-title {
  text-align: left;
  padding-left: 20px;
  margin-top: 10px;
  font-size: 15px;
  color: #909eb4;
}

.article .title-button {
  text-align: left;
  padding-left: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.article .abstract-title {
  text-align: left;
  font-weight: bold;
  margin-top: 5px;
  padding: 0 16px;
  font-size: 16px;
  color: #353535;
}

.article .abstract-content {
  text-align: justify;
  padding: 16px 16px 6px 16px;
  font-size: 15px;
  line-height: 24px;
  font-family: Georgia, fantasy;
}

.article .digit {
  margin-top: 14px;
  padding-bottom: 30px;
}

.article .digit-num {
  font-size: 26px;
}

.article .digit-text {
  margin-top: 10px;
  font-size: 14px;
  color: #909eb4;
}

.article .field {
  padding: 36px 10px;
}

.article .field-title {
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #353535;
}

.article .field-content {
  text-align: left;
  font-size: 16px;
  line-height: 30px;
}

.article .relation {
  padding: 36px 10px;
  text-align: left;
  font-size: 15px;
}

.article .relation-author {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 12px;
}

.article .reference-info {
  margin-bottom: 12px;
  color: #909eb4;
  font-size: 13px;
}

.article .reference-article-block {
  padding-top: 10px;
}

.article .reference-article-block:hover {
  background: #f4f9ff;
  cursor: pointer;
}

.article .reference-title {
  font-size: 15px;
}

.article .reference-author {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

.article .reference-article-block:hover .reference-title {
  color: #1f71df;
}

.article .comment-card {
  padding: 5px;
}

.article .comment-card-body {
  margin-bottom: 20px;
}

.article .comment-info {
  padding-bottom: 15px;
}

.article .comment-date {
  font-size: 14px;
}

.article .comment-content {
  font-size: 14px;
  line-height: 24px;
}

.article .dislike {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image: url('https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
  background-position: left;
  background-repeat: no-repeat;
  background-size: 2900%;
}

.article .like {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image: url('https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
  background-position: right;
  background-repeat: no-repeat;
  background-size: 2900%;
}

.article .dislike:hover {
  background-position: right;
}

.article .is_animating {
  animation: heart-burst .8s steps(28) 1;
}

@keyframes heart-burst {
  from {
    background-position: left;
  }

  to {
    background-position: right;
  }
}

.article ._bd_bottom {
  border-bottom: solid 1px lightgray;
}

.article ._bd_right {
  border-right: solid 1px lightgray;
}

.article ._bd_left {
  border-left: solid 1px lightgray;
}

.article ._bd_top {
  border-top: solid 1px lightgray;
}

.article ._primary {
  color: #409EFF;
}

.article ._danger {
  color: #F56C6C;
}

.article ._warning {
  color: #E6A23C;
}

.article ._success {
  color: #67C23A;
}

.article ._info {
  color: #909eb4;
}

.article ._content {
  color: #565656;
}

.article ._link {
  color: #00b1fd;
}

.article ._link:hover {
  color: #38c5ff;
  cursor: pointer;
}

.article .detail-div .el-tab-pane {
  text-align: left;
}

.article .detail-div .el-tabs__item.is-active {
  color: #353535;
  font-weight: bold;
}

.article .detail-div .el-tabs__item {
  font-size: 15px;
}

.article .detail-div .el-tabs__item:hover {
  color: #353535;
}
</style>