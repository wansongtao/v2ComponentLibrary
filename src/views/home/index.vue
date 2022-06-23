<template>
  <div class="home_container">
    <h1 class="title">所有示例</h1>
    <div class="home_main">
      <div class="home_main_item" v-for="(item, index) in routes" :key="index" @click="onJumpPage(item.path)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeContainer',
  data() {
    return {
      routes: []
    };
  },
  created() {
    const route = this.$router.options.routes[1];
    const commonPath = route.path;

    this.routes = route.children.map((item) => {
      return {
        path: `${commonPath}/${item.path}`,
        title: (item.meta && item.meta.title) || item.name
      };
    });
  },
  methods: {
    onJumpPage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.home_container {
  padding: 10px 20px;
}

.title {
  font-size: 24px;
}

.home_main {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 30px;

  .home_main_item {
    margin: 0 10px 5px 0;
    padding: 5px 10px;
    border: 1px dotted #999;
    cursor: pointer;
  }
}
</style>
