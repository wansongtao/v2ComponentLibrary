<template>
  <div class="file_selector">
    <input
      ref="fileEle"
      type="file"
      name="files"
      :multiple="multiple"
      :accept="accept"
      class="file_input"
      @change="onSelectFile"
    />
    <div
      class="file_btn"
      :class="disabled ? 'file_btn--stop' : ''"
      @click="onOpenFileDialog"
      v-if="!drag"
    >
      <slot :disabled="disabled"> 选择文件 </slot>
    </div>
    <div
      class="file_btn"
      :class="disabled ? 'file_btn--stop' : ''"
      @click="onOpenFileDialog"
      @dragenter.prevent
      @dragover.prevent
      @drop.prevent="onDragFile"
      v-if="drag"
    >
      <slot :disabled="disabled"> 选择文件 </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/composition-api';

export default {
  props: {
    /**
     * @description 是否允许选择多个文件
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * @description 唯一文件类型说明符，请参考w3c
     */
    accept: String,
    /**
     * @description 最大允许选择文件个数
     */
    limit: {
      type: Number,
      validator(value) {
        return value > 0 && Number.isInteger(value);
      }
    },
    /**
     * @description 是否启用拖拽获取文件信息
     */
    drag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const disabled = ref(false);
    const fileEle = ref(null);
    const onOpenFileDialog = () => {
      if (!fileEle.value) {
        return;
      }
      if (disabled.value) {
        return;
      }
      fileEle.value.click();
    };

    const files = ref([]);
    const saveFileInfo = (checkedFiles) => {
      if (!checkedFiles.length) {
        return;
      }
      // 单选
      if (!props.multiple) {
        if (files.value.length >= 1) {
          return;
        }
        disabled.value = true;
        files.value = checkedFiles;
        emit('filechange', files.value);
        return;
      }
      // 多选未限制个数
      if (props.multiple && !props.limit) {
        files.value.push(...checkedFiles);
        emit('filechange', files.value);
        return;
      }
      // 多选，限制了个数
      if (files.value.length >= props.limit) {
        return;
      }
      const total = files.value.length + checkedFiles.length;
      if (total >= props.limit) {
        disabled.value = true;
      }
      const all = [...files.value, ...checkedFiles];
      all.splice(props.limit);
      files.value = all;
      emit('filechange', files.value);
      return;
    };

    const deleteFile = (idx) => {
      if (typeof idx !== 'number') {
        return;
      }
      files.value.splice(idx, 0);
      if (disabled.value) {
        disabled.value = false;
      }
    };

    const clearFiles = () => {
      disabled.value = false;
      files.value = [];
    };

    const onSelectFile = (e) => {
      const checkedFiles = e.target.files;
      saveFileInfo(checkedFiles);
    };

    const onDragFile = (e) => {
      const checkedFiles = e.dataTransfer.files;
      saveFileInfo(checkedFiles);
    };

    return {
      disabled,
      fileEle,
      onOpenFileDialog,
      onSelectFile,
      onDragFile,
      deleteFile,
      clearFiles
    };
  }
};
</script>

<style lang="scss" scoped>
.file_input {
	display: none;
}
.file_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 100px;
	height: 100px;
	border: 1px solid #eee;
	cursor: pointer;
}
.file_btn--stop:hover {
	cursor: not-allowed;
}
</style>
