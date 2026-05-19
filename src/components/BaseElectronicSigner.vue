<template>
  <div class="signer-page-wrapper">
    <!-- 签名手写弹窗 -->
    <el-dialog title="请在下方手写签名" :visible.sync="signatureDialogVisible" width="500px" append-to-body>
      <base-electronic-signature ref="signatureCanvas" @on-confirm="handleGetSignature" />
    </el-dialog>

    <!-- 主体预览滚动区域 -->
    <div class="signer-document-scroller">
      <div id="signer-print-content" class="signer-container" ref="signerContainer">

        <!-- 情况 A：HTML 文本模式 -->
        <div v-if="mode === 'html'" class="html-content-render" v-html="content"></div>

        <!-- 情况 B：PDF 文件模式 (利用渲染出来的 Canvas 作为合同底图) -->
        <div v-else-if="mode === 'pdf'" class="pdf-content-render" v-loading="pdfLoading">
          <canvas ref="pdfCanvas" class="pdf-page-canvas"></canvas>
        </div>

        <!-- 情况 C：自定义元素模式 -->
        <!-- 自定义元素模式下，需要在 slot 中渲染自定义元素 -->
        <div v-else-if="mode === 'element'" class="element-content-render">
          <slot name="element"></slot>
        </div>

        <!-- 统一的绝对定位/可拖拽签名落款盒子 (它将相对于上述 A4 容器绝对定位) -->
        <div v-if="signatureImg" class="absolute-draggable-signature" :class="{ 'has-signature': signatureImg }"
          :style="{ left: dragPos.x + 'px', top: dragPos.y + 'px' }" @mousedown="startDrag">
          <img v-if="signatureImg" :src="signatureImg" class="sign-img" draggable="false" />
          <div v-else class="sign-placeholder" @click="openSignaturePad">
            <i class="el-icon-edit"></i>
            <span>[ 点击放置签名 ]</span>
          </div>
          <p class="sign-date" v-if="visibleDate">日期：{{ currentDate }}</p>
        </div>

      </div>
    </div>

    <!-- 底部固定操作栏 -->
    <div class="signer-action-bar">
      <el-button type="primary" plain icon="el-icon-edit" @click="openSignaturePad">
        {{ signatureImg ? '重新签名' : '手写签名' }}
      </el-button>
      <el-button type="success" icon="el-icon-download" :disabled="!signatureImg" @click="handleExport">
        签署并导出
      </el-button>
    </div>
  </div>
</template>

<script>
// 如果使用 PDF 模式，建议 npm install pdfjs-dist@2.16.105 (Vue2 适配较好的版本)

