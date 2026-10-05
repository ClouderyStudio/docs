# AGENTS.md

> 本文件是给 AI 编码助手看的约束说明，不是文档页面。
> **作用域仅限本目录（`api/`）** —— 对应线上的 `/api/` 分区：云术工作室对外开放 API 文档。
> 仓库其它分区（`/docs`、`/serve`、`/game`、`/bmdocs`、`/nav`、`/hearttree`）不在本文件约束范围内，改之前请先读对应目录的说明或问人。

## 这个分区是干什么的

`/api` 只讲一件事：**第三方怎么调云术工作室对外开放的 HTTP 接口**。

- 入口固定 `https://api.cldery.com`，路径规则 `/{模块}/{资源}`（例如 `GET /scforge/addons`）。
- 读者是外部开发者，不是内部同事：写清楚"怎么调通"，不写内部实现、后台接口、未开放端点。

## 目录里只有两类文件，改法完全不同

| 文件 | 性质 | 能不能手改 |
| --- | --- | --- |
| `index.md` | 手写总览：入口、鉴权、作用域、调用示例、错误形状、约定 | ✅ 可以直接编辑 |
| `scforge.md` | vitepress-openapi 的渲染壳：开头两段说明 + `<script setup>` + `<OASpec :spec="spec" />` | ⚠️ 只能改开头说明段，**接口细节一律不改** |
| `../openapi/scforge-public.json` | OpenAPI 产物（页面构建期 `import` 的正本） | ❌ 禁止手改 |
| `../public/openapi/scforge-public.json` | 同一份产物的静态副本（供 `/openapi/scforge-public.json` 下载） | ❌ 禁止手改 |

**接口细节的唯一真源是 ClouderyApi 的运行时 OpenAPI**，`scforge.md` 只是把它渲染出来。
发现"文档和接口对不上"时，正确处理是去 ClouderyApi 修接口/修导出，再同步过来 —— **不要在 md 或 json 上打补丁**，那只会制造下一轮漂移。

## 同步链路

```
ClouderyApi 运行时 OpenAPI
  └─ 测试 ScforgePublicOpenApiTests 导出 → ClouderyApi/docs/openapi/scforge-public.json
       └─ pnpm sync:api <ClouderyApi 仓库路径>
            ├─ openapi/scforge-public.json          （import 用）
            └─ public/openapi/scforge-public.json   （下载用）
```

```bash
pnpm run sync:api <ClouderyApi 仓库路径>
# 或 CLOUDERY_API_REPO=E:\...\ClouderyApi pnpm run sync:api
```

源文件不存在时，先在 ClouderyApi 仓库跑一次测试让它产出：

```bash
dotnet test ClouderyApi.Tests/ClouderyApi.Tests.csproj --filter FullyQualifiedName~ScforgePublicOpenApiTests
```

## 三条硬约束

1. **`scforge.md` 必须保持静态 `import spec`，不要改成 `spec-url`。**
   spec-url 会在 SSR 的 Node 侧 fetch 相对路径，直接构建失败。源码里已留注释说明，别删。
2. **两份 JSON 必须同时更新。** 它们内容应始终一致（都由 `sync-openapi.mjs` 写出）；只改一处会出现"页面是新的、下载链接还是旧的"。
3. **`<OASpec>` 依赖主题注册，顺序不能反。** `.vitepress/theme/index.ts` 里必须先 `useOpenApiTheme({ i18n: { locale: 'zh' } })` 再 `openApiTheme.enhanceApp({ app })` —— 后者内部读的就是这份全局配置，反了会退回英文文案。

## 新增一个服务分区的标准动作

假设新服务叫 `<service>`：

1. **ClouderyApi 侧**：导出 `<service>-public.json`，并把新目标加进 `scripts/sync-openapi.mjs` 的 `targets`（`openapi/` 与 `public/openapi/` 各一条）。
2. **本目录**：新建 `api/<service>.md`，照抄 `scforge.md` 的三段结构 —— 说明段（含一句"鉴权与约定见总览"的链接）+ 静态 import + `<OASpec :spec="spec" />`。
3. **`index.md`**：顶部服务表加一行（`服务 / 内容 / 接口参考链接 / 状态`）。
4. **`.vitepress/configs/sidebar.ts`**：`'/api/'` → `items` 数组加一项，link 写法与现有保持一致（带 `.md` 后缀）。
5. **navbar 不用动**：`.vitepress/configs/navbar.ts` 里 `activeMatch: '/api/'` 已覆盖新页面。

## 写作口径（改 `index.md` 时必须保持一致）

