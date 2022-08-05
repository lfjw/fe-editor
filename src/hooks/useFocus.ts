/**
 * 选中区域的焦点事件
 */

import { SchemaData, SchemaDataComponent } from '@/data';
import { computed } from 'vue';

type useFocusData = { value: SchemaData | null | unknown; };
type useFocusCallback = (arg0: MouseEvent) => void

export default (data: useFocusData, callback: useFocusCallback) => {
  const dataValue = data.value as SchemaData;

  // 清空其他组件焦点
  const clearBlockFocus = () => {
    dataValue.blocks.forEach((res) => {
      const item = res;
      item.focus = false;
    });
  };

  // 点击容器让选中的失去焦点
  const containerMousedown = () => {
    clearBlockFocus();
  };

  // 那些组件选中 那些组件没有选中
  const focusData = computed(() => {
    const focus: SchemaDataComponent[] = [];
    const unFocus: SchemaDataComponent[] = [];

    dataValue.blocks.forEach((res) => {
      const block = res;
      const arr = block.focus ? focus : unFocus;
      arr.push(block);
    });

    return {
      focus,
      unFocus,
    };
  });

  const blockMouseDown = (event: MouseEvent, component: SchemaDataComponent) => {
    console.log(event, component);
    event.preventDefault();
    event.stopPropagation();

    const block = component;

    if (event.shiftKey) {
      // 1. 按住 shift
      block.focus = !block.focus;
    } else if (!block.focus) {
      // 2 否则清空其他组件
      clearBlockFocus();
      block.focus = true;
    } else {
      // 3 当前选中 给清空
      block.focus = false;
    }

    callback(event);
  };

  return {
    clearBlockFocus,
    containerMousedown,
    focusData,
    blockMouseDown,
  };
};
