<template>
    <div class="paper-unit" @click="getPaper">
        <!-- <img class="paper-img"  src="../assets/logo.png" alt="加载失败"> -->
        <div class="paper-img"> <img src="" alt="图片加载失败" class="fallback-img"></div>
        <div class="paper-title">{{ paper.title }}</div>
        <div class="paper-abstract">{{ paper.abstract }}</div>
        <div class="paper-author">{{ paper.author }}</div>
    </div>
</template>
<script>
import { GetPaper } from "@/api/api"
export default {
    name: "PaperUnit",
    props: {
        paper: {
            type: Object,
            default: () => {
                return {
                    title: "Gold-Nanolayer-Derived Zincophilicity Suppressing Metallic Zinc Dendrites and Its Efficacy in Improving Electrochemical Stability of Aqueous Zinc-Ion Batteries",
                    abstract: "抑制锌枝晶形成新机制，可支持在50 mA cm-2的高电流密度稳定循环1000次",
                    author: "Yan, Pengfei; Zhang, Yufei; Wang, Zhiyu; et al.",
                }
            }
        }
    },
    data() {
        return {
            paper_id: '',
        }
    },
    methods: {
        getPaper() {
            GetPaper(this.paper_id).then(res=>{
                
            })
        }
    }
}
</script>
<style>
.paper-unit {
    border-radius: 5px;
    width: 277.5px;
    /* padding: 15px; */
    height: 380px;
    /* background-color: rgb(249, 253, 255); */
    /* padding: 10px; */
    display: inline-block;
    margin: 30px 15px;
    font-family: Inter, Roboto, pingfang SC, hiragino sans gb, Apple SD Gothic Neo, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif, helvetica neue, arial, microsoft yahei ui, microsoft yahei, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    /* box-shadow: 2px 2px rgba(0, 0, 0, 0.3); */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.paper-unit:hover {}

.paper-img {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 45%;
    position: relative;
    /* background-color: bisque; */
    background-image: url("../assets/paper-unit-cover.png");
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2; /* 控制显示的行数 */
    font: 18px Inter, Roboto, pingfang SC;
    font-weight: 700;
    text-align: left; /* 设置文本靠左对齐 */
    margin: 10px 5px;
    color: #181818;
}

.paper-abstract {
    color: #4b5b76;
    padding-top: 5px;
    margin: 10px 5px;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 4; /* 控制显示的行数 */
    font-weight: 400;
    font: 15px Inter, Roboto, pingfang SC;
    text-align: left; /* 设置文本靠左对齐 */
}

.paper-author {
    padding-top: 5px;
    margin: 0px 5px 8px;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1; /* 控制显示的行数 */
    font: 13px Inter, Roboto, pingfang SC;
    font-weight: 100;
    text-align: left; /* 设置文本靠左对齐 */
    color:#999999;
}
</style>