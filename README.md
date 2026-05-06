<br />

***

# BaseTableComponents

基于 Vue 2 和 Element UI 封装的高级表格组件，支持分页、自定义列渲染、操作列、多选等常用功能。

## 功能特性

- **开箱即用**：集成 Element UI 的 `el-table` 和 `el-pagination`。
- **灵活配置**：通过 `columns` 数组配置列信息，支持 slot 自定义渲染。
- **内置功能**：支持排序、多选、斑马纹、分页器（可配置）。
- **样式定制**：支持自定义表格样式与类名。

***

## 快速使用

### 1. 引入组件

```javascript
// 或根据你的包结构导入
import { BaseTableComponents,BaseDynamicFormComponents,BaseControlFieldComponents } from 'liudonghan-components';
```

### 2. 在模板中使用

```vue
<template>
  <base-table-components
    :list="tableData"
    :columns="columns"
    :total="total"
    :loading="loading"
    @current-change="handlePageChange"
  >
    <template #bodyCell="{ column, row, index }">
      <template v-if="column === 'status'">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </template>

    <template #operation="{ row, index }">
      <el-button type="text" @click="handleEdit(row)">编辑</el-button>
    </template>
  </base-table-components>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ id: 1, name: '张三', status: 1 }],
      total: 100,
      loading: false,
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'status', label: '状态', slot: true }, // 设置 slot: true 使用 #bodyCell
        { prop: 'operation', label: '操作' } // 设置为 operation 触发 #operation 插槽
      ]
    };
  }
};
</script>
```

***

## API 参考

### Props

| 参数               | 说明                             | 类型      | 默认值       |
| :--------------- | :----------------------------- | :------ | :-------- |
| `list`           | 表格数据                           | Array   | `[]`      |
| `columns`        | 列配置数组                          | Array   | `[]`      |
| `loading`        | 加载状态                           | Boolean | `false`   |
| `total`          | 总条数                            | Number  | `0`       |
| `currentPage`    | 当前页码                           | Number  | `1`       |
| `showPagination` | 是否显示分页                         | Boolean | `true`    |
| `pagination`     | 分页器配置对象                        | Object  | `{...}`   |
| `size`           | 表格尺寸 (large/medium/small/mini) | String  | `'small'` |
| `showSelection`  | 是否显示多选列                        | Boolean | `false`   |
| `showIndex`      | 是否显示索引列                        | Boolean | `false`   |

*(注：该组件兼容大部分 Element UI* *`el-table`* *的 Props，如* *`border`,* *`stripe`,* *`height`* *等。)*

### Columns 配置对象 (columns 数组项)

| 属性           | 说明                     | 类型             |
| :----------- | :--------------------- | :------------- |
| `prop`       | 对应数据字段                 | String         |
| `label`      | 列标题                    | String         |
| `slot`       | 是否使用 `#bodyCell` 自定义内容 | Boolean        |
| `headerSlot` | 是否使用 `#header` 自定义表头   | Boolean        |
| `width`      | 列宽                     | String/Number  |
| `sortable`   | 是否开启排序                 | Boolean/String |

### Slots

| 插槽名         | 说明       | 作用域参数                    |
| :---------- | :------- | :----------------------- |
| `header`    | 自定义表头    | `{ column, row, index }` |
| `bodyCell`  | 自定义单元格内容 | `{ column, row, index }` |
| `operation` | 操作列内容    | `{ row, index }`         |

### Events

| 事件名                | 说明     | 参数                     |
| :----------------- | :----- | :--------------------- |
| `row-click`        | 行点击事件  | `(row, event, column)` |
| `sort-change`      | 排序变化   | `(sort)`               |
| `selection-change` | 多选变化   | `(selection)`          |
| `current-change`   | 页码切换   | `(currentPage)`        |
| `size-change`      | 每页条数切换 | `(pageSize)`           |

***

## 自定义扩展说明

