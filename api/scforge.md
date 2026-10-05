# SCForge 开放 API

SCForge（生存战争插件 / 模组资源平台）对第三方开放的接口：插件与版本的目录查询、发布、评论与投票。

鉴权方式、作用域划分、错误形状与调用约定见[对外开放 API 总览](./index.md)。

<script setup>
// 静态导入而不是 spec-url：产物在构建期就进了包，SSR 不必发请求（spec-url 在 Node 侧 fetch 相对路径会失败）。
import spec from '../openapi/scforge-public.json'
</script>

<OASpec :spec="spec" />
