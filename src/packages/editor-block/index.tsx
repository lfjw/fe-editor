/**
 * 渲染组件
 */
import {
  computed, defineComponent, inject, onMounted, ref,
} from 'vue';
import { SchemaDataComponent } from '../../data';
import './index.scss';
import { RegisterTypeReturn } from '../../utils/editor-config';

export default defineComponent({
  props: {
    block: {
      type: Object,
    },
  },
  setup(props) {
    const block = props.block as SchemaDataComponent;

    const blockStyle = computed(() => ({
      top: `${block.top}px`,
      left: `${block.left}px`,
      zIndex: block.zIndex,
    }));
    const config = inject<RegisterTypeReturn>('config');

    const component = config?.componentMap[block.key];
    const RenderComponent = component?.render();

    // 拖拽后，让组件居中
    const blockRef = ref<unknown>(null);
    onMounted(() => {
      const { offsetWidth, offsetHeight } = (blockRef.value as HTMLElement);
      if (block && block.alignCenter) {
        // 拖拽松手的时候才渲染
        // 其他默认渲染到页面上的内容不需要居中
        block.left -= offsetWidth / 2;
        block.top -= offsetHeight / 2;
        block.alignCenter = false;
      }
    });

    return () => <div class='editor-block' style={blockStyle.value} ref={blockRef}>
      {
        RenderComponent
      }
    </div>;
  },
});
