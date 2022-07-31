/**
 * 渲染组件
 */
import { computed, defineComponent, inject } from 'vue';
import { SchemaDataComponent } from '../data';
import './editor-block.scss';
import { RegisterTypeReturn } from '../utils/editor-config';

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

    return () => <div class='editor-block' style={blockStyle.value}>{
      RenderComponent
    }</div>;
  },
});
