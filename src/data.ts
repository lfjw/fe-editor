/**
 * schema 数据模型
 */

export interface SchemaDataComponent {
  top: number,
  left: number,
  zIndex: number,
  key: string,
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
