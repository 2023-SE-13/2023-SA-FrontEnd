<template>
    <div>
        <div class="work" v-show="isWork">
            <div class="work_left" id="mySelectBar">
                <!-- <SelectBox :abc="paperDatas" /> -->
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
                                                <div class="square-button" @click="makeSure()"><i
                                                        class="el-icon-search"></i></div>
                                                <div class="square-button" @click="cancel()"><i class="el-icon-close"></i>
                                                </div>
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
                                                            <el-input size="mini" v-model="year[0]"
                                                                style="width: 35%;margin-right: 10px;margin-left: 5px;font-size: 13px"></el-input>
                                                            &nbsp;~&nbsp;
                                                            <el-input size="mini" v-model="year[1]"
                                                                style="width: 35%;margin-left: 4px;font-size: 13px"></el-input>
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>

                                            <el-divider v-if="mode !== 'advance'"></el-divider>

                                            <div class="publish-type sub-block">
                                                <div class="check-box-title" style="margin-bottom: 15px;">
                                                    <span>领域</span>
                                                </div>

                                                <el-checkbox-group v-for="(count, field, index) in filteredFieldCounts"
                                                    :key="field" style="margin-bottom: 15px; text-align: left"
                                                    v-model="checkFieldList" v-if="field && (index < 4 || isExpanded0)">
                                                    <el-checkbox :label="field">
                                                        <span>{{ field | ellipsis_25 }}&nbsp;({{ count
                                                        }})</span>
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                                <!--
                                                <el-button @click="isExpanded0 = !isExpanded0">
                                                    {{ isExpanded0 ? '收起' : '展开' }}
                                                </el-button> -->
                                                <el-button class="expand-button" @click="isExpanded0 = !isExpanded0">
                                                    <i v-if="isExpanded0" class="el-icon-arrow-up"></i>
                                                    <i v-else class="el-icon-arrow-down"></i>
                                                </el-button>

                                            </div>

                                            <el-divider></el-divider>

                                            <div class="publish-journal sub-block">
                                                <div class="check-box-title" style="margin-bottom: 15px;">
                                                    <span>语言</span>
                                                </div>

                                                <el-checkbox-group v-for="(count, language, index) in languageCounts"
                                                    :key="language" style="margin-bottom: 15px; text-align: left"
                                                    v-model="checkLanguageList"
                                                    v-if="languageMap[language] && (index < 5 || isExpanded)">
                                                    <el-checkbox :label="language">
                                                        <span>{{ languageMap[language] | ellipsis_25 }}&nbsp;({{ count
                                                        }})</span>
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                                <el-button class="expand-button" @click="isExpanded = !isExpanded">
                                                    <i v-if="isExpanded" class="el-icon-arrow-up"></i>
                                                    <i v-else class="el-icon-arrow-down"></i>
                                                </el-button>
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
            </div>
            <div class="work_right">
                <div class="work_right_content">
                    <div class="content1">
                        <el-menu default-active="1" class="el-menu1-demo" mode="horizontal">
                            <el-menu-item index="1">论文</el-menu-item>
                        </el-menu>
                        <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" style="overflow: scroll">
                            <el-backtop :bottom="70" :right="70" style="z-index: 1000">
                                <div
                                    style="height: 100%; width: 100%; background-color: white;box-shadow: 6px 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px;color: #0969da;">
                                    <i class="el-icon-arrow-up"></i>
                                </div>
                            </el-backtop>
                            <ExploreUnit v-for="(paperData, index) in paperDatas_to.slice(begin0, end0)" :key="index"
                                :paper-data="paperData"></ExploreUnit>
                            <p v-if="loading" style="margin: 15px; font-size: 18px"><i class="el-icon-loading"></i>加载中...
                            </p>
                            <p v-if="noMore" style="margin: 15px; font-size: 18px"><i
                                    class="el-icon-warning-outline"></i>没有更多了</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="scholar" v-show="!isWork">
            <div class="scholar_center">
                <div class="scholar_center_content">
                    <div class="content2">
                        <el-menu default-active="1" class="el-menu2-demo" mode="horizontal">
                            <el-menu-item index="1">学者</el-menu-item>
                        </el-menu>
                        <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" style="overflow: scroll">
                            <el-backtop :bottom="70" :right="70" style="z-index: 1000">
                                <div
                                    style="height: 100%; width: 100%; background-color: #f3f5f7;box-shadow: 6px 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px;color: #0969da;">
                                    UP
                                </div>
                            </el-backtop>
                            <ScholarUnit v-for="(authorData, index) in authorDatas.slice(begin, end)" :key="index"
                                :author-data="authorData" @show-dialog="showDialog(authorData)"> </ScholarUnit>
                            <p v-if="loading" style="margin: 15px; font-size: 18px"><i class="el-icon-loading"></i>加载中...
                            </p>
                            <p v-if="noMore" style="margin: 15px; font-size: 18px"><i
                                    class="el-icon-warning-outline"></i>没有更多了</p>
                        </div>
                        <!-- <el-dialog title="认领申请" :visible.sync="isShowDialog" width="30%" :modal="false">
                            <el-form :label-position='left' label-width="80px" :model="form" @submit="" ref="formRef">
                                <el-form-item label="证明资料">
                                    <picture-input ref="pictureInput" @change="test" width="600" height="600" margin="16"
                                        accept="image/jpeg,image/png" size="10" :removable="true" :customStrings="{
                                            upload: '<h1>Bummer!</h1>',
                                            drag: 'Drag a 😺 GIF or GTFO'
                                        }">
                                    </picture-input>
                                </el-form-item>

                                <el-form-item label="个人姓名" prop="personalName">
                                    <el-input v-model="form.personalName"></el-input>
                                </el-form-item>
                                <el-form-item label="个人描述" prop="personalDescri">
                                    <el-input type="textarea" placeholder="请输入内容" v-model="form.personalDescri"
                                        maxlength="50" show-word-limit>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="submitApply()" class="ftbtn">确认提交</el-button>
                            </span>
                        </el-dialog> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AuthorSearch, FuzzySearch, ExactSearch, AuthorFuzzySearch, MultiSearch } from '@/api/api';
