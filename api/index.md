---
description: 云术工作室对外开放 API 总览：统一入口、鉴权方式、作用域划分、调用示例与错误处理约定
---

# 对外开放 API

云术工作室把对第三方开放的接口集中在这里：一个入口、一套鉴权、一套错误形状。

| 服务 | 内容 | 接口参考 | 状态 |
| --- | --- | --- | --- |
| SCForge | 生存战争插件 / 模组资源平台：目录查询、发布、评论、投票 | [SCForge 开放 API](./scforge.md) | 已开放 |

## 入口

| 环境 | API 入口 |
| --- | --- |
| 生产环境 | `https://api.cldery.com` |

路径规则为 `/{模块}/{资源}`，例如资源列表是 `GET /scforge/addons`。**插件（`kind=plugin`）与模组（`kind=mod`）共用这一棵资源树**，用 `kind` 字段或查询参数区分——`/plugins`、`/mods` 是站点上的两个预设筛选入口，接口层只有一个资源类型。除文件上传外，请求与响应都是 JSON，接口只走 HTTPS。

## 鉴权

| 场景 | 需要的凭据 |
| --- | --- |
| 读公开目录（插件、版本、评论、投票） | 无需凭据，匿名可读 |
| 在浏览器里以当前登录用户身份调用 | 登录后的会话 Cookie |
| 脚本 / CI / 服务端调用 | API Key：`Authorization: Bearer scf_...` |

::: warning 会话优先
请求同时带会话 Cookie 与 Bearer 令牌时，以**会话身份**为准。脚本调用请只带 Bearer，不要复用浏览器里的 Cookie。
:::

### 获取 API Key

1. 登录 SCForge 站点，打开 <https://scforge.cldery.com/api-keys>。
2. 填名字、勾选作用域、按需设置过期时间，然后签发。
3. 令牌明文**只显示这一次**，请立刻存进密钥管理工具或 CI Secrets —— 服务端只保存哈希，之后任何接口（包括超管）都取不回来。

也可以直接调接口签发（需要已登录的会话 Cookie）：

```bash
curl -X POST https://api.cldery.com/scforge/api-keys \
  -H "Content-Type: application/json" \
  -b "$CLOUDERY_SESSION_COOKIE" \
  -d '{"name":"发版机器人","scopes":["read","publish"]}'
```

响应里的 `token` 是唯一一次明文，同时返回的 `key` 对象只含前缀与掩码（`prefix`、`maskedToken`）以及作用域、状态与时间字段。

| 端点 | 用途 |
| --- | --- |
| `GET /scforge/api-keys/scopes` | 作用域清单（键、中文名、说明） |
| `GET /scforge/api-keys` | 我的 Key 列表（含已吊销） |
| `POST /scforge/api-keys` | 签发新 Key |
| `POST /scforge/api-keys/{id}/revoke` | 吊销（可带 `reason`） |
| `POST /scforge/api-keys/{id}/rotate` | 轮换：吊销旧的并签发同权限的新 Key |

### 作用域

| 键 | 中文名 | 能做什么 |
| --- | --- | --- |
| `read` | 读取 | 查询自己发布的资源与版本列表 |
| `publish` | 发布 | 发布新资源、编辑资源资料、追加或替换版本（都进审核流程） |
| `manage` | 管理 | 删除自己的资源、把被驳回的提交重新送审 |

自助签发只开放 `read` 与 `publish`；`manage` 属于删改权限，必须由超管在后台签发。

## 调用示例：用 API Key 发布资源

```bash
curl -X POST https://api.cldery.com/scforge/addons \
  -H "Authorization: Bearer $SCFORGE_TOKEN" \
  -F package=@和平区域插件.dll \
  -F kind=plugin \
  -F name=和平区域插件 \
  -F slug=hpqy \
  -F summary=区域内禁战 \
  -F category=protection \
  -F gameVersion=x26.07.01 \
  -F version=1.0.0 \
  -F channel=release \
  -F changelog=首版
```

`package` 是文件字段（`@` 开头指向本地文件），其余是普通文本字段。提交后进入审核，审核通过才对外可见。

## 错误处理

所有错误响应都是同一个形状：

```json
{ "detail": "当前 API Key 缺少「发布」作用域" }
```

| 状态码 | 含义 |
| --- | --- |
| `400` | 参数或业务规则不合法（`detail` 说明原因） |
| `401` | 未登录或凭据无效，例如 `{"detail":"请先登录"}` |
| `403` | 已识别身份但作用域不足 |
| `404` | 资源不存在，或不属于当前身份 |
| `409` | 状态冲突（例如重复提交、重复投票） |

其它状态码按 HTTP 语义理解。

## 约定

- **时间**：所有时间字段按北京时间（UTC+8，形如 `2026-07-01T12:00:00+08:00`）输出。
- **成功体**：各接口自行定义；只做副作用的写操作返回 `{"success":true}`。
- **审核**：资源与版本的发布、编辑都进审核流程，审核通过前不对其它调用者可见。
- **跨域**：在浏览器里从其它站点直接调用，需要在服务端配置白名单来源；服务端之间调用不受影响。
- **频率**：请勿高频轮询，平台可能在网关层限制异常流量。

## 文档来源

接口参考由 ClouderyApi 的测试从运行时 OpenAPI 文档导出（`docs/openapi/scforge-public.json`），文档站与仓库里的产物是同一份文件，避免手写漂移。

<a href="/openapi/scforge-public.json" target="_blank">下载 OpenAPI 文档（JSON）</a>

## 接入与自动化

想把这套接口接进自己的脚本或 CI（比如从 GitHub Release 自动发布插件）？请看
[**开发与自动化参考**](./AGENTS.md)：里面有发布配方的写法、可照抄的 CI 配置、
**密钥（Secrets）手把手配置教程**（GitHub / Gitee / CNB 三个平台都有）、
常用接口速查与排错表。

::: tip 写插件 / 开服的话建议看一遍
即便你不打算配 CI，那份文档里的**分类与标签合法值**、**新手最容易踩的字段坑**
（比如"其它"分类要填 `misc` 而不是 `other`）也能让你少走弯路。
:::
