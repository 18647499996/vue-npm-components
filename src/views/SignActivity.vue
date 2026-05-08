<template>
  <div>
    <!-- 1. 签名组件 (使用我们之前写的组件) -->
    <base-electronic-signature @on-confirm="handleGetSignature" />

    <!-- 2. 文档预览区域 -->
    <div id="print-content" class="document-container" ref="docContainer">
      <h2 class="doc-title">解除劳动合同协议书</h2>
      <div class="doc-body">
        <p>甲方：XXXXXX有限公司</p>
        <p>乙方（员工）：{{ userInfo.name || '张三' }}</p>
        <p>根据《中华人民共和国劳动合同法》相关规定，经甲乙双方协商一致...</p>
        <!-- 此处省略协议正文 -->
      </div>

      <!-- 签名落款区域 -->
      <div class="doc-footer">
        <div class="footer-item">
          <p>甲方（盖章）：</p>
          <div class="seal-space"></div>
        </div>
        <div class="footer-item">
          <p>乙方（签字）：</p>

        </div>
      </div>
      <div class="draggable-signature" :style="{ left: posX + 'px', top: posY + 'px' }" @mousedown="startDrag">
        <!-- 这里就是放置签名文件的地方 -->
        <img v-if="signatureImg" :src="signatureImg" class="signature-img" />
        <div v-else class="signature-placeholder">（请在上方完成签名）</div>
        <p>日期：{{ currentDate }}</p>
      </div>
    </div>

    <!-- 3. 操作按钮 -->
    <div class="actions">
      <el-button type="success" :disabled="!signatureImg" @click="exportPDF">
        导出为 PDF 存证
      </el-button>
    </div>
  </div>
</template>

<script>
import BaseElectronicSignature from '../components/BaseElectronicSignature.vue';

export default {
  name: 'SignActivity',
  components: { BaseElectronicSignature },
  data() {
    return {
      signatureImg: '', // 存储 Base64 签名
      currentDate: new Date().toLocaleDateString(),
      userInfo: { name: '柳冬寒' }, // 假设你的用户名
      dragging: false,
      offset: { x: 0, y: 0 },
      posX: 0,
      posY: 0,
    };
  },
  methods: {
    handleGetSignature(base64) {
      console.log('签名图片 Base64:', base64);
      this.signatureImg = base64;
      // 初始位置设为容器左上角
      this.posX = 20;
      this.posY = 20;
      this.$message.success('签名已成功插入文档');
    },
    exportPDF() {
      // 实际项目中通常使用 html2canvas + jsPDF 
      this.$message.info('正在生成 PDF 文件...');
      window.print(); // 简单演示：调用系统打印并选择“另存为PDF”
    },

    startDrag(e) {
      this.dragging = true;
      // 记录鼠标按下位置相对于图片左上角的距离
      this.offset.x = e.clientX - this.posX;
      this.offset.y = e.clientY - this.posY;

      // 绑定全局事件，防止鼠标移出图片后拖拽失效
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },

    onDrag(e) {
      if (!this.dragging) return;

      const container = this.$refs.docContainer;
      const rect = container.getBoundingClientRect();

      // 计算新位置（相对于容器）
      let newX = e.clientX - this.offset.x;
      let newY = e.clientY - this.offset.y;

      // 边界处理：防止签名拖出文档范围
      const maxX = rect.width - 150; // 150是图片预估宽度
      const maxY = rect.height - 80;  // 80是图片预估高度

      this.posX = Math.min(Math.max(0, newX), maxX);
      this.posY = Math.min(Math.max(0, newY), maxY);
    },

    stopDrag() {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
  }
};
</script>

<style scoped>
.document-container {
  padding: 40px;
  border: 1px solid #eee;
  background: #fff;
  font-family: "SimSun", "宋体", serif;
  /* 协议通常用宋体 */
  line-height: 2;
}

.doc-title {
  text-align: center;
  margin-bottom: 30px;
}

.doc-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.signature-img {
  width: 150px;
  height: auto;
  border-bottom: 1px solid #000;
  display: block;
}

.signature-placeholder {
  height: 50px;
  color: #ccc;
  font-style: italic;
}

.draggable-signature {
  position: absolute;
  /* 关键：绝对定位 */
  cursor: move;
  z-index: 100;
  border: 1px dashed transparent;
  transition: border 0.2s;
}

.draggable-signature:hover {
  border: 1px dashed #409eff;
  background: rgba(64, 158, 255, 0.1);
}

.draggable-signature img {
  width: 150px;
  /* 签名缩放到合适大小 */
  display: block;
}

/* 装饰：拖拽手柄 */
.drag-handle {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  background: #409eff;
  border-radius: 50%;
  display: none;
}

.draggable-signature:hover .drag-handle {
  display: block;
}
</style>