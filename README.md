这是一个为你定制的 `README.md` 文档。它采用了标准开源组件的文档格式，涵盖了安装、快速上手、Props API、Slots 和 Events，非常清晰易读。

---

# BaseTableComponents

基于 Vue 2 和 Element UI 封装的高级表格组件，支持分页、自定义列渲染、操作列、多选等常用功能。

## 功能特性
* **开箱即用**：集成 Element UI 的 `el-table` 和 `el-pagination`。
* **灵活配置**：通过 `columns` 数组配置列信息，支持 slot 自定义渲染。
* **内置功能**：支持排序、多选、斑马纹、分页器（可配置）。
* **样式定制**：支持自定义表格样式与类名。

---

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
    <template #bodyCell="{ row, column }">
      <template v-if="column === 'status'">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </template>

    <template #operation="{ row }">
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

---

## API 参考

### Props

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `list` | 表格数据 | Array | `[]` |
| `columns` | 列配置数组 | Array | `[]` |
| `loading` | 加载状态 | Boolean | `false` |
| `total` | 总条数 | Number | `0` |
| `currentPage` | 当前页码 | Number | `1` |
| `showPagination` | 是否显示分页 | Boolean | `true` |
| `pagination` | 分页器配置对象 | Object | `{...}` |
| `size` | 表格尺寸 (large/medium/small/mini) | String | `'small'` |
| `showSelection` | 是否显示多选列 | Boolean | `false` |
| `showIndex` | 是否显示索引列 | Boolean | `false` |

*(注：该组件兼容大部分 Element UI `el-table` 的 Props，如 `border`, `stripe`, `height` 等。)*

### Columns 配置对象 (columns 数组项)

| 属性 | 说明 | 类型 |
| :--- | :--- | :--- |
| `prop` | 对应数据字段 | String |
| `label` | 列标题 | String |
| `slot` | 是否使用 `#bodyCell` 自定义内容 | Boolean |
| `headerSlot` | 是否使用 `#header` 自定义表头 | Boolean |
| `width` | 列宽 | String/Number |
| `sortable` | 是否开启排序 | Boolean/String |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| :--- | :--- | :--- |
| `header` | 自定义表头 | `{ column, row, index }` |
| `bodyCell` | 自定义单元格内容 | `{ column, row, index }` |
| `operation` | 操作列内容 | `{ row, index }` |

### Events

| 事件名 | 说明 | 参数 |
| :--- | :--- | :--- |
| `row-click` | 行点击事件 | `(row, event, column)` |
| `sort-change` | 排序变化 | `(sort)` |
| `selection-change` | 多选变化 | `(selection)` |
| `current-change` | 页码切换 | `(currentPage)` |
| `size-change` | 每页条数切换 | `(pageSize)` |

---

## 自定义扩展说明

* **表格样式**：默认内置了 `.table_detault` 类，表头背景色为 `#CCE1F9`。你可以通过传入 `tableClass` 属性来覆盖它，或直接覆盖 CSS。
* **分页配置**：可通过 `pagination` prop 传入自定义对象，如：
  ```javascript
  {
    layout: 'total, prev, pager, next',
    pageSize: 20
  }
  ```


  这是为你定制的 `BaseDynamicFormComponents` 使用手册。该组件通过配置化的方式快速生成表单，极大地减少了重复编写 `el-form-item` 的工作量。

---

# BaseDynamicFormComponents

基于 Vue 2 和 Element UI 封装的**动态表单组件**。只需传入一份配置文件（Fields），即可快速生成包含输入框、下拉框、日期、上传、自定义插槽等功能的完整表单。

## 1. 核心功能
* **配置驱动**：通过数组配置生成表单，支持 7+ 种常用表单控件。
* **内置校验**：集成 Element UI 原生校验逻辑。
* **文件上传**：内置简易文件选择与移除处理逻辑。
* **插槽扩展**：支持通过 `type: 'slot'` 实现复杂的自定义交互。
* **自动布局**：支持内联模式、标签对齐方式等配置。

---

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

---

## 3. 配置参数 (Props)

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `fields` | **(必传)** 表单字段配置数组 | Array | `[]` |
| `model` | **(必传)** 表单绑定数据对象 | Object | `{}` |
| `rules` | 全局验证规则（同 el-form） | Object | `{}` |
| `labelWidth` | 标签宽度 | String/Number | `'120px'` |
| `labelPosition`| 标签位置 (left/right/top) | String | `'left'` |
| `inline` | 是否为行内表单 | Boolean | `false` |
| `size` | 组件尺寸 (large/medium/small/mini) | String | `'small'` |
| `loading` | 提交按钮的 loading 状态 | Boolean | `false` |
| `showButtons` | 是否显示底部操作按钮区域 | Boolean | `true` |
| `submitBtnText`| 提交按钮文字 | String | `'提交'` |

---

## 4. 字段配置项 (Fields Item)

每个 field 对象代表一个表单项：

| 属性 | 说明 | 适用类型 |
| :--- | :--- | :--- |
| `type` | 控件类型: `input`, `select`, `date`, `checkbox`, `radio`, `textarea`, `upload`, `slot` | 所有 |
| `key` | 对应 `model` 中的键名 | 所有 |
| `label` | 表单项标签文本 | 所有 |
| `placeholder`| 占位提示语 | input, select, date, textarea |
| `options` | 选项列表：`[{ label: 'A', value: '1' }]` | select, checkbox, radio |
| `rules` | 单个字段的校验规则 | 所有 |
| `disabled` | 是否禁用 | 所有 |
| `multiple` | 是否支持多选 | select |
| `inputType` | 原生类型 (text, password, number) | input |
| `dateType` | 日期类型 (date, daterange, datetime 等) | date |
| `rows` | 文本域行数 | textarea |
| `limit` | 最大上传数量限制 | upload |

