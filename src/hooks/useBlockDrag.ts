/**
 * 按住并拖拽画布内容器
 */

import { SchemaDataComponent } from '@/data';
import { ComputedRef } from 'vue';

export default (focusData: ComputedRef<{
  focus: SchemaDataComponent[];
  unFocus: SchemaDataComponent[];
}>) => {
  // 按下组件移动
  // 记住按住的坐标
  // 然后移动的坐标进行减法
  type StartPos = { top: number, left: number }[]
  let dragState = {
    startX: 0,
    startY: 0,
    startPos: [] as StartPos,
  };

  const mousemove = (event: MouseEvent) => {
    const { clientX: moveX, clientY: moveY } = event;
    // 目标值 x y
    const x = moveX - dragState.startX;
    const y = moveY - dragState.startY;

    focusData.value.focus.forEach((item, index) => {
      const block = item;
      block.top = dragState.startPos[index].top + y;
      block.left = dragState.startPos[index].left + x;
    });
  };
  const mouseup = () => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };
  const mousedown = (event: MouseEvent) => {
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      // 每选中一次就增加一次
      startPos: focusData.value.focus.map((item) => {
        const { left, top } = item;
        return { left, top };
      }),
    };
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };

  return {
    mousemove,
    mouseup,
    mousedown,
  };
};