- 入口 `https://api.cldery.com`；路径 `/{模块}/{资源}`。
- **插件与模组共用一棵资源树**，用 `kind` 区分（`/plugins`、`/mods` 只是站点上的两个预设筛选入口，接口层只有一个资源类型）。
- 三种鉴权：匿名只读公开目录 / 会话 Cookie / `Authorization: Bearer scf_...`。**同时带会话与 Bearer 时会话优先**，脚本调用只带 Bearer。
- API Key 明文**只显示一次**，服务端只存哈希；自助签发只有 `read` 与 `publish`，`manage` 必须超管签发。
- 错误形状统一 `{"detail": "..."}`；重点状态码 `400 / 401 / 403 / 404 / 409`，其余按 HTTP 语义。
- 时间一律北京时间（UTC+8，形如 `2026-07-01T12:00:00+08:00`）；只做副作用的写操作返回 `{"success":true}`；发布与编辑都进审核，通过前对外不可见。
- 示例给可直接复制的 `curl`，**密钥一律用占位符**（`$SCFORGE_TOKEN`、`$CLOUDERY_SESSION_COOKIE`），不写真实令牌。
- 中文、简洁、面向外部开发者。需要强调的坑用 `::: warning` 容器（现有"会话优先"就是这么写的）。

## 不要做的事

- 不要把 `api/` 和 `bmdocs/api/` 混为一谈 —— 后者是 AI 模型代理（deepseek / siliconflow / OpenRouter / Gemini 等）的配置文档，属于另一套体系。
- 不要在 `/api` 分区里写内部后台、管理端或未对外开放的接口。
- 不要手改 `openapi/**` 下的任何 JSON。
- 不要为了"补齐文档"去猜接口字段 —— 猜错比不写更糟，先去 ClouderyApi 确认。
- 不要顺手改其它分区的 sidebar / navbar 项。

## 本地验证

```bash
pnpm i
pnpm dev        # 看 /api/ 与 /api/scforge.html
pnpm build      # 必须过；SSR 阶段会真的 import spec，路径写错会在这里炸
```

改了 `scforge.md`、`openapi/` 或 `sidebar.ts` 之后，**`pnpm build` 是必跑项**，只跑 dev 不足以暴露 SSR 问题。

## 关于本文件自身

`AGENTS.md` 不是文档页面。`.vitepress/config.ts` 里有 `srcExclude` 把它排除掉，避免被渲染成 `api/AGENTS.html` 并被 pagefind 收进搜索索引。**别把这个排除项删掉。**

---

# 附录：把 GitHub Release 自动发到 SCForge

> 这一节是**开发参考**，不属于对外文档 —— 它讲的是怎么让 `ClouderyStudio/sc-plugins` 这个
> 插件仓库在打 tag 后，自动把 Release 里的 DLL 上传到 SCForge 平台。
> 面向的是要维护/扩展这条发布链路的开发者与 AI 助手。

## 为什么不是"平台去 GitHub 拉"

SCForge 的发布接口要的是**文件本体**（`multipart/form-data`），平台**没有代下载能力**。
所以"从 Release 读取"这个需求，落地方式是：**在 CI / 本机把文件取下来，再传上去**。

"用加速链接"解决的是**取文件那一步**在国内慢的问题：

```
https://gh-proxy.com/https://github.com/ClouderyStudio/sc-plugins/releases/download/v1.0.0/web-panel.dll
└──── 加速前缀 ────┘└────────────────────── 原始 Release 附件地址 ──────────────────────┘
```

已在 `gh-proxy.com` 上实测通过（112,128 字节的 DLL 完整下回，`MZ` 头正常）。
脚本里做了**直连兜底** —— 加速站抽风时自动退回 GitHub 原始地址，不让发版卡死。

## 相关文件一览

| 文件 | 位置 | 职责 |
| --- | --- | --- |
| `release-manifest.json` | `sc-plugins/.buildtools/` | 待发布 DLL 清单 + **SCForge 发布配方**（标题/slug/简介/标签） |
| `publish-release.py` | 同上 | 编译 → 提交 → 打 tag → 推 GitHub → 建 Release → 传附件 → 转手发平台 |
| `publish-to-scforge.py` | 同上 | 把 DLL 传到 SCForge（可独立运行，也是 CI 调用的那个） |
| `check-sources.py` | 同上 | 仓库自检，含"Scforge 配方是否与 Assets 一一对应、slug 是否唯一" |
| `ci.yml` | `sc-plugins/.github/workflows/` | 自检 + 打 tag 时自动发平台（`publish-scforge` 作业） |

## 配置步骤

### 1. 签发 API Key

登录 <https://scforge.cldery.com/api-keys>，勾 **`publish`** 作用域后签发。

