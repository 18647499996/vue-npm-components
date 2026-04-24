<template>
  <div class="base-control-container">
    <el-row type="flex" align="middle" class="control-row">

      <div class="filter-item">
        <el-date-picker v-if="showRangePicker" v-model="localDateRange" :type="picker" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleRangePickerChange" />
        <slot name="picker"></slot>
      </div>
      <div class="select-item">
        <el-select style="margin-right: 12px;" v-for="(item, index) in localSelectArray" :key="'select-' + index"
          v-model="item.value" v-show="item.hide !== false" :style="{ width: item.width || '150px' }"
          :placeholder="item.placeholder" :clearable="item.allowClear !== false" :disabled="item.disabled" filterable
          @change="(val) => handleSelectChange(val, index)">
          <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
        <slot name="select"></slot>
      </div>


      <el-input v-if="input.show !== false" v-model="localInputValue" :placeholder="input.placeholder || '请输入关键字'"
        class="filter-item" :style="{ width: input.width || '240px' }" clearable
        @keyup.enter.native="onClickListenerQuery" @input="handleInputChange" />

      <div class="button-group">
        <el-button v-if="showQueryBtn" type="primary" icon="el-icon-search" @click="onClickListenerQuery">查询</el-button>
        <el-button v-if="showCreateBtn" type="danger" icon="el-icon-plus" @click="onClickListenerCreate">
          {{ createBtnPlaceholder }}
        </el-button>
        <el-button v-if="showExportBtn" type="warning" icon="el-icon-download"
          @click="onClickListenerExport">导出</el-button>
        <slot name="button"></slot>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BaseControlFieldComponents',
  props: {
    // 日期相关
    showRangePicker: { type: Boolean, default: true },
    picker: { type: String, default: 'daterange' },
    dateValue: { type: Array, default: () => [] }, // 外部传入的日期绑定

    // 下拉框配置
    selectArray: { type: Array, default: () => [] },

    // 输入框配置
    input: {
      type: Object,
      default: () => ({ show: true, placeholder: '', value: '', width: '240px' })
    },

    // 按钮显示控制
    showQueryBtn: { type: Boolean, default: true },
    showCreateBtn: { type: Boolean, default: false },
    showExportBtn: { type: Boolean, default: false },
    createBtnPlaceholder: { type: String, default: '新增' }
  },
  data() {
    return {
      // 使用本地副本，避免直接修改 props
      localDateRange: this.dateValue,
      localSelectArray: JSON.parse(JSON.stringify(this.selectArray)),
      localInputValue: this.input.value
    }
  },
  watch: {
    // 深度监听外部 props 变化，同步到本地
    selectArray: {
      handler(val) {
        this.localSelectArray = JSON.parse(JSON.stringify(val))
      },
      deep: true
    },
    'input.value'(val) { this.localInputValue = val }
  },
  methods: {
    handleRangePickerChange(val) {
      this.$emit('update:dateValue', val);
      this.$emit('handleRangePickerChange', val);
    },

    handleSelectChange(val, index) {
      // 这里的 val 是变化后的最新值
      this.$emit('handleSelectChange', val, index, this.localSelectArray);
    },

    handleInputChange(val) {
      this.$emit('handleInputChange', val);
    },

    onClickListenerQuery() {
      // 查询时，回传所有当前筛选器的聚合数据
      const queryData = {
        dateRange: this.localDateRange,
        selects: this.localSelectArray.map(item => ({ key: item.placeholder, value: item.value })),
        keyword: this.localInputValue
      };
      this.$emit('query', queryData);
    },

    onClickListenerCreate() {
      this.$emit('create')
    },
    onClickListenerExport() {
      this.$emit('export')
    }
  }
}
</script>

<style scoped>
.base-control-container {
  padding: 10px 0;
  background-color: #fff;
}

.control-row {
  flex-wrap: wrap;
  /* 自动换行，防止窄屏幕挤压 */
}

/* 统一间距管理 */
.filter-item {
  margin-right: 12px;
  margin-bottom: 8px;
}

.select-item{
  margin-bottom: 8px;
}

.button-group {
  display: flex;
  margin-bottom: 8px;
}

.button-group>>>.el-button {
  margin-left: 8px;
}
</style>