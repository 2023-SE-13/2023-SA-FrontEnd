<template>
    <div class="home-page">
        <div class="img-container">
            <div class="search-bar">

                <el-input placeholder="发现你感兴趣的内容..." v-model="input3" class="input-with-select">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="标题" value="1"></el-option>
                        <el-option label="关键词" value="2"></el-option>
                        <el-option label="作者" value="3"></el-option>
                    </el-select>
                    <!-- <el-button slot="append" type="text">文字按钮</el-button> -->
                    <el-link slot="append" id="pro-search" type="primary" :underline="false">高级检索</el-link>
                    <!-- <el-button id="pro-search" slot="append" icon="el-icon-search">高级检索</el-button> -->
                    <el-button slot="append" id="search-button" icon="el-icon-search">检索</el-button>
                </el-input>
            </div>
        </div>
        <div class="paper-selection">
            <PaperUnit v-for="index in 4" :key="index"></PaperUnit>
        </div>
        {{ aboout }}
    </div>
</template>
<script>
import PaperUnit from "@/components/PaperUnit.vue"
export default {
    data() {
        return {
            aboout: "首页",
            input1: '',
            input2: '',
            input3: '',
            select: ''
        }
    },
    components: { PaperUnit }
}
</script>
<style scoped>
.img-container {
    display: block;
    width: 100%;
    height: 435px;
    background-color: aqua;
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

/deep/.el-select {
    width: 130px;
    border-radius: null;
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
</style>