- 明文**只显示一次**，服务端只存哈希，丢了只能轮换。
- 自助签发只有 `read` / `publish`；`manage`（删除、重新送审）必须超管在后台签。
- 自动上传只要 `publish` 就够 —— 脚本做的是"新建资源 + 追加版本"。

### 2. 填发布配方

在 `sc-plugins/.buildtools/release-manifest.json` 里补 `Scforge` 段。键是**插件中文名**（与 `Assets[].Plugin` 对齐）：

```json
"Scforge": {
  "Kind": "plugin",
  "GameVersion": "x26.07.01",
  "Category": "other",
  "Items": {
    "和平区域插件": {
      "Slug": "peace-zone",
      "Summary": "划分和平区域，区域内禁止玩家之间互相伤害",
      "Tags": ["protection", "pvp"]
    }
  }
}
```

- **`Slug` 是最重要的字段**：它是资源对外的固定地址，创建后接口层不允许更改。
- `GameVersion` 取 `GET /scforge/game-versions` 里的值。
- `Kind` 只能是 `plugin`（仅服务端）或 `mod`（会下发客户端），**创建后不可更改**。
- 缺 `Scforge` 段或某个插件的配方时，脚本会跳过它并在自检里报 FAIL —— 不会静默漏发。

### 3. 本机发布

```bat
set SCFORGE_TOKEN=scf_xxxx
python .buildtools/publish-release.py v1.0.0
```

## CI 配置：打 tag 自动发平台

`ci.yml` 里的 `publish-scforge` 作业：

```yaml
publish-scforge:
  needs: check
  if: startsWith(github.ref, 'refs/tags/v')
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v5
      with: { python-version: '3.12' }
    - name: 上传到 SCForge
      env:
        SCFORGE_TOKEN: ${{ secrets.SCFORGE_TOKEN }}
      run: |
        if [ -z "$SCFORGE_TOKEN" ]; then
          echo "::warning::未配置 SCFORGE_TOKEN，跳过 SCForge 上传。"
          exit 0
        fi
        python3 .buildtools/publish-to-scforge.py "$GITHUB_REF_NAME" --from-url
```

设计要点，改的时候别破坏：

- **只跑在 `refs/tags/v*`**：branch 的 push 不发平台，避免每次改源码都产生一个待审版本。
- **`needs: check`**：自检不过就不发 —— 自检里包含 slug 唯一性与配方完整性。
- **没配 Secret 时 `exit 0`**：降级为"只发 GitHub"，CI 不因此变红。
- **`--from-url`**：云端没有编译产物（编不出来，需要商业游戏的核心 DLL），
  只能从 Release 附件下载。这份文件与 GitHub 上那份**逐字节一致**，能保证平台与 Release 不漂移。
- **`"$GITHUB_REF_NAME"`**：在 tag 触发时正好是 `v1.0.0`，与 Release 的 tag 天然对齐。

### ⚠️ Secrets 用的是 API Key，不是 GitHub Token

这一步需要的是 **SCForge 的 `scf_` API Key**，和 GitHub 凭据完全无关。
**不要**为了这个去建权限更大的 GitHub PAT —— 上传 SCForge 全程不碰 GitHub API。

CI 里如果将来真需要写 GitHub，务必用 Actions 自动注入的 `GITHUB_TOKEN`（作用域自动限制在当前仓库），
而不是把个人 PAT 塞进 Secrets。

## SCForge 接口速查（自动上传相关的几个）

入口 `https://api.cldery.com`，鉴权 `Authorization: Bearer scf_...`，错误形状 `{"detail": "..."}`。

| 方法与路径 | 作用 |
| --- | --- |
| `GET /scforge/addons/mine` | 我发布的资源（含待审/驳回）—— 脚本靠它对 slug 判断"该建还是该追加版本"。**需要 `read` 作用域** |
| `GET /scforge/addons/{idOrSlug}` | 详情。**接受 slug**，是唯一能由 slug 换到资源 id 的接口 |
| `POST /scforge/addons` | 新建资源（`multipart`），提交后进审核 |
| `POST /scforge/addons/{id}/versions` | 给已有资源追加版本（`multipart`），进审核 |
| `GET /scforge/game-versions` | 受支持的游戏版本枚举，发布表单的取值来源 |
| `GET /scforge/versions/{id}/download` | **对外唯一下载入口**（未审核的版本拿不到） |

::: warning 三个实测踩出来的坑
1. **`publish` 作用域不包含读列表**。只勾 `publish` 的 Key 调 `GET /addons/mine` 会吃 `403
   {"detail":"当前 API Key 缺少「读取」作用域"}`。所以 `publish-to-scforge.py` 做了降级：
   拿不到列表就改走"按 slug 逐个探测"，不强制要求同时勾 `read`。想一次拿全列表就把两个都勾上。
