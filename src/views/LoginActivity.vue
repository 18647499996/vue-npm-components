<template>
  <div class="app-container">
    <base-control-field-components :show-range-picker="true" :select-array="selectArray" :input="inputAttr"
      show-export-btn show-create-btn @query="handleQuery" @create="handleCreate" @export="handleExport"
      @handleSelectChange="handleSelectFilterChange" @handleInputChange="handleInputChange"
      @handleRangePickerChange="handleRangePickerChange">
      <template #select>
        <el-select style="margin-right: 12px;" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template #button>
        <el-button type="warning" icon="el-icon-download">自定义按钮</el-button>
      </template>
    </base-control-field-components>
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
import BaseControlFieldComponents from '../components/BaseControlFieldComponents.vue';

export default {
  components: { BaseTableComponents, BaseControlFieldComponents },
  data() {
    return {
      loading: false,
      currentPage: 1,
      total: 100,
      selectArray: [
        {
          width: '150px',
          placeholder: '审核状态',
          allowClear: true,
          value: undefined,
          hide: true,
          options: [
            { value: 0, label: '待审核' },
            { value: 1, label: '已通过' },
            { value: 2, label: '已回退' }
          ]
        },
        {
          width: '150px',
          placeholder: '处理状态',
          allowClear: true,
          value: undefined,
          hide: true,
          options: [
            { value: 0, label: '未处理' },
            { value: 1, label: '已处理' },
          ]
        },
      ],
      inputAttr: {
        placeholder: '申请编号/客户名称/申请人',
        value: '',
        width: '240px',
        show: true
      },
      tableData: [
        { id: 1, name: '张三', age: 25, status: 'active', createTime: '2026-04-01' },
        { id: 2, name: '李四', age: 30, status: 'inactive', createTime: '2026-04-02' },
        { id: 3, name: '王五', age: 28, status: 'active', createTime: '2026-04-03' }
      ],
      columns: [
        { prop: 'name', label: '姓名', },
        { prop: 'age', label: '年龄', width: '80', sortable: true },
        { prop: 'status', label: '状态', width: '100', slot: 'status' },
        { prop: 'createTime', label: '创建时间', width: '180', sortable: true },
        { type: 'operation', label: '操作', width: '150', fixed: 'right' }
      ],
      pagination: {
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, prev, pager, next, sizes'
      },
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ],
      value: ''
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

    handleInputChange(e) {
      console.log('输入框值变化：', e)
    },

    handleExport() {
      console.log('导出按钮')
    },

    handleQuery(e) {
      console.log('查询按钮', e)
    },

    handleCreate() {
      console.log('创建按钮')
    },

    handleRangePickerChange(e, dateRange) {
      console.log('选择日期范围：', e, dateRange)
    },

    handleSelectFilterChange(e, index) {
      console.log('选择Select框：', index, e)
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