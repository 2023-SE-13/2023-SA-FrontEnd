<template>
    <div>
        <!-- <el-menu default-active="1" class="el-menu1-demo" mode="horizontal" @select="handleSelect1">
          <el-menu-item index="1">论文</el-menu-item>
          <el-menu-item id="item2" index="2">专利</el-menu-item>
        </el-menu> -->
        <div class="Navi">
            <div class="Ep-content">
                <div class="content1" v-show="ConIdx === '1'">
                    <el-menu default-active="1" class="el-menu1-demo" mode="horizontal" @select="handleSelect1">
                        <el-menu-item index="1">论文</el-menu-item>
                        <el-menu-item id="item2" index="2">专利</el-menu-item>
                    </el-menu>
                    <div v-show="MenuIdx === '1'">
                        <div class="result-unit" v-for="(count, index) in counts" :key="index">
                            <h2>论文标题</h2>
                            <div class="unit-author">
                                <i class="el-icon-user-solid"><span>作者</span></i>
                                <!-- <div>作者</div> -->
                            </div>
                            <div class="unit-source">
                                出处
                            </div>
                            <div class="unit-preview">
                                引言
                            </div>
                            <div class="unit-keywords">关键词</div>
                        </div>
                    </div>
                    <div v-show="MenuIdx === '2'">
                        222
                    </div>
                </div>
                <div class="content2" v-show="ConIdx === '2'">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ConIdx: '1',
            MenuIdx: '1',
            counts: 10
        }
    },
    methods: {
        handleSelect1(key, keyPath) {
            console.log(key, keyPath);
            this.MenuIdx = key;
        },
    }
}
</script>
<style scoped>
.result-unit {
    position: relative;
    /* border: 1px solid #ccc; */
    padding: 5px;
}
.result-unit h2{
    display: block;
    margin: 10px;
}
.result-unit .unit-author{
    margin-bottom: 10px;
}
.result-unit .unit-source{
    margin-bottom: 10px;
}
.result-unit .unit-preview{
    margin-bottom: 10px;
}

.result-unit .unit-keywords{
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

.Navi {
    width: 100%;
    min-height: 55vh;
    background-color: #f6f6f6;

}

.Ep-content {
    margin: 0 7.5%;
    padding: 1%;
    width: 82.6%;
    /* height: 92%; */
    min-height: 55vh;
    background-color: white;
}

.content1 .el-menu1-demo {
    height: 11%;
    border-bottom: 1px solid #2f3a91;
    margin-bottom: 2%;
}

.content1 .el-menu1-demo .el-menu-item {
    color: #121212;
    font-size: 14px;
    font-weight: 700;
    font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    width: 12%;
    height: 100%;
    line-height: 320%;
    border: 1px solid #dcdfe6;
    border-right: none;
    border-bottom: none;
}

.content1 .el-menu1-demo #item2 {
    border: 1px solid #dcdfe6;
    border-bottom: none;
}

.content1 .el-menu1-demo .el-menu-item:hover {
    background-color: #2f3a91;
    color: white;
}

.content1 .el-menu1-demo .el-menu-item.is-active {
    background-color: #2f3a91;
    color: white;
}
</style>