<template>
    <div class="home-page">
        <div class="img-container">
            <div class="search-bar">
                <el-input placeholder="发现你感兴趣的内容..." @input="allow" v-model="input3" class="input-with-select">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="标题" value="1"></el-option>
                        <el-option label="关键词" value="2"></el-option>
                        <el-option label="作者" value="3"></el-option>
                        <el-option label="学者" value="4"></el-option>
                    </el-select>
                    <el-select class="select select-right" v-model="select2" slot="prepend" placeholder="请选择">
                        <el-option label="精确" value="1"></el-option>
                        <el-option label="模糊" value="2"></el-option>
                    </el-select>
                    <!-- <el-button slot="append" type="text">文字按钮</el-button> -->
                    <el-link slot="append" id="pro-search" type="primary" :underline="false"
                        @click="dialogVisible = true">高级检索</el-link>
                    <!-- <el-button id="pro-search" slot="append" icon="el-icon-search">高级检索</el-button> -->
                    <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button">检索</el-button>
                </el-input>
            </div>
        </div>
        <div class="paper-selection">
            <PaperUnit v-for="index in 4" :key="index"></PaperUnit>
        </div>
        <el-dialog title="高级检索" :visible.sync="dialogVisible" width="50%">
            <!-- <span>这是一段信息</span> -->
            <div>
                <el-input placeholder="请输入标题" class="pro-input" v-model="input4">
                    <template slot="prepend">标题</template>
                </el-input>
                <el-input placeholder="请输入关键词" class="pro-input" v-model="input5">
                    <template slot="prepend">关键词</template>
                </el-input>
                <el-input placeholder="请输入作者" class="pro-input" v-model="input6">
                    <template slot="prepend">作者</template>
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="pro-but" style="background-color: rgba(47, 58, 145, .8) !important;" type="primary"
                    @click="ProSearch()">确 定</el-button>
                <el-button class="pro-but" @click="ResetProSearch()">重置条件</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import PaperUnit from "@/components/PaperUnit.vue"
import router from "@/router";
import { FuzzySearch, AuthorSearch } from "@/api/api";
export default {
    data() {
        return {
            // aboout: "首页",
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            select: '1',
            select2: '1',
            dialogVisible: false,
            searchField: {
                search_field: '',
                search_content: '',
                sort_by: 'publication_date',
                sort_order: '',
                sort_type: ''
            },
            proSearchField: {
                sort_by: '',
                sort_order: '',
                search_list: []
            },
            proSearchFieldt: {
                sort_by: 'desc',
                sort_order: '',
                search_list: [
                    {
                        search_content: '111',
                        search_field: 'title'
                    },
                    {
                        search_content: '111',
                        search_field: 'title'
                    }
                ]
            },

        }
    },
    components: { PaperUnit }
    , methods: {
        resetAll() {
            this.input1 = '',
                this.input2 = '',
                this.input3 = '',
                this.input4 = '',
                this.input5 = '',
                this.input6 = '',
                this.select = '1',
                this.select2 = '1'
        },
        allow() {
            if (this.select !== null && this.select !== '' && this.select2 !== null && this.select2 !== '' && this.input3 !== null && this.input3 !== '') {
                this.$refs.button.$el.style.cursor = 'pointer'
            } else {
                this.$refs.button.$el.style.cursor = 'not-allowed'
            }
        },
        ProSearch() {
            console.log(this.proSearchField)

            this.proSearchField.sort_by = ''
            this.proSearchField.sort_order = 'desc'
            if (this.input4 === '' && this.input5 === '' && this.input6 === '') {
                this.$message({
                    type:'error',
                    message:'请输入搜索内容'
                })
            } else {
                if (this.input4 !== '') {
                    this.proSearchField.search_list.push({ search_field: 'title', search_content: this.input4 })
                }
                if (this.input5 !== '') {
                    this.proSearchField.search_list.push({ search_field: 'keywords.keyword', search_content: this.input5 })
                }
                if (this.input6 !== '') {
                    this.proSearchField.search_list.push({ search_field: 'authorships.author.display_name', search_content: this.input6 })
                }
                this.$router.push({
                    path: '/explore/' + btoa(encodeURIComponent(JSON.stringify(this.proSearchField)))
                })
                console.log(this.proSearchField)
            }



        },
        Jump() {
            this.dialogVisible = false;
            router.push("/explore")
        },
        ResetProSearch() {
            this.input4 = ''
            this.input5 = ''
            this.input6 = ''
        },
        Search() {
            console.log(this.select)
            console.log(this.select2)
            switch (this.select) {
                case '1':
                    this.searchField.search_field = 'title'
                    break
                case '2':
                    this.searchField.search_field = 'keywords.keyword'
                    break
                case '3':
                    this.searchField.search_field = 'authorships.author.display_name'
                    break
                case '4':
                    this.searchField.search_field = 'display_name'
                    break
            }
            this.searchField.sort_by = ''
            this.searchField.sort_order = 'desc'
            this.searchField.search_content = this.input3
            if (this.select2 == '1') {
                this.searchField.sort_type = 'exact'
            } else if (this.select2 == '2') {
                this.searchField.sort_type = 'fuzzy'
            }
            console.log(this.searchField)
            // if(this.searchField.search_field!=='display_name'){
            //     FuzzySearch(this.searchField).then(res => {
            //     console.log(res)
            // })
            // }else{
            //     AuthorSearch(this.searchField).then(res=>{
            //         console.log(res)
            //     })
            // }
            this.$router.push({
                path: '/explore/' + btoa(encodeURIComponent(JSON.stringify(this.searchField)))
            })
        }
    },
    mounted() {
        if (this.select === null || this.select === '' || this.select2 === null || this.select2 === '' || this.input3 === null || this.input3 === '') {
            this.$refs.button.$el.style.cursor = 'not-allowed'
        }
    }
}
</script>
<style scoped>
.img-container {
    display: block;
    width: 100%;
    height: 435px;
    background-image: url("../assets/bg.webp");
    /* float: left; */
    position: relative;
}

