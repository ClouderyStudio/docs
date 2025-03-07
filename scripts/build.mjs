/** 构建说明：
 *
 *  所有需要的构建步骤，都应封装为返回 Promise 的函数
 *  保证不会因为任何异步操作导致构建错误或失败
 * （若有顺序必要，则依次调用）
 */

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const rewriteTitle = require('../.vitepress/rewrite-title/index.js')

// 确保异步操作完成后再继续后续构建步骤
async function runBuild() {
  try {
    await rewriteTitle()
    // 在此添加其他构建步骤（如果有）
  } catch (error) {
    console.error('构建失败:', error)
    process.exit(1)
  }
}

runBuild()
