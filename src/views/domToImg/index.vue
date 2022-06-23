<template>
  <div class="container">
    <div class="content" ref="ele">
      <p>不过是大梦一场空</p>
      <p>不过是孤影照惊鸿</p>
      <p>不过是白驹之过一场梦</p>
      <p>有道是万物皆虚空</p>
    </div>
    <el-button type="primary" @click="onGetImg">生成图片</el-button>
    <div class="img_box" v-if="url">
      <img :src="url" alt="" />
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui';
import domToImg from '@/utils/domToImg';

export default {
  components: {
    'el-button': Button
  },
  data() {
    return {
      ele: null,
      url: ''
    };
  },
  methods: {
    onGetImg() {
      const ele = this.$refs.ele;

      domToImg(ele).then((url) => {
        this.url = url;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin: 20px auto;
  padding: 10px 20px;
  width: 300px;
  border: 1px dotted #999;

  p {
    line-height: 1.5em;
  }
}

.img_box {
  margin: 20px auto;
  width: 300px;

  img {
    width: 100%;
  }
}
</style>
