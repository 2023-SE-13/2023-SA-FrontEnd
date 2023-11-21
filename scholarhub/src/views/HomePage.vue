<template>
    <div class="home-page">
        <div class="img-container">
            
        </div>
        {{ aboout }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            aboout:"首页"
        }
    }
}
</script>
<style lang="scss">
    .img-container{
        display: block;
        width: 100%;
        height: 435px;
        background-color: aqua;
    }
</style>