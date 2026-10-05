#!/usr/bin/env node
/**
 * 把 ClouderyApi 仓库导出的开放 API 文档同步到文档站。
 *
 * 产物由 ClouderyApi 的测试（ClouderyApi.Tests/ScforgePublicOpenApiTests.cs）
 * 从运行时 OpenAPI 导出并守护漂移，这里只做复制 —— 不要手改产物。
 *
 * 复制到两处（内容始终一致，都由本脚本写出）：
 *   openapi/scforge-public.json        页面构建期 import 用的正本（不能在 public/ 下，Vite 拒绝从 publicDir 解析模块）
 *   public/openapi/scforge-public.json 站点静态文件，供 /openapi/scforge-public.json 直接下载
 *
 * 用法：
 *   pnpm run sync:api <ClouderyApi 仓库路径>
 *   CLOUDERY_API_REPO=E:\...\ClouderyApi pnpm run sync:api
 *
 * 找不到源文件时，先在 ClouderyApi 仓库里跑一次
 *   dotnet test ClouderyApi.Tests/ClouderyApi.Tests.csproj --filter FullyQualifiedName~ScforgePublicOpenApiTests
 * 让测试写出 docs/openapi/scforge-public.json。
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const targets = [
  resolve(root, 'openapi', 'scforge-public.json'),
  resolve(root, 'public', 'openapi', 'scforge-public.json'),
]

const repo = process.argv[2] || process.env.CLOUDERY_API_REPO
if (!repo) {
  console.error('缺少 ClouderyApi 仓库路径。用法：pnpm run sync:api <ClouderyApi 仓库路径>')
  process.exit(1)
}

const source = resolve(repo, 'docs', 'openapi', 'scforge-public.json')
if (!existsSync(source)) {
  console.error(`找不到 ${source}。请先在 ClouderyApi 仓库跑 ScforgePublicOpenApiTests 生成产物。`)
  process.exit(1)
}

console.log(`源：${source}`)
for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(source, target)
  const { size } = statSync(target)
  console.log(`  → ${target}（${size} 字节）`)
}
