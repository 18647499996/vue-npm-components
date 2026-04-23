<template>
  <div class="base-table-container">
    <el-table :data="list" :highlight-current-row="highlightCurrentRow" v-loading="loading" :style="tableStyle"
      :class="tableClass" :size="size" :row-class-name="rowClassName" :row-key="rowKey" :stripe="stripe"
      :border="border" :max-height="maxHeight" :height="height" :default-sort="defaultSort"
      :header-row-class-name="headerRowClassName" :header-cell-class-name="headerCellClassName"
      :cell-class-name="cellClassName" :empty-text="emptyText" @row-click="handleRowClick"
      @sort-change="handleSortChange" @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column v-if="showSelection" type="selection" :width="selectionWidth"
        :reserve-selection="reserveSelection" />

      <!-- 索引列 -->
      <el-table-column v-if="showIndex" type="index" :width="indexWidth" :label="indexLabel" />

      <!-- 自定义列 -->
      <template v-for="column in columns">
        <el-table-column v-if="column.prop !== 'operation'" :prop="column.prop" :label="column.label"
          :width="column.width" :min-width="column.minWidth" :fixed="column.fixed" :sortable="column.sortable"
          :formatter="column.formatter" :show-overflow-tooltip="column.showOverflowTooltip" :align="column.align"
          :header-align="column.headerAlign">

          <!-- 列头（ 标题 ） -->
          <template #header="scope">
            <template v-if="column.headerSlot">
              <slot name="header" :column="scope.column.property" :row="scope" :index="scope.$index"></slot>
            </template>
            <template v-else>
              {{ column.label }}
            </template>
          </template>

          <!-- 内容（ 数据源 ） -->
          <template #default="scope">
            <template v-if="column.slot">
              <slot name="bodyCell" :column="scope.column.property" :row="scope.row" :index="scope.$index"></slot>
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="column.prop === 'operation'" :label="column.label || '操作'" :width="column.width"
          :fixed="column.fixed" :align="column.align || 'center'" :header-align="column.headerAlign || 'center'">
          <template #default="scope">
            <slot name="operation" :row="scope.row" :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <div v-if="showPagination" class="pagination-container">
      <el-pagination :background="pagination.background" :layout="pagination.layout" :page-size="pagination.pageSize"
        :current-page="currentPage" :total="total" :page-sizes="pagination.pageSizes"
        :pager-count="pagination.pagerCount" :small="pagination.small"
        :hide-on-single-page="pagination.hideOnSinglePage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTableComponents',
  props: {
    // 表格数据
    list: {
      type: Array,
      default: () => []
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 表格列配置
    columns: {
      type: Array,
      default: () => []
    },
    // 表格尺寸
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
    },
    // 是否显示分页
    showPagination: {
      type: Boolean,
      default: true
    },
    // 分页配置
    pagination: {
      type: Object,
      default: () => ({
        background: true,
        layout: 'total, prev, pager, next',
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        pagerCount: 5,
        small: false,
        hideOnSinglePage: false
      })
    },
    // 是否高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 行样式类名
    rowClassName: {
      type: [String, Function],
      default: ''
    },
    // 行键
    rowKey: {
      type: [String, Function],
      default: ''
    },
    // 是否显示斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    // 表格高度
    height: {
      type: [String, Number],
      default: undefined
    },
    // 默认排序
    defaultSort: {
      type: Object,
      default: () => ({})
    },
    // 表头行样式类名
    headerRowClassName: {
      type: [String, Function],
      default: ''
    },
    // 表头单元格样式类名
    headerCellClassName: {
      type: [String, Function],
      default: ''
    },
    // 单元格样式类名
    cellClassName: {
      type: [String, Function],
      default: ''
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 表格样式
    tableStyle: {
      type: Object,
      default: () => ({ width: '100%' })
    },
    // 表格类名
    tableClass: {
      type: String,
      default: 'table_detault'
    },
    // 是否显示多选
    showSelection: {
      type: Boolean,
      default: false
    },
    // 多选列宽度
    selectionWidth: {
      type: [String, Number],
      default: 55
    },
    // 是否保留多选状态
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 是否显示索引
    showIndex: {
      type: Boolean,
      default: false
    },
    // 索引列宽度
    indexWidth: {
      type: [String, Number],
      default: 60
    },
    // 索引列标签
    indexLabel: {
      type: String,
      default: '序号'
    }
  },
  data() {
    return {}
  },
  methods: {
    // 处理行点击
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    // 处理排序变化
    handleSortChange(sort) {
      this.$emit('sort-change', sort)
    },
    // 处理选择变化
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    // 处理页码变化
    handleCurrentChange(currentPage) {
      this.$emit('current-change', currentPage)
    },
    // 处理每页条数变化
    handleSizeChange(pageSize) {
      this.$emit('size-change', pageSize)
    },
    // 处理上一页点击
    handlePrevClick(page) {
      this.$emit('prev-click', page)
    },
    // 处理下一页点击
    handleNextClick(page) {
      this.$emit('next-click', page)
    }
  }
}
</script>

<style scoped>
.base-table-container {
  width: 100%;
}

.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.table_detault {
  th {
    background-color: #CCE1F9 !important;
    color: #505050;
  }
}
</style>