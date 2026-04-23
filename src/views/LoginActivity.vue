<template>
  <div class="app-container">
    <base-table-components :list="tableData" :loading="loading" :columns="columns" :current-page="currentPage"
      :total="total" :pagination="pagination" :show-selection="true" :show-index="true" border
      @current-change="handleCurrentChange" @size-change="handleSizeChange" @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <!-- 自定义列插槽 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'warning'">
          {{ row.status === 'active' ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 操作列插槽 -->
      <template #operation="{ row, index }">
        <el-button size="small" type="primary" @click="editRow(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
      </template>
    </base-table-components>
  </div>
</template>

<script>
import BaseTableComponents from '@/components/BaseTableComponents.vue'

export default {
  components: {
    BaseTableComponents
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      total: 100,
      tableData: [
        { id: 1, name: '张三', age: 25, status: 'active', createTime: '2026-04-01' },
        { id: 2, name: '李四', age: 30, status: 'inactive', createTime: '2026-04-02' },
        { id: 3, name: '王五', age: 28, status: 'active', createTime: '2026-04-03' }
      ],
      columns: [
        { prop: 'name', label: '姓名', width: '120' },
        { prop: 'age', label: '年龄', width: '80', sortable: true },
        { prop: 'status', label: '状态', width: '100', slot: 'status' },
        { prop: 'createTime', label: '创建时间', width: '180', sortable: true },
        { type: 'operation', label: '操作', width: '150', fixed: 'right' }
      ],
      pagination: {
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, prev, pager, next, sizes'
      }
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // 重新获取数据
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.currentPage = 1
      // 重新获取数据
      this.fetchData()
    },
    handleSelectionChange(selection) {
      console.log('选中的行:', selection)
    },
    handleRowClick(row) {
      console.log('点击的行:', row)
    },
    editRow(row) {
      console.log('编辑行:', row)
    },
    deleteRow(row) {
      console.log('删除行:', row)
    },
    fetchData() {
      this.loading = true
      // 模拟接口请求
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>