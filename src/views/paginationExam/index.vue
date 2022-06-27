<template>
  <div class="pag_container">
    <MultPagination :total="100" />
  </div>
</template>

<script>
import MultPagination from '@/components/MultPagination/index.vue';

export default {
  name: 'paginationExample',
  components: {
    MultPagination
  }
}
</script>

<style lang="scss" scoped>

</style>