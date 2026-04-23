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
import BaseTableComponents from 'liudonghan-components'; 
// 或根据你的包结构导入
import { BaseTableComponents } from 'liudonghan-components';
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