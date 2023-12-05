<template>
    <div>
        {{ temp }}
        <el-select id="select-button" v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="标题" value="1"></el-option>
            <el-option label="关键词" value="2"></el-option>
            <el-option label="作者" value="3"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            temp: "暂定界面1"
        }
    }
}
</script>
<style></style>