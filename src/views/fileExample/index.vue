<template>
  <div class="file_example">
    <FileSelector
      ref="fileCom"
      accept="image/*"
      :multiple="false"
      :drag="true"
      @filechange="onChangeFile"
    />
  </div>
</template>

<script>
import FileSelector from '@/components/FileSelector/index.vue';

export default {
  name: 'fileExample',
  components: {
    FileSelector
  },
  data() {
    return {
      fileCom: null
    }
  },
  methods: {
    onChangeFile(files) {
      console.log(files);
      console.log(this.$refs.fileCom);
    }
  }
};
</script>

<style lang="scss" scoped></style>
