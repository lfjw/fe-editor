/**
 * 拖拽组件到目标区域
 */

import { SchemaData } from '@/data';
import { RegisterType } from '@/utils/editor-config';

export default (containerRef: {
  value: HTMLElement | null | unknown;
}, data: {
  value: SchemaData | null | unknown;
}) => {
  // 当前拖拽的组件
  let currentComponent: RegisterType | null = null;

  const dragenter = (e: DragEvent) => {
    if (e.dataTransfer) {
      console.log('dragenter move');
      e.dataTransfer.dropEffect = 'move';
    }
  };
  const dragover = (e: DragEvent) => {
    // console.log('dragover');
    e.preventDefault();
  };
  const dragleave = (e: DragEvent) => {
    if (e.dataTransfer) {
      console.log('dragleave none');
      e.dataTransfer.dropEffect = 'none';
    }
  };
  const drop = (e: DragEvent) => {
    const { blocks } = (data.value as SchemaData); // 内部已经渲染的组件
    // eslint-disable-next-line no-param-reassign
    data.value = {
      ...data.value as SchemaData,
      blocks: [
        ...blocks,
        {
          top: e.offsetY, // 事件源就是这个区域
          left: e.offsetX,
          zIndex: 1,
          key: (currentComponent && currentComponent.key) as string,
          alignCenter: true, // 松手的时候局中 在渲染结束后根据此变量让其居中
        },
      ],
    };

    currentComponent = null;
  };

  // 开始拖拽
  const dragstart = (event: DragEvent, component: RegisterType) => {
    // 1 dragenter 进入元素中 添加一个移动标识
    // 2 dragover 在目标元素经过，必须阻止默认行为，否则不能触发drop
    // 3 dragleave 离开元素的时候 需要 增加一个禁用标识
    // 4 drop 松手的时候 根据拖拽的组件 添加一个组件
    const dom = containerRef.value as HTMLElement;
    if (dom) {
      dom.addEventListener('dragenter', dragenter);
      dom.addEventListener('dragover', dragover);
      dom.addEventListener('dragleave', dragleave);
      dom.addEventListener('drop', drop);
    }
    currentComponent = component;
  };

  // 结束拖拽
  const dragend = () => {
    const dom = containerRef.value as HTMLElement;
    if (dom) {
      dom.removeEventListener('dragenter', dragenter);
      dom.removeEventListener('dragover', dragover);
      dom.removeEventListener('dragleave', dragleave);
      dom.removeEventListener('drop', drop);
    }
  };

  return {
    dragstart,
    dragend,
  };
};
