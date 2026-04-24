<template>
  <el-row type="flex">
    <!-- 日期选择器 -->
    <el-date-picker v-if="showRangePicker" :type="picker" @change="handleRangePickerChange" start-placeholder="开始日期"
      end-placeholder="结束日期" />
    <!-- 下拉条件选择框 -->
    <el-select show-search optionFilterProp="label" v-for="(item, index) in selectArray" :key="index"
      :style="{ width: item.width, marginLeft: '8px' }" v-model:value="item.value"
      @change="(e) => { handleSelectChange(e, index) }" :placeholder="item.placeholder" :clearable="item.allowClear"
      :disabled="item.disabled" v-show="item.hide">
      <el-option v-for="attr in item.opstion" :key="attr.value" :label="attr.label" :value="attr.value">
      </el-option>
    </el-select>
    <!-- 输入框 -->
    <el-input v-if="input.show" v-model:value="input.value" :placeholder="input.placeholder"
      :style="{ width: input.width, marginLeft: '8px' }" @change="handleInputChange"
      :clearable="input.allowClear || true" />
    <!-- 查询按钮 -->
    <el-button :style="{ marginLeft: '8px' }" v-if="showQueryBtn" type="primary" @click="onClickListenerQuery">
      查询
    </el-button>
    <!-- 创建/新增按钮 -->
    <el-button :style="{ marginLeft: '8px' }" v-if="showCreateBtn" type="danger" @click="onClickListenerCreate">
      {{ createBtnPlaceholder }}
    </el-button>
    <!-- 导出按钮 -->
    <el-button :style="{ marginLeft: '8px' }" v-if="showExportBtn" type="warning" @click="onClickListenerExport">
      导出
    </el-button>
    <!-- 插槽 -->
    <slot name="last"></slot>
  </el-row>
</template>

<script>

export default {
  name: 'BaseControlFieldComponents',
  props: {
    showRangePicker: {
      type: Boolean,
      default: true
    },
    picker: {
      type: String,
      default: 'daterange'
    },
    selectArray: {
      type: Array,
      default: []
    },
    input: {
      type: Object,
      default: {
        show: true,
        placeholder: '',
        value: undefined,
        width: '300px',

      }
    },
    showQueryBtn: {
      type: Boolean,
      default: true
    },
    showCreateBtn: {
      type: Boolean,
      default: false
    },
    showExportBtn: {
      type: Boolean,
      default: false
    },
    createBtnPlaceholder: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {}
  },

  created() {

  },

  mounted() {

  },

  methods: {
    handleRangePickerChange(e, dateString) {
      this.$emit('handleRangePickerChange', e, dateString)
    },

    handleSelectChange(e, index) {
      this.$emit('handleSelectChange', e, index)
    },

    handleInputChange(e) {
      this.$emit('handleInputChange', e)
    },

    onClickListenerQuery() {
      this.$emit('onClickListenerQuery')
    },

    onClickListenerCreate() {
      this.$emit('onClickListenerCreate')
    },

    onClickListenerExport() {
      this.$emit('onClickListenerExport')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