.search-bar {
    margin: 20px -500px;
    float: left;
    position: absolute;
    left: 50%;
    top: 30%;
}

/* .img-container .el-select .el-input {
    width: 500px;
    height: 100px;
} */

.input-with-select {
    width: 1000px;
    height: 50px;

}


.select-right {
    margin-left: 20px;
}

/deep/.el-select {
    width: 130px;
}

/deep/.el-input__inner {
    height: 50px;
    /* width: 100px;` */
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;

}

#pro-search {
    display: inline-block;
    margin-right: 40px;
    background-color: #fff;
    color: rgba(47, 58, 145, .8) !important;
    font-size: larger;
}

#search-button {
    border-color: #fff;
    background-color: rgba(47, 58, 145, .8) !important;
    color: #fff;
    border-radius: 0;
    padding: 16px 20px;
    width: 100px;
    font-size: larger;
}

/deep/.el-input-group__append {
    background-color: #fff;
    border-color: #fff;
}

/deep/.el-input__inner {
    border-color: #fff;
}

/deep/.el-input-group__prepend {
    background-color: #fff;
    border-color: #fff;
    border-radius: 0;
}

.select /deep/.el-input__inner::placeholder {
    color: rgba(47, 58, 145, .8) !important;
    font-weight: 500;
    text-align: center;
}

/deep/.el-select {
    /* border-right: 1px solid blue; */
    position: relative;

}


/deep/.el-select::after {
    content: '';
    position: absolute;
    top: 25%;
    /* 调整分隔线位置，这里设置为盒子高度的一半 */
    right: 0;
    height: 50%;
    /* 设置分隔线的高度为盒子高度的一半 */
    width: 2px;
    /* 设置分隔线的宽度 */
    background-color: #d6dbe3;
    /* 设置分隔线颜色 */
}

.pro-input {
    /* border: #bfc3de solid 2px; */
    width: 70%;
    border-radius: 10px;
    /* border-top-right-radius: 10px; */
    /* padding: 10px; */
    margin: 10px 0px;
}

.pro-input /deep/.el-input__inner {
    height: 35px;
    border: #bfc3de solid 2px;
    border-radius: 5px;
    margin-left: 10px;
}

.pro-input /deep/.el-input__inner:hover {
    border-color: rgba(47, 58, 145, .8) !important;
}

.pro-input /deep/.el-input-group__prepend {
    border: #bfc3de solid 2px;
    width: 80px;
    border-radius: 5px;
    /* margin-right: 10px; */
}

.pro-but {
    width: 115px;
}
</style>