import BaseElectronicSignature from '../components/BaseElectronicSignature.vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default {
  name: 'BaseElectronicSigner',
  components: { BaseElectronicSignature },
  props: {
    // 模式：'html' 或 'pdf'
    mode: {
      type: String,
      default: 'html',
      validator: (value) => ['html', 'pdf', 'element'].includes(value)
    },
    // html 字符串或者是 PDF 的文件全路径 URL / Base64
    content: {
      type: String,
      default: ''
    },
    // 是否显示日期
    visibleDate: {
      type: Boolean,
      default: true
    },
    // 默认初始签名的 X, Y 坐标位置（相对于 A4 纸张左上角）
    defaultPos: {
      type: Object,
      default: () => ({ x: 0, y: 0 }) // 默认偏右下角落款处
    },
    // 导出文件名
    fileName: {
      type: String,
      default: new Date().toLocaleDateString()
    },

    // 是否下载 PDF 文件
    download: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      signatureImg: null,
      signatureDialogVisible: false,
      currentDate: new Date().toLocaleDateString(),
      pdfLoading: false,
      // 签名拖拽坐标
      dragPos: { x: 500, y: 900 }
    };
  },
  watch: {
    // 深度监听初始位置
    defaultPos: {
      handler(val) {
        this.dragPos = { ...val };
      },
      immediate: true
    },
    // 如果是 PDF 模式，当内容变动时重新渲染
    content: {
      handler() {
        if (this.mode === 'pdf' && this.content) {
          setTimeout(() => {
            this.renderPdfPage();
          }, 500);

        }
      },
      immediate: true
    }
  },
  methods: {
    openSignaturePad() {
      this.signatureDialogVisible = true;
    },
    handleGetSignature(base64Url) {
      this.signatureImg = base64Url;
      this.signatureDialogVisible = false;
      this.$message.success('签名成功！请拖动签名调整最终落款位置。');
    },

    // 核心：基于 A4 父容器视窗的边界碰撞拖拽
    startDrag(e) {
      const el = e.currentTarget;
      const container = this.$refs.signerContainer;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      // 鼠标点击点相对于签名盒子左上角的偏移
      const startX = e.clientX - elRect.left;
      const startY = e.clientY - elRect.top;

      const handleMouseMove = (moveEvent) => {
        let left = moveEvent.clientX - containerRect.left - startX;
        let top = moveEvent.clientY - containerRect.top - startY;

        // 边界计算：不能溢出整张 A4 纸
        const maxLeft = containerRect.width - elRect.width;
        const maxTop = containerRect.height - elRect.height;

        if (left < 0) left = 0;
        if (left > maxLeft) left = maxLeft;
        if (top < 0) top = 0;
        if (top > maxTop) top = maxTop;

        this.dragPos.x = left;
        this.dragPos.y = top;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        // 实时向父组件同步当前的坐标和签名数据，方便后端做坐标留存
        this.$emit('update:position', this.dragPos);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },

    // PDF 模式下的 Canvas 渲染逻辑
    async renderPdfPage() {
      if (this.mode !== 'pdf' || !this.content) return;
      this.pdfLoading = true;
      try {
        const canvas = this.$refs.pdfCanvas;
        console.log('~~~~~~~~~', canvas)

        const ctx = canvas.getContext('2d');

        // 加载 PDF 文档
        const loadingTask = pdfjsLib.getDocument(this.content);
        const pdf = await loadingTask.promise;

        // 默认渲染第一页（电子签章通常针对单页或尾页，多页签章需要引入轮播/滚动，此处演示单页核心逻辑）
        const page = await pdf.getPage(1);

        // 适配标准 A4 容器宽度 (794px) 计算缩放比
        const desiredWidth = 794;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = desiredWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale: scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // 渲染到 Canvas
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        await page.render(renderContext).promise;
      } catch (error) {
        this.$message.error('PDF 文档解析失败，请检查文件地址');
        console.error(error);
      } finally {
        this.pdfLoading = false;
      }
    },

    // 点击导出的统一出口
    handleExport() {
      // 向外抛出当前所有核心数据
      this.exportToPDF('signer-print-content', this.fileName)
        .then((pdf) => {
          this.$emit('submit', {
            mode: this.mode,
            // 签名图片 Base64 编码
            signatureImg: this.signatureImg,
            // 坐标数据用于后端用 Itext/PdfBox 在服务器端合成
            position: this.dragPos, 
            // 前端快照 html2canvas 用的节点 ID
            elementId: 'signer-print-content', 
            // 导出的 PDF 文件
            pdf: pdf, 
          });
        })

    },

    /**
     * 纯前端将指定 DOM 导出为标准 A4 PDF
     * @param {String} elementId 要导出的 DOM 节点 ID (例如：'signer-print-content')
     * @param {String} pdfName 导出的文件名 (例如：'劳动合同协议书')
     */
    exportToPDF(elementId, pdfName = 'document') {
      const targetElement = document.getElementById(elementId);
      if (!targetElement) {
        console.error(`未找到 ID 为 ${elementId} 的 DOM 元素`);
        return;
      }

      // 1. 开启 html2canvas 配置项
      const options = {
        scale: 2,           // 【核心配置】放大2倍渲染，极大提升 PDF 的清晰度，防止文字模糊
        useCORS: true,      // 允许跨域图片（如果你的签名/印章是网络图片，必须开启）
        allowTaint: false,  // 不允许被污染的画布
        backgroundColor: '#ffffff', // 确保导出的 PDF 背景是纯白，而不是透明/黑色
        logging: false      // 关闭日志输出
      };

      // 开始渲染快照
      return html2canvas(targetElement, options).then((canvas) => {
        // 获取 canvas 导出的图片数据 (PNG 格式)
        const pageData = canvas.toDataURL('image/png');

        // 2. A4 纸张的物理标准尺寸（单位：mm）
        const a4Width = 210;
        const a4Height = 297;

        // 计算当前 Canvas 图片在 A4 纸上的等比缩放高度
        // 画布实际宽度转换为 A4 宽度(210)时的比例
        const imgWidth = a4Width;
        const imgHeight = (canvas.height * a4Width) / canvas.width;

        // 3. 初始化 jsPDF 实例
        // 'p': 纵向(portrait)；'mm': 单位毫米；'a4': 标准A4纸张
        const pdf = new jsPDF('p', 'mm', 'a4');

        // 一页 A4 纸所能容纳的 Canvas 图像高度（剩余未打印的图像高度）
        let leftHeight = imgHeight;
        // 渲染的 Y 轴偏移量（从 0 开始）
        let position = 0;

        // 4. 多页核心算法：判断图片高度是否超出一页 A4 纸
        if (leftHeight < a4Height) {
          // 图像只有一页，直接添加进 PDF
          // 参数：图片数据, 格式, X坐标, Y坐标, 图片宽度, 图片高度
          pdf.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
          // 图像有多页，通过循环切片分页
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'PNG', 0, position, imgWidth, imgHeight);
            leftHeight -= a4Height;
            position -= a4Height; // 向上滚动一页，相当于给下一页切片

            // 如果还有剩余内容，说明需要新建下一页 PDF
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }

        // 5. 执行下载保存
        if (this.download) {
          pdf.save(`${pdfName}.pdf`);
        }
        // ========== 🌟 核心优化改动点 ==========
        // 不再使用 pdf.save('xxx.pdf') 强制下载
        // 而是输出为原生的 Blob 对象，并通过 URL.createObjectURL 生成一个临时的安全浏览器链接
        // 1. 先通过 jsPDF 输出原生的二进制大对象 (Blob)
        const blob = pdf.output('blob');
        // 2. 将 Blob 包装转换为标准的 File 对象，方便直接追加到 FormData 中
        const pdfFile = new File([blob], `${pdfName}.pdf`, {
          type: 'application/pdf',
          lastModified: Date.now()
        });
        // 向上抛出链接
        return pdfFile;
      }).catch((error) => {
        console.error('PDF 生成失败:', error);
      });
    }
  }
};
</script>

