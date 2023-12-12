<template>
    <div class="footer">
        <div class="left">
            <span>
                
            </span>
        </div>
        <div class="mid"></div>
        <div class="right"></div>
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