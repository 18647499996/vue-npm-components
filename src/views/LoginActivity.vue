<template>
  <div class="app-container">
    <base-control-field-components :show-range-picker="show" picker-placeholder="请选择多个日期" picker="months" value-format="yyyy-MM"
      :date-value="dataValue" :select-array="selectArray" :input="inputAttr" show-export-btn show-create-btn
      @query="handleQuery" @create="handleCreate" @export="handleExport" @handleSelectChange="handleSelectFilterChange"
      @handleInputChange="handleInputChange" @handleRangePickerChange="handleRangePickerChange" size="medium">
      <template #select>
        <el-select size="medium" style="margin-right: 12px;" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template #button>
        <el-upload action="" :on-change="fileHandleChange" :file-list="fileListUpload" :show-file-list="false"
          accept=".xls,.xlsx" :auto-upload="false" :limit="1">
          <el-button :loading="disbtn" size="small" type="danger">导入</el-button>
        </el-upload>
        <el-button size="medium" type="warning" icon="el-icon-download">自定义按钮</el-button>

        <el-button type="success" size="small" @click="doDown">下载模板</el-button>
        <el-button type="info" size="small">批量写入</el-button>
        <el-button type="info" size="small">全部写入</el-button>

      </template>
    </base-control-field-components>
    <base-table-components :list="tableData" :loading="loading" :columns="columns" :current-page="currentPage"
      :total="total" :show-selection="true" :show-index="true" border @current-change="handleCurrentChange"
      @size-change="handleSizeChange" @selection-change="handleSelectionChange" @row-click="handleRowClick">
      <!-- 自定义列插槽 -->
      <template #bodyCell="{ column, row, index }">
        <el-tag :type="row.role === 'manager' ? 'success' : 'warning'">
          {{ row.role === 'manager' ? '管理员' : '用户' }}
        </el-tag>
      </template>

      <!-- 操作列插槽 -->
      <template #operation="{ row, index }">
        <el-button size="small" type="primary" @click="editRow(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
      </template>
    </base-table-components>
    <base-dynamic-form-components style="margin-left: 50px;margin-right: 50px;" :fields="formFields" :model="formModel"
      :rules="rules" @submit="handleSubmit" @reset="handleReset" @validate-error="handleValidateError">
      <!-- 自定义插槽 -->
      <template #endDate="{ field, form }">
        <el-date-picker v-model="form.startDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"
          style="width: 150px;">
        </el-date-picker>
        <span style="margin-left: 12px;margin-right: 12px;">至</span>
        <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"
          style="width: 150px;" :disabled="form.startDate == null" :picker-options="endDatePickerOptions">
        </el-date-picker>
      </template>
    </base-dynamic-form-components>
  </div>
</template>

<script>
import BaseTableComponents from '@/components/BaseTableComponents.vue'
import BaseControlFieldComponents from '../components/BaseControlFieldComponents.vue';
import BaseDynamicFormComponents from '../components/BaseDynamicFormComponents.vue';

