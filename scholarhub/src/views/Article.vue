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
        <div v-if="uniqueInstitutions.length > 0">
          <div class="sub-title">
            <span v-for="(institution, index) in uniqueInstitutions" :key="index">
              <sup>{{ index + 1 }}</sup>
              {{ institution }}
              <span v-if="index < uniqueInstitutions.length - 1">,&nbsp;</span>
            </span>
          </div>
        </div>

        <!-- <div v-if="articleDetails._source.authorships.some(a => a.institutions && a.institutions.length > 0)">
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
        </div> -->

        <div class="sub-title">
          <!-- 显示出版年份 -->
          <span class="date" v-if="articleDetails._source.publication_year">
            {{ articleDetails._source.publication_year }}
          </span>
          <!-- 显示期刊信息 -->
          <span class="journal" v-if="articleDetails._source.primary_location.publisher">
            &nbsp;{{ articleDetails._source.primary_location.publisher }}
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
          <div
            v-if="articleDetails._source.abstract_inverted_index && articleDetails._source.abstract_inverted_index.length > 0">
            <div class="abstract-content _content"
              v-if="articleDetails._source.abstract_inverted_index.length < spanLength || isSpan">
              {{ articleDetails._source.abstract_inverted_index }}
              <span v-if="isSpan && articleDetails._source.abstract_inverted_index.length >= spanLength" class="_link"
                @click="isSpan = !isSpan"> 折叠</span>
            </div>
            <div class="abstract-content _content" v-else>
              {{ articleDetails._source.abstract_inverted_index.substring(0, 570) }}...
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

                <span>共 {{ this.msg.reference_count }} 条</span>
              </div>
              <div class="reference-info" v-if="this.msg.reference_count > 0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails._source.referenced_works"
                  :key="index">
                  <div @click="toArticle(article.id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index + 1
                      }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authorships" :key="index2">
                            <span v-if="index2 < 5">{{ author.author.display_name }}</span>
                            <span v-if="index2 < 5 && article.authorships.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authorships.length > 5">.etc</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="引证文献" name="second">
              <div class="reference-info">

                <span>共 {{ this.msg.related_works_count }} 条</span>
              </div>
              <div class="reference-info" v-if="this.msg.related_works_count > 0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails._source.related_works"
                  :key="index">
                  <div @click="toArticle(article.id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index + 1
                      }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authorships" :key="index2">
                            <span v-if="index2 < 5">{{ author.author.display_name }}</span>
                            <span v-if="index2 < 5 && article.authorships.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authorships.length > 5">.etc</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
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
              {{ this.msg.reference_count }}
              <div class="digit-text">引用量</div>
            </el-col>
            <el-col :span="8" class="digit-num _success">
              {{ this.msg.related_works_count }}
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
    <!--
    <CollectDialog :curPaper="articleDetails" :showCollect="showCollect" @collectSuccess="collectSuccess"
      @closeChildDialog="closeChildDialog"></CollectDialog> -->

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
        article_name: '',
        reference_count: '',
        related_works_count: ''
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
        "_id": "https://openalex.org/W2783557622",
        "_score": 1.0,
        "_source": {
          "wid": "https://openalex.org/W2783557622",
          "doi": "https://doi.org/10.1109/wsc.2017.8248216",
          "title": "Automatic and dynamic grounding method based on sensor data for agent-based simulation",
          "display_name": "Automatic and dynamic grounding method based on sensor data for agent-based simulation",
          "publication_year": 2017,
          "publication_date": "2017-12-01",
          "language": "en",
          "primary_location": {
            "source": {
              "id": "https://openalex.org/S4363607803",
              "issn_l": null,
              "issn": null,
              "display_name": "2017 Winter Simulation Conference (WSC)",
              "publisher": null,
              "host_organization": null,
              "host_organization_name": null,
              "host_organization_lineage": [],
              "host_organization_lineage_names": [],
              "is_oa": false,
              "is_in_doaj": false,
              "host_institution_lineage": [],
              "host_institution_lineage_names": [],
              "publisher_lineage": [],
              "publisher_lineage_names": [],
              "publisher_id": null,
              "type": "conference"
            },
            "pdf_url": null,
            "landing_page_url": "https://doi.org/10.1109/wsc.2017.8248216",
            "is_oa": false,
            "version": null,
            "license": null,
            "doi": "https://doi.org/10.1109/wsc.2017.8248216",
            "is_accepted": false,
            "is_published": false
          },
          "type": "article",
          "authorships": [
            {
              "author_position": "first",
              "author": {
                "id": "https://openalex.org/A5072872439",
                "display_name": "Shoji Yamane",
                "orcid": null
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I2252096349",
                  "display_name": "Fujitsu (Japan)",
                  "ror": "https://ror.org/038e2g226",
                  "country_code": "JP",
                  "type": "company",
                  "lineage": [
                    "https://openalex.org/I2252096349"
                  ]
                }
              ],
              "countries": [
                "JP"
              ],
              "is_corresponding": false,
              "raw_author_name": "Shohei Yamane",
              "raw_affiliation_strings": [
                "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
              ],
              "raw_affiliation_string": "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5062457983",
                "display_name": "Kotaro Ohori",
                "orcid": null
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I2252096349",
                  "display_name": "Fujitsu (Japan)",
                  "ror": "https://ror.org/038e2g226",
                  "country_code": "JP",
                  "type": "company",
                  "lineage": [
                    "https://openalex.org/I2252096349"
                  ]
                }
              ],
              "countries": [
                "JP"
              ],
              "is_corresponding": false,
              "raw_author_name": "Kotaro Ohori",
              "raw_affiliation_strings": [
                "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
              ],
              "raw_affiliation_string": "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5032770298",
                "display_name": "Hiroaki Yamada",
                "orcid": "https://orcid.org/0000-0002-1963-958X"
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I2252096349",
                  "display_name": "Fujitsu (Japan)",
                  "ror": "https://ror.org/038e2g226",
                  "country_code": "JP",
                  "type": "company",
                  "lineage": [
                    "https://openalex.org/I2252096349"
                  ]
                }
              ],
              "countries": [
                "JP"
              ],
              "is_corresponding": false,
              "raw_author_name": "Hiroaki Yamada",
              "raw_affiliation_strings": [
                "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
              ],
              "raw_affiliation_string": "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5073098982",
                "display_name": "Hiroaki Yoshida",
                "orcid": "https://orcid.org/0000-0002-5370-7451"
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I2252096349",
                  "display_name": "Fujitsu (Japan)",
                  "ror": "https://ror.org/038e2g226",
                  "country_code": "JP",
                  "type": "company",
                  "lineage": [
                    "https://openalex.org/I2252096349"
                  ]
                }
              ],
              "countries": [
                "JP"
              ],
              "is_corresponding": false,
              "raw_author_name": "Hiroaki Yoshida",
              "raw_affiliation_strings": [
                "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
              ],
              "raw_affiliation_string": "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
            },
            {
              "author_position": "last",
              "author": {
                "id": "https://openalex.org/A5037020693",
                "display_name": "Hirokazu Anai",
                "orcid": null
              },
              "institutions": [
                {
                  "id": "https://openalex.org/I2252096349",
                  "display_name": "Fujitsu (Japan)",
                  "ror": "https://ror.org/038e2g226",
                  "country_code": "JP",
                  "type": "company",
                  "lineage": [
                    "https://openalex.org/I2252096349"
                  ]
                }
              ],
              "countries": [
                "JP"
              ],
              "is_corresponding": false,
              "raw_author_name": "Hirokazu Anai",
              "raw_affiliation_strings": [
                "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
              ],
              "raw_affiliation_string": "Fujitsu Laboratories Ltd., 1-1 kamikodanaka 4-chome, Nakahara-ku, Kawasaki 211-8588, Japan#TAB#"
            }
          ],
          "countries_distinct_count": 1,
          "institutions_distinct_count": 1,
          "cited_by_count": 0,
          "keywords": [
            {
              "keyword": "dynamic grounding method",
              "score": 0.7064
            },
            {
              "keyword": "simulation",
              "score": 0.3805
            },
            {
              "keyword": "sensor data",
              "score": 0.2986
            },
            {
              "keyword": "agent-based",
              "score": 0.25
            }
          ],
          "referenced_works_count": 2,
          "referenced_works": [],
          "related_works": [
            {
              "id": "https://openalex.org/W599874015",
              "title": "Introduction of an Expert System Based Traffic Signal Analysis Tool",
              "authorships": [
                {
                  "author": {
                    "display_name": "Xiaoliang Zhao"
                  }
                },
                {
                  "author": {
                    "display_name": "Chung-Jen Hsu"
                  }
                },
                {
                  "author": {
                    "display_name": "Roger Xu"
                  }
                },
                {
                  "author": {
                    "display_name": "Peter Huang"
                  }
                }
              ]
            },
            {
              "id": "https://openalex.org/W2990213399",
              "title": "Online Self-learning for Smart HVAC Control",
              "authorships": [
                {
                  "author": {
                    "display_name": "Tien Sheng Chao"
                  }
                },
                {
                  "author": {
                    "display_name": "Mạnh Hùng Nguyễn"
                  }
                },
                {
                  "author": {
                    "display_name": "Ching-Chun Huang"
                  }
                },
                {
                  "author": {
                    "display_name": "Chao-Jui Liang"
                  }
                },
                {
                  "author": {
                    "display_name": "Chen-Wu Chung"
                  }
                }
              ]
            }
          ],
          "counts_by_year": [],
          "updated_date": "2023-10-25T13:20:40.000004",
          "created_date": "2018-01-26",
          "abstract_inverted_index": "Agent-based simulation(ABS) is a promising way to reproduce congestion situations in large-scale facilities and to evaluate the effectiveness of various types of policies for congestion avoidance based on individual behavioral model. Real-world grounding for determining model parameters plays important role to build valid ABS for a specific facility. However, to use ABS continuously for daily decision, parameters should be updated because user characteristics of the facility changes daily or longer term. This study provides a novel grounding method that can automatically and dynamically estimate the parameters of a human behavioral model based on sensor data at a certain interval. To evaluate the method, we conduct simulation experiments using an agent based model to analyze congestion situation in a building. The result with the method can perform congestion prediction with higher accuracy as compared with a conventional method.",
          "concepts": [
            {
              "id": "https://openalex.org/C41008148",
              "wikidata": "https://www.wikidata.org/wiki/Q21198",
              "display_name": "Computer science",
              "level": 0,
              "score": 0.74466324
            },
            {
              "id": "https://openalex.org/C2778067643",
              "wikidata": "https://www.wikidata.org/wiki/Q166507",
              "display_name": "Interval (graph theory)",
              "level": 2,
              "score": 0.62060183
            },
            {
              "id": "https://openalex.org/C2778755073",
              "wikidata": "https://www.wikidata.org/wiki/Q10858537",
              "display_name": "Scale (ratio)",
              "level": 2,
              "score": 0.47131544
            },
            {
              "id": "https://openalex.org/C168993435",
              "wikidata": "https://www.wikidata.org/wiki/Q6501125",
              "display_name": "Ground",
              "level": 2,
              "score": 0.449399
            },
            {
              "id": "https://openalex.org/C44154836",
              "wikidata": "https://www.wikidata.org/wiki/Q45045",
              "display_name": "Simulation",
              "level": 1,
              "score": 0.41367862
            },
            {
              "id": "https://openalex.org/C79403827",
              "wikidata": "https://www.wikidata.org/wiki/Q3988",
              "display_name": "Real-time computing",
              "level": 1,
              "score": 0.34744674
            },
            {
              "id": "https://openalex.org/C124101348",
              "wikidata": "https://www.wikidata.org/wiki/Q172491",
              "display_name": "Data mining",
              "level": 1,
              "score": 0.32218498
            },
            {
              "id": "https://openalex.org/C127413603",
              "wikidata": "https://www.wikidata.org/wiki/Q11023",
              "display_name": "Engineering",
              "level": 0,
              "score": 0.19532892
            },
            {
              "id": "https://openalex.org/C121332964",
              "wikidata": "https://www.wikidata.org/wiki/Q413",
              "display_name": "Physics",
              "level": 0,
              "score": 0.0
            },
            {
              "id": "https://openalex.org/C33923547",
              "wikidata": "https://www.wikidata.org/wiki/Q395",
              "display_name": "Mathematics",
              "level": 0,
              "score": 0.0
            },
            {
              "id": "https://openalex.org/C62520636",
              "wikidata": "https://www.wikidata.org/wiki/Q944",
              "display_name": "Quantum mechanics",
              "level": 1,
              "score": 0.0
            },
            {
              "id": "https://openalex.org/C114614502",
              "wikidata": "https://www.wikidata.org/wiki/Q76592",
              "display_name": "Combinatorics",
              "level": 1,
              "score": 0.0
            },
            {
              "id": "https://openalex.org/C119599485",
              "wikidata": "https://www.wikidata.org/wiki/Q43035",
              "display_name": "Electrical engineering",
              "level": 1,
              "score": 0.0
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
        middle: 2,
        last: 3,
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
      this.$router.push("/article/" + btoa(encodeURIComponent(JSON.stringify(paper_id))));
      location.reload();
    },
    toAuthor: function (id) {
      console.log(id);
      this.$router.push("/scholar/" + btoa(encodeURIComponent(JSON.stringify(id))));
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
      ApplyWork(this.msg.paper_id, localStorage.getItem('token')).then(res => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.result === 1) {
            this.$message.error("不是学者，没有申请资格");
          } else if (res.data.result === 0) {
            this.$message.success("已发送认领学术成果申请");
          }
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
      this.msg.article_name = this.articleDetails._source.title;

      // console.log(localStorage.getItem('token'));
      const form = new FormData()
      form.append("paper_id", this.msg.paper_id)
      form.append("article_name", this.msg.article_name)
      // console.log(this.msg);
      FavoritePaper(form, localStorage.getItem('token')).then(res => {
        if (res.data.result === 0) {
          this.$message.success("收藏成功");
          this.articleDetails._source.collected_num = res.data.collected_num;
          this.showCollect = true;
        } else if (res.data.result === 1) {
          this.$message.error(res.data.message);
        } else {
          this.$message.error("收藏失败");
        }
      }
      )
    },

    download() {
      const url = this.articleDetails._source.primary_location.pdf_url;
      if (url === null) {
        this.$message.error("未找到该文献原文PDF！");
      } else {
        this.$message.success("正在下载原文PDF，请耐心等待！");
        window.open(url, '_blank');
      }
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
      console.log(JSON.parse(decodeURIComponent(atob(this.$route.params.paper_id))))
      const tempSearch = JSON.parse(decodeURIComponent(atob(this.$route.params.paper_id)))
      GetPaper(tempSearch).then(res => {
        this.articleDetails = res.data;
        console.log(this.articleDetails);
        this.msg.reference_count = this.articleDetails._source.referenced_works.length;
        this.msg.related_works_count = this.articleDetails._source.related_works.length;
      }
      )
    },
  },

  computed: {
    uniqueInstitutions() {
      const institutions = this.articleDetails._source.authorships
        .map(a => a.institutions && a.institutions[0] ? a.institutions[0].display_name : null)
        .filter((value, index, self) => value && self.indexOf(value) === index);
      return institutions;
    }
  },

  created() {
    this.getArticleDetail();
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
  font-family: Tahoma, sans-serif;
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
