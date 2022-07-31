/**
 * 列表区显示所有的组件
 *
 * key 对应组件映射关系
 *
 */

import type { Component } from 'vue';
import { Button as VanButton, Image as VanImage } from 'vant';

export interface RegisterType {
  label: string,
  preview: () => Component | string,
  render: () => Component | string,
  key: string,
}

export interface RegisterTypeReturn {
  componentList: RegisterType[];
  componentMap: Record<string, RegisterType>;
  register(component: RegisterType): void;
}

function createEditorConfig() {
  // 组件列表
  const componentList: RegisterType[] = [];
  // 映射关系
  const componentMap: Record<string, RegisterType> = {};

  return {
    componentList,
    componentMap,
    register(component: RegisterType) {
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
}

const registerConfig = createEditorConfig();

registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text',
});

registerConfig.register({
  label: '按钮',
  preview: () => <VanButton>按钮</VanButton>,
  render: () => <VanButton>按钮</VanButton>,
  key: 'button',
});

registerConfig.register({
  label: '图片',
  preview: () => <VanImage></VanImage>,
  render: () => <VanImage></VanImage>,
  key: 'img',
});

// TODO 扩展组件

export default registerConfig;