- **表格样式**：默认内置了 `.table_detault` 类，表头背景色为 `#CCE1F9`。你可以通过传入 `tableClass` 属性来覆盖它，或直接覆盖 CSS。
- **分页配置**：可通过 `pagination` prop 传入自定义对象，如：
  ```javascript
  {
    layout: 'total, prev, pager, next',
    pageSize: 20
  }
  ```
  这是为你定制的 `BaseDynamicFormComponents` 使用手册。该组件通过配置化的方式快速生成表单，极大地减少了重复编写 `el-form-item` 的工作量。

***

# BaseDynamicFormComponents

基于 Vue 2 和 Element UI 封装的**动态表单组件**。只需传入一份配置文件（Fields），即可快速生成包含输入框、下拉框、日期、上传、自定义插槽等功能的完整表单。

## 1. 核心功能

- **配置驱动**：通过数组配置生成表单，支持 7+ 种常用表单控件。
- **内置校验**：集成 Element UI 原生校验逻辑。
- **文件上传**：内置简易文件选择与移除处理逻辑。
- **插槽扩展**：支持通过 `type: 'slot'` 实现复杂的自定义交互。
- **自动布局**：支持内联模式、标签对齐方式等配置。

***

## 2. 快速上手

### 基本用法

```vue
<template>
  <base-dynamic-form-components
    :fields="formFields"
    :model="formData"
    @submit="handleSave"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        role: '',
        attachments: []
      },
      formFields: [
        { type: 'input', label: '用户名', key: 'username', placeholder: '请输入内容', rules: [{ required: true, message: '必填' }] },
        { type: 'select', label: '角色', key: 'role', options: [
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' }
          ] 
        },
        { type: 'upload', label: '附件', key: 'attachments' }
      ]
    };
  },
  methods: {
    handleSave(data) {
      console.log('表单提交数据：', data);
    }
  }
};
</script>
```

***

## 3. 配置参数 (Props)

| 参数              | 说明                             | 类型            | 默认值       |
| :-------------- | :----------------------------- | :------------ | :-------- |
| `fields`        | **(必传)** 表单字段配置数组              | Array         | `[]`      |
| `model`         | **(必传)** 表单绑定数据对象              | Object        | `{}`      |
| `rules`         | 全局验证规则（同 el-form）              | Object        | `{}`      |
| `labelWidth`    | 标签宽度                           | String/Number | `'120px'` |
| `labelPosition` | 标签位置 (left/right/top)          | String        | `'left'`  |
| `inline`        | 是否为行内表单                        | Boolean       | `false`   |
| `size`          | 组件尺寸 (large/medium/small/mini) | String        | `'small'` |
| `loading`       | 提交按钮的 loading 状态               | Boolean       | `false`   |
| `showButtons`   | 是否显示底部操作按钮区域                   | Boolean       | `true`    |
| `submitBtnText` | 提交按钮文字                         | String        | `'提交'`    |

***

## 4. 字段配置项 (Fields Item)

每个 field 对象代表一个表单项：

| 属性            | 说明                                                                                 | 适用类型                          |
| :------------ | :--------------------------------------------------------------------------------- | :---------------------------- |
| `type`        | 控件类型: `input`, `select`, `date`, `checkbox`, `radio`, `textarea`, `upload`, `slot` | 所有                            |
| `key`         | 对应 `model` 中的键名                                                                    | 所有                            |
| `label`       | 表单项标签文本                                                                            | 所有                            |
| `placeholder` | 占位提示语                                                                              | input, select, date, textarea |
| `options`     | 选项列表：`[{ label: 'A', value: '1' }]`                                                | select, checkbox, radio       |
| `rules`       | 单个字段的校验规则                                                                          | 所有                            |
| `disabled`    | 是否禁用                                                                               | 所有                            |
| `multiple`    | 是否支持多选                                                                             | select                        |
| `inputType`   | 原生类型 (text, password, number)                                                      | input                         |
| `dateType`    | 日期类型 (date, daterange, datetime 等)                                                 | date                          |
| `rows`        | 文本域行数                                                                              | textarea                      |
| `limit`       | 最大上传数量限制                                                                           | upload                        |

***

## 5. 高级用法

### 使用自定义插槽 (Slot)

当内置控件无法满足需求时，可以使用 `slot`：

