import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * 纯前端将指定 DOM 导出为标准 A4 PDF
 * @param {String} elementId 要导出的 DOM 节点 ID (例如：'signer-print-content')
 * @param {String} pdfName 导出的文件名 (例如：'劳动合同协议书')
 * @param {Boolean} isDownload 是否强制下载 (默认 false)
 */
function exportToPDF(elementId, pdfName = 'document', isDownload = false) {
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
        if (isDownload) {
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
};

export default {
    exportToPDF
}