2. **详情响应是包了一层的**：`{"addon": {...}}`，`id` / `slug` / `versions` 都在 `addon` 里面，
   不在顶层。取值要 `resp["addon"]["id"]`。
3. **`/addons/{id}/versions` 的路径参数声明为 `uuid`，不吃 slug**。只有详情端点 `/addons/{idOrSlug}`
   接受 slug。所以"由 slug 追加版本"必须先查详情换 id，不能直接拿 slug 去调 versions。
:::

`POST /scforge/addons` 的字段（`multipart/form-data`）：

- **必填**：`Package`（文件）、`Kind`。
- 元数据：`Name` / `Slug` / `Summary` / `Description` / `Readme` / `Category` / `GameVersion` / `Tags`
  / `SourceUrl` / `IssuesUrl` / `License` / `LicenseUrl` / `DonationUrl` / `DiscordUrl`。
- 首个版本一并提交：`Version` / `Channel`（`release` 或 `beta`）/ `Changelog` / `GameVersions` / `Dependencies`。
- 可选资源图：`Icon`（JPG/PNG/WebP/GIF）、`Gallery`（最多 6 张）。

`POST /scforge/addons/{id}/versions` 的字段：`Package` + `Version` / `Channel` / `Changelog`
/ `GameVersions` / `Dependencies`；`GameVersion` 缺省时沿用资源的主游戏版本。

> **多值字段**：`Tags` / `GameVersions` 在表单里以**同名重复出现**表达多值，
> 不是 JSON 数组字符串。脚本的 `multipart()` 已按此处理。

## 上传脚本的行为约定

`publish-to-scforge.py` 的几个关键决定，改的时候要知道原因：

1. **先 `GET /addons/mine` 再决定建/追加**：接口没有"按 slug 查是否已存在"的公开端点，
   只能拉自己的列表在本地比对。批量发布时只拉一次，不是每个插件拉一次。
2. **默认直接用本地 DLL，`--from-url` 才走加速链接**：本机发版时 DLL 就在磁盘上，
   下载一遍纯属浪费。只有 CI 里（没有编译产物）才必须走 URL。
3. **`--with-basic` 是个显式开关**：基础插件不开源、不在 `Assets` 里，
   但偶尔确实想发到平台上，所以留了口子，默认**不带**。
4. **`SCFORGE_TOKEN` 从环境变量读，不写进任何文件**：仓库里 `scforge.env` 是本地文件且已被
   `.gitignore` 挡住，不要把 Key 固化进清单或脚本。
5. **只用标准库**（`urllib` + 手搓 `multipart`）：与仓库其它脚本一致，少一个依赖少一处 CI 意外。

## 排查

| 现象 | 原因 |
| --- | --- |
| CI 里 `publish-to-scforge.py` 报文件不存在 | 脚本没被 `.gitignore` 白名单放行。`/*` 全忽略模式下，`!/.buildtools/publish-to-scforge.py` 必须显式写上 |
| 平台上少了一个资源，但 CI 全绿 | 该插件在 `Scforge.Items` 里缺配方。自检第 5 项现在会 FAIL，先跑 `check-sources.py` |
| 日志出现「这把 Key 没有「读取」作用域」 | 正常降级，不是错误。脚本改走逐个探测。想一次拿全列表就重新签发时把 `read` 一起勾上 |
| 上传报 `403` `{"detail":"当前 API Key 缺少「发布」作用域"}` | Key 只勾了 `read`，重新签发一把带 `publish` 的 |
| 资源改不了 slug | 正常。`Slug` 创建后接口层不允许更改，要换地址只能删资源重建 |
| 上传后平台上看不到 | 正常。资源与版本都要**过审核**才对外可见 |
| 加速链接下载失败 | 脚本会自动退回直连；若两者都失败，说明该 tag 的 Release 附件确实不存在 |

### 已实测的完整链路

用 `peace-zone` 跑过一次真实的端到端上传（`v0.0.1-ci-test`，随后已删除）：

```
[1/2] 这把 Key 没有「读取」作用域，改为逐个探测资源是否已存在
  ✓ peace-zone       追加版本 v0.0.1-ci-test（资源已存在）
[2/2] 完成。快照写入 .buildtools/_release-snapshot.json
```

校验结果：新版本入库、状态 `pending`（待审核）、文件名与字节数正确。
`--only` 接受**插件中文名 / 附件英文名（带不带 `.dll` 都行）/ slug** 三种写法。

