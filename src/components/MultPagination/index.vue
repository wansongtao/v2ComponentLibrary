<template>
  <div class="pagination">
    <!-- 分页组件 -->
    <el-pagination
      background
      :pager-count="5"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
import { ref, watch } from '@vue/composition-api';

export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  components: {
    'el-pagination': Pagination
  },
  setup(props, { emit }) {
    const currentPage = ref(props.page);
    const onCurrentChange = (page) => {
      currentPage.value = page;
    };

    const pageSize = ref(props.size);
    const onSizeChange = (size) => {
      pageSize.value = size;
    };

    let timer = null;
    watch([currentPage, pageSize], ([page, size]) => {
      timer && clearTimeout(timer);

      timer = setTimeout(() => {
        emit('pagChange', { page, size });
      }, 200);
    });

    return {
      currentPage,
      onCurrentChange,
      pageSize,
      onSizeChange
    };
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  width: 100%;
  height: 54px;
  background-color: #fff;
  box-shadow: 0px -4px 6px 0px rgba(204, 204, 204, 0.2);
}
</style>