```javascript
// fields 配置
{ type: 'slot', label: '自定义项', key: 'mySpecialItem' }
```

```vue
<base-dynamic-form-components :fields="fields" :model="formData">
  <template v-slot:mySpecialItem="{ field, form }">
    <el-color-picker v-model="form[field.key]" />
    <span>请选择颜色</span>
  </template>
</base-dynamic-form-components>
```

***

## 6. 事件 (Events)

| 事件名              | 说明             | 回调参数            |
| :--------------- | :------------- | :-------------- |
| `submit`         | 验证通过并点击提交按钮时触发 | `(formData)`    |
| `validate-error` | 验证失败时触发        | `(errorObject)` |
| `reset`          | 点击重置按钮时触发      | `-`             |

***

## 7. 注意事项

1. **数据响应式**：请确保传入 `model` 的对象在初始化时已经包含了 `fields` 中定义的所有 `key`，否则可能导致双向绑定失效。
2. **JSZip 依赖**：源码中引用了 `jszip`，请确保项目中已安装该依赖，或者检查是否为多余引用（组件内目前主要处理逻辑似乎暂未深度使用 jszip，建议在正式发布包时核实）。
3. **上传地址**：目前 `el-upload` 的 `action` 默认为 `"123"` 且关闭了自动上传，文件将存储在 `model[key]` 的数组中，提交时需自行处理文件流。

这是为你定制的 `BaseControlFieldComponents` 使用手册。该组件通常用于后台管理系统的**列表顶部筛选栏**，集成日期、多个下拉框、搜索框以及常用操作按钮。

***

# BaseControlFieldComponents 封装组件技术文档

`BaseControlFieldComponents` 是一个基于 **Vue 2.x** 与 **Element UI** 构建的业务型高阶组件。它将后台管理系统中极其高频的“筛选查询栏”进行了标准化封装，旨在减少模板代码重复，统一 UI 交互逻辑。

***

## 💡 设计理念

- **配置化 (Configuration Driven)**：通过对象和数组控制 UI 展示，降低 HTML 模板的维护成本。
- **状态隔离**：组件内部维护 `local` 副本，在保证单向数据流原则的同时，优化了实时响应性能。
- **高内聚**：将日期、下拉、输入、按钮四位一体，并支持通过 `Slot` 进行自由扩展。

***

## 📑 属性配置 (Props)

### 1. 基础展示控制

| **参数**                 | <br />     | <br />    | <br />  |
| :--------------------- | :--------- | :-------- | :------ |
| <br />                 | **说明**     | **类型**    | **默认值** |
| `showQueryBtn`         | 是否显示“查询”按钮 | `Boolean` | `true`  |
| `showCreateBtn`        | 是否显示“新增”按钮 | `Boolean` | `false` |
| `showExportBtn`        | 是否显示“导出”按钮 | `Boolean` | `false` |
| `createBtnPlaceholder` | 新增按钮的文本内容  | `String`  | `'新增'`  |

### 2. 日期选择器 (Date Picker)

| **参数**            | <br />                                  | <br />         | <br />         |
| :---------------- | :-------------------------------------- | :------------- | :------------- |
| <br />            | **说明**                                  | **类型**         | **默认值**        |
| `showRangePicker` | 是否启用日期组件                                | `Boolean`      | `true`         |
| `picker`          | Element 日期类型 (date/daterange/datetime等) | `String`       | `'daterange'`  |
| `dateValue`       | **绑定值** (建议配合 `.sync` 使用)               | `Array/String` | `[]`           |
| `valueFormat`     | 提交给后端的时间格式                              | `String`       | `'yyyy-MM-dd'` |

### 3. 动态下拉框 (Select Group)

| **参数**        | <br />   | <br />  | <br />  |
| :------------ | :------- | :------ | :------ |
| <br />        | **说明**   | **类型**  | **默认值** |
| `selectArray` | 下拉框配置项数组 | `Array` | `[]`    |

**`selectArray`** **元素对象字段详解：**

