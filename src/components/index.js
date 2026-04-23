import BaseTableComponents from './BaseTableComponents.vue';
import BaseControlFieldComponents from './BaseControlFieldComponents.vue';
import BaseDynamicFormComponents from './BaseDynamicFormComponents.vue';

const components = [BaseControlFieldComponents, BaseDynamicFormComponents, BaseTableComponents];

// 1. 定义插件对象
const install = (app) => { // Vue 3 环境建议写 app
  components.forEach(component => {
    app.component(component.name, component);
  });
};

// 2. 导出具名组件（支持按需引入）
export {
  BaseTableComponents,
  BaseControlFieldComponents,
  BaseDynamicFormComponents
};

// 3. 默认导出插件（支持 Vue.use）
export default { install };