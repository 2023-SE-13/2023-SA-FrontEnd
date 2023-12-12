<template>
    <div class="footer">
        <div class="left">
            <span>
                开发小组:
            </span>
            <br>
            <span>
                小组成员:
            </span>
        </div>
        <div class="mid">
            <span>
                运营单位:
            </span>
            <span>
                联系地址:
            </span>
            <span>
                联系邮箱:
            </span>
        </div>
        <div class="right">
            <span>
                问题反馈:
            </span>
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
    margin-top: 50px;
}
.left{
    position: absolute;
    width: 20%;
    height: 100%;
    left: 10%;
    background-color: aqua;
}
.mid{
    position: absolute;
    width: 20%;
    height: 100%;
    left: 30%;
    background-color: red;
}
.right{
    position: absolute;
    width: 20%;
    height: 100%;
    left: 50%;
    background-color: purple;
}
</style>