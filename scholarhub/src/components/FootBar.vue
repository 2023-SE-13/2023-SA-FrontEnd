<template>
    <div class="footer">
        <div class="left">
            <span>
                开发小组: MSI
            </span>
            <!-- <br> -->
            <span>
                小组成员: 周星达 赵乾宇 杨硕 吴浩宇
            </span>
            <!-- <br> -->
            <span> &nbsp; 温舒盈 王陆昊 田琦 秦茂凯</span>
            <!-- <br> -->
            <span>&nbsp; 梁坤&nbsp;&nbsp;&nbsp; &nbsp;曾尔文</span>
        </div>
        <div class="mid">
            <span>
                运营单位:MSI
            </span>
            <!-- <br> -->
            <span>
                联系地址:balabala
            </span>
            <!-- <br> -->
            <span>
                联系邮箱:leonardzhou2077@gmain.com
            </span>
        </div>
        <div class="right">
            <span>
                问题反馈
            </span>
            <!-- <br> -->
            <span>
                著作权申诉
            </span>
            <!-- <br> -->
            <span>
                举报邮箱:leonardzhou2077@gmain.com
            </span>
        </div>
        <div class="img-contain">
            <img src="../assets/logo.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.footer {
    width: 100%;
    height: 28vh;
    background-color: #2f3a91;
    position: relative;
    bottom: 0;
    color: #cbcee3;
}

.left {
    position: absolute;
    width: 20%;
    height: calc(100% - 40px);
    left: 10%;
    /* background-color: aqua; */
    text-align: left;
    margin-top: 40px;
}

.left span {
    /* text-indent: 1em; */
    display: block;
    margin-top: 10px;
    font-size: smaller;
}

.left span:nth-child(1),
.left span:nth-child(2) {
    text-indent: 0;
    /* 第一行和第二行不缩进 */
}

.left span:not(:first-child):not(:nth-child(2)) {
    text-indent: 4em;
    /* 后面的行缩进 */
}


.mid {
    position: absolute;
    width: 20%;
    height: calc(100% - 40px);
    left: 30%;
    /* background-color: red; */
    text-align: left;
    margin-top: 40px;
}

.mid span {
    display: block;
    margin-top: 10px;
    font-size: smaller;
}

.right {
    position: absolute;
    width: 20%;
    height: calc(100% - 40px);
    left: 50%;
    /* background-color: purple; */
    text-align: left;
    margin-top: 40px;
}

.right span {
    display: block;
    margin-top: 10px;
    font-size: smaller;
}
.img-contain{
    position: absolute;
    height: calc(100% - 40px);
    margin-top: 40px;
    width: 20%;
    left: 70%;
    /* background-image: url('../assets/logo.png'); */
}
.img-contain img{
    max-width: 100%;
    max-height: 100%;
    display: block;
}

</style>
