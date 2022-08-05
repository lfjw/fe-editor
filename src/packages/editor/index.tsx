import {
  defineComponent, computed, inject, ref,
} from 'vue';
import './index.scss';

import { RegisterTypeReturn } from '@/utils/editor-config';
import { cloneDeep } from 'lodash';
import useDragComponent from '@/hooks/useDragComponent';
import useFocus from '@/hooks/useFocus';
import useBlockDrag from '@/hooks/useBlockDrag';
import EditorBlock from '../editor-block';
import { SchemaData } from '../../data';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        ctx.emit('update:modelValue', cloneDeep(newVal));
      },
    });

    const containerStyle = computed(() => ({
      width: `${(data.value as SchemaData).container.width}px`,
      height: `${(data.value as SchemaData).container.height}px`,
    }));

    const config = inject<RegisterTypeReturn>('config');

    // 目标容器
    const containerRef = ref<unknown>(null);

    // 1 实现组件拖拽到目标区域
    const { dragstart, dragend } = useDragComponent(containerRef, data);

    // 2 实现获取焦点
    const { containerMousedown, blockMouseDown, focusData } = useFocus(data, (event) => {
      // eslint-disable-next-line no-use-before-define
      mousedown(event);
    });

    // 3 实现拖拽多个元素功能
    const { mousedown } = useBlockDrag(focusData);

    return () => (
      <div class="editor">
        <div class="editor-left">
          {/* 实现h5拖拽 draggable */}
          {config?.componentList.map((component) => (
            <div
              class='editor-left-item'
              draggable
              onDragstart={(e) => dragstart(e, component)}
              onDragend={dragend}
            >
              <span>{component.label}</span>
              <div>{component.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor-top">菜单栏</div>
        <div class="editor-right">属性控制栏目 </div>
        <div class="editor-container">
          {/* 滚动区域 */}
          <div class="editor-container-canvas">
            {/* 产生内容区 */}
            <div
              class="editor-container-canvas_container"
              style={containerStyle.value}
              ref={containerRef}
              onMousedown={containerMousedown}>
              {
                (data.value as SchemaData).blocks.map((item) => (
                  <div
                    onMousedown={(e) => blockMouseDown(e, item)}>
                    <EditorBlock
                      class={item.focus ? 'editor-block-focus' : ''}
                      block={item}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div >
    );
  },
});
