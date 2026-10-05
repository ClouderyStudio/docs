---
description: SCForge 开放 API 接口参考：生存战争插件与模组资源平台的目录查询、发布、评论与投票接口
---

# SCForge 开放 API

SCForge（生存战争插件 / 模组资源平台）对第三方开放的接口：资源（插件 / 模组）与版本的目录查询、发布、评论与投票。资源用 `kind` 区分插件与模组。

鉴权方式、作用域划分、错误形状与调用约定见[对外开放 API 总览](./index.md)。要把发布流程接进 CI（打 tag 后自动把插件发到本平台），见 [开发与自动化参考](./AGENTS.md) —— 里面含 GitHub / Gitee / CNB 三个平台的密钥配置教程与完整工作流示例。

<script setup>
// 静态导入而不是 spec-url：产物在构建期就进了包，SSR 不必发请求（spec-url 在 Node 侧 fetch 相对路径会失败）。
import spec from '../openapi/scforge-public.json'
</script>

<OASpec :spec="spec" />
