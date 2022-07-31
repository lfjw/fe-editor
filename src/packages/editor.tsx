import { defineComponent, computed, inject } from 'vue';
import './editor.scss';

import { RegisterTypeReturn } from '@/utils/editor-config';
import EditorBlock from './editor-block';
import { SchemaData } from '../data';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        console.log(val);
      },
    });

    const containerStyle = computed(() => ({
      width: `${(data.value as SchemaData).container.width}px`,
      height: `${(data.value as SchemaData).container.height}px`,
    }));

    const config = inject<RegisterTypeReturn>('config');

    return () => (
      <div class="editor">
        <div class="editor-left">
          {config?.componentList.map((component) => (<div class='editor-left-item'><span>{component.label}</span><div>{component.preview()}</div></div>))}
        </div>
        <div class="editor-top">菜单栏</div>
        <div class="editor-right">属性控制栏目 </div>
        <div class="editor-container">
          {/* 滚动区域 */}
          <div class="editor-container-canvas">
            {/* 产生内容区 */}
            <div class="editor-container-canvas_container" style={containerStyle.value}>
              {
                (data.value as SchemaData).blocks.map((item) => <EditorBlock block={item} />)
              }
            </div>
          </div>
        </div>
      </div >
    );
  },
});
