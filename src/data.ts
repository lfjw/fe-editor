/**
 * schema 数据模型
 */

export interface SchemaDataComponent {
  top: number,
  left: number,
  /**
   * 索引
   */
  zIndex: number,
  /**
   * 组件标识
   */
  key: string,
  /**
   * 从组件拖拽时是否需要居中
   */
  alignCenter: boolean,
  /**
   * 当前组件是否选中
   */
  focus: boolean,
}

export interface SchemaData {
  container: {
    width: number,
    height: number
  },
  blocks: SchemaDataComponent[]
}

export default {
  container: {
    width: 375,
    height: 667,
  },
  blocks: [
    {
      top: 0,
      left: 100,
      zIndex: 1,
      key: 'text',
    },
    {
      top: 100,
      left: 100,
      zIndex: 1,
      key: 'button',
    },

    {
      top: 0,
      left: 100,
      zIndex: 0,
      key: 'img',
    },
  ],
};