import ExploreUnit from '@/components/ExploreUnit.vue'
import ScholarUnit from '@/components/ScholarUnit.vue';

export default {
    props: [

        //   "header_select", "input", "mode", "conditions", "min_date", "max_date",
        //   "total_hits", "total_hits_str", "aggregation", "articles"
    ],
    data() {
        return {
            isExpanded: false,
            isExpanded0: false,
            languageMap: {
                'en': '英文',
                'hu': '匈牙利文',
                'pt': '葡萄牙文',
                'zh-cn': '简体中文',
                'nl': '荷兰语',
                'no': '挪威语',
                'so': '伊那里萨摩斯语',
                'it': '意大利文',
                'tl': '他加禄语',
                'ro': '罗马尼亚文',
                'ca': '加泰罗尼亚文',
                'sk': '斯洛伐克文',
                'de': '德文',
                'es': '西班牙文',
                'cs': '捷克文',
                'tr': '土耳其文',
                'pl': '波兰文',
                'ab': '阿布哈兹语',
                'af': '南非荷兰语',
                'ak': '阿坎语',
                'am': '阿姆哈拉语',
                'an': '阿拉贡语',
                'ar': '阿拉伯语',
                'as': '阿萨姆语',
                'av': '阿瓦尔语',
                'ay': '艾马拉语',
                'az': '阿塞拜疆语',
                'ba': '巴什基尔语',
                'be': '白俄罗斯语',
                'bg': '保加利亚语',
                'bh': '比哈尔语',
                'bi': '比斯拉马语',
                'bm': '班巴拉语',
                'bn': '孟加拉语',
                'bo': '藏语',
                'br': '布列塔尼语',
                'bs': '波斯尼亚语',
                'ce': '车臣语',
                'ch': '查莫罗语',
                'co': '科西嘉语',
                'cr': '克里语',
                'cu': '教会斯拉夫语',
                'cv': '楚瓦什语',
                'cy': '威尔士语',
                'da': '丹麦语',
                'dv': '迪维希语',
                'dz': '宗卡语',
                'ee': '埃维语',
                'el': '现代希腊语',
                'eo': '世界语',
                'et': '爱沙尼亚语',
                'eu': '巴斯克语',
                'fa': '波斯语',
                'ff': '富拉语',
                'fi': '芬兰语',
                'fj': '斐济语',
                'fo': '法罗语',
                'fr': '法语',
                'fy': '西弗里斯兰语',
                'ga': '爱尔兰语',
                'gd': '苏格兰盖尔语',
                'gl': '加利西亚语',
                'gn': '瓜拉尼语',
                'gu': '古吉拉特语',
                'gv': '马恩岛语',
                'ha': '豪萨语',
                'he': '希伯来语',
                'hi': '印地语',
                'ho': '希里莫图语',
                'hr': '克罗地亚语',
                'ht': '海地克里奥尔语',
                'hy': '亚美尼亚语',
                'hz': '赫雷罗语',
                'ia': '国际语',
                'id': '印度尼西亚语',
                'ie': '国际语E',
                'ig': '伊博语',
                'ii': '四川彝语',
                'ik': '伊努庇克语',
                'io': '伊多语',
                'is': '冰岛语',
                'iu': '因纽特语',
                'ja': '日语',
                'jv': '爪哇语',
                'ka': '格鲁吉亚语',
                'kg': '刚果语',
                'ki': '基库尤语',
                'kj': '宽亚玛语',
                'kk': '哈萨克语',
                'kl': '格陵兰语',
                'km': '高棉语',
                'kn': '卡纳达语',
                'ko': '韩语',
                'kr': '卡努里语',
                'ks': '克什米尔语',
                'ku': '库尔德语',
                'kv': '科米语',
                'kw': '康沃尔语',
                'ky': '吉尔吉斯语',
                'la': '拉丁语',
                'lb': '卢森堡语',
                'lg': '干达语',
                'li': '林堡语',
                'ln': '林加拉语',
                'lo': '老挝语',
                'lt': '立陶宛语',
                'lu': '卢巴-加丹加语',
                'lv': '拉脱维亚语',
                'mg': '马达加斯加语',
                'mh': '马绍尔语',
                'mi': '毛利语',
                'mk': '马其顿语',
                'ml': '马拉雅拉姆语',
                'mn': '蒙古语',
                'mr': '马拉地语',
                'ms': '马来语',
                'mt': '马耳他语',
                'my': '缅甸语',
                'na': '瑙鲁语',
                'nb': '挪威博克马尔语',
                'nd': '北恩德贝莱语',
                'ne': '尼泊尔语',
                'ng': '恩敦加语',
                'nn': '挪威尼努斯克语',
                'nr': '南恩德贝莱语',
                'nv': '纳瓦霍语',
                'ny': '尼扬贾语',
                'oc': '奥克西唐语',
                'oj': '奥吉布瓦语',
                'om': '奥罗莫语',
                'or': '奥里亚语',
                'os': '奥塞提语',
                'pa': '旁遮普语',
                'pi': '巴利语',
                'ps': '普什图语',
                'qu': '盖丘亚语',
                'rm': '罗曼什语',
                'rn': '基隆迪语',
                'ru': '俄语',
                'rw': '卢旺达语',
                'sa': '梵文',
                'sc': '撒丁语',
                'sd': '信德语',
                'se': '北萨米语',
                'sg': '桑戈语',
                'si': '僧伽罗语',
                'sk': '斯洛伐克语',
                'sl': '斯洛文尼亚语',
                'sm': '萨摩亚语',
                'sn': '修纳语',
                'so': '索马里语',
                'sq': '阿尔巴尼亚语',
                'sr': '塞尔维亚语',
                'ss': '斯瓦特语',
                'st': '南索托语',
                'su': '巽他语',
                'sv': '瑞典语',
                'sw': '斯瓦希里语',
                'ta': '泰米尔语',
                'te': '泰卢固语',
                'tg': '塔吉克语',
                'th': '泰语',
                'ti': '提格里尼亚语',
                'tk': '土库曼语',
                'tn': '茨瓦纳语',
                'to': '汤加语',
                'tr': '土耳其语',
                'ts': '聪加语',
                'tt': '鞑靼语',
                'tw': '奇威语',
                'ty': '塔希提语',
                'ug': '维吾尔语',
                'uk': '乌克兰语',
                'ur': '乌尔都语',
                'uz': '乌兹别克语',
                've': '文达语',
                'vi': '越南语',
                'vo': '沃拉普克语',
                'wa': '瓦隆语',
                'wo': '沃洛夫语',
                'xh': '科萨语',
                'yi': '意第绪语',
                'yo': '约鲁巴语',
                'za': '壮语',
                'zh': '中文',
                'zu': '祖鲁语',
            },


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
            maxYear: 2023,
            year: [1900, 2023],
            bcd: [],
            checkFieldList: [],
            allFieldList: [],

            checkLanguageList: [],
            allLanguagesList: [],
            // checkConferenceList: [],
            // checkPublisherList: [],


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
            isWork: false,
            isExact: '',
            ConIdx: '1',
            MenuIdx: '1',
            counts: 6,
            begin: 0,
            begin0: 0,
            end0: 4,
            end: 7,
            isShowDialog: false,
            form: {
                personalPhoto: null,
                personalName: '',
                personalDescri: ''
            },
            searchField: {
                search_field: "",
                search_content: "",
                sort_by: "",
                sort_order: ""
            },
            authorDatas: [],
            paperDatas: [],
            paperDatas_to: [],
            loading: false
        }
    },
    computed: {
        // noMore() {
        //     if (this.isWork) {
        //         return this.end0 >= 50
        //     }
        //     return this.end >= 50
        // },
        // disabled() {
        //     return this.loading || this.noMore
        // }
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
            this.checkFieldList = [];
            this.checkLanguageList = [];
            // this.checkConferenceList = [];
            // this.checkPublisherList = [];
        },
        handleSizeChange(val) {
            this.size = val;
            this.selectSearch();
        },
        handleCurrentChange(val) {
            this.pageIdx = val;
            this.selectSearch();
        },
        // changeCollect(data) {
        //     this.$emit('changeCollect', data);
        // },
        changeYear() {
            this.selectSearch();
        },
        // getContactData() {
        //     // 文献期刊数据提取
        //     var journals = [];
        //     for (var i = 0; i < this.checkJournalList.length; i++)
        //         for (var j = 0; j < this.aggregation.journal.length; j++)
        //             if (this.checkJournalList[i] === this.aggregation.journal[j].name)
        //                 journals.push(this.aggregation.journal[j].journal_id);

        //     // 文献会议数据提取
        //     var conferences = [];
        //     for (var k = 0; k < this.checkConferenceList.length; k++)
        //         for (var l = 0; l < this.aggregation.conference.length; l++)
        //             if (this.checkConferenceList[k] === this.aggregation.conference[l].name)
        //                 conferences.push(this.aggregation.conference[l].conference_id);
        //     let data = {
        //         page: this.pageIdx,
        //         size: this.size,
        //         doctypes: JSON.stringify(this.checkDoctypeList),
        //         journals: JSON.stringify(journals),
        //         conferences: JSON.stringify(conferences),
        //         publishers: JSON.stringify(this.checkPublisherList),
        //         sort_type: Math.ceil(this.sorter / 2),
        //         sort_ascending: this.sorter % 2 === 0,
        //     };
        //     if (this.mode === 'normal') {
        //         data[this.header_select] = this.input;
        //         data["min_year"] = this.year[0];
        //         data["max_year"] = this.year[1];
        //     } else if (this.mode === 'advance') {
        //         data["conditions"] = JSON.stringify(this.conditions);
        //         data["min_date"] = this.min_date;
        //         data["max_date"] = this.max_date;
        //     }
        //     return qs.stringify(data);
        // },
        // getContactUrl() {
        //     if (this.mode === 'normal')
        //         return '/es/select/paper/' + this.header_select;
        //     else if (this.mode === 'advance')
        //         return '/es/select/paper/advanced';
        // },
        selectSearch() {
            if (this.year[0] < 0 || this.year[1] < 0 ||
                this.year[0] > this.year[1] ||
                this.year[0] > 2023 || this.year[1] > 2023) {
                this.$message.error("请输入合理的年份范围！");
                return;
            }

            // let filteredPaperDatas = this.paperDatas.filter(data => {
            //     // 检查语言是否不为 null 且包含在已选语言列表中
            //     let languageCheck = data._source.language !== null && this.checkLanguageList.includes(data._source.language);
            //     // 提取年份并转换为数字
            //     let publicationYear = parseInt(data._source.publication_date.substring(0, 4));
            //     // 检查年份是否在指定范围内
            //     let yearCheck = publicationYear >= this.year[0] && publicationYear <= this.year[1];
            //     // 仅当语言和年份条件都满足时，才包含该数据
            //     return languageCheck && yearCheck;
            // });
            let filteredPaperDatas = this.paperDatas.filter(data => {
                // 检查语言是否不为 null 且包含在已选语言列表中
                let languageCheck = data._source.language !== null && this.checkLanguageList.includes(data._source.language);

                // 提取年份并转换为数字
                let publicationYear = parseInt(data._source.publication_date.substring(0, 4));

                // 检查年份是否在指定范围内
                let yearCheck = publicationYear >= this.year[0] && publicationYear <= this.year[1];

                // 检查文章的领域是否至少包含一个在 checkFieldList 中的领域
                let fieldCheck = data._source.concepts && data._source.concepts.some(concept => this.checkFieldList.includes(concept.display_name));

                // 仅当语言、年份和领域条件都满足时，才包含该数据
                return languageCheck && yearCheck && fieldCheck;
            });

            // let filteredPaperDatas = this.paperDatas.filter(data => data._source.language !== null && this.checkLanguageList.includes(data._source.language));
            console.log(filteredPaperDatas);
            //筛选逻辑结束，传入子组件给右边渲染
            this.paperDatas_to = filteredPaperDatas;
            //调用接口

        },
        updateTime(aggregation) {
            this.minYear = aggregation.min_year;
            this.maxYear = aggregation.max_year;
            this.year[0] = this.minYear;
            this.year[1] = this.maxYear;
        },
        fieldCounts() {
            return this.allFieldList.reduce((acc, field) => {
                acc[field] = (acc[field] || 0) + 1;
                return acc;
            }, {});
        },
        ///////////////////////
        showDialog(data) {
            console.log(data._id)
            this.isShowDialog = true
            console.log(this.isShowDialog)
            this.$router.push("/scholar/" + btoa(encodeURIComponent(data._id)))
        },
        submitApply() {
            console.log(this.form)
            this.isShowDialog = false
            // this.$refs.formRef.resetFields()
        },
        test() {
            console.log('test')
        },
        onChange() {
            console.log('New picture selected!')
            if (this.$refs.pictureInput.image) {
                console.log('Picture loaded.')
                console.log(this.$refs.pictureInput.image)
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        handleSetImage(dataURL) {
            console.log(dataURL)
        },
        load() {
            this.loading = true
            setTimeout(() => {
                if (this.isWork) {
                    this.end0 += 2
                } else {
                    this.end += 5
                }
                this.loading = false
            }, 1500)
        },
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
    computed: {
        languageCounts() {
            return this.allLanguagesList.reduce((acc, lang) => {
                acc[lang] = (acc[lang] || 0) + 1;
                return acc;
            }, {});
        },

        filteredFieldCounts() {
            const counts = this.fieldCounts();
            const filteredCounts = {};
            for (const field in counts) {
                if (counts[field] >= 20) {
                    filteredCounts[field] = counts[field];
                }
            }
            return filteredCounts;
        }

    },
    mounted() {

    },
    created() {
        // console.log(this.$route.params)
        console.log(JSON.parse(decodeURIComponent(atob(this.$route.params.data))))
        const tempSearch = JSON.parse(decodeURIComponent(atob(this.$route.params.data)))
        if (tempSearch.search_list) {
            this.isWork = true
            console.log("prosearch")
            MultiSearch(tempSearch).then(res => {
                console.log(res)
                this.paperDatas_to = res.data.hits
                this.paperDatas = this.paperDatas_to
                console.log(this.paperDatas);
                const languageSet = new Set();
                this.paperDatas.forEach(paperDatas => {
                    if (paperDatas._source && paperDatas._source.language) {
                        languageSet.add(paperDatas._source.language);
                    }
                });
                this.checkLanguageList = Array.from(languageSet);
                console.log(this.checkLanguageList);
                this.allLanguagesList = this.paperDatas.map(paperDatas => paperDatas._source?.language).filter(lang => lang !== undefined);
                console.log(this.allLanguagesList);
                const fieldSet = new Set();
                this.paperDatas.forEach(paperDatas => {
                    // 检查是否存在 concepts 字段
                    if (paperDatas._source && paperDatas._source.concepts) {
                        paperDatas._source.concepts.forEach(concept => {
                            // 将领域的 display_name 添加到集合中，以确保唯一性
                            if (concept.display_name) {
                                fieldSet.add(concept.display_name);
                            }
                            // 同时将所有领域名称添加到 allFieldList 数组中
                            this.allFieldList.push(concept.display_name);
                        });
                    }
                });

                // 从集合中创建一个数组，这个数组包含不重复的领域名称
                this.checkFieldList = Array.from(fieldSet);
                console.log(this.checkFieldList);
                // 过滤掉 allFieldList 中的 undefined 元素
                this.allFieldList = this.allFieldList.filter(field => field !== undefined);
                console.log(this.allFieldList);
            })
        } else {
            this.searchField.search_field = tempSearch.search_field
            this.searchField.sort_order = tempSearch.sort_order
            this.searchField.sort_by = tempSearch.sort_by
            this.searchField.search_content = tempSearch.search_content
            this.isExact = tempSearch.sort_type
            console.log(this.searchField)
            if (this.searchField.search_field === 'display_name') {
                this.isWork = false
                if (this.isExact === 'exact') {
                    AuthorSearch(this.searchField).then(res => {
                        // console.log(res)
                        this.authorDatas = res.data.hits
                        console.log(this.authorDatas)
                    })
                } else {
                    AuthorFuzzySearch(this.searchField).then(res => {
                        this.authorDatas = res.data.hits
                    })
                }
            } else {
                this.isWork = true
                if (this.isExact === 'exact') {
                    ExactSearch(this.searchField).then(res => {
                        console.log(res)
                        this.paperDatas_to = res.data.hits
                        this.paperDatas = this.paperDatas_to
                        console.log(this.paperDatas);
                        const languageSet = new Set();
                        this.paperDatas.forEach(paperDatas => {
                            if (paperDatas._source && paperDatas._source.language) {
                                languageSet.add(paperDatas._source.language);
                            }
                        });
                        this.checkLanguageList = Array.from(languageSet);
                        console.log(this.checkLanguageList);
                        this.allLanguagesList = this.paperDatas.map(paperDatas => paperDatas._source?.language).filter(lang => lang !== undefined);
                        console.log(this.allLanguagesList);
                        const fieldSet = new Set();
                        this.paperDatas.forEach(paperDatas => {
                            // 检查是否存在 concepts 字段
                            if (paperDatas._source && paperDatas._source.concepts) {
                                paperDatas._source.concepts.forEach(concept => {
                                    // 将领域的 display_name 添加到集合中，以确保唯一性
                                    if (concept.display_name) {
                                        fieldSet.add(concept.display_name);
                                    }
                                    // 同时将所有领域名称添加到 allFieldList 数组中
                                    this.allFieldList.push(concept.display_name);
                                });
                            }
                        });

                        // 从集合中创建一个数组，这个数组包含不重复的领域名称
                        this.checkFieldList = Array.from(fieldSet);
                        console.log(this.checkFieldList);
                        // 过滤掉 allFieldList 中的 undefined 元素
                        this.allFieldList = this.allFieldList.filter(field => field !== undefined);
                        console.log(this.allFieldList);
                    })
                } else {
                    FuzzySearch(this.searchField).then(res => {
                        console.log(res)
                        this.paperDatas_to = res.data.hits
                        this.paperDatas = this.paperDatas_to
                        console.log(this.paperDatas);
                        const languageSet = new Set();
                        this.paperDatas.forEach(paperDatas => {
                            if (paperDatas._source && paperDatas._source.language) {
                                languageSet.add(paperDatas._source.language);
                            }
                        });
                        this.checkLanguageList = Array.from(languageSet);
                        console.log(this.checkLanguageList);
                        this.allLanguagesList = this.paperDatas.map(paperDatas => paperDatas._source?.language).filter(lang => lang !== undefined);
                        console.log(this.allLanguagesList);
                        const fieldSet = new Set();
                        this.paperDatas.forEach(paperDatas => {
                            // 检查是否存在 concepts 字段
                            if (paperDatas._source && paperDatas._source.concepts) {
                                paperDatas._source.concepts.forEach(concept => {
                                    // 将领域的 display_name 添加到集合中，以确保唯一性
                                    if (concept.display_name) {
                                        fieldSet.add(concept.display_name);
                                    }
                                    // 同时将所有领域名称添加到 allFieldList 数组中
                                    this.allFieldList.push(concept.display_name);
                                });
                            }
                        });

                        // 从集合中创建一个数组，这个数组包含不重复的领域名称
                        this.checkFieldList = Array.from(fieldSet);
                        console.log(this.checkFieldList);
                        // 过滤掉 allFieldList 中的 undefined 元素
                        this.allFieldList = this.allFieldList.filter(field => field !== undefined);
                        console.log(this.allFieldList);
                    })
                }
            }
        }



    },
    components: {
        ExploreUnit,
        ScholarUnit,
        // SelectBox
    }
}
</script>
<style scoped>
.expand-button {
    padding: 5px; /* 调整按钮内边距，使其更小 */
    font-size: 12px; /* 调整字体大小 */
}

.result-unit {
    position: relative;
    /* border: 1px solid #ccc; */
    padding: 5px;
}

.result-unit h2 {
    display: block;
    margin: 10px;
}

.result-unit .unit-author {
    margin-bottom: 10px;
}

.result-unit .unit-source {
    margin-bottom: 10px;
}

.result-unit .unit-preview {
    margin-bottom: 10px;
}

.result-unit .unit-keywords {
    margin-bottom: 10px;
}

.result-unit::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    /* 设置线条的高度 */
    background-color: #f0f2f7;
    /* 设置线条的颜色 */
    display: block;
}

.work .work_left {
    width: 20%;
    height: 100%;
    float: left;
    margin-left: 4%;
    /* 改这里 */
    margin-top: -20px;
}

.work .work_right {
    width: 70%;
    min-height: 105vh;
    float: left;
    margin-top: 10px;
}

.work .work_right .work_right_content {
    /*margin: 0 7.5%;*/
    padding: 1%;
    /* height: 92%; */
    min-height: 105vh;
    background-color: white;
}

.work_right_content .content1 .el-menu1-demo {
    height: 11%;
    border-bottom: 1px solid #2f3a91;
    margin-bottom: 2%;
}

.work_right_content .content1 .el-menu1-demo .el-menu-item {
    color: #121212;
    font-size: 14px;
    font-weight: 700;
    font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    width: 12%;
    height: 100%;
    line-height: 320%;
    border: 1px solid #dcdfe6;
    border-bottom: none;
}

.work_right_content .content1 .el-menu1-demo .el-menu-item.is-active {
    background-color: #2f3a91;
    color: white;
}

scholar .scholar_center {
    width: 100%;
    min-height: 60vh;
    background-color: #f3f5f8;
}

.scholar .scholar_center .scholar_center_content {
    padding: 1%;
    width: 82.6%;
    margin-left: 7.5%;
    /* height: 92%; */
    min-height: 60vh;
    //position: center;
    background-color: white;
}

.scholar_center_content .content2 .el-menu2-demo {
    height: 11%;
    border-bottom: 1px solid #2f3a91;
    margin-bottom: 2%;
}

.scholar_center_content .content2 .el-menu2-demo .el-menu-item {
    color: #121212;
    font-size: 14px;
    font-weight: 700;
    font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    width: 12%;
    height: 100%;
    line-height: 320%;
    border: 1px solid #dcdfe6;
    border-bottom: none;
}

.scholar_center_content .content2 .el-menu2-demo .el-menu-item.is-active {
    background-color: #2f3a91;
    color: white;
}



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
