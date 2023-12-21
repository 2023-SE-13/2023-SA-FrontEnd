<template>
    <div class="scholar-unit">
        <div class="inner-container">
            <div class="left">
                <el-avatar class="avatar" :size="55" src="../assets/cover.png"></el-avatar>
                <div class="left-inner">
                    <h3>Tom Hanx</h3>
                    <span >Finnish Environment Institute</span>
                    <i class="el-icon-document">5</i>
                    <i class="el-icon-collection">4</i>
                </div>
            </div>
            <div class="right">
                <el-button class="right-button" @click="showDialog">认领学者</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        showDialog(){
            this.$emit('show-dialog')
        }
    }
}
</script>
<style scoped>
.scholar-unit {
    width: 580px;
    height: 55px;
    /* background-color: aquamarine; */
    float: left;
    margin-left: 1vw;
    margin-top: 2vh;
    padding: 10px;
    border: 2px solid #d0d7de;
    border-radius: 10px;
    box-shadow: 2px 2px rgba(208, 215, 222, 0.2);
    transition: 0.5s;
}
.scholar-unit:hover{
    box-shadow: 2px 2px rgba(208, 215, 222, 0.8);
}

.inner-container {
    width: 100%;
    height: 100%;
    /* background-color: blue; */
}

.left {
    display: inline-block;
    float: left;
    /* background-color: black; */
    width: 300px;
    height: 100%;
    /* background-color: blueviolet; */
    vertical-align: top;
}
.left-inner{
    float: left;
    margin-left: 20px;
    height: 100%;
}
.left-inner span{
    display: inline-block;
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    /* vertical-align: bottom;
     */
     color: #6e7781;
     font-size: x-small;
     margin-top: 20px;
     vertical-align: bottom;
}
.left-inner h3{
    color: #0969da;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 150px;
    text-align: left;
    font-weight: 600;
    font-size:medium;
}
.left-inner i{
    display: inline-block;
    color: #6e7781;
    font-size: x-small;
    /* margin-bottom: 20px; */
    margin-left: 10px;
}
.right {
    float: right;
    display: inline-block;
    width: 250px;
    height: 100%;
    /* background-color: aqua; */

}
.right-button{
    float: right;
    height: 30px;
    font-size: smaller;
    width: 60px;
    text-align: center;
    display: inline-block;
    align-items: center;
    padding: 0;
    font-weight: 600;
}
.avatar {
    float: left;
}
</style>