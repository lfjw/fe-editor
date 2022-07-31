<template>
  <!-- v-model 语法糖 :modelValue='state' @update:modelValue='xx' -->
  <Editor v-model="state"></Editor>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import Editor from './packages/editor';
import data from './data';

import registerConfig from './utils/editor-config';

export default defineComponent({
  name: 'App',
  components: {
    Editor,
  },
  setup() {
    const state = ref(data);

    // 全局提供 config
    provide('config', registerConfig);

    return {
      state,
    };
  },
});
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
