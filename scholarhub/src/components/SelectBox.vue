<template>
    <div class="content-select-result">
        <el-row :gutter="0" v-if="total_hits !== 0">
            <el-col :span="30">
                <div class="grid-content bg-purple" style="margin-right:50px">
                    <el-row>

                        <el-col :span="9" style="width:90%;margin-left: 3px;margin-top: 60px">
<!--                            <span-->
<!--                                style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>-->
                          <div :class="searchBarFixed == true ? 'isFixed' : ''">
                            <div class="square-buttons">
                              <div class="square-button" @click="makeSure()"><i class="el-icon-search"></i></div>
                              <div class="square-button" @click="cancel()"><i class="el-icon-close"></i></div>
                            </div>
                          </div>

                          <el-card class="box-card" id="sideBars" ref="ele">
                                <div class="publish-year sub-block" v-if="mode !== 'advance'">
                                    <div class="check-box-title" style="margin-bottom: 10px;">
                                        <span style="color: #303133;">发表年份</span>
                                    </div>
                                    <div style="text-align: left; font-size: 13px">
                                        <span>范围：</span>
                                      <div style="margin-top: 5px">
                                        <span style="color: #0274B3;" class="year-input">
                                            <el-input size="mini" v-model="year[0]" style="width: 30%;margin-right: 10px;margin-left: 5px;font-size: 13px"></el-input>
                                            &nbsp;~&nbsp;
                                            <el-input size="mini" v-model="year[1]" style="width: 30%;margin-left: 4px;font-size: 13px"></el-input>
                                        </span>
                                      </div>

                                    </div>

                                </div>

                                <el-divider v-if="mode !== 'advance'"></el-divider>

                                <div class="publish-type sub-block">
                                    <div class="check-box-title" style="margin-bottom: 5px;">
                                        <span>类型</span>
                                    </div>
                                    <el-checkbox-group v-for="(o, index) in aggregation.doctype" :key="index"
                                        style="margin-bottom: 15px; text-align: left" v-model="checkDoctypeList">
                                        <div v-for="(val, key) in o" :key="key">
                                            <el-checkbox :label=key>
                                                <span>{{ key | ellipsis_25 }}&nbsp;({{ val }})</span>
                                            </el-checkbox>
                                        </div>
                                    </el-checkbox-group>
                                </div>

                                <el-divider></el-divider>

                                <div class="publish-journal sub-block">
                                    <div class="check-box-title" style="margin-bottom: 10px;">
                                        <span>期刊</span>
                                    </div>
                                    <el-checkbox-group v-for="(o, index) in aggregation.journal" :key="index"
                                        style="margin-bottom: 15px; text-align: left" v-model="checkJournalList">
                                        <el-checkbox :label=o.name>
                                            <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                                                <span>{{ o.name | ellipsis_25 }}&nbsp;({{ o.count }})</span>
                                            </el-tooltip>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>

                                <el-divider></el-divider>

                                <div class="publish-journal sub-block">
                                    <div class="check-box-title" style="margin-bottom: 10px;">
                                        <span>会议</span>
                                    </div>
                                    <el-checkbox-group v-for="(o, index) in aggregation.conference" :key="index"
                                        style="margin-bottom: 15px; text-align: left" v-model="checkConferenceList">
                                        <el-checkbox :label=o.name>
                                            <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                                                <span>{{ o.name | ellipsis_25 }}&nbsp;({{ o.count }})</span>
                                            </el-tooltip>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>

                                <el-divider></el-divider>

                                <div class="publish-type sub-block">
                                    <div class="check-box-title" style="margin-bottom: 10px;">
                                        <span>出版商</span>
                                    </div>
                                    <el-checkbox-group v-for="(o, index) in aggregation.publisher" :key="index"
                                        style="margin-bottom: 15px; text-align: left" v-model="checkPublisherList">
                                        <div v-for="(val, key) in o" :key="key">
                                            <el-checkbox :label=key>
                                                <el-tooltip class="item" effect="dark" :content="key" placement="right">
                                                    <span>{{ key | ellipsis_25 }}&nbsp;({{ val }})</span>
                                                </el-tooltip>
                                            </el-checkbox>
                                        </div>
                                    </el-checkbox-group>
                                </div>
                            </el-card>
                        </el-col>

                      <el-col :span="2" style="margin-top:50px;">
                        <div id="chooseBar">
                          <div :class="searchBarFixed == true ? 'isFixed' : ''">
                            <div style="height:48px"></div>
