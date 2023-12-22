<template>
    <div>
        <div class="Navi">
            <div class="Ep-content">
                <div class="content1" v-show="ConIdx === '1'">
                    <el-menu default-active="1" class="el-menu1-demo" mode="horizontal" @select="handleSelect1">
                        <el-menu-item index="1">论文</el-menu-item>
                        <el-menu-item id="item2" index="2">学者</el-menu-item>
                    </el-menu>
                    <div v-show="MenuIdx === '1'">
                        <ExploreUnit v-for="index in 4" :key="index"></ExploreUnit>
                    </div>
                    <div v-show="MenuIdx === '2'">
                        <ScholarUnit @show-dialog="showDialog" v-for="index in 10" :key="index"></ScholarUnit>
                    </div>
                </div>
            </div>
            <!-- 编辑表单 -->
            <el-dialog title="认领申请" :visible.sync="isShowDialog" width="30%" :modal="false">
                <el-form :label-position='left' label-width="80px" :model="form" @submit="" ref="formRef">
                    <el-form-item label="证明资料">
                        <!-- <input class="dialog-input" type="file" name="" id="" accept="image/*" ref="fileInput"> -->
                        <picture-input ref="pictureInput" @change="test" width="600" height="600" margin="16"
                            accept="image/jpeg,image/png" size="10" :removable="true" :customStrings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO'
                            }">
                        </picture-input>
                    </el-form-item>

                    <el-form-item label="个人姓名" prop="personalName">
                        <el-input v-model="form.personalName"></el-input>
                    </el-form-item>
                    <el-form-item label="个人描述" prop="personalDescri">
                        <el-input type="textarea" placeholder="请输入内容" v-model="form.personalDescri" maxlength="50"
                            show-word-limit>
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="isShowDialog = false" class="ftbtn">取 消</el-button> -->
                    <el-button type="primary" @click="submitApply()" class="ftbtn">确认提交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

import PictureInput from 'vue-picture-input'
import ExploreUnit from '@/components/ExploreUnit.vue'
import ScholarUnit from '@/components/ScholarUnit.vue';
export default {
    data() {
        return {
            ConIdx: '1',
            MenuIdx: '1',
            counts: 10,
            isShowDialog: false,
            form: {
                personalPhoto: null,
                personalName: '',
                personalDescri: ''
            },

        }
    },
    methods: {
        handleSelect1(key, keyPath) {
            console.log(key, keyPath);
            this.MenuIdx = key;
        },
        showDialog() {
            this.isShowDialog = true
            console.log(this.isShowDialog)
        },
        submitApply() {
            console.log(this.form)

            this.isShowDialog = false
            // this.$refs.formRef.resetFields()
        },
        test() {
            console.log('test')
        },
        onChange() {
            console.log('New picture selected!')
            if (this.$refs.pictureInput.image) {
                console.log('Picture loaded.')
                console.log(this.$refs.pictureInput.image)
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        handleSetImage(dataURL) {
            console.log(dataURL)
        }
    },
    components: {
        ExploreUnit,
        ScholarUnit,
        PictureInput
    },
    mounted() {
        this.$nextTick(() => {
            // 在组件完全加载后，绑定事件
            this.$refs.pictureInput.$on('change', this.test());
        });
    }
}
</script>
<style scoped>
.dialog-input {
    width: 50px;
    height: 50px;
    border: none;
}

.ftbtn {
    background-color: #2f3a91;
}

.result-unit {
    position: relative;
    /* border: 1px solid #ccc; */
    padding: 5px;
}

.result-unit h2 {
    display: block;
    margin: 10px;
}

.result-unit .unit-author {
    margin-bottom: 10px;
}

.result-unit .unit-source {
    margin-bottom: 10px;
}

.result-unit .unit-preview {
    margin-bottom: 10px;
}

.result-unit .unit-keywords {
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
