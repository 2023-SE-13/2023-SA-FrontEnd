<template>
    <div class="home-page">
        <div class="img-container">
            <div class="search-bar">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search">检索</el-button>
                </el-input>
            </div>
        </div>
        {{ aboout }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            aboout: "首页",
            input1: '',
            input2: '',
            input3: '',
            select: ''
        }
    }
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

.el-input__inner {
    height: 50px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;

}
</style>