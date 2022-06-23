<template>
  <div class="layout_container">
    <div class="layout_main">
      <router-view></router-view>
    </div>
    <div class="btn" @click="onJumpPage">返回首页</div>
  </div>
</template>

<script>
export default {
  name: "layoutContainer",
  methods: {
    onJumpPage() {
      this.$router.replace('/')
    }
  }
};
</script>

<style lang="scss" scoped>
.layout_main {
  padding: 20px;
}

.btn {
  position: fixed;
  right: 80px;
  bottom: 80px;
  padding: 10px 20px;
  border: 1px solid #999;
  border-radius: 8px;
  box-shadow: 0 0 2px 0 #999;
  cursor: pointer;
}
</style>