<style scoped>
.signer-page-wrapper {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signer-document-scroller {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  box-sizing: border-box;
}

/* 核心 A4 骨架框架：不管是 HTML 还是 PDF，外层尺寸都要完全锁死等比 */
.signer-container {
  background-color: #ffffff;
  width: 794px;
  /* A4 宽度标准 */
  min-height: 1123px;
  /* A4 高度标准 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  /* 作为全局绝对定位签名的唯一参照物 */
  box-sizing: border-box;
  user-select: none;
}

/* HTML 模式下的边距和排版 */
.html-content-render {
  padding: 80px 90px;
  font-size: 15px;
  line-height: 2;
  color: #333333;
}

/* PDF 模式下的 Canvas 清爽无边距适配 */
.pdf-content-render {
  width: 100%;
  min-height: 1123px;
}

.pdf-page-canvas {
  display: block;
  width: 100%;
  height: auto;
}

/* 全局唯一、满屏可拖拽的签名框 */
.absolute-draggable-signature {
  position: absolute;
  z-index: 99;
  cursor: move;
  padding: 8px;
  border: 2px dashed #409eff;
  background-color: rgba(64, 158, 255, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  box-sizing: border-box;
}

/* 已存在真实签名时的弱化样式 */
.absolute-draggable-signature.has-signature {
  border: 1px dashed transparent;
  background-color: transparent;
}

.absolute-draggable-signature.has-signature:hover {
  border: 1px dashed #409eff;
  background-color: rgba(64, 158, 255, 0.05);
}

.sign-placeholder {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #409eff;
  font-size: 12px;
  gap: 4px;
}

.sign-img {
  width: 100%;
  height: auto;
  max-height: 70px;
  object-fit: contain;
  pointer-events: none;
}

.sign-date {
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
  white-space: nowrap;
}

.signer-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 100;
}
</style>