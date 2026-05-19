<template>
  <div class="signature-box">
    <div class="header">
      <span class="title"><i class="el-icon-edit"></i> 请在下方区域手写签名</span>
      <span class="tips">（请尽量将字写大、写清晰）</span>
    </div>

    <!-- 增加一个包裹层，用来动态计算并撑开 Canvas 的宽高 -->
    <div class="canvas-container" ref="container">
      <canvas ref="signatureCanvas" @mousedown="handleStart" @mousemove="handleMove" @mouseup="handleEnd"
        @mouseleave="handleEnd" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd"></canvas>
    </div>

    <div class="footer">
      <el-button size="medium" icon="el-icon-delete" @click="clear">清空重写</el-button>
      <el-button size="medium" type="primary" icon="el-icon-check" @click="saveSignature">确认提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseElectronicSignature',
  data() {
    return {
      ctx: null,          // Canvas 绘图上下文
      isDrawing: false,   // 是否正在绘制
      hasDrawn: false,    // 标识用户是否真正下笔写过字（用于空校验）
      lastPos: { x: 0, y: 0 } // 记录上一次的坐标点
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas();
      // 监听窗口大小变化，防止 resize 后画笔错位
      window.addEventListener('resize', this.initCanvas);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initCanvas);
  },
  methods: {
    // 1. 初始化画布：核心解决“高分屏模糊”和“坐标偏移”问题
    initCanvas() {
      const canvas = this.$refs.signatureCanvas;
      const container = this.$refs.container;
      if (!canvas || !container) return;

      this.ctx = canvas.getContext('2d');

      // 获取容器实际的物理宽高
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 获取屏幕像素比（如 Retina 屏通常是 2 或 3）
      const dpr = window.devicePixelRatio || 1;

      // 关键：将 Canvas 的画布属性放大 dpr 倍，而 CSS 尺寸保持原样
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      // 缩放绘图上下文，之后所有的坐标计算都不需要手动乘以 dpr 了
      this.ctx.scale(dpr, dpr);

      // 初始化画笔样式（让线条更丝滑、圆润）
      this.ctx.lineWidth = 3.5;          // 笔触粗细
      this.ctx.strokeStyle = '#1a1a1a';  // 笔触颜色（推荐深黑，导出的PDF更清晰）
      this.ctx.lineCap = 'round';        // 线条末端形状：圆形（防止出现断层折线）
      this.ctx.lineJoin = 'round';       // 线条交汇形状：圆形

      this.hasDrawn = false; // 重置绘制状态
    },

    // 2. 获取相对坐标（适配 PC 端和移动端）
    getPos(e) {
      const canvas = this.$refs.signatureCanvas;
      const rect = canvas.getBoundingClientRect();

      // 判断是触屏事件还是鼠标事件
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    },

    // 3. 开始落笔
    handleStart(e) {
      // 阻止移动端连带滚动页面的默认行为
      if (e.cancelable) e.preventDefault();

      this.isDrawing = true;
      this.hasDrawn = true;

      const pos = this.getPos(e);
      this.lastPos = pos;

      // 应对只点了一下不移动的情况，先点一个微小的点
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      this.ctx.lineTo(pos.x + 0.1, pos.y + 0.1);
      this.ctx.stroke();
    },

    // 4. 移动笔触
    handleMove(e) {
      if (!this.isDrawing) return;
      if (e.cancelable) e.preventDefault(); // 再次确保移动端不滚屏

      const currentPos = this.getPos(e);

      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
      this.ctx.closePath();

      // 更新上一次的坐标
      this.lastPos = currentPos;
    },

    // 5. 抬笔 / 离开区域
    handleEnd() {
      this.isDrawing = false;
    },

    // 6. 清空画布
    clear() {
      const canvas = this.$refs.signatureCanvas;
      if (!canvas || !this.ctx) return;
      // 考虑到 dpr 放大，直接利用 canvas.width/height 物理清空最安全
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.hasDrawn = false;
    },

    // 7. 提交保存
    saveSignature() {
      if (!this.hasDrawn) {
        this.$message.warning('请先完成手写签名再提交');
        return;
      }

      const canvas = this.$refs.signatureCanvas;
      // 导出为 base64 图片格式 (推荐使用 image/png，底色是透明的，方便后续压入合同)
      const dataURL = canvas.toDataURL('image/png');

      // 触发父组件绑定的自定义事件，将图片传出去
      this.$emit('on-confirm', dataURL);
    }
  }
};
</script>

<style scoped>
.signature-box {
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
}

.title i {
  color: #409eff;
  margin-right: 4px;
}

.tips {
  font-size: 12px;
  color: #909399;
  margin-left: 8px;
}

/* 画布容器：利用网格背景模拟纸张/签字板质感 */
.canvas-container {
  width: 100%;
  height: 260px;
  /* 适中的手写高度 */
  margin: 16px 0;
  background-color: #fafafa;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  /* 淡淡的仿“田字格”或微网格背景，引导用户居中书写 */
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

canvas {
  display: block;
  cursor: crosshair;
  /* 鼠标变成十字准星，暗示可以书写 */
  touch-action: none;
  /* CSS 层面阻断移动端浏览器的默认手势行为（双击缩放、滑屏） */
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}
</style>