- `value`: 当前选中的值（必填）。
- `options`: 下拉选项数据 `[{ label, value }]`（必填）。
- `placeholder`: 占位提示语。
- `width`: 单个下拉框宽度，默认 `150px`。
- `disabled`: 是否禁用。
- `allowClear`: 是否显示清空按钮，默认 `true`。
- `hide`: 是否隐藏该项（用于权限或条件控制）。

### 4. 搜索输入框 (Search Input)

| **参数**  | <br />  | <br />   | <br />                                                       |
| :------ | :------ | :------- | :----------------------------------------------------------- |
| <br />  | **说明**  | **类型**   | **默认值**                                                      |
| `input` | 输入框配置对象 | `Object` | `{ show: true, placeholder: '', value: '', width: '240px' }` |

***

## ⚡ 事件钩子 (Events)

| **事件名**                    | <br />                | <br />                                                            |
| :------------------------- | :-------------------- | :---------------------------------------------------------------- |
| <br />                     | **参数**                | **描述**                                                            |
| `@query`                   | `(queryData)`         | **核心事件**。点击查询或回车时触发。返回包含 `dateRange`, `selects`, `keyword` 的聚合对象。 |
| `@create`                  | -                     | 点击新增按钮时触发。                                                        |
| `@export`                  | -                     | 点击导出按钮时触发。                                                        |
| `@handleSelectChange`      | `(val, index, array)` | 任何一个下拉框值改变时触发，返回当前值及索引。                                           |
| `@handleRangePickerChange` | `(val)`               | 日期范围变化时的原始回调。                                                     |

***

## 🧩 插槽扩展 (Slots)

组件提供了三个关键插槽，用于处理标准配置无法覆盖的特殊业务：

| **插槽名**  | **位置说明**                             |
| :------- | :----------------------------------- |
| `picker` | 位于日期组件之后。可放置自定义的快捷时间按钮（如“今日”、“近七天”）。 |
| `select` | 位于动态下拉框组之后。适合放置特定的级联选择器或 TreeSelect。 |
| `button` | 位于按钮组最后。用于放置“重置”、“批量删除”或“打印”等按钮。     |

***

## 🚀 最佳实践示例

代码段

```
<template>
  <div class="page-wrapper">
    <base-control-field-components
      :dateValue.sync="searchForm.timeRange"
      :selectArray="selectConfigs"
      :showCreateBtn="true"
      :showExportBtn="true"
      createBtnPlaceholder="新建订单"
      @query="onSearch"
      @create="handleCreate"
    >
      <template v-slot:button>
        <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </template>
    </base-control-field-components>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        timeRange: []
      },
      selectConfigs: [
        {
          value: '',
          placeholder: '订单状态',
          options: [{ label: '已支付', value: '1' }, { label: '待发货', value: '2' }]
        },
        {
          value: '',
          placeholder: '支付方式',
          width: '120px',
          options: [{ label: '微信', value: 'wechat' }, { label: '支付宝', value: 'alipay' }]
        }
      ]
    }
  },
  methods: {
    onSearch(data) {
      console.log('聚合参数:', data);
      // 调用 API: fetchList(data)
    },
    handleCreate() {
      this.$router.push('/order/create');
    },
    resetForm() {
      // 外部修改源数据，组件内部 watch 会同步重置视图
      this.searchForm.timeRange = [];
      this.selectConfigs.forEach(item => item.value = '');
    }
  }
}
</script>

```

***

## 🛠 技术细节说明

1. **数据流向**：组件内部通过 `JSON.parse(JSON.stringify())` 对 `selectArray` 进行深拷贝，避免了子组件直接修改父组件引用类型数据导致的警告。
2. **同步机制**：
   - 通过 `watch` 监听外部 `selectArray` 和 `input.value`。
   - 当外部数据发生重置或后端异步更新选项时，组件会自动同步视图状态。
3. **交互优化**：
   - 输入框支持 `keyup.enter.native`，符合用户搜索习惯。
   - `control-row` 采用 `flex-wrap: wrap`，在小屏幕下筛选条件会自动换行，不会撑破容器。
4. **样式定制**：
   - 通过 `.filter-item` 统一管理外边距。
   - 使用了 `>>>` 深度作用选择器处理 `button-group` 的间距问题。

