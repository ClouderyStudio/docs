import path from 'path'
import { promises as fsp } from 'fs'
import matterService from '../utils/frontmatter-service.js' // 注意添加文件扩展名

const workspacePath = path.resolve(import.meta.dirname, '..', '..')

const h1MdRegExp = /^#\s+(.+)\s+(\{#([\w-]+)\})$/
/** 在此书写所有文章所在的目录名 */
const articleDirs = ['blog', 'config', 'guide', 'plugins']

const rewriteMarkdownTitle = (filePath) => {
  const matter = matterService.open(filePath)
  const lines = String(matter.file).split(/\r?\n/)
  const h1Line = lines.find((line) => h1MdRegExp.test(line))
  if (!h1Line) return

  const title = h1MdRegExp.exec(h1Line)[1]
  matter.set('title', title).save()
}

const ergodicDirectory = async (dirPath) => {
  try {
    const files = await fsp.readdir(dirPath)
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stats = await fsp.stat(filePath)
      if (stats.isFile()) {
        if (filePath.split('.').pop().toLowerCase() === 'md') {
          rewriteMarkdownTitle(filePath)
        }
      } else if (stats.isDirectory() && articleDirs.includes(file)) {
        await ergodicDirectory(filePath)
      }
    }
  } catch (err) {
    console.warn(
      `vite-docs-cn: failed to rewrite frontmatter for titles.\n ${err}!`
    )
  }
}

// ES 模块默认导出
export default () => ergodicDirectory(workspacePath)
