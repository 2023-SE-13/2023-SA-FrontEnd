<template>
    <div>
        <div class="work" v-show="isWork">
            <div class="work_left" id="mySelectBar">
                <SelectBox />
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
                            <ExploreUnit v-for="(paperData, index) in paperDatas.slice(begin0, end0)" :key="index"
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
import SelectBox from "@/components/SelectBox.vue";
export default {
    data() {
        return {
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
            loading: false
        }
    },
    computed: {
        noMore() {
            if (this.isWork) {
                return this.end0 >= 50
            }
            return this.end >= 50
        },
        disabled() {
            return this.loading || this.noMore
        }
    },
    methods: {
        showDialog(data) {
            console.log(data._id)
            this.isShowDialog = true
            console.log(this.isShowDialog)
            this.$router.push("/php/" + btoa(encodeURIComponent(data._id)))
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
                this.paperDatas = res.data.hits
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
                        this.paperDatas = res.data.hits
                    })
                } else {
                    FuzzySearch(this.searchField).then(res => {
                        console.log(res)
                        this.paperDatas = res.data.hits
                    })
                }
            }
        }

    },
    components: {
        ExploreUnit,
        ScholarUnit,
        SelectBox
    }
}
</script>
<style scoped>
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
    margin-left: 4%; /* 改这里 */
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
</style>
