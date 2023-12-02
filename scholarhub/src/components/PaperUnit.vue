<template>
    <div class="paper-unit">
        <!-- <img class="paper-img"  src="../assets/logo.png" alt="加载失败"> -->
        <div class="paper-img"> <img src="" alt="图片加载失败" class="fallback-img"></div>
        <div class="paper-title"></div>
        <div class="paper-abstract"></div>
        <div class="paper-author"></div>
    </div>
</template>
<script>
</script>
<style>
.paper-unit {
    width: 280px;
    height: 380px;
    background-color: aqua;
    /* padding: 10px; */
    display: inline-block;
    margin: 30px 15px;
    font-family: Inter, Roboto, pingfang SC, hiragino sans gb, Apple SD Gothic Neo, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif, helvetica neue, arial, microsoft yahei ui, microsoft yahei, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
}

.paper-unit:hover {}

.paper-img {
    width: 100%;
    height: 45%;
    position: relative;
    /* background-color: bisque; */
    background-image: url("../assets/cover.jpg");
    /* scale: 0.7; */
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.paper-img::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: inherit;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease;
    transform: scale(1);
}

.paper-img:hover::before {
    transform: scale(1.2);
}

.paper-img:not(:hover)::before {
    /* transition: transform 0.3s ease; */
    transform: scale(1);
}

.paper-title {
    width: 100%;

}
</style>