---

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

---

## 6. 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| `submit` | 验证通过并点击提交按钮时触发 | `(formData)` |
| `validate-error`| 验证失败时触发 | `(errorObject)` |
| `reset` | 点击重置按钮时触发 | `-` |

---

## 7. 注意事项
1. **数据响应式**：请确保传入 `model` 的对象在初始化时已经包含了 `fields` 中定义的所有 `key`，否则可能导致双向绑定失效。
2. **JSZip 依赖**：源码中引用了 `jszip`，请确保项目中已安装该依赖，或者检查是否为多余引用（组件内目前主要处理逻辑似乎暂未深度使用 jszip，建议在正式发布包时核实）。
3. **上传地址**：目前 `el-upload` 的 `action` 默认为 `"123"` 且关闭了自动上传，文件将存储在 `model[key]` 的数组中，提交时需自行处理文件流。


这是为你定制的 `BaseControlFieldComponents` 使用手册。该组件通常用于后台管理系统的**列表顶部筛选栏**，集成日期、多个下拉框、搜索框以及常用操作按钮。

---

# BaseControlFieldComponents

基于 Vue 2 和 Element UI 封装的**列表控制栏组件**。主要用于表格上方的搜索条件组合、按钮操作区，支持高度自定义的筛选配置。

## 1. 核心功能
* **日期范围选择**：一键开启/关闭 `daterange` 筛选。
* **动态下拉组**：支持传入数组自动生成多个 `el-select`。
* **搜索输入框**：内置防抖样式的查询输入。
* **操作按钮组**：内置查询、新增、导出三个常用按钮。
* **自定义扩展**：末尾预留插槽，支持插入自定义按钮或组件。

---

## 2. 快速上手

### 基本用法

```vue
<template>
  <base-control-field-components
    :selectArray="selectConfigs"
    :input="searchConfig"
    @onClickListenerQuery="fetchData"
    @onClickListenerCreate="openModal"
  >
    <template #last>
      <el-button type="success" @click="handleBatchAudit">批量审核</el-button>
    </template>
  </base-control-field-components>
</template>

<script>
export default {
  data() {
    return {
      // 下拉框配置
      selectConfigs: [
        { 
          label: '状态', 
          value: '', 
          placeholder: '请选择状态', 
          opstion: [{label: '启用', value: 1}, {label: '禁用', value: 0}],
          width: '150px',
          hide: true,
          allowClear: true 
        }
      ],
      // 搜索框配置
      searchConfig: {
        show: true,
        placeholder: '请输入关键字查询',
        value: '',
        width: '200px'
      }
    };
  },
  methods: {
    fetchData() { console.log('触发查询'); },
    openModal() { console.log('触发新增'); }
  }
};
</script>
```

---

## 3. 配置参数 (Props)

### 基础配置
| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `showRangePicker`| 是否显示日期范围选择器 | Boolean | `true` |
| `picker` | 日期类型（如 `daterange`, `monthrange`） | String | `'daterange'` |
| `showQueryBtn` | 是否显示“查询”按钮 | Boolean | `true` |
| `showCreateBtn` | 是否显示“新增/创建”按钮 | Boolean | `false` |
| `showExportBtn` | 是否显示“导出”按钮 | Boolean | `false` |
| `createBtnPlaceholder` | 新增按钮的文字内容 | String | `'新增'` |

### 复杂对象配置
#### `selectArray` (Array)
用于生成多个下拉框，数组每一项包含：
* `value`: 绑定值
* `placeholder`: 占位符
* `width`: 宽度（需带单位，如 `'120px'`）
* `opstion`: 选项数组 `[{label: '', value: ''}]`
* `hide`: 是否显示（注意：源码中使用 `v-show="item.hide"`，请确保设为 `true`）
* `allowClear`: 是否允许清空
* `disabled`: 是否禁用

#### `input` (Object)
| 属性 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `show` | 是否显示输入框 | `true` |
| `placeholder`| 占位符 | `''` |
| `value` | 绑定值 | `undefined` |
| `width` | 宽度 | `'300px'` |

---

## 4. 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| `handleRangePickerChange` | 日期改变时触发 | `(value, dateString)` |
| `handleSelectChange` | 任意一个下拉框改变时触发 | `(value, index)` |
| `handleInputChange` | 输入框内容改变时触发 | `(event)` |
| `onClickListenerQuery` | 点击查询按钮 | `-` |
| `onClickListenerCreate` | 点击新增按钮 | `-` |
| `onClickListenerExport` | 点击导出按钮 | `-` |

---

## 5. 插槽 (Slots)

| 插槽名 | 说明 |
| :--- | :--- |
| `last` | 位于控制栏最右侧的区域，通常用于放置额外的操作按钮。 |

---

## 6. 使用注意
1. **下拉框显示**：请务必检查 `selectArray` 中每一项的 `hide` 属性是否为 `true`，否则下拉框将不会渲染。
2. **数据同步**：由于 Vue 2 的 `v-model` 在 props 上是单向的，建议在监听 `handleSelectChange` 或 `handleInputChange` 时，同步更新父组件的数据源。
3. **Element UI 依赖**：该组件强制依赖 `el-row`, `el-select`, `el-input`, `el-date-picker`, `el-button`。