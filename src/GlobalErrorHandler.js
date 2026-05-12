import Vue from 'vue'
/**
 * 全局异常处理函数
 * @param {Error} err - 异常对象
 * @param {Vue} vm - 异常发生的 Vue 实例
 * @param {string} info - 异常发生的生命周期或事件流
 */
Vue.config.errorHandler = function (err, vm, info) {
    // 1. 提取错误详情
    const errorInfo = {
        message: err.message,      // 错误信息
        stack: err.stack,        // 错误堆栈（配合 SourceMap 可定位源码）
        component: vm.$options.name || 'AnonymousComponent', // 出错组件名
        lifecycle: info,          // 报错所在的生命周期或事件流
        url: window.location.href, // 当前页面地址
        time: new Date().toLocaleString()
    };

    // 2. 生产环境下的处理逻辑
    if (process.env.NODE_ENV === 'production') {
        // A. 模拟上报到后端接口（如 ThinkPHP 写的日志接口）
        console.log('%c 系统捕获到异常，正在后台上报...', 'color: red;');
        // reportError(errorInfo); 

        // B. 给用户一个友好的提示（避免界面卡死没反应）
        // 如果你用了 Element UI，可以这样：
        Vue.prototype.$message.error('系统开个小差，工程师正在紧急处理中');
    } else {
        // 3. 开发环境下依然在控制台打印详细信息，方便调试
        console.group('--- Vue 全局异常监控 ---');
        console.error('监控信息:', errorInfo);
        console.warn('Component:', vm);
        console.warn('Trace:', info);
        console.groupEnd();
        Vue.prototype.$message.error('系统开个小差，工程师正在紧急处理中');
    }
};