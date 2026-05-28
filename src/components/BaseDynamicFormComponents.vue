<template>
  <el-form ref="dynamicForm" :model="model" :rules="rules" :label-width="labelWidth" :inline="inline" :size="size"
    :label-position="labelPosition" @submit.prevent="handleSubmit">
    <template>
      <el-row :gutter="20">
        <el-col :span="field.span || 24" v-for="(field, index) in fields">
          <!-- 输入框 -->
          <el-form-item v-if="field.type === 'input'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-input v-model="model[field.key]" :placeholder="field.placeholder" :disabled="field.disabled"
              :clearable="field.clearable !== false" :type="field.inputType || 'text'" :maxlength="field.maxlength"
              :show-word-limit="field.showWordLimit" :style="{ width: field.width || '100%' }">
              <template v-if="field.prepend !== undefined" slot="prepend">{{ field.prepend }}</template>
              <template v-if="field.append !== undefined" slot="append">{{ field.append }}</template>
            </el-input>
          </el-form-item>

          <!-- 单选选择框 -->
          <el-form-item v-if="field.type === 'radio'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-radio-group v-model="model[field.key]" :placeholder="field.placeholder" :disabled="field.disabled"
              :style="{ width: field.width || '100%' }" @change="(e) => { handleRadioChange(e, field, index) }">
              <el-radio v-for="option in field.options" :key="option.value" :label="option.value"
                :disabled="option.disabled">
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 下拉选择框 -->
          <el-form-item v-if="field.type === 'select'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-select v-model="model[field.key]" :placeholder="field.placeholder" :disabled="field.disabled"
              :style="{ width: field.width || '100%' }" @change="(e) => { handleSelectChange(e, field, index) }"
              :clearable="field.clearable !== false" :multiple="field.multiple"
              :filterable="field.filterable !== false">
              <el-option v-for="option in field.options" :key="option.value" :label="option.label"
                :value="option.value" />
            </el-select>
          </el-form-item>

          <!-- 日期选择器 -->
          <el-form-item v-if="field.type === 'date'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-date-picker v-model="model[field.key]" :type="field.dateType || 'date'" :placeholder="field.placeholder"
              :disabled="field.disabled" :clearable="field.clearable !== false" :format="field.format"
              :value-format="field.valueFormat" range-separator="至"
              :start-placeholder="field.startPlaceholder || '开始日期'" :end-placeholder="field.endPlaceholder || '结束日期'" />
          </el-form-item>

          <!-- 复选框 -->
          <el-form-item v-if="field.type === 'checkbox'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-checkbox-group v-model="model[field.key]" :disabled="field.disabled">
              <el-checkbox v-for="option in field.options" :key="option.value" :label="option.value">
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 文本域 -->
          <el-form-item v-if="field.type === 'textarea'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-input v-model="model[field.key]" type="textarea" :placeholder="field.placeholder"
              :disabled="field.disabled" :style="{ width: field.width || '100%' }" :rows="field.rows || 3"
              :maxlength="field.maxlength" :show-word-limit="field.showWordLimit" />
          </el-form-item>

          <!-- 上传文件 -->
          <el-form-item v-if="field.type === 'upload'" :label="field.label" :prop="field.key" :rules="field.rules">
            <el-upload :drag="field.drag" class="upload-demo"
              :on-change="(file) => { handleFileChange(file, model, field.key) }"
              :on-remove="(file, fileList) => { handleFileRemove(file, model, field.key) }" action="123"
              :auto-upload="false" :before-remove="beforeRemove" multiple :limit="field.limit || 6"
              :on-exceed="handleExceed" :file-list="model[field.key]">
              <el-button v-if="!field.drag" size="small" type="primary" plain>点击上传</el-button>
              <div v-if="!field.drag" slot="tip" class="el-upload__tip">上传附件，且不超过5M</div>
              <i v-if="field.drag" class="el-icon-upload"></i>
              <div v-if="field.drag" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>

          <!-- 自定义插槽 -->
          <el-form-item v-if="field.type === 'slot'" :label="field.label" :prop="field.key" :rules="field.rules"
            :required="field.required">
            <slot :name="field.key" :field="field" :form="model"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <!-- 按钮区域 -->
    <el-form-item v-if="showButtons" class="form-buttons">
      <el-button v-if="showResetBtn" @click="handleReset" :disabled="loading">
        重置
      </el-button>
      <el-button v-if="showCancelBtn" type="danger" @click="handleCancel">
        {{ cancelBtnText }}
      </el-button>
      <el-button v-if="showSubmitBtn" type="primary" @click="handleSubmit" :loading="loading">
        {{ submitBtnText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'BaseDynamicFormComponents',
  props: {
    // 表单字段配置
    fields: {
      type: Array,
      default: () => []
    },
    // 表单数据
    model: {
      type: Object,
      default: () => ({})
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 标签宽度
    labelWidth: {
      type: [String, Number],
      default: '120px'
    },
    // 标签位置
    labelPosition: {
      type: String,
      default: 'left'
    },
    // 是否内联
    inline: {
      type: Boolean,
      default: false
    },
    // 表单尺寸
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
    },
    // 是否显示按钮
    showButtons: {
      type: Boolean,
      default: true
    },
    // 是否显示提交按钮
    showSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    showResetBtn: {
      type: Boolean,
      default: true
    },
    // 提交按钮文本
    submitBtnText: {
      type: String,
      default: '提交'
    },
    // 是否显示取消按钮
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    // 取消按钮文本
    cancelBtnText: {
      type: String,
      default: '取消'
    },
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    fields: {
      handler(newVal, oldVal) {
        console.log('update fields', newVal)
        this.fields = newVal
      },
      deep: true,
      immediate: true
    },
  },
  methods: {

    resetLoading() {
      this.loading = false
    },

    reset() {
      this.$refs.dynamicForm.resetFields()
    },

    // 表单验证
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.dynamicForm.validate((valid, errors) => {
          if (valid) {
            resolve(this.model)
          } else {
            reject(errors)
          }
        })
      })
    },

    handleCancel() {
      this.$emit('cancel')
    },

    // 提交表单
    handleSubmit() {
      this.loading = true
      this.validate()
        .then(data => {
          this.$emit('submit', data)
        })
        .catch(errors => {
          this.loading = false
          this.$emit('validate-error', errors)
        })
    },

    /**
     * 选择框change事件
     * @param {*} e 选择数据
     * @param {*} field 表单字段
     * @param {*} index 索引
     */
    handleSelectChange(e, field, index) {
      if (field.multiple) {
        const objects = e.map(item => {
          return field.options.find(opt => opt.value == item)
        })
        this.$emit('handleSelectChange', e, field, objects, index)
      } else {
        const object = field.options.find(item => item.value == e)
        this.$emit('handleSelectChange', e, field, object, index)
      }
    },

    /**
     * 单选框change事件
     * @param {*} e 选择数据
     * @param {*} field 表单字段
     * @param {*} index 索引
     */
    handleRadioChange(e, field, index) {
      const object = field.options.find(item => item.value == e)
      this.$emit('handleRadioChange', e, field, object, index)
    },

    handleFileChange(file, dataModel, key) {
      console.log('选择文件：', file);
      dataModel[key].push(file.raw)
    },

    handleFileRemove(file, dataModel, key) {
      console.log('移除文件：', file);
      dataModel[key] = dataModel[key].filter(item => item != file)
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    // 重置表单
    handleReset() {
      this.$refs.dynamicForm.resetFields()
      this.$emit('reset')
    },

    // 设置表单数据
    setFormData(data) {
      this.formData = { ...data }
    },

    // 获取表单数据
    getFormData() {
      return { ...this.formData }
    }
  }
}
</script>

<style scoped>
.form-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>