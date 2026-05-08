<template>
  <div class="signature-box">
    <div class="header">
      <span>手写签名区域</span>
      <el-button type="text" icon="el-icon-refresh" @click="clear">重置</el-button>
    </div>

    <div class="canvas-container">
      <canvas
        ref="signatureCanvas"
        @mousedown="handleStart"
        @mousemove="handleMove"
        @mouseup="handleEnd"
        @mouseleave="handleEnd"
        @touchstart="handleStart"
        @touchmove="handleMove"
        @touchend="handleEnd"
      ></canvas>
    </div>

    <div class="footer">
      <el-button @click="clear">清空</el-button>
      <el-button type="primary" @click="saveSignature">确认提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElectronicSignature',
  data() {
    return {
      ctx: null,
      isDrawing: false,
      canvas: null
    };
  },
  mounted() {
    this.initCanvas();
    // 监听窗口大小变化，防止重绘导致签名丢失
    window.addEventListener('resize', this.initCanvas);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initCanvas);
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.signatureCanvas;
      this.ctx = this.canvas.getContext('2d');
      
      // 获取容器宽度自适应
      const container = this.canvas.parentElement;
      this.canvas.width = container.offsetWidth;
      this.canvas.height = 300; // 固定高度或自适应

      // 初始化绘图样式
      this.ctx.strokeStyle = '#333'; // 线条颜色
      this.ctx.lineWidth = 4;       // 线条粗细
      this.ctx.lineCap = 'round';   // 线条末端圆润
      this.ctx.lineJoin = 'round';  // 线条连接处圆润
      this.ctx.shadowBlur = 1;      // 微弱阴影增加真实感
      this.ctx.shadowColor = '#333';
    },

    // 坐标转换逻辑
    getPos(e) {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    },

    handleStart(e) {
      e.preventDefault();
      this.isDrawing = true;
      const { x, y } = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    },

    handleMove(e) {
      if (!this.isDrawing) return;
      e.preventDefault();
      const { x, y } = this.getPos(e);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    },

    handleEnd() {
      this.isDrawing = false;
      this.ctx.closePath();
    },

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    saveSignature() {
      // 检查画布是否为空（简单检查：判断是否有像素改变）
      // 这里直接导出 Base64
      const imageBase64 = this.canvas.toDataURL('image/png');
      
      // 触发父组件事件
      this.$emit('on-confirm', imageBase64);
      
      // 提示（如果你项目中用了 Element UI）
      if (this.$message) {
        this.$message.success('签名已生成');
      }
      
      console.log('生成的签名数据：', imageBase64);
    }
  }
};
</script>

<style scoped>
.signature-box {
  width: 100%;
  max-width: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
  color: #606266;
  font-size: 14px;
}

.canvas-container {
  margin: 15px 0;
  background-color: #f8f9fa;
  border: 1px dashed #c0c4cc;
  cursor: url('https://cdn-icons-png.flaticon.com/16/583/583853.png'), crosshair;
}

canvas {
  display: block;
  touch-action: none; /* 关键：禁止浏览器默认手势，防止移动端签名时页面滑动 */
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>