<!--                            <div @click="makeSure()"-->
<!--                                 style="padding:1px; font-size:14px; border-radius:4px; background-color:#409EFF; border:1px solid #2d94d4; cursor: pointer">-->
<!--                              <span style="color:white;">确</span><br><span style="color:white;">定</span>-->
<!--                            </div>-->
<!--                            <div @click="cancel()"-->
<!--                                 style="padding:1px; font-size:14px; border-radius:4px; background-color:white; border:1px solid #2d94d4; color: #606266; cursor: pointer">-->
<!--                              <span>取</span><br><span>消</span>-->
<!--                            </div>-->
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                </div>
            </el-col>

        </el-row>
    </div>
</template>



<script>

export default {
    name: "SelectBox",
    components: {},
    props: [
        //   "header_select", "input", "mode", "conditions", "min_date", "max_date",
        //   "total_hits", "total_hits_str", "aggregation", "articles"
    ],
    data() {
        return {
            pageIdx: 1,
            size: 10,
            searchBarFixed: false,
            select: '1',
            queue: [
                {
                    value: 1,
                    label: "按匹配程度递减",
                },
                {
                    value: 3,
                    label: "按被引用量递减",
                },
                {
                    value: 4,
                    label: "按被引用量递增",
                },
                {
                    value: 5,
                    label: "按发表时间递减",
                },
                {
                    value: 6,
                    label: "按发表时间递增",
                }
            ],
            sorter: 1,
            minYear: 1900,
            maxYear: 2021,
            year: [1900, 2021],

            checkDoctypeList: [],
            checkJournalList: [],
            checkConferenceList: [],
            checkPublisherList: [],


            // 示例数据
            total_hits: 100,
            total_hits_str: '100',
            aggregation: {
                doctype: [
                    { '论文': 50 },
                    { '报告': 30 },
                    { '专利': 20 },
                ],
                journal: [
                    { name: 'Journal A', count: 10 },
                    { name: 'Journal B', count: 20 },
                    // 更多期刊...
                ],
                conference: [
                    { name: 'Conference X', count: 15 },
                    { name: 'Conference Y', count: 25 },
                    // 更多会议...
                ],
                publisher: [
                    { 'Publisher 1': 40 },
                    { 'Publisher 2': 60 },
                    // 更多出版商...
                ],
            },
            articles: [
                // 示例文章数据
                // ...
            ],
            // 其他数据...

        }
    },
    methods: {
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var offsetTop = 2 * (document.querySelector('#chooseBar').offsetTop)
            this.searchBarFixed = scrollTop > offsetTop;

            var offsetdown = document.querySelector('.content-select-result #sideBars').offsetTop + document.getElementById('sideBars').offsetHeight
            if (scrollTop > offsetdown) this.searchBarFixed = false
        },
        makeSure() {
            this.selectSearch();
        },
        cancel() {
            this.checkDoctypeList = [];
            this.checkJournalList = [];
            this.checkConferenceList = [];
            this.checkPublisherList = [];
        },
        handleSizeChange(val) {
            this.size = val;
            this.selectSearch();
        },
        handleCurrentChange(val) {
            this.pageIdx = val;
            this.selectSearch();
        },
        changeCollect(data) {
            this.$emit('changeCollect', data);
        },
        changeYear() {
            this.selectSearch();
        },
        getContactData() {
            // 文献期刊数据提取
            var journals = [];
            for (var i = 0; i < this.checkJournalList.length; i++)
                for (var j = 0; j < this.aggregation.journal.length; j++)
                    if (this.checkJournalList[i] === this.aggregation.journal[j].name)
                        journals.push(this.aggregation.journal[j].journal_id);

            // 文献会议数据提取
            var conferences = [];
            for (var k = 0; k < this.checkConferenceList.length; k++)
                for (var l = 0; l < this.aggregation.conference.length; l++)
                    if (this.checkConferenceList[k] === this.aggregation.conference[l].name)
                        conferences.push(this.aggregation.conference[l].conference_id);
            let data = {
                page: this.pageIdx,
                size: this.size,
                doctypes: JSON.stringify(this.checkDoctypeList),
                journals: JSON.stringify(journals),
                conferences: JSON.stringify(conferences),
                publishers: JSON.stringify(this.checkPublisherList),
                sort_type: Math.ceil(this.sorter / 2),
                sort_ascending: this.sorter % 2 === 0,
            };
            if (this.mode === 'normal') {
                data[this.header_select] = this.input;
                data["min_year"] = this.year[0];
                data["max_year"] = this.year[1];
            } else if (this.mode === 'advance') {
                data["conditions"] = JSON.stringify(this.conditions);
                data["min_date"] = this.min_date;
                data["max_date"] = this.max_date;
            }
            return qs.stringify(data);
        },
        getContactUrl() {
            if (this.mode === 'normal')
                return '/es/select/paper/' + this.header_select;
            else if (this.mode === 'advance')
                return '/es/select/paper/advanced';
        },
        selectSearch() {
            if (this.year[0] < 0 || this.year[1] < 0 ||
                this.year[0] > this.year[1] ||
                this.year[0] > 2022 || this.year[1] > 2022) {
                this.$message.error("请输入合理的年份范围！");
                return;
            }
            let _loadingIns = this.$loading({ fullscreen: true, text: '拼命加载中' });

            this.$axios({
                method: 'post',
                url: this.getContactUrl(),
                data: this.getContactData()
            })
                .then(res => {
                    _loadingIns.close();
                    switch (res.data.status) {
                        case 200:
                            if (res.data.total_hits === 10000)
                                this.total_hits_str = "10000+";
                            else
                                this.total_hits_str = res.data.total_hits.toLocaleString();
                            let data = {
                                articles: res.data.details,
                                total_hits: res.data.total_hits,
                                total_hits_str: this.total_hits_str
                            }
                            this.updateTime(res.data.aggregation);

                            this.$emit('high', data);
                            break;
                        case 404:
                            this.total_hits = 0;
                            this.total_hits_str = '0';
                            break;
                        case 500:
                            this.$message.error("系统发生错误，请联系管理员！");
                            setTimeout(() => {
                                this.$router.push("/");
                            }, 1500);
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        updateTime(aggregation) {
            this.minYear = aggregation.min_year;
            this.maxYear = aggregation.max_year;
            this.year[0] = this.minYear;
            this.year[1] = this.maxYear;
        }
    },
    mounted() {
        // handleScroll为页面滚动的监听回调
        // window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    filters: {
        //超过20位显示 ...
        ellipsis: function (value) {
            if (!value) return "";
            if (value.length > 400) {
                return value.slice(0, 400) + "...";
            }
            return value;
        },
        ellipsis_25: function (value) {
            if (!value) return "";
            if (value.length > 25) {
                return value.slice(0, 25) + "...";
            }
            return value;
        }
    },
    watch: {
        aggregation: {
            deep: true,
            handler: function (val) {
                this.updateTime(val);
            }
        }
    },
}
</script>

<style scoped>
.article-result>>>.el-pager li {
    width: 40px;
    height: 40px;
    padding: 7px;
}

.article-result>>>.el-pagination .btn-prev .el-icon {
    font-size: 15px;
    margin: 15px;
}

.article-result>>>.el-pagination .btn-next .el-icon {
    font-size: 15px;
    margin: 15px;
}

.article-result .main-body {
    padding: 0 40px 20px 80px;
}

.article-result .header {
    margin-bottom: 40px;
}

.article-result .box-card {
    padding: 20px;
}

.article-result .box-card .sub-block {
    margin-bottom: 20px;
}

.article-result .year-input>>>.el-input--mini .el-input__inner {
    font-size: 13px;
    color: #0274B3;
}

.article-result .year-input>>>.el-input__inner {
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
}

.article-result .year-input>>>.el-input--mini {
    width: 25px;
    text-align: center;
}

.article-result>>>.el-pagination__editor.el-input .el-input__inner {
    height: 40px;
}

.article-result>>>.el-pagination__jump {
    font-size: 15px;
}

.article-result .box-card .check-box-title {
    text-align: left;
    font-size: 17px;
    margin-bottom: 20px;
}

.article-result #chooseBar .isFixed {
    position: fixed;
    top: 0;
    z-index: 999;
}

.square-buttons {
  display: flex;
  justify-content: flex-end;
}

.square-button {
  width: 40px;
  height: 40px;
  background-color: #2f3a91;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 120%;
  margin-right: 2px;
}
.square-button:last-child {
  margin-right: 0;
}

.square-button i {
  font-weight: bold;
}

.square-button:hover {
  //transform: scale(1.05); /* 鼠标悬停时放大按钮 */
}


</style>