export default {
  components: { BaseTableComponents, BaseControlFieldComponents, BaseDynamicFormComponents },
  data() {
    return {
      dataValue: ['2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01'],
      loading: false,
      currentPage: 1,
      total: 20,
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
          multiple: true,
          tags: true,
          options: [
            { value: 0, label: '未处理' },
            { value: 1, label: '已处理' },
            { value: 2, label: '待处理' },
            { value: 3, label: '处理中' },
            { value: 4, label: '紧急处理' }
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
        { id: 1, name: '张三', age: 25, status: 'active', role: 'admin', createTime: '2026-04-01', email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: 2, name: '李四', age: 30, status: 'inactive', role: 'user', createTime: '2026-04-02', email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: 3, name: '王五', age: 28, status: 'active', role: 'user', createTime: '2026-04-03', email: 'wangwu@example.com', address: '广州市天河区' },
        { id: 4, name: '赵六', age: 35, status: 'active', role: 'manager', createTime: '2026-03-15', email: 'zhaoliu@example.com', address: '深圳市南山区' },
        { id: 5, name: '孙七', age: 22, status: 'inactive', role: 'user', createTime: '2026-03-20', email: 'sunqi@example.com', address: '杭州市西湖区' },
        { id: 6, name: '周八', age: 40, status: 'active', role: 'admin', createTime: '2026-04-10', email: 'zhouba@example.com', address: '成都市锦江区' },
        { id: 7, name: '吴九', age: 27, status: 'active', role: 'user', createTime: '2026-04-12', email: 'wujiu@example.com', address: '武汉市武昌区', number: 100, price: 1000 },
        { id: 8, name: '郑十', age: 31, status: 'inactive', role: 'manager', createTime: '2026-02-28', email: 'zhengshi@example.com', address: '西安市雁塔区', number: 100, price: 1000 },
        { id: 9, name: '陈十一', age: 26, status: 'active', role: 'user', createTime: '2026-04-15', email: 'chen11@example.com', address: '重庆市渝中区', number: 100, price: 1000 },
        { id: 10, name: '林十二', age: 29, status: 'active', role: 'admin', createTime: '2026-04-18', email: 'lin12@example.com', address: '南京市玄武区', number: 100, price: 1000 },
        { id: 11, name: '韩梅梅', age: 24, status: 'inactive', role: 'user', createTime: '2026-01-05', email: 'hmm@example.com', address: '天津市和平区', number: 100, price: 1000 },
        { id: 12, name: '李雷', age: 24, status: 'active', role: 'user', createTime: '2026-01-06', email: 'lilei@example.com', address: '苏州市姑苏区', number: 100, price: 1000 },
        { id: 13, name: '刘能', age: 45, status: 'active', role: 'manager', createTime: '2026-03-25', email: 'liuneng@example.com', address: '沈阳市沈河区', number: 100, price: 1000 },
        { id: 14, name: '赵四', age: 42, status: 'inactive', role: 'user', createTime: '2026-03-26', email: 'zhaosi@example.com', address: '长春市朝阳区', number: 100, price: 1000 },
        { id: 15, name: '谢广坤', age: 48, status: 'active', role: 'admin', createTime: '2026-04-20', email: 'xgk@example.com', address: '哈尔滨市南岗区', number: 100, price: 1000 },
        { id: 16, name: '小沈阳', age: 33, status: 'active', role: 'user', createTime: '2026-04-21', email: 'xsy@example.com', address: '长沙市岳麓区', number: 100, price: 1000 },
        { id: 17, name: '宋小宝', age: 36, status: 'inactive', role: 'user', createTime: '2026-04-22', email: 'sxb@example.com', address: '福州市鼓楼区', number: 100, price: 1000 },
        { id: 18, name: '大鹏', age: 34, status: 'active', role: 'manager', createTime: '2026-04-23', email: 'dapeng@example.com', address: '厦门市思明区', number: 100, price: 1000 },
        { id: 19, name: '柳岩', age: 32, status: 'active', role: 'user', createTime: '2026-04-24', email: 'liuyan@example.com', address: '青岛市市南区', number: 100, price: 1000 },
        { id: 20, name: '马丽', age: 37, status: 'inactive', role: 'admin', createTime: '2026-04-24', email: 'mali@example.com', address: '大连市西岗区', number: 100, price: 1000 }
      ],
      columns: [
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'age', label: '年龄', width: '100', align: 'center', sortable: true },
        { prop: 'email', label: '邮箱', align: 'center' },
        { prop: 'address', label: '地址', align: 'center' },
        {
          prop: '', label: '角色', width: '100', align: 'center',
          children: [
            { prop: 'role', label: '调用量', align: 'center' },
            { prop: 'number', label: '最终付款次数', align: 'center' },
            { prop: 'price', label: '单价', align: 'center' }
          ]
        },
        { prop: 'createTime', label: '创建时间', sortable: true, align: 'center' },
        { prop: 'operation', label: '操作', width: '150', fixed: 'right', align: 'center' }
      ],
      pagination: {
        pageSize: 5,
        pageSizes: [5, 10, 20, 50, 100],
        layout: 'total, prev, pager, next, sizes'
      },
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ],
      value: '',
      formModel: {
        projectLevel: '',
        system: [],
        startDate: '',
        endDate: '',
        ccyyf: '',
        yh: '',
        dyhjz: '',
        jzyzfs: '',
        fileList: []
      },
      formFields: [
        {
          type: 'select',
          key: 'projectLevel',
          label: '项目级别',
          placeholder: '请选择项目级别',
          required: true,
          rules: [
            { required: true, message: '请选择项目级别', trigger: 'blur' },
          ],
          options: [
            { label: '一级项目', value: '1' },
            { label: '二级项目', value: '2' },
            { label: '三级项目', value: '3' }
          ]
        },
        {
          type: 'select',
          key: 'system',
          label: '关联系统',
          placeholder: '请选择关联系统',
          multiple: true,
          required: true,
          rules: [
            { required: true, message: '请选择关联系统', trigger: 'blur' },
          ],
          options: [
            { label: '系统A', value: 'systemA' },
            { label: '系统B', value: 'systemB' },
            { label: '系统C', value: 'systemC' }
          ]
        },
        {
          type: 'slot',
          key: 'endDate',
          label: '周期时间',
          required: false,
        },
        {
          type: 'input',
          key: 'ccyyf',
          label: '产品运营方',
          placeholder: '请填写产品运营方',
          required: true,
          rules: [
            { required: true, message: '请填写产品运营方', trigger: 'blur' },
          ],
        },
        {
          type: 'input',
          key: 'yh',
          label: '用户',
          placeholder: '请填写用户',
          required: true,
          rules: [
            { required: true, message: '请填写用户1111', trigger: 'blur' },
          ],
        },
        {
          type: 'textarea',
          key: 'dyhjz',
          label: '对用户价值（研发目标）',
          placeholder: '请输入对用户价值（研发目标）',
          rows: 4,
          maxlength: 200,
          showWordLimit: true,
          required: true,
          rules: [
            { required: true, message: '请输入对用户价值（研发目标）', trigger: 'blur' },
          ],
        },
        {
          type: 'textarea',
          key: 'jzyzfs',
          label: '价值验证方式',
          placeholder: '请输入价值验证方式',
          rows: 4,
          maxlength: 200,
          showWordLimit: true,
          required: true,
          rules: [
            { required: true, message: '请输入价值验证方式', trigger: 'blur' },
          ],
        },
        {
          type: 'upload',
          key: 'fileList',
          label: '附件',
          required: false,
          rules: [
            { required: false, message: '请上传文件', trigger: 'blur' },
          ],
          limit: 6,
          options: []
        },
      ],
      endDatePickerOptions: {
        disabledDate: (time) => {
          return getEndPikerOptions(this.formModel.startDate, time)
        }
      }

    }
  },
  methods: {

    getEndPikerOptions(sDate, time) {
      const today = new Date();
      // 构造今天 00:00:00 的时间戳
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

      // 小于今天 → 禁用（当天可以选）
      if (time.getTime() < startOfToday) return true;

      // 2. 不能选 <= 开始日期
      if (sDate) {
        const startDate = new Date(sDate);
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
        if (time.getTime() < start) return true
      }
      return false
    },

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

    handleRangePickerChange(e) {
      console.log('选择日期范围：', e)
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

    handleSubmit(data) {
      console.log('提交表单：', data)
    },

    handleReset() {
      console.log('重置表单')
    },

    handleValidateError(errors) {
      console.log('表单验证错误：', errors)
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